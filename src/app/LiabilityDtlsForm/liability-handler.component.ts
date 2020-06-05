import { Component, OnInit, Input } from '@angular/core';
import { LiabilityDtlsFormComponent} from './LiabilityDtlsForm.component';
import { FieldComponent } from '../field/field.component';
import { RLOUIHandlerComponent } from '../rlouihandler/rlouihandler.component';


@Component({
  selector: 'app-liability-handler',
  template: `<div style="display:none;"></div>`,
  styles: []
})
export class LiabilityHandlerComponent extends RLOUIHandlerComponent implements OnInit {
  @Input() MainComponent: LiabilityDtlsFormComponent;
  
  formName: string = "LiabilityDetails";
	
	  ngOnInit() {
    // ngOnInit
  }

  // OnFormLoad
  onFormLoad(arg0: {}) {
    console.log("Liability .. On form load");
    //this.MainComponent.CD_THIRD_NAME.setHidden(true);
    super.onFormLoad({});
	}
  hideObligationField({ }){
    if(this.MainComponent.LD_LIABILITY_TYPE.getFieldValue() == 'O'){
    this.MainComponent.isObligation = false;
      this.MainComponent.LD_LOAN_AMOUNT.mandatory = false;
      this.MainComponent.LD_CURRENCY.mandatory = false;
      this.MainComponent.LD_EQUIVALENT_AMOUNT.mandatory = false;
      this.MainComponent.LD_INCLUDE_IN_DBR.mandatory = false;
      this.MainComponent.LD_LOAN_EMI_FREQUENCY.mandatory = false;
  
    }else{
      this.MainComponent.isObligation = true;
      // this.MainComponent.LD_LOAN_AMOUNT.mandatory = true;
      this.MainComponent.LD_CURRENCY.mandatory = true;
      this.MainComponent.LD_EQUIVALENT_AMOUNT.mandatory = true;
      this.MainComponent.LD_INCLUDE_IN_DBR.mandatory = true;
      this.MainComponent.LD_LOAN_EMI_FREQUENCY.mandatory = true;
      this.MainComponent.LD_LOAN_AMOUNT.mandatory = true;
    }
    // if(this.MainComponent.LD_LIABILITY_TYPE.getFieldValue() == 'L'){
    //   this.MainComponent.LD_OBLIGATION_HEAD.setHidden(true); 
    // }
  }

  calculateLocalCurrEquv(){
    if(this.MainComponent.hidExchangeRate.getFieldValue() !== undefined && this.MainComponent.LD_LOAN_AMOUNT.getFieldValue() !== undefined){
      let CurrenyExchangeValue = this.MainComponent.hidExchangeRate.getFieldValue() * this.MainComponent.LD_LOAN_AMOUNT.getFieldValue();
      this.MainComponent.LD_EQUIVALENT_AMOUNT.setValue(CurrenyExchangeValue.toFixed(2));
    }
  }

 }

