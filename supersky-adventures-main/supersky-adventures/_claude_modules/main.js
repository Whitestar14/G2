/** @format */

// main.js
import { startGameLoop } from "./gameLoop.js";
import { createGameOverModal } from "./gameOver.js";
import { handleInput } from "./input.js";
import { createRestartButton } from "./createButton.js";
import { createStartButton } from "./createButton.js";
import { createCanvas } from "./gameCanvas.js";

export function init() {
  const canvas = createCanvas(800, 400);
  createGameOverModal();
  const player = startGameLoop(canvas);
  handleInput(player);

  createRestartButton();
}

createStartButton();




