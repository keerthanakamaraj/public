import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsoleLandingComponent } from './console-landing.component';

describe('ConsoleLandingComponent', () => {
  let component: ConsoleLandingComponent;
  let fixture: ComponentFixture<ConsoleLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsoleLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsoleLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
