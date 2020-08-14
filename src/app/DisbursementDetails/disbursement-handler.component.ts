import { Component, OnInit, Input } from '@angular/core';
import { FieldComponent } from '../field/field.component';
import { RLOUIHandlerComponent } from '../rlouihandler/rlouihandler.component';
import { DisbursementDetailsComponent } from 'src/app/DisbursementDetails/DisbursementDetails.component';

@Component({
  selector: 'app-disbursement-handler',
  template: `<div style="display:none;"></div>`,
  styles: []
})
export class DisbursementsHandlerComponent extends RLOUIHandlerComponent implements OnInit {
  @Input() MainComponent: DisbursementDetailsComponent;
  formName: string = "DisbursementDetails";

  ngOnInit() {
   
  }
	
	onFormLoad(arg0: {}) {
    console.log("Disbursement Details Load ");
    //this.MainComponent.CD_THIRD_NAME.setHidden(true);
    super.onFormLoad({});
  }

  calculateLocalCurrEquv(){
    if(this.MainComponent.hidExchangeRate.getFieldValue() !== undefined && this.MainComponent.Amount.getFieldValue() !== undefined){
      let CurrenyExchangeValue = this.MainComponent.hidExchangeRate.getFieldValue() * this.MainComponent.Amount.getFieldValue();
      this.MainComponent.LocalCurrencyEquivalent.setValue(CurrenyExchangeValue.toFixed(2));
    }
  }

  hideOnPaymentMode({}){
    if(this.MainComponent.PaymentMode.getFieldValue()== 'cash'){
      this.MainComponent.IFSCCode.setHidden(true); 
      this.MainComponent.FundTransferMode.setHidden(true);
      this.MainComponent.Account.setHidden(true);
      this.MainComponent.InFavorOf.setHidden(true); 
      this.MainComponent.IFSCCode.mandatory = false; 
      this.MainComponent.FundTransferMode.mandatory = false;
      this.MainComponent.Account.mandatory = false;
      this.MainComponent.InFavorOf.mandatory = false;
    }
    if(this.MainComponent.PaymentMode.getFieldValue()== 'cheque' ||this.MainComponent.PaymentMode.getFieldValue()== 'DD'){
      this.MainComponent.IFSCCode.setHidden(true); 
      this.MainComponent.FundTransferMode.setHidden(true);
      this.MainComponent.Account.setHidden(true); 
      this.MainComponent.InFavorOf.setHidden(false);
      this.MainComponent.InFavorOf.mandatory = true;      
      this.MainComponent.IFSCCode.mandatory = false; 
      this.MainComponent.FundTransferMode.mandatory = false;
      this.MainComponent.Account.mandatory = false;
      
    }
    if(this.MainComponent.PaymentMode.getFieldValue() == 'FT'){
      this.MainComponent.IFSCCode.setHidden(false); 
      this.MainComponent.FundTransferMode.setHidden(false);
      this.MainComponent.Account.setHidden(false);
      this.MainComponent.InFavorOf.setHidden(true);
      this.MainComponent.IFSCCode.mandatory = true; 
      this.MainComponent.FundTransferMode.mandatory = true;
      this.MainComponent.Account.mandatory = true;
      this.MainComponent.InFavorOf.mandatory = false;
    }
  }
  

  }

