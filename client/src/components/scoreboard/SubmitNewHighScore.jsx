import React, { useRef, useState } from "react";

import("./SubmitNewHighScore.css");

export default function SubmitScore({ postData, updateName }) {
  const [firstLetter, updateFirstLetter] = useState("");
  const [secondLetter, updateSecondLetter] = useState("");
  const [thirdLetter, updateThirdLetter] = useState("");
  const inputRefs = [useRef(), useRef(), useRef()];

  const handleSubmit = (e) => {
    e.preventDefault();
    let name = firstLetter.concat(secondLetter, thirdLetter);
    name = name.toUpperCase();
    console.log(name);
    updateName(name);
    postData();
  };

  const handleChange = (e, index) => {
    const updateAndNext = (updateLetter) => {
      updateLetter(e.target.value);
      if (e.target.value.length) {
        e.target.nextSibling.focus();
      } else if (!e.target.value && index > 0) {
        e.target.previousSibling.focus();
      }
    };
    index === 1
      ? updateAndNext(updateFirstLetter)
      : index === 2
      ? updateAndNext(updateSecondLetter)
      : updateAndNext(updateThirdLetter);
  };

  return (
    <div className="high_score__wrapper">
      <h3 className="high_score__header">New High Score!</h3>
      <form onSubmit={handleSubmit} className="high_score__form">
        {inputRefs.map((ref, index) => {
          return (
            <input
              type="text"
              maxLength="1"
              key={index}
              ref={() => inputRefs[index]}
              onClick={(e) => e.target.focus()}
              onChange={(e) => handleChange(e, index)}
            />
          );
        })}
        <div className="high_score__button-wrapper">
          <button type="submit" className="high_score__button">
            <span className="high_score__button-text">Update</span>
          </button>
        </div>
      </form>
    </div>
  );
}
