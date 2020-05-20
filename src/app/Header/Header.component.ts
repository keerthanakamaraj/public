import { Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter, Input, HostListener } from '@angular/core';
import { HeaderModel } from './Header.model';
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
import { HeaderHandlerComponent } from '../Header/header-handler.component';

const customCss: string = '';

@Component({
  selector: 'app-Header',
  templateUrl: './Header.component.html'
})
export class HeaderComponent extends FormComponent implements OnInit, AfterViewInit {
  @ViewChild('HD_CIF', { static: false }) HD_CIF: ReadOnlyComponent;
  @ViewChild('HD_CUST_ID', { static: false }) HD_CUST_ID: ReadOnlyComponent;
  @ViewChild('HD_APP_REF_NUM', { static: false }) HD_APP_REF_NUM: ReadOnlyComponent;
  @ViewChild('HD_APP_SUBMSN_DT', { static: false }) HD_APP_SUBMSN_DT: DateComponent;
  @ViewChild('HD_TTL_TAT_PRPSL', { static: false }) HD_TTL_TAT_PRPSL: ReadOnlyComponent;
  @ViewChild('HD_PROD_CAT', { static: false }) HD_PROD_CAT: ReadOnlyComponent;
  @ViewChild('HD_PROD', { static: false }) HD_PROD: ReadOnlyComponent;
  @ViewChild('HD_SUB_PROD', { static: false }) HD_SUB_PROD: ReadOnlyComponent;
  @ViewChild('HD_SCHEME', { static: false }) HD_SCHEME: ReadOnlyComponent;
  @ViewChild('HD_PROMOTION', { static: false }) HD_PROMOTION: ReadOnlyComponent;
  @ViewChild('LD_LOAN_AMT', { static: false }) LD_LOAN_AMT: ReadOnlyComponent;
  @ViewChild('LD_INTEREST_RATE', { static: false }) LD_INTEREST_RATE: ReadOnlyComponent;
  @ViewChild('LD_TENURE', { static: false }) LD_TENURE: ReadOnlyComponent;
  @ViewChild('LD_TENURE_PERIOD', { static: false }) LD_TENURE_PERIOD: ReadOnlyComponent;
  @ViewChild('LD_APP_PRPSE', { static: false }) LD_APP_PRPSE: ReadOnlyComponent;
  @ViewChild('LD_SYS_RCMD_AMT', { static: false }) LD_SYS_RCMD_AMT: ReadOnlyComponent;
  @ViewChild('LD_USR_RCMD_AMT', { static: false }) LD_USR_RCMD_AMT: ReadOnlyComponent;
  @ViewChild('Handler', { static: false }) Handler: HeaderHandlerComponent;
  @Output() productCategoryFound: EventEmitter<any> = new EventEmitter<any>();

  PRODUCT_CATEGORY_IMG = '';
  CURRENCY_IMG = '';

  showExpanded: boolean = true;
  elementPosition: any;

  /* data binding variables  */
  ARN: string;
  LOAN_AMT: string;
  LOAN_CATEGORY: string;
  INTEREST_RATE: string;
  TENURE: string;
  SUB_PRODUCT: string;
  SCHEME: string;

  async revalidate(): Promise<number> {
    var totalErrors = 0;
    super.beforeRevalidate();
    await Promise.all([
      this.revalidateBasicField('HD_CIF'),
      this.revalidateBasicField('HD_CUST_ID'),
      this.revalidateBasicField('HD_APP_REF_NUM'),
      this.revalidateBasicField('HD_APP_SUBMSN_DT'),
      this.revalidateBasicField('HD_TTL_TAT_PRPSL'),
      this.revalidateBasicField('HD_PROD_CAT'),
      this.revalidateBasicField('HD_PROD'),
      this.revalidateBasicField('HD_SUB_PROD'),
      this.revalidateBasicField('HD_SCHEME'),
      this.revalidateBasicField('HD_PROMOTION'),
      this.revalidateBasicField('LD_LOAN_AMT'),
      this.revalidateBasicField('LD_INTEREST_RATE'),
      this.revalidateBasicField('LD_TENURE'),
      this.revalidateBasicField('LD_TENURE_PERIOD'),
      this.revalidateBasicField('LD_APP_PRPSE'),
      this.revalidateBasicField('LD_SYS_RCMD_AMT'),
      this.revalidateBasicField('LD_USR_RCMD_AMT'),
    ]).then((errorCounts) => {
      errorCounts.forEach((errorCount) => {
        totalErrors += errorCount;
      });
    });
    this.errors = totalErrors;
    super.afterRevalidate();
    return totalErrors;
  }

