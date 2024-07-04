import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import {
  FilterParams,
  FormattedTransaction,
  PeriodFilterOption,
} from '../../models/transaction.model';
import { catchError, Observable, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TransactionsTableComponent } from '../transactions-table/transactions-table.component';
import { TransactionsFiltersComponent } from '../transactions-filters/transactions-filters.component';
import { FilterService } from '../../services/filters/filter.service';
import { TransactionService } from '../../services/transaction/transaction.service';

@Component({
  selector: 'lib-transactions-page',
  standalone: true,
  imports: [
    CommonModule,
    TransactionsTableComponent,
    TransactionsFiltersComponent,
  ],
  templateUrl: './transactions-page.component.html',
  styleUrl: './transactions-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionsPageComponent implements OnInit {
  transactions$: Observable<FormattedTransaction[]> | undefined;
  error: string | null = null;

  constructor(
    private transactionService: TransactionService,
    private filterService: FilterService,
    private cdr: ChangeDetectorRef
  ) {}

  private filterServiceSubscription: Subscription | undefined;
  private transactionsSubscription: Subscription | undefined;

  ngOnInit(): void {
    this.loadTransactions();

    this.filterServiceSubscription = this.filterService.buttonClick$.subscribe(
      ({ inputValue, selectValue }) => {
        this.loadTransactions({
          name: inputValue,
          period: selectValue as PeriodFilterOption,
        });
      }
    );
  }

  ngOnDestroy(): void {
    this.filterServiceSubscription?.unsubscribe();
  }

  private loadTransactions(filters?: FilterParams): void {
    this.transactionsSubscription?.unsubscribe(); // Unsubscribe from previous subscription if it exists
    this.transactions$ = this.transactionService.getTransactions(filters);
    this.transactionsSubscription = this.transactions$
      .pipe(
        catchError((error) => {
          console.log('error = ', error);
          this.error = error.message;
          this.cdr.markForCheck(); // Trigger change detection
          return [];
        })
      )
      .subscribe();
  }
}
