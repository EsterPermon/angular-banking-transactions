import { Component, Input } from '@angular/core';
import { FormattedTransaction } from '../../models/transaction.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-transactions-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transactions-table.component.html',
  styleUrl: './transactions-table.component.scss',
})
export class TransactionsTableComponent {
  @Input() transactions!: FormattedTransaction[] | null;
  constructor() {}
}
