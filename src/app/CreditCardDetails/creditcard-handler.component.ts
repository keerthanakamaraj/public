import { Component, OnInit, Input } from '@angular/core';
import { CreditCardDetailsComponent} from './CreditCardDetails.component';
import { FieldComponent } from '../field/field.component';

@Component({
  selector: 'app-creditcard-handler',
  template: `<div style="display:none;"></div>`,
  styles: []
})
export class CreditCardHandlerComponent implements OnInit {
	@Input() MainComponent: CreditCardDetailsComponent;
  formName: string = "CreditCardDetails";
	  ngOnInit() {
    // ngOnInit
  }

  // OnFormLoad
  onFormLoad(arg0: {}) {
    console.log("CreditCard .. On form load");
    //this.MainComponent.CD_THIRD_NAME.setHidden(true);
	}

 }

