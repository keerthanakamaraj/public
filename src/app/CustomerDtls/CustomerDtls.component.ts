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

const customCss: string = '';

@Component({
selector: 'app-CustomerDtls',
templateUrl: './CustomerDtls.component.html'
})
export class CustomerDtlsComponent extends FormComponent implements OnInit, AfterViewInit {
@ViewChild('CD_TITLE', {static: false}) CD_TITLE: ComboBoxComponent;
@ViewChild('CD_FIRST_NAME', {static: false}) CD_FIRST_NAME: TextBoxComponent;
@ViewChild('CD_MIDDLE_NAME', {static: false}) CD_MIDDLE_NAME: TextBoxComponent;
@ViewChild('CD_LAST_NAME', {static: false}) CD_LAST_NAME: TextBoxComponent;
@ViewChild('CD_FULL_NAME', {static: false}) CD_FULL_NAME: TextBoxComponent;
@ViewChild('CD_GENDER', {static: false}) CD_GENDER: ComboBoxComponent;
@ViewChild('CD_DOB', {static: false}) CD_DOB: DateComponent;
@ViewChild('CD_TAX_ID', {static: false}) CD_TAX_ID: TextBoxComponent;
@ViewChild('CD_MOBILE_NO', {static: false}) CD_MOBILE_NO: TextBoxComponent;
@ViewChild('CD_DEBIT_SCORE', {static: false}) CD_DEBIT_SCORE: TextBoxComponent;
@ViewChild('CD_CUST_SEGMENT', {static: false}) CD_CUST_SEGMENT: ComboBoxComponent;
@ViewChild('CD_STAFF', {static: false}) CD_STAFF: ComboBoxComponent;
@ViewChild('CD_STAFF_ID', {static: false}) CD_STAFF_ID: TextBoxComponent;
@ViewChild('CD_PMRY_EMBSR_NAME', {static: false}) CD_PMRY_EMBSR_NAME: TextBoxComponent;
@ViewChild('CD_NATIONALITY', {static: false}) CD_NATIONALITY: ComboBoxComponent;
@ViewChild('CD_CITIZENSHIP', {static: false}) CD_CITIZENSHIP: TextBoxComponent;
@ViewChild('CD_MARITAL_STATUS', {static: false}) CD_MARITAL_STATUS: ComboBoxComponent;
@ViewChild('CD_NATIONAL_ID', {static: false}) CD_NATIONAL_ID: TextBoxComponent;
@ViewChild('CD_PASSPORT_NO', {static: false}) CD_PASSPORT_NO: TextBoxComponent;
@ViewChild('CD_PASSPORT_EXPIRY', {static: false}) CD_PASSPORT_EXPIRY: DateComponent;
@ViewChild('CD_DRIVING_LICENSE', {static: false}) CD_DRIVING_LICENSE: TextBoxComponent;
@ViewChild('CD_DRVNG_LCNSE_EXP_DT', {static: false}) CD_DRVNG_LCNSE_EXP_DT: DateComponent;
@ViewChild('CD_PREF_COM_CH', {static: false}) CD_PREF_COM_CH: ComboBoxComponent;
@ViewChild('CD_SAVE_BTN', {static: false}) CD_SAVE_BTN: ButtonComponent;
@ViewChild('FieldId_29', {static: false}) FieldId_29: CustomerDtlsGridComponent;
@ViewChild('hidAppId', {static: false}) hidAppId: HiddenComponent;
@ViewChild('hidCusSgmt', {static: false}) hidCusSgmt: HiddenComponent;
@ViewChild('hidStaff', {static: false}) hidStaff: HiddenComponent;
@ViewChild('hidGender', {static: false}) hidGender: HiddenComponent;
@ViewChild('hidNationality', {static: false}) hidNationality: HiddenComponent;
@ViewChild('hidMaritalStatus', {static: false}) hidMaritalStatus: HiddenComponent;
@ViewChild('hidPrefCommCh', {static: false}) hidPrefCommCh: HiddenComponent;
@ViewChild('hidTitle', {static: false}) hidTitle: HiddenComponent;
async revalidate(): Promise<number> {
var totalErrors = 0;
super.beforeRevalidate();
await Promise.all([
this.revalidateBasicField('CD_TITLE'),
this.revalidateBasicField('CD_FIRST_NAME'),
this.revalidateBasicField('CD_MIDDLE_NAME'),
this.revalidateBasicField('CD_LAST_NAME'),
this.revalidateBasicField('CD_FULL_NAME'),
this.revalidateBasicField('CD_GENDER'),
this.revalidateBasicField('CD_DOB'),
this.revalidateBasicField('CD_TAX_ID'),
this.revalidateBasicField('CD_MOBILE_NO'),
this.revalidateBasicField('CD_DEBIT_SCORE'),
this.revalidateBasicField('CD_CUST_SEGMENT'),
this.revalidateBasicField('CD_STAFF'),
this.revalidateBasicField('CD_STAFF_ID'),
this.revalidateBasicField('CD_PMRY_EMBSR_NAME'),
this.revalidateBasicField('CD_NATIONALITY'),
this.revalidateBasicField('CD_CITIZENSHIP'),
this.revalidateBasicField('CD_MARITAL_STATUS'),
this.revalidateBasicField('CD_NATIONAL_ID'),
this.revalidateBasicField('CD_PASSPORT_NO'),
this.revalidateBasicField('CD_PASSPORT_EXPIRY'),
this.revalidateBasicField('CD_DRIVING_LICENSE'),
this.revalidateBasicField('CD_DRVNG_LCNSE_EXP_DT'),
this.revalidateBasicField('CD_PREF_COM_CH'),
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
this.value = new CustomerDtlsModel();
this.componentCode = 'CustomerDtls';
}
setReadOnly(readOnly){
super.setBasicFieldsReadOnly(readOnly);
}
async onFormLoad(){
this.setInputs(this.services.dataStore.getData(this.services.routing.currModal));
this.CD_FULL_NAME.setReadOnly(true);
this.hidAppId.setValue('RLO');
this.hidCusSgmt.setValue('CUST_SEGMENT');
this.hidStaff.setValue('Y/N');
this.hidGender.setValue('GENDER');
this.hidNationality.setValue('NATIONALITY');
this.hidMaritalStatus.setValue('MARITAL_STATUS');
this.hidPrefCommCh.setValue('PREF_COMM_CH');
this.hidTitle.setValue('TITLE');
this.setDependencies();
}
setInputs(param : any){
let params = this.services.http.mapToJson(param);
if(params['mode']){
this.mode = params['mode'];
}
}
async submitForm(path, apiCode, serviceCode){
this.submitData['formName'] = 'Customer Details Main Form';
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
this.value = new CustomerDtlsModel();
this.value.setValue(inputValue);
this.setDependencies();
this.passNewValue(this.value);
}
ngOnInit(){
if(this.formCode == undefined) {this.formCode = 'CustomerDtls';}
if(this.formOnLoadError){return;}
var styleElement = document.createElement('style');
styleElement.type = 'text/css';
styleElement.innerHTML = customCss;
styleElement.id = 'CustomerDtls_customCss';
document.getElementsByTagName('head')[0].appendChild(styleElement);
}
ngOnDestroy(){
this.unsubscribe$.next();
this.unsubscribe$.complete();
var styleElement = document.getElementById('CustomerDtls_customCss');
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
this.value = new CustomerDtlsModel();
this.passNewValue(this.value);
this.setReadOnly(false);
this.onFormLoad();
}
fieldDependencies = {
CD_TITLE: {
inDep: [

{paramKey: "VALUE1", depFieldID: "CD_TITLE", paramType:"PathParam"},
{paramKey: "APPID", depFieldID: "hidAppId", paramType:"QueryParam"},
{paramKey: "KEY1", depFieldID: "hidTitle", paramType:"QueryParam"},
],
outDep: [
]},
CD_GENDER: {
inDep: [

{paramKey: "VALUE1", depFieldID: "CD_GENDER", paramType:"PathParam"},
{paramKey: "APPID", depFieldID: "hidAppId", paramType:"QueryParam"},
{paramKey: "KEY1", depFieldID: "hidGender", paramType:"QueryParam"},
],
outDep: [
]},
CD_CUST_SEGMENT: {
inDep: [

{paramKey: "VALUE1", depFieldID: "CD_CUST_SEGMENT", paramType:"PathParam"},
{paramKey: "APPID", depFieldID: "hidAppId", paramType:"QueryParam"},
{paramKey: "KEY1", depFieldID: "hidCusSgmt", paramType:"QueryParam"},
],
outDep: [
]},
CD_STAFF: {
inDep: [

{paramKey: "VALUE1", depFieldID: "CD_STAFF", paramType:"PathParam"},
{paramKey: "KEY1", depFieldID: "hidStaff", paramType:"QueryParam"},
{paramKey: "APPID", depFieldID: "hidAppId", paramType:"QueryParam"},
],
outDep: [
]},
CD_NATIONALITY: {
inDep: [

{paramKey: "VALUE1", depFieldID: "CD_NATIONALITY", paramType:"PathParam"},
{paramKey: "APPID", depFieldID: "hidAppId", paramType:"QueryParam"},
{paramKey: "KEY1", depFieldID: "hidNationality", paramType:"QueryParam"},
],
outDep: [
]},
CD_MARITAL_STATUS: {
inDep: [

{paramKey: "VALUE1", depFieldID: "CD_MARITAL_STATUS", paramType:"PathParam"},
{paramKey: "APPID", depFieldID: "hidAppId", paramType:"QueryParam"},
{paramKey: "KEY1", depFieldID: "hidMaritalStatus", paramType:"QueryParam"},
],
outDep: [
]},
CD_PREF_COM_CH: {
inDep: [

{paramKey: "VALUE1", depFieldID: "CD_PREF_COM_CH", paramType:"PathParam"},
{paramKey: "APPID", depFieldID: "hidAppId", paramType:"QueryParam"},
{paramKey: "KEY1", depFieldID: "hidPrefCommCh", paramType:"QueryParam"},
],
outDep: [
]},
}

}
