import React, { useState, useEffect } from "react";

import IntroPage from "./components/intro-page/IntroPage"

import "./App.css";

export default function App() {
  const [page, setPage] = useState();
  const [difficulty, setDifficulty] = useState();

  useEffect(() => {
    console.log(difficulty)
  }, [difficulty])

  switch (page) {
    default:
      return <IntroPage 
      setDifficulty={setDifficulty} 
      setPage={setPage}/>
    case "instructions":
      return <>{difficulty}</>
  }
}