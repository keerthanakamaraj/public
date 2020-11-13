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
import { RLOUIRadioComponent } from '../rlo-ui-radio/rlo-ui-radio.component';
import { RloUiCurrencyComponent } from '../rlo-ui-currency/rlo-ui-currency.component';


const customCss: string = '';

@Component({
    selector: 'app-CreditCardDetails',
    templateUrl: './CreditCardDetails.component.html'
})
export class CreditCardDetailsComponent extends FormComponent implements OnInit, AfterViewInit {
    @ViewChild('Branch', { static: false }) Branch: TextBoxComponent;
    // @ViewChild('FrontPageCategory', { static: false }) FrontPageCategory: ComboBoxComponent;
    //@ViewChild('MaximumCardLimit', { static: false }) MaximumCardLimit: TextBoxComponent;
    //@ViewChild('ApprovedLimit', { static: false }) ApprovedLimit: TextBoxComponent;
    // @ViewChild('SettlementAccountType', { static: false }) SettlementAccountType: ComboBoxComponent;
    @ViewChild('SettlementAccountNo', { static: false }) SettlementAccountNo: TextBoxComponent;
    @ViewChild('PaymentOption', { static: false }) PaymentOption: ComboBoxComponent;
    @ViewChild('StmtDispatchMode', { static: false }) StmtDispatchMode: ComboBoxComponent;
    // @ViewChild('ExistingCreditCard', { static: false }) ExistingCreditCard: ComboBoxComponent;
    @ViewChild('CardDispatchMode', { static: false }) CardDispatchMode: ComboBoxComponent;
    // @ViewChild('CRLine', { static: false }) CRLine: TextBoxComponent;
    // @ViewChild('CardAdvLine', { static: false }) CardAdvLine: TextBoxComponent;
    // @ViewChild('EcsMandateFlag', { static: false }) EcsMandateFlag: RLOUIRadioComponent;
    // @ViewChild('EcsType', { static: false }) EcsType: ComboBoxComponent;
    // @ViewChild('EcsPercentage', { static: false }) EcsPercentage: TextBoxComponent;
    // @ViewChild('EcsAccNo', { static: false }) EcsAccNo: TextBoxComponent;
    @ViewChild('CustomerType', { static: false }) CustomerType: TextBoxComponent;
    @ViewChild('RequestedCardLimit', { static: false }) RequestedCardLimit: TextBoxComponent;
    @ViewChild('MaxCashLimit', { static: false }) MaxCashLimit: TextBoxComponent;
    @ViewChild('ApprovedCashLimit', { static: false }) ApprovedCashLimit: TextBoxComponent;
    @ViewChild('NomineeRequired', { static: false }) NomineeRequired: ComboBoxComponent;
    @ViewChild('NomineeName', { static: false }) NomineeName: TextBoxComponent;
    @ViewChild('NomineeRelationship', { static: false }) NomineeRelationship: ComboBoxComponent;
    @ViewChild('NomineeDOB', { static: false }) NomineeDOB: DateComponent;
    @ViewChild('GuardianName', { static: false }) GuardianName: TextBoxComponent;
    @ViewChild('GuadianRelationship', { static: false }) GuadianRelationship: ComboBoxComponent;
    @ViewChild('Add_RequestedCardLimit', { static: false }) Add_RequestedCardLimit: TextBoxComponent;

