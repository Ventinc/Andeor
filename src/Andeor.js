import datasSchema from './schemas/datas';
import DefaultProvider from './providers/DefaultProvider';

class Andeor {
  static providers = {
    DefaultProvider,
    youtube: 'test',
  }

  constructor(datas = []) {
    datasSchema.validateSync(datas);
    
    this.datas = datas;
    this.requestId = null;
    this.state = 'default';
  }

  run() {
    this.state = 'running';
    if (this.state === 'running') {
      this.requestId = requestAnimationFrame(() => this.run());
    }
  }

  stop() {
    if (this.requestId) {
      cancelAnimationFrame(this.requestId);
      this.requestId = null;
    }
    this.state = 'stopped';
  }
}

export default Andeor;