import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterfaceResultsComponent } from './interface-results.component';

describe('InterfaceResultsComponent', () => {
  let component: InterfaceResultsComponent;
  let fixture: ComponentFixture<InterfaceResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterfaceResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterfaceResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
