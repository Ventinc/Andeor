describe('DefaultProvider', () => {
  const DefaultProvider = Andeor.DefaultProvider;
  
  it('to instantiate without problem', () => {
    expect(new DefaultProvider()).toBeDefined();
  })

  it('to set andeor in provider', () => {
    const provider = new DefaultProvider();

    provider.setAndeor(new Andeor());

    expect(provider.andeor).toBeDefined();
  })

  it('to have preload method', () => {
    const provider = new DefaultProvider();

    expect(provider.preload).toBeDefined();
    expect(typeof provider.preload).toBe('function');
  })

  it('to have getTime method', () => {
    const provider = new DefaultProvider();

    expect(provider.preload).toBeDefined();
    expect(typeof provider.preload).toBe('function');
  })
})