import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridWithFormComponent } from './grid-with-form.component';

describe('GridWithFormComponent', () => {
  let component: GridWithFormComponent;
  let fixture: ComponentFixture<GridWithFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridWithFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridWithFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
