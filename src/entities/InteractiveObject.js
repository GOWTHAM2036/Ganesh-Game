import Phaser from 'phaser';

/**
 * InteractiveObject Base Class
 * Extensible foundation for all interactive temple mechanisms.
 * Supports distance checks, visual highlights, custom prompts, and trunk interactions.
 */
export class InteractiveObject extends Phaser.Physics.Arcade.Sprite {
  /**
   * @param {Phaser.Scene} scene 
   * @param {number} x 
   * @param {number} y 
   * @param {string} texture 
   * @param {Object} options 
   */
  constructor(scene, x, y, texture, options = {}) {
    super(scene, x, y, texture);

    scene.add.existing(this);
    scene.physics.add.existing(this, options.isStatic !== false);

    InteractiveObject.instanceCount = (InteractiveObject.instanceCount || 0) + 1;
    console.log('[INTERACTIONS] created:', InteractiveObject.instanceCount, this.constructor.name);

    this.interactionRange = options.interactionRange || 90;
    this.promptText = options.promptText || 'Press E to Interact';
    this.feedbackText = options.feedbackText || 'Activated!';
    this.isInteractable = options.isInteractable !== false;
    this.isHighlighted = false;

    this.baseScaleX = this.scaleX;
    this.baseScaleY = this.scaleY;

    // Optional highlight glow tween
    this.highlightTween = null;
  }

  /**
   * Checks if player is within range and object is interactable
   * @param {Phaser.GameObjects.Sprite} player 
   * @returns {boolean}
   */
  canInteract(player) {
    if (!this.isInteractable || !player || player.isDead) return false;
    const dist = Phaser.Math.Distance.Between(this.x, this.y, player.x, player.y);
    return dist <= this.interactionRange;
  }

  /**
   * Toggles visual highlight when player comes into interaction range
   * @param {boolean} active 
   */
  highlight(active) {
    if (this.isHighlighted === active) return;
    this.isHighlighted = active;

    if (active) {
      this.setTint(0xffea88);
      if (!this.highlightTween) {
        this.highlightTween = this.scene.tweens.add({
          targets: this,
          scaleX: this.baseScaleX * 1.05,
          scaleY: this.baseScaleY * 1.05,
          duration: 400,
          yoyo: true,
          repeat: -1,
          ease: 'Sine.easeInOut'
        });
      }
    } else {
      this.clearTint();
      if (this.highlightTween) {
        this.highlightTween.stop();
        this.highlightTween = null;
        this.setScale(this.baseScaleX, this.baseScaleY);
      }
    }
  }

  /**
   * Interaction handler to be implemented by subclasses
   * @param {Player} player 
   * @returns {Promise<boolean>|boolean}
   */
  interact(player) {
    console.warn(`interact() not implemented on ${this.constructor.name}`);
    return false;
  }

  /**
   * Position for floating UI prompt
   * @returns {{x: number, y: number}}
   */
  getPromptPosition() {
    return {
      x: this.x,
      y: this.y - (this.displayHeight * 0.6) - 16
    };
  }

  /**
   * Cleanup on destroy
   */
  destroy(fromScene) {
    if (this.highlightTween) {
      this.highlightTween.stop();
      this.highlightTween = null;
    }
    super.destroy(fromScene);
  }
}
