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
import FishBlue from "../global/assets/fish-blue.svg"
import FishGreen from "../global/assets/fish-green.svg"
import FishOrange from "../global/assets/fish-orange.svg"
import FishPurple from "../global/assets/fish-purple.svg"
import style from "./playerTrack.module.css"
import { PlayerScorecard } from "../global/PlayerScorecard"
import { useLogicEngine } from "../logicEngine/useLogicEngine"

const IconMap = {
  blue: {
    square: BlueSquare,
    final: BlueSquareFinal,
    penguin: PenguinBlue,
    fish: FishBlue,
  },
  green: {
    square: GreenSquare,
    final: GreenSquareFinal,
    penguin: PenguinGreen,
    fish: FishGreen,
  },
  orange: {
    square: OrangeSquare,
    final: OrangeSquareFinal,
    penguin: PenguinOrange,
    fish: FishOrange,
  },
  purple: {
    square: PurpleSquare,
    final: PurpleSquareFinal,
    penguin: PenguinPurple,
    fish: FishPurple,
  },
}

export const PlayerTrack = ({ player, strikes }) => {
  const { square, final, penguin, fish } = IconMap[player.color]
  const { placeBet } = useLogicEngine()

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
        <div
          key={index}
          className={style.square}
          onClick={() => placeBet(player.color, index)}
        >
          <img
            src={index === 7 ? final : square}
            alt={index === 7 ? "Final" : "Square"}
          />
          {player.betPosition === index && (
            <img className={style.fish} src={fish} alt="Bet" />
          )}
          {index === player.position && (
            <img className={style.penguin} src={penguin} alt="Penguin" />
          )}
        </div>
      ))}
    </div>
  )
}
