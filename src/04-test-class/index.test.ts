// Uncomment the code below and write your tests
import {
  BankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  getBankAccount,
} from '.';
import lodash from 'lodash';

describe('BankAccount', () => {
  let acc: BankAccount;

  beforeEach(() => {
    acc = getBankAccount(1000);
  });

  test('should create account with initial balance', () => {
    expect(acc).toBeInstanceOf(BankAccount);
    expect(acc.getBalance()).toEqual(1000);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const func = acc.withdraw.bind(acc, 2000);
    expect(func).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const secondAcc = new BankAccount(1000);
    const func = acc.transfer.bind(acc, 2000, secondAcc);
    expect(func).toThrowError();
  });

  test('should throw error when transferring to the same account', () => {
    const func = acc.transfer.bind(acc, 1000, acc);
    expect(func).toThrowError();
  });

  test('should deposit money', () => {
    acc.deposit(1000);
    expect(acc.getBalance()).toEqual(2000);
  });

  test('should withdraw money', () => {
    acc.withdraw(500);
    expect(acc.getBalance()).toEqual(500);
  });

  test('should transfer money', () => {
    const secondAcc = new BankAccount(1000);
    acc.transfer(500, secondAcc);
    expect(acc.getBalance()).toEqual(500);
    expect(secondAcc.getBalance()).toEqual(1500);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    jest.spyOn(lodash, 'random').mockReturnValueOnce(10);
    jest.spyOn(lodash, 'random').mockReturnValueOnce(1);
    acc.fetchBalance().then((res) => expect(res).toEqual(10));
  });

  test('should set new balance if fetchBalance returned number', async () => {
    jest.spyOn(acc, 'fetchBalance').mockResolvedValue(10);
    acc.synchronizeBalance().then(() => {
      expect(acc.getBalance()).toEqual(10);
    });
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest.spyOn(acc, 'fetchBalance').mockResolvedValue(null);
    expect(acc.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
