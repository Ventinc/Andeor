import Andeor from "../Andeor";

class DefaultProvider {
  setAndeor(andeor) {
    if (!andeor || !(andeor instanceof Andeor)) {
      throw new Error('Andeor need to be defined');
    }

    this.andeor = andeor;
  }

  preload() {
    console.log('preload() need to be defined');
    return true;
  }

  getTime() {
    console.error('getTime() need to be defined')
    return 0;
  }
}

export default DefaultProvider;