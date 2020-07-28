import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreCardResultComponent } from './score-card-result.component';

describe('ScoreCardResultComponent', () => {
  let component: ScoreCardResultComponent;
  let fixture: ComponentFixture<ScoreCardResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoreCardResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreCardResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
