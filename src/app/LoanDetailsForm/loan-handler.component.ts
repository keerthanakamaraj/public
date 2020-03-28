import { Component, OnInit, Input } from '@angular/core';
import { LoanDetailsFormComponent} from './LoanDetailsForm.component';
import { FieldComponent } from '../field/field.component';
import { RLOUIHandlerComponent } from '../rlouihandler/rlouihandler.component';

@Component({
  selector: 'app-loan-handler',
  template: `<div style="display:none;"></div>`,
  styles: []
})
export class LoanHandlerComponent extends RLOUIHandlerComponent implements OnInit {
	@Input() MainComponent: LoanDetailsFormComponent;
  
  formName : string = 'LoanDetails';
	  ngOnInit() {
    // ngOnInit
  }

  // OnFormLoad
  onFormLoad(arg0: {}) {
    console.log("Loan .. On form load");
    super.onFormLoad({});
   
    //this.MainComponent.CD_THIRD_NAME.setHidden(true);
	}

 }

