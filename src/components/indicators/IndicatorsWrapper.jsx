import { useDispatch } from "react-redux";
import { resetGame } from "../../actions";
import ModeIndicator from "./ModeIndicator";

import "./IndicatorsWrapper.css";

export default function IndicatorsWrapper({ round }) {
  const dispatch = useDispatch();
  return (
    <div className="indicators_wrapper">
      <ModeIndicator />
      <button className="title_button" onClick={() => dispatch(resetGame(0))}>
        Ultimate Pokemon Quiz
      </button>
      <div className="round_indicator">{`${round + 1}/10`}</div>
    </div>
  );
}
