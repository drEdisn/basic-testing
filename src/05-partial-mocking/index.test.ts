// Uncomment the code below and write your tests
import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const original = jest.requireActual<typeof import('./index')>('./index');

  return {
    mockOne: jest.fn(() => 'foo'),
    mockTwo: jest.fn(() => 'bar'),
    mockThree: jest.fn(() => 'baz'),
    unmockedFunction: original.unmockedFunction,
  };
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    const consoleLog = jest.spyOn(console, 'log');
    mockOne();
    mockTwo();
    mockThree();
    expect(consoleLog).not.toBeCalled();
  });

  test('unmockedFunction should log into console', () => {
    const consoleLog = jest.spyOn(console, 'log');
    unmockedFunction();
    expect(consoleLog).toBeCalledWith('I am not mocked');
  });
});
