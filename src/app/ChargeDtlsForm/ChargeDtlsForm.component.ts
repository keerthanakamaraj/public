import { Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import { ChargeDtlsFormModel } from './ChargeDtlsForm.model';
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
import { ChargeDtlsGridComponent } from '../ChargeDtlsGrid/ChargeDtlsGrid.component';
import { ChargeHandlerComponent } from '../ChargeDtlsForm/charge-handler.component';

const customCss: string = '';

@Component({
selector: 'app-ChargeDtlsForm',
templateUrl: './ChargeDtlsForm.component.html'
})
export class ChargeDtlsFormComponent extends FormComponent implements OnInit, AfterViewInit {
@ViewChild('CH_CHARGE_DESC', {static: false}) CH_CHARGE_DESC: ComboBoxComponent;
@ViewChild('CH_CHARGE_TYPE', {static: false}) CH_CHARGE_TYPE: ComboBoxComponent;
@ViewChild('CH_PARTY_TYPE', {static: false}) CH_PARTY_TYPE: ComboBoxComponent;
@ViewChild('CH_PARTY_NAME', {static: false}) CH_PARTY_NAME: ComboBoxComponent;
@ViewChild('CH_CURRENCY', {static: false}) CH_CURRENCY: ComboBoxComponent;
@ViewChild('CH_CHARGE_BASIS', {static: false}) CH_CHARGE_BASIS: ComboBoxComponent;
@ViewChild('CH_CHARGE_RATE', {static: false}) CH_CHARGE_RATE: TextBoxComponent;
@ViewChild('CH_CHARGE_AMT', {static: false}) CH_CHARGE_AMT: AmountComponent;
@ViewChild('CH_PERIODIC_CHARGE', {static: false}) CH_PERIODIC_CHARGE: ComboBoxComponent;
@ViewChild('CH_PRD_ST_DT', {static: false}) CH_PRD_ST_DT: DateComponent;
@ViewChild('CH_PRD_END_DT', {static: false}) CH_PRD_END_DT: DateComponent;
@ViewChild('CH_FREQ', {static: false}) CH_FREQ: ComboBoxComponent;
@ViewChild('CH_RT_CH_ON', {static: false}) CH_RT_CH_ON: ComboBoxComponent;
@ViewChild('CH_COLL', {static: false}) CH_COLL: ComboBoxComponent;
@ViewChild('CH_SAVE_BTN', {static: false}) CH_SAVE_BTN: ButtonComponent;
@ViewChild('CH_CANCEL_BTN', {static: false}) CH_CANCEL_BTN: ButtonComponent;
@ViewChild('CHARGE_DTLS_GRID', {static: false}) CHARGE_DTLS_GRID: ChargeDtlsGridComponent;
@ViewChild('Handler', {static: false}) Handler: ChargeHandlerComponent;
@ViewChild('hidAppId', {static: false}) hidAppId: HiddenComponent;
@ViewChild('hidChargeType', {static: false}) hidChargeType: HiddenComponent;
@ViewChild('hidCurrency', {static: false}) hidCurrency: HiddenComponent;
@ViewChild('hidYesNo', {static: false}) hidYesNo: HiddenComponent;
@ViewChild('hidFrequency', {static: false}) hidFrequency: HiddenComponent;
@ViewChild('hidRateCharge', {static: false}) hidRateCharge: HiddenComponent;
@ViewChild('hidChargeCollection', {static: false}) hidChargeCollection: HiddenComponent;
@ViewChild('hidPartyType', {static: false}) hidPartyType: HiddenComponent;
@ViewChild('hidChargeSeq', {static: false}) hidChargeSeq: HiddenComponent;
@ViewChild('hidChargeBasis', {static: false}) hidChargeBasis: HiddenComponent;
async revalidate(): Promise<number> {
var totalErrors = 0;
super.beforeRevalidate();
await Promise.all([
this.revalidateBasicField('CH_CHARGE_DESC'),
this.revalidateBasicField('CH_CHARGE_TYPE'),
this.revalidateBasicField('CH_PARTY_TYPE'),
this.revalidateBasicField('CH_PARTY_NAME'),
this.revalidateBasicField('CH_CURRENCY'),
this.revalidateBasicField('CH_CHARGE_BASIS'),
this.revalidateBasicField('CH_CHARGE_RATE'),
this.revalidateBasicField('CH_CHARGE_AMT'),
this.revalidateBasicField('CH_PERIODIC_CHARGE'),
this.revalidateBasicField('CH_PRD_ST_DT'),
this.revalidateBasicField('CH_PRD_END_DT'),
this.revalidateBasicField('CH_FREQ'),
this.revalidateBasicField('CH_RT_CH_ON'),
this.revalidateBasicField('CH_COLL'),
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
this.value = new ChargeDtlsFormModel();
this.componentCode = 'ChargeDtlsForm';
}
setReadOnly(readOnly){
super.setBasicFieldsReadOnly(readOnly);
}
async onFormLoad(){
this.setInputs(this.services.dataStore.getData(this.services.routing.currModal));
// this.CH_CHARGE_AMT.setFormatOptions({currencyCode: 'INR', languageCode: 'en-US', });
this.hidAppId.setValue('RLO');
this.hidChargeType.setValue('CHARGE_TYPE');
this.hidCurrency.setValue('CURRENCY');
this.hidYesNo.setValue('YES_NO');
this.hidFrequency.setValue('FREQUENCY');
this.hidRateCharge.setValue('RATE_CHARGE_ON');
this.hidChargeCollection.setValue('CHARGE_COLL');
this.hidPartyType.setValue('PARTY_TYPE');
this.hidChargeBasis.setValue('CHARGE_BASIS');
this.setDependencies();
await this.CHARGE_DTLS_GRID.gridDataLoad({});
await this.Handler.onFormLoad({});
}
setInputs(param : any){
let params = this.services.http.mapToJson(param);
if(params['mode']){
this.mode = params['mode'];
}
}
async submitForm(path, apiCode, serviceCode){
this.submitData['formName'] = 'Form for charge details';
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
this.value = new ChargeDtlsFormModel();
this.value.setValue(inputValue);
this.setDependencies();
this.passNewValue(this.value);
}
ngOnInit(){
if(this.formCode == undefined) {this.formCode = 'ChargeDtlsForm';}
if(this.formOnLoadError){return;}
var styleElement = document.createElement('style');
styleElement.type = 'text/css';
styleElement.innerHTML = customCss;
styleElement.id = 'ChargeDtlsForm_customCss';
document.getElementsByTagName('head')[0].appendChild(styleElement);
}
ngOnDestroy(){
this.unsubscribe$.next();
this.unsubscribe$.complete();
var styleElement = document.getElementById('ChargeDtlsForm_customCss');
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
this.value = new ChargeDtlsFormModel();
this.passNewValue(this.value);
this.setReadOnly(false);
this.onFormLoad();
}
async CH_SAVE_BTN_click(event){
let inputMap = new Map();
var numberOfErrors:number = await this.revalidate();
if(numberOfErrors==0){
if(this.hidChargeSeq.getFieldValue() != undefined){
inputMap.clear();
inputMap.set('PathParam.ChargeDtlSeq', this.hidChargeSeq.getFieldValue());
inputMap.set('Body.ChargeDetails.ChargeDescription', this.CH_CHARGE_DESC.getFieldValue());
inputMap.set('Body.ChargeDetails.ChargeType', this.CH_CHARGE_TYPE.getFieldValue());
inputMap.set('Body.ChargeDetails.PartyType', this.CH_PARTY_TYPE.getFieldValue());
inputMap.set('Body.ChargeDetails.PartyName', this.CH_PARTY_NAME.getFieldValue());
inputMap.set('Body.ChargeDetails.Currency', this.CH_CURRENCY.getFieldValue());
inputMap.set('Body.ChargeDetails.ChargeBasis', this.CH_CHARGE_BASIS.getFieldValue());
inputMap.set('Body.ChargeDetails.ChargeRate', this.CH_CHARGE_RATE.getFieldValue());
inputMap.set('Body.ChargeDetails.ChargeAmt', this.CH_CHARGE_AMT.getFieldValue());
inputMap.set('Body.ChargeDetails.PeriodicCharge', this.CH_PERIODIC_CHARGE.getFieldValue());
inputMap.set('Body.ChargeDetails.PeriodicStDt', this.CH_PRD_ST_DT.getFieldValue());
inputMap.set('Body.ChargeDetails.PeriodicEnDt', this.CH_PRD_END_DT.getFieldValue());
inputMap.set('Body.ChargeDetails.Frequency', this.CH_FREQ.getFieldValue());
inputMap.set('Body.ChargeDetails.RateOnCharge', this.CH_RT_CH_ON.getFieldValue());
inputMap.set('Body.ChargeDetails.ChargeCollection', this.CH_COLL.getFieldValue());
this.services.http.fetchApi('/ChargeDetails/{ChargeDtlSeq}', 'PUT', inputMap).subscribe(
async (httpResponse: HttpResponse<any>) => {
var res = httpResponse.body;
this.services.alert.showAlert(1, 'rlo.success.update.charge', 5000);
this.onReset();
},
async (httpError)=>{
var err = httpError['error']
if(err!=null && err['ErrorElementPath'] != undefined && err['ErrorDescription']!=undefined){
if(err['ErrorElementPath'] == 'ChargeDetails.ChargeCollection'){
this.CH_COLL.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'ChargeDetails.RateOnCharge'){
this.CH_RT_CH_ON.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'ChargeDetails.Frequency'){
this.CH_FREQ.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'ChargeDetails.PeriodicEnDt'){
this.CH_PRD_END_DT.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'ChargeDetails.PeriodicStDt'){
this.CH_PRD_ST_DT.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'ChargeDetails.PeriodicCharge'){
this.CH_PERIODIC_CHARGE.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'ChargeDetails.ChargeAmt'){
this.CH_CHARGE_AMT.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'ChargeDetails.ChargeRate'){
this.CH_CHARGE_RATE.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'ChargeDetails.ChargeBasis'){
this.CH_CHARGE_BASIS.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'ChargeDetails.Currency'){
this.CH_CURRENCY.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'ChargeDetails.PartyName'){
this.CH_PARTY_NAME.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'ChargeDetails.PartyType'){
this.CH_PARTY_TYPE.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'ChargeDetails.ChargeType'){
this.CH_CHARGE_TYPE.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'ChargeDetails.ChargeDescription'){
this.CH_CHARGE_DESC.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'ChargeDtlSeq'){
this.hidChargeSeq.setError(err['ErrorDescription']);
}
}
this.services.alert.showAlert(2, 'rlo.error.update.charge', -1);
}
);
}
else{
inputMap.clear();
inputMap.set('Body.ChargeDetails.ChargeDescription', this.CH_CHARGE_DESC.getFieldValue());
inputMap.set('Body.ChargeDetails.ChargeType', this.CH_CHARGE_TYPE.getFieldValue());
inputMap.set('Body.ChargeDetails.PartyType', this.CH_PARTY_TYPE.getFieldValue());
inputMap.set('Body.ChargeDetails.PartyName', this.CH_PARTY_NAME.getFieldValue());
inputMap.set('Body.ChargeDetails.Currency', this.CH_CURRENCY.getFieldValue());
inputMap.set('Body.ChargeDetails.ChargeBasis', this.CH_CHARGE_BASIS.getFieldValue());
inputMap.set('Body.ChargeDetails.ChargeRate', this.CH_CHARGE_RATE.getFieldValue());
inputMap.set('Body.ChargeDetails.ChargeAmt', this.CH_CHARGE_AMT.getFieldValue());
inputMap.set('Body.ChargeDetails.PeriodicCharge', this.CH_PERIODIC_CHARGE.getFieldValue());
inputMap.set('Body.ChargeDetails.PeriodicStDt', this.CH_PRD_ST_DT.getFieldValue());
inputMap.set('Body.ChargeDetails.PeriodicEnDt', this.CH_PRD_END_DT.getFieldValue());
inputMap.set('Body.ChargeDetails.Frequency', this.CH_FREQ.getFieldValue());
inputMap.set('Body.ChargeDetails.RateOnCharge', this.CH_RT_CH_ON.getFieldValue());
inputMap.set('Body.ChargeDetails.ChargeCollection', this.CH_COLL.getFieldValue());
this.services.http.fetchApi('/ChargeDetails', 'POST', inputMap).subscribe(
async (httpResponse: HttpResponse<any>) => {
var res = httpResponse.body;
this.services.alert.showAlert(1, 'rlo.success.save.charge', 5000);
this.onReset();
},
async (httpError)=>{
var err = httpError['error']
if(err!=null && err['ErrorElementPath'] != undefined && err['ErrorDescription']!=undefined){
if(err['ErrorElementPath'] == 'ChargeDetails.ChargeCollection'){
this.CH_COLL.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'ChargeDetails.RateOnCharge'){
this.CH_RT_CH_ON.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'ChargeDetails.Frequency'){
this.CH_FREQ.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'ChargeDetails.PeriodicEnDt'){
this.CH_PRD_END_DT.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'ChargeDetails.PeriodicStDt'){
this.CH_PRD_ST_DT.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'ChargeDetails.PeriodicCharge'){
this.CH_PERIODIC_CHARGE.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'ChargeDetails.ChargeAmt'){
this.CH_CHARGE_AMT.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'ChargeDetails.ChargeRate'){
this.CH_CHARGE_RATE.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'ChargeDetails.ChargeBasis'){
this.CH_CHARGE_BASIS.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'ChargeDetails.Currency'){
this.CH_CURRENCY.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'ChargeDetails.PartyName'){
this.CH_PARTY_NAME.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'ChargeDetails.PartyType'){
this.CH_PARTY_TYPE.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'ChargeDetails.ChargeType'){
this.CH_CHARGE_TYPE.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'ChargeDetails.ChargeDescription'){
this.CH_CHARGE_DESC.setError(err['ErrorDescription']);
}
}
this.services.alert.showAlert(2, 'rlo.error.save.charge', -1);
}
);
}
}
else{
this.services.alert.showAlert(2, 'rlo.error.invalid.form', -1);
}
}
async CHARGE_DTLS_GRID_chargeDtlsEdit(event){
let inputMap = new Map();
inputMap.clear();
inputMap.set('PathParam.ChargeDtlSeq', event.ChargeSeq);
this.services.http.fetchApi('/ChargeDetails/{ChargeDtlSeq}', 'GET', inputMap).subscribe(
async (httpResponse: HttpResponse<any>) => {
var res = httpResponse.body;
this.CH_CHARGE_DESC.setValue(res['ChargeDetails']['ChargeDescription']['id']);
this.CH_CHARGE_TYPE.setValue(res['ChargeDetails']['ChargeType']['id']);
this.CH_PARTY_TYPE.setValue(res['ChargeDetails']['PartyType']);
this.CH_PARTY_NAME.setValue(res['ChargeDetails']['PartyName']);
this.CH_CURRENCY.setValue(res['ChargeDetails']['Currency']);
this.CH_CHARGE_BASIS.setValue(res['ChargeDetails']['ChargeBasis']['id']);
this.CH_CHARGE_RATE.setValue(res['ChargeDetails']['ChargeRate']);
this.CH_CHARGE_AMT.setValue(res['ChargeDetails']['ChargeAmt']);
this.CH_PERIODIC_CHARGE.setValue(res['ChargeDetails']['PeriodicCharge']['id']);
this.CH_PRD_ST_DT.setValue(res['ChargeDetails']['PeriodicStDt']);
this.CH_PRD_END_DT.setValue(res['ChargeDetails']['PeriodicEnDt']);
this.CH_FREQ.setValue(res['ChargeDetails']['Frequency']['id']);
this.CH_RT_CH_ON.setValue(res['ChargeDetails']['RateOnCharge']['id']);
this.CH_COLL.setValue(res['ChargeDetails']['ChargeCollection']['id']);
this.hidChargeSeq.setValue(res['ChargeDetails']['ChargeDtlSeq']);
},
async (httpError)=>{
var err = httpError['error']
if(err!=null && err['ErrorElementPath'] != undefined && err['ErrorDescription']!=undefined){
}
this.services.alert.showAlert(2, 'rlo.error.wrong.form', -1);
}
);
}
fieldDependencies = {
CH_CHARGE_TYPE: {
inDep: [

{paramKey: "VALUE1", depFieldID: "CH_CHARGE_TYPE", paramType:"PathParam"},
{paramKey: "KEY1", depFieldID: "hidChargeType", paramType:"QueryParam"},
{paramKey: "APPID", depFieldID: "hidAppId", paramType:"QueryParam"},
],
outDep: [
]},
CH_PARTY_TYPE: {
inDep: [

{paramKey: "VALUE1", depFieldID: "CH_PARTY_TYPE", paramType:"PathParam"},
{paramKey: "APPID", depFieldID: "hidAppId", paramType:"QueryParam"},
{paramKey: "KEY1", depFieldID: "hidPartyType", paramType:"QueryParam"},
],
outDep: [
]},
CH_CURRENCY: {
inDep: [

{paramKey: "VALUE1", depFieldID: "CH_CURRENCY", paramType:"PathParam"},
{paramKey: "KEY1", depFieldID: "hidCurrency", paramType:"QueryParam"},
{paramKey: "APPID", depFieldID: "hidAppId", paramType:"QueryParam"},
],
outDep: [
]},
CH_CHARGE_BASIS: {
inDep: [

{paramKey: "VALUE1", depFieldID: "CH_CHARGE_BASIS", paramType:"PathParam"},
{paramKey: "KEY1", depFieldID: "hidChargeBasis", paramType:"QueryParam"},
{paramKey: "APPID", depFieldID: "hidAppId", paramType:"QueryParam"},
],
outDep: [
]},
CH_PERIODIC_CHARGE: {
inDep: [

{paramKey: "VALUE1", depFieldID: "CH_PERIODIC_CHARGE", paramType:"PathParam"},
{paramKey: "APPID", depFieldID: "hidAppId", paramType:"QueryParam"},
{paramKey: "KEY1", depFieldID: "hidYesNo", paramType:"QueryParam"},
],
outDep: [
]},
CH_FREQ: {
inDep: [

{paramKey: "VALUE1", depFieldID: "CH_FREQ", paramType:"PathParam"},
{paramKey: "APPID", depFieldID: "hidAppId", paramType:"QueryParam"},
{paramKey: "KEY1", depFieldID: "hidFrequency", paramType:"QueryParam"},
],
outDep: [
]},
CH_RT_CH_ON: {
inDep: [

{paramKey: "VALUE1", depFieldID: "CH_RT_CH_ON", paramType:"PathParam"},
{paramKey: "APPID", depFieldID: "hidAppId", paramType:"QueryParam"},
{paramKey: "KEY1", depFieldID: "hidRateCharge", paramType:"QueryParam"},
],
outDep: [
]},
CH_COLL: {
inDep: [

{paramKey: "VALUE1", depFieldID: "CH_COLL", paramType:"PathParam"},
{paramKey: "KEY1", depFieldID: "hidChargeCollection", paramType:"QueryParam"},
{paramKey: "APPID", depFieldID: "hidAppId", paramType:"QueryParam"},
],
outDep: [
]},
}

}
