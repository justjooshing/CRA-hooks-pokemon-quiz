import { useState } from "react";

import IntroPage from "./components/intro-page/IntroPage";
import InstructionsPage from "./components/instructions-page/InstructionsPage";
import Quiz from "./components/quiz/Quiz";
import FinalPage from "./components/final-page/FinalPage";

import "./App.css";

export default function App() {
  const [page, setPage] = useState();
  const [difficulty, setDifficulty] = useState();
  const [score, setScore] = useState(0);

  const resetDifficulty = () => {
    setDifficulty(null);
  };

  const startOver = () => {
    resetDifficulty();
    setScore(0);
    setPage(null);
  };

  switch (page) {
    case "instructions":
      return <InstructionsPage difficulty={difficulty} setPage={setPage} />;
    case "quiz":
      return (
        <Quiz
          difficulty={difficulty}
          setPage={setPage}
          score={score}
          setScore={setScore}
          startOver={startOver}
        />
      );
    case "finished":
      return (
        <FinalPage
          score={score}
          difficulty={difficulty}
          startOver={startOver}
        />
      );
    default:
      return <IntroPage setDifficulty={setDifficulty} setPage={setPage} />;
  }
}
