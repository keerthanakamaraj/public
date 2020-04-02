import { Component, OnInit, Input } from '@angular/core';
import { OtherDeductionFormComponent } from './OtherDeductionForm.component';
import { FieldComponent } from '../field/field.component';
import { RLOUIHandlerComponent } from '../rlouihandler/rlouihandler.component';

@Component({
  selector: 'app-deduction-handler',
  template: `<div style="display:none;"></div>`,
  styles: []
})
export class DeductionHandlerComponent extends RLOUIHandlerComponent implements OnInit {
  @Input() MainComponent: OtherDeductionFormComponent;
  formName: string = "OtherDeduction";
  ngOnInit() {
    // ngOnInit
  }

  // OnFormLoad
  onFormLoad(arg0: {}) {
    console.log("Deduction .. On form load");
    //this.MainComponent.CD_THIRD_NAME.setHidden(true);
    super.onFormLoad({});
	}


 }

