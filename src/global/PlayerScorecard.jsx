import style from "../global/playerScorecard.module.css"
import fishWhite from "../global/assets/fish-white.svg"

export const PlayerScorecard = ({ name, color, balance }) => {
  return (
    <>
      <div
        className={style.scorecardContainer}
        style={{
          border: `3px solid var(--player-${color}-dark)`,
          background: `var(--player-${color})`,
        }}
      >
        <div className={style.playerInfoContainer}>
          <div
            className={style.playerNameContainer}
            style={{ border: `3px solid var(--player-${color}-dark)` }}
          >
            <p className={style.playerText}>{name.split("")[0]}</p>
          </div>
          <div
            className={style.fishContainer}
            style={{
              backgroundImage: `url(${fishWhite})`,
            }}
          >
            <p className={style.playerScore}>{balance}</p>
          </div>
        </div>
      </div>
    </>
  )
}
