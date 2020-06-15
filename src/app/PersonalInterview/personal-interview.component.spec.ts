import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalInterviewComponent } from './personal-interview.component';

describe('PersonalInterviewComponent', () => {
  let component: PersonalInterviewComponent;
  let fixture: ComponentFixture<PersonalInterviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalInterviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalInterviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
