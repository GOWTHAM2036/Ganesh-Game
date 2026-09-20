/**
 * ArtDirection.js
 * Centralized Visual Style System and Handcrafted Artisan Graphics Generator
 * for Ganesha's Broken Temple.
 * 
 * Inspired by ancient Indian temple architecture (Dravidian, Nagara, and Kalinga stonecraft).
 * Defines the unified visual palette and reusable canvas drawing routines for
 * stone masonry, carved pillars, torana arches, diyas, bells, collectibles, and environments.
 */

export const TEMPLE_PALETTE = {
  // Sky & Atmospheric Gradients
  skyNight: '#0c0717',
  skyIndigo: '#1a102e',
  skyTwilight: '#331a40',
  skyHorizonAmber: '#c95424',
  skyHorizonGold: '#e87e2a',
  skyHorizonWarm: '#fca34d',

  // Temple Stone & Masonry
  stoneDarkest: '#18151f',
  stoneDeepShadow: '#221e2a',
  stoneCharcoal: '#2c2736',
  stoneBase: '#423b4e',
  stoneMid: '#574e63',
  stoneHighlight: '#756b82',
  stoneSunlit: '#9c91ab',

  // Warm Sandstone (Outer Sanctum & Level 1)
  sandstoneShadow: '#422c1b',
  sandstoneBase: '#6e4c30',
  sandstoneMid: '#946a45',
  sandstoneHighlight: '#b8895e',
  sandstoneSunlit: '#d9ab7e',

  // Aged Bronze & Metal (Bells, Chains, Gates)
  bronzeDark: '#2b2318',
  bronzeBase: '#4d3d28',
  bronzeMid: '#755d3b',
  bronzeHighlight: '#a38454',
  bronzeGold: '#c7a369',

  // Sacred Gold & Celestial Energy
  goldDark: '#8a5900',
  goldBase: '#d48800',
  goldMid: '#ffaa00',
  goldBright: '#ffd700',
  goldGlow: '#fff0a6',

  // Diya Flame & Warm Torchlight
  flameCore: '#ffffff',
  flameBright: '#fff375',
  flameOrange: '#ff8800',
  flameDeepRed: '#d63400',
  flameHalo: 'rgba(255, 150, 20, 0.28)',

  // Sacred Crystals & Divine Cyan (Sacred Stone)
  cyanDark: '#005b66',
  cyanBase: '#00838f',
  cyanMid: '#00acc1',
  cyanBright: '#00e5ff',
  cyanGlow: '#b2ebf2',

  // Divine Lotus & Sacred Florals
  lotusDeepPink: '#880e4f',
  lotusPink: '#d81b60',
  lotusBrightPink: '#ff4081',
  lotusPetalTip: '#ff80ab',
  lotusGoldCore: '#ffd54f',

  // Marigold Florals (Garlands & Torans)
  marigoldOrange: '#e65100',
  marigoldGold: '#ff9800',
  marigoldYellow: '#ffeb3b',

  // Moss & Temple Overgrowth
  mossDark: '#1c2e14',
  mossBase: '#2d4520',
  mossMid: '#436630',
  mossHighlight: '#68944d',
  mossBright: '#8cb86e',

  // Water (Courtyard of Silent Waters)
  waterAbyss: '#09131a',
  waterDeep: '#11222c',
  waterMid: '#1a3644',
  waterSurface: '#2a556b',
  waterHighlight: '#4e86a4'
};

/**
 * Helper utilities for drawing beveled stone, decorative carvings, and temple motifs
 */
export class ArtDirection {
  /**
   * Draws a beveled stone rectangle with highlight (top/left) and shadow (bottom/right)
   */
  static drawBeveledStone(ctx, x, y, w, h, baseColor, highlightColor, shadowColor, bevel = 2) {
    // Base slab
    ctx.fillStyle = baseColor;
    ctx.fillRect(x, y, w, h);

    // Top & Left Highlights
    ctx.fillStyle = highlightColor;
    ctx.fillRect(x, y, w, bevel); // top
    ctx.fillRect(x, y, bevel, h); // left

    // Bottom & Right Shadows
    ctx.fillStyle = shadowColor;
    ctx.fillRect(x, y + h - bevel, w, bevel); // bottom
    ctx.fillRect(x + w - bevel, y, bevel, h); // right
  }

  /**
   * Draws a stone surface fissure or crack
   */
  static drawCrack(ctx, x, y, length = 16, angle = 0.5, color = TEMPLE_PALETTE.stoneDeepShadow) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(x, y);
    const midX = x + Math.cos(angle) * (length * 0.5) + (Math.random() - 0.5) * 4;
    const midY = y + Math.sin(angle) * (length * 0.5) + (Math.random() - 0.5) * 4;
    const endX = x + Math.cos(angle) * length;
    const endY = y + Math.sin(angle) * length;
    ctx.lineTo(midX, midY);
    ctx.lineTo(endX, endY);
    ctx.stroke();

