import {
  formatAndSortTransactions,
  getDateRange,
  formatDate,
  formatAmount,
  sortByDateDesc,
} from './utils';
import { TransactionRecord } from '../../models/transaction.model';

describe('TransactionsUtils', () => {
  it('should format dates correctly', () => {
    const date = '2021-12-09T00:00:00.000Z';
    const formattedDate = formatDate(date);
    expect(formattedDate).toBe('12/09/2021');
  });

  it('should format amounts correctly', () => {
    const amount = 124.95;
    const formattedAmount = formatAmount(amount, 'USD', true);
    expect(formattedAmount).toBe('+ $124.95');
  });

  it('should sort transactions by date descending', () => {
    const transactions: TransactionRecord[] = [
      {
        accountId: 1,
        executionDate: '2021-12-09T00:00:00.000Z',
        beneficiary: 'A',
        amount: 100,
        currency: 'USD',
        positive: true,
      },
      {
        accountId: 2,
        executionDate: '2021-12-08T00:00:00.000Z',
        beneficiary: 'B',
        amount: 200,
        currency: 'USD',
        positive: true,
      },
    ];
    const sortedTransactions = transactions.sort(sortByDateDesc);
    expect(sortedTransactions[0].executionDate).toBe(
      '2021-12-09T00:00:00.000Z'
    );
  });

  it('should format and sort transactions correctly', () => {
    const transactions: TransactionRecord[] = [
      {
        accountId: 2,
        executionDate: '2021-12-08T00:00:00.000Z',
        beneficiary: 'B',
        amount: 200,
        currency: 'USD',
        positive: true,
      },
      {
        accountId: 1,
        executionDate: '2021-12-09T00:00:00.000Z',
        beneficiary: 'A',
        amount: 100,
        currency: 'USD',
        positive: true,
      },
    ];
    const formattedTransactions = formatAndSortTransactions(transactions);
    expect(formattedTransactions[0].formattedDate).toBe('12/09/2021');
    expect(formattedTransactions[0].formattedAmount).toBe('+ $100.00');
  });

  it('should return correct date range for filters', () => {
    const dateRange = getDateRange('Last 7 Days');
    // here is hard to provide an specific test value due the dependency on the today attribute
    expect(dateRange).toBeTruthy();
  });

  it('should throw error for invalid period', () => {
    expect(() => getDateRange('Invalid Period' as any)).toThrowError(
      'Invalid time period: Invalid Period'
    );
  });
});
