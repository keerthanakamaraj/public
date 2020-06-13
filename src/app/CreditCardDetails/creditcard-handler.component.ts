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

}

