import { Component, OnInit, Input } from '@angular/core';
import { FeesChargesDetailsComponent } from './Fees&ChargesDetails.component';
import { FieldComponent } from '../field/field.component';
import { RLOUIHandlerComponent } from '../rlouihandler/rlouihandler.component';

@Component({
  selector: 'app-feescharges-handler',
  template: `<div style="display:none;"></div>`,
  styles: []
})
export class FeesChargesDetailsHandlerComponent extends RLOUIHandlerComponent implements OnInit {
	@Input() MainComponent: FeesChargesDetailsComponent;
	formName: string = "ChargeDetails";
	  ngOnInit() {
    // ngOnInit
  }

  // OnFormLoad
  onFormLoad(arg0: {}) {
    console.log("fees and charges  .. On form load");
    //this.MainComponent.CD_THIRD_NAME.setHidden(true);
    super.onFormLoad({});
  }
 

  hideShowFieldBasedOnChargeBasis(){
    if((this.MainComponent.ChargeBasis.getDefault() == "RATE" && this.MainComponent.ChargeBasis.getFieldValue() == "RATE")||(this.MainComponent.ChargeBasis.getDefault() == "RATE" && this.MainComponent.ChargeBasis.getFieldValue() == undefined)){
      this.MainComponent.Currency.setHidden(true);
      this.MainComponent.ChargeAmt.setHidden(true);
      this.MainComponent.LocalAmount.setHidden(true);
      this.MainComponent.ChargeRate.setHidden(false);
      this.MainComponent.RateOnCharge.setHidden(false);
      this.MainComponent.EffectiveAmount.setHidden(false);
      this.MainComponent.Currency.setValue(undefined);
      this.MainComponent.ChargeAmt.setValue(undefined);
      this.MainComponent.LocalAmount.setValue(undefined);
      this.MainComponent.EffectiveAmount.mandatory= true;
      this.MainComponent.RateOnCharge.mandatory = true;
      this.MainComponent.ChargeRate.mandatory = true;
    }
    else if((this.MainComponent.ChargeBasis.getFieldValue() == "AMOUNT" && this.MainComponent.ChargeBasis.getDefault() == "RATE") )
    {
      this.MainComponent.Currency.setHidden(false);
      this.MainComponent.ChargeAmt.setHidden(false);
      this.MainComponent.LocalAmount.setHidden(false);
      this.MainComponent.ChargeRate.setHidden(true);
      this.MainComponent.RateOnCharge.setHidden(true);
      this.MainComponent.EffectiveAmount.setHidden(true);
      this.MainComponent.ChargeRate.setValue(undefined);
      this.MainComponent.RateOnCharge.setValue(undefined);
      this.MainComponent.EffectiveAmount.mandatory= false;
      this.MainComponent.RateOnCharge.mandatory = false;
      this.MainComponent.ChargeRate.mandatory = false;

    }
  }

  hideFieldBasedOnPeriodicCharge(){
    if(this.MainComponent.PeriodicCharge.getFieldValue() == 'N'){
      this.MainComponent.PeriodicStDt.setHidden(true);
      this.MainComponent.PeriodicEnDt.setHidden(true);
      this.MainComponent.PeriodicStDt.setValue(undefined);
    this.MainComponent.PeriodicEnDt.setValue(undefined);
    this.MainComponent.Frequency.setReadOnly(true);
    this.MainComponent.Frequency.mandatory = false;

    }
    else{
      this.MainComponent.PeriodicStDt.setHidden(false);
      this.MainComponent.PeriodicEnDt.setHidden(false);
      this.MainComponent.Frequency.setReadOnly(false);
      this.MainComponent.Frequency.mandatory = true;
    }
  } 
  chargeAmountcharOnblur(){
    if(this.MainComponent.hidExchangeRate.getFieldValue() !== undefined && this.MainComponent.ChargeAmt.getFieldValue() !== undefined){
      let CurrenyExchangeValue = this.MainComponent.hidExchangeRate.getFieldValue() * this.MainComponent.ChargeAmt.getFieldValue();
      this.MainComponent.LocalAmount.setValue(CurrenyExchangeValue.toFixed(2));
    }
  }
  calculateEffectiveAmount(){
   
    if(this.MainComponent.ChargeRate.getFieldValue() !== undefined && this.MainComponent.RateOnCharge.getFieldValue() !== undefined ){
      var CalcEffectiveAmount ;
      if(this.MainComponent.RateOnCharge.getFieldValue() == 'INTEREST'){
        CalcEffectiveAmount = (this.MainComponent.NetInterestRate / 100) * this.MainComponent.LoanAmount * (this.MainComponent.ChargeRate.getFieldValue()/100);
      }
      else if(this.MainComponent.RateOnCharge.getFieldValue() == 'PRINCIPAL'){
        CalcEffectiveAmount = this.MainComponent.LoanAmount*(this.MainComponent.ChargeRate.getFieldValue()/100);
      }
      else if(this.MainComponent.RateOnCharge.getFieldValue() == 'CATM'){
        CalcEffectiveAmount = this.MainComponent.LoanAmount*(this.MainComponent.ChargeRate.getFieldValue()/100)*(this.MainComponent.InterestRate/100);
      }
      this.MainComponent.EffectiveAmount.setValue(CalcEffectiveAmount.toFixed(2));
    }
   
  }

  hideFiedlBasedonChargeType(){
    if(this.MainComponent.ChargeType.getFieldValue() == 'Payable'){
      this.MainComponent.PartyTypeReceivable.setHidden(true);
      this.MainComponent.PartyTypePayable.setHidden(false);
    }
    else{
      this.MainComponent.PartyTypeReceivable.setHidden(true);
      this.MainComponent.PartyTypePayable.setHidden(false);
    }
  }
 }

