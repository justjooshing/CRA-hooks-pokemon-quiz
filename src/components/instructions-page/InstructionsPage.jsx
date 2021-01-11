import Instructions from "./instructions/Instructions";
import ContinueButton from "./continue-button/ContinueButton";
import ModeIndicator from "../indicators/ModeIndicator";

export default function InstructionsPage() {
  return (
    <>
      <ModeIndicator />
      <Instructions />
      <ContinueButton />
    </>
  );
}
