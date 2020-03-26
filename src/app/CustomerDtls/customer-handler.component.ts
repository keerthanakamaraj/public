import { Component, OnInit, Input } from '@angular/core';
import { CustomerDtlsComponent} from './CustomerDtls.component';
import { FieldComponent } from '../field/field.component';

@Component({
  selector: 'app-customer-handler',
  template: `<div style="display:none;"></div>`,
  styles: []
})
export class CustomerHandlerComponent implements OnInit {
	@Input() MainComponent: CustomerDtlsComponent;
	
	  ngOnInit() {
    // ngOnInit
  }

  // OnFormLoad
  onFormLoad(arg0: {}) {
    console.log("customer .. On form load");
    //this.MainComponent.CD_THIRD_NAME.setHidden(true);
	}

 }

