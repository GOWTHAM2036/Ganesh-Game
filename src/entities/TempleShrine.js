import Phaser from 'phaser';

/**
 * TempleShrine Entity
 * Represents the Sacred Sanctum (Garbhagriha Altar) endpoint of the temple.
 * Includes radiant pulsing divine auras, floating trishul/flame visual effects,
 * and triggers the level completion event when Lord Ganesha arrives.
 */
export class TempleShrine extends Phaser.Physics.Arcade.Sprite {
  /**
   * @param {Phaser.Scene} scene 
   * @param {number} x 
   * @param {number} y 
   */
  constructor(scene, x, y) {
    super(scene, x, y, 'shrine_endpoint');

    scene.add.existing(this);
    scene.physics.add.existing(this, true); // Static body

    this.body.setSize(70, 110);
    this.body.setOffset(25, 45);

    this.isActivated = false;

    // Divine levitating glow effect
    scene.tweens.add({
      targets: this,
      y: y - 6,
      duration: 1800,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    // Ambient floating blessing particles
    if (scene.shrineEmitter) {
      scene.shrineEmitter.startFollow(this, 0, -20);
    }
  }

  /**
   * Called when level completion conditions are satisfied
   */
  triggerBlessing() {
    if (this.isActivated) return;
    this.isActivated = true;

    // Divine flash and blessing explosion
    this.scene.tweens.add({
      targets: this,
      scaleX: 1.25,
      scaleY: 1.25,
      duration: 350,
      yoyo: true,
      ease: 'Back.easeOut'
    });

    if (this.scene.shrineEmitter) {
      this.scene.shrineEmitter.explode(30, this.x, this.y - 20);
    }
  }

  /**
   * Called when player touches the altar
   */
  activate() {
    if (this.isActivated) return;
    this.scene.events.emit('shrine-reached', this);
  }

  resetShrine() {
    this.isActivated = false;
    this.setScale(1, 1);
  }
}
