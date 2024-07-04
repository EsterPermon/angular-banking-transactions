import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'lib-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input() label!: string;
  @Output() onClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  handleClick(event: MouseEvent): void {
    this.onClick.emit(event);
  }
}
