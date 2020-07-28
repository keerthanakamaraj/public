import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlankCardComponent } from './blank-card.component';

describe('BlankCardComponent', () => {
  let component: BlankCardComponent;
  let fixture: ComponentFixture<BlankCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlankCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlankCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
