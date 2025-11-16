import { useLogicEngine } from "../logicEngine/useLogicEngine"
import { PlayerTrack } from "./PlayerTrack"
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
  const { players, strikes, dangerCards } = useLogicEngine()
  return (
    <div style={{ marginTop: "16px" }}>
      {players.map((player) => (
        <PlayerTrack key={player.color} player={player} strikes={strikes} />
      ))}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          gap: "16px",
          padding: "0 175px",
        }}
      >
        {dangerCards.map((card, index) =>
          card ? (
            <img src={killerMap[card]} key={index} />
          ) : (
            <img src={killer} key={index} />
          )
        )}
      </div>
    </div>
  )
}
