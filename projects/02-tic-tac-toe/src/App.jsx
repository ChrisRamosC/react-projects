import { useState } from "react"
import confetti from 'canvas-confetti'
import { Square } from "./components/Square.jsx"
import { TURNS } from "./constants.js"
import { checkWinnerFrom } from "./logic/board.js"
import { WinnerModal } from "./components/WinnerModal.jsx"
import { saveGameStorage, resetGameStorage } from "./logic/storage/index.js"


function App() {
  const [board, setBoard] = useState(() => {
    const board = window.localStorage.getItem('board')
    if (board) {
      return JSON.parse(board)
    }
    return Array(9).fill(null)
  })

  const [turn, setTurn] = useState(() => {
    const turn = window.localStorage.getItem('turn')
    if (turn) {
      return JSON.parse(turn)
    }
    return TURNS.X
  })

  const [winner, setWinner] = useState(null) // null | X | O | 'TIE'

  const updateBoard = (index) => {
    // Si ya hay un valor en el board, no hacer nada
    if (board[index] || winner) return

    // Actualizar el board
    // recordar que se hace de esta manera ya que las props son inmutables
    const newBoard = [...board]
    newBoard[index] = turn // X or O
    setBoard(newBoard)

    // cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    saveGameStorage({ board: newBoard, turn: newTurn })

    // verificar si hay un ganador
    const newWinner = checkWinnerFrom(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
      // la actualización de los estados en react son asíncronos
    } else if (checkEndGame(newBoard)) {
      setWinner('TIE') // empate
    }
  }

  const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square !== null)
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
    resetGameStorage()
  }



  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Reiniciar</button>
      <section className="game">
        {
          board.map((_, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {board[index]}
              </Square>
            )
          })
        }
      </section>
      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  )
}

export default App
