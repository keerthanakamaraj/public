import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnderWriterComponent } from './under-writer.component';

describe('UnderWriterComponent', () => {
  let component: UnderWriterComponent;
  let fixture: ComponentFixture<UnderWriterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnderWriterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnderWriterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
