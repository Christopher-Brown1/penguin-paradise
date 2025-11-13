import { useLogicEngine } from "../logicEngine/useLogicEngine"
import style from "../endGame/endGame.module.css"
import logo from "../global/assets/logo.svg"
import { PlayerScorecard } from "../global/PlayerScorecard"
import penguinOrange from "../global/assets/penguin-orange.svg"
import penguinPurple from "../global/assets/penguin-purple.svg"
import penguinBlue from "../global/assets/penguin-blue.svg"
import penguinGreen from "../global/assets/penguin-green.svg"

const penguinMap = {
  orange: penguinOrange,
  purple: penguinPurple,
  blue: penguinBlue,
  green: penguinGreen,
}

export const EndGame = () => {
  const { players } = useLogicEngine()

  return (
    <div className={style.endOfGame}>
      <img src={logo} />
      <div className={style.winnerContainer}>
        <h2 className={style.winnerText}>Winner!</h2>
        <img
          src={
            penguinMap[players.sort((a, b) => b.balance - a.balance)[0].color]
          }
        />
        <p className={style.winnerName}>
          {players.sort((a, b) => b.balance - a.balance)[0].name}
        </p>
      </div>
      <div className={style.scoreboardContainer}>
        <h2 className={style.winnerText}>Scoreboard</h2>
        <div className={style.cardContainer}>
          {players
            .sort((a, b) => b.balance - a.balance)
            .map(({ name, color, balance }) => (
              <PlayerScorecard
                name={name}
                color={color}
                balance={balance}
                key={color}
              />
            ))}
        </div>
      </div>
    </div>
  )
}
