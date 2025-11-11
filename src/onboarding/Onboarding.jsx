import { useLogicEngine } from "../logicEngine/useLogicEngine.jsx"
import style from "../onboarding/onboarding.module.css"
import { AddPlayerTile } from "../onboarding/AddPlayerTile.jsx"
import logo from "../global/assets/logo.svg"
import play from "../onboarding/assets/play-grey.svg"

export const Onboarding = () => {
  const { startGame } = useLogicEngine()
  return (
    <>
      <img src={logo} alt='logo' />
      <div className={style.onboardingContainer}>
        <div className={style.playerContainer}>
          <AddPlayerTile color='purple' />
          <AddPlayerTile color='orange' />
          <AddPlayerTile color='green' />
          <AddPlayerTile color='blue' />
        </div>
        <button onClick={() => startGame()} className={style.button}>
          <h2>Play Game</h2>
          <img src={play} />
        </button>
      </div>
    </>
  )
}
