import Phaser from 'phaser';

/**
 * InteractionManager
 * Coordinates proximity detection between Ganesha and temple mechanisms,
 * renders the floating [E] interaction prompt, and triggers divine trunk actions.
 */
export class InteractionManager {
  /**
   * @param {Phaser.Scene} scene 
   */
  constructor(scene) {
    this.scene = scene;
    this.interactiveObjects = [];
    this.currentActiveObject = null;

    // Create floating world-space prompt above active mechanisms
    this.createPrompt();

    // Listen for [E] key for trunk interaction
    this.interactKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    this.interactKey.on('down', () => {
      this.handleInteractInput();
    });
  }

  /**
   * Builds the floating [E] prompt badge and label
   */
  createPrompt() {
    this.promptContainer = this.scene.add.container(0, 0);
    this.promptContainer.setDepth(100);
    this.promptContainer.setVisible(false);

    // Inner container for floating bob motion so promptContainer can follow world coordinates
    this.promptInner = this.scene.add.container(0, 0);
    this.promptContainer.add(this.promptInner);

    // Pill background
    this.promptBg = this.scene.add.graphics();
    this.promptInner.add(this.promptBg);

    // [E] Keycap badge
    this.keyBadge = this.scene.add.graphics();
    this.keyBadge.fillStyle(0xffaa22, 1);
    this.keyBadge.lineStyle(1.5, 0xffe680, 1);
    this.keyBadge.fillRoundedRect(-14, -12, 24, 24, 6);
    this.keyBadge.strokeRoundedRect(-14, -12, 24, 24, 6);

    this.keyText = this.scene.add.text(-2, 0, 'E', {
      fontFamily: "'Cinzel', sans-serif",
      fontSize: '13px',
      fontStyle: 'bold',
      color: '#1a0b00'
    }).setOrigin(0.5, 0.5);

    // Prompt action label
    this.promptLabel = this.scene.add.text(18, 0, 'Interact', {
      fontFamily: "'Cinzel', Georgia, serif",
      fontSize: '13px',
      fontStyle: '600',
      color: '#fff3db',
      stroke: '#000000',
      strokeThickness: 2
    }).setOrigin(0, 0.5);

    this.promptInner.add([this.keyBadge, this.keyText, this.promptLabel]);

    // Gentle floating bob animation on promptInner (keeps promptContainer at exact world coords)
    this.promptTween = this.scene.tweens.add({
      targets: this.promptInner,
      y: -5,
      duration: 650,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });
  }

  /**
   * Redraws the prompt background pill based on label width
   * @param {string} actionText 
   */
  updatePromptAppearance(actionText) {
    this.promptLabel.setText(actionText);

    const labelWidth = this.promptLabel.width;
    const totalWidth = labelWidth + 56;
    const halfWidth = totalWidth / 2;

    this.promptBg.clear();
    // Drop shadow
    this.promptBg.fillStyle(0x000000, 0.45);
    this.promptBg.fillRoundedRect(-halfWidth - 2, -16 + 2, totalWidth + 4, 32, 16);

    // Pill base
    this.promptBg.fillStyle(0x241208, 0.94);
    this.promptBg.lineStyle(2, 0xffc84a, 0.95);
    this.promptBg.fillRoundedRect(-halfWidth, -16, totalWidth, 32, 16);
    this.promptBg.strokeRoundedRect(-halfWidth, -16, totalWidth, 32, 16);

    // Reposition keycap & label relative to pill center
    this.keyBadge.setPosition(-halfWidth + 24, 0);
    this.keyText.setPosition(-halfWidth + 24, 0);
    this.promptLabel.setPosition(-halfWidth + 42, 0);
  }

  /**
   * Registers an interactive object
   * @param {InteractiveObject} obj 
   */
  register(obj) {
    if (obj && !this.interactiveObjects.includes(obj)) {
      this.interactiveObjects.push(obj);
    }
  }

  /**
   * Registers multiple interactive objects
   * @param {InteractiveObject[]} objects 
   */
  registerMultiple(objects) {
    objects.forEach(obj => this.register(obj));
  }

  /**
   * Updates proximity checks and floating prompt position each frame
   */
  update() {
    const player = this.scene.player;
    if (!player || player.isDead || player.isInteracting) {
      this.clearActive();
      return;
    }

    // Find closest interactable object
    let closest = null;
    let minDistance = Infinity;

    for (const obj of this.interactiveObjects) {
      if (!obj.active || !obj.isInteractable) continue;
      if (!obj.canInteract(player)) continue;

      const dist = Phaser.Math.Distance.Between(player.x, player.y, obj.x, obj.y);
      if (dist < minDistance) {
        minDistance = dist;
        closest = obj;
      }
    }

    if (closest) {
      if (this.currentActiveObject !== closest) {
        if (this.currentActiveObject) {
          this.currentActiveObject.highlight(false);
        }
        this.currentActiveObject = closest;
        this.currentActiveObject.highlight(true);

        const cleanPrompt = closest.promptText.replace(/^Press E to\s*/i, '');
        this.updatePromptAppearance(cleanPrompt);
      }

      // Keep prompt position aligned above the object (accounting for moving stones)
      const pos = closest.getPromptPosition();
      this.promptContainer.setPosition(pos.x, pos.y);
      this.promptContainer.setVisible(true);

      this.scene.events.emit('interaction-target-changed', closest);
    } else {
      this.clearActive();
    }
  }

  /**
   * Clears current active object and hides prompt
   */
  clearActive() {
    if (this.currentActiveObject) {
      this.currentActiveObject.highlight(false);
      this.currentActiveObject = null;
      this.scene.events.emit('interaction-target-changed', null);
    }
    if (this.promptContainer) {
      this.promptContainer.setVisible(false);
    }
  }

  /**
   * Handles E key press to trigger divine trunk interaction
   */
  handleInteractInput() {
    const player = this.scene.player;
    if (!player || player.isDead || player.isInteracting) return;
    if (!this.currentActiveObject || !this.currentActiveObject.canInteract(player)) return;

    const target = this.currentActiveObject;

    player.performTrunkInteraction(target, () => {
      const activated = target.interact(player);
      if (activated) {
        // Emit banner event to UIScene
        this.scene.events.emit('show-interaction-feedback', target.feedbackText);

        // If target is no longer interactable, clear active
        if (!target.isInteractable) {
          this.clearActive();
        } else {
          // Update prompt if it changed (e.g. Push Stone -> Pull Stone)
          const cleanPrompt = target.promptText.replace(/^Press E to\s*/i, '');
          this.updatePromptAppearance(cleanPrompt);
        }
      }
    });
  }

  /**
   * Reset interactive objects on level restart
   */
  reset() {
    this.clearActive();
    this.interactiveObjects.forEach(obj => {
      if (typeof obj.resetLever === 'function') obj.resetLever();
      if (typeof obj.resetStone === 'function') obj.resetStone();
      if (typeof obj.resetSwitch === 'function') obj.resetSwitch();
      if (typeof obj.resetBell === 'function') obj.resetBell();
      if (typeof obj.resetPoint === 'function') obj.resetPoint();
    });
  }

  /**
   * Clean up resources
   */
  destroy() {
    if (this.promptTween) {
      this.promptTween.stop();
      this.promptTween = null;
    }
    if (this.promptContainer) {
      this.promptContainer.destroy();
      this.promptContainer = null;
    }
    if (this.interactKey) {
      this.interactKey.removeAllListeners();
      if (this.scene?.input?.keyboard) {
        this.scene.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.E);
      }
      this.interactKey = null;
    }
    this.interactiveObjects = [];
  }
}
