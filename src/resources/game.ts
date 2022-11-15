import * as api from '../api.js';

const GAME_COLLECTION = 'games';

export enum GameKey {
  NHL = 'nhl'
}

export const collection = () => {
  return api.get(GAME_COLLECTION);
};