import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FluidPageComponent } from './fluid-page.component';

describe('FluidPageComponent', () => {
  let component: FluidPageComponent;
  let fixture: ComponentFixture<FluidPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FluidPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FluidPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
