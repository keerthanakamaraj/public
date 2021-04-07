import { Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import { LoanTopupDetailsModel } from './LoanTopupDetails.model';
import { ComboBoxComponent } from '../combo-box/combo-box.component';
import { TextBoxComponent } from '../text-box/text-box.component';
import { TextAreaComponent } from '../text-area/text-area.component';
import { CheckBoxComponent } from '../check-box/check-box.component';
import { HiddenComponent } from '../hidden/hidden.component';
import { FileuploadComponent } from '../fileupload/fileupload.component';
import { DateComponent } from '../date/date.component';
import { ButtonComponent } from '../button/button.component';
import { AmountComponent } from '../amount/amount.component';
import { FormComponent } from '../form/form.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PopupModalComponent } from '../popup-modal/popup-modal.component';
import { ServiceStock } from '../service-stock.service';
import { LabelComponent } from '../label/label.component';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { compareFunction } from 'angular-dual-listbox';
import { IAmortizationForm, IRepaymentSchedule } from '../Interface/masterInterface';
import { IModalData } from '../popup-alert/popup-interface';
import { AmortizationGridComponent } from '../AmortizationGrid/AmortizationGrid.component';
import { LoanTopupHandlerComponent } from './LoanTopup-handler.component';
import { Subscription } from 'rxjs';
import { RLOUIRadioComponent } from '../rlo-ui-radio/rlo-ui-radio.component';
import { element } from 'protractor';
// import moment = require('moment');


const customCss: string = '';

@Component({
selector: 'app-LoanTopupDetails',
templateUrl: './LoanTopupDetails.component.html'
})
export class LoanTopupDetailsComponent extends FormComponent implements OnInit, AfterViewInit {
@ViewChild('CifNo', { static: false }) CifNo: TextBoxComponent;
@ViewChild('CustName', { static: false }) CustName: TextBoxComponent;
@ViewChild('Product', { static: false }) Product: TextBoxComponent;
@ViewChild('SubProduct', { static: false }) SubProduct: TextBoxComponent;
@ViewChild('LoanAccNo', { static: false }) LoanAccNo: ComboBoxComponent;
@ViewChild('LoandistDate', { static: false }) LoandistDate: DateComponent;
@ViewChild('OutstandingLoanBal', { static: false }) OutstandingLoanBal: AmountComponent;
@ViewChild('NetInterestRate', { static: false }) NetInterestRate: TextBoxComponent;
@ViewChild('Tenure', { static: false }) Tenure: TextBoxComponent;
@ViewChild('LoanRepaymentSchedule', { static: false }) LoanRepaymentSchedule: ButtonComponent;
@ViewChild('TopupRepaymentSchedule', { static: false }) TopupRepaymentSchedule: ButtonComponent;
@ViewChild('TopupAmount', { static: false }) TopupAmount: AmountComponent;
@ViewChild('RevisedAmount', { static: false }) RevisedAmount: AmountComponent;
@ViewChild('InterestRate', { static: false }) InterestRate: TextBoxComponent;
@ViewChild('MarginRate', { static: false }) MarginRate: TextBoxComponent;
@ViewChild('TopupNetInstRate', { static: false }) TopupNetInstRate: TextBoxComponent;
@ViewChild('LD_TENURE', { static: false }) LD_TENURE: TextBoxComponent;
@ViewChild('LD_TENURE_PERIOD', { static: false }) LD_TENURE_PERIOD: ComboBoxComponent;
@ViewChild('BAD_APP_PRPSE', { static: false }) BAD_APP_PRPSE: ComboBoxComponent;
@ViewChild('DisbursalDate', { static: false }) DisbursalDate: TextBoxComponent;
@ViewChild('LoanAmount', { static: false }) LoanAmount: TextBoxComponent;

@ViewChild('RepaymentFrequency', { static: false }) RepaymentFrequency: ComboBoxComponent;
@ViewChild('NoOfInstallments', { static: false }) NoOfInstallments: TextBoxComponent;
@ViewChild('DisbursalAccount', { static: false }) DisbursalAccount: TextBoxComponent;
@ViewChild('RequiredEMIAmt', { static: false }) RequiredEMIAmt: AmountComponent;
@ViewChild('RepaymentDate', { static: false }) RepaymentDate: DateComponent;
@ViewChild('hideAppPurpose', { static: false }) hideAppPurpose: HiddenComponent;
@ViewChild('hideTenurePeriod', { static: false }) hideTenurePeriod: HiddenComponent;
@ViewChild('hidAppId', { static: false }) hidAppId: HiddenComponent;
@ViewChild('hidtopDisbursal', { static: false }) hidtopDisbursal: HiddenComponent;
@ViewChild('hideRepaymentFreq', { static: false }) hideRepaymentFreq: HiddenComponent;
@ViewChild('AmortizationGrid', { static: false }) AmortizationGrid: AmortizationGridComponent;
@ViewChild('SUBMIT_MAIN_BTN', { static: false }) SUBMIT_MAIN_BTN: ButtonComponent;
@ViewChild('CANCEL_MAIN_BTN', { static: false }) CANCEL_MAIN_BTN: ButtonComponent;
@ViewChild('TopupDisbursal', { static: false }) TopupDisbursal: RLOUIRadioComponent;


@ViewChild('Handler', { static: false }) Handler: LoanTopupHandlerComponent;


@ViewChild('Clear', { static: false }) Clear: ButtonComponent;
editableFlag: boolean = true;
repaymentFormData: IRepaymentSchedule = {};
    borrowericif: string;
  // LoanAmount: any;
  ProductCode: any;
  SubProductCode: any;
  TenureCode: any;
  LoanNoOfInstallments: any;
  LoanRepaymentDate: any;
  monthlyinstallmentAmt: any;
  EMIAmount: any;
  modalDataSubjectSubscription: Subscription;
  TopupFlag: boolean;
  FilterOptions: any[];
  LoanAccountList: any[];

async revalidate(): Promise<number> {
var totalErrors = 0;
super.beforeRevalidate();
await Promise.all([
    this.revalidateBasicField('CifNo'),
    this.revalidateBasicField('CustName'),
    this.revalidateBasicField('Product'),
    this.revalidateBasicField('SubProduct'),
    this.revalidateBasicField('LoanAccNo'),
    this.revalidateBasicField('LoandistDate'),
    this.revalidateBasicField('OutstandingLoanBal'),
    this.revalidateBasicField('NetInterestRate'),
    this.revalidateBasicField('Tenure'),
    this.revalidateBasicField('RevisedAmount'),

    this.revalidateBasicField('InterestRate'),
    this.revalidateBasicField('MarginRate'),
    this.revalidateBasicField('TopupNetInstRate'),

    this.revalidateBasicField('LD_TENURE'),
    this.revalidateBasicField('LD_TENURE_PERIOD'),
    this.revalidateBasicField('CifNo'),

    this.revalidateBasicField('BAD_APP_PRPSE'),
    this.revalidateBasicField('DisbursalDate'),
    this.revalidateBasicField('RepaymentFrequency'),
    this.revalidateBasicField('NoOfInstallments'),
    this.revalidateBasicField('RequiredEMIAmt'),
    this.revalidateBasicField('RepaymentDate'),
    this.revalidateBasicField('DisbursalAccount'),
    this.revalidateBasicField('TopupDisbursal')

]).then((errorCounts) => {
errorCounts.forEach((errorCount)=>{
totalErrors+=errorCount;
});
});
this.errors = totalErrors;
super.afterRevalidate();
return totalErrors;
}
constructor(services: ServiceStock){
super(services);
this.value = new LoanTopupDetailsModel();
this.componentCode = 'LoanTopupDetails';
this.modalDataSubjectSubscription = this.services.rloCommonData.modalDataSubject.subscribe((event) => {
  console.log("Amortr :::: ", event);
  if ('passAmortizationDtls' == event.action && !this.TopupFlag) {
    this.populateAmortizationReturnedData(event.data);
    event.action = undefined;
  }else if('passAmortizationDtls' == event.action && this.TopupFlag){
    this.populateAmortizationTopupReturnedData(event.data);
    event.action = undefined;
  }
});
}
setReadOnly(readOnly){
super.setBasicFieldsReadOnly(readOnly);
}
async onFormLoad(){
  console.log("Print console");
this.setInputs(this.services.dataStore.getData(this.services.routing.currModal));
this.hideAppPurpose.setValue('APPLICATION_PURPOSE');
this.hideTenurePeriod.setValue('PERIOD');
 this.hideRepaymentFreq.setValue('FREQUENCY');
 this.hidtopDisbursal.setValue('TopupDisbursal');
 this.hidAppId.setValue('RLO');
 this.TopupDisbursal.setDefault('LoanRollover');
 this.Handler.doAPIForCustomerList();
 
 await this.Handler.onFormLoad({
});
this.setDependencies();


}
TopupAmount_blur(event){
    // this.RevisedAmount.setReadOnly(false);
    // this.InterestRate.setReadOnly(false);
    // this.TopupNetInstRate.setReadOnly(false);
    // this.NoOfInstallments.setReadOnly(false);
    // this.NetInterestRate.setReadOnly(false);
    this.Handler.TopupAmountBlur();
   
}
CifNo_blur(){
  this.LoanAccountList = [];
  let inputMap = new Map();
  inputMap.clear();
   inputMap.set('QueryParam.customerNumber', this.CifNo.getFieldValue())

  this.services.http.fetchApi('/fetchExistLoanDetails', 'GET', inputMap, '/rlo-de').subscribe(
    async (httpResponse: HttpResponse<any>) => {
      var res = httpResponse.body;
    
      
          if(this.CifNo.getFieldValue() !=undefined){
            console.log("LoanAccountDetails",res);
            this.LoanAccountList = res.listOfLoans;

            this.setFilterbyOptions(this.LoanAccountList);
      //  this.CustName.setValue('John Anderson');
      //  this.LoanAmount = '5000';
      //  this.OutstandingLoanBal.setValue("1168.95");
      //  this.Product.setValue('Personal Loan');
      //  this.SubProduct.setValue('Personal Loan');
      //  this.LoandistDate.setValue('15-09-2019');
      //  this.NetInterestRate.setValue('1.2');
      //  this.InterestRate.setValue(res['ExistingLoan']['TopUpInterestRate']);
      //  this.LoanAccNo.setValue('0111005900779');
      //  this.Tenure.setValue('12');
      //  this.ProductCode =  res['ExistingLoan']['ProductCode'];
      //  this.SubProductCode = res['ExistingLoan']['SpecificProductCode'];
      //  this.TenureCode = 'M';
      //  this.DisbursalAccount.setValue('23354345');
      //  this.LoanNoOfInstallments =  this.Tenure.getFieldValue();
      //  this.LoanRepaymentDate = '15-10-2019';
     }
     
    },
    async (httpError) => {
      var err = httpError['error']
     
    
     
    }
  );
}

setFilterbyOptions(LoanAccountList) {
  // let tempCustomerList = this.services.rloCommonData.getCustomerList();
  this.FilterOptions = [];
  // this.PartyName.onReset();
  this.FilterOptions.push({ id: undefined, text: "" });

  LoanAccountList.forEach(element => {
    
      this.FilterOptions.push({ id: element.loanAccountNumber, text: element.loanAccountNumber });
    
  });
  // console.log("shweta :: score options list", this.FilterOptions);
  this.LoanAccNo.setStaticListOptions(this.FilterOptions);
}
isPepaymentDate(selectedDate) {
  const moment = require('moment');
  const currentDate = moment();
  currentDate.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
  selectedDate = moment(selectedDate._i).add(1,'months');

  
}



LoanAccNo_blur(){
  const moment = require('moment');
  this.LoanAccountList.forEach(element => {
    if(element.loanAccountNumber == this.LoanAccNo.getFieldValue()){
       this.CustName.setValue('John Anderson');
       this.LoanAmount.setValue(element.loanAmount);
       this.OutstandingLoanBal.setValue(element.totalLoanOutstanding);
       this.Product.setValue('Personal Loan Secured');
       this.SubProduct.setValue('Loan Against Shares');
       this.LoandistDate.setValue('15-09-2019');
       this.NetInterestRate.setValue(element.netInterestRate);
       
      
      //  this.LoanRepaymentDate = element.loanMaturityDate;
       this.InterestRate.setValue('7');
        // this.LoanAccNo.setValue(element.loanAccountNumber);
        this.Tenure.setValue('12');
        this.ProductCode = 'PERSEC';
        this.SubProductCode = 'PERCAS';
       this.TenureCode = 'M';
       let date_R = this.LoandistDate.getFieldValue()
       this.isPepaymentDate(this.LoandistDate.getFieldValue())
          //  this.LoanRepaymentDate.getFieldValue(moment(date_R.moment).add(1,'months'))
      //  let Date_R = this.LoandistDate.getFieldValue();
      // console.log("month",Date_R.getMonth() + 3);
      //  this.LoanRepaymentDate.setMonth(this.LoandistDate.getFieldValue().getMonth() + 3); 
      //  this.DisbursalAccount.setValue('23354345');
       this.LoanNoOfInstallments =  this.Tenure.getFieldValue();
        this.LoanRepaymentDate = '15-1-2020';
      
    }
  });

  
  //  this.CustName.setValue('John Anderson');
      //  this.LoanAmount = '5000';
      //  this.OutstandingLoanBal.setValue("1168.95");
      //  this.Product.setValue('Personal Loan');
      //  this.SubProduct.setValue('Personal Loan');
      //  this.LoandistDate.setValue('15-09-2019');
      //  this.NetInterestRate.setValue('1.2');
      //  this.InterestRate.setValue(res['ExistingLoan']['TopUpInterestRate']);
      //  this.LoanAccNo.setValue('0111005900779');
      //  this.Tenure.setValue('12');
      //  this.ProductCode =  res['ExistingLoan']['ProductCode'];
      //  this.SubProductCode = res['ExistingLoan']['SpecificProductCode'];
      //  this.TenureCode = 'M';
      //  this.DisbursalAccount.setValue('23354345');
      //  this.LoanNoOfInstallments =  this.Tenure.getFieldValue();
      //  this.LoanRepaymentDate = '15-10-2019';
}
periodConverter() {
  let NoOfinstallments: number = undefined;
  let tempTenurefreqType = this.convertTenurePeriodToScheduleType();
  switch (tempTenurefreqType) {
    case 'D': NoOfinstallments = this.LD_TENURE.getFieldValue(); break;
    case 'W': NoOfinstallments = this.weeksTodynamicPeriodConverter(this.RepaymentFrequency.getFieldValue(), this.LD_TENURE.getFieldValue()); break;
    case 'M': NoOfinstallments = this.monthsToDynamicPeriodConverter(this.RepaymentFrequency.getFieldValue(), this.LD_TENURE.getFieldValue()); break;
    case 'Y': NoOfinstallments = this.yearsToDynamicPeriodConverter(this.RepaymentFrequency.getFieldValue(), this.LD_TENURE.getFieldValue()); break;
  }
  return NoOfinstallments;
}

weeksTodynamicPeriodConverter(scheduleType, tempInstallments) {
  if (scheduleType == 'D') {
    tempInstallments = tempInstallments * 7;
  }
  return tempInstallments;
}

monthsToDynamicPeriodConverter(scheduleType, tempInstallments) {
  if (scheduleType == 'W') {
    tempInstallments = tempInstallments * 4;
  } else if (scheduleType == 'D') {
    tempInstallments = tempInstallments * 4 * 7;
  }
  return tempInstallments;
}

yearsToDynamicPeriodConverter(scheduleType, tempInstallments) {
  if (scheduleType == 'M') {
    tempInstallments = tempInstallments * 12;
  } else if (scheduleType == 'W') {
    tempInstallments = tempInstallments * 12 * 4;
  } else if (scheduleType == 'D') {
    tempInstallments = tempInstallments * 12 * 4 * 7;
  }
  return tempInstallments;
}
MarginRate_blur(){
  this.Handler.CalculateNetInterestRate();
}
setInputs(param : any){
let params = this.services.http.mapToJson(param);
if(params['mode']){
this.mode = params['mode'];
}
}
async submitForm(path, apiCode, serviceCode){
this.submitData['formName'] = 'Loan Topup Details';
await super.submit(path, apiCode, serviceCode);
}
getFieldInfo() {
this.amountComponent.forEach(field => {this.additionalInfo[field.fieldID + '_desc'] = field.getFieldInfo();});
this.comboFields.forEach(field => {this.additionalInfo[field.fieldID + '_desc'] = field.getFieldInfo();});
this.fileUploadFields.forEach(field => {this.additionalInfo[field.fieldID + '_desc'] = field.getFieldInfo();});
return this.additionalInfo;
}
getFieldValue(){
return this.value;
}
setValue(inputValue, inputDesc=undefined) {
this.setBasicFieldsValue(inputValue, inputDesc);
this.value = new LoanTopupDetailsModel();
this.value.setValue(inputValue);
this.setDependencies();
this.passNewValue(this.value);
}
ngOnInit(){
if(this.formCode == undefined) {this.formCode = 'LoanTopupDetails';}
if(this.formOnLoadError){return;}
var styleElement = document.createElement('style');
styleElement.type = 'text/css';
styleElement.innerHTML = customCss;
styleElement.id = 'LoanTopupDetails_customCss';
document.getElementsByTagName('head')[0].appendChild(styleElement);
}
ngOnDestroy(){
this.unsubscribe$.next();
this.unsubscribe$.complete();
var styleElement = document.getElementById('LoanTopupDetails_customCss');
styleElement.parentNode.removeChild(styleElement);
this.modalDataSubjectSubscription.unsubscribe();
}
ngAfterViewInit(){
setTimeout(() => {
this.subsBFldsValueUpdates();
this.onFormLoad();
this.checkForHTabOverFlow();
});
}
clearError(){
super.clearBasicFieldsError();
super.clearHTabErrors();
super.clearVTabErrors();
this.errors = 0;
this.errorMessage = [];
}
onReset(){
super.resetBasicFields();
this.clearHTabErrors();
this.clearVTabErrors();
this.errors = 0;
this.errorMessage = [];
this.additionalInfo = undefined;
this.dependencyMap.clear();
this.value = new LoanTopupDetailsModel();
this.passNewValue(this.value);
this.setReadOnly(false);
this.onFormLoad();
}
RepaymentFrequency_blur(event){
  this.NoOfInstallments.setValue(this.periodConverter());
  // this.Handler.RepaymentFrequencyChange();
}
async SUBMIT_MAIN_BTN_click(event) {
    this.SUBMIT_MAIN_BTN.setDisabled(true);
    let inputMap = new Map();

    // if (this.EligibilityDecision != 'Reject') {
    //   this.EligibilityDecision = 'Approve';
    // }
    var noofErrors: number = await this.revalidate();
 
   
      inputMap.clear();
      if (noofErrors == 0) {

        inputMap.set('HeaderParam.tenant-id', 'SB1');
        // inputMap.set('HeaderParam.user-id', 'Vishal');
        inputMap.set('HeaderParam.user-id', sessionStorage.getItem('userId'));
       
        // inputMap.set('Body.ApplicationDetails.AppSubmissionDate', this.getTimeStamp());
         inputMap.set('Body.LoanDetails.LoanAmount', this.LoanAmount.getFieldValue());
         inputMap.set('Body.LoanDetails.OutstandingLoanBal', this.OutstandingLoanBal.getFieldValue());
         inputMap.set('Body.LoanDetails.DisbursalDate', this.LoandistDate.getFieldValue());
         inputMap.set('Body.ApplicationDetails.SourcingChannel', 'DSA');
         
        //  inputMap.set('Body.LoanDetails.InterestRate', this.ne.getFieldValue());
       
        inputMap.set('Body.LoanDetails.Tenure', this.Tenure.getFieldValue());
        inputMap.set('Body.LoanDetails.TenurePeriod', this.TenureCode);
        // inputMap.set('Body.LoanDetails.SystemRecommendedAmount', this.LD_SYS_AMT_RCMD.getFieldValue());
        // inputMap.set('Body.LoanDetails.UserRecommendedAmount', this.LD_USR_RCMD_AMT.getFieldValue());
         inputMap.set('Body.LoanDetails.EMIAmount', this.EMIAmount);
        inputMap.set('Body.LoanDetails.Product', this.ProductCode);
        // inputMap.set('Body.LoanDetails.ProductCategory', this.BAD_PROD_CAT.getFieldValue());
        inputMap.set('Body.LoanDetails.SubProduct', this.SubProductCode);
        // inputMap.set('Body.LoanDetails.Scheme', this.BAD_SCHEME.getFieldValue());
        // inputMap.set('Body.LoanDetails.Promotion', this.BAD_PROMOTION.getFieldValue());
        inputMap.set('Body.LoanDetails.Decision', 'Approve');
        inputMap.set('Body.LoanTopupDetails.UDF2', this.DisbursalAccount.getFieldValue());
        // inputMap.set('Body.LoanDetails.ReferrerName', this.RD_REFERRER_NAME.getFieldValue());
        // inputMap.set('Body.LoanDetails.ReferrerPhoneNo', this.RD_REFERRER_NO.getFieldValue());
        // inputMap.set('Body.LoanDetails.MarginRate', this.LD_MARGIN_RATE.getFieldValue());

        inputMap.set('Body.LoanDetails.NetInterestRate', this.NetInterestRate.getFieldValue());
        inputMap.set('Body.LoanDetails.UDF3', this.LoanAccNo.getFieldValue());
        inputMap.set('Body.LoanTopupDetails.MarginRate', this.MarginRate.getFieldValue());
        inputMap.set('Body.LoanTopupDetails.ApplnPurpose', this.BAD_APP_PRPSE.getFieldValue());
        inputMap.set('Body.LoanTopupDetails.TopupNetInstRate', this.TopupNetInstRate.getFieldValue());
        inputMap.set('Body.LoanTopupDetails.NoOfInstallments', this.NoOfInstallments.getFieldValue());
        inputMap.set('Body.LoanTopupDetails.LD_TENURE', this.LD_TENURE.getFieldValue());
        inputMap.set('Body.LoanTopupDetails.DisbursalDate', this.DisbursalDate.getFieldValue());
        inputMap.set('Body.LoanTopupDetails.RequiredEMIAmt', this.RequiredEMIAmt.getFieldValue());
        inputMap.set('Body.LoanTopupDetails.TenureBasis', this.LD_TENURE_PERIOD.getFieldValue());
        inputMap.set('Body.LoanTopupDetails.RepaymentDate', this.RepaymentDate.getFieldValue());
        inputMap.set('Body.LoanTopupDetails.InterestRate', this.InterestRate.getFieldValue());
        inputMap.set('Body.LoanTopupDetails.RepaymentFreq', this.RepaymentFrequency.getFieldValue());
        inputMap.set('Body.LoanTopupDetails.TopupAmount', this.TopupAmount.getFieldValue());
       
        inputMap.set('Body.LoanTopupDetails.RevisedAmount', this.RevisedAmount.getFieldValue());
        inputMap.set('Body.LoanTopupDetails.UDF1', this.TopupDisbursal.getFieldValue());
        // inputMap.set('Body.LoanTopupDetails.UDF3', this.LoanAccNo.getFieldValue());
        // inputMap.set('Body.LoanTopupDetails.UDF4', this.RevisedAmount.getFieldValue());


        inputMap.set('Body.LoanDetails.InitiationFrom', "TopUp");
        inputMap.set('Body.ApplicationDetails.CAMType', 'TopUp');
        inputMap.set('Body.BorrowerDetails', this.Handler.getBorrowerPostData());
       


     
        console.log("Params ", inputMap);

        //return;topupInitation

        this.services.http.fetchApi('/proposal/initiate', 'POST', inputMap, '/initiation').subscribe(
          async (httpResponse: HttpResponse<any>) => {
            var res = httpResponse.body;
            this.ApplicationId = res.ApplicationId;
           
            var successmessage = "Proposal " + res.ApplicationReferenceNumber + " Submitted Successfully";
            this.retriggerPolicyCheck();
            //  var title = this.services.rloui.getAlertMessage('');
            var mainMessage = this.services.rloui.getAlertMessage('', successmessage);
            var button1 = this.services.rloui.getAlertMessage('', 'OK');
            Promise.all([mainMessage, button1]).then(values => {
              console.log(values);
              let modalObj = {
                title: "Alert",
                mainMessage: values[0],
                modalSize: "modal-width-sm",
                buttons: [
                  { id: 1, text: values[1], type: "success", class: "btn-primary" },
                ]
              }

              this.services.rloui.confirmationModal(modalObj).then((response) => {
                console.log(response);
                if (response != null) {
                  if (response.id === 1) {
                    this.services.router.navigate(['home', 'LANDING']);
                  }
                }
              });
            });
            // let modalObj = {
            //   title: "Alert",
            //   mainMessage: "Proposal " + res.ApplicationReferenceNumber + " Submitted Successfully With ICIF Number " + this.borrowericif,
            //   buttons: [
            //     { text: "Okay", type: "success" }
            //   ]
            // }

            // this.services.rloui.confirmationModal(modalObj).then((response) => {
            //   console.log(response);
            //   if (response) {
            //     this.services.router.navigate(['home', 'LANDING']);
            //   }
            // });

            // const alertMsg = "Proposal " + res.ApplicationReferenceNumber + " Submitted Successfully With ICIF Number " + this.borrowericif;
            // if (confirm(alertMsg)) {
            //   this.services.router.navigate(['home', 'LANDING']);
            // }

            inputMap = new Map();
            this.onReset();
            this.SUBMIT_MAIN_BTN.setDisabled(false);

          },
          async (httpError) => {
            var err = httpError['error']
            if (err != null && err['ErrorElementPath'] != undefined && err['ErrorDescription'] != undefined) {
              if (err['ErrorElementPath'] == 'LoanDetails.EMIAmount') {
                this.TopupAmount.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'LoanDetails.UserRecommendedAmount') {
                this.TopupNetInstRate.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'LoanDetails.SystemRecommendedAmount') {
                this.RepaymentFrequency.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'LoanDetails.TenurePeriod') {
                this.LD_TENURE_PERIOD.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'LoanDetails.Tenure') {
                this.LD_TENURE.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'LoanDetails.ApplicationPurpose') {
                this.BAD_APP_PRPSE.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'LoanDetails.InterestRate') {
                this.InterestRate.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'LoanDetails.LoanAmount') {
                this.MarginRate.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'BorrowerDetails.StaffID') {
                this.NoOfInstallments.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'BorrowerDetails.IsStaff') {
                this.DisbursalDate.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'BorrowerDetails.CustomerSegment') {
                this.RequiredEMIAmt.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'BorrowerDetails.DebitScore') {
                this.RepaymentDate.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'BorrowerDetails.MobileNo') {
                this.RevisedAmount.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'BorrowerDetails.TaxID') {
                this.Product.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'BorrowerDetails.DOB') {
                this.SubProduct.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'BorrowerDetails.Gender') {
                this.LoanAccNo.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'BorrowerDetails.FullName') {
                this.OutstandingLoanBal.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'BorrowerDetails.LastName') {
                this.Tenure.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'BorrowerDetails.MiddleName') {
                this.NetInterestRate.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'BorrowerDetails.FirstName') {
                this.CustName.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'BorrowerDetails.Title') {
                this.CifNo.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'ApplicationDetails.DSACode') {
                this.LoandistDate.setError(err['ErrorDescription']);
              }
              
            }
            Promise.all([this.services.rloui.getAlertMessage('', 'Unable to save form!'), this.services.rloui.getAlertMessage('', 'OK')]).then(values => {
              console.log(values);
              let modalObj = {
                title: "Alert",
                mainMessage: values[0],
                modalSize: "modal-width-sm",
                buttons: [
                  { id: 1, text: values[1], type: "success", class: "btn-primary" },
                ]
              }
              this.services.rloui.confirmationModal(modalObj).then((response) => {
                console.log(response);
                if (response != null) {
                  if (response.id === 1) {
                    this.services.rloui.closeAllConfirmationModal();
                  }
                }
              });
            });
            this.SUBMIT_MAIN_BTN.setDisabled(false);
          }
        );
      }
    else {
      this.services.alert.showAlert(2, 'rlo.error.invalid.form', -1);
      this.SUBMIT_MAIN_BTN.setDisabled(false);

    }
  }
  populateAmortizationReturnedData(updatedData) {
    console.log("shweta :: in loandtls amort returned data", updatedData);
     this.monthlyinstallmentAmt = updatedData.monthlyinstallmentAmt != undefined ?
     updatedData.monthlyinstallmentAmt : this.Handler.CalculateEMI();
    this.EMIAmount = this.monthlyinstallmentAmt;
    //this.Handler.SetValue();
    // this.LoanGridCalculation(this.monthlyinstallmentAmt);
  }

  populateAmortizationTopupReturnedData(updatedData) {
    console.log("shweta :: in loandtls amort returned data", updatedData);
     this.monthlyinstallmentAmt = updatedData.monthlyinstallmentAmt != undefined ?
     updatedData.monthlyinstallmentAmt : this.Handler.CalculateToupEMI();
    this.RequiredEMIAmt.setValue(this.monthlyinstallmentAmt);
    //this.Handler.SetValue();
    // this.LoanGridCalculation(this.monthlyinstallmentAmt);
  }

  



  
  async CANCEL_MAIN_BTN_click(event) {

    var mainMessage = this.services.rloui.getAlertMessage('rlo.cancel.comfirmation');
    var button1 = this.services.rloui.getAlertMessage('', 'OK');
    var button2 = this.services.rloui.getAlertMessage('', 'CANCEL');

    Promise.all([mainMessage, button1, button2]).then(values => {
      console.log(values);
      let modalObj = {
        title: "Alert",
        mainMessage: values[0],
        modalSize: "modal-width-sm",
        buttons: [
          { id: 1, text: values[1], type: "success", class: "btn-primary" },
          { id: 2, text: values[2], type: "failure", class: "btn-warning-outline" }
        ]
      }
      this.services.rloui.confirmationModal(modalObj).then((response) => {
        console.log(response);
        if (response != null) {
          if (response.id === 1) {
            this.services.router.navigate(['home', 'LANDING']);
          }
        }
      });
    });
  }

  generateAmortizationDataList() {
    let dataObj: IAmortizationForm = {};
    dataObj.LoanAmountRequested = this.RevisedAmount.getFieldValue();
    dataObj.NetInterestRate = this.TopupNetInstRate.getFieldValue();
    dataObj.InterestRate = this.InterestRate.getFieldValue();
    // dataObj.ApplicationId = this.ApplicationId;
    dataObj.InstallmentFreqIndicator = this.RepaymentFrequency.getFieldInfo();
    dataObj.InstallmentFreqIndicatorCd = this.RepaymentFrequency.getFieldValue();
    dataObj.Tenure = this.Tenure.getFieldValue();
    dataObj.TenurePeriod = (this.LD_TENURE_PERIOD.getFieldInfo() != undefined ? this.LD_TENURE_PERIOD.getFieldInfo() : this.LD_TENURE_PERIOD.getFieldValue());
    dataObj.TenurePeriodCd = this.LD_TENURE_PERIOD.getFieldValue();
    // dataObj.Tenure = this.Tenure.getFieldValue() + " " + (this.TenurePeriod.getFieldInfo() != undefined ? this.TenurePeriod.getFieldInfo() : this.TenurePeriod.getFieldValue());
   
    return dataObj;
  }

async LD_GEN_AMOR_SCH_TOP_UP_click(event) {
    
   
    //amortization modal code starts

     let dataObj = this.repaymentFormData;
    Promise.all([this.services.rloui.getAlertMessage('', 'Generate Amortization Schedule')]).then(values => {
      console.log(values);
      let modalObj: IModalData = {
        title: values[0],
        mainMessage: undefined,
        modalSize: "modal-width-lg",
        buttons: [],
        componentName: 'TopupComponent',
         data: dataObj
      }
      this.services.rloui.confirmationModal(modalObj).then((response) => {
        console.log(response);
        if (response != null) {
          if (response.id === 1) {
            this.services.rloui.closeAllConfirmationModal();
          }
        }
      });
    });
  }

 

 
formatDate(selectedDate, newDateFormat, oldDateFormat: string = 'DD-MM-YYYY') {
    const moment = require('moment');
    return moment(selectedDate, oldDateFormat).format(newDateFormat).toUpperCase();
}
convertTenurePeriodToScheduleType() {
    let frequencyCode = undefined;
    switch (this.LD_TENURE_PERIOD.getFieldValue()) {
      case 'DAY': frequencyCode = 'D'; break;
      case 'WEEK': frequencyCode = 'W'; break;
      case 'MTHS': frequencyCode = 'M'; break;
      case 'YRS': frequencyCode = 'Y';
    }
    return frequencyCode;
  }
async AMS_GENERATE_BTN_click(event) {
 
  const noOfErrors: number = await this.revalidate();
    if (noOfErrors === 0) {

      this.repaymentFormData = {};
      this.repaymentFormData.loanAmount = this.RevisedAmount.getFieldValue();
      this.repaymentFormData.interestRate = this.TopupNetInstRate.getFieldValue();
      this.repaymentFormData.disbursalDate = this.formatDate(this.DisbursalDate.getFieldValue(), 'DD-MMM-YYYY', 'DD-MM-YYYY');
      this.repaymentFormData.firstInstallmentDate = this.formatDate(this.RepaymentDate.getFieldValue(), 'DD-MMM-YYYY', 'DD-MM-YYYY');
      this.repaymentFormData.productCode = this.Product.getFieldValue();
      this.repaymentFormData.subProductCode = this.SubProduct.getFieldValue();

     
        this.repaymentFormData.noOfInstallments = this.NoOfInstallments.getFieldValue();
        this.repaymentFormData.installmentFrequency = '1';
        this.repaymentFormData.installmentFreqIndicator = this.RepaymentFrequency.getFieldValue();
        this.repaymentFormData.FreqIndctrDesc = this.RepaymentFrequency.getFieldInfo() ? this.RepaymentFrequency.getFieldInfo() : this.LD_TENURE_PERIOD.getFieldInfo();
       this.repaymentFormData.parentComponent = 'Topup'
        this.TopupFlag = true
        
      console.log("shweta :: new repayment Interface ::", JSON.stringify(this.repaymentFormData));
    //   this.AmortizationGrid.gridDataLoad({
    //     'requestParams': this.repaymentFormData
    //   });

      this.editableFlag = false;
      this.LD_GEN_AMOR_SCH_TOP_UP_click(event);
    } else {
      this.services.alert.showAlert(2, 'rlo.error.invalid.form', -1);
    }
   
  }


  async AMS_GENERATE_LOAN_BTN_click(event) {
  
    const noOfErrors: number = await this.revalidate();
 
  
        this.repaymentFormData = {};
        this.repaymentFormData.loanAmount = this.LoanAmount.getFieldValue();
        this.repaymentFormData.interestRate = this.NetInterestRate.getFieldValue();
        this.repaymentFormData.disbursalDate = this.formatDate(this.LoandistDate.getFieldValue(), 'DD-MMM-YYYY', 'DD-MM-YYYY');
        this.repaymentFormData.firstInstallmentDate = this.formatDate(this.LoanRepaymentDate, 'DD-MMM-YYYY', 'DD-MM-YYYY');
        this.repaymentFormData.productCode = this.Product.getFieldValue();
        this.repaymentFormData.subProductCode = this.SubProduct.getFieldValue();
  
          this.repaymentFormData.noOfInstallments = this.LoanNoOfInstallments;
          this.repaymentFormData.installmentFrequency = '1';
          this.repaymentFormData.installmentFreqIndicator = 'M';
          this.repaymentFormData.FreqIndctrDesc = 'M';
          this.repaymentFormData.parentComponent = 'Topup'
          this.TopupFlag = false
        console.log("shweta :: new repayment Interface ::", JSON.stringify(this.repaymentFormData));
      //   this.AmortizationGrid.gridDataLoad({
      //     'requestParams': this.repaymentFormData
      //   });
  
        this.editableFlag = false;
     
      this.LD_GEN_AMOR_SCH_TOP_UP_click(event);
    }
    retriggerPolicyCheck() {
      // this.MstScoreResultMap.clear();
      let inputMap = this.generateRetriggerRequestJson();
  
      this.services.http.fetchApi('/policyCheck', 'POST', inputMap, '/initiation').subscribe(
        async (httpResponse: HttpResponse<any>) => {
          let res = httpResponse.body['ouputdata'];
          
          // let res = httpResponse.body;
          // this.loadScoreResult();
        },
        async (httpError) => {
          var err = httpError['error']
          if (err != null && err['ErrorElementPath'] != undefined && err['ErrorDescription'] != undefined) {
          }
          this.services.alert.showAlert(2, 'rlo.error.load.form', -1);
        }
      );
    }
  

    generateRetriggerRequestJson() {
      let inputMap = new Map();
      inputMap.set('Body.interfaceId', 'INT007');
      inputMap.set('Body.prposalid', this.ApplicationId);
      // inputMap.set('Body.inputdata.SCHEME_CD', 'HOUSEC');
      inputMap.set('Body.inputdata.SCHEME_CD', 'MUREUR');
      return inputMap;
    }
fieldDependencies = {
    LD_TENURE_PERIOD: {
        inDep: [
  
          { paramKey: "VALUE1", depFieldID: "LD_TENURE_PERIOD", paramType: "PathParam" },
          { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
          { paramKey: "KEY1", depFieldID: "hideTenurePeriod", paramType: "QueryParam" },
        ],
        outDep: [
        ]
      },
      RepaymentFrequency: {
        inDep: [
  
          { paramKey: "VALUE1", depFieldID: "RepaymentFrequency", paramType: "PathParam" },
          { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
          { paramKey: "KEY1", depFieldID: "hideRepaymentFreq", paramType: "QueryParam" },
        ],
        outDep: [
        ]
      },

      BAD_APP_PRPSE: {
        inDep: [
  
          { paramKey: "VALUE1", depFieldID: "BAD_APP_PRPSE", paramType: "PathParam" },
          { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
          { paramKey: "KEY1", depFieldID: "hideAppPurpose", paramType: "QueryParam" },
        ],
        outDep: [
        ]
      },
      TopupDisbursal: {
        inDep: [
  
          { paramKey: "VALUE1", depFieldID: "TopupDisbursal", paramType: "PathParam" },
          { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
          { paramKey: "KEY1", depFieldID: "hidtopDisbursal", paramType: "QueryParam" },
        ],
        outDep: [
        ]
      },
}

resetLoanDetails(event){
  this.Handler.resetLoanDetails();
}
resetTopupDetails(event){
  this.Handler.resetTopupDetails();
}

}