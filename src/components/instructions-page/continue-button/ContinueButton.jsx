import React from "react";

import "./ContinueButton.css";

export default function ContinueButton({ setPage }) {
  return (
    <button
      className="instructions_continue_button_loaded"
      onClick={() => setPage("quiz")}
    >
      <h2 className="instructions_continue_button_text_loaded">CONTINUE</h2>
    </button>
  );
}
