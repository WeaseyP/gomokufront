import { useEffect, useState } from 'react'
import { GameItem } from '../components'

import { API_HOST } from '../constants'
import { get } from '../utils/http'
import type { GameData } from '../types'

import style from './Games.module.css'

export default function Games() {
  const [games, setGames] = useState<GameData[]>([])
  const fetchGames = async () => {
    const fetchedGames = await get<GameData[]>(`${API_HOST}/api/game`)
    setGames(fetchedGames)
  }

  useEffect(() => {
    fetchGames()
  }, [])

  return (
    <div className={style.container}>
      <h1 className={style.header}>Previous Games</h1>
      {games.length === 0 && <p>Fetching Games...</p>}
      {games.map(({ _id, date, userId, result }) => (
        <GameItem key={_id} id={_id} date={date} result={result} />
      ))}
    </div>
  )
}
