/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext } from "react"

const EngineContext = createContext()

export const EngineProvider = ({ children }) => {
  const [gameState, setGameState] = useState({
    isLoading: true,
    isDealing: false,
    cardsId: null,
    history: ["dark", "dark", "dark", "dark", "dark"],
    players: [], // TODO: Add functionality for players
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
