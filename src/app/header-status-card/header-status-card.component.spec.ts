import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderStatusCardComponent } from './header-status-card.component';

describe('HeaderStatusCardComponent', () => {
  let component: HeaderStatusCardComponent;
  let fixture: ComponentFixture<HeaderStatusCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderStatusCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderStatusCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
