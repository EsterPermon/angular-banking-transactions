import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsPageComponent } from './transactions-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TransactionsPageComponent', () => {
  let component: TransactionsPageComponent;
  let fixture: ComponentFixture<TransactionsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionsPageComponent, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
