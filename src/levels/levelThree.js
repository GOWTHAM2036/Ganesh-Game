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
  worldWidth: 2880,
  spawn: { x: 160, y: 480 },
  theme: {
    backgroundPillars: [240, 580, 940, 1340, 1700, 2060, 2420, 2760],
    pillarTint: 0x3a2216,
    skyTint: 0x241122,
    ruinsTint: 0x381f14
  },
  hazards: { fallBoundary: 820 },
  platforms: {
    ground: [
      [0, 640, 580],      // Section A: Inner Hall Entrance
      [840, 1340, 580],   // Section B: First Mechanism Terrace
      [1500, 2120, 580],  // Section C: The Silent Bells Chamber
      [2180, 2540, 580],  // Section D: Forgotten Shrine Terrace
      [2640, 2880, 580]   // Section E: Inner Sanctum Altar Terrace
    ],
    floating: [
      [740, 530],   // Section A-B Chasm Step
      [1420, 510],  // Section B-C Chasm Step
      [1920, 390],  // Section C: Bell 2 Floating Platform
      [2580, 520]   // Section D-E Chasm Step
    ],
    pillars: [
      [1080, 460],  // Section B: Elevated Pillar
      [1640, 440]   // Section C: Bell 1 Pillar Platform
    ]
  },
  collectibles: {
    modak: [
      [240, 535], [340, 535], [900, 535], [1200, 535],
      [1560, 535], [1780, 535], [2020, 535], [2700, 535]
    ],
    sacredStone: [
      [1080, 410],  // Section B elevated pillar
      [1780, 430],  // Section C between bells
      [2260, 510]   // Section D approaching forgotten shrine
    ],
    lotus: [
      [1640, 480],  // Section C below Bell 1
      [1920, 440]   // Section C below Bell 2
    ],
    templeCoin: [
      [280, 535], [480, 535], [740, 480], [980, 535], [1300, 535],
      [1420, 460], [1700, 535], [1840, 535], [2460, 535], [2840, 535]
    ],
    scripture: [
      [1640, 535]   // Section C Chamber Inscription
    ]
  },
  interactions: {
    lever: { x: 380, y: 580 },
    lamp: { x: 440, y: 510 },
    gate1: { x: 600, y: 520 },
    bells: [
      { id: 'bell_1', x: 1640, y: 360, name: 'First Sacred Bell' },
      { id: 'bell_2', x: 1920, y: 310, name: 'Second Sacred Bell' }
    ],
    gate2: { x: 2100, y: 520 }
  },
  restorations: [
    {
      id: "forgotten_shrine",
      type: "forgotten_shrine",
      name: "Forgotten Shrine",
      structureName: "shrine",
      x: 2360,
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
    { x: 100, y: 580, texture: 'pillar', originX: 0.5, originY: 1, tint: 0x3a2216 },
    { x: 440, y: 460, texture: 'inner_lamp', originX: 0.5, originY: 0.5 },
    { x: 600, y: 460, texture: 'pillar', originX: 0.5, originY: 1, tint: 0x3a2216 },
    { x: 920, y: 580, texture: 'inner_wall', originX: 0.5, originY: 1 },
    { x: 1220, y: 480, texture: 'inner_lamp', originX: 0.5, originY: 0.5 },
    { x: 1520, y: 580, texture: 'pillar', originX: 0.5, originY: 1, tint: 0x3a2216 },
    { x: 1780, y: 450, texture: 'inner_lamp', originX: 0.5, originY: 0.5 },
    { x: 2100, y: 460, texture: 'pillar', originX: 0.5, originY: 1, tint: 0x3a2216 },
    { x: 2500, y: 580, texture: 'inner_wall', originX: 0.5, originY: 1 },
    { x: 2680, y: 580, texture: 'pillar', originX: 0.5, originY: 1, tint: 0x3a2216 },
    { x: 2860, y: 580, texture: 'pillar', originX: 0.5, originY: 1, tint: 0x3a2216 }
  ],
  goal: { x: 2780, y: 460 }
};
