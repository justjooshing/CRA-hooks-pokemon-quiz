import React from "react";

import "./PokemonImage.css";

export default function PokemonImage({ pokemon }) {
  return (
    <div className="quiz_pokemon_image_wrapper">
      <img
        className="quiz_pokemon_image"
        src={pokemon.image}
        alt={pokemon.name}
      />
    </div>
  );
}
