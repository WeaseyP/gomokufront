import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components'
import { AVAILABLE_GAME_SIZES } from '../constants'
import { UserContext } from '../context'

import style from './Home.module.css'

export default function Home() {
  const { user } = useContext(UserContext)
  const navigate = useNavigate()
  const [size, setSize] = useState(10)

  const getActions = () => {
    if (user) {
      return (
        <>
          <label className={style.label}>
            Game size
            <select
              className={style.select}
              value={size.toString()}
              onChange={(event) => setSize(parseInt(event.target.value))}
            >
              {AVAILABLE_GAME_SIZES.map((value) => (
                <option key={`size-${value}`} value={value.toString()}>
                  {value}
                </option>
              ))}
            </select>
          </label>
          <Button type="button" onClick={() => navigate(`game?size=${size}`)}>
            Start Game
          </Button>
        </>
      )
    } else {
      return (
        <>
          <Button
            type="button"
            onClick={() => {
              navigate('./login')
            }}
          >
            Login
          </Button>

          <Button
            type="button"
            onClick={() => {
              navigate('./signup')
            }}
          >
            Sign Up
          </Button>
        </>
      )
    }
  }

  return (
    <header className={style.header}>
      <div className={style.container}>
        <div className={style.actions}>{getActions()}</div>
      </div>
    </header>
  )
}
