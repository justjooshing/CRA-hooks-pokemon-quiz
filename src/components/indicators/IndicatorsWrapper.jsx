import ModeIndicator from "./ModeIndicator";

import "./IndicatorsWrapper.css";

export default function IndicatorsWrapper({ difficulty, round, startOver }) {
  return (
    <div className="indicators_wrapper">
      <ModeIndicator difficulty={difficulty} />
      <button className="title_button" onClick={() => startOver()}>
        Ultimate Pokemon Quiz
      </button>
      <div className="round_indicator">{`${round + 1}/10`}</div>
    </div>
  );
}
