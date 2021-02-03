import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setPokemonGeneration } from "../../actions";

import "./Slider.css";

export default function Slider() {
  const dispatch = useDispatch();

  const pokemonGeneration = useSelector((state) => state.pokemon_generation);
  const [genLabel, setGenLabel] = useState("Gen 1");

  useEffect(() => {
    switch (pokemonGeneration) {
      case 1:
        setGenLabel("Gen 1");
        break;
      case 2:
        setGenLabel("Gen 1 & 2");
        break;
      case 3:
        setGenLabel("Gen 1, 2 & 3");
        break;
      case 4:
        setGenLabel("Gen 1, 2, 3 & 4");
        break;
      case 5:
        setGenLabel("Gen 1, 2, 3, 4 & 5");
        break;
      case 6:
        setGenLabel("Gen 1, 2, 3, 4, 5, & 6");
        break;
      case 7:
        setGenLabel("Gen 1, 2, 3, 4, 5, 6 & 7");
        break;
      default:
        console.log("test");
        setGenLabel("Gen 1");
        break;
    }
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
      />
      <label htmlFor="generationScale" value={genLabel}>
        {genLabel}
      </label>
    </div>
  );
}
