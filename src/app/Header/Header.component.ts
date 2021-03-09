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
import { IGlobalApllicationDtls } from '../rlo-services/rloCommonData.service';

const customCss: string = '';

@Component({
  selector: 'app-Header',
  templateUrl: './Header.component.html'
})
export class HeaderComponent extends FormComponent implements OnInit, AfterViewInit {
  REQ_LIMIT: any;

  @HostListener('window:scroll', ['$event'])
  handleScroll() {
    let windowScroll = window.pageYOffset;
    if (this.headerExpandedView) {
      if (windowScroll >= 280) {
        this.headerExpandedView = false;
        if (!this.scrollExceded)
          this.scrollExceded = true
        this.passScrollExceded();
      }
    }
  }

  @Input('showProgressBar') showProgressBar: boolean = false;

  @ViewChild('HD_CIF', { static: false }) HD_CIF: ReadOnlyComponent;
  @ViewChild('HD_CUST_ID', { static: false }) HD_CUST_ID: ReadOnlyComponent;
  @ViewChild('HD_APP_REF_NUM', { static: false }) HD_APP_REF_NUM: ReadOnlyComponent;
  @ViewChild('HD_APP_SUBMSN_DT', { static: false }) HD_APP_SUBMSN_DT: DateComponent;
  @ViewChild('HD_TTL_TAT_PRPSL', { static: false }) HD_TTL_TAT_PRPSL: ReadOnlyComponent;
  @ViewChild('HD_PROD_CAT', { static: false }) HD_PROD_CAT: HiddenComponent;
  @ViewChild('HD_PROD', { static: false }) HD_PROD: HiddenComponent;
  @ViewChild('HD_SUB_PROD', { static: false }) HD_SUB_PROD: HiddenComponent;
  @ViewChild('HD_SCHEME', { static: false }) HD_SCHEME: HiddenComponent;
  @ViewChild('HD_PROMOTION', { static: false }) HD_PROMOTION: HiddenComponent;
  @ViewChild('LD_TENURE_PERIOD', { static: false }) LD_TENURE_PERIOD: HiddenComponent;
  @ViewChild('LD_APP_PRPSE', { static: false }) LD_APP_PRPSE: HiddenComponent;
  @ViewChild('LD_LOAN_AMT', { static: false }) LD_LOAN_AMT: ReadOnlyComponent;
  @ViewChild('LD_INTEREST_RATE', { static: false }) LD_INTEREST_RATE: ReadOnlyComponent;
  @ViewChild('LD_TENURE', { static: false }) LD_TENURE: ReadOnlyComponent;
  @ViewChild('LD_SYS_RCMD_AMT', { static: false }) LD_SYS_RCMD_AMT: ReadOnlyComponent;
  @ViewChild('LD_USR_RCMD_AMT', { static: false }) LD_USR_RCMD_AMT: ReadOnlyComponent;
  @ViewChild('REQ_CARD_LIMIT', { static: false }) REQ_CARD_LIMIT: ReadOnlyComponent;
  @ViewChild('CARD_NUMBER', { static: false }) CARD_NUMBER: ReadOnlyComponent;
  // @ViewChild('CARD_TYPE', { static: false }) CARD_TYPE: ReadOnlyComponent;
  @ViewChild('SANCTION_CREDIT_LIMIT', { static: false }) SANCTION_CREDIT_LIMIT: ReadOnlyComponent;
  @ViewChild('SANCTION_CASH_LIMIT', { static: false }) SANCTION_CASH_LIMIT: ReadOnlyComponent;
  @ViewChild('Handler', { static: false }) Handler: HeaderHandlerComponent;
  //Credt Card variables
  @ViewChild('CC_CUST_TYPE', { static: false }) CC_CUST_TYPE: ReadOnlyComponent;
  @ViewChild('CC_CHANNEL', { static: false }) CC_CHANNEL: ReadOnlyComponent;
  @ViewChild('CC_CARD_TYPE', { static: false }) CC_CARD_TYPE: ReadOnlyComponent;
  @ViewChild('CC_CARD_ASSOCIATION', { static: false }) CC_CARD_ASSOCIATION: ReadOnlyComponent;
  @ViewChild('CC_PRIME_USAGE', { static: false }) CC_PRIME_USAGE: ReadOnlyComponent;


