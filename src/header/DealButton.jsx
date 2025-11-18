import style from "./dealButton.module.css"

import play from "./assets/play.svg"
import pause from "./assets/pause.svg"
import { useLogicEngine } from "../logicEngine/useLogicEngine"

export const DealButton = () => {
  const { toggleDealing, isDealing } = useLogicEngine()

  return (
    <button className={style.buttonContainer} onClick={() => toggleDealing()}>
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
