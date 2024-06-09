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
    audio.pauseAudio();
  } else {
    pauseButton.textContent = "Pause";
    audio.playAudio();
    requestAnimationFrame(gameLoopFunction); // Call the game loop function with requestAnimationFrame
    pauseButton.blur(); // Remove focus from the button
  }
}

export function shouldPause() {
  return isPaused;
}

// Version Information display
const versionInfo = {
  number: "2.1.3",
  type: "Stable",
  position: {
    bottom: "10px",
    right: "10px",
  },
  color: "#666",
};

export function displayVersionNumber() {
  const versionElement = document.createElement("p");
  versionElement.textContent = `Version: ${versionInfo.number} (${versionInfo.type} Release)`;
  versionElement.style.position = "absolute";
  versionElement.style.bottom = versionInfo.position.bottom;
  versionElement.style.right = versionInfo.position.right;
  versionElement.style.color = versionInfo.color;

  document.body.appendChild(versionElement);
}

// Create container for the absolutely positioned buttons. Clearly, this
// is the only way out of the positioning dichotomy

export function createContainer(value, ...nodes) {
  const container = document.createElement("div");
  container.className = value + "-container";
  document.body.appendChild(container);

  nodes.forEach((node) => {
    container.appendChild(node);
  });

  return container;
}
