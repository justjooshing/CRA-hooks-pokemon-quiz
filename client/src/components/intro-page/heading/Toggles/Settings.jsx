import Slider from "./Slider";

import "./Settings.css";

export default function Settings({
  handleClick,
  settingsImage,
  showSettings,
  showWhich,
}) {
  const dataTag = "settings";
  const myClassName =
    showWhich && showSettings
      ? "show_settings_button_x"
      : showWhich
      ? "hidden"
      : "show_score_button_cog";

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
        <section className="settings">
          <h3>Settings</h3>
          <Slider />
        </section>
      )}
    </>
  );
}
