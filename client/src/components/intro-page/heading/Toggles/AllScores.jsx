import TopThreeScores from "../../../scoreboard/TopThreeScores";

import "./AllScores.css";

export default function AllScores({
  handleClick,
  scoresImage,
  showScores,
  showWhich,
}) {
  const dataTag = "scores";
  const myClassName =
    showWhich && showScores
      ? "show_score_button_x"
      : showWhich
      ? "hidden"
      : "show_score_button_medal";

  return (
    <>
      <button onClick={() => handleClick(dataTag)}>
        <img
          className={`show_score_button ${myClassName}`}
          src={scoresImage}
          alt="high scores button"
        />
      </button>
      {showScores && (
        <section>
          <h3>Infinite Mode High Scores</h3>
          <TopThreeScores />
        </section>
      )}
    </>
  );
}
