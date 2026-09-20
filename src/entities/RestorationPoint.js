import { InteractiveObject } from './InteractiveObject.js';
import { SoundFX } from '../utils/SoundFX.js';

/**
 * RestorationPoint Entity
 * Represents an ancient ruined temple architectural element (e.g. broken entrance pillar)
 * that Lord Ganesha can restore using collected Sacred Stones and divine trunk energy.
 */
export class RestorationPoint extends InteractiveObject {
  /**
   * @param {Phaser.Scene} scene 
   * @param {number} x 
   * @param {number} y 
   * @param {Object} config 
   */
  constructor(scene, x, y, config = {}) {
    const brokenTex = config.brokenTexture || 'restoration_pillar_broken';
    super(scene, x, y, brokenTex, {
      promptText: config.promptText || 'Press E to Restore Temple',
      feedbackText: config.feedbackText || 'TEMPLE RESTORED! THE SACRED ENERGY RETURNS.',
      interactionRange: config.interactionRange || 100,
      isStatic: true
    });

    this.id = config.id || 'entrance_pillar';
    this.type = config.type || 'broken_pillar';
    this.name = config.name || 'Broken Entrance Pillar';
    this.structureName = config.structureName || (config.name ? config.name.toLowerCase() : 'pillar');
    this.requiredResource = config.requiredResource || 'sacredStones';
    this.requiredAmount = config.requiredAmount || 3;
    this.isRestored = false;
    this.config = config;

    this.brokenTexture = brokenTex;
    this.restoredTexture = config.restoredTexture || 'restoration_pillar_restored';
    this.approachObjective = config.approachObjective || 'Restore the Broken Entrance Pillar.';
    this.approachStage = config.approachStage || 'reach_entrance';
    this.targetStage = config.targetStage || 'restore_pillar';
    this.restoredObjective = config.restoredObjective || 'Reach the Sacred Altar.';

    // Anchor bottom of object firmly to ground level
    this.setOrigin(config.originX !== undefined ? config.originX : 0.5, config.originY !== undefined ? config.originY : 1);
    this.body.setSize(config.bodyWidth || 60, config.bodyHeight || 200);
    if (config.bodyOffset) {
      this.body.setOffset(config.bodyOffset.x, config.bodyOffset.y);
    } else {
      this.body.setOffset(10, 40);
    }

    // Continuous divine ambient particles around broken mechanism to signal interactivity
    this.createAmbientGaze();
  }

  createAmbientGaze() {
    // Subtle golden particles rising near broken shaft
    this.glowTimer = this.scene.time.addEvent({
      delay: 700,
      loop: true,
      callback: () => {
        if (!this.active || this.isRestored) return;
        if (this.scene && this.scene.ambientEmitter) {
          this.scene.ambientEmitter.explode(1, this.x + Phaser.Math.Between(-15, 15), this.y - Phaser.Math.Between(40, 100));
        }
      }
    });
  }

  /**
   * Highlights mechanism and updates progression objective when player arrives
   * @param {boolean} active
   */
  highlight(active) {
    super.highlight(active);
    if (active && !this.isRestored) {
      const uiScene = this.scene?.scene?.get('UIScene');
      if (uiScene && (uiScene.currentObjectiveStage === this.approachStage || uiScene.currentObjectiveStage === 'reach_entrance' || uiScene.currentObjectiveStage === 'reach_bridge' || uiScene.currentObjectiveStage === 'reach_shrine' || uiScene.currentObjectiveStage === 'activate_mechanisms')) {
        uiScene.currentObjectiveStage = this.targetStage;
        if (uiScene.updateObjective) {
          uiScene.updateObjective(this.approachObjective);
        }
      }
    }
  }

  /**
   * Position for floating [E] prompt badge above the restoration point
   * @returns {{x: number, y: number}}
   */
  getPromptPosition() {
    if (this.config.promptOffset) {
      return {
        x: this.x + this.config.promptOffset.x,
        y: this.y + this.config.promptOffset.y
      };
    }
    const topY = this.isRestored ? (this.y - 240) : (this.y - 145);
    return {
      x: this.x,
      y: topY - 24
    };
  }

