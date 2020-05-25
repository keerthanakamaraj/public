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
import { AssetDetailsGridComponent } from '../AssetDetailsGrid/AssetDetailsGrid.component';
import { AssetsHandlerComponent } from '../AssetDetailsForm/assets-handler.component';

const customCss: string = '';

@Component({
    selector: 'app-AssetDetailsForm',
    templateUrl: './AssetDetailsForm.component.html'
})
export class AssetDetailsFormComponent extends FormComponent implements OnInit, AfterViewInit {
    assetBorrowerSeq: any;
    @ViewChild('AT_ASSET_TYPE', { static: false }) AT_ASSET_TYPE: ComboBoxComponent;
    @ViewChild('AT_ASSET_SUBTYPE', { static: false }) AT_ASSET_SUBTYPE: ComboBoxComponent;
    @ViewChild('AT_ASSET_LOCATION', { static: false }) AT_ASSET_LOCATION: TextBoxComponent;
    @ViewChild('AT_ASSET_STATUS', { static: false }) AT_ASSET_STATUS: TextBoxComponent;
    @ViewChild('AT_ASSET_VALUE', { static: false }) AT_ASSET_VALUE: TextBoxComponent;
    @ViewChild('AT_FAIR_MRKT_VALUE', { static: false }) AT_FAIR_MRKT_VALUE: TextBoxComponent;
    @ViewChild('AT_CURRENCY', { static: false }) AT_CURRENCY: ComboBoxComponent;
    @ViewChild('AT_EQUIVALENT_AMOUNT', { static: false }) AT_EQUIVALENT_AMOUNT: TextBoxComponent;
    @ViewChild('AT_OWNED_BY', { static: false }) AT_OWNED_BY: ComboBoxComponent;
    @ViewChild('AT_NAME', { static: false }) AT_NAME: ComboBoxComponent;
    @ViewChild('AT_INCLUDE_IN_DBR', { static: false }) AT_INCLUDE_IN_DBR: ComboBoxComponent;
    @ViewChild('AT_SAVE', { static: false }) AT_SAVE: ButtonComponent;
    @ViewChild('AssetDetailsGrid', { static: false }) AssetDetailsGrid: AssetDetailsGridComponent;
    @ViewChild('Handler', { static: false }) Handler: AssetsHandlerComponent;
    @ViewChild('ASSET_ID', { static: false }) ASSET_ID: HiddenComponent;
    @ViewChild('hidAppId', { static: false }) hidAppId: HiddenComponent;
    @ViewChild('hideAssetSubType', { static: false }) hideAssetSubType: HiddenComponent;
    @ViewChild('hideAssetType', { static: false }) hideAssetType: HiddenComponent;
    @ViewChild('hideIncludeInDBR', { static: false }) hideIncludeInDBR: HiddenComponent;
    @ViewChild('hideName', { static: false }) hideName: HiddenComponent;
    @ViewChild('hideOwnedBy', { static: false }) hideOwnedBy: HiddenComponent;
    @ViewChild('hideCurrencyDesc', { static: false }) hideCurrencyDesc: HiddenComponent;
    @ViewChild('hidExchangeRate', { static: false }) hidExchangeRate: HiddenComponent;

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
        this.value = new AssetDetailsFormModel();
        this.componentCode = 'AssetDetailsForm';
    }
    setReadOnly(readOnly) {
        super.setBasicFieldsReadOnly(readOnly);
    }
    async onFormLoad() {
        this.assetBorrowerSeq = 2;
        this.setInputs(this.services.dataStore.getData(this.services.routing.currModal));
        this.hidAppId.setValue('RLO');
        this.hideAssetSubType.setValue('ASSET_SUBTYPE');
        this.hideAssetType.setValue('ASSET_TYPE');
        this.hideIncludeInDBR.setValue('Y_N');
        this.hideName.setValue('NAME');
        this.hideOwnedBy.setValue('OWNED_BY');
        this.hideCurrencyDesc.setValue('INR');
        this.setDependencies();
        await this.Handler.onFormLoad({});
        await this.AssetDetailsGrid.gridDataLoad({
            'passBorrowerToAsset' :this.assetBorrowerSeq
        });
    }
    setInputs(param: any) {
        let params = this.services.http.mapToJson(param);
        if (params['mode']) {
            this.mode = params['mode'];
        }
    }
    async submitForm(path, apiCode, serviceCode) {
        this.submitData['formName'] = 'Asset Details Form';
        await super.submit(path, apiCode, serviceCode);
    }
    getFieldInfo() {
        this.amountComponent.forEach(field => { this.additionalInfo[field.fieldID + '_desc'] = field.getFieldInfo(); });
        this.comboFields.forEach(field => { this.additionalInfo[field.fieldID + '_desc'] = field.getFieldInfo(); });
        this.fileUploadFields.forEach(field => { this.additionalInfo[field.fieldID + '_desc'] = field.getFieldInfo(); });
        return this.additionalInfo;
    }
    getFieldValue() {
        return this.value;
    }
    setValue(inputValue, inputDesc = undefined) {
        this.setBasicFieldsValue(inputValue, inputDesc);
        this.value = new AssetDetailsFormModel();
        this.value.setValue(inputValue);
        this.setDependencies();
        this.passNewValue(this.value);
    }
    ngOnInit() {
        if (this.formCode == undefined) { this.formCode = 'AssetDetailsForm'; }
        if (this.formOnLoadError) { return; }
        var styleElement = document.createElement('style');
        styleElement.type = 'text/css';
        styleElement.innerHTML = customCss;
        styleElement.id = 'AssetDetailsForm_customCss';
        document.getElementsByTagName('head')[0].appendChild(styleElement);
    }
    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
        var styleElement = document.getElementById('AssetDetailsForm_customCss');
        styleElement.parentNode.removeChild(styleElement);
    }
    ngAfterViewInit() {
        setTimeout(() => {
            this.subsBFldsValueUpdates();
            this.onFormLoad();
            this.checkForHTabOverFlow();
        });
    }
    clearError() {
        super.clearBasicFieldsError();
        super.clearHTabErrors();
        super.clearVTabErrors();
        this.errors = 0;
        this.errorMessage = [];
    }
    onReset() {
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
    async AT_SAVE_click(event) {
        let inputMap = new Map();
        var numberOfErrors: number = await this.revalidate();
        if (numberOfErrors == 0) {
            if (this.ASSET_ID.getFieldValue() != undefined) {
                inputMap.clear();
                inputMap.set('PathParam.AssetSeq', this.ASSET_ID.getFieldValue());
                inputMap.set('Body.AssetDetails.AssetValue', this.AT_ASSET_VALUE.getFieldValue());
                inputMap.set('Body.AssetDetails.AssetType', this.AT_ASSET_TYPE.getFieldValue());
                inputMap.set('Body.AssetDetails.AssetSubtype', this.AT_ASSET_SUBTYPE.getFieldValue());
                inputMap.set('Body.AssetDetails.AssetLocation', this.AT_ASSET_LOCATION.getFieldValue());
                inputMap.set('Body.AssetDetails.FairMarketValue', this.AT_FAIR_MRKT_VALUE.getFieldValue());
                inputMap.set('Body.AssetDetails.Currency', this.AT_CURRENCY.getFieldValue());
                inputMap.set('Body.AssetDetails.EquivalentAmt', this.AT_EQUIVALENT_AMOUNT.getFieldValue());
                inputMap.set('Body.AssetDetails.OwnedBy', this.AT_OWNED_BY.getFieldValue());
                inputMap.set('Body.AssetDetails.IncludeInDBR', this.AT_INCLUDE_IN_DBR.getFieldValue());
                inputMap.set('Body.AssetDetails.OwnerName', this.AT_NAME.getFieldValue());
                inputMap.set('Body.AssetDetails.AssetStatus', this.AT_ASSET_STATUS.getFieldValue());
                inputMap.set('Body.AssetDetails.BorrowerSeq',this.assetBorrowerSeq);
                this.services.http.fetchApi('/AssetDetails/{AssetSeq}', 'PUT', inputMap).subscribe(
                    async (httpResponse: HttpResponse<any>) => {
                        var res = httpResponse.body;
                        this.services.alert.showAlert(1, 'rlo.success.update.asset', 5000);
                        await this.AssetDetailsGrid.gridDataLoad({
                            'passBorrowerToAsset':this.assetBorrowerSeq
                        });
                        this.onReset();
                    },
                    async (httpError) => {
                        var err = httpError['error']
                        if (err != null && err['ErrorElementPath'] != undefined && err['ErrorDescription'] != undefined) {
                            if (err['ErrorElementPath'] == 'AssetDetails.AssetStatus') {
                                this.AT_ASSET_STATUS.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'AssetDetails.OwnerName') {
                                this.AT_NAME.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'AssetDetails.IncludeInDBR') {
                                this.AT_INCLUDE_IN_DBR.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'AssetDetails.OwnedBy') {
                                this.AT_OWNED_BY.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'AssetDetails.EquivalentAmt') {
                                this.AT_EQUIVALENT_AMOUNT.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'AssetDetails.Currency') {
                                this.AT_CURRENCY.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'AssetDetails.FairMarketValue') {
                                this.AT_FAIR_MRKT_VALUE.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'AssetDetails.AssetLocation') {
                                this.AT_ASSET_LOCATION.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'AssetDetails.AssetSubtype') {
                                this.AT_ASSET_SUBTYPE.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'AssetDetails.AssetType') {
                                this.AT_ASSET_TYPE.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'AssetDetails.AssetValue') {
                                this.AT_ASSET_VALUE.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'AssetSeq') {
                                this.ASSET_ID.setError(err['ErrorDescription']);
                            }
                        }
                        this.services.alert.showAlert(2, 'rlo.error.update.asset', -1);
                    }
                );
            }
            else {
                inputMap.clear();
                inputMap.set('Body.AssetDetails.AssetType', this.AT_ASSET_TYPE.getFieldValue());
                inputMap.set('Body.AssetDetails.AssetSubtype', this.AT_ASSET_SUBTYPE.getFieldValue());
                inputMap.set('Body.AssetDetails.AssetLocation', this.AT_ASSET_LOCATION.getFieldValue());
                inputMap.set('Body.AssetDetails.AssetStatus', this.AT_ASSET_STATUS.getFieldValue());
                inputMap.set('Body.AssetDetails.FairMarketValue', this.AT_FAIR_MRKT_VALUE.getFieldValue());
                inputMap.set('Body.AssetDetails.Currency', this.AT_CURRENCY.getFieldValue());
                inputMap.set('Body.AssetDetails.EquivalentAmt', this.AT_EQUIVALENT_AMOUNT.getFieldValue());
                inputMap.set('Body.AssetDetails.OwnedBy', this.AT_OWNED_BY.getFieldValue());
                inputMap.set('Body.AssetDetails.AssetValue', this.AT_ASSET_VALUE.getFieldValue());
                inputMap.set('Body.AssetDetails.OwnerName', this.AT_NAME.getFieldValue());
                inputMap.set('Body.AssetDetails.IncludeInDBR', this.AT_INCLUDE_IN_DBR.getFieldValue());
                inputMap.set('Body.AssetDetails.BorrowerSeq',this.assetBorrowerSeq);
                this.services.http.fetchApi('/AssetDetails', 'POST', inputMap).subscribe(
                    async (httpResponse: HttpResponse<any>) => {
                        var res = httpResponse.body;
                        this.services.alert.showAlert(1, 'rlo.success.save.asset', 5000);
                        await this.AssetDetailsGrid.gridDataLoad({
                            'passBorrowerToAsset':this.assetBorrowerSeq
                        });
                        this.onReset();
                    },
                    async (httpError) => {
                        var err = httpError['error']
                        if (err != null && err['ErrorElementPath'] != undefined && err['ErrorDescription'] != undefined) {
                            if (err['ErrorElementPath'] == 'AssetDetails.IncludeInDBR') {
                                this.AT_INCLUDE_IN_DBR.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'AssetDetails.OwnerName') {
                                this.AT_NAME.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'AssetDetails.AssetValue') {
                                this.AT_ASSET_VALUE.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'AssetDetails.OwnedBy') {
                                this.AT_OWNED_BY.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'AssetDetails.EquivalentAmt') {
                                this.AT_EQUIVALENT_AMOUNT.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'AssetDetails.Currency') {
                                this.AT_CURRENCY.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'AssetDetails.FairMarketValue') {
                                this.AT_FAIR_MRKT_VALUE.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'AssetDetails.AssetStatus') {
                                this.AT_ASSET_STATUS.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'AssetDetails.AssetLocation') {
                                this.AT_ASSET_LOCATION.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'AssetDetails.AssetSubtype') {
                                this.AT_ASSET_SUBTYPE.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'AssetDetails.AssetType') {
                                this.AT_ASSET_TYPE.setError(err['ErrorDescription']);
                            }
                        }
                        this.services.alert.showAlert(2, 'rlo.error.save.asset', -1);
                    }
                );
            }
        }
        else {
            this.services.alert.showAlert(2, 'rlo.error.invalid.form', -1);
        }
    }
    async AssetDetailsGrid_modifyAssetDetails(event) {
        let inputMap = new Map();
        this.showSpinner();
        inputMap.clear();
        inputMap.set('PathParam.AssetSeq', event.AssetKey);
        this.services.http.fetchApi('/AssetDetails/{AssetSeq}', 'GET', inputMap).subscribe(
            async (httpResponse: HttpResponse<any>) => {
                var res = httpResponse.body;
                this.AT_ASSET_TYPE.setValue(res['AssetDetails']['AssetType']);
                this.AT_ASSET_SUBTYPE.setValue(res['AssetDetails']['AssetSubtype']);
                this.AT_ASSET_LOCATION.setValue(res['AssetDetails']['AssetLocation']);
                this.AT_ASSET_STATUS.setValue(res['AssetDetails']['AssetStatus']);
                this.AT_ASSET_VALUE.setValue(res['AssetDetails']['AssetValue']);
                this.AT_FAIR_MRKT_VALUE.setValue(res['AssetDetails']['FairMarketValue']);
                this.AT_CURRENCY.setValue(res['AssetDetails']['Currency']);
                this.AT_EQUIVALENT_AMOUNT.setValue(res['AssetDetails']['EquivalentAmt']);
                this.AT_NAME.setValue(res['AssetDetails']['OwnerName']);
                this.AT_INCLUDE_IN_DBR.setValue(res['AssetDetails']['IncludeInDBR']);
                this.AT_OWNED_BY.setValue(res['AssetDetails']['OwnedBy']);
                this.ASSET_ID.setValue(res['AssetDetails']['AssetSeq']);
                this.hideSpinner();
            },
            async (httpError) => {
                var err = httpError['error']
                if (err != null && err['ErrorElementPath'] != undefined && err['ErrorDescription'] != undefined) {
                }
                this.services.alert.showAlert(2, 'rlo.error.load.form', -1);
                this.hideSpinner();
            }
        );
    }
    fieldDependencies = {
        AT_ASSET_TYPE: {
            inDep: [

                { paramKey: "VALUE1", depFieldID: "AT_ASSET_TYPE", paramType: "PathParam" },
                { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
                { paramKey: "KEY1", depFieldID: "hideAssetType", paramType: "QueryParam" },
            ],
            outDep: [
            ]
        },
        AT_ASSET_SUBTYPE: {
            inDep: [

                { paramKey: "VALUE1", depFieldID: "AT_ASSET_SUBTYPE", paramType: "PathParam" },
                { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
                { paramKey: "KEY1", depFieldID: "hideAssetSubType", paramType: "QueryParam" },
            ],
            outDep: [
            ]
        },
        AT_OWNED_BY: {
            inDep: [

                { paramKey: "VALUE1", depFieldID: "AT_OWNED_BY", paramType: "PathParam" },
                { paramKey: "KEY1", depFieldID: "hideOwnedBy", paramType: "QueryParam" },
                { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
            ],
            outDep: [
            ]
        },
        AT_NAME: {
            inDep: [

                { paramKey: "VALUE1", depFieldID: "AD_NAME", paramType: "PathParam" },
                { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
                { paramKey: "KEY1", depFieldID: "hideName", paramType: "QueryParam" },
            ],
            outDep: [
            ]
        },
        AT_INCLUDE_IN_DBR: {
            inDep: [

                { paramKey: "VALUE1", depFieldID: "AT_INCLUDE_IN_DBR", paramType: "PathParam" },
                { paramKey: "KEY1", depFieldID: "hideIncludeInDBR", paramType: "QueryParam" },
                { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
            ],
            outDep: [
            ]
        },
        AT_CURRENCY: {
            inDep: [

                { paramKey: "CurrencySrc", depFieldID: "AT_CURRENCY", paramType: "PathParam" },
                { paramKey: "CurrencyDest", depFieldID: "hideCurrencyDesc", paramType: "QueryParam" },
            ],
            outDep: [
                { paramKey: "MstCurrencyDetails.ExchangeRate", depFieldID: "hidExchangeRate" },
            ]
        },
    }

}