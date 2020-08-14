import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateUdfFieldsComponent } from './generate-udf-fields.component';

describe('GenerateUdfFieldsComponent', () => {
  let component: GenerateUdfFieldsComponent;
  let fixture: ComponentFixture<GenerateUdfFieldsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateUdfFieldsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateUdfFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
