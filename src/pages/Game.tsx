import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Board, Button, Message } from '../components'
import { isGameEnded } from '../utils'
import { AVAILABLE_GAME_SIZES, GAME_STATUS } from '../constants'
import type { Position } from '../types'
import { API_HOST } from '../constants'

import style from './Game.module.css'
import { post } from '../utils/http'

const isGameOver = (gameStatus: GAME_STATUS) =>
  [GAME_STATUS.DRAW, GAME_STATUS.BLACK_WIN, GAME_STATUS.WHITE_WIN].includes(
    gameStatus
  )

export default function Game() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  var user = JSON.parse(localStorage.getItem('user') || '{}')
  const userId = user._id
  const size = parseInt(searchParams.get('size') || '0')
  const [gameStatus, setGameStatus] = useState(GAME_STATUS.BLACK_MOVE)
  const [moves, setMoves] = useState<Position[]>([])
  const [errorMessage, setErrorMessage] = useState('')

  if (!AVAILABLE_GAME_SIZES.includes(size)) {
    return (
      <p className={style.message}>
        Invalid game size, please go back to home page and start the game
        again...
      </p>
    )
  }

  /*
  const startGame = async () => {
    const date = new Date()
    var newGameStatus: string = String(gameStatus)
    if (
      newGameStatus === 'Current player: Black' ||
      newGameStatus === 'Current player: White'
    ) {
      newGameStatus = 'Game Unfinished'
    }
    await post(`${API_HOST}/api/game`, {
      moves,
      newGameStatus,
      date,
      size,
      userId,
    })
  }
  */

  const updateGameStatus = (move: Position) => {
    if (isGameOver(gameStatus)) return
    const updatedMoves = [...moves, move]
    if (isGameEnded(size, updatedMoves)) {
      if (updatedMoves.length === size * size) {
        setGameStatus(GAME_STATUS.DRAW)
      } else if (updatedMoves.length % 2) {
        setGameStatus(GAME_STATUS.BLACK_WIN)
      } else {
        setGameStatus(GAME_STATUS.WHITE_WIN)
      }
    } else {
      setGameStatus(
        updatedMoves.length % 2
          ? GAME_STATUS.WHITE_MOVE
          : GAME_STATUS.BLACK_MOVE
      )
    }
    setMoves(updatedMoves)
  }

  const restart = () => {
    if (
      !isGameOver(gameStatus) &&
      !window.confirm('The game is still in progress, are you sure to restart?')
    )
      return
    setMoves([])
    setGameStatus(GAME_STATUS.BLACK_MOVE)
  }

  const leave = async () => {
    setErrorMessage('')
    if (
      !isGameOver(gameStatus) &&
      !window.confirm('The game is still in progress, are you sure to leave?')
    ) {
      return
    }
    const date = new Date()
    const newGameStatus: string = String(gameStatus)
    await post(`${API_HOST}/api/game`, {
      moves,
      newGameStatus,
      date,
      size,
      userId,
    })
    navigate('/')
  }
  return (
    <>
      {errorMessage && <Message variant="error" message={errorMessage} />}
      <p className={style.message}>{gameStatus}</p>
      <Board
        size={size}
        updateGameStatus={updateGameStatus}
        moves={moves}
        readonly={isGameOver(gameStatus)}
      />
      <div className={style.buttons}>
        <Button type="button" onClick={restart}>
          Restart
        </Button>
        <Button
          type="button"
          onClick={(e) => {
            e.preventDefault()
            leave()
          }}
        >
          Leave
        </Button>
      </div>
    </>
  )
}
