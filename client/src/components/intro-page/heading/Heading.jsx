import Toggles from "./Toggles/Toggles";

import headerTitleUltimate from "../../../images/intro_page/heading_breakdown/Ultimate.png";
import headerTitlePokemon from "../../../images/intro_page/heading_breakdown/Pokemon.png";
import headerTitleQuiz from "../../../images/intro_page/heading_breakdown/Quiz.png";

import "./Heading.css";

export default function Heading() {
  return (
    <section className="heading_wrapper">
      <Toggles />
      <img
        className="heading_title_images"
        src={headerTitleUltimate}
        alt="Ultimate"
      />
      <img
        className="heading_title_images"
        src={headerTitlePokemon}
        alt="Pokemon"
      />
      <img className="heading_title_quiz" src={headerTitleQuiz} alt="Quiz" />
    </section>
  );
}
