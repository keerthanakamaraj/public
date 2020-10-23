import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerSearchFieldsComponent } from './customer-search-fields.component';

describe('CustomerSearchFieldsComponent', () => {
  let component: CustomerSearchFieldsComponent;
  let fixture: ComponentFixture<CustomerSearchFieldsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerSearchFieldsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerSearchFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
