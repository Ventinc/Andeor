describe('Andeor data getter', () => {
  const DefaultProvider = Andeor.providers.DefaultProvider;

  class TestProvider extends DefaultProvider {
    preload() {
      return true;
    }
  
    getTime() {
      return 0;
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
    {time: 0, length: 2, datas: [1, 2]},
    {time: 1, length: 2, datas: [2, 5]},
    {time: 2, length: 3, datas: [2, 3, 5]},
    {time: 3, length: 2, datas: [2, 3]},
    {time: 4, length: 3, datas: [2, 3, 4]},
    {time: 5, length: 2, datas: [2, 4]},
    {time: 6, length: 2, datas: [2, 4]},
    {time: 7, length: 2, datas: [2, 4]},
    {time: 8, length: 2, datas: [2, 4]},
    {time: 9, length: 1, datas: [2]},
    {time: 10, length: 0, datas: []},
  ];

  values.forEach(value => {
    it(`have to return ${value.length} datas (${value.datas.join(', ')})`, () => {
      const andeor = new Andeor(datas, new TestProvider());

      const datasAtTime = andeor.getDatasAtTime(value.time);

      expect(datasAtTime.length).toBe(value.length);
      expect(datasAtTime.filter(d => value.datas.includes(d.data)).length === datasAtTime.length).toBeTrue();
    })
  })


})