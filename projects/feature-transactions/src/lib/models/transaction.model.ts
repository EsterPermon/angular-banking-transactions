import { periodFilterOptions } from '../utils/transactions/utils';

export interface TransactionRecord {
  accountId: number;
  executionDate: string;
  beneficiary: string;
  amount: number;
  currency: string;
  positive: boolean;
}

export interface FormattedTransaction {
  accountId: number;
  formattedDate: string;
  beneficiary: string;
  formattedAmount: string;
  isIncome: boolean;
}

export interface DateRange {
  startDate: string;
  endDate: string;
}

export type PeriodFilterOption = (typeof periodFilterOptions)[number];

export interface FilterParams {
  name?: string;
  period?: PeriodFilterOption;
}
