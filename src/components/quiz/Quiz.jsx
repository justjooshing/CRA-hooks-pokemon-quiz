import React, { useEffect, useState } from "react";
import IndicatorsWrapper from "../indicators/IndicatorsWrapper";

export default function Quiz({ difficulty, setPage, resetDifficulty }) {
  const [pokemonNames, setPokemonNames] = useState();
  useEffect(() => {}, []);

  if (true) {
    return (
      <IndicatorsWrapper
        difficulty={difficulty}
        resetDifficulty={resetDifficulty}
        setPage={setPage}
      />
    );
  } else {
    return <h1>test</h1>;
  }
}
