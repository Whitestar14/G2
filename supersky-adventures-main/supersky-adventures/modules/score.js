/** @format */

// score.js
export let playerScore = 0;
let highScore = localStorage.getItem("highScore") || 0;
let lastScoreUpdate = 0;
let scoreUpdateInterval = 30; // Score update interval in milliseconds
let scoringMultiplier = 1; // Initial scoring multiplier

export function updateScore() {
  // Increment score tick
  lastScoreUpdate++;

  // Increase score if score tick interval reached
  if (lastScoreUpdate >= scoreUpdateInterval) {
    setTimeout(() => {
      playerScore += scoreFactor(scoringMultiplier);
    }, 1000)
    lastScoreUpdate = 0; // Reset score tick

    // Increase scoring multiplier over time
    scoringMultiplier += 0.01;
  }

  function scoreFactor(multiplier) {
    return Math.ceil(Math.random() * 5 * multiplier) + 1;
  }

  return playerScore;
}

export function resetScore() {
  playerScore = 0;
  // Reset any other score-related variables
}

export function displayScore(ctx) {
  // Render score on canvas
  ctx.font = "20px Enriqueta";
  ctx.fillStyle = "black";
  ctx.fillText(`Score: ${playerScore}`, 10, 30);
}

export function displayHighScore(ctx) {
  // Render high score on canvas
  ctx.font = "20px Enriqueta";
  ctx.fillStyle = "black";
  ctx.fillText(`High Score: ${highScore}`, 10, 60);
}

export function updateHighScore() {
  // Update high score if the current score is higher
  if (playerScore > highScore) {
    highScore = playerScore;
    localStorage.setItem("highScore", highScore);
  }
}
