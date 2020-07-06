import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UWCustomerListComponent } from './UWCustomerList.component';

describe('UWCustomerListComponent', () => {
  let component: UWCustomerListComponent;
  let fixture: ComponentFixture<UWCustomerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UWCustomerListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UWCustomerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
