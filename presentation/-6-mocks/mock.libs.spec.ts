import crypto from 'crypto';
import { mockCryptoData } from './mocks/mock.libs.mock';
import * as mockCrypto from 'crypto';

//Jest will automatically hoist jest.mock calls to the top of the module (before any imports)
//mockCryptoData will not be seen
// jest.mock('crypto', () => {
//   const actual = jest.requireActual('crypto');
//   return {
//     ...actual,
//     ...mockCryptoData
//   };
// });


// will work but always will return same value
// jest.mock('crypto', () => {
//   const actual = jest.requireActual('crypto');
//   return {
//     ...actual,
//     createHmac: jest.fn().mockReturnValue(1)
//   };
// });

function testFunction() {
  return crypto.createHmac('sha256', 'key');
}

describe('test different mocks', () => {
  it('using jest.mock errors Cannot access before initialization', () => {
    // mockCryptoData is not hoisted
    const result = 2;
    mockCryptoData.createHmac.mockResolvedValueOnce(result);

    expect(testFunction()).toBe(result);
  });

  it('using jest.mock will work but called crypto.createHmac is not trackAble', () => {

    expect(testFunction()).toBe(1);
  });

  it('best way is to use jest.spy', () => {
    //but pay attention property in imported
    const result: any = 'best solution';
    const createHmacMock = jest.spyOn(crypto, 'createHmac');
    //you can control crypto.createHmac
    createHmacMock.mockReturnValueOnce(result);

    expect(testFunction()).toEqual(result);

    //you have track on crypto.createHmac
    expect(createHmacMock).toBeCalledWith('sha256', 'key');
  });

  it('will not work', () => {
    // mock will argue that 'string' is not assignable to parameter of type 'Hmac'
    const result = 'string' as any;

    //but will Error Cannot redefine property: createHmac
    //you can use this construction to get default import (mockCrypto as any).default
    const createHmacMock = jest.spyOn(
        mockCrypto,
      'createHmac'
    );
    createHmacMock.mockReturnValueOnce(result);

    expect(testFunction()).toEqual(result);
  });
});

//Some libs can be mocked easily , some not ))
//Here shown most used ways to mock any lib
