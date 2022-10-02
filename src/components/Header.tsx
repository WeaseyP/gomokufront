import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../context'
import { useContext } from 'react'
import { Button } from '../components'

import style from './Header.module.css'

export default function Header() {
  const navigate = useNavigate()
  const { user, logout } = useContext(UserContext)
  const getActions = () => {
    if (user) {
      return (
        <>
          <Button
            className={style.action}
            onClick={() => {
              logout()
              navigate('./')
            }}
          >
            Logout
          </Button>
          <Button className={style.action} onClick={() => navigate('/games')}>
            Previous Games
          </Button>
        </>
      )
    }
  }
  return (
    <header className={style.header}>
      <div className={style.container}>
        <Link to="/">Gomoku</Link>
        <div className={style.actions}>
          <div className={style.action}>{getActions()}</div>
        </div>
      </div>
    </header>
  )
}
