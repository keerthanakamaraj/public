import { Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import { QDEModel } from './QDE.model';
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
import { HeaderComponent } from '../Header/Header.component';
import { CustomerDtlsComponent } from '../CustomerDtls/CustomerDtls.component';

const customCss: string = '';

@Component({
selector: 'app-QDE',
templateUrl: './QDE.component.html'
})
export class QDEComponent extends FormComponent implements OnInit, AfterViewInit {
@ViewChild('FieldId_8', {static: false}) FieldId_8: HeaderComponent;
@ViewChild('FieldId_1', {static: false}) FieldId_1: CustomerDtlsComponent;
@ViewChild('QDE_SUBMIT', {static: false}) QDE_SUBMIT: ButtonComponent;
@ViewChild('QDE_CANCEL', {static: false}) QDE_CANCEL: ButtonComponent;
async revalidate(): Promise<number> {
var totalErrors = 0;
super.beforeRevalidate();
await Promise.all([
this.FieldId_8.revalidate(),
this.FieldId_1.revalidate(),
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
this.value = new QDEModel();
this.componentCode = 'QDE';
}
setReadOnly(readOnly){
super.setBasicFieldsReadOnly(readOnly);
this.FieldId_8.setReadOnly(readOnly);
this.FieldId_1.setReadOnly(readOnly);
}
async onFormLoad(){
this.setInputs(this.services.dataStore.getData(this.services.routing.currModal));
let inputMap = new Map();
await this.FieldId_1.loadCustDtlsGrid({
'custSeq': this.services.dataStore.getRouteParam(this.services.routing.currModal, 'appId'),
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
this.submitData['formName'] = 'QDE';
await super.submit(path, apiCode, serviceCode);
}
getFieldInfo() {
this.amountComponent.forEach(field => {this.additionalInfo[field.fieldID + '_desc'] = field.getFieldInfo();});
this.comboFields.forEach(field => {this.additionalInfo[field.fieldID + '_desc'] = field.getFieldInfo();});
this.fileUploadFields.forEach(field => {this.additionalInfo[field.fieldID + '_desc'] = field.getFieldInfo();});
this.additionalInfo['FieldId_8_desc'] = this.FieldId_8.getFieldInfo();
this.additionalInfo['FieldId_1_desc'] = this.FieldId_1.getFieldInfo();
return this.additionalInfo;
}
getFieldValue(){
this.value.FieldId_8 = this.FieldId_8.getFieldValue();
this.value.FieldId_1 = this.FieldId_1.getFieldValue();
return this.value;
}
setValue(inputValue, inputDesc=undefined) {
this.setBasicFieldsValue(inputValue, inputDesc);
this.FieldId_8.setValue(inputValue['FieldId_8'], inputDesc['FieldId_8_desc']);
this.FieldId_1.setValue(inputValue['FieldId_1'], inputDesc['FieldId_1_desc']);
this.value = new QDEModel();
this.value.setValue(inputValue);
this.setDependencies();
this.passNewValue(this.value);
}
ngOnInit(){
if(this.formCode == undefined) {this.formCode = 'QDE';}
if(this.formOnLoadError){return;}
var styleElement = document.createElement('style');
styleElement.type = 'text/css';
styleElement.innerHTML = customCss;
styleElement.id = 'QDE_customCss';
document.getElementsByTagName('head')[0].appendChild(styleElement);
}
ngOnDestroy(){
this.unsubscribe$.next();
this.unsubscribe$.complete();
var styleElement = document.getElementById('QDE_customCss');
styleElement.parentNode.removeChild(styleElement);
}
ngAfterViewInit(){
setTimeout(() => {
this.subsBFldsValueUpdates();
this.value.FieldId_8 = this.FieldId_8.getFieldValue();
this.FieldId_8.valueChangeUpdates().subscribe((value) => {this.value.FieldId_8 = value;});
this.value.FieldId_1 = this.FieldId_1.getFieldValue();
this.FieldId_1.valueChangeUpdates().subscribe((value) => {this.value.FieldId_1 = value;});
this.onFormLoad();
this.checkForHTabOverFlow();
});
}
clearError(){
super.clearBasicFieldsError();
super.clearHTabErrors();
super.clearVTabErrors();
this.FieldId_8.clearError();
this.FieldId_1.clearError();
this.errors = 0;
this.errorMessage = [];
}
onReset(){
super.resetBasicFields();
this.FieldId_8.onReset();
this.FieldId_1.onReset();
this.clearHTabErrors();
this.clearVTabErrors();
this.errors = 0;
this.errorMessage = [];
this.additionalInfo = undefined;
this.dependencyMap.clear();
this.value = new QDEModel();
this.passNewValue(this.value);
this.setReadOnly(false);
this.onFormLoad();
}
fieldDependencies = {
}

}