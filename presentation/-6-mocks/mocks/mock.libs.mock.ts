export const mockCryptoData = {
  createHmac: jest.fn(),
  update: jest.fn(),
  // hardcode mockReturnValue cause of hoisting
  digest: jest.fn()
};
