import Phaser from 'phaser';
import { GAME_CONFIG } from '../config.js';
import { Player } from '../entities/Player.js';
import { TempleShrine } from '../entities/TempleShrine.js';
import { Lever } from '../entities/Lever.js';
import { TempleLamp } from '../entities/TempleLamp.js';
import { MovableStone } from '../entities/MovableStone.js';
import { DivineSwitch } from '../entities/DivineSwitch.js';
import { TempleGate } from '../entities/TempleGate.js';
import { RestorationPoint } from '../entities/RestorationPoint.js';
import { BrokenBridge } from '../entities/BrokenBridge.js';
import { AncientBell } from '../entities/AncientBell.js';
import { InteractionManager } from '../systems/InteractionManager.js';
import { CollectibleManager } from '../systems/CollectibleManager.js';
import { RestorationManager } from '../systems/RestorationManager.js';
import { GameState } from '../systems/GameState.js';
import { getLevel } from '../levels/index.js';
import { TextureGenerator } from '../utils/TextureGenerator.js';

/**
 * GameScene
 * Main gameplay scene for Ganesha's Broken Temple.
 * Handles level construction, parallax background rendering,
 * physics collisions, camera tracking, and player life cycle.
 */
export class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  preload() {
    // Generate all temple and character textures directly
    TextureGenerator.generateAll(this);
  }

  init(data) {
    this.isRestarting = false;
    this.targetLevelId = (data && data.levelId) || this.currentLevelId || 1;
  }

  create() {
    this.isRestarting = false;
    GameScene.createCount = (GameScene.createCount || 0) + 1;
    console.log('[SCENE] create: GameScene (run #' + GameScene.createCount + ')');

    this.events.once(Phaser.Scenes.Events.SHUTDOWN, this.handleShutdown, this);
    this.events.once(Phaser.Scenes.Events.DESTROY, () => {
      console.log('[SCENE] destroy: GameScene');
    });

    try {
      this.level = getLevel(this.targetLevelId);
    } catch (err) {
      console.error('[SCENE] Failed to load level', this.targetLevelId, err);
      this.level = getLevel(1);
    }
    this.currentLevelId = this.level.id;
    this.gameState = new GameState(this.level);
    this.isHandlingDeath = false;

    // Launch UI overlay scene if not already active
    if (!this.scene.isActive('UIScene')) {
      this.scene.launch('UIScene');
    }

    // Setup world boundaries
    this.physics.world.setBounds(0, 0, this.level.worldWidth, GAME_CONFIG.WORLD_HEIGHT + 200);

    // Initial level state
    this.spawnPoint = { ...this.level.spawn };

    // Setup visual layers
    this.createBackground();
    this.createParticleSystems();
    this.createLevelGeometry();
    this.createEntities();
    this.collectibleManager = new CollectibleManager(this, this.player, this.gameState, this.level.collectibles);
    this.collectibleManager.createCollectibles();
    this.setupCamera();
    this.setupInputs();

    // Restoration Management System
    this.restorationManager = new RestorationManager(this);
    this.restorationPoints = (this.level.restorations || []).map(r => {
      let point;
      if (r.type === 'broken_bridge') {
        point = new BrokenBridge(this, r.x, r.y, r);
      } else {
        point = new RestorationPoint(this, r.x, r.y, r);
      }
      this.restorationManager.register(point);
      return point;
    });

    // Interaction Management
    const interactives = [];
    if (this.lever) interactives.push(this.lever);
    if (this.movableStone) interactives.push(this.movableStone);
    if (this.divineSwitch) interactives.push(this.divineSwitch);
    if (this.bells && this.bells.length) interactives.push(...this.bells);
    interactives.push(...this.restorationPoints);

    this.interactionManager = new InteractionManager(this);
    this.interactionManager.registerMultiple(interactives);

    // Scene-to-UI communication
    this.events.off('player-died', this.handlePlayerDeath, this);
    this.events.off('shrine-reached', this.handleLevelComplete, this);
    this.events.off('bell-rung', this.handleBellRung, this);
    this.events.on('player-died', this.handlePlayerDeath, this);
    this.events.on('shrine-reached', this.handleLevelComplete, this);
    this.events.on('bell-rung', this.handleBellRung, this);

    // UIScene persists across level attempts, so it must bind to this fresh run.
    const uiScene = this.scene.get('UIScene');
    if (uiScene) {
      if (uiScene.bindGameScene) uiScene.bindGameScene(this);
      const initialObjective = this.level.id === 3
        ? 'Activate the sacred mechanisms and restore the forgotten shrine.'
        : (this.level.id === 2
          ? 'Reach the Broken Bridge and restore the courtyard passage.'
          : 'Collect Sacred Stones and reach the Broken Entrance.');
      if (uiScene.resetUI) uiScene.resetUI(initialObjective);
      if (uiScene.updateResources) uiScene.updateResources(this.gameState.snapshot());
      if (uiScene.updateHealthHUD) uiScene.updateHealthHUD(this.gameState.lives);
      if (uiScene.updateObjective) {
        uiScene.updateObjective(initialObjective);
      }
    }
  }

  /**
   * Creates multi-layered parallax temple background
   */
  /**
   * Spawns a gentle pulsing golden light halo for lamps, torches, and shrines
   */
  addLightHalo(x, y, radius = 90, alpha = 0.55) {
    const halo = this.add.image(x, y, 'diya_halo')
      .setOrigin(0.5, 0.5)
      .setScale(radius / 120)
      .setAlpha(alpha)
      .setDepth(-25)
      .setBlendMode(Phaser.BlendModes.ADD);

    this.tweens.add({
      targets: halo,
      scale: (radius / 120) * 1.08,
      alpha: alpha * 0.82,
      duration: 1200 + Math.random() * 500,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });
    return halo;
  }

  /**
   * Builds the rich, multi-layered ancient Indian temple environment
   * with distinct parallax planes and authentic level-specific architecture
   */
  createBackground() {
    const { CANVAS_HEIGHT } = GAME_CONFIG;
    const WORLD_WIDTH = this.level.worldWidth;
    const isLevel1 = this.level.id === 1;
    const isLevel2 = this.level.id === 2;
    const isLevel3 = this.level.id === 3;

    if (!isLevel3) {
      // =========================================================================
      // OUTDOOR LEVELS (LEVEL 1: BROKEN ENTRANCE & LEVEL 2: FALLEN COURTYARD)
      // =========================================================================

      // Layer 1: Celestial Night Sky with Natural Starfield (Depth -120, ScrollFactor: 0.02)
      const skyTexture = isLevel2 ? 'bg_sky_courtyard' : 'bg_sky';
      this.bgSky = this.add.tileSprite(0, 0, WORLD_WIDTH, CANVAS_HEIGHT, skyTexture)
        .setOrigin(0, 0)
        .setScrollFactor(0.02)
        .setDepth(-120);

      // Layer 2: Radiant Celestial Crescent Moon (Depth -110, ScrollFactor: 0.015)
      this.celestialMoon = this.add.image(780, 115, 'crescent_moon')
        .setOrigin(0.5, 0.5)
        .setScrollFactor(0.015)
        .setDepth(-110);

      // Layer 3: Distant Mountain Ridges & Spire Silhouettes (Depth -95, ScrollFactor: 0.12)
      const mountainTexture = isLevel2 ? 'bg_mountains_courtyard' : 'bg_mountains';
      this.bgMountains = this.add.tileSprite(0, CANVAS_HEIGHT - 360, WORLD_WIDTH, 360, mountainTexture)
        .setOrigin(0, 0)
        .setScrollFactor(0.12)
        .setDepth(-95);

      // Layer 4: Soft Atmospheric Horizon Depth Fog (Depth -85, ScrollFactor: 0.16)
      const hazeTexture = isLevel2 ? 'bg_haze_courtyard' : 'bg_haze';
      this.bgHaze = this.add.tileSprite(0, CANVAS_HEIGHT - 320, WORLD_WIDTH, 180, hazeTexture)
        .setOrigin(0, 0)
        .setScrollFactor(0.16)
        .setDepth(-85);

      // Layer 5: Handcrafted Modular Middle-Layer Ruins (Depth -70, ScrollFactor: 0.38)
      // Custom placement tailored to each level section to completely avoid wallpaper repetition!
      if (isLevel1) {
        // --- LEVEL 1: BROKEN ENTRANCE RUINS (worldWidth: 2600) ---
        // Section 1: Ceremonial entrance ruins
        this.add.image(240, CANVAS_HEIGHT - 170, 'ruin_torana')
          .setOrigin(0.5, 1).setScrollFactor(0.38).setDepth(-70).setScale(0.95);
        this.add.image(520, CANVAS_HEIGHT - 150, 'ruin_banyan')
          .setOrigin(0.5, 1).setScrollFactor(0.38).setDepth(-70).setScale(0.9);

        // Section 2: Sunken courtyard broken colonnades & collapsed towers
        this.add.image(880, CANVAS_HEIGHT - 140, 'ruin_gopuram')
          .setOrigin(0.5, 1).setScrollFactor(0.35).setDepth(-72).setScale(0.92);
        this.add.image(1160, CANVAS_HEIGHT - 160, 'ruin_colonnade')
          .setOrigin(0.5, 1).setScrollFactor(0.38).setDepth(-70);
        this.add.image(1440, CANVAS_HEIGHT - 150, 'ruin_banyan')
          .setOrigin(0.5, 1).setScrollFactor(0.38).setDepth(-70).setScale(0.95);

        // Section 3: The Grand Ascent & Sanctum Spire
        this.add.image(1780, CANVAS_HEIGHT - 140, 'ruin_gopuram')
          .setOrigin(0.5, 1).setScrollFactor(0.35).setDepth(-72).setScale(1.05);
        this.add.image(2080, CANVAS_HEIGHT - 170, 'ruin_torana')
          .setOrigin(0.5, 1).setScrollFactor(0.38).setDepth(-70);
        this.add.image(2420, CANVAS_HEIGHT - 140, 'ruin_gopuram')
          .setOrigin(0.5, 1).setScrollFactor(0.35).setDepth(-72).setScale(1.15);
      } else if (isLevel2) {
        // --- LEVEL 2: FALLEN COURTYARD RUINS (worldWidth: 2600) ---
        // Section A: Ruined entrance gate & banyan colonnade
        this.add.image(260, CANVAS_HEIGHT - 170, 'ruin_torana')
          .setOrigin(0.5, 1).setScrollFactor(0.38).setDepth(-70).setScale(0.95);
        this.add.image(480, CANVAS_HEIGHT - 150, 'ruin_banyan')
          .setOrigin(0.5, 1).setScrollFactor(0.38).setDepth(-70);

        // Section B & C: Towering ruined towers and deep colonnade corridors
        this.add.image(780, CANVAS_HEIGHT - 160, 'ruin_colonnade')
          .setOrigin(0.5, 1).setScrollFactor(0.38).setDepth(-70);
        this.add.image(1080, CANVAS_HEIGHT - 140, 'ruin_gopuram')
          .setOrigin(0.5, 1).setScrollFactor(0.35).setDepth(-72).setScale(1.1);
        this.add.image(1380, CANVAS_HEIGHT - 150, 'ruin_banyan')
          .setOrigin(0.5, 1).setScrollFactor(0.38).setDepth(-70).setScale(0.95);
        this.add.image(1680, CANVAS_HEIGHT - 170, 'ruin_torana')
          .setOrigin(0.5, 1).setScrollFactor(0.38).setDepth(-70).setScale(0.9);

        // Section D & E: Pre-bridge ruins & dramatic sanctum framing
        this.add.image(1980, CANVAS_HEIGHT - 160, 'ruin_colonnade')
          .setOrigin(0.5, 1).setScrollFactor(0.38).setDepth(-70);
        this.add.image(2380, CANVAS_HEIGHT - 140, 'ruin_gopuram')
          .setOrigin(0.5, 1).setScrollFactor(0.35).setDepth(-72).setScale(1.15);
      }

      // Layer 6: Near Midground Pillars (Depth -55, ScrollFactor: 0.65)
      const bgPillarPositions = this.level.theme.backgroundPillars || [];
      const pillarTint = this.level.theme?.pillarTint || 0x8a5229;
      bgPillarPositions.forEach((px, i) => {
        const texture = (i % 2 === 0) ? 'broken_pillar' : 'pillar';
        const p = this.add.image(px, CANVAS_HEIGHT - 190, texture)
          .setOrigin(0.5, 1)
          .setAlpha(0.65)
          .setTint(pillarTint)
          .setScrollFactor(0.65)
          .setDepth(-55);
        if (texture === 'pillar') p.setScale(0.85);
      });

    } else {
      // =========================================================================
      // ENCLOSED TEMPLE INTERIOR (LEVEL 3: THE INNER HALLS)
      // =========================================================================

      // Layer 1: Massive Corbelled Stone Vault Ceiling (Depth -110, ScrollFactor: 0.08)
      this.bgVaultCeiling = this.add.tileSprite(0, 0, WORLD_WIDTH, 120, 'inner_vault_ceiling')
        .setOrigin(0, 0)
        .setScrollFactor(0.08)
        .setDepth(-110);

      // Layer 2: Monumental Carved Sanctum Stone Wall Backdrop (Depth -90, ScrollFactor: 0.28)
      this.bgSanctumWall = this.add.tileSprite(0, 110, WORLD_WIDTH, 420, 'inner_sanctum_backdrop')
        .setOrigin(0, 0)
        .setScrollFactor(0.28)
        .setDepth(-90);

      // Layer 3: Atmospheric Chiaroscuro Shadow Gradient (Depth -80, ScrollFactor: 0)
      this.bgShadowVignette = this.add.graphics();
      this.bgShadowVignette.setDepth(-80);
      this.bgShadowVignette.setScrollFactor(0);
      this.bgShadowVignette.fillGradientStyle(0x040206, 0x040206, 0x0a0408, 0x0a0408, 0.5, 0.5, 0.75, 0.75);
      this.bgShadowVignette.fillRect(0, 0, 1280, CANVAS_HEIGHT);

      // Layer 4: Wall-Mounted Bronze Torch Sconces with Radiant Halos (Depth -50, ScrollFactor: 0.55)
      const torchXPositions = [180, 420, 680, 940, 1200, 1460, 1720, 1980, 2220];
      torchXPositions.forEach(tx => {
        const ty = CANVAS_HEIGHT - 380;
        this.add.image(tx, ty, 'torch_sconce')
          .setOrigin(0.5, 0.5)
          .setScrollFactor(0.55)
          .setDepth(-50);
        
        // Soft golden torchlight halo
        const halo = this.add.image(tx, ty - 12, 'diya_halo')
          .setOrigin(0.5, 0.5)
          .setScale(0.85)
          .setAlpha(0.6)
          .setScrollFactor(0.55)
          .setDepth(-51)
          .setBlendMode(Phaser.BlendModes.ADD);

        this.tweens.add({
          targets: halo,
          scale: 0.95,
          alpha: 0.75,
          duration: 900 + Math.random() * 400,
          yoyo: true,
          repeat: -1,
          ease: 'Sine.easeInOut'
        });
      });

      // Layer 5: Hanging Sacred Bells with Bronze Link Chains (Depth -45, ScrollFactor: 0.6)
      const hangingBellsX = [280, 560, 840, 1120, 1400, 1680, 1960, 2240];
      hangingBellsX.forEach((bx, i) => {
        const by = CANVAS_HEIGHT - 390;
        const bell = this.add.image(bx, by, 'hanging_bell_scenery')
          .setOrigin(0.5, 0)
          .setScrollFactor(0.6)
          .setDepth(-45)
          .setScale(0.9);

        // Gentle subtle swinging sway on hanging bells
        this.tweens.add({
          targets: bell,
          angle: (i % 2 === 0 ? 3 : -3),
          duration: 2200 + (i * 200),
          yoyo: true,
          repeat: -1,
          ease: 'Sine.easeInOut'
        });
      });

      // Layer 6: Heavy Carved Sanctum Backdrop Columns (Depth -40, ScrollFactor: 0.75)
      const innerColPositions = this.level.theme.backgroundPillars || [];
      innerColPositions.forEach(px => {
        this.add.image(px, CANVAS_HEIGHT - 170, 'pillar')
          .setOrigin(0.5, 1)
          .setAlpha(0.7)
          .setTint(0x381f14)
          .setScrollFactor(0.75)
          .setDepth(-40)
          .setScale(0.9);
      });
    }
  }

  /**
   * Ambient temple motes & jump dust particle systems
   */
  createParticleSystems() {
    // Ambient floating golden temple dust motes
    this.ambientEmitter = this.add.particles(0, 0, 'particle_sparkle', {
      x: { min: 0, max: this.level.worldWidth },
      y: { min: 50, max: GAME_CONFIG.WORLD_HEIGHT - 50 },
      quantity: 1,
      frequency: 250,
      lifespan: { min: 4000, max: 8000 },
      speedY: { min: -25, max: -5 },
      speedX: { min: -15, max: 15 },
      scale: { start: 0.8, end: 0.1 },
      alpha: { start: 0.6, end: 0 },
      blendMode: 'ADD'
    });

    // Landing / jumping stone dust
    this.dustEmitter = this.add.particles(0, 0, 'particle_sparkle', {
      lifespan: 350,
      speed: { min: 40, max: 90 },
      angle: { min: 200, max: 340 },
      scale: { start: 0.6, end: 0 },
      alpha: { start: 0.8, end: 0 },
      blendMode: 'ADD',
      emitting: false
    });

    // Shrine divine blessing particles
    this.shrineEmitter = this.add.particles(0, 0, 'particle_sparkle', {
      lifespan: 1200,
      speed: { min: 20, max: 80 },
      scale: { start: 1, end: 0.2 },
      alpha: { start: 0.9, end: 0 },
      blendMode: 'ADD',
      frequency: 120
    });

    // One-shot burst used by the reusable collectible system.
    this.collectibleEmitter = this.add.particles(0, 0, 'particle_sparkle', {
      lifespan: { min: 350, max: 650 },
      speed: { min: 55, max: 150 },
      scale: { start: 1.1, end: 0 },
      alpha: { start: 1, end: 0 },
      blendMode: 'ADD',
      emitting: false
    });
  }

  /**
   * Builds the temple platforms, ground sections, and stepping stones
   */
  createLevelGeometry() {
    this.platforms = this.physics.add.staticGroup();
    console.log('[PHYSICS] group created: platforms');

    // Helper to create solid stone ground stretches
    const createGround = (startX, endX, y) => {
      const step = 128;
      for (let x = startX; x <= endX; x += step) {
        const slab = this.platforms.create(x, y, 'ground_slab').setOrigin(0, 0);
        slab.refreshBody();
      }
    };

    // Helper to create floating carved temple platforms
    const createFloatingPlatform = (x, y) => {
      const plat = this.platforms.create(x, y, 'platform_stone').setOrigin(0.5, 0.5);
      plat.refreshBody();
      return plat;
    };

    // Helper to place ornate flat-top pillar stepping platform
    const createPillarPlatform = (x, y) => {
      const pillar = this.platforms.create(x, y, 'pillar_platform').setOrigin(0.5, 0);
      pillar.body.setSize(120, 30);
      pillar.body.setOffset(0, 0);
      pillar.refreshBody();
      return pillar;
    };

    // -------------------------------------------------------------
    // Platforms & Level Geometry
    // -------------------------------------------------------------
    const { ground, floating = [], pillars = [] } = this.level.platforms;
    ground.forEach(([startX, endX, y]) => createGround(startX, endX, y));
    floating.forEach(([x, y]) => createFloatingPlatform(x, y));
    pillars.forEach(([x, y]) => createPillarPlatform(x, y));

    if (this.level.id === 1) {
      // Decorative entrance torana arch pillars framing the starting terrace
      this.add.image(60, 580, 'pillar').setOrigin(0.5, 1);
      this.add.image(520, 580, 'pillar').setOrigin(0.5, 1);
      this.add.image(140, 580, 'temple_lamp_lit').setOrigin(0.5, 1);
      this.addLightHalo(140, 550, 95, 0.65);
      this.add.image(280, 290, 'marigold_garland').setOrigin(0.5, 0);
      this.add.image(380, 580, 'rubble_pile').setOrigin(0.5, 1).setDepth(2);

      // SECTION 2: Sunken courtyard broken colonnade & rubble
      this.add.image(1040, 580, 'broken_pillar').setOrigin(0.5, 1);
      this.add.image(1000, 580, 'rubble_pile').setOrigin(0.5, 1).setDepth(2);
      this.add.image(1500, 580, 'broken_pillar').setOrigin(0.5, 1);
      this.add.image(1460, 580, 'rubble_pile').setOrigin(0.5, 1).setDepth(2);

      // SECTION 3: Grand temple pillars & lit lamps framing Sanctum Altar
      this.add.image(2100, 440, 'pillar').setOrigin(0.5, 1);
      this.add.image(2540, 440, 'pillar').setOrigin(0.5, 1);
      this.add.image(2240, 440, 'temple_lamp_lit').setOrigin(0.5, 1);
      this.add.image(2400, 440, 'temple_lamp_lit').setOrigin(0.5, 1);
      this.addLightHalo(2240, 410, 95, 0.65);
      this.addLightHalo(2400, 410, 95, 0.65);
      this.add.image(2320, 220, 'marigold_garland').setOrigin(0.5, 0).setScale(1.15);
    } else if (this.level.id === 2) {
      // Atmospheric lit lamps and garlands in courtyard
      this.add.image(960, 580, 'temple_lamp_lit').setOrigin(0.5, 1);
      this.add.image(1840, 580, 'temple_lamp_lit').setOrigin(0.5, 1);
      this.add.image(2380, 580, 'temple_lamp_lit').setOrigin(0.5, 1);
      this.addLightHalo(960, 550, 95, 0.65);
      this.addLightHalo(1840, 550, 95, 0.65);
      this.addLightHalo(2380, 550, 95, 0.65);
      this.add.image(220, 310, 'marigold_garland').setOrigin(0.5, 0);
      this.add.image(2480, 310, 'marigold_garland').setOrigin(0.5, 0);
      this.add.image(440, 580, 'rubble_pile').setOrigin(0.5, 1).setDepth(2);
      this.add.image(1400, 580, 'rubble_pile').setOrigin(0.5, 1).setDepth(2);
      this.add.image(1940, 580, 'rubble_pile').setOrigin(0.5, 1).setDepth(2);
    }

    // Water surfaces under chasms
    if (Array.isArray(this.level.water)) {
      this.level.water.forEach(([startX, endX, y]) => {
        const step = 256;
        for (let wx = startX; wx <= endX; wx += step) {
          this.add.image(wx, y, 'courtyard_water').setOrigin(0, 0).setDepth(-1);
        }
      });
    }

    // Atmospheric environmental decorations (depth -5 ensures they sit behind player and gameplay)
    if (Array.isArray(this.level.decorations)) {
      this.level.decorations.forEach(d => {
        const img = this.add.image(d.x, d.y, d.texture)
          .setOrigin(d.originX ?? 0.5, d.originY ?? 1)
          .setDepth(d.depth ?? -5);
        if (d.tint) img.setTint(d.tint);
        if (d.scale) img.setScale(d.scale);
      });
    }
  }

  /**
   * Spawns Player and the Sanctum Shrine endpoint
   */
  createEntities() {
    // Spawn Lord Ganesha player
    this.player = new Player(this, this.spawnPoint.x, this.spawnPoint.y);

    // Spawn Temple Shrine Altar firmly on final terrace with divine aura
    this.shrine = new TempleShrine(this, this.level.goal.x, this.level.goal.y);
    this.addLightHalo(this.level.goal.x, this.level.goal.y - 45, 150, 0.75);

    // Collisions with platforms
    this.physics.add.collider(this.player, this.platforms);

    const inter = this.level.interactions || {};

    if (inter.gate1) {
      this.templeGate1 = new TempleGate(this, inter.gate1.x, inter.gate1.y);
      this.physics.add.collider(this.player, this.templeGate1);
    }

    if (inter.lamp && inter.lever) {
      this.templeLamp = new TempleLamp(this, inter.lamp.x, inter.lamp.y);
      const leverTargets = [this.templeLamp];
      if (this.templeGate1) leverTargets.push(this.templeGate1);
      this.lever = new Lever(this, inter.lever.x, inter.lever.y, leverTargets.length === 1 ? leverTargets[0] : leverTargets);
    }
    if (inter.stone) {
      this.movableStone = new MovableStone(this, inter.stone.x, inter.stone.y);
      this.physics.add.collider(this.player, this.movableStone);
    }
    if (inter.gate && inter.divineSwitch) {
      this.templeGate = new TempleGate(this, inter.gate.x, inter.gate.y);
      this.divineSwitch = new DivineSwitch(this, inter.divineSwitch.x, inter.divineSwitch.y, this.templeGate);
      this.physics.add.collider(this.player, this.templeGate);
    }
    if (inter.gate2) {
      this.templeGate2 = new TempleGate(this, inter.gate2.x, inter.gate2.y);
      this.physics.add.collider(this.player, this.templeGate2);
    }
    this.bells = [];
    if (Array.isArray(inter.bells)) {
      this.bells = inter.bells.map(b => new AncientBell(this, b.x, b.y, b));
    }

    this.physics.add.overlap(this.player, this.shrine, () => {
      if (!this.gameState.levelCompleted) {
        this.shrine.activate();
      }
    });
  }

  /**
   * Configures camera tracking Lord Ganesha smoothly across the level
   */
  setupCamera() {
    const camera = this.cameras.main;
    camera.setBounds(0, 0, this.level.worldWidth, GAME_CONFIG.WORLD_HEIGHT);
    camera.setZoom(1.18);
    camera.startFollow(this.player, true, 0.08, 0.08, 0, 20);
    camera.setDeadzone(50, 30);
  }

  /**
   * Configures keyboard controls: Arrow keys, WASD, Space, and R (Restart)
   */
  setupInputs() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.keys = this.input.keyboard.addKeys({
      keyW: Phaser.Input.Keyboard.KeyCodes.W,
      keyA: Phaser.Input.Keyboard.KeyCodes.A,
      keyS: Phaser.Input.Keyboard.KeyCodes.S,
      keyD: Phaser.Input.Keyboard.KeyCodes.D,
      keyR: Phaser.Input.Keyboard.KeyCodes.R
    });

    // Press R to restart level at any time
    this.keys.keyR.on('down', () => {
      this.restartLevel();
    });
  }

  /**
   * Main game loop update
   */
  update(time, delta) {
    if (this.player && !this.gameState.levelCompleted && !this.gameState.isGameOver && !this.isHandlingDeath) {
      this.player.update(this.cursors, this.keys, time, delta);
    }
    if (this.interactionManager) {
      this.interactionManager.update();
    }
  }

  /** Deducts a single life from GameState */
  loseLife() {
    return this.gameState ? this.gameState.loseLife() : 0;
  }

  /** Resets lives to maximum (3) */
  resetLives() {
    if (this.gameState) {
      this.gameState.resetLives();
      const uiScene = this.scene.get('UIScene');
      if (uiScene?.updateHealthHUD) {
        uiScene.updateHealthHUD(this.gameState.lives);
      }
    }
  }

  /**
   * Respawns player at starting position with temporary invulnerability
   */
  respawnPlayer() {
    if (!this.player) return;
    this.player.respawn(this.spawnPoint.x, this.spawnPoint.y);
    if (this.cameras?.main) {
      this.cameras.main.setZoom(1.18);
      this.cameras.main.startFollow(this.player, true, 0.08, 0.08, 0, 20);
    }
    this.isHandlingDeath = false;
  }

  /**
   * Displays the Game Over overlay when all 3 lives are exhausted
   */
  showGameOver() {
    const uiScene = this.scene.get('UIScene');
    if (uiScene?.showGameOver) {
      uiScene.showGameOver();
    }
    this.isHandlingDeath = false;
  }

  /**
   * Handles player death from hazards or boundaries
   */
  handlePlayerDeath(data = {}) {
    if (this.isHandlingDeath || this.gameState.levelCompleted) return;
    this.isHandlingDeath = true;

    const remainingLives = this.loseLife();
    const uiScene = this.scene.get('UIScene');
    if (uiScene) {
      if (uiScene.updateHealthHUD) uiScene.updateHealthHUD(remainingLives);
      if (uiScene.updateResources) uiScene.updateResources(this.gameState.snapshot());
    }

    // Camera shake & divine impact feedback
    if (this.cameras?.main) {
      this.cameras.main.shake(250, 0.015);
    }
    if (this.shrineEmitter && this.player) {
      this.shrineEmitter.explode(16, this.player.x, this.player.y);
    }

    if (remainingLives > 0) {
      // Brief feedback banner
      if (uiScene?.showFeedback) {
        const lifeStr = remainingLives === 1 ? 'One life remaining' : `${remainingLives} lives remaining`;
        uiScene.showFeedback(`Ganesha has fallen — ${lifeStr}`);
      }

      // Camera fade out and respawn at spawn point
      this.cameras.main.fade(280, 16, 8, 4, false);
      this.time.delayedCall(280, () => {
        this.respawnPlayer();
        if (this.cameras?.main) {
          this.cameras.main.fadeIn(280);
        }
      });
    } else {
      // All 3 lives exhausted -> Halt player and show Game Over overlay
      if (this.player) {
        this.player.setVelocity(0, 0);
      }
      this.cameras.main.fade(350, 12, 6, 3, false);
      this.time.delayedCall(350, () => {
        this.showGameOver();
        if (this.cameras?.main) {
          this.cameras.main.fadeIn(220);
        }
      });
    }
  }

  /**
   * Called when an ancient temple bell is rung in Level 3
   * @param {AncientBell} bell
   */
  handleBellRung(bell) {
    const count = this.gameState.activateMechanism();
    const total = this.gameState.totalMechanisms;
    const uiScene = this.scene.get('UIScene');
    if (uiScene) {
      uiScene.updateResources(this.gameState.snapshot());
    }

    if (count < total) {
      this.events.emit('show-interaction-feedback', `SACRED MECHANISMS: ${count}/${total}`);
    } else {
      this.events.emit('show-interaction-feedback', `SACRED MECHANISMS: ${count}/${total} — SANCTUM GATE UNSEALED!`);
      if (this.templeGate2) {
        this.time.delayedCall(300, () => {
          this.templeGate2.openGate();
        });
      }
      if (uiScene) {
        uiScene.updateObjective('Restore the Forgotten Shrine.');
      }
    }
  }

  /**
   * Level completion handler when player reaches the Sanctum Shrine
   */
  handleLevelComplete(shrine) {
    if (this.gameState.levelCompleted) return;

    const now = this.time ? this.time.now : 0;
    const canWarn = !this.lastRestorationWarningTime || now - this.lastRestorationWarningTime > 2500;

    // Level 3 specific gating: requires both sacred bells awakened AND shrine restored
    if (this.level.id === 3) {
      if (this.gameState.mechanismsActivated < this.gameState.totalMechanisms) {
        if (canWarn) {
          this.lastRestorationWarningTime = now;
          this.events.emit('show-interaction-feedback', 'Awaken the ancient bells before entering the Sacred Sanctum.');
          this.cameras.main.shake(160, 0.004);
        }
        return;
      }
      if (!this.gameState.isTempleRestored) {
        if (canWarn) {
          this.lastRestorationWarningTime = now;
          this.events.emit('show-interaction-feedback', 'Restore the forgotten shrine before entering the Sacred Sanctum.');
          this.cameras.main.shake(160, 0.004);
        }
        return;
      }
    } else {
      // Check whether temple restoration objective is completed before allowing victory
      if (!this.gameState.isTempleRestored) {
        if (canWarn) {
          this.lastRestorationWarningTime = now;
          const msg = this.level.id === 2
            ? 'Restore the Broken Bridge before entering the Sacred Sanctum.'
            : 'Restore the Broken Entrance Pillar before entering the Sacred Sanctum.';
          this.events.emit('show-interaction-feedback', msg);
          this.cameras.main.shake(160, 0.004);
        }
        return;
      }
    }

    this.gameState.levelCompleted = true;
    this.player.isInteracting = true;
    this.player.setVelocity(0, 0);

    // Trigger shrine blessing animation
    if (shrine && typeof shrine.triggerBlessing === 'function') {
      shrine.triggerBlessing();
    } else if (shrine && typeof shrine.activate === 'function') {
      shrine.activate();
    }

    // Slow-motion / divine zoom feeling
    this.cameras.main.zoomTo(1.36, 1200, 'Sine.easeInOut');

    // Notify UI Scene directly
    const uiScene = this.scene.get('UIScene');
    if (uiScene) {
      uiScene.showVictory(this.gameState.snapshot());
    }
  }

  /**
   * Cleans up scene resources, listeners, and resets camera before restart or stop
   */
  handleShutdown() {
    console.log('[SCENE] shutdown: GameScene');
    if (this.keys) {
      Object.values(this.keys).forEach(k => {
        if (k) {
          k.removeAllListeners();
          if (this.input?.keyboard) {
            this.input.keyboard.removeKey(k);
          }
        }
      });
      this.keys = null;
    }
    this.cursors = null;
    if (this.interactionManager) {
      this.interactionManager.destroy();
      this.interactionManager = null;
    }
    if (this.collectibleManager) {
      this.collectibleManager.destroy();
      this.collectibleManager = null;
    }
    if (this.restorationManager) {
      this.restorationManager.destroy();
      this.restorationManager = null;
    }
    this.lever = null;
    this.templeLamp = null;
    this.movableStone = null;
    this.divineSwitch = null;
    this.templeGate = null;
    this.templeGate1 = null;
    this.templeGate2 = null;
    this.bells = [];
    this.restorationPoints = [];

    if (this.cameras?.main) {
      this.cameras.main.resetFX();
      this.cameras.main.stopFollow();
      this.cameras.main.setZoom(1.0);
      this.cameras.main.setScroll(0, 0);
    }
    this.events.off('player-died', this.handlePlayerDeath, this);
    this.events.off('shrine-reached', this.handleLevelComplete, this);
    this.events.off('bell-rung', this.handleBellRung, this);
    if (this.tweens) {
      this.tweens.killAll();
    }
    if (this.time) {
      this.time.removeAllEvents();
    }
  }

  /**
   * Restarts the current active level
   */
  restartLevel() {
    console.log('[RESTART] requested for level:', this.currentLevelId);
    // Scene restart is queued by Phaser; ignore repeat key events until it completes.
    if (this.isRestarting) return;
    this.isRestarting = true;
    this.isHandlingDeath = false;

    this.gameState.reset(this.level);
    const uiScene = this.scene.get('UIScene');
    if (uiScene) {
      if (uiScene.hideGameOver) uiScene.hideGameOver();
      const initialObjective = this.level.id === 3
        ? 'Activate the sacred mechanisms and restore the forgotten shrine.'
        : (this.level.id === 2
          ? 'Reach the Broken Bridge and restore the courtyard passage.'
          : 'Collect Sacred Stones and reach the Broken Entrance.');
      uiScene.resetUI(initialObjective);
      uiScene.updateResources(this.gameState.snapshot());
      if (uiScene.updateHealthHUD) uiScene.updateHealthHUD(this.gameState.lives);
    }

    this.scene.restart({ levelId: this.currentLevelId || 1 });
  }

  /**
   * Loads a specific level by ID
   */
  loadLevel(levelId) {
    console.log('[SCENE] loadLevel requested:', levelId);
    if (this.isRestarting) return;
    this.isRestarting = true;
    this.scene.restart({ levelId: Number(levelId) });
  }
}
