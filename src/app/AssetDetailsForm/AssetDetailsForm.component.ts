import { Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import { AssetDetailsFormModel } from './AssetDetailsForm.model';
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
selector: 'app-AssetDetailsForm',
templateUrl: './AssetDetailsForm.component.html'
})
export class AssetDetailsFormComponent extends FormComponent implements OnInit, AfterViewInit {
@ViewChild('AT_ASSET_TYPE', {static: false}) AT_ASSET_TYPE: ComboBoxComponent;
@ViewChild('AT_ASSET_SUBTYPE', {static: false}) AT_ASSET_SUBTYPE: ComboBoxComponent;
@ViewChild('AT_ASSET_LOCATION', {static: false}) AT_ASSET_LOCATION: TextBoxComponent;
@ViewChild('AT_ASSET_STATUS', {static: false}) AT_ASSET_STATUS: TextBoxComponent;
@ViewChild('AT_ASSET_VALUE', {static: false}) AT_ASSET_VALUE: TextBoxComponent;
@ViewChild('AT_FAIR_MRKT_VALUE', {static: false}) AT_FAIR_MRKT_VALUE: TextBoxComponent;
@ViewChild('AT_CURRENCY', {static: false}) AT_CURRENCY: TextBoxComponent;
@ViewChild('AT_EQUIVALENT_AMOUNT', {static: false}) AT_EQUIVALENT_AMOUNT: TextBoxComponent;
@ViewChild('AT_OWNED_BY', {static: false}) AT_OWNED_BY: TextBoxComponent;
@ViewChild('AT_NAME', {static: false}) AT_NAME: TextBoxComponent;
@ViewChild('AT_INCLUDE_IN_DBR', {static: false}) AT_INCLUDE_IN_DBR: ComboBoxComponent;
@ViewChild('AT_SAVE', {static: false}) AT_SAVE: ButtonComponent;
async revalidate(): Promise<number> {
var totalErrors = 0;
super.beforeRevalidate();
await Promise.all([
this.revalidateBasicField('AT_ASSET_TYPE'),
this.revalidateBasicField('AT_ASSET_SUBTYPE'),
this.revalidateBasicField('AT_ASSET_LOCATION'),
this.revalidateBasicField('AT_ASSET_STATUS'),
this.revalidateBasicField('AT_ASSET_VALUE'),
this.revalidateBasicField('AT_FAIR_MRKT_VALUE'),
this.revalidateBasicField('AT_CURRENCY'),
this.revalidateBasicField('AT_EQUIVALENT_AMOUNT'),
this.revalidateBasicField('AT_OWNED_BY'),
this.revalidateBasicField('AT_NAME'),
this.revalidateBasicField('AT_INCLUDE_IN_DBR'),
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
this.value = new AssetDetailsFormModel();
this.componentCode = 'AssetDetailsForm';
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
this.submitData['formName'] = 'Asset Details Form';
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
this.value = new AssetDetailsFormModel();
this.value.setValue(inputValue);
this.setDependencies();
this.passNewValue(this.value);
}
ngOnInit(){
if(this.formCode == undefined) {this.formCode = 'AssetDetailsForm';}
if(this.formOnLoadError){return;}
var styleElement = document.createElement('style');
styleElement.type = 'text/css';
styleElement.innerHTML = customCss;
styleElement.id = 'AssetDetailsForm_customCss';
document.getElementsByTagName('head')[0].appendChild(styleElement);
}
ngOnDestroy(){
this.unsubscribe$.next();
this.unsubscribe$.complete();
var styleElement = document.getElementById('AssetDetailsForm_customCss');
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
this.value = new AssetDetailsFormModel();
this.passNewValue(this.value);
this.setReadOnly(false);
this.onFormLoad();
}
fieldDependencies = {
}

}
