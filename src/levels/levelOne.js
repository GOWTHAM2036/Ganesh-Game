/** 
 * Level 1 Configuration: Broken Entrance
 * "SACRED THRESHOLD"
 * Handcrafted introductory level with rhythmic pacing, welcoming jumps,
 * interactive lever & diya, divine switch & torana gate, and the Broken Entrance Pillar.
 */
export const LEVEL_ONE = {
  id: 1,
  name: "Broken Entrance",
  subtitle: "Sacred Threshold",
  worldWidth: 2600,
  spawn: { x: 140, y: 480 },
  theme: { backgroundPillars: [240, 520, 800, 1100, 1400, 1750, 2100, 2400] },
  hazards: { fallBoundary: 820 },
  platforms: {
    ground: [
      [0, 600, 580],      // Section 1: Sacred Threshold Terrace (wide & welcoming)
      [1020, 1540, 580],  // Section 2: Broken Entrance Terrace & Torana Gate
      [2060, 2600, 440]   // Section 3: Sacred Sanctum Altar Terrace
    ],
    floating: [
      [680, 530],   // Chasm 1: Step 1
      [820, 480],   // Chasm 1: Step 2
      [1650, 520],  // Chasm 2: Ascent Step 1
      [1910, 430]   // Chasm 2: Ascent Step 3
    ],
    pillars: [
      [940, 500],   // Chasm 1: Stepping Pillar
      [1780, 470]   // Chasm 2: High Stepping Pillar
    ]
  },
  collectibles: {
    modak: [
      [210, 535], [410, 535], [820, 420], [1200, 535],
      [1510, 535], [1780, 400], [1910, 360], [2220, 395]
    ],
    sacredStone: [
      [360, 480],   // Section 1: Above sacred lamp
      [940, 430],   // Chasm 1: Atop stepping pillar
      [1160, 490]   // Section 2: Pre-entrance terrace floating orb
    ],
    lotus: [
      [820, 360],   // Chasm 1: High above floating step
      [2420, 370]   // Section 3: Sacred Sanctum offering
    ],
    templeCoin: [
      [170, 535], [290, 535], [480, 500], [680, 465], [750, 430],
      [1060, 535], [1320, 535], [1480, 505], [1650, 455], [2140, 395], [2360, 395]
    ],
    scripture: [
      [1480, 505]   // Section 2: Ancient stone tablet past the gate
    ]
  },
  interactions: {
    lever: { x: 260, y: 580 },
    lamp: { x: 330, y: 546 },
    stone: { x: 470, y: 548 },
    divineSwitch: { x: 1220, y: 568 },
    gate: { x: 1380, y: 520 }
  },
  restorations: [
    {
      id: "entrance_pillar",
      type: "broken_pillar",
      name: "Broken Entrance Pillar",
      x: 1090,
      y: 580,
      requiredResource: "sacredStones",
      requiredAmount: 3
    }
  ],
  decorations: [
    { x: 80, y: 580, texture: 'pillar', originX: 0.5, originY: 1 },
    { x: 380, y: 580, texture: 'broken_statue', originX: 0.5, originY: 1 },
    { x: 540, y: 580, texture: 'fallen_column', originX: 0.5, originY: 1 },
    { x: 1040, y: 580, texture: 'ruin_banyan', originX: 0.5, originY: 1 },
    { x: 1460, y: 580, texture: 'broken_statue', originX: 0.5, originY: 1 },
    { x: 2100, y: 440, texture: 'pillar', originX: 0.5, originY: 1 },
    { x: 2540, y: 440, texture: 'pillar', originX: 0.5, originY: 1 }
  ],
  goal: { x: 2320, y: 360 }
};
