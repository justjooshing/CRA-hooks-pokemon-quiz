import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setPokemonGeneration } from "../../../../actions";

import { genLabels } from "./genLabels";

import "./Slider.css";

export default function Slider() {
  const dispatch = useDispatch();

  const pokemonGeneration = useSelector((state) => state.pokemon_generation);
  const [currentGenLabel, setGenLabel] = useState("Gen 1");

  useEffect(() => {
    setGenLabel(genLabels[pokemonGeneration]);
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
      <label htmlFor="generationScale" value={currentGenLabel}>
        {currentGenLabel}
      </label>
    </div>
  );
}
