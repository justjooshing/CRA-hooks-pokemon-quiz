import "./LoadingScreen.css";

import pokeball from "../../images/quiz/pokeball.png";

export default function LoadingScreen() {
  return (
    <main className="loading_pokeball_wrapper">
      <img src={pokeball} alt="pokeball" className="loading_pokeball" />
      <h1 className="loading_text">
        Loading<span className="ellipsis_dot_one">.</span>
        <span className="ellipsis_dot_two">.</span>
        <span className="ellipsis_dot_three">.</span>
      </h1>
    </main>
  );
}
