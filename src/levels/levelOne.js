/** Level 1 data only. Future levels can follow this shape without changing GameScene. */
export const LEVEL_ONE = {
  id: 1,
  name: "Ganesha's Broken Temple",
  subtitle: 'Prologue: The Shattered Outer Sanctum',
  worldWidth: 3840,
  spawn: { x: 180, y: 480 },
  theme: { backgroundPillars: [350, 750, 1150, 1600, 2050, 2450, 2900, 3350] },
  hazards: { fallBoundary: 820 },
  platforms: {
    ground: [[0, 640, 580], [1300, 1750, 580], [2500, 2800, 540], [3420, 3850, 440]],
    floating: [[880, 540], [1060, 500], [1940, 540], [2240, 460], [2980, 490], [3280, 410]],
    pillars: [[1220, 520], [2100, 490], [2400, 490], [3140, 450]]
  },
  collectibles: {
    modak: [[240, 535], [700, 535], [880, 468], [1060, 428], [1450, 535], [1940, 468], [2240, 388], [2980, 418]],
    sacredStone: [[340, 470], [620, 510], [1220, 452]],
    lotus: [[1060, 370], [3140, 355]],
    templeCoin: [[470, 535], [790, 535], [970, 465], [1140, 440], [1540, 535], [1810, 535], [2100, 422], [2320, 430], [2700, 495], [3280, 328]],
    scripture: [[1720, 505]]
  },
  interactions: {
    lamp: { x: 420, y: 546 }, lever: { x: 340, y: 556 }, stone: { x: 580, y: 548 },
    gate: { x: 1640, y: 520 }, divineSwitch: { x: 1500, y: 568 }
  },
  restorations: [
    {
      id: "entrance_pillar",
      type: "broken_pillar",
      name: "Broken Entrance Pillar",
      x: 1350,
      y: 580,
      requiredResource: "sacredStones",
      requiredAmount: 3
    }
  ],
  goal: { x: 3640, y: 360 }
};
