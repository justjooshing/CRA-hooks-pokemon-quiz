import { useDispatch } from "react-redux";
import { setPage } from "../../../actions";

import "./ContinueButton.css";

export default function ContinueButton() {
  const dispatch = useDispatch();

  return (
    <button
      className="instructions_continue_button"
      onClick={() => dispatch(setPage("quiz"))}
    >
      <h2 className="instructions_continue_button_text">CONTINUE</h2>
    </button>
  );
}
