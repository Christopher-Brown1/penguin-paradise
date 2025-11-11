import React, { useState } from "react"

import { useLogicEngine } from "../logicEngine/useLogicEngine"
import style from "../onboarding/addPlayerTile.module.css"
import fishBlue from "../global/assets/fish-blue.svg"
import fishGreen from "../global/assets/fish-green.svg"
import fishOrange from "../global/assets/fish-orange.svg"
import fishPurple from "../global/assets/fish-purple.svg"

const iconMap = {
  fishBlue,
  fishGreen,
  fishOrange,
  fishPurple,
}

export const AddPlayerTile = ({ color, icon }) => {
  const { addPlayer } = useLogicEngine()
  const [inputValue, setInputValue] = useState("")

  return (
    <div
      className={style.tile}
      style={{
        border: `3px solid var(--player-${color}-dark)`,
        background: `var(--player-${color})`,
      }}
    >
      <img src={iconMap[icon]} />
      <div className={style.actionContainer}>
        <input
          id='my-text-input'
          type='text'
          placeholder='Add Player'
          color={color}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className={style.textInput}
          style={{
            border: `2px solid var(--player-${color}-dark)`,
            backgroundColor: `var(--player-${color})`,
            color: `var(--player-${color}-dark)`,
            // color.placeholder:`var(--player-${color}-dark)`,
          }}
        />
        <button
          className={style.saveButton}
          onClick={() => addPlayer(inputValue, color)}
          style={{
            border: `2px solid var(--player-${color})`,
            backgroundColor: `var(--player-${color}-dark)`,
            color: `var(--player-${color})`,
          }}
        >
          Save
        </button>
      </div>
    </div>
  )
}
