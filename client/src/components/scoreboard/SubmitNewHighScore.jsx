import React, { useState } from "react";

import("./SubmitNewHighScore.css");

export default function SubmitScore({ updateName }) {
  const [inputLetters, updateInputLetters] = useState({
    letter_0: "",
    letter_1: "",
    letter_2: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = Object.values(inputLetters).reduce((res, value) =>
      res.concat(value).toUpperCase()
    );
    e.target.reset();
    updateName(name);
  };

  const handleChange = (e, index) => {
    updateInputLetters({
      ...inputLetters,
      [`letter_${index}`]: e.target.value,
    });
    if (e.target.value.length) {
      e.target.nextSibling.focus();
    } else if (!e.target.value && index > 0) {
      e.target.previousSibling.focus();
    }
  };

  return (
    <div className="high_score__wrapper">
      <h3 className="high_score__header">New High Score!</h3>
      <form onSubmit={(e) => handleSubmit(e)} className="high_score__form">
        {Object.values(inputLetters).map((letter, index) => {
          return (
            <input
              type="text"
              maxLength="1"
              key={index}
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
