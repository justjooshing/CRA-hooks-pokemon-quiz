import "./ConfirmButton.css";

export default function ConfirmButton({
  whichButton,
  resetForNextQuestion,
  checkAnswer,
  difficulty,
}) {
  return (
    <div className="quiz_confirm_next_wrapper">
      <button
        type="button"
        className="quiz_confirm_button"
        onClick={
          difficulty === "easy" || whichButton === "confirm"
            ? checkAnswer
            : resetForNextQuestion
        }
      >
        <span className="quiz_confirm_button_text">{whichButton}</span>
      </button>
    </div>
  );
}
