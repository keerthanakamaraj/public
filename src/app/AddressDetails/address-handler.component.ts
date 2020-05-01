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
  address = [];
  ngOnInit() {
    // ngOnInit
  }

  // OnFormLoad
  onFormLoad(arg0: {}) {
    super.onFormLoad({});
    console.log("address is onload");
  
  }
  
  

 onAddTypeChange({}) {
  if (this.MainComponent.AD_ADD_TYPE.getFieldValue() == 'OF') {
    this.MainComponent.AD_OCCUPANCY_TYPE.setReadOnly(true);
    this.MainComponent.AD_OCCUPANCY_STATUS.setReadOnly(true);
  } else {
    this.MainComponent.AD_OCCUPANCY_TYPE.setReadOnly(false);
    this.MainComponent.AD_OCCUPANCY_STATUS.setReadOnly(false);
}
}
}

