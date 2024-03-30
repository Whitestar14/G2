/** @format */
import { displayVersionNumber } from "./version.js";
import { init } from "./main.js";

let restartButton;

export function createRestartButton() {
  restartButton = document.createElement("button");
  restartButton.textContent = "Restart";
  restartButton.addEventListener("click", restartGame);
  document.body.appendChild(restartButton);
}

function restartGame() {
  // Remove the restart button
  restartButton.remove();

  // Restart the game loop
  location.reload();
}

let isPaused = false;
let pauseButton;
let gameLoopFunction;

export function createPauseButton(gameLoop) {
  pauseButton = document.createElement("button");
  pauseButton.textContent = "Pause";
  pauseButton.addEventListener("click", togglePause);
  document.body.appendChild(pauseButton);

  gameLoopFunction = gameLoop;
}

function togglePause() {
  isPaused = !isPaused;
  if (isPaused) {
    pauseButton.textContent = "Resume";
  } else {
    pauseButton.textContent = "Pause";
    gameLoopFunction();
  }
}

export function shouldPause() {
  return isPaused;
}

export function createButtonContainer() {
  const buttonContainer = document.createElement("div");
  buttonContainer.className = "button-container";
  document.body.appendChild(buttonContainer);

  return buttonContainer;
}

export function createStartButton() {
  const startButton = document.createElement("button");
  startButton.textContent = "Start";
  startButton.id = "start-button";
  startButton.addEventListener("click", startGame);
  document.body.appendChild(startButton);
  displayVersionNumber();

  function startGame() {
    init();
    startButton.remove();
  }
}
