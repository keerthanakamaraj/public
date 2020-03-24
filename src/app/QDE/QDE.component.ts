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
import { QDEHandlerComponent } from '../QDE/QDE-handler.component';

const customCss: string = '';

@Component({
selector: 'app-QDE',
templateUrl: './QDE.component.html'
})
export class QDEComponent extends FormComponent implements OnInit, AfterViewInit {
@ViewChild('HEADER', {static: false}) HEADER: HeaderComponent;
@ViewChild('CUSTOMER_DETAILS', {static: false}) CUSTOMER_DETAILS: CustomerDtlsComponent;
@ViewChild('QDE_SUBMIT', {static: false}) QDE_SUBMIT: ButtonComponent;
@ViewChild('QDE_CANCEL', {static: false}) QDE_CANCEL: ButtonComponent;
@ViewChild('Handler', {static: false}) Handler: QDEHandlerComponent;
async revalidate(): Promise<number> {
var totalErrors = 0;
super.beforeRevalidate();
await Promise.all([
this.HEADER.revalidate(),
this.CUSTOMER_DETAILS.revalidate(),
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
this.displayBorder = false;
}
setReadOnly(readOnly){
super.setBasicFieldsReadOnly(readOnly);
this.HEADER.setReadOnly(readOnly);
this.CUSTOMER_DETAILS.setReadOnly(readOnly);
}
async onFormLoad(){
this.setInputs(this.services.dataStore.getData(this.services.routing.currModal));
let inputMap = new Map();
await this.FieldId_1.loadCustDtlsGrid({
'custSeq': this.services.dataStore.getRouteParam(this.services.routing.currModal, 'appId'),
});
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
this.submitData['formName'] = 'QDE';
await super.submit(path, apiCode, serviceCode);
}
getFieldInfo() {
this.amountComponent.forEach(field => {this.additionalInfo[field.fieldID + '_desc'] = field.getFieldInfo();});
this.comboFields.forEach(field => {this.additionalInfo[field.fieldID + '_desc'] = field.getFieldInfo();});
this.fileUploadFields.forEach(field => {this.additionalInfo[field.fieldID + '_desc'] = field.getFieldInfo();});
this.additionalInfo['HEADER_desc'] = this.HEADER.getFieldInfo();
this.additionalInfo['CUSTOMER_DETAILS_desc'] = this.CUSTOMER_DETAILS.getFieldInfo();
return this.additionalInfo;
}
getFieldValue(){
this.value.HEADER = this.HEADER.getFieldValue();
this.value.CUSTOMER_DETAILS = this.CUSTOMER_DETAILS.getFieldValue();
return this.value;
}
setValue(inputValue, inputDesc=undefined) {
this.setBasicFieldsValue(inputValue, inputDesc);
this.HEADER.setValue(inputValue['HEADER'], inputDesc['HEADER_desc']);
this.CUSTOMER_DETAILS.setValue(inputValue['CUSTOMER_DETAILS'], inputDesc['CUSTOMER_DETAILS_desc']);
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
this.value.HEADER = this.HEADER.getFieldValue();
this.HEADER.valueChangeUpdates().subscribe((value) => {this.value.HEADER = value;});
this.value.CUSTOMER_DETAILS = this.CUSTOMER_DETAILS.getFieldValue();
this.CUSTOMER_DETAILS.valueChangeUpdates().subscribe((value) => {this.value.CUSTOMER_DETAILS = value;});
this.onFormLoad();
this.checkForHTabOverFlow();
});
}
clearError(){
super.clearBasicFieldsError();
super.clearHTabErrors();
super.clearVTabErrors();
this.HEADER.clearError();
this.CUSTOMER_DETAILS.clearError();
this.errors = 0;
this.errorMessage = [];
}
onReset(){
super.resetBasicFields();
this.HEADER.onReset();
this.CUSTOMER_DETAILS.onReset();
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