import { combineReducers } from "redux";
import difficulty from "./difficulty";
import page from "./page";
import score from "./score";
import high_scores from "./high_scores";
import pokemon_generation from "./pokemon_generation";

export default combineReducers({
  difficulty,
  page,
  score,
  high_scores,
  pokemon_generation,
});
