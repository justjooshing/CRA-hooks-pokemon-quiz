import { useDispatch, useSelector } from "react-redux";

import { setPokemonGeneration } from "../../../../actions";

import "./GenerationSlider.css";

export default function Slider() {
  const dispatch = useDispatch();

  const pokemonGeneration = useSelector((state) => state.pokemon_generation);
  const { gen } = pokemonGeneration;

  const handleChange = (e) => {
    const value = parseInt(e.target.value);
    dispatch(setPokemonGeneration({ gen: value, method: "range" }));
  };

  return (
    <div className="sliderWrapper">
      <label>Gen Range:</label>
      <input
        type="range"
        className="generationScale"
        name="generationScale"
        min={1}
        max={8}
        step={1}
        value={gen}
        onChange={handleChange}
        aria-valuemin={1}
        aria-valuemax={8}
        aria-valuenow={gen}
      />
    </div>
  );
}
