import {
  DateRange,
  FormattedTransaction,
  PeriodFilterOption,
  TransactionRecord,
} from '../../models/transaction.model';

export const periodFilterOptions = [
  'All',
  'Today',
  'Last 7 Days',
  'Last 30 Days',
  'Last 60 Days',
] as const;

export function formatDate(date: string): string {
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date(date));
  return formattedDate;
}

export function formatAmount(
  amount: number,
  currency: string,
  isIncome: boolean
): string {
  let amountWithCurrency: string;

  try {
    amountWithCurrency = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      currencyDisplay: 'symbol',
    }).format(amount);
  } catch (error) {
    console.error(`Invalid currency code: ${currency}`, error);

    // In case of invalid currency, we want to fallback to eur
    amountWithCurrency = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR',
      currencyDisplay: 'symbol',
    }).format(amount);
  }
  const transactionSymbol = isIncome ? '+' : '-';
  return `${transactionSymbol} ${amountWithCurrency}`;
}

export function sortByDateDesc(a: TransactionRecord, b: TransactionRecord) {
  const dateA = new Date(a.executionDate);
  const dateB = new Date(b.executionDate);

  // we want to handle invalid dates as the latest
  if (isNaN(dateA.getTime())) {
    return 1;
  }
  if (isNaN(dateB.getTime())) {
    return -1;
  }

  return dateB.getTime() - dateA.getTime();
}

export function formatAndSortTransactions(
  transactions: TransactionRecord[]
): FormattedTransaction[] {
  return transactions.sort(sortByDateDesc).map((transaction) => {
    const {
      accountId,
      beneficiary,
      executionDate,
      amount,
      currency,
      positive,
    } = transaction;

    const formattedDate = formatDate(executionDate);
    const formattedAmount = formatAmount(amount, currency, positive);

    return {
      accountId,
      beneficiary,
      formattedDate,
      formattedAmount,
      isIncome: positive,
    };
  });
}

export function calculateStartDate(today: Date, days: number) {
  return new Date(today.setDate(today.getDate() - days)).toISOString();
}

export function getDateRange(period?: PeriodFilterOption): DateRange | null {
  if (!period) {
    return null;
  }
  const today = new Date();
  const endDate = new Date(today.setUTCHours(0, 0, 0, 0)).toISOString();

  let startDate: string;

  switch (period) {
    case 'Today':
      startDate = endDate;
      break;
    case 'Last 7 Days':
      startDate = calculateStartDate(today, 7);
      break;
    case 'Last 30 Days':
      startDate = calculateStartDate(today, 30);
      break;
    case 'Last 60 Days':
      startDate = calculateStartDate(today, 60);
      break;
    case 'All':
      return null;
    default:
      throw new Error(`Invalid time period: ${period}`);
  }

  return { startDate, endDate };
}
