import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyCheckResultComponent } from './policy-check-result.component';

describe('PolicyCheckResultComponent', () => {
  let component: PolicyCheckResultComponent;
  let fixture: ComponentFixture<PolicyCheckResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PolicyCheckResultComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyCheckResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
