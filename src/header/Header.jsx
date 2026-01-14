import style from "./header.module.css"

import Logo from "../global/assets/logo.svg?react"
import { DealButton } from "./DealButton"
import { useLogicEngine } from "../logicEngine/useLogicEngine"

export const Header = () => {
  const { history, players, isBetting, isRoundOver } = useLogicEngine()

  return (
    <header className={style.headerContainer}>
      <Logo />
      {isBetting && <h2>Betting round</h2>}
      {isRoundOver && (
        <h2>
          {players.filter((player) => player.position === 7)[0].name} Wins!
        </h2>
      )}
      {!isBetting && !isRoundOver && (
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
      )}
      <DealButton />
    </header>
  )
}
