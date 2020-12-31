const generateAnswerSets = (pokemonQuestions) => {
  const answerTopics = [];
  for (let i = 0; i < pokemonQuestions.length; i++) {
    const questionTopic = ["name", "type"];
    const chosenTopic = questionTopic[Math.floor(Math.random() * 2)];
    answerTopics.push(chosenTopic);

    // if (chosenTopic === "type") {
    //   generateTypeAnswers(selectedPokemon);
    // } else if (chosenTopic === "name") {
    //   generateNameAnswers(selectedPokemon);
    // }
  }
  return answerTopics;
};

export default generateAnswerSets;
