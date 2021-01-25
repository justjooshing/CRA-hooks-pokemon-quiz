import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import SubmitNewHighScore from "./SubmitNewHighScore";
import TopThreeScores from "./TopThreeScores";

import("./Scoreboard.css");

export default function Test() {
  const [allScores, updateAllScores] = useState();
  const [name, updateName] = useState("");
  const [newScoreAdded, updateNewScoreAdded] = useState(false);
  const score = useSelector((state) => state.score);
  const difficulty = useSelector((state) => state.difficulty);

  //API REQUESTS

  const getData = async () => {
    const response = await fetch("/api/names");
    const body = await response.json();
    updateAllScores(body.scores);
  };

  const postNewScore = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ score, name, difficulty }),
  };

  const postData = async () => {
    const response = await fetch("/api/names", postNewScore);
    const body = await response.text();
    updateAllScores(body.scores);
  };

  useEffect(() => {
    if (!allScores) {
      getData();
    }
  });

  //Run post data only once name is added
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (name) {
      postData();
      updateNewScoreAdded(true);
      updateName("");
    }
  });

  return (
    <div>
      {!newScoreAdded && (
        <SubmitNewHighScore postData={postData} updateName={updateName} />
      )}
      <h2 className="leaderboard_heading">Current Leaderboard</h2>
      <TopThreeScores allScores={allScores} />
    </div>
  );
}
