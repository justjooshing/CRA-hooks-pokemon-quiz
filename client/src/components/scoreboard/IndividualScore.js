import React from "react";

import("./IndividualScore.css");

export default function IndividualScore({ ranking, name, score }) {
  return (
    <div className="score_wrapper">
      <span>#{ranking} </span>
      <span>{name} </span>
      <span>{score} points </span>
    </div>
  );
}
