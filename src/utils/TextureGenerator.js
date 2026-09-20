import { ArtDirection, TEMPLE_PALETTE } from './ArtDirection.js';

/**
 * TextureGenerator
 * Handcrafted 2D Indian Temple Art Direction Texture Generator for Ganesha's Broken Temple.
 * Generates rich, cohesive Indian temple stonecraft,
 * carved pillars, sacred collectibles, authentic deity motifs, and layered atmospheric environments.
 */
export class TextureGenerator {
  /**
   * Generates all required game textures into Phaser's Texture Manager
   * @param {Phaser.Scene} scene 
   */
  static generateAll(scene) {
    this.createPlayerTexture(scene);
    this.createPlayerTrunkUseTexture(scene);
    this.createGroundTexture(scene);
    this.createPlatformTexture(scene);
    this.createPillarTexture(scene);
    this.createPillarPlatformTexture(scene);
    this.createBrokenPillarTexture(scene);
    this.createSkyTexture(scene);
    this.createMoonTexture(scene);
    this.createGarlandTexture(scene);
    this.createMountainsTexture(scene);
    this.createRuinsTexture(scene);
    this.createShrineTexture(scene);
    this.createParticleTexture(scene);
    this.createLeverTextures(scene);
    this.createTempleLampTextures(scene);
    this.createMovableStoneTexture(scene);
    this.createDivineSwitchTextures(scene);
    this.createTempleGateTexture(scene);
    this.createTempleGateArchTexture(scene);
    this.createCollectibleTextures(scene);
    this.createRestorationPillarTextures(scene);
    this.createLevelOneTextures(scene);
    this.createLevelTwoTextures(scene);
    this.createLevelThreeTextures(scene);
    this.createHeartTextures(scene);
    this.createEnvironmentalSceneryTextures(scene);
  }

  /**
   * Handcrafted Lord Ganesha character sprite (48x64) matching Main.png
   */
  static createPlayerTexture(scene) {
    if (scene.textures.exists('player')) return;
    const canvas = scene.textures.createCanvas('player', 48, 64);
    const ctx = canvas.getContext();
    ArtDirection.drawGaneshaSprite(ctx, 48, 64, 'idle');
    canvas.refresh();
  }

  /**
   * Lord Ganesha Divine Trunk Reaching Pose (64x64) matching Main.png
   */
  static createPlayerTrunkUseTexture(scene) {
    if (scene.textures.exists('player_trunk_use')) return;
    const canvas = scene.textures.createCanvas('player_trunk_use', 64, 64);
    const ctx = canvas.getContext();
    ArtDirection.drawGaneshaSprite(ctx, 64, 64, 'trunk_use');
    canvas.refresh();
  }

  /**
   * Solid Ashlar Stone Ground Slab (128x64)
   */
  static createGroundTexture(scene) {
    if (scene.textures.exists('ground_slab')) return;
    const canvas = scene.textures.createCanvas('ground_slab', 128, 64);
    const ctx = canvas.getContext();
    ArtDirection.drawStonePlatform(ctx, 128, 64, {
      stoneBase: TEMPLE_PALETTE.sandstoneBase,
      stoneHighlight: TEMPLE_PALETTE.sandstoneHighlight,
      stoneShadow: TEMPLE_PALETTE.sandstoneShadow,
      blockWidth: 32,
      hasMoss: true
    });
    canvas.refresh();
  }

  /**
   * Carved Temple Stepping Platform (128x32)
   */
  static createPlatformTexture(scene) {
    if (scene.textures.exists('platform_stone')) return;
    const canvas = scene.textures.createCanvas('platform_stone', 128, 32);
    const ctx = canvas.getContext();
    ArtDirection.drawStonePlatform(ctx, 128, 32, {
      stoneBase: TEMPLE_PALETTE.sandstoneMid,
      stoneHighlight: TEMPLE_PALETTE.sandstoneSunlit,
      stoneShadow: TEMPLE_PALETTE.sandstoneShadow,
      blockWidth: 42,
      hasMoss: true
    });

    // Decorative carved lotus border on platform face
    ctx.fillStyle = TEMPLE_PALETTE.sandstoneShadow;
    for (let x = 12; x < 120; x += 14) {
      ctx.beginPath();
      ctx.arc(x + 5, 14, 3, 0, Math.PI);
      ctx.fill();
    }
    canvas.refresh();
  }

  /**
   * Grand Carved Indian Temple Pillar (80x320)
   */
  static createPillarTexture(scene) {
    if (scene.textures.exists('pillar')) return;
    const canvas = scene.textures.createCanvas('pillar', 80, 320);
    const ctx = canvas.getContext();
    ArtDirection.drawCarvedPillar(ctx, 10, 0, 60, 320, {
      stoneBase: TEMPLE_PALETTE.sandstoneBase,
      stoneHighlight: TEMPLE_PALETTE.sandstoneHighlight,
      stoneShadow: TEMPLE_PALETTE.sandstoneShadow
    });
    canvas.refresh();
  }

  /**
   * Temple Pillar Platform with Flat Carved Capital (120x240)
   */
  static createPillarPlatformTexture(scene) {
    if (scene.textures.exists('pillar_platform')) return;
    const canvas = scene.textures.createCanvas('pillar_platform', 120, 240);
    const ctx = canvas.getContext();

    // Column Shaft
    ArtDirection.drawBeveledStone(
      ctx, 22, 24, 76, 216,
      TEMPLE_PALETTE.sandstoneBase,
      TEMPLE_PALETTE.sandstoneHighlight,
      TEMPLE_PALETTE.sandstoneShadow,
      3
    );

    // Fluted grooves
    ctx.fillStyle = TEMPLE_PALETTE.sandstoneShadow;
    for (let x = 34; x <= 86; x += 13) {
      ctx.fillRect(x - 1, 28, 2, 208);
      ctx.fillStyle = TEMPLE_PALETTE.sandstoneSunlit;
      ctx.fillRect(x + 1, 28, 1, 208);
      ctx.fillStyle = TEMPLE_PALETTE.sandstoneShadow;
    }

    // Flat Carved Stone Capital (y: 0 to 24, width 120)
    ArtDirection.drawBeveledStone(
      ctx, 0, 0, 120, 24,
      TEMPLE_PALETTE.sandstoneMid,
      TEMPLE_PALETTE.sandstoneSunlit,
      TEMPLE_PALETTE.sandstoneShadow,
      2
    );

    // Flat top surface highlight (crisp edge at y = 0)
    ctx.fillStyle = TEMPLE_PALETTE.goldGlow;
    ctx.fillRect(0, 0, 120, 3);

    // Carved lotus rim on capital face
    ctx.fillStyle = TEMPLE_PALETTE.sandstoneShadow;
    for (let x = 12; x < 112; x += 14) {
      ctx.beginPath();
      ctx.arc(x + 4, 11, 3.5, 0, Math.PI);
      ctx.fill();
    }

    // Moss clusters on capital edges
    ArtDirection.drawMossCluster(ctx, 4, -2, 22, 5);
    ArtDirection.drawMossCluster(ctx, 94, -2, 22, 5);

    canvas.refresh();
  }

  /**
   * Broken Temple Pillar (80x160)
   */
  static createBrokenPillarTexture(scene) {
    if (scene.textures.exists('broken_pillar')) return;
    const canvas = scene.textures.createCanvas('broken_pillar', 80, 160);
    const ctx = canvas.getContext();
    ArtDirection.drawCarvedPillar(ctx, 10, 0, 60, 160, {
      stoneBase: TEMPLE_PALETTE.sandstoneBase,
      stoneHighlight: TEMPLE_PALETTE.sandstoneHighlight,
      stoneShadow: TEMPLE_PALETTE.sandstoneShadow,
      isBroken: true
    });
    canvas.refresh();
  }

