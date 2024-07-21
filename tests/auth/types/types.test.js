import { types } from '../../../src/auth';

describe('types tests', () => {
  test('should return these types', () => {
    // console.log(types);
    expect(types).toEqual({
      login: '[auth] login',
      logout: '[auth] logout',
    });
  });
});
