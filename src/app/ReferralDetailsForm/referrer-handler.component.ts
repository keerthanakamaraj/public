import { Component, OnInit, Input } from '@angular/core';
import { ReferralDetailsFormComponent } from '../ReferralDetailsForm/ReferralDetailsForm.component';
import { FieldComponent } from '../field/field.component';
import { RLOUIHandlerComponent } from '../rlouihandler/rlouihandler.component';

@Component({
  selector: 'app-referrer-handler',
  template: `<div style="display:none;"></div>`,
  styles: []
})
export class ReferralDetailsFormHandlerComponent extends RLOUIHandlerComponent implements OnInit {
	@Input() MainComponent: ReferralDetailsFormComponent;
	formName: string = "ReferralDetails";
	  ngOnInit() {
    // ngOnInit
  }

  // OnFormLoad
  onFormLoad(arg0: {}) {
    console.log("Referrer  .. On form load");
    //this.MainComponent.CD_THIRD_NAME.setHidden(true);
    super.onFormLoad({});
	}

 }

