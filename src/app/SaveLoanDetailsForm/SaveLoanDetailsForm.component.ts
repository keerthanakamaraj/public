import { Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import { SaveLoanDetailsFormModel } from './SaveLoanDetailsForm.model';
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
selector: 'app-SaveLoanDetailsForm',
templateUrl: './SaveLoanDetailsForm.component.html'
})
export class SaveLoanDetailsFormComponent extends FormComponent implements OnInit, AfterViewInit {
@ViewChild('ARN', {static: false}) ARN: TextBoxComponent;
@ViewChild('IcifNumber', {static: false}) IcifNumber: TextBoxComponent;
@ViewChild('Product', {static: false}) Product: TextBoxComponent;
@ViewChild('SaveLoan', {static: false}) SaveLoan: ButtonComponent;
async revalidate(): Promise<number> {
var totalErrors = 0;
super.beforeRevalidate();
await Promise.all([
this.revalidateBasicField('ARN'),
this.revalidateBasicField('IcifNumber'),
this.revalidateBasicField('Product'),
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
this.value = new SaveLoanDetailsFormModel();
this.componentCode = 'SaveLoanDetailsForm';
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
this.submitData['formName'] = 'SaveLoanDetails';
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
this.value = new SaveLoanDetailsFormModel();
this.value.setValue(inputValue);
this.setDependencies();
this.passNewValue(this.value);
}
ngOnInit(){
if(this.formCode == undefined) {this.formCode = 'SaveLoanDetailsForm';}
if(this.formOnLoadError){return;}
var styleElement = document.createElement('style');
styleElement.type = 'text/css';
styleElement.innerHTML = customCss;
styleElement.id = 'SaveLoanDetailsForm_customCss';
document.getElementsByTagName('head')[0].appendChild(styleElement);
}
ngOnDestroy(){
this.unsubscribe$.next();
this.unsubscribe$.complete();
var styleElement = document.getElementById('SaveLoanDetailsForm_customCss');
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
this.value = new SaveLoanDetailsFormModel();
this.passNewValue(this.value);
this.setReadOnly(false);
this.onFormLoad();
}
async SaveLoan_click(event){
let inputMap = new Map();
inputMap.clear();
inputMap.set('Body.LoanDetails.ApplicationRefernceNo', this.ARN.getFieldValue());
inputMap.set('Body.LoanDetails.ICIFNumber', this.IcifNumber.getFieldValue());
inputMap.set('Body.LoanDetails.Product', this.Product.getFieldValue());
this.services.http.fetchApi('/LoanDetails', 'POST', inputMap).subscribe(
async (httpResponse: HttpResponse<any>) => {
var res = httpResponse.body;
this.services.alert.showAlert(1, 'rlo.success.save.loan', 5000);
},
async (httpError)=>{
var err = httpError['error']
if(err!=null && err['ErrorElementPath'] != undefined && err['ErrorDescription']!=undefined){
if(err['ErrorElementPath'] == 'LoanDetails.Product'){
this.Product.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'LoanDetails.ICIFNumber'){
this.IcifNumber.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'LoanDetails.ApplicationRefernceNo'){
this.ARN.setError(err['ErrorDescription']);
}
}
this.services.alert.showAlert(3, 'rlo.error.save.loan', -1);
}
);
}
fieldDependencies = {
}

}
