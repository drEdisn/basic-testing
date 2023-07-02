// Uncomment the code below and write your tests
import { simpleCalculator } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 2, action: '+' })).toEqual(4);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 6, b: 2, action: '-' })).toEqual(4);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 2, action: '*' })).toEqual(4);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 8, b: 2, action: '/' })).toEqual(4);
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 2, action: '^' })).toEqual(4);
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 2, b: 2, action: 'c' })).toEqual(null);
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({ a: 'a', b: 'b', action: '-' })).toEqual(null);
  });
});
