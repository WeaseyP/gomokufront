import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Board, Button } from '../components'
import type { GameData } from '../types'
import { get } from '../utils/http'
import { API_HOST } from '../constants'

import style from './GameLog.module.css'

export default function GameLog() {
  const { gameId = '' } = useParams()
  const navigate = useNavigate()
  const [game, setGame] = useState<GameData>()

  const fetchedGame = async (id: string) => {
    console.log(typeof id)
    const fetchedGame = await get<GameData>(`${API_HOST}/api/gamelog/${id}`)
    setGame(fetchedGame)
  }
  useEffect(() => {
    fetchedGame(gameId)
  }, [gameId])

  if (!game)
    return (
      <p className={style.message}>
        Cannot find the game log, please go back to the home page
      </p>
    )

  const { size, moves, result } = game

  return (
    <>
      <p className={style.message}>{result}</p>
      <Board size={size} moves={moves} readonly />
      <div className={style.button}>
        <Button onClick={() => navigate('/game')}>Back</Button>
      </div>
    </>
  )
}
