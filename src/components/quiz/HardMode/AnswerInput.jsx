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
          ? "answer_input answer_input_correct"
          : whichButton === "next"
          ? "answer_input answer_input_incorrect"
          : "answer_input"
      }
      placeholder="Your answer here..."
      value={tempSubmittedAnswer}
      onChange={updateTempAnswer}
    />
  );
}
