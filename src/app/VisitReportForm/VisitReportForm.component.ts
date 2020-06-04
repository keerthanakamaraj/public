import { Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import { VisitReportFormModel } from './VisitReportForm.model';
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
import { VisitReportGridComponent } from '../VisitReportGrid/VisitReportGrid.component';
import { VisitReportHandlerComponent } from '../VisitReportForm/visitreport-handler.component';
import { RLOUIRadioComponent } from '../rlo-ui-radio/rlo-ui-radio.component';

const customCss: string = '';

@Component({
selector: 'app-VisitReportForm',
templateUrl: './VisitReportForm.component.html'
})
export class VisitReportFormComponent extends FormComponent implements OnInit, AfterViewInit {
@ViewChild('VRF_ReportType', {static: false}) VRF_ReportType: RLOUIRadioComponent;
@ViewChild('VRF_DateOfVisit', {static: false}) VRF_DateOfVisit: DateComponent;
@ViewChild('VRF_AddressofVisit', {static: false}) VRF_AddressofVisit: TextAreaComponent;
@ViewChild('VRF_OfficialName', {static: false}) VRF_OfficialName: ComboBoxComponent;
@ViewChild('VRF_NameofPersonMet', {static: false}) VRF_NameofPersonMet: TextBoxComponent;
@ViewChild('VRF_Designation', {static: false}) VRF_Designation: TextBoxComponent;
//@ViewChild('VRF_OfficialId', {static: false}) VRF_OfficialId: ComboBoxComponent;
@ViewChild('VRF_OfficialBusinessGroup', {static: false}) VRF_OfficialBusinessGroup: ComboBoxComponent;
@ViewChild('VRF_PlaceOfVisit', {static: false}) VRF_PlaceOfVisit: TextAreaComponent;
@ViewChild('VRF_Photograph', {static: false}) VRF_Photograph: RLOUIRadioComponent;
@ViewChild('VRF_AdverseObservation', {static: false}) VRF_AdverseObservation: RLOUIRadioComponent;
@ViewChild('VRF_Observations', {static: false}) VRF_Observations: TextAreaComponent;
@ViewChild('VRF_Save', {static: false}) VRF_Save: ButtonComponent;
@ViewChild('VRF_Reset', {static: false}) VRF_Reset: ButtonComponent;
@ViewChild('Visit_Report_Grid', {static: false}) Visit_Report_Grid: VisitReportGridComponent;
@ViewChild('Handler', {static: false}) Handler: VisitReportHandlerComponent;
@ViewChild('HidAnyObservation', {static: false}) HidAnyObservation: HiddenComponent;
@ViewChild('HidAppid', {static: false}) HidAppid: HiddenComponent;
@ViewChild('HidAttachPhoto', {static: false}) HidAttachPhoto: HiddenComponent;
@ViewChild('HidOfficialBusGroup', {static: false}) HidOfficialBusGroup: HiddenComponent;
//@ViewChild('HidOfficialId', {static: false}) HidOfficialId: HiddenComponent;
@ViewChild('HidOfficialName', {static: false}) HidOfficialName: HiddenComponent;
@ViewChild('HidReportType', {static: false}) HidReportType: HiddenComponent;
@ViewChild('HidVisitReportSeqId', {static: false}) HidVisitReportSeqId: HiddenComponent;

@Input() ApplicationId: string = undefined;

async revalidate(): Promise<number> {
var totalErrors = 0;
super.beforeRevalidate();
await Promise.all([
this.revalidateBasicField('VRF_ReportType'),
this.revalidateBasicField('VRF_DateOfVisit'),
this.revalidateBasicField('VRF_AddressofVisit'),
this.revalidateBasicField('VRF_OfficialName'),
this.revalidateBasicField('VRF_NameofPersonMet'),
this.revalidateBasicField('VRF_Designation'),
//this.revalidateBasicField('VRF_OfficialId'),
this.revalidateBasicField('VRF_OfficialBusinessGroup'),
this.revalidateBasicField('VRF_PlaceOfVisit'),
this.revalidateBasicField('VRF_Photograph'),
this.revalidateBasicField('VRF_AdverseObservation'),
this.revalidateBasicField('VRF_Observations'),
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
this.value = new VisitReportFormModel();
this.componentCode = 'VisitReportForm';
}
setReadOnly(readOnly){
super.setBasicFieldsReadOnly(readOnly);
}
async onFormLoad(){
this.setInputs(this.services.dataStore.getData(this.services.routing.currModal));
this.HidAnyObservation.setValue('YES_NO');
this.HidAppid.setValue('RLO');
this.HidAttachPhoto.setValue('YES_NO');
this.HidOfficialBusGroup.setValue('OFFICIAL_BUSINESS_GROUP');
//this.HidOfficialId.setValue('OFFICIAL_ID');
this.HidOfficialName.setValue('OFFICIAL_NAME');
this.HidReportType.setValue('REPORT_TYPE');
let inputMap = new Map();
this.VRF_Photograph.setDefault('N');
this.VRF_AdverseObservation.setDefault('N');
await this.Visit_Report_Grid.gridDataLoad({
    'VisitReportSeqToGrid' :this.ApplicationId,
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
this.submitData['formName'] = 'Visit Report Form';
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
this.value = new VisitReportFormModel();
this.value.setValue(inputValue);
this.setDependencies();
this.passNewValue(this.value);
}
ngOnInit(){
if(this.formCode == undefined) {this.formCode = 'VisitReportForm';}
if(this.formOnLoadError){return;}
var styleElement = document.createElement('style');
styleElement.type = 'text/css';
styleElement.innerHTML = customCss;
styleElement.id = 'VisitReportForm_customCss';
document.getElementsByTagName('head')[0].appendChild(styleElement);
}
ngOnDestroy(){
this.unsubscribe$.next();
this.unsubscribe$.complete();
var styleElement = document.getElementById('VisitReportForm_customCss');
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
this.value = new VisitReportFormModel();
this.passNewValue(this.value);
this.setReadOnly(false);
this.onFormLoad();
}
async VRF_Save_click(event){
let inputMap = new Map();
var numberOfErrors:number = await this.revalidate();
if(numberOfErrors==0){
if(this.HidVisitReportSeqId.getFieldValue() != undefined){
inputMap.clear();
inputMap.set('PathParam.VisitReportSeq', this.HidVisitReportSeqId.getFieldValue());
inputMap.set('Body.VisitReportDetails.ReportType', this.VRF_ReportType.getFieldValue());
inputMap.set('Body.VisitReportDetails.DateOfVisit', this.VRF_DateOfVisit.getFieldValue());
inputMap.set('Body.VisitReportDetails.AddressOfVisit', this.VRF_AddressofVisit.getFieldValue());
inputMap.set('Body.VisitReportDetails.OfficialName', this.VRF_OfficialName.getFieldValue());
inputMap.set('Body.VisitReportDetails.PersonMet', this.VRF_NameofPersonMet.getFieldValue());
inputMap.set('Body.VisitReportDetails.PersonMetDesgn', this.VRF_Designation.getFieldValue());
inputMap.set('Body.VisitReportDetails.OfficialBusiGroup', this.VRF_OfficialBusinessGroup.getFieldValue());
inputMap.set('Body.VisitReportDetails.PlaceOfVisit', this.VRF_PlaceOfVisit.getFieldValue());
inputMap.set('Body.VisitReportDetails.PhotoTaken', this.VRF_Photograph.getFieldValue());
inputMap.set('Body.VisitReportDetails.AdverseObservations', this.VRF_AdverseObservation.getFieldValue());
//inputMap.set('Body.VisitReportDetails.OfficialId', this.VRF_OfficialId.getFieldValue());
inputMap.set('Body.VisitReportDetails.Observations', this.VRF_Observations.getFieldValue());
this.services.http.fetchApi('/VisitReportDetails/{VisitReportSeq}', 'PUT', inputMap).subscribe(
async (httpResponse: HttpResponse<any>) => {
var res = httpResponse.body;
this.services.alert.showAlert(1, 'rlo.success.update.visitreport', 5000);
this.onReset();
},
async (httpError)=>{
var err = httpError['error']
if(err!=null && err['ErrorElementPath'] != undefined && err['ErrorDescription']!=undefined){
if(err['ErrorElementPath'] == 'VisitReportDetails.Observations'){
this.VRF_Observations.setError(err['ErrorDescription']);
}
// else if(err['ErrorElementPath'] == 'VisitReportDetails.OfficialId'){
// this.VRF_OfficialId.setError(err['ErrorDescription']);
// }
else if(err['ErrorElementPath'] == 'VisitReportDetails.AdverseObservations'){
this.VRF_AdverseObservation.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'VisitReportDetails.PhotoTaken'){
this.VRF_Photograph.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'VisitReportDetails.PlaceOfVisit'){
this.VRF_PlaceOfVisit.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'VisitReportDetails.OfficialBusiGroup'){
this.VRF_OfficialBusinessGroup.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'VisitReportDetails.PersonMetDesgn'){
this.VRF_Designation.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'VisitReportDetails.PersonMet'){
this.VRF_NameofPersonMet.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'VisitReportDetails.OfficialName'){
this.VRF_OfficialName.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'VisitReportDetails.AddressOfVisit'){
this.VRF_AddressofVisit.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'VisitReportDetails.DateOfVisit'){
this.VRF_DateOfVisit.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'VisitReportDetails.ReportType'){
this.VRF_ReportType.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'VisitReportSeq'){
this.HidVisitReportSeqId.setError(err['ErrorDescription']);
}
}
this.services.alert.showAlert(2, 'rlo.error.update.visitreport', -1);
}
);
}
else{
inputMap.clear();
inputMap.set('Body.VisitReportDetails.ReportType', this.VRF_ReportType.getFieldValue());
inputMap.set('Body.VisitReportDetails.DateOfVisit', this.VRF_DateOfVisit.getFieldValue());
inputMap.set('Body.VisitReportDetails.AddressOfVisit', this.VRF_AddressofVisit.getFieldValue());
inputMap.set('Body.VisitReportDetails.OfficialName', this.VRF_OfficialName.getFieldValue());
inputMap.set('Body.VisitReportDetails.PersonMet', this.VRF_NameofPersonMet.getFieldValue());
//inputMap.set('Body.VisitReportDetails.OfficialId', this.VRF_OfficialId.getFieldValue());
inputMap.set('Body.VisitReportDetails.PersonMetDesgn', this.VRF_Designation.getFieldValue());
inputMap.set('Body.VisitReportDetails.OfficialBusiGroup', this.VRF_OfficialBusinessGroup.getFieldValue());
inputMap.set('Body.VisitReportDetails.PlaceOfVisit', this.VRF_PlaceOfVisit.getFieldValue());
inputMap.set('Body.VisitReportDetails.PhotoTaken', this.VRF_Photograph.getFieldValue());
inputMap.set('Body.VisitReportDetails.AdverseObservations', this.VRF_AdverseObservation.getFieldValue());
inputMap.set('Body.VisitReportDetails.Observations', this.VRF_Observations.getFieldValue());
this.services.http.fetchApi('/VisitReportDetails', 'POST', inputMap).subscribe(
async (httpResponse: HttpResponse<any>) => {
var res = httpResponse.body;
this.services.alert.showAlert(1, 'rlo.success.save.visitreport', 5000);
this.onReset();
},
async (httpError)=>{
var err = httpError['error']
if(err!=null && err['ErrorElementPath'] != undefined && err['ErrorDescription']!=undefined){
if(err['ErrorElementPath'] == 'VisitReportDetails.Observations'){
this.VRF_Observations.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'VisitReportDetails.AdverseObservations'){
this.VRF_AdverseObservation.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'VisitReportDetails.PhotoTaken'){
this.VRF_Photograph.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'VisitReportDetails.PlaceOfVisit'){
this.VRF_PlaceOfVisit.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'VisitReportDetails.OfficialBusiGroup'){
this.VRF_OfficialBusinessGroup.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'VisitReportDetails.PersonMetDesgn'){
this.VRF_Designation.setError(err['ErrorDescription']);
}
// else if(err['ErrorElementPath'] == 'VisitReportDetails.OfficialId'){
// this.VRF_OfficialId.setError(err['ErrorDescription']);
// }
else if(err['ErrorElementPath'] == 'VisitReportDetails.PersonMet'){
this.VRF_NameofPersonMet.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'VisitReportDetails.OfficialName'){
this.VRF_OfficialName.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'VisitReportDetails.AddressOfVisit'){
this.VRF_AddressofVisit.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'VisitReportDetails.DateOfVisit'){
this.VRF_DateOfVisit.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'VisitReportDetails.ReportType'){
this.VRF_ReportType.setError(err['ErrorDescription']);
}
}
this.services.alert.showAlert(2, 'rlo.error.save.visitreport', -1);
}
);
}
}
else{
this.services.alert.showAlert(2, 'rlo.error.invalid.form', -1);
}
}
async Visit_Report_Grid_modifyVisitReport(event){
let inputMap = new Map();
this.showSpinner();
inputMap.clear();
inputMap.set('PathParam.VisitReportSeq', event.VisitReortKey);
this.services.http.fetchApi('/VisitReportDetails/{VisitReportSeq}', 'GET', inputMap).subscribe(
async (httpResponse: HttpResponse<any>) => {
var res = httpResponse.body;
this.VRF_ReportType.setValue(res['VisitReportDetails']['ReportType']);
this.VRF_DateOfVisit.setValue(res['VisitReportDetails']['DateOfVisit']);
this.VRF_AddressofVisit.setValue(res['VisitReportDetails']['AddressOfVisit']);
this.VRF_OfficialName.setValue(res['VisitReportDetails']['OfficialName']);
this.VRF_NameofPersonMet.setValue(res['VisitReportDetails']['PersonMet']);
this.VRF_Designation.setValue(res['VisitReportDetails']['PersonMetDesgn']);
this.VRF_OfficialBusinessGroup.setValue(res['VisitReportDetails']['OfficialBusiGroup']);
this.VRF_PlaceOfVisit.setValue(res['VisitReportDetails']['PlaceOfVisit']);
this.VRF_Photograph.setValue(res['VisitReportDetails']['PhotoTaken']);
this.VRF_AdverseObservation.setValue(res['VisitReportDetails']['AdverseObservations']);
this.VRF_Observations.setValue(res['VisitReportDetails']['Observations']);
//this.VRF_OfficialId.setValue(res['VisitReportDetails']['OfficialId']);
this.HidVisitReportSeqId.setValue(res['VisitReportDetails']['VisitReportSeq']);
},
async (httpError)=>{
var err = httpError['error']
if(err!=null && err['ErrorElementPath'] != undefined && err['ErrorDescription']!=undefined){
}
this.hideSpinner();
this.services.alert.showAlert(2, 'rlo.error.load.form', -1);
this.hideSpinner();
}
);
}
fieldDependencies = {
VRF_ReportType: {
inDep: [

{paramKey: "VALUE1", depFieldID: "VRF_ReportType", paramType:"PathParam"},
{paramKey: "APPID", depFieldID: "HidAppid", paramType:"QueryParam"},
{paramKey: "KEY1", depFieldID: "HidReportType", paramType:"QueryParam"},
],
outDep: [
]},
VRF_OfficialName: {
inDep: [

{paramKey: "VALUE1", depFieldID: "VRF_OfficialName", paramType:"PathParam"},
{paramKey: "KEY1", depFieldID: "HidOfficialName", paramType:"QueryParam"},
{paramKey: "APPID", depFieldID: "HidAppid", paramType:"QueryParam"},
],
outDep: [
]},
// VRF_OfficialId: {
// inDep: [

// {paramKey: "VALUE1", depFieldID: "VRF_OfficialId", paramType:"PathParam"},
// {paramKey: "APPID", depFieldID: "HidAppid", paramType:"QueryParam"},
// {paramKey: "KEY1", depFieldID: "HidOfficialId", paramType:"QueryParam"},
// ],
// outDep: [
// ]},
VRF_OfficialBusinessGroup: {
inDep: [

{paramKey: "VALUE1", depFieldID: "VRF_OfficialBusinessGroup", paramType:"PathParam"},
{paramKey: "APPID", depFieldID: "HidAppid", paramType:"QueryParam"},
{paramKey: "KEY1", depFieldID: "HidOfficialBusGroup", paramType:"QueryParam"},
],
outDep: [
]},
VRF_Photograph: {
inDep: [

{paramKey: "VALUE1", depFieldID: "VRF_Photograph", paramType:"PathParam"},
{paramKey: "APPID", depFieldID: "HidAppid", paramType:"QueryParam"},
{paramKey: "KEY1", depFieldID: "HidAttachPhoto", paramType:"QueryParam"},
],
outDep: [
]},
VRF_AdverseObservation: {
inDep: [

{paramKey: "VALUE1", depFieldID: "VRF_AdverseObservation", paramType:"PathParam"},
{paramKey: "APPID", depFieldID: "HidAppid", paramType:"QueryParam"},
{paramKey: "KEY1", depFieldID: "HidAnyObservation", paramType:"QueryParam"},
],
outDep: [
]},
}

}