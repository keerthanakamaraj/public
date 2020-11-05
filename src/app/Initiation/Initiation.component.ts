import { Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import { InitiationModel } from './Initiation.model';
import { ComboBoxComponent } from '../combo-box/combo-box.component';
import { TextBoxComponent } from '../text-box/text-box.component';
import { ReadOnlyComponent } from '../rlo-ui-readonlyfield/rlo-ui-readonlyfield.component';
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
import { CustDtlsGridComponent } from '../CustDtlsGrid/CustDtlsGrid.component';
import { InitiationHandlerComponent } from '../Initiation/initiation-handler.component';
import { RLOUIRadioComponent } from '../rlo-ui-radio/rlo-ui-radio.component';
import { RloUiAccordionComponent } from '../rlo-ui-accordion/rlo-ui-accordion.component';
import { isFulfilled } from 'q';
import { ignoreElements } from 'rxjs/operators';
import { RloUiMobileComponent } from '../rlo-ui-mobile/rlo-ui-mobile.component';
import { element } from 'protractor';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { RloUiCurrencyComponent } from '../rlo-ui-currency/rlo-ui-currency.component';
import { ICustomSearchObject } from '../Interface/masterInterface';
import { RloUiCustomerSearchComponent } from '../rlo-ui-customer-search/rlo-ui-customer-search.component';

const customCss: string = '';

@Component({
  selector: 'app-Initiation',
  templateUrl: './Initiation.component.html'
})
export class InitiationComponent extends FormComponent implements OnInit, AfterViewInit {
  gender: any;
  age: any;
  // eligibilityData= [];
  EligibilityDecision: string;
  @ViewChild('SRC_MOBILE_NO', { static: false }) SRC_MOBILE_NO: TextBoxComponent;
  @ViewChild('SRC_TAX_ID', { static: false }) SRC_TAX_ID: TextBoxComponent;
  @ViewChild('SRC_CIF_NO', { static: false }) SRC_CIF_NO: TextBoxComponent;
  @ViewChild('SEARCH_CUST_BTN', { static: false }) SEARCH_CUST_BTN: ButtonComponent;
  @ViewChild('BAD_PHYSICAL_FRM_NO', { static: false }) BAD_PHYSICAL_FRM_NO: TextBoxComponent;
  @ViewChild('BAD_DATE_OF_RCPT', { static: false }) BAD_DATE_OF_RCPT: DateComponent;
  @ViewChild('BAD_SRC_CHANNEL', { static: false }) BAD_SRC_CHANNEL: ComboBoxComponent;
  @ViewChild('BAD_CARD_TYPE', { static: false }) BAD_CARD_TYPE: ComboBoxComponent;
  @ViewChild('BAD_CARD_NUMBER', { static: false }) BAD_CARD_NUMBER: TextBoxComponent;
  @ViewChild('BAD_CUSTOMER_TYPE', { static: false }) BAD_CUSTOMER_TYPE: ComboBoxComponent;
  @ViewChild('BAD_REQ_CARD_LIMIT', { static: false }) BAD_REQ_CARD_LIMIT: RloUiCurrencyComponent;

  @ViewChild('BAD_DSA_ID', { static: false }) BAD_DSA_ID: ComboBoxComponent;
  @ViewChild('BAD_BRANCH', { static: false }) BAD_BRANCH: ComboBoxComponent;
  @ViewChild('BAD_PROD_CAT', { static: false }) BAD_PROD_CAT: RLOUIRadioComponent;
  @ViewChild('BAD_PRODUCT', { static: false }) BAD_PRODUCT: ComboBoxComponent;
  @ViewChild('BAD_SUB_PROD', { static: false }) BAD_SUB_PROD: ComboBoxComponent;
  @ViewChild('BAD_SCHEME', { static: false }) BAD_SCHEME: ComboBoxComponent;
  @ViewChild('BAD_PROMOTION', { static: false }) BAD_PROMOTION: ComboBoxComponent;
  @ViewChild('CD_CUST_TYPE', { static: false }) CD_CUST_TYPE: RLOUIRadioComponent;

  //@ViewChild('CD_EXISTING_CUST', { static: false }) CD_EXISTING_CUST: RLOUIRadioComponent; // removed for customer search
  //@ViewChild('CD_STAFF', { static: false }) CD_STAFF: RLOUIRadioComponent;// removed for customer search

  // @ViewChild('CD_CIF', { static: false }) CD_CIF: TextBoxComponent;
  @ViewChild('CD_CUSTOMER_ID', { static: false }) CD_CUSTOMER_ID: TextBoxComponent;
  @ViewChild('CD_STAFF_ID', { static: false }) CD_STAFF_ID: TextBoxComponent;

  @ViewChild('CD_CIF', { static: false }) CD_CIF: RloUiCustomerSearchComponent;
  //@ViewChild('CD_CUSTOMER_ID', { static: false }) CD_CUSTOMER_ID: RloUiCustomerSearchComponent;
  //@ViewChild('CD_STAFF_ID', { static: false }) CD_STAFF_ID: RloUiCustomerSearchComponent;

  @ViewChild('CD_TITLE', { static: false }) CD_TITLE: ComboBoxComponent;
  @ViewChild('CD_FIRST_NAME', { static: false }) CD_FIRST_NAME: TextBoxComponent;
  @ViewChild('CD_MIDDLE_NAME', { static: false }) CD_MIDDLE_NAME: TextBoxComponent;
  @ViewChild('CD_THIRD_NAME', { static: false }) CD_THIRD_NAME: TextBoxComponent;
  @ViewChild('CD_LAST_NAME', { static: false }) CD_LAST_NAME: TextBoxComponent;
  @ViewChild('CD_FULL_NAME', { static: false }) CD_FULL_NAME: TextBoxComponent;
  @ViewChild('CD_GENDER', { static: false }) CD_GENDER: ComboBoxComponent;
  @ViewChild('CD_TAX_ID', { static: false }) CD_TAX_ID: TextBoxComponent;
  @ViewChild('CD_MOBILE', { static: false }) CD_MOBILE: RloUiMobileComponent;
  @ViewChild('CD_DOB', { static: false }) CD_DOB: DateComponent;
  @ViewChild('CD_CUST_SGMT', { static: false }) CD_CUST_SGMT: ComboBoxComponent;
  @ViewChild('CD_CUST_SUB_SGMT', { static: false }) CD_CUST_SUB_SGMT: ComboBoxComponent;
  @ViewChild('REF_CIF', { static: false }) REF_CIF: TextBoxComponent;

  @ViewChild('CD_DEBIT_SCORE', { static: false }) CD_DEBIT_SCORE: TextBoxComponent;
  @ViewChild('CD_LOAN_OWNERSHIP', { static: false }) CD_LOAN_OWNERSHIP: AmountComponent;
  @ViewChild('CD_ADD', { static: false }) CD_ADD: ButtonComponent;
  @ViewChild('CD_RESET', { static: false }) CD_RESET: ButtonComponent;
  @ViewChild('CUST_DTLS_GRID', { static: false }) CUST_DTLS_GRID: CustDtlsGridComponent;
  //@ViewChild('LD_LOAN_AMOUNT', { static: false }) LD_LOAN_AMOUNT: AmountComponent;
  @ViewChild('LD_INTEREST_RATE', { static: false }) LD_INTEREST_RATE: TextBoxComponent;
  @ViewChild('LD_TENURE', { static: false }) LD_TENURE: TextBoxComponent;
  @ViewChild('LD_TENURE_PERIOD', { static: false }) LD_TENURE_PERIOD: ComboBoxComponent;
  // @ViewChild('LD_APP_PRPSE', { static: false }) LD_APP_PRPSE: ComboBoxComponent;
  //@ViewChild('LD_GROSS_INCOME', { static: false }) LD_GROSS_INCOME: AmountComponent;
  //@ViewChild('LD_EXST_LBLT_AMT', { static: false }) LD_EXST_LBLT_AMT: AmountComponent;
  //@ViewChild('LD_OTH_DEDUCTIONS', { static: false }) LD_OTH_DEDUCTIONS: TextBoxComponent;
  //@ViewChild('LD_NET_INCOME', { static: false }) LD_NET_INCOME: AmountComponent;
  @ViewChild('LD_CHK_ELGBTY_BTN', { static: false }) LD_CHK_ELGBTY_BTN: ButtonComponent;
  //@ViewChild('LD_SYS_AMT_RCMD', { static: false }) LD_SYS_AMT_RCMD: AmountComponent;
  //@ViewChild('LD_USR_RCMD_AMT', { static: false }) LD_USR_RCMD_AMT: AmountComponent;
  @ViewChild('LD_LTV_DBR', { static: false }) LD_LTV_DBR: TextBoxComponent;
  //@ViewChild('LD_EMI_AMT', { static: false }) LD_EMI_AMT: AmountComponent;
  @ViewChild('LD_NET_INTEREST_RATE', { static: false }) LD_NET_INTEREST_RATE: TextBoxComponent;
  @ViewChild('LD_MARGIN_RATE', { static: false }) LD_MARGIN_RATE: TextBoxComponent;
  @ViewChild('CD_EMAIL_ID', { static: false }) CD_EMAIL_ID: TextBoxComponent;
  @ViewChild('RD_REFERRER_NAME', { static: false }) RD_REFERRER_NAME: TextBoxComponent;
  @ViewChild('RD_REFERRER_NO', { static: false }) RD_REFERRER_NO: RloUiMobileComponent;
  // @ViewChild('CD_COUNTRY_CODE', { static: false }) CD_COUNTRY_CODE: ComboBoxComponent;
  @ViewChild('RD_COUNTRY_CODE', { static: false }) RD_COUNTRY_CODE: ComboBoxComponent;
  @ViewChild('CD_NAME_ON_CARD', { static: false }) CD_NAME_ON_CARD: TextBoxComponent;
  @ViewChild('BAD_APP_PRPSE', { static: false }) BAD_APP_PRPSE: ComboBoxComponent;
  @ViewChild('BAD_PRIME_USAGE', { static: false }) BAD_PRIME_USAGE: ComboBoxComponent;
  @ViewChild('SUBMIT_MAIN_BTN', { static: false }) SUBMIT_MAIN_BTN: ButtonComponent;
  @ViewChild('CANCEL_MAIN_BTN', { static: false }) CANCEL_MAIN_BTN: ButtonComponent;
  @ViewChild('Handler', { static: false }) Handler: InitiationHandlerComponent;
  @ViewChild('hiddenProductId', { static: false }) hiddenProductId: HiddenComponent;
  @ViewChild('hideCustomerType', { static: false }) hideCustomerType: HiddenComponent;
  @ViewChild('hidAppId', { static: false }) hidAppId: HiddenComponent;
  @ViewChild('hidSourceingChannel', { static: false }) hidSourceingChannel: HiddenComponent;
  @ViewChild('IndexHideField', { static: false }) IndexHideField: HiddenComponent;
  @ViewChild('hidYesNo', { static: false }) hidYesNo: HiddenComponent;
  @ViewChild('hidDSAId', { static: false }) hidDSAId: HiddenComponent;
  @ViewChild('hidAccBranch', { static: false }) hidAccBranch: HiddenComponent;
  @ViewChild('hidProdCat', { static: false }) hidProdCat: HiddenComponent;
  @ViewChild('hidTitle', { static: false }) hidTitle: HiddenComponent;
  @ViewChild('hidGender', { static: false }) hidGender: HiddenComponent;
  @ViewChild('hidCustSeg', { static: false }) hidCustSeg: HiddenComponent;
  @ViewChild('hidCustSubSgmnt', { static: false }) hidCustSubSgmnt: HiddenComponent;

  @ViewChild('hideExsCust', { static: false }) hideExsCust: HiddenComponent;
  @ViewChild('hideAppPurpose', { static: false }) hideAppPurpose: HiddenComponent;
  @ViewChild('hideTenurePeriod', { static: false }) hideTenurePeriod: HiddenComponent;
  @ViewChild('INIT_ACCORD', { static: false }) INIT_ACCORD: RloUiAccordionComponent;
  @ViewChild('hideISDCode', { static: false }) hideISDCode: HiddenComponent;
  @ViewChild('allowCoBorrower', { static: false }) allowCoBorrower: HiddenComponent;
  @ViewChild('hideCardType', { static: false }) hideCardType: HiddenComponent;
  @ViewChild('hideCardCustomerType', { static: false }) hideCardCustomerType: HiddenComponent;

  //custom
  @ViewChild('LD_LOAN_AMOUNT', { static: false }) LD_LOAN_AMOUNT: RloUiCurrencyComponent;
  @ViewChild('LD_GROSS_INCOME', { static: false }) LD_GROSS_INCOME: RloUiCurrencyComponent;
  @ViewChild('LD_EXST_LBLT_AMT', { static: false }) LD_EXST_LBLT_AMT: RloUiCurrencyComponent;
  @ViewChild('LD_OTH_DEDUCTIONS', { static: false }) LD_OTH_DEDUCTIONS: RloUiCurrencyComponent;
  @ViewChild('LD_USR_RCMD_AMT', { static: false }) LD_USR_RCMD_AMT: RloUiCurrencyComponent;

  @ViewChild('LD_EMI_AMT', { static: false }) LD_EMI_AMT: RloUiCurrencyComponent;
  @ViewChild('LD_NET_INCOME', { static: false }) LD_NET_INCOME: RloUiCurrencyComponent;
  @ViewChild('LD_SYS_AMT_RCMD', { static: false }) LD_SYS_AMT_RCMD: RloUiCurrencyComponent;

  disableLoanOwnership: boolean = true
  eligeData = [];
  isLoanCategory: boolean;
  borrower: any;
  borrowericif: any;
  icif: any;
  searchbutton: string;
  custMinAge: number = 18;
  custMaxAge: number = 100;
  loanTotal: number;
  readOnly: boolean = false;
  async revalidateCustomers(): Promise<number> {
    var totalErrors = 0;
    super.beforeRevalidate();
    await Promise.all([
      this.revalidateBasicField('CD_CUST_TYPE'),
      //this.revalidateBasicField('CD_EXISTING_CUST'),
      //this.revalidateBasicField('CD_STAFF'),

      //this.revalidateBasicField('CD_CIF'),
      //this.revalidateBasicField('CD_STAFF_ID'),
      //this.revalidateBasicField('CD_CUSTOMER_ID'),

      // this.validateCustomerId(),
      // this.validateStaffId(),

      this.revalidateBasicField('CD_TITLE'),
      this.revalidateBasicField('CD_FIRST_NAME'),
      this.revalidateBasicField('CD_MIDDLE_NAME'),
      this.revalidateBasicField('CD_THIRD_NAME'),
      this.revalidateBasicField('CD_LAST_NAME'),
      this.revalidateBasicField('CD_FULL_NAME'),
      this.revalidateBasicField('CD_DOB'),
      this.revalidateBasicField('CD_GENDER'),
      this.revalidateBasicField('CD_MOBILE'),
      // this.revalidateBasicField('CD_TAX_ID'),
      this.revalidateBasicField('CD_DEBIT_SCORE'),
      this.revalidateBasicField('CD_LOAN_OWNERSHIP'),
      this.revalidateBasicField('CD_EMAIL_ID'),
      this.revalidateBasicField('CD_NAME_ON_CARD'),

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
  async revalidate(): Promise<number> {
    var totalErrors = 0;
    super.beforeRevalidate();
    if (this.searchbutton == 'Y') {
      {
        await Promise.all([
          this.revalidateBasicField('SRC_MOBILE_NO'),
          this.revalidateBasicField('SRC_TAX_ID'),
          this.revalidateBasicField('SRC_CIF_NO'),
        ]).then((errorCounts) => {
          errorCounts.forEach((errorCount) => {
            totalErrors += errorCount;
          });
        });
      }

    } else if (this.BAD_PROD_CAT.getFieldValue() != 'CC') {
      await Promise.all([
        this.revalidateBasicField('SRC_MOBILE_NO'),
        this.revalidateBasicField('SRC_TAX_ID'),
        this.revalidateBasicField('SRC_CIF_NO'),
        this.revalidateBasicField('BAD_PHYSICAL_FRM_NO'),
        this.revalidateBasicField('BAD_DATE_OF_RCPT'),
        this.revalidateBasicField('BAD_SRC_CHANNEL'),
        this.revalidateBasicField('BAD_DSA_ID'),
        this.revalidateBasicField('BAD_BRANCH'),
        this.revalidateBasicField('BAD_PROD_CAT'),
        this.revalidateBasicField('BAD_PRODUCT'),
        this.revalidateBasicField('BAD_SUB_PROD'),
        this.revalidateBasicField('BAD_SCHEME'),
        this.revalidateBasicField('BAD_PROMOTION'),
        this.revalidateBasicField('BAD_APP_PRPSE'),

        // this.revalidateBasicField('CD_CUST_TYPE'),
        // this.revalidateBasicField('CD_EXISTING_CUST'),
        // this.revalidateBasicField('CD_STAFF'),
        // this.revalidateBasicField('CD_CIF'),
        // this.revalidateBasicField('CD_CUSTOMER_ID'),
        // this.revalidateBasicField('CD_STAFF_ID'),
        // this.revalidateBasicField('CD_TITLE'),
        // this.revalidateBasicField('CD_FIRST_NAME'),
        // this.revalidateBasicField('CD_MIDDLE_NAME'),
        // this.revalidateBasicField('CD_THIRD_NAME'),
        // this.revalidateBasicField('CD_LAST_NAME'),
        // this.revalidateBasicField('CD_FULL_NAME'),
        // this.revalidateBasicField('CD_GENDER'),
        // this.revalidateBasicField('CD_TAX_ID'),
        // this.revalidateBasicField('CD_MOBILE'),
        // this.revalidateBasicField('CD_DOB'),
        // this.revalidateBasicField('CD_CUST_SGMT'),
        // this.revalidateBasicField('CD_DEBIT_SCORE'),
        // this.revalidateBasicField('CD_LOAN_OWNERSHIP'),
        this.revalidateBasicField('LD_LOAN_AMOUNT'),
        this.revalidateBasicField('LD_INTEREST_RATE'),
        this.revalidateBasicField('LD_TENURE'),
        this.revalidateBasicField('LD_TENURE_PERIOD'),
        // this.revalidateBasicField('LD_APP_PRPSE'),
        this.revalidateBasicField('LD_GROSS_INCOME'),
        this.revalidateBasicField('LD_EXST_LBLT_AMT'),
        this.revalidateBasicField('LD_OTH_DEDUCTIONS'),
        this.revalidateBasicField('LD_NET_INCOME'),
        //this.revalidateBasicField('LD_SYS_AMT_RCMD'),
        this.revalidateBasicField('LD_USR_RCMD_AMT'),
        this.revalidateBasicField('LD_LTV_DBR'),
        this.revalidateBasicField('LD_EMI_AMT'),
        this.revalidateBasicField('LD_MARGIN_RATE'),
        this.revalidateBasicField('LD_NET_INTEREST_RATE'),
        this.revalidateBasicField('RD_REFERRER_NAME'),
        // this.revalidateBasicField('RD_COUNTRY_CODE'),
        this.revalidateBasicField('RD_REFERRER_NO'),
      ]).then((errorCounts) => {
        errorCounts.forEach((errorCount) => {
          totalErrors += errorCount;
        });
      });
    } else {
      await Promise.all([
        this.revalidateBasicField('SRC_MOBILE_NO'),
        this.revalidateBasicField('SRC_TAX_ID'),
        this.revalidateBasicField('SRC_CIF_NO'),
        this.revalidateBasicField('BAD_PHYSICAL_FRM_NO'),
        this.revalidateBasicField('BAD_DATE_OF_RCPT'),
        this.revalidateBasicField('BAD_SRC_CHANNEL'),
        this.revalidateBasicField('BAD_DSA_ID'),
        this.revalidateBasicField('BAD_BRANCH'),
        this.revalidateBasicField('BAD_PROD_CAT'),
        this.revalidateBasicField('BAD_PRODUCT'),
        this.revalidateBasicField('BAD_SUB_PROD'),
        this.revalidateBasicField('BAD_SCHEME'),
        this.revalidateBasicField('BAD_PROMOTION'),
        this.revalidateBasicField('RD_REFERRER_NAME'),
        this.revalidateBasicField('RD_REFERRER_NO'),
        this.revalidateBasicField('BAD_PRIME_USAGE'),
        this.revalidateBasicField('BAD_CARD_NUMBER'),
        this.revalidateBasicField('BAD_CARD_TYPE'),
        this.revalidateBasicField('BAD_CUSTOMER_TYPE'),
        this.revalidateBasicField('BAD_REQ_CARD_LIMIT')
      ]).then((errorCounts) => {
        errorCounts.forEach((errorCount) => {
          totalErrors += errorCount;
        });
      });
    }
    this.errors = totalErrors;
    super.afterRevalidate();
    return totalErrors;
  }


  constructor(services: ServiceStock) {
    super(services);
    this.value = new InitiationModel();
    this.componentCode = 'Initiation';
    this.displayBorder = false;
    this.isLoanCategory = true;
  }

  setReadOnly(readOnly) {
    super.setBasicFieldsReadOnly(readOnly);
  }

  async onFormLoad() {

    this.setInputs(this.services.dataStore.getData(this.services.routing.currModal));
    // Moved readonly to RLO Config - to be removed in next commit
    // this.CD_FULL_NAME.setReadOnly(true);
    // this.CD_LOAN_OWNERSHIP.setFormatOptions({ currencyCode: 'INR', languageCode: 'en-US', });
    // this.LD_LOAN_AMOUNT.setFormatOptions({ currencyCode: 'INR', languageCode: 'en-US', });
    // this.LD_INTEREST_RATE.setReadOnly(true);
    // this.LD_GROSS_INCOME.setFormatOptions({ currencyCode: 'INR', languageCode: 'en-US', });
    // this.LD_EXST_LBLT_AMT.setFormatOptions({ currencyCode: 'INR', languageCode: 'en-US', });
    // this.LD_NET_INCOME.setFormatOptions({ currencyCode: 'INR', languageCode: 'en-US', });
    // this.LD_NET_INCOME.setReadOnly(true);
    // this.LD_SYS_AMT_RCMD.setFormatOptions({ currencyCode: 'INR', languageCode: 'en-US', });
    // this.LD_SYS_AMT_RCMD.setReadOnly(true);
    // this.LD_USR_RCMD_AMT.setFormatOptions({ currencyCode: 'INR', languageCode: 'en-US', });
    // this.LD_LTV_DBR.setReadOnly(true);
    // this.LD_EMI_AMT.setFormatOptions({ currencyCode: 'INR', languageCode: 'en-US', });
    // this.LD_EMI_AMT.setReadOnly(true);
    this.hideCustomerType.setValue('CUSTOMER_TYPE');
    this.hidAppId.setValue('RLO');
    this.hidSourceingChannel.setValue('Branch');
    this.IndexHideField.setValue(-1);
    this.hidYesNo.setValue('YES_NO');
    this.hidDSAId.setValue('DSA_ID');
    this.hidAccBranch.setValue('ACC_BRANCH');
    this.hidProdCat.setValue('PRODUCT_CATEGORY');
    this.hidTitle.setValue('TITLE');
    this.hidGender.setValue('GENDER');
    this.hidCustSeg.setValue('CUST_SEGMENT');
    this.hidCustSubSgmnt.setValue('CUST_SEGMENT');
    this.hideExsCust.setValue('YES_NO');
    this.hideAppPurpose.setValue('APPLICATION_PURPOSE');
    this.hideTenurePeriod.setValue('PERIOD');
    this.hideISDCode.setValue('ISD_COUNTRY_CODE');
    this.hideCardCustomerType.setValue('CARD_CUSTOMER_TYPE');
    this.hideCardType.setValue('EXISTING_CARD_TYPE');

    //this.CD_EXISTING_CUST.setDefault('N');
    // this.Handler.existingCustomer({});

    //this.CD_STAFF.setDefault('N');
    this.Handler.isStaff({});
    this.tempUnableCustId();

    let inputMap = new Map();
    await this.Handler.onFormLoad({
    });
    this.setDependencies();
    this.EligibilityDecision = '';

  }
  setInputs(param: any) {
    let params = this.services.http.mapToJson(param);
    if (params['mode']) {
      this.mode = params['mode'];
    }
  }
  async submitForm(path, apiCode, serviceCode) {
    this.submitData['formName'] = 'New Application Initiation';
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
    this.CUST_DTLS_GRID.setValue(inputValue['CUST_DTLS_GRID']);
    this.value = new InitiationModel();
    this.value.setValue(inputValue);
    this.setDependencies();
    this.passNewValue(this.value);
  }
  ngOnInit() {
    if (this.formCode == undefined) { this.formCode = 'Initiation'; }
    if (this.formOnLoadError) { return; }
    var styleElement = document.createElement('style');
    styleElement.type = 'text/css';
    styleElement.innerHTML = customCss;
    styleElement.id = 'Initiation_customCss';
    document.getElementsByTagName('head')[0].appendChild(styleElement);
  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    var styleElement = document.getElementById('Initiation_customCss');
    styleElement.parentNode.removeChild(styleElement);
    this.services.rloui.closeAllConfirmationModal();
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.subsBFldsValueUpdates();
      this.onFormLoad();
      this.checkForHTabOverFlow();
    });

    this.tempUnableCustId()
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
    this.value = new InitiationModel();
    this.passNewValue(this.value);
    //this.setReadOnly(false);
    //this.CD_EXISTING_CUST.isOptionsLoaded = false;
    // this.CD_STAFF.isOptionsLoaded = false;
    this.Handler.customers = [];
    this.CUST_DTLS_GRID.setValue(Object.assign([], this.Handler.customers));
    this.onFormLoad();
    this.Handler.updateLoanTag();
    this.Handler.updateCustomerTags();
    this.Handler.updateAmountTags();

    this.BAD_REQ_CARD_LIMIT.resetFieldAndDropDown();
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

  async SEARCH_CUST_BTN_click(event) {
    let obj: ICustomSearchObject = {
      mobileNumber: this.SRC_MOBILE_NO.getFieldValue(),
      taxId: this.SRC_TAX_ID.getFieldValue(),
      cifId: this.SRC_CIF_NO.getFieldValue(),
      searchType: "External"
    }
    this.services.rloui.openCustomerSearch(obj).then((response: any) => {
      if (response != null) {
        console.log(response);
        this.setValuesOfCustomer(response);
      }
      else {
        console.warn("DEEP | No customer selected");
      }
    });

    this.searchbutton = 'Y';
    let inputMap = new Map();
    inputMap.clear();
    var noofErrors: number = await this.revalidate();
    if (noofErrors == 0) {
      inputMap.set('MobileNo', this.SRC_MOBILE_NO.getFieldValue());
      inputMap.set('TaxId', this.SRC_TAX_ID.getFieldValue());
      inputMap.set('CifNo', this.SRC_CIF_NO.getFieldValue());
      if ((this.SRC_TAX_ID.getFieldValue() == undefined || this.SRC_TAX_ID.getFieldValue() == "") && (this.SRC_CIF_NO.getFieldValue() == undefined || this.SRC_CIF_NO.getFieldValue() == "") && (this.SRC_MOBILE_NO.getFieldValue() == undefined || this.SRC_MOBILE_NO.getFieldValue() == "")) {
        this.services.alert.showAlert(2, '', -1, 'Please fill at least one field');
      } else {
        setTimeout(() => {
          inputMap.set('component', 'SearchForm');
          const modalRef = this.services.modal.open(PopupModalComponent, { windowClass: 'modal-width-lg' });
          var onModalClose = async (reason) => {
            (reason == 0 || reason == 1) ? await this.services.routing.removeOutlet() : undefined;
            if (this.services.dataStore.getData('selectedData')) {
              let tempVar: any = this.services.dataStore.getData('selectedData');
              this.CD_DOB.setValue(tempVar['dob']);
              this.CD_TAX_ID.setValue(tempVar['taxId']);
              this.CD_FULL_NAME.setValue(tempVar['custName']);
              this.CD_MOBILE.setValue(tempVar['mobileNum']);
              this.CD_CIF.setValue(tempVar['cif']);
              this.CD_FIRST_NAME.setValue(tempVar['firsName']);
              this.CD_MIDDLE_NAME.setValue(tempVar['midName']);
              this.CD_LAST_NAME.setValue(tempVar['lastName']);
              this.CD_GENDER.setValue(tempVar['gender']);
              this.CD_TITLE.setValue(tempVar['title']);
              this.CD_CUSTOMER_ID.setValue(tempVar['icif']);
              this.CD_EMAIL_ID.setValue(tempVar['emailid']);
              this.CD_NAME_ON_CARD.setValue(tempVar['nameoncard']);
              //if (tempVar != '' || tempVar != undefined)
              //this.CD_EXISTING_CUST.setValue('Y');
              // this.Handler.existingCustomer({});
            }
            this.services.dataStore.setData('selectedData', undefined);
          }
          modalRef.result.then(onModalClose, onModalClose);
          modalRef.componentInstance.rotueToComponent(inputMap);
          console.log(modalRef, modalRef.componentInstance);
          this.services.dataStore.setModalReference(this.services.routing.currModal, modalRef);
        }, 1500);
        this.searchbutton = '';
      }
    } else {
      this.services.alert.showAlert(2, '', -1, 'Please correct form errors');
    }
  }

  //called when a customer is selected for customer search
  setValuesOfCustomer(data) {
    let tempVar: any = data;
    this.CD_DOB.setValue(tempVar['dob']);
    this.CD_TAX_ID.setValue(tempVar['taxId']);
    this.CD_FULL_NAME.setValue(tempVar['custName']);
    this.CD_MOBILE.setValue(tempVar['mobileNum']);
    this.CD_CIF.setValue(tempVar['cif']);
    this.CD_FIRST_NAME.setValue(tempVar['firsName']);
    this.CD_MIDDLE_NAME.setValue(tempVar['midName']);
    this.CD_LAST_NAME.setValue(tempVar['lastName']);
    this.CD_GENDER.setValue(tempVar['gender']);
    this.CD_TITLE.setValue(tempVar['title']);
    this.CD_CUSTOMER_ID.setValue(tempVar['icif']);
    this.CD_EMAIL_ID.setValue(tempVar['emailid']);
    this.CD_NAME_ON_CARD.setValue(tempVar['nameoncard']);
    if (tempVar != '' || tempVar != undefined)
      //this.CD_EXISTING_CUST.setValue('Y');

      this.services.dataStore.setData('selectedData', undefined);
  }

  async BAD_PROD_CAT_change(fieldID, value) {
    let inputMap = new Map();
    this.revalidateBasicField('BAD_PROD_CAT');
    await this.Handler.onProdCategoryChange({
    }
    );
    this.Handler.updateLoanTag();
    this.setDependency(fieldID, value);
    this.BAD_PRODUCT.onReset();
    this.BAD_SUB_PROD.onReset();
    this.BAD_SCHEME.onReset();
    this.BAD_PROMOTION.onReset();

    // this.Handler.onResetCustomer({});
    this.Handler.resetLoanInformation();
    this.Handler.resetReferalInformation();
    this.Handler.customers = [];
    this.CUST_DTLS_GRID.setValue(Object.assign([], this.Handler.customers));
    this.Handler.updateCustomerTags();
  }


  async BAD_PRODUCT_change(fieldID, value) {
    this.BAD_SUB_PROD.onReset();
    this.BAD_SCHEME.onReset();
    this.BAD_PROMOTION.onReset();
  }

  async BAD_SUB_PROD_change(fieldID, value) {
    this.BAD_SCHEME.onReset();
    this.BAD_PROMOTION.onReset();
  }

  async BAD_SCHEME_blur(event) {
    this.Handler.AllowLoanOwnership();
  }
  async BAD_PROMOTION_blur(event) {
    this.Handler.AllowLoanOwnership();
    this.Handler.updateAmountTags();

  }

  async LD_MARGIN_RATE_blur(event) {
    this.Handler.CalculateNetInterestRate();
    this.Handler.updateAmountTags();
    // this.LD_NET_INTEREST_RATE.setValue(7.5)
    // this.Handler.CalculateNetInterestRate();
  }
  genderCheck() {
    if ((this.CD_GENDER.getFieldValue() === 'M' && this.CD_TITLE.getFieldValue() !== 'MR') || (this.CD_GENDER.getFieldValue() === 'F' && this.CD_TITLE.getFieldValue() !== 'MRS') && (this.CD_GENDER.getFieldValue() === 'F' && this.CD_TITLE.getFieldValue() !== 'MS')) {
      // console.log("Please select gender according to tilte");
      this.CD_GENDER.setError('rlo.error.geneder.invalid');
      return 1
    }
  }


  // async CD_EXISTING_CUST_change(fieldID, value) {
  //   this.Handler.existingCustomer({});
  // }

  async CD_STAFF_change(fieldID, value) {
    this.Handler.isStaff({});

  }
  async CD_DOB_blur(event) {
    if (!this.isPastDate(this.CD_DOB.getFieldValue())) {
      this.CD_DOB.setError('rlo.error.DOB.invalid');
      return 1;
    } else if (!this.isAgeValid(this.CD_DOB.getFieldValue())) {
      this.CD_DOB.setError('rlo.error.Age.invalid');
      return 1
    }
  }

  async BAD_DATE_OF_RCPT_blur(event) {
    let inputMap = new Map();

    if (!(this.isTodaysDate(this.BAD_DATE_OF_RCPT.getFieldValue()) || this.isPastDate(this.BAD_DATE_OF_RCPT.getFieldValue()))) {
      this.BAD_DATE_OF_RCPT.setError('rlo.error.DateOfRecipt.invalid');
      return 1;
    }
  }


  async CD_GENDER_blur(event) {
    let inputMap = new Map();
    let gendererror = this.genderCheck();
    return gendererror

  }


  async LD_LOAN_AMOUNT_blur(event) {
    let inputMap = new Map();
    this.Handler.updateAmountTags();
  }
  async LD_INTEREST_RATE_blur(event) {
    let inputMap = new Map();
    this.Handler.updateAmountTags();
  }

  async LD_TENURE_blur(event) {
    let inputMap = new Map();
    this.Handler.updateAmountTags();
  }
  async LD_TENURE_PERIOD_blur(event) {
    let inputMap = new Map();
    // this.LD_SYS_AMT_RCMD.setValue(this.LD_LOAN_AMOUNT.getFieldValue());
    this.Handler.updateAmountTags();
  }

  async LD_GROSS_INCOME_blur(event) {
    let inputMap = new Map();
    await this.Handler.calculateNetIncome({});
  }




  async LD_EXST_LBLT_AMT_blur(event) {
    let inputMap = new Map();
    await this.Handler.calculateNetIncome({});
  }


  async LD_OTH_DEDUCTIONS_blur(event) {
    let inputMap = new Map();
    await this.Handler.calculateNetIncome({});
  }


  // async LD_TENURE_blur(event){
  //     let inputMap = new Map();
  //     await this.Handler.calculateEMI({});
  //     }

  async CD_FIRST_NAME_blur(event) {
    let inputMap = new Map();
    await this.Handler.updateFullName({
    });
  }
  async CD_MIDDLE_NAME_blur(event) {
    let inputMap = new Map();
    await this.Handler.updateFullName({
    });
  }
  async CD_THIRD_NAME_blur(event) {
    let inputMap = new Map();
    await this.Handler.updateFullName({
    });
  }
  async CD_LAST_NAME_blur(event) {
    let inputMap = new Map();
    await this.Handler.updateFullName({
    });
  }
  async CD_ADD_click(event) {
    let inputMap = new Map();
    // if(this.CD_LOAN_OWNERSHIP.getFieldValue() !== undefined){
    //   if(this.loanTotal > 100){
    //     this.CD_LOAN_OWNERSHIP.setError('rlo.error.loanownership.onblur');
    //     return;
    //   }
    // }

    console.log(this.CD_CUST_TYPE.getFieldInfo(),
      this.CD_CIF.getFieldValue(),
      this.CD_CUSTOMER_ID.getFieldValue(),
      this.CD_STAFF_ID.getFieldValue());

    await this.Handler.onAddCustomer({
    });

    this.loanTotal = 0
  }
  async CD_RESET_click() {
    let inputMap = new Map();
    await this.Handler.onResetCustomer({
    });

  }
  async CUST_DTLS_GRID_DeleteCustDetails(event) {
    let inputMap = new Map();
    await this.Handler.onDeleteCustomer({
      'id': event.clickId,
    });
  }
  async CUST_DTLS_GRID_ModifyCustDetails(event) {
    let inputMap = new Map();
    await this.Handler.onEditCustomer({
      'id': event.clickId,
    });
  }

  async LD_CHK_ELGBTY_BTN_click(event) {
    let inputMap = new Map();
    await this.Handler.onCheckEligibilityClick({}
    );
    var borrowerData = this.Handler.getBorrowerPostData();
    for (let i = 0; i < borrowerData.length; i++) {
      if (borrowerData[i]['CustomerType'] == 'B') {
        this.gender = borrowerData[i].Gender;
      }
    }
    inputMap.set('Body.interfaceId', 'INT003');
    inputMap.set('Body.inputdata.AGE', this.age);
    inputMap.set('Body.inputdata.TENURE', this.LD_TENURE.getFieldValue());
    inputMap.set('Body.inputdata.LOAN_AMT', this.LD_LOAN_AMOUNT.getFieldValue());
    inputMap.set('Body.inputdata.GENDER', this.gender);
    inputMap.set('Body.inputdata.NETINCOME', this.LD_NET_INCOME.getFieldValue());
    inputMap.set('Body.inputdata.INTEREST_RATE', this.LD_NET_INTEREST_RATE.getFieldValue());
    inputMap.set('Body.inputdata.DBR', this.LD_LTV_DBR.getFieldValue());
    inputMap.set('Body.inputdata.SCHEME_CD', this.BAD_SCHEME.getFieldValue());
    inputMap.set('Body.inputdata.PROMOTION_CD', this.BAD_PROMOTION.getFieldValue());

    console.error("DEEP | LD_CHK_ELGBTY_BTN_click", inputMap);

    this.services.http.fetchApi('/api/invokeInterface', 'POST', inputMap, '/los-integrator').subscribe(
      async (httpResponse: HttpResponse<any>) => {
        var res = httpResponse.body;

        if (res.status == 'F') {
          this.services.alert.showAlert(2, '', 1000, 'Check Eligibility Failed');
          return;
        }
        if (res.status == 'S') {
          this.eligeData = res.ouputdata.LOAN_ELIGIBILITY;
          this.EligibilityDecision = res.ouputdata.OVERALLDECISION;
          // for (let i = 0; i < res.ouputdata.LOAN_ELIGIBILITY.length; i++) {
          //   const Data = res.ouputdata.LOAN_ELIGIBILITY[i];
          //   if (Data.DECISION == 'Reject') {
          //     this.EligibilityDecision = 'Reject';
          //   }
          // }
          // if (this.EligibilityDecision != 'Reject') {
          //   this.EligibilityDecision = 'Approve';
          // }
          inputMap.set('Checkvalue', this.eligeData);
          inputMap.set('component', 'checkEligibilityForm');
          const modalRef = this.services.modal.open(PopupModalComponent, { windowClass: 'modal-width-lg' });
          var onModalClose = async (reason) => {
            (reason == 0 || reason == 1) ? await this.services.routing.removeOutlet() : undefined;
          }
          modalRef.result.then(onModalClose, onModalClose);
          modalRef.componentInstance.rotueToComponent(inputMap);
          this.services.dataStore.setModalReference(this.services.routing.currModal, modalRef);
        }

      },
    );
  }

  async SUBMIT_MAIN_BTN_click(event) {
    this.SUBMIT_MAIN_BTN.setDisabled(true);
    let inputMap = new Map();

    // if (this.EligibilityDecision != 'Reject') {
    //   this.EligibilityDecision = 'Approve';
    // }
    var noofErrors: number = await this.revalidate();
    var borrowercheck = this.Handler.getBorrowerPostData();
    for (let i = 0; i < borrowercheck.length; i++) {
      if (borrowercheck[i]['CustomerType'] == 'B') {
        this.borrower = true
        break;
      }
    }
    if (noofErrors == 0) {
      let countLoanOwnership = this.Handler.aggregateLoanOwnerShip();
      if (this.BAD_PROD_CAT.getFieldValue() !== 'CC' && countLoanOwnership < 100) {
        this.services.alert.showAlert(2, 'rlo.error.loanownership.invalid', -1);
        return;
      }
      inputMap.clear();
      if (this.borrower == true) {

        inputMap.set('HeaderParam.tenant-id', 'SB1');
        // inputMap.set('HeaderParam.user-id', 'Vishal');
        inputMap.set('HeaderParam.user-id', sessionStorage.getItem('userId'));
        inputMap.set('Body.ApplicationDetails.SourcingChannel', this.BAD_SRC_CHANNEL.getFieldValue());
        inputMap.set('Body.ApplicationDetails.DSACode', this.BAD_DSA_ID.getFieldValue());
        inputMap.set('Body.ApplicationDetails.ApplicationInfo.CreatedOn', this.BAD_DATE_OF_RCPT.getFieldValue());
        inputMap.set('Body.ApplicationDetails.ApplicationInfo.PhysicalFormNo', this.BAD_PHYSICAL_FRM_NO.getFieldValue());
        inputMap.set('Body.ApplicationDetails.ApplicationBranch', this.BAD_BRANCH.getFieldValue());


        inputMap.set('Body.ApplicationDetails.RequsetedCardLimit', this.BAD_REQ_CARD_LIMIT.getFieldValue());
        inputMap.set('Body.ApplicationDetails.ExistingCardNumber', this.BAD_CARD_NUMBER.getFieldValue());
        inputMap.set('Body.ApplicationDetails.ExistingCardType', this.BAD_CARD_TYPE.getFieldValue());
        inputMap.set('Body.ApplicationDetails.CustomerType', this.BAD_CUSTOMER_TYPE.getFieldValue());

        // inputMap.set('Body.ApplicationDetails.AppSubmissionDate', this.getTimeStamp());
        inputMap.set('Body.LoanDetails.LoanAmount', this.LD_LOAN_AMOUNT.getFieldValue());
        inputMap.set('Body.LoanDetails.InterestRate', this.LD_INTEREST_RATE.getFieldValue());
        if (this.BAD_PROD_CAT.getFieldValue() == 'CC') {
          inputMap.set('Body.LoanDetails.ApplicationPurpose', this.BAD_PRIME_USAGE.getFieldValue());
        } else {
          inputMap.set('Body.LoanDetails.ApplicationPurpose', this.BAD_APP_PRPSE.getFieldValue());
        }
        inputMap.set('Body.LoanDetails.Tenure', this.LD_TENURE.getFieldValue());
        inputMap.set('Body.LoanDetails.TenurePeriod', this.LD_TENURE_PERIOD.getFieldValue());
        inputMap.set('Body.LoanDetails.SystemRecommendedAmount', this.LD_SYS_AMT_RCMD.getFieldValue());
        inputMap.set('Body.LoanDetails.UserRecommendedAmount', this.LD_USR_RCMD_AMT.getFieldValue());
        inputMap.set('Body.LoanDetails.EMIAmount', this.LD_EMI_AMT.getFieldValue());
        inputMap.set('Body.LoanDetails.Product', this.BAD_PRODUCT.getFieldValue());
        inputMap.set('Body.LoanDetails.ProductCategory', this.BAD_PROD_CAT.getFieldValue());
        inputMap.set('Body.LoanDetails.SubProduct', this.BAD_SUB_PROD.getFieldValue());
        inputMap.set('Body.LoanDetails.Scheme', this.BAD_SCHEME.getFieldValue());
        inputMap.set('Body.LoanDetails.Promotion', this.BAD_PROMOTION.getFieldValue());
        if (this.EligibilityDecision == '' || this.EligibilityDecision == undefined) {
          inputMap.set('Body.LoanDetails.Decision', 'Approve');
        } else {
          inputMap.set('Body.LoanDetails.Decision', this.EligibilityDecision);
        }
        // inputMap.set('Body.LoanDetails.ReferrerName', this.RD_REFERRER_NAME.getFieldValue());
        // inputMap.set('Body.LoanDetails.ReferrerPhoneNo', this.RD_REFERRER_NO.getFieldValue());
        inputMap.set('Body.LoanDetails.MarginRate', this.LD_MARGIN_RATE.getFieldValue());
        inputMap.set('Body.LoanDetails.NetInterestRate', this.LD_NET_INTEREST_RATE.getFieldValue());
        inputMap.set('Body.BorrowerDetails', this.Handler.getBorrowerPostData());

        console.error("DEEP | inputMap", inputMap);
        console.log(inputMap.get("Body.LoanDetails.EMIAmoun"),
          inputMap.get("Body.LoanDetails.LoanAmount"),
          inputMap.get("Body.LoanDetails.UserRecommendedAmount"),
        )

        this.services.http.fetchApi('/proposal/initiate', 'POST', inputMap, '/initiation').subscribe(
          async (httpResponse: HttpResponse<any>) => {
            var res = httpResponse.body;
            for (let i = 0; i < res.Data.length; i++) {
              const CustData = res.Data[i];
              if (CustData.CustomerType == 'B') {
                this.borrowericif = CustData.ICIFNumber
              }
              this.icif = CustData.ICIFNumber;
            }
            var successmessage = "Proposal " + res.ApplicationReferenceNumber + " Submitted Successfully With ICIF Number " + this.borrowericif
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
                this.LD_EMI_AMT.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'LoanDetails.UserRecommendedAmount') {
                this.LD_USR_RCMD_AMT.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'LoanDetails.SystemRecommendedAmount') {
                //this.LD_SYS_AMT_RCMD.setError(err['ErrorDescription']);
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
                this.LD_INTEREST_RATE.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'LoanDetails.LoanAmount') {
                this.LD_LOAN_AMOUNT.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'BorrowerDetails.StaffID') {
                this.CD_STAFF_ID.setError(err['ErrorDescription']);
              }
              // else if (err['ErrorElementPath'] == 'BorrowerDetails.IsStaff') {
              //   this.CD_STAFF.setError(err['ErrorDescription']);
              // }
              else if (err['ErrorElementPath'] == 'BorrowerDetails.CustomerSegment') {
                this.CD_CUST_SGMT.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'BorrowerDetails.DebitScore') {
                this.CD_DEBIT_SCORE.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'BorrowerDetails.MobileNo') {
                this.CD_MOBILE.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'BorrowerDetails.TaxID') {
                this.CD_TAX_ID.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'BorrowerDetails.DOB') {
                this.CD_DOB.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'BorrowerDetails.Gender') {
                this.CD_GENDER.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'BorrowerDetails.FullName') {
                this.CD_FULL_NAME.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'BorrowerDetails.LastName') {
                this.CD_LAST_NAME.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'BorrowerDetails.MiddleName') {
                this.CD_MIDDLE_NAME.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'BorrowerDetails.FirstName') {
                this.CD_FIRST_NAME.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'BorrowerDetails.Title') {
                this.CD_TITLE.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'ApplicationDetails.DSACode') {
                this.BAD_DSA_ID.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'ApplicationDetails.SourcingChannel') {
                this.BAD_SRC_CHANNEL.setError(err['ErrorDescription']);
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
        this.services.alert.showAlert(2, '', 1000, 'Please Add Details for Borrower');
        this.SUBMIT_MAIN_BTN.setDisabled(false);
      }
    }
    else {
      this.services.alert.showAlert(2, 'rlo.error.invalid.form', -1);
      this.SUBMIT_MAIN_BTN.setDisabled(false);

    }
  }


  async Reset_click(event) {
    let inputMap = new Map();
    var mainMessage = this.services.rloui.getAlertMessage('rlo.reset.comfirmation');
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
      this.services.rloui.confirmationModal(modalObj).then(async (response) => {
        console.log(response);
        if (response != null) {
          if (response.id === 1) {
            this.onReset();
          }
        }
      });
    });

  }

  isPastDate(selectedDate) {
    const moment = require('moment');
    const currentDate = moment();
    currentDate.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
    selectedDate = moment(selectedDate, 'DD-MM-YYYY');
    console.log("current date :: ", currentDate._d);
    console.log("selected date :: ", selectedDate._d);
    if (selectedDate >= currentDate) {
      return false;
    }
    return true;
  }

  isTodaysDate(selectedDate) {
    const moment = require('moment');
    const currentDate = moment();
    currentDate.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
    selectedDate = moment(selectedDate, 'DD-MM-YYYY');
    if (moment(currentDate).isSame(selectedDate)) {
      return true;
    }
    return false;
  }

  isAgeValid(selectedDate) {
    const moment = require('moment');
    let currentDate = moment();
    currentDate.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
    selectedDate = moment(selectedDate, 'DD-MM-YYYY');
    this.age = currentDate.diff(selectedDate, 'years');
    console.log("age is:", this.age);
    console.log("cif min age is:", this.custMinAge);
    console.log("cif max age is:", this.custMaxAge);
    if (this.age < this.custMinAge || this.age > this.custMaxAge) {
      return false;
    }
    else {
      return true;
    }
  }


  async CD_CUST_TYPE_change(fieldID, value) {
    this.Handler.CustomerTypeOnChange();
    if (this.CD_CUST_TYPE.getFieldValue() == 'B') {
      this.CD_LOAN_OWNERSHIP.setValue(100);

    }
    else {
      this.CD_LOAN_OWNERSHIP.setValue(undefined);
    }
    if (this.allowCoBorrower.getFieldValue() == 'Y') {
      if (this.CD_CUST_TYPE.getFieldValue() !== 'B' && this.disableLoanOwnership == true) {
        this.CD_LOAN_OWNERSHIP.setReadOnly(true);
      }
      else {
        this.CD_LOAN_OWNERSHIP.setReadOnly(false);
      }
    }

  }

  async CD_LOAN_OWNERSHIP_blur() {

    this.loanTotal = this.Handler.aggregateLoanOwnerShip();
    if (this.CD_LOAN_OWNERSHIP.getFieldValue() !== undefined) {
      this.loanTotal = this.loanTotal + Number(this.CD_LOAN_OWNERSHIP.getFieldValue());
    }
    if (this.loanTotal > 100) {
      this.CD_LOAN_OWNERSHIP.setError('rlo.error.loanownership.onblur');
      return 1
    }

  }

  getTimeStamp() {
    const moment = require('moment');
    let currentDate = moment().format('DD-MM-YY hh:mm:ss A');
    // console.log("shweta :: current date test ",currentDate);
    return currentDate;
  }

  fieldDependencies = {
    BAD_SRC_CHANNEL: {
      inDep: [

        { paramKey: "VALUE1", depFieldID: "BAD_SRC_CHANNEL", paramType: "PathParam" },
        { paramKey: "KEY1", depFieldID: "hidSourceingChannel", paramType: "QueryParam" },
        { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
      ],
      outDep: [
      ]
    },
    BAD_DSA_ID: {
      inDep: [

        { paramKey: "VALUE1", depFieldID: "BAD_DSA_ID", paramType: "PathParam" },
        { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
        { paramKey: "KEY1", depFieldID: "hidDSAId", paramType: "QueryParam" },
      ],
      outDep: [
      ]
    },
    BAD_BRANCH: {
      inDep: [

        { paramKey: "BranchCd", depFieldID: "BAD_BRANCH", paramType: "PathParam" },
      ],
      outDep: [
      ]
    },
    BAD_PROD_CAT: {
      inDep: [

        { paramKey: "VALUE1", depFieldID: "BAD_PROD_CAT", paramType: "PathParam" },
        { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
        { paramKey: "KEY1", depFieldID: "hidProdCat", paramType: "QueryParam" },
      ],
      outDep: [
      ]
    },
    BAD_PRODUCT: {
      inDep: [

        { paramKey: "ProductCd", depFieldID: "BAD_PRODUCT", paramType: "PathParam" },
        { paramKey: "BAD_PROD_CAT", depFieldID: "BAD_PROD_CAT", paramType: "QueryParam" },
      ],
      outDep: [
      ]
    },
    BAD_SUB_PROD: {
      inDep: [

        { paramKey: "SubProductCd", depFieldID: "BAD_SUB_PROD", paramType: "PathParam" },
        { paramKey: "BAD_PRODUCT", depFieldID: "BAD_PRODUCT", paramType: "QueryParam" },
      ],
      outDep: [
      ]
    },
    BAD_SCHEME: {
      inDep: [

        { paramKey: "SchemeCd", depFieldID: "BAD_SCHEME", paramType: "PathParam" },
        { paramKey: "BAD_SUB_PROD", depFieldID: "BAD_SUB_PROD", paramType: "QueryParam" },
      ],
      outDep: [

        { paramKey: "MstSchemeDetails.DefaultRate", depFieldID: "LD_INTEREST_RATE" },
        { paramKey: "MstSchemeDetails.AllowCoBorrower", depFieldID: "allowCoBorrower" }
      ]
    },
    BAD_PROMOTION: {
      inDep: [

        { paramKey: "PromotionCd", depFieldID: "BAD_PROMOTION", paramType: "PathParam" },
        { paramKey: "BAD_PRODUCT", depFieldID: "BAD_PRODUCT", paramType: "QueryParam" },
        { paramKey: "BAD_SUB_PROD", depFieldID: "BAD_SUB_PROD", paramType: "QueryParam" },
      ],
      outDep: [

        { paramKey: "MstPromotionDetails.DefaultRate", depFieldID: "LD_INTEREST_RATE" },
        { paramKey: "MstPromotionDetails.AllowCoBorrower", depFieldID: "allowCoBorrower" }
      ]
    },
    CD_CUST_TYPE: {
      inDep: [

        { paramKey: "VALUE1", depFieldID: "CD_CUST_TYPE", paramType: "PathParam" },
        { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
        { paramKey: "KEY1", depFieldID: "hideCustomerType", paramType: "QueryParam" },
      ],
      outDep: [
      ]
    },
    // CD_EXISTING_CUST: {
    //   inDep: [

    //     { paramKey: "VALUE1", depFieldID: "CD_EXISTING_CUST", paramType: "PathParam" },
    //     { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
    //     { paramKey: "KEY1", depFieldID: "hideExsCust", paramType: "QueryParam" },
    //   ],
    //   outDep: [
    //   ]
    // },
    // CD_STAFF: {
    //   inDep: [

    //     { paramKey: "VALUE1", depFieldID: "CD_STAFF", paramType: "PathParam" },
    //     { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
    //     { paramKey: "KEY1", depFieldID: "hidYesNo", paramType: "QueryParam" },
    //   ],
    //   outDep: [
    //   ]
    // },
    CD_TITLE: {
      inDep: [

        { paramKey: "VALUE1", depFieldID: "CD_TITLE", paramType: "PathParam" },
        { paramKey: "KEY1", depFieldID: "hidTitle", paramType: "QueryParam" },
        { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
      ],
      outDep: [
      ]
    },
    CD_GENDER: {
      inDep: [

        { paramKey: "VALUE1", depFieldID: "CD_GENDER", paramType: "PathParam" },
        { paramKey: "KEY1", depFieldID: "hidGender", paramType: "QueryParam" },
        { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
      ],
      outDep: [
      ]
    },
    CD_CUST_SGMT: {
      inDep: [

        { paramKey: "CustSegmentCd", depFieldID: "CD_CUST_SGMT" },

      ],
      outDep: [
      ]
    },

    CD_CUST_SUB_SGMT: {
      inDep: [

        { paramKey: "SubProductCd", depFieldID: "CD_CUST_SUB_SGMT", paramType: "PathParam" },
        { paramKey: "SEGMENT_CD", depFieldID: "CD_CUST_SGMT", paramType: "QueryParam" },
      ],
      outDep: [
      ]
    },

    LD_TENURE_PERIOD: {
      inDep: [

        { paramKey: "VALUE1", depFieldID: "LD_TENURE_PERIOD", paramType: "PathParam" },
        { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
        { paramKey: "KEY1", depFieldID: "hideTenurePeriod", paramType: "QueryParam" },
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
    BAD_PRIME_USAGE: {
      inDep: [

        { paramKey: "VALUE1", depFieldID: "BAD_PRIME_USAGE", paramType: "PathParam" },
        { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
        { paramKey: "KEY1", depFieldID: "hideAppPurpose", paramType: "QueryParam" },
      ],
      outDep: [
      ]
    },


    BAD_CARD_TYPE: {
      inDep: [

        { paramKey: "VALUE1", depFieldID: "BAD_CARD_TYPE", paramType: "PathParam" },
        { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
        { paramKey: "KEY1", depFieldID: "hideCardType", paramType: "QueryParam" },
      ],
      outDep: [
      ]
    },
    BAD_CUSTOMER_TYPE: {
      inDep: [

        { paramKey: "VALUE1", depFieldID: "BAD_CUSTOMER_TYPE", paramType: "PathParam" },
        { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
        { paramKey: "KEY1", depFieldID: "hideCardCustomerType", paramType: "QueryParam" },
      ],
      outDep: [
      ]
    }


    // CD_COUNTRY_CODE: {
    //   inDep: [

    //     { paramKey: "VALUE1", depFieldID: "CD_COUNTRY_CODE", paramType: "PathParam" },
    //     { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
    //     { paramKey: "KEY1", depFieldID: "hideISDCode", paramType: "QueryParam" },
    //   ],
    //   outDep: [
    //   ]
    // },
  }

  customGenericOnBlur(event: any) {
    console.log("Deep | customGenericOnBlur", event);

    if (event.field == "LD_LOAN_AMOUNT") {
      // if (event.textFieldValue != "")
      this.Handler.updateAmountTags();
    } else if (event.field == "LD_GROSS_INCOME" || event.field == "LD_EXST_LBLT_AMT" || event.field == "LD_OTH_DEDUCTIONS") {
      this.Handler.calculateNetIncome({});
    } else if (event.field == "BAD_REQ_CARD_LIMIT") {
      this.BAD_REQ_CARD_LIMIT.setValue(event.textFieldValue);
    }
    this.genericOnBlur(event.field, event.textFieldValue);
  }

  //default code disabled;Temparary enabling it for customer search
  tempUnableCustId() {
    this.CD_CUSTOMER_ID.readOnly = false;
    this.CD_CIF.readOnly = false;
  }

  customerInputTabOut() {
    console.log("DEEP | customerInputTabOut()");

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
    obj.customerId = this.CD_CUSTOMER_ID.getFieldValue();
    obj.staffId = this.CD_STAFF_ID.getFieldValue();

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
            if (response)
              this.CD_RESET_click();
          }
        }
        else {
          console.warn("DEEP | No customer selected");
        }
      });
    }
  }

  validateCustomerId() {
    var totalErrors = 0;
    return totalErrors;
  }

  validateStaffId() {
    var totalErrors = 0;
    return totalErrors;
  }

  validateSelctedCustomer(searchType: 'Internal' | 'External') {
    let obj: ICustomSearchObject = {};
    obj.cifId = this.CD_CIF.getFieldValue();
    obj.customerId = this.CD_CUSTOMER_ID.getFieldValue();
    obj.staffId = this.CD_STAFF_ID.getFieldValue();

    let inputMap = new Map();

    if (searchType == "Internal") {
      inputMap.set('QueryParam.TaxId', this.CD_TAX_ID.getFieldValue());
      inputMap.set('QueryParam.MobileNumber', this.CD_MOBILE.getFieldValue());
      inputMap.set('QueryParam.FirstName', this.CD_FIRST_NAME.getFieldValue());
      inputMap.set('QueryParam.LastName', this.CD_LAST_NAME.getFieldValue());
      inputMap.set('QueryParam.dob', this.CD_DOB.getFieldValue());
      inputMap.set('QueryParam.StaffId', this.CD_STAFF_ID.getFieldValue());
      inputMap.set('QueryParam.ExistingCIF', this.CD_CIF.getFieldValue());
      inputMap.set('QueryParam.CustomerId', this.CD_CUSTOMER_ID.getFieldValue());
    } else {
      inputMap.set('Body.interfaceId', 'CUSTOMER_SEARCH');
      inputMap.set('Body.inputdata.firstName', 'Testing');
      inputMap.set('Body.inputdata.lastName', 'test');
      inputMap.set('Body.inputdata.mobileNumber', '9899999999');
      inputMap.set('Body.inputdata.nationalId', '111111111111111');
      inputMap.set('Body.inputdata.customerSubType', '001');
    }

    let promise = new Promise<boolean>((resolve, reject) => {
      this.services.rloCommonData.getSearchedCustomerData(searchType, inputMap).then((response) => {
        console.log(response);

      });
    });

  }

}
