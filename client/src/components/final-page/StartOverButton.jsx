import { useDispatch } from "react-redux";
import { resetGame } from "../../actions";
import "./StartOverButton.css";

export default function StartOverButton() {
  const dispatch = useDispatch();

  return (
    <div className="start_over_button_wrapper">
      <button
        className="start_over_button"
        onClick={() => dispatch(resetGame(0))}
      >
        <span className="start_over_button_text">Start Over</span>
      </button>
    </div>
  );
}
