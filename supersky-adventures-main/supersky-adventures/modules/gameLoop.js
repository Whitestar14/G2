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
import {
  createFpsDisplay,
  createPauseButton,
  createRestartButton,
  shouldPause,
  updateFpsDisplay,
} from "./ui.js";

// Constants
export const audio = new AudioManager(0.5, 0.8, 0, true);
const GameState = {
  START: "start",
  PLAYING: "playing",
  PAUSED: "paused",
  GAME_OVER: "game_over",
};
const FPS = 60;
const MS_PER_FRAME = 800 / FPS;

// Global Variables
let currentState = GameState.START;
let player,
  obstacles = [];
let canvas, animationFrameId;
let previousTime = 0;
let accumulatedTime = 0;

// Game Loop Function
export function gameLoop(ctx, canvas, currentTime) {
  const deltaTime = currentTime - previousTime;
  previousTime = currentTime;
  accumulatedTime += deltaTime;

  if (shouldPause() || currentState !== GameState.PLAYING) {
    return;
  }

  clearCanvas(ctx, canvas);

  while (accumulatedTime >= MS_PER_FRAME) {
    player.update();
    updateObstacles(canvas, obstacles);
    createObstacles(canvas, player, obstacles);
    updateScore();
    accumulatedTime -= MS_PER_FRAME;
  }

  // Render game objects
  player.render(ctx);
  obstacles.forEach((obstacle) => obstacle.render(ctx));
  displayScore(ctx);
  displayHighScore(ctx);

  // Display FPS
  updateFpsDisplay(currentTime);

  // Check for collisions and game over conditions
  if (checkCollisions(player, obstacles)) {
    currentState = GameState.GAME_OVER;
    showGameOverModal(audio);
    return;
  }

  setTimeout(() => {
    animationFrameId = requestAnimationFrame(gameLoop.bind(null, ctx, canvas));
  }, MS_PER_FRAME);
}

// Start Game Loop
export function startGameLoop(canvasElement) {
  canvas = canvasElement;
  const ctx = getCanvasContext(canvas);
  player = new Player(50, canvas.height - 50, 30, 30, 5, 150, 2, canvas);

  createPauseButton(); // No need to pass gameLoop function
  createRestartButton(canvas);
  createFpsDisplay(); // Create the FPS display
  audio.play("background");

  currentState = GameState.PLAYING;
  previousTime = performance.now(); // Initialize previousTime
  requestAnimationFrame(gameLoop.bind(null, ctx, canvas));

  return player;
}

// Resume Game Loop
export function resumeGameLoop() {
  const ctx = getCanvasContext(canvas);
  previousTime = performance.now(); // Re-initialize previousTime when resuming
  currentState = GameState.PLAYING;
  requestAnimationFrame(gameLoop.bind(null, ctx, canvas));
}

// Pause Game Loop
export function pauseGameLoop() {
  currentState = GameState.PAUSED;
}

// Reset Game
export function resetGame() {
  cancelAnimationFrame(animationFrameId);
  const ctx = getCanvasContext(canvas);
  clearCanvas(ctx, canvas);
  resetScore();
  obstacles = [];
  audio.play("background");
  currentState = GameState.PLAYING;
  frameTimes = []; // Reset frame times
  lastFrameTimeStamp = 0; // Reset last frame timestamp
  startGameLoop(canvas);
  handleInput(player);
}
