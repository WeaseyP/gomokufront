import { GAME_STATUS } from './constants'

export type Position = [number, number]

export type GameData = {
  _id: string
  userId: string
  size: number
  moves: Position[]
  date: string
  result: GAME_STATUS
}

export type GameAction = {
  turn: number
  gamesize: number
  white: number[]
  black: number[]
  finalWinner: string
}

export type User = {
  _id: string
  token: string
}

export type Credential = {
  username: string
  password: string
}
