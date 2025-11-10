import style from "../onboarding/onboarding.module.css"
import { AddPlayerTile } from "../onboarding/AddPlayerTile.jsx"

import play from "../onboarding/assets/play-grey.svg"

export const Onboarding = () => {
  return (
    <div className={style.onboardingContainer}>
      <div className={style.playerContainer}>
        <AddPlayerTile />
        <AddPlayerTile />
        <AddPlayerTile />
        <AddPlayerTile />
      </div>
      <div className={style.rounds}>
        <h2 className={style.roundsText}>Number of Rounds</h2>
      </div>
      <button className={style.button}>
        <h2>Play Game</h2>
        <img src={play} />
      </button>
    </div>
  )
}
