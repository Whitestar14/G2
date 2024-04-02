/** @format */

// main.js
import { createCanvas } from "./gameCanvas.js";
import { startGameLoop } from "./gameLoop.js";
import createGameOverModal from "./gameOver.js";
import { handleInput } from "./input.js";
import {
  createContainer,
  createStartInterface,
  pauseButton,
  restartButton,
} from "./ui.js";

export function init() {
  const canvas = createCanvas(800, 400);
  createGameOverModal();

  const player = startGameLoop(canvas);
  handleInput(player);

  createContainer("button", restartButton, pauseButton);
}

createStartInterface();
