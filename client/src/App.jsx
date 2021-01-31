import { useEffect } from "react";
import { useSelector } from "react-redux";

import IntroPage from "./components/intro-page/IntroPage";
import InstructionsPage from "./components/instructions-page/InstructionsPage";
import Quiz from "./components/quiz/Quiz";
import FinalPage from "./components/final-page/FinalPage";

import "./App.css";

export default function App() {
  //onload/page change, scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  const page = useSelector((state) => state.page);

  switch (page) {
    case "instructions":
      return <InstructionsPage />;
    case "quiz":
      return <Quiz />;
    case "finished":
      return <FinalPage />;
    default:
      return <IntroPage />;
  }
}
