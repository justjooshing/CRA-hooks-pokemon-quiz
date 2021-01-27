import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";

import SubmitNewHighScore from "./SubmitNewHighScore";
import TopThreeScores from "./TopThreeScores";

import("./Scoreboard.css");

export default function Scoreboard({ updateIsHighScore }) {
  const [allScores, updateAllScores] = useState();
  const [name, updateName] = useState("");
  const [newScoreAdded, updateNewScoreAdded] = useState(false);
  const score = useSelector((state) => state.score);
  const difficulty = useSelector((state) => state.difficulty);

  const newHighScore = (newScore) => {
    const result = allScores.some(({ score }) => newScore > score);
    if (result) {
      updateIsHighScore(true);
    }
    return result;
  };

  const ableToAddNewScore = !newScoreAdded && allScores && newHighScore(score);

  //API REQUESTS
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

  const steadyPostData = useCallback(postData, [postData]);

  //Run post data only once name is added
  useEffect(() => {
    if (name) {
      steadyPostData();
      updateNewScoreAdded(true);
      updateName("");
    }
  }, [steadyPostData, name]);

  return (
    <section>
      {ableToAddNewScore && (
        <SubmitNewHighScore postData={postData} updateName={updateName} />
      )}
      <h2 className="leaderboard_heading">Current Leaderboard</h2>
      <TopThreeScores allScores={allScores} updateAllScores={updateAllScores} />
    </section>
  );
}
