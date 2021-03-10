import { Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import { ApplicationDtlsModel } from './ApplicationDtls.model';
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
import { ApplicationHandlerComponent } from '../ApplicationDtls/application-handler.component';
import { RloUiCurrencyComponent } from '../rlo-ui-currency/rlo-ui-currency.component';
import { RLOUIRadioComponent } from '../rlo-ui-radio/rlo-ui-radio.component';

const customCss: string = '';
const moment = require('moment');
@Component({
  selector: 'app-ApplicationDtls',
  templateUrl: './ApplicationDtls.component.html'
})
export class ApplicationDtlsComponent extends FormComponent implements OnInit, AfterViewInit {
  @ViewChild('AD_PHYSICAL_FORM_NO', { static: false }) AD_PHYSICAL_FORM_NO: TextBoxComponent;
  @ViewChild('AD_DATE_OF_RECIEPT', { static: false }) AD_DATE_OF_RECIEPT: DateComponent;
  // @ViewChild('AD_EXISTING_CUSTOMER', { static: false }) AD_EXISTING_CUSTOMER: ComboBoxComponent;
  @ViewChild('AD_SOURCING_CHANNEL', { static: false }) AD_SOURCING_CHANNEL: ComboBoxComponent;
  //@ViewChild('AD_DSA_ID', { static: false }) AD_DSA_ID: ComboBoxComponent;
  @ViewChild('AD_DSA_ID', { static: false }) AD_DSA_ID: TextBoxComponent;
  @ViewChild('AD_BRANCH', { static: false }) AD_BRANCH: ComboBoxComponent;
  @ViewChild('AD_Save', { static: false }) AD_Save: ButtonComponent;
  @ViewChild('Handler', { static: false }) Handler: ApplicationHandlerComponent;
  //  @ViewChild('hidExistCust', { static: false }) hidExistCust: HiddenComponent;
  @ViewChild('hidAppId', { static: false }) hidAppId: HiddenComponent;
  @ViewChild('hidSourcingChannel', { static: false }) hidSourcingChannel: HiddenComponent;
  //  @ViewChild('hidDsaId', { static: false }) hidDsaId: HiddenComponent;
  @ViewChild('hidAccBranch', { static: false }) hidAccBranch: HiddenComponent;

  //new changes canara
  // @ViewChild('BAD_CARD_TYPE', { static: false }) BAD_CARD_TYPE: TextBoxComponent;
  // @ViewChild('BAD_CUSTOMER_TYPE', { static: false }) BAD_CUSTOMER_TYPE: RLOUIRadioComponent;
  // @ViewChild('BAD_REQ_CARD_LIMIT', { static: false }) BAD_REQ_CARD_LIMIT: RloUiCurrencyComponent;
  // @ViewChild('BAD_CBS_PROD_CD', { static: false }) BAD_CBS_PROD_CD: TextBoxComponent;
  // @ViewChild('BAD_PRODUCT_APP', { static: false }) BAD_PRODUCT_APP: TextBoxComponent;
  // @ViewChild('BAD_SUB_PROD_APP', { static: false }) BAD_SUB_PROD_APP: TextBoxComponent;
  // @ViewChild('BAD_PRIME_USAGE', { static: false }) BAD_PRIME_USAGE: TextBoxComponent;
  // @ViewChild('BAD_PROD_CLASS', { static: false }) BAD_PROD_CLASS: TextBoxComponent;
  @ViewChild('hidCustType', { static: false }) hidCustType: HiddenComponent;

  @Input() ApplicationId: string = undefined;
  CustomerConfirmationStatus: string = undefined;
  CustomerConfirmationRemarks: string = undefined;
  isLoanCategory: boolean = false;

  async revalidate(showErrors: boolean = true): Promise<number> {
    var totalErrors = 0;
    super.beforeRevalidate();
    await Promise.all([
      this.revalidateBasicField('AD_PHYSICAL_FORM_NO', false, showErrors),
      this.revalidateBasicField('AD_DATE_OF_RECIEPT', false, showErrors),
      //  this.revalidateBasicField('AD_EXISTING_CUSTOMER', false, showErrors),
      this.revalidateBasicField('AD_SOURCING_CHANNEL', false, showErrors),
      this.revalidateBasicField('AD_DSA_ID', false, showErrors),
      this.revalidateBasicField('AD_BRANCH', false, showErrors),
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
    this.value = new ApplicationDtlsModel();
    this.componentCode = 'ApplicationDtls';
  }
  setReadOnly(readOnly) {
    super.setBasicFieldsReadOnly(readOnly);
  }
  async onFormLoad(event) {
    // this.ApplicationId = event.custSeq;
    this.setInputs(this.services.dataStore.getData(this.services.routing.currModal));
    this.fetchApplicationDetails();
    //   this.hidExistCust.setValue('Y/N');
    this.hidAppId.setValue('RLO');
    this.hidSourcingChannel.setValue('Branch');
    this.hidCustType.setValue('CARD_CUSTOMER_TYPE');
    // this.hidDsaId.setValue('DSA_ID');
    this.hidAccBranch.setValue('ACC_BRANCH');
    this.setDependencies();
    await this.Handler.onFormLoad({});

  }

  fetchApplicationDetails() {
    let inputMap = new Map();
    inputMap.clear();
    if (this.ApplicationId) {

      inputMap.set('PathParam.ApplicationId', this.ApplicationId);
      this.services.http.fetchApi('/ApplicationDetails/{ApplicationId}', 'GET', inputMap, '/rlo-de').subscribe(
        async (httpResponse: HttpResponse<any>) => {
          var res = httpResponse.body;

          var applDtls = res['ApplicationDetails'];
          if (applDtls) {
            this.AD_DATE_OF_RECIEPT.setValue(moment(applDtls.ApplicationInfo.CreatedOn, 'DD-MM-YYYY HH:mm:ss').format('DD-MM-YYYY'));
            // this.AD_EXISTING_CUSTOMER.setValue(applDtls.ExistingCustomer);
            this.AD_SOURCING_CHANNEL.setValue(applDtls.SourcingChannel);
            this.AD_DSA_ID.setValue(applDtls.DSACode);
            this.AD_BRANCH.setValue(applDtls.ApplicationBranch);
            this.services.rloCommonData.globalApplicationDtls.SubCamType = applDtls.SubCamType;
            console.log(this.services.rloCommonData.globalApplicationDtls);
            let headerData = this.services.rloCommonData.globalApplicationDtls;

            //Canara related changes
            // this.BAD_CARD_TYPE.setValue(headerData.CardTypename);
            // this.BAD_PRODUCT_APP.setValue(headerData.ProductName);
            // this.BAD_CBS_PROD_CD.setValue(headerData.CBSProductCode);
            // this.BAD_PROD_CLASS.setValue(headerData.SchemeName);
            // this.BAD_CUSTOMER_TYPE.setValue(headerData.CustomerType, undefined, true);
            // this.BAD_PRIME_USAGE.setValue(headerData.ApplicationPurposeName);
            // this.BAD_REQ_CARD_LIMIT.setComponentSpecificValue(headerData.ReqCardLimit);
            // this.BAD_SUB_PROD_APP.setValue(headerData.SubProductName);
            //Canara related changes

            // if (this.AD_PHYSICAL_FORM_NO.getFieldValue() == undefined && this.AD_PHYSICAL_FORM_NO.getFieldValue() == null) {
            //   this.AD_PHYSICAL_FORM_NO.setValue("NA");
            // }
            // else {
            // this.AD_PHYSICAL_FORM_NO.setValue(applDtls.ApplicationInfo.PhysicalFormNo);
            // }
            if (applDtls.ApplicationInfo.hasOwnProperty("PhysicalFormNo")) {
              if (applDtls.ApplicationInfo.PhysicalFormNo) {
                this.AD_PHYSICAL_FORM_NO.setValue(applDtls.ApplicationInfo.PhysicalFormNo);
              } else {
                this.AD_PHYSICAL_FORM_NO.setValue("NA");
              }
            }
            else {
              this.AD_PHYSICAL_FORM_NO.setValue("NA");
            }

            this.CustomerConfirmationStatus = applDtls.CustomerConfirmationStatus;
            this.CustomerConfirmationRemarks = applDtls.CustomerConfirmationRemarks;
            let array = [];
            array.push({ isValid: true, sectionData: this.getFieldValue() });
            let obj = {
              "name": "ApplicationDetails",
              "data": array,
              "sectionName": "ApplicationDetails"
            }
            this.services.rloCommonData.globalComponentLvlDataHandler(obj);
          }
        },
        async (httpError) => {
          var err = httpError['error']
          if (err != null && err['ErrorElementPath'] != undefined && err['ErrorDescription'] != undefined) {
          }
        }
      );

      this.setDependencies();
    }
  }
  setInputs(param: any) {
    let params = this.services.http.mapToJson(param);
    if (params['mode']) {
      this.mode = params['mode'];
    }
  }
  async submitForm(path, apiCode, serviceCode) {
    this.submitData['formName'] = 'Application Details';
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
    this.value = new ApplicationDtlsModel();
    this.value.setValue(inputValue);
    this.setDependencies();
    this.passNewValue(this.value);
  }
  ngOnInit() {
    if (this.formCode == undefined) { this.formCode = 'ApplicationDtls'; }
    if (this.formOnLoadError) { return; }
    var styleElement = document.createElement('style');
    styleElement.type = 'text/css';
    styleElement.innerHTML = customCss;
    styleElement.id = 'ApplicationDtls_customCss';
    document.getElementsByTagName('head')[0].appendChild(styleElement);
  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    var styleElement = document.getElementById('ApplicationDtls_customCss');
    styleElement.parentNode.removeChild(styleElement);
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.subsBFldsValueUpdates();
      this.onFormLoad(event);
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
    this.value = new ApplicationDtlsModel();
    this.passNewValue(this.value);
    this.setReadOnly(false);
    this.onFormLoad(event);
  }


  customGenericOnBlur(event: any) {
    console.log("Deep | customGenericOnBlur", event);

    if (event.field == "LD_LOAN_AMOUNT") {
      // if (event.textFieldValue != "")
      //this.Handler.updateAmountTags();
    } else if (event.field == "LD_GROSS_INCOME" || event.field == "LD_EXST_LBLT_AMT" || event.field == "LD_OTH_DEDUCTIONS") {
      //this.Handler.calculateNetIncome({});
    }
    // else if (event.field == "BAD_REQ_CARD_LIMIT") {
    //   this.BAD_REQ_CARD_LIMIT.setValue(event.textFieldValue);
    // }
    this.genericOnBlur(event.field, event.textFieldValue);
  }

  // async AD_Save_click(event) {
  //   let inputMap = new Map();
  //   inputMap.clear();
  //   inputMap.set('Body.ApplicationDetails.SourcingChannel', this.AD_SOURCING_CHANNEL.getFieldValue());
  //   inputMap.set('Body.ApplicationDetails.DSACode', this.AD_DSA_ID.getFieldValue());
  //   inputMap.set('Body.ApplicationDetails.ApplicationInfo.PhysicalFormNo', this.AD_PHYSICAL_FORM_NO.getFieldValue());
  //   // inputMap.set('Body.ApplicationDetails.ExistingCustomer', this.AD_EXISTING_CUSTOMER.getFieldValue());
  //   inputMap.set('Body.ApplicationDetails.ApplicationBranch', this.AD_BRANCH.getFieldValue());
  //   await this.services.http.fetchApi('/ApplicationDetails', 'POST', inputMap,'/rlo-de').toPromise()
  //     .then(
  //     async (httpResponse: HttpResponse<any>) => {
  //       var res = httpResponse.body;
  //       this.services.alert.showAlert(1, 'rlo.success.save.application', 5000);
  //     },
  //     async (httpError) => {
  //       var err = httpError['error']
  //       if (err != null && err['ErrorElementPath'] != undefined && err['ErrorDescription'] != undefined) {
  //         if (err['ErrorElementPath'] == 'ApplicationDetails.ApplicationBranch') {
  //           this.AD_BRANCH.setError(err['ErrorDescription']);
  //         }
  //         // else if (err['ErrorElementPath'] == 'ApplicationDetails.ExistingCustomer') {
  //         //   this.AD_EXISTING_CUSTOMER.setError(err['ErrorDescription']);
  //         // }
  //         else if (err['ErrorElementPath'] == 'ApplicationDetails.ApplicationInfo.PhysicalFormNo') {
  //           this.AD_PHYSICAL_FORM_NO.setError(err['ErrorDescription']);
  //         }
  //         else if (err['ErrorElementPath'] == 'ApplicationDetails.DSACode') {
  //           this.AD_DSA_ID.setError(err['ErrorDescription']);
  //         }
  //         else if (err['ErrorElementPath'] == 'ApplicationDetails.SourcingChannel') {
  //           this.AD_SOURCING_CHANNEL.setError(err['ErrorDescription']);
  //         }
  //       }
  //       this.services.alert.showAlert(2, 'rlo.error.save.application', -1);
  //     }
  //     );
  // }

  fieldDependencies = {
    // AD_EXISTING_CUSTOMER: {
    //   inDep: [

    //     { paramKey: "VALUE1", depFieldID: "AD_EXISTING_CUSTOMER", paramType: "PathParam" },
    //     { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
    //     { paramKey: "KEY1", depFieldID: "hidExistCust", paramType: "QueryParam" },
    //   ],
    //   outDep: [
    //   ]
    // },
    AD_SOURCING_CHANNEL: {
      inDep: [

        { paramKey: "VALUE1", depFieldID: "AD_SOURCING_CHANNEL", paramType: "PathParam" },
        { paramKey: "KEY1", depFieldID: "hidSourcingChannel", paramType: "QueryParam" },
        { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
      ],
      outDep: [
      ]
    },
    // AD_DSA_ID: {
    //   inDep: [

    //     { paramKey: "VALUE1", depFieldID: "AD_DSA_ID", paramType: "PathParam" },
    //     { paramKey: "KEY1", depFieldID: "hidDsaId", paramType: "QueryParam" },
    //     { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
    //   ],
    //   outDep: [
    //   ]
    // },
    AD_BRANCH: {
      inDep: [
        { paramKey: "BranchCd", depFieldID: "AD_BRANCH", paramType: "PathParam" },
        // { paramKey: "VALUE1", depFieldID: "AD_BRANCH", paramType: "PathParam" },
        // { paramKey: "KEY1", depFieldID: "hidAccBranch", paramType: "QueryParam" },
        // { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
      ],
      outDep: [
      ]
    },
    // BAD_CUSTOMER_TYPE: {
    //   inDep: [
    //     { paramKey: "VALUE1", depFieldID: "BAD_CUSTOMER_TYPE", paramType: "PathParam" },
    //     { paramKey: "KEY1", depFieldID: "hidCustType", paramType: "QueryParam" },
    //     { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
    //   ],
    //   outDep: [
    //   ]
    // }

    // BAD_PRIME_USAGE: {
    //   inDep: [

    //     { paramKey: "ApplicationCd", depFieldID: "BAD_PRIME_USAGE", paramType: "PathParam" },
    //     { paramKey: "PROD_CAT", depFieldID: "BAD_PROD_CAT", paramType: "QueryParam" },
    //   ],
    //   outDep: [
    //   ]
    // },
    // BAD_CARD_TYPE: {
    //   inDep: [

    //     { paramKey: "VALUE1", depFieldID: "BAD_CARD_TYPE", paramType: "PathParam" },
    //     { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
    //     { paramKey: "KEY1", depFieldID: "hideCardType", paramType: "QueryParam" },
    //   ],
    //   outDep: [
    //   ]
    // },
    // BAD_CUSTOMER_TYPE: {
    //   inDep: [

    //     { paramKey: "VALUE1", depFieldID: "BAD_CUSTOMER_TYPE", paramType: "PathParam" },
    //     { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
    //     { paramKey: "KEY1", depFieldID: "hideCardCustomerType", paramType: "QueryParam" },
    //   ],
    //   outDep: [
    //   ]
    // },
  }
}
