import React, { useState, useEffect } from 'react';
import './App.css';  // Import CSS for creative color combination

const Game = () => {
  const [playerPosition, setPlayerPosition] = useState(200);
  const [obstaclePosition, setObstaclePosition] = useState(800);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'ArrowUp' && playerPosition > 0) {
        setPlayerPosition(playerPosition - 50);
      } else if (event.key === 'ArrowDown' && playerPosition < 400) {
        setPlayerPosition(playerPosition + 50);
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [playerPosition]);

  useEffect(() => {
    const obstacleMovement = setInterval(() => {
      if (obstaclePosition > 0) {
        setObstaclePosition(obstaclePosition - 10);
      } else {
        setObstaclePosition(800);
        setScore(score + 1);
      }

      // Check for collision
      if (obstaclePosition < 100 && Math.abs(playerPosition - 200) < 50) {
        setIsGameOver(true);
        clearInterval(obstacleMovement);
      }
    }, 100);

    return () => clearInterval(obstacleMovement);
  }, [obstaclePosition, playerPosition, score]);

  if (isGameOver) {
    return (
      <div className="game-over">
        <h1>Game Over</h1>
        <p>Your Score: {score}</p>
        <button onClick={() => window.location.reload()}>Restart</button>
      </div>
    );
  }

  return (
    <div className="game-container">
      <div className="player" style={{ top: `${playerPosition}px` }}></div>
      <div className="obstacle" style={{ left: `${obstaclePosition}px` }}></div>
      <div className="score">Score: {score}</div>
    </div>
  );
};

export default Game;

