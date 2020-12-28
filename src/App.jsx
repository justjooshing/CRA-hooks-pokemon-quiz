import React, { useState } from "react";

import IntroPage from "./components/intro-page/IntroPage"
import InstructionsPage from "./components/instructions-page/InstructionsPage"

import "./App.css";

export default function App() {
  const [page, setPage] = useState();
  const [difficulty, setDifficulty] = useState();

  switch (page) {
    default:
      return <IntroPage 
      setDifficulty={setDifficulty} 
      setPage={setPage}/>
    case "instructions":
      return <InstructionsPage 
        difficulty={difficulty}
      />
  }
}