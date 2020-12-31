import React, { useState } from "react";

import IntroPage from "./components/intro-page/IntroPage";
import InstructionsPage from "./components/instructions-page/InstructionsPage";
import Quiz from "./components/quiz/Quiz";

import "./App.css";

export default function App() {
  const [page, setPage] = useState();
  const [difficulty, setDifficulty] = useState();
  const [score, setScore] = useState(0);

  const resetDifficulty = () => {
    setDifficulty(null);
  };

  switch (page) {
    case "instructions":
      return <InstructionsPage difficulty={difficulty} setPage={setPage} />;
    case "quiz":
      return (
        <Quiz
          difficulty={difficulty}
          setPage={setPage}
          resetDifficulty={resetDifficulty}
          score={score}
          setScore={setScore}
        />
      );
    case "finished":
      return "finished";
    default:
      return <IntroPage setDifficulty={setDifficulty} setPage={setPage} />;
  }
}
