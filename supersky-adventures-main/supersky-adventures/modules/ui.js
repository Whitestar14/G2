/**
 * Creates the start interface for the game, including a "Start" button and the current version number display.
 *
 * The `createStartInterface` function sets up the initial UI elements for the game, including a "Start" button that, when clicked, calls the `init` function to start the game. It also displays the current version number of the game.
 *
 * @function createStartInterface
 * @returns {void}
 */

/**
 * Creates a pause button that allows the user to pause and resume the game.
 *
 * The `createPauseButton` function creates a "Pause" button that, when clicked, toggles the pause state of the game. When the game is paused, the audio is also paused, and when the game is resumed, the audio is played again.
 *
 * @function createPauseButton
 * @param {function} gameLoop - The game loop function that should be called when the game is resumed.
 * @returns {void}
 */

/**
 * Creates a restart button that allows the user to restart the game.
 *
 * The `createRestartButton` function creates a "Restart" button that, when clicked, calls the `restartGame` function to reset the game state and start a new game.
 *
 * @function createRestartButton
 * @param {HTMLCanvasElement} canvas - The canvas element used for the game.
 * @returns {void}
 */

/**
 * Toggles the pause state of the game.
 *
 * The `togglePause` function is called when the pause button is clicked. It toggles the `isPaused` flag, updates the button text, and either pauses or resumes the audio and game loop accordingly.
 *
 * @function togglePause
 * @returns {void}
 */

/**
 * Checks if the game is currently paused.
 *
 * The `shouldPause` function returns the current value of the `isPaused` flag, indicating whether the game is currently paused or not.
 *
 * @function shouldPause
 * @returns {boolean} - `true` if the game is paused, `false` otherwise.
 */

/**
 * Displays the current version number of the game.
 *
 * The `displayVersionNumber` function creates a new paragraph element with the current version number and type, and appends it to the document body.
 *
 * @function displayVersionNumber
 * @returns {void}
 */
// ui.js
import { audio } from "./gameLoop.js";
import { restartGame } from "./gameOver.js";
import { init } from "./main.js";
import { createElement } from "./utils.js";

export function createStartInterface() {
  // Create the welcoming start game button
  const startButton = document.createElement("button");
  startButton.textContent = "Start";
  startButton.id = "start-button";
  startButton.addEventListener("click", startGame);
  document.body.appendChild(startButton);

  // Create the callback for clicking the start button
  function startGame() {
    init();
    startButton.remove();
  }

  // Display the current version's number.
  displayVersionNumber();
}

let isPaused = false;
let gameLoopFunction;

export function createPauseButton(gameLoop) {
  gameLoopFunction = gameLoop; // Set the game loop function

  let pauseButton = document.getElementById("pauseButton");
  if (!pauseButton) {
    pauseButton = createElement(
      "button",
      ["pauseBtn"],
      { id: "pauseButton" },
      ["Pause"],
      { click: togglePause }
    );
    document.body.appendChild(pauseButton);
  }
}

export function createRestartButton(canvas) {
  let restartButton = document.getElementById("restartButton");
  if (!restartButton) {
    restartButton = createElement(
      "button",
      ["restartBtn"],
      { id: "restartButton" },
      ["Restart"],
      {
        click: () => {
          restartGame();
          document.getElementById("restartButton").blur(); // Remove focus from the button
        },
      }
    );
    document.body.appendChild(restartButton);
  }
}

function togglePause() {
  isPaused = !isPaused;
  const pauseButton = document.getElementById("pauseButton");

  if (isPaused) {
    pauseButton.textContent = "Resume";
    audio.pause("background");
  } else {
    pauseButton.textContent = "Pause";
    audio.play("background");
    requestAnimationFrame(gameLoopFunction); // Call the game loop function with requestAnimationFrame
    pauseButton.blur(); // Remove focus from the button
  }
}

export function shouldPause() {
  return isPaused;
}

// Version Information display

export function displayVersionNumber() {
  const versionInfo = {
    number: "2.1.4",
    type: "Beta 2+",
  };

  const versionElement = createElement("p", ["version-element"], {}, [
    `Version: `,
    createElement("span", [], {}, [`${versionInfo.number} `]),
    createElement("span", [], {}, [`(${versionInfo.type})`]),
    ` Release`,
  ]);

  document.body.appendChild(versionElement);
}
