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
    @ViewChild('GoldOrnamentType', { static: false }) GoldOrnamentType: ComboBoxComponent;
    @ViewChild('Karat', { static: false }) Karat: TextBoxComponent;
    @ViewChild('Weight', { static: false }) Weight: TextBoxComponent;
    @ViewChild('Value', { static: false }) Value: TextBoxComponent;
    // @ViewChild('Currency', { static: false }) Currency: ComboBoxComponent;
    @ViewChild('TotalWeight', { static: false }) TotalWeight: TextBoxComponent;
    @ViewChild('Count', { static: false }) Count: TextBoxComponent;
    // @ViewChild('LocalCurrencyEquivalent', { static: false }) LocalCurrencyEquivalent: TextBoxComponent;
    @ViewChild('MarketRate', { static: false }) MarketRate: TextBoxComponent;
    @ViewChild('DateofMarketRateCapture', { static: false }) DateofMarketRateCapture: DateComponent;
    @ViewChild('AdditionalRemarks', { static: false }) AdditionalRemarks: TextBoxComponent;
    @ViewChild('GOLD_Save', { static: false }) GOLD_Save: ButtonComponent;
    @ViewChild('GOLD_Clear', { static: false }) GOLD_Clear: ButtonComponent;
    @ViewChild('GoldDeatilGrid', { static: false }) GoldDeatilGrid: GoldDetailsGridComponent;
    @ViewChild('Handler', { static: false }) Handler: GoldDetailsHandlerComponent;
    @ViewChild('HidAppId', { static: false }) HidAppId: HiddenComponent;
    @ViewChild('HidGoldOType', { static: false }) HidGoldOType: HiddenComponent;
    @ViewChild('HidWeightUnit', { static: false }) HidWeightUnit: HiddenComponent;
    @ViewChild('GoldDetailSeq', { static: false }) GoldDetailSeq: HiddenComponent;
    @ViewChild('hidExchangeRate', { static: false }) hidExchangeRate: HiddenComponent;
    @Input() ApplicationId: string = undefined;
    async revalidate(): Promise<number> {
        var totalErrors = 0;
        super.beforeRevalidate();
        await Promise.all([
            this.revalidateBasicField('GoldOrnamentType'),
            this.revalidateBasicField('Karat'),
            this.revalidateBasicField('Weight'),
            // this.revalidateBasicField('Currency'),
            this.revalidateBasicField('TotalWeight'),
            this.revalidateBasicField('Count'),
            // this.revalidateBasicField('LocalCurrencyEquivalent'),
            this.revalidateBasicField('MarketRate'),
            this.revalidateBasicField('DateofMarketRateCapture'),
            this.revalidateBasicField('AdditionalRemarks'),
            this.revalidateBasicField('Value')
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
        this.value = new GoldDetailsModel();
        this.componentCode = 'GoldDetails';
    }
    setReadOnly(readOnly) {
        super.setBasicFieldsReadOnly(readOnly);
    }
    async onFormLoad() {
        this.setInputs(this.services.dataStore.getData(this.services.routing.currModal));
        this.Value.setReadOnly(true);
        this.TotalWeight.setReadOnly(true);
        this.HidAppId.setValue('RLO');
        this.HidGoldOType.setValue('GoldOType');
        // this.HidWeightUnit.setValue('WeightUnit');
        this.setDependencies();
        if (this.ApplicationId) {
            await this.GoldDeatilGrid.gridDataLoad({
              'ApplicationId': this.ApplicationId,
            });
          }
        await this.Handler.onFormLoad({});
    }
    setInputs(param: any) {
        let params = this.services.http.mapToJson(param);
        if (params['mode']) {
            this.mode = params['mode'];
        }
    }
    async submitForm(path, apiCode, serviceCode) {
        this.submitData['formName'] = 'GoldDetails';
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
        this.GoldDeatilGrid.setValue(inputValue['GoldDeatilGrid']);
        this.value = new GoldDetailsModel();
        this.value.setValue(inputValue);
        this.setDependencies();
        this.passNewValue(this.value);
    }
    ngOnInit() {
        if (this.formCode == undefined) { this.formCode = 'GoldDetails'; }
        if (this.formOnLoadError) { return; }
        var styleElement = document.createElement('style');
        styleElement.type = 'text/css';
        styleElement.innerHTML = customCss;
        styleElement.id = 'GoldDetails_customCss';
        document.getElementsByTagName('head')[0].appendChild(styleElement);
    }
    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
        var styleElement = document.getElementById('GoldDetails_customCss');
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
        this.value = new GoldDetailsModel();
        this.passNewValue(this.value);
        this.setReadOnly(false);
        this.onFormLoad();
    }
    async Count_blur(event) {
        let totalweight;
    if (this.Count.getFieldValue() != undefined && this.Weight.getFieldValue() != undefined) {
        totalweight = (Math.round(this.Count.getFieldValue() * this.Weight.getFieldValue()))
      this.TotalWeight.setValue(totalweight.toFixed(2));
      console.log("new count", totalweight);
    }
    }

    async MarketRate_blur(event) {
        let marketrate;
    if (this.TotalWeight.getFieldValue() != undefined && this.MarketRate.getFieldValue() != undefined) {
        marketrate = (Math.round(this.TotalWeight.getFieldValue() * this.MarketRate.getFieldValue()))
      this.Value.setValue(marketrate.toFixed(2));
      console.log("new marketrate", marketrate);
    }
    }

    GOLD_RESET_click(event) {
        this.onReset();
    }
    async GOLD_SAVE_click(event) {
        // this.AT_SAVE.setDisabled(true);
        let inputMap = new Map();
        var numberOfErrors: number = await this.revalidate();
        // let assetGridData: any = this.GoldDetailsGrid.getAssetDetails();
        if (numberOfErrors == 0) {
            if (this.GoldDetailSeq.getFieldValue() != undefined) {
                inputMap.clear();
                inputMap.set('PathParam.GoldDetailSeq', this.GoldDetailSeq.getFieldValue());
                inputMap.set('Body.GoldDetails.GoldOrnamentType', this.GoldOrnamentType.getFieldValue());
                inputMap.set('Body.GoldDetails.Karat', this.Karat.getFieldValue());
                inputMap.set('Body.GoldDetails.Weight', this.Weight.getFieldValue());
                inputMap.set('Body.GoldDetails.WeightUnit', this.Value.getFieldValue());
                inputMap.set('Body.GoldDetails.Count', this.Count.getFieldValue());
                // inputMap.set('Body.GoldDetails.Currency', this.Currency.getFieldValue());
                inputMap.set('Body.GoldDetails.TotalWeight', this.TotalWeight.getFieldValue());
                inputMap.set('Body.GoldDetails.DateOfMarketRateCapture', this.DateofMarketRateCapture.getFieldValue());
                // inputMap.set('Body.GoldDetails.LocalCurrencyEquivalent', this.LocalCurrencyEquivalent.getFieldValue());
                inputMap.set('Body.GoldDetails.AdditionalRemarks', this.AdditionalRemarks.getFieldValue());
                inputMap.set('Body.GoldDetails.MarketRate', this.MarketRate.getFieldValue());
                inputMap.set('Body.GoldDetails.ApplicationId', this.ApplicationId);
                this.services.http.fetchApi('/GoldDetails/{GoldDetailSeq}', 'PUT', inputMap, '/rlo-de').subscribe(
                    async (httpResponse: HttpResponse<any>) => {
                        var res = httpResponse.body;
                        this.services.alert.showAlert(1, 'rlo.success.update.gold', 5000);
                        this.onReset();
                        // this.AT_SAVE.setDisabled(false);

                    },
                    async (httpError) => {
                        var err = httpError['error']
                        if (err != null && err['ErrorElementPath'] != undefined && err['ErrorDescription'] != undefined) {
                            if (err['ErrorElementPath'] == 'GoldDetails.MarketRate') {
                                this.MarketRate.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'GoldDetails.AdditionalRemarks') {
                                this.AdditionalRemarks.setError(err['ErrorDescription']);
                            }
                            // else if (err['ErrorElementPath'] == 'GoldDetails.LocalCurrencyEquivalent') {
                            //     this.LocalCurrencyEquivalent.setError(err['ErrorDescription']);
                            // }
                            else if (err['ErrorElementPath'] == 'GoldDetails.DateOfMarketRateCapture') {
                                this.DateofMarketRateCapture.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'GoldDetails.TotalWeight') {
                                this.TotalWeight.setError(err['ErrorDescription']);
                            }
                            // else if (err['ErrorElementPath'] == 'GoldDetails.Currency') {
                            //     this.Currency.setError(err['ErrorDescription']);
                            // }
                            else if (err['ErrorElementPath'] == 'GoldDetails.Count') {
                                this.Count.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'GoldDetails.Value') {
                                this.Value.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'GoldDetails.Weight') {
                                this.Weight.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'GoldDetails.Karat') {
                                this.Karat.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'GoldDetails.GoldOrnamentType') {
                                this.GoldOrnamentType.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'GoldDetailSeq') {
                                this.GoldDetailSeq.setError(err['ErrorDescription']);
                            }
                        }
                        this.services.alert.showAlert(2, 'rlo.error.update.gold', -1);
                        // this.AT_SAVE.setDisabled(false);

                    }
                );
            }
            else {
                inputMap.clear();
                inputMap.set('Body.GoldDetails.Karat', this.Karat.getFieldValue());
                inputMap.set('Body.GoldDetails.Weight', this.Weight.getFieldValue());
                inputMap.set('Body.GoldDetails.Value', this.Value.getFieldValue());
                inputMap.set('Body.GoldDetails.MarketRate', this.MarketRate.getFieldValue());
                inputMap.set('Body.GoldDetails.Count', this.Count.getFieldValue());
                // inputMap.set('Body.GoldDetails.Currency', this.Currency.getFieldValue());
                inputMap.set('Body.GoldDetails.TotalWeight', this.TotalWeight.getFieldValue());
                inputMap.set('Body.GoldDetails.DateOfMarketRateCapture', this.DateofMarketRateCapture.getFieldValue());
                inputMap.set('Body.GoldDetails.GoldOrnamentType', this.GoldOrnamentType.getFieldValue());
                inputMap.set('Body.GoldDetails.AdditionalRemarks', this.AdditionalRemarks.getFieldValue());
                // inputMap.set('Body.GoldDetails.LocalCurrencyEquivalent', this.LocalCurrencyEquivalent.getFieldValue());
                inputMap.set('Body.GoldDetails.ApplicationId', this.ApplicationId);
                this.services.http.fetchApi('/GoldDetails', 'POST', inputMap, '/rlo-de').subscribe(
                    async (httpResponse: HttpResponse<any>) => {
                        var res = httpResponse.body;
                        this.services.alert.showAlert(1, 'rlo.success.save.gold', 5000);
                        this.onReset();
                        // this.AT_SAVE.setDisabled(false);

                    },
                    async (httpError) => {
                        var err = httpError['error']
                        if (err != null && err['ErrorElementPath'] != undefined && err['ErrorDescription'] != undefined) {
                            // if (err['ErrorElementPath'] == 'GoldDetails.LocalCurrencyEquivalent') {
                            //     this.LocalCurrencyEquivalent.setError(err['ErrorDescription']);
                            // }
                             if (err['ErrorElementPath'] == 'GoldDetails.AdditionalRemarks') {
                                this.AdditionalRemarks.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'GoldDetails.GoldOrnamentType') {
                                this.GoldOrnamentType.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'GoldDetails.DateOfMarketRateCapture') {
                                this.DateofMarketRateCapture.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'GoldDetails.TotalWeight') {
                                this.TotalWeight.setError(err['ErrorDescription']);
                            }
                            // else if (err['ErrorElementPath'] == 'GoldDetails.Currency') {
                            //     this.Currency.setError(err['ErrorDescription']);
                            // }
                            else if (err['ErrorElementPath'] == 'GoldDetails.Count') {
                                this.Count.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'GoldDetails.MarketRate') {
                                this.MarketRate.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'GoldDetails.Value') {
                                this.Value.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'GoldDetails.Weight') {
                                this.Weight.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'GoldDetails.Karat') {
                                this.Karat.setError(err['ErrorDescription']);
                            }
                        }
                        this.services.alert.showAlert(2, 'rlo.error.save.gold', -1);
                        // this.AT_SAVE.setDisabled(false);

                    }
                );
            }
        }
        else {
            this.services.alert.showAlert(2, 'rlo.error.invalid.form', -1);
        }
    }
    async ModifyGoldDeatils(event) {
        let inputMap = new Map();
        this.showSpinner();
        inputMap.clear();
        inputMap.set('PathParam.GoldDetailSeq', event.GoldKey);
        this.services.http.fetchApi('/GoldDetails/{GoldDetailSeq}', 'GET', inputMap).subscribe(
            async (httpResponse: HttpResponse<any>) => {
                var res = httpResponse.body;
                this.GoldOrnamentType.setValue(res['GoldDetails']['GoldOrnamentType']['id']);
                this.Karat.setValue(res['GoldDetails']['Karat']);
                this.Weight.setValue(res['GoldDetails']['Weight']);
                this.Value.setValue(res['GoldDetails']['Value']);
                // this.Currency.setValue(res['GoldDetails']['Currency']);
                this.TotalWeight.setValue(res['GoldDetails']['TotalWeight']);
                this.Count.setValue(res['GoldDetails']['Count']);
                // this.LocalCurrencyEquivalent.setValue(res['GoldDetails']['LocalCurrencyEquivalent']);
                this.MarketRate.setValue(res['GoldDetails']['MarketRate']);
                this.DateofMarketRateCapture.setValue(res['GoldDetails']['DateOfMarketRateCapture']);
                this.AdditionalRemarks.setValue(res['GoldDetails']['AdditionalRemarks']);
                this.GoldDetailSeq.setValue(res['GoldDetails']['GoldDetailSeq']);
                this.hideSpinner();
            },
            async (httpError) => {
                var err = httpError['error']
                if (err != null && err['ErrorElementPath'] != undefined && err['ErrorDescription'] != undefined) {
                }
                this.hideSpinner();
            }
        );
    }

    fieldDependencies = {
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