/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect, useRef, useContext } from "react"
import {
  DEAL_INTERVAL,
  DECK_API_URL,
  suitToPlayerMap,
  initialGameState,
} from "./consts"

const EngineContext = createContext()

export const EngineProvider = ({ children }) => {
  const [gameState, setGameState] = useState(initialGameState)
  const latestGameStateRef = useRef(gameState)
  const intRef = useRef(null)

  const clearIntervalRef = () => {
    if (intRef.current) {
      clearInterval(intRef.current)
      intRef.current = null
    }
  }

  // Update latest game state ref
  useEffect(() => {
    latestGameStateRef.current = gameState
  }, [gameState])

  // Fetch deck on mount
  useEffect(() => {
    if (!gameState.cardsId)
      fetchNewDeck().then((cardsId) =>
        setGameState((prev) => ({ ...prev, cardsId, isOnboarding: true }))
      )
  }, [])

  // Process dealing logic
  useEffect(() => {
    if (gameState.isDealing) {
      // Clear any existing interval first
      clearIntervalRef()

      processDeal(latestGameStateRef.current).then(setGameState)
      intRef.current = setInterval(() => {
        processDeal(latestGameStateRef.current).then(setGameState)
      }, DEAL_INTERVAL)

      return () => clearIntervalRef()
    } else {
      // Clear interval when isDealing becomes false
      clearIntervalRef()
    }
  }, [gameState.isDealing])

  // Game functions
  const startGame = (players) => {
    const defaultData = { balance: 5, position: 0, betPosition: 0 }

    setGameState((prev) => ({
      ...prev,
      isOnboarding: false,
      isBetting: true,
      players: Object.keys(players).map((color) => ({
        ...defaultData,
        color,
        name: players[color],
      })),
    }))
  }
  const toggleDealing = () =>
    setGameState((prev) => ({
      ...prev,
      isDealing: !prev.isDealing,
      isBetting: false,
    }))
  const placeBet = (color, bet) =>
    setGameState((prev) => ({
      ...prev,
      players: placeBetHandler(prev.players, color, bet),
    }))
  const startNextRound = () =>
    setGameState((prev) => ({
      ...initialGameState,
      isBetting: true,
      isRoundOver: false,
      players: resetPlayers(prev.players),
    }))

  return (
    <EngineContext.Provider
      value={{ gameState, startGame, toggleDealing, startNextRound, placeBet }}
    >
      {children}
    </EngineContext.Provider>
  )
}

// Card utils
const drawCard = (cardsId) =>
  fetch(`${DECK_API_URL}${cardsId}/draw/?count=1`)
    .then((res) => res.json())
    .then((data) => suitToPlayerMap[data.cards[0].suit])
    .catch(async () => await fetchNewDeck()) // If card draw fails, fetch a new deck
const fetchNewDeck = () =>
  fetch(`${DECK_API_URL}new/shuffle/?deck_count=1`)
    .then((res) => res.json())
    .then((data) => data.deck_id)
const processDeal = async (gameState) => {
  // Draw first card immediately
  const newVal = { ...gameState }
  const color = await drawCard(gameState.cardsId)
  newVal.history = [color, ...gameState.history]
  newVal.strikes = gameState.strikes.includes(color)
    ? [color, ...gameState.strikes]
    : [color]

  // 1. Move player(color) forward
  newVal.players = movePlayer(newVal.players, color)
  // 2. If 3 strikes, move player to start
  if (newVal.strikes.length === 3) {
    newVal.players = movePlayer(newVal.players, newVal.strikes[0], "start")
  }
  // 3. If danger position is reached, draw a danger card
  if (
    newVal.players.every(({ position }) => position > newVal.dangerPosition)
  ) {
    const dangerColor = await drawCard(gameState.cardsId)
    newVal.dangerCards[newVal.dangerPosition] = dangerColor
    newVal.dangerPosition = newVal.dangerPosition + 1
    newVal.players = movePlayer(newVal.players, dangerColor, "backward")
  }
  // 4. If player reaches the end of the board, end round
  if (newVal.players.some(({ position }) => position === 7)) {
    newVal.isRoundOver = true
    newVal.isDealing = false
    // If round count is 5, end game
    if (newVal.roundCount === 5) newVal.isGameOver = true

    newVal.players = scorePlayers(newVal.players)
  }

  return newVal
}

// Player utils
const movePlayer = (players, color, direction = "forward") =>
  players.map((player) => ({
    ...player,
    position:
      player.color === color
        ? player.position +
          (direction === "start" ? 0 : direction === "forward" ? 1 : -1)
        : player.position,
  }))
const placeBetHandler = (prevPlayers, color, bet) =>
  prevPlayers.map((player) =>
    player.color === color
      ? { ...player, betPosition: bet, balance: player.balance - 1 }
      : player
  )
const resetPlayers = (players) =>
  players.map((player) => ({
    ...player,
    position: 0,
    betPosition: 0,
  }))
const scorePlayers = (players) => {
  const winnerPoints = players.filter(
    (p) => p.position !== p.betPosition
  ).length

  return players.map((player) => ({
    ...player,
    balance:
      player.position === player.betPosition
        ? player.balance + 1
        : player.position === 8
        ? player.balance + winnerPoints
        : player.balance,
  }))
}

export const useLogicEngine = () => {
  const { gameState, startGame, toggleDealing, startNextRound, placeBet } =
    useContext(EngineContext)

  return { ...gameState, startGame, toggleDealing, startNextRound, placeBet }
}
