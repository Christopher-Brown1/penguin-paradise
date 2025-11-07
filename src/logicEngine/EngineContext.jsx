/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext } from "react"

const EngineContext = createContext()

export const EngineProvider = ({ children }) => {
  const [gameState, setGameState] = useState({
    isLoading: true,
    isDealing: false,
    cardsId: null,
    dangerPosition: 1,
    dangerCards: [null, null, null, null, null, null, null, null],
    history: ["dark", "dark", "dark", "dark", "dark"],
    strikes: [], // array of colors
    players: [], // name, color, balance, position(1-8), betPosition(1-8)
  })

  return (
    <EngineContext.Provider value={{ gameState, setGameState }}>
      {children}
    </EngineContext.Provider>
  )
}

export const useEngineContext = () => {
  const { gameState, setGameState } = useContext(EngineContext)
  return { gameState, setGameState }
}

// TODO:
// - End of round
// - Round count
