/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react"

import { DECK_API_URL } from "./consts"

import { useEngineContext } from "./EngineContext"

export const useLogicEngine = () => {
  const {
    gameState: state,
    setGameState,
    drawCard: contextDrawCard,
  } = useEngineContext()

  // Utils - Private functions (defined first so they can be used in effects)
  const movePlayer = (players, color, direction = "forward") => {
    if (direction === "start") {
      return players.map((player) => ({
        ...player,
        position: player.color === color ? 0 : player.position,
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

  // Local drawCard for oneOff cases (used in history effect)
  const drawCard = (oneOff = false) => {
    if (oneOff) {
      // For oneOff, use context's drawCard which handles the ref properly
      return contextDrawCard(true)
    }
    // Regular drawCard is now handled by the context provider's interval
    return contextDrawCard(false)
  }

  const fetchNewDeck = () =>
    fetch(`${DECK_API_URL}new/shuffle/?deck_count=2`)
      .then((res) => res.json())
      .then((data) => {
        setGameState((prev) => ({
          ...prev,
          cardsId: data.deck_id,
          isLoading: false,
          roundCount: 1,
        }))
      })

  // Fetch deck on mount
  useEffect(() => {
    !state.cardsId && fetchNewDeck()
  }, [])

  // After every update to history, run logic checks
  useEffect(() => {
    setGameState((prev) => {
      const newVal = { ...prev }
      // If 3 strikes, move player to start
      if (newVal.strikes.length === 3)
        newVal.players = movePlayer(newVal.players, newVal.strikes[0], "start")

      // If danger position is reached, draw card
      if (
        newVal.players.every(({ position }) => position > newVal.dangerPosition)
      )
        // Draw card asynchronously and update state
        drawCard(true).then((color) => {
          newVal.players = movePlayer(newVal.players, color, "backward")
          newVal.dangerCards[newVal.dangerPosition] = color
          newVal.dangerPosition = newVal.dangerPosition + 1
        })

      // If player reaches the end of the board, end round
      if (newVal.players.some(({ position }) => position === 7)) {
        if (newVal.roundCount === 5) newVal.isGameOver = true

        newVal.isRoundOver = true
        newVal.isDealing = false

        const winnerPoints = newVal.players.filter(
          (player) => player.position !== player.betPosition
        ).length
        newVal.players = newVal.players.map((player) => {
          if (player.position === player.betPosition) {
            return { ...player, balance: player.balance + 1 }
          } else if (player.position === 8) {
            return { ...player, balance: player.balance + winnerPoints }
          } else {
            return player
          }
        })
      }
      return newVal
    })
  }, [state.history])

  // Handlers - Exported functions

  const toggleDealing = () =>
    setGameState((prev) => ({ ...prev, isDealing: !prev.isDealing }))
  const placeBet = (color, bet) =>
    setGameState((prev) => ({
      ...prev,
      players: prev.players.map((player) =>
        player.color === color ? { ...player, betPosition: bet } : player
      ),
    }))
  const startGame = (players) => {
    const defaultData = { balance: 5, position: 1, betPosition: 1 }
    
    setGameState((prev) => ({
      ...prev,
      isOnboarding: false,
      isBetting: true,
      players: [
        {
          name: players.purple,
          color: "purple",
          ...defaultData,
        },
        {
          name: players.orange,
          color: "orange",
          ...defaultData,
        },
        {
          name: players.blue,
          color: "blue",
          ...defaultData,
        },
        {
          name: players.green,
          color: "green",
          ...defaultData,
        },
      ],
    }))
  }
  const startNextRound = () => {
    setGameState((prev) => ({
      ...prev,
      isBetting: true,
      isRoundOver: false,
      // Reset round state
      roundCount: prev.roundCount + 1,
      dangerPosition: 0,
      dangerCards: [null, null, null, null, null, null, null, null],
      history: ["dark", "dark", "dark", "dark", "dark"],
      strikes: [],
      players: prev.players.map((player) => ({
        ...player,
        position: 0,
        betPosition: 0,
      })),
    }))
  }

  return {
    ...state,
    toggleDealing,
    placeBet,
    startGame,
    startNextRound,
  }
}
