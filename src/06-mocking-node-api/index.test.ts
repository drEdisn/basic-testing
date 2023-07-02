// Uncomment the code below and write your tests
import path from 'path';
import { doStuffByInterval, doStuffByTimeout, readFileAsynchronously } from '.';
import fsp from 'fs/promises';
import fs from 'fs';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const t = jest.spyOn(global, 'setTimeout');
    const fn = jest.fn();
    doStuffByTimeout(fn, 1000);
    expect(t).toBeCalledWith(fn, 1000);
  });

  test('should call callback only after timeout', () => {
    const fn = jest.fn();
    doStuffByTimeout(fn, 1000);

    expect(fn).not.toBeCalled();

    jest.advanceTimersByTime(1000);

    expect(fn).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const it = jest.spyOn(global, 'setInterval');
    const fn = jest.fn();

    doStuffByInterval(fn, 1000);
    expect(it).toHaveBeenCalled();
    expect(it).toHaveBeenCalledWith(fn, 1000);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const fn = jest.fn();
    doStuffByInterval(fn, 500);
    expect(fn).not.toBeCalled();

    jest.advanceTimersByTime(2000);
    expect(fn).toHaveBeenCalledTimes(4);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const join = jest.spyOn(path, 'join');
    await readFileAsynchronously('index.ts');

    expect(join).toHaveBeenCalledTimes(1);
    expect(join).toHaveBeenCalledWith(__dirname, 'index.ts');
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    const res = await readFileAsynchronously('index.ts');
    expect(res).toEqual(null);
  });

  test('should return file content if file exists', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(fsp, 'readFile').mockResolvedValue('file content');
    const res = await readFileAsynchronously('index.ts');

    expect(res).toEqual('file content');
  });
});
