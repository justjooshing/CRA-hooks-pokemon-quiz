import capitaliseFirstLetter from "../../../functions/capitaliseFirstLetter";
import "./AnswerButton.css";

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
          ? "quiz_answer_buttons correct"
          : answerOption === selectedAnswer && answerOption !== correctAnswer
          ? "quiz_answer_buttons incorrect"
          : "quiz_answer_buttons post_selection"
      }
    >
      {capitalisedAnswer}
    </button>
  ) : (
    <button
      type="button"
      className={
        answerOption === selectedAnswer
          ? "quiz_answer_buttons selected"
          : "quiz_answer_buttons"
      }
      onClick={() => isSelected(answerOption)}
    >
      {capitalisedAnswer}
    </button>
  );
}
