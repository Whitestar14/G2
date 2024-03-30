/** @format */

// Function to initialize the game
function initializeGame() {
  // Set up canvas context
  const canvas = document.createElement("canvas");
  canvas.id = "gameCanvas";
  canvas.width = 800;
  canvas.height = 400;
  document.body.appendChild(canvas);

  // Create game over modal
  const modalBackdrop = document.createElement("div");
  modalBackdrop.classList.add("backdrop");
  modalBackdrop.id = "gameOverModal";
  modalBackdrop.style.display = "none";
  document.body.appendChild(modalBackdrop);

  const modal = document.createElement("div");
  modal.classList.add("modal");
  modalBackdrop.appendChild(modal);

  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");
  modal.appendChild(modalContent);

  const closeBtn = document.createElement("span");
  closeBtn.classList.add("close");
  closeBtn.innerHTML = "&times;";
  modalContent.appendChild(closeBtn);

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

  // Set up canvas context
  const ctx = canvas.getContext("2d");

  playAudio();
  // Player
  const player = {
    x: 50,
    y: canvas.height - 50,
    width: 30,
    height: 30,
    speed: 5,
    jumping: false,
    jumpHeight: 150,
    jumpVelocity: 10,
    maxJumps: 2, // Maximum consecutive jumps
    jumps: 0, // Current consecutive jumps
  };

  // Obstacles
  let obstacles = [];

  // Player score
  let playerScore = 0;
  let scoreTick = 0;
  let scoreTickInterval = 20; // Initial score tick interval

  // Initialize high score from local storage or default to 0
  let highScore = localStorage.getItem("highScore") || 0;

  // Display high score
  function displayHighScore() {
    ctx.font = `20px Enriqueta`;
    ctx.fillStyle = "black";
    ctx.fillText("High Score: " + highScore, 10, 30);
  }

  // Display score
  function displayScore() {
    ctx.font = `20px Enriqueta`;
    ctx.fillStyle = "black";
    ctx.fillText("Score: " + playerScore, 10, 60);
  }

  // Update high score
  function updateHighScore() {
    if (playerScore > highScore) {
      highScore = playerScore;
      localStorage.setItem("highScore", highScore);
    }
  }

  // Update score
  function updateScore() {
    // Increment score tick
    scoreTick++;
    // Increase score if score tick interval reached
    if (scoreTick >= scoreTickInterval) {
      playerScore++;
      scoreTick = 0; // Reset score tick
    }
  }

  // Check for collisions
  function checkCollisions() {
    for (let obstacle of obstacles) {
      if (
        player.x < obstacle.x + obstacle.width &&
        player.x + player.width > obstacle.x &&
        player.y < obstacle.y + obstacle.height &&
        player.y + player.height > obstacle.y
      ) {
        // Show game over modal
        gameOver();
        return true; // Collision detected
      }
    }
    return false; // No collision detected
  }

  // Game over function
  function gameOver() {
    // Display game over modal
    modalBackdrop.style.display = "block";
    pauseAudio();
    // Display final score
    const finalScore = document.getElementById("finalScore");
    finalScore.textContent = playerScore;

    // Stop the game loop
    cancelAnimationFrame(gameLoop);
  }

  // Create obstacles
  function createObstacle() {
    // Adjust the probability of obstacle creation
    if (Math.random() < 0.02) {
      // Decreased from 0.02 to 0.01
      const obstacle = {
        x: canvas.width,
        y: canvas.height - 20 - player.height, // Adjust y position to account for player height
        width: 50,
        height: 50,
        speed: 5,
      };
      obstacles.push(obstacle);
    }
  }

  // Update player position
  function updatePlayer() {
    if (player.jumping) {
      player.y -= player.jumpVelocity;
      player.jumpVelocity -= 0.5; // Decrease jump velocity gradually
      if (player.jumpVelocity <= 0) {
        player.jumping = false;
      }
    } else if (player.y < canvas.height - player.height) {
      player.y += player.jumpVelocity;
      player.jumpVelocity += 0.5; // Accelerate downwards gradually
    } else {
      player.jumps = 0; // Reset jumps when player lands
    }
  }

  // Render player
  function renderPlayer() {
    ctx.fillStyle = "blue";
    ctx.fillRect(player.x, player.y, player.width, player.height);
  }

  // Update obstacles position
  function updateObstacles() {
    if (Math.random() <= 0.5) {
      createObstacle();
    }

    for (let i = 0; i < obstacles.length; i++) {
      obstacles[i].x -= obstacles[i].speed;

      // Remove obstacles that go offscreen
      if (obstacles[i].x + obstacles[i].width < 0) {
        obstacles.splice(i, 1);
      }
    }
  }

  // Restart button functionality
  function restartGame() {
    // Reload the page to restart the game
    location.reload();
  }

  // Restart button event listener
  restartBtn.addEventListener("click", restartGame);

  // Add close button functionality
  closeBtn.addEventListener("click", function () {
    modalBackdrop.style.display = "none"; // Hide the modal
  });

  // Render obstacles
  function renderObstacles() {
    ctx.fillStyle = "red";
    for (let obstacle of obstacles) {
      ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    }
  }

  // Keyboard controls
  document.addEventListener("keydown", function (event) {
    if (event.code === "Space" && player.jumps < player.maxJumps) {
      player.jumping = true;
      player.jumpVelocity = player.jumpHeight / 10;
      player.jumps++;
    }
  });

  // Game loop
  function gameLoop() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update
    updatePlayer();
    updateObstacles();
    updateHighScore(); // Update high score
    updateScore(); // Update score

    // Increase game speed and scoring system over time
    const minutesElapsed = Math.floor(playerScore / 60); // Calculate minutes elapsed
    player.speed += minutesElapsed * 1; // Increase game speed proportionally to minutes elapsed
    obstacles.forEach((obstacle) => {
      obstacle.speed += minutesElapsed * 0.001; // Increase obstacle speed proportionally to minutes elapsed
    });
    scoreTickInterval = Math.max(5, scoreTickInterval - minutesElapsed * 0.1); // Decrease score tick interval proportionally to minutes elapsed

    // Render
    renderPlayer();
    renderObstacles();
    displayHighScore(); // Display high score
    displayScore(); // Display score

    // Check for collisions
    if (checkCollisions()) {
      console.log("Collision detected!");
      gameOver(); // End game if collision detected
      return;
    }

    requestAnimationFrame(gameLoop);
  }

  // Start the game loop
  gameLoop();
}



// Define the version number and its properties
const versionInfo = {
  number: "1.5.0 (Final Release)",
  position: {
    bottom: "10px",
    right: "10px",
  },
  color: "#666", // Adjust color as needed
};

// Create an element to display the version number
const versionElement = document.createElement("p");
versionElement.textContent = "Version: " + versionInfo.number;
versionElement.style.position = "absolute";
versionElement.style.bottom = versionInfo.position.bottom;
versionElement.style.right = versionInfo.position.right;
versionElement.style.color = versionInfo.color;

// Append the version element to the body
document.body.appendChild(versionElement);

// Create the play button
const playButton = document.createElement("button");
playButton.textContent = "Play";
playButton.id = "playButton"; // Optionally, set an id for styling or event handling
document.body.appendChild(playButton);

// Add an event listener to start the game when the button is clicked
playButton.addEventListener("click", function () {
  // Remove the play button
  playButton.remove();

  // Initialize the game
  initializeGame();
});

// Set up audio
const audio = new Audio("./assets/game_music.mp3");
audio.loop = true; // Enable loop for continuous playback
audio.volume = 0.5; // Adjust volume as needed

// Function to play audio
function playAudio() {
  audio.play();
}

// Function to pause audio
function pauseAudio() {
  audio.pause();
}
