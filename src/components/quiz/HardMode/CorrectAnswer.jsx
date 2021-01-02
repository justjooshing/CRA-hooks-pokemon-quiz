import { capitaliseFirstLetter } from "../../../functions/quizFunctions";

import "./CorrectAnswer.css";

export default function CorrectAnswer({ correctAnswer }) {
  correctAnswer = capitaliseFirstLetter(correctAnswer);

  return <div className="correct_answer_text">{correctAnswer}</div>;
}
