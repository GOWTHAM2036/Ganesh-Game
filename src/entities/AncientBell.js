import Phaser from 'phaser';
import { InteractiveObject } from './InteractiveObject.js';
import { SoundFX } from '../utils/SoundFX.js';

/**
 * AncientBell Entity
 * A sacred hanging bronze temple bell in the Inner Halls.
 * When struck with Lord Ganesha's divine trunk (or [E] key),
 * it resonates with rich harmonic overtones, swings with celestial energy,
 * lights up with golden aura, and contributes to awakening the inner temple mechanisms.
 */
export class AncientBell extends InteractiveObject {
  /**
   * @param {Phaser.Scene} scene 
   * @param {number} x 
   * @param {number} y 
   * @param {Object} config 
   */
  constructor(scene, x, y, config = {}) {
    super(scene, x, y, 'ancient_bell', {
      promptText: config.promptText || 'Press E to Ring Sacred Bell',
      feedbackText: config.feedbackText || 'THE SACRED BELL RESONATES!',
      interactionRange: config.interactionRange || 95,
      isStatic: true
    });

    this.id = config.id || 'bell_1';
    this.name = config.name || 'Sacred Temple Bell';
    this.isRung = false;
    this.config = config;

    // Anchor at top center for hanging bell swinging motion
    this.setOrigin(0.5, 0.1);
    this.body.setSize(48, 64);
    this.body.setOffset(6, 6);

    this.createIdleTween();
  }

  createIdleTween() {
    if (this.idleTween) {
      this.idleTween.stop();
    }
    this.idleTween = this.scene.tweens.add({
      targets: this,
      angle: { from: -1.5, to: 1.5 },
      duration: 2200,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });
  }

  /**
   * Floating prompt placement just beneath the bell
   */
  getPromptPosition() {
    return {
      x: this.x,
      y: this.y + 68
    };
  }

  /**
   * Interaction handler: Lord Ganesha rings the sacred bell
   * @param {Player} player 
   * @returns {boolean}
   */
  interact(player) {
    if (this.isRung) return false;
    this.isRung = true;
    this.isInteractable = false;
    this.highlight(false);

    if (this.idleTween) {
      this.idleTween.stop();
      this.idleTween = null;
    }

    // 1. Play synthesized rich temple bell tone
    SoundFX.playTempleBell();

    // 2. Texture swap to glowing active bell
    this.setTexture('ancient_bell_active');

    // 3. Resonant bell swinging animation
    this.scene.tweens.add({
      targets: this,
      angle: { from: -14, to: 14 },
      duration: 180,
      yoyo: true,
      repeat: 5,
      ease: 'Sine.easeInOut',
      onComplete: () => {
        this.setAngle(0);
        // Settle into gentle active shimmer
        if (this.scene && this.active) {
          this.scene.tweens.add({
            targets: this,
            scaleX: { from: 1, to: 1.06 },
            scaleY: { from: 1, to: 1.06 },
            duration: 1200,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
          });
        }
      }
    });

    // 4. Subtle temple tremor
    this.scene.cameras.main.shake(160, 0.003);

    // 5. Divine sparkle emission
    if (this.scene.ambientEmitter) {
      this.scene.ambientEmitter.explode(12, this.x, this.y + 36);
    }

    // 6. Notify scene of activation
    this.scene.events.emit('bell-rung', this);

    return true;
  }

  /**
   * Resets bell to un-rung state
   */
  resetBell() {
    this.scene.tweens.killTweensOf(this);
    this.isRung = false;
    this.isInteractable = true;
    this.setTexture('ancient_bell');
    this.setScale(1, 1);
    this.setAngle(0);
    this.clearTint();
    this.createIdleTween();
  }

  destroy(fromScene) {
    if (this.idleTween) {
      this.idleTween.stop();
      this.idleTween = null;
    }
    this.scene?.tweens?.killTweensOf(this);
    super.destroy(fromScene);
  }
}
