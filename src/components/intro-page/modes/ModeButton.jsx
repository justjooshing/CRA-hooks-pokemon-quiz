export default function ModeButton({
  button_paragraph,
  difficulty,
  setDifficulty,
  setPage,
}) {
  return (
    <button
      className="modes_options"
      onClick={() => {
        setDifficulty(difficulty);
        setPage("instructions");
      }}
    >
      <h2 className="mode_heading">{difficulty.toUpperCase()}</h2>
      <p>{button_paragraph}</p>
    </button>
  );
}
