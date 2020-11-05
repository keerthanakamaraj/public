import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RloUiCustomerSearchComponent } from './rlo-ui-customer-search.component';

describe('RloUiCustomerSearchComponent', () => {
  let component: RloUiCustomerSearchComponent;
  let fixture: ComponentFixture<RloUiCustomerSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RloUiCustomerSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RloUiCustomerSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
