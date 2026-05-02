import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";

export default function Game() {
  const [playerName, setPlayerName] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [scoreSaved, setScoreSaved] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loadingLeaderboard, setLoadingLeaderboard] = useState(false);
  const [error, setError] = useState("");
  const [orbPosition, setOrbPosition] = useState({ top: 50, left: 50 });

  const moveOrb = () => {
    const top = Math.floor(Math.random() * 75) + 8;
    const left = Math.floor(Math.random() * 75) + 8;
    setOrbPosition({ top, left });
  };

  const fetchLeaderboard = async () => {
    setLoadingLeaderboard(true);

    try {
      const leaderboardQuery = query(
        collection(db, "gameScores"),
        orderBy("score", "desc"),
        limit(10)
      );

      const snapshot = await getDocs(leaderboardQuery);

      const scores = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setLeaderboard(scores);
    } catch (err) {
      console.error(err);
      setError("Could not load leaderboard.");
    } finally {
      setLoadingLeaderboard(false);
    }
  };

  const saveScore = async () => {
    if (scoreSaved) return;

    try {
      await addDoc(collection(db, "gameScores"), {
        name: playerName.trim().slice(0, 20),
        score,
        createdAt: serverTimestamp(),
      });

      setScoreSaved(true);
      fetchLeaderboard();
    } catch (err) {
      console.error(err);
      setError("Could not save your score.");
    }
  };

  const startGame = () => {
    const cleanName = playerName.trim();

    if (!cleanName) {
      setError("Please enter your name before starting.");
      return;
    }

    setError("");
    setScore(0);
    setTimeLeft(30);
    setGameFinished(false);
    setScoreSaved(false);
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
          setGameFinished(true);
          return 0;
        }

        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameStarted, timeLeft]);

  useEffect(() => {
    if (gameFinished && !scoreSaved) {
      saveScore();
    }
  }, [gameFinished, scoreSaved]);

  return (
    <main className="page game-page">
      <section className="section-heading">
        <p className="eyebrow">Mini Game</p>
        <h1>Catch the Purple Orb</h1>
        <p>
          Enter your name, catch the orb, and see your score on the leaderboard.
        </p>
      </section>

      <section className="game-card">
        {!gameStarted && !gameFinished && (
          <div className="player-box">
            <label htmlFor="playerName">Player Name</label>
            <input
              id="playerName"
              type="text"
              value={playerName}
              maxLength="20"
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Enter your name"
            />
          </div>
        )}

        <div className="game-stats">
          <div>
            <span>Player</span>
            <strong>{playerName || "Guest"}</strong>
          </div>

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

          {!gameStarted && !gameFinished && (
            <div className="game-message">
              <h2>Ready?</h2>
              <p>Enter your name and start the game.</p>
            </div>
          )}

          {gameFinished && (
            <div className="game-message">
              <h2>Game Over</h2>
              <p>
                {playerName}, your final score is <strong>{score}</strong>.
              </p>
            </div>
          )}
        </div>

        {!gameStarted && (
          <button className="primary-btn game-btn" onClick={startGame}>
            {gameFinished ? "Play Again" : "Start Game"}
          </button>
        )}

        {error && <p className="game-error">{error}</p>}

        {gameFinished && (
          <section className="leaderboard">
            <h2>Leaderboard</h2>

            {loadingLeaderboard ? (
              <p>Loading leaderboard...</p>
            ) : leaderboard.length === 0 ? (
              <p>No scores yet.</p>
            ) : (
              <div className="leaderboard-list">
                {leaderboard.map((item, index) => (
                  <div className="leaderboard-row" key={item.id}>
                    <span>#{index + 1}</span>
                    <strong>{item.name}</strong>
                    <em>{item.score}</em>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
      </section>
    </main>
  );
}