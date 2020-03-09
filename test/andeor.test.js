
describe('Andeor instance', () => {
  const DefaultProvider = Andeor.DefaultProvider;

  class TestProvider extends DefaultProvider {
    preload() {
      return true;
    }
  
    getTime() {
      return 0;
    }
  }

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

  it('launch event on running', () => {
    const andeor = new Andeor();

    const runningEvent = jasmine.createSpy('runningEvent');

    andeor.on(Andeor.events.running, runningEvent);

    andeor.run();

    expect(runningEvent).toHaveBeenCalledTimes(1);
  })

  it('launch event on stopped', () => {
    const andeor = new Andeor();

    const stoppedEvent = jasmine.createSpy('stoppedEvent');

    andeor.on(Andeor.events.stopped, stoppedEvent);

    andeor.stop();

    expect(stoppedEvent).toHaveBeenCalledTimes(1);
  })

  it('throw an error if provider does not extend DefaultProvider', () => {
    expect(() => new Andeor([], {})).toThrow();
  })

  it('work with the TestProvider', () => {
    expect(() => new Andeor([], new TestProvider())).not.toThrow();
  })
})