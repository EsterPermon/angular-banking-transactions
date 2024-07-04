import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TransactionService } from './transaction.service';
import { getDateRange } from '../../utils/transactions/utils';
import { HttpParams } from '@angular/common/http';
import {
  FormattedTransaction,
  PeriodFilterOption,
  TransactionRecord,
} from '../../models/transaction.model';

describe('TransactionService', () => {
  let service: TransactionService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TransactionService],
    });
    service = TestBed.inject(TransactionService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch transactions', () => {
    const mockTransactions: TransactionRecord[] = [
      {
        accountId: 1,
        executionDate: '2021-12-09T00:00:00.000Z',
        beneficiary: 'Charleen Tremmel',
        amount: 124.95,
        currency: 'EUR',
        positive: false,
      },
    ];

    service.getTransactions().subscribe({
      next: (transactions: FormattedTransaction[]) => {
        expect(transactions.length).toBe(1);
        expect(transactions[0].accountId).toBe(1);
      },
    });

    const req = httpMock.expectOne(`${service['apiUrl']}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTransactions);
  });

  it('should handle error when fetching transactions', () => {
    service.getTransactions().subscribe({
      next: () => fail('should have failed with an error'),
      error: (error) => {
        expect(error).toBeTruthy();
      },
    });

    const req = httpMock.expectOne(`${service['apiUrl']}`);
    req.flush('Something went wrong', {
      status: 500,
      statusText: 'Server Error',
    });
  });

  it('should set query params correctly', () => {
    const filters = {
      name: 'John',
      period: 'Last 7 Days' as PeriodFilterOption,
    };
    const params: HttpParams = service['setQueryParams'](filters);

    expect(params.get('beneficiary_like')).toBe('John');
    const dateRange = getDateRange('Last 7 Days');
    expect(params.get('executionDate_gte')).toBe(dateRange!.startDate);
    expect(params.get('executionDate_lte')).toBe(dateRange!.endDate);
  });
});
