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
import { NonNullAssert } from '@angular/compiler';
import { CreditCardInputGridComponent } from '../CreditCardInputGrid/CreditCardInputGrid.component';


const customCss: string = '';

@Component({
    selector: 'app-CreditCardDetails',
    templateUrl: './CreditCardDetails.component.html'
})
export class CreditCardDetailsComponent extends FormComponent implements OnInit, AfterViewInit {
    @ViewChild('Branch', { static: false }) Branch: ComboBoxComponent;
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
    @ViewChild('CustomerType', { static: false }) CustomerType: ComboBoxComponent;
    @ViewChild('RequestedCardLimit', { static: false }) RequestedCardLimit: RloUiCurrencyComponent;
    //@ViewChild('MaxCashLimit', { static: false }) MaxCashLimit: TextBoxComponent;
    //@ViewChild('ApprovedCashLimit', { static: false }) ApprovedCashLimit: TextBoxComponent;
    @ViewChild('NomineeRequired', { static: false }) NomineeRequired: ComboBoxComponent;
    @ViewChild('NomineeName', { static: false }) NomineeName: TextBoxComponent;
    @ViewChild('NomineeRelationship', { static: false }) NomineeRelationship: ComboBoxComponent;
    @ViewChild('NomineeDOB', { static: false }) NomineeDOB: DateComponent;
    @ViewChild('GuardianName', { static: false }) GuardianName: TextBoxComponent;
    @ViewChild('GuadianRelationship', { static: false }) GuadianRelationship: ComboBoxComponent;
    // @ViewChild('Add_RequestedCardLimit', { static: false }) Add_RequestedCardLimit: RloUiCurrencyComponent;

    @ViewChild('CCD_Save', { static: false }) CCD_Save: ButtonComponent;
    @ViewChild('CCD_Clear', { static: false }) CCD_Clear: ButtonComponent;
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
    @ViewChild('ApprovedCashLimit', { static: false }) ApprovedCashLimit: RloUiCurrencyComponent;
    @ViewChild('MaxCashLimit', { static: false }) MaxCashLimit: RloUiCurrencyComponent;
    @ViewChild('hideCardCustType', { static: false }) hideCardCustType: HiddenComponent;
    // @ViewChild('CurrentCorporateCardLimit', { static: false }) CurrentCorporateCardLimit: RloUiCurrencyComponent;
    @ViewChild('AvailableLimit', { static: false }) AvailableLimit: RloUiCurrencyComponent;
    @ViewChild('MaskedCardNumber', { static: false }) MaskedCardNumber: TextBoxComponent;
    @ViewChild('CurrentCardLimit', { static: false }) CurrentCardLimit: RloUiCurrencyComponent;

    @ViewChild('CreditCardInputGrid', { static: false }) CreditCardInputGrid: CreditCardInputGridComponent;
    // @ViewChild('SubCamType', { static: false }) SubCamType: HiddenComponent;

    @Input() ApplicationId: string = undefined;
    @Input() readOnly: boolean = false;
    @Input() enableApproveLimit: boolean = false;//set to to only when opened in UW

    header: any;
    isApproveLimitValid: boolean = true;
    custMinAge = 18;
    custMaxAge = 100;
    // customerList: any;
    clearFieldsFlag: boolean = false;
    CreditCardSeq: string = undefined;
    SubCamType: string = undefined;

