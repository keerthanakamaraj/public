import { Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import { VehicleDetailsModel } from './VehicleDetails.model';
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
import { VehicleIPGridComponent } from '../VehicleIPGrid/VehicleIPGrid.component';
import { VehicleDetailsHandlerComponent } from './vehicle-handler.component';


const customCss: string = '';

@Component({
    selector: 'app-VehicleDetails',
    templateUrl: './VehicleDetails.component.html'
})
export class VehicleDetailsComponent extends FormComponent implements OnInit, AfterViewInit {
    @ViewChild('VehicleCategory', { static: false }) VehicleCategory: ComboBoxComponent;
    @ViewChild('Manufacturer', { static: false }) Manufacturer: ComboBoxComponent;
    @ViewChild('Make', { static: false }) Make: ComboBoxComponent;
    @ViewChild('Variant', { static: false }) Variant: ComboBoxComponent;
    @ViewChild('Model', { static: false }) Model: ComboBoxComponent;
    @ViewChild('AssetType', { static: false }) AssetType: ComboBoxComponent;
    @ViewChild('AssetLife', { static: false }) AssetLife: TextBoxComponent;
    @ViewChild('NameoftheDealer', { static: false }) NameoftheDealer: ComboBoxComponent;
    @ViewChild('DealerCode', { static: false }) DealerCode: TextBoxComponent;
    @ViewChild('FieldId_13', { static: false }) FieldId_13: VehicleIPGridComponent;
    @ViewChild('Currency', { static: false }) Currency: ComboBoxComponent;
    @ViewChild('FundsbyCustomer', { static: false }) FundsbyCustomer: TextBoxComponent;
    @ViewChild('LocalCurrencyEquivalent', { static: false }) LocalCurrencyEquivalent: TextBoxComponent;
    @ViewChild('LoanRequired', { static: false }) LoanRequired: ComboBoxComponent;
    @ViewChild('Vehicle_Save', { static: false }) Vehicle_Save: ButtonComponent;
    @ViewChild('Vehicle_clear', { static: false }) Vehicle_clear: ButtonComponent;
    @ViewChild('Handler', { static: false }) Handler: VehicleDetailsHandlerComponent;
    @ViewChild('HidAppId', { static: false }) HidAppId: HiddenComponent;
    @ViewChild('HidVehicleCategory', { static: false }) HidVehicleCategory: HiddenComponent;
    @ViewChild('HidMake', { static: false }) HidMake: HiddenComponent;
    @ViewChild('HidVariant', { static: false }) HidVariant: HiddenComponent;
    @ViewChild('HidModel', { static: false }) HidModel: HiddenComponent;
    @ViewChild('HidVAssetType', { static: false }) HidVAssetType: HiddenComponent;

    async revalidate(): Promise<number> {
        var totalErrors = 0;
        super.beforeRevalidate();
        await Promise.all([
            this.revalidateBasicField('VehicleCategory'),
            this.revalidateBasicField('Manufacturer'),
            this.revalidateBasicField('Make'),
            this.revalidateBasicField('Variant'),
            this.revalidateBasicField('Model'),
            this.revalidateBasicField('AssetType'),
            this.revalidateBasicField('AssetLife'),
            this.revalidateBasicField('NameoftheDealer'),
            this.revalidateBasicField('DealerCode'),
            this.FieldId_13.revalidate(),
            this.revalidateBasicField('Currency'),
            this.revalidateBasicField('FundsbyCustomer'),
            this.revalidateBasicField('LocalCurrencyEquivalent'),
            this.revalidateBasicField('LoanRequired'),
        ]).then((errorCounts) => {
            errorCounts.forEach((errorCount) => {
                totalErrors += errorCount;
            });
        });
        this.errors = totalErrors;
        super.afterRevalidate();
        return totalErrors;
    }
    constructor(services: ServiceStock) {
        super(services);
        this.value = new VehicleDetailsModel();
        this.componentCode = 'VehicleDetails';
    }
    setReadOnly(readOnly) {
        super.setBasicFieldsReadOnly(readOnly);
        this.FieldId_13.setReadOnly(readOnly);
    }
    async onFormLoad() {
        this.setInputs(this.services.dataStore.getData(this.services.routing.currModal));
        this.DealerCode.setReadOnly(true);
        this.LocalCurrencyEquivalent.setReadOnly(true);
        this.HidAppId.setValue('RLO');
        this.HidVehicleCategory.setValue('Vehicle_Category');
        this.HidMake.setValue('Make');
        this.HidVariant.setValue('Variant');
        this.HidModel.setValue('Model');
        this.HidVAssetType.setValue('V_AssetType');
        this.setDependencies();
        await this.Handler.onFormLoad({
        });
    }
    setInputs(param: any) {
        let params = this.services.http.mapToJson(param);
        if (params['mode']) {
            this.mode = params['mode'];
        }
    }
    async submitForm(path, apiCode, serviceCode) {
        this.submitData['formName'] = 'VehicleDetails';
        await super.submit(path, apiCode, serviceCode);
    }
    getFieldInfo() {
        this.amountComponent.forEach(field => { this.additionalInfo[field.fieldID + '_desc'] = field.getFieldInfo(); });
        this.comboFields.forEach(field => { this.additionalInfo[field.fieldID + '_desc'] = field.getFieldInfo(); });
        this.fileUploadFields.forEach(field => { this.additionalInfo[field.fieldID + '_desc'] = field.getFieldInfo(); });
        this.additionalInfo['FieldId_13_desc'] = this.FieldId_13.getFieldInfo();
        return this.additionalInfo;
    }
    getFieldValue() {
        this.value.FieldId_13 = this.FieldId_13.getFieldValue();
        return this.value;
    }
    setValue(inputValue, inputDesc = undefined) {
        this.setBasicFieldsValue(inputValue, inputDesc);
        this.FieldId_13.setValue(inputValue['FieldId_13'], inputDesc['FieldId_13_desc']);
        this.value = new VehicleDetailsModel();
        this.value.setValue(inputValue);
        this.setDependencies();
        this.passNewValue(this.value);
    }
    ngOnInit() {
        if (this.formCode == undefined) { this.formCode = 'VehicleDetails'; }
        if (this.formOnLoadError) { return; }
        var styleElement = document.createElement('style');
        styleElement.type = 'text/css';
        styleElement.innerHTML = customCss;
        styleElement.id = 'VehicleDetails_customCss';
        document.getElementsByTagName('head')[0].appendChild(styleElement);
    }
    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
        var styleElement = document.getElementById('VehicleDetails_customCss');
        styleElement.parentNode.removeChild(styleElement);
    }
    ngAfterViewInit() {
        setTimeout(() => {
            this.subsBFldsValueUpdates();
            this.value.FieldId_13 = this.FieldId_13.getFieldValue();
            this.FieldId_13.valueChangeUpdates().subscribe((value) => { this.value.FieldId_13 = value; });
            this.onFormLoad();
            this.checkForHTabOverFlow();
        });
    }
    clearError() {
        super.clearBasicFieldsError();
        super.clearHTabErrors();
        super.clearVTabErrors();
        this.FieldId_13.clearError();
        this.errors = 0;
        this.errorMessage = [];
    }
    onReset() {
        super.resetBasicFields();
        this.FieldId_13.onReset();
        this.clearHTabErrors();
        this.clearVTabErrors();
        this.errors = 0;
        this.errorMessage = [];
        this.additionalInfo = undefined;
        this.dependencyMap.clear();
        this.value = new VehicleDetailsModel();
        this.passNewValue(this.value);
        this.setReadOnly(false);
        this.onFormLoad();
    }
    fieldDependencies = {
        VehicleCategory: {
            inDep: [

                { paramKey: "VALUE1", depFieldID: "VehicleCategory", paramType: "PathParam" },
                { paramKey: "APPID", depFieldID: "HidAppId", paramType: "QueryParam" },
                { paramKey: "KEY1", depFieldID: "HidVehicleCategory", paramType: "QueryParam" },
            ],
            outDep: [
            ]
        }, 
        Make: {
            inDep: [

                { paramKey: "VALUE1", depFieldID: "Make", paramType: "PathParam" },
                { paramKey: "APPID", depFieldID: "HidAppId", paramType: "QueryParam" },
                { paramKey: "KEY1", depFieldID: "HidMake", paramType: "QueryParam" },
            ],
            outDep: [
            ]
        },
        Variant: {
            inDep: [

                { paramKey: "VALUE1", depFieldID: "Variant", paramType: "PathParam" },
                { paramKey: "APPID", depFieldID: "HidAppId", paramType: "QueryParam" },
                { paramKey: "KEY1", depFieldID: "HidVariant", paramType: "QueryParam" },
            ],
            outDep: [
            ]
        },
        Model: {
            inDep: [

                { paramKey: "VALUE1", depFieldID: "Model", paramType: "PathParam" },
                { paramKey: "APPID", depFieldID: "HidAppId", paramType: "QueryParam" },
                { paramKey: "KEY1", depFieldID: "HidModel", paramType: "QueryParam" },
            ],
            outDep: [
            ]
        },
        AssetType: {
            inDep: [

                { paramKey: "VALUE1", depFieldID: "AssetType", paramType: "PathParam" },
                { paramKey: "APPID", depFieldID: "HidAppId", paramType: "QueryParam" },
                { paramKey: "KEY1", depFieldID: "HidVAssetType", paramType: "QueryParam" },
            ],
            outDep: [
            ]
        },
        Currency: {
            inDep: [

                { paramKey: "CurrencySrc", depFieldID: "Currency", paramType: "PathParam" },
                // { paramKey: "CurrencyDest", depFieldID: "hideCurrencyDesc", paramType: "QueryParam" },
            ],
            outDep: [
                { paramKey: "MstCurrencyDetails.ExchangeRate", depFieldID: "hidExchangeRate" },
            ]
        }
    }

}