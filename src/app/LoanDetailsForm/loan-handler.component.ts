import { Component, OnInit, Input } from '@angular/core';
import { LoanDetailsFormComponent } from './LoanDetailsForm.component';
import { FieldComponent } from '../field/field.component';
import { RLOUIHandlerComponent } from '../rlouihandler/rlouihandler.component';

@Component({
  selector: 'app-loan-handler',
  template: `<div style="display:none;"></div>`,
  styles: []
})
export class LoanHandlerComponent extends RLOUIHandlerComponent implements OnInit {
  @Input() MainComponent: LoanDetailsFormComponent;

  formName: string = 'LoanDetails';
  fieldArray: any[];
  ngOnInit() {
    // ngOnInit
  }

  // OnFormLoad
  onFormLoad(arg0: {}) {
    console.log("Loan .. On form load");
    super.onFormLoad({});

    //this.MainComponent.CD_THIRD_NAME.setHidden(true);
  }

  FieldsArray() {
    this.fieldArray = [];
    this.fieldArray.push(this.MainComponent.MarginRate, this.MainComponent.Tenure, this.MainComponent.TenurePeriod,
      this.MainComponent.InterestRateType, this.MainComponent.UserRecommendedAmount, this.MainComponent.RepaymentFrequency,
      this.MainComponent.RepaymentOption, this.MainComponent.RepaymentAccNo)
    return this.fieldArray;

  }
  CalculateEMI() {
    let amount = this.MainComponent.LoanAmount.getFieldValue();
    let rate = this.MainComponent.InterestRate.getFieldValue() / 1200;
    let months = this.MainComponent.Tenure.getFieldValue();
    if (this.MainComponent.TenurePeriod.getFieldValue() == 'YRS') {
      let years = this.MainComponent.Tenure.getFieldValue() * 12;
      months = years;
    } else if (this.MainComponent.TenurePeriod.getFieldValue() == 'WEEK') {
      let weeks = this.MainComponent.Tenure.getFieldValue() / 4.345;
      months = weeks;
    }
    else if (this.MainComponent.TenurePeriod.getFieldValue() == 'DAY') {
      let weeks = this.MainComponent.Tenure.getFieldValue() / 30.417;
      months = weeks;
    }
    let EMI = amount * rate / (1 - (Math.pow(1 / (1 + rate), months)));
    return EMI.toFixed(2);

  }
  CalculateNetInterestRate() {
    let CalculateNetInterest;
    if (this.MainComponent.InterestRate.getFieldValue() !== undefined && this.MainComponent.MarginRate.getFieldValue() !== undefined) {
      //  let store : string ;
      if (this.MainComponent.MarginRate.getFieldValue().startsWith('+')) {
        const storePositive = this.MainComponent.MarginRate.getFieldValue().split("+").join(0);
        CalculateNetInterest = Number(this.MainComponent.InterestRate.getFieldValue()) + Number(storePositive)
      }

      else if (this.MainComponent.MarginRate.getFieldValue().startsWith('-')) {
        const storeNegative = this.MainComponent.MarginRate.getFieldValue().split("-").join(0);
        CalculateNetInterest = Number(this.MainComponent.InterestRate.getFieldValue()) - Number(storeNegative)
      } else {
        CalculateNetInterest = Number(this.MainComponent.InterestRate.getFieldValue()) + Number(this.MainComponent.MarginRate.getFieldValue())
      }

      this.MainComponent.NetInterestRate.setValue(CalculateNetInterest.toFixed(2));

    }

  }



  SetValue() {
    if (this.MainComponent.EMIAmount.getFieldValue() == undefined) {
      this.MainComponent.EMIAmount.setValue('0.00')
    }
    if (this.MainComponent.TotalInstallmentAmt.getFieldValue() == undefined) {
      this.MainComponent.TotalInstallmentAmt.setValue('-NA-')
    }
    if (this.MainComponent.TotalInterestAmount.getFieldValue() == undefined) {
      this.MainComponent.TotalInterestAmount.setValue('-NA-')
    }
    if (this.MainComponent.MarginMoney.getFieldValue() == undefined) {
      this.MainComponent.MarginMoney.setValue('0.00')
    }
    if (this.MainComponent.TotalFeeAdjWithDist.getFieldValue() == undefined) {
      this.MainComponent.TotalFeeAdjWithDist.setValue('0.00')
    }
     if (this.MainComponent.TotalFeeCollUpfront.getFieldValue() == undefined) {
      this.MainComponent.TotalFeeCollUpfront.setValue('0.00')
    } 
    if (this.MainComponent.TotalLoanAmt.getFieldValue() == undefined) {
      this.MainComponent.TotalLoanAmt.setValue('0.00')
    } 
    if (this.MainComponent.TotaDistlAmt.getFieldValue() == undefined) {
      this.MainComponent.TotaDistlAmt.setValue('0.00')
    }
  }

}



