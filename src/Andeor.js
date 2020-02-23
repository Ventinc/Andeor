import datasSchema from './schemas/datas';
import DefaultProvider from './providers/DefaultProvider';
import EventEmitter from 'eventemitter3';

class Andeor {
  static providers = {
    DefaultProvider,
    youtube: 'test',
  }

  static events = {
    running: Symbol('running'),
    stopped: Symbol('running'),
  }

  constructor(datas = []) {
    datasSchema.validateSync(datas);
    
    this.eventEmitter = new EventEmitter();
    this.datas = datas;
    this.requestId = null;
    this.state = 'default';
  }

  run() {
    if (this.state !== 'running') this.eventEmitter.emit(Andeor.events.running);

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
    this.eventEmitter.emit(Andeor.events.stopped);
  }

  on(event, func) {
    this.eventEmitter.on(event, func);
  }
}

export default Andeor;