import { Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import { LiabilityDtlsFormModel } from './LiabilityDtlsForm.model';
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
import { LiabilityDtlsGridComponent } from '../LiabilityDtlsGrid/LiabilityDtlsGrid.component';
import { LiabilityHandlerComponent } from '../LiabilityDtlsForm/liability-handler.component';
import { RLOUIRadioComponent } from 'src/app/rlo-ui-radio/rlo-ui-radio.component';
import { RloUiCurrencyComponent } from '../rlo-ui-currency/rlo-ui-currency.component';

const customCss: string = '';

@Component({
    selector: 'app-LiabilityDtlsForm',
    templateUrl: './LiabilityDtlsForm.component.html'
})
export class LiabilityDtlsFormComponent extends FormComponent implements OnInit, AfterViewInit {
    activeBorrowerSeq: any;
    @ViewChild('LD_FINANCIER_NAME', { static: false }) LD_FINANCIER_NAME: TextBoxComponent;
    @ViewChild('LD_LOAN_STATUS', { static: false }) LD_LOAN_STATUS: ComboBoxComponent;
    @ViewChild('LD_TYPE_OF_LOAN', { static: false }) LD_TYPE_OF_LOAN: ComboBoxComponent;
    //@ViewChild('LD_LOAN_AMOUNT', { static: false }) LD_LOAN_AMOUNT: TextBoxComponent;
    @ViewChild('LD_LOAN_CLOSURE_DATE', { static: false }) LD_LOAN_CLOSURE_DATE: DateComponent;
    //@ViewChild('LD_LOAN_EMI', { static: false }) LD_LOAN_EMI: TextBoxComponent;
    @ViewChild('LD_INCLUDE_IN_DBR', { static: false }) LD_INCLUDE_IN_DBR: RLOUIRadioComponent;
    //@ViewChild('LD_OS_AMOUNT', { static: false }) LD_OS_AMOUNT: AmountComponent;
    //@ViewChild('LD_CURRENCY', { static: false }) LD_CURRENCY: ComboBoxComponent;
    //@ViewChild('LD_EQUIVALENT_AMOUNT', { static: false }) LD_EQUIVALENT_AMOUNT: AmountComponent;
    @ViewChild('LD_LOAN_EMI_FREQUENCY', { static: false }) LD_LOAN_EMI_FREQUENCY: ComboBoxComponent;
    @ViewChild('LD_REMARKS', { static: false }) LD_REMARKS: TextAreaComponent;
    @ViewChild('LD_SAVE', { static: false }) LD_SAVE: ButtonComponent;
    @ViewChild('LIABILITY_GRID', { static: false }) LIABILITY_GRID: LiabilityDtlsGridComponent;
    @ViewChild('Handler', { static: false }) Handler: LiabilityHandlerComponent;
    @ViewChild('hideEmiFrequency', { static: false }) hideEmiFrequency: HiddenComponent;
    @ViewChild('hideTypeOfLoan', { static: false }) hideTypeOfLoan: HiddenComponent;
    @ViewChild('hiddenLiabilitySeq', { static: false }) hiddenLiabilitySeq: HiddenComponent;
    @ViewChild('hidAppId', { static: false }) hidAppId: HiddenComponent;
    @ViewChild('hidLoanStatus', { static: false }) hidLoanStatus: HiddenComponent;
    @ViewChild('hideInculdeInDBR', { static: false }) hideInculdeInDBR: HiddenComponent;
    @ViewChild('hidExchangeRate', { static: false }) hidExchangeRate: HiddenComponent;
    @ViewChild('hideCurrencyDesc', { static: false }) hideCurrencyDesc: HiddenComponent;
    @ViewChild('LD_LIABILITY_TYPE', { static: false }) LD_LIABILITY_TYPE: RLOUIRadioComponent;
    @ViewChild('LD_OBLIGATION_HEAD', { static: false }) LD_OBLIGATION_HEAD: ComboBoxComponent;
    @ViewChild('hideLiabilityType', { static: false }) hideLiabilityType: HiddenComponent;
    @ViewChild('hideObligationHead', { static: false }) hideObligationHead: HiddenComponent;

    //custom
    @ViewChild('LD_LOAN_AMOUNT', { static: false }) LD_LOAN_AMOUNT: RloUiCurrencyComponent;
    @ViewChild('LD_EQUIVALENT_AMOUNT', { static: false }) LD_EQUIVALENT_AMOUNT: RloUiCurrencyComponent;
    @ViewChild('LD_LOAN_EMI', { static: false }) LD_LOAN_EMI: RloUiCurrencyComponent;
    @ViewChild('LD_OS_AMOUNT', { static: false }) LD_OS_AMOUNT: RloUiCurrencyComponent;

    isObligation: boolean;
    setTypeObligation: boolean = false;//used in UW 

    async revalidate(): Promise<number> {
        var totalErrors = 0;
        super.beforeRevalidate();
        if (this.LD_LIABILITY_TYPE.getFieldValue() == 'O' && (this.LD_OBLIGATION_HEAD.getFieldValue() != undefined || this.LD_OBLIGATION_HEAD.getFieldValue() != '')) {
            await Promise.all([
                this.revalidateBasicField('LD_LOAN_AMOUNT'),
                this.revalidateBasicField('LD_INCLUDE_IN_DBR'),
                //this.revalidateBasicField('LD_CURRENCY'),
                //this.revalidateBasicField('LD_EQUIVALENT_AMOUNT'),
                this.revalidateBasicField('LD_LOAN_EMI_FREQUENCY'),
                this.revalidateBasicField('LD_LIABILITY_TYPE'),
            ]).then((errorCounts) => {
                errorCounts.forEach((errorCount) => {
                    totalErrors += errorCount;
                });
            });
        } else {
            await Promise.all([
                this.revalidateBasicField('LD_FINANCIER_NAME'),
                this.revalidateBasicField('LD_LOAN_STATUS'),
                this.revalidateBasicField('LD_TYPE_OF_LOAN'),
                this.revalidateBasicField('LD_LOAN_AMOUNT'),
                this.revalidateBasicField('LD_LOAN_CLOSURE_DATE'),
                this.revalidateBasicField('LD_LOAN_EMI'),
                this.revalidateBasicField('LD_INCLUDE_IN_DBR'),
                this.revalidateBasicField('LD_OS_AMOUNT'),
                //this.revalidateBasicField('LD_CURRENCY'),
                //this.revalidateBasicField('LD_EQUIVALENT_AMOUNT'),
                this.revalidateBasicField('LD_LOAN_EMI_FREQUENCY'),
                this.revalidateBasicField('LD_LIABILITY_TYPE'),
                this.revalidateBasicField('LD_REMARKS'),
            ]).then((errorCounts) => {
                errorCounts.forEach((errorCount) => {
                    totalErrors += errorCount;
                });
            });

        }
        this.errors = totalErrors;
        super.afterRevalidate();
        return totalErrors;
    }
    constructor(services: ServiceStock) {
        super(services);
        this.value = new LiabilityDtlsFormModel();
        this.componentCode = 'LiabilityDtlsForm';
        this.isObligation = true;
    }
    setReadOnly(readOnly) {
        super.setBasicFieldsReadOnly(readOnly);
    }
    async clear_click(event) {
        let inputMap = new Map();
        this.onReset();
    }
    async onFormLoad() {
        this.LD_LIABILITY_TYPE.setDefault('L');
        this.LD_LIABILITY_TYPE.setValue('L');

        this.setInputs(this.services.dataStore.getData(this.services.routing.currModal));
        // this.LD_OS_AMOUNT.setFormatOptions({ currencyCode: 'INR', languageCode: 'en-US', });
        // this.LD_EQUIVALENT_AMOUNT.setFormatOptions({ currencyCode: 'INR', languageCode: 'en-US', });
        this.hideEmiFrequency.setValue('FREQUENCY');
        this.hideTypeOfLoan.setValue('LOAN_TYPE');
        this.hidAppId.setValue('RLO');
        this.hidLoanStatus.setValue('LOAN_STATUS');
        this.hideInculdeInDBR.setValue('Y_N');
        // this.hideCurrencyDesc.setValue('EUR');
        this.hideLiabilityType.setValue('LIABILITY_TYPE');
        this.hideObligationHead.setValue('OBLIGATION_HEAD');
        this.setDependencies();

        this.Handler.hideObligationField({});
        await this.Handler.onFormLoad({});
        await this.LIABILITY_GRID.gridDataLoad({
            'passBorrowerToLiability': this.activeBorrowerSeq
        });

        //used in UW 
        if (this.setTypeObligation) {
            setTimeout(() => {
                this.LD_LIABILITY_TYPE.setDefault('O');
                this.LD_LIABILITY_TYPE.setValue('O');

                this.isObligation = true;
                this.LD_LIABILITY_TYPE_change();
            }, 800);
        }

        //UW
        console.log(this.LIABILITY_GRID.columnDefs);
        if (this.readOnly) {
            this.LIABILITY_GRID.columnDefs = this.LIABILITY_GRID.columnDefs.slice(0, 4);
            this.LIABILITY_GRID.columnDefs[3].width = 12;
            this.LIABILITY_GRID.columnDefs[3].cellRendererParams.CustomClass = "btn-views";
            this.LIABILITY_GRID.columnDefs[3].cellRendererParams.IconClass = 'fas fa-eye fa-lg';
        }
    }

    async LD_OBLIGATION_HEAD_change(fieldID, value) {
        let inputMap = new Map();
        if (this.LD_OBLIGATION_HEAD.getFieldValue() != '' || this.LD_OBLIGATION_HEAD.getFieldValue() != undefined) {
            //this.LD_CURRENCY.mandatory = true;
            this.LD_EQUIVALENT_AMOUNT.mandatory = true;
            this.LD_INCLUDE_IN_DBR.mandatory = true;
            this.LD_LOAN_EMI_FREQUENCY.mandatory = true;
            this.LD_LOAN_AMOUNT.mandatory = true;
        }
    }

    async LD_LIABILITY_TYPE_change() {
        let inputMap = new Map();
        this.Handler.hideObligationField({});
        this.LD_LOAN_AMOUNT.onReset();
        //this.LD_CURRENCY.onReset();
        this.LD_EQUIVALENT_AMOUNT.onReset();
        this.LD_INCLUDE_IN_DBR.onReset();
        this.LD_LOAN_EMI_FREQUENCY.onReset();
        this.LD_OBLIGATION_HEAD.onReset();
        this.LD_FINANCIER_NAME.onReset();
        this.LD_TYPE_OF_LOAN.onReset();
        this.LD_LOAN_CLOSURE_DATE.onReset();
        this.LD_LOAN_STATUS.onReset();
        this.LD_REMARKS.onReset();
        this.LD_LOAN_EMI.onReset();
        this.LD_OS_AMOUNT.onReset();

        //custom
        this.LD_LOAN_AMOUNT.resetFieldAndDropDown();
        this.LD_EQUIVALENT_AMOUNT.resetFieldAndDropDown();
        this.LD_LOAN_EMI.resetFieldAndDropDown();
        this.LD_OS_AMOUNT.resetFieldAndDropDown();
    }

    async LD_CURRENCY_blur(event) {
        let hidExchangeRate = this.hidExchangeRate.getFieldValue();
        let LD_LOAN_AMOUNT = this.LD_LOAN_AMOUNT.getFieldValue();
        console.warn("Deep LD_CURRENCY_blur()|", hidExchangeRate, LD_LOAN_AMOUNT)
        let inputMap = new Map();
        this.Handler.calculateLocalCurrEquv()
    }
    async LD_LOAN_AMOUNT_blur(event) {
        let inputMap = new Map();
        this.Handler.calculateLocalCurrEquv()
        // await this.Handler.onAddTypeChange();
    }
    setInputs(param: any) {
        let params = this.services.http.mapToJson(param);
        if (params['mode']) {
            this.mode = params['mode'];
        }
    }
    async submitForm(path, apiCode, serviceCode) {
        this.submitData['formName'] = 'Liability Details Form';
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
        this.value = new LiabilityDtlsFormModel();
        this.value.setValue(inputValue);
        this.setDependencies();
        this.passNewValue(this.value);
    }
    ngOnInit() {
        if (this.formCode == undefined) { this.formCode = 'LiabilityDtlsForm'; }
        if (this.formOnLoadError) { return; }
        var styleElement = document.createElement('style');
        styleElement.type = 'text/css';
        styleElement.innerHTML = customCss;
        styleElement.id = 'LiabilityDtlsForm_customCss';
        document.getElementsByTagName('head')[0].appendChild(styleElement);
    }
    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
        var styleElement = document.getElementById('LiabilityDtlsForm_customCss');
        styleElement.parentNode.removeChild(styleElement);
    }
    ngAfterViewInit() {
        setTimeout(() => {
            this.subsBFldsValueUpdates();
            this.onFormLoad();
            this.checkForHTabOverFlow();
        });
        console.log(this.readOnly);

        if (this.readOnly) {
            this.setReadOnly(this.readOnly);
        }
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
        this.value = new LiabilityDtlsFormModel();
        this.passNewValue(this.value);
        this.setReadOnly(false);
        this.onFormLoad();

        //custom
        this.LD_LOAN_AMOUNT.resetFieldAndDropDown();
        this.LD_EQUIVALENT_AMOUNT.resetFieldAndDropDown();
        this.LD_LOAN_EMI.resetFieldAndDropDown();
        this.LD_OS_AMOUNT.resetFieldAndDropDown();
    }
    loanClosuredate(selectedDate) {
        const moment = require('moment');
        const currentDate = moment();
        currentDate.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
        selectedDate = moment(selectedDate, 'DD-MM-YYYY');
        console.log("current date :: ", currentDate._d);
        console.log("selected date :: ", selectedDate._d);
        if (selectedDate < currentDate) {
            return false;
        }
        return true;
    }
    LD_LOAN_CLOSURE_DATE_blur(event) {
        let inputMap = new Map();
        if (!this.loanClosuredate(this.LD_LOAN_CLOSURE_DATE.getFieldValue())) {
            this.LD_LOAN_CLOSURE_DATE.setError('Loan Closure Date cannot be past date')
            return 1;
            // this.services.alert.showAlert(2, 'rlo.error.inceptiondate.occupation', -1);
            // this.OD_DT_OF_INCPTN.onReset();
        }
    }
    async LD_SAVE_click(event) {
        // this.LD_SAVE.setDisabled(true);
        let inputMap = new Map();
        var numberOfErrors: number = await this.revalidate();

        let liabilityGridData: any = this.LIABILITY_GRID.getLiabilityDetails();
        if (numberOfErrors == 0) {
            if (this.LD_LIABILITY_TYPE.getFieldValue() !== undefined) {
                if (liabilityGridData) {
                    for (let i = 0; i < liabilityGridData.length; i++) {
                        if (liabilityGridData[i].LIABILITY_TYPE_ID == this.LD_LIABILITY_TYPE.getFieldValue() && liabilityGridData[i].LD_AMOUNT == this.LD_LOAN_AMOUNT.getFieldValue() && liabilityGridData[i].LIABILITY_ID !== this.hiddenLiabilitySeq.getFieldValue()) {
                            this.services.alert.showAlert(2, 'rlo.error.exits.liability', -1);
                            return;
                        }
                    }
                }
            }

            if (this.hiddenLiabilitySeq.getFieldValue() != undefined) {
                inputMap.clear();
                inputMap.set('PathParam.LiabilitySeq', this.hiddenLiabilitySeq.getFieldValue());
                inputMap.set('Body.LiabilityDetails.FinancerName', this.LD_FINANCIER_NAME.getFieldValue());
                inputMap.set('Body.LiabilityDetails.LoanStatus', this.LD_LOAN_STATUS.getFieldValue());
                inputMap.set('Body.LiabilityDetails.TypeofLoan', this.LD_TYPE_OF_LOAN.getFieldValue());
                //inputMap.set('Body.LiabilityDetails.Amount', this.LD_LOAN_AMOUNT.getFieldValue());
                inputMap.set('Body.LiabilityDetails.ClosureDate', this.LD_LOAN_CLOSURE_DATE.getFieldValue());
                //inputMap.set('Body.LiabilityDetails.LoanEMI', this.LD_LOAN_EMI.getFieldValue());
                inputMap.set('Body.LiabilityDetails.IncludeInDBR', this.LD_INCLUDE_IN_DBR.getFieldValue());
                //inputMap.set('Body.LiabilityDetails.OutstandingAmount', this.LD_OS_AMOUNT.getFieldValue());
                //inputMap.set('Body.LiabilityDetails.Currency', this.LD_CURRENCY.getFieldValue());
                inputMap.set('Body.LiabilityDetails.LocalEquivalentAmt', this.LD_EQUIVALENT_AMOUNT.getFieldValue());
                inputMap.set('Body.LiabilityDetails.EmiFrequency', this.LD_LOAN_EMI_FREQUENCY.getFieldValue());
                inputMap.set('Body.LiabilityDetails.LiabilityType', this.LD_LIABILITY_TYPE.getFieldValue());
                inputMap.set('Body.LiabilityDetails.Remarks', this.LD_REMARKS.getFieldValue());
                inputMap.set('Body.LiabilityDetails.ObligationHead', this.LD_OBLIGATION_HEAD.getFieldValue());
                inputMap.set('Body.LiabilityDetails.BorrowerSeq', this.activeBorrowerSeq);

                //custom
                inputMap.set('Body.LiabilityDetails.Currency', this.LD_LOAN_AMOUNT.currencyCode);
                inputMap.set('Body.LiabilityDetails.Amount', this.LD_LOAN_AMOUNT.getTextBoxValue());
                inputMap.set('Body.LiabilityDetails.LocalEquivalentAmt', this.LD_EQUIVALENT_AMOUNT.getFieldValue());
                inputMap.set('Body.LiabilityDetails.LoanEMI', this.LD_LOAN_EMI.getTextBoxValue());
                inputMap.set('Body.LiabilityDetails.OutstandingAmount', this.LD_OS_AMOUNT.getTextBoxValue());


                console.error("DEEP | LD_SAVE_click()", inputMap);
                console.error("DEEP | LD_SAVE_click()",
                    inputMap.get('Body.LiabilityDetails.Currency'),
                    inputMap.get('Body.LiabilityDetails.Amount'),
                    inputMap.get('Body.LiabilityDetails.LocalEquivalentAmt'),
                    inputMap.get('Body.LiabilityDetails.LoanEMI'),
                    inputMap.get('Body.LiabilityDetails.OutstandingAmount')
                );
                //return;

                this.services.http.fetchApi('/LiabilityDetails/{LiabilitySeq}', 'PUT', inputMap, '/rlo-de').subscribe(
                    async (httpResponse: HttpResponse<any>) => {
                        var res = httpResponse.body;
                        this.services.alert.showAlert(1, 'rlo.success.update.liability', 5000);
                        this.onReset();
                        // this.LD_SAVE.setDisabled(false);

                    },
                    async (httpError) => {
                        var err = httpError['error']
                        if (err != null && err['ErrorElementPath'] != undefined && err['ErrorDescription'] != undefined) {
                            if (err['ErrorElementPath'] == 'LiabilityDetails.LoanEmiFrequency') {
                                this.LD_LOAN_EMI_FREQUENCY.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'LiabilityDetails.LocalEquivalentAmt') {
                                this.LD_EQUIVALENT_AMOUNT.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'LiabilityDetails.Currency') {
                                //this.LD_CURRENCY.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'LiabilityDetails.OutstandingAmount') {
                                this.LD_OS_AMOUNT.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'LiabilityDetails.IncludeInDBR') {
                                this.LD_INCLUDE_IN_DBR.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'LiabilityDetails.LoanEMI') {
                                this.LD_LOAN_EMI.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'LiabilityDetails.ClosureDate') {
                                this.LD_LOAN_CLOSURE_DATE.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'LiabilityDetails.Amount') {
                                this.LD_LOAN_AMOUNT.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'LiabilityDetails.TypeofLoan') {
                                this.LD_TYPE_OF_LOAN.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'LiabilityDetails.LoanStatus') {
                                this.LD_LOAN_STATUS.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'LiabilityDetails.FinancerName') {
                                this.LD_FINANCIER_NAME.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'LiabilitySeq') {
                                this.hiddenLiabilitySeq.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'LiabilityDetails.LiabilityType') {
                                this.LD_LIABILITY_TYPE.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'LiabilityDetails.ObligationHead') {
                                this.LD_OBLIGATION_HEAD.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'LiabilityDetails.Remarks') {
                                this.LD_REMARKS.setError(err['ErrorDescription']);
                            }
                        }
                        this.services.alert.showAlert(2, 'rlo.error.update.liability', -1);
                        // this.LD_SAVE.setDisabled(false);

                    }
                );
            }
            else {
                inputMap.clear();
                inputMap.set('Body.LiabilityDetails.FinancerName', this.LD_FINANCIER_NAME.getFieldValue());
                inputMap.set('Body.LiabilityDetails.LoanStatus', this.LD_LOAN_STATUS.getFieldValue());
                inputMap.set('Body.LiabilityDetails.TypeofLoan', this.LD_TYPE_OF_LOAN.getFieldValue());
                //inputMap.set('Body.LiabilityDetails.Amount', this.LD_LOAN_AMOUNT.getFieldValue());
                inputMap.set('Body.LiabilityDetails.ClosureDate', this.LD_LOAN_CLOSURE_DATE.getFieldValue());
                //inputMap.set('Body.LiabilityDetails.LoanEMI', this.LD_LOAN_EMI.getFieldValue());
                inputMap.set('Body.LiabilityDetails.IncludeInDBR', this.LD_INCLUDE_IN_DBR.getFieldValue());
                //inputMap.set('Body.LiabilityDetails.OutstandingAmount', this.LD_OS_AMOUNT.getFieldValue());
                //inputMap.set('Body.LiabilityDetails.Currency', this.LD_CURRENCY.getFieldValue());
                //inputMap.set('Body.LiabilityDetails.LocalEquivalentAmt', this.LD_EQUIVALENT_AMOUNT.getFieldValue());
                inputMap.set('Body.LiabilityDetails.EmiFrequency', this.LD_LOAN_EMI_FREQUENCY.getFieldValue());
                inputMap.set('Body.LiabilityDetails.LiabilityType', this.LD_LIABILITY_TYPE.getFieldValue());
                inputMap.set('Body.LiabilityDetails.Remarks', this.LD_REMARKS.getFieldValue());
                inputMap.set('Body.LiabilityDetails.ObligationHead', this.LD_OBLIGATION_HEAD.getFieldValue());
                inputMap.set('Body.LiabilityDetails.BorrowerSeq', this.activeBorrowerSeq);

                //custom
                inputMap.set('Body.LiabilityDetails.Currency', this.LD_LOAN_AMOUNT.currencyCode);
                inputMap.set('Body.LiabilityDetails.Amount', this.LD_LOAN_AMOUNT.getTextBoxValue());
                inputMap.set('Body.LiabilityDetails.LocalEquivalentAmt', this.LD_EQUIVALENT_AMOUNT.getFieldValue());
                inputMap.set('Body.LiabilityDetails.LoanEMI', this.LD_LOAN_EMI.getTextBoxValue());
                inputMap.set('Body.LiabilityDetails.OutstandingAmount', this.LD_OS_AMOUNT.getTextBoxValue());

                console.error("DEEP | LD_SAVE_click()", inputMap);
                console.error("DEEP | LD_SAVE_click()",
                    inputMap.get('Body.LiabilityDetails.Currency'),
                    inputMap.get('Body.LiabilityDetails.Amount'),
                    inputMap.get('Body.LiabilityDetails.LocalEquivalentAmt'),
                    inputMap.get('Body.LiabilityDetails.LoanEMI'),
                    inputMap.get('Body.LiabilityDetails.OutstandingAmount')
                );
                //return;

                this.services.http.fetchApi('/LiabilityDetails', 'POST', inputMap, '/rlo-de').subscribe(
                    async (httpResponse: HttpResponse<any>) => {
                        var res = httpResponse.body;
                        this.services.alert.showAlert(1, "rlo.success.save.liability", 5000);
                        this.onReset();
                        // this.LD_SAVE.setDisabled(false);

                    },
                    async (httpError) => {
                        var err = httpError['error']
                        if (err != null && err['ErrorElementPath'] != undefined && err['ErrorDescription'] != undefined) {
                            if (err['ErrorElementPath'] == 'LiabilityDetails.LoanEmiFrequency') {
                                this.LD_LOAN_EMI_FREQUENCY.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'LiabilityDetails.LocalEquivalentAmt') {
                                this.LD_EQUIVALENT_AMOUNT.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'LiabilityDetails.Currency') {
                                //this.LD_CURRENCY.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'LiabilityDetails.OutstandingAmount') {
                                this.LD_OS_AMOUNT.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'LiabilityDetails.IncludeInDBR') {
                                this.LD_INCLUDE_IN_DBR.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'LiabilityDetails.LoanEMI') {
                                this.LD_LOAN_EMI.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'LiabilityDetails.ClosureDate') {
                                this.LD_LOAN_CLOSURE_DATE.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'LiabilityDetails.Amount') {
                                //this.LD_LOAN_AMOUNT.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'LiabilityDetails.TypeofLoan') {
                                this.LD_TYPE_OF_LOAN.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'LiabilityDetails.LoanStatus') {
                                this.LD_LOAN_STATUS.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'LiabilityDetails.FinancerName') {
                                this.LD_FINANCIER_NAME.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'LiabilityDetails.LiabilityType') {
                                this.LD_LIABILITY_TYPE.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'LiabilityDetails.ObligationHead') {
                                this.LD_OBLIGATION_HEAD.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'LiabilityDetails.Remarks') {
                                this.LD_REMARKS.setError(err['ErrorDescription']);
                            }
                        }
                        this.services.alert.showAlert(2, "rlo.error.save.liability", -1);
                        // this.LD_SAVE.setDisabled(false);

                    }
                );
            }
        }
        else {
            this.services.alert.showAlert(2, 'rlo.error.invalid.form', -1);
        }
    }
    async LIABILITY_GRID_onModify(event) {
        let inputMap = new Map();
        this.showSpinner();
        inputMap.clear();
        inputMap.set('PathParam.LiabilitySeq', event.SeqKey);
        this.services.http.fetchApi('/LiabilityDetails/{LiabilitySeq}', 'GET', inputMap, '/rlo-de').subscribe(
            async (httpResponse: HttpResponse<any>) => {
                var res = httpResponse.body;
                this.LD_FINANCIER_NAME.setValue(res['LiabilityDetails']['FinancerName']);
                this.LD_LOAN_STATUS.setValue(res['LiabilityDetails']['LoanStatus']['id']);
                this.LD_TYPE_OF_LOAN.setValue(res['LiabilityDetails']['TypeofLoan']['id']);
                this.LD_LOAN_AMOUNT.setValue(res['LiabilityDetails']['Amount']);
                this.LD_LOAN_CLOSURE_DATE.setValue(res['LiabilityDetails']['ClosureDate']);
                this.LD_LOAN_EMI.setValue(res['LiabilityDetails']['LoanEMI']);
                this.LD_INCLUDE_IN_DBR.setValue(res['LiabilityDetails']['IncludeInDBR']['id']);
                this.LD_OS_AMOUNT.setValue(res['LiabilityDetails']['OutstandingAmount']);
                // this.LD_CURRENCY.setValue(res['LiabilityDetails']['Currency']);
                this.LD_EQUIVALENT_AMOUNT.setValue(res['LiabilityDetails']['LocalEquivalentAmt']);
                this.LD_LOAN_EMI_FREQUENCY.setValue(res['LiabilityDetails']['EmiFrequency']['id']);
                this.LD_LIABILITY_TYPE.setValue(res['LiabilityDetails']['LiabilityType']['id']);
                this.LD_REMARKS.setValue(res['LiabilityDetails']['Remarks']);
                this.LD_OBLIGATION_HEAD.setValue(res['LiabilityDetails']['ObligationHead']['id']);
                this.hiddenLiabilitySeq.setValue(res['LiabilityDetails']['LiabilitySeq']);
                this.hideSpinner();
                this.Handler.hideObligationField({});
                //this.revalidateBasicField('LD_CURRENCY', true)
                this.LD_OBLIGATION_HEAD_change('LD_OBLIGATION_HEAD', event);

                //custom
                this.LD_LOAN_AMOUNT.setComponentSpecificValue(res['LiabilityDetails']['Amount'], res['LiabilityDetails']['Currency']);
                this.LD_EQUIVALENT_AMOUNT.setComponentSpecificValue(res['LiabilityDetails']['LocalEquivalentAmt'], null);
                this.LD_LOAN_EMI.setComponentSpecificValue(res['LiabilityDetails']['LoanEMI'], null);
                this.LD_OS_AMOUNT.setComponentSpecificValue(res['LiabilityDetails']['OutstandingAmount'], null);

                this.LD_LOAN_AMOUNT.selectedCode(res['LiabilityDetails']['Currency']);
                this.LD_LOAN_EMI.selectedCode(res['LiabilityDetails']['Currency'], false);
                this.LD_OS_AMOUNT.selectedCode(res['LiabilityDetails']['Currency'], false);
            },
            async (httpError) => {
                var err = httpError['error']
                if (err != null && err['ErrorElementPath'] != undefined && err['ErrorDescription'] != undefined) {
                }
                this.services.alert.showAlert(2, 'rlo.error.wrong.form', -1);
                this.hideSpinner();
            }
        );
    }
    fieldDependencies = {
        LD_LOAN_STATUS: {
            inDep: [

                { paramKey: "VALUE1", depFieldID: "LD_LOAN_STATUS", paramType: "PathParam" },
                { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
                { paramKey: "KEY1", depFieldID: "hidLoanStatus", paramType: "QueryParam" },
            ],
            outDep: [
            ]
        },
        LD_TYPE_OF_LOAN: {
            inDep: [

                { paramKey: "VALUE1", depFieldID: "LD_TYPE_OF_LOAN", paramType: "PathParam" },
                { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
                { paramKey: "KEY1", depFieldID: "hideTypeOfLoan", paramType: "QueryParam" },
            ],
            outDep: [
            ]
        },
        LD_INCLUDE_IN_DBR: {
            inDep: [

                { paramKey: "VALUE1", depFieldID: "LD_INCLUDE_IN_DBR", paramType: "PathParam" },
                { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
                { paramKey: "KEY1", depFieldID: "hideInculdeInDBR", paramType: "QueryParam" },
            ],
            outDep: [
            ]
        },
        LD_LOAN_EMI_FREQUENCY: {
            inDep: [

                { paramKey: "VALUE1", depFieldID: "LD_LOAN_EMI_FREQUENCY", paramType: "PathParam" },
                { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
                { paramKey: "KEY1", depFieldID: "hideEmiFrequency", paramType: "QueryParam" },
            ],
            outDep: [
            ]
        },
        // LD_CURRENCY: {
        //     inDep: [

        //         { paramKey: "CurrencySrc", depFieldID: "LD_CURRENCY", paramType: "PathParam" },
        //         // { paramKey: "CurrencyDest", depFieldID: "hideCurrencyDesc", paramType: "QueryParam" },
        //     ],
        //     outDep: [
        //         { paramKey: "MstCurrencyDetails.ExchangeRate", depFieldID: "hidExchangeRate" },
        //     ]
        // },
        LD_OBLIGATION_HEAD: {
            inDep: [

                { paramKey: "VALUE1", depFieldID: "LD_OBLIGATION_HEAD", paramType: "PathParam" },
                { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
                { paramKey: "KEY1", depFieldID: "hideObligationHead", paramType: "QueryParam" },
            ],
            outDep: [
            ]
        },
        LD_LIABILITY_TYPE: {
            inDep: [

                { paramKey: "VALUE1", depFieldID: "LD_LIABILITY_TYPE", paramType: "PathParam" },
                { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
                { paramKey: "KEY1", depFieldID: "hideLiabilityType", paramType: "QueryParam" },
            ],
            outDep: [
            ]
        },

    }

    //custom 
    customGenericOnBlur(event: any) {
        console.log("Deep | customGenericOnBlur", event);
        if (event.field == "LD_LOAN_AMOUNT") {
            if (event.exchangeRate != undefined && event.textFieldValue != undefined) {
                this.hidExchangeRate.setValue(event.exchangeRate);

                let localCurrencyEq = event.textFieldValue * event.exchangeRate;
                console.log(localCurrencyEq);

                this.LD_EQUIVALENT_AMOUNT.setComponentSpecificValue(localCurrencyEq, null);
            }
            this.LD_LOAN_EMI.currencyCode = this.LD_LOAN_AMOUNT.currencyCode;
            this.LD_OS_AMOUNT.currencyCode = this.LD_LOAN_AMOUNT.currencyCode;
        }

        this.genericOnBlur(event.field, event.textFieldValue);
    }

}