    @ViewChild('CCD_Save', { static: false }) CCD_Save: ButtonComponent;
    @ViewChild('CCD_Clear', { static: false }) CCD_Clear: ButtonComponent;
    @ViewChild('hidCreditSeq', { static: false }) hidCreditSeq: HiddenComponent;
    @ViewChild('hidECSMandateFlag', { static: false }) hidECSMandateFlag: HiddenComponent;
    @ViewChild('hidECSType', { static: false }) hidECSType: HiddenComponent;
    @ViewChild('Handler', { static: false }) Handler: CreditCardHandlerComponent;
    @ViewChild('hidCatgory', { static: false }) hidCatgory: HiddenComponent;
    @ViewChild('hidAccType', { static: false }) hidAccType: HiddenComponent;
    @ViewChild('hidPaymentOption', { static: false }) hidPaymentOption: HiddenComponent;
    @ViewChild('hidStatementDispatch', { static: false }) hidStatementDispatch: HiddenComponent;
    @ViewChild('hidExisitingCard', { static: false }) hidExisitingCard: HiddenComponent;
    @ViewChild('hidCardDispatch', { static: false }) hidCardDispatch: HiddenComponent;
    @ViewChild('hidAppId', { static: false }) hidAppId: HiddenComponent;
    @ViewChild('hidNomineeReq', { static: false }) hidNomineeReq: HiddenComponent;
    @ViewChild('hidNomineeReltion', { static: false }) hidNomineeReltion: HiddenComponent;
    @ViewChild('hidGurdianRel', { static: false }) hidGurdianRel: HiddenComponent;
    @ViewChild('hidNomineeSeq', { static: false }) hidNomineeSeq: HiddenComponent;

    //custom
    @ViewChild('MaximumCardLimit', { static: false }) MaximumCardLimit: RloUiCurrencyComponent;
    @ViewChild('ApprovedLimit', { static: false }) ApprovedLimit: RloUiCurrencyComponent;

    @Input() ApplicationId: string = undefined;
    @Input() readOnly: boolean = false;
    @Input() enableApproveLimit: boolean = false;//set to to only when opened in UW

