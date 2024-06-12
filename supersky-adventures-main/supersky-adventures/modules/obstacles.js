/** @format */

// obstacles.js
export default class Obstacle {
  constructor(x, y, width, height, speed) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
  }

  update() {
    // Update obstacle position
    this.x -= this.speed;
  }

  render(ctx) {
    // Render obstacle on canvas
    ctx.fillStyle = "gray";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

export function createObstacles(canvas, player, obstacles) {
  // Generate new obstacles based on probability
  if (Math.random() < 0.01) {
    const obstacle = new Obstacle(
      canvas.width,
      canvas.height - 20 - player.height,
      50,
      50,
      5
    );
    obstacles.push(obstacle);
  }
}

export function updateObstacles(canvas, obstacles) {
  // // Update obstacle positions and remove off-screen obstacles

  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].update();

    // Remove obstacles that go offscreen
    if (obstacles[i].x + obstacles[i].width < 0) {
      obstacles.splice(i, 1);
    }
  }
}
