import { Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import { checkEligibilityFormModel } from './checkEligibilityForm.model';
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
import { CheckEligibilityGridComponent } from '../CheckEligibilityGrid/CheckEligibilityGrid.component';
import { InitiationComponent } from 'src/app/Initiation/Initiation.component';


const customCss: string = '';

@Component({
    selector: 'app-checkEligibilityForm',
    templateUrl: './checkEligibilityForm.component.html'
})
export class checkEligibilityFormComponent extends FormComponent implements OnInit, AfterViewInit {
    CheckEligibilityGrid: any;
    temp: AmountComponent;
    @ViewChild('FieldId_1', { static: false }) FieldId_1: CheckEligibilityGridComponent;

    @Input() eligibilityData: InitiationComponent;
    // @Input() MainComponent: InitiationComponent;

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
        this.value = new checkEligibilityFormModel();
        this.componentCode = 'checkEligibilityForm';
        console.log("in constructor");


    }
    setReadOnly(readOnly) {
        super.setBasicFieldsReadOnly(readOnly);
    }

    async onFormLoad() {
        this.setInputs(this.services.dataStore.getData(this.services.routing.currModal));
        let inputMap = new Map();
        let LoanData: any = this.services.dataStore.getRouteParam(this.services.routing.currModal, 'Checkvalue');
        var loopDataVar1 = [];
        var loopVar1 = LoanData;
        if (loopVar1) {
            for (var i = 0; i < loopVar1.length; i++) {
                var tempObj = {};
                tempObj['Rule_Name'] = loopVar1[i].RULE_NAME;
                tempObj['Actual_Value'] = loopVar1[i].ACTUAL_VALUE;
                tempObj['Decision'] = loopVar1[i].DECISION;
                tempObj['Result'] = loopVar1[i].RESULT;
                tempObj['Expected_Value'] = loopVar1[i].EXPECTED_VALUE;
                loopDataVar1.push(tempObj);
            }
        }
        this.FieldId_1.setValue(loopDataVar1);
        this.setDependencies();
    }

    setInputs(param: any) {
        let params = this.services.http.mapToJson(param);
        if (params['mode']) {
            this.mode = params['mode'];
        }
    }
    async submitForm(path, apiCode, serviceCode) {
        this.submitData['formName'] = 'check Eligibility Form';
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
        // this.FieldId_1.setValue(inputValue['FieldId_1']);
        this.value = new checkEligibilityFormModel();
        this.value.setValue(inputValue);
        this.setDependencies();
        this.passNewValue(this.value);
    }
    ngOnInit() {
        if (this.formCode == undefined) { this.formCode = 'checkEligibilityForm'; }
        if (this.formOnLoadError) { return; }
        var styleElement = document.createElement('style');
        styleElement.type = 'text/css';
        styleElement.innerHTML = customCss;
        styleElement.id = 'checkEligibilityForm_customCss';
        document.getElementsByTagName('head')[0].appendChild(styleElement);
    }
    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
        var styleElement = document.getElementById('checkEligibilityForm_customCss');
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
        this.value = new checkEligibilityFormModel();
        this.passNewValue(this.value);
        this.setReadOnly(false);
        this.onFormLoad();
    }
    fieldDependencies = {
    }

}