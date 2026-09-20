import Phaser from 'phaser';

/**
 * UIScene
 * Renders UI overlays, HUD headers, and victory popups independent of camera movement.
 */
export class UIScene extends Phaser.Scene {
  constructor() {
    super({ key: 'UIScene' });
  }

  create() {
    this.gameScene = this.scene.get('GameScene');

    this.createHUD();
    this.createVictoryOverlay();
    this.createFeedbackBanner();

    this.bindGameScene(this.gameScene);
    this.updateResources({ score: 0, modaks: 0, sacredStones: 0, lotuses: 0, templeCoins: 0, scriptures: 0 });
  }

  /** Rebinds persistent HUD listeners when the gameplay scene is restarted. */
  bindGameScene(gameScene) {
    if (this.gameScene) {
      this.gameScene.events.off('show-victory', this.showVictory, this);
      this.gameScene.events.off('show-interaction-feedback', this.showFeedback, this);
      this.gameScene.events.off('resources-changed', this.updateResources, this);
    }
    this.gameScene = gameScene;
    this.gameScene.events.on('show-victory', this.showVictory, this);
    this.gameScene.events.on('show-interaction-feedback', this.showFeedback, this);
    this.gameScene.events.on('resources-changed', this.updateResources, this);

    if (this.levelTitleText) {
      this.levelTitleText.setText(this.getLevelTitleString(gameScene.level));
    }
    if (this.levelSubtitleText) {
      this.levelSubtitleText.setText(gameScene.level?.subtitle || 'Sacred Threshold');
    }
  }

  /** Formats canonical level title e.g. "LEVEL 1 — BROKEN ENTRANCE" */
  getLevelTitleString(level) {
    const id = level?.id || 1;
    const name = level?.name || 'Broken Entrance';
    return `LEVEL ${id} — ${name.toUpperCase()}`;
  }

  /**
   * Top HUD display with temple title, objective reminder, and quick controls
   */
  createHUD() {
    UIScene.hudCount = (UIScene.hudCount || 0) + 1;
    console.log('[HUD] initialized:', UIScene.hudCount);

    // Top Bar Background Gradient
    const topBar = this.add.graphics();
    topBar.fillGradientStyle(0x190c06, 0x190c06, 0x190c06, 0x190c06, 0.88, 0.88, 0, 0);
    topBar.fillRect(0, 0, 1280, 104);
    // Decorative gold bottom rim
    topBar.lineStyle(2, 0xffb84d, 0.85);
    topBar.lineBetween(0, 104, 1280, 104);
    topBar.lineStyle(1, 0x8a5229, 0.6);
    topBar.lineBetween(0, 106, 1280, 106);

    // Level Title (Majestic inscribed decorative serif)
    const titleStr = this.getLevelTitleString(this.gameScene?.level);
    this.levelTitleText = this.add.text(28, 15, titleStr, {
      fontFamily: "'Cinzel Decorative', 'Cinzel', Georgia, serif",
      fontSize: '18px',
      fontStyle: 'bold',
      color: '#ffd066',
      stroke: '#140802',
      strokeThickness: 3
    });

    this.levelSubtitleText = this.add.text(28, 39, this.gameScene?.level?.subtitle || 'Sacred Threshold', {
      fontFamily: "'Cinzel', Georgia, serif",
      fontSize: '12.5px',
      fontStyle: '600',
      color: '#d4a373'
    });

    // Objective Reminder (Centered badge with high-contrast readable font)
    this.currentObjectiveStage = 'reach_entrance';
    this.objectiveContainer = this.add.container(680, 26);
    this.objectiveBg = this.add.graphics();
    this.objectiveText = this.add.text(0, 0, "GOAL: Collect Sacred Stones and reach the Broken Entrance.", {
      fontFamily: "'Outfit', 'Cinzel', -apple-system, sans-serif",
      fontSize: '12.5px',
      fontStyle: '600',
      color: '#fff0cc',
      stroke: '#140802',
      strokeThickness: 2
    }).setOrigin(0.5, 0.5);

    this.redrawObjectiveBadge();
    this.objectiveContainer.add([this.objectiveBg, this.objectiveText]);

    // Restart Pill (Top-Right)
    const controlsContainer = this.add.container(1150, 48);
    const bgPill = this.add.graphics();
    const drawPill = (hover = false) => {
      bgPill.clear();
      bgPill.fillStyle(hover ? 0x542810 : 0x3a1d0e, 0.92);
      bgPill.lineStyle(1.5, hover ? 0xffb84d : 0x8a5229, 1);
      bgPill.fillRoundedRect(-95, -16, 190, 32, 16);
      bgPill.strokeRoundedRect(-95, -16, 190, 32, 16);
    };
    drawPill(false);

    const restartText = this.add.text(0, 0, "Restart: [R] / Click", {
      fontFamily: "'Outfit', 'Cinzel', -apple-system, sans-serif",
      fontSize: '12px',
      fontStyle: '600',
      color: '#ffd280'
    }).setOrigin(0.5, 0.5);

    controlsContainer.add([bgPill, restartText]);
    controlsContainer.setSize(190, 32);
    controlsContainer.setInteractive({ useHandCursor: true });
    controlsContainer.on('pointerover', () => drawPill(true));
    controlsContainer.on('pointerout', () => drawPill(false));
    controlsContainer.on('pointerdown', () => {
      const gs = this.scene.get('GameScene');
      if (gs && typeof gs.restartLevel === 'function') {
        gs.restartLevel();
      }
    });

    // Resource Counters (Crisp readable typography)
    this.resourceText = this.add.text(28, 60, '', {
      fontFamily: "'Outfit', 'Cinzel', -apple-system, sans-serif",
      fontSize: '12.5px',
      fontStyle: '600',
      color: '#ffe8b3',
      stroke: '#140802',
      strokeThickness: 2,
      lineSpacing: 5
    });
  }

