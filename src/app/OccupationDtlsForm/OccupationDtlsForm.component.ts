import { Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import { OccupationDtlsFormModel } from './OccupationDtlsForm.model';
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
selector: 'app-OccupationDtlsForm',
templateUrl: './OccupationDtlsForm.component.html'
})
export class OccupationDtlsFormComponent extends FormComponent implements OnInit, AfterViewInit {
@ViewChild('OD_OCCUPATION', {static: false}) OD_OCCUPATION: ComboBoxComponent;
@ViewChild('OD_EMPLT_TYPE', {static: false}) OD_EMPLT_TYPE: ComboBoxComponent;
@ViewChild('OD_SELF_EMPLD_TYPE', {static: false}) OD_SELF_EMPLD_TYPE: ComboBoxComponent;
@ViewChild('OD_SELF_EMPLD_PROF', {static: false}) OD_SELF_EMPLD_PROF: ComboBoxComponent;
@ViewChild('OD_EMPLOYEE_ID', {static: false}) OD_EMPLOYEE_ID: TextBoxComponent;
@ViewChild('OD_DEPARTMENT', {static: false}) OD_DEPARTMENT: TextBoxComponent;
@ViewChild('OD_DESIGNATION', {static: false}) OD_DESIGNATION: ComboBoxComponent;
@ViewChild('OD_DATE_OF_JOINING', {static: false}) OD_DATE_OF_JOINING: DateComponent;
@ViewChild('OD_DT_OF_INCPTN', {static: false}) OD_DT_OF_INCPTN: DateComponent;
@ViewChild('OD_INDUSTRY', {static: false}) OD_INDUSTRY: ComboBoxComponent;
@ViewChild('OD_NTR_OF_BUSS', {static: false}) OD_NTR_OF_BUSS: ComboBoxComponent;
@ViewChild('OD_COMPANY_CODE', {static: false}) OD_COMPANY_CODE: TextBoxComponent;
@ViewChild('OD_COMP_CAT', {static: false}) OD_COMP_CAT: TextBoxComponent;
@ViewChild('OD_COMP_NAME', {static: false}) OD_COMP_NAME: TextBoxComponent;
@ViewChild('OD_LENGTH_OF_EXST', {static: false}) OD_LENGTH_OF_EXST: TextBoxComponent;
@ViewChild('OD_INC_DOC_TYPE', {static: false}) OD_INC_DOC_TYPE: ComboBoxComponent;
@ViewChild('OD_NET_INCOME', {static: false}) OD_NET_INCOME: TextBoxComponent;
@ViewChild('OD_INCOME_FREQ', {static: false}) OD_INCOME_FREQ: ComboBoxComponent;
@ViewChild('OD_EMP_STATUS', {static: false}) OD_EMP_STATUS: ComboBoxComponent;
@ViewChild('OD_INCOME_TYPE', {static: false}) OD_INCOME_TYPE: ComboBoxComponent;
@ViewChild('OD_WRK_PERMIT_NO', {static: false}) OD_WRK_PERMIT_NO: TextBoxComponent;
@ViewChild('OD_RES_PRT_NO', {static: false}) OD_RES_PRT_NO: TextBoxComponent;
@ViewChild('OD_CURRENCY', {static: false}) OD_CURRENCY: ComboBoxComponent;
@ViewChild('OD_LOC_CURR_EQ', {static: false}) OD_LOC_CURR_EQ: TextBoxComponent;
@ViewChild('OD_SAVE_BTN', {static: false}) OD_SAVE_BTN: ButtonComponent;
async revalidate(): Promise<number> {
var totalErrors = 0;
super.beforeRevalidate();
await Promise.all([
this.revalidateBasicField('OD_OCCUPATION'),
this.revalidateBasicField('OD_EMPLT_TYPE'),
this.revalidateBasicField('OD_SELF_EMPLD_TYPE'),
this.revalidateBasicField('OD_SELF_EMPLD_PROF'),
this.revalidateBasicField('OD_EMPLOYEE_ID'),
this.revalidateBasicField('OD_DEPARTMENT'),
this.revalidateBasicField('OD_DESIGNATION'),
this.revalidateBasicField('OD_DATE_OF_JOINING'),
this.revalidateBasicField('OD_DT_OF_INCPTN'),
this.revalidateBasicField('OD_INDUSTRY'),
this.revalidateBasicField('OD_NTR_OF_BUSS'),
this.revalidateBasicField('OD_COMPANY_CODE'),
this.revalidateBasicField('OD_COMP_CAT'),
this.revalidateBasicField('OD_COMP_NAME'),
this.revalidateBasicField('OD_LENGTH_OF_EXST'),
this.revalidateBasicField('OD_INC_DOC_TYPE'),
this.revalidateBasicField('OD_NET_INCOME'),
this.revalidateBasicField('OD_INCOME_FREQ'),
this.revalidateBasicField('OD_EMP_STATUS'),
this.revalidateBasicField('OD_INCOME_TYPE'),
this.revalidateBasicField('OD_WRK_PERMIT_NO'),
this.revalidateBasicField('OD_RES_PRT_NO'),
this.revalidateBasicField('OD_CURRENCY'),
this.revalidateBasicField('OD_LOC_CURR_EQ'),
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
this.value = new OccupationDtlsFormModel();
this.componentCode = 'OccupationDtlsForm';
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
this.submitData['formName'] = 'Main form for occupation details';
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
this.value = new OccupationDtlsFormModel();
this.value.setValue(inputValue);
this.setDependencies();
this.passNewValue(this.value);
}
ngOnInit(){
if(this.formCode == undefined) {this.formCode = 'OccupationDtlsForm';}
if(this.formOnLoadError){return;}
var styleElement = document.createElement('style');
styleElement.type = 'text/css';
styleElement.innerHTML = customCss;
styleElement.id = 'OccupationDtlsForm_customCss';
document.getElementsByTagName('head')[0].appendChild(styleElement);
}
ngOnDestroy(){
this.unsubscribe$.next();
this.unsubscribe$.complete();
var styleElement = document.getElementById('OccupationDtlsForm_customCss');
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
this.value = new OccupationDtlsFormModel();
this.passNewValue(this.value);
this.setReadOnly(false);
this.onFormLoad();
}
async OD_SAVE_BTN_click(event){
let inputMap = new Map();
inputMap.clear();
inputMap.set('Body.OccupationDetails.Occupation', this.OD_OCCUPATION.getFieldValue());
inputMap.set('Body.OccupationDetails.EmploymentType', this.OD_EMPLT_TYPE.getFieldValue());
inputMap.set('Body.OccupationDetails.SelfEmploymentProfession', this.OD_SELF_EMPLD_TYPE.getFieldValue());
inputMap.set('Body.OccupationDetails.SelfEmploymentProfession', this.OD_SELF_EMPLD_PROF.getFieldValue());
inputMap.set('Body.OccupationDetails.EmployeeID', this.OD_EMPLOYEE_ID.getFieldValue());
inputMap.set('Body.OccupationDetails.Department', this.OD_DEPARTMENT.getFieldValue());
inputMap.set('Body.OccupationDetails.Designation', this.OD_DESIGNATION.getFieldValue());
inputMap.set('Body.OccupationDetails.DateOfJoining', this.OD_DATE_OF_JOINING.getFieldValue());
inputMap.set('Body.OccupationDetails.DateofInception', this.OD_DT_OF_INCPTN.getFieldValue());
inputMap.set('Body.OccupationDetails.Industry', this.OD_INDUSTRY.getFieldValue());
inputMap.set('Body.OccupationDetails.NatureOfBusiness', this.OD_NTR_OF_BUSS.getFieldValue());
inputMap.set('Body.OccupationDetails.CompanyCode', this.OD_COMPANY_CODE.getFieldValue());
inputMap.set('Body.OccupationDetails.CompanyName', this.OD_COMP_NAME.getFieldValue());
inputMap.set('Body.OccupationDetails.LengthOfExistence', this.OD_LENGTH_OF_EXST.getFieldValue());
inputMap.set('Body.OccupationDetails.IncomeDocumentType', this.OD_INC_DOC_TYPE.getFieldValue());
inputMap.set('Body.OccupationDetails.NetIncome', this.OD_NET_INCOME.getFieldValue());
inputMap.set('Body.OccupationDetails.IncomeFrequency', this.OD_INCOME_FREQ.getFieldValue());
inputMap.set('Body.OccupationDetails.EmploymentStatus', this.OD_EMP_STATUS.getFieldValue());
inputMap.set('Body.OccupationDetails.IncomeType', this.OD_INCOME_TYPE.getFieldValue());
inputMap.set('Body.OccupationDetails.WorkPermitNumber', this.OD_WRK_PERMIT_NO.getFieldValue());
inputMap.set('Body.OccupationDetails.ResidencePermitNumber', this.OD_RES_PRT_NO.getFieldValue());
inputMap.set('Body.OccupationDetails.Currency', this.OD_CURRENCY.getFieldValue());
inputMap.set('Body.OccupationDetails.LocalCurrencyEquivalent', this.OD_LOC_CURR_EQ.getFieldValue());
this.services.http.fetchApi('/OccupationDetails', 'POST', inputMap).subscribe(
async (httpResponse: HttpResponse<any>) => {
var res = httpResponse.body;
this.services.alert.showAlert(1, 'Form Saved Successfully!', 5000);
},
async (httpError)=>{
var err = httpError['error']
if(err!=null && err['ErrorElementPath'] != undefined && err['ErrorDescription']!=undefined){
if(err['ErrorElementPath'] == 'OccupationDetails.LocalCurrencyEquivalent'){
this.OD_LOC_CURR_EQ.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'OccupationDetails.Currency'){
this.OD_CURRENCY.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'OccupationDetails.ResidencePermitNumber'){
this.OD_RES_PRT_NO.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'OccupationDetails.WorkPermitNumber'){
this.OD_WRK_PERMIT_NO.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'OccupationDetails.IncomeType'){
this.OD_INCOME_TYPE.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'OccupationDetails.EmploymentStatus'){
this.OD_EMP_STATUS.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'OccupationDetails.IncomeFrequency'){
this.OD_INCOME_FREQ.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'OccupationDetails.NetIncome'){
this.OD_NET_INCOME.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'OccupationDetails.IncomeDocumentType'){
this.OD_INC_DOC_TYPE.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'OccupationDetails.LengthOfExistence'){
this.OD_LENGTH_OF_EXST.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'OccupationDetails.CompanyName'){
this.OD_COMP_NAME.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'OccupationDetails.CompanyCode'){
this.OD_COMPANY_CODE.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'OccupationDetails.NatureOfBusiness'){
this.OD_NTR_OF_BUSS.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'OccupationDetails.Industry'){
this.OD_INDUSTRY.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'OccupationDetails.DateofInception'){
this.OD_DT_OF_INCPTN.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'OccupationDetails.DateOfJoining'){
this.OD_DATE_OF_JOINING.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'OccupationDetails.Designation'){
this.OD_DESIGNATION.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'OccupationDetails.Department'){
this.OD_DEPARTMENT.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'OccupationDetails.EmployeeID'){
this.OD_EMPLOYEE_ID.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'OccupationDetails.SelfEmploymentProfession'){
this.OD_SELF_EMPLD_PROF.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'OccupationDetails.SelfEmploymentProfession'){
this.OD_SELF_EMPLD_TYPE.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'OccupationDetails.EmploymentType'){
this.OD_EMPLT_TYPE.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'OccupationDetails.Occupation'){
this.OD_OCCUPATION.setError(err['ErrorDescription']);
}
}
this.services.alert.showAlert(2, 'Error occurred while saving form!', 5000);
}
);
}
fieldDependencies = {
}

}
