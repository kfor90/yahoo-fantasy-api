import * as api from '#internal/api';

const GAME_COLLECTION = 'games';

export enum GameKey {
  NHL = 'nhl'
}

export const collection = () => {
  return api.get(GAME_COLLECTION);
};