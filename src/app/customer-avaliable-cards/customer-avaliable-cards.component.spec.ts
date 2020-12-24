import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAvaliableCardsComponent } from './customer-avaliable-cards.component';

describe('CustomerAvaliableCardsComponent', () => {
  let component: CustomerAvaliableCardsComponent;
  let fixture: ComponentFixture<CustomerAvaliableCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerAvaliableCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerAvaliableCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
