import React from "react";
import { useSelector } from "react-redux";

import {
  finalPagePictureToDisplay,
  finalPageTextToDisplay,
} from "../../functions/finalPageFunctions";

import("./FinalPageImageAndText.css");

export default function FinalPageImageAndText({ score, isHighScore }) {
  const difficulty = useSelector((state) => state.difficulty);
  const standard = difficulty === "easy" || difficulty === "hard";

  return (
    <section>
      <div className="final_page_image_wrapper">
        <img
          className="final_page_image"
          src={
            finalPagePictureToDisplay(difficulty, score, isHighScore).fileName
          }
          alt={
            finalPagePictureToDisplay(difficulty, score, isHighScore).altText
          }
        />
      </div>
      <>
        {standard && (
          <>
            <p className="final_page_text_paragraph">
              {finalPageTextToDisplay(difficulty, score).exclamation}
            </p>
            <p className="final_page_text_paragraph">
              {finalPageTextToDisplay(difficulty, score).text}
            </p>
          </>
        )}
      </>
    </section>
  );
}
