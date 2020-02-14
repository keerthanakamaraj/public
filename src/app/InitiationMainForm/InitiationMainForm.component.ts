import { Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import { InitiationMainFormModel } from './InitiationMainForm.model';
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

const customCss: string = '.btn {  margin-top: 20px; }';

@Component({
selector: 'app-InitiationMainForm',
templateUrl: './InitiationMainForm.component.html'
})
export class InitiationMainFormComponent extends FormComponent implements OnInit, AfterViewInit {
@ViewChild('SRC_MOBILE_NO', {static: false}) SRC_MOBILE_NO: TextBoxComponent;
@ViewChild('SRC_TAX_ID', {static: false}) SRC_TAX_ID: TextBoxComponent;
@ViewChild('SRC_CIF_NO', {static: false}) SRC_CIF_NO: TextBoxComponent;
@ViewChild('SEARCH_CUST_BTN', {static: false}) SEARCH_CUST_BTN: ButtonComponent;
@ViewChild('BAD_PHYSICAL_FRM_NO', {static: false}) BAD_PHYSICAL_FRM_NO: TextBoxComponent;
@ViewChild('BAD_DATE_OF_RCPT', {static: false}) BAD_DATE_OF_RCPT: TextBoxComponent;
@ViewChild('BAD_EXST_CUST', {static: false}) BAD_EXST_CUST: ComboBoxComponent;
@ViewChild('BAD_SRC_CHANNEL', {static: false}) BAD_SRC_CHANNEL: ComboBoxComponent;
@ViewChild('BAD_DSA_ID', {static: false}) BAD_DSA_ID: ComboBoxComponent;
@ViewChild('BAD_BRANCH', {static: false}) BAD_BRANCH: ComboBoxComponent;
@ViewChild('BAD_PROD_CAT', {static: false}) BAD_PROD_CAT: ComboBoxComponent;
@ViewChild('BAD_PRODUCT', {static: false}) BAD_PRODUCT: ComboBoxComponent;
@ViewChild('BAD_SUB_PROD', {static: false}) BAD_SUB_PROD: ComboBoxComponent;
@ViewChild('BAD_SCHEME', {static: false}) BAD_SCHEME: ComboBoxComponent;
@ViewChild('BAD_PROMOTION', {static: false}) BAD_PROMOTION: ComboBoxComponent;
@ViewChild('CD_TITLE', {static: false}) CD_TITLE: ComboBoxComponent;
@ViewChild('CD_FIRST_NAME', {static: false}) CD_FIRST_NAME: TextBoxComponent;
@ViewChild('CD_MIDDLE_NAME', {static: false}) CD_MIDDLE_NAME: TextBoxComponent;
@ViewChild('CD_LAST_NAME', {static: false}) CD_LAST_NAME: TextBoxComponent;
@ViewChild('CD_FULL_NAME', {static: false}) CD_FULL_NAME: TextBoxComponent;
@ViewChild('CD_GENDER', {static: false}) CD_GENDER: ComboBoxComponent;
@ViewChild('CD_DOB', {static: false}) CD_DOB: DateComponent;
@ViewChild('CD_TAX_ID', {static: false}) CD_TAX_ID: TextBoxComponent;
@ViewChild('CD_MOBILE', {static: false}) CD_MOBILE: TextBoxComponent;
@ViewChild('CD_DEBIT_SCORE', {static: false}) CD_DEBIT_SCORE: TextBoxComponent;
@ViewChild('CD_CUST_SGMT', {static: false}) CD_CUST_SGMT: ComboBoxComponent;
@ViewChild('CD_STAFF', {static: false}) CD_STAFF: ComboBoxComponent;
@ViewChild('CD_STAFF_ID', {static: false}) CD_STAFF_ID: TextBoxComponent;
@ViewChild('LD_LOAN_AMOUNT', {static: false}) LD_LOAN_AMOUNT: AmountComponent;
@ViewChild('LD_INTEREST_RATE', {static: false}) LD_INTEREST_RATE: ComboBoxComponent;
@ViewChild('LD_TENURE', {static: false}) LD_TENURE: TextBoxComponent;
@ViewChild('LD_TENURE_PERIOD', {static: false}) LD_TENURE_PERIOD: ComboBoxComponent;
@ViewChild('LD_APP_PRPSE', {static: false}) LD_APP_PRPSE: ComboBoxComponent;
@ViewChild('LD_GROSS_INCOME', {static: false}) LD_GROSS_INCOME: AmountComponent;
@ViewChild('LD_EXST_LBLT_AMT', {static: false}) LD_EXST_LBLT_AMT: AmountComponent;
@ViewChild('LD_OTH_DEDUCTIONS', {static: false}) LD_OTH_DEDUCTIONS: TextBoxComponent;
@ViewChild('LD_NET_INCOME', {static: false}) LD_NET_INCOME: AmountComponent;
@ViewChild('LD_CHK_ELGBTY_BTN', {static: false}) LD_CHK_ELGBTY_BTN: ButtonComponent;
@ViewChild('LD_SYS_AMT_RCMD', {static: false}) LD_SYS_AMT_RCMD: AmountComponent;
@ViewChild('LD_USR_RCMD_AMT', {static: false}) LD_USR_RCMD_AMT: AmountComponent;
@ViewChild('LD_LTV_DBR', {static: false}) LD_LTV_DBR: TextBoxComponent;
@ViewChild('LD_EMI_AMT', {static: false}) LD_EMI_AMT: AmountComponent;
@ViewChild('RD_REFERRER_NAME', {static: false}) RD_REFERRER_NAME: TextBoxComponent;
@ViewChild('RD_REFERRER_NO', {static: false}) RD_REFERRER_NO: TextBoxComponent;
@ViewChild('SUBMIT_MAIN_BTN', {static: false}) SUBMIT_MAIN_BTN: ButtonComponent;
@ViewChild('CANCEL_MAIN_BTN', {static: false}) CANCEL_MAIN_BTN: ButtonComponent;
async revalidate(): Promise<number> {
var totalErrors = 0;
super.beforeRevalidate();
await Promise.all([
this.revalidateBasicField('SRC_MOBILE_NO'),
this.revalidateBasicField('SRC_TAX_ID'),
this.revalidateBasicField('SRC_CIF_NO'),
this.revalidateBasicField('BAD_PHYSICAL_FRM_NO'),
this.revalidateBasicField('BAD_DATE_OF_RCPT'),
this.revalidateBasicField('BAD_EXST_CUST'),
this.revalidateBasicField('BAD_SRC_CHANNEL'),
this.revalidateBasicField('BAD_DSA_ID'),
this.revalidateBasicField('BAD_BRANCH'),
this.revalidateBasicField('BAD_PROD_CAT'),
this.revalidateBasicField('BAD_PRODUCT'),
this.revalidateBasicField('BAD_SUB_PROD'),
this.revalidateBasicField('BAD_SCHEME'),
this.revalidateBasicField('BAD_PROMOTION'),
this.revalidateBasicField('CD_TITLE'),
this.revalidateBasicField('CD_FIRST_NAME'),
this.revalidateBasicField('CD_MIDDLE_NAME'),
this.revalidateBasicField('CD_LAST_NAME'),
this.revalidateBasicField('CD_FULL_NAME'),
this.revalidateBasicField('CD_GENDER'),
this.revalidateBasicField('CD_DOB'),
this.revalidateBasicField('CD_TAX_ID'),
this.revalidateBasicField('CD_MOBILE'),
this.revalidateBasicField('CD_DEBIT_SCORE'),
this.revalidateBasicField('CD_CUST_SGMT'),
this.revalidateBasicField('CD_STAFF'),
this.revalidateBasicField('CD_STAFF_ID'),
this.revalidateBasicField('LD_LOAN_AMOUNT'),
this.revalidateBasicField('LD_INTEREST_RATE'),
this.revalidateBasicField('LD_TENURE'),
this.revalidateBasicField('LD_TENURE_PERIOD'),
this.revalidateBasicField('LD_APP_PRPSE'),
this.revalidateBasicField('LD_GROSS_INCOME'),
this.revalidateBasicField('LD_EXST_LBLT_AMT'),
this.revalidateBasicField('LD_OTH_DEDUCTIONS'),
this.revalidateBasicField('LD_NET_INCOME'),
this.revalidateBasicField('LD_SYS_AMT_RCMD'),
this.revalidateBasicField('LD_USR_RCMD_AMT'),
this.revalidateBasicField('LD_LTV_DBR'),
this.revalidateBasicField('LD_EMI_AMT'),
this.revalidateBasicField('RD_REFERRER_NAME'),
this.revalidateBasicField('RD_REFERRER_NO'),
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
this.value = new InitiationMainFormModel();
this.componentCode = 'InitiationMainForm';
}
setReadOnly(readOnly){
super.setBasicFieldsReadOnly(readOnly);
}
async onFormLoad(){
this.setInputs(this.services.dataStore.getData(this.services.routing.currModal));
this.BAD_EXST_CUST.setReadOnly(true);
this.CD_FULL_NAME.setReadOnly(true);
this.LD_LOAN_AMOUNT.setFormatOptions({currencyCode: 'INR', languageCode: 'en-US', });
this.LD_GROSS_INCOME.setFormatOptions({currencyCode: 'INR', languageCode: 'en-US', });
this.LD_EXST_LBLT_AMT.setFormatOptions({currencyCode: 'INR', languageCode: 'en-US', });
this.LD_NET_INCOME.setFormatOptions({currencyCode: 'INR', languageCode: 'en-US', });
this.LD_NET_INCOME.setReadOnly(true);
this.LD_SYS_AMT_RCMD.setFormatOptions({currencyCode: 'INR', languageCode: 'en-US', });
this.LD_SYS_AMT_RCMD.setReadOnly(true);
this.LD_USR_RCMD_AMT.setFormatOptions({currencyCode: 'INR', languageCode: 'en-US', });
this.LD_LTV_DBR.setReadOnly(true);
this.LD_EMI_AMT.setFormatOptions({currencyCode: 'INR', languageCode: 'en-US', });
this.LD_EMI_AMT.setReadOnly(true);
this.setDependencies();
}
setInputs(param : any){
let params = this.services.http.mapToJson(param);
if(params['mode']){
this.mode = params['mode'];
}
}
async submitForm(path, apiCode, serviceCode){
this.submitData['formName'] = 'Initiation main form';
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
this.value = new InitiationMainFormModel();
this.value.setValue(inputValue);
this.setDependencies();
this.passNewValue(this.value);
}
ngOnInit(){
if(this.formCode == undefined) {this.formCode = 'InitiationMainForm';}
if(this.formOnLoadError){return;}
var styleElement = document.createElement('style');
styleElement.type = 'text/css';
styleElement.innerHTML = customCss;
styleElement.id = 'InitiationMainForm_customCss';
document.getElementsByTagName('head')[0].appendChild(styleElement);
}
ngOnDestroy(){
this.unsubscribe$.next();
this.unsubscribe$.complete();
var styleElement = document.getElementById('InitiationMainForm_customCss');
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
this.value = new InitiationMainFormModel();
this.passNewValue(this.value);
this.setReadOnly(false);
this.onFormLoad();
}
async SEARCH_CUST_BTN_click(event){
let inputMap = new Map();
inputMap.clear();
inputMap.set('MobileNo', this.SRC_MOBILE_NO.getFieldValue());
inputMap.set('TaxId', this.SRC_TAX_ID.getFieldValue());
inputMap.set('CifNo', this.SRC_CIF_NO.getFieldValue());
inputMap.set('component','SearchForm');
const modalRef = this.services.modal.open(PopupModalComponent, { windowClass: 'modal-width-lg' });
var onModalClose = async (reason)=>{
(reason==0 || reason==1)?await this.services.routing.removeOutlet():undefined;
if(this.services.dataStore.getData('selectedData')){
let tempVar:any = this.services.dataStore.getData('selectedData');
this.SRC_MOBILE_NO.setValue(tempVar['mobileNum']);
}
this.services.dataStore.setData('selectedData', undefined);
}
modalRef.result.then(onModalClose, onModalClose);
modalRef.componentInstance.rotueToComponent(inputMap);
this.services.dataStore.setModalReference(this.services.routing.currModal, modalRef);
}
async LD_LOAN_AMOUNT_focus(event){
let inputMap = new Map();
inputMap.clear();
await this.services.http.fetchApi('/LoanDetails', 'GET', inputMap).toPromise()
.then(
async (httpResponse: HttpResponse<any>) => {
var res = httpResponse.body;
var loopDataVar4 = [];
var loopVar4 = res['LoanDetails'];
if (loopVar4) {
for (var i = 0; i < loopVar4.length; i++) {
var tempObj = {};
tempObj['LD_APP_PRPSE'] = loopVar4[i].ApplicationPurpose;
loopDataVar4.push(tempObj);}
}
//this.InitiationMainForm.setValue(loopDataVar4);
},
async (httpError)=>{
var err = httpError['error']
if(err!=null && err['ErrorElementPath'] != undefined && err['ErrorDescription']!=undefined){
}
}
);
}
async SUBMIT_MAIN_BTN_click(event){
let inputMap = new Map();
inputMap.clear();
inputMap.set('Body.ApplicationDetails.SourcingChannel', this.BAD_SRC_CHANNEL.getFieldValue());
inputMap.set('Body.ApplicationDetails.DSACode', this.BAD_DSA_ID.getFieldValue());
inputMap.set('Body.BorrowerDetails.Title', this.CD_TITLE.getFieldValue());
inputMap.set('Body.BorrowerDetails.FirstName', this.CD_FIRST_NAME.getFieldValue());
inputMap.set('Body.BorrowerDetails.MiddleName', this.CD_MIDDLE_NAME.getFieldValue());
inputMap.set('Body.BorrowerDetails.LastName', this.CD_LAST_NAME.getFieldValue());
inputMap.set('Body.BorrowerDetails.FullName', this.CD_FULL_NAME.getFieldValue());
inputMap.set('Body.BorrowerDetails.Gender', this.CD_GENDER.getFieldValue());
inputMap.set('Body.BorrowerDetails.DOB', this.CD_DOB.getFieldValue());
inputMap.set('Body.BorrowerDetails.TaxID', this.CD_TAX_ID.getFieldValue());
inputMap.set('Body.BorrowerDetails.MobileNo', this.CD_MOBILE.getFieldValue());
inputMap.set('Body.BorrowerDetails.DebitScore', this.CD_DEBIT_SCORE.getFieldValue());
inputMap.set('Body.BorrowerDetails.CustomerSegment', this.CD_CUST_SGMT.getFieldValue());
inputMap.set('Body.BorrowerDetails.IsStaff', this.CD_STAFF.getFieldValue());
inputMap.set('Body.BorrowerDetails.StaffID', this.CD_STAFF_ID.getFieldValue());
inputMap.set('Body.LoanDetails.LoanAmount', this.LD_LOAN_AMOUNT.getFieldValue());
inputMap.set('Body.LoanDetails.InterestRate', this.LD_INTEREST_RATE.getFieldValue());
inputMap.set('Body.LoanDetails.ApplicationPurpose', this.LD_APP_PRPSE.getFieldValue());
inputMap.set('Body.LoanDetails.Tenure', this.LD_TENURE.getFieldValue());
inputMap.set('Body.LoanDetails.TenurePeriod', this.LD_TENURE_PERIOD.getFieldValue());
inputMap.set('Body.LoanDetails.SystemRecommendedAmount', this.LD_SYS_AMT_RCMD.getFieldValue());
inputMap.set('Body.LoanDetails.UserRecommendedAmount', this.LD_USR_RCMD_AMT.getFieldValue());
inputMap.set('Body.LoanDetails.EMIAmount', this.LD_EMI_AMT.getFieldValue());
this.services.http.fetchApi('/proposal/initiate', 'POST', inputMap).subscribe(
async (httpResponse: HttpResponse<any>) => {
var res = httpResponse.body;
this.services.alert.showAlert(1, 'Form Saved Successfully!', 5000);
},
async (httpError)=>{
var err = httpError['error']
if(err!=null && err['ErrorElementPath'] != undefined && err['ErrorDescription']!=undefined){
if(err['ErrorElementPath'] == 'LoanDetails.EMIAmount'){
this.LD_EMI_AMT.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'LoanDetails.UserRecommendedAmount'){
this.LD_USR_RCMD_AMT.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'LoanDetails.SystemRecommendedAmount'){
this.LD_SYS_AMT_RCMD.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'LoanDetails.TenurePeriod'){
this.LD_TENURE_PERIOD.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'LoanDetails.Tenure'){
this.LD_TENURE.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'LoanDetails.ApplicationPurpose'){
this.LD_APP_PRPSE.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'LoanDetails.InterestRate'){
this.LD_INTEREST_RATE.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'LoanDetails.LoanAmount'){
this.LD_LOAN_AMOUNT.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'BorrowerDetails.StaffID'){
this.CD_STAFF_ID.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'BorrowerDetails.IsStaff'){
this.CD_STAFF.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'BorrowerDetails.CustomerSegment'){
this.CD_CUST_SGMT.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'BorrowerDetails.DebitScore'){
this.CD_DEBIT_SCORE.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'BorrowerDetails.MobileNo'){
this.CD_MOBILE.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'BorrowerDetails.TaxID'){
this.CD_TAX_ID.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'BorrowerDetails.DOB'){
this.CD_DOB.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'BorrowerDetails.Gender'){
this.CD_GENDER.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'BorrowerDetails.FullName'){
this.CD_FULL_NAME.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'BorrowerDetails.LastName'){
this.CD_LAST_NAME.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'BorrowerDetails.MiddleName'){
this.CD_MIDDLE_NAME.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'BorrowerDetails.FirstName'){
this.CD_FIRST_NAME.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'BorrowerDetails.Title'){
this.CD_TITLE.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'ApplicationDetails.DSACode'){
this.BAD_DSA_ID.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'ApplicationDetails.SourcingChannel'){
this.BAD_SRC_CHANNEL.setError(err['ErrorDescription']);
}
}
this.services.alert.showAlert(3, 'Unable to save form!', 5000);
}
);
}
fieldDependencies = {
BAD_PRODUCT: {
inDep: [

{paramKey: "ProductCd", depFieldID: "BAD_PRODUCT", paramType:"PathParam"},
],
outDep: [
]},
}

}