    isApproveLimitValid: boolean = true;
    custMinAge = 18;
    custMaxAge = 100;
   customerList : any;
    async revalidate(showErrors: boolean = true): Promise<number> {
        var totalErrors = 0;
        super.beforeRevalidate();
        await Promise.all([
            this.revalidateBasicField('Branch', false, showErrors),
            // this.revalidateBasicField('FrontPageCategory', false, showErrors),
            this.revalidateBasicField('MaximumCardLimit', false, showErrors),
            this.revalidateBasicField('ApprovedLimit', false, showErrors),
            // this.revalidateBasicField('SettlementAccountType', false, showErrors),
            this.revalidateBasicField('SettlementAccountNo', false, showErrors),
            this.revalidateBasicField('PaymentOption', false, showErrors),
            this.revalidateBasicField('StmtDispatchMode', false, showErrors),
            // this.revalidateBasicField('ExistingCreditCard', false, showErrors),
            this.revalidateBasicField('CardDispatchMode', false, showErrors),
            // this.revalidateBasicField('CustomerType', false, showErrors),
            // this.revalidateBasicField('RequestedCardLimit', false, showErrors),
            this.revalidateBasicField('MaxCashLimit', false, showErrors),
            // this.revalidateBasicField('ApprovedCashLimit', false, showErrors),
            // this.revalidateBasicField('NomineeRequired', false, showErrors),
            this.revalidateBasicField('NomineeName', false, showErrors),
            this.revalidateBasicField('NomineeRelationship', false, showErrors),
            this.revalidateBasicField('NomineeDOB', false, showErrors),
            this.revalidateBasicField('GuardianName', false, showErrors),
            this.revalidateBasicField('GuadianRelationship', false, showErrors)
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
        this.CustomerType.setReadOnly(true);
        this.RequestedCardLimit.setReadOnly(true);
        this.MaxCashLimit.setReadOnly(true);
        this.MaximumCardLimit.setReadOnly(true);

        this.hidAppId.setValue('RLO');
        this.hidCatgory.setValue('FRONT_PAGE_CATG');
        this.hidPaymentOption.setValue('PAYMENT_OPTION');
        this.hidStatementDispatch.setValue('STATE_DISPATACH');
        this.hidExisitingCard.setValue('EXISITING_CARD');
        this.hidCardDispatch.setValue('CARD_DISPATACH');
        this.hidAccType.setValue('ACC_TYPE');
        this.hidNomineeReq.setValue('Y_N');
        this.hidNomineeReltion.setValue('RELATIONSHIP');
        this.hidGurdianRel.setValue('GUADIAN');
        // this.hidECSMandateFlag.setValue('Y_N');
        // this.hidECSType.setValue('ECS_TYPE');

        setTimeout(() => {
            if (this.readOnly) {
                if (this.enableApproveLimit) {
                    this.MaximumCardLimit.setReadOnly(true);
                    this.ApprovedLimit.setReadOnly(false);
                } else {
                    this.MaximumCardLimit.setReadOnly(true);
                    this.ApprovedLimit.setReadOnly(true);
                    this.ApprovedLimit.mandatory = false;
                }
            } else {
                this.ApprovedLimit.setReadOnly(true);
                this.ApprovedLimit.mandatory = false;
            }

        }, 1000);

        this.fetchCarditCardDetails();
        this.dispalyAddonField();
        await this.Handler.onFormLoad({
        });
        this.CardDispatchMode.setHidden(false);
        this.Add_RequestedCardLimit.setHidden(true);
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
    isFutureDate(selectedDate) {
        const moment = require('moment');
        const currentDate = moment();
        currentDate.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });

        selectedDate = moment(selectedDate, 'DD-MM-YYYY');
        //console.log('current date :: ', currentDate._d);
        //console.log('selected date :: ', selectedDate._d);
        if (selectedDate <= currentDate) {
            return false;
        }
        return true;
    }
    isPastDate(selectedDate) {
        const moment = require('moment');
        const currentDate = moment();
        currentDate.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
        selectedDate = moment(selectedDate, 'DD-MM-YYYY');
        console.log('current date :: ', currentDate._d);
        console.log('selected date :: ', selectedDate._d);
        if (selectedDate >= currentDate) {
            return false;
        }
        return true;
    }
    async NomineeRequired_blur(event) {
        const inputMap = new Map();
        console.log("nominee", this.NomineeRequired.getFieldValue());
        if (this.NomineeRequired.getFieldValue() == 'Y') {
            this.NomineeName.mandatory = true;
            this.NomineeRelationship.mandatory = true;
            this.NomineeDOB.mandatory = true;
        }
        else {
            this.NomineeName.mandatory = false;
            this.NomineeRelationship.mandatory = false;
            this.NomineeDOB.mandatory = false;
        }
    }
    isAgeValid(selectedDate) {
        const moment = require('moment');
        const currentDate = moment();
        currentDate.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
        selectedDate = moment(selectedDate, 'DD-MM-YYYY');
        const age = currentDate.diff(selectedDate, 'years');
        console.log('age is:', age);
        console.log('cif min age is:', this.custMinAge);
        console.log('cif max age is:', this.custMaxAge);
        if (age < this.custMinAge || age > this.custMaxAge) {
            return false;
        } else {
            return true;
        }
    }
    async NomineeDOB_blur(event) {
        const inputMap = new Map();
        if (!this.isPastDate(this.NomineeDOB.getFieldValue())) {
            this.NomineeDOB.setError('rlo.error.dob-invalid');
            return 1
        }
        if (!this.isAgeValid(this.NomineeDOB.getFieldValue())) {
            this.GuardianName.mandatory = true;
            this.GuadianRelationship.mandatory = true;
        }
        else {
            this.GuardianName.mandatory = false;
            this.GuadianRelationship.mandatory = false;
        }
    }
    async ApprovedCashLimit_blur(event) {
        if (this.ApprovedCashLimit.getFieldValue() != undefined || this.ApprovedCashLimit.getFieldValue() != null) {
            this.ApproveCashLimit_();
        }
    }
    dispalyAddonField() {
     this.customerList = this.services.rloCommonData.getCustomerList();
      for (let element of this.customerList) {
        if (element.CustomerType == 'A') {
            this.Add_RequestedCardLimit.setHidden(false);
            this.CardDispatchMode.setHidden(false);
        }
        else {
            this.Add_RequestedCardLimit.setHidden(true);
            this.CardDispatchMode.setHidden(true);
        }
      }
        
    }
    ApproveCashLimit_() {
        let MaxApprovedCashLimit: any;
        let MaxCashLimit: any;
        MaxCashLimit = this.services.rloCommonData.globalApplicationDtls.MaxCashLimit;
        let MaxCardLimit: any;
        MaxCardLimit = this.services.rloCommonData.globalApplicationDtls.MaxCashLimit;
        let MinCardLimit: any;
        MinCardLimit = this.services.rloCommonData.globalApplicationDtls.MinCashLimit;

        if (this.ApprovedCashLimit.getFieldValue() != undefined) {
            MaxApprovedCashLimit = ((this.ApprovedCashLimit.getFieldValue() * MaxCashLimit) / MaxCardLimit);
        }
        if (MaxApprovedCashLimit > MinCardLimit) {
            this.ApprovedLimit.setValue(MinCardLimit);
        }
        else {
            this.ApprovedLimit.setValue(MaxApprovedCashLimit);
        }
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
                        // this.FrontPageCategory.setValue(CreditElement['FrontPageCategory']['id']);
                        this.ApprovedLimit.setValue(CreditElement['ApprovedLimit']);
                        // this.SettlementAccountType.setValue(CreditElement['SettlementAccountType']['id']);
                        this.SettlementAccountNo.setValue(CreditElement['SettlementAccountNo']);
                        this.PaymentOption.setValue(CreditElement['PaymentOption']['id']);
                        this.StmtDispatchMode.setValue(CreditElement['StmtDispatchMode']['id']);
                        // this.ExistingCreditCard.setValue(CreditElement['ExistingCreditCard']['id']);
                        this.CardDispatchMode.setValue(CreditElement['CardDispatchMode']['id']);
                        this.hidCreditSeq.setValue(CreditElement['CreditCardDetailSeq'])
                        this.CustomerType.setValue(CreditElement['CustomerType']['text']);
                        if(this.customerList.CustomerType == 'A'){
                        this.Add_RequestedCardLimit.setValue(CreditElement['RequestedCardLimit']);    
                        }
                        else{
                        this.RequestedCardLimit.setValue(CreditElement['RequestedCardLimit']);
                        }
                        this.MaxCashLimit.setValue(CreditElement['MaxCashLimit']);
                        this.ApprovedCashLimit.setValue(CreditElement['ApprovedCashLimit']);
                        this.NomineeRequired.setValue(CreditElement['NomineeRequired']['id']);
                        this.NomineeName.setValue(CreditElement['NomineeDetails']['NomineeName']);
                        this.NomineeRelationship.setValue(CreditElement['NomineeDetails']['NomineeRelationship']['id']);
                        this.NomineeDOB.setValue(CreditElement['NomineeDetails']['NomineeDOB']);
                        this.GuardianName.setValue(CreditElement['NomineeDetails']['GuardianName']);
                        this.GuadianRelationship.setValue(CreditElement['NomineeDetails']['GuadianRelationship']['id']);
                        this.hidNomineeSeq.setValue(CreditElement['NomineeDetails']['NomineeSeq']);
                        //custom
                        this.ApprovedLimit.setComponentSpecificValue(CreditElement['ApprovedLimit'], null);
                        
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
                    console.log(res);
                    let header = res.Header;

                    this.Branch.setValue(header.ApplicationBranch);
                    //this.MaximumCardLimit.setValue(header.S_MaxLoanAmount);

                    //custom
                    this.MaximumCardLimit.setValue(header.Product_min_cash_limit);
                    this.MaxCashLimit.setValue(header.Product_max_cash_limit);

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
            //let approveLimit = this.ApprovedLimit.getFieldValue();
            //let maxCardLimit = this.MaximumCardLimit.getFieldValue();

            //custom
            let maxCardLimit = Number(this.MaximumCardLimit.getTextBoxValue());
            let approveLimit = this.ApprovedLimit.getTextBoxValue() != undefined ? Number(this.ApprovedLimit.getTextBoxValue()) : this.ApprovedLimit.getTextBoxValue();

            if (approveLimit != null && approveLimit != undefined && maxCardLimit != null && maxCardLimit != undefined) {
                if (approveLimit <= maxCardLimit) {
                    if (!this.isApproveLimitValid || approveLimit == 0) {
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
                // inputMap.set('Body.CreditCardDetails.FrontPageCategory', this.FrontPageCategory.getFieldValue());
                //inputMap.set('Body.CreditCardDetails.ApprovedLimit', this.ApprovedLimit.getFieldValue());
                // inputMap.set('Body.CreditCardDetails.SettlementAccountType', this.SettlementAccountType.getFieldValue());
                inputMap.set('Body.CreditCardDetails.SettlementAccountNo', this.SettlementAccountNo.getFieldValue());
                inputMap.set('Body.CreditCardDetails.PaymentOption', this.PaymentOption.getFieldValue());
                inputMap.set('Body.CreditCardDetails.StmtDispatchMode', this.StmtDispatchMode.getFieldValue());
                // inputMap.set('Body.CreditCardDetails.ExistingCreditCard', this.ExistingCreditCard.getFieldValue());
                inputMap.set('Body.CreditCardDetails.CardDispatchMode', this.CardDispatchMode.getFieldValue());
                inputMap.set('Body.CreditCardDetails.CustomerType', this.CustomerType.getFieldValue());
                if(this.customerList.CustomerType == 'A'){
                inputMap.set('Body.CreditCardDetails.RequestedCardLimit', this.Add_RequestedCardLimit.getFieldValue());
                }
                else{
                inputMap.set('Body.CreditCardDetails.RequestedCardLimit', this.RequestedCardLimit.getFieldValue());
                }
                inputMap.set('Body.CreditCardDetails.MaxCashLimit', this.MaxCashLimit.getFieldValue());
                inputMap.set('Body.CreditCardDetails.ApprovedCashLimit', this.ApprovedCashLimit.getFieldValue());
                inputMap.set('Body.CreditCardDetails.NomineeRequired', this.NomineeRequired.getFieldValue());
                inputMap.set('Body.CreditCardDetails.NomineeDetails.NomineeName', this.NomineeName.getFieldValue());
                inputMap.set('Body.CreditCardDetails.NomineeDetails.NomineeRelationship', this.NomineeRelationship.getFieldValue());
                inputMap.set('Body.CreditCardDetails.NomineeDetails.NomineeDOB', this.NomineeDOB.getFieldValue());
                inputMap.set('Body.CreditCardDetails.NomineeDetails.GuardianName', this.GuardianName.getFieldValue());
                inputMap.set('Body.CreditCardDetails.NomineeDetails.GuadianRelationship', this.GuadianRelationship.getFieldValue());
                //custom
                inputMap.set('Body.CreditCardDetails.ApprovedLimit', this.ApprovedLimit.getTextBoxValue());

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

                        if (this.readOnly) {
                            let dataObj = { 'isLoanCategory': this.ApprovedLimit.getTextBoxValue() };
                            this.services.rloCommonData.reloadUWSections.next({
                                data: dataObj
                            });
                        }
                    },
                    async (httpError) => {
                        var err = httpError['error']
                        if (err != null && err['ErrorElementPath'] != undefined && err['ErrorDescription'] != undefined) {
                            if (err['ErrorElementPath'] == 'CreditCardDetails.CardDispatchMode') {
                                this.CardDispatchMode.setError(err['ErrorDescription']);
                            }
                            // else if (err['ErrorElementPath'] == 'CreditCardDetails.ExistingCreditCard') {
                            //     this.ExistingCreditCard.setError(err['ErrorDescription']);
                            // }
                            else if (err['ErrorElementPath'] == 'CreditCardDetails.StmtDispatchMode') {
                                this.StmtDispatchMode.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'CreditCardDetails.PaymentOption') {
                                this.PaymentOption.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'CreditCardDetails.SettlementAccountNo') {
                                this.SettlementAccountNo.setError(err['ErrorDescription']);
                            }
                            // else if (err['ErrorElementPath'] == 'CreditCardDetails.SettlementAccountType') {
                            //     this.SettlementAccountType.setError(err['ErrorDescription']);
                            // }
                            else if (err['ErrorElementPath'] == 'CreditCardDetails.ApprovedLimit') {
                                this.ApprovedLimit.setError(err['ErrorDescription']);
                            }
                            // else if (err['ErrorElementPath'] == 'CreditCardDetails.FrontPageCategory') {
                            //     this.FrontPageCategory.setError(err['ErrorDescription']);
                            // }
                            else if (err['ErrorElementPath'] == 'CreditCardDetails.CustomerType') {
                                this.CustomerType.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'CreditCardDetails.RequestedCardLimit') {
                                this.RequestedCardLimit.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'CreditCardDetails.MaxCashLimit') {
                                this.MaxCashLimit.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'CreditCardDetails.ApprovedCashLimit') {
                                this.ApprovedCashLimit.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'CreditCardDetails.NomineeRequired') {
                                this.NomineeRequired.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'CreditCardDetails.NomineeDetails.NomineeName') {
                                this.NomineeName.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'CreditCardDetails.NomineeDetails.NomineeRelationship') {
                                this.NomineeRelationship.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'CreditCardDetails.NomineeDetails.NomineeDOB') {
                                this.NomineeDOB.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'CreditCardDetails.NomineeDetails.GuardianName') {
                                this.GuardianName.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'CreditCardDetails.NomineeDetails.GuadianRelationship') {
                                this.GuadianRelationship.setError(err['ErrorDescription']);
                            }
                        }
                        this.services.alert.showAlert(2, 'rlo.error.save.card', -1);
                    }
                );
            }
            else {
                inputMap.clear();
                inputMap.set('PathParam.CreditCardDetailSeq', this.hidCreditSeq.getFieldValue());
                inputMap.set('Body.CreditCardDetails.NomineeDetails.NomineeSeq', this.hidNomineeSeq.getFieldValue());
                // inputMap.set('Body.CreditCardDetails.FrontPageCategory', this.FrontPageCategory.getFieldValue());
                //inputMap.set('Body.CreditCardDetails.ApprovedLimit', this.ApprovedLimit.getFieldValue());
                // inputMap.set('Body.CreditCardDetails.SettlementAccountType', this.SettlementAccountType.getFieldValue());
                inputMap.set('Body.CreditCardDetails.SettlementAccountNo', this.SettlementAccountNo.getFieldValue());
                inputMap.set('Body.CreditCardDetails.PaymentOption', this.PaymentOption.getFieldValue());
                inputMap.set('Body.CreditCardDetails.StmtDispatchMode', this.StmtDispatchMode.getFieldValue());
                // inputMap.set('Body.CreditCardDetails.ExistingCreditCard', this.ExistingCreditCard.getFieldValue());
                inputMap.set('Body.CreditCardDetails.CardDispatchMode', this.CardDispatchMode.getFieldValue());
                // inputMap.set('Body.CreditCardDetails.EcsMandateFlag', this.EcsMandateFlag.getFieldValue());
                // inputMap.set('Body.CreditCardDetails.EcsMandateFlag', this.EcsMandateFlag.getFieldValue());
                // inputMap.set('Body.CreditCardDetails.EcsPercentage', this.EcsPercentage.getFieldValue());
                // inputMap.set('Body.CreditCardDetails.EcsAccNo', this.EcsAccNo.getFieldValue());
                // inputMap.set('Body.CreditCardDetails.CardAdvLine', this.CardAdvLine.getFieldValue());
                // inputMap.set('Body.CreditCardDetails.CRLine', this.CRLine.getFieldValue());
                inputMap.set('Body.CreditCardDetails.CustomerType', this.CustomerType.getFieldValue());
                if(this.customerList.CustomerType == 'A'){
                    inputMap.set('Body.CreditCardDetails.RequestedCardLimit', this.Add_RequestedCardLimit.getFieldValue());
                }
                else{
                    inputMap.set('Body.CreditCardDetails.RequestedCardLimit', this.RequestedCardLimit.getFieldValue());
                }
                inputMap.set('Body.CreditCardDetails.MaxCashLimit', this.MaxCashLimit.getFieldValue());
                inputMap.set('Body.CreditCardDetails.ApprovedCashLimit', this.ApprovedCashLimit.getFieldValue());
                inputMap.set('Body.CreditCardDetails.NomineeRequired', this.NomineeRequired.getFieldValue());
                inputMap.set('Body.CreditCardDetails.NomineeDetails.NomineeName', this.NomineeName.getFieldValue());
                inputMap.set('Body.CreditCardDetails.NomineeDetails.NomineeRelationship', this.NomineeRelationship.getFieldValue());
                inputMap.set('Body.CreditCardDetails.NomineeDetails.NomineeDOB', this.NomineeDOB.getFieldValue());
                inputMap.set('Body.CreditCardDetails.NomineeDetails.GuardianName', this.GuardianName.getFieldValue());
                inputMap.set('Body.CreditCardDetails.NomineeDetails.GuadianRelationship', this.GuadianRelationship.getFieldValue());

                inputMap.set('Body.CreditCardDetails.ApplicationId', this.ApplicationId);

                //custom
                inputMap.set('Body.CreditCardDetails.ApprovedLimit', this.ApprovedLimit.getTextBoxValue());

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

                        if (this.readOnly) {
                            this.services.rloCommonData.reloadUWSections.next({
                                data: { 'approvedLimit': this.ApprovedLimit.getTextBoxValue() }
                            });
                        }
                    },
                    async (httpError) => {
                        var err = httpError['error']
                        if (err != null && err['ErrorElementPath'] != undefined && err['ErrorDescription'] != undefined) {
                            if (err['ErrorElementPath'] == 'CreditCardDetails.CardDispatchMode') {
                                this.CardDispatchMode.setError(err['ErrorDescription']);
                            }
                            // else if (err['ErrorElementPath'] == 'CreditCardDetails.ExistingCreditCard') {
                            //     this.ExistingCreditCard.setError(err['ErrorDescription']);
                            // }
                            else if (err['ErrorElementPath'] == 'CreditCardDetails.StmtDispatchMode') {
                                this.StmtDispatchMode.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'CreditCardDetails.PaymentOption') {
                                this.PaymentOption.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'CreditCardDetails.SettlementAccountNo') {
                                this.SettlementAccountNo.setError(err['ErrorDescription']);
                            }
                            // else if (err['ErrorElementPath'] == 'CreditCardDetails.SettlementAccountType') {
                            //     this.SettlementAccountType.setError(err['ErrorDescription']);
                            // }
                            else if (err['ErrorElementPath'] == 'CreditCardDetails.ApprovedLimit') {
                                this.ApprovedLimit.setError(err['ErrorDescription']);
                            }
                            // else if (err['ErrorElementPath'] == 'CreditCardDetails.FrontPageCategory') {
                            //     this.FrontPageCategory.setError(err['ErrorDescription']);
                            // }
                            else if (err['ErrorElementPath'] == 'CreditCardDetails.CustomerType') {
                                this.CustomerType.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'CreditCardDetails.RequestedCardLimit') {
                                this.RequestedCardLimit.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'CreditCardDetails.MaxCashLimit') {
                                this.MaxCashLimit.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'CreditCardDetails.ApprovedCashLimit') {
                                this.ApprovedCashLimit.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'CreditCardDetails.NomineeRequired') {
                                this.NomineeRequired.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'CreditCardDetails.NomineeDetails.NomineeName') {
                                this.NomineeName.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'CreditCardDetails.NomineeDetails.NomineeRelationship') {
                                this.NomineeRelationship.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'CreditCardDetails.NomineeDetails.NomineeDOB') {
                                this.NomineeDOB.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'CreditCardDetails.NomineeDetails.GuardianName') {
                                this.GuardianName.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'CreditCardDetails.NomineeDetails.GuadianRelationship') {
                                this.GuadianRelationship.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'CreditCardDetails.NomineeDetails.NomineeSeq') {
                                this.hidNomineeSeq.setError(err['ErrorDescription']);
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
        // FrontPageCategory: {
        //     inDep: [
        //         { paramKey: "VALUE1", depFieldID: "FrontPageCategory", paramType: "PathParam" },
        //         { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
        //         { paramKey: "KEY1", depFieldID: "hidCatgory", paramType: "QueryParam" },
        //     ],
        //     outDep: [
        //     ]
        // },
        // SettlementAccountType: {
        //     inDep: [
        //         { paramKey: "VALUE1", depFieldID: "SettlementAccountType", paramType: "PathParam" },
        //         { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
        //         { paramKey: "KEY1", depFieldID: "hidAccType", paramType: "QueryParam" },
        //     ],
        //     outDep: [
        //     ]
        // },
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
        // ExistingCreditCard: {
        //     inDep: [
        //         { paramKey: "VALUE1", depFieldID: "ExistingCreditCard", paramType: "PathParam" },
        //         { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
        //         { paramKey: "KEY1", depFieldID: "hidExisitingCard", paramType: "QueryParam" },
        //     ],
        //     outDep: [
        //     ]
        // },
        CardDispatchMode: {
            inDep: [
                { paramKey: "VALUE1", depFieldID: "CardDispatchMode", paramType: "PathParam" },
                { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
                { paramKey: "KEY1", depFieldID: "hidCardDispatch", paramType: "QueryParam" },
            ],
            outDep: [
            ]
        },
        NomineeRequired: {
            inDep: [
                { paramKey: "VALUE1", depFieldID: "NomineeRequired", paramType: "PathParam" },
                { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
                { paramKey: "KEY1", depFieldID: "hidNomineeReq", paramType: "QueryParam" },
            ],
            outDep: [
            ]
        },
        NomineeRelationship: {
            inDep: [
                { paramKey: "VALUE1", depFieldID: "NomineeRelationship", paramType: "PathParam" },
                { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
                { paramKey: "KEY1", depFieldID: "hidNomineeReltion", paramType: "QueryParam" },
            ],
            outDep: [
            ]
        },
        GuadianRelationship: {
            inDep: [
                { paramKey: "VALUE1", depFieldID: "GuadianRelationship", paramType: "PathParam" },
                { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
                { paramKey: "KEY1", depFieldID: "hidGurdianRel", paramType: "QueryParam" },
            ],
            outDep: [
            ]
        },

        // EcsMandateFlag: {
        //     inDep: [
        //         { paramKey: "VALUE1", depFieldID: "EcsMandateFlag", paramType: "PathParam" },
        //         { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
        //         { paramKey: "KEY1", depFieldID: "hidECSMandateFlag", paramType: "QueryParam" },
        //     ],
        //     outDep: [
        //     ]
        // },
        // EcsType: {
        //     inDep: [
        //         { paramKey: "VALUE1", depFieldID: "EcsType", paramType: "PathParam" },
        //         { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
        //         { paramKey: "KEY1", depFieldID: "hidECSType", paramType: "QueryParam" },
        //     ],
        //     outDep: [
        //     ]
        // },

    }

    customGenericOnBlur(event: any) {
        console.log("Deep | customGenericOnBlur", event);
        if (event.field == "ApprovedLimit") {
            this.approveLimitBlur(event.textFieldValue);
        }
        this.genericOnBlur(event.field, event.textFieldValue);
    }
}
