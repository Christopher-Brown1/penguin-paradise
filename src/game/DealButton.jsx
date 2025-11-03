import style from "../game/dealButton.module.css"

import play from "../game/assets/play.svg"

export const DealButton = () => {
  return (
    <div className={style.buttonContainer}>
      <div className={style.textContainer}>
        <h2 className={style.textBig}>Auto-Deal</h2>
        <p className={style.textSmall}>Click to start dealing</p>
      </div>
      <img src={play} />
    </div>
  )
}
