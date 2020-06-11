import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderProgressComponent } from './header-progress.component';

describe('HeaderProgressComponent', () => {
  let component: HeaderProgressComponent;
  let fixture: ComponentFixture<HeaderProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
