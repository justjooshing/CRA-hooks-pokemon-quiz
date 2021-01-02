import StartOverButton from "./StartOverButton";

import "./FinalPage.css";

import finalPagePictureToDisplay from "../../functions/finalPagePictureToDisplay";
import finalPageTextToDisplay from "../../functions/finalPageTextToDisplay";

export default function FinalPage({ difficulty, score, startOver }) {
  return (
    <div>
      <h1 className="final_page_score">{score}/10</h1>
      <div className="final_page_image_wrapper">
        <img
          className="final_page_image"
          src={finalPagePictureToDisplay(score).fileName}
          alt={finalPagePictureToDisplay(score).altText}
        />
      </div>
      <div>
        <p className="final_page_text_paragraph">
          {finalPageTextToDisplay(difficulty, score)[0]}
        </p>
        <p className="final_page_text_paragraph">
          {finalPageTextToDisplay(difficulty, score)[1]}
        </p>
      </div>
      <StartOverButton startOver={startOver} />
    </div>
  );
}
