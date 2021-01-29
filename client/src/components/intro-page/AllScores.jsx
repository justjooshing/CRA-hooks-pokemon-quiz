import { useState, useLayoutEffect } from "react";
import TopThreeScores from "../scoreboard/TopThreeScores";

import medal from "../../images/intro_page/medal.png";
import xImage from "../../images/intro_page/x-image.png";

import("./AllScores.css");

export default function AllScores() {
  const [allScores, updateAllScores] = useState();
  const [showScores, updateShowScores] = useState(false);
  const [image, updateImage] = useState("");

  useLayoutEffect(() => {
    showScores ? updateImage(xImage) : updateImage(medal);
  }, [showScores]);

  const handleClick = () => {
    showScores ? updateShowScores(false) : updateShowScores(true);
  };
  return (
    <>
      {image && (
        <button onClick={handleClick}>
          <img
            className={
              showScores
                ? "show_score_button show_score_button_x"
                : "show_score_button"
            }
            src={image}
            alt="high scores button"
          />
        </button>
      )}
      <>
        {showScores && (
          <section className="all_scores">
            <h3>Infinite Mode High Scores</h3>
            <TopThreeScores
              allScores={allScores}
              updateAllScores={updateAllScores}
            />
          </section>
        )}
      </>
    </>
  );
}
