import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UWCustomerTabComponent } from './uw-cust-tab.component';

describe('UWCustomerTabComponent', () => {
  let component: UWCustomerTabComponent;
  let fixture: ComponentFixture<UWCustomerTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UWCustomerTabComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UWCustomerTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