  /** Redraws objective badge background based on text width */
  redrawObjectiveBadge() {
    if (!this.objectiveBg || !this.objectiveText) return;
    const width = Math.max(380, this.objectiveText.width + 36);
    const half = width / 2;
    this.objectiveBg.clear();
    this.objectiveBg.fillStyle(0x221107, 0.8);
    this.objectiveBg.lineStyle(1.5, 0x8a5229, 0.85);
    this.objectiveBg.fillRoundedRect(-half, -14, width, 28, 7);
    this.objectiveBg.strokeRoundedRect(-half, -14, width, 28, 7);
  }

  /** Updates the single centralized current-level resource readout. */
  updateResources(resources) {
    if (!this.resourceText) return;
    const restoration = `Restoration: ${resources.restorationProgress || 0}/${resources.totalRestorations || 1}`;
    const mechanisms = (resources.totalMechanisms > 0)
      ? `   •   Mechanisms: ${resources.mechanismsActivated || 0}/${resources.totalMechanisms}`
      : '';
    this.resourceText.setText(
      `Modaks: ${resources.modaks}   •   Sacred Stones: ${resources.sacredStones}   •   Lotus: ${resources.lotuses}\n` +
      `Coins: ${resources.templeCoins}   •   Scriptures: ${resources.scriptures}   •   Score: ${resources.score}   |   ${restoration}${mechanisms}`
    );
  }

  /** Dynamically updates current level progression objective reminder */
  updateObjective(text) {
    if (!this.objectiveText) return;
    this.objectiveText.setText(`GOAL: ${text}`);
    this.redrawObjectiveBadge();
    this.tweens.add({
      targets: this.objectiveContainer,
      scaleX: 1.05,
      scaleY: 1.05,
      duration: 160,
      yoyo: true,
      ease: 'Sine.easeInOut'
    });
  }

  drawCardButton(graphics, fillHex, strokeHex) {
    graphics.clear();
    graphics.fillStyle(fillHex, 0.95);
    graphics.lineStyle(2, strokeHex, 1);
    graphics.fillRoundedRect(-120, -20, 240, 40, 10);
    graphics.strokeRoundedRect(-120, -20, 240, 40, 10);
  }

