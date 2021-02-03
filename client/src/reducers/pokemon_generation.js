import { SET_POKEMON_GENERATION } from "../constants/action-types";

export default function pokemon_generation(state = 1, action) {
  switch (action.type) {
    case SET_POKEMON_GENERATION:
      return action.payload;
    default:
      return state;
  }
}
