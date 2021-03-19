import { Component, OnInit, Input } from '@angular/core';
import { FieldComponent } from '../field/field.component';
import { RLOUIHandlerComponent } from '../rlouihandler/rlouihandler.component';
import { LoanTopupDetailsComponent } from './LoanTopupDetails.component';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-topup-handler',
  template: `<div style="display:none;"></div>`,
  styles: []
})
export class LoanTopupHandlerComponent extends RLOUIHandlerComponent implements OnInit {
  @Input() MainComponent: LoanTopupDetailsComponent;

  formName: string = 'LoanTopupDetails';
  fieldArray: any[];
  customers = [];
  ngOnInit() {
    // ngOnInit
  }

  // OnFormLoad
  onFormLoad(arg0: {}) {
    console.log("Loan .. On form load");
    super.onFormLoad({});

    //this.MainComponent.CD_THIRD_NAME.setHidden(true);
  }

  RepaymentFrequencyChange(){
    if(this.MainComponent.Tenure.getFieldValue() != undefined && this.MainComponent.RepaymentFrequency.getFieldValue() != undefined){
      if(this.MainComponent.RepaymentFrequency.getFieldValue() == 'Y'){
        this.MainComponent.NoOfInstallments.setValue(this.MainComponent.Tenure.getFieldValue());
      }else if(this.MainComponent.RepaymentFrequency.getFieldValue() == 'M')
      {
        this.MainComponent.NoOfInstallments.setValue(this.MainComponent.Tenure.getFieldValue()*12);
      }
      else if(this.MainComponent.RepaymentFrequency.getFieldValue() == 'W')
      {
        this.MainComponent.NoOfInstallments.setValue(this.MainComponent.Tenure.getFieldValue()*12*4);
      }
      else if(this.MainComponent.RepaymentFrequency.getFieldValue() == 'D')
      {
        this.MainComponent.NoOfInstallments.setValue(this.MainComponent.Tenure.getFieldValue()*12*4*7);
      }
    }
  
  }

  TopupAmountBlur(){
    if(this.MainComponent.TopupAmount.getFieldValue() != undefined && this.MainComponent.OutstandingLoanBal.getFieldValue() != undefined){
      this.MainComponent.RevisedAmount.setValue(this.MainComponent.OutstandingLoanBal.getFieldValue() + this.MainComponent.TopupAmount.getFieldValue());
    }
  }

  CalculateNetInterestRate() {
    let CalculateNetInterest;
    if (this.MainComponent.InterestRate.getFieldValue() !== undefined && this.MainComponent.InterestRate.getFieldValue() !== undefined) {
      //  let store : string ;
      if (this.MainComponent.MarginRate.getFieldValue().startsWith('+')) {
        const storePositive = this.MainComponent.MarginRate.getFieldValue().split("+").join(0);
        CalculateNetInterest = Number(this.MainComponent.MarginRate.getFieldValue()) + Number(storePositive)
      }

      else if (this.MainComponent.MarginRate.getFieldValue().startsWith('-')) {
        const storeNegative = this.MainComponent.MarginRate.getFieldValue().split("-").join(0);
        CalculateNetInterest = Number(this.MainComponent.InterestRate.getFieldValue()) - Number(storeNegative)
      } else {
        CalculateNetInterest = Number(this.MainComponent.InterestRate.getFieldValue()) + Number(this.MainComponent.MarginRate.getFieldValue())
      }

      this.MainComponent.TopupNetInstRate.setValue(CalculateNetInterest.toFixed(2));

    }

  }
  
  async doAPIForCustomerList() {
    this.customers = [];
    let inputMap = new Map();
    inputMap.clear(); 
    inputMap.set('PathParam.BorrowerSeq', '4151');
    
      this.MainComponent.services.http.fetchApi('/BorrowerDetails/{BorrowerSeq}', 'GET', inputMap, "/initiation").subscribe(
        async (httpResponse: HttpResponse<any>) => {
          var res = httpResponse.body;
          this.customers.push(res.BorrowerDetails)
          console.log("BorrowerResponse",res);         
        }
      );
    

  }

