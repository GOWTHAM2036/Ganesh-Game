import Phaser from 'phaser';
import { TextureGenerator } from '../utils/TextureGenerator.js';

/**
 * BootScene
 * Initializes textures, displays loading progress,
 * and boots the main gameplay scene and UI layer.
 */
export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  create() {
    // Generate procedural temple textures
    TextureGenerator.generateAll(this);

    // Transition immediately to GameScene
    this.scene.start('GameScene');
  }
}
