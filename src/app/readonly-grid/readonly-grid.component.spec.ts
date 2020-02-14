import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadonlyGridComponent } from './readonly-grid.component';

describe('ReadonlyGridComponent', () => {
  let component: ReadonlyGridComponent;
  let fixture: ComponentFixture<ReadonlyGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadonlyGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadonlyGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