  constructor(services: ServiceStock) {
    super(services);
    this.value = new HeaderModel();
    this.componentCode = 'Header';
  }
  setReadOnly(readOnly) {
    super.setBasicFieldsReadOnly(readOnly);
  }
  async onFormLoad() {
    this.setInputs(this.services.dataStore.getData(this.services.routing.currModal));
    // this.HD_CIF.setReadOnly(true);
    // this.HD_CUST_ID.setReadOnly(true);
    // this.HD_APP_REF_NUM.setReadOnly(true);
    // this.HD_APP_SUBMSN_DT.setReadOnly(true);
    // this.HD_TTL_TAT_PRPSL.setReadOnly(true);
    // this.HD_PROD_CAT.setReadOnly(true);
    // this.HD_PROD.setReadOnly(true);
    // this.HD_SUB_PROD.setReadOnly(true);
    // this.HD_SCHEME.setReadOnly(true);
    // this.HD_PROMOTION.setReadOnly(true);
    // this.LD_LOAN_AMT.setFormatOptions({ currencyCode: 'INR', languageCode: 'en-US', });
    // this.LD_LOAN_AMT.setReadOnly(true);
    // this.LD_INTEREST_RATE.setReadOnly(true);
    // this.LD_TENURE.setReadOnly(true);
    // this.LD_TENURE_PERIOD.setReadOnly(true);
    // this.LD_APP_PRPSE.setReadOnly(true);
    // this.LD_SYS_RCMD_AMT.setFormatOptions({ currencyCode: 'INR', languageCode: 'en-US', });
    // this.LD_SYS_RCMD_AMT.setReadOnly(true);
    // this.LD_USR_RCMD_AMT.setFormatOptions({ currencyCode: 'INR', languageCode: 'en-US', });
    // this.LD_USR_RCMD_AMT.setReadOnly(true);
    let inputMap = new Map();
    inputMap.clear();
    inputMap.set('PathParam.ApplicationId', this.services.dataStore.getRouteParam(this.services.routing.currModal, 'appId'));
    console.log('inputmaap', inputMap);
    this.services.http.fetchApi('/proposal/{ApplicationId}/header', 'GET', inputMap, '/rlo-de').subscribe(
      async (httpResponse: HttpResponse<any>) => {
        var res = httpResponse.body;

        let header = res.Header;

        this.ARN = header.ApplicationRefernceNo;
        this.LOAN_AMT = this.services.formatAmount(header.LoanAmount, null, null); // "₹ " + header.LoanAmount'];
        this.LOAN_CATEGORY = header.TypeOfLoan;
        this.INTEREST_RATE = header.InterestRate + "% pa";
        this.TENURE = header.Tenure + " " + header.TenurePeriod;
        this.SUB_PRODUCT = header.SubProduct;
        this.SCHEME = header.Scheme;

        let isLoanCategory = this.LOAN_CATEGORY == 'CC' ? false : true;

        this.productCategoryFound.emit({
          'isLoanCategory': isLoanCategory
        });

        this.HD_PROD_CAT.setValue(this.LOAN_CATEGORY);
        // this.HD_APP_REF_NUM.setValue(header.ApplicationRefernceNo);
        this.HD_PROD.setValue(header.Product);
        this.HD_SUB_PROD.setValue(this.SUB_PRODUCT);
        this.HD_SCHEME.setValue(this.SCHEME);
        this.HD_PROMOTION.setValue(header.Promotion);
        this.LD_LOAN_AMT.setValue(this.LOAN_AMT);
        this.LD_INTEREST_RATE.setValue(this.INTEREST_RATE);
        this.LD_TENURE.setValue(header.Tenure);
        this.LD_TENURE_PERIOD.setValue(header.TenurePeriod);
        this.LD_APP_PRPSE.setValue(header.ApplicationPurpose);
        // this.LD_SYS_RCMD_AMT.setValue(header.SystemRecommendedAmount);
        // this.LD_USR_RCMD_AMT.setValue(header.UserRecommendedAmount);
        this.LD_SYS_RCMD_AMT.setValue(this.services.formatAmount(header.SystemRecommendedAmount, null, null));
        this.LD_USR_RCMD_AMT.setValue(this.services.formatAmount(header.UserRecommendedAmount, null, null));
        // this.HD_APP_SUBMSN_DT.setValue(header.AppSubmissionDate);
        // this.HD_CIF.setValue(header.CIF);
        // this.HD_CUST_ID.setValue(header.CustomerId);

        this.apiSuccessCallback();
      },
      async (httpError) => {
        var err = httpError['error']
        if (err != null && err['ErrorElementPath'] != undefined && err['ErrorDescription'] != undefined) {
        }
        this.services.alert.showAlert(2, 'rlo.error.load.header', -1);
      }
    );
    await this.Handler.onFormLoad({
    });
    this.setDependencies();
  }
  setInputs(param: any) {
    let params = this.services.http.mapToJson(param);
    if (params['mode']) {
      this.mode = params['mode'];
    }
  }
  async submitForm(path, apiCode, serviceCode) {
    this.submitData['formName'] = 'Header Form';
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
    this.value = new HeaderModel();
    this.value.setValue(inputValue);
    this.setDependencies();
    this.passNewValue(this.value);
  }
  ngOnInit() {
    if (this.formCode == undefined) { this.formCode = 'Header'; }
    if (this.formOnLoadError) { return; }
    var styleElement = document.createElement('style');
    styleElement.type = 'text/css';
    styleElement.innerHTML = customCss;
    styleElement.id = 'Header_customCss';
    document.getElementsByTagName('head')[0].appendChild(styleElement);
  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    var styleElement = document.getElementById('Header_customCss');
    styleElement.parentNode.removeChild(styleElement);
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.subsBFldsValueUpdates();
      this.onFormLoad();
      this.checkForHTabOverFlow();
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
    this.value = new HeaderModel();
    this.passNewValue(this.value);
    this.setReadOnly(false);
    this.onFormLoad();
  }
  fieldDependencies = {
  }

  @HostListener('window:scroll', ['$event'])
  handleScroll() {
    let windowScroll = window.pageYOffset;
    if(windowScroll >= 280){
      this.showExpanded = false;
    } else if(windowScroll < 60 ) {
      this.showExpanded = true;
    }
  }

  apiSuccessCallback() {

    this.CURRENCY_IMG = './assets/icons/rupee-yellow.svg';

    switch (this.HD_PROD_CAT.getFieldValue()) {

      case 'AL': this.PRODUCT_CATEGORY_IMG = './assets/icons/autoloan-yellow.svg';
        this.HD_PROD_CAT.setValue('Auto Loan');
        break;

      case 'PL': this.PRODUCT_CATEGORY_IMG = './assets/icons/personalloan-yellow.svg';
        this.HD_PROD_CAT.setValue('Personal Loan');
        break;

      case 'ML': this.PRODUCT_CATEGORY_IMG = './assets/icons/mortgage-yellow.svg';
        this.HD_PROD_CAT.setValue('Mortgage Loan');
        break;

      case 'CC': this.PRODUCT_CATEGORY_IMG = './assets/icons/creditcard-yellow.svg';
        this.HD_PROD_CAT.setValue('Credit Card');
        break;
    }



  }
}
