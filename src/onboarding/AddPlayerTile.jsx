import React, { useState } from "react"

import style from "../onboarding/addPlayerTile.module.css"
import fishBlue from "../global/assets/fish-blue.svg"
// import fishGreen from "../global/assets/fish-green.svg"
// import fishOrange from "../global/assets/fish-orange.svg"
// import fishPurple from "../global/assets/fish-purple.svg"

export const AddPlayerTile = (color) => {
  const [inputValue, setInputValue] = useState("")
  const handleChange = (event) => {
    setInputValue(event.target.value) // Update the state with the new input value
  }
  return (
    <div className={style.tile} >
      <img src={fishBlue} />
      <input
        id='my-text-input'
        type='text'
        placeholder='Add Blue Player'
        value={inputValue} // Bind the input's value to the state variable
        onChange={handleChange} // Call the handler function on change
        className={style.textInput}
      />
    </div>
  )
}
