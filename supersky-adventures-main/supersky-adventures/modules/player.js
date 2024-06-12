/**
 * Represents a player in the game.
 *
 * @class Player
 * @param {number} x - The initial x-coordinate of the player.
 * @param {number} y - The initial y-coordinate of the player.
 * @param {number} width - The width of the player.
 * @param {number} height - The height of the player.
 * @param {number} speed - The speed of the player.
 * @param {number} jumpHeight - The height of the player's jump.
 * @param {number} maxJumps - The maximum number of jumps the player can perform.
 * @param {HTMLCanvasElement} canvas - The canvas element on which the player is rendered.
 */
/** @format */

// player.js

export default class Player {
  constructor(x, y, width, height, speed, jumpHeight, maxJumps, canvas) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.jumpHeight = jumpHeight;
    this.maxJumps = maxJumps;
    this.jumping = false;
    this.jumpVelocity = 0;
    this.jumps = 0;
    this.canvas = canvas;
  }

  update() {
    // Update player position and jumping logic
    if (this.jumping) {
      this.y -= this.jumpVelocity;
      this.jumpVelocity -= 0.5; // Decrease jump velocity gradually
      if (this.jumpVelocity <= 0) {
        this.jumping = false;
      }
    } else if (this.y < this.canvas.height - this.height) {
      this.y += this.jumpVelocity;
      this.jumpVelocity += 0.5; // Accelerate downwards gradually
    } else {
      this.jumps = 0;
      this.jumpVelocity = 0; // Reset jump velocity when landed
    }

    // Clamp player position within game boundaries
    this.x = Math.max(0, Math.min(this.x, this.canvas.width - this.width));
    this.y = Math.max(0, Math.min(this.y, this.canvas.height - this.height));
  }

  render(ctx) {
    // Render player on canvas
    ctx.fillStyle = "orange";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  jump() {
    // Handle jump logic
    if (!this.jumping && this.jumps < this.maxJumps) {
      this.jumping = true;
      this.jumpVelocity = this.jumpHeight / 10;
      this.jumps++;
    }
  }
}
