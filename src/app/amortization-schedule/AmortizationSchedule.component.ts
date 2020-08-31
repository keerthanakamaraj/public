import { Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter, Input, ChangeDetectorRef } from '@angular/core';
import { AmortizationScheduleModel } from './AmortizationSchedule.model';
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
import { ServiceStock } from '../service-stock.service';
import { LabelComponent } from '../label/label.component';
import { AmortizationGridComponent } from '../AmortizationGrid/AmortizationGrid.component';
import { AmortizationScheduleHandlerComponent } from './AmortizationSchedule-handler.component';
// import { IAmortizationForm, IRepaymentSchedule } from './amortization-interface';
import { IAmortizationForm, IRepaymentSchedule } from '../Interface/masterInterface';
import { ConsoleService } from '@ng-select/ng-select/lib/console.service';
import { RefreshSidebarService } from '../refreshSidebar.service';

const customCss: string = '';

@Component({
  selector: 'app-ammortization-schedule',
  templateUrl: './AmortizationSchedule.component.html'
})
export class AmortizationScheduleComponent extends FormComponent implements OnInit, AfterViewInit {
  @ViewChild('LoanAmountRequested', { static: false }) LoanAmountRequested: AmountComponent;
  @ViewChild('NetInterestRate', { static: false }) NetInterestRate: TextBoxComponent;
  @ViewChild('Tenure', { static: false }) Tenure: TextBoxComponent;
  @ViewChild('BLoanOwnership', { static: false }) BLoanOwnership: TextBoxComponent;
  @ViewChild('CBLoanOwnership', { static: false }) CBLoanOwnership: TextBoxComponent;
  @ViewChild('BLoanAmtShare', { static: false }) BLoanAmtShare: AmountComponent;
  @ViewChild('CBLoanAmountShare', { static: false }) CBLoanAmountShare: AmountComponent;
  @ViewChild('DisbursalDate', { static: false }) DisbursalDate: DateComponent;
  @ViewChild('ScheduleType', { static: false }) ScheduleType: TextBoxComponent;
  @ViewChild('RepaymentStartDate', { static: false }) RepaymentStartDate: DateComponent;
  @ViewChild('NoOfInstallments', { static: false }) NoOfInstallments: TextBoxComponent;
  @ViewChild('RequiredEMIAmt', { static: false }) RequiredEMIAmt: AmountComponent;
  @ViewChild('AmortizationGrid', { static: false }) AmortizationGrid: AmortizationGridComponent;
  @ViewChild('Handler', { static: false }) Handler: AmortizationScheduleHandlerComponent;
  @ViewChild('hidAppId', { static: false }) hidAppId: HiddenComponent;
 // @ViewChild('hidScheduleType', { static: false }) hidScheduleType: HiddenComponent;
  @ViewChild('AMS_GENERATE_BTN', { static: false }) AMS_GENERATE_BTN: ButtonComponent;
  @ViewChild('AMS_CLEAR_BTN', { static: false }) AMS_CLEAR_BTN: ButtonComponent;

