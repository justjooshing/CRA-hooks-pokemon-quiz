import { useSelector } from "react-redux";
import "./Instructions.css";

export default function Instructions() {
  const difficulty = useSelector((state) => state.difficulty);

  const instructions = {
    easy: [
      "You will be presented with 10 questions.",
      "One at a time.",
      "You will be shown a picture of a pokemon and a question.",
      "You will also be given four answer options.",
      "Read the question carefully.",
      "Select the appropriate answer.",
    ],
    hard: [
      "You will be presented with 10 questions.",
      "One at a time.",
      "You will be shown a picture of a pokemon and a question.",
      "Read the question carefully.",
      "Submit your answer in the textbox provided.",
    ],
  };

  return (
    <div className="instructions_wrapper">
      {instructions[difficulty].map((line, index) => (
        <p className="instructions_lines" key={index}>
          {line}
        </p>
      ))}
    </div>
  );
}
