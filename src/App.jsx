
import "./App.css";
import { useState } from "react";

const ladders = {
  4: 14,
  9: 31,
  20: 38,
  28: 84,
  40: 59,
  63: 81,
  71: 91,
};

const snakes = {
  17: 7,
  54: 34,
  62: 19,
  64: 60,
  87: 24,
  93: 73,
  95: 75,
  99: 78,
};

function App() {
  const [turn, setTurn] = useState("p1");
  const [p1Position, setP1Position] = useState(1);
  const [p2Position, setP2Position] = useState(1);
  const [diceValue, setDiceValue] = useState(0);
  const [winner, setWinner] = useState(null);

  const rollDice = () => {
    if (winner) return;

    const roll = Math.floor(Math.random() * 6) + 1;
    setDiceValue(roll);

    if (turn === "p1") {
      let newPosition = p1Position + roll;

      if (newPosition > 100) {
        newPosition = p1Position;
      } else if (ladders[newPosition]) {
        newPosition = ladders[newPosition];
      } else if (snakes[newPosition]) {
        newPosition = snakes[newPosition];
      }

      setP1Position(newPosition);

      if (newPosition === 100) {
        setWinner("Player 1");
      } else {
        setTurn("p2");
      }
    } else {
      let newPosition = p2Position + roll;

      if (newPosition > 100) {
        newPosition = p2Position;
      } else if (ladders[newPosition]) {
        newPosition = ladders[newPosition];
      } else if (snakes[newPosition]) {
        newPosition = snakes[newPosition];
      }

      setP2Position(newPosition);

      if (newPosition === 100) {
        setWinner("Player 2");
      } else {
        setTurn("p1");
      }
    }
  };

  const resetGame = () => {
    setP1Position(1);
    setP2Position(1);
    setDiceValue(0);
    setTurn("p1");
    setWinner(null);
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Snake & Ladders</h1>

        <div className="game-header">
          <div className="turn-info">
            {winner ? (
              <div className="winner-info">
                <span className="winner-text">
                  🏆 {winner} wins!
                </span>
                <span className="loser-text">
                  {winner === "Player 1"
                    ? "Player 2 loses"
                    : "Player 1 loses"}
                </span>
              </div>
            ) : (
              <span>
                Turn:{" "}
                <span className={`turn-badge ${turn}`}>
                  {turn.toUpperCase()}
                </span>
              </span>
            )}
          </div>

          <div className="player-legend">
            <span>
              <span className="legend-dot p1-dot"></span>
              P1
            </span>

            <span>
              <span className="legend-dot p2-dot"></span>
              P2
            </span>
          </div>
        </div>

        <div className="game-board">
          {Array.from({ length: 100 }, (_, index) => {
            const row = Math.floor(index / 10);
            const col = index % 10;

            const cellNumber =
              row % 2 === 0
                ? 100 - row * 10 - col
                : 91 - row * 10 + col;

            return (
              <div key={cellNumber} className="cell">
                <span className="cell-number">
                  {cellNumber}
                </span>

                {snakes[cellNumber] && (
                  <span
                    className="img-snake"
                    aria-label="Snake"
                  >
                    s-{snakes[cellNumber]}
                  </span>
                )}

                {ladders[cellNumber] && (
                  <span
                    className="img-ladder"
                    aria-label="Ladder"
                  >
                    l-{ladders[cellNumber]}
                  </span>
                )}

                <div className="players">
                  {p1Position === cellNumber && (
                    <span
                      className="player p1 active"
                      aria-label="Player 1"
                    >
                      P1
                    </span>
                  )}

                  {p2Position === cellNumber && (
                    <span
                      className="player p2 active2"
                      aria-label="Player 2"
                    >
                      P2
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="button-container">
          <button
            className="roll-button"
            onClick={rollDice}
            disabled={winner !== null}
          >
            {winner ? "Roll Dice (0)" : "🎲 Roll Dice"}
          </button>

          <button
            className="reset-button"
            onClick={resetGame}
          >
            Reset
          </button>
        </div>

        <p className="dice-info">
          Dice: {diceValue}
        </p>

        <p className="rules">
          Exact 100 is required to win. Land on a ladder to climb
          up, a snake to slide down.
        </p>
      </div>
    </div>
  );
}

export default App;
