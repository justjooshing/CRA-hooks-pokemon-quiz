import React, { useState } from "react";

import Heading from "./components/intro-page/heading/Heading";
import Subheading from "./components/intro-page/subheading/Subheading"
import Modes from "./components/intro-page/modes/Modes"
import "./App.css";

export default function App() {
  const [page, setPage] = useState();

  switch (page) {
    default:
      return <>
      <Heading />
      <Subheading />
      <Modes />
      </>;
  }
}
