import "./App.css"

import { Header } from "./header/Header"
import { GameBoard } from "./game/GameBoard"
import { useLogicEngine } from "./logicEngine/useLogicEngine"
import { Onboarding } from "./onboarding/Onboarding"
import { EndGame } from "./endGame/EndGame"

function App() {
  const { isOnboarding, isGameOver } = useLogicEngine()

  if (isOnboarding) {
    return <Onboarding />
  } else if (isGameOver) {
    return <EndGame />
  } else {
    return (
      <>
        <Header />

        <GameBoard />
      </>
    )
  }
}

export default App