  public getBorrowerPostData() {
    var CustData = [];
    if (this.customers) {
      for (var i = 0; i < this.customers.length; i++) {
        var tempObj = {};
        console.log("CustData", this.customers[i]);
        tempObj['CustomerType'] = this.customers[i].CustomerType;
        tempObj['ExistingCustomer'] = this.customers[i].ExistingCustomer;
        tempObj['CIF'] = this.customers[i].CIF;
        tempObj['Title'] = this.customers[i].Title;
        tempObj['FirstName'] = this.customers[i].FirstName;
        tempObj['MiddleName'] = this.customers[i].MiddleName;
        tempObj['LastName'] = this.customers[i].LastName;
        tempObj['FullName'] = this.customers[i].FullName;
        tempObj['Gender'] = this.customers[i].Gender;
        tempObj['DOB'] = this.customers[i].DOB;
        tempObj['TaxID'] = this.customers[i].TaxID;
        tempObj['MobileNo'] = this.customers[i].TaxID;
        tempObj['DebitScore'] = this.customers[i].DebitScore;
        tempObj['CustomerSegment'] = this.customers[i].CustomerSegment;
        tempObj['IsStaff'] = this.customers[i].IsStaff;
        tempObj['StaffID'] = this.customers[i].StaffID;
        tempObj['ICIFNumber'] = this.customers[i].ICIFNumber;
         tempObj['LoanOwnership'] = '100';
        tempObj['Email'] = this.customers[i].Email;
        tempObj['ISDCountryCode'] = this.customers[i].ISDCountryCode;
        tempObj['PrimaryEmbosserName1'] = this.customers[i].PrimaryEmbosserName1;

      
        CustData.push(tempObj);

      }

    }
    return CustData;
  }

  CalculateEMI() {
    let amount = this.MainComponent.LoanAmount.getFieldValue();
    let rate = this.MainComponent.NetInterestRate.getFieldValue();
    let months = this.MainComponent.Tenure.getFieldValue();
    if (this.MainComponent.TenureCode == 'YRS') {
      let years = this.MainComponent.Tenure.getFieldValue() * 12;
      months = years;
    } else if (this.MainComponent.TenureCode.getFieldValue() == 'WEEK') {
      let weeks = this.MainComponent.Tenure.getFieldValue() / 4.345;
      months = weeks;
    }
    else if (this.MainComponent.TenureCode.getFieldValue() == 'DAY') {
      let weeks = this.MainComponent.Tenure.getFieldValue() / 30.417;
      months = weeks;
    }
    let EMI = amount * rate / (1 - (Math.pow(1 / (1 + rate), months)));
    return EMI.toFixed(2);

  }

  CalculateToupEMI() {
    let amount = this.MainComponent.RevisedAmount.getFieldValue();
    let rate = this.MainComponent.TopupNetInstRate.getFieldValue() / 1200;
    let months = this.MainComponent.LD_TENURE.getFieldValue();
    if (this.MainComponent.TenureCode == 'YRS') {
      let years = this.MainComponent.LD_TENURE.getFieldValue() * 12;
      months = years;
    } else if (this.MainComponent.LD_TENURE_PERIOD.getFieldValue() == 'WEEK') {
      let weeks = this.MainComponent.LD_TENURE.getFieldValue() / 4.345;
      months = weeks;
    }
    else if (this.MainComponent.LD_TENURE_PERIOD.getFieldValue() == 'DAY') {
      let weeks = this.MainComponent.LD_TENURE.getFieldValue() / 30.417;
      months = weeks;
    }
    let EMI = amount * rate / (1 - (Math.pow(1 / (1 + rate), months)));
    return EMI.toFixed(2);

  }
}



