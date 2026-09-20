import Phaser from 'phaser';
import { RestorationPoint } from './RestorationPoint.js';

/**
 * BrokenBridge Entity
 * An ancient carved stone and timber bridge spanning the sunken courtyard waters.
 * When in ruins, the center span is missing and an impassable chasm barrier prevents leaping across.
 * Any attempt to jump across before restoration blocks Ganesha in mid-air, causing him to fall into
 * the water hazard below.
 * When restored by Lord Ganesha using 3 Sacred Stones and his divine trunk,
 * the chasm barrier is permanently unsealed and solid ground slabs are seamlessly activated across
 * the entire 320px gap connecting Terrace D and Terrace E.
 */
export class BrokenBridge extends RestorationPoint {
  /**
   * @param {Phaser.Scene} scene 
   * @param {number} x 
   * @param {number} y 
   * @param {Object} config 
   */
  constructor(scene, x, y, config = {}) {
    super(scene, x, y, {
      id: config.id || 'broken_bridge',
      type: 'broken_bridge',
      name: config.name || 'Broken Bridge',
      structureName: 'bridge',
      promptText: config.promptText || 'Press E to Restore Bridge',
      feedbackText: config.feedbackText || 'COURTYARD BRIDGE RESTORED! THE PASSAGE IS OPEN.',
      interactionRange: config.interactionRange || 110,
      requiredResource: config.requiredResource || 'sacredStones',
      requiredAmount: config.requiredAmount || 3,
      approachObjective: config.approachObjective || 'Restore the Broken Bridge.',
      approachStage: 'reach_bridge',
      targetStage: 'restore_bridge',
      restoredObjective: config.restoredObjective || 'Reach the Sacred Altar.',
      brokenTexture: 'bridge_broken',
      restoredTexture: 'bridge_restored',
      originX: 0.5,
      originY: 1,
      bodyWidth: 80,
      bodyHeight: 70,
      promptOffset: { x: 0, y: -90 },
      ...config
    });

    const span = config.bridgeSpan || { startX: 2740, endX: 3060, y: 580 };
    this.span = span;
    const spanWidth = span.endX - span.startX;
    const centerX = span.startX + spanWidth / 2;
    this.centerX = centerX;

    // 1. Visual bridge spanning across the sunken chasm perfectly aligned with platform deck at span.y
    this.bridgeSprite = scene.add.image(centerX, span.y, 'bridge_broken').setOrigin(0.5, 0);
    this.bridgeSprite.setDepth(1);

    // 2. Seamless ground platform slabs across the entire 320px bridge span (1980 to 2300)
    // Slabs match identical physics and height (y = 580) of Terrace D and Terrace E.
    this.bridgeSlabs = [];
    if (scene.platforms) {
      const step = 128;
      for (let bx = span.startX; bx <= span.endX; bx += step) {
        const slab = scene.platforms.create(bx, span.y, 'ground_slab').setOrigin(0, 0);
        slab.setVisible(false);
        slab.refreshBody();
        slab.body.enable = false; // Impassable until restored
        this.bridgeSlabs.push(slab);
      }
    }

    // 3. Impassable Chasm Barrier while broken
    // Prevents sprinting or jumping across the 320px gap before solving the puzzle.
    this.createChasmBarrier();

    // 4. Subtle atmospheric water spray and celestial updraft motes across the broken gap
    this.createWaterGlow();
  }

  createChasmBarrier() {
    if (this.chasmBarrier) return;

    // Static physics barrier at centerX spanning vertically from y = 0 to y = 680
    this.chasmBarrier = this.scene.physics.add.staticSprite(this.centerX, 320, 'platform_stone');
    this.chasmBarrier.setVisible(false);
    this.chasmBarrier.refreshBody();
    this.chasmBarrier.body.setSize(64, 680);
    this.chasmBarrier.body.x = this.centerX - 32;
    this.chasmBarrier.body.y = 0; // Spans y = 0 down to water level at y = 680

    if (this.scene.player) {
      this.chasmCollider = this.scene.physics.add.collider(this.scene.player, this.chasmBarrier, () => {
        // Show immediate hint if player attempts to force their way across without restoring
        if (!this.isRestored && this.scene.events) {
          this.scene.events.emit('show-interaction-feedback', 'THE CHASM IS IMPASSABLE! RESTORE THE BRIDGE WITH 3 SACRED STONES.');
        }
      });
    }
  }

