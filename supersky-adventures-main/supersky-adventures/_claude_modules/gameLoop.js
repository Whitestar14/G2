/** @format */

// gameLoop.js
import { getCanvasContext, clearCanvas } from "./gameCanvas.js";
import Player from "./player.js";
import { createObstacles, updateObstacles } from "./obstacles.js";
import { updateScore, displayScore, displayHighScore } from "./score.js";
import { showGameOverModal } from "./gameOver.js";
import { checkCollisions } from "./collisions.js";
import { createPauseButton, createRestartButton, shouldPause } from "./createButton.js";

export function startGameLoop(canvas) {
  const ctx = getCanvasContext(canvas);
  const player = new Player(50, canvas.height - 50, 30, 30, 5, 150, 2, canvas);
  let obstacles = [];

  createPauseButton(gameLoop);
  createRestartButton(canvas);

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
      showGameOverModal();
      return;
    }

    requestAnimationFrame(gameLoop);
  }

  gameLoop();

  return player;
}
