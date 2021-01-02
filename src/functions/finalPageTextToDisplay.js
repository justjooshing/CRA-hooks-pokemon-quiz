const finalPageTextToDisplay = (difficulty, score) => {
  // I want to put this into an object, I feel like that would be better,
  //  but not sure how to do with less than (<)
  if (difficulty === "easy") {
    if (score < 4)
      return [
        "Oh no!",
        "You're going to have to train a lot more to become the best",
      ];
    if (score < 7)
      return ["Close!", "You know your stuff, but still need some training"];
    else
      return [
        "Well done!",
        "You are truly on your way to becoming a pokemon master",
      ];
  }
  if (difficulty === "hard") {
    if (score < 4)
      return [
        "Oh no!",
        "You've been training, but are not at pokemon master level just yet",
      ];
    if (score < 7)
      return [
        "Close!",
        "Gary is still ahead of you on the journey to become a pokemon master",
      ];
    else return ["Well done!", "You truly are a pokemon master"];
  }
};

export default finalPageTextToDisplay;
