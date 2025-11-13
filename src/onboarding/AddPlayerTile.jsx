import style from "../onboarding/addPlayerTile.module.css"
import fishBlue from "../global/assets/fish-blue.svg"
import fishGreen from "../global/assets/fish-green.svg"
import fishOrange from "../global/assets/fish-orange.svg"
import fishPurple from "../global/assets/fish-purple.svg"

const iconMap = {
  blue: fishBlue,
  green: fishGreen,
  orange: fishOrange,
  purple: fishPurple,
}

export const AddPlayerTile = ({ color, onChange, value }) => {
  const placeholderColor =
    color === "green"
      ? style.green
      : color === "purple"
      ? style.purple
      : color === "blue"
      ? style.blue
      : color === "orange"
      ? style.orange
      : null

  return (
    <div
      className={style.tile}
      style={{
        border: `3px solid var(--player-${color}-dark)`,
        background: `var(--player-${color})`,
      }}
    >
      <img src={iconMap[color]} />
      <div className={style.actionContainer}>
        <input
          type='text'
          placeholder='Add Player'
          color={color}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${style.textInput} ${placeholderColor}`}
          style={{
            border: `2px solid var(--player-${color}-dark)`,
            backgroundColor: `var(--player-${color})`,
            color: `var(--player-${color}-dark)`,
            // TODO
            // color.placeholder:`var(--player-${color}-dark)`,
          }}
        />
      </div>
    </div>
  )
}
