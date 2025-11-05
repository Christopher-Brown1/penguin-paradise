/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react"

import { DEAL_INTERVAL, DECK_API_URL, suitToPlayerMap } from "./consts"

import { useEngineContext } from "./EngineContext"

export const useLogicEngine = () => {
  const { gameState, setGameState } = useEngineContext()

  // Fetch deck on mount
  useEffect(() => {
    if (!gameState.cardsId && gameState.isLoading) fetchNewDeck()
  }, [])

  // Deal card on interval
  useEffect(() => {
    if (gameState.isDealing) {
      drawCard()
      const interval = setInterval(drawCard, DEAL_INTERVAL)
      return () => clearInterval(interval)
    }
  }, [gameState.isDealing])

  const fetchNewDeck = () => {
    fetch(`${DECK_API_URL}new/shuffle/?deck_count=1`)
      .then((res) => res.json())
      .then((data) => {
        setGameState((prev) => ({
          ...prev,
          cardsId: data.deck_id,
          isLoading: false,
        }))
      })
  }
  const drawCard = () => {
    fetch(`${DECK_API_URL}${gameState.cardsId}/draw/?count=1`)
      .then((res) => res.json())
      .then((data) => {
        setGameState((prev) => ({
          ...prev,
          history: [suitToPlayerMap[data.cards[0].suit], ...prev.history],
        }))
      })
  }

  const toggleDealing = () => {
    setGameState((prev) => ({ ...prev, isDealing: !prev.isDealing }))
  }

  return { ...gameState, toggleDealing }
}