  @Input() parentData: IAmortizationForm = undefined;
  @Input() ApplicationId: string = undefined;
  @Input() activeBorrowerSeq: string = undefined;
  //@Input() CustomerDetailsArray: any = undefined;
  editableFlag: boolean = true;
  cust_name: string;
  cust_dob: string;
  //tenurePeriod:string=undefined;
  isCBOwnership: boolean = false;
  repaymentFormData: IRepaymentSchedule = {};
  async revalidate(): Promise<number> {
    var totalErrors = 0;
    super.beforeRevalidate();
    await Promise.all([

      this.revalidateBasicField('LoanAmountRequested'),
      this.revalidateBasicField('NetInterestRate'),
      this.revalidateBasicField('Tenure'),
      this.revalidateBasicField('BLoanOwnership'),
      this.revalidateBasicField('CBLoanOwnership'),
      this.revalidateBasicField('BLoanAmtShare'),
      this.revalidateBasicField('CBLoanAmountShare'),
      this.revalidateBasicField('DisbursalDate'),
      this.revalidateBasicField('ScheduleType'),
      this.revalidateBasicField('RepaymentStartDate'),
      this.revalidateBasicField('NoOfInstallments'),
      this.revalidateBasicField('RequiredEMIAmt')


    ]).then((errorCounts) => {
      errorCounts.forEach((errorCount) => {
        totalErrors += errorCount;
      });
    });
    this.errors = totalErrors;
    super.afterRevalidate();
    return totalErrors;
  }
  constructor(services: ServiceStock, private cdRef: ChangeDetectorRef) {
    super(services);
    this.value = new AmortizationScheduleModel();
    this.componentCode = 'AmortizationSchedule';
  }
  setReadOnly(readOnly) {
    super.setBasicFieldsReadOnly(readOnly);
  }
  async onFormLoad() {
    // this.ApplicationId = '2221';
    this.editableFlag = true;
    this.setInputs(this.services.dataStore.getData(this.services.routing.currModal));
    let inputMap = new Map();
    this.hidAppId.setValue('RLO');
    //this.hidScheduleType.setValue('ScheduleType');
    this.parseParentDataObj();

    // if (this.ApplicationId) {
    // 	await this.AmortizationGrid.gridDataLoad({
    // 		'ApplicationId': this.ApplicationId,
    // 	});
    // }
    await this.Handler.onFormLoad({});
    this.setDependencies();
  }
  setInputs(param: any) {
    let params = this.services.http.mapToJson(param);
    if (params['mode']) {
      this.mode = params['mode'];
    }
  }
  async submitForm(path, apiCode, serviceCode) {
    this.submitData['formName'] = 'AmortizationSchedule';
    await super.submit(path, apiCode, serviceCode);
  }
  getFieldInfo() {
    this.amountComponent.forEach(field => { this.additionalInfo[field.fieldID + '_desc'] = field.getFieldInfo(); });
    this.comboFields.forEach(field => { this.additionalInfo[field.fieldID + '_desc'] = field.getFieldInfo(); });
    this.fileUploadFields.forEach(field => { this.additionalInfo[field.fieldID + '_desc'] = field.getFieldInfo(); });
    return this.additionalInfo;
  }
  getFieldValue() {
    return this.value;
  }
  setValue(inputValue, inputDesc = undefined) {
    this.setBasicFieldsValue(inputValue, inputDesc);
    this.value = new AmortizationScheduleModel();
    this.value.setValue(inputValue);
    this.setDependencies();
    this.passNewValue(this.value);
  }
  ngOnInit() {
    if (this.formCode == undefined) { this.formCode = 'AmortizationSchedule'; }
    if (this.formOnLoadError) { return; }
    var styleElement = document.createElement('style');
    styleElement.type = 'text/css';
    styleElement.innerHTML = customCss;
    styleElement.id = 'AmortizationSchedule_customCss';
    document.getElementsByTagName('head')[0].appendChild(styleElement);
  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    var styleElement = document.getElementById('AmortizationSchedule_customCss');
    styleElement.parentNode.removeChild(styleElement);
    // this.services.rloCommonData.modalDataSubject.unsubscribe();
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.subsBFldsValueUpdates();
      this.onFormLoad();
      this.checkForHTabOverFlow();
      // this.cdRef.detectChanges();
    });
  }
  clearError() {
    super.clearBasicFieldsError();
    super.clearHTabErrors();
    super.clearVTabErrors();
    this.errors = 0;
    this.errorMessage = [];
  }
  onReset() {
    super.resetBasicFields();
    this.clearHTabErrors();
    this.clearVTabErrors();
    this.errors = 0;
    this.errorMessage = [];
    this.additionalInfo = undefined;
    this.dependencyMap.clear();
    this.value = new AmortizationScheduleModel();
    this.passNewValue(this.value);
    this.setReadOnly(false);
    this.onFormLoad();
  }


  RD_RESET_click(event) {
    this.onReset();
  }
  parseParentDataObj() {
    this.LoanAmountRequested.setValue(this.parentData.LoanAmountRequested);
    this.NetInterestRate.setValue(this.parentData.NetInterestRate);

    this.Tenure.setValue(this.parentData.Tenure + " "+this.parentData.TenurePeriod);
    this.BLoanOwnership.setValue(this.parentData.BLoanOwnership);
    this.BLoanAmtShare.setValue(this.parentData.BLoanAmtShare);

    this.isCBOwnership = (this.parentData.CBLoanOwnership != undefined && this.parentData.CBLoanOwnership != 0) ? true : false;
    this.CBLoanOwnership.setValue(this.parentData.CBLoanOwnership);
    this.CBLoanAmountShare.setValue(this.parentData.CBLoanAmountShare);


    this.DisbursalDate.setValue(this.parentData.DisbursalDate);
    this.ScheduleType.setValue(this.parentData.ScheduleType);
    this.RepaymentStartDate.setValue(this.parentData.RepaymentStartDate);
   // this.NoOfInstallments.setValue(this.parentData.NoOfInstallments);
    // this.RequiredEMIAmt.setValue(this.parentData.RequiredEMIAmt);
    //this.tenurePeriod=this.parentData.TenurePeriod;
    //console.log("shweta :: ",this.tenurePeriod);
    this.ScheduleInstallments();
    console.log("shweta :: in amortization",this);
  }
  ScheduleInstallments(){
    if(this.parentData.InstallmentFreqIndicatorCd!=undefined){
      this.ScheduleType.setValue(this.parentData.InstallmentFreqIndicator,this.parentData.InstallmentFreqIndicatorCd);
     this.NoOfInstallments.setValue(this.calculateNoOfInstallments());
    }
    else{
      this.NoOfInstallments.setValue(this.parentData.Tenure);
   let tempInstfreqType= this.convertTenurePeriodToScheduleType();
   this.ScheduleType.setValue(this.parentData.TenurePeriod,tempInstfreqType);
    }
  }
  calculateNoOfInstallments(){
    let NoOfinstallments:number=undefined;
  switch(this.parentData.InstallmentFreqIndicatorCd){
   case 'D':NoOfinstallments=this.convertToDays();break;
   case 'W':NoOfinstallments=this.convertToDays()/7;break;
   case 'M':NoOfinstallments=this.convertToDays()/30;break;
   case 'Y':NoOfinstallments=this.convertToDays()/365;break;
  }
  return NoOfinstallments;
  }

  convertToDays(){
    let NoOfDays:number=undefined;
    switch(this.parentData.TenurePeriodCd){
      case 'DAY': NoOfDays=parseInt(this.parentData.Tenure);break;
      case 'WEEK': NoOfDays=parseInt(this.parentData.Tenure)*7;break;
      case 'MTHS': NoOfDays=parseInt(this.parentData.Tenure)*30;break;
      case 'YRS': NoOfDays=parseInt(this.parentData.Tenure)*365;break;
        }
        return NoOfDays;
  }
  convertTenurePeriodToScheduleType(){
    let frequencyCode=undefined;
    switch(this.parentData.TenurePeriodCd){
      case 'DAY': frequencyCode='D';break;
      case 'WEEK': frequencyCode='W';break;
      case 'MTHS': frequencyCode='M';break;
      case 'YRS': frequencyCode='Y';
        }
        return frequencyCode;
  }
  async AMS_GENERATE_BTN_click(event) {

    const noOfErrors: number = await this.revalidate();
    if (noOfErrors === 0) {

      this.repaymentFormData = {};
      this.repaymentFormData.loanAmount = this.LoanAmountRequested.getFieldValue();
      this.repaymentFormData.interestRate = this.NetInterestRate.getFieldValue();
      this.repaymentFormData.disbursalDate = this.formatDate(this.DisbursalDate.getFieldValue(), 'DD-MMM-YYYY', 'DD-MM-YYYY');
      this.repaymentFormData.firstInstallmentDate = this.formatDate(this.RepaymentStartDate.getFieldValue(), 'DD-MMM-YYYY', 'DD-MM-YYYY');
      this.repaymentFormData.productCode = this.services.rloCommonData.globalApplicationDtls.ProductName;
      this.repaymentFormData.subProductCode = this.services.rloCommonData.globalApplicationDtls.SubProductName;

      if(this.RequiredEMIAmt!=undefined && this.RequiredEMIAmt.getFieldValue()!=0 && this.RequiredEMIAmt.getFieldValue()!=''){
        this.repaymentFormData.requiredEMIAmt=this.RequiredEMIAmt.getFieldValue();
        this.repaymentFormData.tenure=this.parentData.Tenure;
        this.repaymentFormData.tenureIndecator=this.convertTenurePeriodToScheduleType();
      }else{
        this.repaymentFormData.noOfInstallments = this.NoOfInstallments.getFieldValue();
        this.repaymentFormData.installmentFrequency = '1';
        this.repaymentFormData.installmentFreqIndicator=this.ScheduleType.getFieldInfo();
      }

    this.AmortizationGrid.gridDataLoad({
        'requestParams': this.repaymentFormData
      });

      this.editableFlag = false;
    } else {
      this.services.alert.showAlert(2, 'rlo.error.invalid.form', -1);
    }
  }
  generateRepaymentForm(requestedParams) {
    //this.repaymentFormData=requestParams;
    this.repaymentFormData.loanAmount = this.services.formatAmount(this.repaymentFormData.loanAmount, null, null,false);
    this.repaymentFormData.maturityDate = requestedParams.maturityDate;
    this.repaymentFormData.loanCalculationDate = this.getTimeStamp();
    // console.log("shweta ::: installment amount", parseFloat(this.RequiredEMIAmt.getFieldValue()) > 0, this.RequiredEMIAmt.getFieldValue());
    // console.log("installment Amt from grid", requestedParams.installmentAmt);
    //let instAmt = this.RequiredEMIAmt.getFieldValue();
    let instAmt = undefined;
    // if (instAmt != undefined && instAmt != 0) {
    //   instAmt = parseFloat(this.RequiredEMIAmt.getFieldValue()).toFixed(2);
    // } else 
    if (requestedParams.installmentAmt != undefined) {
      instAmt = parseFloat(requestedParams.installmentAmt).toFixed(2);
    }
    this.services.rloCommonData.modalDataSubject.next({
      action: 'passAmortizationDtls',
      data: {
        'disbursalDate': this.DisbursalDate.getFieldValue(),
        'repaymentStartDate': this.RepaymentStartDate.getFieldValue(),
        'monthlyinstallmentAmt': instAmt
      }
    });
  }

  AMS_CLEAR_BTN_click(event) {
    this.DisbursalDate.onReset();
    this.ScheduleType.onReset();
    this.RepaymentStartDate.onReset();
    this.NoOfInstallments.onReset();
    this.RequiredEMIAmt.onReset();
  }

  formatDate(selectedDate, newDateFormat, oldDateFormat: string = 'DD-MM-YYYY') {
    const moment = require('moment');
    return moment(selectedDate, oldDateFormat).format(newDateFormat).toUpperCase();
  }

  DisbursalDate_blur() {
    if (!this.isFutureDate(this.DisbursalDate.getFieldValue())) {
      this.DisbursalDate.setError('rlo.error.invalid-disbarsalDt');
      return 1;
    }
  }

  RepaymentStartDate_blur() {
    if (!this.isFutureDate(this.RepaymentStartDate.getFieldValue(), this.DisbursalDate.getFieldValue())) {
      this.RepaymentStartDate.setError('rlo.error.invalid-repaymentDt');
      return 1;
    }

  }


  isFutureDate(selectedDate, comaringDate?: any) {
    const moment = require('moment');
    let currentDate: any;
    if (comaringDate != undefined && comaringDate != '') {
      currentDate = moment(comaringDate, 'DD-MM-YYYY');
    }
    else {
      currentDate = moment();
      currentDate.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
    }
    selectedDate = moment(selectedDate, 'DD-MM-YYYY');
    if (selectedDate <= currentDate) {
      return false;
    }
    return true;
  }

  getTimeStamp() {
    const moment = require('moment');
    let currentDate = moment().format('DD-MMM-YYYY');
    // console.log("shweta :: current date test ",currentDate);
    return currentDate;
  }

  fieldDependencies = {
    // ScheduleType: {
    //   inDep: [
    //     { paramKey: "VALUE1", depFieldID: "ScheduleType", paramType: "PathParam" },
    //     { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
    //     { paramKey: "KEY1", depFieldID: "hidScheduleType", paramType: "QueryParam" },
    //   ],
    //   outDep: [
    //   ]
    // }
  }

}