  /**
   * Proximity interaction: Ganesha uses divine trunk to restore the broken structure
   * @param {Player} player 
   * @returns {boolean}
   */
  interact(player) {
    if (this.isRestored) return false;

    const gameState = this.scene.gameState;
    const currentResource = gameState ? gameState[this.requiredResource] : 0;

    // If player does not possess enough Sacred Stones, block restoration with guidance
    if (currentResource < this.requiredAmount) {
      this.scene.events.emit(
        'show-interaction-feedback',
        this.config.insufficientFeedback || `Collect ${this.requiredAmount} Sacred Stones to restore this ${this.structureName}.`
      );
      // Small stone rejection rumble
      this.scene.cameras.main.shake(120, 0.003);
      return false;
    }

    // Player has sufficient Sacred Stones — execute restoration!
    this.isRestored = true;
    this.isInteractable = false;
    this.highlight(false);

    // Stop ambient beacon
    if (this.glowTimer) {
      this.glowTimer.remove();
      this.glowTimer = null;
    }

    // 1. Deduct required Sacred Stones exactly once
    gameState.deductResource(this.requiredResource, this.requiredAmount);
    gameState.setRestorationComplete();

    // 2. Play divine fanfare audio
    SoundFX.playRestorationFanfare();

    // 3. Tactile and visual transformation feedback
    this.scene.cameras.main.shake(300, 0.007);

    // Burst golden particles from trunk to restoration point
    if (this.scene.shrineEmitter) {
      this.scene.shrineEmitter.explode(35, this.x, this.y - 120);
      this.scene.shrineEmitter.explode(20, this.x, this.y - 40);
    }
    if (this.scene.ambientEmitter) {
      this.scene.ambientEmitter.explode(25, this.x, this.y - 160);
    }

    if (player && typeof player.celebrate === 'function') {
      player.celebrate();
    }

    // 4. Smooth transformation animation
    this.setTexture(this.restoredTexture);
    this.setOrigin(this.config.originX !== undefined ? this.config.originX : 0.5, this.config.originY !== undefined ? this.config.originY : 1);

    this.scene.tweens.add({
      targets: this,
      scaleX: 1.15,
      scaleY: 1.05,
      duration: 200,
      yoyo: true,
      ease: 'Back.easeOut',
      onComplete: () => {
        // Continuous holy flame breathing tween
        this.restoredGlowTween = this.scene.tweens.add({
          targets: this,
          alpha: { from: 0.95, to: 1 },
          duration: 900,
          yoyo: true,
          repeat: -1,
          ease: 'Sine.easeInOut'
        });
      }
    });

    if (typeof this.config.onRestored === 'function') {
      this.config.onRestored(this);
    }

    // 5. Update centralized game state, HUD, feedback banner, and level objective
    this.scene.events.emit('resources-changed', gameState.snapshot());
    this.scene.events.emit(
      'show-interaction-feedback',
      this.feedbackText
    );

    const uiScene = this.scene.scene.get('UIScene');
    if (uiScene) {
      uiScene.currentObjectiveStage = 'reach_altar';
      if (uiScene.updateObjective) {
        uiScene.updateObjective(this.restoredObjective);
      }
    }

    return true;
  }

  /**
   * Resets restoration point to broken state on level restart
   */
  resetPoint() {
    this.isRestored = false;
    this.isInteractable = true;
    this.setTexture(this.brokenTexture);
    this.setOrigin(this.config.originX !== undefined ? this.config.originX : 0.5, this.config.originY !== undefined ? this.config.originY : 1);
    this.setScale(1, 1);
    this.clearTint();
    this.setAlpha(1);

    if (this.restoredGlowTween) {
      this.restoredGlowTween.stop();
      this.restoredGlowTween = null;
    }
    if (this.glowTimer) {
      this.glowTimer.remove();
      this.glowTimer = null;
    }
    if (typeof this.config.onReset === 'function') {
      this.config.onReset(this);
    }
    this.createAmbientGaze();
  }

  destroy(fromScene) {
    if (this.restoredGlowTween) {
      this.restoredGlowTween.stop();
      this.restoredGlowTween = null;
    }
    if (this.glowTimer) {
      this.glowTimer.remove();
      this.glowTimer = null;
    }
    super.destroy(fromScene);
  }
}
