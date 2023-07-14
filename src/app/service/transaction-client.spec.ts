import { TransactionClient } from './transaction-client';

describe('TransactionClient', () => {
  it('should create an instance', () => {
    expect(new TransactionClient()).toBeTruthy();
  });
});
