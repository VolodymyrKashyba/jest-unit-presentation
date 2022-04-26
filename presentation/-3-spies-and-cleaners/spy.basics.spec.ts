import { doSomethingSync } from './mocks/spy.functions.to.mock';
import * as mockFunctionsForTest from './mocks/spy.functions.to.mock';

function testDoSomethingSyncMock() {
  return doSomethingSync();
}

describe('Describe block', () => {
  //beforeEach is best way to setup mocks
  let doSomethingSyncSpy: jest.SpyInstance;
  beforeEach(() => {
    //You can spy on default exports from module by importing full module , you cant spy on property itself
    doSomethingSyncSpy = jest.spyOn(mockFunctionsForTest, 'doSomethingSync');
  });

  // Uncomment code below to clear mocks after each test

  // afterEach(() => {
  //   //clears mocks that been left by accident
  //   jest.clearAllMocks();
  //   //restores functions implementation
  //   //only works when the mock was created with jest.spyOn
  //   //other mocks will require you to manually restore them
  //   jest.restoreAllMocks();
  // });

  it('testDoSomethingSyncMock', () => {
    const result = 2;

    //Accepts a value that will be returned for one call to the mock function
    //Can be chained so that successive calls to the mock function return different values.
    doSomethingSyncSpy.mockReturnValueOnce(result);

    expect(testDoSomethingSyncMock()).toBe(result);

    // left to trigger error
    doSomethingSyncSpy.mockReturnValueOnce(result);
  });

  //Test will not crash if run only it
  it('test crash cause of left mock', () => {
    const result = 333;

    doSomethingSyncSpy.mockReturnValueOnce(result);

    expect(testDoSomethingSyncMock()).toBe(result);
  });

  describe('test cleaners', () => {
    beforeAll(() => {
      jest.clearAllMocks();
      jest.restoreAllMocks();
    });
    afterEach(() => {
      jest.clearAllMocks();
      jest.restoreAllMocks();
    });

    it('testDoSomethingSyncMock with cleaner', () => {
      const result = 2;

      doSomethingSyncSpy.mockReturnValueOnce(result);

      expect(testDoSomethingSyncMock()).toBe(result);

      // left to check clean functions
      doSomethingSyncSpy.mockReturnValueOnce(result);
      doSomethingSyncSpy.mockReturnValueOnce(result);
      doSomethingSyncSpy.mockReturnValueOnce(result);
      doSomethingSyncSpy.mockReturnValueOnce(result);
    });

    //Test will not crash if run only it
    it('test will not crash cause mocks are cleaned', () => {
      const result = 333;

      doSomethingSyncSpy.mockReturnValueOnce(result);

      expect(testDoSomethingSyncMock()).toBe(result);
    });
  });
});
