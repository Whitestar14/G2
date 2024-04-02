/** @format */

// gameLoop.js
import Music from "./audio.js";
import { checkCollisions } from "./collisions.js";
import { clearCanvas, getCanvasContext } from "./gameCanvas.js";
import { showGameOverModal } from "./gameOver.js";
import { createObstacles, updateObstacles } from "./obstacles.js";
import Player from "./player.js";
import { displayHighScore, displayScore, updateScore } from "./score.js";
import { createPauseButton, createRestartButton, shouldPause } from "./ui.js";

export const audio = new Music(0.5, 0.8, 0, true);

export function startGameLoop(canvas) {
  const ctx = getCanvasContext(canvas);
  const player = new Player(50, canvas.height - 50, 30, 30, 5, 150, 2, canvas);

  let obstacles = [];

  createPauseButton(gameLoop);
  createRestartButton(canvas);

  audio.playAudio();

  function gameLoop() {
    if (shouldPause()) return;

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
      showGameOverModal(audio);
      return;
    }

    requestAnimationFrame(gameLoop);
  }

  gameLoop();

  return player;
}
