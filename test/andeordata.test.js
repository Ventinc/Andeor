describe('Andeor data getter', () => {
  const DefaultProvider = Andeor.DefaultProvider;

  class TestProvider extends DefaultProvider {
    constructor() {
      super();
      this.time = 0;
    }

    preload() {
      return true;
    }
  
    getTime() {
      return this.time;
    }
  }

  // data 0 1 2 3 4 5 6 7 8 9 10
  // 1    =
  // 2    = = = = = = = = = =
  // 3        = = =
  // 4            = = = = =
  // 5      = =

  const datas = [
    { timeBegin: 0, timeEnd: 1, data: 1 },
    { timeBegin: 0, timeEnd: 10, data: 2 },
    { timeBegin: 2, timeEnd: 5, data: 3 },
    { timeBegin: 4, timeEnd: 9, data: 4 },
    { timeBegin: 1, timeEnd: 3, data: 5 },
  ]

  const values = [
    {time: 0, length: 2, datas: [1, 2], toAdd: 2, toRemove: 0},
    {time: 1, length: 2, datas: [2, 5], toAdd: 1, toRemove: 1},
    {time: 2, length: 3, datas: [2, 3, 5], toAdd: 1, toRemove: 0},
    {time: 3, length: 2, datas: [2, 3], toAdd: 0, toRemove: 1},
    {time: 4, length: 3, datas: [2, 3, 4], toAdd: 1, toRemove: 0},
    {time: 5, length: 2, datas: [2, 4], toAdd: 0, toRemove: 1},
    {time: 6, length: 2, datas: [2, 4], toAdd: 0, toRemove: 0},
    {time: 7, length: 2, datas: [2, 4], toAdd: 0, toRemove: 0},
    {time: 8, length: 2, datas: [2, 4], toAdd: 0, toRemove: 0},
    {time: 9, length: 1, datas: [2], toAdd: 0, toRemove: 1},
    {time: 10, length: 0, datas: [], toAdd: 0, toRemove: 1},
  ];

  values.forEach(value => {
    it(`have to return ${value.length} datas (${value.datas.join(', ')})`, () => {
      const andeor = new Andeor(datas, new TestProvider());

      const datasAtTime = andeor.getDatasAtTime(value.time);

      expect(datasAtTime.length).toBe(value.length);
      expect(datasAtTime.filter(d => value.datas.includes(d.data)).length === datasAtTime.length).toBeTrue();
    })

    it (`add event launched are right for time ${value.time}(${value.datas.join(', ')})`, () => {
      const testProvider = new TestProvider();

      const andeor = new Andeor(datas, testProvider);

      const addSpy = jasmine.createSpy('addEvent');

      if (value.time > 0) {
        for (let i = 0; i < value.time; i++) {
          testProvider.time = i;
          andeor.run();
          andeor.stop();
        }
      }
      testProvider.time = value.time;
      andeor.on(Andeor.events.add, addSpy);
      andeor.run();

      expect(addSpy).toHaveBeenCalledTimes(value.toAdd);

      andeor.stop();
    })

    it (`remove event launched are right for time ${value.time}(${value.datas.join(', ')})`, () => {
      const testProvider = new TestProvider();

      const andeor = new Andeor(datas, testProvider);

      const removeSpy = jasmine.createSpy('removeEvent');

      if (value.time > 0) {
        for (let i = 0; i < value.time; i++) {
          testProvider.time = i;
          andeor.run();
          andeor.stop();
        }
      }
      testProvider.time = value.time;
      andeor.on(Andeor.events.remove, removeSpy);
      andeor.run();

      expect(removeSpy).toHaveBeenCalledTimes(value.toRemove);

      andeor.stop();
    })

    it (`all event launched are right for time ${value.time}(${value.datas.join(', ')})`, () => {
      const testProvider = new TestProvider();

      const andeor = new Andeor(datas, testProvider);

      const addSpy = jasmine.createSpy('addEvent');
      const removeSpy = jasmine.createSpy('removeEvent');

      if (value.time > 0) {
        for (let i = 0; i < value.time; i++) {
          testProvider.time = i;
          andeor.run();
          andeor.stop();
        }
      }

      andeor.on(Andeor.events.add, addSpy);
      andeor.on(Andeor.events.remove, removeSpy);

      testProvider.time = value.time;

      andeor.run();

      expect(addSpy).toHaveBeenCalledTimes(value.toAdd);
      expect(removeSpy).toHaveBeenCalledTimes(value.toRemove);

      andeor.stop();
    })
  })


})