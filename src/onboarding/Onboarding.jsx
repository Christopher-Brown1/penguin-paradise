import { useLogicEngine } from "../logicEngine/useLogicEngine.jsx"
import style from "../onboarding/onboarding.module.css"
import { AddPlayerTile } from "../onboarding/AddPlayerTile.jsx"
import logo from "../global/assets/logo.svg"
import play from "../onboarding/assets/play-grey.svg"

export const Onboarding = () => {
  const { startGame } = useLogicEngine()
  return (
    <>
      <img src={logo} style={{ width: "320px" }} />
      <div className={style.onboardingContainer}>
        <div className={style.playerContainer}>
          <AddPlayerTile color='purple' icon='fishPurple' />
          <AddPlayerTile color='orange' icon='fishOrange' />
          <AddPlayerTile color='green' icon='fishGreen' />
          <AddPlayerTile color='blue' icon='fishBlue' />
        </div>
        <button onClick={() => startGame()} className={style.button}>
          <h2>Play Game</h2>
          <img src={play} />
        </button>
      </div>
    </>
  )
}
