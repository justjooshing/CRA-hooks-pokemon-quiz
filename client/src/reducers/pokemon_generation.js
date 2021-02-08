import { SET_POKEMON_GENERATION } from "../constants/action-types";

export default function pokemon_generation(
  state = { gen: 1, method: "range" },
  action
) {
  switch (action.type) {
    case SET_POKEMON_GENERATION:
      const { gen, method } = action.payload;
      return { gen, method };
    default:
      return state;
  }
}
