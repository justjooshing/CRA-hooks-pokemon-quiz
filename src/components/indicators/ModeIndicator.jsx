import "./ModeIndicator.css";

export default function ModeIndicator({ difficulty }) {
  return <div className="mode_indicator">{difficulty.toUpperCase()}</div>;
}
