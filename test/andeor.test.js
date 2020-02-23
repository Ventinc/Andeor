describe('Andeor instance', () => {
  it('is created', () => {
    const andeor = new Andeor();
    expect(andeor).toBeInstanceOf(Andeor);
  })

  it('is running', () => {
    const andeor = new Andeor();

    andeor.run();

    expect(andeor.state).toBe('running');
    expect(andeor.requestId).toBeDefined();
    andeor.stop();
  })

  it('is stopped', () => {
    const andeor = new Andeor();

    andeor.stop();

    expect(andeor.state).toBe('stopped');
    expect(andeor.requestId).not.toBe();
  })

  it('is stopped after running', () => {
    const andeor = new Andeor();

    andeor.run();
    andeor.stop();

    expect(andeor.state).toBe('stopped');
    expect(andeor.requestId).not.toBe();
  })
})