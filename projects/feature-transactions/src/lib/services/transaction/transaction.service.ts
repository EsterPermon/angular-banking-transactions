import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  FilterParams,
  FormattedTransaction,
  TransactionRecord,
} from '../../models/transaction.model';
import {
  formatAndSortTransactions,
  getDateRange,
} from '../../utils/transactions/utils';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private apiUrl = 'http://localhost:3000/transactions';

  constructor(private http: HttpClient) {}

  private setQueryParams(filters?: FilterParams): HttpParams {
    let params = new HttpParams();

    if (filters?.name) {
      /**
       *  _like
       * suffix is used to handle case-insensitive and substring matching
       */
      params = params.set('beneficiary_like', filters.name);
    }
    /**
     * date range logic is wrapped in a try/catch because it
     * might throw an error if it receives an invalid  param
     */
    try {
      const dateRange = getDateRange(filters?.period);
      if (dateRange) {
        /**
         * _gte (greater than or equal to)
         * _lte (less than or equal to)
         * suffixes are used to handle date range here
         */
        params = params
          .set('executionDate_gte', dateRange.startDate)
          .set('executionDate_lte', dateRange.endDate);
      }
    } catch (error) {
      console.error(error);
    }

    return params;
  }

  getTransactions(filters?: FilterParams): Observable<FormattedTransaction[]> {
    const params = this.setQueryParams(filters);

    return this.http.get<TransactionRecord[]>(this.apiUrl, { params }).pipe(
      map((record) => formatAndSortTransactions(record)),
      catchError((error) => {
        console.error('Error occurred:', error);
        throw new Error(error);
      })
    );
  }
}
