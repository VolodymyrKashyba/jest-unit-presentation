import {
  myType,
  someComplicatedFunction
} from './mocks/examples.mock';

import * as mockExamplesForTest from './mocks/examples.mock';

async function functionThatWeTesting(data: myType) {
  const correctData: myType = await someComplicatedFunction(data);

  if (correctData.age > 30) {
    throw new Error('grandpa!');
  }

  return correctData;
}

describe('Right way to test', () => {
  let mockSomeComplicatedFunction: jest.SpyInstance;
  beforeEach(() => {
    mockSomeComplicatedFunction = jest.spyOn(
      mockExamplesForTest,
      'someComplicatedFunction'
    );
  });

  it('test functionThatWeTesting no Error', async () => {
    //no need to match the type use any!
    const data: any = { age: 1 };
    mockSomeComplicatedFunction.mockReturnValueOnce(data);

    await expect(functionThatWeTesting(data)).resolves.toEqual(data);

    expect(mockSomeComplicatedFunction).toBeCalledWith(data);
  });

  it('test functionThatWeTesting with Error', async () => {
    //no need to match type use any!
    const data: any = { age: 31 };
    mockSomeComplicatedFunction.mockReturnValueOnce(data);

    await expect(functionThatWeTesting(data)).rejects.toThrow(
      new Error('grandpa!')
    );

    expect(mockSomeComplicatedFunction).toBeCalledWith(data);
  });
});