    // isShow: boolean = this.services.rloCommonData.globalApplicationDtls.isCamType;
    async revalidate(showErrors: boolean = true): Promise<number> {
        var totalErrors = 0;
        super.beforeRevalidate();
        await Promise.all([
            // this.revalidateBasicField('Branch', false, showErrors),
            // this.revalidateBasicField('FrontPageCategory', false, showErrors),
            this.revalidateBasicField('MaximumCardLimit', false, showErrors),
            this.revalidateBasicField('ApprovedLimit', false, showErrors),
            // this.revalidateBasicField('SettlementAccountType', false, showErrors),
            this.revalidateBasicField('SettlementAccountNo', false, showErrors),
            this.revalidateBasicField('PaymentOption', false, showErrors),
            this.revalidateBasicField('StmtDispatchMode', false, showErrors),
            // this.revalidateBasicField('ExistingCreditCard', false, showErrors),
            this.revalidateBasicField('CardDispatchMode', false, showErrors),
            this.revalidateBasicField('CustomerType', false, showErrors),
            this.revalidateBasicField('RequestedCardLimit', false, showErrors),
            this.revalidateBasicField('MaxCashLimit', false, showErrors),
            this.revalidateBasicField('ApprovedCashLimit', false, showErrors),
            this.revalidateBasicField('NomineeRequired', false, showErrors),
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
        // this.Branch.setReadOnly(true);
        this.CustomerType.setReadOnly(true);
        //this.ApprovedLimit.setReadOnly((this.services.rloCommonData.globalApplicationDtls.CamType=='LE')?false:true);
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
        this.hideCardCustType.setValue('ADD_CUSTOMER_TYPE');
        // this.hidECSMandateFlag.setValue('Y_N');
        // this.hidECSType.setValue('ECS_TYPE');
        // this.AvailableLimit.setReadOnly(true);
        // this.MaskedCardNumber.setReadOnly(true);
        // this.CurrentCardLimit.setReadOnly(true);

        // this.AvailableLimit.setHidden(true);
        // this.MaskedCardNumber.setHidden(true);

        //this.CardDispatchMode.setHidden(false);


        // setTimeout(() => {
        //     if (this.readOnly) {
        //         //changes for Canara bank
        //         this.MaximumCardLimit.setReadOnly(true);
        //         this.ApprovedCashLimit.setReadOnly(true);
        //         this.ApprovedLimit.setReadOnly(true);
        //     } else {
        //         this.ApprovedCashLimit.setReadOnly(true);
        //         this.ApprovedLimit.mandatory = false;
        //     }

        // }, 500);
        console.log("camtype", this.services.rloCommonData.globalApplicationDtls.CamType);
        setTimeout(() => {

        }, 500);
        this.fetchHeaderDetails();
        await this.Handler.onFormLoad({
        });
        this.CardDispatchMode.setHidden(false);

        // Sprint-6
        if (!this.clearFieldsFlag) {
            this.fetchCreditCardDetails();
        }
        setTimeout(() => {
        this.NomineeName.setHidden(true);
        this.NomineeRelationship.setHidden(true);
        this.NomineeDOB.setHidden(true);
        this.GuardianName.setHidden(true);
        this.GuadianRelationship.setHidden(true);
        }, 500);
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
        this.ApprovedLimit.resetFieldAndDropDown();
        this.ApprovedCashLimit.resetFieldAndDropDown();
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
    async NomineeRequired_change(event) {
        const inputMap = new Map();
        console.log("nominee", this.NomineeRequired.getFieldValue());
        if (this.NomineeRequired.getFieldValue() == 'Y') {
            this.NomineeName.setHidden(false);
            this.NomineeRelationship.setHidden(false);
            this.NomineeDOB.setHidden(false);
            this.NomineeName.mandatory = true;
            this.NomineeRelationship.mandatory = true;
            this.NomineeDOB.mandatory = true;
        }
        else {
            this.NomineeName.setHidden(true);
            this.NomineeRelationship.setHidden(true);
            this.NomineeDOB.setHidden(true);
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
    async NomineeDOB_change(event) {
        const inputMap = new Map();
        if (!this.isPastDate(this.NomineeDOB.getFieldValue())) {
            this.NomineeDOB.setError('rlo.error.dob-invalid');
            return 1
        }
        if (!this.isAgeValid(this.NomineeDOB.getFieldValue())) {
            this.GuardianName.setHidden(false);
            this.GuadianRelationship.setHidden(false);
            this.GuardianName.mandatory = true;
            this.GuadianRelationship.mandatory = true;
        }
        else {
            this.GuardianName.setHidden(true);
            this.GuadianRelationship.setHidden(true);
            this.GuardianName.mandatory = false;
            this.GuadianRelationship.mandatory = false;
        }
    }
    // async ApprovedCashLimitblur(event) {
    //     if (this.ApprovedCashLimit.getFieldValue() != undefined || this.ApprovedCashLimit.getFieldValue() != null) {
    //         this.setApproveCashLimit();
    //     }
    // }
    // dispalyAddonField() {
    //     this.customerList = this.services.rloCommonData.getCustomerList();
    //     for (let element of this.customerList) {
    //         if (element.CustomerType == 'A') {
    //             this.Add_RequestedCardLimit.setHidden(false);
    //             this.CardDispatchMode.setHidden(false);
    //         }
    //         else {
    //             this.Add_RequestedCardLimit.setHidden(true);
    //             this.CardDispatchMode.setHidden(true);
    //         }
    //     }

    // }
    setApproveCashLimit() {
        // Validate if Approved Limit is greater than product Credit Limit
        if (+this.ApprovedLimit.getFieldValue() > +this.header.Product_max_credit) {
            this.services.alert.showAlert(2, 'rlo.error.approvedlimit.gt.product', 5000);
            return;
        }


        let MaxApprovedCashLimit: any;
        let MaxCashLimit: any;
        MaxCashLimit = this.header.Product_max_cash_limit;
        let MaxCardLimit: any;
        MaxCardLimit = this.header.Product_max_credit;
        let MinCardLimit: any;
        MinCardLimit = this.header.Product_min_cash_limit;

        if (this.ApprovedLimit.getFieldValue() != undefined) {
            MaxApprovedCashLimit = ((this.ApprovedLimit.getFieldValue() * MaxCashLimit) / MaxCardLimit);
        }
        if (MaxApprovedCashLimit > MinCardLimit) {
            this.ApprovedCashLimit.setComponentSpecificValue(MinCardLimit, null);
        }
        else {
            this.ApprovedCashLimit.setComponentSpecificValue(MaxApprovedCashLimit, null);
        }
    }
    fetchCreditCardDetails() {
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
                        // this.SettlementAccountType.setValue(CreditElement['SettlementAccountType']['id']);

                        this.SettlementAccountNo.setValue(CreditElement['SettlementAccountNo']);
                        this.PaymentOption.setValue(CreditElement['PaymentOption']['id']);
                        this.StmtDispatchMode.setValue(CreditElement['StmtDispatchMode']['id']);
                        // this.ExistingCreditCard.setValue(CreditElement['ExistingCreditCard']['id']);
                        this.CardDispatchMode.setValue(CreditElement['CardDispatchMode']);
                        //     this.hidCreditSeq.setValue(CreditElement['CreditCardDetailSeq'])
                        this.CreditCardSeq = CreditElement['CreditCardDetailSeq'];
                        this.CustomerType.setValue(CreditElement['CustomerType']['text']);
                        //this.MaxCashLimit.setValue(CreditElement['MaxCashLimit']);
                        // this.ApprovedCashLimit.setValue(CreditElement['ApprovedCashLimit']);
                        this.NomineeRequired.setValue(CreditElement['NomineeRequired']['id']);
                        this.NomineeName.setValue(CreditElement['NomineeDetails']['NomineeName']);
                        this.NomineeRelationship.setValue(CreditElement['NomineeDetails']['NomineeRelationship']['id']);
                        this.NomineeDOB.setValue(CreditElement['NomineeDetails']['NomineeDOB']);
                        this.GuardianName.setValue(CreditElement['NomineeDetails']['GuardianName']);
                        this.GuadianRelationship.setValue(CreditElement['NomineeDetails']['GuadianRelationship']['id']);
                        this.hidNomineeSeq.setValue(CreditElement['NomineeDetails']['NomineeSeq']);

                        //custom
                        this.RequestedCardLimit.setComponentSpecificValue(CreditElement['RequestedCardLimit'], null);//for LE
                        // this.ApprovedLimit.setComponentSpecificValue(CreditElement['ApprovedLimit'], null);  // commented as Approved card Limit is not comimg from AddOn- Initiated  json for now
                        let tempApprovedCardLimit = (undefined != CreditElement['ApprovedLimit'] && '' != CreditElement['ApprovedLimit']) ? CreditElement['ApprovedLimit'] : CreditElement['CurrentCardLimit'];
                        this.ApprovedLimit.setComponentSpecificValue(tempApprovedCardLimit, null);
                        this.MaxCashLimit.setComponentSpecificValue(CreditElement['MaxCashLimit'], null);
                        this.ApprovedCashLimit.setComponentSpecificValue(CreditElement['ApprovedCashLimit'], null);
                        this.AvailableLimit.setComponentSpecificValue(CreditElement['AvailableLimit'], null);
                        //  this.CurrentCorporateCardLimit.setComponentSpecificValue(CreditElement['CurrentCorporateCardLimit'], null);
                        this.CurrentCardLimit.setComponentSpecificValue(CreditElement['CurrentCardLimit'], null);
                        this.MaskedCardNumber.setValue(CreditElement['MaskedCardNumber']);

                        this.setApproveCashLimit();
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

    fetchHeaderDetails() {
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
                    this.services.rloCommonData.globalApplicationDtls.MaxCashLimit = this.header.Product_max_cash_limit;
                    this.services.rloCommonData.globalApplicationDtls.MaxCreditLimit = this.header.Product_max_credit;
                    this.services.rloCommonData.globalApplicationDtls.SubCamType = this.header.SubCamType;
                    this.SubCamType = this.header.SubCamType;
                    this.MaximumCardLimit.setComponentSpecificValue(this.header.Product_max_credit, null);
                    this.MaxCashLimit.setComponentSpecificValue(this.header.Product_max_cash_limit, null);
                    this.adjustFieldsBasedOnCamType();
                    this.setApproveCashLimit();
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

    adjustFieldsBasedOnCamType() {
        let isNewApplication: boolean = true;
        if ('LE' == this.services.rloCommonData.globalApplicationDtls.CamType) {
            this.ApprovedLimit.setReadOnly(false);
            this.AvailableLimit.setHidden(true);
            isNewApplication = false;
        } else if (this.services.rloCommonData.globalApplicationDtls.CamType == 'MEMC') {
            this.ApprovedLimit.setReadOnly('LE' == this.SubCamType ? false : true);
            this.AvailableLimit.setHidden(false);
            isNewApplication = false;
        }
        else {
            this.ApprovedLimit.setReadOnly(false);
            this.AvailableLimit.setHidden(true);
            isNewApplication = true;
          }
          // RE & LE related common fields 
          this.CurrentCardLimit.setHidden(isNewApplication);
          this.MaskedCardNumber.setHidden(isNewApplication);
          this.ApprovedLimit.mandatory = !this.ApprovedLimit.isReadOnly();
          
          //normal FLow Fields
        this.RequestedCardLimit.setHidden(!isNewApplication);
        this.NomineeRequired.setHidden(!isNewApplication);
        this.NomineeRequired.mandatory = isNewApplication;
        this.NomineeName.setHidden(!isNewApplication);
        this.NomineeRelationship.setHidden(!isNewApplication);
        this.NomineeDOB.setHidden(!isNewApplication);
        this.GuardianName.setHidden(!isNewApplication);
        this.GuadianRelationship.setHidden(!isNewApplication);
        this.SettlementAccountNo.setHidden(!isNewApplication);
        this.SettlementAccountNo.mandatory = isNewApplication
        this.PaymentOption.setHidden(!isNewApplication);
        this.StmtDispatchMode.setHidden(!isNewApplication);
        this.StmtDispatchMode.mandatory = isNewApplication;
        this.CardDispatchMode.setHidden(!isNewApplication);
        setTimeout(() => {
          if (this.readOnly) {
              //changes for Canara bank
              this.ApprovedLimit.setReadOnly(true);
             // this.ApprovedLimit.mandatory=false;
              let ele = this.CreditCardInputGrid.ProposedCardLimit.toArray();
                    ele.forEach(element => {
                        element.setReadOnly(true);
                    });


          }

      }, 500);
    }

    CCD_Clear_click(event) {
        this.clearFieldsFlag = true;
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
        let isGridValid:boolean= await this.CreditCardInputGrid.validateAmountColumn();
        if(!isGridValid){
          this.services.alert.showAlert(2, 'rlo.error.credit-card-grid.empty-column', -1);
          return;
        }
        console.log("shweta", noOfError);
        //var noOfError: number = 0;

        console.log(this.ApprovedLimit.getFieldValue());
        if (noOfError == 0) {
            if (this.services.rloCommonData.globalApplicationDtls.CamType == 'LE' || this.SubCamType == 'LE') {
                if (this.ApprovedLimit.isAmountEmpty() || this.CurrentCardLimit.isAmountEmpty()) {
                  this.services.alert.showAlert(2, 'rlo.error.limit-enhancement', -1);
                  this.ApprovedLimit.setError('rlo.error.approved-amount-empty');
                    return 1;
                }
                if (this.ApprovedLimit.getFieldValue() < this.CurrentCardLimit.getFieldValue()) {
                    this.services.alert.showAlert(2, 'rlo.error.limit-enhancement', -1);
                    this.ApprovedLimit.setError('rlo.error.approved-amount-empty');
                    return;
                }
            }
            if (this.CreditCardInputGrid.CustomerDtlsMap.size > 0) {
                if ((undefined == this.SubCamType || '' == this.SubCamType) && 'MEMC' == this.services.rloCommonData.globalApplicationDtls.CamType && !this.CreditCardInputGrid.popupFlag) {
                    if ((parseFloat(this.AvailableLimit.getFieldValue()) < parseFloat(this.CreditCardInputGrid.TotalProposedCardLimit.getFieldValue())) && this.services.rloCommonData.globalApplicationDtls.CamType == 'MEMC') {
                        this.CreditCardInputGrid.doRealignmentOrLimitEnhancementHandling();
                        return;
                    }
                }
            }
            this.doSaveCreditCardAPICall();
        }
        else {
            this.services.alert.showAlert(2, 'rlo.error.invalid.form', -1);
        }
    }


    doSaveCreditCardAPICall() {
        if (this.CreditCardInputGrid.CustomerDtlsMap.size != 0) {
            if (parseFloat(this.CreditCardInputGrid.TotalProposedCardLimit.getFieldValue()) > parseFloat(this.ApprovedLimit.getFieldValue())) {
                this.services.alert.showAlert(2, 'rlo.error.totCardLimit', -1);
                return;
            }
            this.doUpdateMemberAPICall();

        }
        // if(this.SubCamType!=undefined && this.services.rloCommonData.globalApplicationDtls.SubCamType != this.SubCamType){
        //   this.doUpdateApplicationDtls();
        // }
        if (this.CreditCardSeq != undefined) {
            let inputMap = new Map();
            inputMap.set('Body.CreditCardDetails.ApplicationId', this.ApplicationId);
            inputMap.set('PathParam.CreditCardDetailSeq', this.CreditCardSeq);
            inputMap.set('Body.CreditCardDetails.ApprovedLimit', this.ApprovedLimit.getFieldValue());
            inputMap.set('Body.CreditCardDetails.NomineeDetails.NomineeSeq', this.hidNomineeSeq.getFieldValue());
            inputMap.set('Body.CreditCardDetails.SettlementAccountNo', this.SettlementAccountNo.getFieldValue());
            inputMap.set('Body.CreditCardDetails.PaymentOption', this.PaymentOption.getFieldValue());
            inputMap.set('Body.CreditCardDetails.StmtDispatchMode', this.StmtDispatchMode.getFieldValue());
            inputMap.set('Body.CreditCardDetails.CardDispatchMode', this.CardDispatchMode.getFieldValue());


            inputMap.set('Body.CreditCardDetails.MaxCashLimit', this.MaxCashLimit.getFieldValue());
            inputMap.set('Body.CreditCardDetails.ApprovedCashLimit', this.ApprovedCashLimit.getFieldValue());
            inputMap.set('Body.CreditCardDetails.NomineeRequired', this.NomineeRequired.getFieldValue());
            inputMap.set('Body.CreditCardDetails.NomineeDetails.NomineeName', this.NomineeName.getFieldValue());
            inputMap.set('Body.CreditCardDetails.NomineeDetails.NomineeRelationship', this.NomineeRelationship.getFieldValue());
            inputMap.set('Body.CreditCardDetails.NomineeDetails.NomineeDOB', this.NomineeDOB.getFieldValue());
            inputMap.set('Body.CreditCardDetails.NomineeDetails.GuardianName', this.GuardianName.getFieldValue());
            inputMap.set('Body.CreditCardDetails.NomineeDetails.GuadianRelationship', this.GuadianRelationship.getFieldValue());
            //inputMap.set('Body.CreditCardDetails.NomineeDetails.SubCamType', this.SubCamType);
            //custom

            inputMap.set('Body.CreditCardDetails.RequestedCardLimit', this.RequestedCardLimit.getFieldValue());


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
    async doUpdateApplicationDtls() {
        let inputMap = new Map();
        inputMap.set('PathParam.ApplicationId', this.ApplicationId);
        inputMap.set('Body.ApplicationDetails.SubCamType', this.SubCamType);
        this.services.http.fetchApi('/ApplicationDetails/{ApplicationId}', 'PUT', inputMap, '/rlo-de').subscribe(
            async (httpResponse: HttpResponse<any>) => {
                var res = httpResponse.body;
                console.log("SubCamType is updated succeessfully");
            }, async (httpError) => {
                var err = httpError['error']
                if (err != null && err['ErrorElementPath'] != undefined && err['ErrorDescription'] != undefined) {
                    if (err['ErrorElementPath'] == 'CreditCardDetails.CardDispatchMode') {
                        this.CardDispatchMode.setError(err['ErrorDescription']);
                    }
                }
            });
    }
    async doUpdateMemberAPICall() {
        let inputMap = new Map();
        inputMap.set('Body.MemberCardDetails', this.generateMemberUpdateRequest());
        this.services.http.fetchApi('/UpdateMemberCards', 'POST', inputMap, '/initiation').subscribe(
            async (httpResponse: HttpResponse<any>) => {
                var res = httpResponse.body;
                // this.services.rloCommonData.childToParentSubject.next({
                //     action: 'updateCustGridViaCreditSection'
                // });
            },
            async (httpError) => {
                var err = httpError['error']
                this.services.alert.showAlert(2, 'rlo.error.save.card', -1);
            }
        );
    }
    generateMemberUpdateRequest() {
        let MemberList = [];
        this.CreditCardInputGrid.CustomerDtlsMap.forEach(element => {
            let tempMemberObject = {};
            tempMemberObject['BorrowerSeq'] = element.BorrowerSeq;
            tempMemberObject['RequestedCreditLimit'] = element.RequestedCreditLimit;
            tempMemberObject['ProposedCashLimit'] = element.ProposedCashLimit
            MemberList.push(tempMemberObject);
        });
        return MemberList;
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
        // Branch: {
        //     inDep: [
        //       { paramKey: "BranchCd", depFieldID: "Branch", paramType: "PathParam" },
        //       // { paramKey: "VALUE1", depFieldID: "AD_BRANCH", paramType: "PathParam" },
        //       // { paramKey: "KEY1", depFieldID: "hidAccBranch", paramType: "QueryParam" },
        //       // { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
        //     ],
        //     outDep: [
        //     ]
        //   },
        //   CustomerType: {
        //     inDep: [

        //       { paramKey: "VALUE1", depFieldID: "CustomerType", paramType: "PathParam" },
        //       { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
        //       { paramKey: "KEY1", depFieldID: "hideCardCustType", paramType: "QueryParam" },
        //     ],
        //     outDep: [
        //     ]
        //   },

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
        console.log("Deep ---- | customGenericOnBlur", event);
        // if (event.field == "ApprovedLimit") {
        //     this.approveLimitBlur(event.textFieldValue);
        // }
        this.genericOnBlur(event.field, event.textFieldValue);
        // if (event.field == "ApprovedCashLimit") {
        if (event.field == "ApprovedLimit") {
            this.setApproveCashLimit();
        }
    }


    //show or hide form section if camType = 'LE'
    hideFieldsForLimitEnhancement() {
        this.MaskedCardNumber.setHidden(false);
    }

    //limit reduction checking on save
    limitReduction() {
        if (undefined != this.RequestedCardLimit.getFieldValue() && undefined != this.RequestedCardLimit.getFieldValue() && this.CurrentCardLimit.getFieldValue() != undefined) {
            if (this.RequestedCardLimit.getFieldValue() < this.CurrentCardLimit.getFieldValue()) {
                this.services.alert.showAlert(2, 'rlo.error.limit-enhancement', -1);
                return;
            }
        }
    }

}
