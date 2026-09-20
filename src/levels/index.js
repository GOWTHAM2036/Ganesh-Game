import { LEVEL_ONE } from './levelOne.js';
import { LEVEL_TWO } from './levelTwo.js';
import { LEVEL_THREE } from './levelThree.js';

export const LEVELS = {
  1: LEVEL_ONE,
  2: LEVEL_TWO,
  3: LEVEL_THREE
};

/**
 * Returns level configuration by numeric ID, with safe fallback to Level 1
 * @param {number} id 
 * @returns {Object}
 */
export function getLevel(id) {
  const parsedId = Number(id);
  return LEVELS[parsedId] || LEVEL_ONE;
}
