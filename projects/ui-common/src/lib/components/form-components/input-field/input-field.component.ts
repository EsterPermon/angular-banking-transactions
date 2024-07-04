import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'lib-input-field',
  standalone: true,
  imports: [],
  templateUrl: './input-field.component.html',
  styleUrl: './input-field.component.scss',
})
export class InputFieldComponent {
  @Input() placeholder!: string;
  @Input() label!: string;
  @Output() onChange: EventEmitter<Event> = new EventEmitter<Event>();

  handleChange(event: Event): void {
    this.onChange.emit(event);
  }
}
