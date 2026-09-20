import Phaser from 'phaser';

/**
 * A lightweight, reusable pickup. Visual and reward differences are supplied
 * by CollectibleManager rather than duplicated across individual item classes.
 */
export class Collectible extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, definition) {
    super(scene, x, y, definition.texture);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.definition = definition;
    this.isCollected = false;
    this.originalX = x;
    this.originalY = y;

    // Rigidly lock physics so gravity, velocity, or collisions never move the collectible
    this.body.setAllowGravity(false);
    this.body.setImmovable(true);
    this.body.setVelocity(0, 0);
    this.body.moves = false;
    this.body.setCircle(Math.min(this.width, this.height) * 0.32);

    this.playIdleAnimation();
  }

  playIdleAnimation() {
    const { idle = {} } = this.definition;
    const baseY = this.originalY;
    this.idleTween = this.scene.tweens.add({
      targets: this,
      y: baseY - (idle.floatDistance || 7),
      angle: idle.angle || 0,
      scaleX: idle.scale || 1,
      scaleY: idle.scale || 1,
      duration: idle.duration || 1300,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });
  }

  collect(player, onComplete) {
    if (this.isCollected) return;
    this.isCollected = true;
    this.body.enable = false;

    if (this.idleTween) {
      this.idleTween.stop();
      this.idleTween = null;
    }
    this.scene.tweens.killTweensOf(this);
    this.scene.tweens.add({
      targets: this,
      x: Phaser.Math.Linear(this.x, player.x, 0.28),
      y: this.y - 28,
      alpha: 0,
      scaleX: 1.45,
      scaleY: 1.45,
      duration: 260,
      ease: 'Quad.easeOut',
      onComplete: () => {
        if (typeof onComplete === 'function') {
          onComplete();
        }
        this.destroy();
      }
    });
  }

  destroy(fromScene) {
    if (this.idleTween) {
      this.idleTween.stop();
      this.idleTween = null;
    }
    super.destroy(fromScene);
  }
}
