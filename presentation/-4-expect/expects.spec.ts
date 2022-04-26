import {
  processArray,
  processNumber,
  processObject,
  processString
} from './mocks/expects.mock';

import * as mockProcessFunctions from './mocks/expects.mock';

function testFunction(
  num: number,
  str: string,
  obj: Record<string, any>,
  arr: any[]
) {
  const result: Record<string, any> = {};
  result.number = processNumber(num);
  result.string = processString(str);
  result.object = processObject(obj);
  result.array = processArray(arr);

  return result;
}

describe('Describe block', () => {
  let processNumberMock: jest.SpyInstance;
  let processObjectMock: jest.SpyInstance;
  let processStringMock: jest.SpyInstance;
  let processArrayMock: jest.SpyInstance;
  beforeEach(() => {
    processNumberMock = jest.spyOn(mockProcessFunctions, 'processNumber');
    processObjectMock = jest.spyOn(mockProcessFunctions, 'processObject');
    processStringMock = jest.spyOn(mockProcessFunctions, 'processString');
    processArrayMock = jest.spyOn(mockProcessFunctions, 'processArray');
  });

  it('testFunction', () => {
    const num = 1;
    const str = 'string';
    const obj = { a: 2 };
    const arr = [1, 2, 3];
    const result = {
      number: num,
      string: str,
      object: obj,
      array: arr
    };
    processNumberMock.mockReturnValueOnce(num);
    processObjectMock.mockReturnValueOnce(obj);
    processStringMock.mockReturnValueOnce(str);
    processArrayMock.mockReturnValueOnce(arr);

    expect(testFunction(num, str, obj, arr)).toEqual(result);

    //toBeCalledWith check that a mock function is called with a non-null argument
    expect(processNumberMock).toBeCalledWith(num);
    expect(processObjectMock).toBeCalledWith(obj);
    expect(processStringMock).toBeCalledWith(str);
    expect(processArrayMock).toBeCalledWith(arr);
  });
});
