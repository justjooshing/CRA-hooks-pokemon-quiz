import { SET_PAGE, RESET_GAME } from "../constants/action-types";

export default function page(state = null, action) {
  switch (action.type) {
    case SET_PAGE:
      return action.payload;
    case RESET_GAME:
      return null;
    default:
      return state;
  }
}
