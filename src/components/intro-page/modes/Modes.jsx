import ModeButton from "./ModeButton";

import "./Modes.css";

export default function Modes({ setDifficulty, setPage }) {
  const modes = [
    {
      difficulty: "easy",
      button_paragraph: "For pokemon masters in training",
    },
    {
      difficulty: "hard",
      button_paragraph: "For experienced pokemon masters",
    },
  ];

  return (
    <div className="modes_wrapper">
      {Object.values(modes).map((mode, index) => (
        <ModeButton
          key={index}
          setDifficulty={setDifficulty}
          setPage={setPage}
          difficulty={mode.difficulty}
          button_paragraph={mode.button_paragraph}
        />
      ))}
    </div>
  );
}
