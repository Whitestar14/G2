/** @format */

// input.js

import { audio } from "./gameLoop.js";
export function handleInput(player) {
  // Listen for input events and update player state
  document.addEventListener("keydown", (event) => {

    if ((event.code === "Space" || event.code === "ArrowUp") && player.jumps < player.maxJumps) {
      player.jumping = true;
      player.jumpVelocity = player.jumpHeight / 10;
      player.jumps++;
      audio.play("sfx");
    }
  });
}
