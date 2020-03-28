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
@ViewChild('FD_TITLE', {static: false}) FD_TITLE: TextBoxComponent;
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
@ViewChild('FD_SAVE_BTN', {static: false}) FD_SAVE_BTN: ButtonComponent;
@ViewChild('FieldId_18', {static: false}) FieldId_18: FamilyDetailsGridComponent;
@ViewChild('Handler', {static: false}) Handler: FamilyHandlerComponent;
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
//this.FD_FULL_NAME.setReadOnly(true);
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
this.FieldId_18.setValue(inputValue['FieldId_18']);
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
fieldDependencies = {
}

}