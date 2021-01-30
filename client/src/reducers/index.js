import { combineReducers } from "redux";
import difficulty from "./difficulty";
import page from "./page";
import score from "./score";
import high_scores from "./high_scores";

export default combineReducers({
  difficulty,
  page,
  score,
  high_scores,
});
