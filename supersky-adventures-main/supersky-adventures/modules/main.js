/**
 * Initializes the game by creating a canvas, a game over modal, starting the game loop, handling input, and creating a container for utility buttons.
 */
/** @format */

// main.js
import { createCanvas } from "./gameCanvas.js";
import { startGameLoop } from "./gameLoop.js";
import createGameOverModal from "./gameOver.js";
import { handleInput } from "./input.js";
import { createStartInterface } from "./ui.js";
import { createContainer as createUtilsContainer } from "./utils.js";

export function init() {
  
  const canvas = createCanvas(800, 400);
  createGameOverModal();

  const player = startGameLoop(canvas);
  handleInput(player);


  createUtilsContainer("button", restartButton, pauseButton);
}

createStartInterface();
