import { Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import { IncomeSummaryFormModel } from './IncomeSummaryForm.model';
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
selector: 'app-IncomeSummaryForm',
templateUrl: './IncomeSummaryForm.component.html'
})
export class IncomeSummaryFormComponent extends FormComponent implements OnInit, AfterViewInit {
@ViewChild('IS_TOTAL_INCOME', {static: false}) IS_TOTAL_INCOME: AmountComponent;
@ViewChild('IS_NET_INCOME', {static: false}) IS_NET_INCOME: AmountComponent;
@ViewChild('IS_TOTAL_OBLIGATION', {static: false}) IS_TOTAL_OBLIGATION: AmountComponent;
@ViewChild('IS_DBR', {static: false}) IS_DBR: AmountComponent;
@ViewChild('IS_TOTAL_LIABILITY', {static: false}) IS_TOTAL_LIABILITY: TextBoxComponent;
async revalidate(): Promise<number> {
var totalErrors = 0;
super.beforeRevalidate();
await Promise.all([
this.revalidateBasicField('IS_TOTAL_INCOME'),
this.revalidateBasicField('IS_NET_INCOME'),
this.revalidateBasicField('IS_TOTAL_OBLIGATION'),
this.revalidateBasicField('IS_DBR'),
this.revalidateBasicField('IS_TOTAL_LIABILITY'),
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
this.value = new IncomeSummaryFormModel();
this.componentCode = 'IncomeSummaryForm';
}
setReadOnly(readOnly){
super.setBasicFieldsReadOnly(readOnly);
}
async onFormLoad(){
this.setInputs(this.services.dataStore.getData(this.services.routing.currModal));
this.IS_TOTAL_INCOME.setFormatOptions({currencyCode: 'INR', languageCode: 'en-US', });
this.IS_TOTAL_INCOME.setReadOnly(true);
this.IS_NET_INCOME.setFormatOptions({currencyCode: 'INR', languageCode: 'en-US', });
this.IS_NET_INCOME.setReadOnly(true);
this.IS_TOTAL_OBLIGATION.setFormatOptions({currencyCode: 'INR', languageCode: 'en-US', });
this.IS_TOTAL_OBLIGATION.setReadOnly(true);
this.IS_DBR.setFormatOptions({currencyCode: 'INR', languageCode: 'en-US', });
this.IS_DBR.setReadOnly(true);
this.IS_TOTAL_LIABILITY.setReadOnly(true);
this.setDependencies();
}
setInputs(param : any){
let params = this.services.http.mapToJson(param);
if(params['mode']){
this.mode = params['mode'];
}
}
async submitForm(path, apiCode, serviceCode){
this.submitData['formName'] = 'Income Summary Form';
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
this.value = new IncomeSummaryFormModel();
this.value.setValue(inputValue);
this.setDependencies();
this.passNewValue(this.value);
}
ngOnInit(){
if(this.formCode == undefined) {this.formCode = 'IncomeSummaryForm';}
if(this.formOnLoadError){return;}
var styleElement = document.createElement('style');
styleElement.type = 'text/css';
styleElement.innerHTML = customCss;
styleElement.id = 'IncomeSummaryForm_customCss';
document.getElementsByTagName('head')[0].appendChild(styleElement);
}
ngOnDestroy(){
this.unsubscribe$.next();
this.unsubscribe$.complete();
var styleElement = document.getElementById('IncomeSummaryForm_customCss');
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
this.value = new IncomeSummaryFormModel();
this.passNewValue(this.value);
this.setReadOnly(false);
this.onFormLoad();
}
fieldDependencies = {
}

}