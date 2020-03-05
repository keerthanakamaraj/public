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
import { ApplicationDtlsComponent } from '../ApplicationDtls/ApplicationDtls.component';
import { LoanDetailsFormComponent } from '../LoanDetailsForm/LoanDetailsForm.component';

const customCss: string = '';

@Component({
selector: 'app-QDE',
templateUrl: './QDE.component.html'
})
export class QDEComponent extends FormComponent implements OnInit, AfterViewInit {
@ViewChild('FieldId_8', {static: false}) FieldId_8: HeaderComponent;
@ViewChild('FieldId_1', {static: false}) FieldId_1: CustomerDtlsComponent;
@ViewChild('FieldId_5', {static: false}) FieldId_5: ApplicationDtlsComponent;
@ViewChild('FieldId_7', {static: false}) FieldId_7: LoanDetailsFormComponent;
@ViewChild('QDE_SUBMIT', {static: false}) QDE_SUBMIT: ButtonComponent;
@ViewChild('QDE_CANCEL', {static: false}) QDE_CANCEL: ButtonComponent;
async revalidate(): Promise<number> {
var totalErrors = 0;
super.beforeRevalidate();
await Promise.all([
this.FieldId_8.revalidate(),
this.FieldId_1.revalidate(),
this.FieldId_5.revalidate(),
this.FieldId_7.revalidate(),
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
this.FieldId_5.setReadOnly(readOnly);
this.FieldId_7.setReadOnly(readOnly);
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
this.submitData['formName'] = 'QDE';
await super.submit(path, apiCode, serviceCode);
}
getFieldInfo() {
this.amountComponent.forEach(field => {this.additionalInfo[field.fieldID + '_desc'] = field.getFieldInfo();});
this.comboFields.forEach(field => {this.additionalInfo[field.fieldID + '_desc'] = field.getFieldInfo();});
this.fileUploadFields.forEach(field => {this.additionalInfo[field.fieldID + '_desc'] = field.getFieldInfo();});
this.additionalInfo['FieldId_8_desc'] = this.FieldId_8.getFieldInfo();
this.additionalInfo['FieldId_1_desc'] = this.FieldId_1.getFieldInfo();
this.additionalInfo['FieldId_5_desc'] = this.FieldId_5.getFieldInfo();
this.additionalInfo['FieldId_7_desc'] = this.FieldId_7.getFieldInfo();
return this.additionalInfo;
}
getFieldValue(){
this.value.FieldId_8 = this.FieldId_8.getFieldValue();
this.value.FieldId_1 = this.FieldId_1.getFieldValue();
this.value.FieldId_5 = this.FieldId_5.getFieldValue();
this.value.FieldId_7 = this.FieldId_7.getFieldValue();
return this.value;
}
setValue(inputValue, inputDesc=undefined) {
this.setBasicFieldsValue(inputValue, inputDesc);
this.FieldId_8.setValue(inputValue['FieldId_8'], inputDesc['FieldId_8_desc']);
this.FieldId_1.setValue(inputValue['FieldId_1'], inputDesc['FieldId_1_desc']);
this.FieldId_5.setValue(inputValue['FieldId_5'], inputDesc['FieldId_5_desc']);
this.FieldId_7.setValue(inputValue['FieldId_7'], inputDesc['FieldId_7_desc']);
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
this.value.FieldId_5 = this.FieldId_5.getFieldValue();
this.FieldId_5.valueChangeUpdates().subscribe((value) => {this.value.FieldId_5 = value;});
this.value.FieldId_7 = this.FieldId_7.getFieldValue();
this.FieldId_7.valueChangeUpdates().subscribe((value) => {this.value.FieldId_7 = value;});
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
this.FieldId_5.clearError();
this.FieldId_7.clearError();
this.errors = 0;
this.errorMessage = [];
}
onReset(){
super.resetBasicFields();
this.FieldId_8.onReset();
this.FieldId_1.onReset();
this.FieldId_5.onReset();
this.FieldId_7.onReset();
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
