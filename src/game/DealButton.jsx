import style from "../game/dealButton.module.css"

import play from "../game/assets/play.svg"
import pause from "../game/assets/pause.svg"

export const DealButton = ({ setIsDealing, isDealing }) => {
  return (
    <button
      className={style.buttonContainer}
      onClick={() => setIsDealing((v) => !v)}
    >
      <div className={style.textContainer}>
        <h2 className={style.textBig}>Auto-Deal</h2>
        <p className={style.textSmall}>
          {isDealing ? "Click to stop dealing" : "Click to start dealing"}
        </p>
      </div>
      <img src={isDealing ? pause : play} alt={isDealing ? "Pause" : "Play"} />
    </button>
  )
}
