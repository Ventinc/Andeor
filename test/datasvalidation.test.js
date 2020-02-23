describe('Schema validation in Andeor', () => {
  it('is created with valid datas', () => {
    expect(new Andeor([
      {
        timeBegin: 12,
        timeEnd: 14,
        data: 'test'
      }
    ])).toBeDefined();
  })

  const failedTestCases = [
    {},
    {timeEnd: 2, data: 'data'},
    {timeBegin: 8, data: 'data'},
    {timeBegin: 8, timeEnd: 2},
    {timeBegin: 8},
    {timeEnd: 2},
    {data: 'data'},
    {timeBegin: 8, timeEnd: 2, data: 'data'}
  ]

  failedTestCases.forEach(data => {
    it(`should throw an error with value: "timeBegin: ${data.timeBegin}, timeEnd: ${data.timeEnd}, data: ${data.data}"`, () => {
      expect(() => new Andeor([data])).toThrow()
    });
  });
})