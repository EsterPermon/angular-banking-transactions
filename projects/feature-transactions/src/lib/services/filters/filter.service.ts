import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private inputValueSubject = new BehaviorSubject<string>('');
  private selectValueSubject = new BehaviorSubject<string>('');
  private buttonClickSubject = new Subject<{
    inputValue: string;
    selectValue: string;
  }>();

  inputValue$ = this.inputValueSubject.asObservable();
  selectValue$ = this.selectValueSubject.asObservable();
  buttonClick$ = this.buttonClickSubject.asObservable();

  setInputValue(value: string): void {
    this.inputValueSubject.next(value);
  }

  setSelectValue(value: string): void {
    this.selectValueSubject.next(value);
  }

  emitButtonClick(_event: MouseEvent): void {
    const inputValue = this.inputValueSubject.getValue();
    const selectValue = this.selectValueSubject.getValue();
    this.buttonClickSubject.next({ inputValue, selectValue });
  }
}
