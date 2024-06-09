// Audio.js

export default class Music {
  constructor(backgroundMusicVolume, jumpSFXVolume, currentTime, loop) {
    this.backgroundMusic = new Audio("./assets/game_music.mp3");
    this.jumpSFX = new Audio("./assets/jumpSFX.mp3");
    this.backgroundMusic.loop = loop;
    this.jumpSFX.currentTime = currentTime;
    this.backgroundMusic.volume = backgroundMusicVolume;
    this.jumpSFX.volume = jumpSFXVolume;
  }

  playBackgr() {
    this.backgroundMusic.play();
    this.backgroundMusic.loop = true;
  }

  pauseBackgr() {
    this.backgroundMusic.pause();
    this.backgroundMusic.loop = false;
  }

  playSFX() {
    this.jumpSFX.play();
    this.jumpSFX.currentTime = 0;
  }

  pauseSFX() {
    this.jumpSFX.pause();
    this.jumpSFX.currentTime = 0;
  }

  playAudio() {
    this.playBackgr();
  }

  pauseAudio() {
    this.pauseBackgr();
    this.pauseSFX();
  }
}
