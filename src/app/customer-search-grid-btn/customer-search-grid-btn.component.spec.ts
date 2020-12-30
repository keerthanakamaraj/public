import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerSearchGridBtnComponent } from './customer-search-grid-btn.component';

describe('CustomerSearchGridBtnComponent', () => {
  let component: CustomerSearchGridBtnComponent;
  let fixture: ComponentFixture<CustomerSearchGridBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerSearchGridBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerSearchGridBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
