import { ArtDirection, TEMPLE_PALETTE } from './ArtDirection.js';

/**
 * TextureGenerator
 * Handcrafted 2D Indian Temple Art Direction Texture Generator for Ganesha's Broken Temple.
 * Replaces prototype geometric placeholders with rich, cohesive Indian temple stonecraft,
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
    this.createCollectibleTextures(scene);
    this.createRestorationPillarTextures(scene);
    this.createLevelTwoTextures(scene);
    this.createLevelThreeTextures(scene);
    this.createHeartTextures(scene);
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
   * Far Sky Background with Crescent Moon and Twinkling Stars (640x720)
   */
  static createSkyTexture(scene) {
    if (scene.textures.exists('bg_sky')) return;
    const canvas = scene.textures.createCanvas('bg_sky', 640, 720);
    const ctx = canvas.getContext();

    // Majestic Indian Twilight Sky Gradient
    const grad = ctx.createLinearGradient(0, 0, 0, 720);
    grad.addColorStop(0, TEMPLE_PALETTE.skyNight);
    grad.addColorStop(0.3, TEMPLE_PALETTE.skyIndigo);
    grad.addColorStop(0.6, TEMPLE_PALETTE.skyTwilight);
    grad.addColorStop(0.8, TEMPLE_PALETTE.skyHorizonAmber);
    grad.addColorStop(0.92, TEMPLE_PALETTE.skyHorizonGold);
    grad.addColorStop(1, TEMPLE_PALETTE.skyHorizonWarm);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 640, 720);

    // Celestial Stars
    ctx.fillStyle = 'rgba(255, 245, 210, 0.85)';
    for (let i = 0; i < 55; i++) {
      const sx = (i * 89) % 640;
      const sy = (i * 43) % 310;
      const r = (i % 4 === 0) ? 1.6 : (i % 2 === 0 ? 1.1 : 0.7);
      ctx.beginPath();
      ctx.arc(sx, sy, r, 0, Math.PI * 2);
      ctx.fill();
    }

    canvas.refresh();
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
   * Distant Temple Silhouettes & Holy Mountain Ridges (960x360)
   */
  static createMountainsTexture(scene) {
    if (scene.textures.exists('bg_mountains')) return;
    const canvas = scene.textures.createCanvas('bg_mountains', 960, 360);
    const ctx = canvas.getContext();

    // Mountain silhouettes in atmospheric dusk
    ctx.fillStyle = '#2b1226';
    ctx.beginPath();
    ctx.moveTo(0, 360);
    ctx.lineTo(0, 230);
    ctx.lineTo(110, 175);
    ctx.lineTo(230, 245);
    ctx.lineTo(390, 155);
    ctx.lineTo(530, 240);
    ctx.lineTo(670, 170);
    ctx.lineTo(810, 255);
    ctx.lineTo(960, 195);
    ctx.lineTo(960, 360);
    ctx.closePath();
    ctx.fill();

    // Distant Temple Gopuram / Shikhara Silhouettes matching Main.png
    ctx.fillStyle = '#1c0818';
    const shikharas = [160, 340, 520, 710, 880];
    shikharas.forEach((sx, idx) => {
      const h = idx % 2 === 0 ? 150 : 120;
      const baseW = 44;
      const baseY = 270;
      const topY = baseY - h;

      // Stepped tiered Dravidian/Kalinga tower silhouette
      for (let s = 0; s < 5; s++) {
        const stepW = baseW - s * 7;
        const stepY = baseY - s * (h / 5.5);
        ctx.fillRect(sx - stepW / 2, stepY - 14, stepW, 14);
      }
      // Kalasha Finial pinnacle
      ctx.beginPath();
      ctx.arc(sx, topY - 4, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(sx, topY - 14);
      ctx.lineTo(sx - 2.5, topY - 4);
      ctx.lineTo(sx + 2.5, topY - 4);
      ctx.closePath();
      ctx.fill();
    });

    canvas.refresh();
  }

  /**
   * Midground Temple Ruins, Carved Arches & Hanging Chains (960x400)
   */
  static createRuinsTexture(scene) {
    if (scene.textures.exists('bg_ruins')) return;
    const canvas = scene.textures.createCanvas('bg_ruins', 960, 400);
    const ctx = canvas.getContext();

    // Dark sandstone silhouette layer
    ctx.fillStyle = 'rgba(40, 18, 14, 0.78)';

    // Carved Cusped Torana Arches
    for (let x = 60; x < 960; x += 280) {
      // Left pillar
      ctx.fillRect(x, 90, 26, 310);
      // Right pillar
      ctx.fillRect(x + 130, 90, 26, 310);
      // Lintel
      ctx.fillRect(x - 6, 80, 168, 18);

      // Cusped arch
      ctx.beginPath();
      ctx.arc(x + 78, 100, 76, Math.PI, 0);
      ctx.lineWidth = 22;
      ctx.strokeStyle = 'rgba(40, 18, 14, 0.78)';
      ctx.stroke();

      // Hanging Chains from Arch
      ctx.strokeStyle = 'rgba(30, 12, 8, 0.85)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x + 78, 98);
      ctx.lineTo(x + 78, 175);
      ctx.stroke();

      // Small hanging bell silhouette
      ctx.beginPath();
      ctx.arc(x + 78, 180, 7, Math.PI, 0);
      ctx.lineTo(x + 85, 192);
      ctx.lineTo(x + 71, 192);
      ctx.closePath();
      ctx.fill();
    }

    // Ruined broken wall base
    ctx.fillRect(0, 320, 960, 80);

    canvas.refresh();
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
   * Temple Gate Portcullis (48x120)
   */
  static createTempleGateTexture(scene) {
    if (scene.textures.exists('temple_gate')) return;
    const canvas = scene.textures.createCanvas('temple_gate', 48, 120);
    const ctx = canvas.getContext();

    // Heavy Stone & Bronze Portcullis
    ArtDirection.drawBeveledStone(
      ctx, 0, 0, 48, 120,
      TEMPLE_PALETTE.stoneCharcoal,
      TEMPLE_PALETTE.stoneMid,
      TEMPLE_PALETTE.stoneDarkest,
      3
    );

    // Vertical Iron Grille Bars
    ctx.fillStyle = TEMPLE_PALETTE.bronzeDark;
    for (let x = 8; x <= 40; x += 10) {
      ctx.fillRect(x - 2, 6, 4, 108);
      ctx.fillStyle = TEMPLE_PALETTE.bronzeHighlight;
      ctx.fillRect(x, 6, 1.5, 108);
      ctx.fillStyle = TEMPLE_PALETTE.bronzeDark;
    }

    // Heavy Horizontal Bronze Cross-Bands with Studs
    const bands = [12, 45, 78, 106];
    bands.forEach(by => {
      ArtDirection.drawBeveledStone(
        ctx, 0, by, 48, 10,
        TEMPLE_PALETTE.bronzeBase,
        TEMPLE_PALETTE.bronzeHighlight,
        TEMPLE_PALETTE.bronzeDark,
        1.5
      );
      // Bronze rivets/studs
      ctx.fillStyle = TEMPLE_PALETTE.goldBright;
      for (let rx = 6; rx <= 42; rx += 10) {
        ctx.beginPath();
        ctx.arc(rx, by + 5, 2, 0, Math.PI * 2);
        ctx.fill();
      }
    });

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
