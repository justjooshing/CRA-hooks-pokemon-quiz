import seven_and_up from "../images/final_page/pokemon_ash_final_page_image.jpg";
import under_seven from "../images/final_page/pikachu_under_7.jpg";
import under_four from "../images/final_page/pikachu_under_4.jpg";

const finalPagePictureToDisplay = (score) => {
  if (score < 4) {
    return { fileName: under_four, altText: "pikachu defeated" };
  }
  if (score < 7) {
    return {
      fileName: under_seven,
      altText: "pikachu looking confused",
    };
  }
  return {
    fileName: seven_and_up,
    altText: "ash from pokemon success image",
  };
};

export default finalPagePictureToDisplay;
