import { useState } from "react";
import { useSelector } from "react-redux";

import StartOverButton from "./StartOverButton";
import Scoreboard from "../scoreboard/Scoreboard";
import FinalPageImageAndText from "./FinalPageImageAndText";

import "./FinalPage.css";

export default function FinalPage() {
  const [isHighScore, updateIsHighScore] = useState(false);

  const difficulty = useSelector((state) => state.difficulty);
  const score = useSelector((state) => state.score);

  const standard = difficulty === "easy" || difficulty === "hard";

  return (
    <div>
      <h1 className="final_page_score">
        {score}
        {difficulty === "infinite" ? null : "/10"}
      </h1>
      <FinalPageImageAndText score={score} isHighScore={isHighScore} />
      {!standard && <Scoreboard updateIsHighScore={updateIsHighScore} />}
      <StartOverButton />
    </div>
  );
}
