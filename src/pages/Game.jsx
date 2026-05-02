import { useEffect, useState } from "react";

export default function Game() {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameStarted, setGameStarted] = useState(false);
  const [orbPosition, setOrbPosition] = useState({ top: 50, left: 50 });

  const moveOrb = () => {
    const top = Math.floor(Math.random() * 75) + 5;
    const left = Math.floor(Math.random() * 75) + 5;
    setOrbPosition({ top, left });
  };

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setGameStarted(true);
    moveOrb();
  };

  const handleOrbClick = () => {
    if (!gameStarted || timeLeft === 0) return;

    setScore((prevScore) => prevScore + 1);
    moveOrb();
  };

  useEffect(() => {
    if (!gameStarted || timeLeft === 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          setGameStarted(false);
          return 0;
        }

        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameStarted, timeLeft]);

  return (
    <main className="page game-page">
      <section className="section-heading">
        <p className="eyebrow">Mini Game</p>
        <h1>Catch the Purple Orb</h1>
        <p>
          A small interactive game built with React state, events, and timed
          logic. Click the purple orb as many times as possible before the timer
          ends.
        </p>
      </section>

      <section className="game-card">
        <div className="game-stats">
          <div>
            <span>Score</span>
            <strong>{score}</strong>
          </div>

          <div>
            <span>Time</span>
            <strong>{timeLeft}s</strong>
          </div>
        </div>

        <div className="game-area">
          {gameStarted && timeLeft > 0 && (
            <button
              className="orb"
              style={{
                top: `${orbPosition.top}%`,
                left: `${orbPosition.left}%`,
              }}
              onClick={handleOrbClick}
              aria-label="Purple orb"
            />
          )}

          {!gameStarted && timeLeft === 30 && (
            <div className="game-message">
              <h2>Ready?</h2>
              <p>Click start and catch the orb.</p>
            </div>
          )}

          {!gameStarted && timeLeft === 0 && (
            <div className="game-message">
              <h2>Game Over</h2>
              <p>Your final score is {score}.</p>
            </div>
          )}
        </div>

        <button className="primary-btn game-btn" onClick={startGame}>
          {timeLeft === 0 ? "Play Again" : "Start Game"}
        </button>
      </section>
    </main>
  );
}