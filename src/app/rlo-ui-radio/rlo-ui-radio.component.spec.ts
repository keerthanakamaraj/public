import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RLOUIRadioComponent } from './rlo-ui-radio.component';

describe('RLOUIRadioComponent', () => {
  let component: RLOUIRadioComponent;
  let fixture: ComponentFixture<RLOUIRadioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RLOUIRadioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RLOUIRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
