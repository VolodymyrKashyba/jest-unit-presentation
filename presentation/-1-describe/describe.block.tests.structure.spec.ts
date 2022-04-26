//Block all test can be written in describe block
describe('Describe block', () => {
//beforeAll executes before each tests execution once
beforeAll(async () => {
    console.log('Before all block in parent describe block');
    for (let i = 0; i < 4000; i++) {
      await new Promise((resolve) => setTimeout(resolve, 1))
    }
  }, 10000);

//beforeEach executes before each tests execution once
  beforeEach(() => {
    console.log('Before each block in parent describe block');
  });

  //test single test can be written in it block
  it('first test', () => {
    console.log('1');
  });

  describe('Child describe block', () => {
    beforeAll(() => {
      console.log('Before all block in child describe block');
    });

    //afterAll executes after all tests in current describe block
    afterAll(() => {
      console.log('After all');
    });

    //afterEach executes after each tests in current describe block
    afterEach(() => {
      console.log('After each');
    });

    beforeEach(() => {
      console.log('Before each block in child describe block');
    });

    it('second test', () => {
      console.log('2');
    });

    it('third test', () => {
      console.log('3');
    });
  });
});
