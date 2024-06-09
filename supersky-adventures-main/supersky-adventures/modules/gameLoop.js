// gameLoop.js
import Music from "./audio.js";
import { checkCollisions } from "./collisions.js";
import { clearCanvas, createCanvas, getCanvasContext } from "./gameCanvas.js";
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

export const audio = new Music(0.5, 0.8, 0, true);

const GameState = {
  START: "start",
  PLAYING: "playing",
  PAUSED: "paused",
  GAME_OVER: "game_over",
};

let currentState = GameState.START;
let player,
  obstacles = [];

/**
 * Starts the game loop.
 * @param {HTMLCanvasElement} canvas - The canvas element for the game.
 * @returns {Player} - The player instance.
 *
 */
export function startGameLoop(canvas) {
  const ctx = getCanvasContext(canvas);
  player = new Player(50, canvas.height - 50, 30, 30, 5, 150, 2, canvas);

  createPauseButton(() => gameLoop(ctx, canvas));
  createRestartButton(canvas);

  audio.playAudio();

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

    requestAnimationFrame(() => gameLoop(ctx, canvas));
  }

  currentState = GameState.PLAYING;
  gameLoop(ctx, canvas);

  return player;
}

export function resetGame() {
  const oldCanvas = document.querySelector("canvas");
  if (oldCanvas) {
    oldCanvas.remove();
  }
  const newCanvas = createCanvas(800, 400);
  resetScore();
  obstacles = [];
  currentState = GameState.PLAYING;
  const player = startGameLoop(newCanvas);
  handleInput(player); // Re-bind input to the new player instance
}
