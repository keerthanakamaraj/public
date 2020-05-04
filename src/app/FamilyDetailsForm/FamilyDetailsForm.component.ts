import { Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import { FamilyDetailsFormModel } from './FamilyDetailsForm.model';
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
import { FamilyDetailsGridComponent } from '../FamilyDetailsGrid/FamilyDetailsGrid.component';
import { FamilyHandlerComponent } from '../FamilyDetailsForm/family-handler.component';

const customCss: string = '';

@Component({
selector: 'app-FamilyDetailsForm',
templateUrl: './FamilyDetailsForm.component.html'
})
export class FamilyDetailsFormComponent extends FormComponent implements OnInit, AfterViewInit {
@ViewChild('FD_TITLE', {static: false}) FD_TITLE: ComboBoxComponent;
@ViewChild('FD_FIRST_NAME', {static: false}) FD_FIRST_NAME: TextBoxComponent;
@ViewChild('FD_MIDDLE_NAME', {static: false}) FD_MIDDLE_NAME: TextBoxComponent;
@ViewChild('FD_LAST_NAME', {static: false}) FD_LAST_NAME: TextBoxComponent;
@ViewChild('FD_FULL_NAME', {static: false}) FD_FULL_NAME: TextBoxComponent;
@ViewChild('FD_GENDER', {static: false}) FD_GENDER: ComboBoxComponent;
@ViewChild('FD_DOB', {static: false}) FD_DOB: DateComponent;
@ViewChild('FD_MOBILE', {static: false}) FD_MOBILE: TextBoxComponent;
@ViewChild('FD_RELATIONSHIP', {static: false}) FD_RELATIONSHIP: ComboBoxComponent;
@ViewChild('FD_NATIONAL_ID', {static: false}) FD_NATIONAL_ID: TextBoxComponent;
@ViewChild('FD_TAX_ID', {static: false}) FD_TAX_ID: TextBoxComponent;
@ViewChild('Save', {static: false}) Save: ButtonComponent;
@ViewChild('clear', {static: false}) clear: ButtonComponent;
@ViewChild('FAMILY_GRID', {static: false}) FAMILY_GRID: FamilyDetailsGridComponent;
@ViewChild('Handler', {static: false}) Handler: FamilyHandlerComponent;
@ViewChild('HidAppId', {static: false}) HidAppId: HiddenComponent;
@ViewChild('HidGender', {static: false}) HidGender: HiddenComponent;
@ViewChild('HidRelationship', {static: false}) HidRelationship: HiddenComponent;
@ViewChild('hidTitle', {static: false}) hidTitle: HiddenComponent;
@ViewChild('hiddenFamilySeq', {static: false}) hiddenFamilySeq: HiddenComponent;
async revalidate(): Promise<number> {
var totalErrors = 0;
super.beforeRevalidate();
await Promise.all([
this.revalidateBasicField('FD_TITLE'),
this.revalidateBasicField('FD_FIRST_NAME'),
this.revalidateBasicField('FD_MIDDLE_NAME'),
this.revalidateBasicField('FD_LAST_NAME'),
this.revalidateBasicField('FD_FULL_NAME'),
this.revalidateBasicField('FD_GENDER'),
this.revalidateBasicField('FD_DOB'),
this.revalidateBasicField('FD_MOBILE'),
this.revalidateBasicField('FD_RELATIONSHIP'),
this.revalidateBasicField('FD_NATIONAL_ID'),
this.revalidateBasicField('FD_TAX_ID'),
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
this.value = new FamilyDetailsFormModel();
this.componentCode = 'FamilyDetailsForm';
}
setReadOnly(readOnly){
super.setBasicFieldsReadOnly(readOnly);
}
async onFormLoad(){
this.setInputs(this.services.dataStore.getData(this.services.routing.currModal));
this.FD_FULL_NAME.setReadOnly(true);
this.HidAppId.setValue('RLO');
this.HidGender.setValue('GENDER');
this.HidRelationship.setValue('RELATIONSHIP');
this.hidTitle.setValue('TITLE');
let inputMap = new Map();
await this.FAMILY_GRID.gridDataLoad({
});
await this.Handler.onFormLoad({
});
this.setDependencies();
}
setInputs(param : any){
let params = this.services.http.mapToJson(param);
if(params['mode']){
this.mode = params['mode'];
}
}
async submitForm(path, apiCode, serviceCode){
this.submitData['formName'] = 'Family Details';
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
this.value = new FamilyDetailsFormModel();
this.value.setValue(inputValue);
this.setDependencies();
this.passNewValue(this.value);
}
ngOnInit(){
if(this.formCode == undefined) {this.formCode = 'FamilyDetailsForm';}
if(this.formOnLoadError){return;}
var styleElement = document.createElement('style');
styleElement.type = 'text/css';
styleElement.innerHTML = customCss;
styleElement.id = 'FamilyDetailsForm_customCss';
document.getElementsByTagName('head')[0].appendChild(styleElement);
}
ngOnDestroy(){
this.unsubscribe$.next();
this.unsubscribe$.complete();
var styleElement = document.getElementById('FamilyDetailsForm_customCss');
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
this.value = new FamilyDetailsFormModel();
this.passNewValue(this.value);
this.setReadOnly(false);
this.onFormLoad();
}
async Save_click(event){
let inputMap = new Map();
var noOfError:number = await this.revalidate();
if(noOfError==0){
if(this.hiddenFamilySeq.getFieldValue() != undefined){
inputMap.clear();
inputMap.set('PathParam.BorrowerSeq', this.hiddenFamilySeq.getFieldValue());
inputMap.set('Body.BorrowerDetails.Title', this.FD_TITLE.getFieldValue());
inputMap.set('Body.BorrowerDetails.FirstName', this.FD_FIRST_NAME.getFieldValue());
inputMap.set('Body.BorrowerDetails.MiddleName', this.FD_MIDDLE_NAME.getFieldValue());
inputMap.set('Body.BorrowerDetails.LastName', this.FD_LAST_NAME.getFieldValue());
inputMap.set('Body.BorrowerDetails.FullName', this.FD_FULL_NAME.getFieldValue());
inputMap.set('Body.BorrowerDetails.Gender', this.FD_GENDER.getFieldValue());
inputMap.set('Body.BorrowerDetails.DOB', this.FD_DOB.getFieldValue());
inputMap.set('Body.BorrowerDetails.MobileNo', this.FD_MOBILE.getFieldValue());
inputMap.set('Body.BorrowerDetails.Relationship', this.FD_RELATIONSHIP.getFieldValue());
inputMap.set('Body.BorrowerDetails.Nationality', this.FD_NATIONAL_ID.getFieldValue());
inputMap.set('Body.BorrowerDetails.TaxID', this.FD_TAX_ID.getFieldValue());
this.services.http.fetchApi('/BorrowerDetails/{BorrowerSeq}', 'PUT', inputMap).subscribe(
async (httpResponse: HttpResponse<any>) => {
var res = httpResponse.body;
this.services.alert.showAlert(1, 'rlo.success.update.family', 5000);
this.onReset();
},
async (httpError)=>{
var err = httpError['error']
if(err!=null && err['ErrorElementPath'] != undefined && err['ErrorDescription']!=undefined){
if(err['ErrorElementPath'] == 'BorrowerDetails.TaxID'){
this.FD_TAX_ID.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'BorrowerDetails.Nationality'){
this.FD_NATIONAL_ID.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'BorrowerDetails.Relationship'){
this.FD_RELATIONSHIP.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'BorrowerDetails.MobileNo'){
this.FD_MOBILE.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'BorrowerDetails.DOB'){
this.FD_DOB.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'BorrowerDetails.Gender'){
this.FD_GENDER.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'BorrowerDetails.FullName'){
this.FD_FULL_NAME.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'BorrowerDetails.LastName'){
this.FD_LAST_NAME.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'BorrowerDetails.MiddleName'){
this.FD_MIDDLE_NAME.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'BorrowerDetails.FirstName'){
this.FD_FIRST_NAME.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'BorrowerDetails.Title'){
this.FD_TITLE.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'BorrowerSeq'){
this.hiddenFamilySeq.setError(err['ErrorDescription']);
}
}
this.services.alert.showAlert(2, 'rlo.error.update.family', -1);
}
);
}
else{
inputMap.clear();
inputMap.set('Body.BorrowerDetails.Relationship', this.FD_RELATIONSHIP.getFieldValue());
inputMap.set('Body.BorrowerDetails.Title', this.FD_TITLE.getFieldValue());
inputMap.set('Body.BorrowerDetails.MiddleName', this.FD_MIDDLE_NAME.getFieldValue());
inputMap.set('Body.BorrowerDetails.FirstName', this.FD_FIRST_NAME.getFieldValue());
inputMap.set('Body.BorrowerDetails.FullName', this.FD_FULL_NAME.getFieldValue());
inputMap.set('Body.BorrowerDetails.LastName', this.FD_LAST_NAME.getFieldValue());
inputMap.set('Body.BorrowerDetails.Gender', this.FD_GENDER.getFieldValue());
inputMap.set('Body.BorrowerDetails.MobileNo', this.FD_MOBILE.getFieldValue());
inputMap.set('Body.BorrowerDetails.DOB', this.FD_DOB.getFieldValue());
inputMap.set('Body.BorrowerDetails.Nationality', this.FD_NATIONAL_ID.getFieldValue());
inputMap.set('Body.BorrowerDetails.TaxID', this.FD_TAX_ID.getFieldValue());
this.services.http.fetchApi('/BorrowerDetails', 'POST', inputMap).subscribe(
async (httpResponse: HttpResponse<any>) => {
var res = httpResponse.body;
this.services.alert.showAlert(1, 'rlo.success.save.family', 5000);
this.onReset();
},
async (httpError)=>{
var err = httpError['error']
if(err!=null && err['ErrorElementPath'] != undefined && err['ErrorDescription']!=undefined){
if(err['ErrorElementPath'] == 'BorrowerDetails.TaxID'){
this.FD_TAX_ID.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'BorrowerDetails.Nationality'){
this.FD_NATIONAL_ID.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'BorrowerDetails.DOB'){
this.FD_DOB.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'BorrowerDetails.MobileNo'){
this.FD_MOBILE.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'BorrowerDetails.Gender'){
this.FD_GENDER.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'BorrowerDetails.LastName'){
this.FD_LAST_NAME.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'BorrowerDetails.FullName'){
this.FD_FULL_NAME.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'BorrowerDetails.FirstName'){
this.FD_FIRST_NAME.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'BorrowerDetails.MiddleName'){
this.FD_MIDDLE_NAME.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'BorrowerDetails.Title'){
this.FD_TITLE.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'BorrowerDetails.Relationship'){
this.FD_RELATIONSHIP.setError(err['ErrorDescription']);
}
}
this.services.alert.showAlert(2, 'rlo.error.save.family', -1);
}
);
}
}
else{
this.services.alert.showAlert(2, 'rlo.error.invalid.form', -1);
}
}
async clear_click(event){
let inputMap = new Map();
this.onReset();
}
async FAMILY_GRID_onFamilyModify(event){
let inputMap = new Map();
this.showSpinner();
inputMap.clear();
inputMap.set('PathParam.BorrowerSeq', event.SeqKey);
this.services.http.fetchApi('/BorrowerDetails/{BorrowerSeq}', 'GET', inputMap).subscribe(
async (httpResponse: HttpResponse<any>) => {
var res = httpResponse.body;
this.FD_TITLE.setValue(res['BorrowerDetails']['Title']);
this.FD_FIRST_NAME.setValue(res['BorrowerDetails']['FirstName']);
this.FD_MIDDLE_NAME.setValue(res['BorrowerDetails']['MiddleName']);
this.FD_LAST_NAME.setValue(res['BorrowerDetails']['LastName']);
this.FD_FULL_NAME.setValue(res['BorrowerDetails']['FullName']);
this.FD_GENDER.setValue(res['BorrowerDetails']['Gender']);
this.FD_DOB.setValue(res['BorrowerDetails']['DOB']);
this.FD_MOBILE.setValue(res['BorrowerDetails']['MobileNo']);
this.FD_RELATIONSHIP.setValue(res['BorrowerDetails']['Relationship']);
this.FD_NATIONAL_ID.setValue(res['BorrowerDetails']['Nationality']);
this.FD_TAX_ID.setValue(res['BorrowerDetails']['TaxID']);
this.hiddenFamilySeq.setValue(res['BorrowerDetails']['BorrowerSeq']);
this.hideSpinner();
},
async (httpError)=>{
var err = httpError['error']
if(err!=null && err['ErrorElementPath'] != undefined && err['ErrorDescription']!=undefined){
}
this.services.alert.showAlert(2, 'rlo.error.wrong.form', -1);
this.hideSpinner();
}
);
}
fieldDependencies = {
FD_TITLE: {
inDep: [

{paramKey: "VALUE1", depFieldID: "FD_TITLE", paramType:"PathParam"},
{paramKey: "APPID", depFieldID: "HidAppId", paramType:"QueryParam"},
{paramKey: "KEY1", depFieldID: "hidTitle", paramType:"QueryParam"},
],
outDep: [
]},
FD_GENDER: {
inDep: [

{paramKey: "VALUE1", depFieldID: "FD_GENDER", paramType:"PathParam"},
{paramKey: "APPID", depFieldID: "HidAppId", paramType:"QueryParam"},
{paramKey: "KEY1", depFieldID: "HidGender", paramType:"QueryParam"},
],
outDep: [
]},
FD_RELATIONSHIP: {
inDep: [

{paramKey: "VALUE1", depFieldID: "FD_RELATIONSHIP", paramType:"PathParam"},
{paramKey: "APPID", depFieldID: "HidAppId", paramType:"QueryParam"},
{paramKey: "KEY1", depFieldID: "HidRelationship", paramType:"QueryParam"},
],
outDep: [
]},
}

}