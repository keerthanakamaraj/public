import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollateralParentComponent } from './collateral-parent.component';

describe('CollateralParentComponent', () => {
  let component: CollateralParentComponent;
  let fixture: ComponentFixture<CollateralParentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CollateralParentComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollateralParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
