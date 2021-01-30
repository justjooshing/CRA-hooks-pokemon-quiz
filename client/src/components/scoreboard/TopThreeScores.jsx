import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import { updateHighScores } from "../../actions";

import IndividualScore from "./IndividualScore";

import("./TopThreeScores.css");

export default function TopThreeScores() {
  const dispatch = useDispatch();

  const high_scores = useSelector((state) => state.high_scores);

  const getData = async () => {
    const response = await fetch("/api/names");
    const body = await response.json();
    dispatch(updateHighScores(body));
  };

  useEffect(() => {
    if (!high_scores) {
      getData();
    }
  });

  return (
    <ul className="leaderboard__scores-list">
      {high_scores
        ? high_scores.map((eachScore, index) => {
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
