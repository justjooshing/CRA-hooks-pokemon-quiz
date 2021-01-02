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
          ? "answer_input_correct"
          : whichButton === "next"
          ? "answer_input_incorrect"
          : "answer_input"
      }
      id="submittedAnswer"
      placeholder="Your answer here..."
      value={tempSubmittedAnswer}
      onChange={updateTempAnswer}
    />
  );
}
