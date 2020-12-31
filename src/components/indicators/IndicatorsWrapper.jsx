import React, { useState } from "react";

import ModeIndicator from "./ModeIndicator";

import "./IndicatorsWrapper.css";

export default function IndicatorsWrapper({
  difficulty,
  resetDifficulty,
  setPage,
}) {
  const [round, setRound] = useState(0);

  const startOver = () => {
    resetDifficulty();
    setPage(null);
    setRound(0);
  };

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
