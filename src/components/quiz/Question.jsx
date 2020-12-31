import "./Question.css";

export default function Question({ topic }) {
  return (
    <>
      <p className="quiz_pokemon_question">In front of you is a Pokemon.</p>
      <p className="quiz_pokemon_question">What is its {topic}?</p>
    </>
  );
}
