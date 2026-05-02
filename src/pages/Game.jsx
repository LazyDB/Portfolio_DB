import { useCallback, useEffect, useRef, useState } from "react";
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
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loadingLeaderboard, setLoadingLeaderboard] = useState(false);
  const [error, setError] = useState("");
  const [orbPosition, setOrbPosition] = useState({ top: 50, left: 50 });

  const audioContextRef = useRef(null);
  const savingScoreRef = useRef(false);

  const playTingSound = () => {
    const AudioContext = window.AudioContext || window.webkitAudioContext;

    if (!AudioContext) return;

    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
    }

    const audioContext = audioContextRef.current;
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(900, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(
      1400,
      audioContext.currentTime + 0.08
    );

    gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.001,
      audioContext.currentTime + 0.18
    );

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.18);
  };

  const moveOrb = () => {
    const top = Math.floor(Math.random() * 75) + 8;
    const left = Math.floor(Math.random() * 75) + 8;

    setOrbPosition({ top, left });
  };

  const fetchLeaderboard = useCallback(async () => {
    setLoadingLeaderboard(true);
    setError("");

    try {
      const leaderboardQuery = query(
        collection(db, "gameScores"),
        orderBy("score", "desc"),
        limit(10)
      );

      const snapshot = await getDocs(leaderboardQuery);

      const topScores = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setLeaderboard(topScores);
    } catch (err) {
      console.error(err);
      setError("Could not load leaderboard.");
    } finally {
      setLoadingLeaderboard(false);
    }
  }, []);

  const handleViewLeaderboard = async () => {
    const nextState = !showLeaderboard;
    setShowLeaderboard(nextState);

    if (nextState) {
      await fetchLeaderboard();
    }
  };

  const saveScore = useCallback(async () => {
    if (scoreSaved || savingScoreRef.current) return;

    savingScoreRef.current = true;

    try {
      await addDoc(collection(db, "gameScores"), {
        name: playerName.trim().slice(0, 20),
        score,
        createdAt: serverTimestamp(),
      });

      setScoreSaved(true);
      setShowLeaderboard(true);
      await fetchLeaderboard();
    } catch (err) {
      console.error(err);
      setError("Could not save your score.");
    }
  }, [playerName, score, scoreSaved, fetchLeaderboard]);

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
    setShowLeaderboard(false);
    savingScoreRef.current = false;
    setGameStarted(true);
    moveOrb();
  };

  const handleOrbClick = () => {
    if (!gameStarted || timeLeft === 0) return;

    playTingSound();
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
  }, [gameFinished, scoreSaved, saveScore]);

  return (
    <main className="page game-page">
      <section className="section-heading">
        <p className="eyebrow">Mini Game</p>
        <h1>Catch the Purple Orb</h1>
        <p>
          Enter your name, catch the orb, and check the top 10 scores on the
          leaderboard.
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

        <div className={gameStarted ? "game-area game-active" : "game-area"}>
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
          <div className="game-actions">
            <button className="primary-btn game-btn" onClick={startGame}>
              {gameFinished ? "Play Again" : "Start Game"}
            </button>

            <button
              className="ghost-btn leaderboard-btn"
              onClick={handleViewLeaderboard}
            >
              {showLeaderboard ? "Hide Leaderboard" : "View Leaderboard"}
            </button>
          </div>
        )}

        {error && <p className="game-error">{error}</p>}

        {showLeaderboard && (
          <section className="leaderboard">
            <h2>Top 10 Leaderboard</h2>

            {loadingLeaderboard ? (
              <p>Loading leaderboard...</p>
            ) : leaderboard.length === 0 ? (
              <p>No scores yet.</p>
            ) : (
              <div className="leaderboard-list">
                {leaderboard.slice(0, 10).map((item, index) => (
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