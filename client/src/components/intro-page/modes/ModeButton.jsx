import { useDispatch } from "react-redux";

import { setDifficulty, setPage, setPokemonGeneration } from "../../../actions";

export default function ModeButton({ button_text, difficulty }) {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setDifficulty(difficulty));
    dispatch(setPage("instructions"));
    if (difficulty === "infinite") {
      dispatch(setPokemonGeneration({ gen: 8, method: "range" }));
    }
  };

  return (
    <button className="modes_options" onClick={handleClick}>
      <h2 className="mode_heading">{difficulty.toUpperCase()}</h2>
      <p>{button_text}</p>
    </button>
  );
}
