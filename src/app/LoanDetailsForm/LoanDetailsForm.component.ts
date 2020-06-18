import { Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import { LoanDetailsFormModel } from './LoanDetailsForm.model';
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
import { LoanHandlerComponent } from '../LoanDetailsForm/loan-handler.component';
import { ReadOnlyComponent } from '../rlo-ui-readonlyfield/rlo-ui-readonlyfield.component';


const customCss: string = '';

@Component({
  selector: 'app-LoanDetailsForm',
  templateUrl: './LoanDetailsForm.component.html'
})
export class LoanDetailsFormComponent extends FormComponent implements OnInit, AfterViewInit {
  @ViewChild('LoanAmount', {static: false}) LoanAmount: AmountComponent;
  @ViewChild('InterestRate', {static: false}) InterestRate: TextBoxComponent;
  @ViewChild('MarginRate', {static: false}) MarginRate: TextBoxComponent;
  @ViewChild('NetInterestRate', {static: false}) NetInterestRate: TextBoxComponent;
  @ViewChild('Tenure', {static: false}) Tenure: TextBoxComponent;
  @ViewChild('TenurePeriod', {static: false}) TenurePeriod: ComboBoxComponent;
  @ViewChild('InterestRateType', {static: false}) InterestRateType: ComboBoxComponent;
  @ViewChild('SystemRecommendedAmount', {static: false}) SystemRecommendedAmount: AmountComponent;
  @ViewChild('UserRecommendedAmount', {static: false}) UserRecommendedAmount: AmountComponent;
  @ViewChild('RepaymentFrequency', {static: false}) RepaymentFrequency: ComboBoxComponent;
  @ViewChild('RepaymentOption', {static: false}) RepaymentOption: ComboBoxComponent;
  @ViewChild('RepaymentAccNo', {static: false}) RepaymentAccNo: TextBoxComponent;
  @ViewChild('LD_FEES_CHARGE', {static: false}) LD_FEES_CHARGE: ButtonComponent;
  @ViewChild('LD_COLL_UPFRONT_CHARGES', {static: false}) LD_COLL_UPFRONT_CHARGES: ButtonComponent;
  @ViewChild('LD_DISBURMENT_MONEY', {static: false}) LD_DISBURMENT_MONEY: ButtonComponent;
  @ViewChild('LD_GEN_AMOR_SCH', {static: false}) LD_GEN_AMOR_SCH: ButtonComponent;
  @ViewChild('MoneyInstallment', {static: false}) MoneyInstallment: ReadOnlyComponent;
  @ViewChild('TotalInterestAmount', {static: false}) TotalInterestAmount: ReadOnlyComponent;
  @ViewChild('TotalInstallmentAmt', {static: false}) TotalInstallmentAmt: ReadOnlyComponent;
  @ViewChild('MarginMoney', {static: false}) MarginMoney: ReadOnlyComponent;
  @ViewChild('Handler', {static: false}) Handler: LoanHandlerComponent;
  @ViewChild('hidAppId', {static: false}) hidAppId: HiddenComponent;
  @ViewChild('hidInterestRate', {static: false}) hidInterestRate: HiddenComponent;
  @ViewChild('hidPeriod', {static: false}) hidPeriod: HiddenComponent;
  @ViewChild('hidAppPurpose', {static: false}) hidAppPurpose: HiddenComponent;
  @ViewChild('hideInstRateType', {static: false}) hideInstRateType: HiddenComponent;
  @ViewChild('hideRepaymentOption', {static: false}) hideRepaymentOption: HiddenComponent;
  @ViewChild('hideRepaymentFreq', {static: false}) hideRepaymentFreq: HiddenComponent;
  ApplicationId : any
  async revalidate(): Promise<number> {
    var totalErrors = 0;
    super.beforeRevalidate();
    await Promise.all([
    this.revalidateBasicField('LoanAmount'),
    this.revalidateBasicField('InterestRate'),
    this.revalidateBasicField('MarginRate'),
    this.revalidateBasicField('NetInterestRate'),
    this.revalidateBasicField('Tenure'),
    this.revalidateBasicField('TenurePeriod'),
    this.revalidateBasicField('InterestRateType'),
    this.revalidateBasicField('SystemRecommendedAmount'),
    this.revalidateBasicField('UserRecommendedAmount'),
    this.revalidateBasicField('RepaymentFrequency'),
    this.revalidateBasicField('RepaymentOption'),
    this.revalidateBasicField('RepaymentAccNo'),
    this.revalidateBasicField('MoneyInstallment'),
    this.revalidateBasicField('TotalInterestAmount'),
    this.revalidateBasicField('TotalInstallmentAmt'),
    this.revalidateBasicField('MarginMoney'),
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
    this.value = new LoanDetailsFormModel();
    this.componentCode = 'LoanDetailsForm';
  }
  setReadOnly(readOnly){
    super.setBasicFieldsReadOnly(readOnly);
  }
  async onFormLoad(){
    this.setInputs(this.services.dataStore.getData(this.services.routing.currModal));
    this.LoanAmount.setFormatOptions({currencyCode: 'INR', languageCode: 'en-US', });
    this.SystemRecommendedAmount.setFormatOptions({currencyCode: 'INR', languageCode: 'en-US', });
    this.UserRecommendedAmount.setFormatOptions({currencyCode: 'INR', languageCode: 'en-US', });
    this.hidAppId.setValue('RLO');
    this.hidInterestRate.setValue('INTEREST_RATE');
    this.hidPeriod.setValue('PERIOD');
    this.hidAppPurpose.setValue('APPLICATION_PURPOSE');
    this.hideInstRateType.setValue('INTEREST_RATE_TYPE');
    this.hideRepaymentOption.setValue('REPAYMENT_OPTION');
    this.hideRepaymentFreq.setValue('FREQUENCY');
    let inputMap = new Map();
    await this.Handler.onFormLoad({
    });
    this.OnLoanFormLoad()
    
    this.setDependencies();
  }
  setInputs(param : any){
    let params = this.services.http.mapToJson(param);
    if(params['mode']){
      this.mode = params['mode'];
    }
  }
  async submitForm(path, apiCode, serviceCode){
    this.submitData['formName'] = 'Loan Details Main Form';
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
    this.value = new LoanDetailsFormModel();
    this.value.setValue(inputValue);
    this.setDependencies();
    this.passNewValue(this.value);
  }
  ngOnInit(){
    if(this.formCode == undefined) {this.formCode = 'LoanDetailsForm';}
    if(this.formOnLoadError){return;}
    var styleElement = document.createElement('style');
    styleElement.type = 'text/css';
    styleElement.innerHTML = customCss;
    styleElement.id = 'LoanDetailsForm_customCss';
    document.getElementsByTagName('head')[0].appendChild(styleElement);
  }
  ngOnDestroy(){
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    var styleElement = document.getElementById('LoanDetailsForm_customCss');
    styleElement.parentNode.removeChild(styleElement);
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
    this.value = new LoanDetailsFormModel();
    this.passNewValue(this.value);
    this.setReadOnly(false);
    this.onFormLoad();
  }
  OnLoanFormLoad(){
    let inputMap = new Map();
    inputMap.clear();
    let applicationId: any = this.ApplicationId;
    // let applicationId = '2221';
    let criteriaJson: any = { "Offset": 1, "Count": 10, FilterCriteria: [] };
    if (applicationId) {
        criteriaJson.FilterCriteria.push({
            "columnName": "ApplicationId",
            "columnType": "String",
            "conditions": {
                "searchType": "equals",
                "searchText": applicationId
            }
        });	
      
    }
    inputMap.set('QueryParam.criteriaDetails', criteriaJson)
   
    this.services.http.fetchApi('/LoanDetails', 'GET', inputMap).subscribe(
    async (httpResponse: HttpResponse<any>) => {
      var res = httpResponse.body;
      var LoanArray = res['LoanDetails'];
      LoanArray.forEach(LoanElement => {
        this.LoanAmount.setValue(LoanElement['LoanAmount']);
        this.InterestRate.setValue(LoanElement['InterestRate']);
        this.MarginRate.setValue(LoanElement['MarginRate']);
        this.NetInterestRate.setValue(LoanElement['NetInterestRate']);
        this.Tenure.setValue(LoanElement['Tenure']);
        this.TenurePeriod.setValue(LoanElement['TenurePeriod']);
        this.InterestRateType.setValue(LoanElement['InterestRateType']);
        this.SystemRecommendedAmount.setValue(LoanElement['SystemRecommendedAmount']);
        this.UserRecommendedAmount.setValue(LoanElement['UserRecommendedAmount']);
        this.RepaymentFrequency.setValue(LoanElement['RepaymentFrequency']);
        this.RepaymentOption.setValue(LoanElement['RepaymentOption']);
        this.RepaymentAccNo.setValue(LoanElement['RepaymentAccNo']);
        // this.MarginMoney.setValue(LoanElement['MarginMoney']);
        // this.MoneyInstallment.setValue(LoanElement['MoneyInstallment']);
        // this.TotalInterestAmount.setValue(LoanElement['TotalInterestAmount']);
        // this.TotalInstallmentAmt.setValue(LoanElement['TotalInstallmentAmt']);
        this.MarginMoney.setValue('125,000.00');
        this.MoneyInstallment.setValue('-NA');
        this.TotalInterestAmount.setValue('-NA');
        this.TotalInstallmentAmt.setValue('-NA-');
      });
     
    },
    async (httpError)=>{
      var err = httpError['error']
      if(err!=null && err['ErrorElementPath'] != undefined && err['ErrorDescription']!=undefined){
      }
    }
    );
  }
  fieldDependencies = {
    TenurePeriod: {
      inDep: [
      
      {paramKey: "VALUE1", depFieldID: "LD_TENURE_PERIOD", paramType:"PathParam"},
      {paramKey: "KEY1", depFieldID: "hidPeriod", paramType:"QueryParam"},
      {paramKey: "APPID", depFieldID: "hidAppId", paramType:"QueryParam"},
      ],
      outDep: [
    ]},
    InterestRateType: {
      inDep: [
      
      {paramKey: "VALUE1", depFieldID: "InterestRateType", paramType:"PathParam"},
      {paramKey: "APPID", depFieldID: "hidAppId", paramType:"QueryParam"},
      {paramKey: "KEY1", depFieldID: "hideInstRateType", paramType:"QueryParam"},
      ],
      outDep: [
    ]},
    RepaymentFrequency: {
      inDep: [
      
      {paramKey: "VALUE1", depFieldID: "RepaymentFrequency", paramType:"PathParam"},
      {paramKey: "APPID", depFieldID: "hidAppId", paramType:"QueryParam"},
      {paramKey: "KEY1", depFieldID: "hideRepaymentFreq", paramType:"QueryParam"},
      ],
      outDep: [
    ]},
    RepaymentOption: {
      inDep: [
      
      {paramKey: "VALUE1", depFieldID: "RepaymentOption", paramType:"PathParam"},
      {paramKey: "APPID", depFieldID: "hidAppId", paramType:"QueryParam"},
      {paramKey: "KEY1", depFieldID: "hideRepaymentOption", paramType:"QueryParam"},
      ],
      outDep: [
    ]},
  }
}
