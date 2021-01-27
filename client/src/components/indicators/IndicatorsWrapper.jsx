import { useDispatch, useSelector } from "react-redux";
import { resetGame } from "../../actions";
import ModeIndicator from "./ModeIndicator";

import "./IndicatorsWrapper.css";

export default function IndicatorsWrapper({ round }) {
  const difficulty = useSelector((state) => state.difficulty);
  const totalRounds = difficulty === "infinite" ? "" : "/10";
  const dispatch = useDispatch();
  return (
    <header className="indicators_wrapper">
      <ModeIndicator />
      <button className="title_button" onClick={() => dispatch(resetGame(0))}>
        Ultimate Pokemon Quiz
      </button>
      <div className="round_indicator">{`${round + 1}${totalRounds}`}</div>
    </header>
  );
}
