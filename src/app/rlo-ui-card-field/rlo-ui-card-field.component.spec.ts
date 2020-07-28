import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RloUiCardFieldComponent } from './rlo-ui-card-field.component';

describe('RloUiCardTileComponent', () => {
  let component: RloUiCardFieldComponent;
  let fixture: ComponentFixture<RloUiCardFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RloUiCardFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RloUiCardFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
