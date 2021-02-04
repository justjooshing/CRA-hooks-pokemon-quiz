import {
  INCREASE_SCORE,
  SET_DIFFICULTY,
  RESET_GAME,
  SET_PAGE,
  UPDATE_HIGH_SCORES,
  SET_POKEMON_GENERATION,
} from "../constants/action-types";

export const setDifficulty = (value) => ({
  type: SET_DIFFICULTY,
  payload: value,
});

export const setPage = (value) => ({
  type: SET_PAGE,
  payload: value,
});

export const setScore = () => ({
  type: INCREASE_SCORE,
});

export const resetGame = () => ({
  type: RESET_GAME,
});

export const updateHighScores = (array) => ({
  type: UPDATE_HIGH_SCORES,
  payload: array,
});

export const setPokemonGeneration = (obj) => ({
  type: SET_POKEMON_GENERATION,
  payload: obj,
});
