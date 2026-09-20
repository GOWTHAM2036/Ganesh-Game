import Phaser from 'phaser';
import { SoundFX } from '../utils/SoundFX.js';

/**
 * TempleGate Entity
 * A monumental ancient Indian Torana Gateway & sliding portcullis.
 * Framed by carved sandstone pillars, capped with a stepped shikhara arch extending to the ceiling,
 * housing a heavy bronze & iron portcullis that completely seals the portal when closed.
 * When unlocked (via lever, divine switch, or sacred bells), the portcullis smoothly lifts into
 * the overhead lintel recess, opening unobstructed passage for Lord Ganesha.
 */
export class TempleGate extends Phaser.Physics.Arcade.Sprite {
  /**
   * @param {Phaser.Scene} scene 
   * @param {number} x Gate center X coordinate
   * @param {number} y Ignored in favor of world ground alignment at y = 580
   */
  constructor(scene, x, y) {
    // Portal opening is between y = 440 and y = 580 (height 140px). Center is at y = 510.
    super(scene, x, 510, 'temple_gate');

    scene.add.existing(this);
    scene.physics.add.existing(this, true); // Static arcade collision body

    this.gateX = x;
    this.groundY = 580;
    this.portalTopY = 440;
    this.initialY = 510;
    this.isOpen = false;
    this.setDepth(1); // Sits behind the carved arch lintel (depth 3)

    // Establish static body and set full vertical coverage (y: 0 to 580)
    // to guarantee Ganesha can never jump over the closed gate under any circumstance.
    this.refreshBody();
    this.body.setSize(56, 580);
    this.body.x = x - 28;
    this.body.y = 0;

    // 1. Monumental Torana Archway Frame (112x460) with carved pillars and multi-tiered pediment
    this.archSprite = scene.add.image(x, this.groundY, 'temple_gate_arch')
      .setOrigin(0.5, 1)
      .setDepth(3);

    // 2. Permanent Overhead Stone Lintel & Shikhara Static Collider
    // Sits in scene.platforms from y = 0 down to y = 440 so overhead architecture is always solid.
    if (scene.platforms) {
      this.overheadArch = scene.platforms.create(x, 220, 'platform_stone').setOrigin(0.5, 0.5);
      this.overheadArch.setVisible(false);
      this.overheadArch.refreshBody();
      this.overheadArch.body.setSize(104, 440);
      this.overheadArch.body.x = x - 52;
      this.overheadArch.body.y = 0;
    }
  }

  /**
   * Smoothly lifts the portcullis upward into the overhead lintel recess,
   * clearing the portal passage for Lord Ganesha.
   */
  openGate() {
    if (this.isOpen) return;
    this.isOpen = true;

    SoundFX.playGateOpen();

    // Dust particles bursting from the base of the gate
    if (this.scene.dustEmitter) {
      this.scene.dustEmitter.explode(20, this.gateX, this.groundY - 5);
      this.scene.dustEmitter.explode(10, this.gateX - 20, this.groundY - 10);
      this.scene.dustEmitter.explode(10, this.gateX + 20, this.groundY - 10);
    }

    // Subtle stone-grinding screen shake
    if (this.scene.cameras && this.scene.cameras.main) {
      this.scene.cameras.main.shake(200, 0.004);
    }

    // Immediately disable passage collision so player is not blocked while opening
    if (this.body) {
      this.body.enable = false;
    }

    // Slide up tween retracting into the carved lintel slot
    this.scene.tweens.add({
      targets: this,
      y: this.initialY - 130, // lifts from 510 to 380, fully inside lintel
      alpha: 0.85,
      duration: 850,
      ease: 'Cubic.easeInOut',
      onComplete: () => {
        this.y = this.initialY - 130;
        this.setAlpha(0.85);
        if (this.body) {
          this.body.enable = false;
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
      this.body.setSize(56, 580);
      this.body.x = this.gateX - 28;
      this.body.y = 0;
    }
  }

  /**
   * Clean up child visual and physics objects
   */
  destroy(fromScene) {
    if (this.archSprite) {
      this.archSprite.destroy();
      this.archSprite = null;
    }
    if (this.overheadArch) {
      this.overheadArch.destroy();
      this.overheadArch = null;
    }
    super.destroy(fromScene);
  }
}
