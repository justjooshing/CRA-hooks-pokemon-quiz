import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import SubmitNewHighScore from "./SubmitNewHighScore";
import TopThreeScores from "./TopThreeScores";

import("./Scoreboard.css");

export default function Test() {
  const [allScores, updateAllScores] = useState();
  const [name, updateName] = useState("");
  const score = useSelector((state) => state.score);
  const difficulty = useSelector((state) => state.difficulty);

  //API REQUESTS
  const postNewScore = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ score, name, difficulty }),
  };

  const getData = async () => {
    const response = await fetch("/api/names");
    const body = await response.json();
    console.log("got!");
    updateAllScores(body.scores);
  };

  const postData = async (e) => {
    e.preventDefault();
    if (name) {
      const response = await fetch("/api/names", postNewScore);
      const body = await response.text();
      updateAllScores(body.scores);
      e.target.reset();
    } else alert("Please write your name to submit a score");
  };

  useEffect(() => {
    if (!allScores) {
      getData();
    }
  });

  return (
    <div>
      {/* <SubmitNewHighScore postData={postData} updateName={updateName} /> */}
      <h2 className="leaderboard_heading">Current Leaderboard</h2>
      <TopThreeScores allScores={allScores} />
    </div>
  );
}
