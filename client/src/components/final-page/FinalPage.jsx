import { useSelector } from "react-redux";

import StartOverButton from "./StartOverButton";
import Scoreboard from "../scoreboard/Scoreboard";
import StandardFinalPage from "./StandardFinalPage";

import "./FinalPage.css";

export default function FinalPage() {
  const difficulty = useSelector((state) => state.difficulty);
  const score = useSelector((state) => state.score);

  const standard = difficulty === "easy" || difficulty === "hard";

  return (
    <div>
      <h1 className="final_page_score">
        {score}
        {difficulty === "infinite" ? null : "/10"}
      </h1>
      {standard ? (
        <StandardFinalPage score={score} difficulty={difficulty} />
      ) : (
        <>
          <Scoreboard />
        </>
      )}
      <StartOverButton />
    </div>
  );
}
