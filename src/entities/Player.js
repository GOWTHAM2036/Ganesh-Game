import Phaser from 'phaser';
import { GAME_CONFIG } from '../config.js';
import { SoundFX } from '../utils/SoundFX.js';

/**
 * Player Entity (Lord Ganesha Prototype)
 * Handles physics, movement, jumping, collision responses,
 * and extensible hooks for divine trunk mechanics and sacred item interactions.
 */
export class Player extends Phaser.Physics.Arcade.Sprite {
  /**
   * @param {Phaser.Scene} scene 
   * @param {number} x 
   * @param {number} y 
   */
  constructor(scene, x, y) {
    super(scene, x, y, 'player');

    // Add to scene display and physics system
    scene.add.existing(this);
    scene.physics.add.existing(this);

    Player.instanceCount = (Player.instanceCount || 0) + 1;
    console.log('[PLAYER] instance created:', Player.instanceCount);

    // Physics body configuration
    this.setCollideWorldBounds(false); // Can fall off bottom pits into mist
    this.body.setSize(32, 54);
    this.body.setOffset(8, 8);
    this.body.setMaxVelocity(GAME_CONFIG.PLAYER.MOVE_SPEED, 900);

    // Movement state
    this.speed = GAME_CONFIG.PLAYER.MOVE_SPEED;
    this.jumpVelocity = GAME_CONFIG.PLAYER.JUMP_VELOCITY;
    this.isGrounded = false;
    this.facingRight = true;
    this.isDead = false;
    this.isInvulnerable = false;
    this.invulnerabilityTween = null;
    this.isInteracting = false;

    // Platformer feel polish: Coyote Time & Jump Buffering
    this.coyoteTimeDuration = 120; // ms after leaving edge where jump is allowed
    this.lastOnGroundTime = 0;
    this.jumpBufferDuration = 120; // ms window before landing where jump keypress is queued
    this.lastJumpPressTime = -999;
    this.wasOnGround = true;

    // Contact grounding shadow beneath player
    this.groundShadow = scene.add.ellipse(x, y + 27, 24, 7, 0x0a0510, 0.45).setDepth(this.depth - 1);

    // Extensible divine stat; all collectible inventory lives in GameState.
    this.trunkEnergy = 100;

    // Procedural walk animation bobbing
    this.walkCycle = 0;
  }

  /**
   * Updates player movement and state each frame
   * @param {Phaser.Input.Keyboard.CursorKeys} cursors 
   * @param {Object} keys Extra keys: { keyA, keyD, keyW, keySpace }
   * @param {number} time 
   * @param {number} delta 
   */
  update(cursors, keys, time, delta) {
    if (this.isDead) {
      if (this.groundShadow) this.groundShadow.setVisible(false);
      return;
    }

    const onGround = this.body.blocked.down || this.body.touching.down;

    if (onGround) {
      this.lastOnGroundTime = time;
    }

    // Landing feedback when touching down from air
    if (!this.wasOnGround && onGround) {
      this.emitLandingFeedback();
    }
    this.wasOnGround = onGround;

    // Update dynamic grounding shadow
    if (this.groundShadow) {
      this.groundShadow.setPosition(this.x, this.y + 27);
      this.groundShadow.setVisible(true);
      if (onGround) {
        this.groundShadow.setScale(1).setAlpha(0.45);
      } else {
        this.groundShadow.setScale(0.72).setAlpha(0.2);
      }
    }

    // Movement paused while channeling divine trunk power
    if (this.isInteracting) {
      this.setVelocityX(0);
      this.updateWalkBob(delta, false);
      return;
    }

    // Horizontal input evaluation
    const leftPressed = cursors.left.isDown || (keys.keyA && keys.keyA.isDown);
    const rightPressed = cursors.right.isDown || (keys.keyD && keys.keyD.isDown);
    const jumpPressed = Phaser.Input.Keyboard.JustDown(cursors.up) || 
                        Phaser.Input.Keyboard.JustDown(cursors.space) || 
                        (keys.keyW && Phaser.Input.Keyboard.JustDown(keys.keyW));
    const jumpReleased = Phaser.Input.Keyboard.JustUp(cursors.up) ||
                         Phaser.Input.Keyboard.JustUp(cursors.space) ||
                         (keys.keyW && Phaser.Input.Keyboard.JustUp(keys.keyW));

    if (jumpPressed) {
      this.lastJumpPressTime = time;
    }

    // Horizontal Movement
    if (leftPressed && !rightPressed) {
      this.setVelocityX(-this.speed);
      this.facingRight = false;
      this.setFlipX(true);
      this.updateWalkBob(delta, true);
    } else if (rightPressed && !leftPressed) {
      this.setVelocityX(this.speed);
      this.facingRight = true;
      this.setFlipX(false);
      this.updateWalkBob(delta, true);
    } else {
      if (onGround) {
        // Natural stone friction deceleration on ground
        this.setVelocityX(this.body.velocity.x * 0.76);
        if (Math.abs(this.body.velocity.x) < 5) {
          this.setVelocityX(0);
        }
      } else {
        // Preserve forward momentum in mid-air
        this.setVelocityX(this.body.velocity.x * 0.98);
      }
      this.updateWalkBob(delta, false);
    }

    // Jump Execution (Checks Jump Buffering + Coyote Time)
    const canCoyoteJump = (time - this.lastOnGroundTime) <= this.coyoteTimeDuration;
    const hasBufferedJump = (time - this.lastJumpPressTime) <= this.jumpBufferDuration;

    if (hasBufferedJump && canCoyoteJump && (onGround || this.body.velocity.y >= -100)) {
      this.executeJump();
      this.lastJumpPressTime = -999;
      this.lastOnGroundTime = -999;
    }

    // Variable jump height: cap upward velocity once when releasing jump button
    if (jumpReleased && this.body.velocity.y < -280) {
      this.setVelocityY(-280);
    }

    // Check bottom death boundary
    const fallBoundary = this.scene?.level?.hazards?.fallBoundary || (GAME_CONFIG.WORLD_HEIGHT + 100);
    if (this.y > fallBoundary) {
      this.handleFallDeath();
    }
  }

