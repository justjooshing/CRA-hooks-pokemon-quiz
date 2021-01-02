import "./AnswerInput.css";

export default function AnswerInput({
  tempSubmittedAnswer,
  updateTempAnswer,
  whichButton,
  correctAnswer,
  submittedAnswer,
}) {
  return (
    <input
      type="text"
      className={
        whichButton === "next" && correctAnswer === submittedAnswer
          ? "answer_input correct"
          : whichButton === "next"
          ? "answer_input incorrect"
          : "answer_input"
      }
      placeholder="Your answer here..."
      value={tempSubmittedAnswer}
      onChange={updateTempAnswer}
    />
  );
}
