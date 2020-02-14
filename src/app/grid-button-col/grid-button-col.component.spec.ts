import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridButtonColComponent } from './grid-button-col.component';

describe('GridButtonColComponent', () => {
  let component: GridButtonColComponent;
  let fixture: ComponentFixture<GridButtonColComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridButtonColComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridButtonColComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
