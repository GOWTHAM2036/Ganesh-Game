import Phaser from 'phaser';
import { SoundFX } from '../utils/SoundFX.js';

/**
 * TempleLamp Entity
 * An ornate carved stone temple lamp (diya) that can be ignited
 * by activating temple mechanisms like the Ancient Lever.
 */
export class TempleLamp extends Phaser.Physics.Arcade.Sprite {
  /**
   * @param {Phaser.Scene} scene 
   * @param {number} x 
   * @param {number} y 
   */
  constructor(scene, x, y) {
    super(scene, x, y, 'temple_lamp_unlit');

    scene.add.existing(this);
    scene.physics.add.existing(this, true); // Static body

    this.isLit = false;
    this.body.setSize(36, 68);
    this.body.setOffset(4, 8);
  }

  /**
   * Lights the holy flame of the lamp
   */
  ignite() {
    if (this.isLit) return;
    this.isLit = true;

    this.setTexture('temple_lamp_lit');
    SoundFX.playLampIgnite();

    // Sacred flame breathing animation
    this.flameTween = this.scene.tweens.add({
      targets: this,
      scaleY: 1.06,
      duration: 500,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    // Particle burst from holy flame
    if (this.scene.shrineEmitter) {
      this.scene.shrineEmitter.explode(15, this.x, this.y - 20);
    }
  }

  /**
   * Reset lamp on level restart
   */
  resetLamp() {
    this.scene.tweens.killTweensOf(this);
    this.isLit = false;
    if (this.flameTween) {
      this.flameTween.stop();
      this.flameTween = null;
    }
    this.setScale(1, 1);
    this.setAngle(0);
    this.setTexture('temple_lamp_unlit');
  }
}
