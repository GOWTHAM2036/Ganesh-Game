/**
 * Authoritative, level-scoped state. It is deliberately created by GameScene
 * rather than stored globally, so a Phaser scene restart can never retain data
 * from the previous attempt.
 */
export class GameState {
  constructor(level) {
    this.reset(level);
  }

  reset(level) {
    this.score = 0;
    this.modaks = 0;
    this.sacredStones = 0;
    this.lotuses = 0;
    this.templeCoins = 0;
    this.scriptures = 0;
    this.restorationProgress = 0;
    this.totalRestorations = 1;
    this.isTempleRestored = false;
    this.mechanismsActivated = 0;
    this.totalMechanisms = (level?.interactions?.bells?.length) || (level?.id === 3 ? 2 : 0);
    this.currentLevel = level.id;
    this.levelCompleted = false;
    console.log('[GAME-STATE] reset: level', level.id);
  }

  collect(definition) {
    this[definition.resource] += 1;
    this.score += definition.score;
  }

  deductResource(resource, amount) {
    if (this[resource] !== undefined) {
      this[resource] = Math.max(0, this[resource] - amount);
    }
  }

  activateMechanism() {
    this.mechanismsActivated = Math.min(this.totalMechanisms, this.mechanismsActivated + 1);
    return this.mechanismsActivated;
  }

  setRestorationComplete() {
    this.isTempleRestored = true;
    this.restorationProgress = Math.min(this.totalRestorations, this.restorationProgress + 1);
  }

  snapshot() {
    return {
      score: this.score,
      modaks: this.modaks,
      sacredStones: this.sacredStones,
      lotuses: this.lotuses,
      templeCoins: this.templeCoins,
      scriptures: this.scriptures,
      restorationProgress: this.restorationProgress,
      totalRestorations: this.totalRestorations,
      isTempleRestored: this.isTempleRestored,
      mechanismsActivated: this.mechanismsActivated,
      totalMechanisms: this.totalMechanisms,
      currentLevel: this.currentLevel,
      levelCompleted: this.levelCompleted
    };
  }
}
