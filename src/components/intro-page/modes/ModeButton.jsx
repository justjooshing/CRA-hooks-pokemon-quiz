import React from 'react'

export default function ModeButton({button_paragraph, difficulty}) {
  return (
       <button
        className="modes_options"
        // onClick={() => this.props.selectMode(difficulty)}
      >
      <h2 className="mode_heading">{difficulty.toUpperCase()}</h2>
      <p>{button_paragraph}</p>
      </button>
  )
}
