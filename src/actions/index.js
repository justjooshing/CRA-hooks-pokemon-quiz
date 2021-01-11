import {
  INCREASE_SCORE,
  SET_DIFFICULTY,
  RESET_GAME,
  SET_PAGE,
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
