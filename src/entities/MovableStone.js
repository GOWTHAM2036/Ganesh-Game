import { InteractiveObject } from './InteractiveObject.js';
import { SoundFX } from '../utils/SoundFX.js';

/**
 * MovableStone Entity
 * A heavy ancient carved temple block that Ganesha can push with his divine trunk.
 * Moves smoothly with stone grinding audio and dust particles, and serves as a solid
 * platform that can reveal secret wall markings or provide a new stepping path.
 */
export class MovableStone extends InteractiveObject {
  /**
   * @param {Phaser.Scene} scene 
   * @param {number} x 
   * @param {number} y 
   * @param {Object} options 
   */
  constructor(scene, x, y, options = {}) {
    super(scene, x, y, 'movable_stone', {
      promptText: 'Press E to Push Stone',
      feedbackText: 'Sacred Stone Moved!',
      interactionRange: 95,
      isStatic: true
    });

    this.initialX = x;
    this.initialY = y;
    this.moveDistance = options.moveDistance || 96;
    this.minX = options.minX || (x - 20);
    this.maxX = options.maxX || (x + this.moveDistance);
    this.isMoving = false;
    this.isShifted = false;

    // Solid collision box
    this.body.setSize(64, 64);
    this.body.setOffset(0, 0);

    // Decorative alcove reveal indicator (created behind the stone)
    this.createHiddenAlcove(scene, x, y);
  }

  /**
   * Spawns an ancient carved lotus relief on the back wall, revealed when stone slides
   */
  createHiddenAlcove(scene, x, y) {
    this.alcoveGlow = scene.add.text(x + (this.moveDistance * 0.5), y, '✤  ॐ  ✤', {
      fontFamily: "'Cinzel', Georgia, serif",
      fontSize: '18px',
      color: '#ffc866',
      align: 'center'
    }).setOrigin(0.5, 0.5).setAlpha(0.7).setDepth(0);
  }

  /**
   * Handles Ganesha pushing the stone with his trunk
   * @param {Player} player 
   */
  interact(player) {
    if (this.isMoving) return false;
    this.isMoving = true;

    // Determine direction based on player relative position or toggle state
    let targetX;
    if (!this.isShifted) {
      targetX = this.initialX + this.moveDistance;
      this.isShifted = true;
    } else {
      targetX = this.initialX;
      this.isShifted = false;
    }

    // Sound and camera friction response
    SoundFX.playStoneMove();
    this.scene.cameras.main.shake(300, 0.006);

    // Continuous dust emission while stone moves
    this.dustTimer = this.scene.time.addEvent({
      delay: 60,
      repeat: 8,
      callback: () => {
        if (this.scene.dustEmitter) {
          this.scene.dustEmitter.explode(4, this.x + (this.isShifted ? -20 : 20), this.y + 28);
        }
      }
    });

    // Smooth physics-synchronized slide tween
    this.scene.tweens.add({
      targets: this,
      x: targetX,
      duration: 500,
      ease: 'Quad.easeInOut',
      onUpdate: () => {
        this.body.x = this.x - this.body.halfWidth;
        this.refreshBody();
      },
      onComplete: () => {
        this.isMoving = false;
        this.refreshBody();
        // Update prompt text for subsequent interactions
        this.promptText = this.isShifted ? 'Press E to Pull Stone' : 'Press E to Push Stone';
      }
    });

    return true;
  }

  /**
   * Reset on level restart
   */
  resetStone() {
    this.scene.tweens.killTweensOf(this);
    if (this.dustTimer) {
      this.dustTimer.remove(false);
      this.dustTimer = null;
    }
    this.isMoving = false;
    this.isShifted = false;
    this.setPosition(this.initialX, this.initialY);
    this.setScale(1, 1);
    this.setAngle(0);
    this.clearTint();
    this.refreshBody();
    this.promptText = 'Press E to Push Stone';
  }

  destroy(fromScene) {
    this.scene?.tweens?.killTweensOf(this);
    if (this.dustTimer) {
      this.dustTimer.remove(false);
      this.dustTimer = null;
    }
    if (this.alcoveGlow) {
      this.alcoveGlow.destroy();
      this.alcoveGlow = null;
    }
    super.destroy(fromScene);
  }
}
