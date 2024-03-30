/** @format */

// Import necessary functions and modules
import { gameLoop } from "./_node_modules/gameLoop.js";
import {
  initializePlayer,
  updatePlayer,
  renderPlayer,
} from "./_node_modules/player.js";
import { displayHighScore, displayScore } from "./_node_modules/ui.js";
import { displayVersion } from "./_node_modules/version.js";
import { playAudio, pauseAudio } from "./_node_modules/audio.js";
import { handleKeyboardControls } from "./_node_modules/gameControls.js";
import {
  createObstacle,
  updateObstacles,
  renderObstacles,
} from './_node_modules/obstacles.js'
// Define canvas variable
const canvas = document.createElement("canvas");
canvas.width = 800;
canvas.height = 400;
document.body.appendChild(canvas);

// Function to initialize the game
function initializeGame() {
  // Set up canvas context
  const { ctx, modalBackdrop, modal, closeBtn, finalScoreText, restartBtn } =
    createGameElements(canvas);

  // Initialize player
  const player = initializePlayer(canvas);

  // Initialize obstacles array
  let obstacles = [];

  // Play background music
  playAudio();

  // Handle keyboard controls
  handleKeyboardControls(player);

  // Define update function
  function update() {
    updatePlayer(player);
    updateObstacles(obstacles);
  }

  // Define render function
  function render() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Render player
    renderPlayer(ctx, player);

    // Render obstacles
    renderObstacles(ctx, obstacles);

    // Display high score
    const highScore = 100; // Example high score
    displayHighScore(ctx, highScore);

    // Display player score
    const playerScore = 50; // Example player score
    displayScore(ctx, playerScore);

    // Display version number
    displayVersion(ctx, canvas);
  }

  // Start the game loop
  gameLoop(update, render); // Call the game loop function with update and render functions
}

// Function to create game elements
function createGameElements(canvas) {
  const ctx = canvas.getContext("2d");

  // Create game over modal backdrop
  const modalBackdrop = document.createElement("div");
  modalBackdrop.classList.add("backdrop");
  modalBackdrop.id = "gameOverModal";
  modalBackdrop.style.display = "none";
  document.body.appendChild(modalBackdrop);

  // Create game over modal
  const modal = document.createElement("div");
  modal.classList.add("modal");
  modalBackdrop.appendChild(modal);

  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");
  modal.appendChild(modalContent);

  const closeBtn = document.createElement("span");
  closeBtn.classList.add("close");
  closeBtn.innerHTML = "&times;";
  modalContent.appendChild(closeBtn);

  const modalTitle = document.createElement("h2");
  modalTitle.textContent = "Game Over";
  modalContent.appendChild(modalTitle);

  const finalScoreText = document.createElement("p");
  finalScoreText.innerHTML = "Your score: <span id='finalScore'>0</span>";
  modalContent.appendChild(finalScoreText);

  const restartBtn = document.createElement("button");
  restartBtn.id = "restartButton";
  restartBtn.textContent = "Restart Game";
  modalContent.appendChild(restartBtn);

  // Export necessary variables and functions
  return {
    ctx,
    modalBackdrop,
    modal,
    closeBtn,
    finalScoreText,
    restartBtn,
  };
}

// Call the initializeGame function to start the game
initializeGame();

// Export the canvas variable for use in other modules
export { canvas, obstacles };

