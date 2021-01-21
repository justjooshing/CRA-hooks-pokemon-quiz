import React, { useState, useEffect } from "react";

import("./Scoreboard.css");

export default function Test() {
  const [scores, updateScores] = useState();
  const [name, updateName] = useState("");
  const [newScore, updateNewScore] = useState("");

  const postRequest = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ score: newScore, name }),
  };

  const getData = async () => {
    const response = await fetch("/api/names");
    const newData = await response.json();
    console.log("got!");
    updateScores(newData.scores);
  };

  const postData = async (e) => {
    e.preventDefault();
    if (name && newScore) {
      const response = await fetch("/api/names", postRequest);
      const body = await response.text();
      updateScores(body.scores);
    } else alert("Please ensure you have included both a name and a score");
  };

  useEffect(() => {
    //Not sure why this is happening, but it's getting undefined first, before grabbing the scores again
    if (!scores) {
      getData();
    }
  }, [scores]);
  console.log(scores);

  return (
    <div>
      <form onSubmit={postData}>
        <label htmlFor="score">New Score</label>
        <input
          type="text"
          name="score"
          onChange={(e) => updateNewScore(parseInt(e.target.value))}
        />
        <label htmlFor="score">Name</label>
        <input
          type="text"
          name="name"
          onChange={(e) => updateName(e.target.value)}
        />
        <button type="submit">Update</button>
      </form>
      <button onClick={() => getData()}>Get</button>
      <button onClick={() => console.log(scores)}>Check</button>
      <ul>
        {scores
          ? scores.map((score) => {
              return (
                <li key={`${score.name}:${score.score}`}>
                  {score.name}: {score.score}
                </li>
              );
            })
          : null}
      </ul>
    </div>
  );
}
