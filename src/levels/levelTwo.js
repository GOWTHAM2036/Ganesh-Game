/**
 * Level 2 Configuration: The Fallen Courtyard
 * "THE COURTYARD OF SILENT WATERS"
 * Features collapsed colonnades, silent waters, ancient gate mechanism,
 * and the Broken Bridge restoration crossing leading to the Sanctum Altar.
 */
export const LEVEL_TWO = {
  id: 2,
  name: "Fallen Courtyard",
  subtitle: "Courtyard of Silent Waters",
  worldWidth: 3480,
  spawn: { x: 160, y: 480 },
  theme: {
    backgroundPillars: [280, 680, 1100, 1550, 1980, 2420, 2850, 3250],
    pillarTint: 0x446677,
    skyTint: 0x99aacc,
    ruinsTint: 0x556b82
  },
  hazards: { fallBoundary: 820 },
  platforms: {
    ground: [
      [0, 680, 580],      // Section A: Courtyard Entrance
      [1400, 2080, 580],  // Section C: Courtyard Terrace
      [2540, 2740, 580],  // Section D: Pre-Bridge Landing Terrace
      [3060, 3480, 580]   // Section E: Courtyard Sanctum Terrace
    ],
    floating: [
      [840, 530],   // Section B: Chasm 1 Step 1
      [1240, 490],  // Section B: Chasm 1 Step 3
      [2220, 520]   // Section D: Chasm 2 Step 1
    ],
    pillars: [
      [1040, 460],  // Section B: Elevated Pillar Platform
      [2400, 480]   // Section D: Chasm 2 Pillar Platform
    ]
  },
  water: [
    [700, 1380, 660],
    [2100, 2520, 660],
    [2750, 3050, 660]
  ],
  collectibles: {
    modak: [
      [220, 535], [420, 535], [840, 460], [1240, 420],
      [1660, 535], [2400, 410], [3120, 535], [3260, 535]
    ],
    sacredStone: [
      [620, 510],   // Section A
      [1460, 510],  // Section B landing
      [2220, 450]   // Section D floating stepping stone
    ],
    lotus: [
      [1040, 380],  // Section B elevated pillar
      [3200, 490]   // Section E sanctum terrace
    ],
    templeCoin: [
      [280, 535], [480, 535], [760, 500], [940, 470], [1140, 450],
      [1560, 535], [1720, 535], [2150, 480], [2310, 470], [2640, 535]
    ],
    scripture: [
      [1840, 505]   // Section C Courtyard Terrace
    ]
  },
  interactions: {
    divineSwitch: { x: 1780, y: 568 },
    gate: { x: 1980, y: 520 }
  },
  restorations: [
    {
      id: "broken_bridge",
      type: "broken_bridge",
      name: "Broken Bridge",
      x: 2710,
      y: 580,
      requiredResource: "sacredStones",
      requiredAmount: 3,
      promptText: "Press E to Restore Bridge",
      feedbackText: "COURTYARD BRIDGE RESTORED! THE PASSAGE IS OPEN.",
      approachObjective: "Restore the Broken Bridge.",
      approachStage: "restore_bridge",
      restoredObjective: "Reach the Sacred Altar.",
      brokenTexture: "bridge_broken",
      restoredTexture: "bridge_restored",
      bridgeSpan: { startX: 2740, endX: 3060, y: 580 }
    }
  ],
  decorations: [
    { x: 100, y: 580, texture: 'pillar', originX: 0.5, originY: 1 },
    { x: 340, y: 580, texture: 'fallen_column', originX: 0.5, originY: 1 },
    { x: 520, y: 580, texture: 'broken_statue', originX: 0.5, originY: 1 },
    { x: 1500, y: 580, texture: 'broken_pillar', originX: 0.5, originY: 1 },
    { x: 1980, y: 460, texture: 'pillar', originX: 0.5, originY: 1 },
    { x: 2020, y: 580, texture: 'broken_statue', originX: 0.5, originY: 1 },
    { x: 2600, y: 580, texture: 'fallen_column', originX: 0.5, originY: 1 },
    { x: 3100, y: 580, texture: 'pillar', originX: 0.5, originY: 1 },
    { x: 3420, y: 580, texture: 'pillar', originX: 0.5, originY: 1 }
  ],
  goal: { x: 3320, y: 460 }
};
