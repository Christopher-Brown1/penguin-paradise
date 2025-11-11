/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext, useEffect, useRef } from "react"
import { DEAL_INTERVAL, DECK_API_URL, suitToPlayerMap } from "./consts"

const EngineContext = createContext()

export const EngineProvider = ({ children }) => {
  const [gameState, setGameState] = useState({
    isOnboarding: true,
    isDealing: false,
    isRoundOver: false,
    isGameOver: false,
    cardsId: null,
    roundCount: 0,
    dangerPosition: 1,
    dangerCards: [null, null, null, null, null, null, null, null],
    history: ["dark", "dark", "dark", "dark", "dark"],
    strikes: [], // array of colors
    players: [],
  })

  const intervalRef = useRef(null)
  const gameStateRef = useRef(gameState)

  // Keep ref in sync with state
  useEffect(() => {
    gameStateRef.current = gameState
  }, [gameState])

  // Helper function to draw a card
  const drawCard = (oneOff = false) =>
    fetch(`${DECK_API_URL}${gameStateRef.current.cardsId}/draw/?count=1`)
      .then((res) => res.json())
      .then((data) => {
        const color = suitToPlayerMap[data.cards[0].suit]
        return oneOff
          ? color
          : setGameState((prev) => ({
              ...prev,
              players: prev.players.map((player) => ({
                ...player,
                position:
                  player.color === color
                    ? player.position + 1
                    : player.position,
              })),
              history: [color, ...prev.history],
              strikes: prev.strikes.includes(color)
                ? [color, ...prev.strikes]
                : [color],
            }))
      })

  // Manage interval in the provider - only runs once
  useEffect(() => {
    if (gameState.isDealing && gameState.cardsId) {
      // Clear any existing interval first
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }

      // Draw first card immediately
      drawCard()

      // Set up interval
      intervalRef.current = setInterval(() => {
        drawCard()
      }, DEAL_INTERVAL)

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
          intervalRef.current = null
        }
      }
    } else {
      // Clear interval when isDealing becomes false
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [gameState.isDealing, gameState.cardsId])

  return (
    <EngineContext.Provider value={{ gameState, setGameState, drawCard }}>
      {children}
    </EngineContext.Provider>
  )
}

export const useEngineContext = () => {
  const { gameState, setGameState, drawCard } = useContext(EngineContext)

  return { gameState, setGameState, drawCard }
}

// TODO:
// - End of round
