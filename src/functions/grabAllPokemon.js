export default async function grabAllPokemon() {
  const allPokemonFetch = await fetch(
    "https://pokeapi.co/api/v2/pokemon/?limit=151"
  );
  const allPokemonJSON = await allPokemonFetch.json();

  //Push names only into an array
  const allPokemonNames = [];
  allPokemonJSON.results.forEach((pokemon) => {
    //remove the female and male tags from the nidoran names
    if (pokemon.name.includes("nidoran")) {
      pokemon.name = "nidoran";
    }
    //remove hyphen from mr mime
    if (pokemon.name === "mr-mime") {
      pokemon.name = "mr mime";
    }
    allPokemonNames.push(pokemon.name);
  });

  //set state with all 151 pokemon names array
  return allPokemonNames;
}
