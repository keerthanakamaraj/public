import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EloginAuthComponent } from './elogin-auth.component';

describe('EloginAuthComponent', () => {
  let component: EloginAuthComponent;
  let fixture: ComponentFixture<EloginAuthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EloginAuthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EloginAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
