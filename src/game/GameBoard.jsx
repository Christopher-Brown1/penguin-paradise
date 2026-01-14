import { useLogicEngine } from "../logicEngine/useLogicEngine"
import { PlayerTrack } from "./PlayerTrack"
import style from "./gameBoard.module.css"

import killer from "./assets/killer.svg"
import killerBlue from "./assets/killer-blue.svg"
import killerGreen from "./assets/killer-green.svg"
import killerOrange from "./assets/killer-orange.svg"
import killerPurple from "./assets/killer-purple.svg"

const killerMap = {
  blue: killerBlue,
  green: killerGreen,
  orange: killerOrange,
  purple: killerPurple,
}

export const GameBoard = () => {
  const { players, strikes, dangerCards, roundCount } = useLogicEngine()

  return (
    <div style={{ marginTop: "16px" }}>
      {players.map((player) => (
        <PlayerTrack key={player.color} player={player} strikes={strikes} />
      ))}
      <div
        style={{
          display: "flex",
          gap: "16px",
        }}
      >
        <div className={style.roundCounter}>
          <p className={style.roundCounterText}>Race</p>
          <div className={style.roundDotContainer}>
            {[0, 1, 2, 3, 4].map((index) => (
              <div
                key={index}
                className={
                  roundCount >= index ? style.roundDotActive : style.roundDot
                }
              />
            ))}
          </div>
          <div className={style.roundDotContainer}>
            {[5, 6, 7, 8, 9].map((index) => (
              <div
                key={index}
                className={
                  roundCount >= index ? style.roundDotActive : style.roundDot
                }
              />
            ))}
          </div>
        </div>
        <div className={style.dangerCardsContainer}>
          {dangerCards.map((card, index) =>
            card ? (
              <img
                src={killerMap[card]}
                key={index}
                className={style.dangerCard}
              />
            ) : (
              <img src={killer} key={index} className={style.dangerCard} />
            )
          )}
        </div>
      </div>
    </div>
  )
}
