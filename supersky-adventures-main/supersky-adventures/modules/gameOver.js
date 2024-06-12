// gameOver.js
import { resetGame } from "./gameLoop.js";
import { playerScore, updateHighScore } from "./score.js";
import { createElement } from "./utils.js";

let modalBackdrop, modal, modalContent;

export default function createGameOverModal() {
  // Create game over modal
  modalBackdrop = createElement("div", ["backdrop"], { id: "gameOverModal" });
  document.body.appendChild(modalBackdrop);

  modal = createElement("div", ["modal"]);
  modalBackdrop.appendChild(modal);

  modalContent = createElement("div", ["modal-content"]);
  modal.appendChild(modalContent);

  const closeBtn = createElement("span", ["close"], {}, "×");

  const closeBtnContainer = createElement(
    "div",
    ["close-button-container"],
    {},
    [closeBtn]
  );
  modalContent.appendChild(closeBtnContainer);

  const modalTitle = createElement("h2", [], {}, "Game Over");
  modalContent.appendChild(modalTitle);

  const finalScoreText = createElement("p", [], {}, [
    `Your score: `,
    createElement("span", [], { id: "finalScore" }, `${playerScore}`),
  ]);
  modalContent.appendChild(finalScoreText);

  const restartBtn = createElement(
    "button",
    [],
    { id: "restartButtonModal" },
    ["Restart Game"],
    { click: restartGame }
  );
  modalContent.appendChild(restartBtn);

  // Add close button functionality
  closeBtnContainer.onclick = () => {
    hideGameOverModal();
  };

  // Add restart button functionality
  restartBtn.onclick = () => restartGame;
}

export function showGameOverModal(music) {
  // Display game over modal
  modalBackdrop.style.display = "block";
  const finalScore = document.getElementById("finalScore");
  finalScore.textContent = playerScore; // Assuming playerScore is defined in another module
  updateHighScore();
  music.pause("background");
}

export function hideGameOverModal() {
  // Hide the game over modal
  const modalBackdrop = document.getElementById("gameOverModal");
  if (modalBackdrop) {
    modalBackdrop.style.display = "none";
  }
}

export function restartGame() {
  // Restart the game
  hideGameOverModal();
  resetGame();
}
