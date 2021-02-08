import { useDispatch } from "react-redux";

import { setPokemonGeneration } from "../../../../actions";

import "./GenerationRadios.css";

export default function GenerationRadios() {
  const dispatch = useDispatch();

  const allRadios = [];
  const allLabels = [];

  for (let i = 1; i <= 8; i++) {
    const value = i;
    allRadios.push(
      <input
        type="radio"
        name="genRadio"
        className="radio_button"
        key={`input: ${value}`}
        onClick={() =>
          dispatch(setPokemonGeneration({ gen: value, method: "exact" }))
        }
      />
    );
    allLabels.push(
      <label className="radio_label" key={`label: ${value}`}>
        {value}
      </label>
    );
  }

  return (
    <>
      <label>Individual Gen:</label>
      <div className="radio_wrapper">
        {allRadios}
        {allLabels}
      </div>
    </>
  );
}
