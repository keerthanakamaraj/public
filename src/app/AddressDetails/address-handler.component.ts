import { Component, OnInit, Input } from '@angular/core';
import { AddressDetailsComponent } from './AddressDetails.component';
import { FieldComponent } from '../field/field.component';
import { RLOUIHandlerComponent } from '../rlouihandler/rlouihandler.component';

@Component({
  selector: 'app-address-handler',
  template: `<div style="display:none;"></div>`,
  styles: []
})
export class AddressHandlerComponent extends RLOUIHandlerComponent implements OnInit {
  @Input() MainComponent: AddressDetailsComponent;
  formName: string = "AddressDetails";

  ngOnInit() {
    // ngOnInit
  }

  // OnFormLoad
  onFormLoad(arg0: {}) {
    super.onFormLoad({});
    console.log("address is onload");

  }




  onAddTypeChange() {
    if (this.MainComponent.AD_ADD_TYPE.getFieldValue() == 'OFFICE') {
      this.MainComponent.AD_OCCUPANCY_TYPE.onReset();
      this.MainComponent.AD_OCCUPANCY_STATUS.onReset();
      this.MainComponent.AD_OCCUPANCY_TYPE.setReadOnly(true);
      this.MainComponent.AD_OCCUPANCY_STATUS.setReadOnly(true);
      this.MainComponent.AD_OCCUPANCY_TYPE.mandatory = false;
      this.MainComponent.AD_OCCUPANCY_STATUS.mandatory = false;
    } else {
      this.MainComponent.AD_OCCUPANCY_TYPE.setReadOnly(false);
      this.MainComponent.AD_OCCUPANCY_STATUS.setReadOnly(false);
      this.MainComponent.AD_OCCUPANCY_TYPE.mandatory = true;
      this.MainComponent.AD_OCCUPANCY_STATUS.mandatory = true;
    }
    if (this.MainComponent.AD_ADD_TYPE.getFieldValue() == 'RESI') {

      this.MainComponent.AD_RES_DUR_UNIT.mandatory = true;
      this.MainComponent.AD_RES_DUR.mandatory = true;
    }
    else {
      this.MainComponent.AD_RES_DUR_UNIT.mandatory = false;
      this.MainComponent.AD_RES_DUR.mandatory = false;
    }
  }





}

