import seven_and_up from "../images/final_page/pokemon_ash_final_page_image.jpg";
import under_seven from "../images/final_page/pikachu_under_7.jpg";
import under_four from "../images/final_page/pikachu_under_4.jpg";
import newHighScore from "../images/final_page/surprised_pikachu.jpg";
import noNewHighScore from "../images/final_page/pikachu_refuse.png";

export const finalPagePictureToDisplay = (difficulty, score, isHighScore) => {
  const standard = difficulty === "easy" || difficulty === "hard";

  if (standard) {
    if (score < 4) {
      return { fileName: under_four, altText: "pikachu defeated" };
    } else if (score < 7) {
      return {
        fileName: under_seven,
        altText: "pikachu looking confused",
      };
    } else if (score >= 7) {
      return {
        fileName: seven_and_up,
        altText: "ash from pokemon success image",
      };
    }
  } else {
    if (isHighScore) {
      return {
        fileName: newHighScore,
        altText: "ash from pokemon success image",
      };
    } else {
      return {
        fileName: noNewHighScore,
        altText: "pikachu rejecting pokeball",
      };
    }
  }
};

export const finalPageTextToDisplay = (difficulty, score, isHighScore) => {
  const easyText = (score) => {
    if (score < 4)
      return {
        exclamation: "Oh no!",
        text: "You're going to have to train a lot more to become the best",
      };
    else if (score < 7)
      return {
        exclamation: "Close!",
        text: "You know your stuff, but still need some training",
      };
    else if (score >= 7)
      return {
        exclamation: "Well done!",
        text: "You are truly on your way to becoming a pokemon master",
      };
  };

  const hardText = (score) => {
    if (score < 4)
      return {
        exclamation: "Oh no!",
        text:
          "You've been training, but are not at pokemon master level just yet",
      };
    else if (score < 7)
      return {
        exclamation: "Close!",
        text:
          "Gary is still ahead of you on the journey to become a pokemon master",
      };
    else if (score >= 7)
      return {
        exclamation: "Well done!",
        text: "You truly are a pokemon master",
      };
  };

  const infiniteText = (isHighScore) => {
    if (!isHighScore)
      return {
        exclamation: "Unlucky!",
        text:
          "Unfortunately, only those trainers who have become champions may leave their names.",
      };
    else if (isHighScore)
      return {
        exclamation: "Wow! A new champion!",
        text:
          "Come on, let's record your name as a trainer who triumphed over the Pokémon League!",
      };
  };

  if (difficulty === "easy") {
    return easyText(score);
  } else if (difficulty === "hard") {
    return hardText(score);
  } else if (difficulty === "infinite") {
    return infiniteText(isHighScore);
  }
};
