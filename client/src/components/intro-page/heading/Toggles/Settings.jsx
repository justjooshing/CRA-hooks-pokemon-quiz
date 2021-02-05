import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import GenerationRadios from "./GenerationRadios";
import GenerationSlider from "./GenerationSlider";

import { genLabels } from "../../../../functions/introPageFunctions";

import "./Settings.css";

export default function Settings({
  handleClick,
  settingsImage,
  showSettings,
  showWhich,
}) {
  const { gen, method } = useSelector((state) => state.pokemon_generation);

  const dataTag = "settings";
  const myClassName =
    showWhich && showSettings
      ? "show_settings_button_x"
      : showWhich
      ? "hidden"
      : "show_score_button_cog";

  const [currentGenLabel, setGenLabel] = useState();

  useEffect(() => {
    setGenLabel(genLabels(method, gen));
  }, [gen, method]);

  return (
    <>
      <button onClick={() => handleClick(dataTag)}>
        <img
          className={`show_settings_button ${myClassName}`}
          src={settingsImage}
          alt="settings cog"
        />
      </button>
      {showSettings && (
        <section className="settings_wrapper">
          <h3>Settings</h3>
          <h4 className="genLabel">{currentGenLabel}</h4>
          <GenerationSlider />
          <GenerationRadios />
        </section>
      )}
    </>
  );
}
