import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RloUiMobileComponent } from './rlo-ui-mobile.component';

describe('RloUiMobileComponent', () => {
  let component: RloUiMobileComponent;
  let fixture: ComponentFixture<RloUiMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RloUiMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RloUiMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
