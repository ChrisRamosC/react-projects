
import { Routes, Route, NavLink } from 'react-router-dom'
import { FourInRow } from "./pages/FourInRow.jsx"
import { TicTacToe } from "./pages/TicTacToe.jsx"


function App() {
  return (
    <>
      <nav className='games-nav'>
      <h1>Games</h1>
        <ul className='games-list'>
          <li><NavLink to="/tic-tac-toe">Tic Tac Toe</NavLink></li>
          <li><NavLink to="/four-in-a-row">Four in a row</NavLink></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/tic-tac-toe" element={<TicTacToe />} />
        <Route path="/four-in-a-row" element={<FourInRow />} />
      </Routes>
    </>
  )
}

export default App