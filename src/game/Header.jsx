import { useState } from "react"
import style from "../game/header.module.css"

import Logo from "../global/assets/logo.svg?react"
import { DealButton } from "../game/DealButton"
import { useLogicEngine } from "../logicEngine/useLogicEngine"

export const Header = () => {
  const { history, isDealing, toggleDealing } = useLogicEngine()
  console.log("HISTORY: ", history)

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
      <DealButton onToggleDealing={toggleDealing} isDealing={isDealing} />
    </header>
  )
}
