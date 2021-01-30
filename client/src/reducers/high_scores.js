import { UPDATE_HIGH_SCORES } from "../constants/action-types";

export default function high_scores(state = null, action) {
  switch (action.type) {
    case UPDATE_HIGH_SCORES:
      return action.payload;
    default:
      return state;
  }
}
