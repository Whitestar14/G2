/** @format */

import { playerScore, updateHighScore } from "./score.js";

// gameOver.js
let modalBackdrop, modal, modalContent;

export default function createGameOverModal() {
  // Create game over modal
  modalBackdrop = document.createElement("div");
  modalBackdrop.classList.add("backdrop");
  modalBackdrop.id = "gameOverModal";
  document.body.appendChild(modalBackdrop);

  modal = document.createElement("div");
  modal.classList.add("modal");
  modalBackdrop.appendChild(modal);

  modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");
  modal.appendChild(modalContent);

  const closeBtn = document.createElement("span");
  closeBtn.classList.add("close");
  closeBtn.innerHTML = "&times;";

  const closeBtnContainer = document.createElement("div");
  closeBtnContainer.classList.add("close-button-container");
  closeBtnContainer.appendChild(closeBtn);
  modalContent.appendChild(closeBtnContainer);

  const modalTitle = document.createElement("h2");
  modalTitle.textContent = "Game Over";
  modalContent.appendChild(modalTitle);

  const finalScoreText = document.createElement("p");
  finalScoreText.innerHTML = "Your score: <span id='finalScore'>0</span>";
  modalContent.appendChild(finalScoreText);

  const restartBtn = document.createElement("button");
  restartBtn.id = "restartButton";
  restartBtn.textContent = "Restart Game";
  modalContent.appendChild(restartBtn);

  // Add close button functionality
  closeBtnContainer.addEventListener("click", () => {
    hideGameOverModal();
  });

  // Add restart button functionality
  restartBtn.addEventListener("click", restartGame);

  // cancelAnimationFrame(gameLoop);
}

export function showGameOverModal(music) {
  // Display game over modal
  modalBackdrop.style.display = "block";
  const finalScore = document.getElementById("finalScore");
  finalScore.textContent = playerScore; // Assuming playerScore is defined in another module
  updateHighScore();
  music.pauseAudio();
}

export function hideGameOverModal() {
  // Hide the game over modal
  modalBackdrop.style.display = "none";
}

export function restartGame() {
  // Restart the game
  location.reload();
}
