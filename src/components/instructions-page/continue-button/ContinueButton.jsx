import React from "react";

import pokeball from "../../../images/instructions/pokeball.png";

import "./ContinueButton.css";

export default function ContinueButton({setPage}) {
  if (true) {
    return (
      <button
        className="instructions_continue_button_loaded"
        onClick={() => setPage("quiz")}
      >
        <h2 className="instructions_continue_button_text_loaded">CONTINUE</h2>
      </button>
    );
  } else {
    return (
      <button className="instructions_continue_button_loading">
        <h2 className="instructions_continue_button_text_loading">
          Loading...
        </h2>
        <img src={pokeball} alt="pokeball" className="instructions_pokeball" />
      </button>
    );
  }
}
