import "./App.css"

import { Header } from "../src/game/Header"
import { useLogicEngine } from "./logicEngine/useLogicEngine"

function App() {
  const { players, roundCount, dangerCards } = useLogicEngine()

  return (
    <>
      <Header />
      <p style={{ fontSize: "20px", color: "var(--dark)" }}>
        Round: {roundCount}
      </p>
      {players?.map((player) => (
        <div
          key={player.name}
          style={{ background: `var(--player-${player.color})` }}
        >
          <h2>{player.name}</h2>
          <p style={{ fontSize: "20px", color: "var(--dark)" }}>
            {" "}
            position: {player.position}
          </p>
        </div>
      ))}

      {dangerCards.map((card, i) => (
        <div key={i} style={{ background: `var(--player-${card})` }}>
          <p style={{ fontSize: "20px", color: "var(--dark)" }}>{card}</p>
        </div>
      ))}
    </>
  )
}

export default App