  /**
   * Executes jump impulse with procedural stretch feedback
   */
  executeJump() {
    this.setVelocityY(this.jumpVelocity);

    // Procedural squash & stretch for vibrant feel
    this.scene.tweens.add({
      targets: this,
      scaleX: 0.85,
      scaleY: 1.2,
      duration: 100,
      yoyo: true,
      ease: 'Quad.easeOut'
    });

    // Particle burst on jump
    this.emitJumpDust();
  }

  /**
   * Procedural bobbing animation when running
   */
  updateWalkBob(delta, isMoving) {
    const onGround = this.body.blocked.down || this.body.touching.down;
    if (onGround && isMoving) {
      this.walkCycle += delta * 0.015;
      const angle = Math.sin(this.walkCycle) * 3;
      this.setAngle(angle);
    } else {
      this.walkCycle = 0;
      this.setAngle(0);
    }
  }

  /**
   * Spawns landing stone dust burst and procedural squash on landing
   */
  emitLandingFeedback() {
    this.scene?.tweens?.add({
      targets: this,
      scaleX: 1.15,
      scaleY: 0.88,
      duration: 85,
      yoyo: true,
      ease: 'Quad.easeOut'
    });
    if (this.scene && this.scene.dustEmitter) {
      this.scene.dustEmitter.explode(6, this.x, this.y + 26);
    }
  }

  /**
   * Celebratory hop and golden sparkle burst matching Main.png Celebrate pose
   */
  celebrate() {
    if (this.isDead) return;
    this.scene?.tweens?.add({
      targets: this,
      y: this.y - 18,
      duration: 220,
      yoyo: true,
      ease: 'Sine.easeOut'
    });
    if (this.scene && this.scene.shrineEmitter) {
      this.scene.shrineEmitter.explode(18, this.x, this.y - 20);
    }
  }

  /**
   * Spawns subtle stone dust motes when jumping
   */
  emitJumpDust() {
    if (this.scene && this.scene.dustEmitter) {
      this.scene.dustEmitter.explode(4, this.x, this.y + 26);
    }
  }

  /**
   * Triggers player damage / death from hazards or obstacles.
   * Respects celestial invulnerability window.
   */
  takeDamage(cause = 'hazard') {
    if (this.isDead || this.isInvulnerable) return;
    this.isDead = true;
    this.setVelocity(0, 0);
    if (this.body) {
      this.body.stop();
      this.body.setAllowGravity(false);
    }
    if (this.groundShadow) {
      this.groundShadow.setVisible(false);
    }
    this.scene.events.emit('player-died', { cause });
  }

  /**
   * Called when player falls into bottom abyss
   */
  handleFallDeath() {
    if (this.isDead) return;
    this.isDead = true;
    this.setVelocity(0, 0);
    if (this.body) {
      this.body.stop();
      this.body.setAllowGravity(false);
    }
    if (this.groundShadow) {
      this.groundShadow.setVisible(false);
    }
    this.scene.events.emit('player-died', { cause: 'fall' });
  }

