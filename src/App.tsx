import { Routes, Route, Navigate } from 'react-router-dom'
import { Header, UserProvider } from './components'
import { Home, Game, Games, GameLog, Login, SignUp } from './pages'

import style from './App.module.css'

function App() {
  return (
    <UserProvider>
      <Header />
      <main className={style.main}>
        <div className={style.container}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="game" element={<Game />} />
            <Route path="games" element={<Games />} />
            <Route path="gamelog/:gameId" element={<GameLog />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </main>
    </UserProvider>
  )
}

export default App
