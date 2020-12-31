import React, { useState, useEffect } from "react";

import IntroPage from "./components/intro-page/IntroPage";
import InstructionsPage from "./components/instructions-page/InstructionsPage";
import Quiz from "./components/quiz/Quiz";

import "./App.css";

export default function App() {
  const [page, setPage] = useState();
  const [difficulty, setDifficulty] = useState();

  const resetDifficulty = () => {
    setDifficulty(null);
  };

  useEffect(() => {
    console.log(difficulty);
  }, [difficulty]);

  switch (page) {
    case "instructions":
      return <InstructionsPage difficulty={difficulty} setPage={setPage} />;
    case "quiz":
      return (
        <Quiz
          difficulty={difficulty}
          setPage={setPage}
          resetDifficulty={resetDifficulty}
        />
      );
    default:
      return <IntroPage setDifficulty={setDifficulty} setPage={setPage} />;
  }
}
