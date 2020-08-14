import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IGCBDatepickerComponent } from './igcb-datepicker.component';

describe('IGCBDatepickerComponent', () => {
  let component: IGCBDatepickerComponent;
  let fixture: ComponentFixture<IGCBDatepickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IGCBDatepickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IGCBDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
