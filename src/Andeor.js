import datasSchema from './schemas/datas';
import DefaultProvider from './providers/DefaultProvider';
import EventEmitter from 'eventemitter3';
import uuid from 'uuid/v1';

class Andeor {
  static providers = {
    DefaultProvider,
    youtube: 'test',
  }

  static events = {
    running: Symbol('running'),
    stopped: Symbol('stopped'),
    add: Symbol('add'),
    remove: Symbol('remove'),
  }

  constructor(datas = [], provider = new DefaultProvider()) {
    datasSchema.validateSync(datas);

    if (!(provider instanceof DefaultProvider)) {
      throw new Error('Provider need to be an instance of DefaultProvider');
    }
    
    this.eventEmitter = new EventEmitter();
    this.datas = datas.map(data => ({id: uuid(), ...data}));
    this.requestId = null;
    this.state = 'default';
    this.provider = provider;
    this.datasAlreadySent = [];

    this.provider.setAndeor(this);
    this.provider.preload();
  }

  getDatasAtTime(time) {
    const idAlreadySent = this.datasAlreadySent.map(dataAlreadySent => dataAlreadySent.id)

    const datas = this.datas
      .filter(data => !idAlreadySent.includes(data.id))
      .filter(data => time >= data.timeBegin && time < data.timeEnd);

    return datas;
  }

  getDatasAlreadySentOutTime(time) {
    const datas = this.datasAlreadySent
      .filter(data => !(time >= data.timeBegin && time < data.timeEnd));

    return datas;
  }

  run() {
    if (this.state !== 'running') this.eventEmitter.emit(Andeor.events.running);

    this.state = 'running';

    const time = this.provider.getTime();

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