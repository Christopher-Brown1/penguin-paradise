import { useState } from "react"
import style from "../game/header.module.css"

import Logo from "../global/assets/logo.svg?react"
import { DealButton } from "../game/DealButton"

export const Header = () => {
  const [isDealing, setIsDealing] = useState(false)
  const [history, setHistory] = useState([
    "dark",
    "dark",
    "dark",
    "dark",
    "dark",
  ])

  return (
    <header className={style.headerContainer}>
      <Logo />
      <div className={style.cardHistory}>
        {history.slice(0, 5).map((color, i) => (
          <div
            key={i}
            className={i === 0 ? style.historyBig : style.historySmall}
            style={{
              background:
                color === "dark" ? "var(--white)" : `var(--player-${color})`,
              border:
                color === "dark"
                  ? "5px solid var(--dark)"
                  : `5px solid var(--player-${color}-dark)`,
            }}
          />
        ))}
      </div>
      <DealButton setIsDealing={setIsDealing} isDealing={isDealing} />
    </header>
  )
}
