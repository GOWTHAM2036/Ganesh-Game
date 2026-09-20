/**
 * Centralized Typography Configuration for Ganesha's Broken Temple
 * Defines consistent font families, scales, weights, and high-contrast color hierarchies
 * inspired by ancient Indian temple inscriptions, epic fantasy adventures, and clean UI standards.
 */
export const TYPOGRAPHY = {
  FONTS: {
    // Majestic Indian temple stone inscription serif
    TITLE_DECORATIVE: "'Cinzel Decorative', 'Cinzel', Georgia, serif",
    // Clean, readable classical serif for headers and lore cards
    SERIF_HEADER: "'Cinzel', Georgia, serif",
    // Highly legible geometric sans-serif for HUD, numbers, and objectives
    HUD_BODY: "'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    // Bold action button font
    BUTTON: "'Cinzel', 'Outfit', sans-serif"
  },

  COLORS: {
    GOLD_BRIGHT: '#ffd066',
    GOLD_MID: '#ffc966',
    GOLD_DEEP: '#e69500',
    GOLD_LIGHT: '#fff0cc',
    GOLD_MUTED: '#d4a373',
    TERRACOTTA: '#944a14',
    BRONZE_DARK: '#4a2410',
    STROKE_DARK: '#140802',
    WHITE: '#ffffff',
    TEXT_LORE: '#f5deb3',
    TEXT_SUMMARY: '#ffe099',
    CRIMSON_ALERT: '#ff6b52',
    CRIMSON_DEEP: '#6b2416'
  },

  STYLES: {
    LEVEL_HEADER: {
      fontFamily: "'Cinzel Decorative', 'Cinzel', Georgia, serif",
      fontSize: '16px',
      fontStyle: 'bold',
      color: '#ffd066',
      stroke: '#140802',
      strokeThickness: 3
    },
    LEVEL_SUBTITLE: {
      fontFamily: "'Cinzel', Georgia, serif",
      fontSize: '11px',
      fontStyle: '600',
      color: '#d4a373',
      letterSpacing: 1
    },
    OBJECTIVE_TEXT: {
      fontFamily: "'Outfit', -apple-system, sans-serif",
      fontSize: '12px',
      fontStyle: '600',
      color: '#fff0cc',
      stroke: '#140802',
      strokeThickness: 2
    },
    HUD_LABEL: {
      fontFamily: "'Outfit', -apple-system, sans-serif",
      fontSize: '11px',
      fontStyle: 'bold',
      color: '#ffd280'
    },
    HUD_VALUE: {
      fontFamily: "'Outfit', -apple-system, sans-serif",
      fontSize: '12.5px',
      fontStyle: '600',
      color: '#ffffff',
      stroke: '#140802',
      strokeThickness: 2
    },
    HUD_BADGE_TEXT: {
      fontFamily: "'Outfit', -apple-system, sans-serif",
      fontSize: '12px',
      fontStyle: '600',
      color: '#ffe099'
    },
    RESTART_BUTTON: {
      fontFamily: "'Outfit', -apple-system, sans-serif",
      fontSize: '11px',
      fontStyle: 'bold',
      color: '#ffd280'
    },
    NOTIFICATION_BANNER: {
      fontFamily: "'Cinzel', Georgia, serif",
      fontSize: '13.5px',
      fontStyle: 'bold',
      color: '#ffd066',
      stroke: '#140802',
      strokeThickness: 3,
      align: 'center'
    },
    CARD_TITLE: {
      fontFamily: "'Cinzel', Georgia, serif",
      fontSize: '26px',
      fontStyle: 'bold',
      color: '#ffd066',
      stroke: '#140802',
      strokeThickness: 4,
      letterSpacing: 1.5
    },
    CARD_SUBTITLE: {
      fontFamily: "'Cinzel', Georgia, serif",
      fontSize: '13px',
      fontStyle: 'bold',
      color: '#ffb347',
      letterSpacing: 2
    },
    CARD_LORE: {
      fontFamily: "'Cinzel', Georgia, serif",
      fontSize: '13px',
      color: '#f5deb3',
      align: 'center',
      lineSpacing: 6
    },
    CARD_SUMMARY: {
      fontFamily: "'Outfit', -apple-system, sans-serif",
      fontSize: '13px',
      fontStyle: '600',
      color: '#ffe099',
      align: 'center',
      lineSpacing: 6
    },
    CARD_BUTTON: {
      fontFamily: "'Cinzel', 'Outfit', sans-serif",
      fontSize: '11.5px',
      fontStyle: 'bold',
      color: '#ffffff'
    },
    GAME_OVER_TITLE: {
      fontFamily: "'Cinzel', Georgia, serif",
      fontSize: '28px',
      fontStyle: 'bold',
      color: '#ff6b52',
      stroke: '#140802',
      strokeThickness: 4,
      letterSpacing: 2
    },
    GAME_OVER_SUBTITLE: {
      fontFamily: "'Cinzel', Georgia, serif",
      fontSize: '13.5px',
      fontStyle: 'bold',
      color: '#d48866',
      letterSpacing: 1
    },
    GAME_OVER_INFO: {
      fontFamily: "'Outfit', -apple-system, sans-serif",
      fontSize: '13px',
      fontStyle: '600',
      color: '#ff8a7a'
    }
  }
};
