import { Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import { DDEModel } from './DDE.model';
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
import { HeaderComponent } from '../Header/Header.component';
import { CustomerDtlsComponent } from '../CustomerDtls/CustomerDtls.component';
import { FamilyDetailsFormComponent } from '../FamilyDetailsForm/FamilyDetailsForm.component';
import { AssetDetailsFormComponent } from '../AssetDetailsForm/AssetDetailsForm.component';
import { LiabilityDtlsFormComponent } from '../LiabilityDtlsForm/LiabilityDtlsForm.component';
import { OtherDeductionFormComponent } from '../OtherDeductionForm/OtherDeductionForm.component';
import { IncomeSummaryFormComponent } from '../IncomeSummaryForm/IncomeSummaryForm.component';
import { VisitReportFormComponent } from '../VisitReportForm/VisitReportForm.component';
import { GoNoGoComponent } from '../go-no-go/go-no-go.component';
import { NotepadDetailsFormComponent } from '../NotepadDetailsForm/NotepadDetailsForm.component';
import { DDEHandlerComponent } from '../DDE/DDE-handler.component';
import { CustomerGridDTLSComponent } from '../CustomerGridDTLS/CustomerGridDTLS.component';

const customCss: string = '';

@Component({
    selector: 'app-DDE',
    templateUrl: './DDE.component.html'
})
export class DDEComponent extends FormComponent implements OnInit, AfterViewInit {
    @ViewChild('FieldId_1', { static: false }) FieldId_1: HeaderComponent;
    @ViewChild('CUST_DTLS', { static: false }) CUST_DTLS: CustomerDtlsComponent;
    @ViewChild('FAMILY_DTLS', { static: false }) FAMILY_DTLS: FamilyDetailsFormComponent;
    @ViewChild('FieldId_14', { static: false }) FieldId_14: AssetDetailsFormComponent;
    @ViewChild('FieldId_15', { static: false }) FieldId_15: LiabilityDtlsFormComponent;
    @ViewChild('FieldId_6', { static: false }) FieldId_6: OtherDeductionFormComponent;
    @ViewChild('FieldId_9', { static: false }) FieldId_9: IncomeSummaryFormComponent;
    @ViewChild('FieldId_16', { static: false }) FieldId_16: VisitReportFormComponent;
    @ViewChild('FieldId_17', { static: false }) FieldId_17: GoNoGoComponent;
    @ViewChild('FieldId_13', { static: false }) FieldId_13: NotepadDetailsFormComponent;
    @ViewChild('Submit', { static: false }) Submit: ButtonComponent;
    @ViewChild('Cancel', { static: false }) Cancel: ButtonComponent;
    @ViewChild('Handler', { static: false }) Handler: DDEHandlerComponent;
    @ViewChild('HideProcessId', { static: false }) HideProcessId: HiddenComponent;
    @ViewChild('FieldId_9_DDE', { static: false }) FieldId_9_DDE: CustomerGridDTLSComponent;



    async revalidate(): Promise<number> {
        var totalErrors = 0;
        super.beforeRevalidate();
        await Promise.all([
            this.FieldId_1.revalidate(),
            this.FieldId_10_revalidate(),
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
        this.value = new DDEModel();
        this.componentCode = 'DDE';
        this.initHTabGroup('FieldId_10', ['BORROWER_TAB', 'VISIT_REF', 'COLATTERAL', 'GO_NO_GO', 'COMMENTS_TAB',], 'GO_NO_GO', 1);
    }
    setReadOnly(readOnly) {
        super.setBasicFieldsReadOnly(readOnly);
        this.FieldId_1.setReadOnly(readOnly);
        this.CUST_DTLS.setReadOnly(readOnly);
        this.FAMILY_DTLS.setReadOnly(readOnly);
        this.FieldId_14.setReadOnly(readOnly);
        this.FieldId_15.setReadOnly(readOnly);
        this.FieldId_6.setReadOnly(readOnly);
        this.FieldId_9.setReadOnly(readOnly);
        this.FieldId_16.setReadOnly(readOnly);
        this.FieldId_13.setReadOnly(readOnly);
        this.FieldId_9_DDE.setReadOnly(readOnly);
    }
    async onFormLoad() {
        this.setInputs(this.services.dataStore.getData(this.services.routing.currModal));
        this.openHTab('FieldId_10', 'GO_NO_GO');
        this.HideProcessId.setValue('RLO_Process');
        this.setDependencies();
        this.FieldId_9_DDE.doAPIForCustomerList({});
    }
    setInputs(param: any) {
        let params = this.services.http.mapToJson(param);
        if (params['mode']) {
            this.mode = params['mode'];
        }
    }
    async submitForm(path, apiCode, serviceCode) {
        this.submitData['formName'] = 'Details Data Entry';
        await super.submit(path, apiCode, serviceCode);
    }
    getFieldInfo() {
        this.amountComponent.forEach(field => { this.additionalInfo[field.fieldID + '_desc'] = field.getFieldInfo(); });
        this.comboFields.forEach(field => { this.additionalInfo[field.fieldID + '_desc'] = field.getFieldInfo(); });
        this.fileUploadFields.forEach(field => { this.additionalInfo[field.fieldID + '_desc'] = field.getFieldInfo(); });
        this.additionalInfo['FieldId_1_desc'] = this.FieldId_1.getFieldInfo();
        this.additionalInfo['CUST_DTLS_desc'] = this.CUST_DTLS.getFieldInfo();
        this.additionalInfo['FAMILY_DTLS_desc'] = this.FAMILY_DTLS.getFieldInfo();
        this.additionalInfo['FieldId_14_desc'] = this.FieldId_14.getFieldInfo();
        this.additionalInfo['FieldId_15_desc'] = this.FieldId_15.getFieldInfo();
        this.additionalInfo['FieldId_6_desc'] = this.FieldId_6.getFieldInfo();
        this.additionalInfo['FieldId_9_desc'] = this.FieldId_9.getFieldInfo();
        this.additionalInfo['FieldId_16_desc'] = this.FieldId_16.getFieldInfo();
        this.additionalInfo['FieldId_13_desc'] = this.FieldId_13.getFieldInfo();
        this.additionalInfo['FieldId_9_DDE_desc'] = this.FieldId_9_DDE.getFieldInfo();
        return this.additionalInfo;
    }
    getFieldValue() {
        this.value.FieldId_1 = this.FieldId_1.getFieldValue();
        this.value.CUST_DTLS = this.CUST_DTLS.getFieldValue();
        this.value.FAMILY_DTLS = this.FAMILY_DTLS.getFieldValue();
        this.value.FieldId_14 = this.FieldId_14.getFieldValue();
        this.value.FieldId_15 = this.FieldId_15.getFieldValue();
        this.value.FieldId_6 = this.FieldId_6.getFieldValue();
        this.value.FieldId_9 = this.FieldId_9.getFieldValue();
        this.value.FieldId_16 = this.FieldId_16.getFieldValue();
        this.value.FieldId_13 = this.FieldId_13.getFieldValue();
        this.value.FieldId_9_DDE = this.FieldId_9_DDE.getFieldValue();
        return this.value;
    }
    setValue(inputValue, inputDesc = undefined) {
        this.setBasicFieldsValue(inputValue, inputDesc);
        this.FieldId_1.setValue(inputValue['FieldId_1'], inputDesc['FieldId_1_desc']);
        this.CUST_DTLS.setValue(inputValue['CUST_DTLS'], inputDesc['CUST_DTLS_desc']);
        this.FAMILY_DTLS.setValue(inputValue['FAMILY_DTLS'], inputDesc['FAMILY_DTLS_desc']);
        this.FieldId_14.setValue(inputValue['FieldId_14'], inputDesc['FieldId_14_desc']);
        this.FieldId_15.setValue(inputValue['FieldId_15'], inputDesc['FieldId_15_desc']);
        this.FieldId_6.setValue(inputValue['FieldId_6'], inputDesc['FieldId_6_desc']);
        this.FieldId_9.setValue(inputValue['FieldId_9'], inputDesc['FieldId_9_desc']);
        this.FieldId_16.setValue(inputValue['FieldId_16'], inputDesc['FieldId_16_desc']);
        this.FieldId_13.setValue(inputValue['FieldId_13'], inputDesc['FieldId_13_desc']);
        this.FieldId_9_DDE.setValue(inputValue['FieldId_9_DDE'], inputDesc['FieldId_9_DDE_desc']);
        this.value = new DDEModel();
        this.value.setValue(inputValue);
        this.setDependencies();
        this.passNewValue(this.value);
    }
    ngOnInit() {
        if (this.formCode == undefined) { this.formCode = 'DDE'; }
        if (this.formOnLoadError) { return; }
        var styleElement = document.createElement('style');
        styleElement.type = 'text/css';
        styleElement.innerHTML = customCss;
        styleElement.id = 'DDE_customCss';
        document.getElementsByTagName('head')[0].appendChild(styleElement);
    }
    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
        var styleElement = document.getElementById('DDE_customCss');
        styleElement.parentNode.removeChild(styleElement);
    }
    ngAfterViewInit() {
        setTimeout(() => {
            this.subsBFldsValueUpdates();
            this.value.FieldId_1 = this.FieldId_1.getFieldValue();
            this.FieldId_1.valueChangeUpdates().subscribe((value) => { this.value.FieldId_1 = value; });
            this.value.CUST_DTLS = this.CUST_DTLS.getFieldValue();
            this.CUST_DTLS.valueChangeUpdates().subscribe((value) => { this.value.CUST_DTLS = value; });
            this.value.FAMILY_DTLS = this.FAMILY_DTLS.getFieldValue();
            this.FAMILY_DTLS.valueChangeUpdates().subscribe((value) => { this.value.FAMILY_DTLS = value; });
            this.value.FieldId_14 = this.FieldId_14.getFieldValue();
            this.FieldId_14.valueChangeUpdates().subscribe((value) => { this.value.FieldId_14 = value; });
            this.value.FieldId_15 = this.FieldId_15.getFieldValue();
            this.FieldId_15.valueChangeUpdates().subscribe((value) => { this.value.FieldId_15 = value; });
            this.value.FieldId_6 = this.FieldId_6.getFieldValue();
            this.FieldId_6.valueChangeUpdates().subscribe((value) => { this.value.FieldId_6 = value; });
            this.value.FieldId_9 = this.FieldId_9.getFieldValue();
            this.FieldId_9.valueChangeUpdates().subscribe((value) => { this.value.FieldId_9 = value; });
            this.value.FieldId_16 = this.FieldId_16.getFieldValue();
            this.FieldId_16.valueChangeUpdates().subscribe((value) => { this.value.FieldId_16 = value; });
            this.value.FieldId_13 = this.FieldId_13.getFieldValue();
            this.FieldId_13.valueChangeUpdates().subscribe((value) => { this.value.FieldId_13 = value; });
            this.value.FieldId_9_DDE = this.FieldId_9_DDE.getFieldValue();
            this.FieldId_9_DDE.valueChangeUpdates().subscribe((value) => { this.value.FieldId_9_DDE = value; });
            this.onFormLoad();
            this.checkForHTabOverFlow();
        });
    }
    clearError() {
        super.clearBasicFieldsError();
        super.clearHTabErrors();
        super.clearVTabErrors();
        this.FieldId_1.clearError();
        this.CUST_DTLS.clearError();
        this.FAMILY_DTLS.clearError();
        this.FieldId_14.clearError();
        this.FieldId_15.clearError();
        this.FieldId_6.clearError();
        this.FieldId_9.clearError();
        this.FieldId_9_DDE.clearError();
        this.FieldId_16.clearError();
        this.FieldId_13.clearError();
        this.errors = 0;
        this.errorMessage = [];
    }
    onReset() {
        super.resetBasicFields();
        this.FieldId_1.onReset();
        this.CUST_DTLS.onReset();
        this.FAMILY_DTLS.onReset();
        this.FieldId_14.onReset();
        this.FieldId_15.onReset();
        this.FieldId_6.onReset();
        this.FieldId_9.onReset();
        this.FieldId_16.onReset();
        this.FieldId_13.onReset();
        // this.FieldId_9_DDE.onReset();
        this.clearHTabErrors();
        this.clearVTabErrors();
        this.errors = 0;
        this.errorMessage = [];
        this.additionalInfo = undefined;
        this.dependencyMap.clear();
        this.value = new DDEModel();
        this.passNewValue(this.value);
        this.setReadOnly(false);
        this.onFormLoad();
    }
    async BORROWER_TAB_revalidate(): Promise<number> {
        var totalErrors = 0;
        await Promise.all([
            this.CUST_DTLS.revalidate(),
            this.FAMILY_DTLS.revalidate(),
            this.FieldId_14.revalidate(),
            this.FieldId_15.revalidate(),
            this.FieldId_6.revalidate(),
            this.FieldId_9.revalidate(),
        ]).then((errorCounts) => {
            errorCounts.forEach((errorCount) => {
                totalErrors += errorCount;
            });
        });
        this.hTabGroups['FieldId_10'].tabs['BORROWER_TAB'].errorCount = totalErrors;
        return totalErrors;
    }
    async VISIT_REF_revalidate(): Promise<number> {
        var totalErrors = 0;
        await Promise.all([
            this.FieldId_16.revalidate(),
        ]).then((errorCounts) => {
            errorCounts.forEach((errorCount) => {
                totalErrors += errorCount;
            });
        });
        this.hTabGroups['FieldId_10'].tabs['VISIT_REF'].errorCount = totalErrors;
        return totalErrors;
    }
    async COLATTERAL_revalidate(): Promise<number> {
        var totalErrors = 0;
        await Promise.all([
        ]).then((errorCounts) => {
            errorCounts.forEach((errorCount) => {
                totalErrors += errorCount;
            });
        });
        this.hTabGroups['FieldId_10'].tabs['COLATTERAL'].errorCount = totalErrors;
        return totalErrors;
    }
    async GO_NO_GO_revalidate(): Promise<number> {
        var totalErrors = 0;
        await Promise.all([
        ]).then((errorCounts) => {
            errorCounts.forEach((errorCount) => {
                totalErrors += errorCount;
            });
        });
        this.hTabGroups['FieldId_10'].tabs['GO_NO_GO'].errorCount = totalErrors;
        return totalErrors;
    }
    async COMMENTS_TAB_revalidate(): Promise<number> {
        var totalErrors = 0;
        await Promise.all([
            this.FieldId_13.revalidate(),
        ]).then((errorCounts) => {
            errorCounts.forEach((errorCount) => {
                totalErrors += errorCount;
            });
        });
        this.hTabGroups['FieldId_10'].tabs['COMMENTS_TAB'].errorCount = totalErrors;
        return totalErrors;
    }
    async FieldId_10_revalidate(): Promise<number> {
        var totalErrors = 0;
        await Promise.all([
            this.BORROWER_TAB_revalidate(),
            this.VISIT_REF_revalidate(),
            this.COLATTERAL_revalidate(),
            this.GO_NO_GO_revalidate(),
            this.COMMENTS_TAB_revalidate(),
        ]).then((errorCounts) => {
            errorCounts.forEach((errorCount) => {
                totalErrors += errorCount;
            });
        });
        return totalErrors;
    }

    async CUST_DTLS_updateCustGrid(event) {
        console.log("Calling update customer grid Emitter");
        this.FieldId_9_DDE.doAPIForCustomerList(event);
        // this.CUSTOMER_DETAILS.customerDetailMap = this.FieldId_9.doAPIForCustomerList(event)
    }
    async FieldId_9_selectCustId(event) {
        let inputMap = new Map();
        this.CUST_DTLS.CUST_DTLS_GRID_custDtlsEdit(event);
    }

    async FieldId_9_resetCustForm(event) {
        this.CUST_DTLS.setNewCustomerFrom(event);
    }
    async Submit_click(event) {
        let inputMap = new Map();
        inputMap.clear();
    }
    fieldDependencies = {
    }
}