  @ViewChild('HD_PROD_CAT_NAME', { static: false }) HD_PROD_CAT_NAME: ReadOnlyComponent;
  @ViewChild('HD_PROD_NAME', { static: false }) HD_PROD_NAME: ReadOnlyComponent;
  @ViewChild('HD_SUB_PROD_NAME', { static: false }) HD_SUB_PROD_NAME: ReadOnlyComponent;
  @ViewChild('HD_SCHEME_NAME', { static: false }) HD_SCHEME_NAME: ReadOnlyComponent;
  @ViewChild('HD_PROMOTION_NAME', { static: false }) HD_PROMOTION_NAME: ReadOnlyComponent;
  @ViewChild('LD_TENURE_PERIOD_NAME', { static: false }) LD_TENURE_PERIOD_NAME: ReadOnlyComponent;
  @ViewChild('LD_APP_PRPSE_NAME', { static: false }) LD_APP_PRPSE_NAME: ReadOnlyComponent;
  @ViewChild('CC_CAMPTYPE', { static: false }) CC_CAMPTYPE: ReadOnlyComponent;

  @ViewChild('REAL_PROD_NAME', { static: false }) REAL_PROD_NAME: ReadOnlyComponent;
  // @ViewChild('HD_PROD', { static: false }) HD_PROD: ReadOnlyComponent;


  @Output() productCategoryFound: EventEmitter<any> = new EventEmitter<any>();
  @Output() headerStateEvent: EventEmitter<any> = new EventEmitter<any>();

  PRODUCT_CATEGORY_IMG = '';
  CURRENCY_IMG = '';
  currencySymbol = '';

  headerExpandedView: boolean = true;
  headerCurrentState: boolean = true; //expanded-1,collapsed-0
  scrollExceded: boolean = false;

  elementPosition: any;

  /* data binding variables  */
  ARN: string;
  LOAN_AMT: string;
  LOAN_CATEGORY: string;
  INTEREST_RATE: string;
  TENURE: string;
  SUB_PRODUCT: string;
  SCHEME: string;
  isLoanCategory: boolean = false;
  customerType: string;
  channel: string;
  primeUsage: string;

  LOAN_CATEGORY_NAME: string;
  SCHEME_NAME: string;
  SUB_PRODUCT_NAME: string

  currentPageName: string;
  currency: string;

