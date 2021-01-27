import { useSelector } from "react-redux";
import "./ModeIndicator.css";

export default function ModeIndicator() {
  const difficulty = useSelector((state) => state.difficulty);

  return <header className="mode_indicator">{difficulty.toUpperCase()}</header>;
}
