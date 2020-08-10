import { Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import { DisbursementDetailsModel } from './DisbursementDetails.model';
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
import { DisbursementsHandlerComponent } from 'src/app/DisbursementDetails/disbursement-handler.component';
import { LoanDetailsFormComponent } from 'src/app/LoanDetailsForm/LoanDetailsForm.component';
import { DisbursementGridComponent } from '../DisbursementGrid/DisbursementGrid.component';
import { IAmortizationForm } from 'src/app/Interface/masterInterface';

const customCss: string = '';

@Component({
  selector: 'app-DisbursementDetails',
  templateUrl: './DisbursementDetails.component.html'
})
export class DisbursementDetailsComponent extends FormComponent implements OnInit, AfterViewInit {
  AplicationId: any;
  // @Input() ApplicationId: string;
  @Input() parentData: IAmortizationForm = undefined;
  //mainBorrower: string = undefined;
  // MstScoreResultMap: any;
  // activeScoreCardResultList: any;
  @ViewChild('DisbursalTo', { static: false }) DisbursalTo: ComboBoxComponent;
  @ViewChild('DisbursalDate', { static: false }) DisbursalDate: DateComponent;
  @ViewChild('Currency', { static: false }) Currency: ComboBoxComponent;
  @ViewChild('Amount', { static: false }) Amount: AmountComponent;
  @ViewChild('LocalCurrencyEquivalent', { static: false }) LocalCurrencyEquivalent: AmountComponent;
  @ViewChild('PaymentMode', { static: false }) PaymentMode: ComboBoxComponent;
  @ViewChild('InFavorOf', { static: false }) InFavorOf: TextBoxComponent;
  @ViewChild('FundTransferMode', { static: false }) FundTransferMode: ComboBoxComponent;
  @ViewChild('IFSCCode', { static: false }) IFSCCode: TextBoxComponent;
  @ViewChild('Account', { static: false }) Account: TextBoxComponent;
  @ViewChild('Remarks', { static: false }) Remarks: TextBoxComponent;
  @ViewChild('DD_Add', { static: false }) DD_Add: ButtonComponent;
  @ViewChild('DD_Reset', { static: false }) DD_Reset: ButtonComponent;
  @ViewChild('FieldId_18', { static: false }) FieldId_18: DisbursementGridComponent;
  @ViewChild('hideCurrencyDesc', { static: false }) hideCurrencyDesc: HiddenComponent;
  @ViewChild('hidExchangeRate', { static: false }) hidExchangeRate: HiddenComponent;
  @ViewChild('hideFundTransferMode', { static: false }) hideFundTransferMode: HiddenComponent;
  @ViewChild('hidAppId', { static: false }) hidAppId: HiddenComponent;
  @ViewChild('hidePaymentMode', { static: false }) hidePaymentMode: HiddenComponent;
  @ViewChild('Handler', { static: false }) Handler: DisbursementsHandlerComponent;
  @ViewChild('HideDisbursalSeqId', { static: false }) HideDisbursalSeqId: HiddenComponent;
  passedApplicationId: any;
  FilterOptions = [];

  async revalidate(): Promise<number> {
    var totalErrors = 0;
    super.beforeRevalidate();
    await Promise.all([
      this.revalidateBasicField('DisbursalTo'),
      this.revalidateBasicField('DisbursalDate'),
      this.revalidateBasicField('Currency'),
      this.revalidateBasicField('Amount'),
      this.revalidateBasicField('LocalCurrencyEquivalent'),
      this.revalidateBasicField('PaymentMode'),
      this.revalidateBasicField('InFavorOf'),
      this.revalidateBasicField('FundTransferMode'),
      this.revalidateBasicField('IFSCCode'),
      this.revalidateBasicField('Account'),
      this.revalidateBasicField('Remarks'),
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
    this.value = new DisbursementDetailsModel();
    this.componentCode = 'DisbursementDetails';
  }
  setReadOnly(readOnly) {
    super.setBasicFieldsReadOnly(readOnly);
  }

  async DD_Reset_click(event) {
    let inputMap = new Map();
    this.onReset();
  }

  async onFormLoad() {
    //UW
    console.log(this.FieldId_18.columnDefs);
    if (this.readOnly) {
      this.FieldId_18.columnDefs = this.FieldId_18.columnDefs.slice(0, 6);
      this.FieldId_18.columnDefs[5].width = 12;
      this.FieldId_18.columnDefs[5].cellRendererParams.CustomClass = "btn-views";
      this.FieldId_18.columnDefs[5].cellRendererParams.IconClass = 'fas fa-eye fa-lg';

    }
    else {
      this.ApplicationId = this.services.dataStore.getRouteParam(this.services.routing.currModal, 'ApplicationId');
    }

    this.setInputs(this.services.dataStore.getData(this.services.routing.currModal));
    this.Amount.setFormatOptions({ currencyCode: 'MUR', languageCode: 'en-US', });
    this.LocalCurrencyEquivalent.setFormatOptions({ currencyCode: 'MUR', languageCode: 'en-US', });
    this.hideCurrencyDesc.setValue('MUR');
    this.hidAppId.setValue('RLO');
    this.hideFundTransferMode.setValue('FUND_TRANSFER_MODE');
    this.hidePaymentMode.setValue('PAYMENT_MODE');
    this.Handler.hideOnPaymentMode({});
    this.FundTransferMode.setHidden(true);
    this.IFSCCode.setHidden(true);
    this.Account.setHidden(true);
    this.InFavorOf.setHidden(true);

    if (!this.readOnly) {
      this.getLoanFieldValue();
    }

    this.setFilterbyOptions();
    await this.Handler.onFormLoad({});

    await this.FieldId_18.gridDataLoad({
      'DisbursalSeqToGrid': this.ApplicationId,
      'CustomerList': this.FilterOptions
    });

    this.setDependencies();
  }

  getLoanFieldValue() {
    this.ApplicationId = this.parentData.ApplicationId
  }
  setInputs(param: any) {
    let params = this.services.http.mapToJson(param);
    if (params['mode']) {
      this.mode = params['mode'];
    }
  }
  async submitForm(path, apiCode, serviceCode) {
    this.submitData['formName'] = 'Disbursement Details';
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
    this.FieldId_18.setValue(inputValue['FieldId_18']);
    this.value = new DisbursementDetailsModel();
    this.value.setValue(inputValue);
    this.setDependencies();
    this.passNewValue(this.value);
  }

  ngOnInit() {

    if (this.formCode == undefined) { this.formCode = 'DisbursementDetails'; }
    if (this.formOnLoadError) { return; }
    var styleElement = document.createElement('style');
    styleElement.type = 'text/css';
    styleElement.innerHTML = customCss;
    styleElement.id = 'DisbursementDetails_customCss';
    document.getElementsByTagName('head')[0].appendChild(styleElement);
    // this.setFilterbyOptions();

  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    var styleElement = document.getElementById('DisbursementDetails_customCss');
    styleElement.parentNode.removeChild(styleElement);
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.subsBFldsValueUpdates();
      this.onFormLoad();
      this.checkForHTabOverFlow();
    });

    //UW
    if (this.readOnly) {
      this.setReadOnly(this.readOnly);
    }

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
    this.value = new DisbursementDetailsModel();
    this.passNewValue(this.value);
    this.setReadOnly(false);
    this.onFormLoad();
  }

  async DD_Add_click(event) {
    let inputMap = new Map();
    var numberOfErrors: number = await this.revalidate();
    if (numberOfErrors == 0) {
      if (this.HideDisbursalSeqId.getFieldValue() != undefined) {
        inputMap.clear();
        inputMap.set('PathParam.DisbursalSeq', this.HideDisbursalSeqId.getFieldValue());
        inputMap.set('Body.DisbursalDetails.DisbursalTo', this.DisbursalTo.getFieldValue());
        inputMap.set('Body.DisbursalDetails.DisbursalDate', this.DisbursalDate.getFieldValue());
        inputMap.set('Body.DisbursalDetails.DisbursalCurrency', this.Currency.getFieldValue());
        inputMap.set('Body.DisbursalDetails.DisbursalAmt', this.Amount.getFieldValue());
        inputMap.set('Body.DisbursalDetails.DisbursalAmtLocalCurrency', this.LocalCurrencyEquivalent.getFieldValue());
        inputMap.set('Body.DisbursalDetails.PaymentMode', this.PaymentMode.getFieldValue());
        inputMap.set('Body.DisbursalDetails.InFavorOf', this.InFavorOf.getFieldValue());
        inputMap.set('Body.DisbursalDetails.FundTransferMode', this.FundTransferMode.getFieldValue());
        inputMap.set('Body.DisbursalDetails.IFSCCode', this.IFSCCode.getFieldValue());
        inputMap.set('Body.DisbursalDetails.AccountNumber', this.Account.getFieldValue());
        inputMap.set('Body.DisbursalDetails.Remarks', this.Remarks.getFieldValue());
        inputMap.set('Body.DisbursalDetails.ApplicationId', this.ApplicationId);

        this.services.http.fetchApi('/DisbursalDetails/{DisbursalSeq}', 'PUT', inputMap, '/rlo-de').subscribe(
          async (httpResponse: HttpResponse<any>) => {
            var res = httpResponse.body;
            this.services.alert.showAlert(1, 'rlo.success.update.disbursal', 5000);
            this.onReset();
            // this.setFilterbyOptions();
          },
          async (httpError) => {
            var err = httpError['error']
            if (err != null && err['ErrorElementPath'] != undefined && err['ErrorDescription'] != undefined) {
              if (err['ErrorElementPath'] == 'DisbursalDetails.Remarks') {
                this.Remarks.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'DisbursalDetails.AccountNumber') {
                this.Account.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'DisbursalDetails.IFSCCode') {
                this.IFSCCode.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'DisbursalDetails.FundTransferMode') {
                this.FundTransferMode.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'DisbursalDetails.InFavorOf') {
                this.InFavorOf.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'DisbursalDetails.PaymentMode') {
                this.PaymentMode.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'DisbursalDetails.DisbursalAmtLocalCurrency') {
                this.LocalCurrencyEquivalent.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'DisbursalDetails.DisbursalAmt') {
                this.Amount.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'DisbursalDetails.DisbursalCurrency') {
                this.Currency.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'DisbursalDetails.DisbursalDate') {
                this.DisbursalDate.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'DisbursalDetails.DisbursalTo') {
                this.DisbursalTo.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'DisbursalSeq') {
                this.HideDisbursalSeqId.setError(err['ErrorDescription']);
              }
            }
            this.services.alert.showAlert(2, 'rlo.error.update.disbursal', -1);
          }
        );
      }
      else {
        inputMap.clear();
        inputMap.set('Body.DisbursalDetails.DisbursalTo', this.DisbursalTo.getFieldValue());
        inputMap.set('Body.DisbursalDetails.DisbursalDate', this.DisbursalDate.getFieldValue());
        inputMap.set('Body.DisbursalDetails.DisbursalCurrency', this.Currency.getFieldValue());
        inputMap.set('Body.DisbursalDetails.DisbursalAmt', this.Amount.getFieldValue());
        inputMap.set('Body.DisbursalDetails.DisbursalAmtLocalCurrency', this.LocalCurrencyEquivalent.getFieldValue());
        inputMap.set('Body.DisbursalDetails.PaymentMode', this.PaymentMode.getFieldValue());
        inputMap.set('Body.DisbursalDetails.InFavorOf', this.InFavorOf.getFieldValue());
        inputMap.set('Body.DisbursalDetails.FundTransferMode', this.FundTransferMode.getFieldValue());
        inputMap.set('Body.DisbursalDetails.IFSCCode', this.IFSCCode.getFieldValue());
        inputMap.set('Body.DisbursalDetails.AccountNumber', this.Account.getFieldValue());
        inputMap.set('Body.DisbursalDetails.Remarks', this.Remarks.getFieldValue());
        inputMap.set('Body.DisbursalDetails.ApplicationId', this.ApplicationId);

        this.services.http.fetchApi('/DisbursalDetails', 'POST', inputMap, '/rlo-de').subscribe(
          async (httpResponse: HttpResponse<any>) => {
            var res = httpResponse.body;
            this.services.alert.showAlert(1, 'rlo.success.save.disbursal', 5000);
            this.onReset();
            //  this.setFilterbyOptions();
          },
          async (httpError) => {
            var err = httpError['error']
            if (err != null && err['ErrorElementPath'] != undefined && err['ErrorDescription'] != undefined) {
              if (err['ErrorElementPath'] == 'DisbursalDetails.Remarks') {
                this.Remarks.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'DisbursalDetails.AccountNumber') {
                this.Account.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'DisbursalDetails.IFSCCode') {
                this.IFSCCode.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'DisbursalDetails.FundTransferMode') {
                this.FundTransferMode.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'DisbursalDetails.InFavorOf') {
                this.InFavorOf.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'DisbursalDetails.PaymentMode') {
                this.PaymentMode.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'DisbursalDetails.DisbursalAmtLocalCurrency') {
                this.LocalCurrencyEquivalent.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'DisbursalDetails.DisbursalAmt') {
                this.Amount.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'DisbursalDetails.DisbursalCurrency') {
                this.Currency.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'DisbursalDetails.DisbursalDate') {
                this.DisbursalDate.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'DisbursalDetails.DisbursalTo') {
                this.DisbursalTo.setError(err['ErrorDescription']);
              }
            }
            this.services.alert.showAlert(2, 'rlo.error.save.disbursal', -1);
          }
        );
      }
    }
    else {
      this.services.alert.showAlert(2, 'rlo.error.invalid.form', -1);
    }
  }

  setFilterbyOptions() {
    let tempCustomerList = this.services.rloCommonData.getCustomerList();
    this.FilterOptions = [];

    console.log("shweta :: in disburse section", tempCustomerList);
    //UW
    if (this.readOnly) {
      this.FilterOptions = this.services.rloui.customerListDropDownArray;
    }
    else {
      this.FilterOptions.push({ id: undefined, text: "" });
      tempCustomerList.forEach(element => {
        this.FilterOptions.push({ id: element.BorrowerSeq, text: element.FullName });
      });
    }
    this.DisbursalTo.setStaticListOptions(this.FilterOptions);
    console.log("shweta :: disburse options list", this.FilterOptions);
  }

  async Currency_blur(event) {
    let inputMap = new Map();
    this.Handler.calculateLocalCurrEquv()
  }
  async Amount_blur(event) {
    let inputMap = new Map();
    this.Handler.calculateLocalCurrEquv()
    // await this.Handler.onAddTypeChange();
  }
  async PaymentMode_change(event) {
    let inputMap = new Map();
    this.Handler.hideOnPaymentMode({});
  }

  async FieldId_18_modifyDisbursal(event) {
    let inputMap = new Map();
    this.showSpinner();
    inputMap.clear();
    inputMap.set('PathParam.DisbursalSeq', event.DisbursalKey);
    this.services.http.fetchApi('/DisbursalDetails/{DisbursalSeq}', 'GET', inputMap, '/rlo-de').subscribe(
      async (httpResponse: HttpResponse<any>) => {
        var res = httpResponse.body;
        this.DisbursalTo.setValue(res['DisbursalDetails']['DisbursalTo']);
        this.DisbursalDate.setValue(res['DisbursalDetails']['DisbursalDate']);
        this.Currency.setValue(res['DisbursalDetails']['DisbursalCurrency']);
        this.Amount.setValue(res['DisbursalDetails']['DisbursalAmt']);
        this.LocalCurrencyEquivalent.setValue(res['DisbursalDetails']['DisbursalAmtLocalCurrency']);
        this.PaymentMode.setValue(res['DisbursalDetails']['PaymentMode']);
        this.InFavorOf.setValue(res['DisbursalDetails']['InFavorOf']);
        this.FundTransferMode.setValue(res['DisbursalDetails']['FundTransferMode']);
        this.IFSCCode.setValue(res['DisbursalDetails']['IFSCCode']);
        this.Account.setValue(res['DisbursalDetails']['AccountNumber']);
        this.Remarks.setValue(res['DisbursalDetails']['Remarks']);
        this.HideDisbursalSeqId.setValue(res['DisbursalDetails']['DisbursalSeq']);
        this.hideSpinner();
        this.Handler.hideOnPaymentMode({});
      },
      async (httpError) => {
        var err = httpError['error']
        if (err != null && err['ErrorElementPath'] != undefined && err['ErrorDescription'] != undefined) {
        }
        this.services.alert.showAlert(2, 'Failed To Load', -1);
        this.hideSpinner();
      }
    );
  }

  clear_click(event) {
    this.onReset();
  }

  fieldDependencies = {
    Currency: {
      inDep: [

        { paramKey: "CurrencySrc", depFieldID: "Currency", paramType: "PathParam" },
        { paramKey: "CurrencyDest", depFieldID: "hideCurrencyDesc", paramType: "QueryParam" },
      ],
      outDep: [
        { paramKey: "MstCurrencyDetails.ExchangeRate", depFieldID: "hidExchangeRate" },
      ]
    },
    FundTransferMode: {
      inDep: [

        { paramKey: "VALUE1", depFieldID: "FundTransferMode", paramType: "PathParam" },
        { paramKey: "KEY1", depFieldID: "hideFundTransferMode", paramType: "QueryParam" },
        { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
      ],
      outDep: [
      ]
    },
    PaymentMode: {
      inDep: [

        { paramKey: "VALUE1", depFieldID: "PaymentMode", paramType: "PathParam" },
        { paramKey: "KEY1", depFieldID: "hidePaymentMode", paramType: "QueryParam" },
        { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
      ],
      outDep: [
      ]
    },
  }

}
