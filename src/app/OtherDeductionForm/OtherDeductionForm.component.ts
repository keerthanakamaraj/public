import { Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import { OtherDeductionFormModel } from './OtherDeductionForm.model';
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
selector: 'app-OtherDeductionForm',
templateUrl: './OtherDeductionForm.component.html'
})
export class OtherDeductionFormComponent extends FormComponent implements OnInit, AfterViewInit {
@ViewChild('OD_OBILGATION_HEAD', {static: false}) OD_OBILGATION_HEAD: ComboBoxComponent;
@ViewChild('OD_OBLIGATION_FREQUENCY', {static: false}) OD_OBLIGATION_FREQUENCY: ComboBoxComponent;
@ViewChild('OD_Amount', {static: false}) OD_Amount: AmountComponent;
@ViewChild('OD_CURRENCY', {static: false}) OD_CURRENCY: ComboBoxComponent;
@ViewChild('OD_Equivalent_Amt', {static: false}) OD_Equivalent_Amt: AmountComponent;
@ViewChild('OD_SAVE', {static: false}) OD_SAVE: ButtonComponent;
async revalidate(): Promise<number> {
var totalErrors = 0;
super.beforeRevalidate();
await Promise.all([
this.revalidateBasicField('OD_OBILGATION_HEAD'),
this.revalidateBasicField('OD_OBLIGATION_FREQUENCY'),
this.revalidateBasicField('OD_Amount'),
this.revalidateBasicField('OD_CURRENCY'),
this.revalidateBasicField('OD_Equivalent_Amt'),
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
this.value = new OtherDeductionFormModel();
this.componentCode = 'OtherDeductionForm';
}
setReadOnly(readOnly){
super.setBasicFieldsReadOnly(readOnly);
}
async onFormLoad(){
this.setInputs(this.services.dataStore.getData(this.services.routing.currModal));
this.OD_Amount.setFormatOptions({currencyCode: 'INR', languageCode: 'en-US', });
this.OD_Equivalent_Amt.setFormatOptions({currencyCode: 'INR', languageCode: 'en-US', });
this.setDependencies();
}
setInputs(param : any){
let params = this.services.http.mapToJson(param);
if(params['mode']){
this.mode = params['mode'];
}
}
async submitForm(path, apiCode, serviceCode){
this.submitData['formName'] = 'OtherDeductionForm';
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
this.value = new OtherDeductionFormModel();
this.value.setValue(inputValue);
this.setDependencies();
this.passNewValue(this.value);
}
ngOnInit(){
if(this.formCode == undefined) {this.formCode = 'OtherDeductionForm';}
if(this.formOnLoadError){return;}
var styleElement = document.createElement('style');
styleElement.type = 'text/css';
styleElement.innerHTML = customCss;
styleElement.id = 'OtherDeductionForm_customCss';
document.getElementsByTagName('head')[0].appendChild(styleElement);
}
ngOnDestroy(){
this.unsubscribe$.next();
this.unsubscribe$.complete();
var styleElement = document.getElementById('OtherDeductionForm_customCss');
styleElement.parentNode.removeChild(styleElement);
}
ngAfterViewInit(){
setTimeout(() => {
this.subsBFldsValueUpdates();
this.onFormLoad();
//this.checkForHTabOverFlow();
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
this.value = new OtherDeductionFormModel();
this.passNewValue(this.value);
this.setReadOnly(false);
this.onFormLoad();
}
async OD_SAVE_click(event){
let inputMap = new Map();
inputMap.clear();
inputMap.set('Body.DeductionDetails.ObligationHead', this.OD_OBILGATION_HEAD.getFieldValue());
inputMap.set('Body.DeductionDetails.ObligationFrequency', this.OD_OBLIGATION_FREQUENCY.getFieldValue());
inputMap.set('Body.DeductionDetails.Amount', this.OD_Amount.getFieldValue());
inputMap.set('Body.DeductionDetails.Currency', this.OD_CURRENCY.getFieldValue());
inputMap.set('Body.DeductionDetails.Equivalent Amt', this.OD_Equivalent_Amt.getFieldValue());
this.services.http.fetchApi('/DeductionDetails', 'POST', inputMap).subscribe(
async (httpResponse: HttpResponse<any>) => {
var res = httpResponse.body;
this.services.alert.showAlert(1, "Deduction Details Saved Successfully", 5000);
},
async (httpError)=>{
var err = httpError['error']
if(err!=null && err['ErrorElementPath'] != undefined && err['ErrorDescription']!=undefined){
if(err['ErrorElementPath'] == 'DeductionDetails.Equivalent Amt'){
this.OD_Equivalent_Amt.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'DeductionDetails.Currency'){
this.OD_CURRENCY.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'DeductionDetails.Amount'){
this.OD_Amount.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'DeductionDetails.ObligationFrequency'){
this.OD_OBLIGATION_FREQUENCY.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'DeductionDetails.ObligationHead'){
this.OD_OBILGATION_HEAD.setError(err['ErrorDescription']);
}
}
this.services.alert.showAlert(2, "Failed tp Save Deduction Details", 200);
}
);
}
fieldDependencies = {
}

}