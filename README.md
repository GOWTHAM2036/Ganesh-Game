# 🕉️ Ganesha's Broken Temple

A handcrafted 2D side-scrolling adventure platformer themed around **Lord Ganesha** and the divine restoration of an ancient Indian temple.

Built with **Phaser 3 (Arcade Physics)**, **Vite**, and modern modular **JavaScript (ES Modules)**.

---

## 🎮 Playable Highlights

* **3 Complete Playable Chapters:**
  * **Level 1 — The Broken Entrance** (*Prologue: The Shattered Outer Sanctum*): Learn movement, trunk reach, lever actuation, movable stone puzzles, and restore the Broken Entrance Pillar.
  * **Level 2 — The Fallen Courtyard** (*The Courtyard of Silent Waters*): Navigate collapsed colonnades, moss-covered statues, reflective water channels, and restore the ancient Broken Bridge.
  * **Level 3 — The Inner Halls** (*Where the Ancient Bells Sleep*): Deep sanctum corridors with dual iron gates, the sacred resonant bells mechanism puzzle, and restoring the Forgotten Shrine.
* **Handcrafted Visual Art Direction:**
  * Authentic Indian temple architecture: fluted sandstone pillars, beveled ashlar masonry, cusped torana arches, and stepped Dravidian/Kalinga *shikhara* sanctum altars.
  * Atmospheric details: lit brass diya lamps with holy flame glows, hanging marigold flower garlands (*torans*), and a celestial crescent moon (*Chandrama*) with twilight parallax mountains.
  * Chibi Lord Ganesha sprite with golden *mukut* crown, ruby gems, elephant ears with golden *kundal* earrings, sacred thread (*janeu*), saffron *dhoti*, and expressive reaching trunk (*Vakratunda*).
* **Divine Trunk Interaction System:**
  * Press <kbd>E</kbd> to reach with Lord Ganesha's trunk to pull bronze levers, push sacred rune stones, activate divine pressure switches, ring ancient swinging bells, and restore ruins.
* **5 Authentic Collectibles:**
  * **Modak:** Lord Ganesha's favorite sacred sweet with saffron vermilion tip (+10 score).
  * **Sacred Stones:** Radiant cyan faceted gemstones used to restore broken temple structures (+20 score).
  * **Divine Lotus:** Blooming multi-petal sacred flower (+25 score).
  * **Temple Coins:** Ornate stamped gold coins with floral motifs (+5 score).
  * **Ancient Scriptures:** Rolled parchment scrolls unlocking temple lore (+50 score).
* **Synthesized Audio Engine:**
  * Dynamic sound synthesis via Web Audio API: resonant bronze temple bells with harmonic overtones, crystalline collectible chimes, mechanical stone rumbles, and divine restoration fanfares.
* **Platforming Physics Feel:**
  * Coyote time (120ms window) and jump buffering (120ms) for responsive, forgiving controls.
  * Dynamic contact grounding shadow and landing squash-and-stretch with stone dust puffs.

---

## 🕹️ Controls

| Action | Primary Key | Alternate Keys |
| :--- | :--- | :--- |
| **Move Left / Right** | <kbd>A</kbd> / <kbd>D</kbd> | <kbd>◄</kbd> / <kbd>►</kbd> (Arrow Keys) |
| **Jump** | <kbd>Space</kbd> | <kbd>W</kbd> / <kbd>▲</kbd> (Up Arrow) |
| **Divine Trunk Interact** | <kbd>E</kbd> | Contextual interaction prompt |
| **Restart Level** | <kbd>R</kbd> | Top-right HUD Button |

---

## 🚀 Getting Started

### Prerequisites
* [Node.js](https://nodejs.org/) (v18+)
* [npm](https://www.npmjs.com/)

### Running the Development Server
```bash
npm install
npm run dev
```
Open `http://localhost:5173` in your browser.

### Building for Production
```bash
npm run build
npm run preview
```

---

## 🏗️ Project Architecture

```
├── index.html                 # Main web shell & responsive game frame
├── vite.config.js             # Vite development & build configuration
├── package.json               # Dependencies and build scripts
├── public/
│   └── favicon.svg            # Sacred Om temple emblem favicon
└── src/
    ├── main.js                # Phaser game instantiation & canvas mount
    ├── config.js              # Global constants (dimensions, physics, palette)
    ├── data/                  # Level coordinate data & definitions
    │   ├── levelOne.js        # Broken Entrance geometry, items & restorations
    │   ├── levelTwo.js        # Fallen Courtyard geometry, water & bridge
    │   └── levelThree.js      # Inner Halls geometry, bells puzzle & shrine
    ├── entities/
    │   ├── Player.js          # Lord Ganesha physics, movement & trunk reach
    │   ├── Collectible.js     # Floating static pickups with idle animations
    │   ├── InteractiveObject.js # Base class for proximity mechanisms
    │   ├── Lever.js           # Bronze lever mechanism
    │   ├── MovableStone.js    # Pushable ashlar stone with sacred glyph
    │   ├── DivineSwitch.js    # Sacred pressure plate switch
    │   ├── TempleGate.js      # Iron-grilled ancient temple barrier
    │   ├── TempleLamp.js      # Lit/unlit brass diya lamp
    │   ├── AncientBell.js     # Swinging bronze resonant bell
    │   ├── RestorationPoint.js # Temple structure reconstruction
    │   └── TempleShrine.js    # Garbhagriha Altar level goal
    ├── scenes/
    │   ├── BootScene.js       # Texture registration & scene launcher
    │   ├── GameScene.js       # Physics, geometry, camera & game loop
    │   └── UIScene.js         # Decoupled HUD, objective tracker & victory screen
    ├── systems/
    │   ├── GameState.js       # Centralized score, inventory & progress state
    │   ├── InteractionManager.js # Proximity detection & prompt rendering
    │   ├── CollectibleManager.js # Pickup lifecycle & particle bursts
    │   └── RestorationManager.js # Multi-stage temple restoration controller
    ├── utils/
    │   ├── ArtDirection.js    # Centralized Indian temple Canvas2D art engine
    │   ├── TextureGenerator.js # Procedural texture generation & sprites
    │   └── SoundFX.js         # Web Audio API procedural sound synthesizer
    └── styles/
        └── style.css          # Thematic temple gold/stone UI frame styling
```

---

## 📜 License
Created for the Game Development Contest. All rights reserved.
