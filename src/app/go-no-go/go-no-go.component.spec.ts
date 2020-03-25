import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoNoGoComponent } from './go-no-go.component';

describe('GoNoGoComponent', () => {
  let component: GoNoGoComponent;
  let fixture: ComponentFixture<GoNoGoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoNoGoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoNoGoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
