describe('Providers', () => {
  it('are defined', () => {
    expect(Andeor.providers).toBeDefined();
  })

  it('have DefaultProvider', () => {
    expect(Andeor.providers.DefaultProvider).toBeDefined();
  })
})