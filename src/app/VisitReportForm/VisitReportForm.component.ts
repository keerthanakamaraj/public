import { Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import { VisitReportFormModel } from './VisitReportForm.model';
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
import { VisitReportGridComponent } from '../VisitReportGrid/VisitReportGrid.component';
import { VisitReportHandlerComponent } from '../VisitReportForm/visitreport-handler.component';
import { RLOUIRadioComponent } from '../rlo-ui-radio/rlo-ui-radio.component';

const customCss: string = '';

@Component({
    selector: 'app-VisitReportForm',
    templateUrl: './VisitReportForm.component.html'
})
export class VisitReportFormComponent extends FormComponent implements OnInit, AfterViewInit {
    @ViewChild('VRF_ReportType', { static: false }) VRF_ReportType: RLOUIRadioComponent;
    @ViewChild('VRF_DateOfVisit', { static: false }) VRF_DateOfVisit: DateComponent;
    @ViewChild('VRF_AddressofVisit', { static: false }) VRF_AddressofVisit: TextAreaComponent;
    @ViewChild('VRF_OfficialName', { static: false }) VRF_OfficialName: ComboBoxComponent;
    @ViewChild('VRF_NameofPersonMet', { static: false }) VRF_NameofPersonMet: TextBoxComponent;
    @ViewChild('VRF_Designation', { static: false }) VRF_Designation: TextBoxComponent;
    //@ViewChild('VRF_OfficialId', {static: false}) VRF_OfficialId: ComboBoxComponent;
    @ViewChild('VRF_OfficialBusinessGroup', { static: false }) VRF_OfficialBusinessGroup: ComboBoxComponent;
    @ViewChild('VRF_PlaceOfVisit', { static: false }) VRF_PlaceOfVisit: ComboBoxComponent;
    @ViewChild('VRF_Photograph', { static: false }) VRF_Photograph: RLOUIRadioComponent;
    @ViewChild('VRF_AdverseObservation', { static: false }) VRF_AdverseObservation: RLOUIRadioComponent;
    @ViewChild('VRF_Observations', { static: false }) VRF_Observations: TextAreaComponent;
    @ViewChild('VRF_Save', { static: false }) VRF_Save: ButtonComponent;
    @ViewChild('VRF_Reset', { static: false }) VRF_Reset: ButtonComponent;
    @ViewChild('Visit_Report_Grid', { static: false }) Visit_Report_Grid: VisitReportGridComponent;
    @ViewChild('Handler', { static: false }) Handler: VisitReportHandlerComponent;
    @ViewChild('HidAnyObservation', { static: false }) HidAnyObservation: HiddenComponent;
    @ViewChild('HidAppid', { static: false }) HidAppid: HiddenComponent;
    @ViewChild('HidAttachPhoto', { static: false }) HidAttachPhoto: HiddenComponent;
    @ViewChild('HidOfficialBusGroup', { static: false }) HidOfficialBusGroup: HiddenComponent;
    //@ViewChild('HidOfficialId', {static: false}) HidOfficialId: HiddenComponent;
    @ViewChild('HidOfficialName', { static: false }) HidOfficialName: HiddenComponent;
    @ViewChild('HidReportType', { static: false }) HidReportType: HiddenComponent;
    @ViewChild('HidVisitReportSeqId', { static: false }) HidVisitReportSeqId: HiddenComponent;
    @ViewChild('HidPlaceOfVisit', { static: false }) HidPlaceOfVisit: HiddenComponent;
    @ViewChild('VRF_UPLOAD_BTN', { static: false }) VRF_UPLOAD_BTN: ButtonComponent;

    @Input() ApplicationId: string = undefined;
    @Input() activeBorrowerSeq: string = undefined;

    monthLimit: number = 1;
    async revalidate(): Promise<number> {
        var totalErrors = 0;
        super.beforeRevalidate();
        await Promise.all([
            this.revalidateBasicField('VRF_ReportType'),
            this.revalidateBasicField('VRF_DateOfVisit'),
            this.revalidateBasicField('VRF_AddressofVisit'),
            this.revalidateBasicField('VRF_OfficialName'),
            this.revalidateBasicField('VRF_NameofPersonMet'),
            this.revalidateBasicField('VRF_Designation'),
            //this.revalidateBasicField('VRF_OfficialId'),
            this.revalidateBasicField('VRF_OfficialBusinessGroup'),
            this.revalidateBasicField('VRF_PlaceOfVisit'),
            this.revalidateBasicField('VRF_Photograph'),
            this.revalidateBasicField('VRF_AdverseObservation'),
            this.revalidateBasicField('VRF_Observations'),
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
        this.value = new VisitReportFormModel();
        this.componentCode = 'VisitReportForm';
    }
    setReadOnly(readOnly) {
        super.setBasicFieldsReadOnly(readOnly);
    }
    async onFormLoad() {
        this.setInputs(this.services.dataStore.getData(this.services.routing.currModal));
        this.HidAnyObservation.setValue('YES_NO');
        this.HidAppid.setValue('RLO');
        this.HidAttachPhoto.setValue('YES_NO');
        this.HidOfficialBusGroup.setValue('OFFICIAL_BUSINESS_GROUP');
        //this.HidOfficialId.setValue('OFFICIAL_ID');
        this.HidOfficialName.setValue('OFFICIAL_NAME');
        this.HidReportType.setValue('REPORT_TYPE');
        this.HidPlaceOfVisit.setValue('PLACE_OF_VISIT');
        let inputMap = new Map();
        this.VRF_UPLOAD_BTN.setDisabled(true);
        this.VRF_Photograph.setDefault('N');
        this.VRF_AdverseObservation.setDefault('N');
        this.VRF_Photograph.setReadOnly(true);
        await this.Visit_Report_Grid.gridDataLoad({
            'BorrowerSeq': this.activeBorrowerSeq
        });
        await this.Handler.onFormLoad({
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
        this.submitData['formName'] = 'Visit Report Form';
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
        this.value = new VisitReportFormModel();
        this.value.setValue(inputValue);
        this.setDependencies();
        this.passNewValue(this.value);
    }
    ngOnInit() {
        if (this.formCode == undefined) { this.formCode = 'VisitReportForm'; }
        if (this.formOnLoadError) { return; }
        var styleElement = document.createElement('style');
        styleElement.type = 'text/css';
        styleElement.innerHTML = customCss;
        styleElement.id = 'VisitReportForm_customCss';
        document.getElementsByTagName('head')[0].appendChild(styleElement);
    }
    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
        var styleElement = document.getElementById('VisitReportForm_customCss');
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
        this.value = new VisitReportFormModel();
        this.passNewValue(this.value);
        //this.setReadOnly(false);
        this.VRF_Photograph.setValue(this.VRF_Photograph.getDefault());
        this.VRF_AdverseObservation.setValue( this.VRF_AdverseObservation.getDefault());
        this.onFormLoad();
    }
    async VRF_Save_click(event) {
        this.VRF_Save.setDisabled(true);
        let inputMap = new Map();
        var numberOfErrors: number = await this.revalidate();
        if (numberOfErrors == 0) {
            if (!this.isDuplicateEntrey()) {
                if (this.HidVisitReportSeqId.getFieldValue() != undefined) {

                    inputMap = this.generateSaveUpdateRequestJson(inputMap);

                    this.services.http.fetchApi('/RMRADetails/{Id}', 'PUT', inputMap, '/rlo-de').subscribe(
                        async (httpResponse: HttpResponse<any>) => {
                            var res = httpResponse.body;
                            this.services.alert.showAlert(1, 'rlo.success.update.visitreport', 5000);
                            // this.Visit_Report_Grid.gridDataLoad({
                            //     'BorrowerSeq': this.activeBorrowerSeq
                            // });
                            this.onReset();
                            this.VRF_Save.setDisabled(false);
                        },
                        async (httpError) => {
                            this.parseResponseError(httpError['error']);
                            this.services.alert.showAlert(2, 'rlo.error.update.visitreport', -1);
                            this.VRF_Save.setDisabled(false);
                        }
                    );
                }
                else {
                    inputMap = this.generateSaveUpdateRequestJson(inputMap);
                    this.services.http.fetchApi('/RMRADetails', 'POST', inputMap, '/rlo-de').subscribe(
                        async (httpResponse: HttpResponse<any>) => {
                            var res = httpResponse.body;
                            this.services.alert.showAlert(1, 'rlo.success.save.visitreport', 5000);
                            // this.Visit_Report_Grid.gridDataLoad({
                            //     'BorrowerSeq': this.activeBorrowerSeq
                            // });
                            this.onReset();
                            this.VRF_Save.setDisabled(false);
                        },
                        async (httpError) => {
                            this.parseResponseError(httpError['error']);
                            this.services.alert.showAlert(2, 'rlo.error.save.visitreport', -1);
                            this.VRF_Save.setDisabled(false);
                        }
                    );
                }
            } else {
                this.services.alert.showAlert(2, 'rlo.error.duplicate-Record', -1);
                this.VRF_Save.setDisabled(false);
            }
        }
        else {
            this.services.alert.showAlert(2, 'rlo.error.invalid.form', -1);
            this.VRF_Save.setDisabled(false);
        }
    }

    generateSaveUpdateRequestJson(inputMap) {
        inputMap.clear();
        if (this.HidVisitReportSeqId.getFieldValue() != undefined) {
            inputMap.set('PathParam.Id', this.HidVisitReportSeqId.getFieldValue());
        }
        inputMap.set('Body.RMRADetails.ProposalId', this.ApplicationId);
        inputMap.set('Body.RMRADetails.TrnDemographicId', this.activeBorrowerSeq);
        inputMap.set('Body.RMRADetails.ReportType', this.VRF_ReportType.getFieldValue());
        inputMap.set('Body.RMRADetails.DateOfVisit', this.VRF_DateOfVisit.getFieldValue());
        inputMap.set('Body.RMRADetails.AddressOfVisit', this.VRF_AddressofVisit.getFieldValue());
        inputMap.set('Body.RMRADetails.NameBankRep', this.VRF_OfficialName.getFieldValue());
        inputMap.set('Body.RMRADetails.NameOfPerson', this.VRF_NameofPersonMet.getFieldValue());
        inputMap.set('Body.RMRADetails.DesignationOfPerson', this.VRF_Designation.getFieldValue());
        inputMap.set('Body.RMRADetails.BankRepVertical', this.VRF_OfficialBusinessGroup.getFieldValue());
        inputMap.set('Body.RMRADetails.PlaceofVisit', this.VRF_PlaceOfVisit.getFieldValue());
        inputMap.set('Body.RMRADetails.AttVRPhoto', this.VRF_Photograph.getFieldValue());
        inputMap.set('Body.RMRADetails.AdverseObservation', this.VRF_AdverseObservation.getFieldValue());
        inputMap.set('Body.RMRADetails.GistofDiscussion', this.VRF_Observations.getFieldValue());
        return inputMap;
    }

    parseResponseError(err) {

        if (err != null && err['ErrorElementPath'] != undefined && err['ErrorDescription'] != undefined) {
            if (err['ErrorElementPath'] == 'RMRADetails.GistofDiscussion') {
                this.VRF_Observations.setError(err['ErrorDescription']);
            }
            else if (err['ErrorElementPath'] == 'RMRADetails.AdverseObservation') {
                this.VRF_AdverseObservation.setError(err['ErrorDescription']);
            }
            else if (err['ErrorElementPath'] == 'RMRADetails.AttVRPhoto') {
                this.VRF_Photograph.setError(err['ErrorDescription']);
            }
            else if (err['ErrorElementPath'] == 'RMRADetails.PlaceofVisit') {
                this.VRF_PlaceOfVisit.setError(err['ErrorDescription']);
            }
            else if (err['ErrorElementPath'] == 'RMRADetails.BankRepVertical') {
                this.VRF_OfficialBusinessGroup.setError(err['ErrorDescription']);
            }
            else if (err['ErrorElementPath'] == 'RMRADetails.DesignationOfPerson') {
                this.VRF_Designation.setError(err['ErrorDescription']);
            }

            else if (err['ErrorElementPath'] == 'RMRADetails.NameOfPerson') {
                this.VRF_NameofPersonMet.setError(err['ErrorDescription']);
            }
            else if (err['ErrorElementPath'] == 'RMRADetails.NameBankRep') {
                this.VRF_OfficialName.setError(err['ErrorDescription']);
            }
            else if (err['ErrorElementPath'] == 'RMRADetails.AddressOfVisit') {
                this.VRF_AddressofVisit.setError(err['ErrorDescription']);
            }
            else if (err['ErrorElementPath'] == 'RMRADetails.DateOfVisit') {
                this.VRF_DateOfVisit.setError(err['ErrorDescription']);
            }
            else if (err['ErrorElementPath'] == 'RMRADetails.ReportType') {
                this.VRF_ReportType.setError(err['ErrorDescription']);
            }
        }
    }


    async Visit_Report_Grid_modifyVisitReport(event) {
        console.log("shweta :: visit report dtls for edit", event.VisitReportId);
        let inputMap = new Map();
        this.showSpinner();
        inputMap.clear();

        inputMap.set('PathParam.Id', event.VisitReportId);

        this.services.http.fetchApi('/RMRADetails/{Id}', 'GET', inputMap, '/rlo-de').subscribe(
            async (httpResponse: HttpResponse<any>) => {
                var res = httpResponse.body['RMRADetails'];
                this.VRF_ReportType.setValue(res['ReportType']);
                this.VRF_DateOfVisit.setValue(res['DateOfVisit']);
                this.VRF_AddressofVisit.setValue(res['AddressOfVisit']);
                this.VRF_OfficialName.setValue(res['NameBankRep']);
                this.VRF_NameofPersonMet.setValue(res['NameOfPerson']);
                this.VRF_Designation.setValue(res['DesignationOfPerson']);
                this.VRF_OfficialBusinessGroup.setValue(res['BankRepVertical']);
                this.VRF_PlaceOfVisit.setValue(res['PlaceofVisit']);
                this.VRF_Photograph.setValue(res['AttVRPhoto']);
                this.VRF_AdverseObservation.setValue(res['AdverseObservation']);
                this.VRF_Observations.setValue(res['GistofDiscussion']);
                this.HidVisitReportSeqId.setValue(res['Id']);
            },
            async (httpError) => {
                var err = httpError['error']
                if (err != null && err['ErrorElementPath'] != undefined && err['ErrorDescription'] != undefined) {
                }
                this.hideSpinner();
                this.services.alert.showAlert(2, 'rlo.error.load.form', -1);
                this.hideSpinner();
            }
        );
    }

    async VRF_DateOfVisit_blur(event) {
        const inputMap = new Map();
        if (!(this.isTodaysDate(this.VRF_DateOfVisit.getFieldValue()) || this.isPastDate(this.VRF_DateOfVisit.getFieldValue()))) {
            this.VRF_DateOfVisit.setError('rlo.error.dov-invalid');
            return 1;
        } else if (!this.isMonthsLimitValid(this.VRF_DateOfVisit.getFieldValue())) {
            this.VRF_DateOfVisit.setError('rlo.error.dov-expired');
            return 1;
        }
    }

    isTodaysDate(selectedDate) {
        const moment = require('moment');
        const currentDate = moment();
        currentDate.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
        selectedDate = moment(selectedDate, 'DD-MM-YYYY');
        if (moment(currentDate).isSame(selectedDate)) {
            return true;
        }
        return false;
    }

    isPastDate(selectedDate) {
        const moment = require('moment');
        const currentDate = moment();
        currentDate.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
        selectedDate = moment(selectedDate, 'DD-MM-YYYY');
        console.log("current date :: ", currentDate._d);
        console.log("selected date :: ", selectedDate._d);
        if (selectedDate >= currentDate) {
            return false;
        }
        return true;
    }

    isMonthsLimitValid(selectedDate) {
        const moment = require('moment');
        let currentDate = moment();
        currentDate.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
        selectedDate = moment(selectedDate, 'DD-MM-YYYY');
        let months = currentDate.diff(selectedDate, 'months');
        console.log("selected months count is:", months);
        console.log("default months count is:", this.monthLimit);
        if (months <= this.monthLimit) {
            console.log("returning true", months);
            return true;
        }
        else {
            console.log("returning false", months);
            return false;
        }
    }

    isDuplicateEntrey() {
        let duplicateFound = false;
        let OldRecords = [];
        OldRecords = this.Visit_Report_Grid.VisitRecordsList;
        for (let eachRecord of OldRecords) {
            if (this.HidVisitReportSeqId != eachRecord.Id && eachRecord.PlaceofVisit == this.VRF_PlaceOfVisit.getFieldValue() && eachRecord.NameOfPerson.replace(/\s/g, "").toUpperCase() == this.VRF_NameofPersonMet.getFieldValue().replace(/\s/g, "").toUpperCase() && eachRecord.DateOfVisit == this.VRF_DateOfVisit.getFieldValue()) {
               // console.log("shweta : old rec ", eachRecord.NameOfPerson, "new record", this.VRF_NameofPersonMet.getFieldValue());
                duplicateFound = true;
                break;
            }
        }
        return duplicateFound;
    }

    VRF_Reset_click(event){
        this.onReset();
    }
    fieldDependencies = {
        VRF_ReportType: {
            inDep: [

                { paramKey: "VALUE1", depFieldID: "VRF_ReportType", paramType: "PathParam" },
                { paramKey: "APPID", depFieldID: "HidAppid", paramType: "QueryParam" },
                { paramKey: "KEY1", depFieldID: "HidReportType", paramType: "QueryParam" },
            ],
            outDep: [
            ]
        },
        VRF_OfficialName: {
            inDep: [

                { paramKey: "VALUE1", depFieldID: "VRF_OfficialName", paramType: "PathParam" },
                { paramKey: "KEY1", depFieldID: "HidOfficialName", paramType: "QueryParam" },
                { paramKey: "APPID", depFieldID: "HidAppid", paramType: "QueryParam" },
            ],
            outDep: [
            ]
        },
        VRF_OfficialBusinessGroup: {
            inDep: [

                { paramKey: "VALUE1", depFieldID: "VRF_OfficialBusinessGroup", paramType: "PathParam" },
                { paramKey: "APPID", depFieldID: "HidAppid", paramType: "QueryParam" },
                { paramKey: "KEY1", depFieldID: "HidOfficialBusGroup", paramType: "QueryParam" },
            ],
            outDep: [
            ]
        },
        VRF_Photograph: {
            inDep: [

                { paramKey: "VALUE1", depFieldID: "VRF_Photograph", paramType: "PathParam" },
                { paramKey: "APPID", depFieldID: "HidAppid", paramType: "QueryParam" },
                { paramKey: "KEY1", depFieldID: "HidAttachPhoto", paramType: "QueryParam" },
            ],
            outDep: [
            ]
        },
        VRF_AdverseObservation: {
            inDep: [

                { paramKey: "VALUE1", depFieldID: "VRF_AdverseObservation", paramType: "PathParam" },
                { paramKey: "APPID", depFieldID: "HidAppid", paramType: "QueryParam" },
                { paramKey: "KEY1", depFieldID: "HidAnyObservation", paramType: "QueryParam" },
            ],
            outDep: [
            ]
        },
        VRF_PlaceOfVisit: {
            inDep: [

                { paramKey: "VALUE1", depFieldID: "VRF_PlaceOfVisit", paramType: "PathParam" },
                { paramKey: "APPID", depFieldID: "HidAppid", paramType: "QueryParam" },
                { paramKey: "KEY1", depFieldID: "HidPlaceOfVisit", paramType: "QueryParam" },
            ],
            outDep: [
            ]
        },
    }

}