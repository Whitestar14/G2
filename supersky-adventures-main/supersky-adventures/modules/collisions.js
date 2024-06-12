/** @format */

// collisions.js
export function checkCollisions(player, obstacles) {
  for (const obstacle of obstacles) {
    if (
      player.x < obstacle.x + obstacle.width &&
      player.x + player.width > obstacle.x &&
      player.y < obstacle.y + obstacle.height &&
      player.y + player.height > obstacle.y
    ) {
      return true; // Collision detected
    }
  }
  return false; // No collision detected
}

