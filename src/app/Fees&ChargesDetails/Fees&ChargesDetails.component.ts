import { Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import { FeesChargesDetailsModel } from './Fees&ChargesDetails.model';
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
import { FeesChargesGridComponent } from '../FeesChargesGrid/FeesChargesGrid.component';

const customCss: string = '';

@Component({
selector: 'app-FeesChargesDetails',
templateUrl: './Fees&ChargesDetails.component.html'
})
export class FeesChargesDetailsComponent extends FormComponent implements OnInit, AfterViewInit {
@ViewChild('ChargeDescription', {static: false}) ChargeDescription: ComboBoxComponent;
@ViewChild('ChargeType', {static: false}) ChargeType: ComboBoxComponent;
@ViewChild('PartyType', {static: false}) PartyType: ComboBoxComponent;
@ViewChild('PartyName', {static: false}) PartyName: ComboBoxComponent;
@ViewChild('ChargeBasis', {static: false}) ChargeBasis: AmountComponent;
@ViewChild('ChargeRate', {static: false}) ChargeRate: TextBoxComponent;
@ViewChild('ChargeAmount', {static: false}) ChargeAmount: AmountComponent;
@ViewChild('PeriodicCharge', {static: false}) PeriodicCharge: ComboBoxComponent;
@ViewChild('PeriodicStartDate', {static: false}) PeriodicStartDate: DateComponent;
@ViewChild('PeriodicEndDate', {static: false}) PeriodicEndDate: ComboBoxComponent;
@ViewChild('Frequency', {static: false}) Frequency: DateComponent;
@ViewChild('RateChargeOn', {static: false}) RateChargeOn: ComboBoxComponent;
@ViewChild('ChargeCollection', {static: false}) ChargeCollection: ComboBoxComponent;
@ViewChild('FC_SAVE_BTN', {static: false}) FC_SAVE_BTN: ButtonComponent;
@ViewChild('FC_RESET_BTN', {static: false}) FC_RESET_BTN: ButtonComponent;
@ViewChild('FieldId_2', {static: false}) FieldId_2: FeesChargesGridComponent;
async revalidate(): Promise<number> {
var totalErrors = 0;
super.beforeRevalidate();
await Promise.all([
this.revalidateBasicField('ChargeDescription'),
this.revalidateBasicField('ChargeType'),
this.revalidateBasicField('PartyType'),
this.revalidateBasicField('PartyName'),
this.revalidateBasicField('ChargeBasis'),
this.revalidateBasicField('ChargeRate'),
this.revalidateBasicField('ChargeAmount'),
this.revalidateBasicField('PeriodicCharge'),
this.revalidateBasicField('PeriodicStartDate'),
this.revalidateBasicField('PeriodicEndDate'),
this.revalidateBasicField('Frequency'),
this.revalidateBasicField('RateChargeOn'),
this.revalidateBasicField('ChargeCollection'),
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
this.value = new FeesChargesDetailsModel();
this.componentCode = 'FeesChargesDetails';
}
setReadOnly(readOnly){
super.setBasicFieldsReadOnly(readOnly);
}
async onFormLoad(){
this.setInputs(this.services.dataStore.getData(this.services.routing.currModal));
this.ChargeBasis.setFormatOptions({languageCode: 'en-US', });
this.ChargeAmount.setFormatOptions({languageCode: 'en-US', });
this.setDependencies();
}
setInputs(param : any){
let params = this.services.http.mapToJson(param);
if(params['mode']){
this.mode = params['mode'];
}
}
async submitForm(path, apiCode, serviceCode){
this.submitData['formName'] = 'Fees & Charges';
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
this.FieldId_2.setValue(inputValue['FieldId_2']);
this.value = new FeesChargesDetailsModel();
this.value.setValue(inputValue);
this.setDependencies();
this.passNewValue(this.value);
}
ngOnInit(){
if(this.formCode == undefined) {this.formCode = 'FeesChargesDetails';}
if(this.formOnLoadError){return;}
var styleElement = document.createElement('style');
styleElement.type = 'text/css';
styleElement.innerHTML = customCss;
styleElement.id = 'FeesChargesDetails_customCss';
document.getElementsByTagName('head')[0].appendChild(styleElement);
}
ngOnDestroy(){
this.unsubscribe$.next();
this.unsubscribe$.complete();
var styleElement = document.getElementById('FeesChargesDetails_customCss');
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
this.value = new FeesChargesDetailsModel();
this.passNewValue(this.value);
this.setReadOnly(false);
this.onFormLoad();
}
fieldDependencies = {
}

}