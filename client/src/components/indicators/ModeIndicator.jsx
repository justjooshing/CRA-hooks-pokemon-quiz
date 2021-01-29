import { useSelector } from "react-redux";

import { capitaliseFirstLetter } from "../../functions/quizFunctions";

import "./ModeIndicator.css";

export default function ModeIndicator() {
  const difficulty = useSelector((state) => state.difficulty);
  let capDifficulty = capitaliseFirstLetter(difficulty);
  return <header className="mode_indicator">{capDifficulty}</header>;
}
