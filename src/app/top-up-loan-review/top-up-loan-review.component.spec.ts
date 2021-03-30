import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopUpLoanReviewComponent } from './top-up-loan-review.component';

describe('TopUpLoanReviewComponent', () => {
  let component: TopUpLoanReviewComponent;
  let fixture: ComponentFixture<TopUpLoanReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopUpLoanReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopUpLoanReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
