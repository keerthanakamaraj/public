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

const customCss: string = '';

@Component({
selector: 'app-ApplicationDtls',
templateUrl: './ApplicationDtls.component.html'
})
export class ApplicationDtlsComponent extends FormComponent implements OnInit, AfterViewInit {
@ViewChild('AD_PHYSICAL_FORM_NO', {static: false}) AD_PHYSICAL_FORM_NO: TextBoxComponent;
@ViewChild('AD_DATE_OF_RECIEPT', {static: false}) AD_DATE_OF_RECIEPT: DateComponent;
@ViewChild('AD_EXISTING_CUSTOMER', {static: false}) AD_EXISTING_CUSTOMER: ComboBoxComponent;
@ViewChild('AD_SOURCING_CHANNEL', {static: false}) AD_SOURCING_CHANNEL: ComboBoxComponent;
@ViewChild('AD_DSA_ID', {static: false}) AD_DSA_ID: ComboBoxComponent;
@ViewChild('AD_BRANCH', {static: false}) AD_BRANCH: ComboBoxComponent;
@ViewChild('AD_Save', {static: false}) AD_Save: ButtonComponent;
async revalidate(): Promise<number> {
var totalErrors = 0;
super.beforeRevalidate();
await Promise.all([
this.revalidateBasicField('AD_PHYSICAL_FORM_NO'),
this.revalidateBasicField('AD_DATE_OF_RECIEPT'),
this.revalidateBasicField('AD_EXISTING_CUSTOMER'),
this.revalidateBasicField('AD_SOURCING_CHANNEL'),
this.revalidateBasicField('AD_DSA_ID'),
this.revalidateBasicField('AD_BRANCH'),
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
this.value = new ApplicationDtlsModel();
this.componentCode = 'ApplicationDtls';
}
setReadOnly(readOnly){
super.setBasicFieldsReadOnly(readOnly);
}
async onFormLoad(){
this.setInputs(this.services.dataStore.getData(this.services.routing.currModal));
this.setDependencies();
}
setInputs(param : any){
let params = this.services.http.mapToJson(param);
if(params['mode']){
this.mode = params['mode'];
}
}
async submitForm(path, apiCode, serviceCode){
this.submitData['formName'] = 'Application Details';
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
this.value = new ApplicationDtlsModel();
this.value.setValue(inputValue);
this.setDependencies();
this.passNewValue(this.value);
}
ngOnInit(){
if(this.formCode == undefined) {this.formCode = 'ApplicationDtls';}
if(this.formOnLoadError){return;}
var styleElement = document.createElement('style');
styleElement.type = 'text/css';
styleElement.innerHTML = customCss;
styleElement.id = 'ApplicationDtls_customCss';
document.getElementsByTagName('head')[0].appendChild(styleElement);
}
ngOnDestroy(){
this.unsubscribe$.next();
this.unsubscribe$.complete();
var styleElement = document.getElementById('ApplicationDtls_customCss');
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
this.value = new ApplicationDtlsModel();
this.passNewValue(this.value);
this.setReadOnly(false);
this.onFormLoad();
}
async AD_Save_click(event){
let inputMap = new Map();
inputMap.clear();
inputMap.set('Body.ApplicationDetails.SourcingChannel', 'iutyw');
inputMap.set('Body.ApplicationDetails.DSACode','736');
inputMap.set('Body.ApplicationDetails.ApplicationInfo.PhysicalFormNo', this.AD_PHYSICAL_FORM_NO.getFieldValue());
inputMap.set('Body.ApplicationDetails.ExistingCustomer', 'y');
inputMap.set('Body.ApplicationDetails.ApplicationBranch', 'twe');
await this.services.http.fetchApi('/ApplicationDetails', 'POST', inputMap).toPromise()
.then(
async (httpResponse: HttpResponse<any>) => {
var res = httpResponse.body;
this.services.alert.showAlert(1, 'Success', 5000);
},
async (httpError)=>{
var err = httpError['error']
if(err!=null && err['ErrorElementPath'] != undefined && err['ErrorDescription']!=undefined){
if(err['ErrorElementPath'] == 'ApplicationDetails.ApplicationBranch'){
this.AD_BRANCH.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'ApplicationDetails.ExistingCustomer'){
this.AD_EXISTING_CUSTOMER.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'ApplicationDetails.ApplicationInfo.PhysicalFormNo'){
this.AD_PHYSICAL_FORM_NO.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'ApplicationDetails.DSACode'){
this.AD_DSA_ID.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'ApplicationDetails.SourcingChannel'){
this.AD_SOURCING_CHANNEL.setError(err['ErrorDescription']);
}
}
this.services.alert.showAlert(2, 'Fail', -1);
}
);
}
fieldDependencies = {
}

}
