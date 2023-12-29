import { useState } from 'react'
import { TURNS_COLORS } from '../constants'
import { SquareFourInRow } from '../components/SquareFourInRow.jsx'
import { WinnerModal } from '../components/WinnerModal.jsx'
import { Square } from '../components/Square.jsx'


export const FourInRow = () => {
  const [board, setBoard] = useState((Array(6).fill().map(() => Array(7).fill(null))))

  const [turn, setTurn] = useState(TURNS_COLORS.RED)

  const [winner, setWinner] = useState(null)

  console.log(board)

  const updateBoard = (columnIndex) => {
    // Encuentra la fila más baja disponible en la columna
    const rowIndex = findLastIndex(board, row => row[columnIndex] === null);

    // Si no hay filas disponibles en la columna, no hagas nada
    if (rowIndex === -1) return;

    // Crea una copia del tablero
    const newBoard = [...board];

    // Coloca la ficha en la fila más baja disponible en la columna
    newBoard[rowIndex][columnIndex] = turn;

    // Actualiza el tablero
    setBoard(newBoard);

    // Cambia el turno
    const newTurn = turn === TURNS_COLORS.RED ? TURNS_COLORS.YELLOW : TURNS_COLORS.RED;
    setTurn(newTurn);

    // Verifica si hay un ganador
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
    }


  };

  // Implementa la función findLastIndex
  function findLastIndex(array, predicate) {
    for (let i = array.length - 1; i >= 0; i--) {
      if (predicate(array[i])) {
        return i;
      }
    }
    return -1;
  }

  function checkWinner(board) {
    // Comprueba las filas
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[0].length - 3; col++) {
        if (board[row][col] && board[row][col] === board[row][col + 1] && board[row][col] === board[row][col + 2] && board[row][col] === board[row][col + 3]) {
          return board[row][col];
        }
      }
    }

    // Comprueba las columnas
    for (let col = 0; col < board[0].length; col++) {
      for (let row = 0; row < board.length - 3; row++) {
        if (board[row][col] && board[row][col] === board[row + 1][col] && board[row][col] === board[row + 2][col] && board[row][col] === board[row + 3][col]) {
          return board[row][col];
        }
      }
    }

    // Comprueba las diagonales descendentes
    for (let row = 0; row < board.length - 3; row++) {
      for (let col = 0; col < board[0].length - 3; col++) {
        if (board[row][col] && board[row][col] === board[row + 1][col + 1] && board[row][col] === board[row + 2][col + 2] && board[row][col] === board[row + 3][col + 3]) {
          return board[row][col];
        }
      }
    }

    // Comprueba las diagonales ascendentes
    for (let row = 3; row < board.length; row++) {
      for (let col = 0; col < board[0].length - 3; col++) {
        if (board[row][col] && board[row][col] === board[row - 1][col + 1] && board[row][col] === board[row - 2][col + 2] && board[row][col] === board[row - 3][col + 3]) {
          return board[row][col];
        }
      }
    }

    // Si no hay ganador, devuelve null
    return null;
  }

  const resetGame = () => {
    setBoard((Array(6).fill().map(() => Array(7).fill(null))))
    setTurn(TURNS_COLORS.RED)
    setWinner(null)
  }


  return (
    <main className='four-in-row-board'>
      <h1>Four in a row</h1>
      <section className='four-in-row-game'>
        {
          board.map((row, rowIndex) => (
            row.map((cell, columnIndex) => (
              <SquareFourInRow
                key={`${rowIndex}-${columnIndex}`}
                rowIndex={rowIndex}
                columnIndex={columnIndex}
                value={cell}
                updateBoard={updateBoard}
              >
                {board[rowIndex][columnIndex]}
              </SquareFourInRow>
            ))
          ))
        }
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS_COLORS.YELLOW}>{TURNS_COLORS.YELLOW}</Square>
        <Square isSelected={turn === TURNS_COLORS.RED}>{TURNS_COLORS.RED}</Square>
      </section>

      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>

  );
}