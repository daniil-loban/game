class AudioPlayer {
  constructor(fileName, autoplay = true) {
    this.fileName = fileName;
    // this.autoplay = autoplay;
    this.sound = new Audio();
    this.sound.autoplay = autoplay;
    this.volume = 1;
    this.duration = 0;
    this.load();
    this.sound.src = fileName;
  }

  load() {
    this.sound.onloadedmetadata = () => {
      this.cbDuration(this.sound.duration);
    };
  }

  cbDuration(duration) {
    this.duration = duration;
    if (this.autoplay) {
      this.play();
    }
  }

  play() {
    this.sound.play();
  }

  stop() {
    this.sound.pause();
  }
}

export default AudioPlayer;
