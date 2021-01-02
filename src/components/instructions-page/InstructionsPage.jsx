import Instructions from "./instructions/Instructions";
import ContinueButton from "./continue-button/ContinueButton";
import ModeIndicator from "../indicators/ModeIndicator";

export default function InstructionsPage({ difficulty, setPage }) {
  return (
    <>
      <ModeIndicator difficulty={difficulty} />
      <Instructions difficulty={difficulty} />
      <ContinueButton setPage={setPage} />
    </>
  );
}
