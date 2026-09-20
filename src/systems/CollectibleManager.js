import Phaser from 'phaser';
import { Collectible } from '../entities/Collectible.js';
import { SoundFX } from '../utils/SoundFX.js';

const COLLECTIBLE_TYPES = {
  modak: {
    texture: 'collectible_modak', resource: 'modaks', score: 10,
    feedback: 'MODAK COLLECTED +10', idle: { floatDistance: 7, angle: 5, duration: 1100 }
  },
  sacredStone: {
    texture: 'collectible_sacred_stone', resource: 'sacredStones', score: 20,
    feedback: 'SACRED STONE ACQUIRED +20', idle: { floatDistance: 9, scale: 1.12, duration: 950 }
  },
  lotus: {
    texture: 'collectible_lotus', resource: 'lotuses', score: 25,
    feedback: 'DIVINE LOTUS COLLECTED +25', idle: { floatDistance: 8, angle: 12, duration: 1500 }
  },
  templeCoin: {
    texture: 'collectible_temple_coin', resource: 'templeCoins', score: 5,
    feedback: 'TEMPLE COIN COLLECTED +5', idle: { floatDistance: 4, angle: 360, duration: 1200 }
  },
  scripture: {
    texture: 'collectible_scripture', resource: 'scriptures', score: 50,
    feedback: 'ANCIENT SCRIPTURE DISCOVERED +50', idle: { floatDistance: 8, angle: 3, duration: 1600 }
  }
};

/** Owns current-level pickup state, placement, overlap detection and feedback. */
export class CollectibleManager {
  constructor(scene, player, gameState, placements) {
    this.scene = scene;
    this.player = player;
    this.gameState = gameState;
    this.placements = placements;
    this.collectibles = scene.physics.add.group({
      allowGravity: false,
      immovable: true
    });
    this.overlap = scene.physics.add.overlap(player, this.collectibles, this.handleOverlap, undefined, this);
  }

  add(type, x, y) {
    const definition = COLLECTIBLE_TYPES[type];
    if (!definition) throw new Error(`Unknown collectible type: ${type}`);
    const collectible = new Collectible(this.scene, x, y, definition);
    this.collectibles.add(collectible);
    // Explicitly guarantee physics immovability and disable gravity integration post-group add
    collectible.body.setAllowGravity(false);
    collectible.body.setImmovable(true);
    collectible.body.setVelocity(0, 0);
    collectible.body.moves = false;
    return collectible;
  }

  createCollectibles() {
    let count = 0;
    Object.entries(this.placements).forEach(([type, positions]) => {
      positions.forEach(([x, y]) => {
        this.add(type, x, y);
        count++;
      });
    });
    console.log('[COLLECTIBLES] created:', count);
  }

  handleOverlap(player, collectible) {
    if (collectible.isCollected) return;
    this.completeCollection(collectible);
    collectible.collect(player);
  }

  completeCollection(collectible) {
    const { definition } = collectible;
    this.gameState.collect(definition);
    SoundFX.playCollectChime(definition.resource === 'sacredStones' || definition.resource === 'lotuses' || definition.resource === 'scriptures');

    if (this.scene.collectibleEmitter) {
      const count = (definition.resource === 'sacredStones' || definition.resource === 'scriptures') ? 18 : 12;
      this.scene.collectibleEmitter.explode(count, collectible.x, collectible.y);
    }
    this.scene.events.emit('resources-changed', this.gameState.snapshot());
    this.scene.events.emit('show-interaction-feedback', definition.feedback);
  }

  destroy() {
    // Physics colliders are owned and disposed by the scene's Arcade world.
    // Calling Collider.destroy while that world is shutting down can throw on
    // rapid restarts, so release our reference and let scene restart clean it.
    this.overlap = null;
    if (this.collectibles && this.collectibles.children && this.collectibles.children.entries) {
      const items = this.collectibles.getChildren();
      if (Array.isArray(items)) {
        items.forEach(c => {
          if (c && c.idleTween) {
            c.idleTween.stop();
            c.idleTween = null;
          }
        });
      }
      this.collectibles.clear(true, true);
    }
    this.collectibles = null;
  }
}
