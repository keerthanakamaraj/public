import { Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import { LiabilityDtlsFormModel } from './LiabilityDtlsForm.model';
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
import { LiabilityDtlsGridComponent } from '../LiabilityDtlsGrid/LiabilityDtlsGrid.component';
import { LiabilityHandlerComponent } from '../LiabilityDtlsForm/liability-handler.component';

const customCss: string = '';

@Component({
selector: 'app-LiabilityDtlsForm',
templateUrl: './LiabilityDtlsForm.component.html'
})
export class LiabilityDtlsFormComponent extends FormComponent implements OnInit, AfterViewInit {
@ViewChild('LD_FINANCIER_NAME', {static: false}) LD_FINANCIER_NAME: TextBoxComponent;
@ViewChild('LD_LOAN_STATUS', {static: false}) LD_LOAN_STATUS: ComboBoxComponent;
@ViewChild('LD_TYPE_OF_LOAN', {static: false}) LD_TYPE_OF_LOAN: ComboBoxComponent;
@ViewChild('LD_LOAN_AMOUNT', {static: false}) LD_LOAN_AMOUNT: TextBoxComponent;
@ViewChild('LD_LOAN_CLOSURE_DATE', {static: false}) LD_LOAN_CLOSURE_DATE: DateComponent;
@ViewChild('LD_LOAN_EMI', {static: false}) LD_LOAN_EMI: TextBoxComponent;
@ViewChild('LD_INCLUDE_IN_DBR', {static: false}) LD_INCLUDE_IN_DBR: ComboBoxComponent;
@ViewChild('LD_OS_AMOUNT', {static: false}) LD_OS_AMOUNT: AmountComponent;
@ViewChild('LD_CURRENCY', {static: false}) LD_CURRENCY: TextBoxComponent;
@ViewChild('LD_EQUIVALENT_AMOUNT', {static: false}) LD_EQUIVALENT_AMOUNT: AmountComponent;
@ViewChild('LD_LOAN_EMI_FREQUENCY', {static: false}) LD_LOAN_EMI_FREQUENCY: ComboBoxComponent;
@ViewChild('LD_SAVE', {static: false}) LD_SAVE: ButtonComponent;
@ViewChild('LIABILITY_GRID', {static: false}) LIABILITY_GRID: LiabilityDtlsGridComponent;
@ViewChild('Handler', {static: false}) Handler: LiabilityHandlerComponent;
@ViewChild('hideEmiFrequency', {static: false}) hideEmiFrequency: HiddenComponent;
@ViewChild('hideTypeOfLoan', {static: false}) hideTypeOfLoan: HiddenComponent;
@ViewChild('hiddenLiabilitySeq', {static: false}) hiddenLiabilitySeq: HiddenComponent;
@ViewChild('hidAppId', {static: false}) hidAppId: HiddenComponent;
@ViewChild('hidLoanStatus', {static: false}) hidLoanStatus: HiddenComponent;
@ViewChild('hideInculdeInDBR', {static: false}) hideInculdeInDBR: HiddenComponent;
async revalidate(): Promise<number> {
var totalErrors = 0;
super.beforeRevalidate();
await Promise.all([
this.revalidateBasicField('LD_FINANCIER_NAME'),
this.revalidateBasicField('LD_LOAN_STATUS'),
this.revalidateBasicField('LD_TYPE_OF_LOAN'),
this.revalidateBasicField('LD_LOAN_AMOUNT'),
this.revalidateBasicField('LD_LOAN_CLOSURE_DATE'),
this.revalidateBasicField('LD_LOAN_EMI'),
this.revalidateBasicField('LD_INCLUDE_IN_DBR'),
this.revalidateBasicField('LD_OS_AMOUNT'),
this.revalidateBasicField('LD_CURRENCY'),
this.revalidateBasicField('LD_EQUIVALENT_AMOUNT'),
this.revalidateBasicField('LD_LOAN_EMI_FREQUENCY'),
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
this.value = new LiabilityDtlsFormModel();
this.componentCode = 'LiabilityDtlsForm';
}
setReadOnly(readOnly){
super.setBasicFieldsReadOnly(readOnly);
}
async onFormLoad(){
this.setInputs(this.services.dataStore.getData(this.services.routing.currModal));
this.LD_OS_AMOUNT.setFormatOptions({currencyCode: 'INR', languageCode: 'en-US', });
this.LD_EQUIVALENT_AMOUNT.setFormatOptions({currencyCode: 'INR', languageCode: 'en-US', });
this.hideEmiFrequency.setValue('LOAN_EMI_FREQUENCY');
this.hideTypeOfLoan.setValue('PRODUCT_CATEGORY');
this.hidAppId.setValue('RLO');
this.hidLoanStatus.setValue('LOAN_STATUS');
this.hideInculdeInDBR.setValue('Y/N');
this.setDependencies();
await this.Handler.onFormLoad({});
}
setInputs(param : any){
let params = this.services.http.mapToJson(param);
if(params['mode']){
this.mode = params['mode'];
}
}
async submitForm(path, apiCode, serviceCode){
this.submitData['formName'] = 'Liability Details Form';
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
this.value = new LiabilityDtlsFormModel();
this.value.setValue(inputValue);
this.setDependencies();
this.passNewValue(this.value);
}
ngOnInit(){
if(this.formCode == undefined) {this.formCode = 'LiabilityDtlsForm';}
if(this.formOnLoadError){return;}
var styleElement = document.createElement('style');
styleElement.type = 'text/css';
styleElement.innerHTML = customCss;
styleElement.id = 'LiabilityDtlsForm_customCss';
document.getElementsByTagName('head')[0].appendChild(styleElement);
}
ngOnDestroy(){
this.unsubscribe$.next();
this.unsubscribe$.complete();
var styleElement = document.getElementById('LiabilityDtlsForm_customCss');
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
this.value = new LiabilityDtlsFormModel();
this.passNewValue(this.value);
this.setReadOnly(false);
this.onFormLoad();
}
async LD_SAVE_click(event){
let inputMap = new Map();
if(this.hiddenLiabilitySeq.getFieldValue() != undefined || this.hiddenLiabilitySeq.getFieldValue() != ''){
inputMap.clear();
inputMap.set('PathParam.LiabilitySeq', this.hiddenLiabilitySeq.getFieldValue());
inputMap.set('Body.LiabilityDetails.FinancerName', this.LD_FINANCIER_NAME.getFieldValue());
inputMap.set('Body.LiabilityDetails.LoanStatus', this.LD_LOAN_STATUS.getFieldValue());
inputMap.set('Body.LiabilityDetails.TypeofLoan', this.LD_TYPE_OF_LOAN.getFieldValue());
inputMap.set('Body.LiabilityDetails.LoanAmount', this.LD_LOAN_AMOUNT.getFieldValue());
inputMap.set('Body.LiabilityDetails.LoanClosureDate', this.LD_LOAN_CLOSURE_DATE.getFieldValue());
inputMap.set('Body.LiabilityDetails.LoanEMI', this.LD_LOAN_EMI.getFieldValue());
inputMap.set('Body.LiabilityDetails.IncludeInDBR', this.LD_INCLUDE_IN_DBR.getFieldValue());
inputMap.set('Body.LiabilityDetails.OutstandingAmount', this.LD_OS_AMOUNT.getFieldValue());
inputMap.set('Body.LiabilityDetails.Currency', this.LD_CURRENCY.getFieldValue());
inputMap.set('Body.LiabilityDetails.EquivalentAmt', this.LD_EQUIVALENT_AMOUNT.getFieldValue());
inputMap.set('Body.LiabilityDetails.LoanEmiFrequency', this.LD_LOAN_EMI_FREQUENCY.getFieldValue());
this.services.http.fetchApi('/LiabilityDetails/{LiabilitySeq}', 'PUT', inputMap).subscribe(
async (httpResponse: HttpResponse<any>) => {
var res = httpResponse.body;
this.services.alert.showAlert(1, 'Form Successfully Updated', 5000);
this.onReset();
},
async (httpError)=>{
var err = httpError['error']
if(err!=null && err['ErrorElementPath'] != undefined && err['ErrorDescription']!=undefined){
if(err['ErrorElementPath'] == 'LiabilityDetails.LoanEmiFrequency'){
this.LD_LOAN_EMI_FREQUENCY.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'LiabilityDetails.EquivalentAmt'){
this.LD_EQUIVALENT_AMOUNT.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'LiabilityDetails.Currency'){
this.LD_CURRENCY.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'LiabilityDetails.OutstandingAmount'){
this.LD_OS_AMOUNT.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'LiabilityDetails.IncludeInDBR'){
this.LD_INCLUDE_IN_DBR.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'LiabilityDetails.LoanEMI'){
this.LD_LOAN_EMI.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'LiabilityDetails.LoanClosureDate'){
this.LD_LOAN_CLOSURE_DATE.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'LiabilityDetails.LoanAmount'){
this.LD_LOAN_AMOUNT.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'LiabilityDetails.TypeofLoan'){
this.LD_TYPE_OF_LOAN.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'LiabilityDetails.LoanStatus'){
this.LD_LOAN_STATUS.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'LiabilityDetails.FinancerName'){
this.LD_FINANCIER_NAME.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'LiabilitySeq'){
this.hiddenLiabilitySeq.setError(err['ErrorDescription']);
}
}
this.services.alert.showAlert(2, 'Update Failed', -1);
}
);
}
else{
inputMap.clear();
inputMap.set('Body.LiabilityDetails.FinancerName', this.LD_FINANCIER_NAME.getFieldValue());
inputMap.set('Body.LiabilityDetails.LoanStatus', this.LD_LOAN_STATUS.getFieldValue());
inputMap.set('Body.LiabilityDetails.TypeofLoan', this.LD_TYPE_OF_LOAN.getFieldValue());
inputMap.set('Body.LiabilityDetails.LoanAmount', this.LD_LOAN_AMOUNT.getFieldValue());
inputMap.set('Body.LiabilityDetails.LoanClosureDate', this.LD_LOAN_CLOSURE_DATE.getFieldValue());
inputMap.set('Body.LiabilityDetails.LoanEMI', this.LD_LOAN_EMI.getFieldValue());
inputMap.set('Body.LiabilityDetails.IncludeInDBR', this.LD_INCLUDE_IN_DBR.getFieldValue());
inputMap.set('Body.LiabilityDetails.OutstandingAmount', this.LD_OS_AMOUNT.getFieldValue());
inputMap.set('Body.LiabilityDetails.Currency', this.LD_CURRENCY.getFieldValue());
inputMap.set('Body.LiabilityDetails.EquivalentAmt', this.LD_EQUIVALENT_AMOUNT.getFieldValue());
inputMap.set('Body.LiabilityDetails.LoanEmiFrequency', this.LD_LOAN_EMI_FREQUENCY.getFieldValue());
this.services.http.fetchApi('/LiabilityDetails', 'POST', inputMap).subscribe(
async (httpResponse: HttpResponse<any>) => {
var res = httpResponse.body;
this.services.alert.showAlert(1, "Liability Details Saved Successfully", 5000);
this.onReset();
},
async (httpError)=>{
var err = httpError['error']
if(err!=null && err['ErrorElementPath'] != undefined && err['ErrorDescription']!=undefined){
if(err['ErrorElementPath'] == 'LiabilityDetails.LoanEmiFrequency'){
this.LD_LOAN_EMI_FREQUENCY.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'LiabilityDetails.EquivalentAmt'){
this.LD_EQUIVALENT_AMOUNT.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'LiabilityDetails.Currency'){
this.LD_CURRENCY.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'LiabilityDetails.OutstandingAmount'){
this.LD_OS_AMOUNT.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'LiabilityDetails.IncludeInDBR'){
this.LD_INCLUDE_IN_DBR.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'LiabilityDetails.LoanEMI'){
this.LD_LOAN_EMI.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'LiabilityDetails.LoanClosureDate'){
this.LD_LOAN_CLOSURE_DATE.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'LiabilityDetails.LoanAmount'){
this.LD_LOAN_AMOUNT.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'LiabilityDetails.TypeofLoan'){
this.LD_TYPE_OF_LOAN.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'LiabilityDetails.LoanStatus'){
this.LD_LOAN_STATUS.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'LiabilityDetails.FinancerName'){
this.LD_FINANCIER_NAME.setError(err['ErrorDescription']);
}
}
this.services.alert.showAlert(2, "Failed to save liability details", -1);
}
);
}
}
async LIABILITY_GRID_onModify(event){
let inputMap = new Map();
this.showSpinner();
inputMap.clear();
inputMap.set('PathParam.LiabilitySeq', event.SeqKey);
this.services.http.fetchApi('/LiabilityDetails/{LiabilitySeq}', 'GET', inputMap).subscribe(
async (httpResponse: HttpResponse<any>) => {
var res = httpResponse.body;
this.LD_FINANCIER_NAME.setValue(res['LiabilityDetails']['FinancerName']);
this.LD_LOAN_STATUS.setValue(res['LiabilityDetails']['LoanStatus']);
this.LD_TYPE_OF_LOAN.setValue(res['LiabilityDetails']['TypeofLoan']);
this.LD_LOAN_AMOUNT.setValue(res['LiabilityDetails']['LoanAmount']);
this.LD_LOAN_CLOSURE_DATE.setValue(res['LiabilityDetails']['LoanClosureDate']);
this.LD_LOAN_EMI.setValue(res['LiabilityDetails']['LoanEMI']);
this.LD_INCLUDE_IN_DBR.setValue(res['LiabilityDetails']['IncludeInDBR']);
this.LD_OS_AMOUNT.setValue(res['LiabilityDetails']['OutstandingAmount']);
this.LD_CURRENCY.setValue(res['LiabilityDetails']['Currency']);
this.LD_EQUIVALENT_AMOUNT.setValue(res['LiabilityDetails']['EquivalentAmt']);
this.LD_LOAN_EMI_FREQUENCY.setValue(res['LiabilityDetails']['LoanEmiFrequency']);
this.hiddenLiabilitySeq.setValue(res['LiabilityDetails']['LiabilitySeq']);
this.hideSpinner();
},
async (httpError)=>{
var err = httpError['error']
if(err!=null && err['ErrorElementPath'] != undefined && err['ErrorDescription']!=undefined){
}
this.services.alert.showAlert(2, 'Fail to load', -1);
this.hideSpinner();
}
);
}
fieldDependencies = {
LD_LOAN_STATUS: {
inDep: [

{paramKey: "VALUE1", depFieldID: "LD_LOAN_STATUS", paramType:"PathParam"},
{paramKey: "APPID", depFieldID: "hidAppId", paramType:"QueryParam"},
{paramKey: "KEY1", depFieldID: "hidLoanStatus", paramType:"QueryParam"},
],
outDep: [
]},
LD_TYPE_OF_LOAN: {
inDep: [

{paramKey: "VALUE1", depFieldID: "LD_TYPE_OF_LOAN", paramType:"PathParam"},
{paramKey: "APPID", depFieldID: "hidAppId", paramType:"QueryParam"},
{paramKey: "KEY1", depFieldID: "hideTypeOfLoan", paramType:"QueryParam"},
],
outDep: [
]},
LD_INCLUDE_IN_DBR: {
inDep: [

{paramKey: "VALUE1", depFieldID: "LD_INCLUDE_IN_DBR", paramType:"PathParam"},
{paramKey: "APPID", depFieldID: "hidAppId", paramType:"QueryParam"},
{paramKey: "KEY1", depFieldID: "hideInculdeInDBR", paramType:"QueryParam"},
],
outDep: [
]},
LD_LOAN_EMI_FREQUENCY: {
inDep: [

{paramKey: "VALUE1", depFieldID: "LD_LOAN_EMI_FREQUENCY", paramType:"PathParam"},
{paramKey: "APPID", depFieldID: "hidAppId", paramType:"QueryParam"},
{paramKey: "KEY1", depFieldID: "hideEmiFrequency", paramType:"QueryParam"},
],
outDep: [
]},
}

}