import style from "../global/playerScorecard.module.css"
import fishWhite from "../global/assets/fish-white.svg"

export const PlayerScorecard = ({ name, color, balance, strikes }) => {
  const strikeCount =
    strikes?.length > 0
      ? strikes.filter((strike) => strike === color).length
      : false

  return (
    <>
      <div
        className={style.scorecardContainer}
        style={{
          border: `3px solid var(--player-${color}-dark)`,
          background: `var(--player-${color})`,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
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

          <div className={style.strikeContainer}>
            <span
              className={
                strikeCount >= 1
                  ? style.strikeCircleColored
                  : style.strikeCircle
              }
              style={{
                border: `2px solid var(--player-${color}-dark)`,
                backgroundColor:
                  strikeCount >= 1
                    ? `var(--player-${color}-dark)`
                    : `var(--white)`,
              }}
            />
            <span
              className={
                strikeCount >= 2
                  ? style.strikeCircleColored
                  : style.strikeCircle
              }
              style={{
                border: `2px solid var(--player-${color}-dark)`,
                backgroundColor:
                  strikeCount >= 2
                    ? `var(--player-${color}-dark)`
                    : `var(--white)`,
              }}
            />
            <span
              className={
                strikeCount >= 3
                  ? style.strikeCircleColored
                  : style.strikeCircle
              }
            />
          </div>
        </div>
      </div>
    </>
  )
}
