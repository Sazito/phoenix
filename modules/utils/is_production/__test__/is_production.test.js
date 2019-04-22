import isProduction from '../index'
test('isProduction module test', () => {
  expect(isProduction).not.toBeNull();
  expect(isProduction).not.toBeUndefined();
  if (process.env.NODE_ENV === 'production') {
    expect(isProduction).toBeTruthy();
  } else {
    expect(isProduction).toBeFalsy();
  }
});