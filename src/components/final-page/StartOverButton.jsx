import "./StartOverButton.css";

export default function StartOverButton({ startOver }) {
  return (
    <div className="start_over_button_wrapper">
      <button className="start_over_button" onClick={() => startOver()}>
        <span className="start_over_button_text">Start Over</span>
      </button>
    </div>
  );
}
