import "./ContinueButton.css";

export default function ContinueButton({ setPage }) {
  return (
    <button
      className="instructions_continue_button"
      onClick={() => setPage("quiz")}
    >
      <h2 className="instructions_continue_button_text">CONTINUE</h2>
    </button>
  );
}
