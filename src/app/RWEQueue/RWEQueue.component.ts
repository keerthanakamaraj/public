import { Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import { RWEQueueModel } from './RWEQueue.model';
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
import { RWEQueueGridComponent } from '../RWEQueueGrid/RWEQueueGrid.component';
import { PaginationProxy } from 'ag-grid-community';
// import { PasswordComponent } from '../password/password.component';
// import { RadioButtonComponent } from '../radio-button/radio-button.component';

const customCss: string = '';

@Component({
    selector: 'app-RWEQueue',
    templateUrl: './RWEQueue.component.html'
})
export class RWEQueueComponent extends FormComponent implements OnInit, AfterViewInit {
    @ViewChild('RWE_GRID', { static: false }) RWE_GRID: RWEQueueGridComponent;
    @ViewChild('Initiate_Applications', { static: false }) Initiate_Applications: ButtonComponent;
    @ViewChild('CLEAR', { static: false }) CLEAR: ButtonComponent;
    @ViewChild('CANCEL_MAIN_BTN', { static: false }) CANCEL_MAIN_BTN: ButtonComponent;

    selectedApplicationID = [];

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
        this.value = new RWEQueueModel();
        this.componentCode = 'RWEQueue';
    }
    setReadOnly(readOnly) {
        super.setBasicFieldsReadOnly(readOnly);
    }
    async onFormLoad() {
        this.setInputs(this.services.dataStore.getData(this.services.routing.currModal));
        await this.RWE_GRID.gridDataLoad({
            // 'sliderVal': this.MT_SLIDER.getFieldValue(),
        });
        this.setDependencies();
    }
    setInputs(param: any) {
        let params = this.services.http.mapToJson(param);
        if (params['mode']) {
            this.mode = params['mode'];
        }
    }
    async submitForm(path, apiCode, serviceCode) {
        this.submitData['formName'] = 'RWEQueue';
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
        this.value = new RWEQueueModel();
        this.value.setValue(inputValue);
        this.setDependencies();
        this.passNewValue(this.value);
    }
    ngOnInit() {
        if (this.formCode == undefined) { this.formCode = 'RWEQueue'; }
        if (this.formOnLoadError) { return; }
        var styleElement = document.createElement('style');
        styleElement.type = 'text/css';
        styleElement.innerHTML = customCss;
        styleElement.id = 'RWEQueue_customCss';
        document.getElementsByTagName('head')[0].appendChild(styleElement);
    }
    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
        var styleElement = document.getElementById('RWEQueue_customCss');
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
        this.value = new RWEQueueModel();
        this.passNewValue(this.value);
        this.setReadOnly(false);
        this.onFormLoad();
    }
    fieldDependencies = {
    }
    async CANCEL_MAIN_BTN_click(event) {

        var mainMessage = this.services.rloui.getAlertMessage('rlo.cancel.comfirmation');
        var button1 = this.services.rloui.getAlertMessage('', 'OK');
        var button2 = this.services.rloui.getAlertMessage('', 'CANCEL');

        Promise.all([mainMessage, button1, button2]).then(values => {
            console.log(values);
            let modalObj = {
                title: "Alert",
                mainMessage: values[0],
                modalSize: "modal-width-sm",
                buttons: [
                    { id: 1, text: values[1], type: "success", class: "btn-primary" },
                    { id: 2, text: values[2], type: "failure", class: "btn-warning-outline" }
                ]
            }
            this.services.rloui.confirmationModal(modalObj).then((response) => {
                console.log(response);
                if (response != null) {
                    if (response.id === 1) {
                        this.services.router.navigate(['home', 'LANDING']);
                    }
                }
            });
        });
    }

    async clear_click(event) {
        let inputMap = new Map();
        this.onReset();
    }

    goBack() {
        this.services.rloui.goBack();
    }

    CLEAR_BTN_click() {
        let rowData = [];
        this.RWE_GRID.readonlyGrid.agGrid.api.forEachNode(node => rowData.push(node.data));
        // return rowData;
        console.log("hfhgf", rowData);
        rowData.forEach(element => {
            element.RWE_APPLICATION_TYPE = false;
        });

        this.RWE_GRID.customRefreshGrid(rowData);
        //this.RWE_GRID.refreshGrid();
    }

    SUBMIT_BTN_click() {
        console.log(this.RWE_GRID.selectedApplicationList);
        this.Initiate_Applications.setDisabled(true);

        // this.selectedApplicationID = this.RWE_GRID.selectedApplicationList;
        this.RWE_GRID.selectedApplicationList.forEach(element => {
            this.selectedApplicationID.push(Number(element.RWE_PROPOSAL_ID))
        });
        let containsExpiredApp = false;
        this.RWE_GRID.selectedApplicationList.map((data) => {
            if (data.RWE_SCHME_EXPIRED == "Y") {
                containsExpiredApp = true;
            }
        });

        if (containsExpiredApp) {
            this.services.alert.showAlert(2, '', 4000, "Selected list contains an expired application");
        } else {
            //api call
            if (this.selectedApplicationID.length != 0) {
                let inputMap = new Map();
                inputMap.set('Body.CaseIds', this.selectedApplicationID);
                this.services.http.fetchApi('/retriggerRequestAPI', 'POST', inputMap, '/initiation').subscribe(
                    async (httpResponse: HttpResponse<any>) => {
                        var res = httpResponse.body;
                        // if(res == 200){
                        //     console.log("bkb", res);
                        // }
                        // else{
                        //     this.services.alert.showAlert(2, '', 4000, "Something went wrong, Please try again letter"); 
                        // }
                        var successmessage = "Retrigger process initiated. It may take some time depending on the number of records selected for processing";
                        //  var title = this.services.rloui.getAlertMessage('');
                        var mainMessage = this.services.rloui.getAlertMessage('', successmessage);
                        var button1 = this.services.rloui.getAlertMessage('', 'OK');
                        Promise.all([mainMessage, button1]).then(values => {
                            console.log(values);
                            let modalObj = {
                                title: "Alert",
                                mainMessage: values[0],
                                modalSize: "modal-width-sm",
                                buttons: [
                                    { id: 1, text: values[1], type: "success", class: "btn-primary" },
                                ]
                            }

                            this.services.rloui.confirmationModal(modalObj).then((response) => {
                                console.log(response);
                                if (response != null) {
                                    if (response.id === 1) {
                                        this.services.router.navigate(['home', 'LANDING']);
                                    }
                                }
                            });
                        });
                    },
                    async (httpError) => {
                        const err = httpError['error'];
                        this.services.alert.showAlert(2, '', 4000, "Something went wrong, Please try again letter");
                        this.Initiate_Applications.setDisabled(false);

                    });
            }
            else {
                this.services.alert.showAlert(2, '', 4000, "Please select application from list");
                this.Initiate_Applications.setDisabled(false);

            }
        }

    }



}