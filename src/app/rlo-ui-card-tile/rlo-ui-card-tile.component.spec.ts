import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RloUiCardTileComponent } from './rlo-ui-card-tile.component';

describe('RloUiCardTileComponent', () => {
  let component: RloUiCardTileComponent;
  let fixture: ComponentFixture<RloUiCardTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RloUiCardTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RloUiCardTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
