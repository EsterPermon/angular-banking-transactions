import { Component } from '@angular/core';
import {
  ButtonComponent,
  InputFieldComponent,
  SelectFieldComponent,
} from '@banking/ui-common';
import { FilterService } from '../../services/filters/filter.service';
import { periodFilterOptions } from '../../utils/transactions/utils';

@Component({
  selector: 'lib-transactions-filters',
  standalone: true,
  imports: [InputFieldComponent, SelectFieldComponent, ButtonComponent],
  templateUrl: './transactions-filters.component.html',
  styleUrl: './transactions-filters.component.scss',
})
export class TransactionsFiltersComponent {
  inputLabel = 'Beneficiary: ';
  inputPlaceholder = 'Beneficiary name...';
  selectLabel = 'Time period:';
  selectOptions = periodFilterOptions.slice();
  buttonLabel = 'Search';

  constructor(private filterService: FilterService) {}

  handleInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.filterService.setInputValue(input.value);
  }

  handleSelectChange(value: string): void {
    this.filterService.setSelectValue(value);
  }

  handleButtonClick(event: MouseEvent): void {
    this.filterService.emitButtonClick(event);
  }
}
