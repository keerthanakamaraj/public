import { Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import { CreditCardDetailsModel } from './CreditCardDetails.model';
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
import { CreditCardDetailsGridComponent } from '../CreditCardDetailsGrid/CreditCardDetailsGrid.component';

const customCss: string = '';

@Component({
selector: 'app-CreditCardDetails',
templateUrl: './CreditCardDetails.component.html'
})
export class CreditCardDetailsComponent extends FormComponent implements OnInit, AfterViewInit {
@ViewChild('CCD_Branch', {static: false}) CCD_Branch: TextBoxComponent;
@ViewChild('CCD_CategoryOnPage', {static: false}) CCD_CategoryOnPage: ComboBoxComponent;
@ViewChild('CCD_Approved_Limit', {static: false}) CCD_Approved_Limit: TextBoxComponent;
@ViewChild('CCD_Name_on_Card', {static: false}) CCD_Name_on_Card: TextBoxComponent;
@ViewChild('CCD_Settlement_Account_Type', {static: false}) CCD_Settlement_Account_Type: TextBoxComponent;
@ViewChild('CCD_Settle_Account_No', {static: false}) CCD_Settle_Account_No: TextBoxComponent;
@ViewChild('CCD_Payment_Option', {static: false}) CCD_Payment_Option: ComboBoxComponent;
@ViewChild('CCD_Statement_Dispatch_Mode', {static: false}) CCD_Statement_Dispatch_Mode: ComboBoxComponent;
@ViewChild('CCD_Existing_Credit_Card', {static: false}) CCD_Existing_Credit_Card: ComboBoxComponent;
@ViewChild('CCD_Add_On_Required', {static: false}) CCD_Add_On_Required: ComboBoxComponent;
@ViewChild('CCD_Name', {static: false}) CCD_Name: TextBoxComponent;
@ViewChild('CCD_Date_Of_Birth', {static: false}) CCD_Date_Of_Birth: DateComponent;
@ViewChild('CCD_CID_No', {static: false}) CCD_CID_No: TextBoxComponent;
@ViewChild('CCD_Relationship', {static: false}) CCD_Relationship: ComboBoxComponent;
@ViewChild('CCD_Save', {static: false}) CCD_Save: ButtonComponent;
@ViewChild('CCD_Clear', {static: false}) CCD_Clear: ButtonComponent;
@ViewChild('FieldId_31', {static: false}) FieldId_31: CreditCardDetailsGridComponent;
async revalidate(): Promise<number> {
var totalErrors = 0;
super.beforeRevalidate();
await Promise.all([
this.revalidateBasicField('CCD_Branch'),
this.revalidateBasicField('CCD_CategoryOnPage'),
this.revalidateBasicField('CCD_Approved_Limit'),
this.revalidateBasicField('CCD_Name_on_Card'),
this.revalidateBasicField('CCD_Settlement_Account_Type'),
this.revalidateBasicField('CCD_Settle_Account_No'),
this.revalidateBasicField('CCD_Payment_Option'),
this.revalidateBasicField('CCD_Statement_Dispatch_Mode'),
this.revalidateBasicField('CCD_Existing_Credit_Card'),
this.revalidateBasicField('CCD_Add_On_Required'),
this.revalidateBasicField('CCD_Name'),
this.revalidateBasicField('CCD_Date_Of_Birth'),
this.revalidateBasicField('CCD_CID_No'),
this.revalidateBasicField('CCD_Relationship'),
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
this.value = new CreditCardDetailsModel();
this.componentCode = 'CreditCardDetails';
}
setReadOnly(readOnly){
super.setBasicFieldsReadOnly(readOnly);
}
async onFormLoad(){
this.setInputs(this.services.dataStore.getData(this.services.routing.currModal));
this.CCD_Branch.setReadOnly(true);
this.setDependencies();
}
setInputs(param : any){
let params = this.services.http.mapToJson(param);
if(params['mode']){
this.mode = params['mode'];
}
}
async submitForm(path, apiCode, serviceCode){
this.submitData['formName'] = 'CreditCardDetails';
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
this.FieldId_31.setValue(inputValue['FieldId_31']);
this.value = new CreditCardDetailsModel();
this.value.setValue(inputValue);
this.setDependencies();
this.passNewValue(this.value);
}
ngOnInit(){
if(this.formCode == undefined) {this.formCode = 'CreditCardDetails';}
if(this.formOnLoadError){return;}
var styleElement = document.createElement('style');
styleElement.type = 'text/css';
styleElement.innerHTML = customCss;
styleElement.id = 'CreditCardDetails_customCss';
document.getElementsByTagName('head')[0].appendChild(styleElement);
}
ngOnDestroy(){
this.unsubscribe$.next();
this.unsubscribe$.complete();
var styleElement = document.getElementById('CreditCardDetails_customCss');
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
this.value = new CreditCardDetailsModel();
this.passNewValue(this.value);
this.setReadOnly(false);
this.onFormLoad();
}
fieldDependencies = {
}

}