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
      this.jumps = 0; // Reset jumps when player lands
    }
  }

  render(ctx) {
    // Render player on canvas
    ctx.fillStyle = "blue";
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
