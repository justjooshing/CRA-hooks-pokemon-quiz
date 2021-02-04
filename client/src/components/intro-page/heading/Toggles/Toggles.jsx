import { useEffect, useState } from "react";

import AllScores from "./AllScores";
import Settings from "./Settings";

import cog from "../../../../images/intro_page/settings_cog.png";
import medal from "../../../../images/intro_page/medal.png";
import xImage from "../../../../images/intro_page/x-image.png";

import "./Toggles.css";

export default function Toggles() {
  const [showWhich, updateShowWhich] = useState(false);
  const [scoresImage, updateScoresImage] = useState(medal);
  const [settingsImage, updateSettingsImage] = useState(cog);

  const showScores = showWhich === "scores";
  const showSettings = showWhich === "settings";

  const handleClick = (dataTag) => {
    showWhich ? updateShowWhich(false) : updateShowWhich(dataTag);
  };

  useEffect(() => {
    showScores ? updateScoresImage(xImage) : updateScoresImage(medal);
    showSettings ? updateSettingsImage(xImage) : updateSettingsImage(cog);
  }, [showWhich, showSettings, showScores]);

  return (
    <div
      className={
        showWhich ? "toggles_wrapper show_toggles_wrapper" : "toggles_wrapper"
      }
    >
      <AllScores
        handleClick={handleClick}
        scoresImage={scoresImage}
        showScores={showScores}
        showWhich={showWhich}
      />
      <Settings
        handleClick={handleClick}
        settingsImage={settingsImage}
        showSettings={showSettings}
        showWhich={showWhich}
      />
    </div>
  );
}
