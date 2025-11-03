import style from "../game/header.module.css"

import Logo from "../global/assets/logo.svg"

export const Header = () => {
  return (
    <div className={style.headerContainer}>
      <Logo />
    </div>
  )
}
