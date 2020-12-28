import { Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import { CustomerDtlsModel } from './CustomerDtls.model';
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
import { CustomerDtlsGridComponent } from '../CustomerDtlsGrid/CustomerDtlsGrid.component';
import { AddressDetailsComponent } from '../AddressDetails/AddressDetails.component';
import { OccupationDtlsFormComponent } from '../OccupationDtlsForm/OccupationDtlsForm.component';
import { CustomerHandlerComponent } from '../CustomerDtls/customer-handler.component';
import { RloUiAccordionComponent } from '../rlo-ui-accordion/rlo-ui-accordion.component';
import { RLOUIRadioComponent } from '../rlo-ui-radio/rlo-ui-radio.component';
import { RloUiMobileComponent } from '../rlo-ui-mobile/rlo-ui-mobile.component';
import { Subject } from 'rxjs';
import { RloUiCurrencyComponent } from '../rlo-ui-currency/rlo-ui-currency.component';
import { ICustomSearchObject } from '../Interface/masterInterface';
import { RloUiCustomerSearchComponent } from '../rlo-ui-customer-search/rlo-ui-customer-search.component';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

const customCss = '';

@Component({
  selector: 'app-CustomerDtls',
  templateUrl: './CustomerDtls.component.html'
})
export class CustomerDtlsComponent extends FormComponent implements OnInit, AfterViewInit {
  fieldArray: any[];
  constructor(services: ServiceStock) {
    super(services);
    this.value = new CustomerDtlsModel();
    this.componentCode = 'CustomerDtls';
  }
  @ViewChild('CD_CUST_TYPE', { static: false }) CD_CUST_TYPE: RLOUIRadioComponent;

  // @ViewChild('CD_EXISTING_CUST', { static: false }) CD_EXISTING_CUST: RLOUIRadioComponent;
  // @ViewChild('CD_STAFF', { static: false }) CD_STAFF: RLOUIRadioComponent;
  // @ViewChild('CD_CIF', { static: false }) CD_CIF: TextBoxComponent;

  @ViewChild('CD_CIF', { static: false }) CD_CIF: RloUiCustomerSearchComponent;

  @ViewChild('CD_STAFF_ID', { static: false }) CD_STAFF_ID: TextBoxComponent;
  // @ViewChild('CD_CUST_ID', { static: false }) CD_CUST_ID: TextBoxComponent;

  @ViewChild('CD_TITLE', { static: false }) CD_TITLE: ComboBoxComponent;
  @ViewChild('CD_FIRST_NAME', { static: false }) CD_FIRST_NAME: TextBoxComponent;
  @ViewChild('CD_MIDDLE_NAME', { static: false }) CD_MIDDLE_NAME: TextBoxComponent;
  @ViewChild('CD_THIRD_NAME', { static: false }) CD_THIRD_NAME: TextBoxComponent;
  @ViewChild('CD_LAST_NAME', { static: false }) CD_LAST_NAME: TextBoxComponent;
  @ViewChild('CD_FULL_NAME', { static: false }) CD_FULL_NAME: TextBoxComponent;
  @ViewChild('CD_DOB', { static: false }) CD_DOB: DateComponent;
  @ViewChild('CD_GENDER', { static: false }) CD_GENDER: ComboBoxComponent;
  @ViewChild('CD_MARITAL_STATUS', { static: false }) CD_MARITAL_STATUS: ComboBoxComponent;
  //@ViewChild('CD_MOBILE_NO', { static: false }) CD_MOBILE_NO: TextBoxComponent;
  @ViewChild('CD_EMAIL', { static: false }) CD_EMAIL: TextBoxComponent;
  @ViewChild('CD_NATIONALITY', { static: false }) CD_NATIONALITY: ComboBoxComponent;
  @ViewChild('CD_CITIZENSHIP', { static: false }) CD_CITIZENSHIP: ComboBoxComponent;
  @ViewChild('CD_PASSPORT_EXPIRY', { static: false }) CD_PASSPORT_EXPIRY: DateComponent;
  @ViewChild('CD_PASSPORT_NO', { static: false }) CD_PASSPORT_NO: TextBoxComponent;
  @ViewChild('CD_VISA_VALID', { static: false }) CD_VISA_VALID: DateComponent;
  @ViewChild('CD_DRIVING_LICENSE', { static: false }) CD_DRIVING_LICENSE: TextBoxComponent;
  @ViewChild('CD_DRVNG_LCNSE_EXP_DT', { static: false }) CD_DRVNG_LCNSE_EXP_DT: DateComponent;
  @ViewChild('CD_TAX_ID', { static: false }) CD_TAX_ID: TextBoxComponent;
  @ViewChild('CD_DEBIT_SCORE', { static: false }) CD_DEBIT_SCORE: TextBoxComponent;
  // @ViewChild('CD_NATIONAL_ID', { static: false }) CD_NATIONAL_ID: TextBoxComponent;
  @ViewChild('CD_CUST_SEGMENT', { static: false }) CD_CUST_SEGMENT: ComboBoxComponent;

  @ViewChild('CD_LOAN_OWN', { static: false }) CD_LOAN_OWN: TextBoxComponent;
  // @ViewChild('CD_PRIME_USAGE', { static: false }) CD_PRIME_USAGE: TextBoxComponent;
  @ViewChild('CD_PMRY_EMBSR_NAME', { static: false }) CD_PMRY_EMBSR_NAME: TextBoxComponent;
  @ViewChild('CD_PREF_COM_CH', { static: false }) CD_PREF_COM_CH: ComboBoxComponent;
  @ViewChild('CD_PREF_LANG', { static: false }) CD_PREF_LANG: ComboBoxComponent;
  @ViewChild('MaidenName', { static: false }) MaidenName: TextBoxComponent;
  @ViewChild('EmbLine4', { static: false }) EmbLine4: TextBoxComponent;
  @ViewChild('EmbLineFlag', { static: false }) EmbLineFlag: RLOUIRadioComponent;
  @ViewChild('CustSubSegment', { static: false }) CustSubSegment: ComboBoxComponent;
  @ViewChild('CD_SAVE_BTN', { static: false }) CD_SAVE_BTN: ButtonComponent;
  @ViewChild('CD_CLEAR_BTN', { static: false }) CD_CLEAR_BTN: ButtonComponent;
  @Output() passBorrowerSeq: EventEmitter<any> = new EventEmitter<any>();
  @Output() passfullName: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('CUST_DTLS_GRID', { static: false }) CUST_DTLS_GRID: CustomerDtlsGridComponent;
  // @ViewChild('FieldId_29', { static: false }) FieldId_29: AddressDetailsComponent;
  // @ViewChild('FieldId_30', { static: false }) FieldId_30: OccupationDtlsFormComponent;
  @ViewChild('Handler', { static: false }) Handler: CustomerHandlerComponent;
  @ViewChild('hidExistCust', { static: false }) hidExistCust: HiddenComponent;
  @ViewChild('hideStaffId', { static: false }) hideStaffId: HiddenComponent;
  @ViewChild('hidAppId', { static: false }) hidAppId: HiddenComponent;
  @ViewChild('hidCusSgmt', { static: false }) hidCusSgmt: HiddenComponent;
  @ViewChild('hidGender', { static: false }) hidGender: HiddenComponent;
  @ViewChild('hidNationality', { static: false }) hidNationality: HiddenComponent;
  @ViewChild('hidMaritalStatus', { static: false }) hidMaritalStatus: HiddenComponent;
  @ViewChild('hidPrefCommCh', { static: false }) hidPrefCommCh: HiddenComponent;
  @ViewChild('hidTitle', { static: false }) hidTitle: HiddenComponent;
  @ViewChild('HidCustomerId', { static: false }) HidCustomerId: HiddenComponent;
  @ViewChild('hideCustomerType', { static: false }) hideCustomerType: HiddenComponent;
  @ViewChild('hideCustSubSegment', { static: false }) hideCustSubSegment: HiddenComponent;
  @ViewChild('hideEmbLineFlag', { static: false }) hideEmbLineFlag: HiddenComponent;
  @ViewChild('CUST_ACCORD', { static: false }) CUST_ACCORD: RloUiAccordionComponent;
  @ViewChild('hidPrefLanguage', { static: false }) hidPrefLanguage: HiddenComponent;
  //@ViewChild('CD_COUNTRY_CODE', { static: false }) CD_COUNTRY_CODE: ComboBoxComponent;
  @ViewChild('hideISDCode', { static: false }) hideISDCode: HiddenComponent;
  @ViewChild('hideCitizenship', { static: false }) hideCitizenship: HiddenComponent;
  @ViewChild('CD_MOBILE_NO', { static: false }) CD_MOBILE_NO: RloUiMobileComponent;
  @ViewChild('RequestedAmountLimit', { static: false }) RequestedAmountLimit: RloUiCurrencyComponent;
  @ViewChild('CardDispatchMode', { static: false }) CardDispatchMode: ComboBoxComponent;
  @ViewChild('hidCardDispatch', { static: false }) hidCardDispatch: HiddenComponent;
  @ViewChild('CD_CARD_CUST_TYPE', { static: false }) CD_CARD_CUST_TYPE: RLOUIRadioComponent;
  @ViewChild('hideCardCustType', { static: false }) hideCardCustType: HiddenComponent;
  @ViewChild('CD_REGISTERED_NAME', { static: false }) CD_REGISTERED_NAME: TextBoxComponent;
  @ViewChild('CD_INCORPORATE_DATE', { static: false }) CD_INCORPORATE_DATE: DateComponent;
  @ViewChild('CD_INCORPORATE_TYPE', { static: false }) CD_INCORPORATE_TYPE: TextBoxComponent;

  @Output() updateCustGrid: EventEmitter<any> = new EventEmitter<any>();
  @Output() onFullNameblur: EventEmitter<any> = new EventEmitter<any>();
  // @Input() ProductCategory: String;
  @Input() customer = true;
  @Input() ApplicationId: string = undefined;
  @Input() isLoanCategory: any = undefined;
  @Input() Cust_FullName: string = undefined;
  @Input() parentFormCode: string = undefined;
  @Input() readOnly: boolean = false;
  @Input() activeBorrowerSeq: any;//used when dynamically loading component in modal ie:UW
  @Input() appCustomerType: string = this.services.rloCommonData.globalApplicationDtls.CustomerType;


  showAddOn: boolean = false;
  appId: any;
  fullName: any;
  staffcheck: boolean;
  customerDetailMap: any;
  custMinAge = 18;
  custMaxAge = 100;


  async revalidate(showErrors: boolean = true): Promise<number> {
    let totalErrors = 0;
    super.beforeRevalidate();
    await Promise.all([
      // this.revalidateBasicField('CD_CUST_TYPE'),
      // this.revalidateBasicField('CD_EXISTING_CUST', false, showErrors),
      // this.revalidateBasicField('CD_STAFF', false, showErrors),
      this.revalidateBasicField('CD_CIF', false, showErrors),
      this.revalidateBasicField('CD_STAFF_ID', false, showErrors),
      // this.revalidateBasicField('CD_CUST_ID', false, showErrors),
      this.revalidateBasicField('CD_TITLE', false, showErrors),
      this.revalidateBasicField('CD_FIRST_NAME', false, showErrors),
      this.revalidateBasicField('CD_MIDDLE_NAME', false, showErrors),
      this.revalidateBasicField('CD_THIRD_NAME', false, showErrors),
      this.revalidateBasicField('CD_LAST_NAME', false, showErrors),
      this.revalidateBasicField('CD_FULL_NAME', false, showErrors),
      this.revalidateBasicField('CD_DOB', false, showErrors),
      this.revalidateBasicField('CD_GENDER', false, showErrors),
      this.revalidateBasicField('CD_MARITAL_STATUS', false, showErrors),
      this.revalidateBasicField('CD_MOBILE_NO', false, showErrors),
      this.revalidateBasicField('CD_EMAIL', false, showErrors),
      this.revalidateBasicField('CD_NATIONALITY', false, showErrors),
      this.revalidateBasicField('CD_CITIZENSHIP', false, showErrors),
      this.revalidateBasicField('CD_PASSPORT_EXPIRY', false, showErrors),
      this.revalidateBasicField('CD_PASSPORT_NO', false, showErrors),
      this.revalidateBasicField('CD_VISA_VALID', false, showErrors),
      this.revalidateBasicField('CD_DRIVING_LICENSE', false, showErrors),
      this.revalidateBasicField('CD_DRVNG_LCNSE_EXP_DT', false, showErrors),
      this.revalidateBasicField('CD_TAX_ID', false, showErrors),
      this.revalidateBasicField('CD_DEBIT_SCORE', false, showErrors),
      // this.revalidateBasicField('CD_NATIONAL_ID', false, showErrors),
      this.revalidateBasicField('CD_CUST_SEGMENT', false, showErrors),
      this.revalidateBasicField('CD_LOAN_OWN', false, showErrors),
      //   this.revalidateBasicField('CD_PRIME_USAGE', false, showErrors),
      this.revalidateBasicField('CD_PMRY_EMBSR_NAME', false, showErrors),
      this.revalidateBasicField('CD_PREF_COM_CH', false, showErrors),
      this.revalidateBasicField('CD_PREF_LANG', false, showErrors),
      this.revalidateBasicField('MaidenName',false,showErrors),
      //this.revalidateBasicField('CD_COUNTRY_CODE'),
      // this.FieldId_29.revalidate(),
      // this.FieldId_30.revalidate(),
    ]).then((errorCounts) => {
      errorCounts.forEach((errorCount) => {
        totalErrors += errorCount;
      });
    });
    this.errors = totalErrors;
    super.afterRevalidate();
    return totalErrors;
  }
  setReadOnly(readOnly) {
    super.setBasicFieldsReadOnly(readOnly);
    // this.FieldId_29.setReadOnly(readOnly);
    // this.FieldId_30.setReadOnly(readOnly);
  }
  async onFormLoad(event) {

    //    this.ApplicationId = event.custSeq

    this.setInputs(this.services.dataStore.getData(this.services.routing.currModal));
    this.CD_FULL_NAME.setReadOnly(true);
    this.hidExistCust.setValue('Y_N');
    this.hideStaffId.setValue('Y_N');
    this.hidAppId.setValue('RLO');
    this.hidCusSgmt.setValue('CUST_SEGMENT');
    this.hidGender.setValue('GENDER');
    this.hidMaritalStatus.setValue('MARITAL_STATUS');
    this.hidNationality.setValue('NATIONALITY');
    this.hidPrefCommCh.setValue('PREF_COMM_CH');
    this.hidTitle.setValue('TITLE');
    this.hidPrefLanguage.setValue('PREF_LANGUAGE');
    this.hideISDCode.setValue('ISD_COUNTRY_CODE');
    this.hideEmbLineFlag.setValue('Y_N');
    this.hideCustSubSegment.setValue('CUST_SUB_SEGMENT');
    this.hidCardDispatch.setValue('CARD_DISPATACH');
    this.hideCardCustType.setValue('ADD_CUSTOMER_TYPE');
    this.hideCitizenship.setValue('CITIZENSHIP');

    if (this.isLoanCategory != undefined) {
      this.loanCategoryChanged();
      // this.hideCustomerType.setValue((!this.isLoanCategory) ? 'ADD_CUSTOMER_TYPE' : 'CUSTOMER_TYPE');
      // this.CD_PMRY_EMBSR_NAME.mandatory = (!this.isLoanCategory) ? true : false;
      // this.MaidenName.mandatory = (!this.isLoanCategory) ? true : false;
    }

    //this.CD_EXISTING_CUST.setDefault('N');
    // this.setYesNoTypeDependency(this.CD_EXISTING_CUST, this.CD_CUST_ID);

    //this.CD_STAFF.setDefault('N');
    //this.setYesNoTypeDependency(this.CD_STAFF, this.CD_STAFF_ID);

    this.Handler.onFormLoad({
    });
    this.setDependencies();
    if ('DDE' == this.parentFormCode) {
      this.CD_LOAN_OWN.setReadOnly(this.services.rloCommonData.calculateLoanOwnership(this.activeBorrowerSeq) < 100 ? false : true);
    }

    // this.Handler.displayCustomerTag();
  }

  setInputs(param: any) {
    const params = this.services.http.mapToJson(param);
    if (params['mode']) {
      this.mode = params['mode'];
    }
  }
  async submitForm(path, apiCode, serviceCode) {
    this.submitData['formName'] = 'Customer Details Main Form';
    await super.submit(path, apiCode, serviceCode);
  }
  getFieldInfo() {
    this.amountComponent.forEach(field => { this.additionalInfo[field.fieldID + '_desc'] = field.getFieldInfo(); });
    this.comboFields.forEach(field => { this.additionalInfo[field.fieldID + '_desc'] = field.getFieldInfo(); });
    this.fileUploadFields.forEach(field => { this.additionalInfo[field.fieldID + '_desc'] = field.getFieldInfo(); });
    // this.additionalInfo['FieldId_29_desc'] = this.FieldId_29.getFieldInfo();
    // this.additionalInfo['FieldId_30_desc'] = this.FieldId_30.getFieldInfo();
    return this.additionalInfo;
  }
  getFieldValue() {
    // this.value.FieldId_29 = this.FieldId_29.getFieldValue();
    // this.value.FieldId_30 = this.FieldId_30.getFieldValue();
    return this.value;
  }
  setValue(inputValue, inputDesc = undefined) {
    this.setBasicFieldsValue(inputValue, inputDesc);
    // this.FieldId_29.setValue(inputValue['FieldId_29'], inputDesc['FieldId_29_desc']);
    // this.FieldId_30.setValue(inputValue['FieldId_30'], inputDesc['FieldId_30_desc']);
    this.value = new CustomerDtlsModel();
    this.value.setValue(inputValue);
    this.setDependencies();
    this.passNewValue(this.value);
  }
  ngOnInit() {
    if (this.formCode === undefined) { this.formCode = 'CustomerDtls'; }
    if (this.formOnLoadError) { return; }
    const styleElement = document.createElement('style');
    styleElement.type = 'text/css';
    styleElement.innerHTML = customCss;
    styleElement.id = 'CustomerDtls_customCss';
    document.getElementsByTagName('head')[0].appendChild(styleElement);
  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    const styleElement = document.getElementById('CustomerDtls_customCss');
    styleElement.parentNode.removeChild(styleElement);
    //  this.updateCustGridEmitter.unsubscribe();
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.subsBFldsValueUpdates();
      // this.value.FieldId_29 = this.FieldId_29.getFieldValue();
      // this.FieldId_29.valueChangeUpdates().subscribe((value) => { this.value.FieldId_29 = value; });
      // this.value.FieldId_30 = this.FieldId_30.getFieldValue();
      // this.FieldId_30.valueChangeUpdates().subscribe((value) => { this.value.FieldId_30 = value; });
      this.onFormLoad(event);
      this.checkForHTabOverFlow();


      //when opened in modal ie:UW
      if (this.readOnly) {
        let obj = {
          selectedCustId: this.activeBorrowerSeq
        }
        this.CUST_DTLS_GRID_custDtlsEdit(obj).then((response) => {
          setTimeout(() => {
            this.setReadOnly(true);
          }, 1000);
        });
      }
    });
  }
  clearError() {
    super.clearBasicFieldsError();
    super.clearHTabErrors();
    super.clearVTabErrors();
    // this.FieldId_29.clearError();
    // this.FieldId_30.clearError();
    this.errors = 0;
    this.errorMessage = [];
  }
  onReset() {
    super.resetBasicFields();
    // this.FieldId_29.onReset();
    // this.FieldId_30.onReset();
    this.clearHTabErrors();
    this.clearVTabErrors();
    this.errors = 0;
    this.errorMessage = [];
    this.additionalInfo = undefined;
    this.dependencyMap.clear();
    this.value = new CustomerDtlsModel();
    this.passNewValue(this.value);
    // this.setReadOnly(false);
    //this.CD_EXISTING_CUST.isOptionsLoaded = false;
    //this.CD_STAFF.isOptionsLoaded = false;
    //  this.setNonEditableFields(false);
    this.onFormLoad(event);
  }

  isFutureDate(selectedDate) {
    const moment = require('moment');
    const currentDate = moment();
    currentDate.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });

    selectedDate = moment(selectedDate, 'DD-MM-YYYY');
    //console.log('current date :: ', currentDate._d);
    //console.log('selected date :: ', selectedDate._d);
    if (selectedDate <= currentDate) {
      return false;
    }
    return true;
  }

  isPastDate(selectedDate) {
    const moment = require('moment');
    const currentDate = moment();
    currentDate.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
    selectedDate = moment(selectedDate, 'DD-MM-YYYY');
    console.log('current date :: ', currentDate._d);
    console.log('selected date :: ', selectedDate._d);
    if (selectedDate >= currentDate) {
      return false;
    }
    return true;
  }

  isAgeValid(selectedDate) {
    const moment = require('moment');
    const currentDate = moment();
    currentDate.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
    selectedDate = moment(selectedDate, 'DD-MM-YYYY');
    const age = currentDate.diff(selectedDate, 'years');
    console.log('age is:', age);
    console.log('cif min age is:', this.custMinAge);
    console.log('cif max age is:', this.custMaxAge);
    if (age < this.custMinAge || age > this.custMaxAge) {
      return false;
    } else {
      return true;
    }
  }
  async family_addfullname(event) {
    console.log("Calling this Emitter");
  }


  genderCheck() {
    if ((this.CD_GENDER.getFieldValue() === 'M' && this.CD_TITLE.getFieldValue() !== 'MR') || (this.CD_GENDER.getFieldValue() === 'F' && this.CD_TITLE.getFieldValue() !== 'MRS') && (this.CD_GENDER.getFieldValue() === 'F' && this.CD_TITLE.getFieldValue() !== 'MS')) {
      this.CD_GENDER.setError('Please select gender according to title');
      return 1;
    }
  }


  async CD_GENDER_blur(event) {
    const inputMap = new Map();
    let checkGender = this.genderCheck();
    return checkGender;
  }

  async CD_DOB_blur(event) {
    const inputMap = new Map();
    if (!this.isPastDate(this.CD_DOB.getFieldValue())) {
      this.CD_DOB.setError('rlo.error.dob-invalid');
      return 1
    } else if (!this.isAgeValid(this.CD_DOB.getFieldValue())) {
      this.CD_DOB.setError('rlo.error.age-invalid');
      return 1


    }
  }

  async CD_PASSPORT_EXPIRY_blur(event) {
    const inputMap = new Map();
    if (!this.isFutureDate(this.CD_PASSPORT_EXPIRY.getFieldValue())) {
      this.CD_PASSPORT_EXPIRY.setError('rlo.error.passport-expire');
      return 1
    }
  }

  async CD_VISA_VALID_blur(event) {
    const inputMap = new Map();
    if (!this.isFutureDate(this.CD_VISA_VALID.getFieldValue())) {
      this.CD_VISA_VALID.setError('rlo.error.visa-expire');
      return 1;
    }
  }

  async CD_DRVNG_LCNSE_EXP_DT_blur(event) {
    const inputMap = new Map();
    if (!this.isFutureDate(this.CD_DRVNG_LCNSE_EXP_DT.getFieldValue())) {
      this.CD_DRVNG_LCNSE_EXP_DT.setError('rlo.error.driv-lcnse-expire');
      return 1
    }
  }


  async CD_FIRST_NAME_blur(event) {
    const inputMap = new Map();
    await this.Handler.updateFullName({
    });
  }
  async CD_MIDDLE_NAME_blur(event) {
    const inputMap = new Map();
    await this.Handler.updateFullName({
    });
  }
  async CD_THIRD_NAME_blur(event) {
    const inputMap = new Map();
    await this.Handler.updateFullName({
    });
  }
  async CD_LAST_NAME_blur(event) {
    const inputMap = new Map();
    await this.Handler.updateFullName({
    });
  }
  async CD_STAFF_change(fieldID, value) {
    const inputMap = new Map();
    //await this.setYesNoTypeDependency(this.CD_STAFF, this.CD_STAFF_ID);
  }
  async EmbLineFlag_change(fieldID, value) {
    const inputMap = new Map();
    this.Handler.embLineFlagselected();
    //await this.setYesNoTypeDependency(this.CD_STAFF, this.CD_STAFF_ID);
  }


  async CD_SAVE_BTN_click(event) {

    const inputMap = new Map();
    //    this.customerDetailMap = any;
    //    this.customerDetailMap = any;

    // this.updateCustGrid.emit({
    //     'custSeq': this.ApplicationId
    // })
    console.log('customerDetailMap', this.customerDetailMap);
    const noOfErrors: number = await this.revalidate();

    // if(this.CD_CUST_TYPE.getFieldValue() == 'B'){
    //     if(this.customerDetailMap.has(this.CD_CUST_TYPE.getFieldValue())){
    //         this.services.alert.showAlert(2, 'Borrower is Already Added Please select other type', -1);
    //         return;
    //     }
    //     }
    // for(let i = 0 ; i < this.customerDetailMap.; i++){
    //   if(this.customers[i].customerType.value == 'B' && this.editId !== this.customers[i].tempId){
    //     this.MainComponent.services.alert.showAlert(2, 'Borrower is Already Added Please select other type', -1);
    //     return;
    //   }
    // }

    if (noOfErrors === 0) {

      let CustomerDetailsArray = [];
      CustomerDetailsArray = this.services.rloCommonData.getCustomerList();
      //  console.log("Shweta :: return from service", CustomerDetailsArray);
      for (let i = 0; i < CustomerDetailsArray.length; i++) {
        if (CustomerDetailsArray[i].BorrowerSeq !== this.HidCustomerId.getFieldValue()) {
          if (CustomerDetailsArray[i].FullName == this.CD_FULL_NAME.getFieldValue() && CustomerDetailsArray[i].DOB == this.CD_DOB.getFieldValue()) {
            this.services.alert.showAlert(2, 'rlo.error.customer.exist', -1);
            return;
          }
        }
      }
      this.CD_SAVE_BTN.setDisabled(true);
      if (this.HidCustomerId.getFieldValue() !== undefined) {
        inputMap.clear();

        inputMap.set('PathParam.BorrowerSeq', this.HidCustomerId.getFieldValue());
        inputMap.set('Body.BorrowerDetails.ApplicationId', this.ApplicationId);
        inputMap.set('Body.BorrowerDetails.Title', this.CD_TITLE.getFieldValue());
        inputMap.set('Body.BorrowerDetails.CustomerType', this.isLoanCategory ? this.CD_CUST_TYPE.getFieldValue() : this.CD_CARD_CUST_TYPE.getFieldValue());
        
        inputMap.set('Body.BorrowerDetails.RegisteredName', this.CD_REGISTERED_NAME.getFieldValue());
        inputMap.set('Body.BorrowerDetails.TypeOfIncorporation', this.CD_INCORPORATE_TYPE.getFieldValue());
        inputMap.set('Body.BorrowerDetails.DateOfIncorporation', this.CD_INCORPORATE_DATE.getFieldValue());
        
        inputMap.set('Body.BorrowerDetails.FirstName', this.CD_FIRST_NAME.getFieldValue());
        inputMap.set('Body.BorrowerDetails.MiddleName', this.CD_MIDDLE_NAME.getFieldValue());
        inputMap.set('Body.BorrowerDetails.LastName', this.CD_LAST_NAME.getFieldValue());
        inputMap.set('Body.BorrowerDetails.FullName', this.CD_FULL_NAME.getFieldValue());
        inputMap.set('Body.BorrowerDetails.DOB', this.CD_DOB.getFieldValue());
        

        inputMap.set('Body.BorrowerDetails.Gender', this.CD_GENDER.getFieldValue());

        inputMap.set('Body.BorrowerDetails.TaxID', this.CD_TAX_ID.getFieldValue());

        inputMap.set('Body.BorrowerDetails.DebitScore', this.CD_DEBIT_SCORE.getFieldValue());
        inputMap.set('Body.BorrowerDetails.CustomerSegment', this.CD_CUST_SEGMENT.getFieldValue());

        // inputMap.set('Body.BorrowerDetails.IsStaff', this.CD_STAFF.getFieldValue());
        inputMap.set('Body.BorrowerDetails.IsStaff', "Y");

        inputMap.set('Body.BorrowerDetails.StaffID', this.CD_STAFF_ID.getFieldValue());
        inputMap.set('Body.BorrowerDetails.PrimaryEmbosserName1', this.CD_PMRY_EMBSR_NAME.getFieldValue());
        inputMap.set('Body.BorrowerDetails.Nationality', this.CD_NATIONALITY.getFieldValue());
        // inputMap.set('Body.BorrowerDetails.CitizenID', this.CD_NATIONAL_ID.getFieldValue());
        inputMap.set('Body.BorrowerDetails.MaritalStatus', this.CD_MARITAL_STATUS.getFieldValue());
        //  inputMap.set('Body.BorrowerDetails.Nationality', this.CD_NATIONAL_ID.getFieldValue());
        inputMap.set('Body.BorrowerDetails.PassportNumber', this.CD_PASSPORT_NO.getFieldValue());
        inputMap.set('Body.BorrowerDetails.PassportExpiryDt', this.CD_PASSPORT_EXPIRY.getFieldValue());
        inputMap.set('Body.BorrowerDetails.DrivingLicense', this.CD_DRIVING_LICENSE.getFieldValue());
        inputMap.set('Body.BorrowerDetails.DrivingLicenseExpiryDt', this.CD_DRVNG_LCNSE_EXP_DT.getFieldValue());

        // inputMap.set('Body.BorrowerDetails.ExistingCustomer', this.CD_EXISTING_CUST.getFieldValue());
        inputMap.set('Body.BorrowerDetails.ExistingCustomer', "Y");

        inputMap.set('Body.BorrowerDetails.CommunicationAlertChannel', this.CD_PREF_COM_CH.getFieldValue());
        // inputMap.set('Body.BorrowerDetails.CustomerType', this.CD_CUST_TYPE.getFieldValue());

        inputMap.set('Body.BorrowerDetails.CIF', this.CD_CIF.getFieldValue());
        // inputMap.set('Body.BorrowerDetails.ICIFNumber', this.CD_CUST_ID.getFieldValue());
        inputMap.set('Body.BorrowerDetails.CitizenShip', this.CD_CITIZENSHIP.getFieldValue());
        inputMap.set('Body.BorrowerDetails.PreferredLanguage', this.CD_PREF_LANG.getFieldValue());
        inputMap.set('Body.BorrowerDetails.LoanOwnership', this.CD_LOAN_OWN.getFieldValue());
        //  inputMap.set('Body.BorrowerDetails.PrimeUsage', this.CD_PRIME_USAGE.getFieldValue());
        inputMap.set('Body.BorrowerDetails.Email', this.CD_EMAIL.getFieldValue());

        inputMap.set('Body.BorrowerDetails.ISDCountryCode', this.CD_MOBILE_NO.countryCode);
        inputMap.set('Body.BorrowerDetails.MobileNo', this.CD_MOBILE_NO.getFieldValue());
        inputMap.set('Body.BorrowerDetails.VisaExpiryDt', this.CD_VISA_VALID.getFieldValue());
        inputMap.set('Body.BorrowerDetails.EmbLine4', this.EmbLine4.getFieldValue());
        inputMap.set('Body.BorrowerDetails.EmbLineFlag', this.EmbLineFlag.getFieldValue());
        inputMap.set('Body.BorrowerDetails.CustSubSegment', this.CustSubSegment.getFieldValue());
        inputMap.set('Body.BorrowerDetails.MaidenName', this.MaidenName.getFieldValue());
        inputMap.set('Body.BorrowerDetails.RequestedCreditLimit', this.RequestedAmountLimit.getFieldValue());
        inputMap.set('Body.BorrowerDetails.PickUpInstruction', this.CardDispatchMode.getFieldValue());


        console.log(inputMap, this.CD_MOBILE_NO.countryCode);

        this.services.http.fetchApi('/BorrowerDetails/{BorrowerSeq}', 'PUT', inputMap, '/initiation').subscribe(
          async (httpResponse: HttpResponse<any>) => {
            const res = httpResponse.body;
            this.services.alert.showAlert(1, 'rlo.success.update.customer', 5000);
            this.CD_SAVE_BTN.setDisabled(false);
            this.services.rloCommonData.childToParentSubject.next({
              action: 'updateCustGrid',
              data: { 'borrowerSeq': this.HidCustomerId.getFieldValue() }
            });


            // this.onReset();
          },
          async (httpError) => {
            const err = httpError['error'];
            if (err != null && err['ErrorElementPath'] !== undefined && err['ErrorDescription'] !== undefined) {
              if (err['ErrorElementPath'] === 'BorrowerDetails.Email') {
                this.CD_EMAIL.setError(err['ErrorDescription']);
              } else if (err['ErrorElementPath'] === 'BorrowerDetails.LoanOwnership') {
                this.CD_LOAN_OWN.setError(err['ErrorDescription']);
              } else if (err['ErrorElementPath'] === 'BorrowerDetails.CIF') {
                this.CD_CIF.setError(err['ErrorDescription']);
              } else if (err['ErrorElementPath'] === 'BorrowerDetails.CommunicationAlertChannel') {
                this.CD_PREF_COM_CH.setError(err['ErrorDescription']);
              } else if (err['ErrorElementPath'] === 'BorrowerDetails.ExistingCustomer') {
                //this.CD_EXISTING_CUST.setError(err['ErrorDescription']);
              } else if (err['ErrorElementPath'] === 'BorrowerDetails.DrivingLicenseExpiryDt') {
                this.CD_DRVNG_LCNSE_EXP_DT.setError(err['ErrorDescription']);
              } else if (err['ErrorElementPath'] === 'BorrowerDetails.DrivingLicense') {
                this.CD_DRIVING_LICENSE.setError(err['ErrorDescription']);
              } else if (err['ErrorElementPath'] === 'BorrowerDetails.PassportExpiryDt') {
                this.CD_PASSPORT_EXPIRY.setError(err['ErrorDescription']);
              } else if (err['ErrorElementPath'] === 'BorrowerDetails.PassportNumber') {
                this.CD_PASSPORT_NO.setError(err['ErrorDescription']);
              } else if (err['ErrorElementPath'] === 'BorrowerDetails.MaritalStatus') {
                this.CD_MARITAL_STATUS.setError(err['ErrorDescription']);
              } else if (err['ErrorElementPath'] === 'BorrowerDetails.CitizenID') {
                this.CD_CITIZENSHIP.setError(err['ErrorDescription']);
              } else if (err['ErrorElementPath'] === 'BorrowerDetails.Nationality') {
                this.CD_NATIONALITY.setError(err['ErrorDescription']);
              } else if (err['ErrorElementPath'] === 'BorrowerDetails.PrimaryEmbosserName1') {
                this.CD_PMRY_EMBSR_NAME.setError(err['ErrorDescription']);
              } else if (err['ErrorElementPath'] === 'BorrowerDetails.StaffID') {
                //this.CD_STAFF_ID.setError(err['ErrorDescription']);
              } else if (err['ErrorElementPath'] === 'BorrowerDetails.IsStaff') {
                //this.CD_STAFF.setError(err['ErrorDescription']);
              } else if (err['ErrorElementPath'] === 'BorrowerDetails.CustomerSegment') {
                this.CD_CUST_SEGMENT.setError(err['ErrorDescription']);
              } else if (err['ErrorElementPath'] === 'BorrowerDetails.DebitScore') {
                this.CD_DEBIT_SCORE.setError(err['ErrorDescription']);
              } else if (err['ErrorElementPath'] === 'BorrowerDetails.MobileNo') {
                this.CD_MOBILE_NO.setError(err['ErrorDescription']);
              } else if (err['ErrorElementPath'] === 'BorrowerDetails.TaxID') {
                this.CD_TAX_ID.setError(err['ErrorDescription']);
              } else if (err['ErrorElementPath'] === 'BorrowerDetails.DOB') {
                this.CD_DOB.setError(err['ErrorDescription']);
              } else if (err['ErrorElementPath'] === 'BorrowerDetails.Gender') {
                this.CD_GENDER.setError(err['ErrorDescription']);
              } else if (err['ErrorElementPath'] === 'BorrowerDetails.FullName') {
                this.CD_FULL_NAME.setError(err['ErrorDescription']);
              } else if (err['ErrorElementPath'] === 'BorrowerDetails.LastName') {
                this.CD_LAST_NAME.setError(err['ErrorDescription']);
              } else if (err['ErrorElementPath'] === 'BorrowerDetails.MiddleName') {
                this.CD_MIDDLE_NAME.setError(err['ErrorDescription']);
              } else if (err['ErrorElementPath'] === 'BorrowerDetails.FirstName') {
                this.CD_FIRST_NAME.setError(err['ErrorDescription']);
              } else if (err['ErrorElementPath'] === 'BorrowerDetails.Title') {
                this.CD_TITLE.setError(err['ErrorDescription']);
              } else if (err['ErrorElementPath'] === 'BorrowerSeq') {
                this.HidCustomerId.setError(err['ErrorDescription']);
              }
            }
            this.services.alert.showAlert(2, 'rlo.error.update.cutomer', -1);
            this.CD_SAVE_BTN.setDisabled(false);
          }
        );
      } else {
        inputMap.clear();
        inputMap.set('Body.BorrowerDetails.Title', this.CD_TITLE.getFieldValue());
        inputMap.set('Body.BorrowerDetails.ApplicationId', this.ApplicationId);
        // inputMap.set('Body.BorrowerDetails.FirstName', this.CD_FIRST_NAME.getFieldValue());
        // inputMap.set('Body.BorrowerDetails.MiddleName', this.CD_MIDDLE_NAME.getFieldValue());
        // inputMap.set('Body.BorrowerDetails.LastName', this.CD_LAST_NAME.getFieldValue());
        // inputMap.set('Body.BorrowerDetails.FullName', this.CD_FULL_NAME.getFieldValue());
        inputMap.set('Body.BorrowerDetails.CustomerType', this.isLoanCategory ? this.CD_CUST_TYPE.getFieldValue() : this.CD_CARD_CUST_TYPE.getFieldValue());
       
        inputMap.set('Body.BorrowerDetails.RegisteredName', this.CD_REGISTERED_NAME.getFieldValue());
        inputMap.set('Body.BorrowerDetails.TypeOfIncorporation', this.CD_INCORPORATE_TYPE.getFieldValue());
        inputMap.set('Body.BorrowerDetails.DateOfIncorporation', this.CD_INCORPORATE_DATE.getFieldValue());
        
        inputMap.set('Body.BorrowerDetails.FirstName', this.CD_FIRST_NAME.getFieldValue());
        inputMap.set('Body.BorrowerDetails.MiddleName', this.CD_MIDDLE_NAME.getFieldValue());
        inputMap.set('Body.BorrowerDetails.LastName', this.CD_LAST_NAME.getFieldValue());
        inputMap.set('Body.BorrowerDetails.FullName', this.CD_FULL_NAME.getFieldValue());
        inputMap.set('Body.BorrowerDetails.DOB', this.CD_DOB.getFieldValue());
       
        inputMap.set('Body.BorrowerDetails.Gender', this.CD_GENDER.getFieldValue());
        inputMap.set('Body.BorrowerDetails.DOB', this.CD_DOB.getFieldValue());
        inputMap.set('Body.BorrowerDetails.TaxID', this.CD_TAX_ID.getFieldValue());
        inputMap.set('Body.BorrowerDetails.DebitScore', this.CD_DEBIT_SCORE.getFieldValue());
        inputMap.set('Body.BorrowerDetails.CustomerSegment', this.CD_CUST_SEGMENT.getFieldValue());

        // inputMap.set('Body.BorrowerDetails.IsStaff', this.CD_STAFF.getFieldValue());
        inputMap.set('Body.BorrowerDetails.IsStaff', "Y");

        inputMap.set('Body.BorrowerDetails.StaffID', this.CD_STAFF_ID.getFieldValue());
        inputMap.set('Body.BorrowerDetails.PrimaryEmbosserName1', this.CD_PMRY_EMBSR_NAME.getFieldValue());
        inputMap.set('Body.BorrowerDetails.Nationality', this.CD_NATIONALITY.getFieldValue());
        inputMap.set('Body.BorrowerDetails.MaritalStatus', this.CD_MARITAL_STATUS.getFieldValue());
        // inputMap.set('Body.BorrowerDetails.CitizenID', this.CD_NATIONAL_ID.getFieldValue());
        inputMap.set('Body.BorrowerDetails.PassportNumber', this.CD_PASSPORT_NO.getFieldValue());
        inputMap.set('Body.BorrowerDetails.PassportExpiryDt', this.CD_PASSPORT_EXPIRY.getFieldValue());
        inputMap.set('Body.BorrowerDetails.DrivingLicense', this.CD_DRIVING_LICENSE.getFieldValue());
        inputMap.set('Body.BorrowerDetails.DrivingLicenseExpiryDt', this.CD_DRVNG_LCNSE_EXP_DT.getFieldValue());
        inputMap.set('Body.BorrowerDetails.CommunicationAlertChannel', this.CD_PREF_COM_CH.getFieldValue());

        // inputMap.set('Body.BorrowerDetails.ExistingCustomer', this.CD_EXISTING_CUST.getFieldValue());
        inputMap.set('Body.BorrowerDetails.ExistingCustomer', "Y");

        // inputMap.set('Body.BorrowerDetails.CustomerType', this.isLoanCategory ? this.CD_CUST_TYPE.getFieldValue() : this.CD_CARD_CUST_TYPE.getFieldValue());

        inputMap.set('Body.BorrowerDetails.CIF', this.CD_CIF.getFieldValue());
        // inputMap.set('Body.BorrowerDetails.ICIFNumber', this.CD_CUST_ID.getFieldValue());
        inputMap.set('Body.BorrowerDetails.CitizenShip', this.CD_CITIZENSHIP.getFieldValue());
        inputMap.set('Body.BorrowerDetails.PreferredLanguage', this.CD_PREF_LANG.getFieldValue());
        inputMap.set('Body.BorrowerDetails.LoanOwnership', this.CD_LOAN_OWN.getFieldValue());
        //    inputMap.set('Body.BorrowerDetails.PrimeUsage', this.CD_PRIME_USAGE.getFieldValue());
        inputMap.set('Body.BorrowerDetails.Email', this.CD_EMAIL.getFieldValue());

        inputMap.set('Body.BorrowerDetails.MobileNo', this.CD_MOBILE_NO.getFieldValue());
        inputMap.set('Body.BorrowerDetails.ISDCountryCode', this.CD_MOBILE_NO.countryCode);
        inputMap.set('Body.BorrowerDetails.VisaExpiryDt', this.CD_VISA_VALID.getFieldValue());
        inputMap.set('Body.BorrowerDetails.EmbLine4', this.EmbLine4.getFieldValue());
        inputMap.set('Body.BorrowerDetails.EmbLineFlag', this.EmbLineFlag.getFieldValue());
        inputMap.set('Body.BorrowerDetails.CustSubSegment', this.CustSubSegment.getFieldValue());
        inputMap.set('Body.BorrowerDetails.MaidenName', this.MaidenName.getFieldValue());
        inputMap.set('Body.BorrowerDetails.RequestedCreditLimit', this.RequestedAmountLimit.getFieldValue());
        inputMap.set('Body.BorrowerDetails.PickUpInstruction', this.CardDispatchMode.getFieldValue());
        inputMap.set('Body.BorrowerDetails.RegisteredName', this.CD_REGISTERED_NAME.getFieldValue());
        inputMap.set('Body.BorrowerDetails.TypeOfIncorporation', this.CD_INCORPORATE_TYPE.getFieldValue());
        inputMap.set('Body.BorrowerDetails.DateOfIncorporation', this.CD_INCORPORATE_DATE.getFieldValue());



        this.services.http.fetchApi('/BorrowerDetails', 'POST', inputMap, '/initiation').subscribe(
          async (httpResponse: HttpResponse<any>) => {
            const res = httpResponse.body;
            this.HidCustomerId.setValue(res['BorrowerDetails']['BorrowerSeq']);
            this.services.alert.showAlert(1, 'rlo.success.save.customer', 5000);
            this.CD_SAVE_BTN.setDisabled(false);
            this.CD_FULL_NAME_change(this.CD_FULL_NAME.getFieldValue(), this.CD_CUST_TYPE.getFieldValue());
            this.services.rloCommonData.childToParentSubject.next({
              action: 'updateCustGrid',
              data: { 'borrowerSeq': this.HidCustomerId.getFieldValue() }
            });

          },
          async (httpError) => {
            const err = httpError['error'];
            if (err != null && err['ErrorElementPath'] !== undefined && err['ErrorDescription'] !== undefined) {
              if (err['ErrorElementPath'] === 'BorrowerDetails.Email') {
                this.CD_EMAIL.setError(err['ErrorDescription']);
              } else if (err['ErrorElementPath'] === 'BorrowerDetails.ExistingCustomer') {
                //this.CD_EXISTING_CUST.setError(err['ErrorDescription']);
              } else if (err['ErrorElementPath'] === 'BorrowerDetails.CommunicationAlertChannel') {
                this.CD_PREF_COM_CH.setError(err['ErrorDescription']);
              } else if (err['ErrorElementPath'] === 'BorrowerDetails.DrivingLicenseExpiryDt') {
                this.CD_DRVNG_LCNSE_EXP_DT.setError(err['ErrorDescription']);
              } else if (err['ErrorElementPath'] === 'BorrowerDetails.DrivingLicense') {
                this.CD_DRIVING_LICENSE.setError(err['ErrorDescription']);
              } else if (err['ErrorElementPath'] === 'BorrowerDetails.PassportExpiryDt') {
                this.CD_PASSPORT_EXPIRY.setError(err['ErrorDescription']);
              } else if (err['ErrorElementPath'] === 'BorrowerDetails.PassportNumber') {
                this.CD_PASSPORT_NO.setError(err['ErrorDescription']);
              } else if (err['ErrorElementPath'] === 'BorrowerDetails.MaritalStatus') {
                this.CD_MARITAL_STATUS.setError(err['ErrorDescription']);
              } else if (err['ErrorElementPath'] === 'BorrowerDetails.CitizenID') {
                this.CD_CITIZENSHIP.setError(err['ErrorDescription']);
              } else if (err['ErrorElementPath'] === 'BorrowerDetails.Nationality') {
                this.CD_NATIONALITY.setError(err['ErrorDescription']);
              } else if (err['ErrorElementPath'] === 'BorrowerDetails.PrimaryEmbosserName1') {
                this.CD_PMRY_EMBSR_NAME.setError(err['ErrorDescription']);
              } else if (err['ErrorElementPath'] === 'BorrowerDetails.StaffID') {
                //this.CD_STAFF_ID.setError(err['ErrorDescription']);
              } else if (err['ErrorElementPath'] === 'BorrowerDetails.IsStaff') {
                //this.CD_STAFF.setError(err['ErrorDescription']);
              } else if (err['ErrorElementPath'] === 'BorrowerDetails.CustomerSegment') {
                this.CD_CUST_SEGMENT.setError(err['ErrorDescription']);
              } else if (err['ErrorElementPath'] === 'BorrowerDetails.DebitScore') {
                this.CD_DEBIT_SCORE.setError(err['ErrorDescription']);
              } else if (err['ErrorElementPath'] === 'BorrowerDetails.MobileNo') {
                this.CD_MOBILE_NO.setError(err['ErrorDescription']);
              } else if (err['ErrorElementPath'] === 'BorrowerDetails.TaxID') {
                this.CD_TAX_ID.setError(err['ErrorDescription']);
              } else if (err['ErrorElementPath'] === 'BorrowerDetails.DOB') {
                this.CD_DOB.setError(err['ErrorDescription']);
              } else if (err['ErrorElementPath'] === 'BorrowerDetails.Gender') {
                this.CD_GENDER.setError(err['ErrorDescription']);
              } else if (err['ErrorElementPath'] === 'BorrowerDetails.FullName') {
                this.CD_FULL_NAME.setError(err['ErrorDescription']);
              } else if (err['ErrorElementPath'] === 'BorrowerDetails.LastName') {
                this.CD_LAST_NAME.setError(err['ErrorDescription']);
              } else if (err['ErrorElementPath'] === 'BorrowerDetails.MiddleName') {
                this.CD_MIDDLE_NAME.setError(err['ErrorDescription']);
              } else if (err['ErrorElementPath'] === 'BorrowerDetails.FirstName') {
                this.CD_FIRST_NAME.setError(err['ErrorDescription']);
              } else if (err['ErrorElementPath'] === 'BorrowerDetails.Title') {
                this.CD_TITLE.setError(err['ErrorDescription']);
              }
            }
            this.services.alert.showAlert(2, 'rlo.error.wrong.form', -1);
            this.CD_SAVE_BTN.setDisabled(false);
          }
        );
      }

      //    this.Handler.deactivateClasses();
    } else {
      this.services.alert.showAlert(2, 'rlo.error.invalid.form', -1);
    }
  }
  async CD_CLEAR_BTN_click(event) {
    let array = this.fieldArrayFunction();
    const inputMap = new Map();
    // if (this.CD_CUST_TYPE.getFieldValue() !== 'G' && this.CD_CUST_TYPE.getFieldValue() !== 'OP' && this.parentFormCode !== 'DDE' && this.CD_CUST_TYPE.getFieldValue() !== 'A') {
    //   this.clearQDEFields();
    // } else {
    //   this.clearQDEFields();
    //   array.forEach(function (arrayreset) { arrayreset.onReset() });
    //   this.setNonEditableFields(false);
    // }
    if (this.activeBorrowerSeq == undefined) {
      this.clearQDEFields();
      array.forEach(function (arrayreset) { arrayreset.onReset() });
    }
    else {
      this.clearQDEFields();
    }
    //   this.onReset();
    //  this.Handler.deactivateClasses();
  }

  clearQDEFields() {
    this.CD_MARITAL_STATUS.onReset();
    //  this.CD_EMAIL.onReset();
    this.CD_NATIONALITY.setValue(this.services.rloui.getConfig('country.code.default'));
    this.CD_CITIZENSHIP.setValue(this.services.rloui.getConfig('country.code.default'));
    this.CD_PASSPORT_EXPIRY.onReset();
    this.CD_PASSPORT_NO.onReset();
    this.CD_VISA_VALID.onReset();
    this.CD_DRIVING_LICENSE.onReset();
    this.CD_DRVNG_LCNSE_EXP_DT.onReset();
   // this.CD_TAX_ID.onReset();
    this.CD_DEBIT_SCORE.onReset();
    // this.CD_NATIONAL_ID.onReset();
    this.CD_CUST_SEGMENT.onReset();
    this.CustSubSegment.onReset();
    //  this.CD_PRIME_USAGE.onReset();
    this.CD_PMRY_EMBSR_NAME.onReset();
    this.CD_PREF_COM_CH.onReset();
    this.CD_PREF_LANG.onReset();
    this.CD_STAFF_ID.onReset();
    this.RequestedAmountLimit.resetFieldAndDropDown();
    this.CardDispatchMode.onReset();
    this.MaidenName.onReset();
    // this.CD_MOBILE_NO.onResetMobileNo();
    //this.CD_COUNTRY_CODE.onReset();
    // this.CD_CIF.onReset();
  }

  async CUST_DTLS_GRID_custDtlsEdit(event) {
    const inputMap = new Map();
    inputMap.clear();
    inputMap.set('PathParam.BorrowerSeq', event.selectedCustId);
    this.services.http.fetchApi('/BorrowerDetails/{BorrowerSeq}', 'GET', inputMap, '/initiation').subscribe(
      async (httpResponse: HttpResponse<any>) => {
        const res = httpResponse.body;
        console.log(this.isLoanCategory);
        this.LoadCustomerDetailsonFormLoad(res['BorrowerDetails']);

        // function setData() {
        //   this.CD_TITLE.setValue(res['BorrowerDetails']['Title']);
        //   this.CD_FIRST_NAME.setValue(res['BorrowerDetails']['FirstName']);
        //   this.CD_MIDDLE_NAME.setValue(res['BorrowerDetails']['MiddleName']);
        //   this.CD_LAST_NAME.setValue(res['BorrowerDetails']['LastName']);
        //   this.CD_FULL_NAME.setValue(res['BorrowerDetails']['FullName']);
        //   this.CD_GENDER.setValue(res['BorrowerDetails']['Gender']);
        //   this.CD_DOB.setValue(res['BorrowerDetails']['DOB']);
        //   this.CD_TAX_ID.setValue(res['BorrowerDetails']['TaxID']);
        //   this.CD_DEBIT_SCORE.setValue(res['BorrowerDetails']['DebitScore']);
        //   this.CD_CUST_SEGMENT.setValue(res['BorrowerDetails']['CustomerSegment']);
        //   this.CD_CUST_ID.setValue(res['BorrowerDetails']['ICIFNumber']);
        //   this.CD_STAFF_ID.setValue(res['BorrowerDetails']['IsStaff']);
        //   // this.setYesNoTypeDependency(this.CD_STAFF, this.CD_STAFF_ID, res['BorrowerDetails']['StaffID']);
        //   // this.setYesNoTypeDependency(this.CD_EXISTING_CUST, this.CD_CUST_ID, res['BorrowerDetails']['ICIFNumber']);
        //   this.CD_PMRY_EMBSR_NAME.setValue(res['BorrowerDetails']['PrimaryEmbosserName1']);
        //   this.CD_NATIONALITY.setValue(res['BorrowerDetails']['Nationality']);
        //   this.CD_CITIZENSHIP.setValue(res['BorrowerDetails']['CitizenShip']);
        //   this.CD_MARITAL_STATUS.setValue(res['BorrowerDetails']['MaritalStatus']);
        //   // this.CD_NATIONAL_ID.setValue(res['BorrowerDetails']['CitizenID']);
        //   this.CD_PASSPORT_NO.setValue(res['BorrowerDetails']['PassportNumber']);
        //   this.CD_PASSPORT_EXPIRY.setValue(res['BorrowerDetails']['PassportExpiryDt']);
        //   this.CD_DRIVING_LICENSE.setValue(res['BorrowerDetails']['DrivingLicense']);
        //   this.CD_DRVNG_LCNSE_EXP_DT.setValue(res['BorrowerDetails']['DrivingLicenseExpiryDt']);
        //   this.CD_PREF_COM_CH.setValue(res['BorrowerDetails']['CommunicationAlertChannel']);
        //   this.CD_EMAIL.setValue(res['BorrowerDetails']['Email']);
        //   this.HidCustomerId.setValue(res['BorrowerDetails']['BorrowerSeq']);
        //   this.CD_PREF_LANG.setValue(res['BorrowerDetails']['PreferredLanguage']);
        //   this.CD_VISA_VALID.setValue(res['BorrowerDetails']['VisaExpiryDt']);

        //   this.addseq = res['BorrowerDetails']['BorrowerSeq'];

        //   this.CD_LOAN_OWN.setValue(res['BorrowerDetails']['LoanOwnership']);
        //   this.CD_CUST_TYPE.setValue(res['BorrowerDetails']['CustomerType']);

        //   this.CD_STAFF.setValue(res['BorrowerDetails']['IsStaff']);
        //   this.CD_EXISTING_CUST.setValue(res['BorrowerDetails']['ExistingCustomer']);
        //   this.CD_CIF.setValue(res['BorrowerDetails']['CIF']);

        //   this.CD_MOBILE_NO.setComponentSpecificValue(res['BorrowerDetails']['MobileNo'], res['BorrowerDetails']['ISDCountryCode']);
        //   this.CD_FULL_NAME_change(this.CD_FULL_NAME.getFieldValue(), this.CD_CUST_TYPE.getFieldValue());

        //   // if (this.CD_CUST_TYPE.getFieldValue() !== 'G' && this.CD_CUST_TYPE.getFieldValue() !== 'OP' && this.parentFormCode !== 'DDE' && this.CD_CUST_TYPE.getFieldValue() !== 'A') {
        //   //   this.setNonEditableFields(true);
        //   // } else {
        //   //   this.setNonEditableFields(false);
        //   // }

        //   this.passBorrowerSeq.emit({
        //     'BorrowerSeq': res['BorrowerDetails']['BorrowerSeq'],
        //   });

        //   // this.passfullName.emit({
        //   //   'FullName': res['BorrowerDetails']['FullName'],
        //   // });

        //   this.revalidate(false).then((errors) => {
        //     if (errors === 0) {
        //       let array = [];
        //       array.push({ isValid: true });

        //       let obj = {
        //         "name": "CustomerDetails",
        //         "data": array,
        //         "BorrowerSeq": this.HidCustomerId.getFieldValue()
        //       };

        //       this.services.rloCommonData.globalComponentLvlDataHandler(obj);
        //     }
        //   });
        // }
      },
      async (httpError) => {
        const err = httpError['error'];
        if (err != null && err['ErrorElementPath'] !== undefined && err['ErrorDescription'] !== undefined) {
        }
      }
    );

  }

  LoadCustomerDetailsonFormLoad(customerDtlsObj) {
    console.log("*****LoadCustomerDetailsonFormLoad", customerDtlsObj);
    // if (this.parentFormCode == 'DDE') {
    //   this.setNonEditableFields(true)
    //  }
    const customer = customerDtlsObj;
    this.dispalyAddonField(customer.CustomerType);
    this.CD_LOAN_OWN.setReadOnly(this.disableLoanOwnership(customer.CustomerType));
   
    this.CD_REGISTERED_NAME.setValue(customer.RegisteredName);
    this.CD_INCORPORATE_DATE.setValue(customer.DateOfIncorporation);
    this.CD_INCORPORATE_TYPE.setValue(customer.TypeOfIncorporation);

   
    this.CD_TITLE.setValue(customer.Title.id);
    this.CD_FIRST_NAME.setValue(customer.FirstName);
    this.CD_MIDDLE_NAME.setValue(customer.MiddleName);
    this.CD_LAST_NAME.setValue(customer.LastName);
    this.MaidenName.setValue(customer.MaidenName);
    this.CD_FULL_NAME.setValue(customer.FullName);
    this.CD_DOB.setValue(customer.DOB);
    this.CD_GENDER.setValue(customer.Gender.id);
    
    this.CD_TAX_ID.setValue(customer.TaxID);
    this.CD_DEBIT_SCORE.setValue(customer.DebitScore);
    this.CD_CUST_SEGMENT.setValue(customer.CustomerSegment.id);
    // this.CD_CUST_ID.setValue(customer.ICIFNumber);
    this.CD_STAFF_ID.setValue(customer.StaffID);
    // this.setYesNoTypeDependency(this.CD_EXISTING_CUST, this.CD_CUST_ID, customer.ICIFNumber);
    // this.setYesNoTypeDependency(this.CD_STAFF, this.CD_STAFF_ID, customer.StaffID);
    this.CD_PMRY_EMBSR_NAME.setValue(customer.PrimaryEmbosserName1);
    this.CD_NATIONALITY.setValue(customer.Nationality.id != undefined ? customer.Nationality.id : this.services.rloui.getConfig('country.code.default'));
    this.CD_CITIZENSHIP.setValue(customer.CitizenShip.id != undefined ? customer.CitizenShip.id : this.services.rloui.getConfig('country.code.default'));
    //this.CD_NATIONALITY.setValue(customer.Nationality.id);
    // this.CD_CITIZENSHIP.setValue(customer.CitizenShip.id);
    this.CD_MARITAL_STATUS.setValue(customer.MaritalStatus.id);
    // this.CD_NATIONAL_ID.setValue(customer.CitizenID);
    this.CD_PASSPORT_NO.setValue(customer.PassportNumber);
    this.CD_PASSPORT_EXPIRY.setValue(customer.PassportExpiryDt);
    this.CD_DRIVING_LICENSE.setValue(customer.DrivingLicense);
    this.CD_DRVNG_LCNSE_EXP_DT.setValue(customer.DrivingLicenseExpiryDt);
    this.CD_PREF_COM_CH.setValue(customer.CommunicationAlertChannel.id);
    this.CD_EMAIL.setValue(customer.Email);
    this.HidCustomerId.setValue(customer.BorrowerSeq);
    this.CD_PREF_LANG.setValue(customer.PreferredLanguage);
    this.CD_VISA_VALID.setValue(customer.VisaExpiryDt);
    this.EmbLine4.setValue(customer.EmbLine4);
    this.EmbLineFlag.setValue(customer.EmbLineFlag.id, undefined, true);
    this.activeBorrowerSeq = customer.BorrowerSeq;
    this.CD_CARD_CUST_TYPE.setValue(customer.CustomerType, undefined, true);

    this.ManageCardTypeBasedFields(customer.CustomerType);
    if (customer.CustomerType == 'B') {
      this.CD_CIF.setReadOnly(true);
    }
    this.CD_LOAN_OWN.setValue(customer.LoanOwnership);





    //this.CD_STAFF.setValue(customer.IsStaff);
    //this.CD_EXISTING_CUST.setValue(customer.ExistingCustomer);

    this.CD_CIF.setValue(customer.CIF);

    this.CustSubSegment.setValue(customer.CustSubSegment.id);
    this.RequestedAmountLimit.setComponentSpecificValue(customer.RequestedCreditLimit);
    this.CardDispatchMode.setValue(customer.PickUpInstruction);


    //this.CD_COUNTRY_CODE.setValue(customer.ISDCountryCode);
    this.CD_MOBILE_NO.setComponentSpecificValue(customer.MobileNo, customer.ISDCountryCode);
    this.CD_FULL_NAME_change(customer.FullName, customer.CustomerType);

    this.Handler.embLineFlagselected();

    this.passBorrowerSeq.emit({
      'BorrowerSeq': customer.BorrowerSeq,
    });

    this.revalidate(false).then((errors) => {
      if (errors === 0) {
        let array = [];
        array.push({ isValid: true });

        let obj = {
          "name": "CustomerDetails",
          "data": array,
          "BorrowerSeq": this.HidCustomerId.getFieldValue()
        };

        this.services.rloCommonData.globalComponentLvlDataHandler(obj);
      }
    });
    // this.passfullName.emit({
    //     'FullName': customer.FullName,
    // });
  }
  // async loadCustDtlsGrid(event) {
  //     let inputMap = new Map();
  //     // await this.CUST_DTLS_GRID.gridDataLoad({
  //     //     'custSeqToGrid': event.custSeq,
  //     // });
  //     this.Handler.APIForCustomerData(event);

  // }
  setYesNoTypeDependency(field, dependantField, dependantValue?: String) {
    if (dependantValue !== undefined) {
      field.setValue('Y', undefined, true);
      //  field.setValue('Y')
      dependantField.setValue(dependantValue);
    }
    if ((field.getFieldValue() == null || field.getFieldValue() === undefined || field.getFieldValue() === '' || field.getFieldValue() === 'N') && field.valuePending !== 'Y') {
      dependantField.onReset();
      dependantField.readOnly = true;
      dependantField.mandatory = false;
    } else {
      dependantField.readOnly = false;
      dependantField.mandatory = true;
    }
  }

  // CD_EXISTING_CUST_change(fieldId, value) {
  //     this.setYesNoTypeDependency(this.CD_EXISTING_CUST, this.CD_CUST_ID);
  // }

  setNonEditableFields(flag) {
    //  this.CD_CUST_TYPE.setReadOnly(flag);
    let mandatoryFlag = flag == true ? false : true;
    this.CD_TITLE.setReadOnly(flag);
    this.CD_TITLE.mandatory = mandatoryFlag;
    this.CD_FIRST_NAME.setReadOnly(flag);
    this.CD_FIRST_NAME.mandatory = mandatoryFlag;
    this.CD_MIDDLE_NAME.setReadOnly(flag);
    // this.CD_THIRD_NAME.setReadOnly(flag);
    //this.CD_THIRD_NAME.mandatory=mandatoryFlag;
    this.CD_LAST_NAME.setReadOnly(flag);
    this.CD_LAST_NAME.mandatory = mandatoryFlag;
    this.CD_DOB.setReadOnly(flag);
    this.CD_DOB.mandatory = mandatoryFlag;
    this.CD_GENDER.setReadOnly(flag);
    this.CD_GENDER.mandatory = mandatoryFlag;
  }

  onCountrycodeChanged() {
    //console.log('country code changed ', this.CD_COUNTRY_CODE);
  }

  setNewCustomerFrom(event) {
    this.onReset();
    this.onFullNameblur.emit({});
    if (this.isLoanCategory) {
      this.CD_CUST_TYPE.setValue(event.customerType, undefined, true);
    } else {
      this.CD_CARD_CUST_TYPE.setValue(event.customerType, undefined, true)
      this.CD_NATIONALITY.setValue(this.services.rloui.getConfig('country.code.default'));
      this.CD_CITIZENSHIP.setValue(this.services.rloui.getConfig('country.code.default'));
    }
    //  this.setNonEditableFields(false);
    this.CD_LOAN_OWN.setReadOnly(this.disableLoanOwnership(event.customerType));
    this.dispalyAddonField(event.customerType);
    this.ManageCardTypeBasedFields(event.customerType)
  }
  ManageCardTypeBasedFields(applicantType) {
    let appCustomerType = this.services.rloCommonData.globalApplicationDtls.CustomerType;
    let CorporateApplicantFlag: boolean = undefined;
    this.EmbLineFlag.setValue('N', undefined, true);
    if (appCustomerType == 'C' && applicantType == 'B') {
      //  this.EmbLineFlag.setReadOnly(true);
      CorporateApplicantFlag = true;
    } else {
      CorporateApplicantFlag = false;    // As Corporate Applicant not going to be new customer on QDE and DDE stage
      //  this.EmbLineFlag.setReadOnly(true);
    }

    // individual fields
    this.CD_TITLE.setHidden(CorporateApplicantFlag);
    this.CD_FIRST_NAME.setHidden(CorporateApplicantFlag);
    this.CD_MIDDLE_NAME.setHidden(CorporateApplicantFlag);
    this.CD_LAST_NAME.setHidden(CorporateApplicantFlag);
    this.MaidenName.setHidden(CorporateApplicantFlag);
    this.CD_FULL_NAME.setHidden(CorporateApplicantFlag);
    this.CD_DOB.setHidden(CorporateApplicantFlag);
    this.CD_GENDER.setHidden(CorporateApplicantFlag);
    this.CD_MARITAL_STATUS.setHidden(CorporateApplicantFlag);
    this.CD_STAFF_ID.setHidden(CorporateApplicantFlag);

    //corporate fields
    this.CD_REGISTERED_NAME.setHidden(!CorporateApplicantFlag);
    this.CD_INCORPORATE_DATE.setHidden(!CorporateApplicantFlag);
    this.CD_INCORPORATE_TYPE.setHidden(!CorporateApplicantFlag);

    //common fields
    this.EmbLineFlag.setReadOnly(!CorporateApplicantFlag);
  }

  dispalyAddonField(custType) {
    if (custType == 'A') {
      this.RequestedAmountLimit.setHidden(false);
      this.RequestedAmountLimit.mandatory=true;
      this.CardDispatchMode.setHidden(false);
    }
    else {
      this.RequestedAmountLimit.setHidden(true);
      this.RequestedAmountLimit.mandatory=false;
      this.CardDispatchMode.setHidden(true);
    }
  }

  async CD_FULL_NAME_change(fullName, customerType) {
    const inputMap = new Map();
    this.onFullNameblur.emit({
      'fullName': fullName,
      'customerType': customerType
    });
  }

  async CD_Add_CUST_TYPE_blur(event) {
    // if (this.CD_Add_CUST_TYPE.getFieldValue() == 'A') {
    //     this.CD_Add_CUST_TYPE.readOnly == true;
    // }
  }

  loanCategoryChanged(newLoanCategory?: boolean) {
    if (newLoanCategory != undefined) {
      this.isLoanCategory = newLoanCategory;
    }
    if (this.isLoanCategory != undefined) {
      this.hideCustomerType.setValue((!newLoanCategory) ? 'ADD_CUSTOMER_TYPE' : 'CUSTOMER_TYPE');
      // this.CD_PMRY_EMBSR_NAME.mandatory = (!this.isLoanCategory) ? true : false;
      // this.MaidenName.mandatory = (!this.isLoanCategory) ? true : false;
      this.CD_PMRY_EMBSR_NAME.mandatory = !this.isLoanCategory;
      this.MaidenName.mandatory = !this.isLoanCategory;
    }

  }

  CD_LOAN_OWN_blur(fieldName, event) {
    let totLoanOwnership: number = 0;
    totLoanOwnership = this.services.rloCommonData.calculateLoanOwnership(this.activeBorrowerSeq);
    if (this.CD_LOAN_OWN.getFieldValue() != undefined || this.CD_LOAN_OWN.getFieldValue() != 0) {
      totLoanOwnership += parseFloat(this.CD_LOAN_OWN.getFieldValue())
    }
    console.log("shweta :: in cust_frorm ::totLoanOwnership", totLoanOwnership);
    if (totLoanOwnership > 100) {
      this.CD_LOAN_OWN.setError('rlo.error.loanownership.onblur');
      return 1;
    }
    if (this.CD_CUST_TYPE.getFieldValue() == 'B' && this.isLoanCategory && (this.CD_LOAN_OWN.getFieldValue() == undefined || this.CD_LOAN_OWN.getFieldValue() == 0 || this.CD_LOAN_OWN.getFieldValue() == '')) {
      this.CD_LOAN_OWN.setError('rlo.error.borrwer-loan-ownership-alert');
      return 1;
    }
  }
  fieldDependencies = {
    // CD_EXISTING_CUST: {
    //   inDep: [

    //     { paramKey: "VALUE1", depFieldID: "CD_EXISTING_CUST", paramType: "PathParam" },
    //     { paramKey: "KEY1", depFieldID: "hidExistCust", paramType: "QueryParam" },
    //     { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
    //   ],
    //   outDep: [
    //   ]
    // },
    // CD_STAFF: {
    //   inDep: [

    //     { paramKey: "VALUE1", depFieldID: "CD_STAFF", paramType: "PathParam" },
    //     { paramKey: "KEY1", depFieldID: "hideStaffId", paramType: "QueryParam" },
    //     { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
    //   ],
    //   outDep: [
    //   ]
    // },
    CD_TITLE: {
      inDep: [

        { paramKey: "VALUE1", depFieldID: "CD_TITLE", paramType: "PathParam" },
        { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
        { paramKey: "KEY1", depFieldID: "hidTitle", paramType: "QueryParam" },
      ],
      outDep: [
      ]
    },
    CD_GENDER: {
      inDep: [

        { paramKey: "VALUE1", depFieldID: "CD_GENDER", paramType: "PathParam" },
        { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
        { paramKey: "KEY1", depFieldID: "hidGender", paramType: "QueryParam" },
      ],
      outDep: [
      ]
    },
    CD_MARITAL_STATUS: {
      inDep: [

        { paramKey: "VALUE1", depFieldID: "CD_MARITAL_STATUS", paramType: "PathParam" },
        { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
        { paramKey: "KEY1", depFieldID: "hidMaritalStatus", paramType: "QueryParam" },
      ],
      outDep: [
      ]
    },
    // CD_NATIONALITY: {
    //   inDep: [

    //     { paramKey: "VALUE1", depFieldID: "CD_NATIONALITY", paramType: "PathParam" },
    //     { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
    //     { paramKey: "KEY1", depFieldID: "hidNationality", paramType: "QueryParam" },
    //   ],
    //   outDep: [
    //   ]
    // },
    CD_NATIONALITY: {
      inDep: [

        { paramKey: "CountryCd", depFieldID: "CD_NATIONALITY", paramType: "PathParam" },
      ],
      outDep: [
      ]
    },
    CD_CITIZENSHIP: {
      inDep: [

        { paramKey: "CountryCd", depFieldID: "CD_CITIZENSHIP", paramType: "PathParam" },
      ],
      outDep: [
      ]
    },
    CD_PREF_COM_CH: {
      inDep: [

        { paramKey: "VALUE1", depFieldID: "CD_PREF_COM_CH", paramType: "PathParam" },
        { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
        { paramKey: "KEY1", depFieldID: "hidPrefCommCh", paramType: "QueryParam" },
      ],
      outDep: [
      ]
    },
    CD_PREF_LANG: {
      inDep: [

        { paramKey: "VALUE1", depFieldID: "CD_PREF_LANG", paramType: "PathParam" },
        { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
        { paramKey: "KEY1", depFieldID: "hidPrefLanguage", paramType: "QueryParam" },
      ],
      outDep: [
      ]
    },
    // CD_COUNTRY_CODE: {
    //     inDep: [

    //         { paramKey: "VALUE1", depFieldID: "CD_COUNTRY_CODE", paramType: "PathParam" },
    //         { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
    //         { paramKey: "KEY1", depFieldID: "hideISDCode", paramType: "QueryParam" },
    //     ],
    //     outDep: [
    //     ]
    // },
    // CD_CITIZENSHIP: {
    //   inDep: [

    //     { paramKey: "VALUE1", depFieldID: "CD_CITIZENSHIP", paramType: "PathParam" },
    //     { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
    //     { paramKey: "KEY1", depFieldID: "hideCitizenship", paramType: "QueryParam" },
    //   ],
    //   outDep: [
    //   ]
    // },

    // CD_CUST_TYPE: {
    //   inDep: [

    //     { paramKey: "VALUE1", depFieldID: "CD_CUST_TYPE", paramType: "PathParam" },
    //     { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
    //     { paramKey: "KEY1", depFieldID: "hideCustomerType", paramType: "QueryParam" },
    //   ],
    //   outDep: [
    //   ]
    // },


    CD_CUST_SEGMENT: {
      inDep: [

        { paramKey: "CustSegmentCd", depFieldID: "CD_CUST_SEGMENT" },

      ],
      outDep: [
      ]
    },

    CustSubSegment: {
      inDep: [

        { paramKey: "SubProductCd", depFieldID: "CustSubSegment", paramType: "PathParam" },
        { paramKey: "SEGMENT_CD", depFieldID: "CD_CUST_SEGMENT", paramType: "QueryParam" },
      ],
      outDep: [
      ]
    },
    EmbLineFlag: {
      inDep: [

        { paramKey: "VALUE1", depFieldID: "EmbLineFlag", paramType: "PathParam" },
        { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
        { paramKey: "KEY1", depFieldID: "hideEmbLineFlag", paramType: "QueryParam" },
      ],
      outDep: [
      ]
    },
    CardDispatchMode: {
      inDep: [
        { paramKey: "VALUE1", depFieldID: "CardDispatchMode", paramType: "PathParam" },
        { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
        { paramKey: "KEY1", depFieldID: "hidCardDispatch", paramType: "QueryParam" },
      ],
      outDep: [
      ]
    },
    CD_CARD_CUST_TYPE: {
      inDep: [

        { paramKey: "VALUE1", depFieldID: "CD_CARD_CUST_TYPE", paramType: "PathParam" },
        { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
        { paramKey: "KEY1", depFieldID: "hideCardCustType", paramType: "QueryParam" },
      ],
      outDep: [
      ]
    }
  }
  /* Write Custom Scripts Here */

  fieldArrayFunction() {
    this.fieldArray = [];
    this.fieldArray.push(this.CD_TITLE, this.CD_FIRST_NAME, this.CD_LAST_NAME, this.CD_MIDDLE_NAME,
      // #PR-38 Sprint-6
      //this.CD_FULL_NAME, this.CD_DOB, this.CD_GENDER, this.CD_CIF, this.CD_EMAIL, this.CD_MOBILE_NO
      this.CD_FULL_NAME, this.CD_DOB, this.CD_GENDER, this.CD_CIF,this.CD_EMAIL,this.CD_MOBILE_NO,this.CD_TAX_ID
    );
    // this.fieldArray.push(this.CD_TITLE, this.CD_FIRST_NAME, this.CD_LAST_NAME, this.CD_MIDDLE_NAME,
    //   this.CD_FULL_NAME, this.CD_DOB, this.CD_GENDER, this.CD_CIF, this.CD_CUST_ID
    // );
    return this.fieldArray;
  }
  disableLoanOwnership(customerType) {
    let readOnlyFlag = true;
    if (this.parentFormCode != 'DDE') {
      return true;
    }
    if (customerType == 'B') {
      return false;
    }
    if (customerType == 'G' || customerType == 'OP') {
      return true;
    } else if (this.services.rloCommonData.calculateLoanOwnership(this.activeBorrowerSeq) >= 100) {
      return true;
    } else {
      let customerList = this.services.rloCommonData.getCustomerList();
      for (let element of customerList) {
        if (element.LoanOwnership != undefined && element.CustomerType == 'CB'
          && element.BorrowerSeq != this.activeBorrowerSeq) {
          // readOnlyFlag = true;
          return true;
        }
      }
      return false;
    }
  }

  searchForCustomer(type: any) {
    let obj: ICustomSearchObject = {};

    console.log("searchForCustomer()", type);
    if (type.inputBtn == "CD_CUSTOMER_ID") {
      obj.searchType = "Internal";
    } else {
      obj.searchType = "External";
    }

    obj.cifId = this.CD_CIF.getFieldValue();

    console.log(obj);
    if ((obj.cifId != "" && obj.cifId != undefined)) {

      // if ((obj.cifId != "" && obj.cifId != undefined) || (obj.customerId != "" && obj.customerId != undefined) || (obj.staffId != "" && obj.staffId != undefined)) {

      this.services.rloui.openCustomerSearch(obj).then((response: any) => {
        if (response != null) {
          console.log(response);
          if (typeof response != "boolean") {
            this.setValuesOfCustomer(response);
          }
          else {
            // if (response)
            //this.CD_RESET_click();
          }
        }
        else {
          console.warn("DEEP | No customer selected");
        }
      });
    } else {
      this.customerSearchGenericOnBlur(type.inputBtn, this.CD_CIF.getFieldValue())
    }
  }

  setValuesOfCustomer(data) {
    let tempVar: any = data;
    this.CD_DOB.setValue(tempVar['dob']);
    this.CD_TAX_ID.setValue(tempVar['taxId']);
    this.CD_FULL_NAME.setValue(tempVar['custName']);
    this.CD_MOBILE_NO.setComponentSpecificValue(tempVar['mobileNum'], null);
    this.CD_CIF.setValue(tempVar['cif']);

    this.CD_FIRST_NAME.setValue(tempVar['firsName']);
    this.CD_MIDDLE_NAME.setValue(tempVar['midName']);
    this.CD_LAST_NAME.setValue(tempVar['lastName']);
    this.CD_GENDER.setValue(tempVar['gender']);
    this.CD_TITLE.setValue(tempVar['title']);
    // this.CD_CUST_ID.setValue(tempVar['icif']);
    this.CD_EMAIL.setValue(tempVar['emailid']);
    this.CD_PMRY_EMBSR_NAME.setValue(tempVar['custName']);
    // this.appRefNum  = tempVar['AppRefNum'];

    this.MaidenName.setValue(tempVar['MaidenName']);

   // this.CD_STAFF_ID.setValue(tempVar['staffId']);
    if (tempVar != '' || tempVar != undefined)
      //this.CD_EXISTING_CUST.setValue('Y');

      this.services.dataStore.setData('selectedData', undefined);
  }

  customerSearchGenericOnBlur(fieldName: any, textFieldValue: any) {
    console.log("Deep | customerSearchGenericOnBlur", fieldName, textFieldValue);
    this.genericOnBlur(fieldName, textFieldValue);
  }

}