  /**
   * Reset player to designated spawn position with temporary celestial invulnerability
   */
  respawn(spawnX, spawnY, invulnerableDuration = 1800) {
    this.isDead = false;
    this.isInteracting = false;
    this.setTexture('player');
    this.setOrigin(0.5, 0.5);
    if (this.body) {
      this.body.reset(spawnX, spawnY);
      this.body.setSize(32, 54);
      this.body.setOffset(8, 8);
      this.body.setAllowGravity(true);
    }
    this.setPosition(spawnX, spawnY);
    this.setVelocity(0, 0);
    this.setAngle(0);
    this.setScale(1, 1);
    this.clearTint();
    this.setAlpha(1);

    if (this.groundShadow) {
      this.groundShadow.setPosition(spawnX, spawnY + 27);
      this.groundShadow.setVisible(true);
    }

    this.setInvulnerable(invulnerableDuration);
  }

  /**
   * Applies temporary celestial invulnerability with subtle pulsing glow
   * @param {number} duration Duration in milliseconds
   */
  setInvulnerable(duration = 1800) {
    this.isInvulnerable = true;
    if (this.invulnerabilityTween) {
      this.invulnerabilityTween.stop();
      this.invulnerabilityTween = null;
    }
    if (this.invulnerabilityTimer) {
      this.invulnerabilityTimer.remove();
      this.invulnerabilityTimer = null;
    }

    this.invulnerabilityTween = this.scene.tweens.add({
      targets: this,
      alpha: 0.38,
      duration: 130,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    this.invulnerabilityTimer = this.scene.time.delayedCall(duration, () => {
      this.isInvulnerable = false;
      if (this.invulnerabilityTween) {
        this.invulnerabilityTween.stop();
        this.invulnerabilityTween = null;
      }
      this.setAlpha(1);
      this.clearTint();
      this.invulnerabilityTimer = null;
    });
  }

  /**
   * Divine Trunk Interaction System (Milestone 2)
   * Channels Lord Ganesha's celestial energy to operate mechanisms, push stones, and pull levers.
   * @param {InteractiveObject} targetObject The mechanism being interacted with
   * @param {Function} onComplete Callback invoked at peak trunk extension
   */
  performTrunkInteraction(targetObject, onComplete) {
    if (this.isInteracting || this.isDead) return;
    this.isInteracting = true;
    this.setVelocity(0, 0);

    // Orient Ganesha towards the target mechanism
    const isFacingRight = targetObject.x >= this.x;
    this.facingRight = isFacingRight;
    this.setFlipX(!isFacingRight);

    // Swap to trunk extended texture with aligned origin (body stays centered)
    this.setTexture('player_trunk_use');
    this.setOrigin(isFacingRight ? (24 / 64) : (40 / 64), 0.5);

    // Divine chime & celestial sparkle burst at trunk tip
    SoundFX.playTrunkChime();
    const tipX = isFacingRight ? (this.x + 32) : (this.x - 32);
    const tipY = this.y - 10;
    if (this.scene.shrineEmitter) {
      this.scene.shrineEmitter.explode(12, tipX, tipY);
    }

    // Forward reach anticipation tween
    this.scene.tweens.add({
      targets: this,
      scaleX: 1.05,
      scaleY: 0.96,
      duration: 160,
      yoyo: true,
      ease: 'Sine.easeInOut'
    });

    // Object action triggers at peak extension
    this.scene.time.delayedCall(240, () => {
      if (typeof onComplete === 'function') {
        onComplete();
      }
    });

    // Retract trunk and return control to player
    this.scene.time.delayedCall(400, () => {
      if (this.isDead) return;
      this.setTexture('player');
      this.setOrigin(0.5, 0.5);
      this.body.setSize(32, 54);
      this.body.setOffset(8, 8);
      this.isInteracting = false;
    });
  }

  destroy(fromScene) {
    if (this.invulnerabilityTween) {
      this.invulnerabilityTween.stop();
      this.invulnerabilityTween = null;
    }
    if (this.invulnerabilityTimer) {
      this.invulnerabilityTimer.remove();
      this.invulnerabilityTimer = null;
    }
    if (this.groundShadow) {
      this.groundShadow.destroy();
      this.groundShadow = null;
    }
    super.destroy(fromScene);
  }
}
