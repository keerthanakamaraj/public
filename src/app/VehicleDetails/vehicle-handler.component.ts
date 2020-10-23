import { Component, OnInit, Input } from '@angular/core';
import { VehicleDetailsComponent} from './VehicleDetails.component';
import { FieldComponent } from '../field/field.component';
import { RLOUIHandlerComponent } from '../rlouihandler/rlouihandler.component';

@Component({
  selector: 'app-vehicle-handler',
  template: `<div style="display:none;"></div>`,
  styles: []
})
export class VehicleDetailsHandlerComponent extends RLOUIHandlerComponent implements OnInit {
	@Input() MainComponent: VehicleDetailsComponent;

  formName: string = "VehicleDetails";
	  ngOnInit() {
    // ngOnInit
  }

  // OnFormLoad
  onFormLoad(arg0: {}) {
    console.log("vehicle .. On form load");
    super.onFormLoad({});
    //this.MainComponent.CD_THIRD_NAME.setHidden(true);
  }
  
  FundsbyCustomerOnblur(){
    if(this.MainComponent.hidExchangeRate.getFieldValue() !== undefined && this.MainComponent.FundsbyCustomer.getFieldValue() !== undefined){
      let CurrenyExchangeValue = this.MainComponent.hidExchangeRate.getFieldValue() * this.MainComponent.FundsbyCustomer.getFieldValue();
      this.MainComponent.LocalCurrencyEquivalent.setValue(CurrenyExchangeValue);
    }
  }

 }
 

