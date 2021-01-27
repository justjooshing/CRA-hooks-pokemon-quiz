import "./PokemonImage.css";

export default function PokemonImage({ pokemon }) {
  return (
    <section className="quiz_pokemon_image_wrapper">
      <img
        className="quiz_pokemon_image"
        src={pokemon.image}
        alt={pokemon.name}
      />
    </section>
  );
}
