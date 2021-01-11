import { combineReducers } from "redux";
import difficulty from "./difficulty";
import page from "./page";
import score from "./score";

export default combineReducers({
  difficulty,
  page,
  score,
});
