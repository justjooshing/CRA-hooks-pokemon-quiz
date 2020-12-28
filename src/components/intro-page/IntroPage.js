import React from "react";

import Heading from "./heading/Heading";
import Subheading from "./subheading/Subheading";
import Modes from "./modes/Modes";

export default function IntroPage({ setDifficulty, setPage }) {
  return (
    <div>
      <Heading />
      <Subheading />
      <Modes setDifficulty={setDifficulty} setPage={setPage} />
    </div>
  );
}
