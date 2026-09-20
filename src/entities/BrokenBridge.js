import Phaser from 'phaser';
import { RestorationPoint } from './RestorationPoint.js';

/**
 * BrokenBridge Entity
 * An ancient carved stone and timber bridge spanning the sunken courtyard waters.
 * When in ruins, the center span is missing and impassable.
 * When restored by Lord Ganesha using Sacred Stones and his divine trunk,
 * it visually repairs and activates a solid stone platform so Ganesha can cross to the Altar.
 */
export class BrokenBridge extends RestorationPoint {
  /**
   * @param {Phaser.Scene} scene 
   * @param {number} x 
   * @param {number} y 
   * @param {Object} config 
   */
  constructor(scene, x, y, config = {}) {
    super(scene, x, y, {
      id: config.id || 'broken_bridge',
      type: 'broken_bridge',
      name: config.name || 'Broken Bridge',
      structureName: 'bridge',
      promptText: config.promptText || 'Press E to Restore Bridge',
      feedbackText: config.feedbackText || 'COURTYARD BRIDGE RESTORED! THE PASSAGE IS OPEN.',
      interactionRange: config.interactionRange || 110,
      requiredResource: config.requiredResource || 'sacredStones',
      requiredAmount: config.requiredAmount || 3,
      approachObjective: config.approachObjective || 'Restore the Broken Bridge.',
      approachStage: 'reach_bridge',
      targetStage: 'restore_bridge',
      restoredObjective: config.restoredObjective || 'Reach the Sacred Altar.',
      brokenTexture: 'bridge_broken',
      restoredTexture: 'bridge_restored',
      originX: 0.5,
      originY: 1,
      bodyWidth: 80,
      bodyHeight: 70,
      promptOffset: { x: 0, y: -90 },
      ...config
    });

    const span = config.bridgeSpan || { startX: 2740, endX: 3060, y: 580 };
    this.span = span;
    const spanWidth = span.endX - span.startX;
    const centerX = span.startX + spanWidth / 2;

    // Visual bridge spanning across the sunken chasm
    this.bridgeSprite = scene.add.image(centerX, span.y - 12, 'bridge_broken').setOrigin(0.5, 0.5);
    this.bridgeSprite.setDepth(1);

    // Platform collider across bridge span
    this.bridgePlatform = scene.platforms.create(centerX, span.y, 'platform_stone').setOrigin(0.5, 0);
    this.bridgePlatform.body.setSize(spanWidth, 24);
    this.bridgePlatform.body.setOffset(0, 0);
    this.bridgePlatform.setVisible(false);
    this.bridgePlatform.body.enable = false; // Initially impassable
    this.bridgePlatform.refreshBody();

    // Subtle water reflection particles near broken gap
    this.createWaterGlow();
  }

  createWaterGlow() {
    this.bridgeWaterTimer = this.scene.time.addEvent({
      delay: 800,
      loop: true,
      callback: () => {
        if (!this.active || this.isRestored) return;
        if (this.scene && this.scene.ambientEmitter) {
          this.scene.ambientEmitter.explode(
            2,
            this.span.startX + 160 + Phaser.Math.Between(-80, 80),
            this.span.y + 40
          );
        }
      }
    });
  }

  interact(player) {
    const success = super.interact(player);
    if (success) {
      // 1. Visually restore the bridge
      if (this.bridgeSprite) {
        this.bridgeSprite.setTexture('bridge_restored');
        this.scene.tweens.add({
          targets: this.bridgeSprite,
          scaleY: { from: 1.15, to: 1 },
          duration: 350,
          ease: 'Back.easeOut'
        });
      }

      // 2. Enable solid platform so player can cross
      if (this.bridgePlatform) {
        this.bridgePlatform.body.enable = true;
        this.bridgePlatform.refreshBody();
      }

      // 3. Emit golden / cyan celestial particles across the bridge span
      if (this.scene.shrineEmitter) {
        for (let bx = this.span.startX + 30; bx <= this.span.endX - 30; bx += 45) {
          this.scene.shrineEmitter.explode(12, bx, this.span.y - 12);
        }
      }
    }
    return success;
  }

  resetPoint() {
    super.resetPoint();
    if (this.bridgeSprite) {
      this.bridgeSprite.setTexture('bridge_broken');
    }
    if (this.bridgePlatform) {
      this.bridgePlatform.body.enable = false;
      this.bridgePlatform.refreshBody();
    }
    if (this.bridgeWaterTimer) {
      this.bridgeWaterTimer.remove();
      this.bridgeWaterTimer = null;
    }
    this.createWaterGlow();
  }

  destroy(fromScene) {
    if (this.bridgeSprite) {
      this.bridgeSprite.destroy();
      this.bridgeSprite = null;
    }
    if (this.bridgePlatform) {
      this.bridgePlatform.destroy();
      this.bridgePlatform = null;
    }
    if (this.bridgeWaterTimer) {
      this.bridgeWaterTimer.remove();
      this.bridgeWaterTimer = null;
    }
    super.destroy(fromScene);
  }
}
