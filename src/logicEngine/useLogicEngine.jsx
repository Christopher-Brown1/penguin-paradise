/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react"

import { DEAL_INTERVAL, DECK_API_URL, suitToPlayerMap } from "./consts"

import { useEngineContext } from "./EngineContext"

export const useLogicEngine = () => {
  const { state, setGameState } = useEngineContext()

  // Fetch deck on mount
  useEffect(() => {
    if (!state.cardsId && state.isLoading) fetchNewDeck()
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
    if (state.strikes.length === 3) movePlayer(state.strikes[0], "backward") // TODO: Move to beginning
    if (
      state.players.every(({ position }) => position > state.dangerPosition)
    ) {
      const dangerCard = drawCard(true)
      setGameState((state) => ({
        ...state,
        players: movePlayer(dangerCard, "backward"),
        dangerCards: [...state.dangerCards, dangerCard],
        dangerPosition: state.dangerPosition + 1,
      }))
    }
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
        const players = movePlayer(color)
        const history = [color, ...state.history]
        const strikes = state.strikes.includes(color)
          ? [color, ...state.strikes]
          : [color]

        return oneOff
          ? color
          : setGameState((state) => ({ ...state, players, history, strikes }))
      })
  const movePlayer = (color, direction = "forward") =>
    state.players.map((player) => ({
      ...player,
      position:
        player.color === color
          ? player.position + (direction === "forward" ? 1 : -1)
          : player.position,
    }))

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
