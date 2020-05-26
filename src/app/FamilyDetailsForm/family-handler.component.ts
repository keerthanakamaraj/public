import { Component, OnInit, Input } from '@angular/core';
import { FamilyDetailsFormComponent } from './FamilyDetailsForm.component';
import { RLOUIHandlerComponent } from '../rlouihandler/rlouihandler.component';
import { FieldComponent } from '../field/field.component';

@Component({
  selector: 'app-family-handler',
  template: `<div style="display:none;"></div>`,
  styles: []
})
export class FamilyHandlerComponent extends RLOUIHandlerComponent implements OnInit {
  @Input() MainComponent: FamilyDetailsFormComponent;

  formName: string = "FamilyDetails";

  ngOnInit() {
    // super.ngOnInit();
  }

  // OnFormLoad
  onFormLoad(arg0: {}) {
    console.log("family .. On form load");
    //this.MainComponent.CD_THIRD_NAME.setHidden(true);
    super.onFormLoad({});
  }

  updateFullName(arg0: {}) {
    let fullName = "";
    if (this.MainComponent.FD_FIRST_NAME.getFieldValue()) {
      fullName = fullName + this.MainComponent.FD_FIRST_NAME.getFieldValue().trim() + " ";
    }
    if (this.MainComponent.FD_MIDDLE_NAME.getFieldValue()) {
      fullName = fullName + this.MainComponent.FD_MIDDLE_NAME.getFieldValue().trim() + " ";
    }
    // if (this.MainComponent.FD_THIRD_NAME.getFieldValue()) {
    //   fullName = fullName + " " + this.MainComponent.FD_THIRD_NAME.getFieldValue().trim() + " ";
    // }
    if (this.MainComponent.FD_LAST_NAME.getFieldValue()) {
      fullName = fullName + " " + this.MainComponent.FD_LAST_NAME.getFieldValue().trim() + " ";
    }
    fullName.trim();
    this.MainComponent.FD_FULL_NAME.setValue(fullName);
  }

}