  /**
   * Victory screen shown when reaching the level endpoint
   */
  createVictoryOverlay() {
    this.victoryContainer = this.add.container(640, 360);
    this.victoryContainer.setDepth(500);
    this.victoryContainer.setVisible(false);
    this.victoryContainer.setAlpha(0);

    // Dim backdrop - rich darkening that blocks inputs behind card
    const dimBg = this.add.rectangle(0, 0, 1280, 720, 0x0a0503, 0.88);
    dimBg.setInteractive();

    // Sacred Temple Card Frame (solid opaque background for maximum legibility)
    const card = this.add.graphics();
    card.fillStyle(0x221109, 0.98);
    card.lineStyle(3, 0xffb84d, 1);
    card.fillRoundedRect(-320, -220, 640, 440, 16);
    card.strokeRoundedRect(-320, -220, 640, 440, 16);

    // Inner gold border
    card.lineStyle(1.5, 0x8a5229, 0.9);
    card.strokeRoundedRect(-308, -208, 616, 416, 12);

    // Corner decorative gold brackets
    card.fillStyle(0xffd700, 1);
    card.fillRect(-320, -220, 20, 4);
    card.fillRect(-320, -220, 4, 20);
    card.fillRect(300, -220, 20, 4);
    card.fillRect(316, -220, 4, 20);
    card.fillRect(-320, 216, 20, 4);
    card.fillRect(-320, 200, 4, 20);
    card.fillRect(300, 216, 20, 4);
    card.fillRect(316, 200, 4, 20);

    // Victory Title
    this.victoryTitle = this.add.text(0, -165, "LEVEL 1 COMPLETE", {
      fontFamily: "'Cinzel', Georgia, serif",
      fontSize: '26px',
      fontStyle: 'bold',
      color: '#ffd066',
      stroke: '#140802',
      strokeThickness: 4,
      letterSpacing: 1.5
    }).setOrigin(0.5, 0.5);

    // Subtitle
    this.victorySubtitle = this.add.text(0, -130, "THE TEMPLE AWAKENS", {
      fontFamily: "'Cinzel', Georgia, serif",
      fontSize: '13.5px',
      fontStyle: 'bold',
      color: '#ffb347',
      letterSpacing: 2
    }).setOrigin(0.5, 0.5);

    // Lotus Motif separator
    const separator = this.add.text(0, -104, "✤  ॐ  ✤", {
      fontFamily: 'serif',
      fontSize: '18px',
      color: '#ff9933'
    }).setOrigin(0.5, 0.5);

    // Descriptive lore text
    this.victoryDesc = this.add.text(0, -52, "The sacred flame burns once again.\nThe ancient entrance pillar stands restored with divine light,\nand the temple awakens from its long slumber.", {
      fontFamily: "'Cinzel', Georgia, serif",
      fontSize: '13px',
      color: '#f5deb3',
      align: 'center',
      lineSpacing: 6
    }).setOrigin(0.5, 0.5);

    this.victorySummary = this.add.text(0, 24, '', {
      fontFamily: "'Outfit', 'Cinzel', -apple-system, sans-serif",
      fontSize: '13px',
      fontStyle: '600',
      color: '#ffe099',
      align: 'center',
      lineSpacing: 6
    }).setOrigin(0.5, 0.5);

    // --- BUTTON 1: Action Button (ENTER FALLEN COURTYARD / INNER HALLS COMING SOON) ---
    this.actionBtn = this.add.container(-130, 150);
    this.actionBtnBg = this.add.graphics();
    this.drawCardButton(this.actionBtnBg, 0x944a14, 0xffbb33);

    this.actionBtnText = this.add.text(0, 0, "ENTER FALLEN COURTYARD", {
      fontFamily: "'Cinzel', 'Outfit', sans-serif",
      fontSize: '11.5px',
      fontStyle: 'bold',
      color: '#ffffff'
    }).setOrigin(0.5, 0.5);

    this.actionBtn.add([this.actionBtnBg, this.actionBtnText]);
    this.actionBtn.setSize(240, 40);
    this.actionBtn.setInteractive({ useHandCursor: true });
    this.actionBtn.on('pointerover', () => {
      const gs = this.scene.get('GameScene');
      if (gs?.level?.id === 3) {
        this.drawCardButton(this.actionBtnBg, 0x4d3e37, 0xa38573);
      } else {
        this.drawCardButton(this.actionBtnBg, 0xb85c18, 0xffd280);
      }
    });
    this.actionBtn.on('pointerout', () => {
      const gs = this.scene.get('GameScene');
      if (gs?.level?.id === 3) {
        this.drawCardButton(this.actionBtnBg, 0x3d302a, 0x8a7060);
      } else {
        this.drawCardButton(this.actionBtnBg, 0x944a14, 0xffbb33);
      }
    });
    this.actionBtn.on('pointerdown', () => {
      const gs = this.scene.get('GameScene');
      if (!gs) return;
      const currentLvl = gs.level?.id || 1;
      if (currentLvl === 1) {
        this.resetUI();
        gs.loadLevel(2);
      } else if (currentLvl === 2) {
        this.resetUI();
        gs.loadLevel(3);
      } else {
        this.showFeedback("The Forgotten Cave awaits in the next chapter!");
      }
    });

    // --- BUTTON 2: RESTART LEVEL BUTTON ---
    this.restartBtn = this.add.container(130, 150);
    this.restartBtnBg = this.add.graphics();
    this.drawCardButton(this.restartBtnBg, 0x4a2410, 0xd48833);

    const restartBtnText = this.add.text(0, 0, "RESTART LEVEL (Press R)", {
      fontFamily: "'Cinzel', 'Outfit', sans-serif",
      fontSize: '11.5px',
      fontStyle: 'bold',
      color: '#ffdcb3'
    }).setOrigin(0.5, 0.5);

    this.restartBtn.add([this.restartBtnBg, restartBtnText]);
    this.restartBtn.setSize(240, 40);
    this.restartBtn.setInteractive({ useHandCursor: true });
    this.restartBtn.on('pointerover', () => {
      this.drawCardButton(this.restartBtnBg, 0x613217, 0xffbb33);
    });
    this.restartBtn.on('pointerout', () => {
      this.drawCardButton(this.restartBtnBg, 0x4a2410, 0xd48833);
    });
    this.restartBtn.on('pointerdown', () => {
      const gs = this.scene.get('GameScene');
      if (gs && typeof gs.restartLevel === 'function') {
        this.resetUI();
        gs.restartLevel();
      }
    });

    this.victoryContainer.add([
      dimBg, card, this.victoryTitle, this.victorySubtitle, separator,
      this.victoryDesc, this.victorySummary, this.actionBtn, this.restartBtn
    ]);
  }

