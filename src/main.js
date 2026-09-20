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
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: GAME_CONFIG.CANVAS_WIDTH,
    height: GAME_CONFIG.CANVAS_HEIGHT,
    parent: 'game-container',
    resizeInterval: 100
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

// Ensure scale manager refreshes instantly on container or window resize / zoom change
let resizeTimeout = null;
const refreshScale = () => {
  if (game?.scale) {
    game.scale.getParentBounds();
    game.scale.refresh();
  }
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    if (game?.scale) {
      game.scale.getParentBounds();
      game.scale.refresh();
    }
  }, 50);
};

window.addEventListener('resize', refreshScale);

const containerEl = document.getElementById('game-container');
if (containerEl && typeof ResizeObserver !== 'undefined') {
  const resizeObserver = new ResizeObserver(refreshScale);
  resizeObserver.observe(containerEl);
}

// Expose game instance for QA & verification
window.__GANESHA_GAME__ = game;

export default game;
