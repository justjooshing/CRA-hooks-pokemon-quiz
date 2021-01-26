import React from "react";

import {
  finalPagePictureToDisplay,
  finalPageTextToDisplay,
} from "../../functions/finalPageFunctions";

export default function StandardFinalPage({ score, difficulty }) {
  return (
    <>
      <div className="final_page_image_wrapper">
        <img
          className="final_page_image"
          src={finalPagePictureToDisplay(score).fileName}
          alt={finalPagePictureToDisplay(score).altText}
        />
      </div>
      <div>
        <p className="final_page_text_paragraph">
          {finalPageTextToDisplay(difficulty, score).exclamation}
        </p>
        <p className="final_page_text_paragraph">
          {finalPageTextToDisplay(difficulty, score).text}
        </p>
      </div>
    </>
  );
}
