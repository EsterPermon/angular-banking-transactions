import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'lib-select-field',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './select-field.component.html',
  styleUrl: './select-field.component.scss',
})
export class SelectFieldComponent {
  @Input() label!: string;
  @Input() options!: string[];
  @Output() onChange: EventEmitter<string> = new EventEmitter<string>();

  selectedOption: string | undefined;

  handleOnChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value as string;
    this.selectedOption = value;
    this.onChange.emit(value);
  }
}
