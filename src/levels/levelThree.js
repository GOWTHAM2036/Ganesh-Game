/**
 * Level 3 Configuration: The Inner Halls
 * "WHERE THE ANCIENT BELLS SLEEP"
 * Features dark temple corridors, the two sacred resonant bells mechanism puzzle,
 * dual ancient gates, the Forgotten Shrine restoration, and the Inner Sanctum Altar.
 */
export const LEVEL_THREE = {
  id: 3,
  name: "Inner Halls",
  subtitle: "Where the Ancient Bells Sleep",
  worldWidth: 2320,
  spawn: { x: 120, y: 480 },
  theme: {
    backgroundPillars: [200, 480, 780, 1100, 1420, 1720, 2020, 2240],
    pillarTint: 0x3a2216,
    skyTint: 0x241122,
    ruinsTint: 0x381f14
  },
  hazards: { fallBoundary: 820 },
  platforms: {
    ground: [
      [0, 480, 580],      // Section A: Inner Hall Entrance & Gate 1
      [680, 1080, 580],   // Section B: First Mechanism Terrace
      [1260, 1840, 580],  // Section C: The Sacred Bells Chamber & Gate 2
      [1980, 2320, 580]   // Section D: Forgotten Shrine & Sanctum Altar
    ],
    floating: [
      [580, 530],   // Section A-B Chasm Step
      [1170, 510],  // Section B-C Chasm Step
      [1600, 390],  // Section C: Bell 2 Floating Platform
      [1910, 520]   // Section C-D Chasm Step
    ],
    pillars: [
      [880, 460],   // Section B: Elevated Pillar
      [1380, 440]   // Section C: Bell 1 Pillar Platform
    ]
  },
  collectibles: {
    modak: [
      [200, 535], [360, 535], [740, 535], [1020, 535],
      [1320, 535], [1500, 535], [1780, 535], [2260, 535]
    ],
    sacredStone: [
      [880, 400],   // Section B: Elevated pillar
      [1520, 440],  // Section C: Chamber between bells
      [2020, 510]   // Section D: Approaching forgotten shrine
    ],
    lotus: [
      [1380, 480],  // Section C: Below Bell 1
      [1600, 440]   // Section C: Below Bell 2
    ],
    templeCoin: [
      [160, 535], [280, 535], [580, 470], [800, 535], [1170, 450],
      [1440, 535], [1660, 535], [1910, 460], [2060, 535], [2180, 535]
    ],
    scripture: [
      [1470, 535]   // Section C: Chamber Inscription Tablet
    ]
  },
  interactions: {
    lever: { x: 240, y: 580 },
    lamp: { x: 300, y: 510 },
    gate1: { x: 420, y: 520 },
    bells: [
      { id: 'bell_1', x: 1380, y: 360, name: 'First Sacred Bell' },
      { id: 'bell_2', x: 1600, y: 310, name: 'Second Sacred Bell' }
    ],
    gate2: { x: 1740, y: 520 }
  },
  restorations: [
    {
      id: "forgotten_shrine",
      type: "forgotten_shrine",
      name: "Forgotten Shrine",
      structureName: "shrine",
      x: 2110,
      y: 580,
      requiredResource: "sacredStones",
      requiredAmount: 3,
      promptText: "Press E to Restore Shrine",
      feedbackText: "FORGOTTEN SHRINE RESTORED! THE SACRED BELLS RESONATE.",
      approachObjective: "Restore the Forgotten Shrine.",
      approachStage: "reach_shrine",
      targetStage: "restore_shrine",
      restoredObjective: "Enter the Inner Sanctum Altar.",
      brokenTexture: "shrine_broken",
      restoredTexture: "shrine_restored",
      insufficientFeedback: "Collect 3 Sacred Stones to restore the Forgotten Shrine."
    }
  ],
  decorations: [
    { x: 80, y: 580, texture: 'pillar', originX: 0.5, originY: 1, tint: 0x3a2216 },
    { x: 300, y: 460, texture: 'inner_lamp', originX: 0.5, originY: 0.5 },
    { x: 740, y: 580, texture: 'inner_wall', originX: 0.5, originY: 1 },
    { x: 1040, y: 480, texture: 'inner_lamp', originX: 0.5, originY: 0.5 },
    { x: 1300, y: 580, texture: 'pillar', originX: 0.5, originY: 1, tint: 0x3a2216 },
    { x: 1540, y: 450, texture: 'inner_lamp', originX: 0.5, originY: 0.5 },
    { x: 2000, y: 580, texture: 'inner_wall', originX: 0.5, originY: 1 },
    { x: 2280, y: 580, texture: 'pillar', originX: 0.5, originY: 1, tint: 0x3a2216 }
  ],
  goal: { x: 2220, y: 460 }
};
