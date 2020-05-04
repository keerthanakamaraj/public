import { Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import { LoanDetailsFormModel } from './LoanDetailsForm.model';
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
import { LoanHandlerComponent } from '../LoanDetailsForm/loan-handler.component';

const customCss: string = '';

@Component({
selector: 'app-LoanDetailsForm',
templateUrl: './LoanDetailsForm.component.html'
})
export class LoanDetailsFormComponent extends FormComponent implements OnInit, AfterViewInit {
@ViewChild('LD_LOAN_AMT', {static: false}) LD_LOAN_AMT: AmountComponent;
@ViewChild('LD_INTEREST_RATE', {static: false}) LD_INTEREST_RATE: ComboBoxComponent;
@ViewChild('LD_TENURE', {static: false}) LD_TENURE: TextBoxComponent;
@ViewChild('LD_TENURE_PERIOD', {static: false}) LD_TENURE_PERIOD: ComboBoxComponent;
@ViewChild('LD_APP_PRPSE', {static: false}) LD_APP_PRPSE: ComboBoxComponent;
@ViewChild('LD_SYS_RCMD_AMT', {static: false}) LD_SYS_RCMD_AMT: AmountComponent;
@ViewChild('LD_USR_RCMD_AMT', {static: false}) LD_USR_RCMD_AMT: AmountComponent;
@ViewChild('LD_SAVE_SECTION', {static: false}) LD_SAVE_SECTION: ButtonComponent;
@ViewChild('Handler', {static: false}) Handler: LoanHandlerComponent;
@ViewChild('hidAppId', {static: false}) hidAppId: HiddenComponent;
@ViewChild('hidInterestRate', {static: false}) hidInterestRate: HiddenComponent;
@ViewChild('hidPeriod', {static: false}) hidPeriod: HiddenComponent;
@ViewChild('hidAppPurpose', {static: false}) hidAppPurpose: HiddenComponent;
async revalidate(): Promise<number> {
var totalErrors = 0;
super.beforeRevalidate();
await Promise.all([
this.revalidateBasicField('LD_LOAN_AMT'),
this.revalidateBasicField('LD_INTEREST_RATE'),
this.revalidateBasicField('LD_TENURE'),
this.revalidateBasicField('LD_TENURE_PERIOD'),
this.revalidateBasicField('LD_APP_PRPSE'),
this.revalidateBasicField('LD_SYS_RCMD_AMT'),
this.revalidateBasicField('LD_USR_RCMD_AMT'),
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
this.value = new LoanDetailsFormModel();
this.componentCode = 'LoanDetailsForm';
}
setReadOnly(readOnly){
super.setBasicFieldsReadOnly(readOnly);
}
async onFormLoad(){
this.setInputs(this.services.dataStore.getData(this.services.routing.currModal));
this.LD_LOAN_AMT.setFormatOptions({currencyCode: 'INR', languageCode: 'en-US', });
this.LD_INTEREST_RATE.setValue(33.43);
this.LD_TENURE_PERIOD.setValue('5 Years');
this.LD_APP_PRPSE.setValue('Retail Loan');
this.LD_SYS_RCMD_AMT.setFormatOptions({currencyCode: 'INR', languageCode: 'en-US', });
this.LD_USR_RCMD_AMT.setFormatOptions({currencyCode: 'INR', languageCode: 'en-US', });
this.hidAppId.setValue('RLO');
this.hidInterestRate.setValue('INTEREST_RATE');
this.hidPeriod.setValue('PERIOD');
this.hidAppPurpose.setValue('APPLICATION_PURPOSE');
let inputMap = new Map();
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
this.submitData['formName'] = 'Loan Details Main Form';
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
this.value = new LoanDetailsFormModel();
this.value.setValue(inputValue);
this.setDependencies();
this.passNewValue(this.value);
}
ngOnInit(){
if(this.formCode == undefined) {this.formCode = 'LoanDetailsForm';}
if(this.formOnLoadError){return;}
var styleElement = document.createElement('style');
styleElement.type = 'text/css';
styleElement.innerHTML = customCss;
styleElement.id = 'LoanDetailsForm_customCss';
document.getElementsByTagName('head')[0].appendChild(styleElement);
}
ngOnDestroy(){
this.unsubscribe$.next();
this.unsubscribe$.complete();
var styleElement = document.getElementById('LoanDetailsForm_customCss');
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
this.value = new LoanDetailsFormModel();
this.passNewValue(this.value);
this.setReadOnly(false);
this.onFormLoad();
}
async LD_SAVE_SECTION_click(event){
let inputMap = new Map();
inputMap.clear();
inputMap.set('Body.LoanDetails.LoanAmount', this.LD_LOAN_AMT.getFieldValue());
inputMap.set('Body.LoanDetails.InterestRate', this.LD_INTEREST_RATE.getFieldValue());
inputMap.set('Body.LoanDetails.Tenure', this.LD_TENURE.getFieldValue());
inputMap.set('Body.LoanDetails.TenurePeriod', this.LD_TENURE_PERIOD.getFieldValue());
inputMap.set('Body.LoanDetails.ApplicationPurpose', this.LD_APP_PRPSE.getFieldValue());
inputMap.set('Body.LoanDetails.SystemRecommendedAmount', this.LD_SYS_RCMD_AMT.getFieldValue());
inputMap.set('Body.LoanDetails.UserRecommendedAmount', this.LD_USR_RCMD_AMT.getFieldValue());
await this.services.http.fetchApi('/LoanDetails', 'POST', inputMap).toPromise()
.then(
async (httpResponse: HttpResponse<any>) => {
var res = httpResponse.body;
this.services.alert.showAlert(1, 'rlo.success.save.loan', 4000);
},
async (httpError)=>{
var err = httpError['error']
if(err!=null && err['ErrorElementPath'] != undefined && err['ErrorDescription']!=undefined){
if(err['ErrorElementPath'] == 'LoanDetails.UserRecommendedAmount'){
this.LD_USR_RCMD_AMT.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'LoanDetails.SystemRecommendedAmount'){
this.LD_SYS_RCMD_AMT.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'LoanDetails.ApplicationPurpose'){
this.LD_APP_PRPSE.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'LoanDetails.TenurePeriod'){
this.LD_TENURE_PERIOD.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'LoanDetails.Tenure'){
this.LD_TENURE.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'LoanDetails.InterestRate'){
this.LD_INTEREST_RATE.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'LoanDetails.LoanAmount'){
this.LD_LOAN_AMT.setError(err['ErrorDescription']);
}
}
this.services.alert.showAlert(2, 'rlo.error.save.loan', 4000);
}
);
}
fieldDependencies = {
LD_INTEREST_RATE: {
inDep: [

{paramKey: "VALUE1", depFieldID: "LD_INTEREST_RATE", paramType:"PathParam"},
{paramKey: "KEY1", depFieldID: "hidInterestRate", paramType:"QueryParam"},
{paramKey: "APPID", depFieldID: "hidAppId", paramType:"QueryParam"},
],
outDep: [
]},
LD_TENURE_PERIOD: {
inDep: [

{paramKey: "VALUE1", depFieldID: "LD_TENURE_PERIOD", paramType:"PathParam"},
{paramKey: "KEY1", depFieldID: "hidPeriod", paramType:"QueryParam"},
{paramKey: "APPID", depFieldID: "hidAppId", paramType:"QueryParam"},
],
outDep: [
]},
LD_APP_PRPSE: {
inDep: [

{paramKey: "VALUE1", depFieldID: "LD_APP_PRPSE", paramType:"PathParam"},
{paramKey: "KEY1", depFieldID: "hidAppPurpose", paramType:"QueryParam"},
{paramKey: "APPID", depFieldID: "hidAppId", paramType:"QueryParam"},
],
outDep: [
]},
}

}