    // Small branch
    ctx.beginPath();
    ctx.moveTo(midX, midY);
    ctx.lineTo(midX + Math.cos(angle + 0.8) * (length * 0.4), midY + Math.sin(angle + 0.8) * (length * 0.4));
    ctx.stroke();
  }

  /**
   * Draws a cluster of lush ancient moss on top of a stone surface
   */
  static drawMossCluster(ctx, x, y, width = 24, height = 6) {
    ctx.fillStyle = TEMPLE_PALETTE.mossDark;
    ctx.beginPath();
    ctx.ellipse(x + width / 2, y + height / 2, width / 2, height / 2, 0, 0, Math.PI * 2);
    ctx.fill();

    // Moss fronds
    ctx.fillStyle = TEMPLE_PALETTE.mossMid;
    for (let i = 0; i < width; i += 4) {
      const frondH = 3 + Math.sin(i * 1.5) * 2.5;
      ctx.beginPath();
      ctx.arc(x + i, y + height * 0.4, frondH * 0.7, 0, Math.PI * 2);
      ctx.fill();
    }

    // Bright moss highlights
    ctx.fillStyle = TEMPLE_PALETTE.mossHighlight;
    for (let i = 2; i < width - 2; i += 6) {
      ctx.beginPath();
      ctx.arc(x + i, y + 2, 1.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  /**
   * Draws traditional Indian temple flower garland (Toran / Mala)
   * Yellow and orange marigold flowers suspended in a graceful catenary curve
   */
  static drawMarigoldGarland(ctx, startX, startY, endX, endY, sag = 12, flowerCount = 9) {
    for (let i = 0; i <= flowerCount; i++) {
      const t = i / flowerCount;
      const x = startX + (endX - startX) * t;
      const y = startY + (endY - startY) * t + Math.sin(t * Math.PI) * sag;

      // Leaf / green string behind
      if (i < flowerCount) {
        const nextT = (i + 1) / flowerCount;
        const nextX = startX + (endX - startX) * nextT;
        const nextY = startY + (endY - startY) * nextT + Math.sin(nextT * Math.PI) * sag;
        ctx.strokeStyle = TEMPLE_PALETTE.mossMid;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(nextX, nextY);
        ctx.stroke();
      }

      // Marigold blossom
      const isOrange = i % 2 === 0;
      ctx.fillStyle = isOrange ? TEMPLE_PALETTE.marigoldOrange : TEMPLE_PALETTE.marigoldYellow;
      ctx.beginPath();
      ctx.arc(x, y, 3.5, 0, Math.PI * 2);
      ctx.fill();

      // Blossom petal edge
      ctx.fillStyle = isOrange ? TEMPLE_PALETTE.marigoldGold : '#fff59d';
      ctx.beginPath();
      ctx.arc(x, y - 1, 1.8, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  /**
   * Draws a traditional carved Indian stone arch (Torana)
   */
  static drawToranaArch(ctx, x, y, width, height, options = {}) {
    const isRestored = options.isRestored || false;
    const stoneBase = options.stoneBase || TEMPLE_PALETTE.stoneBase;
    const stoneHighlight = options.stoneHighlight || TEMPLE_PALETTE.stoneHighlight;
    const stoneShadow = options.stoneShadow || TEMPLE_PALETTE.stoneDeepShadow;

    const pillarW = 28;
    const leftPillarX = x;
    const rightPillarX = x + width - pillarW;
    const archH = 48;

    // 1. Left and Right Pillars
    this.drawCarvedPillar(ctx, leftPillarX, y + archH, pillarW, height - archH, {
      stoneBase, stoneHighlight, stoneShadow, isRestored
    });
    this.drawCarvedPillar(ctx, rightPillarX, y + archH, pillarW, height - archH, {
      stoneBase, stoneHighlight, stoneShadow, isRestored
    });

    // 2. Arch Lintel beam
    this.drawBeveledStone(ctx, x - 8, y + archH - 16, width + 16, 20, stoneBase, stoneHighlight, stoneShadow, 3);

    // Decorative stepped shikhara / pediment above lintel
    const stepCount = 4;
    for (let s = 0; s < stepCount; s++) {
      const stepW = (width + 16) - (s * 20);
      const stepX = x - 8 + (s * 10);
      const stepY = y + archH - 16 - ((s + 1) * 8);
      this.drawBeveledStone(ctx, stepX, stepY, stepW, 8, stoneBase, stoneHighlight, stoneShadow, 1.5);

      // Lotus petal carving on steps
      ctx.fillStyle = stoneShadow;
      for (let px = stepX + 6; px < stepX + stepW - 6; px += 10) {
        ctx.beginPath();
        ctx.arc(px, stepY + 4, 2, 0, Math.PI);
        ctx.fill();
      }
    }

    // Kalasha / Finial on top center
    const centerX = x + width / 2;
    const topY = y + archH - 16 - (stepCount * 8);
    ctx.fillStyle = isRestored ? TEMPLE_PALETTE.goldBright : stoneBase;
    ctx.beginPath();
    ctx.arc(centerX, topY - 6, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = isRestored ? TEMPLE_PALETTE.goldGlow : stoneHighlight;
    ctx.beginPath();
    ctx.moveTo(centerX, topY - 18);
    ctx.lineTo(centerX - 4, topY - 6);
    ctx.lineTo(centerX + 4, topY - 6);
    ctx.closePath();
    ctx.fill();

    // Cusped Indian multi-foil archway curve
    ctx.save();
    ctx.beginPath();
    const spanStartX = leftPillarX + pillarW;
    const spanEndX = rightPillarX;
    const spanMidX = (spanStartX + spanEndX) / 2;
    const spanY = y + archH + 4;
    ctx.moveTo(spanStartX, spanY + 20);
    ctx.quadraticCurveTo(spanStartX, spanY, spanMidX - 24, spanY);
    ctx.arc(spanMidX, spanY, 18, Math.PI, 0, false);
    ctx.quadraticCurveTo(spanEndX, spanY, spanEndX, spanY + 20);
    ctx.strokeStyle = stoneHighlight;
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.restore();

    // Restored state: Golden marigold garlands & divine illumination
    if (isRestored) {
      this.drawMarigoldGarland(ctx, leftPillarX + 6, y + archH - 4, centerX, y + archH + 6, 8, 8);
      this.drawMarigoldGarland(ctx, centerX, y + archH + 6, rightPillarX + pillarW - 6, y + archH - 4, 8, 8);

      // Glowing sacred glyph on lintel
      ctx.fillStyle = TEMPLE_PALETTE.goldGlow;
      ctx.font = "bold 13px 'Cinzel', serif";
      ctx.textAlign = 'center';
      ctx.fillText("ॐ", centerX, y + archH - 2);
    }
  }

  /**
   * Draws a carved Indian temple stone pillar with plinth, fluted shaft, and lotus capital
   */
  static drawCarvedPillar(ctx, x, y, width, height, options = {}) {
    const isRestored = options.isRestored || false;
    const isBroken = options.isBroken || false;
    const stoneBase = options.stoneBase || TEMPLE_PALETTE.stoneBase;
    const stoneHighlight = options.stoneHighlight || TEMPLE_PALETTE.stoneHighlight;
    const stoneShadow = options.stoneShadow || TEMPLE_PALETTE.stoneDeepShadow;

    // 1. Tiered Plinth (Base)
    const baseH = 24;
    this.drawBeveledStone(ctx, x - 4, y + height - baseH, width + 8, baseH, stoneBase, stoneHighlight, stoneShadow, 3);
    this.drawBeveledStone(ctx, x - 2, y + height - baseH - 8, width + 4, 8, stoneBase, stoneHighlight, stoneShadow, 2);

    // Plinth lotus molding
    ctx.fillStyle = stoneShadow;
    for (let bx = x; bx < x + width; bx += 8) {
      ctx.beginPath();
      ctx.arc(bx + 4, y + height - baseH + 6, 3, 0, Math.PI);
      ctx.fill();
    }

    // 2. Main Shaft
    const shaftTopY = y + (isBroken ? (height * 0.45) : 32);
    const shaftH = (y + height - baseH - 8) - shaftTopY;

    if (shaftH > 0) {
      this.drawBeveledStone(ctx, x, shaftTopY, width, shaftH, stoneBase, stoneHighlight, stoneShadow, 2);

      // Fluting / vertical relief channels
      const fluteCount = Math.max(3, Math.floor(width / 8));
      const fluteStep = width / fluteCount;
      for (let f = 1; f < fluteCount; f++) {
        const fx = x + f * fluteStep;
        ctx.fillStyle = stoneShadow;
        ctx.fillRect(fx - 1, shaftTopY + 4, 1.5, shaftH - 8);
        ctx.fillStyle = stoneHighlight;
        ctx.fillRect(fx + 0.5, shaftTopY + 4, 1, shaftH - 8);
      }

      // Horizontal decorative stone rings / malas
      const midRingY = shaftTopY + shaftH * 0.45;
      this.drawBeveledStone(ctx, x - 2, midRingY, width + 4, 8, stoneBase, stoneHighlight, stoneShadow, 2);
      ctx.fillStyle = isRestored ? TEMPLE_PALETTE.goldBright : stoneHighlight;
      ctx.fillRect(x, midRingY + 2, width, 2);
    }

    if (isBroken) {
      // Jagged fracture edge at the break
      ctx.fillStyle = stoneShadow;
      ctx.beginPath();
      ctx.moveTo(x, shaftTopY);
      ctx.lineTo(x + width * 0.25, shaftTopY - 10);
      ctx.lineTo(x + width * 0.5, shaftTopY - 3);
      ctx.lineTo(x + width * 0.75, shaftTopY - 14);
      ctx.lineTo(x + width, shaftTopY);
      ctx.closePath();
      ctx.fill();

      // Crack lines descending down shaft
      this.drawCrack(ctx, x + width * 0.5, shaftTopY + 4, 28, Math.PI * 0.55);
      this.drawCrack(ctx, x + width * 0.25, shaftTopY + 12, 18, Math.PI * 0.4);

      // Weathered moss on fractured ledge
      this.drawMossCluster(ctx, x - 2, shaftTopY - 4, width + 4, 8);
    } else {
      // 3. Ornate Capital (Top)
      // Pot-and-foliage (Kumbha-Kalasha) capital
      const capH = 32;
      this.drawBeveledStone(ctx, x - 6, y + capH - 10, width + 12, 10, stoneBase, stoneHighlight, stoneShadow, 2);
      this.drawBeveledStone(ctx, x - 8, y, width + 16, 12, stoneBase, stoneHighlight, stoneShadow, 2);

      // Lotus petal bulb
      ctx.fillStyle = isRestored ? TEMPLE_PALETTE.goldMid : stoneBase;
      ctx.beginPath();
      ctx.ellipse(x + width / 2, y + 18, (width + 6) / 2, 7, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = isRestored ? TEMPLE_PALETTE.goldGlow : stoneHighlight;
      ctx.beginPath();
      ctx.ellipse(x + width / 2, y + 17, (width + 2) / 2, 4, 0, 0, Math.PI * 2);
      ctx.fill();

      if (isRestored) {
        // Divine golden ribbon wrapped around column
        ctx.fillStyle = TEMPLE_PALETTE.goldBright;
        ctx.fillRect(x - 2, y + 26, width + 4, 3);
      }
    }
  }

  /**
   * Draws a multi-layered stone platform with ashlar masonry blocks, bevels, cracks, and moss
   */
  static drawStonePlatform(ctx, width, height, options = {}) {
    const stoneBase = options.stoneBase || TEMPLE_PALETTE.stoneBase;
    const stoneHighlight = options.stoneHighlight || TEMPLE_PALETTE.stoneHighlight;
    const stoneShadow = options.stoneShadow || TEMPLE_PALETTE.stoneDeepShadow;
    const hasMoss = options.hasMoss !== false;

    // Platform main body
    ctx.fillStyle = stoneBase;
    ctx.fillRect(0, 0, width, height);

    // Top surface sunlit highlight (2px crisp edge)
    ctx.fillStyle = stoneHighlight;
    ctx.fillRect(0, 0, width, 3);

    // Left/Right edge bevels
    ctx.fillRect(0, 0, 2, height);
    ctx.fillStyle = stoneShadow;
    ctx.fillRect(width - 2, 0, 2, height);
    ctx.fillRect(0, height - 3, width, 3); // bottom deep shadow

    // Individual ashlar masonry block seams
    const blockW = options.blockWidth || 48;
    ctx.fillStyle = stoneShadow;
    ctx.lineWidth = 1.5;

    // Vertical mortar joints
    for (let x = blockW; x < width; x += blockW) {
      // Joint shadow
      ctx.fillStyle = stoneShadow;
      ctx.fillRect(x - 1, 3, 1.5, height - 6);
      // Joint highlight
      ctx.fillStyle = stoneHighlight;
      ctx.fillRect(x + 0.5, 3, 1, height - 6);
    }

    // Horizontal carving relief strip across platform top face
    ctx.fillStyle = stoneShadow;
    ctx.fillRect(0, 8, width, 1.5);
    ctx.fillStyle = stoneHighlight;
    ctx.fillRect(0, 9.5, width, 1);

    // Occasional surface cracks for ancient weathered feel
    const crackStep = 96;
    for (let cx = 32; cx < width; cx += crackStep) {
      this.drawCrack(ctx, cx, 12, 14, 0.7, stoneShadow);
    }

    // Moss clumps sprouting along top rim
    if (hasMoss) {
      for (let mx = 12; mx < width - 16; mx += 64) {
        this.drawMossCluster(ctx, mx, -2, 20, 5);
      }
    }
  }

  /**
   * Draws a traditional Indian stone/bronze Diya Lamp
   */
  static drawDiyaLamp(ctx, x, y, width, height, isLit = false) {
    const centerX = x + width / 2;
    const baseCol = TEMPLE_PALETTE.bronzeBase;
    const highCol = TEMPLE_PALETTE.bronzeHighlight;
    const shdCol = TEMPLE_PALETTE.bronzeDark;

    // 1. Pedestal (Carved circular base)
    const pedH = 14;
    this.drawBeveledStone(ctx, centerX - 16, y + height - pedH, 32, pedH, baseCol, highCol, shdCol, 2);

    // Pedestal lotus rim
    ctx.fillStyle = highCol;
    for (let bx = centerX - 14; bx <= centerX + 10; bx += 6) {
      ctx.beginPath();
      ctx.arc(bx + 2, y + height - pedH + 2, 2.5, 0, Math.PI);
      ctx.fill();
    }

    // 2. Stem / Column
    const stemH = height - pedH - 18;
    this.drawBeveledStone(ctx, centerX - 5, y + 18, 10, stemH, baseCol, highCol, shdCol, 1.5);

    // Stem ring
    ctx.fillStyle = TEMPLE_PALETTE.bronzeGold;
    ctx.fillRect(centerX - 7, y + 18 + stemH * 0.5, 14, 4);

    // 3. Oil Reservoir / Bowl (Traditional broad diya vessel with pointed spout)
    const bowlY = y + 12;
    ctx.fillStyle = shdCol;
    ctx.beginPath();
    ctx.ellipse(centerX, bowlY + 6, 16, 7, 0, 0, Math.PI);
    ctx.fill();

    ctx.fillStyle = baseCol;
    ctx.beginPath();
    ctx.ellipse(centerX, bowlY + 4, 15, 6, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = highCol;
    ctx.beginPath();
    ctx.ellipse(centerX, bowlY + 3, 12, 3.5, 0, 0, Math.PI * 2);
    ctx.fill();

    // Sacred Ghee pool
    ctx.fillStyle = isLit ? '#d48800' : '#4a3200';
    ctx.beginPath();
    ctx.ellipse(centerX, bowlY + 3, 10, 2.5, 0, 0, Math.PI * 2);
    ctx.fill();

    // 4. Holy Flame (When lit)
    if (isLit) {
      // Outer radiant glow halo
      const haloGrad = ctx.createRadialGradient(centerX, bowlY - 6, 2, centerX, bowlY - 6, 24);
      haloGrad.addColorStop(0, 'rgba(255, 200, 50, 0.7)');
      haloGrad.addColorStop(0.4, 'rgba(255, 120, 10, 0.35)');
      haloGrad.addColorStop(1, 'rgba(255, 80, 0, 0)');
      ctx.fillStyle = haloGrad;
      ctx.beginPath();
      ctx.arc(centerX, bowlY - 6, 24, 0, Math.PI * 2);
      ctx.fill();

      // Outer orange flame teardrop
      ctx.fillStyle = TEMPLE_PALETTE.flameOrange;
      ctx.beginPath();
      ctx.moveTo(centerX, bowlY - 18);
      ctx.bezierCurveTo(centerX + 6, bowlY - 10, centerX + 6, bowlY, centerX, bowlY + 1);
      ctx.bezierCurveTo(centerX - 6, bowlY, centerX - 6, bowlY - 10, centerX, bowlY - 18);
      ctx.fill();

      // Inner golden yellow flame
      ctx.fillStyle = TEMPLE_PALETTE.flameBright;
      ctx.beginPath();
      ctx.moveTo(centerX, bowlY - 14);
      ctx.bezierCurveTo(centerX + 3.5, bowlY - 8, centerX + 3.5, bowlY, centerX, bowlY + 1);
      ctx.bezierCurveTo(centerX - 3.5, bowlY, centerX - 3.5, bowlY - 8, centerX, bowlY - 14);
      ctx.fill();

      // Core white heat
      ctx.fillStyle = TEMPLE_PALETTE.flameCore;
      ctx.beginPath();
      ctx.ellipse(centerX, bowlY - 3, 1.8, 4, 0, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  /**
   * Draws an ancient sacred hanging temple bell (Ghanta)
   */
  static drawAncientBell(ctx, width, height, isRung = false) {
    const centerX = width / 2;

    // 1. Hanging Iron Chain from ceiling
    ctx.strokeStyle = TEMPLE_PALETTE.stoneDarkest;
    ctx.lineWidth = 2.5;
    for (let cy = 0; cy < 16; cy += 6) {
      ctx.strokeRect(centerX - 2.5, cy, 5, 5);
    }

    // Top suspension loop
    ctx.strokeStyle = TEMPLE_PALETTE.bronzeHighlight;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(centerX, 18, 5, 0, Math.PI * 2);
    ctx.stroke();

    // 2. Bell Crown / Top dome
    ctx.fillStyle = TEMPLE_PALETTE.bronzeDark;
    ctx.beginPath();
    ctx.arc(centerX, 28, 12, Math.PI, 0);
    ctx.fill();

    // 3. Bell Body (Aged Bronze flare)
    const bellGrad = ctx.createLinearGradient(centerX - 24, 28, centerX + 24, 28);
    bellGrad.addColorStop(0, TEMPLE_PALETTE.bronzeDark);
    bellGrad.addColorStop(0.3, isRung ? TEMPLE_PALETTE.goldBase : TEMPLE_PALETTE.bronzeMid);
    bellGrad.addColorStop(0.6, isRung ? TEMPLE_PALETTE.goldBright : TEMPLE_PALETTE.bronzeHighlight);
    bellGrad.addColorStop(1, TEMPLE_PALETTE.bronzeDark);

    ctx.fillStyle = bellGrad;
    ctx.beginPath();
    ctx.moveTo(centerX - 12, 28);
    ctx.bezierCurveTo(centerX - 13, 44, centerX - 22, 54, centerX - 24, 60);
    ctx.lineTo(centerX + 24, 60);
    ctx.bezierCurveTo(centerX + 22, 54, centerX + 13, 44, centerX + 12, 28);
    ctx.closePath();
    ctx.fill();

    // 4. Carved Lotus Petal Rim around bell mouth
    ctx.fillStyle = isRung ? TEMPLE_PALETTE.goldGlow : TEMPLE_PALETTE.bronzeGold;
    ctx.fillRect(centerX - 24, 58, 48, 5);
    for (let rx = centerX - 22; rx < centerX + 22; rx += 6) {
      ctx.beginPath();
      ctx.arc(rx + 3, 63, 2.5, 0, Math.PI);
      ctx.fill();
    }

    // Horizontal engraved bands
    ctx.strokeStyle = TEMPLE_PALETTE.bronzeDark;
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(centerX - 16, 42);
    ctx.lineTo(centerX + 16, 42);
    ctx.moveTo(centerX - 19, 50);
    ctx.lineTo(centerX + 19, 50);
    ctx.stroke();

    // Sacred Trishul engraving on bell face
    ctx.fillStyle = isRung ? TEMPLE_PALETTE.goldGlow : TEMPLE_PALETTE.bronzeHighlight;
    ctx.fillRect(centerX - 1, 34, 2, 10);
    ctx.fillRect(centerX - 4, 38, 8, 1.5);
    ctx.beginPath();
    ctx.arc(centerX - 4, 36, 1.5, 0, Math.PI * 2);
    ctx.arc(centerX + 4, 36, 1.5, 0, Math.PI * 2);
    ctx.arc(centerX, 33, 1.5, 0, Math.PI * 2);
    ctx.fill();

    // 5. Clapper hanging beneath
    ctx.fillStyle = TEMPLE_PALETTE.bronzeDark;
    ctx.beginPath();
    ctx.arc(centerX, 67, 4.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = TEMPLE_PALETTE.bronzeHighlight;
    ctx.beginPath();
    ctx.arc(centerX - 1, 66, 1.5, 0, Math.PI * 2);
    ctx.fill();

    // Divine radiant aura if active
    if (isRung) {
      const aura = ctx.createRadialGradient(centerX, 46, 10, centerX, 46, 36);
      aura.addColorStop(0, 'rgba(255, 215, 0, 0.45)');
      aura.addColorStop(0.7, 'rgba(255, 170, 0, 0.18)');
      aura.addColorStop(1, 'rgba(255, 140, 0, 0)');
      ctx.fillStyle = aura;
      ctx.beginPath();
      ctx.arc(centerX, 46, 36, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  /**
   * Draws the Modak collectible matching Main.png
   * Plump sweet dumpling with ridged pleats, pointed top, and golden aura
   */
  static drawModak(ctx, size = 36) {
    const center = size / 2;

    // Radial golden glow halo
    const glow = ctx.createRadialGradient(center, center, 4, center, center, size * 0.48);
    glow.addColorStop(0, 'rgba(255, 220, 60, 0.6)');
    glow.addColorStop(0.5, 'rgba(255, 140, 0, 0.25)');
    glow.addColorStop(1, 'rgba(255, 100, 0, 0)');
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(center, center, size * 0.48, 0, Math.PI * 2);
    ctx.fill();

    // Modak base dumpling shape (bulbous bottom, sharp apex)
    const modakGrad = ctx.createLinearGradient(center - 10, center - 12, center + 10, center + 12);
    modakGrad.addColorStop(0, '#fff3a8');
    modakGrad.addColorStop(0.4, '#ffb833');
    modakGrad.addColorStop(0.8, '#e67300');
    modakGrad.addColorStop(1, '#a84300');

    ctx.fillStyle = modakGrad;
    ctx.beginPath();
    ctx.moveTo(center, center - 12); // pointed tip
    ctx.bezierCurveTo(center + 12, center - 2, center + 13, center + 10, center, center + 11);
    ctx.bezierCurveTo(center - 13, center + 10, center - 12, center - 2, center, center - 12);
    ctx.closePath();
    ctx.fill();

    // Curved pleats / folds
    ctx.strokeStyle = '#c95900';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    // Center pleat
    ctx.moveTo(center, center - 11);
    ctx.lineTo(center, center + 10);
    // Left pleats
    ctx.moveTo(center, center - 11);
    ctx.quadraticCurveTo(center - 6, center, center - 7, center + 9);
    // Right pleats
    ctx.moveTo(center, center - 11);
    ctx.quadraticCurveTo(center + 6, center, center + 7, center + 9);
    ctx.stroke();

    // Tip highlight & saffron accent
    ctx.fillStyle = '#ff3d00'; // tiny kesar strand
    ctx.fillRect(center - 0.7, center - 13.5, 1.4, 3);
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(center - 2, center - 4, 1.5, 0, Math.PI * 2);
    ctx.fill();
  }

  /**
   * Draws the Sacred Stone collectible matching Main.png
   * Brilliant faceted royal-blue / cyan gemstone with radiant glow
   */
  static drawSacredStone(ctx, size = 36) {
    const center = size / 2;

    // Cyan radiance aura
    const glow = ctx.createRadialGradient(center, center, 4, center, center, size * 0.48);
    glow.addColorStop(0, 'rgba(0, 229, 255, 0.7)');
    glow.addColorStop(0.4, 'rgba(0, 150, 200, 0.3)');
    glow.addColorStop(1, 'rgba(0, 80, 160, 0)');
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(center, center, size * 0.48, 0, Math.PI * 2);
    ctx.fill();

    // Faceted Gemstone Shape (Hexagonal / Brilliant cut)
    const r = 11;
    ctx.fillStyle = '#005b66';
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI) / 3 - Math.PI / 6;
      const x = center + Math.cos(angle) * r;
      const y = center + Math.sin(angle) * r;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();

    // Inner Facets with varying cyan tones
    // Top facets
    ctx.fillStyle = '#80deea';
    ctx.beginPath();
    ctx.moveTo(center, center);
    ctx.lineTo(center + Math.cos(-Math.PI / 2) * r, center + Math.sin(-Math.PI / 2) * r);
    ctx.lineTo(center + Math.cos(-Math.PI / 6) * r, center + Math.sin(-Math.PI / 6) * r);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#00e5ff';
    ctx.beginPath();
    ctx.moveTo(center, center);
    ctx.lineTo(center + Math.cos(-Math.PI / 2) * r, center + Math.sin(-Math.PI / 2) * r);
    ctx.lineTo(center + Math.cos(-Math.PI * 5 / 6) * r, center + Math.sin(-Math.PI * 5 / 6) * r);
    ctx.closePath();
    ctx.fill();

    // Lower facets
    ctx.fillStyle = '#00838f';
    ctx.beginPath();
    ctx.moveTo(center, center);
    ctx.lineTo(center + Math.cos(Math.PI / 6) * r, center + Math.sin(Math.PI / 6) * r);
    ctx.lineTo(center + Math.cos(Math.PI / 2) * r, center + Math.sin(Math.PI / 2) * r);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#006064';
    ctx.beginPath();
    ctx.moveTo(center, center);
    ctx.lineTo(center + Math.cos(Math.PI * 5 / 6) * r, center + Math.sin(Math.PI * 5 / 6) * r);
    ctx.lineTo(center + Math.cos(Math.PI / 2) * r, center + Math.sin(Math.PI / 2) * r);
    ctx.closePath();
    ctx.fill();

    // Center table facet
    ctx.fillStyle = '#e0f7fa';
    ctx.beginPath();
    ctx.arc(center, center, 2.5, 0, Math.PI * 2);
    ctx.fill();

    // Sparkle glint
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(center - 4, center - 4, 1.8, 0, Math.PI * 2);
    ctx.fill();
  }

  /**
   * Draws the Divine Lotus collectible matching Main.png
   * Pink 8-petal blooming sacred lotus with golden seed core
   */
  static drawLotus(ctx, size = 36) {
    const center = size / 2;

    // Pink radial aura
    const glow = ctx.createRadialGradient(center, center, 3, center, center, size * 0.48);
    glow.addColorStop(0, 'rgba(255, 64, 129, 0.6)');
    glow.addColorStop(0.5, 'rgba(216, 27, 96, 0.22)');
    glow.addColorStop(1, 'rgba(136, 14, 79, 0)');
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(center, center, size * 0.48, 0, Math.PI * 2);
    ctx.fill();

    // 8 Petals radiating from center
    const petalCount = 8;
    const outerR = 12;
    for (let i = 0; i < petalCount; i++) {
      const angle = (i * Math.PI * 2) / petalCount;
      const px = center + Math.cos(angle) * (outerR * 0.7);
      const py = center + Math.sin(angle) * (outerR * 0.7);

      const grad = ctx.createRadialGradient(center, center, 2, px, py, outerR * 0.6);
      grad.addColorStop(0, TEMPLE_PALETTE.lotusBrightPink);
      grad.addColorStop(0.7, TEMPLE_PALETTE.lotusPink);
      grad.addColorStop(1, TEMPLE_PALETTE.lotusDeepPink);

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.ellipse(px, py, 4.5, 7.5, angle, 0, Math.PI * 2);
      ctx.fill();

      // Petal rim highlight
      ctx.strokeStyle = TEMPLE_PALETTE.lotusPetalTip;
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Inner gold seed receptacle
    ctx.fillStyle = TEMPLE_PALETTE.goldBright;
    ctx.beginPath();
    ctx.arc(center, center, 4.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#fff59d';
    ctx.beginPath();
    ctx.arc(center, center, 2.5, 0, Math.PI * 2);
    ctx.fill();
  }

  /**
   * Draws the Temple Coin collectible matching Main.png
   * Gold coin with stamped sacred symbol and metallic shine
   */
  static drawTempleCoin(ctx, size = 36) {
    const center = size / 2;
    const r = 11;

    // Golden shine halo
    const glow = ctx.createRadialGradient(center, center, 3, center, center, size * 0.48);
    glow.addColorStop(0, 'rgba(255, 215, 0, 0.55)');
    glow.addColorStop(0.5, 'rgba(255, 170, 0, 0.2)');
    glow.addColorStop(1, 'rgba(255, 140, 0, 0)');
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(center, center, size * 0.48, 0, Math.PI * 2);
    ctx.fill();

    // Outer coin rim
    const coinGrad = ctx.createLinearGradient(center - r, center - r, center + r, center + r);
    coinGrad.addColorStop(0, '#ffe082');
    coinGrad.addColorStop(0.4, '#ffb300');
    coinGrad.addColorStop(0.8, '#ff8f00');
    coinGrad.addColorStop(1, '#ff6f00');

    ctx.fillStyle = coinGrad;
    ctx.beginPath();
    ctx.arc(center, center, r, 0, Math.PI * 2);
    ctx.fill();

    // Inner border rim
    ctx.strokeStyle = '#ffd54f';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.arc(center, center, r - 2, 0, Math.PI * 2);
    ctx.stroke();

    // Stamped Sacred Motif (Flower of Life / Om)
    ctx.fillStyle = '#8a4b00';
    ctx.font = "bold 9px 'Cinzel', serif";
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('ॐ', center, center);

    // Glint highlight
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(center - 5, center - 5, 1.5, 0, Math.PI * 2);
    ctx.fill();
  }

  /**
   * Draws the Ancient Scripture collectible matching Main.png
   * Rolled parchment scroll tied with gold ribbon and glyphs
   */
  static drawScripture(ctx, size = 36) {
    const center = size / 2;

    // Golden mystical glow
    const glow = ctx.createRadialGradient(center, center, 3, center, center, size * 0.48);
    glow.addColorStop(0, 'rgba(255, 235, 150, 0.6)');
    glow.addColorStop(0.5, 'rgba(212, 136, 0, 0.22)');
    glow.addColorStop(1, 'rgba(160, 90, 0, 0)');
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(center, center, size * 0.48, 0, Math.PI * 2);
    ctx.fill();

    // Parchment scroll rolled cylinder
    const w = 22;
    const h = 16;
    const x = center - w / 2;
    const y = center - h / 2;

    // Aged parchment gradient
    const scrollGrad = ctx.createLinearGradient(x, y, x, y + h);
    scrollGrad.addColorStop(0, '#f5deb3');
    scrollGrad.addColorStop(0.5, '#fff8e7');
    scrollGrad.addColorStop(1, '#deb887');

    ctx.fillStyle = scrollGrad;
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, 3);
    ctx.fill();

    // Scroll roll curl edges (left & right rolled ends)
    ctx.fillStyle = '#c79c60';
    ctx.beginPath();
    ctx.ellipse(x, y + h / 2, 2.5, h / 2, 0, 0, Math.PI * 2);
    ctx.ellipse(x + w, y + h / 2, 2.5, h / 2, 0, 0, Math.PI * 2);
    ctx.fill();

    // Golden ribbon tied in center
    ctx.fillStyle = TEMPLE_PALETTE.goldBright;
    ctx.fillRect(center - 2, y, 4, h);
    ctx.fillStyle = TEMPLE_PALETTE.marigoldOrange;
    ctx.beginPath();
    ctx.arc(center, center, 2, 0, Math.PI * 2);
    ctx.fill();

    // Ancient script lines (faint brown lines)
    ctx.strokeStyle = '#8b5a2b';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x + 4, y + 4);
    ctx.lineTo(center - 3, y + 4);
    ctx.moveTo(x + 4, y + 8);
    ctx.lineTo(center - 3, y + 8);
    ctx.moveTo(center + 3, y + 4);
    ctx.lineTo(x + w - 4, y + 4);
    ctx.moveTo(center + 3, y + 8);
    ctx.lineTo(x + w - 4, y + 8);
    ctx.stroke();
  }

  /**
   * Draws the Lord Ganesha character sprite matching the design in Main.png
   * Features: warm peach skin, golden crown (mukut) with ruby, distinct ears,
   * curved trunk, white tusk, saffron dhoti with gold sash, expressive eye, tilak.
   */
  static drawGaneshaSprite(ctx, width = 48, height = 64, pose = 'idle') {
    const cx = pose === 'trunk_use' ? 24 : width / 2;

    // --- 0. Ground Contact Shadow ---
    ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
    ctx.beginPath();
    ctx.ellipse(cx, 58.5, 12, 3.2, 0, 0, Math.PI * 2);
    ctx.fill();

    // --- 1. Soft Golden Aura Halo ---
    const halo = ctx.createRadialGradient(cx, 23, 4, cx, 23, 23);
    halo.addColorStop(0, 'rgba(255, 220, 100, 0.38)');
    halo.addColorStop(0.5, 'rgba(255, 140, 0, 0.14)');
    halo.addColorStop(1, 'rgba(255, 100, 0, 0)');
    ctx.fillStyle = halo;
    ctx.beginPath();
    ctx.arc(cx, 23, 23, 0, Math.PI * 2);
    ctx.fill();

    // --- 2. Elephant Ears (Curved fan-like shape, aligned with eyes) ---
    const earY = 22;
    // Left Ear
    ctx.fillStyle = '#ba5224';
    ctx.beginPath();
    ctx.ellipse(cx - 12.5, earY, 7.5, 9, -0.22, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#fca772';
    ctx.beginPath();
    ctx.ellipse(cx - 12.5, earY, 6.5, 8, -0.22, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#f47c66'; // coral pink inner flap
    ctx.beginPath();
    ctx.ellipse(cx - 12.5, earY, 3.8, 5.5, -0.22, 0, Math.PI * 2);
    ctx.fill();
    // Left Kundal (golden earring)
    ctx.fillStyle = '#ffd700';
    ctx.beginPath();
    ctx.arc(cx - 13, earY + 7.5, 1.4, 0, Math.PI * 2);
    ctx.fill();

    // Right Ear
    ctx.fillStyle = '#ba5224';
    ctx.beginPath();
    ctx.ellipse(cx + 12.5, earY, 7.5, 9, 0.22, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#fca772';
    ctx.beginPath();
    ctx.ellipse(cx + 12.5, earY, 6.5, 8, 0.22, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#f47c66';
    ctx.beginPath();
    ctx.ellipse(cx + 12.5, earY, 3.8, 5.5, 0.22, 0, Math.PI * 2);
    ctx.fill();
    // Right Kundal (golden earring)
    ctx.fillStyle = '#ffd700';
    ctx.beginPath();
    ctx.arc(cx + 13, earY + 7.5, 1.4, 0, Math.PI * 2);
    ctx.fill();

    // --- 3. Chubby Head Base ---
    ctx.fillStyle = '#ba5224';
    ctx.beginPath();
    ctx.ellipse(cx, 23.5, 11, 10, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#fca772';
    ctx.beginPath();
    ctx.ellipse(cx, 23.5, 10.2, 9.2, 0, 0, Math.PI * 2);
    ctx.fill();

    // --- 4. Chubby Torso / Belly ---
    ctx.fillStyle = '#ba5224';
    ctx.beginPath();
    ctx.ellipse(cx, 35.5, 9, 7, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#fca772';
    ctx.beginPath();
    ctx.ellipse(cx, 35.5, 8.2, 6.2, 0, 0, Math.PI * 2);
    ctx.fill();

    // Golden Janeu (Sacred Thread across chest)
    ctx.strokeStyle = '#ffd700';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(cx - 5, 32);
    ctx.lineTo(cx + 5, 39);
    ctx.stroke();

    // Golden Haar Necklace
    ctx.strokeStyle = '#ffd700';
    ctx.lineWidth = 1.1;
    ctx.beginPath();
    ctx.arc(cx, 31, 4.5, 0.3, Math.PI - 0.3);
    ctx.stroke();
    ctx.fillStyle = '#d50000';
    ctx.beginPath();
    ctx.arc(cx, 35.5, 0.9, 0, Math.PI * 2);
    ctx.fill();

    // --- 5. Saffron Dhoti (Naturally rounded gathered folds) ---
    const dhotiY = 40.5;
    ctx.fillStyle = '#c44100'; // shadow border
    ctx.beginPath();
    ctx.ellipse(cx, dhotiY + 6.5, 9.2, 7, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ff6f00'; // rich bright saffron
    ctx.beginPath();
    ctx.ellipse(cx, dhotiY + 6.5, 8.4, 6.2, 0, 0, Math.PI * 2);
    ctx.fill();

    // Golden bottom hem curve
    ctx.strokeStyle = '#ffd700';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.arc(cx, dhotiY + 6, 7.8, 0.4, Math.PI - 0.4);
    ctx.stroke();

    // Dhoti pleat fold lines
    ctx.strokeStyle = '#d84a00';
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.moveTo(cx - 2.8, dhotiY + 2);
    ctx.quadraticCurveTo(cx - 4, dhotiY + 7, cx - 3.5, dhotiY + 11.5);
    ctx.moveTo(cx + 2.8, dhotiY + 2);
    ctx.quadraticCurveTo(cx + 4, dhotiY + 7, cx + 3.5, dhotiY + 11.5);
    ctx.stroke();

    // Golden Kamarbandh (waist sash)
    ctx.fillStyle = '#ffd700';
    ctx.fillRect(cx - 8.5, dhotiY, 17, 2.2);
    // Ruby Buckle
    ctx.fillStyle = '#e53935';
    ctx.fillRect(cx - 1.2, dhotiY + 0.3, 2.4, 1.6);
    // Central hanging golden patka sash
    ctx.fillStyle = '#ffd700';
    ctx.fillRect(cx - 1.8, dhotiY + 2, 3.6, 7.5);
    ctx.fillStyle = '#e65100';
    ctx.fillRect(cx - 0.9, dhotiY + 3, 1.8, 5.5);

    // --- 6. Cute Feet with Anklets ---
    ctx.fillStyle = '#ffd700';
    ctx.fillRect(cx - 6, 53.5, 3.5, 1.1);
    ctx.fillRect(cx + 2.5, 53.5, 3.5, 1.1);

    ctx.fillStyle = '#fca772';
    ctx.beginPath();
    ctx.ellipse(cx - 4.2, 56.5, 2.8, 2, 0, 0, Math.PI * 2);
    ctx.ellipse(cx + 4.2, 56.5, 2.8, 2, 0, 0, Math.PI * 2);
    ctx.fill();

    // --- 7. Chubby Arms with Golden Kadas (Bracelets) ---
    // Left arm
    ctx.fillStyle = '#fca772';
    ctx.beginPath();
    ctx.ellipse(cx - 7.5, 35, 2.2, 3.2, 0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ffd700';
    ctx.fillRect(cx - 9, 36.5, 2, 0.9);

    if (pose !== 'trunk_use') {
      // Right arm raised slightly in gentle blessing
      ctx.fillStyle = '#fca772';
      ctx.beginPath();
      ctx.ellipse(cx + 7.5, 35, 2.2, 3.2, -0.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffd700';
      ctx.fillRect(cx + 7, 36.5, 2, 0.9);
    }

    // --- 8. Face: Rosy Blush & Sacred Chandan Tilak ---
    // Soft blush on cheeks
    ctx.fillStyle = 'rgba(255, 100, 100, 0.4)';
    ctx.beginPath();
    ctx.arc(cx - 5.5, 25, 1.8, 0, Math.PI * 2);
    ctx.arc(cx + 5.5, 25, 1.8, 0, Math.PI * 2);
    ctx.fill();

    // Chandan golden crescent base
    ctx.fillStyle = '#ffd700';
    ctx.beginPath();
    ctx.arc(cx, 18, 2, 0, Math.PI);
    ctx.fill();
    // Sacred Kumkum vertical tilak mark
    ctx.fillStyle = '#d50000';
    ctx.fillRect(cx - 0.6, 15.5, 1.2, 3.2);

    // --- 9. BOTH EYES (Bright, Lively Chibi Eyes) ---
    // Left Eye
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.ellipse(cx - 4.2, 21.5, 1.7, 2.4, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#140602';
    ctx.beginPath();
    ctx.ellipse(cx - 4.0, 21.5, 1.2, 1.9, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ffffff'; // sparkle
    ctx.beginPath();
    ctx.arc(cx - 4.4, 20.8, 0.55, 0, Math.PI * 2);
    ctx.fill();

    // Right Eye
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.ellipse(cx + 4.2, 21.5, 1.7, 2.4, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#140602';
    ctx.beginPath();
    ctx.ellipse(cx + 4.0, 21.5, 1.2, 1.9, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ffffff'; // sparkle
    ctx.beginPath();
    ctx.arc(cx + 3.6, 20.8, 0.55, 0, Math.PI * 2);
    ctx.fill();

    // Eyelids / gentle smiling eyebrows
    ctx.strokeStyle = '#9c4418';
    ctx.lineWidth = 0.7;
    ctx.beginPath();
    ctx.arc(cx - 4.2, 19.8, 1.8, Math.PI * 1.15, Math.PI * 1.85);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(cx + 4.2, 19.8, 1.8, Math.PI * 1.15, Math.PI * 1.85);
    ctx.stroke();

    // --- 10. Single Ivory White Tusk (Ekadanta) ---
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.moveTo(cx + 2.2, 26.5);
    ctx.lineTo(cx + 5.2, 27.8);
    ctx.lineTo(cx + 2.2, 28.8);
    ctx.closePath();
    ctx.fill();

    // --- 11. Divine Trunk ---
    if (pose === 'trunk_use') {
      // Reaching trunk: emerges from face between eyes, flows down past chin, and sweeps forward
      ctx.fillStyle = '#fca772';
      ctx.beginPath();
      ctx.moveTo(cx - 1.5, 23.5);
      ctx.bezierCurveTo(cx - 1.8, 27, cx + 1, 29, cx + 8, 28.5);
      ctx.bezierCurveTo(cx + 14, 28, cx + 20, 27.5, cx + 24, 28.5);
      ctx.bezierCurveTo(cx + 25.5, 29.5, cx + 25, 31.5, cx + 23.5, 32);
      ctx.bezierCurveTo(cx + 18, 32.5, cx + 12, 33, cx + 6, 33);
      ctx.bezierCurveTo(cx + 0.5, 32.5, cx + 0.2, 28, cx + 1.5, 23.5);
      ctx.closePath();
      ctx.fill();

      // Contours
      ctx.strokeStyle = '#ba5224';
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(cx - 1.5, 23.5);
      ctx.bezierCurveTo(cx - 1.8, 27, cx + 1, 29, cx + 8, 28.5);
      ctx.bezierCurveTo(cx + 14, 28, cx + 20, 27.5, cx + 24, 28.5);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(cx + 23.5, 32);
      ctx.bezierCurveTo(cx + 18, 32.5, cx + 12, 33, cx + 6, 33);
      ctx.bezierCurveTo(cx + 0.5, 32.5, cx + 0.2, 28, cx + 1.5, 23.5);
      ctx.stroke();

      // Right arm supporting underneath
      ctx.fillStyle = '#fca772';
      ctx.beginPath();
      ctx.ellipse(cx + 5, 36, 2.2, 3, -0.3, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffd700';
      ctx.fillRect(cx + 4.5, 37, 2, 0.9);

      // Radiant divine golden energy burst at trunk tip
      const tipGrad = ctx.createRadialGradient(cx + 25, 30, 1, cx + 25, 30, 7.5);
      tipGrad.addColorStop(0, '#ffffff');
      tipGrad.addColorStop(0.4, '#ffd700');
      tipGrad.addColorStop(1, 'rgba(255, 160, 0, 0)');
      ctx.fillStyle = tipGrad;
      ctx.beginPath();
      ctx.arc(cx + 25, 30, 7.5, 0, Math.PI * 2);
      ctx.fill();
    } else {
      // Natural curved Ganesha trunk
      ctx.fillStyle = '#fca772';
      ctx.beginPath();
      ctx.moveTo(cx - 1.5, 23.5);
      ctx.bezierCurveTo(cx - 2.2, 26.5, cx - 1.6, 30.5, cx - 0.4, 32.8);
      ctx.bezierCurveTo(cx + 0.8, 34.6, cx + 2.8, 34.6, cx + 3.8, 32.8);
      ctx.bezierCurveTo(cx + 4.5, 31.2, cx + 3.4, 30.0, cx + 2.0, 30.8);
      ctx.bezierCurveTo(cx + 1.2, 31.5, cx + 0.5, 31.0, cx + 0.3, 29.5);
      ctx.bezierCurveTo(cx - 0.1, 26.8, cx + 0.8, 25.0, cx + 1.5, 23.5);
      ctx.closePath();
      ctx.fill();

      // Left & right contours
      ctx.strokeStyle = '#ba5224';
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(cx - 1.5, 23.5);
      ctx.bezierCurveTo(cx - 2.2, 26.5, cx - 1.6, 30.5, cx - 0.4, 32.8);
      ctx.bezierCurveTo(cx + 0.8, 34.6, cx + 2.8, 34.6, cx + 3.8, 32.8);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(cx + 3.8, 32.8);
      ctx.bezierCurveTo(cx + 4.5, 31.2, cx + 3.4, 30.0, cx + 2.0, 30.8);
      ctx.bezierCurveTo(cx + 1.2, 31.5, cx + 0.5, 31.0, cx + 0.3, 29.5);
      ctx.bezierCurveTo(cx - 0.1, 26.8, cx + 0.8, 25.0, cx + 1.5, 23.5);
      ctx.stroke();

      // Wrinkles
      ctx.strokeStyle = '#ba5224';
      ctx.lineWidth = 0.6;
      ctx.beginPath();
      ctx.moveTo(cx - 0.8, 26.0);
      ctx.lineTo(cx + 0.8, 26.0);
      ctx.moveTo(cx - 0.6, 28.5);
      ctx.lineTo(cx + 0.6, 28.5);
      ctx.stroke();

      // Modak held at trunk curl
      ctx.fillStyle = '#ffaa00';
      ctx.beginPath();
      ctx.arc(cx + 2.6, 31.0, 1.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#e53935';
      ctx.fillRect(cx + 2.3, 30.0, 0.6, 0.6);
    }

    // --- 12. Sacred Royal Mukut ---
    ctx.fillStyle = '#9c6b00';
    ctx.fillRect(cx - 6.5, 13.5, 13, 2);
    ctx.fillStyle = '#ffd700';
    ctx.fillRect(cx - 6, 14, 12, 1.3);

    // Diadem Center Ruby
    ctx.fillStyle = '#d50000';
    ctx.beginPath();
    ctx.arc(cx, 14.6, 1, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(cx - 0.3, 14.2, 0.5, 0.5);

    // Tier 1
    ctx.fillStyle = '#d4af37';
    ctx.beginPath();
    ctx.moveTo(cx - 6, 13.5);
    ctx.lineTo(cx - 4.5, 9);
    ctx.lineTo(cx + 4.5, 9);
    ctx.lineTo(cx + 6, 13.5);
    ctx.closePath();
    ctx.fill();

    // Tier 2
    ctx.fillStyle = '#ffd700';
    ctx.beginPath();
    ctx.moveTo(cx - 4, 9);
    ctx.lineTo(cx - 2.8, 5.2);
    ctx.lineTo(cx + 2.8, 5.2);
    ctx.lineTo(cx + 4, 9);
    ctx.closePath();
    ctx.fill();

    // Center Crown Ruby
    ctx.fillStyle = '#d50000';
    ctx.beginPath();
    ctx.arc(cx, 9.2, 1.2, 0, Math.PI * 2);
    ctx.fill();

    // Kalasha Finial
    ctx.fillStyle = '#ffd700';
    ctx.beginPath();
    ctx.arc(cx, 4.4, 1.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(cx, 2.0);
    ctx.lineTo(cx - 0.9, 4.4);
    ctx.lineTo(cx + 0.9, 4.4);
    ctx.closePath();
    ctx.fill();
  }

  /**
   * Draws the Sacred Sanctum Garbhagriha Altar matching Main.png
   * Stepped Dravidian/Nagara shikhara roof, tiered stone plinth, glowing inner sanctum,
   * golden deity murti silhouette, glowing diyas on both flanks, and floral toran.
   */
  static drawShrineGarbhagriha(ctx, width = 120, height = 180, isRestored = false) {
    const centerX = width / 2;
    const stoneBase = TEMPLE_PALETTE.stoneBase;
    const stoneHighlight = TEMPLE_PALETTE.stoneHighlight;
    const stoneShadow = TEMPLE_PALETTE.stoneDeepShadow;

    // 1. Multi-tier Jagati (Stone Platform Dais)
    const daisH = 28;
    this.drawBeveledStone(ctx, centerX - 48, height - daisH, 96, daisH, stoneBase, stoneHighlight, stoneShadow, 3);
    this.drawBeveledStone(ctx, centerX - 42, height - daisH - 8, 84, 8, stoneBase, stoneHighlight, stoneShadow, 2);

    // Lotus carvings on dais
    ctx.fillStyle = stoneShadow;
    for (let x = centerX - 40; x <= centerX + 34; x += 10) {
      ctx.beginPath();
      ctx.arc(x + 3, height - daisH + 8, 3.5, 0, Math.PI);
      ctx.fill();
    }

    // 2. Mandapa Walls & Sanctum Pillars
    const wallY = height - daisH - 8 - 72;
    const wallH = 72;
    this.drawBeveledStone(ctx, centerX - 36, wallY, 14, wallH, stoneBase, stoneHighlight, stoneShadow, 2);
    this.drawBeveledStone(ctx, centerX + 22, wallY, 14, wallH, stoneBase, stoneHighlight, stoneShadow, 2);

    // Inner Sanctum chamber background (Deep sacred dark void / golden radiance)
    const sanctumGrad = ctx.createLinearGradient(centerX, wallY, centerX, wallY + wallH);
    sanctumGrad.addColorStop(0, '#0a050d');
    sanctumGrad.addColorStop(0.6, isRestored ? '#8a4b00' : '#140c1a');
    sanctumGrad.addColorStop(1, isRestored ? '#ff9900' : '#261405');
    ctx.fillStyle = sanctumGrad;
    ctx.fillRect(centerX - 22, wallY, 44, wallH);

    // 3. Golden Deity Murti Silhouette inside the Garbhagriha
    const deityX = centerX;
    const deityY = wallY + 28;
    // Divine aura
    const deityAura = ctx.createRadialGradient(deityX, deityY, 4, deityX, deityY, 26);
    deityAura.addColorStop(0, isRestored ? 'rgba(255, 230, 100, 0.95)' : 'rgba(255, 170, 0, 0.45)');
    deityAura.addColorStop(0.6, isRestored ? 'rgba(255, 120, 0, 0.5)' : 'rgba(180, 80, 0, 0.15)');
    deityAura.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = deityAura;
    ctx.beginPath();
    ctx.arc(deityX, deityY, 26, 0, Math.PI * 2);
    ctx.fill();

    // Golden Ganesha idol silhouette
    ctx.fillStyle = isRestored ? TEMPLE_PALETTE.goldBright : TEMPLE_PALETTE.bronzeGold;
    // Mukut crown
    ctx.beginPath();
    ctx.moveTo(deityX, deityY - 16);
    ctx.lineTo(deityX + 5, deityY - 9);
    ctx.lineTo(deityX - 5, deityY - 9);
    ctx.closePath();
    ctx.fill();
    // Head & Ears
    ctx.beginPath();
    ctx.arc(deityX, deityY - 4, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(deityX - 7, deityY - 4, 4, 0, Math.PI * 2);
    ctx.arc(deityX + 7, deityY - 4, 4, 0, Math.PI * 2);
    ctx.fill();
    // Body & Lotus Throne
    ctx.beginPath();
    ctx.ellipse(deityX, deityY + 8, 9, 8, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = isRestored ? TEMPLE_PALETTE.marigoldOrange : TEMPLE_PALETTE.bronzeDark;
    ctx.fillRect(deityX - 10, deityY + 14, 20, 4);

    // 4. Stepped Dravidian/Kalinga Shikhara Roof (Tower)
    const tiers = 5;
    const tierH = 10;
    const roofBaseY = wallY;
    for (let t = 0; t < tiers; t++) {
      const tierW = 86 - (t * 12);
      const tierX = centerX - tierW / 2;
      const ty = roofBaseY - ((t + 1) * tierH);
      this.drawBeveledStone(ctx, tierX, ty, tierW, tierH, stoneBase, stoneHighlight, stoneShadow, 2);

      // Chaitya arch windows on each tier
      ctx.fillStyle = stoneShadow;
      for (let cx = tierX + 8; cx <= tierX + tierW - 12; cx += 12) {
        ctx.beginPath();
        ctx.arc(cx + 3, ty + 5, 2.5, Math.PI, 0);
        ctx.fill();
      }
    }

    // Shikhara Kalasha & Amalaka (Ribbed stone disc and golden pot finial)
    const topY = roofBaseY - (tiers * tierH);
    // Amalaka
    ctx.fillStyle = stoneHighlight;
    ctx.beginPath();
    ctx.ellipse(centerX, topY - 5, 14, 5, 0, 0, Math.PI * 2);
    ctx.fill();
    // Golden Kalasha
    ctx.fillStyle = TEMPLE_PALETTE.goldBright;
    ctx.beginPath();
    ctx.arc(centerX, topY - 14, 6, 0, Math.PI * 2);
    ctx.fill();
    // Spire
    ctx.fillStyle = TEMPLE_PALETTE.goldGlow;
    ctx.beginPath();
    ctx.moveTo(centerX, topY - 26);
    ctx.lineTo(centerX - 3, topY - 14);
    ctx.lineTo(centerX + 3, topY - 14);
    ctx.closePath();
    ctx.fill();

    // 5. Flanking Burning Diya Lamps
    this.drawDiyaLamp(ctx, centerX - 46, height - daisH - 34, 18, 34, true);
    this.drawDiyaLamp(ctx, centerX + 28, height - daisH - 34, 18, 34, true);

    // 6. Marigold Toran / Floral Garland framing the sanctum
    this.drawMarigoldGarland(ctx, centerX - 36, wallY + 4, centerX, wallY + 12, 6, 6);
    this.drawMarigoldGarland(ctx, centerX, wallY + 12, centerX + 36, wallY + 4, 6, 6);
  }
}
