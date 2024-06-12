// Audio.js

export default class AudioManager {
  constructor() {
    this.backgroundMusic = new Audio("./assets/game_music.mp3");
    this.jumpSFX = new Audio("./assets/jumpSFX.mp3");
  }

  setVolume(volume, type = "background") {
    if (type === "background") {
      this.backgroundMusic.volume = volume;
    } else if (type === "sfx") {
      this.jumpSFX.volume = volume;
    }
  }

  play(type = "background") {
    if (type === "background") {
      this.backgroundMusic.loop = true;
      this.backgroundMusic.play();
    } else if (type === "sfx") {
      this.jumpSFX.currentTime = 0;
      this.jumpSFX.play();
    }

  }

  pause(type = "background") {
    if (type === "background") {
      this.backgroundMusic.pause();
    } else if (type === "sfx") {
      this.jumpSFX.pause();
    }
  }
}
