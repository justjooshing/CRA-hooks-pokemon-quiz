import { useEffect } from "react";

import IndividualScore from "./IndividualScore";

import("./TopThreeScores.css");

export default function TopThreeScores({ allScores, updateAllScores }) {
  const getData = async () => {
    const response = await fetch("/api/names");
    const body = await response.json();
    updateAllScores(body);
  };

  useEffect(() => {
    if (!allScores) {
      getData();
    }
  });

  return (
    <ul className="leaderboard__scores-list">
      {allScores
        ? allScores.map((eachScore, index) => {
            return (
              <li
                className="leaderboard__scores-list-items"
                key={`${eachScore._id}`}
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
