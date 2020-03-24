import { Component, OnInit, Input } from '@angular/core';
import { AddressDetailsComponent } from './AddressDetails.component';
import { FieldComponent } from '../field/field.component';

@Component({
  selector: 'app-address-handler',
  template: `<div style="display:none;"></div>`,
  styles: []
})
export class AddressHandlerComponent implements OnInit {
  @Input() MainComponent: AddressDetailsComponent;
  
  ngOnInit() {
    // ngOnInit
  }

  // OnFormLoad
  onFormLoad(arg0: {}) {
    console.log("address is onload");
  
	}

  
}

