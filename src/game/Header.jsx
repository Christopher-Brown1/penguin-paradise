import style from "../game/header.module.css"

import Logo from "../global/assets/logo.svg?react"
import { DealButton } from "../game/DealButton"

export const Header = () => {
  return (
    <div className={style.headerContainer}>
      <Logo />
      <DealButton />
    </div>
  )
}
