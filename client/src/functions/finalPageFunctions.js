import seven_and_up from "../images/final_page/pokemon_ash_final_page_image.jpg";
import under_seven from "../images/final_page/pikachu_under_7.jpg";
import under_four from "../images/final_page/pikachu_under_4.jpg";

export const finalPagePictureToDisplay = (score) => {
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
};

export const finalPageTextToDisplay = (difficulty, score) => {
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

  if (difficulty === "easy") {
    return easyText(score);
  } else if (difficulty === "hard") {
    return hardText(score);
  }
};
