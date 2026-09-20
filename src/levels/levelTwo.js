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
  worldWidth: 2600,
  spawn: { x: 120, y: 480 },
  theme: {
    backgroundPillars: [220, 540, 880, 1200, 1540, 1860, 2180, 2460],
    pillarTint: 0x446677,
    skyTint: 0x99aacc,
    ruinsTint: 0x556b82
  },
  hazards: { fallBoundary: 820 },
  platforms: {
    ground: [
      [0, 480, 580],      // Section A: Courtyard Entrance
      [920, 1420, 580],   // Section C: Courtyard Terrace & Torana Gate
      [1800, 1980, 580],  // Section D: Pre-Bridge Landing Terrace
      [2300, 2600, 580]   // Section E: Courtyard Sanctum Terrace
    ],
    floating: [
      [580, 520],   // Section B: Chasm 1 Step 1
      [820, 500],   // Section B: Chasm 1 Step 2
      [1540, 510]   // Section D: Chasm 2 Step 1
    ],
    pillars: [
      [700, 460],   // Section B: Elevated Pillar Platform
      [1680, 470]   // Section D: Chasm 2 Pillar Platform
    ]
  },
  water: [
    [490, 910, 660],
    [1430, 1790, 660],
    [1990, 2290, 660]
  ],
  collectibles: {
    modak: [
      [220, 535], [380, 535], [820, 440], [1080, 535],
      [1320, 535], [1680, 350], [2360, 535], [2520, 535]
    ],
    sacredStone: [
      [440, 510],   // Section A: Entrance stone
      [980, 510],   // Section C: Courtyard Terrace landing
      [1680, 400]   // Section D: Elevated pillar before bridge
    ],
    lotus: [
      [700, 380],   // Section B: Elevated pillar
      [2420, 490]   // Section E: Sanctum terrace
    ],
    templeCoin: [
      [180, 535], [300, 535], [580, 460], [700, 330],
      [1020, 535], [1200, 535], [1540, 450], [1860, 535], [1910, 535], [2400, 535]
    ],
    scripture: [
      [1360, 505]   // Section C: Courtyard Terrace Inscription
    ]
  },
  interactions: {
    divineSwitch: { x: 1140, y: 568 },
    gate: { x: 1280, y: 520 }
  },
  restorations: [
    {
      id: "broken_bridge",
      type: "broken_bridge",
      name: "Broken Bridge",
      x: 1950,
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
      bridgeSpan: { startX: 1980, endX: 2300, y: 580 }
    }
  ],
  decorations: [
    { x: 80, y: 580, texture: 'pillar', originX: 0.5, originY: 1 },
    { x: 260, y: 580, texture: 'fallen_column', originX: 0.5, originY: 1 },
    { x: 400, y: 580, texture: 'broken_statue', originX: 0.5, originY: 1 },
    { x: 960, y: 580, texture: 'broken_pillar', originX: 0.5, originY: 1 },
    { x: 1340, y: 580, texture: 'broken_statue', originX: 0.5, originY: 1 },
    { x: 1840, y: 580, texture: 'fallen_column', originX: 0.5, originY: 1 },
    { x: 2340, y: 580, texture: 'pillar', originX: 0.5, originY: 1 },
    { x: 2560, y: 580, texture: 'pillar', originX: 0.5, originY: 1 }
  ],
  goal: { x: 2480, y: 460 }
};
