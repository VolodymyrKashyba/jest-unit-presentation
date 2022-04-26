describe('Describe block', () => {
  beforeEach(() => {
    console.log('Before each');
  });

  // all tests with same name will rin in once if you run one of them
  // before each will be called for each test
  it('test', () => {
    console.log('1');
  });

  it('test', () => {
    console.log('2');
  });

  it('test', () => {
    console.log('3');
  });
});
