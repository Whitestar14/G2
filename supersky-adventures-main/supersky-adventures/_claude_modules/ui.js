/** @format */
import { restartGame } from "./gameOver.js";
import { init } from "./main.js";

// Modal Start/Initialisation interface
export function createStartInterface() {
  // Create the welcoming start game button
  const startButton = document.createElement("button");
  startButton.textContent = "Start";
  startButton.id = "start-button";
  startButton.addEventListener("click", startGame);
  document.body.appendChild(startButton);

  // Create the event callback for clicking the start button
  function startGame() {
    init();
    // Move playAudio into the module defining init();
    startButton.remove();
  }

  // Display the current version's number.
  displayVersionNumber();
}

// Create main display pause button
export let pauseButton;
let isPaused = false;
let gameLoopFunction;

export function createPauseButton(gameLoop) {
  pauseButton = document.createElement("button");
  pauseButton.textContent = "Pause";
  pauseButton.className = "pauseBtn";
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

// Create main display restart button
export let restartButton;

export function createRestartButton(canvas) {
  restartButton = document.createElement("button");
  restartButton.textContent = "Restart";
  restartButton.className = "restartBtn";
  restartButton.onclick = () => restartGame(canvas, restartButton);
  document.body.appendChild(restartButton);
}

// Version Information display
const versionInfo = {
  number: "2.0.0",
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
  container.className = `${value}-container`;
  document.body.appendChild(container);

  nodes.forEach((node) => {
    container.appendChild(node);
  });

  return container;
}

// I know, I know, the Audio objects should have a dedicated module to containerize them
// TODO: Modularise Audio.js

// export function createAudio() {
//   const backgroundMusic = new Audio("./assets/game_music.mp3");
//   const jumpSFX = new Audio("./assets/jumpSFX.mp3");
//   backgroundMusic.volume = 0.5; // Set background music volume to 50%
//   jumpSFX.volume = 0.8; // Set jump sound effect volume to 80%

//   function playBackgr() {
//     backgroundMusic.play();
//     backgroundMusic.loop = true;
//   }

//   function pauseBackgr() {
//     backgroundMusic.pause();
//     backgroundMusic.loop = false;
//   }

//   function playSFX() {
//     jumpSFX.play();
//     jumpSFX.currentTime = 0;
//   }

//   function pauseSFX() {
//     jumpSFX.pause();
//     jumpSFX.currentTime = 0;
//   }

//   function playAudio() {
//     playBackgr();
//   }

//   function pauseAudio() {
//     pauseBackgr();
//     pauseSFX();
//   }
// }