  createWaterGlow() {
    this.bridgeWaterTimer = this.scene.time.addEvent({
      delay: 700,
      loop: true,
      callback: () => {
        if (!this.active || this.isRestored) return;
        if (this.scene && this.scene.ambientEmitter) {
          this.scene.ambientEmitter.explode(
            2,
            this.span.startX + 160 + Phaser.Math.Between(-80, 80),
            this.span.y + 40
          );
        }
      }
    });
  }

  interact(player) {
    const success = super.interact(player);
    if (success) {
      // 1. Visually restore the stone bridge structure
      if (this.bridgeSprite) {
        this.bridgeSprite.setTexture('bridge_restored');
        this.scene.tweens.add({
          targets: this.bridgeSprite,
          scaleY: { from: 1.15, to: 1 },
          duration: 350,
          ease: 'Back.easeOut'
        });
      }

      // 2. Permanently disable the chasm barrier
      if (this.chasmBarrier && this.chasmBarrier.body) {
        this.chasmBarrier.body.enable = false;
      }
      if (this.chasmCollider) {
        this.chasmCollider.destroy();
        this.chasmCollider = null;
      }

      // 3. Enable seamless solid ground slabs so Ganesha can walk smoothly to Sanctum Terrace
      this.bridgeSlabs.forEach(slab => {
        if (slab && slab.body) {
          slab.body.enable = true;
          slab.refreshBody();
        }
      });

      // 4. Emit glorious golden & cyan celestial particles across the entire bridge span
      if (this.scene.shrineEmitter) {
        for (let bx = this.span.startX + 20; bx <= this.span.endX - 20; bx += 40) {
          this.scene.shrineEmitter.explode(14, bx, this.span.y - 12);
        }
      }

      // Camera shake for grand divine restoration effect
      if (this.scene.cameras && this.scene.cameras.main) {
        this.scene.cameras.main.shake(250, 0.005);
      }
    }
    return success;
  }

  resetPoint() {
    super.resetPoint();
    if (this.bridgeSprite) {
      this.bridgeSprite.setTexture('bridge_broken');
    }

    // Disable walkable bridge slabs
    this.bridgeSlabs.forEach(slab => {
      if (slab && slab.body) {
        slab.body.enable = false;
        slab.refreshBody();
      }
    });

    // Re-enable impassable chasm barrier
    if (this.chasmBarrier && this.chasmBarrier.body) {
      this.chasmBarrier.body.enable = true;
      this.chasmBarrier.body.setSize(64, 680);
      this.chasmBarrier.body.x = this.centerX - 32;
      this.chasmBarrier.body.y = 0;
    }
    if (!this.chasmCollider && this.scene.player && this.chasmBarrier) {
      this.chasmCollider = this.scene.physics.add.collider(this.scene.player, this.chasmBarrier);
    }

    if (this.bridgeWaterTimer) {
      this.bridgeWaterTimer.remove();
      this.bridgeWaterTimer = null;
    }
    this.createWaterGlow();
  }

  destroy(fromScene) {
    if (this.bridgeSprite) {
      this.bridgeSprite.destroy();
      this.bridgeSprite = null;
    }
    this.bridgeSlabs.forEach(slab => {
      if (slab) slab.destroy();
    });
    this.bridgeSlabs = [];

    if (this.chasmCollider) {
      this.chasmCollider.destroy();
      this.chasmCollider = null;
    }
    if (this.chasmBarrier) {
      this.chasmBarrier.destroy();
      this.chasmBarrier = null;
    }
    if (this.bridgeWaterTimer) {
      this.bridgeWaterTimer.remove();
      this.bridgeWaterTimer = null;
    }
    super.destroy(fromScene);
  }
}
