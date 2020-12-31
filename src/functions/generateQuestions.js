const generateQuestions = async (setQuestions) => {
  const numberOfPokemon = 10;
  const questionSet = [];

  //grab n (10) number of pokemon from the API
  while (questionSet.length < numberOfPokemon) {
    const number = Math.floor(Math.random() * 151) + 1;
    const pokemon = {};
    const nameUrl = `https://pokeapi.co/api/v2/pokemon/${number}`;
    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${number}.png`;

    const singlePokemonResponse = await fetch(nameUrl);
    const singlePokemonJSON = await singlePokemonResponse.json();

    //Grab and assign name
    pokemon.name = singlePokemonJSON.name;

    //remove the female and male tags from the nidoran names
    if (pokemon.name.includes("nidoran")) {
      pokemon.name = "nidoran";
    }

    //remove hypen from mr mime
    if (pokemon.name === "mr-mime") {
      pokemon.name = "mr mime";
    }

    //Grab, assign and join type
    pokemon.type = [];
    singlePokemonJSON.types.forEach((typeIndex) => {
      pokemon.type.push(typeIndex.type.name);
    });
    pokemon.type = pokemon.type.join("/");

    //Assign url
    pokemon.image = imageUrl;

    //Assign pokemon to set
    if (
      !questionSet.some((pokemonIndex) => pokemonIndex.name === pokemon.name)
    ) {
      questionSet.push(pokemon);
    }
  }

  //Set state with new pokemon set now containing (n) pokemon
  return setQuestions(questionSet);
};

export default generateQuestions;
