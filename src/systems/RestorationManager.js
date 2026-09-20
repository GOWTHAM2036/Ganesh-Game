/**
 * RestorationManager
 * Manages temple restoration points across a level, tracks objective progress,
 * and ensures synchronization with GameState and UIScene.
 */
export class RestorationManager {
  /**
   * @param {Phaser.Scene} scene 
   */
  constructor(scene) {
    this.scene = scene;
    this.restorationPoints = [];
  }

  /**
   * Registers a single restoration point
   * @param {RestorationPoint} point 
   */
  register(point) {
    if (point && !this.restorationPoints.includes(point)) {
      this.restorationPoints.push(point);
    }
  }

  /**
   * Registers multiple restoration points
   * @param {RestorationPoint[]} points 
   */
  registerMultiple(points) {
    points.forEach(p => this.register(p));
  }

  /**
   * Returns true if all registered restoration objectives are completed
   * @returns {boolean}
   */
  isAllRestored() {
    if (this.restorationPoints.length === 0) return true;
    return this.restorationPoints.every(p => p.isRestored);
  }

  /**
   * Number of remaining restoration points to restore
   * @returns {number}
   */
  getRemainingCount() {
    return this.restorationPoints.filter(p => !p.isRestored).length;
  }

  /**
   * Resets all restoration points on level restart
   */
  reset() {
    this.restorationPoints.forEach(p => {
      if (typeof p.resetPoint === 'function') {
        p.resetPoint();
      }
    });
  }

  /**
   * Clean up resources on scene shutdown
   */
  destroy() {
    this.restorationPoints.forEach(p => {
      if (typeof p.destroy === 'function') {
        p.destroy();
      }
    });
    this.restorationPoints = [];
  }
}
