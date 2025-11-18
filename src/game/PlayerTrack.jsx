import BlueSquare from "./assets/blue-square.svg"
import BlueSquareFinal from "./assets/blue-square-final.svg"
import PenguinBlue from "../global/assets/penguin-blue.svg"
import GreenSquare from "./assets/green-square.svg"
import GreenSquareFinal from "./assets/green-square-final.svg"
import PenguinGreen from "../global/assets/penguin-green.svg"
import OrangeSquare from "./assets/orange-square.svg"
import OrangeSquareFinal from "./assets/orange-square-final.svg"
import PenguinOrange from "../global/assets/penguin-orange.svg"
import PurpleSquare from "./assets/purple-square.svg"
import PurpleSquareFinal from "./assets/purple-square-final.svg"
import PenguinPurple from "../global/assets/penguin-purple.svg"
import style from "./playerTrack.module.css"
import { PlayerScorecard } from "../global/PlayerScorecard"

const IconMap = {
  blue: {
    square: BlueSquare,
    final: BlueSquareFinal,
    penguin: PenguinBlue,
  },
  green: {
    square: GreenSquare,
    final: GreenSquareFinal,
    penguin: PenguinGreen,
  },
  orange: {
    square: OrangeSquare,
    final: OrangeSquareFinal,
    penguin: PenguinOrange,
  },
  purple: {
    square: PurpleSquare,
    final: PurpleSquareFinal,
    penguin: PenguinPurple,
  },
}

export const PlayerTrack = ({ player, strikes }) => {
  const { square, final, penguin } = IconMap[player.color]

  return (
    <div
      className={style.playerTrack}
      style={{ color: `var(--player-${player.color}-dark)` }}
    >
      <PlayerScorecard
        name={player.name}
        color={player.color}
        balance={player.balance}
        strikes={strikes}
      />

      {new Array(8).fill(0).map((_, index) => (
        <div key={index} className={style.square}>
          <img
            src={index === 7 ? final : square}
            alt={index === 7 ? "Final" : "Square"}
          />
          {index === player.position && (
            <img className={style.penguin} src={penguin} alt="Penguin" />
          )}
        </div>
      ))}
    </div>
  )
}