  /**
   * Action notification banner floating just beneath the top HUD
   */
  createFeedbackBanner() {
    this.bannerContainer = this.add.container(640, 96);
    this.bannerContainer.setDepth(200);
    this.bannerContainer.setVisible(false);
    this.bannerContainer.setAlpha(0);
    this.bannerContainer.setScale(0.85);

    this.bannerBg = this.add.graphics();
    this.bannerText = this.add.text(0, 0, '', {
      fontFamily: "'Cinzel', Georgia, serif",
      fontSize: '14px',
      fontStyle: 'bold',
      color: '#ffd066',
      stroke: '#140802',
      strokeThickness: 3,
      align: 'center'
    }).setOrigin(0.5, 0.5);

    this.bannerContainer.add([this.bannerBg, this.bannerText]);
    this.bannerTimer = null;
    this.bannerTween = null;
  }

  /**
   * Displays animated feedback banner when an ancient mechanism triggers
   * @param {string} text 
   */
  showFeedback(text) {
    if (!text) return;
    if (!this.bannerText || !this.bannerContainer) {
      this.createFeedbackBanner();
    }

    // Format with sacred temple motif
    this.bannerText.setText(`✨  ${text.toUpperCase()}  ✨`);

    const paddingX = 40;
    const bannerWidth = Math.max(280, this.bannerText.width + paddingX);
    const halfWidth = bannerWidth / 2;

    this.bannerBg.clear();
    // Drop shadow
    this.bannerBg.fillStyle(0x000000, 0.5);
    this.bannerBg.fillRoundedRect(-halfWidth - 2, -18 + 2, bannerWidth + 4, 36, 10);

    // Deep terracotta/wood card
    this.bannerBg.fillStyle(0x2a140a, 0.95);
    this.bannerBg.lineStyle(2, 0xffbb33, 0.9);
    this.bannerBg.fillRoundedRect(-halfWidth, -18, bannerWidth, 36, 8);
    this.bannerBg.strokeRoundedRect(-halfWidth, -18, bannerWidth, 36, 8);

    // Inner gold rim
    this.bannerBg.lineStyle(1, 0x804d1a, 0.6);
    this.bannerBg.strokeRoundedRect(-halfWidth + 3, -15, bannerWidth - 6, 30, 6);

    // Cancel existing animations
    if (this.bannerTween) this.bannerTween.stop();
    if (this.bannerTimer) this.bannerTimer.remove();

    this.bannerContainer.setVisible(true);
    this.bannerContainer.setAlpha(0);
    this.bannerContainer.setScale(0.85);

    // Entrance tween
    this.bannerTween = this.tweens.add({
      targets: this.bannerContainer,
      alpha: 1,
      scale: 1,
      duration: 220,
      ease: 'Back.easeOut',
      onComplete: () => {
        // Hold for 2.8s then fade out
        this.bannerTimer = this.time.delayedCall(2800, () => {
          this.bannerTween = this.tweens.add({
            targets: this.bannerContainer,
            alpha: 0,
            scale: 0.92,
            duration: 350,
            ease: 'Sine.easeIn',
            onComplete: () => {
              this.bannerContainer.setVisible(false);
            }
          });
        });
      }
    });
  }

