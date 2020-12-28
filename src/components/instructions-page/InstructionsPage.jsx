import React from 'react'

import Instructions from "./instructions/Instructions"
import ContinueButton from "./continue-button/ContinueButton"

import "./InstructionsPage.css"

export default function InstructionsPage({difficulty, setPage}) {
  return (
    <>
      <div className="mode_indicator">{difficulty.toUpperCase()}</div>
      <Instructions 
        difficulty = {difficulty}
      />
      <ContinueButton 
      setPage={setPage}/>
    </>
  )
}