  async revalidate(): Promise<number> {
    var totalErrors = 0;
    super.beforeRevalidate();
    await Promise.all([
      // this.revalidateBasicField('HD_CIF'),
      // this.revalidateBasicField('HD_CUST_ID'),
      // this.revalidateBasicField('HD_APP_REF_NUM'),
      // this.revalidateBasicField('HD_APP_SUBMSN_DT'),
      // this.revalidateBasicField('HD_TTL_TAT_PRPSL'),
      // this.revalidateBasicField('HD_PROD_CAT'),
      // this.revalidateBasicField('HD_PROD'),
      // this.revalidateBasicField('HD_SUB_PROD'),
      // this.revalidateBasicField('HD_SCHEME'),
      // this.revalidateBasicField('HD_PROMOTION'),
      // this.revalidateBasicField('LD_LOAN_AMT'),
      // this.revalidateBasicField('LD_INTEREST_RATE'),
      // this.revalidateBasicField('LD_TENURE'),
      // this.revalidateBasicField('LD_TENURE_PERIOD'),
      // this.revalidateBasicField('LD_APP_PRPSE'),
      // this.revalidateBasicField('LD_SYS_RCMD_AMT'),
      // this.revalidateBasicField('LD_USR_RCMD_AMT'),
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
    this.currencySymbol = this.services.rloui.getCurrencyChar();

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
    // inputMap.set('PathParam.ApplicationId', 7894);
    console.log('inputmaap', inputMap);
    this.services.http.fetchApi('/proposal/{ApplicationId}/header', 'GET', inputMap, '/rlo-de').subscribe(
      async (httpResponse: HttpResponse<any>) => {
        var res = httpResponse.body;

        let header = res.Header;

        this.ARN = header.ApplicationRefernceNo;
        this.LOAN_CATEGORY = header.TypeOfLoan;
        this.isLoanCategory = this.LOAN_CATEGORY == 'CC' ? false : true;

        this.broadcastApplicationData(header);

        this.productCategoryFound.emit({
          'isLoanCategory': this.isLoanCategory,
          // 'ProductCode': header["Product"],
          // 'SubProductCode': header["SubProduct"],
          // 'SchemeCode': header["Scheme"]
        });

        this.LOAN_AMT = this.services.formatAmount(this.isLoanCategory ? header.LoanAmount : header.S_MaxLoanAmount, null, null, false); // "₹ " + header.LoanAmount'];

        this.INTEREST_RATE = header.InterestRate + "% pa";



        this.TENURE = '';
        if (header.Tenure) {
          this.TENURE = header.Tenure + ' ';
        }
        if (header.TenurePeriodName) {
          this.TENURE = this.TENURE + header.TenurePeriod;
        }
        this.TENURE = this.TENURE.trim();

        this.SUB_PRODUCT = header.SubProduct;
        this.SCHEME = header.Scheme;


        this.initializeExpandableHeaderData(header);
        this.initializeShrinkedHeaderData(header);

        this.HD_PROD_CAT.setValue(header.TypeOfLoan);
        // this.HD_APP_REF_NUM.setValue(header.ApplicationRefernceNo);
        this.HD_PROD.setValue(header.Product);
        this.HD_SUB_PROD.setValue(this.SUB_PRODUCT);
        // this.HD_SCHEME.setValue(this.SCHEME);
        if (header.Promotion == undefined || header.Promotion == null || header.Promotion == "") {
          this.HD_PROMOTION_NAME.setValue("NA");
        }
        else {
          this.HD_PROMOTION_NAME.setValue(header.Promotion);
        }
        // if (this.HD_SCHEME.getFieldValue() == undefined || this.HD_SCHEME.getFieldValue() == null) {
        //   this.HD_SCHEME.setValue("NA");
        // }
        // else{
        //   this.HD_SCHEME.setValue(header.Scheme);
        // }

        this.LD_LOAN_AMT.setValue(this.LOAN_AMT);
        this.LD_APP_PRPSE.setValue(header.ApplicationPurpose != undefined ? header.ApplicationPurpose : 'NA');
        if (header.hasOwnProperty("SchemeName") || header.SchemeName != null || header.SchemeName.length) {
          if (header.SchemeName.length) {
            this.REAL_PROD_NAME.setValue(header.SchemeName);
          }
          else {
            this.REAL_PROD_NAME.setValue(header.SchemeName);
          }
        }
        else {
          this.REAL_PROD_NAME.setValue("NA");
        }
        if (this.isLoanCategory) {
          this.LD_INTEREST_RATE.setValue(this.INTEREST_RATE);
          this.LD_TENURE.setValue(header.Tenure);
          this.LD_TENURE_PERIOD.setValue(header.TenurePeriod);
          this.LD_SYS_RCMD_AMT.setValue(this.services.formatAmount(header.SystemRecommendedAmount, null, null, false));
          this.LD_USR_RCMD_AMT.setValue(this.services.formatAmount(header.UserRecommendedAmount, null, null, false));
        } else {
          if (header.CamType == 'MEMC') {
            this.CC_PRIME_USAGE.setValue('Offices Expenses and Business Travel');
            // this.primeUsage = this.CC_PRIME_USAGE.getFieldValue();
          } else {
            this.CC_PRIME_USAGE.setValue(header.ApplicationPurposeName != undefined ? header.ApplicationPurposeName : 'NA');
            this.primeUsage = this.CC_PRIME_USAGE.getFieldValue();
          }
          if (header.CamType == 'LE') {
            this.CC_CAMPTYPE.setValue("Limit Enhancement");
          }
          else if (header.CamType == 'MEMC') {
            this.CC_CAMPTYPE.setValue("Member Card");
          }
          else if (header.CamType == 'NAPP') {
            this.CC_CAMPTYPE.setValue("New Application");
          }

          this.CC_CHANNEL.setValue(header.SourcingChannel);
          this.channel = this.CC_CHANNEL.getFieldValue();
          // this.CC_CARD_ASSOCIATION.setValue('NA');
          this.CC_CUST_TYPE.setValue(header.CardCustName);
          this.customerType = this.CC_CUST_TYPE.getFieldValue();

          this.CC_CARD_TYPE.setValue(header.CardTypename);
          if (header.hasOwnProperty("CardNumber") || header.CardNumber != null) {
            if (header.CardNumber.length) {
              this.CARD_NUMBER.setValue(header.CardNumber);
            }
            else {
              this.CARD_NUMBER.setValue("NA");
            }
          }
          else {
            this.CARD_NUMBER.setValue("NA");
          }
          
          if (header.hasOwnProperty("SchemeName") || header.SchemeName != null || header.SchemeName.length) {
            if (header.SchemeName.length) {
              this.REAL_PROD_NAME.setValue(header.SchemeName);
            }
            else {
              this.REAL_PROD_NAME.setValue(header.SchemeName);
            }
          }
          else {
            this.REAL_PROD_NAME.setValue("NA");
          }


          // this.SANCTION_CREDIT_LIMIT.setValue(header.SanctionCreditLimit);
          // this.SANCTION_CASH_LIMIT.setValue(header.SanctionCashLimit);

          this.SANCTION_CREDIT_LIMIT.setValue(this.services.formatAmount(header.AppCreditLimit, null, null, false));
          this.SANCTION_CASH_LIMIT.setValue(this.services.formatAmount(header.AppCashLimit, null, null, false));

          if (this.SANCTION_CREDIT_LIMIT.getFieldValue() == undefined && this.SANCTION_CREDIT_LIMIT.getFieldValue() == null) {
            this.SANCTION_CREDIT_LIMIT.setValue("NA");
          }
          if (this.SANCTION_CASH_LIMIT.getFieldValue() == undefined && this.SANCTION_CASH_LIMIT.getFieldValue() == null) {
            this.SANCTION_CASH_LIMIT.setValue("NA");
          }
          if (this.SANCTION_CREDIT_LIMIT.getFieldValue() == undefined && this.SANCTION_CREDIT_LIMIT.getFieldValue() == null) {
            this.SANCTION_CREDIT_LIMIT.setValue("NA");
          }
          // if (this.HD_SCHEME.getFieldValue() == undefined && this.HD_SCHEME.getFieldValue() == null) {
          //   this.HD_SCHEME.setValue("NA");
          // }


          this.REQ_CARD_LIMIT.setValue(this.services.formatAmount(header.ReqCardLimit, null, null, false));

        }
        this.currency = localStorage.getItem("currency.code.default");
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
    this.services.rloCommonData.getCurrentRoute();
    this.currentPageName = this.services.rloCommonData.currentRoute;
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

  apiSuccessCallback() {

    switch (localStorage.getItem("currency.code.default")) {
      case 'EUR': this.CURRENCY_IMG = './assets/icons/Euro Header icon.svg';
        break;
      case 'KES': this.CURRENCY_IMG = './assets/icons/Ksh icon.svg';
        break;
      case 'INR': this.CURRENCY_IMG = './assets/icons/rupee-yellow.svg';
        break;

      case 'ZWL': this.CURRENCY_IMG = './assets/icons/Euro Header icon.svg';
        break;
    }


    switch (this.HD_PROD_CAT.getFieldValue()) {
      case 'AL': this.PRODUCT_CATEGORY_IMG = './assets/icons/autoloan-yellow.svg';
        // this.HD_PROD_CAT_NAME.setValue('Auto Loan');
        break;
      case 'PL': this.PRODUCT_CATEGORY_IMG = './assets/icons/personalloan-yellow.svg';
        //   this.HD_PROD_CAT_NAME.setValue('Personal Loan');
        break;
      case 'ML': this.PRODUCT_CATEGORY_IMG = './assets/icons/mortgage-yellow.svg';
        //    this.HD_PROD_CAT_NAME.setValue('Mortgage Loan');
        break;
      case 'CC': this.PRODUCT_CATEGORY_IMG = './assets/icons/creditcard-yellow.svg';
        //    this.HD_PROD_CAT_NAME.setValue('Credit Card');
        break;
    }
  }

  passScrollExceded() {
    this.headerState(false);
  }

  headerState(state: boolean) {
    console.log(state);
    this.headerExpandedView = state;
    this.scrollExceded = !state;

    if (state) {
      window.scrollTo(0, 0);
    }

    this.headerStateEvent.emit({
      'headerState': state,
      'scrollExceded': this.scrollExceded
    });
  }

  initializeExpandableHeaderData(header) {
    this.HD_PROD_CAT_NAME.setValue(header.TypeOfLoanName);
    this.HD_PROD_NAME.setValue(header.ProductName);
    this.HD_SUB_PROD_NAME.setValue(header.SubProductName);
    // this.HD_SCHEME_NAME.setValue(header.SchemeName);
    // this.HD_PROMOTION_NAME.setValue(header.PromotionName);
    this.LD_TENURE_PERIOD_NAME.setValue(header.TenurePeriodName);
    this.LD_APP_PRPSE_NAME.setValue(header.ApplicationPurposeName);
    // if (this.HD_PROMOTION_NAME.getFieldValue() == undefined && this.HD_PROMOTION_NAME.getFieldValue() == null) {
    //   this.HD_PROMOTION_NAME.setValue("NA");
    // }
    // else {
    //   this.HD_PROMOTION_NAME.setValue(header.PromotionName);
    // }
    // if (this.HD_SCHEME_NAME.getFieldValue() == undefined && this.HD_SCHEME_NAME.getFieldValue() == null) {
    //   this.HD_SCHEME_NAME.setValue("NA");
    // }
    // else {
    //   this.HD_SCHEME_NAME.setValue(header.SchemeName);
    // }

    this.TENURE = '';
    if (header.Tenure) {
      this.TENURE = header.Tenure + ' ';
    }
    if (header.TenurePeriodName) {
      this.TENURE = this.TENURE + header.TenurePeriodName;
    }
    this.TENURE = this.TENURE.trim();

  }

  initializeShrinkedHeaderData(header) {
    this.LOAN_CATEGORY_NAME = header.TypeOfLoanName;
    this.SCHEME_NAME = header.SchemeName;
    this.SUB_PRODUCT_NAME = header.SubProductName;
    this.REQ_LIMIT = this.services.formatAmount(header.ReqCardLimit, null, null, false);

  }

  async broadcastApplicationData(header) {
    header.TypeOfLoan='AL';
    this.isLoanCategory=true;
    header.CardCustType='I';
    let StoreObject: IGlobalApllicationDtls = {
      isLoanCategory: this.isLoanCategory,
      TypeOfLoanCode: header.TypeOfLoan,
      TypeOfLoanName: header.TypeOfLoanName,
      ProductCode: header.Product,
      ProductName: header.ProductName,
      SubProductCode: header.SubProduct,
      SubProductName: header.SubProductName,
      SchemeCode: header.Scheme,
      SchemeName: header.SchemeName,
      PromotionCode: header.Promotion,
      PromotionName: header.PromotionName,
      LoanTenure: header.Tenure,
      LoanTenurePeriodCode: header.TenurePeriodCode,
      LoanTenurePeriodName: header.TenurePeriodName,
      ARN: header.ApplicationRefernceNo,
      LoanAmount: this.isLoanCategory ? header.LoanAmount : header.S_MaxLoanAmount,
      CardType: header.CardType,
      CardTypename: header.CardTypename,
      CustomerType: header.CardCustType,
      // CustomerType: 'C',
      InterestRate: header.InterestRate,
      Tenure: header.Tenure,
      TenurePeriodCd: header.TenurePeriod,
      TenurePeriodName: header.TenurePeriodName,
      MinCashLimit: header.Product_min_cash_limit,
      MaxCashLimit: header.Product_max_cash_limit,
      MaxCreditLimit: header.Product_max_credit,
      CamType: header.CamType,
      SubCamType: header.SubCamType,
      ReqCardLimit: header.ReqCardLimit,
      PrimaryUsage: header.ApplicationPurpose,
      CBSProductCode: header.CBS_Product_Code,
      ApplicationPurposeName: header.ApplicationPurposeName,
      CIF: header.CIF,
      ApprovedCardLimit: header.AppCreditLimit,
      SourcingChannel: header.SourcingChannel,
      isChannelApplication: (header.SourcingChannel == 'IB' || header.SourcingChannel == 'MB') ? true : false
    }
    this.services.rloCommonData.globalApplicationDtls = StoreObject;

  }
}
