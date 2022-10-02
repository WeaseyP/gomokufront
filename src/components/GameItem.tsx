import { useNavigate } from 'react-router-dom'
import style from './GameItem.module.css'

type GameItemProps = {
  id: string
  date: string
  result: string
}

export default function GameItem(props: GameItemProps) {
  const { id, date, result } = props

  const navigate = useNavigate()
  return (
    <div className={style.game}>
      <p className={style.title}>
        Game Played on {date} - {result}
      </p>
      <button
        className={style.button}
        onClick={() => navigate(`/gamelog/${id}`)}
      >
        View Game Log
      </button>
    </div>
  )
}