  /**
   * Far Sky Backgrounds with Celestial Starfields
   */
  static createSkyTexture(scene) {
    // 1. Level 1 Twilight Sky (Deep Violet to Horizon Amber with natural starfield)
    if (!scene.textures.exists('bg_sky')) {
      const canvas = scene.textures.createCanvas('bg_sky', 640, 720);
      const ctx = canvas.getContext();

      const grad = ctx.createLinearGradient(0, 0, 0, 720);
      grad.addColorStop(0, '#0a0514');
      grad.addColorStop(0.28, '#1b0f2e');
      grad.addColorStop(0.55, '#3b1842');
      grad.addColorStop(0.78, '#9c3818');
      grad.addColorStop(0.9, '#cf6a22');
      grad.addColorStop(1, '#f59b42');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 640, 720);

      ArtDirection.drawStarfield(ctx, 640, 720, 888);
      canvas.refresh();
    }

    // 2. Level 2 Midnight Teal / Obsidian Sky (Courtyard of Silent Waters)
    if (!scene.textures.exists('bg_sky_courtyard')) {
      const canvas = scene.textures.createCanvas('bg_sky_courtyard', 640, 720);
      const ctx = canvas.getContext();

      const grad = ctx.createLinearGradient(0, 0, 0, 720);
      grad.addColorStop(0, '#050a12');
      grad.addColorStop(0.3, '#0c1a28');
      grad.addColorStop(0.6, '#162e3f');
      grad.addColorStop(0.82, '#2b3f4f');
      grad.addColorStop(1, '#544234');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 640, 720);

