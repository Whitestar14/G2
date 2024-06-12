/**
 * Starts the game loop and initializes the game state.
 * @param {HTMLCanvasElement} canvasElement - The canvas element for the game.
 * @returns {Player} - The player instance.
 */

// Imports
import AudioManager from "./audio.js";
import { checkCollisions } from "./collisions.js";
import { clearCanvas, getCanvasContext } from "./gameCanvas.js";
import { showGameOverModal } from "./gameOver.js";
import { handleInput } from "./input.js"; // Import handleInput
import { createObstacles, updateObstacles } from "./obstacles.js";
import Player from "./player.js";
import {
  displayHighScore,
  displayScore,
  resetScore,
  updateScore,
} from "./score.js";
import { createPauseButton, createRestartButton, shouldPause } from "./ui.js";

// Constants
export const audio = new AudioManager(0.5, 0.8, 0, true); // Instantiate AudioManager

const GameState = {
  START: "start",
  PLAYING: "playing",
  PAUSED: "paused",
  GAME_OVER: "game_over",
};

// Global Variables
let currentState = GameState.START;
let player,
  obstacles = [];
let canvas, animationFrameId;

// Game Loop Function
function gameLoop(ctx, canvas) {
  if (shouldPause() || currentState !== GameState.PLAYING) return;

  clearCanvas(ctx, canvas);

  player.update();
  player.render(ctx);

  updateObstacles(canvas, obstacles);
  obstacles.forEach((obstacle) => obstacle.render(ctx));

  createObstacles(canvas, player, obstacles);

  updateScore();
  displayScore(ctx);
  displayHighScore(ctx);

  if (checkCollisions(player, obstacles)) {
    currentState = GameState.GAME_OVER;
    showGameOverModal(audio);
    return;
  }

  animationFrameId = requestAnimationFrame(() => gameLoop(ctx, canvas));
}

// Start Game Loop
export function startGameLoop(canvasElement) {
  canvas = canvasElement;
  const ctx = getCanvasContext(canvas);
  player = new Player(50, canvas.height - 50, 30, 30, 5, 150, 2, canvas);

  createPauseButton(() => gameLoop(ctx, canvas));
  createRestartButton(canvas);
  audio.play("background"); // Play background music

  currentState = GameState.PLAYING;
  gameLoop(ctx, canvas);

  return player;
}

// Reset Game
export function resetGame() {
  cancelAnimationFrame(animationFrameId); // Cancel the existing animation frame
  const ctx = getCanvasContext(canvas);
  clearCanvas(ctx, canvas);
  resetScore();
  obstacles = [];
  audio.play("background");
  currentState = GameState.PLAYING;
  const player = startGameLoop(canvas);
  handleInput(player); // Re-bind input to the new player instance
}
