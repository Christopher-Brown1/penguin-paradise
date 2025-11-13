import { useState } from "react"

import { useLogicEngine } from "../logicEngine/useLogicEngine.jsx"
import style from "../onboarding/onboarding.module.css"
import { AddPlayerTile } from "../onboarding/AddPlayerTile.jsx"
import logo from "../global/assets/logo.svg"
import play from "../onboarding/assets/play-grey.svg"

export const Onboarding = () => {
  const { startGame } = useLogicEngine()
  const [purpleInput, setPurpleInput] = useState("")
  const [greenInput, setGreenInput] = useState("")
  const [orangeInput, setOrangeInput] = useState("")
  const [blueInput, setBlueInput] = useState("")

  return (
    <>
      <img src={logo} alt='logo' className={style.logo} />
      <div className={style.onboardingContainer}>
        <div className={style.playerContainer}>
          <AddPlayerTile
            color='purple'
            onChange={setPurpleInput}
            value={purpleInput}
          />
          <AddPlayerTile
            color='orange'
            onChange={setOrangeInput}
            value={orangeInput}
          />
          <AddPlayerTile
            color='green'
            onChange={setGreenInput}
            value={greenInput}
          />
          <AddPlayerTile
            color='blue'
            onChange={setBlueInput}
            value={blueInput}
          />
        </div>
        <button
          onClick={() =>
            startGame({
              purple: purpleInput,
              green: greenInput,
              orange: orangeInput,
              blue: blueInput,
            })
          }
          className={style.button}
        >
          <h2>Play Game</h2>
          <img src={play} />
        </button>
      </div>
    </>
  )
}
