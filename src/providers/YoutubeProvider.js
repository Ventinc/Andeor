import DefaultProvider from './DefaultProvider';

class YoutubeProvider extends DefaultProvider {
  constructor(player) {
    super();
    this.player = player;
  }

  preload() {
    this.player.addEventListener('onStateChange', (event) => {
      if (event.data == 1) {
        this.andeor.run();
      } else {
        this.andeor.stop();
      }
    });
  }

  getTime() {
    return this.player.getCurrentTime()
  }
}

export default YoutubeProvider;