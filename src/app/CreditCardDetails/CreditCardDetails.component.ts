import { Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import { CreditCardDetailsModel } from './CreditCardDetails.model';
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
import { CreditCardHandlerComponent } from '../CreditCardDetails/creditcard-handler.component';


const customCss: string = '';

@Component({
    selector: 'app-CreditCardDetails',
    templateUrl: './CreditCardDetails.component.html'
})
export class CreditCardDetailsComponent extends FormComponent implements OnInit, AfterViewInit {
    @ViewChild('Branch', { static: false }) Branch: TextBoxComponent;
    @ViewChild('FrontPageCategory', { static: false }) FrontPageCategory: ComboBoxComponent;
    @ViewChild('MaximumCardLimit', { static: false }) MaximumCardLimit: TextBoxComponent;
    @ViewChild('ApprovedLimit', { static: false }) ApprovedLimit: TextBoxComponent;
    @ViewChild('SettlementAccountType', { static: false }) SettlementAccountType: ComboBoxComponent;
    @ViewChild('SettlementAccountNo', { static: false }) SettlementAccountNo: TextBoxComponent;
    @ViewChild('PaymentOption', { static: false }) PaymentOption: ComboBoxComponent;
    @ViewChild('StmtDispatchMode', { static: false }) StmtDispatchMode: ComboBoxComponent;
    @ViewChild('ExistingCreditCard', { static: false }) ExistingCreditCard: ComboBoxComponent;
    @ViewChild('CardDispatchMode', { static: false }) CardDispatchMode: ComboBoxComponent;
    @ViewChild('CCD_Save', { static: false }) CCD_Save: ButtonComponent;
    @ViewChild('CCD_Clear', { static: false }) CCD_Clear: ButtonComponent;
    @ViewChild('hidCreditSeq', { static: false }) hidCreditSeq: HiddenComponent;
    @ViewChild('Handler', { static: false }) Handler: CreditCardHandlerComponent;
    @ViewChild('hidCatgory', { static: false }) hidCatgory: HiddenComponent;
    @ViewChild('hidAccType', { static: false }) hidAccType: HiddenComponent;
    @ViewChild('hidPaymentOption', { static: false }) hidPaymentOption: HiddenComponent;
    @ViewChild('hidStatementDispatch', { static: false }) hidStatementDispatch: HiddenComponent;
    @ViewChild('hidExisitingCard', { static: false }) hidExisitingCard: HiddenComponent;
    @ViewChild('hidCardDispatch', { static: false }) hidCardDispatch: HiddenComponent;
    @ViewChild('hidAppId', { static: false }) hidAppId: HiddenComponent;
    @Input() ApplicationId: string = undefined;
    @Input() readOnly: boolean = false;
    isApproveLimitValid: boolean = true;

    async revalidate(showErrors: boolean = true): Promise<number> {
        var totalErrors = 0;
        super.beforeRevalidate();
        await Promise.all([
            this.revalidateBasicField('Branch', false, showErrors),
            this.revalidateBasicField('FrontPageCategory', false, showErrors),
            this.revalidateBasicField('MaximumCardLimit', false, showErrors),
            // this.revalidateBasicField('ApprovedLimit',false,showErrors),
            this.revalidateBasicField('SettlementAccountType', false, showErrors),
            this.revalidateBasicField('SettlementAccountNo', false, showErrors),
            this.revalidateBasicField('PaymentOption', false, showErrors),
            this.revalidateBasicField('StmtDispatchMode', false, showErrors),
            this.revalidateBasicField('ExistingCreditCard', false, showErrors),
            this.revalidateBasicField('CardDispatchMode', false, showErrors)
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
        this.value = new CreditCardDetailsModel();
        this.componentCode = 'CreditCardDetails';
    }
    setReadOnly(readOnly) {
        super.setBasicFieldsReadOnly(readOnly);
    }
    async onFormLoad() {
        this.setInputs(this.services.dataStore.getData(this.services.routing.currModal));
        this.Branch.setReadOnly(true);
        this.MaximumCardLimit.setReadOnly(false);

        this.hidAppId.setValue('RLO');
        this.hidCatgory.setValue('FRONT_PAGE_CATG');
        this.hidPaymentOption.setValue('PAYMENT_OPTION');
        this.hidStatementDispatch.setValue('STATE_DISPATACH');
        this.hidExisitingCard.setValue('EXISITING_CARD');
        this.hidCardDispatch.setValue('CARD_DISPATACH');
        this.hidAccType.setValue('ACC_TYPE');

        setTimeout(() => {
            if (this.readOnly) {
                this.ApprovedLimit.setReadOnly(false);
            } else {
                this.ApprovedLimit.setReadOnly(true);
            }

        }, 1000);

        this.fetchCarditCardDetails();
        await this.Handler.onFormLoad({
        });
        this.OnLoanFormLoad()
        this.setDependencies();
    }
    setInputs(param: any) {
        let params = this.services.http.mapToJson(param);
        if (params['mode']) {
            this.mode = params['mode'];
        }
    }
    async submitForm(path, apiCode, serviceCode) {
        this.submitData['formName'] = 'CreditCardDetails';
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
        this.value = new CreditCardDetailsModel();
        this.value.setValue(inputValue);
        this.setDependencies();
        this.passNewValue(this.value);
    }
    ngOnInit() {
        if (this.formCode == undefined) { this.formCode = 'CreditCardDetails'; }
        if (this.formOnLoadError) { return; }
        var styleElement = document.createElement('style');
        styleElement.type = 'text/css';
        styleElement.innerHTML = customCss;
        styleElement.id = 'CreditCardDetails_customCss';
        document.getElementsByTagName('head')[0].appendChild(styleElement);
    }
    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
        var styleElement = document.getElementById('CreditCardDetails_customCss');
        styleElement.parentNode.removeChild(styleElement);
    }
    ngAfterViewInit() {
        setTimeout(() => {
            this.subsBFldsValueUpdates();
            this.onFormLoad();
            this.checkForHTabOverFlow();

            if (this.readOnly)
                this.setReadOnly(this.readOnly);
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
        this.value = new CreditCardDetailsModel();
        this.passNewValue(this.value);
        this.setReadOnly(false);
        this.onFormLoad();
    }
    OnLoanFormLoad() {
        let inputMap = new Map();
        inputMap.clear();
        let applicationId: any = this.ApplicationId;
        // let applicationId = '2221';
        let criteriaJson: any = { "Offset": 1, "Count": 10, FilterCriteria: [] };
        if (applicationId) {
            criteriaJson.FilterCriteria.push({
                "columnName": "ApplicationId",
                "columnType": "String",
                "conditions": {
                    "searchType": "equals",
                    "searchText": applicationId
                }
            });

        }
        inputMap.set('QueryParam.criteriaDetails', criteriaJson)

        this.services.http.fetchApi('/CreditCardDetails', 'GET', inputMap, '/rlo-de').subscribe(
            async (httpResponse: HttpResponse<any>) => {
                var res = httpResponse.body;
                if (res != null && res != undefined && res['CreditCardDetails'] != undefined) {
                    var CreditArray = res['CreditCardDetails'];
                    CreditArray.forEach(async CreditElement => {
                        this.FrontPageCategory.setValue(CreditElement['FrontPageCategory']);
                        this.ApprovedLimit.setValue(CreditElement['ApprovedLimit']);
                        this.SettlementAccountType.setValue(CreditElement['SettlementAccountType']);
                        this.SettlementAccountNo.setValue(CreditElement['SettlementAccountNo']);
                        this.PaymentOption.setValue(CreditElement['PaymentOption']);
                        this.StmtDispatchMode.setValue(CreditElement['StmtDispatchMode']);
                        this.ExistingCreditCard.setValue(CreditElement['ExistingCreditCard']);
                        this.CardDispatchMode.setValue(CreditElement['CardDispatchMode']);
                        this.hidCreditSeq.setValue(CreditElement['CreditCardDetailSeq'])
                    });

                    this.revalidate(false).then((errors) => {
                        let array = [];
                        array.push({ isValid: true, sectionData: this.getFieldValue() });
                        let obj = {
                            "name": "CreditCardDetails",
                            "data": array,
                            "sectionName": "CreditCardDetails"
                        }
                        this.services.rloCommonData.globalComponentLvlDataHandler(obj);
                    });
                }
            },
            async (httpError) => {
                var err = httpError['error']
                if (err != null && err['ErrorElementPath'] != undefined && err['ErrorDescription'] != undefined) {
                }
            }
        );
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

                    let header = res.Header;

                    this.Branch.setValue(header.ApplicationBranch);
                    this.MaximumCardLimit.setValue(header.S_MaxLoanAmount);
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
    CCD_Clear_click(event) {
        this.onReset();
    }

    approveLimitBlur(approveLimit) {
        console.error("DEEP | approve limit", approveLimit);
        this.isApproveLimitValid = true;
        if (approveLimit == undefined || approveLimit == null || approveLimit == "") {
            this.isApproveLimitValid = false;
        }
    }

    async CCD_Save_click(event) {
        let inputMap = new Map();
        let decisionsParamArray = [];
        var noOfError: number = await this.revalidate();
        console.log(this.ApprovedLimit.getFieldValue());
        if (this.readOnly) {
            let approveLimit = this.ApprovedLimit.getFieldValue();
            let maxCardLimit = this.MaximumCardLimit.getFieldValue();
            if (!approveLimit.length || approveLimit != null || approveLimit != undefined || !maxCardLimit.length) {
                if (approveLimit <= maxCardLimit) {
                    if (!this.isApproveLimitValid) {
                        this.services.alert.showAlert(2, 'rlo.error.save.card', -1);
                        return
                    }
                } else {
                    this.services.alert.showAlert(2, '', 3000, "Approve Limit cannot be greater than Maximum Card Limit");
                    return;
                }
            }
            else {
                this.services.alert.showAlert(2, 'rlo.error.save.card', -1);
                return;
            }
        }
        if (noOfError == 0) {
            if (this.hidCreditSeq.getFieldValue() == undefined) {
                inputMap.clear();
                inputMap.set('Body.CreditCardDetails.FrontPageCategory', this.FrontPageCategory.getFieldValue());
                inputMap.set('Body.CreditCardDetails.ApprovedLimit', this.ApprovedLimit.getFieldValue());
                inputMap.set('Body.CreditCardDetails.SettlementAccountType', this.SettlementAccountType.getFieldValue());
                inputMap.set('Body.CreditCardDetails.SettlementAccountNo', this.SettlementAccountNo.getFieldValue());
                inputMap.set('Body.CreditCardDetails.PaymentOption', this.PaymentOption.getFieldValue());
                inputMap.set('Body.CreditCardDetails.StmtDispatchMode', this.StmtDispatchMode.getFieldValue());
                inputMap.set('Body.CreditCardDetails.ExistingCreditCard', this.ExistingCreditCard.getFieldValue());
                inputMap.set('Body.CreditCardDetails.CardDispatchMode', this.CardDispatchMode.getFieldValue());
                decisionsParamArray.push(inputMap);
                // inputMap.set('Body.CreditCardDetails.CreditCardDetailSeq', '123');
                inputMap.set('Body.CreditCardDetails.ApplicationId', this.ApplicationId);
                this.services.http.fetchApi('/CreditCardDetails', 'POST', inputMap, '/rlo-de').subscribe(
                    async (httpResponse: HttpResponse<any>) => {
                        var res = httpResponse.body;
                        this.services.alert.showAlert(1, 'rlo.success.save.card', 5000);
                        let array = [];
                        array.push({ isValid: true, sectionData: this.getFieldValue() });
                        let obj = {
                            "name": "CreditCardDetails",
                            "data": array,
                            "sectionName": "CreditCardDetails"
                        }
                        this.services.rloCommonData.globalComponentLvlDataHandler(obj);

                        if(this.readOnly){
                            this.services.rloCommonData.reloadUWSections.next({                         
                                data: { 'isLoanCategory':  this.ApprovedLimit.getFieldValue() }
                            });
                        }
                    },
                    async (httpError) => {
                        var err = httpError['error']
                        if (err != null && err['ErrorElementPath'] != undefined && err['ErrorDescription'] != undefined) {
                            if (err['ErrorElementPath'] == 'CreditCardDetails.CardDispatchMode') {
                                this.CardDispatchMode.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'CreditCardDetails.ExistingCreditCard') {
                                this.ExistingCreditCard.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'CreditCardDetails.StmtDispatchMode') {
                                this.StmtDispatchMode.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'CreditCardDetails.PaymentOption') {
                                this.PaymentOption.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'CreditCardDetails.SettlementAccountNo') {
                                this.SettlementAccountNo.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'CreditCardDetails.SettlementAccountType') {
                                this.SettlementAccountType.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'CreditCardDetails.ApprovedLimit') {
                                this.ApprovedLimit.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'CreditCardDetails.FrontPageCategory') {
                                this.FrontPageCategory.setError(err['ErrorDescription']);
                            }
                        }
                        this.services.alert.showAlert(2, 'rlo.error.save.card', -1);
                    }
                );
            }
            else {
                inputMap.clear();
                inputMap.set('PathParam.CreditCardDetailSeq', this.hidCreditSeq.getFieldValue());
                inputMap.set('Body.CreditCardDetails.FrontPageCategory', this.FrontPageCategory.getFieldValue());
                inputMap.set('Body.CreditCardDetails.ApprovedLimit', this.ApprovedLimit.getFieldValue());
                inputMap.set('Body.CreditCardDetails.SettlementAccountType', this.SettlementAccountType.getFieldValue());
                inputMap.set('Body.CreditCardDetails.SettlementAccountNo', this.SettlementAccountNo.getFieldValue());
                inputMap.set('Body.CreditCardDetails.PaymentOption', this.PaymentOption.getFieldValue());
                inputMap.set('Body.CreditCardDetails.StmtDispatchMode', this.StmtDispatchMode.getFieldValue());
                inputMap.set('Body.CreditCardDetails.ExistingCreditCard', this.ExistingCreditCard.getFieldValue());
                inputMap.set('Body.CreditCardDetails.CardDispatchMode', this.CardDispatchMode.getFieldValue());
                inputMap.set('Body.CreditCardDetails.ApplicationId', this.ApplicationId);
                this.services.http.fetchApi('/CreditCardDetails/{CreditCardDetailSeq}', 'PUT', inputMap, '/rlo-de').subscribe(
                    async (httpResponse: HttpResponse<any>) => {
                        var res = httpResponse.body;
                        this.services.alert.showAlert(1, 'rlo.success.update.card', 5000);
                        let array = [];
                        array.push({ isValid: true, sectionData: this.getFieldValue() });
                        let obj = {
                            "name": "CreditCardDetails",
                            "data": array,
                            "sectionName": "CreditCardDetails"
                        }
                        this.services.rloCommonData.globalComponentLvlDataHandler(obj);

                        if(this.readOnly){
                            this.services.rloCommonData.reloadUWSections.next({                         
                                data: { 'approvedLimit':  this.ApprovedLimit.getFieldValue() }
                            });
                        }
                    },
                    async (httpError) => {
                        var err = httpError['error']
                        if (err != null && err['ErrorElementPath'] != undefined && err['ErrorDescription'] != undefined) {
                            if (err['ErrorElementPath'] == 'CreditCardDetails.CardDispatchMode') {
                                this.CardDispatchMode.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'CreditCardDetails.ExistingCreditCard') {
                                this.ExistingCreditCard.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'CreditCardDetails.StmtDispatchMode') {
                                this.StmtDispatchMode.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'CreditCardDetails.PaymentOption') {
                                this.PaymentOption.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'CreditCardDetails.SettlementAccountNo') {
                                this.SettlementAccountNo.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'CreditCardDetails.SettlementAccountType') {
                                this.SettlementAccountType.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'CreditCardDetails.ApprovedLimit') {
                                this.ApprovedLimit.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'CreditCardDetails.FrontPageCategory') {
                                this.FrontPageCategory.setError(err['ErrorDescription']);
                            }
                        }
                        this.services.alert.showAlert(2, 'rlo.error.update.card', -1);
                    }
                );
            }
        }
        else {
            this.services.alert.showAlert(2, 'rlo.error.invalid.form', -1);
        }
    }


    fieldDependencies = {
        FrontPageCategory: {
            inDep: [
                { paramKey: "VALUE1", depFieldID: "FrontPageCategory", paramType: "PathParam" },
                { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
                { paramKey: "KEY1", depFieldID: "hidCatgory", paramType: "QueryParam" },
            ],
            outDep: [
            ]
        },
        SettlementAccountType: {
            inDep: [
                { paramKey: "VALUE1", depFieldID: "SettlementAccountType", paramType: "PathParam" },
                { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
                { paramKey: "KEY1", depFieldID: "hidAccType", paramType: "QueryParam" },
            ],
            outDep: [
            ]
        },
        PaymentOption: {
            inDep: [
                { paramKey: "VALUE1", depFieldID: "PaymentOption", paramType: "PathParam" },
                { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
                { paramKey: "KEY1", depFieldID: "hidPaymentOption", paramType: "QueryParam" },
            ],
            outDep: [
            ]
        },
        StmtDispatchMode: {
            inDep: [
                { paramKey: "VALUE1", depFieldID: "StmtDispatchMode", paramType: "PathParam" },
                { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
                { paramKey: "KEY1", depFieldID: "hidStatementDispatch", paramType: "QueryParam" },
            ],
            outDep: [
            ]
        },
        ExistingCreditCard: {
            inDep: [
                { paramKey: "VALUE1", depFieldID: "ExistingCreditCard", paramType: "PathParam" },
                { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
                { paramKey: "KEY1", depFieldID: "hidExisitingCard", paramType: "QueryParam" },
            ],
            outDep: [
            ]
        },
        CardDispatchMode: {
            inDep: [
                { paramKey: "VALUE1", depFieldID: "CardDispatchMode", paramType: "PathParam" },
                { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
                { paramKey: "KEY1", depFieldID: "hidCardDispatch", paramType: "QueryParam" },
            ],
            outDep: [
            ]
        },
    }

}