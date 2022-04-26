import * as mockCommonMistakesHelperFunctions from './mocks/common.mistakes.mock';
import { doSomethingAsync } from './mocks/common.mistakes.mock';

async function testFunction(obj: Record<string, any>) {
  return await doSomethingAsync({ age: obj.age * 2, ...obj });
}

function testFunctionWithMistakes(obj: Record<string, any>, arr: number[]) {
  //Name contains both ASCII and non-ASCII
  if (!obj.сard) {
    throw Error();
  }
  //Map do not mutate array
  arr.map((item) => item * 2);
  return { arr, obj };
}

describe('Describe block', () => {
  let doSomethingAsyncMock: jest.SpyInstance;

  beforeEach(() => {
    doSomethingAsyncMock = jest.spyOn(
      mockCommonMistakesHelperFunctions,
      'doSomethingAsync'
    );
  });

  it('testFunction', async () => {
    const obj = { name: 'name', age: 22 };
    //does not meter what doSomethingAsync will resolve we just need to check
    //what testFunction will return
    doSomethingAsyncMock.mockResolvedValueOnce('obj');

    await expect(testFunction(obj)).resolves.toEqual('obj');

    expect(doSomethingAsyncMock).toBeCalledWith({ age: 44, name: 'name' });
  });

  it('testFunctionWithMistakes wrong spelling', () => {
    const obj = { card: 'card' };
    const arr = [2, 3, 4];

    // will throw Error cause of miss spelling obj.card
    expect(testFunctionWithMistakes(obj, arr)).toEqual({ obj, arr: [4, 6, 8] });
  });

  it('testFunctionWithMistakes  arr.map dont mutate array', () => {
    const obj = { сard: 'card' };
    const arr = [2, 3, 4];

    // will throw Error cause of miss spelling obj.card
    expect(testFunctionWithMistakes(obj, arr)).toStrictEqual({
      obj,
      arr: [4, 6, 8]
    });
  });
});
