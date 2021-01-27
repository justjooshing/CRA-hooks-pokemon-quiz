import { useEffect } from "react";
import Instructions from "./instructions/Instructions";
import ContinueButton from "./continue-button/ContinueButton";
import ModeIndicator from "../indicators/ModeIndicator";

export default function InstructionsPage() {
  //onload, scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <>
      <ModeIndicator />
      <Instructions />
      <ContinueButton />
    </>
  );
}
