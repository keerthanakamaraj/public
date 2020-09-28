import { Component, OnInit, Input } from '@angular/core';
import { EducationLoanDetailsComponent } from './EducationLoanDetails.component';
import { FieldComponent } from '../field/field.component';
import { RLOUIHandlerComponent } from 'src/app/rlouihandler/rlouihandler.component';

@Component({
  selector: 'app-education-loan-handler',
  template: `<div style="display:none;"></div>`,
  styles: []
})
export class EducationLoanHandlerComponent extends RLOUIHandlerComponent implements OnInit {
  @Input() MainComponent: EducationLoanDetailsComponent;
  formName: string = "EducationLoanDetails";
  occupations = [];
  fieldArray: any[];
  ngOnInit() {
    // ngOnInit
  }

  // OnFormLoad
  onFormLoad(arg0: {}) {
    console.log("Education .. On form load");
    super.onFormLoad({});
    //this.MainComponent.CD_THIRD_NAME.setHidden(true);
  }

}


