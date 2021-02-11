import { Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import { FDDetailsModel } from './FDDetails.model';
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
// import { ToggleSwitchComponent } from '../toggle-switch/toggle-switch.component';
// import { RangeBarComponent } from '../range-bar/range-bar.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PopupModalComponent } from '../popup-modal/popup-modal.component';
import { ServiceStock } from '../service-stock.service';
import { LabelComponent } from '../label/label.component';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { RloUiCurrencyComponent } from '../rlo-ui-currency/rlo-ui-currency.component';
import { RLOUIRadioComponent } from '../rlo-ui-radio/rlo-ui-radio.component';
import { FDDetailsHandlerComponent } from './fd-handler.component';
import { FDDetailsGridComponent } from '../FDDetailsGrid/FDDetailsGrid.component';
import { toNumber } from '@amcharts/amcharts4/.internal/core/utils/Type';
// import { PasswordComponent } from '../password/password.component';
// import { RadioButtonComponent } from '../radio-button/radio-button.component';

const customCss: string = '';

@Component({
    selector: 'app-FDDetails',
    templateUrl: './FDDetails.component.html'
})
export class FDDetailsComponent extends FormComponent implements OnInit, AfterViewInit {
    @ViewChild('FDNumber', { static: false }) FDNumber: ComboBoxComponent;
    @ViewChild('FDAmount', { static: false }) FDAmount: RloUiCurrencyComponent;
    @ViewChild('FDAmountLCE', { static: false }) FDAmountLCE: RloUiCurrencyComponent;
    @ViewChild('LienAmount', { static: false }) LienAmount: RloUiCurrencyComponent;
    @ViewChild('IncludeInDBR', { static: false }) IncludeInDBR: RLOUIRadioComponent;
    @ViewChild('DateofMaturity', { static: false }) DateofMaturity: TextBoxComponent;
    @ViewChild('Handler', { static: false }) Handler: FDDetailsHandlerComponent;
    @ViewChild('MaturityAmount', { static: false }) MaturityAmount: RloUiCurrencyComponent;
    @ViewChild('AutoRenewal', { static: false }) AutoRenewal: RLOUIRadioComponent;
    @ViewChild('FDSave', { static: false }) FDSave: ButtonComponent;
    @ViewChild('FDClear', { static: false }) FDClear: ButtonComponent;
    @ViewChild('hidAppId', { static: false }) hidAppId: HiddenComponent;
    @ViewChild('hidFDNumber', { static: false }) hidFDNumber: HiddenComponent;
    @ViewChild('hidAutoRenewal', { static: false }) hidAutoRenewal: HiddenComponent;
    @ViewChild('hideIncludeInDBR', { static: false }) hideIncludeInDBR: HiddenComponent;
    @ViewChild('FD_GRID', { static: false }) FD_GRID: FDDetailsGridComponent;
    @ViewChild('FD_ID', { static: false }) FD_ID: HiddenComponent;

    @Input() activeBorrowerSeq: string = undefined;
    // activeBorrowerSeq : any;
    tempAccountlist: any;
    FilterOptions = [];
    selectData: any;
    async revalidate(): Promise<number> {
        var totalErrors = 0;
        super.beforeRevalidate();
        await Promise.all([
            this.revalidateBasicField('FDNumber'),
            // this.revalidateBasicField('FDAmount'),
            // this.revalidateBasicField('FDAmountLCE'),
            this.revalidateBasicField('LienAmount'),
            this.revalidateBasicField('IncludeInDBR'),
            // this.revalidateBasicField('DateofMaturity'),
            // this.revalidateBasicField('MaturityAmount'),
            // this.revalidateBasicField('AutoRenewal')
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
        this.value = new FDDetailsModel();
        this.componentCode = 'FDDetails';
    }
    setReadOnly(readOnly) {
        super.setBasicFieldsReadOnly(readOnly);
    }
    async onFormLoad() {
        this.setInputs(this.services.dataStore.getData(this.services.routing.currModal));
        this.hidAppId.setValue('RLO');
        this.hidAutoRenewal.setValue('Y_N');
        // this.hidFDNumber.setValue('ASSET_STATUS');
        this.hideIncludeInDBR.setValue('Y_N');
        await this.Handler.onFormLoad({
        });
        setTimeout(() => {
            this.callAccountDetails();
        }, 500);

        await this.FD_GRID.gridDataLoad({
            'passBorrowerToFD': this.activeBorrowerSeq,
        });
        console.log("activeBorrowerSeq", this.activeBorrowerSeq);

        this.setDependencies();
    }
    setInputs(param: any) {
        let params = this.services.http.mapToJson(param);
        if (params['mode']) {
            this.mode = params['mode'];
        }
    }
    async submitForm(path, apiCode, serviceCode) {
        this.submitData['formName'] = 'FDDetails';
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
        this.value = new FDDetailsModel();
        this.value.setValue(inputValue);
        this.setDependencies();
        this.passNewValue(this.value);
    }
    ngOnInit() {
        if (this.formCode == undefined) { this.formCode = 'FDDetails'; }
        if (this.formOnLoadError) { return; }
        var styleElement = document.createElement('style');
        styleElement.type = 'text/css';
        styleElement.innerHTML = customCss;
        styleElement.id = 'FDDetails_customCss';
        document.getElementsByTagName('head')[0].appendChild(styleElement);
    }
    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
        var styleElement = document.getElementById('FDDetails_customCss');
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
        this.value = new FDDetailsModel();
        this.passNewValue(this.value);
        this.setReadOnly(false);
        this.onFormLoad();
        this.FDAmountLCE.resetFieldAndDropDown();
        this.FDAmount.resetFieldAndDropDown();
        this.MaturityAmount.resetFieldAndDropDown();
        this.LienAmount.resetFieldAndDropDown();
    }

    callAccountDetails() {
        let inputMap = new Map();
        inputMap.clear();
        let activeBorrowerSeq: any = this.activeBorrowerSeq;
        // let activeBorrowerSeq = 8004;
        let criteriaJson: any = { "Offset": 1, "Count": 10, FilterCriteria: [] };
        if (activeBorrowerSeq) {
            criteriaJson.FilterCriteria.push({
                "columnName": "BorrowerSeq",
                "columnType": "String",
                "conditions": {
                    "searchType": "equals",
                    "searchText": activeBorrowerSeq
                }
            });

        }
        inputMap.set('QueryParam.criteriaDetails', criteriaJson)
        // inputMap.set('PathParam.AccountList.[0].BorrowerSeq', this.activeBorrowerSeq);
        this.services.http.fetchApi('/AccountList', 'GET', inputMap, '/rlo-de').subscribe(
            async (httpResponse: HttpResponse<any>) => {
                var res = httpResponse.body;
                console.log("account details", res);
                this.tempAccountlist = res.AccountList;
                if (res != null) {
                    this.setFilterbyOptions();
                }

            });
    }
    setFilterbyOptions() {
        // let tempCustomerList = this.services.rloCommonData.getCustomerList();
        this.FilterOptions = [];

        console.log(" in fd section", this.tempAccountlist);
        //UW
        if (this.readOnly) {
            this.FilterOptions = this.services.rloui.customerListDropDownArray;
        }
        else {
            this.FilterOptions.push({ id: undefined, text: "" });
            this.tempAccountlist.forEach(element => {
                this.FilterOptions.push({ id: element.FDNumber, text: element.FDNumber });

            });
        }
        this.FDNumber.setStaticListOptions(this.FilterOptions);
        console.log(" fd options list", this.FilterOptions);
    }
    async FDNumber_blur() {
        this.selectData = this.FDNumber.getFieldValue();
        if (this.FDNumber.getFieldValue() != null) {
            this.onSelectFDNumber();
        }
        else if (this.FDNumber.value == null) {
            this.FDAmount.resetFieldAndDropDown();
            this.FDAmountLCE.resetFieldAndDropDown();
            this.MaturityAmount.resetFieldAndDropDown();
            this.DateofMaturity.onReset();
            this.AutoRenewal.onReset()
        }
    }
    onSelectFDNumber() {
        for (let index = 0; index < this.tempAccountlist.length; index++) {
            const element = this.tempAccountlist[index];
            for (let index = 0; index < this.FDNumber.emittedOptions.length; index++) {
                const fdno = this.FDNumber.emittedOptions[index];
                if (element.FDNumber == fdno.text) {
                    this.FDAmount.setComponentSpecificValue(element.FDAmount);
                    this.FDAmountLCE.setComponentSpecificValue(element.FDAmountLocalCurrency);
                    this.MaturityAmount.setComponentSpecificValue(element.MaturityAmount);
                    this.DateofMaturity.setValue(element.DateofMaturity);
                    this.AutoRenewal.setValue(element.AutoRenewal)
                }

            }

        }
    }
    async clear_click(event) {
        let inputMap = new Map();
        this.onReset();
    }
    async AT_SAVE_click(event) {
        // this.AT_SAVE.setDisabled(true);
        let inputMap = new Map();
        var numberOfErrors: number = await this.revalidate();
        let assetGridData: any = this.FD_GRID.getAssetDetails();
        console.log("lien amt", this.LienAmount.getFieldValue())
        // return;
        if (numberOfErrors == 0) {
            if (this.FDNumber.getFieldValue() !== undefined) {
                if (assetGridData) {
                    for (let i = 0; i < assetGridData.length; i++) {
                        if (assetGridData[i].FDNumber === this.FDNumber.getFieldValue() && assetGridData[i].LienAmount === this.LienAmount.getFieldValue()) {
                            this.services.alert.showAlert(2, 'rlo.error.exits.fd', -1);
                            return;
                        }
                    }
                }
                if (this.FDAmount.getFieldValue() != undefined && this.LienAmount.getFieldValue() != undefined && this.FDAmount.getFieldValue() != null && this.LienAmount.getFieldValue() != null) {
                    console.log("lien amt", Number(this.LienAmount.getFieldValue()))
                    if (Number(this.LienAmount.getFieldValue()) > Number(this.FDAmount.getFieldValue())) {
                        this.services.alert.showAlert(2, 'rlo.error.greter.fd', -1);
                        return;
                    }
                }
                if (this.LienAmount.getFieldValue() == undefined || this.LienAmount.getFieldValue() == null) {
                    this.services.alert.showAlert(2, 'rlo.error.fill', -1);
                    return;
                }
            }
            if (this.FD_ID.getFieldValue() != undefined) {
                inputMap.clear();
                inputMap.set('PathParam.AssetSeq', this.FD_ID.getFieldValue());
                inputMap.set('Body.AssetDetails.BorrowerSeq', this.activeBorrowerSeq);
                inputMap.set('Body.AssetDetails.IncludeInDBR', this.IncludeInDBR.getFieldValue());
                inputMap.set('Body.AssetDetails.FDNumber', this.FDNumber.getFieldValue());
                inputMap.set('Body.AssetDetails.DateOfMaturity', this.DateofMaturity.getFieldValue());
                //custom
                inputMap.set('Body.AssetDetails.AssetValue', this.FDAmount.getTextBoxValue());
                inputMap.set('Body.AssetDetails.Currency', this.FDAmount.currencyCode);
                inputMap.set('Body.AssetDetails.EquivalentAmt', this.FDAmountLCE.getFieldValue());
                inputMap.set('Body.AssetDetails.LienAmt', this.LienAmount.getTextBoxValue());
                inputMap.set('Body.AssetDetails.UDF1', this.MaturityAmount.getFieldValue());
                inputMap.set('Body.AssetDetails.UDF2', this.AutoRenewal.getFieldValue());
                this.services.http.fetchApi('/AssetDetails/{AssetSeq}', 'PUT', inputMap, '/rlo-de').subscribe(
                    async (httpResponse: HttpResponse<any>) => {
                        var res = httpResponse.body;
                        this.services.alert.showAlert(1, 'rlo.success.update.fd', 5000);
                        this.onReset();
                        // this.AT_SAVE.setDisabled(false);
                    },
                    async (httpError) => {
                        var err = httpError['error']
                        if (err != null && err['ErrorElementPath'] != undefined && err['ErrorDescription'] != undefined) {
                            if (err['ErrorElementPath'] == 'AssetDetails.IncludeInDBR') {
                                this.IncludeInDBR.setError(err['ErrorDescription']);
                            }
                            // else if (err['ErrorElementPath'] == 'AssetDetails.OwnedBy') {
                            //     this.AT_OWNED_BY.setError(err['ErrorDescription']);
                            // }
                            else if (err['ErrorElementPath'] == 'AssetDetails.EquivalentAmt') {
                                this.FDAmountLCE.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'AssetDetails.Currency') {
                                //this.AT_CURRENCY.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'AssetDetails.AssetValue') {
                                this.FDAmount.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'AssetSeq') {
                                this.FD_ID.setError(err['ErrorDescription']);
                            }
                        }
                        this.services.alert.showAlert(2, 'rlo.error.update.fd', -1);
                        // this.AT_SAVE.setDisabled(false);

                    }
                );
            }
            else {
                inputMap.clear();
                inputMap.set('Body.AssetDetails.BorrowerSeq', this.activeBorrowerSeq);
                inputMap.set('Body.AssetDetails.IncludeInDBR', this.IncludeInDBR.getFieldValue());
                inputMap.set('Body.AssetDetails.FDNumber', this.FDNumber.getFieldValue());
                inputMap.set('Body.AssetDetails.DateOfMaturity', this.DateofMaturity.getFieldValue());
                //custom
                inputMap.set('Body.AssetDetails.AssetValue', this.FDAmount.getTextBoxValue());
                inputMap.set('Body.AssetDetails.Currency', this.FDAmount.currencyCode);
                inputMap.set('Body.AssetDetails.EquivalentAmt', this.FDAmountLCE.getFieldValue());
                inputMap.set('Body.AssetDetails.LienAmt', this.LienAmount.getFieldValue());
                inputMap.set('Body.AssetDetails.UDF1', this.MaturityAmount.getFieldValue());
                inputMap.set('Body.AssetDetails.UDF2', this.AutoRenewal.getFieldValue());

                this.services.http.fetchApi('/AssetDetails', 'POST', inputMap, '/rlo-de').subscribe(
                    async (httpResponse: HttpResponse<any>) => {
                        var res = httpResponse.body;
                        this.services.alert.showAlert(1, 'rlo.success.save.fd', 5000);
                        this.onReset();
                        // this.AT_SAVE.setDisabled(false);
                    },
                    async (httpError) => {
                        var err = httpError['error']
                        if (err != null && err['ErrorElementPath'] != undefined && err['ErrorDescription'] != undefined) {
                            if (err['ErrorElementPath'] == 'AssetDetails.IncludeInDBR') {
                                this.IncludeInDBR.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'AssetDetails.AssetValue') {
                                this.FDAmount.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'AssetDetails.EquivalentAmt') {
                                this.FDAmountLCE.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'AssetDetails.Currency') {
                                //this.AT_CURRENCY.setError(err['ErrorDescription']);
                            }
                        }
                        this.services.alert.showAlert(2, 'rlo.error.save.fd', -1);
                        // this.AT_SAVE.setDisabled(false);
                        this.revalidate().then((errors) => {
                            if (!errors) {
                                let array = [];
                                array.push({ isValid: true, sectionData: this.getFieldValue() });
                                let obj = {
                                    "name": "FDDetails",
                                    "data": array,
                                    "sectionName": "FDDetails"
                                }
                                this.services.rloCommonData.globalComponentLvlDataHandler(obj);
                            }
                        });
                    }
                );
            }
        }
        else {
            this.services.alert.showAlert(2, 'rlo.error.invalid.form', -1);
        }
    }
    async FDDetailsGridmodifyFDDetails(event) {
        let inputMap = new Map();
        this.showSpinner();
        inputMap.clear();
        inputMap.set('PathParam.AssetSeq', event.AssetKey);
        this.services.http.fetchApi('/AssetDetails/{AssetSeq}', 'GET', inputMap, '/rlo-de').subscribe(
            async (httpResponse: HttpResponse<any>) => {
                var res = httpResponse.body;
                this.IncludeInDBR.setValue(res['AssetDetails']['IncludeInDBR']['id']);
                this.FD_ID.setValue(res['AssetDetails']['AssetSeq']);
                this.FDNumber.setValue(res['AssetDetails']['FDNumber']);
                this.DateofMaturity.setValue(res['AssetDetails']['DateOfMaturity']);
                this.AutoRenewal.setValue(res['AssetDetails']['UDF2']);

                this.hideSpinner();
                //this.revalidateBasicField('AT_CURRENCY', true)
                //custom
                this.LienAmount.setComponentSpecificValue(res['AssetDetails']['LienAmt'], null);
                this.MaturityAmount.setComponentSpecificValue(res['AssetDetails']['UDF1'], null);
                this.FDAmountLCE.setComponentSpecificValue(res['AssetDetails']['EquivalentAmt'], null);
                this.FDAmount.setComponentSpecificValue(res['AssetDetails']['AssetValue'], null);
                this.FDAmount.selectedCode(res['AssetDetails']['Currency'], false);
                this.revalidate().then((errors) => {
                    if (!errors) {
                        let array = [];
                        array.push({ isValid: true, sectionData: this.getFieldValue() });
                        let obj = {
                            "name": "FDDetails",
                            "data": array,
                            "sectionName": "FDDetails"
                        }
                        this.services.rloCommonData.globalComponentLvlDataHandler(obj);
                    }
                });
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
        IncludeInDBR: {
            inDep: [

                { paramKey: "VALUE1", depFieldID: "IncludeInDBR", paramType: "PathParam" },
                { paramKey: "KEY1", depFieldID: "hideIncludeInDBR", paramType: "QueryParam" },
                { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
            ],
            outDep: [
            ]
        },
        AutoRenewal: {
            inDep: [

                { paramKey: "VALUE1", depFieldID: "AutoRenewal", paramType: "PathParam" },
                { paramKey: "KEY1", depFieldID: "hidAutoRenewal", paramType: "QueryParam" },
                { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
            ],
            outDep: [
            ]
        }
    }
    //custom 
    customGenericOnBlur(event: any) {
        console.log("Deep | customGenericOnBlur", event);
        this.genericOnBlur(event.field, event.textFieldValue);
    }
}