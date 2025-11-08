/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react"

import { DEAL_INTERVAL, DECK_API_URL, suitToPlayerMap } from "./consts"

import { useEngineContext } from "./EngineContext"

export const useLogicEngine = () => {
  const { gameState: state, setGameState } = useEngineContext()

  // Fetch deck on mount
  useEffect(() => {
    !state.cardsId && state.isLoading && fetchNewDeck()
  }, [])

  // Deal card on interval
  useEffect(() => {
    if (state.isDealing) {
      drawCard()
      const interval = setInterval(drawCard, DEAL_INTERVAL)

      return () => clearInterval(interval)
    }
  }, [state.isDealing])

  // After every update to history, run logic checks
  useEffect(() => {
    setGameState((state) => {
      const newVal = { ...state }
      if (newVal.strikes.length === 3) {
        newVal.players = movePlayer(newVal.players, newVal.strikes[0], "start")
      }
      if (
        newVal.players.length > 0 &&
        newVal.players.every(({ pos }) => pos > newVal.dangerPosition)
      ) {
        newVal.dangerCard = drawCard(true)
        newVal.players = movePlayer(
          newVal.players,
          newVal.dangerCard,
          "backward"
        )
        newVal.dangerCards = [...newVal.dangerCards, newVal.dangerCard]
        newVal.dangerPosition = newVal.dangerPosition + 1
      }

      return newVal
    })
  }, [state.history])

  // Utils - Private functions
  const fetchNewDeck = () =>
    fetch(`${DECK_API_URL}new/shuffle/?deck_count=1`)
      .then((res) => res.json())
      .then((data) => {
        setGameState((prev) => ({
          ...prev,
          cardsId: data.deck_id,
          isLoading: false,
        }))
      })
  const drawCard = (oneOff = false) =>
    fetch(`${DECK_API_URL}${state.cardsId}/draw/?count=1`)
      .then((res) => res.json())
      .then((data) => {
        const color = suitToPlayerMap[data.cards[0].suit]

        return oneOff
          ? color
          : setGameState((state) => ({
              ...state,
              players: movePlayer(state.players, color),
              history: [color, ...state.history],
              strikes: state.strikes.includes(color)
                ? [color, ...state.strikes]
                : [color],
            }))
      })
  const movePlayer = (players, color, direction = "forward") => {
    if (direction === "start") {
      return players.map((player) => ({
        ...player,
        position: player.color === color ? 1 : player.position,
      }))
    } else {
      return players.map((player) => ({
        ...player,
        position:
          player.color === color
            ? player.position + (direction === "forward" ? 1 : -1)
            : player.position,
      }))
    }
  }

  // Handlers - Exported functions
  const addPlayer = (player) =>
    setGameState((prev) => ({
      ...prev,
      players: [...prev.players, player],
    }))
  const toggleDealing = () =>
    setGameState((prev) => ({ ...prev, isDealing: !prev.isDealing }))
  const placeBet = (color, bet) =>
    setGameState((prev) => ({
      ...prev,
      players: prev.players.map((player) =>
        player.color === color ? { ...player, betPosition: bet } : player
      ),
    }))

  return { ...state, toggleDealing, addPlayer, placeBet }
}
