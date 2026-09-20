import Phaser from 'phaser';
import { GAME_CONFIG } from './config.js';
import { BootScene } from './scenes/BootScene.js';
import { GameScene } from './scenes/GameScene.js';
import { UIScene } from './scenes/UIScene.js';

/**
 * Main game configuration and instantiation
 */
const config = {
  type: Phaser.AUTO,
  parent: 'game-container',
  width: GAME_CONFIG.CANVAS_WIDTH,
  height: GAME_CONFIG.CANVAS_HEIGHT,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: GAME_CONFIG.PHYSICS.GRAVITY },
      debug: GAME_CONFIG.PHYSICS.DEBUG
    }
  },
  render: {
    pixelArt: false,
    antialias: true
  },
  autoFocus: true,
  pauseOnBlur: false,
  fps: {
    min: 10,
    target: 60,
    forceSetTimeOut: true
  },
  scene: [GameScene, UIScene]
};

// Initialize the game instance
const game = new Phaser.Game(config);

// Expose game instance in development for easy debugging
if (import.meta.env.DEV) {
  window.__GANESHA_GAME__ = game;
}

export default game;
