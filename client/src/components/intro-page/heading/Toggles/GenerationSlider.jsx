import { useDispatch, useSelector } from "react-redux";

import { setPokemonGeneration } from "../../../../actions";

import "./GenerationSlider.css";

export default function Slider() {
  const dispatch = useDispatch();

  const pokemonGeneration = useSelector((state) => state.pokemon_generation);
  const { gen } = pokemonGeneration;

  const handleChange = (e) => {
    const value = parseInt(e.target.value);
    dispatch(setPokemonGeneration({ gen: value, method: "slider" }));
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
        value={gen}
        onChange={handleChange}
        aria-valuemin={1}
        aria-valuemax={7}
        aria-valuenow={gen}
      />
    </div>
  );
}
