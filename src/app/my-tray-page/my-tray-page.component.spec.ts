import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTrayPageComponent } from './my-tray-page.component';

describe('MyTrayPageComponent', () => {
  let component: MyTrayPageComponent;
  let fixture: ComponentFixture<MyTrayPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyTrayPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTrayPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
