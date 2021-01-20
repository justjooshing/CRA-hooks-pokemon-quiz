import { INCREASE_SCORE, RESET_GAME } from "../constants/action-types";

export default function score(state = 0, action) {
  switch (action.type) {
    case INCREASE_SCORE:
      return state + 1;
    case RESET_GAME:
      return 0;
    default:
      return state;
  }
}
