import { useState } from "react";

const initialBoard = new Array(9).fill(null);

export default function TicTacToe() {
  const [board, setBoard] = useState(initialBoard);
  const [XTurn, setXTurn] = useState(true);

  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  function calculateWinner(board) {
    for (let i = 0; i < winningConditions.length; i++) {
      const [x, y, z] = winningConditions[i];

      if (board[x] && board[x] === board[y] && board[x] === board[z]) {
        return board[x];
      }
    }
    return null;
  }

  function handleClick(index) {
    const winner = calculateWinner(board);
    if (winner) {
      return;
    }
    const newBoard = [...board];
    newBoard[index] = XTurn ? "X" : "O";
    setBoard(newBoard);
    setXTurn(!XTurn);
  }

  function statusMessage() {
    const winner = calculateWinner(board);
    if (winner) {
      return `Player ${winner} Wins! 🎉`;
    } else if (!board.includes(null)) {
      return `Its a Draw! 🙌🏼`;
    } else {
      return XTurn ? "Player X Turn" : "Player O Turn";
    }
  }

  function reset() {
    setBoard(initialBoard);
    setXTurn(true);
  }

  return (
    <main className="flex flex-col gap-2 items">
      <h1 className="text-center font-semibold text-4xl sm:text-[40px] mb-6 bg-gradient-to-br from-slate-400 to-slate-700 bg-clip-text text-transparent tracking-tighter">
        Tic Tac Toe
      </h1>

      <section className="grid grid-cols-3 gap-1 ">
        {board.map((cell, index) => {
          return (
            <button
              key={index}
              className="w-28 h-28 sm:w-32 sm:h-32 bg-slate-300 flex justify-center items-center rounded text-4xl cursor-pointer hover:bg-opacity-70 transition-all disabled:pointer-events-none"
              onClick={() => {
                handleClick(index);
              }}
              disabled={cell !== null || calculateWinner(board) ? true : false}
            >
              {cell}
            </button>
          );
        })}
      </section>

      <section className="flex justify-between items-center">
        <h1 className="font-semibold text-xl sm:text-2xl">{statusMessage()}</h1>
        <button
          type="button"
          className="uppercase bg-slate-300 py-2.5 px-5 rounded tracking-widest font-semibold hover:bg-opacity-70 transition-all sm:text-base text-sm"
          onClick={reset}
        >
          reset
        </button>
      </section>
    </main>
  );
}
