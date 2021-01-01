import React from "react";

import "./AnswerButton.css";

const capitaliseFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export default function AnswerButton({
  answerOption,
  whichButton,
  correctAnswer,
  selectedAnswer,
  isSelected,
}) {
  const capitalisedAnswer = capitaliseFirstLetter(answerOption);
  return whichButton === "next" ? (
    <button
      type="button"
      className={
        answerOption === correctAnswer
          ? "quiz_answer_buttons_correct"
          : answerOption === selectedAnswer && answerOption !== correctAnswer
          ? "quiz_answer_buttons_incorrect"
          : "quiz_answer_buttons_post_selection"
      }
    >
      {capitalisedAnswer}
    </button>
  ) : (
    <button
      type="button"
      className={
        answerOption === selectedAnswer
          ? "quiz_answer_buttons_selected"
          : "quiz_answer_buttons"
      }
      onClick={() => isSelected(answerOption)}
    >
      {capitalisedAnswer}
    </button>
  );
}
