import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RloUiCurrencyComponent } from './rlo-ui-currency.component';

describe('RloUiCurrencyComponent', () => {
  let component: RloUiCurrencyComponent;
  let fixture: ComponentFixture<RloUiCurrencyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RloUiCurrencyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RloUiCurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