  /**
   * Triggers victory animation
   */
  showVictory(state) {
    if (this.bannerContainer) {
      if (this.bannerTween) this.bannerTween.stop();
      if (this.bannerTimer) this.bannerTimer.remove();
      this.bannerContainer.setVisible(false);
    }
    const gs = this.scene.get('GameScene');
    if (gs && gs.interactionManager) {
      gs.interactionManager.clearActive();
    }

    const levelId = state?.currentLevel || this.gameScene?.level?.id || 1;
    if (levelId === 1) {
      if (this.victoryTitle) this.victoryTitle.setText("LEVEL 1 COMPLETE");
      if (this.victorySubtitle) this.victorySubtitle.setText("THE TEMPLE AWAKENS");
      if (this.victoryDesc) {
        this.victoryDesc.setText(
          "The sacred flame burns once again.\n" +
          "The ancient entrance pillar stands restored with divine light,\n" +
          "and the temple awakens from its long slumber."
        );
      }
      if (this.actionBtnText) this.actionBtnText.setText("ENTER FALLEN COURTYARD");
      if (this.actionBtnBg) this.drawCardButton(this.actionBtnBg, 0x944a14, 0xffbb33);
    } else if (levelId === 2) {
      if (this.victoryTitle) this.victoryTitle.setText("LEVEL 2 COMPLETE");
      if (this.victorySubtitle) this.victorySubtitle.setText("THE COURTYARD REMEMBERS");
      if (this.victoryDesc) {
        this.victoryDesc.setText(
          "The silent waters of the fallen courtyard reflect the celestial stars.\n" +
          "The ancient broken bridge stands restored with divine grace,\n" +
          "opening the path deeper into the inner temple halls."
        );
      }
      if (this.actionBtnText) this.actionBtnText.setText("ENTER INNER HALLS");
      if (this.actionBtnBg) this.drawCardButton(this.actionBtnBg, 0x944a14, 0xffbb33);
    } else {
      if (this.victoryTitle) this.victoryTitle.setText("LEVEL 3 COMPLETE");
      if (this.victorySubtitle) this.victorySubtitle.setText("THE BELLS AWAKEN");
      if (this.victoryDesc) {
        this.victoryDesc.setText(
          "The ancient temple bells resonate through the deep corridors.\n" +
          "With the forgotten shrine restored to divine light,\n" +
          "the sacred inner halls awaken from their long slumber."
        );
      }
      if (this.actionBtnText) this.actionBtnText.setText("FORGOTTEN CAVE — COMING SOON");
      if (this.actionBtnBg) this.drawCardButton(this.actionBtnBg, 0x3d302a, 0x8a7060);
    }

    if (this.victorySummary && state) {
      const rest = `Restoration: ${state.restorationProgress || 1}/${state.totalRestorations || 1}`;
      const mech = (state.totalMechanisms > 0)
        ? `   •   Mechanisms: ${state.mechanismsActivated || 0}/${state.totalMechanisms}`
        : '';
      this.victorySummary.setText(
        `Score: ${state.score}   •   ${rest}${mech}\n` +
        `Modaks: ${state.modaks}   •   Sacred Stones: ${state.sacredStones}   •   Lotus: ${state.lotuses}\n` +
        `Coins: ${state.templeCoins}   •   Scriptures: ${state.scriptures}`
      );
    }
    this.victoryContainer.setVisible(true);
    this.tweens.add({
      targets: this.victoryContainer,
      alpha: 1,
      duration: 500,
      ease: 'Sine.easeInOut'
    });
  }

  /**
   * Resets UI overlay state
   */
  resetUI(initialObjective = null) {
    if (this.victoryContainer) {
      this.victoryContainer.setVisible(false);
      this.victoryContainer.setAlpha(0);
    }
    if (this.bannerContainer) {
      if (this.bannerTween) this.bannerTween.stop();
      if (this.bannerTimer) this.bannerTimer.remove();
      this.bannerContainer.setVisible(false);
      this.bannerContainer.setAlpha(0);
    }
    const currentLvl = this.gameScene?.level?.id || 1;
    if (currentLvl === 3) {
      this.currentObjectiveStage = 'activate_mechanisms';
      this.updateObjective(initialObjective || 'Activate the sacred mechanisms and restore the forgotten shrine.');
    } else if (currentLvl === 2) {
      this.currentObjectiveStage = 'reach_bridge';
      this.updateObjective(initialObjective || 'Reach the Broken Bridge and restore the courtyard passage.');
    } else {
      this.currentObjectiveStage = 'reach_entrance';
      this.updateObjective(initialObjective || 'Collect Sacred Stones and reach the Broken Entrance.');
    }
  }
}
