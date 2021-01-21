import React from "react";

import IndividualScore from "./IndividualScore";

import("./TopThreeScores.css");

export default function TopThreeScores({ allScores }) {
  return (
    <ul className="leaderboard__scores-list">
      {allScores
        ? allScores.map((eachScore, index) => {
            return (
              <li
                className="leaderboard__scores-list-items"
                key={`${eachScore.name}:${eachScore.score}`}
              >
                <IndividualScore
                  ranking={index + 1}
                  name={eachScore.name}
                  score={eachScore.score}
                />
              </li>
            );
          })
        : null}
    </ul>
  );
}
