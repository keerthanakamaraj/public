import { Component, OnInit, Input } from '@angular/core';
import { FieldComponent } from '../field/field.component';
import { RLOUIHandlerComponent } from '../rlouihandler/rlouihandler.component';
import { CreditCardDetailsComponent } from './CreditCardDetails.component';

@Component({
  selector: 'app-creditcard-handler',
  template: `<div style="display:none;"></div>`,
  styles: []
})
export class CreditCardHandlerComponent extends RLOUIHandlerComponent implements OnInit {
  @Input() MainComponent: CreditCardDetailsComponent;
  formName: string = "CreditCardDetails";
  ngOnInit() {
    // ngOnInit
  }

  // OnFormLoad
  onFormLoad(arg0: {}) {
    console.log("CreditCard .. On form load");
    //this.MainComponent.CD_THIRD_NAME.setHidden(true);
    super.onFormLoad({});
  }
  
  NomineeRequiredChange(){
    if (this.MainComponent.NomineeRequired.getFieldValue() == 'Y') {
      this.MainComponent.NomineeName.setHidden(false);
      this.MainComponent.NomineeRelationship.setHidden(false);
      this.MainComponent.NomineeDOB.setHidden(false);
      this.MainComponent.NomineeName.mandatory = true;
      this.MainComponent.NomineeRelationship.mandatory = true;
      this.MainComponent.NomineeDOB.mandatory = true;
    }
    else {
      this.MainComponent.NomineeName.setHidden(true);
      this.MainComponent.NomineeRelationship.setHidden(true);
      this.MainComponent.NomineeDOB.setHidden(true);
      this.MainComponent.NomineeName.mandatory = false;
      this.MainComponent.NomineeRelationship.mandatory = false;
      this.MainComponent.NomineeDOB.mandatory = false;
      this.MainComponent.NomineeName.onReset();
      this.MainComponent.NomineeRelationship.onReset();
      this.MainComponent.NomineeDOB.onReset();
      this.MainComponent.GuardianName.setHidden(true);
      this.MainComponent.GuadianRelationship.setHidden(true);
      this.MainComponent.GuardianName.mandatory = false;
      this.MainComponent.GuadianRelationship.mandatory = false;
      this.MainComponent.GuardianName.onReset();
      this.MainComponent.GuadianRelationship.onReset();
    }
  }


  NomineeDOBChange() {
    const inputMap = new Map();
   
    if (!this.MainComponent.isAgeValid(this.MainComponent.NomineeDOB.getFieldValue())) {
      this.MainComponent.GuardianName.setHidden(false);
      this.MainComponent.GuadianRelationship.setHidden(false);
      this.MainComponent.GuardianName.mandatory = true;
      this.MainComponent.GuadianRelationship.mandatory = true;
    }
    else {
      this.MainComponent.GuardianName.setHidden(true);
      this.MainComponent.GuadianRelationship.setHidden(true);
      this.MainComponent.GuardianName.mandatory = false;
      this.MainComponent.GuadianRelationship.mandatory = false;
      this.MainComponent.GuardianName.onReset();
      this.MainComponent.GuadianRelationship.onReset();

    }
  }



}

