import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setPokemonGeneration } from "../../../../actions";

import "./Slider.css";

export default function Slider() {
  const dispatch = useDispatch();

  const pokemonGeneration = useSelector((state) => state.pokemon_generation);
  const [genLabel, setGenLabel] = useState("Gen 1");

  useEffect(() => {
    const genLabels = [
      "Generation 1",
      "Generations 1 & 2",
      "Generations 1 - 3",
      "Generations 1 - 4",
      "Generations 1 - 5",
      "Generations 1 - 6",
      "Generations 1 - 7",
    ];
    setGenLabel(genLabels[pokemonGeneration - 1]);
  }, [pokemonGeneration]);

  const handleChange = (e) => {
    const value = parseInt(e.target.value);
    dispatch(setPokemonGeneration(value));
  };

  return (
    <div className="sliderWrapper">
      <label>Choose Generation</label>
      <input
        type="range"
        className="generationScale"
        name="generationScale"
        min={1}
        max={7}
        step={1}
        value={pokemonGeneration}
        onChange={handleChange}
        aria-valuemin={1}
        aria-valuemax={7}
        aria-valuenow={pokemonGeneration}
      />
      <label htmlFor="generationScale" value={genLabel}>
        {genLabel}
      </label>
    </div>
  );
}