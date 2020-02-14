import { Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import { EmployeeC3YModel } from './EmployeeC3Y.model';
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

const customCss: string = '/*Custom Style for Component*/';

@Component({
    selector: 'app-EmployeeC3Y',
    templateUrl: './EmployeeC3Y.component.html'
})
export class EmployeeC3YComponent extends FormComponent implements OnInit, AfterViewInit {
    @ViewChild('FieldId_1', { static: false }) FieldId_1: TextBoxComponent;
    @ViewChild('FieldId_10', { static: false }) FieldId_10: ComboBoxComponent;
    @ViewChild('FieldId_3', { static: false }) FieldId_3: TextBoxComponent;
    @ViewChild('FieldId_4', { static: false }) FieldId_4: TextBoxComponent;
    @ViewChild('FieldId_5', { static: false }) FieldId_5: ButtonComponent;
    @Output() refreshGridC3Y: EventEmitter<any> = new EventEmitter<any>();
    @ViewChild('FieldId_11', { static: false }) FieldId_11: ButtonComponent;
    @ViewChild('FieldId_6', { static: false }) FieldId_6: ButtonComponent;
    @ViewChild('empId', { static: false }) empId: HiddenComponent;
    async revalidate(): Promise<number> {
        var totalErrors = 0;
        super.beforeRevalidate();
        await Promise.all([
            this.revalidateBasicField('FieldId_1'),
            this.revalidateBasicField('FieldId_10'),
            this.revalidateBasicField('FieldId_3'),
            this.revalidateBasicField('FieldId_4'),
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
        this.value = new EmployeeC3YModel();
        this.componentCode = 'EmployeeC3Y';
    }
    setReadOnly(readOnly) {
        super.setBasicFieldsReadOnly(readOnly);
    }
    async onFormLoad() {
        this.setInputs(this.services.dataStore.getData(this.services.routing.currModal));
        this.setDependencies();
    }
    setInputs(param: any) {
        let params = this.services.http.mapToJson(param);
        if (params['mode']) {
            this.mode = params['mode'];
        }
    }
    async submitForm(path, apiCode, serviceCode) {
        this.submitData['formName'] = 'Employee';
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
        this.value = new EmployeeC3YModel();
        this.value.setValue(inputValue);
        this.setDependencies();
        this.passNewValue(this.value);
    }
    ngOnInit() {
        if (this.formCode == undefined) { this.formCode = 'EmployeeC3Y'; }
        if (this.formOnLoadError) { return; }
        var styleElement = document.createElement('style');
        styleElement.type = 'text/css';
        styleElement.innerHTML = customCss;
        styleElement.id = 'EmployeeC3Y_customCss';
        document.getElementsByTagName('head')[0].appendChild(styleElement);
    }
    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
        var styleElement = document.getElementById('EmployeeC3Y_customCss');
        styleElement.parentNode.removeChild(styleElement);
    }
    ngAfterViewInit() {
        setTimeout(() => {
            this.subsBFldsValueUpdates();
            this.onFormLoad();
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
        this.value = new EmployeeC3YModel();
        this.passNewValue(this.value);
        this.setReadOnly(false);
        this.onFormLoad();
    }
    async FieldId_5_click(event) {
        let inputMap = new Map();
        inputMap.clear();
        inputMap.set('Body.EmployeeC3Y.employeeName', this.FieldId_1.getFieldValue());
        inputMap.set('Body.EmployeeC3Y.unit', this.FieldId_10.getFieldValue());
        inputMap.set('Body.EmployeeC3Y.address', this.FieldId_3.getFieldValue());
        inputMap.set('Body.EmployeeC3Y.gender', this.FieldId_4.getFieldValue());
        await this.services.http.fetchApi('/EmployeeC3Y', 'POST', inputMap).toPromise()
            .then(
                async (httpResponse: HttpResponse<any>) => {
                    var res = httpResponse.body;
                    this.services.alert.showAlert(1, 'Employee Saved Successfully', 5000);
                },
                async (httpError) => {
                    var err = httpError['error']
                    if (err != null && err['ErrorElementPath'] != undefined && err['ErrorDescription'] != undefined) {
                        if (err['ErrorElementPath'] == 'EmployeeC3Y.gender') {
                            this.FieldId_4.setError(err['ErrorDescription']);
                        }
                        else if (err['ErrorElementPath'] == 'EmployeeC3Y.address') {
                            this.FieldId_3.setError(err['ErrorDescription']);
                        }
                        else if (err['ErrorElementPath'] == 'EmployeeC3Y.unit') {
                            this.FieldId_10.setError(err['ErrorDescription']);
                        }
                        else if (err['ErrorElementPath'] == 'EmployeeC3Y.employeeName') {
                            this.FieldId_1.setError(err['ErrorDescription']);
                        }
                    }
                    this.services.alert.showAlert(2, 'Failed to Save', -1);
                }
            );
    }
    async FieldId_11_click(event) {
        let inputMap = new Map();
        inputMap.clear();
        inputMap.set('Body.EmployeeC3Y.employeeName', this.FieldId_1.getFieldValue());
        inputMap.set('Body.EmployeeC3Y.unit', this.FieldId_10.getFieldValue());
        inputMap.set('Body.EmployeeC3Y.address', this.FieldId_3.getFieldValue());
        inputMap.set('Body.EmployeeC3Y.gender', this.FieldId_4.getFieldValue());
        inputMap.set('PathParam.employeeId', this.empId.getFieldValue());
        await this.services.http.fetchApi('/EmployeeC3Y/{employeeId}', 'PUT', inputMap).toPromise()
            .then(
                async (httpResponse: HttpResponse<any>) => {
                    var res = httpResponse.body;
                    this.refreshGridC3Y.emit({
                    });
                    this.services.alert.showAlert(1, 'Updated Successfully', 5000);
                },
                async (httpError) => {
                    var err = httpError['error']
                    if (err != null && err['ErrorElementPath'] != undefined && err['ErrorDescription'] != undefined) {
                        if (err['ErrorElementPath'] == 'employeeId') {
                            this.empId.setError(err['ErrorDescription']);
                        }
                        else if (err['ErrorElementPath'] == 'EmployeeC3Y.gender') {
                            this.FieldId_4.setError(err['ErrorDescription']);
                        }
                        else if (err['ErrorElementPath'] == 'EmployeeC3Y.address') {
                            this.FieldId_3.setError(err['ErrorDescription']);
                        }
                        else if (err['ErrorElementPath'] == 'EmployeeC3Y.unit') {
                            this.FieldId_10.setError(err['ErrorDescription']);
                        }
                        else if (err['ErrorElementPath'] == 'EmployeeC3Y.employeeName') {
                            this.FieldId_1.setError(err['ErrorDescription']);
                        }
                    }
                    this.services.alert.showAlert(2, 'Employee Edit Failed', -1);
                }
            );
    }
    async changeToAddMode(event) {
        let inputMap = new Map();
        this.onReset();
        this.FieldId_5.setHidden(false);
        this.FieldId_11.setHidden(true);
    }
    async changeToEditMode(event) {
        let inputMap = new Map();
        this.onReset();
        this.FieldId_5.setHidden(true);
        this.FieldId_11.setHidden(true);
        this.empId.setValue(event.Id);
        inputMap.clear();
        inputMap.set('PathParam.employeeId', this.empId.getFieldValue());
        await this.services.http.fetchApi('/EmployeeC3Y/{employeeId}', 'GET', inputMap).toPromise()
            .then(
                async (httpResponse: HttpResponse<any>) => {
                    var res = httpResponse.body;
                    this.FieldId_1.setValue(res['EmployeeC3Y']['employeeName']);
                    this.FieldId_10.setValue(res['EmployeeC3Y']['unit']);
                    this.FieldId_3.setValue(res['EmployeeC3Y']['gender']);
                    this.FieldId_4.setValue(res['EmployeeC3Y']['address']);
                },
                async (httpError) => {
                    var err = httpError['error']
                    if (err != null && err['ErrorElementPath'] != undefined && err['ErrorDescription'] != undefined) {
                        if (err['ErrorElementPath'] == 'employeeId') {
                            this.empId.setError(err['ErrorDescription']);
                        }
                    }
                    this.services.alert.showAlert(2, 'Load Data Failed', -1);
                }
            );
    }
    fieldDependencies = {
    }

}
