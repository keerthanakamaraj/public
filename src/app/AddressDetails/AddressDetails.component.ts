import { Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import { AddressDetailsModel } from './AddressDetails.model';
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
import { AddressDetailsGridComponent } from '../AddressDetailsGrid/AddressDetailsGrid.component';
import { AddressHandlerComponent } from '../AddressDetails/address-handler.component';

const customCss: string = '';

@Component({
  selector: 'app-AddressDetails',
  templateUrl: './AddressDetails.component.html'
})
export class AddressDetailsComponent extends FormComponent implements OnInit, AfterViewInit {
  @ViewChild('AD_ADDRESS_TYPE', { static: false }) AD_ADDRESS_TYPE: ComboBoxComponent;
  @ViewChild('AD_RESIDENCE_TYPE', { static: false }) AD_RESIDENCE_TYPE: ComboBoxComponent;
@ViewChild('AD_CUST_TYPE', {static: false}) AD_CUST_TYPE: ComboBoxComponent;
  @ViewChild('AD_ADDRESS_LINE1', { static: false }) AD_ADDRESS_LINE1: TextBoxComponent;
  @ViewChild('AD_ADDRESS_LINE2', { static: false }) AD_ADDRESS_LINE2: TextBoxComponent;
  @ViewChild('AD_ADDRESS_LINE3', { static: false }) AD_ADDRESS_LINE3: TextBoxComponent;
  @ViewChild('AD_ADDRESS_LINE4', { static: false }) AD_ADDRESS_LINE4: TextBoxComponent;
  @ViewChild('AD_PINCODE', { static: false }) AD_PINCODE: TextBoxComponent;
  @ViewChild('AD_REGION', { static: false }) AD_REGION: TextBoxComponent;
  @ViewChild('AD_CITY', { static: false }) AD_CITY: ComboBoxComponent;
  @ViewChild('AD_STATE', { static: false }) AD_STATE: ComboBoxComponent;
  @ViewChild('AD_LANDMARK', { static: false }) AD_LANDMARK: TextBoxComponent;
  @ViewChild('AD_MAILING_ADDRESS', { static: false }) AD_MAILING_ADDRESS: ComboBoxComponent;
@ViewChild('AD_RES_DUR', {static: false}) AD_RES_DUR: TextBoxComponent;
@ViewChild('AD_RES_DUR_UNIT', {static: false}) AD_RES_DUR_UNIT: ComboBoxComponent;
@ViewChild('AD_LANDLINE_NUMBER', {static: false}) AD_LANDLINE_NUMBER: TextBoxComponent;
  @ViewChild('AD_ALTERNATE_MOB_NO', { static: false }) AD_ALTERNATE_MOB_NO: TextBoxComponent;
@ViewChild('AD_EMAIL_ID2', {static: false}) AD_EMAIL_ID2: TextBoxComponent;
@ViewChild('AD_EMAIL_ID1', {static: false}) AD_EMAIL_ID1: TextBoxComponent;
@ViewChild('AD_CORR_EMAIL', {static: false}) AD_CORR_EMAIL: ComboBoxComponent;
  @ViewChild('AD_EMAIL1_CHECKBOX', { static: false }) AD_EMAIL1_CHECKBOX: CheckBoxComponent;
  @ViewChild('AD_EMAIL2_CHECKBOX', { static: false }) AD_EMAIL2_CHECKBOX: CheckBoxComponent;
  @ViewChild('AD_SAVE_ADDRESS', { static: false }) AD_SAVE_ADDRESS: ButtonComponent;
  @ViewChild('AD_CLEAR_BTN', { static: false }) AD_CLEAR_BTN: ButtonComponent;
  @ViewChild('AddressGrid', { static: false }) AddressGrid: AddressDetailsGridComponent;
  @ViewChild('Handler', { static: false }) Handler: AddressHandlerComponent;
  @ViewChild('AD_HIDE_ID', { static: false }) AD_HIDE_ID: HiddenComponent;
  @ViewChild('hidAddType', { static: false }) hidAddType: HiddenComponent;
  @ViewChild('hidAppId', { static: false }) hidAppId: HiddenComponent;
  @ViewChild('hidMailingAddress', { static: false }) hidMailingAddress: HiddenComponent;
  @ViewChild('hidResDurType', { static: false }) hidResDurType: HiddenComponent;
  @ViewChild('hidResType', { static: false }) hidResType: HiddenComponent;
@ViewChild('hideCorrEmail', {static: false}) hideCorrEmail: HiddenComponent;
  async revalidate(): Promise<number> {
    var totalErrors = 0;
    super.beforeRevalidate();
    await Promise.all([
      this.revalidateBasicField('AD_ADDRESS_TYPE'),
      this.revalidateBasicField('AD_RESIDENCE_TYPE'),
      this.revalidateBasicField('AD_ADDRESS_LINE1'),
      this.revalidateBasicField('AD_ADDRESS_LINE2'),
      this.revalidateBasicField('AD_ADDRESS_LINE3'),
      this.revalidateBasicField('AD_ADDRESS_LINE4'),
      this.revalidateBasicField('AD_PINCODE'),
      // this.revalidateBasicField('AD_REGION'),
      // this.revalidateBasicField('AD_CITY'),
      // this.revalidateBasicField('AD_STATE'),
      this.revalidateBasicField('AD_LANDMARK'),
this.revalidateBasicField('AD_MAILING_ADDRESS'),
      this.revalidateBasicField('AD_RES_DUR'),
      this.revalidateBasicField('AD_RES_DUR_UNIT'),
      this.revalidateBasicField('AD_LANDLINE_NUMBER'),
      this.revalidateBasicField('AD_ALTERNATE_MOB_NO'),
this.revalidateBasicField('AD_EMAIL_ID2'),
      this.revalidateBasicField('AD_EMAIL_ID1'),
this.revalidateBasicField('AD_CORR_EMAIL'),
      this.revalidateBasicField('AD_EMAIL1_CHECKBOX'),
      this.revalidateBasicField('AD_EMAIL2_CHECKBOX'),
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
    this.value = new AddressDetailsModel();
    this.componentCode = 'AddressDetails';
  }
  setReadOnly(readOnly) {
    super.setBasicFieldsReadOnly(readOnly);
  }
  async onFormLoad() {
    this.setInputs(this.services.dataStore.getData(this.services.routing.currModal));
    this.hidAddType.setValue('ADDRESS_TYPE');
    this.hidAppId.setValue('RLO');
    this.hidMailingAddress.setValue('Y_N');
    this.hidResDurType.setValue('PERIOD');
    this.hidResType.setValue('RESIDENCE_TYPE');
this.hideCorrEmail.setValue('CORR_EMAIL');
    let inputMap = new Map();
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
    this.submitData['formName'] = 'AddressDetails';
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
    this.value = new AddressDetailsModel();
    this.value.setValue(inputValue);
    this.setDependencies();
    this.passNewValue(this.value);
  }
  ngOnInit() {
    if (this.formCode == undefined) { this.formCode = 'AddressDetails'; }
    if (this.formOnLoadError) { return; }
    var styleElement = document.createElement('style');
    styleElement.type = 'text/css';
    styleElement.innerHTML = customCss;
    styleElement.id = 'AddressDetails_customCss';
    document.getElementsByTagName('head')[0].appendChild(styleElement);
  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    var styleElement = document.getElementById('AddressDetails_customCss');
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
    this.value = new AddressDetailsModel();
    this.passNewValue(this.value);
    this.setReadOnly(false);
    this.onFormLoad();
  }
  async AD_SAVE_ADDRESS_click(event) {
    let inputMap = new Map();
    let addGridData: any = this.AddressGrid.getFieldValue();
    var noOfError: number = await this.revalidate();

    if (noOfError == 0) {
      if (this.AD_MAILING_ADDRESS.getFieldValue() == 'Y') {
        var loopVar4 = addGridData;
        if (loopVar4) {
          for (var i = 0; i < loopVar4.length; i++) {
            if (loopVar4[i].MailingAddress == 'Y') {
              this.services.alert.showAlert(2, 'Mailing Address Already  Selected', -1);
              return;
            }
          }
        }
      }
      if (this.AD_HIDE_ID.getFieldValue() != undefined) {
        inputMap.clear();
        inputMap.set('PathParam.AddressDetailsSeq', this.AD_HIDE_ID.getFieldValue());
        inputMap.set('Body.AddressDetails.AddressType', this.AD_ADDRESS_TYPE.getFieldValue());
inputMap.set('Body.AddressDetails.ResidenceDuration', this.AD_RES_DUR.getFieldValue());
inputMap.set('Body.AddressDetails.Period', this.AD_RES_DUR_UNIT.getFieldValue());
        inputMap.set('Body.AddressDetails.ResidenceType', this.AD_RESIDENCE_TYPE.getFieldValue());
        inputMap.set('Body.AddressDetails.AddressLine1', this.AD_ADDRESS_LINE1.getFieldValue());
        inputMap.set('Body.AddressDetails.AddressLine2', this.AD_ADDRESS_LINE2.getFieldValue());
        inputMap.set('Body.AddressDetails.AddressLine3', this.AD_ADDRESS_LINE3.getFieldValue());
        inputMap.set('Body.AddressDetails.AddressLine4', this.AD_ADDRESS_LINE4.getFieldValue());
        inputMap.set('Body.AddressDetails.PinCode', this.AD_PINCODE.getFieldValue());
        inputMap.set('Body.AddressDetails.Region', this.AD_REGION.getFieldValue());
        inputMap.set('Body.AddressDetails.City', this.AD_CITY.getFieldValue());
        inputMap.set('Body.AddressDetails.State', this.AD_STATE.getFieldValue());
        inputMap.set('Body.AddressDetails.Landmark', this.AD_LANDMARK.getFieldValue());
        inputMap.set('Body.AddressDetails.LandlineNumber', this.AD_LANDLINE_NUMBER.getFieldValue());
        inputMap.set('Body.AddressDetails.MailingAddress', this.AD_MAILING_ADDRESS.getFieldValue());
        inputMap.set('Body.AddressDetails.EmailId1', this.AD_EMAIL_ID1.getFieldValue());
        inputMap.set('Body.AddressDetails.EmailId2', this.AD_EMAIL_ID2.getFieldValue());
        inputMap.set('Body.AddressDetails.AltMobileNo', this.AD_ALTERNATE_MOB_NO.getFieldValue());
        inputMap.set('Body.AddressDetails.BorrowerSeq', this.addBorrowerSeq);
inputMap.set('Body.AddressDetails.PreferredEmailForCommunication', this.AD_CORR_EMAIL.getFieldValue());
        this.services.http.fetchApi('/AddressDetails/{AddressDetailsSeq}', 'PUT', inputMap).subscribe(
          async (httpResponse: HttpResponse<any>) => {
            var res = httpResponse.body;

            this.services.alert.showAlert(1, 'Address Details Updated Successfulyl', 5000);
            await this.AddressGrid.gridDataLoad({
              'passBorrowerSeqToGrid': this.addBorrowerSeq,
            });
            this.onReset();
          },
          async (httpError) => {
            var err = httpError['error']
            if (err != null && err['ErrorElementPath'] != undefined && err['ErrorDescription'] != undefined) {
if(err['ErrorElementPath'] == 'AddressDetails.PreferredEmailForCommunication'){
this.AD_CORR_EMAIL.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'AddressDetails.AltMobileNo'){
                this.AD_ALTERNATE_MOB_NO.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'AddressDetails.EmailId2') {
                this.AD_EMAIL_ID2.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'AddressDetails.EmailId1') {
                this.AD_EMAIL_ID1.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'AddressDetails.MailingAddress') {
                this.AD_MAILING_ADDRESS.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'AddressDetails.LandlineNumber') {
                this.AD_LANDLINE_NUMBER.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'AddressDetails.Landmark') {
                this.AD_LANDMARK.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'AddressDetails.State') {
                this.AD_STATE.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'AddressDetails.City') {
                this.AD_CITY.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'AddressDetails.Region') {
                this.AD_REGION.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'AddressDetails.PinCode') {
                this.AD_PINCODE.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'AddressDetails.AddressLine4') {
                this.AD_ADDRESS_LINE4.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'AddressDetails.AddressLine3') {
                this.AD_ADDRESS_LINE3.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'AddressDetails.AddressLine2') {
                this.AD_ADDRESS_LINE2.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'AddressDetails.AddressLine1') {
                this.AD_ADDRESS_LINE1.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'AddressDetails.ResidenceType') {
                this.AD_RESIDENCE_TYPE.setError(err['ErrorDescription']);
              }
else if(err['ErrorElementPath'] == 'AddressDetails.Period'){
this.AD_RES_DUR_UNIT.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'AddressDetails.ResidenceDuration'){
this.AD_RES_DUR.setError(err['ErrorDescription']);
}
              else if (err['ErrorElementPath'] == 'AddressDetails.AddressType') {
                this.AD_ADDRESS_TYPE.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'AddressDetailsSeq') {
                this.AD_HIDE_ID.setError(err['ErrorDescription']);
              }
            }
            this.services.alert.showAlert(2, 'Update Failed', -1);
          }
        );
      }
      else {
        inputMap.clear();
        inputMap.set('Body.AddressDetails.AddressType', this.AD_ADDRESS_TYPE.getFieldValue());
inputMap.set('Body.AddressDetails.ResidenceDuration', this.AD_RES_DUR.getFieldValue());
inputMap.set('Body.AddressDetails.Period', this.AD_RES_DUR_UNIT.getFieldValue());
        inputMap.set('Body.AddressDetails.ResidenceType', this.AD_RESIDENCE_TYPE.getFieldValue());
        inputMap.set('Body.AddressDetails.AddressLine1', this.AD_ADDRESS_LINE1.getFieldValue());
        inputMap.set('Body.AddressDetails.AddressLine2', this.AD_ADDRESS_LINE2.getFieldValue());
        inputMap.set('Body.AddressDetails.AddressLine3', this.AD_ADDRESS_LINE3.getFieldValue());
        inputMap.set('Body.AddressDetails.AddressLine4', this.AD_ADDRESS_LINE4.getFieldValue());
        inputMap.set('Body.AddressDetails.PinCode', this.AD_PINCODE.getFieldValue());
        inputMap.set('Body.AddressDetails.Region', this.AD_REGION.getFieldValue());
        inputMap.set('Body.AddressDetails.City', this.AD_CITY.getFieldValue());
        inputMap.set('Body.AddressDetails.State', this.AD_STATE.getFieldValue());
        inputMap.set('Body.AddressDetails.Landmark', this.AD_LANDMARK.getFieldValue());
        inputMap.set('Body.AddressDetails.LandlineNumber', this.AD_LANDLINE_NUMBER.getFieldValue());
        inputMap.set('Body.AddressDetails.MailingAddress', this.AD_MAILING_ADDRESS.getFieldValue());
        inputMap.set('Body.AddressDetails.EmailId1', this.AD_EMAIL_ID1.getFieldValue());
        inputMap.set('Body.AddressDetails.EmailId2', this.AD_EMAIL_ID2.getFieldValue());
        inputMap.set('Body.AddressDetails.AltMobileNo', this.AD_ALTERNATE_MOB_NO.getFieldValue());
        inputMap.set('Body.AddressDetails.BorrowerSeq', this.addBorrowerSeq);
inputMap.set('Body.AddressDetails.PreferredEmailForCommunication', this.AD_CORR_EMAIL.getFieldValue());
        this.services.http.fetchApi('/AddressDetails', 'POST', inputMap).subscribe(
          async (httpResponse: HttpResponse<any>) => {
            var res = httpResponse.body;

            this.services.alert.showAlert(1, 'Address Details Saved Successfully', 5000);
            await this.AddressGrid.gridDataLoad({
              'passBorrowerSeqToGrid': this.addBorrowerSeq,
            });

            this.onReset();
          },
          async (httpError) => {
            var err = httpError['error']
            if (err != null && err['ErrorElementPath'] != undefined && err['ErrorDescription'] != undefined) {
if(err['ErrorElementPath'] == 'AddressDetails.PreferredEmailForCommunication'){
this.AD_CORR_EMAIL.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'AddressDetails.AltMobileNo'){
                this.AD_ALTERNATE_MOB_NO.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'AddressDetails.EmailId2') {
                this.AD_EMAIL_ID2.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'AddressDetails.EmailId1') {
                this.AD_EMAIL_ID1.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'AddressDetails.MailingAddress') {
                this.AD_MAILING_ADDRESS.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'AddressDetails.LandlineNumber') {
                this.AD_LANDLINE_NUMBER.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'AddressDetails.Landmark') {
                this.AD_LANDMARK.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'AddressDetails.State') {
                this.AD_STATE.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'AddressDetails.City') {
                this.AD_CITY.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'AddressDetails.Region') {
                this.AD_REGION.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'AddressDetails.PinCode') {
                this.AD_PINCODE.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'AddressDetails.AddressLine4') {
                this.AD_ADDRESS_LINE4.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'AddressDetails.AddressLine3') {
                this.AD_ADDRESS_LINE3.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'AddressDetails.AddressLine2') {
                this.AD_ADDRESS_LINE2.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'AddressDetails.AddressLine1') {
                this.AD_ADDRESS_LINE1.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'AddressDetails.ResidenceType') {
                this.AD_RESIDENCE_TYPE.setError(err['ErrorDescription']);
              }
else if(err['ErrorElementPath'] == 'AddressDetails.Period'){
this.AD_RES_DUR_UNIT.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'AddressDetails.ResidenceDuration'){
this.AD_RES_DUR.setError(err['ErrorDescription']);
}
              else if (err['ErrorElementPath'] == 'AddressDetails.AddressType') {
                this.AD_ADDRESS_TYPE.setError(err['ErrorDescription']);
              }
            }
            this.services.alert.showAlert(3, 'Failed to save address details', 5000);
          }
        );
      }
    }
    else {
      this.services.alert.showAlert(2, 'Please Fill all the Mandatory Fields', -1);
    }
  }
  async AD_CLEAR_BTN_click(event) {
    let inputMap = new Map();
    let durationType: any = this.AD_RES_DUR_UNIT.getFieldValue();
    this.onReset();
    console.log('durationType', durationType);
  }
  async AddressGrid_emitAddressDetails(event) {
    let inputMap = new Map();
    this.showSpinner();
    inputMap.clear();
    inputMap.set('PathParam.AddressDetailsSeq', event.addSeq);
    this.services.http.fetchApi('/AddressDetails/{AddressDetailsSeq}', 'GET', inputMap, '/olive/publisher').subscribe(
      async (httpResponse: HttpResponse<any>) => {
        var res = httpResponse.body;
        this.AD_ADDRESS_TYPE.setValue(res['AddressDetails']['AddressType']);
this.AD_RES_DUR.setValue(res['AddressDetails']['ResidenceDuration']);
this.AD_RES_DUR_UNIT.setValue(res['AddressDetails']['Period']);
this.AD_RESIDENCE_TYPE.setValue(res['AddressDetails']['ResidenceType']);
this.AD_ADDRESS_LINE1.setValue(res['AddressDetails']['AddressLine1']);
this.AD_ADDRESS_LINE2.setValue(res['AddressDetails']['AddressLine2']);
this.AD_ADDRESS_LINE3.setValue(res['AddressDetails']['AddressLine3']);
this.AD_ADDRESS_LINE4.setValue(res['AddressDetails']['AddressLine4']);
this.AD_PINCODE.setValue(res['AddressDetails']['PinCode']);
this.AD_REGION.setValue(res['AddressDetails']['Region']);
this.AD_CITY.setValue(res['AddressDetails']['City']);
this.AD_STATE.setValue(res['AddressDetails']['State']);
this.AD_LANDMARK.setValue(res['AddressDetails']['Landmark']);
this.AD_EMAIL_ID1.setValue(res['AddressDetails']['EmailId1']);
this.AD_EMAIL_ID2.setValue(res['AddressDetails']['EmailId2']);
this.AD_ALTERNATE_MOB_NO.setValue(res['AddressDetails']['AltMobileNo']);
this.AD_HIDE_ID.setValue(res['AddressDetails']['AddressDetailsSeq']);
this.AD_MAILING_ADDRESS.setValue(res['AddressDetails']['MailingAddress']);
this.AD_CORR_EMAIL.setValue(res['AddressDetails']['PreferredEmailForCommunication']);
        this.hideSpinner();
      },
      async (httpError) => {
        var err = httpError['error']
        if (err != null && err['ErrorElementPath'] != undefined && err['ErrorDescription'] != undefined) {
        }
        this.services.alert.showAlert(2, 'Fail to load', -1);
        this.hideSpinner();
      }
    );
  }
  fieldDependencies = {
    AD_ADDRESS_TYPE: {
      inDep: [

{paramKey: "VALUE1", depFieldID: "AD_ADDRESS_TYPE", paramType:"PathParam"},
{paramKey: "KEY1", depFieldID: "hidAddType", paramType:"QueryParam"},
{paramKey: "APPID", depFieldID: "hidAppId", paramType:"QueryParam"},
],
outDep: [
]},
AD_RESIDENCE_TYPE: {
inDep: [

{paramKey: "VALUE1", depFieldID: "AD_RESIDENCE_TYPE", paramType:"PathParam"},
{paramKey: "KEY1", depFieldID: "hidResType", paramType:"QueryParam"},
{paramKey: "APPID", depFieldID: "hidAppId", paramType:"QueryParam"},
],
outDep: [
]},
AD_CITY: {
inDep: [

{paramKey: "CityCd", depFieldID: "AD_CITY", paramType:"PathParam"},
],
outDep: [
]},
AD_STATE: {
inDep: [

{paramKey: "StateCd", depFieldID: "AD_STATE", paramType:"PathParam"},
],
outDep: [
]},
AD_MAILING_ADDRESS: {
inDep: [

{paramKey: "VALUE1", depFieldID: "AD_MAILING_ADDRESS", paramType:"PathParam"},
{paramKey: "APPID", depFieldID: "hidAppId", paramType:"QueryParam"},
{paramKey: "KEY1", depFieldID: "hidMailingAddress", paramType:"QueryParam"},
],
outDep: [
]},
AD_RES_DUR_UNIT: {
inDep: [

{paramKey: "VALUE1", depFieldID: "AD_RES_DUR_UNIT", paramType:"PathParam"},
{paramKey: "APPID", depFieldID: "hidAppId", paramType:"QueryParam"},
{paramKey: "KEY1", depFieldID: "hidResDurType", paramType:"QueryParam"},
],
outDep: [
]},
AD_CORR_EMAIL: {
inDep: [
{paramKey: "VALUE1", depFieldID: "AD_CORR_ADD", paramType:"PathParam"},
{paramKey: "APPID", depFieldID: "hidAppId", paramType:"QueryParam"},
{paramKey: "KEY1", depFieldID: "hideCorrEmail", paramType:"QueryParam"},
],
outDep: [
]},
}
  /* Write Custom Scripts Here */
  
  addBorrowerSeq;
}