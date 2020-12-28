import { Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import { RealignmentRequestModel } from './RealignmentRequest.model';
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
// import { PasswordComponent } from '../password/password.component';
// import { RadioButtonComponent } from '../radio-button/radio-button.component';

const customCss: string = '';

@Component({
    selector: 'app-RealignmentRequest',
    templateUrl: './RealignmentRequest.component.html'
})
export class RealignmentRequestComponent extends FormComponent implements OnInit, AfterViewInit {
    @ViewChild('A_MaximumCardLimit', { static: false }) A_MaximumCardLimit: RloUiCurrencyComponent;
    @ViewChild('ApprovedCorporateCardLimit', { static: false }) ApprovedCorporateCardLimit: RloUiCurrencyComponent;
    @ViewChild('ApprovedCorporateCashLimit', { static: false }) ApprovedCorporateCashLimit: RloUiCurrencyComponent;
    @ViewChild('MaximumCashLimit', { static: false }) MaximumCashLimit: RloUiCurrencyComponent;

    header: any;
    async revalidate(): Promise<number> {
        var totalErrors = 0;
        super.beforeRevalidate();
        await Promise.all([
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
        this.value = new RealignmentRequestModel();
        this.componentCode = 'RealignmentRequest';
    }
    setReadOnly(readOnly) {
        super.setBasicFieldsReadOnly(readOnly);
    }
    async onFormLoad() {
        this.setInputs(this.services.dataStore.getData(this.services.routing.currModal));
        this.A_MaximumCardLimit.setReadOnly(true);
        this.MaximumCashLimit.setReadOnly(true);
        this.ApprovedCorporateCardLimit.setReadOnly(true);
        this.ApprovedCorporateCashLimit.setReadOnly(true);
        this.fetchCarditCardDetails();
        this.setDependencies();
    }
    setInputs(param: any) {
        let params = this.services.http.mapToJson(param);
        if (params['mode']) {
            this.mode = params['mode'];
        }
    }
    async submitForm(path, apiCode, serviceCode) {
        this.submitData['formName'] = 'RealignmentRequest';
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
        this.value = new RealignmentRequestModel();
        this.value.setValue(inputValue);
        this.setDependencies();
        this.passNewValue(this.value);
    }
    ngOnInit() {
        if (this.formCode == undefined) { this.formCode = 'RealignmentRequest'; }
        if (this.formOnLoadError) { return; }
        var styleElement = document.createElement('style');
        styleElement.type = 'text/css';
        styleElement.innerHTML = customCss;
        styleElement.id = 'RealignmentRequest_customCss';
        document.getElementsByTagName('head')[0].appendChild(styleElement);
    }
    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
        var styleElement = document.getElementById('RealignmentRequest_customCss');
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
        this.value = new RealignmentRequestModel();
        this.passNewValue(this.value);
        this.setReadOnly(false);
        this.onFormLoad();
    }
    fieldDependencies = {
    }
    fetchCarditCardDetails() {
        let inputMap = new Map();
        inputMap.clear();
        if (this.ApplicationId) {
            let inputMap = new Map();
            inputMap.clear();
            inputMap.set('PathParam.ApplicationId', this.services.dataStore.getRouteParam(this.services.routing.currModal, 'appId'));
            console.log('inputmaap', inputMap);
            this.services.http.fetchApi('/proposal/{ApplicationId}/header', 'GET', inputMap, '/rlo-de').subscribe(
                async (httpResponse: HttpResponse<any>) => {
                    var res = httpResponse.body;
                    console.log("DEEP | header value", res);
                    this.header = res.Header;
                    this.A_MaximumCardLimit.setComponentSpecificValue(this.header.Product_max_credit, null);
                    this.MaximumCashLimit.setComponentSpecificValue(this.header.Product_max_cash_limit, null);
                },
                async (httpError) => {
                    var err = httpError['error']
                    if (err != null && err['ErrorElementPath'] != undefined && err['ErrorDescription'] != undefined) {
                    }
                    this.services.alert.showAlert(2, 'rlo.error.load.header', -1);
                }
            );

            this.setDependencies();
        }
    }
}