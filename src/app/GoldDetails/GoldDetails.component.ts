import { Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import { GoldDetailsModel } from './GoldDetails.model';
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
import { GoldDetailsGridComponent } from '../GoldDetailsGrid/GoldDetailsGrid.component';
import { GoldDetailsHandlerComponent } from './gold-handler.component';

const customCss: string = '';

@Component({
selector: 'app-GoldDetails',
templateUrl: './GoldDetails.component.html'
})
export class GoldDetailsComponent extends FormComponent implements OnInit, AfterViewInit {
@ViewChild('GoldOrnamentType', {static: false}) GoldOrnamentType: ComboBoxComponent;
@ViewChild('Karat', {static: false}) Karat: TextBoxComponent;
@ViewChild('Weight', {static: false}) Weight: TextBoxComponent;
@ViewChild('Currency', {static: false}) Currency: ComboBoxComponent;
@ViewChild('Value', {static: false}) Value: TextBoxComponent;
@ViewChild('Count', {static: false}) Count: TextBoxComponent;
@ViewChild('LocalCurrencyEquivalent', {static: false}) LocalCurrencyEquivalent: TextBoxComponent;
@ViewChild('MarketRate', {static: false}) MarketRate: TextBoxComponent;
@ViewChild('DateofMarketRateCapture', {static: false}) DateofMarketRateCapture: DateComponent;
@ViewChild('AdditionalRemarks', {static: false}) AdditionalRemarks: TextBoxComponent;
@ViewChild('GOLD_Save', {static: false}) GOLD_Save: ButtonComponent;
@ViewChild('GOLD_Clear', {static: false}) GOLD_Clear: ButtonComponent;
@ViewChild('FieldId_16', {static: false}) FieldId_16: GoldDetailsGridComponent;
@ViewChild('Handler', { static: false }) Handler: GoldDetailsHandlerComponent;
@ViewChild('HidAppId', { static: false }) HidAppId: HiddenComponent;
@ViewChild('HidGoldOType', { static: false }) HidGoldOType: HiddenComponent;

async revalidate(): Promise<number> {
var totalErrors = 0;
super.beforeRevalidate();
await Promise.all([
this.revalidateBasicField('GoldOrnamentType'),
this.revalidateBasicField('Karat'),
this.revalidateBasicField('Weight'),
this.revalidateBasicField('Currency'),
this.revalidateBasicField('Value'),
this.revalidateBasicField('Count'),
this.revalidateBasicField('LocalCurrencyEquivalent'),
this.revalidateBasicField('MarketRate'),
this.revalidateBasicField('DateofMarketRateCapture'),
this.revalidateBasicField('AdditionalRemarks'),
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
this.value = new GoldDetailsModel();
this.componentCode = 'GoldDetails';
}
setReadOnly(readOnly){
super.setBasicFieldsReadOnly(readOnly);
}
async onFormLoad(){
this.setInputs(this.services.dataStore.getData(this.services.routing.currModal));
this.HidAppId.setValue('RLO');
this.HidGoldOType.setValue('GoldOType');
this.setDependencies();
await this.Handler.onFormLoad({});
}
setInputs(param : any){
let params = this.services.http.mapToJson(param);
if(params['mode']){
this.mode = params['mode'];
}
}
async submitForm(path, apiCode, serviceCode){
this.submitData['formName'] = 'GoldDetails';
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
this.FieldId_16.setValue(inputValue['FieldId_16']);
this.value = new GoldDetailsModel();
this.value.setValue(inputValue);
this.setDependencies();
this.passNewValue(this.value);
}
ngOnInit(){
if(this.formCode == undefined) {this.formCode = 'GoldDetails';}
if(this.formOnLoadError){return;}
var styleElement = document.createElement('style');
styleElement.type = 'text/css';
styleElement.innerHTML = customCss;
styleElement.id = 'GoldDetails_customCss';
document.getElementsByTagName('head')[0].appendChild(styleElement);
}
ngOnDestroy(){
this.unsubscribe$.next();
this.unsubscribe$.complete();
var styleElement = document.getElementById('GoldDetails_customCss');
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
this.value = new GoldDetailsModel();
this.passNewValue(this.value);
this.setReadOnly(false);
this.onFormLoad();
}
fieldDependencies = {
    Currency: {
        inDep: [

            { paramKey: "CurrencySrc", depFieldID: "Currency", paramType: "PathParam" },
            // { paramKey: "CurrencyDest", depFieldID: "hideCurrencyDesc", paramType: "QueryParam" },
        ],
        outDep: [
            { paramKey: "MstCurrencyDetails.ExchangeRate", depFieldID: "hidExchangeRate" },
        ]
    },
    GoldOrnamentType: {
        inDep: [

            { paramKey: "VALUE1", depFieldID: "GoldOrnamentType", paramType: "PathParam" },
            { paramKey: "APPID", depFieldID: "HidAppId", paramType: "QueryParam" },
            { paramKey: "KEY1", depFieldID: "HidGoldOType", paramType: "QueryParam" },
        ],
        outDep: [
        ]
    }
}

}