import { Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import { CustomerDtlsModel } from './CustomerDtls.model';
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
import { CustomerDtlsGridComponent } from '../CustomerDtlsGrid/CustomerDtlsGrid.component';
import { AddressDetailsComponent } from '../AddressDetails/AddressDetails.component';
import { OccupationDtlsFormComponent } from '../OccupationDtlsForm/OccupationDtlsForm.component';
import { CustomerHandlerComponent } from '../CustomerDtls/customer-handler.component';
import { RloUiAccordionComponent } from '../rlo-ui-accordion/rlo-ui-accordion.component';


const customCss: string = '';

@Component({
    selector: 'app-CustomerDtls',
    templateUrl: './CustomerDtls.component.html'
})
export class CustomerDtlsComponent extends FormComponent implements OnInit, AfterViewInit {
    @ViewChild('CD_CUST_TYPE', { static: false }) CD_CUST_TYPE: ComboBoxComponent;
    @ViewChild('CD_EXISTING_CUST', { static: false }) CD_EXISTING_CUST: ComboBoxComponent;
    @ViewChild('CD_STAFF', { static: false }) CD_STAFF: ComboBoxComponent;
    @ViewChild('CD_CIF', { static: false }) CD_CIF: TextBoxComponent;
    @ViewChild('CD_STAFF_ID', { static: false }) CD_STAFF_ID: TextBoxComponent;
    @ViewChild('CD_CUST_ID', { static: false }) CD_CUST_ID: TextBoxComponent;
    @ViewChild('CD_TITLE', { static: false }) CD_TITLE: ComboBoxComponent;
    @ViewChild('CD_FIRST_NAME', { static: false }) CD_FIRST_NAME: TextBoxComponent;
    @ViewChild('CD_MIDDLE_NAME', { static: false }) CD_MIDDLE_NAME: TextBoxComponent;
    @ViewChild('CD_THIRD_NAME', { static: false }) CD_THIRD_NAME: TextBoxComponent;
    @ViewChild('CD_LAST_NAME', { static: false }) CD_LAST_NAME: TextBoxComponent;
    @ViewChild('CD_FULL_NAME', { static: false }) CD_FULL_NAME: TextBoxComponent;
    @ViewChild('CD_DOB', { static: false }) CD_DOB: DateComponent;
    @ViewChild('CD_GENDER', { static: false }) CD_GENDER: ComboBoxComponent;
    @ViewChild('CD_MARITAL_STATUS', { static: false }) CD_MARITAL_STATUS: ComboBoxComponent;
    @ViewChild('CD_MOBILE_NO', { static: false }) CD_MOBILE_NO: TextBoxComponent;
    @ViewChild('CD_NATIONALITY', { static: false }) CD_NATIONALITY: ComboBoxComponent;
    @ViewChild('CD_CITIZENSHIP', { static: false }) CD_CITIZENSHIP: TextBoxComponent;
    @ViewChild('CD_PASSPORT_EXPIRY', { static: false }) CD_PASSPORT_EXPIRY: DateComponent;
    @ViewChild('CD_PASSPORT_NO', { static: false }) CD_PASSPORT_NO: TextBoxComponent;
    @ViewChild('CD_VISA_VALID', { static: false }) CD_VISA_VALID: DateComponent;
    @ViewChild('CD_DRIVING_LICENSE', { static: false }) CD_DRIVING_LICENSE: TextBoxComponent;
    @ViewChild('CD_DRVNG_LCNSE_EXP_DT', { static: false }) CD_DRVNG_LCNSE_EXP_DT: DateComponent;
    @ViewChild('CD_TAX_ID', { static: false }) CD_TAX_ID: TextBoxComponent;
    @ViewChild('CD_DEBIT_SCORE', { static: false }) CD_DEBIT_SCORE: TextBoxComponent;
    @ViewChild('CD_NATIONAL_ID', { static: false }) CD_NATIONAL_ID: TextBoxComponent;
    @ViewChild('CD_CUST_SEGMENT', { static: false }) CD_CUST_SEGMENT: ComboBoxComponent;
    @ViewChild('CD_LOAN_OWN', { static: false }) CD_LOAN_OWN: TextBoxComponent;
    @ViewChild('CD_PRIME_USAGE', { static: false }) CD_PRIME_USAGE: TextBoxComponent;
    @ViewChild('CD_PMRY_EMBSR_NAME', { static: false }) CD_PMRY_EMBSR_NAME: TextBoxComponent;
    @ViewChild('CD_PREF_COM_CH', { static: false }) CD_PREF_COM_CH: ComboBoxComponent;
    @ViewChild('CD_PREF_LANG', { static: false }) CD_PREF_LANG: ComboBoxComponent;
    @ViewChild('CD_SAVE_BTN', { static: false }) CD_SAVE_BTN: ButtonComponent;
    @ViewChild('CD_CLEAR_BTN', { static: false }) CD_CLEAR_BTN: ButtonComponent;
    @Output() passBorrowerSeq: EventEmitter<any> = new EventEmitter<any>();
    @ViewChild('CUST_DTLS_GRID', { static: false }) CUST_DTLS_GRID: CustomerDtlsGridComponent;
    // @ViewChild('FieldId_29', { static: false }) FieldId_29: AddressDetailsComponent;
    // @ViewChild('FieldId_30', { static: false }) FieldId_30: OccupationDtlsFormComponent;
    @ViewChild('Handler', { static: false }) Handler: CustomerHandlerComponent;
    @ViewChild('hidExistCust', { static: false }) hidExistCust: HiddenComponent;
    @ViewChild('hideStaffId', { static: false }) hideStaffId: HiddenComponent;
    @ViewChild('hidAppId', { static: false }) hidAppId: HiddenComponent;
    @ViewChild('hidCusSgmt', { static: false }) hidCusSgmt: HiddenComponent;
    @ViewChild('hidGender', { static: false }) hidGender: HiddenComponent;
    @ViewChild('hidNationality', { static: false }) hidNationality: HiddenComponent;
    @ViewChild('hidMaritalStatus', { static: false }) hidMaritalStatus: HiddenComponent;
    @ViewChild('hidPrefCommCh', { static: false }) hidPrefCommCh: HiddenComponent;
    @ViewChild('hidTitle', { static: false }) hidTitle: HiddenComponent;
    @ViewChild('HidCustomerId', { static: false }) HidCustomerId: HiddenComponent;
    @ViewChild('hideCustomerType', { static: false }) hideCustomerType: HiddenComponent;
    @ViewChild('CUST_ACCORD', { static: false }) CUST_ACCORD: RloUiAccordionComponent;
    @Output() updateCustGrid: EventEmitter<any> = new EventEmitter<any>();

    appId: any;
    staffcheck: boolean;
    addseq: any;
    applicationId: void;
    async revalidate(): Promise<number> {
        var totalErrors = 0;
        super.beforeRevalidate();


        await Promise.all([
            this.revalidateBasicField('CD_CUST_TYPE'),
            this.revalidateBasicField('CD_EXISTING_CUST'),
            this.revalidateBasicField('CD_STAFF'),
            this.revalidateBasicField('CD_CIF'),
            this.revalidateBasicField('CD_STAFF_ID'),
            this.revalidateBasicField('CD_CUST_ID'),
            this.revalidateBasicField('CD_TITLE'),
            this.revalidateBasicField('CD_FIRST_NAME'),
            this.revalidateBasicField('CD_MIDDLE_NAME'),
            this.revalidateBasicField('CD_THIRD_NAME'),
            this.revalidateBasicField('CD_LAST_NAME'),
            this.revalidateBasicField('CD_FULL_NAME'),
            this.revalidateBasicField('CD_DOB'),
            this.revalidateBasicField('CD_GENDER'),
            this.revalidateBasicField('CD_MARITAL_STATUS'),
            this.revalidateBasicField('CD_MOBILE_NO'),
            this.revalidateBasicField('CD_NATIONALITY'),
            this.revalidateBasicField('CD_CITIZENSHIP'),
            this.revalidateBasicField('CD_PASSPORT_EXPIRY'),
            this.revalidateBasicField('CD_PASSPORT_NO'),
            this.revalidateBasicField('CD_VISA_VALID'),
            this.revalidateBasicField('CD_DRIVING_LICENSE'),
            this.revalidateBasicField('CD_DRVNG_LCNSE_EXP_DT'),
            this.revalidateBasicField('CD_TAX_ID'),
            this.revalidateBasicField('CD_DEBIT_SCORE'),
            this.revalidateBasicField('CD_NATIONAL_ID'),
            this.revalidateBasicField('CD_CUST_SEGMENT'),
            this.revalidateBasicField('CD_LOAN_OWN'),
            this.revalidateBasicField('CD_PRIME_USAGE'),
            this.revalidateBasicField('CD_PMRY_EMBSR_NAME'),
            this.revalidateBasicField('CD_PREF_COM_CH'),
            this.revalidateBasicField('CD_PREF_LANG'),
            // this.FieldId_29.revalidate(),
            // this.FieldId_30.revalidate(),
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
        this.value = new CustomerDtlsModel();
        this.componentCode = 'CustomerDtls';
    }
    setReadOnly(readOnly) {
        super.setBasicFieldsReadOnly(readOnly);
        // this.FieldId_29.setReadOnly(readOnly);
        // this.FieldId_30.setReadOnly(readOnly);
    }
    async onFormLoad(event) {
        this.applicationId = event.custSeq
        await this.Handler.onFormLoad({
        });

        this.setInputs(this.services.dataStore.getData(this.services.routing.currModal));
        this.CD_FULL_NAME.setReadOnly(true);
        this.hidExistCust.setValue('Y_N');
        this.hideStaffId.setValue('Y_N');
        this.hidAppId.setValue('RLO');
        this.hidCusSgmt.setValue('CUST_SEGMENT');
        this.hidGender.setValue('GENDER');
        this.hidMaritalStatus.setValue('MARITAL_STATUS');
        this.hidNationality.setValue('NATIONALITY');
        this.hidPrefCommCh.setValue('PREF_COMM_CH');
        this.hidTitle.setValue('TITLE');
        this.hideCustomerType.setValue('CUSTOMER_TYPE');
        let inputMap = new Map();
        //  this.Handler.onFormLoad({
        // });
        this.setDependencies();
        // this.Handler.displayCustomerTag();
    }

    setInputs(param: any) {
        let params = this.services.http.mapToJson(param);
        if (params['mode']) {
            this.mode = params['mode'];
        }
    }
    async submitForm(path, apiCode, serviceCode) {
        this.submitData['formName'] = 'Customer Details Main Form';
        await super.submit(path, apiCode, serviceCode);
    }
    getFieldInfo() {
        this.amountComponent.forEach(field => { this.additionalInfo[field.fieldID + '_desc'] = field.getFieldInfo(); });
        this.comboFields.forEach(field => { this.additionalInfo[field.fieldID + '_desc'] = field.getFieldInfo(); });
        this.fileUploadFields.forEach(field => { this.additionalInfo[field.fieldID + '_desc'] = field.getFieldInfo(); });
        // this.additionalInfo['FieldId_29_desc'] = this.FieldId_29.getFieldInfo();
        // this.additionalInfo['FieldId_30_desc'] = this.FieldId_30.getFieldInfo();
        return this.additionalInfo;
    }
    getFieldValue() {
        // this.value.FieldId_29 = this.FieldId_29.getFieldValue();
        // this.value.FieldId_30 = this.FieldId_30.getFieldValue();
        return this.value;
    }
    setValue(inputValue, inputDesc = undefined) {
        this.setBasicFieldsValue(inputValue, inputDesc);
        // this.FieldId_29.setValue(inputValue['FieldId_29'], inputDesc['FieldId_29_desc']);
        // this.FieldId_30.setValue(inputValue['FieldId_30'], inputDesc['FieldId_30_desc']);
        this.value = new CustomerDtlsModel();
        this.value.setValue(inputValue);
        this.setDependencies();
        this.passNewValue(this.value);
    }
    ngOnInit() {
        if (this.formCode == undefined) { this.formCode = 'CustomerDtls'; }
        if (this.formOnLoadError) { return; }
        var styleElement = document.createElement('style');
        styleElement.type = 'text/css';
        styleElement.innerHTML = customCss;
        styleElement.id = 'CustomerDtls_customCss';
        document.getElementsByTagName('head')[0].appendChild(styleElement);
    }
    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
        var styleElement = document.getElementById('CustomerDtls_customCss');
        styleElement.parentNode.removeChild(styleElement);
    }
    ngAfterViewInit() {
        setTimeout(() => {
            this.subsBFldsValueUpdates();
            // this.value.FieldId_29 = this.FieldId_29.getFieldValue();
            // this.FieldId_29.valueChangeUpdates().subscribe((value) => { this.value.FieldId_29 = value; });
            // this.value.FieldId_30 = this.FieldId_30.getFieldValue();
            // this.FieldId_30.valueChangeUpdates().subscribe((value) => { this.value.FieldId_30 = value; });
            this.onFormLoad(event);
            this.checkForHTabOverFlow();
        });
    }
    clearError() {
        super.clearBasicFieldsError();
        super.clearHTabErrors();
        super.clearVTabErrors();
        // this.FieldId_29.clearError();
        // this.FieldId_30.clearError();
        this.errors = 0;
        this.errorMessage = [];
    }
    onReset() {
        super.resetBasicFields();
        // this.FieldId_29.onReset();
        // this.FieldId_30.onReset();
        this.clearHTabErrors();
        this.clearVTabErrors();
        this.errors = 0;
        this.errorMessage = [];
        this.additionalInfo = undefined;
        this.dependencyMap.clear();
        this.value = new CustomerDtlsModel();
        this.passNewValue(this.value);
        this.setReadOnly(false);
        this.onFormLoad(event);
    }
    getToday() {
        var Selectdate = this.CD_DOB.getFieldValue();
        // console.log(Selectdate);
        var Givendate = new Date();
        Givendate = new Date(Givendate);
        var mnth = ("0" + (Givendate.getMonth() + 1)).slice(-2);
        var day = ("0" + Givendate.getDate()).slice(-2);
        var now = [day, mnth, Givendate.getFullYear()].join("-");
        // console.log(now);
        if (Selectdate > now) {
            // console.log("select date");
            this.services.alert.showAlert(2, 'Please select correct date', -1);
            this.CD_DOB.onReset();
        }
    }

    passExp() {
        var Selectdate = this.CD_PASSPORT_EXPIRY.getFieldValue();
        // console.log(Selectdate);
        var Givendate = new Date();
        Givendate = new Date(Givendate);
        var mnth = ("0" + (Givendate.getMonth() + 1)).slice(-2);
        var day = ("0" + Givendate.getDate()).slice(-2);
        var now = [day, mnth, Givendate.getFullYear()].join("-");
        // console.log(now);
        if (Selectdate < now) {
            // console.log("select date");
            this.services.alert.showAlert(2, 'Please select correct date', -1);
            this.CD_PASSPORT_EXPIRY.onReset();
        }
    }

    visaExp() {
        var Selectdate = this.CD_VISA_VALID.getFieldValue();
        // console.log(Selectdate);
        var Givendate = new Date();
        Givendate = new Date(Givendate);
        var mnth = ("0" + (Givendate.getMonth() + 1)).slice(-2);
        var day = ("0" + Givendate.getDate()).slice(-2);
        var now = [day, mnth, Givendate.getFullYear()].join("-");
        // console.log(now);
        if (Selectdate < now) {
            // console.log("select date");
            this.services.alert.showAlert(2, 'Please select correct date', -1);
            this.CD_VISA_VALID.onReset();
        }
    }

    drvngExp() {
        var Selectdate = this.CD_DRVNG_LCNSE_EXP_DT.getFieldValue();
        // console.log(Selectdate);
        var Givendate = new Date();
        Givendate = new Date(Givendate);
        var mnth = ("0" + (Givendate.getMonth() + 1)).slice(-2);
        var day = ("0" + Givendate.getDate()).slice(-2);
        var now = [day, mnth, Givendate.getFullYear()].join("-");
        // console.log(now);
        if (Selectdate < now) {
            // console.log("select date");
            this.services.alert.showAlert(2, 'Please select correct date', -1);
            this.CD_DRVNG_LCNSE_EXP_DT.onReset();
        }
    }


    genderCheck() {
        if ((this.CD_GENDER.getFieldValue() == 'M' && this.CD_TITLE.getFieldValue() != 'MR') || (this.CD_GENDER.getFieldValue() == 'F' && this.CD_TITLE.getFieldValue() != 'MRS') && (this.CD_GENDER.getFieldValue() == 'F' && this.CD_TITLE.getFieldValue() != 'MS')) {
            //console.log("Please select gender according to tilte");
            this.services.alert.showAlert(2, 'Please select gender according to title', -1);
        }
    }


    async CD_GENDER_blur(event) {
        let inputMap = new Map();
        this.genderCheck();
    }

    async CD_DOB_blur(event) {
        let inputMap = new Map();
        this.getToday();
    }

    async CD_PASSPORT_EXPIRY_blur (event) {
        let inputMap = new Map();
        this.passExp();
    }

    async CD_VISA_VALID_blur (event) {
        let inputMap = new Map();
        this.visaExp();
    }

    async CD_DRVNG_LCNSE_EXP_DT_blur  (event) {
        let inputMap = new Map();
        this.drvngExp();
    }


    async CD_FIRST_NAME_blur(event) {
        let inputMap = new Map();
        await this.Handler.updateFullName({
        });
    }
    async CD_MIDDLE_NAME_blur(event) {
        let inputMap = new Map();
        await this.Handler.updateFullName({
        });
    }
    async CD_THIRD_NAME_blur(event) {
        let inputMap = new Map();
        await this.Handler.updateFullName({
        });
    }
    async CD_LAST_NAME_blur(event) {
        let inputMap = new Map();
        await this.Handler.updateFullName({
        });
    }
    async CD_STAFF_change(fieldID, value) {
        let inputMap = new Map();
        await this.Handler.isStaffEnabled({});

    }
    async CD_SAVE_BTN_click(event) {
        let inputMap = new Map();
        var noOfErrors: number = await this.revalidate();
        if (noOfErrors == 0) {
            if (this.HidCustomerId.getFieldValue() != undefined) {
                inputMap.clear();
               
                inputMap.set('PathParam.BorrowerSeq', this.HidCustomerId.getFieldValue());
                inputMap.set('Body.BorrowerDetails.ApplicationId', this.applicationId);
                inputMap.set('Body.BorrowerDetails.Title', this.CD_TITLE.getFieldValue());
                inputMap.set('Body.BorrowerDetails.FirstName', this.CD_FIRST_NAME.getFieldValue());
                inputMap.set('Body.BorrowerDetails.MiddleName', this.CD_MIDDLE_NAME.getFieldValue());
                inputMap.set('Body.BorrowerDetails.LastName', this.CD_LAST_NAME.getFieldValue());
                inputMap.set('Body.BorrowerDetails.FullName', this.CD_FULL_NAME.getFieldValue());
                inputMap.set('Body.BorrowerDetails.Gender', this.CD_GENDER.getFieldValue());
                inputMap.set('Body.BorrowerDetails.DOB', this.CD_DOB.getFieldValue());
                inputMap.set('Body.BorrowerDetails.TaxID', this.CD_TAX_ID.getFieldValue());
                inputMap.set('Body.BorrowerDetails.MobileNo', this.CD_MOBILE_NO.getFieldValue());
                inputMap.set('Body.BorrowerDetails.DebitScore', this.CD_DEBIT_SCORE.getFieldValue());
                inputMap.set('Body.BorrowerDetails.CustomerSegment', this.CD_CUST_SEGMENT.getFieldValue());
                inputMap.set('Body.BorrowerDetails.IsStaff', this.CD_STAFF.getFieldValue());
                inputMap.set('Body.BorrowerDetails.StaffID', this.CD_STAFF_ID.getFieldValue());
                inputMap.set('Body.BorrowerDetails.PrimaryEmbosserName1', this.CD_PMRY_EMBSR_NAME.getFieldValue());
                inputMap.set('Body.BorrowerDetails.Nationality', this.CD_NATIONALITY.getFieldValue());
                inputMap.set('Body.BorrowerDetails.CitizenID', this.CD_NATIONAL_ID.getFieldValue());
                inputMap.set('Body.BorrowerDetails.MaritalStatus', this.CD_MARITAL_STATUS.getFieldValue());
                //  inputMap.set('Body.BorrowerDetails.Nationality', this.CD_NATIONAL_ID.getFieldValue());
                inputMap.set('Body.BorrowerDetails.PassportNumber', this.CD_PASSPORT_NO.getFieldValue());
                inputMap.set('Body.BorrowerDetails.PassportExpiryDt', this.CD_PASSPORT_EXPIRY.getFieldValue());
                inputMap.set('Body.BorrowerDetails.DrivingLicense', this.CD_DRIVING_LICENSE.getFieldValue());
                inputMap.set('Body.BorrowerDetails.DrivingLicenseExpiryDt', this.CD_DRVNG_LCNSE_EXP_DT.getFieldValue());
                inputMap.set('Body.BorrowerDetails.ExistingCustomer', this.CD_EXISTING_CUST.getFieldValue());
                inputMap.set('Body.BorrowerDetails.CommunicationAlertChannel', this.CD_PREF_COM_CH.getFieldValue());
                inputMap.set('Body.BorrowerDetails.CustomerType', this.CD_CUST_TYPE.getFieldValue());
                inputMap.set('Body.BorrowerDetails.CIF', this.CD_CUST_ID.getFieldValue());
                inputMap.set('Body.BorrowerDetails.ICIFNumber', this.CD_CIF.getFieldValue());
                inputMap.set('Body.BorrowerDetails.CitizenShip', this.CD_CITIZENSHIP.getFieldValue());
                inputMap.set('Body.BorrowerDetails.PreferredLanguage', this.CD_PREF_LANG.getFieldValue());
                inputMap.set('Body.BorrowerDetails.LoanOwnership', this.CD_LOAN_OWN.getFieldValue());
                inputMap.set('Body.BorrowerDetails.PrimeUsage', this.CD_PRIME_USAGE.getFieldValue());
                
                this.services.http.fetchApi('/BorrowerDetails/{BorrowerSeq}', 'PUT', inputMap, '/olive/publisher').subscribe(
                    async (httpResponse: HttpResponse<any>) => {
                        var res = httpResponse.body;
                        this.services.alert.showAlert(1, 'Customer Details Updated Successfuly', 5000);
                        this.updateCustGrid.emit({
                            'custSeq' : this.applicationId
                        })
                        // this.onReset();
                       
                        
                    },
                    async (httpError) => {
                        var err = httpError['error']
                        if (err != null && err['ErrorElementPath'] != undefined && err['ErrorDescription'] != undefined) {
                            if (err['ErrorElementPath'] == 'BorrowerDetails.CommunicationAlertChannel') {
                                this.CD_PREF_COM_CH.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'BorrowerDetails.ExistingCustomer') {
                                this.CD_EXISTING_CUST.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'BorrowerDetails.DrivingLicenseExpiryDt') {
                                this.CD_DRVNG_LCNSE_EXP_DT.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'BorrowerDetails.DrivingLicense') {
                                this.CD_DRIVING_LICENSE.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'BorrowerDetails.PassportExpiryDt') {
                                this.CD_PASSPORT_EXPIRY.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'BorrowerDetails.PassportNumber') {
                                this.CD_PASSPORT_NO.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'BorrowerDetails.Nationality') {
                                this.CD_NATIONAL_ID.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'BorrowerDetails.MaritalStatus') {
                                this.CD_MARITAL_STATUS.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'BorrowerDetails.CitizenID') {
                                this.CD_CITIZENSHIP.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'BorrowerDetails.Nationality') {
                                this.CD_NATIONALITY.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'BorrowerDetails.PrimaryEmbosserName1') {
                                this.CD_PMRY_EMBSR_NAME.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'BorrowerDetails.StaffID') {
                                this.CD_STAFF_ID.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'BorrowerDetails.IsStaff') {
                                this.CD_STAFF.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'BorrowerDetails.CustomerSegment') {
                                this.CD_CUST_SEGMENT.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'BorrowerDetails.DebitScore') {
                                this.CD_DEBIT_SCORE.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'BorrowerDetails.MobileNo') {
                                this.CD_MOBILE_NO.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'BorrowerDetails.TaxID') {
                                this.CD_TAX_ID.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'BorrowerDetails.DOB') {
                                this.CD_DOB.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'BorrowerDetails.Gender') {
                                this.CD_GENDER.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'BorrowerDetails.FullName') {
                                this.CD_FULL_NAME.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'BorrowerDetails.LastName') {
                                this.CD_LAST_NAME.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'BorrowerDetails.MiddleName') {
                                this.CD_MIDDLE_NAME.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'BorrowerDetails.FirstName') {
                                this.CD_FIRST_NAME.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'BorrowerDetails.Title') {
                                this.CD_TITLE.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'BorrowerSeq') {
                                this.HidCustomerId.setError(err['ErrorDescription']);
                            }
                        }
                        this.services.alert.showAlert(2, 'Fail', -1);
                    }
                );
            }
            else {
                inputMap.clear();
                inputMap.set('Body.BorrowerDetails.Title', this.CD_TITLE.getFieldValue());
                inputMap.set('Body.BorrowerDetails.ApplicationId', this.applicationId);
                inputMap.set('Body.BorrowerDetails.FirstName', this.CD_FIRST_NAME.getFieldValue());
                inputMap.set('Body.BorrowerDetails.MiddleName', this.CD_MIDDLE_NAME.getFieldValue());
                inputMap.set('Body.BorrowerDetails.LastName', this.CD_LAST_NAME.getFieldValue());
                inputMap.set('Body.BorrowerDetails.FullName', this.CD_FULL_NAME.getFieldValue());
                inputMap.set('Body.BorrowerDetails.Gender', this.CD_GENDER.getFieldValue());
                inputMap.set('Body.BorrowerDetails.DOB', this.CD_DOB.getFieldValue());
                inputMap.set('Body.BorrowerDetails.TaxID', this.CD_TAX_ID.getFieldValue());
                inputMap.set('Body.BorrowerDetails.MobileNo', this.CD_MOBILE_NO.getFieldValue());
                inputMap.set('Body.BorrowerDetails.DebitScore', this.CD_DEBIT_SCORE.getFieldValue());
                inputMap.set('Body.BorrowerDetails.CustomerSegment', this.CD_CUST_SEGMENT.getFieldValue());
                inputMap.set('Body.BorrowerDetails.IsStaff', this.CD_STAFF.getFieldValue());
                inputMap.set('Body.BorrowerDetails.StaffID', this.CD_STAFF_ID.getFieldValue());
                inputMap.set('Body.BorrowerDetails.PrimaryEmbosserName2', this.CD_PMRY_EMBSR_NAME.getFieldValue());
                inputMap.set('Body.BorrowerDetails.Nationality', this.CD_NATIONALITY.getFieldValue());
                // inputMap.set('Body.BorrowerDetails.CitizenID', this.CD_CITIZENSHIP.getFieldValue());
                inputMap.set('Body.BorrowerDetails.MaritalStatus', this.CD_MARITAL_STATUS.getFieldValue());
                inputMap.set('Body.BorrowerDetails.CitizenID', this.CD_NATIONAL_ID.getFieldValue());
                inputMap.set('Body.BorrowerDetails.PassportNumber', this.CD_PASSPORT_NO.getFieldValue());
                inputMap.set('Body.BorrowerDetails.PassportExpiryDt', this.CD_PASSPORT_EXPIRY.getFieldValue());
                inputMap.set('Body.BorrowerDetails.DrivingLicense', this.CD_DRIVING_LICENSE.getFieldValue());
                inputMap.set('Body.BorrowerDetails.DrivingLicenseExpiryDt', this.CD_DRVNG_LCNSE_EXP_DT.getFieldValue());
                inputMap.set('Body.BorrowerDetails.CommunicationAlertChannel', this.CD_PREF_COM_CH.getFieldValue());
                inputMap.set('Body.BorrowerDetails.ExistingCustomer', this.CD_EXISTING_CUST.getFieldValue());
                inputMap.set('Body.BorrowerDetails.CustomerType', this.CD_CUST_TYPE.getFieldValue());
                inputMap.set('Body.BorrowerDetails.CIF', this.CD_CUST_ID.getFieldValue());
                inputMap.set('Body.BorrowerDetails.ICIFNumber', this.CD_CIF.getFieldValue());
                inputMap.set('Body.BorrowerDetails.CitizenShip', this.CD_CITIZENSHIP.getFieldValue());
                inputMap.set('Body.BorrowerDetails.PreferredLanguage', this.CD_PREF_LANG.getFieldValue());
                inputMap.set('Body.BorrowerDetails.LoanOwnership', this.CD_LOAN_OWN.getFieldValue());
                inputMap.set('Body.BorrowerDetails.PrimeUsage', this.CD_PRIME_USAGE.getFieldValue());
                
              
                this.services.http.fetchApi('/BorrowerDetails', 'POST', inputMap, '/olive/publisher').subscribe(
                    async (httpResponse: HttpResponse<any>) => {
                        var res = httpResponse.body;
                        this.HidCustomerId.setValue(res['BorrowerDetails']['BorrowerSeq']);
                        this.services.alert.showAlert(1, 'Customer Details Saved Successfuly', 5000);
                        this.updateCustGrid.emit({
                            'custSeq' : this.applicationId
                        })
                        // this.onReset();
                      
                    },
                    async (httpError) => {
                        var err = httpError['error']
                        if (err != null && err['ErrorElementPath'] != undefined && err['ErrorDescription'] != undefined) {
                            if (err['ErrorElementPath'] == 'BorrowerDetails.ExistingCustomer') {
                                this.CD_EXISTING_CUST.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'BorrowerDetails.CommunicationAlertChannel') {
                                this.CD_PREF_COM_CH.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'BorrowerDetails.DrivingLicenseExpiryDt') {
                                this.CD_DRVNG_LCNSE_EXP_DT.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'BorrowerDetails.DrivingLicense') {
                                this.CD_DRIVING_LICENSE.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'BorrowerDetails.PassportExpiryDt') {
                                this.CD_PASSPORT_EXPIRY.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'BorrowerDetails.PassportNumber') {
                                this.CD_PASSPORT_NO.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'BorrowerDetails.CitizenID') {
                                this.CD_NATIONAL_ID.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'BorrowerDetails.MaritalStatus') {
                                this.CD_MARITAL_STATUS.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'BorrowerDetails.CitizenID') {
                                this.CD_CITIZENSHIP.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'BorrowerDetails.Nationality') {
                                this.CD_NATIONALITY.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'BorrowerDetails.PrimaryEmbosserName2') {
                                this.CD_PMRY_EMBSR_NAME.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'BorrowerDetails.StaffID') {
                                this.CD_STAFF_ID.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'BorrowerDetails.IsStaff') {
                                this.CD_STAFF.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'BorrowerDetails.CustomerSegment') {
                                this.CD_CUST_SEGMENT.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'BorrowerDetails.DebitScore') {
                                this.CD_DEBIT_SCORE.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'BorrowerDetails.MobileNo') {
                                this.CD_MOBILE_NO.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'BorrowerDetails.TaxID') {
                                this.CD_TAX_ID.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'BorrowerDetails.DOB') {
                                this.CD_DOB.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'BorrowerDetails.Gender') {
                                this.CD_GENDER.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'BorrowerDetails.FullName') {
                                this.CD_FULL_NAME.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'BorrowerDetails.LastName') {
                                this.CD_LAST_NAME.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'BorrowerDetails.MiddleName') {
                                this.CD_MIDDLE_NAME.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'BorrowerDetails.FirstName') {
                                this.CD_FIRST_NAME.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'BorrowerDetails.Title') {
                                this.CD_TITLE.setError(err['ErrorDescription']);
                            }
                        }
                        this.services.alert.showAlert(2, 'Something went wrong', -1);
                        this.updateCustGrid.emit({
                            'custSeq' : this.applicationId
                        })
                    }
                );
            }
            
            this.Handler.deactivateClasses();
        }
        else {
            this.services.alert.showAlert(2, 'Please Fill all the Mandatory Fields', -1);
        }
    }
    async CD_CLEAR_BTN_click(event) {
        let inputMap = new Map();
        this.onReset();
        this.Handler.deactivateClasses();
    }
    async CUST_DTLS_GRID_custDtlsEdit(event) {
        let inputMap = new Map();
        inputMap.clear();
        inputMap.set('PathParam.BorrowerSeq', event.selectedCustId);
        this.services.http.fetchApi('/BorrowerDetails/{BorrowerSeq}', 'GET', inputMap, '/olive/publisher').subscribe(
            async (httpResponse: HttpResponse<any>) => {
                var res = httpResponse.body;
                this.CD_TITLE.setValue(res['BorrowerDetails']['Title']);
                this.CD_FIRST_NAME.setValue(res['BorrowerDetails']['FirstName']);
                this.CD_MIDDLE_NAME.setValue(res['BorrowerDetails']['MiddleName']);
                this.CD_LAST_NAME.setValue(res['BorrowerDetails']['LastName']);
                this.CD_FULL_NAME.setValue(res['BorrowerDetails']['FullName']);
                // if (this.CD_FULL_NAME.getFieldValue() !== undefined) {
                //     // this.Handler.displayCustomerTag();
                // }
                this.CD_GENDER.setValue(res['BorrowerDetails']['Gender']);
                this.CD_DOB.setValue(res['BorrowerDetails']['DOB']);
                this.CD_TAX_ID.setValue(res['BorrowerDetails']['TaxID']);
                this.CD_MOBILE_NO.setValue(res['BorrowerDetails']['MobileNo']);
                this.CD_DEBIT_SCORE.setValue(res['BorrowerDetails']['DebitScore']);
                this.CD_CUST_SEGMENT.setValue(res['BorrowerDetails']['CustomerSegment']);
                this.CD_STAFF.setValue(res['BorrowerDetails']['IsStaff']);
                if (this.CD_STAFF.getFieldValue() !== undefined && this.CD_STAFF.getFieldValue() !== "" && this.CD_STAFF.getFieldValue() !== null && this.CD_STAFF.getFieldValue() !== 'N') {
                    this.CD_STAFF_ID.readOnly = false;
                    this.CD_STAFF_ID.mandatory = true;
                }
                this.CD_STAFF_ID.setValue(res['BorrowerDetails']['StaffID']);
                this.CD_PMRY_EMBSR_NAME.setValue(res['BorrowerDetails']['PrimaryEmbosserName1']);
                this.CD_NATIONALITY.setValue(res['BorrowerDetails']['Nationality']);
                 this.CD_CITIZENSHIP.setValue(res['BorrowerDetails']['CitizenShip']);
                this.CD_MARITAL_STATUS.setValue(res['BorrowerDetails']['MaritalStatus']);
                this.CD_NATIONAL_ID.setValue(res['BorrowerDetails']['CitizenID']);
                this.CD_PASSPORT_NO.setValue(res['BorrowerDetails']['PassportNumber']);
                this.CD_PASSPORT_EXPIRY.setValue(res['BorrowerDetails']['PassportExpiryDt']);
                this.CD_DRIVING_LICENSE.setValue(res['BorrowerDetails']['DrivingLicense']);
                this.CD_DRVNG_LCNSE_EXP_DT.setValue(res['BorrowerDetails']['DrivingLicenseExpiryDt']);
                this.CD_PREF_COM_CH.setValue(res['BorrowerDetails']['CommunicationAlertChannel']);
                this.HidCustomerId.setValue(res['BorrowerDetails']['BorrowerSeq']);
                this.addseq = res['BorrowerDetails']['BorrowerSeq'];
                // this.FieldId_29.addBorrowerSeq = res['BorrowerDetails']['BorrowerSeq'];
                this.CD_EXISTING_CUST.setValue(res['BorrowerDetails']['ExistingCustomer']);
                // this.CD_CIF.setValue(res['BorrowerDetails']['CIF']);
                this.CD_LOAN_OWN.setValue(res['BorrowerDetails']['LoanOwnership']);
                this.CD_CUST_TYPE.setValue(res['BorrowerDetails']['CustomerType']);
                this.passBorrowerSeq.emit({
                    'BorrowerSeq': res['BorrowerDetails']['BorrowerSeq'],
                });
                this.CD_PRIME_USAGE.setValue(res['BorrowerDetails']['PrimeUsage']);
                this.CD_PREF_LANG.setValue(res['BorrowerDetails']['PreferredLanguage']);
                this.CD_CIF.setValue(res['BorrowerDetails']['ICIFNumber'])

            },
            async (httpError) => {
                var err = httpError['error']
                if (err != null && err['ErrorElementPath'] != undefined && err['ErrorDescription'] != undefined) {
                }
            }
        );


    }
    // async loadCustDtlsGrid(event) {
    //     let inputMap = new Map();
    //     // await this.CUST_DTLS_GRID.gridDataLoad({
    //     //     'custSeqToGrid': event.custSeq,
    //     // });
    //     this.Handler.APIForCustomerData(event);

    // }

    fieldDependencies = {
        CD_CUST_TYPE: {
            inDep: [

                { paramKey: "VALUE1", depFieldID: "CD_CUST_TYPE", paramType: "PathParam" },
                { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
                { paramKey: "KEY1", depFieldID: "hideCustomerType", paramType: "QueryParam" },
            ],
            outDep: [
            ]
        },
        CD_EXISTING_CUST: {
            inDep: [

                { paramKey: "VALUE1", depFieldID: "CD_EXISTING_CUST", paramType: "PathParam" },
                { paramKey: "KEY1", depFieldID: "hidExistCust", paramType: "QueryParam" },
                { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
            ],
            outDep: [
            ]
        },
        CD_STAFF: {
            inDep: [

                { paramKey: "VALUE1", depFieldID: "CD_STAFF", paramType: "PathParam" },
                { paramKey: "KEY1", depFieldID: "hideStaffId", paramType: "QueryParam" },
                { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
            ],
            outDep: [
            ]
        },
        CD_TITLE: {
            inDep: [

                { paramKey: "VALUE1", depFieldID: "CD_TITLE", paramType: "PathParam" },
                { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
                { paramKey: "KEY1", depFieldID: "hidTitle", paramType: "QueryParam" },
            ],
            outDep: [
            ]
        },
        CD_GENDER: {
            inDep: [

                { paramKey: "VALUE1", depFieldID: "CD_GENDER", paramType: "PathParam" },
                { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
                { paramKey: "KEY1", depFieldID: "hidGender", paramType: "QueryParam" },
            ],
            outDep: [
            ]
        },
        CD_MARITAL_STATUS: {
            inDep: [

                { paramKey: "VALUE1", depFieldID: "CD_MARITAL_STATUS", paramType: "PathParam" },
                { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
                { paramKey: "KEY1", depFieldID: "hidMaritalStatus", paramType: "QueryParam" },
            ],
            outDep: [
            ]
        },
        CD_NATIONALITY: {
            inDep: [

                { paramKey: "VALUE1", depFieldID: "CD_NATIONALITY", paramType: "PathParam" },
                { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
                { paramKey: "KEY1", depFieldID: "hidNationality", paramType: "QueryParam" },
            ],
            outDep: [
            ]
        },
        CD_CUST_SEGMENT: {
            inDep: [

                { paramKey: "VALUE1", depFieldID: "CD_CUST_SEGMENT", paramType: "PathParam" },
                { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
                { paramKey: "KEY1", depFieldID: "hidCusSgmt", paramType: "QueryParam" },
            ],
            outDep: [
            ]
        },
        CD_PREF_COM_CH: {
            inDep: [

                { paramKey: "VALUE1", depFieldID: "CD_PREF_COM_CH", paramType: "PathParam" },
                { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
                { paramKey: "KEY1", depFieldID: "hidPrefCommCh", paramType: "QueryParam" },
            ],
            outDep: [
            ]
        },
    }
    /* Write Custom Scripts Here */



}
