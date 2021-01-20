import { SET_DIFFICULTY, RESET_GAME } from "../constants/action-types";

export default function difficulty(state = null, action) {
  switch (action.type) {
    case SET_DIFFICULTY:
      return action.payload;
    case RESET_GAME:
      return null;
    default:
      return state;
  }
}
