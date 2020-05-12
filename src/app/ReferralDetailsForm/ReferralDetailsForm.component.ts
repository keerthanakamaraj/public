import { Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import { ReferralDetailsFormModel } from './ReferralDetailsForm.model';
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

const customCss: string = '';

@Component({
    selector: 'app-ReferralDetailsForm',
    templateUrl: './ReferralDetailsForm.component.html'
})
export class ReferralDetailsFormComponent extends FormComponent implements OnInit, AfterViewInit {
    @ViewChild('RD_REF_NAME', { static: false }) RD_REF_NAME: TextBoxComponent;
    @ViewChild('RD_REF_NO', { static: false }) RD_REF_NO: TextBoxComponent;
    @ViewChild('RD_SAVE', { static: false }) RD_SAVE: ButtonComponent;
    @ViewChild('RD_RESET', { static: false }) RD_RESET: ButtonComponent;
  //  @ViewChild('hideLoanSeq', { static: false }) hideLoanSeq: HiddenComponent;
    @ViewChild('loanApplicationSeq', { static: false }) loanApplicationSeq: HiddenComponent;
    @ViewChild('hidAppId', { static: false }) hidAppId: HiddenComponent;
    @ViewChild('RD_ISD_CODE', { static: false }) RD_ISD_CODE: ComboBoxComponent;
    @ViewChild('hideISDCode', { static: false }) hideISDCode: HiddenComponent;

    @Input() ApplicationId: string = undefined;

    loanDetailsSeq=undefined;
    async revalidate(): Promise<number> {
        var totalErrors = 0;
        super.beforeRevalidate();
        await Promise.all([
            this.revalidateBasicField('RD_REF_NAME'),
            this.revalidateBasicField('RD_REF_NO'),
            this.revalidateBasicField('RD_ISD_CODE'),
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
        this.value = new ReferralDetailsFormModel();
        this.componentCode = 'ReferralDetailsForm';
    }
    setReadOnly(readOnly) {
        super.setBasicFieldsReadOnly(readOnly);
    }

    async onFormLoad(event) {
        // this.ApplicationId = event.custSeq;
        this.setInputs(this.services.dataStore.getData(this.services.routing.currModal));
        //let inputMap = new Map();
        this.hidAppId.setValue('RLO');
        this.hideISDCode.setValue('ISD_COUNTRY_CODE');
    }

    fetchReferalDetails() {
        let inputMap = new Map();
        inputMap.clear();

        if (this.ApplicationId != undefined) {

            let criteriaJson: any = { "Offset": 1, "Count": 10, FilterCriteria: [] };

            criteriaJson.FilterCriteria.push({
                "columnName": "ApplicationId",
                "columnType": "String",
                "conditions": {
                    "searchType": "equals",
                    "searchText": this.ApplicationId
                }
            });

            inputMap.set('QueryParam.criteriaDetails', criteriaJson);

            this.services.http.fetchApi('/LoanDetails', 'GET', inputMap).subscribe(
                async (httpResponse: HttpResponse<any>) => {

                    var res = httpResponse.body;
                    console.log("res", res)
                    var loopDataVar10 = [];
                    var loopVar10 = res['LoanDetails'];
                    if (loopVar10) {
                        for (var i = 0; i < loopVar10.length; i++) {

                            this.RD_REF_NAME.setValue(loopVar10[i].ReferrerName);
                            this.RD_ISD_CODE.setValue(loopVar10[i].ISDCountryCode);
                            this.RD_REF_NO.setValue(loopVar10[i].ReferrerPhoneNo);
                            this.loanDetailsSeq=loopVar10[i].LoanDetailSeq;
                        }
                    }
                },
                async (httpError) => {
                    var err = httpError['error']
                    if (err != null && err['ErrorElementPath'] != undefined && err['ErrorDescription'] != undefined) {
                    }
                }
            );
            this.setDependencies();
        }
    }

    setInputs(param: any) {
        let params = this.services.http.mapToJson(param);
        if (params['mode']) {
            this.mode = params['mode'];
        }
    }
    async submitForm(path, apiCode, serviceCode) {
        this.submitData['formName'] = 'ReferralDetails';
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
        this.value = new ReferralDetailsFormModel();
        this.value.setValue(inputValue);
        this.setDependencies();
        this.passNewValue(this.value);
    }
    ngOnInit() {
        if (this.formCode == undefined) { this.formCode = 'ReferralDetailsForm'; }
        if (this.formOnLoadError) { return; }
        var styleElement = document.createElement('style');
        styleElement.type = 'text/css';
        styleElement.innerHTML = customCss;
        styleElement.id = 'ReferralDetailsForm_customCss';
        document.getElementsByTagName('head')[0].appendChild(styleElement);
    }
    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
        var styleElement = document.getElementById('ReferralDetailsForm_customCss');
        styleElement.parentNode.removeChild(styleElement);
    }
    ngAfterViewInit() {
        setTimeout(() => {
            this.subsBFldsValueUpdates();
            this.onFormLoad(event);
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
        this.value = new ReferralDetailsFormModel();
        this.passNewValue(this.value);
        this.setReadOnly(false);
        this.onFormLoad(event);
    }
    async RD_SAVE_click(event) {
        let inputMap = new Map();
        if (this.loanDetailsSeq == undefined) {
            inputMap.clear();
            inputMap.set('Body.LoanDetails.ReferrerName', this.RD_REF_NAME.getFieldValue());
            inputMap.set('Body.LoanDetails.ReferrerPhoneNo', this.RD_REF_NO.getFieldValue());
            inputMap.set('Body.LoanDetails.ISDCountryCode', this.RD_ISD_CODE.getFieldValue());
            inputMap.set('Body.LoanDetails.ApplicationId', this.ApplicationId);

            this.services.http.fetchApi('/LoanDetails', 'POST', inputMap).subscribe(
                async (httpResponse: HttpResponse<any>) => {
                    var res = httpResponse.body;
                    // this.hideLoanSeq.setValue(res['LoanDetails']['LoanDetailSeq']);
                    this.services.alert.showAlert(1, 'rlo.success.save.referral', 5000);
                },
                async (httpError) => {
                    var err = httpError['error']
                    if (err != null && err['ErrorElementPath'] != undefined && err['ErrorDescription'] != undefined) {
                        if (err['ErrorElementPath'] == 'LoanDetails.ApplicationId') {
                            this.loanApplicationSeq.setError(err['ErrorDescription']);
                        }
                        else if (err['ErrorElementPath'] == 'LoanDetails.ISDCountryCode') {
                            this.RD_ISD_CODE.setError(err['ErrorDescription']);
                        }
                        else if (err['ErrorElementPath'] == 'LoanDetails.ReferrerPhoneNo') {
                            this.RD_REF_NO.setError(err['ErrorDescription']);
                        }
                        else if (err['ErrorElementPath'] == 'LoanDetails.ReferrerName') {
                            this.RD_REF_NAME.setError(err['ErrorDescription']);
                        }
                    }
                    this.services.alert.showAlert(2, 'rlo.error.save.referral', -1);
                }
            );
        }
        else {
            inputMap.clear();
            inputMap.set('PathParam.LoanDetailSeq', this.loanDetailsSeq);
            inputMap.set('Body.LoanDetails.ApplicationId', this.ApplicationId);
            inputMap.set('Body.LoanDetails.ReferrerName', this.RD_REF_NAME.getFieldValue());
            inputMap.set('Body.LoanDetails.ReferrerPhoneNo', this.RD_REF_NO.getFieldValue());
            inputMap.set('Body.LoanDetails.ISDCountryCode', this.RD_ISD_CODE.getFieldValue());

            this.services.http.fetchApi('/LoanDetails/{LoanDetailSeq}', 'PUT', inputMap).subscribe(
                async (httpResponse: HttpResponse<any>) => {
                    var res = httpResponse.body;
                    this.services.alert.showAlert(1, 'rlo.success.update.referral', 5000);
                },
                async (httpError) => {
                    var err = httpError['error']
                    if (err != null && err['ErrorElementPath'] != undefined && err['ErrorDescription'] != undefined) {
                        if (err['ErrorElementPath'] == 'LoanDetails.ReferrerPhoneNo') {
                            this.RD_REF_NO.setError(err['ErrorDescription']);
                        }
                        else if (err['ErrorElementPath'] == 'LoanDetails.ISDCountryCode') {
                            this.RD_ISD_CODE.setError(err['ErrorDescription']);
                        }
                        else if (err['ErrorElementPath'] == 'LoanDetails.ReferrerName') {
                            this.RD_REF_NAME.setError(err['ErrorDescription']);
                        }
                        else if (err['ErrorElementPath'] == 'LoanDetails.ApplicationId') {
                            this.loanApplicationSeq.setError(err['ErrorDescription']);
                        }
                        // else if (err['ErrorElementPath'] == 'LoanDetailSeq') {
                        //     this.loanDetailsSeq.setError(err['ErrorDescription']);
                        // }
                    }
                    this.services.alert.showAlert(2, 'rlo.error.update.referral', -1);
                }
            );
        }
    }

    RD_RESET_click(event){
this.onReset();
    }

    fieldDependencies = {
        RD_ISD_CODE : {
            inDep: [

                { paramKey: "VALUE1", depFieldID: "RD_ISD_CODE", paramType: "PathParam" },
                { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
                { paramKey: "KEY1", depFieldID: "hideISDCode", paramType: "QueryParam" },
            ],
            outDep: [
            ]
        },
    }
}