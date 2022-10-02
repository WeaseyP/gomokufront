import { GameAction } from './../types/GameAction';
import { createContext } from "react";
import { Position } from '../types';

type GameContextType = {
    board: GameAction
    white: [][]
    black: [][]
    updateTurn: (turn: number) => void
    updateGameSize: (gamesize: number) => void
    updateWhite: (index: number[]) => void
    updateBlack: (index: number[]) => void
    updateWinner: (index: string) => void
    gameOver: (_id: string, size: number, moves: Position[], date: Date, result: string) => Promise<true | string>
    
}

const GameContext = createContext<GameContextType>({} as GameContextType)
export default GameContext