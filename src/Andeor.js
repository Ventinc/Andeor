import datasSchema from './schemas/datas';
import DefaultProvider from './providers/DefaultProvider';
import YoutubeProvider from './providers/YoutubeProvider';
import EventEmitter from 'eventemitter3';
import uuid from 'uuid/v1';

class Andeor {
  static DefaultProvider = DefaultProvider;
  static YoutubeProvider = YoutubeProvider;

  static events = {
    running: 0,
    stopped: 1,
    add: 2,
    remove: 3,
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

  sendDataToDelete(time) {
    const datasToDelete = this.getDatasAlreadySentOutTime(time);

    if (datasToDelete.length > 0) {
      for (const data of datasToDelete) {
        this.eventEmitter.emit(Andeor.events.remove, data);
      }

      const datasToDeleteIds = datasToDelete.map(dataToDelete => dataToDelete.id);

      this.datasAlreadySent = this.datasAlreadySent.filter(dataAlreadySent => !datasToDeleteIds.includes(dataAlreadySent.id));
    }
  }

  sendDataToAdd(time) {
    const datasToAdd = this.getDatasAtTime(time);

    if (datasToAdd.length > 0) {
      for (const data of datasToAdd) {
        this.eventEmitter.emit(Andeor.events.add, data);
      }
      this.datasAlreadySent.push(...datasToAdd);
    }
  }

  run() {
    if (this.state !== 'running') this.eventEmitter.emit(Andeor.events.running);

    this.state = 'running';

    const time = this.provider.getTime();
    this.sendDataToDelete(time);
    this.sendDataToAdd(time);

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