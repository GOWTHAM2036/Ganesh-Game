/**
 * Game Configuration & Constants
 * Modular and easily tweakable for tuning physics, dimensions, and game rules.
 */
export const GAME_CONFIG = {
  CANVAS_WIDTH: 1280,
  CANVAS_HEIGHT: 720,
  
  // Level World Bounds (Spanning ~3 screens for side-scrolling platformer exploration)
  WORLD_WIDTH: 3840,
  WORLD_HEIGHT: 720,

  // Physics settings
  PHYSICS: {
    GRAVITY: 980,
    DEBUG: false
  },

  // Player movement settings
  PLAYER: {
    MOVE_SPEED: 330,
    JUMP_VELOCITY: -640,
    AIR_CONTROL_ACCEL: 900,
    DECELERATION: 1200,
    WIDTH: 44,
    HEIGHT: 60
  },

  // Color Palette - Indian Ancient Temple Motif
  PALETTE: {
    SKY_TOP: 0x1d102b,        // Deep spiritual twilight purple
    SKY_BOTTOM: 0xa84e2a,     // Warm dusk saffron/crimson
    SANDSTONE_LIGHT: 0xd99b59,// Sunlit carved sandstone
    SANDSTONE_BASE: 0x9e5f30, // Weathered temple stone
    SANDSTONE_DARK: 0x5a341b, // Deep stone shadow
    GOLD_ACCENT: 0xffcc33,    // Sacred temple gold
    DIVINE_CYAN: 0x33e3ff,    // Spiritual energy resonance
    SAFFRON: 0xff7b25         // Holy saffron robe
  }
};
