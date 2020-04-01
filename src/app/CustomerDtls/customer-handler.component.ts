import { Component, OnInit, Input } from '@angular/core';
import { CustomerDtlsComponent} from './CustomerDtls.component';
import { FieldComponent } from '../field/field.component';
import { RLOUIHandlerComponent } from 'src/app/rlouihandler/rlouihandler.component';

@Component({
  selector: 'app-customer-handler',
  template: `<div style="display:none;"></div>`,
  styles: []
})
export class CustomerHandlerComponent extends RLOUIHandlerComponent implements OnInit {
	@Input() MainComponent: CustomerDtlsComponent;
	formName: string = "CustomerDetails";
	  ngOnInit() {
    // ngOnInit
  }

  // OnFormLoad
  onFormLoad(arg0: {}) {
    console.log("customer .. On form load");
    super.onFormLoad({});
    this.MainComponent.CD_THIRD_NAME.setHidden(true);
    // this.MainComponent.CD_THIRD_NAME.setHidden(true);
  }
  
  updateFullName(arg0: {}) {
    let fullName = "";
    if (this.MainComponent.CD_FIRST_NAME.getFieldValue()) {
      fullName = fullName + this.MainComponent.CD_FIRST_NAME.getFieldValue() + " ";
    }
    if (this.MainComponent.CD_MIDDLE_NAME.getFieldValue()) {
      fullName = fullName + this.MainComponent.CD_MIDDLE_NAME.getFieldValue() + " ";
    }
    if (this.MainComponent.CD_THIRD_NAME.getFieldValue()) {
      fullName = fullName + " " + this.MainComponent.CD_THIRD_NAME.getFieldValue() + " ";
    }
    if (this.MainComponent.CD_LAST_NAME.getFieldValue()) {
      fullName = fullName + " " + this.MainComponent.CD_LAST_NAME.getFieldValue() + " ";
    }
    fullName.trim();
    this.MainComponent.CD_FULL_NAME.setValue(fullName);
  }

 }

