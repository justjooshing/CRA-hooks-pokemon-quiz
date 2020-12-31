import "./CorrectAnswer.css";

export default function CorrectAnswer({ correctAnswer }) {
  const capitaliseFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  correctAnswer = capitaliseFirstLetter(correctAnswer);

  return <div className="correct_answer_text">{correctAnswer}</div>;
}
