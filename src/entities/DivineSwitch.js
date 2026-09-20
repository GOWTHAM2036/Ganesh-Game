import { InteractiveObject } from './InteractiveObject.js';
import { SoundFX } from '../utils/SoundFX.js';

/**
 * DivineSwitch Entity
 * An ancient temple floor mechanism with a glowing sacred glyph.
 * When activated by Ganesha's trunk, the pressure mechanism depresses,
 * radiates celestial cyan and gold light, and unlocks a connected TempleGate.
 */
export class DivineSwitch extends InteractiveObject {
  /**
   * @param {Phaser.Scene} scene 
   * @param {number} x 
   * @param {number} y 
   * @param {TempleGate} connectedGate 
   */
  constructor(scene, x, y, connectedGate = null) {
    super(scene, x, y, 'divine_switch_inactive', {
      promptText: 'Press E to Press Switch',
      feedbackText: 'Divine Gate Unlocked!',
      interactionRange: 80
    });

    this.connectedGate = connectedGate;
    this.isActivated = false;
    this.body.setSize(50, 24);

    this.createAmbientGaze();
  }

  createAmbientGaze() {
    this.glowTimer = this.scene.time.addEvent({
      delay: 950,
      loop: true,
      callback: () => {
        if (!this.active || this.isActivated) return;
        if (this.scene && this.scene.ambientEmitter) {
          this.scene.ambientEmitter.explode(1, this.x + Phaser.Math.Between(-12, 12), this.y - 8);
        }
      }
    });
  }

  /**
   * Interaction handler
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

    SoundFX.playSwitchClick();

    // Visual state change with mechanical depress tween
    this.setTexture('divine_switch_active');
    this.scene.tweens.add({
      targets: this,
      scaleY: 0.85,
      duration: 100,
      yoyo: true,
      ease: 'Quad.easeOut'
    });

    // Radiant divine sparkle explosion
    if (this.scene.shrineEmitter) {
      this.scene.shrineEmitter.explode(25, this.x, this.y - 12);
    }

    // Trigger opening of connected gate
    if (this.connectedGate && typeof this.connectedGate.openGate === 'function') {
      this.scene.time.delayedCall(200, () => {
        this.connectedGate.openGate();
      });
    }

    this.scene.cameras.main.shake(180, 0.005);
    return true;
  }

  /**
   * Reset on level restart
   */
  resetSwitch() {
    this.scene.tweens.killTweensOf(this);
    if (this.glowTimer) {
      this.glowTimer.remove();
      this.glowTimer = null;
    }
    this.isActivated = false;
    this.isInteractable = true;
    this.setTexture('divine_switch_inactive');
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
