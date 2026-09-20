import Phaser from 'phaser';
import { SoundFX } from '../utils/SoundFX.js';

/**
 * TempleGate Entity
 * A heavy ancient carved temple portcullis / barrier.
 * When unlocked by a Divine Switch, it slides smoothly upward into the ceiling.
 */
export class TempleGate extends Phaser.Physics.Arcade.Sprite {
  /**
   * @param {Phaser.Scene} scene 
   * @param {number} x 
   * @param {number} y 
   */
  constructor(scene, x, y) {
    super(scene, x, y, 'temple_gate');

    scene.add.existing(this);
    scene.physics.add.existing(this, true); // Static collision body

    this.initialY = y;
    this.isOpen = false;
    this.body.setSize(48, 120);
  }

  /**
   * Slides the gate upward into the temple ceiling
   */
  openGate() {
    if (this.isOpen) return;
    this.isOpen = true;

    SoundFX.playGateOpen();

    // Dust particles as stone lifts
    if (this.scene.dustEmitter) {
      this.scene.dustEmitter.explode(15, this.x, this.y + 50);
    }

    // Slide up tween
    this.scene.tweens.add({
      targets: this,
      y: this.initialY - 110,
      alpha: 0.35,
      duration: 800,
      ease: 'Cubic.easeInOut',
      onUpdate: () => {
        this.body.y = this.y - this.body.halfHeight;
        this.refreshBody();
      },
      onComplete: () => {
        this.y = this.initialY - 110;
        this.setAlpha(0.35);
        // Disable collision once fully raised
        if (this.body) {
          this.body.enable = false;
          this.body.y = this.y - this.body.halfHeight;
          this.refreshBody();
        }
      }
    });
  }

  /**
   * Reset gate on level restart
   */
  resetGate() {
    this.scene.tweens.killTweensOf(this);
    this.isOpen = false;
    this.y = this.initialY;
    this.setScale(1, 1);
    this.setAngle(0);
    this.setAlpha(1);
    if (this.body) {
      this.body.enable = true;
      this.body.y = this.y - this.body.halfHeight;
      this.refreshBody();
    }
  }
}
