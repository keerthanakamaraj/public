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

    if (this.MainComponent.AD_ADD_TYPE.getFieldValue() == 'RS') {
      this.MainComponent.AD_OCCUPANCY_TYPE.setReadOnly(false);
      this.MainComponent.AD_OCCUPANCY_STATUS.setReadOnly(false);
      this.MainComponent.AD_OCCUPANCY_TYPE.mandatory = true;
      this.MainComponent.AD_OCCUPANCY_STATUS.mandatory = true;
      this.MainComponent.AD_RES_DUR_UNIT.mandatory = true;
      this.MainComponent.AD_RES_DUR.mandatory = true;

    }
    else {
      this.MainComponent.AD_RES_DUR_UNIT.mandatory = false;
      this.MainComponent.AD_RES_DUR.mandatory = false;
      this.MainComponent.AD_OCCUPANCY_TYPE.onReset();
      this.MainComponent.AD_OCCUPANCY_STATUS.onReset();
      this.MainComponent.AD_OCCUPANCY_TYPE.setReadOnly(true);
      this.MainComponent.AD_OCCUPANCY_STATUS.setReadOnly(true);
      this.MainComponent.AD_OCCUPANCY_TYPE.mandatory = false;
      this.MainComponent.AD_OCCUPANCY_STATUS.mandatory = false;
    }
  }


  CompleteAddress() {
    let CompleteAddress

    if (this.MainComponent.AD_ADDRESS_LINE2.getFieldValue() == undefined && this.MainComponent.AD_ADDRESS_LINE3.getFieldValue() == undefined && this.MainComponent.AD_ADDRESS_LINE4.getFieldValue() == undefined) {
      CompleteAddress = this.MainComponent.AD_ADDRESS_LINE1.getFieldValue() + "," + " " + " " + this.MainComponent.AD_REGION.getFieldValue() + "," + " " + " " + this.MainComponent.AD_CITY + "," + " " + " " + this.MainComponent.AD_STATE.getFieldValue() + "," + " " + " " + this.MainComponent.AD_PINCODE.getFieldValue();
    }
    else if (this.MainComponent.AD_ADDRESS_LINE3.getFieldValue() == undefined && this.MainComponent.AD_ADDRESS_LINE4.getFieldValue() == undefined) {
      CompleteAddress = this.MainComponent.AD_ADDRESS_LINE1.getFieldValue() + "," + " " + " " + this.MainComponent.AD_ADDRESS_LINE2.getFieldValue() + "," + " " + " " + this.MainComponent.AD_REGION.getFieldValue() + "," + " " + " " + this.MainComponent.AD_CITY.getFieldValue() + "," + " " + " " + this.MainComponent.AD_STATE.getFieldValue() + "," + " " + " " + this.MainComponent.AD_PINCODE.getFieldValue();
    }
    else if (this.MainComponent.AD_ADDRESS_LINE1 == undefined) {
      CompleteAddress = this.MainComponent.AD_ADDRESS_LINE1.getFieldValue() + "," + " " + " " + this.MainComponent.AD_ADDRESS_LINE2.getFieldValue() + "," + " " + " " + this.MainComponent.AD_ADDRESS_LINE3.getFieldValue() + "," + " " + " " + this.MainComponent.AD_REGION.getFieldValue() + "," + " " + " " + this.MainComponent.AD_CITY + "," + " " + " " + this.MainComponent.AD_STATE.getFieldValue() + "," + " " + " " + this.MainComponent.AD_PINCODE.getFieldValue();
    }
    else {
      CompleteAddress = this.MainComponent.AD_ADDRESS_LINE1.getFieldValue() + "," + " " + " " + this.MainComponent.AD_ADDRESS_LINE2.getFieldValue() + "," + " " + " " + this.MainComponent.AD_ADDRESS_LINE3.getFieldValue() + "," + " " + " " + this.MainComponent.AD_ADDRESS_LINE4.getFieldValue() + "," + " " + " " + this.MainComponent.AD_REGION.getFieldValue() + "," + " " + " " + this.MainComponent.AD_CITY.getFieldValue() + "," + " " + " " + this.MainComponent.AD_STATE.getFieldValue() + "," + " " + " " + this.MainComponent.AD_PINCODE.getFieldValue();
    }

    return CompleteAddress;
  }


}

