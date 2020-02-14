import { Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import { ServiceTypeMasterModel } from './ServiceTypeMaster.model';
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
import { FreshCurrencyComponent } from '../FreshCurrency/FreshCurrency.component';

const customCss: string = '';

@Component({
selector: 'app-ServiceTypeMaster',
templateUrl: './ServiceTypeMaster.component.html'
})
export class ServiceTypeMasterComponent extends FormComponent implements OnInit, AfterViewInit {
@ViewChild('FieldId_14', {static: false}) FieldId_14: ButtonComponent;
@ViewChild('save', {static: false}) save: ButtonComponent;
@ViewChild('FieldId_10', {static: false}) FieldId_10: ButtonComponent;
@ViewChild('Code', {static: false}) Code: TextBoxComponent;
@ViewChild('desc', {static: false}) desc: TextBoxComponent;
@ViewChild('FieldId_30', {static: false}) FieldId_30: FreshCurrencyComponent;
async revalidate(): Promise<number> {
var totalErrors = 0;
super.beforeRevalidate();
await Promise.all([
this.revalidateBasicField('Code'),
this.revalidateBasicField('desc'),
this.FieldId_30.revalidate(),
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
this.value = new ServiceTypeMasterModel();
this.componentCode = 'ServiceTypeMaster';
}
setReadOnly(readOnly){
super.setBasicFieldsReadOnly(readOnly);
this.FieldId_30.setReadOnly(readOnly);
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
this.submitData['formName'] = 'Service Type Maintenance';
await super.submit(path, apiCode, serviceCode);
}
getFieldInfo() {
this.amountComponent.forEach(field => {this.additionalInfo[field.fieldID + '_desc'] = field.getFieldInfo();});
this.comboFields.forEach(field => {this.additionalInfo[field.fieldID + '_desc'] = field.getFieldInfo();});
this.fileUploadFields.forEach(field => {this.additionalInfo[field.fieldID + '_desc'] = field.getFieldInfo();});
this.additionalInfo['FieldId_30_desc'] = this.FieldId_30.getFieldInfo();
return this.additionalInfo;
}
getFieldValue(){
this.value.FieldId_30 = this.FieldId_30.getFieldValue();
return this.value;
}
setValue(inputValue, inputDesc=undefined) {
this.setBasicFieldsValue(inputValue, inputDesc);
this.FieldId_30.setValue(inputValue['FieldId_30'], inputDesc['FieldId_30_desc']);
this.value = new ServiceTypeMasterModel();
this.value.setValue(inputValue);
this.setDependencies();
this.passNewValue(this.value);
}
ngOnInit(){
if(this.formCode == undefined) {this.formCode = 'ServiceTypeMaster';}
if(this.formOnLoadError){return;}
var styleElement = document.createElement('style');
styleElement.type = 'text/css';
styleElement.innerHTML = customCss;
styleElement.id = 'ServiceTypeMaster_customCss';
document.getElementsByTagName('head')[0].appendChild(styleElement);
}
ngOnDestroy(){
this.unsubscribe$.next();
this.unsubscribe$.complete();
var styleElement = document.getElementById('ServiceTypeMaster_customCss');
styleElement.parentNode.removeChild(styleElement);
}
ngAfterViewInit(){
setTimeout(() => {
this.subsBFldsValueUpdates();
this.value.FieldId_30 = this.FieldId_30.getFieldValue();
this.FieldId_30.valueChangeUpdates().subscribe((value) => {this.value.FieldId_30 = value;});
this.onFormLoad();
});
}
clearError(){
super.clearBasicFieldsError();
super.clearHTabErrors();
super.clearVTabErrors();
this.FieldId_30.clearError();
this.errors = 0;
this.errorMessage = [];
}
onReset(){
super.resetBasicFields();
this.FieldId_30.onReset();
this.clearHTabErrors();
this.clearVTabErrors();
this.errors = 0;
this.errorMessage = [];
this.additionalInfo = undefined;
this.dependencyMap.clear();
this.value = new ServiceTypeMasterModel();
this.passNewValue(this.value);
this.setReadOnly(false);
this.onFormLoad();
}
async save_click(event){
let inputMap = new Map();
inputMap.clear();
inputMap.set('Body.ServiceType.serviceTypeCode', this.Code.getFieldValue());
inputMap.set('Body.ServiceType.serviceTypeDesc', this.desc.getFieldValue());
this.services.http.fetchApi('/ServiceType', 'POST', inputMap).subscribe(
async res => {
this.services.alert.showAlert(1, 'Updated Successfully', -1);
},
async (httpError)=>{
var err = httpError['error']
if(err!=null && err['ErrorElementPath'] != undefined && err['ErrorDescription']!=undefined){
if(err['ErrorElementPath'] == 'ServiceType.serviceTypeDesc'){
this.desc.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'ServiceType.serviceTypeCode'){
this.Code.setError(err['ErrorDescription']);
}
}
}
);
}
fieldDependencies = {
}

}
