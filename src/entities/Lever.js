import { InteractiveObject } from './InteractiveObject.js';
import { SoundFX } from '../utils/SoundFX.js';

/**
 * Lever Entity
 * An ancient temple lever mechanism.
 * When pulled by Ganesha's divine trunk, it rotates downward, emits golden sparks,
 * plays a mechanical stone clunk, and activates connected temple elements (e.g. TempleLamp).
 */
export class Lever extends InteractiveObject {
  /**
   * @param {Phaser.Scene} scene 
   * @param {number} x 
   * @param {number} y 
   * @param {Object} targetObject Connected mechanism (e.g. TempleLamp)
   */
  constructor(scene, x, y, targetObject = null) {
    super(scene, x, y, 'lever_inactive', {
      promptText: 'Press E to Pull Lever',
      feedbackText: 'Ancient Lever Activated!',
      interactionRange: 85
    });

    this.targetObject = targetObject;
    this.isActivated = false;
    this.body.setSize(40, 48);

    this.createAmbientGaze();
  }

  createAmbientGaze() {
    this.glowTimer = this.scene.time.addEvent({
      delay: 900,
      loop: true,
      callback: () => {
        if (!this.active || this.isActivated) return;
        if (this.scene && this.scene.ambientEmitter) {
          this.scene.ambientEmitter.explode(1, this.x + Phaser.Math.Between(-8, 8), this.y - 12);
        }
      }
    });
  }

  /**
   * Called when Ganesha interacts with the lever using his trunk
   * @param {Player} player 
   */
  interact(player) {
    if (this.isActivated) return false;
    this.isActivated = true;
    this.isInteractable = false;
    this.highlight(false);

    if (this.glowTimer) {
      this.glowTimer.remove();
      this.glowTimer = null;
    }

    // Audio feedback
    SoundFX.playLeverClick();

    // Visual state change with downward lever pull tween
    this.setTexture('lever_active');
    this.scene.tweens.add({
      targets: this,
      scaleY: 0.9,
      duration: 120,
      yoyo: true,
      ease: 'Quad.easeOut'
    });

    // Golden sparks emission around mechanism
    if (this.scene.shrineEmitter) {
      this.scene.shrineEmitter.explode(20, this.x, this.y - 10);
    }

    // Trigger connected mechanism (e.g. light the nearby sacred lamp / open gate)
    if (this.targetObject) {
      this.scene.time.delayedCall(180, () => {
        const targets = Array.isArray(this.targetObject) ? this.targetObject : [this.targetObject];
        targets.forEach(t => {
          if (!t) return;
          if (typeof t.ignite === 'function') t.ignite();
          if (typeof t.openGate === 'function') t.openGate();
        });
      });
    }

    // Small camera shake for tactile stone mechanism response
    this.scene.cameras.main.shake(150, 0.005);

    return true;
  }

  /**
   * Reset on level restart
   */
  resetLever() {
    this.scene.tweens.killTweensOf(this);
    if (this.glowTimer) {
      this.glowTimer.remove();
      this.glowTimer = null;
    }
    this.isActivated = false;
    this.isInteractable = true;
    this.setTexture('lever_inactive');
    this.setScale(1, 1);
    this.setAngle(0);
    this.clearTint();
    this.createAmbientGaze();
  }

  destroy(fromScene) {
    if (this.glowTimer) {
      this.glowTimer.remove();
      this.glowTimer = null;
    }
    super.destroy(fromScene);
  }
}
