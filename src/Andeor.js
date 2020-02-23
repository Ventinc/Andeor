import datasSchema from './schemas/datas';

class Andeor {
  constructor(datas = []) {
    this.datas = datas;
    this.requestId = null;
    this.state = 'default';

    datasSchema.validateSync(datas);
  }

  run() {
    const time = getTime();
    this.state = 'running';
  }

  stop() {
    this.state = 'stop';
  }
}

export default Andeor;