export const DEAL_INTERVAL = 3000
export const DECK_API_URL = "https://deckofcardsapi.com/api/deck/"
export const suitToPlayerMap = {
  HEARTS: "orange",
  DIAMONDS: "green",
  CLUBS: "blue",
  SPADES: "purple",
}
export const initialGameState = {
  isOnboarding: false,
  isBetting: false,
  isDealing: false,
  isRoundOver: false,
  isGameOver: false,
  cardsId: null,
  roundCount: 0,
  dangerPosition: 0,
  dangerCards: [null, null, null, null, null, null, null],
  history: ["dark", "dark", "dark", "dark", "dark"],
  strikes: [], // array of colors
  players: [],
}
