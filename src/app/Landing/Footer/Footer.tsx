import React, { useState } from "react";
import "./Footer.scss";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

type Player = "X" | "O" | null;
type GameResult = "X" | "O" | "DRAW" | null;

const Footer: React.FC = () => {
  const [board, setBoard] = useState<Player[]>(Array(16).fill(null));
  const [winner, setWinner] = useState<GameResult>(null);

  const checkWinner = (squares: Player[]): Player => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (index: number): void => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = "X";

    const playerWinStatus = checkWinner(newBoard);
    if (playerWinStatus) {
      setWinner(playerWinStatus);
      setBoard(newBoard);
      return;
    }

    if (newBoard.slice(0, 9).every((cell) => cell !== null)) {
      setWinner("DRAW");
      setBoard(newBoard);
      return;
    }

    let blocked = false;
    const visibleLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < visibleLines.length; i++) {
      const [a, b, c] = visibleLines[i];
      const cells = [newBoard[a], newBoard[b], newBoard[c]];
      if (
        cells.filter((v) => v === "O").length === 2 &&
        cells.filter((v) => v === null).length === 1
      ) {
        const emptyIndex = visibleLines[i].find(
          (idx) => newBoard[idx] === null,
        );
        if (emptyIndex !== undefined) {
          newBoard[emptyIndex] = "O";
          blocked = true;
          break;
        }
      }
    }

    if (!blocked) {
      for (let i = 0; i < visibleLines.length; i++) {
        const [a, b, c] = visibleLines[i];
        const cells = [newBoard[a], newBoard[b], newBoard[c]];
        if (
          cells.filter((v) => v === "X").length === 2 &&
          cells.filter((v) => v === null).length === 1
        ) {
          const emptyIndex = visibleLines[i].find(
            (idx) => newBoard[idx] === null,
          );
          if (emptyIndex !== undefined) {
            newBoard[emptyIndex] = "O";
            blocked = true;
            break;
          }
        }
      }
    }

    if (!blocked) {
      const bestMoves = [4, 0, 2, 6, 8, 1, 3, 5, 7];
      for (const move of bestMoves) {
        if (newBoard[move] === null) {
          newBoard[move] = "O";
          break;
        }
      }
    }

    setBoard(newBoard);

    const aiWinStatus = checkWinner(newBoard);
    if (aiWinStatus) {
      setWinner(aiWinStatus);
    } else if (newBoard.slice(0, 9).every((cell) => cell !== null)) {
      setWinner("DRAW");
    }
  };

  const resetGame = (): void => {
    setBoard(Array(16).fill(null));
    setWinner(null);
  };

  const getDynamicHeadline = () => {
    switch (winner) {
      case "O":
        return "leave it to me, so";
      case "X":
        return "ur the best and still, so";
      case "DRAW":
        return "we in the same page, so";
      default:
        return "";
    }
  };

  return (
    <footer className="footer-section">
      <div className="footer-content">
        <div className="footer-top">
          <div className="text-area">
            <div className="text-area-caption">
              <h2>{getDynamicHeadline()}</h2>
              <h2>Let&apos;s build something amazing together.</h2>
            </div>
            <a href="mailto:shabbahatha86@gmail.com" className="contact-btn">
              Get in Touch
            </a>
          </div>

          <div className="game-area">
            <div className="game-status">
              Beat ME
              {winner && (
                <button className="reset-btn" onClick={resetGame}>
                  Try Again?
                </button>
              )}
            </div>

            <div className="ttt-grid">
              {board.slice(0, 9).map((cell, index) => (
                <div
                  key={index}
                  className={`cell ${cell ? "filled" : ""}`}
                  onClick={() => handleClick(index)}
                >
                  {cell}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-socials">
            <a
              href="https://linkedin.com/in/thabys/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://github.com/Tabyss"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub />
            </a>
            <a
              href="https://instagram.com/thabys/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
          </div>

          <div className="footer-copy">
            <p>
              &copy; {new Date().getFullYear()} Thabys. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;