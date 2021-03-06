import ModeButton from "./ModeButton";
import "./Modes.css";

export default function Modes() {
  const modes = [
    {
      difficulty: "easy",
      button_text: "For pokemon masters in training",
    },
    {
      difficulty: "hard",
      button_text: "For experienced pokemon masters",
    },
    {
      difficulty: "infinite",
      button_text: "Try and beat the current Victory Road champions",
    },
  ];

  return (
    <section className="modes_wrapper">
      {Object.values(modes).map((mode, index) => (
        <ModeButton
          key={mode.difficulty}
          difficulty={mode.difficulty}
          button_text={mode.button_text}
        />
      ))}
    </section>
  );
}