      ArtDirection.drawStarfield(ctx, 640, 720, 999);
      canvas.refresh();
    }
  }

  /**
   * Radiant Celestial Crescent Moon (Chandrama) Texture (120x120) matching Main.png
   */
  static createMoonTexture(scene) {
    if (scene.textures.exists('crescent_moon')) return;
    const canvas = scene.textures.createCanvas('crescent_moon', 120, 120);
    const ctx = canvas.getContext();

    const moonX = 60;
    const moonY = 60;

    // Glowing golden-white radial celestial aura
    const moonHalo = ctx.createRadialGradient(moonX, moonY, 12, moonX, moonY, 56);
    moonHalo.addColorStop(0, 'rgba(255, 245, 210, 0.45)');
    moonHalo.addColorStop(0.4, 'rgba(255, 215, 130, 0.18)');
    moonHalo.addColorStop(1, 'rgba(255, 180, 80, 0)');
    ctx.fillStyle = moonHalo;
    ctx.beginPath();
    ctx.arc(moonX, moonY, 56, 0, Math.PI * 2);
    ctx.fill();

    // Crescent body (Chandrama)
    ctx.save();
    ctx.beginPath();
    ctx.arc(moonX, moonY, 26, 0, Math.PI * 2, false);
    ctx.clip();

    // Bright moon surface
    ctx.fillStyle = '#fffbe8';
    ctx.fillRect(0, 0, 120, 120);

    // Dark shadow cutout creating the crescent
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(moonX + 11, moonY - 7, 24, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.restore();

    // Luminous rim highlight on crescent curve
    ctx.strokeStyle = 'rgba(255, 230, 140, 0.65)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(moonX, moonY, 26, -0.4, Math.PI * 0.9);
    ctx.stroke();

    canvas.refresh();
  }

  /**
   * Hanging Marigold Flower Garland (Toran) Texture (160x40)
   */
  static createGarlandTexture(scene) {
    if (scene.textures.exists('marigold_garland')) return;
    const canvas = scene.textures.createCanvas('marigold_garland', 160, 40);
    const ctx = canvas.getContext();
    ArtDirection.drawMarigoldGarland(ctx, 4, 10, 156, 10, 18, 14);
    canvas.refresh();
  }

  /**
   * Distant Temple Silhouettes & Holy Mountain Ridges (1280x360)
   */
  static createMountainsTexture(scene) {
    // 1. Level 1 Warm Twilight Mountains & Nagara Towers
    if (!scene.textures.exists('bg_mountains')) {
      const canvas = scene.textures.createCanvas('bg_mountains', 1280, 360);
      const ctx = canvas.getContext();
      ArtDirection.drawDistantMountainLayer(ctx, 1280, 360, {
        theme: 'entrance',
        towers: [140, 340, 560, 780, 1000, 1180]
      });
      canvas.refresh();
    }

    // 2. Level 2 Courtyard Ruined Towers & Misty Peaks
    if (!scene.textures.exists('bg_mountains_courtyard')) {
      const canvas = scene.textures.createCanvas('bg_mountains_courtyard', 1280, 360);
      const ctx = canvas.getContext();
      ArtDirection.drawDistantMountainLayer(ctx, 1280, 360, {
        theme: 'courtyard',
        towers: [110, 290, 510, 720, 930, 1120]
      });
      canvas.refresh();
    }
  }

  /**
   * Midground Temple Ruins fallback (backward-compatible)
   */
  static createRuinsTexture(scene) {
    if (scene.textures.exists('bg_ruins')) return;
    const canvas = scene.textures.createCanvas('bg_ruins', 960, 400);
    const ctx = canvas.getContext();

    // Dark sandstone silhouette layer
    ctx.fillStyle = 'rgba(38, 20, 16, 0.78)';
    for (let x = 60; x < 960; x += 280) {
      ctx.fillRect(x, 90, 26, 310);
      ctx.fillRect(x + 130, 90, 26, 310);
      ctx.fillRect(x - 6, 80, 168, 18);
      ctx.beginPath();
      ctx.arc(x + 78, 100, 76, Math.PI, 0);
      ctx.lineWidth = 22;
      ctx.strokeStyle = 'rgba(38, 20, 16, 0.78)';
      ctx.stroke();
    }
    canvas.refresh();
  }

  /**
   * Handcrafted Modular Environmental Scenery Textures
   * Multi-layered ruins, banyan pillars, toranas, inner hall architecture, and lighting
   */
  static createEnvironmentalSceneryTextures(scene) {
    // 1. Ruined Gopuram Tower (140x360)
    if (!scene.textures.exists('ruin_gopuram')) {
      const canvas = scene.textures.createCanvas('ruin_gopuram', 140, 360);
      const ctx = canvas.getContext();
      ArtDirection.drawRuinGopuram(ctx, 140, 360, {
        stoneColor: 'rgba(42, 22, 18, 0.88)',
        highColor: 'rgba(84, 48, 38, 0.9)',
        shadowColor: 'rgba(20, 10, 8, 0.95)'
      });
      canvas.refresh();
    }

    // 2. Ruined Torana Gateway (220x260)
    if (!scene.textures.exists('ruin_torana')) {
      const canvas = scene.textures.createCanvas('ruin_torana', 220, 260);
      const ctx = canvas.getContext();
      ArtDirection.drawRuinToranaGateway(ctx, 220, 260, {
        stoneColor: 'rgba(44, 24, 20, 0.88)',
        highColor: 'rgba(88, 52, 42, 0.9)',
        shadowColor: 'rgba(22, 12, 10, 0.95)'
      });
      canvas.refresh();
    }

    // 3. Ruined Colonnade Section (180x280)
    if (!scene.textures.exists('ruin_colonnade')) {
      const canvas = scene.textures.createCanvas('ruin_colonnade', 180, 280);
      const ctx = canvas.getContext();
      ArtDirection.drawRuinColonnade(ctx, 180, 280, {
        stoneColor: 'rgba(40, 24, 20, 0.88)',
        highColor: 'rgba(80, 50, 40, 0.9)',
        shadowColor: 'rgba(20, 12, 10, 0.95)'
      });
      canvas.refresh();
    }

    // 4. Banyan Root Entwined Ruined Pillar (110x320)
    if (!scene.textures.exists('ruin_banyan')) {
      const canvas = scene.textures.createCanvas('ruin_banyan', 110, 320);
      const ctx = canvas.getContext();
      ArtDirection.drawRuinBanyanPillar(ctx, 110, 320, {
        stoneColor: 'rgba(46, 28, 24, 0.88)',
        highColor: 'rgba(86, 54, 44, 0.9)',
        shadowColor: 'rgba(24, 14, 12, 0.95)'
      });
      canvas.refresh();
    }

    // 5. Level 3 Inner Sanctum Wall Backdrop (960x420)
    if (!scene.textures.exists('inner_sanctum_backdrop')) {
      const canvas = scene.textures.createCanvas('inner_sanctum_backdrop', 960, 420);
      const ctx = canvas.getContext();
      ArtDirection.drawInnerSanctumBackdrop(ctx, 960, 420);
      canvas.refresh();
    }

    // 6. Level 3 Corbelled Vault Ceiling (960x120)
    if (!scene.textures.exists('inner_vault_ceiling')) {
      const canvas = scene.textures.createCanvas('inner_vault_ceiling', 960, 120);
      const ctx = canvas.getContext();
      ArtDirection.drawVaultCeiling(ctx, 960, 120);
      canvas.refresh();
    }

    // 7. Atmospheric Horizon Fog / Depth Mist (1280x180)
    if (!scene.textures.exists('bg_haze')) {
      const canvas = scene.textures.createCanvas('bg_haze', 1280, 180);
      const ctx = canvas.getContext();
      ArtDirection.drawAtmosphericFog(ctx, 1280, 180, '#2d1428', 0.4);
      canvas.refresh();
    }

    // 8. Courtyard Horizon Fog (1280x180)
    if (!scene.textures.exists('bg_haze_courtyard')) {
      const canvas = scene.textures.createCanvas('bg_haze_courtyard', 1280, 180);
      const ctx = canvas.getContext();
      ArtDirection.drawAtmosphericFog(ctx, 1280, 180, '#102434', 0.45);
      canvas.refresh();
    }

    // 9. Soft Diya / Torch Light Halo (120x120)
    if (!scene.textures.exists('diya_halo')) {
      const canvas = scene.textures.createCanvas('diya_halo', 120, 120);
      const ctx = canvas.getContext();
      ArtDirection.drawDiyaLightHalo(ctx, 120, '255, 175, 45');
      canvas.refresh();
    }

    // 10. Wall Torch Sconce for Inner Halls (32x64)
    if (!scene.textures.exists('torch_sconce')) {
      const canvas = scene.textures.createCanvas('torch_sconce', 32, 64);
      const ctx = canvas.getContext();
      ArtDirection.drawTorchSconce(ctx, 32, 64);
      canvas.refresh();
    }

    // 11. Scenery Hanging Bell on Chain (32x96)
    if (!scene.textures.exists('hanging_bell_scenery')) {
      const canvas = scene.textures.createCanvas('hanging_bell_scenery', 32, 96);
      const ctx = canvas.getContext();
      ArtDirection.drawHangingBellScenery(ctx, 32, 96);
      canvas.refresh();
    }

    // 12. Fallen Stone Rubble Ground Detail (64x28)
    if (!scene.textures.exists('rubble_pile')) {
      const canvas = scene.textures.createCanvas('rubble_pile', 64, 28);
      const ctx = canvas.getContext();
      ArtDirection.drawFallenRubble(ctx, 64, 28);
      canvas.refresh();
    }
  }

  /**
   * Sacred Sanctum Sanctorum (Garbhagriha Altar Endpoint) (120x180)
   */
  static createShrineTexture(scene) {
    if (scene.textures.exists('shrine_endpoint')) return;
    const canvas = scene.textures.createCanvas('shrine_endpoint', 120, 180);
    const ctx = canvas.getContext();
    ArtDirection.drawShrineGarbhagriha(ctx, 120, 180, true);
    canvas.refresh();
  }

  /**
   * Ambient Particles (Sparkle, Dust, Gold Motes)
   */
  static createParticleTexture(scene) {
    // 1. Divine 4-pointed Sparkle (16x16)
    if (!scene.textures.exists('particle_sparkle')) {
      const canvas = scene.textures.createCanvas('particle_sparkle', 16, 16);
      const ctx = canvas.getContext();
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.moveTo(8, 0);
      ctx.quadraticCurveTo(8, 8, 16, 8);
      ctx.quadraticCurveTo(8, 8, 8, 16);
      ctx.quadraticCurveTo(8, 8, 0, 8);
      ctx.quadraticCurveTo(8, 8, 8, 0);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = TEMPLE_PALETTE.goldBright;
      ctx.beginPath();
      ctx.arc(8, 8, 2.5, 0, Math.PI * 2);
      ctx.fill();
      canvas.refresh();
    }

    // 2. Soft Temple Dust Mote (8x8)
    if (!scene.textures.exists('particle_dust')) {
      const canvas = scene.textures.createCanvas('particle_dust', 8, 8);
      const ctx = canvas.getContext();
      const grad = ctx.createRadialGradient(4, 4, 1, 4, 4, 4);
      grad.addColorStop(0, 'rgba(255, 230, 180, 0.9)');
      grad.addColorStop(0.5, 'rgba(217, 150, 80, 0.4)');
      grad.addColorStop(1, 'rgba(180, 100, 40, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(4, 4, 4, 0, Math.PI * 2);
      ctx.fill();
      canvas.refresh();
    }

    // 3. Golden Mote (12x12)
    if (!scene.textures.exists('particle_gold')) {
      const canvas = scene.textures.createCanvas('particle_gold', 12, 12);
      const ctx = canvas.getContext();
      ctx.fillStyle = TEMPLE_PALETTE.goldBright;
      ctx.beginPath();
      ctx.moveTo(6, 1);
      ctx.lineTo(11, 6);
      ctx.lineTo(6, 11);
      ctx.lineTo(1, 6);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(6, 6, 1.8, 0, Math.PI * 2);
      ctx.fill();
      canvas.refresh();
    }
  }

  /**
   * Ancient Temple Lever Textures (48x54)
   */
  static createLeverTextures(scene) {
    ['lever_inactive', 'lever_active'].forEach(key => {
      if (scene.textures.exists(key)) return;
      const canvas = scene.textures.createCanvas(key, 48, 54);
      const ctx = canvas.getContext();
      const isActive = key === 'lever_active';

      // Stone Wall Housing
      ArtDirection.drawBeveledStone(
        ctx, 8, 14, 32, 34,
        TEMPLE_PALETTE.stoneBase,
        TEMPLE_PALETTE.stoneHighlight,
        TEMPLE_PALETTE.stoneDeepShadow,
        2
      );

      // Bronze Mechanism Ring Pivot
      ctx.fillStyle = TEMPLE_PALETTE.bronzeDark;
      ctx.beginPath();
      ctx.arc(24, 32, 9, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = isActive ? TEMPLE_PALETTE.goldBright : TEMPLE_PALETTE.bronzeHighlight;
      ctx.beginPath();
      ctx.arc(24, 32, 6, 0, Math.PI * 2);
      ctx.fill();

      // Lever Arm & Handle
      ctx.strokeStyle = TEMPLE_PALETTE.bronzeDark;
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(24, 32);
      if (isActive) {
        // Lever pulled downwards
        ctx.lineTo(38, 44);
        ctx.stroke();
        ctx.fillStyle = TEMPLE_PALETTE.goldBright;
        ctx.beginPath();
        ctx.arc(38, 44, 5.5, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Lever arm angled upwards
        ctx.lineTo(12, 10);
        ctx.stroke();
        ctx.fillStyle = TEMPLE_PALETTE.bronzeGold;
        ctx.beginPath();
        ctx.arc(12, 10, 5.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Golden Rune indicator if active
      if (isActive) {
        ctx.fillStyle = TEMPLE_PALETTE.goldGlow;
        ctx.font = "bold 9px 'Cinzel', serif";
        ctx.textAlign = 'center';
        ctx.fillText('ॐ', 24, 25);
      }

      canvas.refresh();
    });
  }

  /**
   * Temple Lamp (Diya) Textures (36x68)
   */
  static createTempleLampTextures(scene) {
    if (!scene.textures.exists('temple_lamp_unlit')) {
      const canvas = scene.textures.createCanvas('temple_lamp_unlit', 36, 68);
      const ctx = canvas.getContext();
      ArtDirection.drawDiyaLamp(ctx, 0, 0, 36, 68, false);
      canvas.refresh();
    }

    if (!scene.textures.exists('temple_lamp_lit')) {
      const canvas = scene.textures.createCanvas('temple_lamp_lit', 36, 68);
      const ctx = canvas.getContext();
      ArtDirection.drawDiyaLamp(ctx, 0, 0, 36, 68, true);
      canvas.refresh();
    }
  }

  /**
   * Movable Temple Stone Block (64x64)
   */
  static createMovableStoneTexture(scene) {
    if (scene.textures.exists('movable_stone')) return;
    const canvas = scene.textures.createCanvas('movable_stone', 64, 64);
    const ctx = canvas.getContext();

    // Heavy ashlar stone block
    ArtDirection.drawBeveledStone(
      ctx, 0, 0, 64, 64,
      TEMPLE_PALETTE.sandstoneBase,
      TEMPLE_PALETTE.sandstoneHighlight,
      TEMPLE_PALETTE.sandstoneShadow,
      3
    );

    // Inner relief frame
    ArtDirection.drawBeveledStone(
      ctx, 6, 6, 52, 52,
      TEMPLE_PALETTE.sandstoneMid,
      TEMPLE_PALETTE.sandstoneSunlit,
      TEMPLE_PALETTE.sandstoneShadow,
      2
    );

    // Carved Sacred 8-Petal Lotus Relief
    const centerX = 32;
    const centerY = 32;
    ctx.fillStyle = TEMPLE_PALETTE.sandstoneShadow;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 15, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = TEMPLE_PALETTE.sandstoneHighlight;
    for (let i = 0; i < 8; i++) {
      const angle = (i * Math.PI * 2) / 8;
      const px = centerX + Math.cos(angle) * 8;
      const py = centerY + Math.sin(angle) * 8;
      ctx.beginPath();
      ctx.ellipse(px, py, 3, 6, angle, 0, Math.PI * 2);
      ctx.fill();
    }
    // Center lotus seed
    ctx.fillStyle = TEMPLE_PALETTE.goldBright;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 3, 0, Math.PI * 2);
    ctx.fill();

    // Fissures / age cracks
    ArtDirection.drawCrack(ctx, 8, 12, 14, 0.4, TEMPLE_PALETTE.sandstoneShadow);
    ArtDirection.drawCrack(ctx, 44, 48, 12, -0.6, TEMPLE_PALETTE.sandstoneShadow);

    canvas.refresh();
  }

  /**
   * Divine Switch Floor Mechanism Textures (64x28)
   */
  static createDivineSwitchTextures(scene) {
    ['divine_switch_inactive', 'divine_switch_active'].forEach(key => {
      if (scene.textures.exists(key)) return;
      const canvas = scene.textures.createCanvas(key, 64, 28);
      const ctx = canvas.getContext();
      const isActive = key === 'divine_switch_active';

      // Stone Foundation Plinth
      ArtDirection.drawBeveledStone(
        ctx, 0, 12, 64, 16,
        TEMPLE_PALETTE.stoneBase,
        TEMPLE_PALETTE.stoneHighlight,
        TEMPLE_PALETTE.stoneDeepShadow,
        2
      );

      // Depressible Pressure Plate (Raised vs Depressed)
      const plateY = isActive ? 10 : 4;
      const plateH = isActive ? 8 : 12;
      ArtDirection.drawBeveledStone(
        ctx, 8, plateY, 48, plateH,
        isActive ? TEMPLE_PALETTE.goldBase : TEMPLE_PALETTE.stoneMid,
        isActive ? TEMPLE_PALETTE.goldGlow : TEMPLE_PALETTE.stoneHighlight,
        isActive ? TEMPLE_PALETTE.goldDark : TEMPLE_PALETTE.stoneDeepShadow,
        2
      );

      // Sacred Glyphs on switch plate
      ctx.fillStyle = isActive ? TEMPLE_PALETTE.cyanBright : TEMPLE_PALETTE.stoneHighlight;
      ctx.font = "bold 10px 'Cinzel', serif";
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('ॐ', 32, plateY + plateH / 2);

      if (isActive) {
        // Celestial cyan glow halo
        const halo = ctx.createRadialGradient(32, 14, 2, 32, 14, 22);
        halo.addColorStop(0, 'rgba(0, 229, 255, 0.7)');
        halo.addColorStop(0.5, 'rgba(0, 172, 193, 0.25)');
        halo.addColorStop(1, 'rgba(0, 131, 143, 0)');
        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(32, 14, 22, 0, Math.PI * 2);
        ctx.fill();
      }

      canvas.refresh();
    });
  }

  /**
   * Temple Gate Portcullis Grille (56x140)
   * Heavy bronze and charcoal iron portcullis with spiked chisel teeth and sacred medallion.
   */
  static createTempleGateTexture(scene) {
    if (scene.textures.exists('temple_gate')) return;
    const canvas = scene.textures.createCanvas('temple_gate', 56, 140);
    const ctx = canvas.getContext();

    // Heavy Stone & Charcoal Iron Perimeter Frame
    ArtDirection.drawBeveledStone(
      ctx, 0, 0, 56, 140,
      TEMPLE_PALETTE.stoneCharcoal,
      TEMPLE_PALETTE.stoneMid,
      TEMPLE_PALETTE.stoneDarkest,
      2.5
    );

    // Dark recessed grill chamber interior
    ctx.fillStyle = '#18121d';
    ctx.fillRect(4, 4, 48, 132);

    // 5 Heavy Vertical Bronze & Iron Grille Bars with Chisel Spearhead Tips
    const barXs = [9, 18, 28, 38, 47];
    barXs.forEach(bx => {
      // Main vertical bar shaft
      ctx.fillStyle = TEMPLE_PALETTE.bronzeDark;
      ctx.fillRect(bx - 2, 4, 4, 122);
      ctx.fillStyle = TEMPLE_PALETTE.bronzeHighlight;
      ctx.fillRect(bx - 0.5, 4, 1.5, 122);

      // Pointed chisel spearhead teeth projecting at bottom
      ctx.fillStyle = TEMPLE_PALETTE.bronzeBase;
      ctx.beginPath();
      ctx.moveTo(bx - 3, 126);
      ctx.lineTo(bx, 138);
      ctx.lineTo(bx + 3, 126);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = TEMPLE_PALETTE.goldBright;
      ctx.beginPath();
      ctx.moveTo(bx - 0.5, 126);
      ctx.lineTo(bx, 138);
      ctx.lineTo(bx + 1, 126);
      ctx.closePath();
      ctx.fill();
    });

    // 4 Heavy Horizontal Reinforced Bronze Cross-Bands with Gold Rivet Studs
    const bands = [10, 48, 86, 120];
    bands.forEach(by => {
      ArtDirection.drawBeveledStone(
        ctx, 1, by, 54, 10,
        TEMPLE_PALETTE.bronzeBase,
        TEMPLE_PALETTE.bronzeHighlight,
        TEMPLE_PALETTE.bronzeDark,
        1.5
      );
      // Sacred gold rivets along the cross-band
      ctx.fillStyle = TEMPLE_PALETTE.goldBright;
      for (let rx = 7; rx <= 49; rx += 10) {
        ctx.beginPath();
        ctx.arc(rx, by + 5, 2.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = TEMPLE_PALETTE.goldDark;
        ctx.beginPath();
        ctx.arc(rx + 0.8, by + 5.8, 1, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = TEMPLE_PALETTE.goldBright;
      }
    });

    // Central Sacred Bronze & Gold Medallion with Lotus Motif
    const midX = 28;
    const midY = 67;
    ctx.fillStyle = TEMPLE_PALETTE.bronzeDark;
    ctx.beginPath();
    ctx.arc(midX, midY, 13, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = TEMPLE_PALETTE.goldBase;
    ctx.beginPath();
    ctx.arc(midX, midY, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = TEMPLE_PALETTE.goldBright;
    ctx.beginPath();
    ctx.arc(midX, midY, 5, 0, Math.PI * 2);
    ctx.fill();

    canvas.refresh();
  }

  /**
   * Monumental Temple Gateway Torana Arch (112x460)
   * Handcrafted Indian Dravidian / Nagara temple gateway structure.
   * Flanked by massive carved stone pillars, capped with multi-tiered shikhara pediment
   * and sacred kalasha finial that extends solidly to the ceiling.
   */
  static createTempleGateArchTexture(scene) {
    if (scene.textures.exists('temple_gate_arch')) return;
    const canvas = scene.textures.createCanvas('temple_gate_arch', 112, 460);
    const ctx = canvas.getContext();

    // 1. Left Flanking Carved Pillar (width 28, height 460 from top to ground)
    ArtDirection.drawCarvedPillar(ctx, 0, 0, 28, 460, {
      stoneBase: TEMPLE_PALETTE.sandstoneBase,
      stoneHighlight: TEMPLE_PALETTE.sandstoneHighlight,
      stoneShadow: TEMPLE_PALETTE.sandstoneShadow,
      isRestored: false
    });

    // 2. Right Flanking Carved Pillar (width 28, height 460 from top to ground)
    ArtDirection.drawCarvedPillar(ctx, 84, 0, 28, 460, {
      stoneBase: TEMPLE_PALETTE.sandstoneBase,
      stoneHighlight: TEMPLE_PALETTE.sandstoneHighlight,
      stoneShadow: TEMPLE_PALETTE.sandstoneShadow,
      isRestored: false
    });

    // Portal opening is between x: 28 and x: 84 (width 56), from y: 320 to y: 460 (height 140).
    // This region is left transparent so the sliding portcullis is cleanly visible.

    // 3. Heavy Stone Lintel Beam across doorway (spanning x: 0 to 112, y: 295 to 326)
    ArtDirection.drawBeveledStone(
      ctx, 0, 295, 112, 28,
      TEMPLE_PALETTE.sandstoneMid,
      TEMPLE_PALETTE.sandstoneSunlit,
      TEMPLE_PALETTE.sandstoneShadow,
      3
    );

    // Deep recessed portcullis slot inside the lintel underside (between x: 28 and 84)
    ctx.fillStyle = '#100b14';
    ctx.fillRect(26, 318, 60, 8);

    // Cusped Indian Torana Arch curve molding framing the portal opening
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(28, 335);
    ctx.quadraticCurveTo(28, 320, 44, 320);
    ctx.arc(56, 320, 12, Math.PI, 0, false);
    ctx.quadraticCurveTo(84, 320, 84, 335);
    ctx.strokeStyle = TEMPLE_PALETTE.sandstoneSunlit;
    ctx.lineWidth = 2.5;
    ctx.stroke();
    ctx.restore();

    // Sacred Inscription Frieze on Lintel Beam
    ctx.fillStyle = TEMPLE_PALETTE.goldBase;
    ctx.font = "bold 13px 'Cinzel', serif";
    ctx.textAlign = 'center';
    ctx.fillText("ॐ", 56, 314);

    // Carved lotus medallions on left and right lintel brackets
    [14, 98].forEach(mx => {
      ctx.fillStyle = TEMPLE_PALETTE.sandstoneShadow;
      ctx.beginPath();
      ctx.arc(mx, 309, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = TEMPLE_PALETTE.goldDark;
      ctx.beginPath();
      ctx.arc(mx, 309, 3, 0, Math.PI * 2);
      ctx.fill();
    });

    // 4. Multi-tiered stepped Gopuram / Shikhara masonry rising to the ceiling (y: 0 to 295)
    const tiers = [
      { y: 250, h: 45, w: 104, x: 4 },
      { y: 200, h: 50, w: 94,  x: 9 },
      { y: 145, h: 55, w: 82,  x: 15 },
      { y: 90,  h: 55, w: 70,  x: 21 },
      { y: 40,  h: 50, w: 56,  x: 28 }
    ];

    tiers.forEach((t, i) => {
      ArtDirection.drawBeveledStone(
        ctx, t.x, t.y, t.w, t.h,
        TEMPLE_PALETTE.sandstoneBase,
        TEMPLE_PALETTE.sandstoneHighlight,
        TEMPLE_PALETTE.sandstoneShadow,
        2.5
      );

      // Carved cornice molding at top of each tier
      ArtDirection.drawBeveledStone(
        ctx, t.x - 2, t.y, t.w + 4, 8,
        TEMPLE_PALETTE.sandstoneMid,
        TEMPLE_PALETTE.sandstoneSunlit,
        TEMPLE_PALETTE.sandstoneShadow,
        1.5
      );

      // Carved Temple Niche / Kudus on each tier
      const nicheW = 16 + i * 2;
      const nicheH = t.h - 18;
      const nicheX = 56 - nicheW / 2;
      const nicheY = t.y + 12;
      ctx.fillStyle = TEMPLE_PALETTE.stoneDeepShadow;
      ctx.beginPath();
      ctx.moveTo(nicheX, nicheY + nicheH);
      ctx.lineTo(nicheX, nicheY + 6);
      ctx.quadraticCurveTo(nicheX + nicheW / 2, nicheY - 4, nicheX + nicheW, nicheY + 6);
      ctx.lineTo(nicheX + nicheW, nicheY + nicheH);
      ctx.closePath();
      ctx.fill();

      // Golden sacred glyph inside tier niche
      ctx.fillStyle = TEMPLE_PALETTE.goldDark;
      ctx.beginPath();
      ctx.arc(56, nicheY + nicheH / 2, 2.5, 0, Math.PI * 2);
      ctx.fill();

      // Stone relief dentils / lotus carvings along tier edge
      ctx.fillStyle = TEMPLE_PALETTE.sandstoneShadow;
      for (let dx = t.x + 4; dx < t.x + t.w - 4; dx += 8) {
        ctx.fillRect(dx, t.y + 6, 4, 3);
      }
    });

    // 5. Sacred Golden Kalasha Finial Spire (y: 0 to 40)
    const centerX = 56;
    // Golden Kalasha Urn
    ctx.fillStyle = TEMPLE_PALETTE.goldBase;
    ctx.beginPath();
    ctx.arc(centerX, 28, 9, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = TEMPLE_PALETTE.goldBright;
    ctx.beginPath();
    ctx.arc(centerX - 2, 26, 4, 0, Math.PI * 2);
    ctx.fill();

    // Kalasha Spire Needle reaching the top
    ctx.fillStyle = TEMPLE_PALETTE.goldMid;
    ctx.beginPath();
    ctx.moveTo(centerX - 5, 22);
    ctx.lineTo(centerX, 2);
    ctx.lineTo(centerX + 5, 22);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = TEMPLE_PALETTE.goldBright;
    ctx.beginPath();
    ctx.moveTo(centerX - 1.5, 22);
    ctx.lineTo(centerX, 2);
    ctx.lineTo(centerX + 1.5, 22);
    ctx.closePath();
    ctx.fill();

    canvas.refresh();
  }

  /**
   * Collectible Textures (Modak, Sacred Stone, Lotus, Temple Coin, Scripture)
   */
  static createCollectibleTextures(scene) {
    const items = [
      { key: 'collectible_modak', fn: ArtDirection.drawModak },
      { key: 'collectible_sacred_stone', fn: ArtDirection.drawSacredStone },
      { key: 'collectible_lotus', fn: ArtDirection.drawLotus },
      { key: 'collectible_temple_coin', fn: ArtDirection.drawTempleCoin },
      { key: 'collectible_scripture', fn: ArtDirection.drawScripture }
    ];

    items.forEach(({ key, fn }) => {
      if (scene.textures.exists(key)) return;
      const canvas = scene.textures.createCanvas(key, 36, 36);
      const ctx = canvas.getContext();
      fn(ctx, 36);
      canvas.refresh();
    });
  }

  /**
   * Restoration Pillar Textures (80x240)
   */
  static createRestorationPillarTextures(scene) {
    // 1. Broken Pillar
    if (!scene.textures.exists('restoration_pillar_broken')) {
      const canvas = scene.textures.createCanvas('restoration_pillar_broken', 80, 240);
      const ctx = canvas.getContext();
      ArtDirection.drawCarvedPillar(ctx, 10, 0, 60, 240, {
        stoneBase: TEMPLE_PALETTE.sandstoneBase,
        stoneHighlight: TEMPLE_PALETTE.sandstoneHighlight,
        stoneShadow: TEMPLE_PALETTE.sandstoneShadow,
        isBroken: true
      });
      canvas.refresh();
    }

    // 2. Restored Pillar (Majestic carved pillar with Marigold Torans & Golden Rune)
    if (!scene.textures.exists('restoration_pillar_restored')) {
      const canvas = scene.textures.createCanvas('restoration_pillar_restored', 80, 240);
      const ctx = canvas.getContext();

      // Golden divine aura halo behind pillar
      const aura = ctx.createRadialGradient(40, 100, 10, 40, 100, 65);
      aura.addColorStop(0, 'rgba(255, 215, 0, 0.45)');
      aura.addColorStop(0.6, 'rgba(255, 140, 0, 0.15)');
      aura.addColorStop(1, 'rgba(255, 100, 0, 0)');
      ctx.fillStyle = aura;
      ctx.beginPath();
      ctx.arc(40, 100, 65, 0, Math.PI * 2);
      ctx.fill();

      // Fully intact carved pillar
      ArtDirection.drawCarvedPillar(ctx, 10, 0, 60, 240, {
        stoneBase: TEMPLE_PALETTE.sandstoneMid,
        stoneHighlight: TEMPLE_PALETTE.sandstoneSunlit,
        stoneShadow: TEMPLE_PALETTE.sandstoneShadow,
        isRestored: true
      });

      // Draped Marigold Flower Garland (Toran) around pillar neck
      ArtDirection.drawMarigoldGarland(ctx, 10, 42, 70, 42, 8, 9);
      ArtDirection.drawMarigoldGarland(ctx, 12, 120, 68, 120, 6, 8);

      // Glowing Sacred Sanskrit Glyph on shaft
      ctx.fillStyle = TEMPLE_PALETTE.goldGlow;
      ctx.font = "bold 16px 'Cinzel', serif";
      ctx.textAlign = 'center';
      ctx.fillText('ॐ', 40, 85);

      canvas.refresh();
    }
  }

  /**
   * Level 1 Textures: Foundations, Chasm Pillars, Mist, Entrance Portal, Sanctum Back Wall, Skyline
   */
  static createLevelOneTextures(scene) {
    // 1. Subterranean Ashlar Foundation Stone (128x128 seamless)
    if (!scene.textures.exists('foundation_stone')) {
      const canvas = scene.textures.createCanvas('foundation_stone', 128, 128);
      const ctx = canvas.getContext();
      ArtDirection.drawFoundationStone(ctx, 128, 128);
      canvas.refresh();
    }

    // 2. Carved Adhishthana Plinth Base (128x48)
    if (!scene.textures.exists('foundation_adhishthana')) {
      const canvas = scene.textures.createCanvas('foundation_adhishthana', 128, 48);
      const ctx = canvas.getContext();
      ArtDirection.drawFoundationAdhishthana(ctx, 128, 48);
      canvas.refresh();
    }

    // 3. Deep Chasm Foundation Pillar (80x280)
    if (!scene.textures.exists('chasm_foundation_pillar')) {
      const canvas = scene.textures.createCanvas('chasm_foundation_pillar', 80, 280);
      const ctx = canvas.getContext();
      ArtDirection.drawChasmFoundationPillar(ctx, 80, 280);
      canvas.refresh();
    }

    // 4. Ethereal Chasm Mist (640x120)
    if (!scene.textures.exists('chasm_mist')) {
      const canvas = scene.textures.createCanvas('chasm_mist', 640, 120);
      const ctx = canvas.getContext();
      ArtDirection.drawChasmMist(ctx, 640, 120);
      canvas.refresh();
    }

    // 5. Sacred Entrance Mandapa Portal (140x360)
    if (!scene.textures.exists('entrance_mandapa_portal')) {
      const canvas = scene.textures.createCanvas('entrance_mandapa_portal', 140, 360);
      const ctx = canvas.getContext();
      ArtDirection.drawEntranceMandapaPortal(ctx, 140, 360);
      canvas.refresh();
    }

    // 6. Sanctum Garbhagriha Back Wall & Vimana (140x380)
    if (!scene.textures.exists('sanctum_back_wall')) {
      const canvas = scene.textures.createCanvas('sanctum_back_wall', 140, 380);
      const ctx = canvas.getContext();
      ArtDirection.drawSanctumBackWall(ctx, 140, 380);
      canvas.refresh();
    }

    // 7. Distant Temple Gopuram Silhouettes (1280x220)
    if (!scene.textures.exists('bg_temple_silhouettes')) {
      const canvas = scene.textures.createCanvas('bg_temple_silhouettes', 1280, 220);
      const ctx = canvas.getContext();
      ArtDirection.drawDistantTempleSilhouettes(ctx, 1280, 220);
      canvas.refresh();
    }
  }

  /**
   * Level 2 Textures: Broken & Restored Bridge, Fallen Columns, Water
   */
  static createLevelTwoTextures(scene) {
    // 1. Broken Bridge (320x64)
    if (!scene.textures.exists('bridge_broken')) {
      const canvas = scene.textures.createCanvas('bridge_broken', 320, 64);
      const ctx = canvas.getContext();

      // Left stone abutment
      ArtDirection.drawStonePlatform(ctx, 64, 40, {
        stoneBase: TEMPLE_PALETTE.stoneBase,
        stoneHighlight: TEMPLE_PALETTE.stoneHighlight,
        stoneShadow: TEMPLE_PALETTE.stoneDeepShadow
      });

      // Splintered timber crossbeams projecting into chasm
      ctx.fillStyle = '#422510';
      ctx.beginPath();
      ctx.moveTo(64, 8);
      ctx.lineTo(105, 12);
      ctx.lineTo(95, 24);
      ctx.lineTo(64, 26);
      ctx.closePath();
      ctx.fill();

      // Right stone abutment
      ctx.save();
      ctx.translate(256, 0);
      ArtDirection.drawStonePlatform(ctx, 64, 40, {
        stoneBase: TEMPLE_PALETTE.stoneBase,
        stoneHighlight: TEMPLE_PALETTE.stoneHighlight,
        stoneShadow: TEMPLE_PALETTE.stoneDeepShadow
      });
      ctx.restore();

      ctx.fillStyle = '#422510';
      ctx.beginPath();
      ctx.moveTo(256, 10);
      ctx.lineTo(215, 14);
      ctx.lineTo(225, 26);
      ctx.lineTo(256, 28);
      ctx.closePath();
      ctx.fill();

      // Broken jagged rocks at water level
      ctx.fillStyle = TEMPLE_PALETTE.stoneDeepShadow;
      ctx.beginPath();
      ctx.moveTo(130, 60);
      ctx.lineTo(145, 42);
      ctx.lineTo(165, 48);
      ctx.lineTo(180, 60);
      ctx.closePath();
      ctx.fill();

      canvas.refresh();
    }

    // 2. Restored Bridge (320x64)
    if (!scene.textures.exists('bridge_restored')) {
      const canvas = scene.textures.createCanvas('bridge_restored', 320, 64);
      const ctx = canvas.getContext();

      // Complete Solid Carved Bridge Span
      ArtDirection.drawStonePlatform(ctx, 320, 32, {
        stoneBase: TEMPLE_PALETTE.sandstoneMid,
        stoneHighlight: TEMPLE_PALETTE.sandstoneSunlit,
        stoneShadow: TEMPLE_PALETTE.sandstoneShadow
      });

      // Solid stone arch foundation under bridge
      ctx.fillStyle = TEMPLE_PALETTE.sandstoneShadow;
      ctx.beginPath();
      ctx.moveTo(0, 32);
      ctx.lineTo(320, 32);
      ctx.lineTo(320, 56);
      ctx.quadraticCurveTo(160, 24, 0, 56);
      ctx.closePath();
      ctx.fill();

      // Ornate Balustrade Railing & Diya Lanterns
      ctx.fillStyle = TEMPLE_PALETTE.sandstoneHighlight;
      ctx.fillRect(0, 0, 320, 4);
      for (let x = 16; x < 310; x += 32) {
        // Baluster post
        ArtDirection.drawBeveledStone(
          ctx, x, -8, 8, 14,
          TEMPLE_PALETTE.sandstoneBase,
          TEMPLE_PALETTE.sandstoneSunlit,
          TEMPLE_PALETTE.sandstoneShadow,
          1
        );
        // Small glowing diya beacon on baluster
        ctx.fillStyle = TEMPLE_PALETTE.goldBright;
        ctx.beginPath();
        ctx.arc(x + 4, -9, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      // Marigold garland across bridge span
      ArtDirection.drawMarigoldGarland(ctx, 8, 4, 160, 4, 6, 10);
      ArtDirection.drawMarigoldGarland(ctx, 160, 4, 312, 4, 6, 10);

      canvas.refresh();
    }

    // 3. Fallen Column Decoration (120x36)
    if (!scene.textures.exists('fallen_column')) {
      const canvas = scene.textures.createCanvas('fallen_column', 120, 36);
      const ctx = canvas.getContext();
      ArtDirection.drawBeveledStone(
        ctx, 10, 4, 100, 28,
        TEMPLE_PALETTE.sandstoneBase,
        TEMPLE_PALETTE.sandstoneHighlight,
        TEMPLE_PALETTE.sandstoneShadow,
        2
      );
      ArtDirection.drawMossCluster(ctx, 24, 0, 26, 6);
      ArtDirection.drawMossCluster(ctx, 70, 0, 30, 6);
      canvas.refresh();
    }

    // 4. Broken Temple Statue (72x88)
    if (!scene.textures.exists('broken_statue')) {
      const canvas = scene.textures.createCanvas('broken_statue', 72, 88);
      const ctx = canvas.getContext();
      // Pedestal
      ArtDirection.drawBeveledStone(
        ctx, 8, 66, 56, 20,
        TEMPLE_PALETTE.stoneBase,
        TEMPLE_PALETTE.stoneHighlight,
        TEMPLE_PALETTE.stoneDeepShadow,
        2
      );
      // Weathered deity torso silhouette
      ctx.fillStyle = TEMPLE_PALETTE.stoneMid;
      ctx.beginPath();
      ctx.moveTo(22, 66);
      ctx.lineTo(20, 36);
      ctx.quadraticCurveTo(26, 16, 36, 14);
      ctx.quadraticCurveTo(46, 16, 52, 36);
      ctx.lineTo(50, 66);
      ctx.closePath();
      ctx.fill();
      ArtDirection.drawCrack(ctx, 36, 20, 24, 1.2, TEMPLE_PALETTE.stoneDeepShadow);
      canvas.refresh();
    }

    // 5. Courtyard Water Tile (256x40)
    if (!scene.textures.exists('courtyard_water')) {
      const canvas = scene.textures.createCanvas('courtyard_water', 256, 40);
      const ctx = canvas.getContext();
      const waterGrad = ctx.createLinearGradient(0, 0, 0, 40);
      waterGrad.addColorStop(0, TEMPLE_PALETTE.waterSurface);
      waterGrad.addColorStop(0.4, TEMPLE_PALETTE.waterMid);
      waterGrad.addColorStop(1, TEMPLE_PALETTE.waterAbyss);
      ctx.fillStyle = waterGrad;
      ctx.fillRect(0, 0, 256, 40);

      // Shimmering reflective water surface wavelets
      ctx.strokeStyle = TEMPLE_PALETTE.waterHighlight;
      ctx.lineWidth = 1.5;
      for (let x = 0; x < 256; x += 48) {
        ctx.beginPath();
        ctx.moveTo(x + 4, 3);
        ctx.lineTo(x + 28, 3);
        ctx.moveTo(x + 22, 8);
        ctx.lineTo(x + 44, 8);
        ctx.stroke();
      }
      canvas.refresh();
    }
  }

  /**
   * Level 3 Textures: Ancient Bells, Forgotten Shrine, Inner Hall Walls & Lamps
   */
  static createLevelThreeTextures(scene) {
    // 1. Ancient Bell Inactive (60x72)
    if (!scene.textures.exists('ancient_bell')) {
      const canvas = scene.textures.createCanvas('ancient_bell', 60, 72);
      const ctx = canvas.getContext();
      ArtDirection.drawAncientBell(ctx, 60, 72, false);
      canvas.refresh();
    }

    // 2. Ancient Bell Active (60x72)
    if (!scene.textures.exists('ancient_bell_active')) {
      const canvas = scene.textures.createCanvas('ancient_bell_active', 60, 72);
      const ctx = canvas.getContext();
      ArtDirection.drawAncientBell(ctx, 60, 72, true);
      canvas.refresh();
    }

    // 3. Broken Forgotten Shrine (80x110)
    if (!scene.textures.exists('shrine_broken')) {
      const canvas = scene.textures.createCanvas('shrine_broken', 80, 110);
      const ctx = canvas.getContext();

      // Plinth
      ArtDirection.drawBeveledStone(
        ctx, 6, 82, 68, 26,
        TEMPLE_PALETTE.stoneBase,
        TEMPLE_PALETTE.stoneHighlight,
        TEMPLE_PALETTE.stoneDeepShadow,
        2
      );

      // Jagged broken pillars
      ArtDirection.drawCarvedPillar(ctx, 16, 36, 14, 46, {
        stoneBase: TEMPLE_PALETTE.stoneBase,
        stoneHighlight: TEMPLE_PALETTE.stoneHighlight,
        stoneShadow: TEMPLE_PALETTE.stoneDeepShadow,
        isBroken: true
      });
      ArtDirection.drawCarvedPillar(ctx, 50, 24, 14, 58, {
        stoneBase: TEMPLE_PALETTE.stoneBase,
        stoneHighlight: TEMPLE_PALETTE.stoneHighlight,
        stoneShadow: TEMPLE_PALETTE.stoneDeepShadow,
        isBroken: true
      });

      // Moss on plinth
      ArtDirection.drawMossCluster(ctx, 10, 78, 22, 5);
      ArtDirection.drawMossCluster(ctx, 48, 78, 24, 5);

      canvas.refresh();
    }

    // 4. Restored Forgotten Shrine (80x110)
    if (!scene.textures.exists('shrine_restored')) {
      const canvas = scene.textures.createCanvas('shrine_restored', 80, 110);
      const ctx = canvas.getContext();

      // Divine golden radiance halo
      const halo = ctx.createRadialGradient(40, 55, 6, 40, 55, 48);
      halo.addColorStop(0, 'rgba(255, 215, 0, 0.6)');
      halo.addColorStop(0.5, 'rgba(255, 140, 0, 0.25)');
      halo.addColorStop(1, 'rgba(255, 100, 0, 0)');
      ctx.fillStyle = halo;
      ctx.fillRect(0, 0, 80, 110);

      // Ornate tiered plinth
      ArtDirection.drawBeveledStone(
        ctx, 6, 82, 68, 26,
        TEMPLE_PALETTE.stoneBase,
        TEMPLE_PALETTE.goldBright,
        TEMPLE_PALETTE.stoneDeepShadow,
        2
      );

      // Twin carved sanctum pillars
      ArtDirection.drawCarvedPillar(ctx, 14, 24, 14, 58, {
        stoneBase: TEMPLE_PALETTE.stoneMid,
        stoneHighlight: TEMPLE_PALETTE.goldBright,
        stoneShadow: TEMPLE_PALETTE.stoneDeepShadow,
        isRestored: true
      });
      ArtDirection.drawCarvedPillar(ctx, 52, 24, 14, 58, {
        stoneBase: TEMPLE_PALETTE.stoneMid,
        stoneHighlight: TEMPLE_PALETTE.goldBright,
        stoneShadow: TEMPLE_PALETTE.stoneDeepShadow,
        isRestored: true
      });

      // Torana Arch & Kalasha top
      ctx.fillStyle = TEMPLE_PALETTE.goldBright;
      ctx.beginPath();
      ctx.moveTo(12, 24);
      ctx.quadraticCurveTo(40, 4, 68, 24);
      ctx.lineTo(62, 28);
      ctx.quadraticCurveTo(40, 14, 18, 28);
      ctx.closePath();
      ctx.fill();

      // Golden Kalasha finial
      ctx.beginPath();
      ctx.arc(40, 5, 4.5, 0, Math.PI * 2);
      ctx.fill();

      // Inner Diya Flame
      ArtDirection.drawDiyaLamp(ctx, 28, 56, 24, 28, true);

      canvas.refresh();
    }

    // 5. Inner Hall Wall Tile (64x128)
    if (!scene.textures.exists('inner_wall')) {
      const canvas = scene.textures.createCanvas('inner_wall', 64, 128);
      const ctx = canvas.getContext();
      ctx.fillStyle = TEMPLE_PALETTE.stoneDarkest;
      ctx.fillRect(0, 0, 64, 128);
      // Carved diamond lattice relief
      ctx.strokeStyle = 'rgba(255, 180, 70, 0.16)';
      ctx.lineWidth = 1.5;
      for (let y = 16; y <= 112; y += 32) {
        ctx.beginPath();
        ctx.moveTo(32, y - 12);
        ctx.lineTo(52, y);
        ctx.lineTo(32, y + 12);
        ctx.lineTo(12, y);
        ctx.closePath();
        ctx.stroke();
      }
      canvas.refresh();
    }

    // 6. Inner Hanging Lamp (32x56)
    if (!scene.textures.exists('inner_lamp')) {
      const canvas = scene.textures.createCanvas('inner_lamp', 32, 56);
      const ctx = canvas.getContext();
      // Brass chain
      ctx.strokeStyle = TEMPLE_PALETTE.bronzeHighlight;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(16, 0);
      ctx.lineTo(16, 26);
      ctx.stroke();
      // Diya bowl
      ctx.fillStyle = TEMPLE_PALETTE.bronzeBase;
      ctx.beginPath();
      ctx.ellipse(16, 38, 12, 6, 0, 0, Math.PI * 2);
      ctx.fill();
      // Holy flame
      const halo = ctx.createRadialGradient(16, 32, 1, 16, 32, 15);
      halo.addColorStop(0, 'rgba(255, 240, 150, 0.9)');
      halo.addColorStop(0.4, 'rgba(255, 160, 20, 0.55)');
      halo.addColorStop(1, 'rgba(255, 80, 0, 0)');
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(16, 32, 15, 0, Math.PI * 2);
      ctx.fill();
      canvas.refresh();
    }

    // 7. Ancient Iron Gate (48x120)
    if (!scene.textures.exists('ancient_gate_iron')) {
      const canvas = scene.textures.createCanvas('ancient_gate_iron', 48, 120);
      const ctx = canvas.getContext();
      ArtDirection.drawBeveledStone(
        ctx, 0, 0, 48, 120,
        TEMPLE_PALETTE.stoneDarkest,
        TEMPLE_PALETTE.stoneMid,
        '#0a080d',
        3
      );
      // Iron grilles
      ctx.fillStyle = TEMPLE_PALETTE.bronzeDark;
      for (let x = 8; x <= 40; x += 10) {
        ctx.fillRect(x - 2, 6, 4, 108);
      }
      canvas.refresh();
    }
  }

  /**
   * Sacred Temple Heart Icons for Health System (26x26)
   * heart_full: Glowing ruby-crimson gem with warm gold filigree border and celestial gleam
   * heart_empty: Hollow dark terracotta/stone vessel with tarnished bronze border
   */
  static createHeartTextures(scene) {
    const traceHeart = (ctx, cx, cy, w, h) => {
      ctx.beginPath();
      const topCurveH = h * 0.35;
      ctx.moveTo(cx, cy + h * 0.28);
      // Top left lobe
      ctx.bezierCurveTo(cx, cy, cx - w / 2, cy, cx - w / 2, cy + topCurveH);
      // Bottom left point
      ctx.bezierCurveTo(cx - w / 2, cy + (h + topCurveH) / 2, cx, cy + h * 0.85, cx, cy + h);
      // Bottom right point
      ctx.bezierCurveTo(cx, cy + h * 0.85, cx + w / 2, cy + (h + topCurveH) / 2, cx + w / 2, cy + topCurveH);
      // Top right lobe
      ctx.bezierCurveTo(cx + w / 2, cy, cx, cy, cx, cy + h * 0.28);
      ctx.closePath();
    };

    // 1. Full Sacred Heart (Glowing temple ruby with gold filigree)
    if (!scene.textures.exists('heart_full')) {
      const canvas = scene.textures.createCanvas('heart_full', 26, 26);
      const ctx = canvas.getContext();

      // Ambient drop shadow
      ctx.save();
      ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
      ctx.shadowBlur = 4;
      ctx.shadowOffsetY = 2;

      // Ruby gradient fill
      const grad = ctx.createLinearGradient(4, 2, 22, 24);
      grad.addColorStop(0, '#ff4757');
      grad.addColorStop(0.4, '#e81735');
      grad.addColorStop(1, '#8b001a');
      ctx.fillStyle = grad;
      traceHeart(ctx, 13, 2, 22, 21);
      ctx.fill();
      ctx.restore();

      // Ornate Gold Temple Border
      ctx.strokeStyle = '#ffd700';
      ctx.lineWidth = 1.8;
      traceHeart(ctx, 13, 2, 22, 21);
      ctx.stroke();

      // Inner warm amber rim
      ctx.strokeStyle = '#ff9900';
      ctx.lineWidth = 0.8;
      traceHeart(ctx, 13, 3, 19, 18);
      ctx.stroke();

      // Celestial specular gleam on top-left lobe
      ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
      ctx.beginPath();
      ctx.ellipse(8, 7, 3.5, 2, -Math.PI / 4, 0, Math.PI * 2);
      ctx.fill();

      // Gold crown apex pip at top cleft
      ctx.fillStyle = '#ffe680';
      ctx.beginPath();
      ctx.arc(13, 6, 1.2, 0, Math.PI * 2);
      ctx.fill();

      canvas.refresh();
    }

    // 2. Empty / Lost Sacred Heart Vessel
    if (!scene.textures.exists('heart_empty')) {
      const canvas = scene.textures.createCanvas('heart_empty', 26, 26);
      const ctx = canvas.getContext();

      // Dark hollow stone/obsidian background
      ctx.fillStyle = 'rgba(28, 14, 8, 0.85)';
      traceHeart(ctx, 13, 2, 22, 21);
      ctx.fill();

      // Muted tarnished bronze/stone border
      ctx.strokeStyle = 'rgba(138, 82, 41, 0.85)';
      ctx.lineWidth = 1.6;
      traceHeart(ctx, 13, 2, 22, 21);
      ctx.stroke();

      // Faint inner depleted contour
      ctx.strokeStyle = 'rgba(60, 30, 15, 0.6)';
      ctx.lineWidth = 1;
      traceHeart(ctx, 13, 3, 19, 18);
      ctx.stroke();

      // Faint subtle crack in empty vessel
      ctx.strokeStyle = 'rgba(160, 90, 50, 0.4)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(13, 7);
      ctx.lineTo(12, 12);
      ctx.lineTo(14, 15);
      ctx.lineTo(13, 19);
      ctx.stroke();

      canvas.refresh();
    }
  }
}
