import { Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter, Input,HostListener } from '@angular/core';
import { HeaderModel } from './Header.model';
import { ComboBoxComponent } from '../combo-box/combo-box.component';
import { TextBoxComponent } from '../text-box/text-box.component';
import { ReadOnlyComponent } from '../rlo-ui-readonlyfield/rlo-ui-readonlyfield.component';
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
import { HeaderHandlerComponent } from '../Header/header-handler.component';

const customCss: string = '';

@Component({
    selector: 'app-Header',
    templateUrl: './Header.component.html'
})
export class HeaderComponent extends FormComponent implements OnInit, AfterViewInit {
    @ViewChild('HD_CIF', { static: false }) HD_CIF: ReadOnlyComponent;
    @ViewChild('HD_CUST_ID', { static: false }) HD_CUST_ID: ReadOnlyComponent;
    @ViewChild('HD_APP_REF_NUM', { static: false }) HD_APP_REF_NUM: ReadOnlyComponent;
    @ViewChild('HD_APP_SUBMSN_DT', { static: false }) HD_APP_SUBMSN_DT: DateComponent;
    @ViewChild('HD_TTL_TAT_PRPSL', { static: false }) HD_TTL_TAT_PRPSL: ReadOnlyComponent;
    @ViewChild('HD_PROD_CAT', { static: false }) HD_PROD_CAT: ReadOnlyComponent;
    @ViewChild('HD_PROD', { static: false }) HD_PROD: ReadOnlyComponent;
    @ViewChild('HD_SUB_PROD', { static: false }) HD_SUB_PROD: ReadOnlyComponent;
    @ViewChild('HD_SCHEME', { static: false }) HD_SCHEME: ReadOnlyComponent;
    @ViewChild('HD_PROMOTION', { static: false }) HD_PROMOTION: ReadOnlyComponent;
    @ViewChild('LD_LOAN_AMT', { static: false }) LD_LOAN_AMT: ReadOnlyComponent;
    @ViewChild('LD_INTEREST_RATE', { static: false }) LD_INTEREST_RATE: ReadOnlyComponent;
    @ViewChild('LD_TENURE', { static: false }) LD_TENURE: ReadOnlyComponent;
    @ViewChild('LD_TENURE_PERIOD', { static: false }) LD_TENURE_PERIOD: ReadOnlyComponent;
    @ViewChild('LD_APP_PRPSE', { static: false }) LD_APP_PRPSE: ReadOnlyComponent;
    @ViewChild('LD_SYS_RCMD_AMT', { static: false }) LD_SYS_RCMD_AMT: ReadOnlyComponent;
    @ViewChild('LD_USR_RCMD_AMT', { static: false }) LD_USR_RCMD_AMT: ReadOnlyComponent;
    @ViewChild('Handler', { static: false }) Handler: HeaderHandlerComponent;
    PRODUCT_CATEGORY_IMG = '';
    CURRENCY_IMG = '';
    stickyy: boolean = false;
    elementPosition: any;
    disply1:boolean = true;

    async revalidate(): Promise<number> {
        var totalErrors = 0;
        super.beforeRevalidate();
        await Promise.all([
            this.revalidateBasicField('HD_CIF'),
            this.revalidateBasicField('HD_CUST_ID'),
            this.revalidateBasicField('HD_APP_REF_NUM'),
            this.revalidateBasicField('HD_APP_SUBMSN_DT'),
            this.revalidateBasicField('HD_TTL_TAT_PRPSL'),
            this.revalidateBasicField('HD_PROD_CAT'),
            this.revalidateBasicField('HD_PROD'),
            this.revalidateBasicField('HD_SUB_PROD'),
            this.revalidateBasicField('HD_SCHEME'),
            this.revalidateBasicField('HD_PROMOTION'),
            this.revalidateBasicField('LD_LOAN_AMT'),
            this.revalidateBasicField('LD_INTEREST_RATE'),
            this.revalidateBasicField('LD_TENURE'),
            this.revalidateBasicField('LD_TENURE_PERIOD'),
            this.revalidateBasicField('LD_APP_PRPSE'),
            this.revalidateBasicField('LD_SYS_RCMD_AMT'),
            this.revalidateBasicField('LD_USR_RCMD_AMT'),
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
        this.value = new HeaderModel();
        this.componentCode = 'Header';
    }
    setReadOnly(readOnly) {
        super.setBasicFieldsReadOnly(readOnly);
    }
    async onFormLoad() {
        this.setInputs(this.services.dataStore.getData(this.services.routing.currModal));
        // this.HD_CIF.setReadOnly(true);
        // this.HD_CUST_ID.setReadOnly(true);
        // this.HD_APP_REF_NUM.setReadOnly(true);
        // this.HD_APP_SUBMSN_DT.setReadOnly(true);
        // this.HD_TTL_TAT_PRPSL.setReadOnly(true);
        // this.HD_PROD_CAT.setReadOnly(true);
        // this.HD_PROD.setReadOnly(true);
        // this.HD_SUB_PROD.setReadOnly(true);
        // this.HD_SCHEME.setReadOnly(true);
        // this.HD_PROMOTION.setReadOnly(true);
        // this.LD_LOAN_AMT.setFormatOptions({ currencyCode: 'INR', languageCode: 'en-US', });
        // this.LD_LOAN_AMT.setReadOnly(true);
        // this.LD_INTEREST_RATE.setReadOnly(true);
        // this.LD_TENURE.setReadOnly(true);
        // this.LD_TENURE_PERIOD.setReadOnly(true);
        // this.LD_APP_PRPSE.setReadOnly(true);
        // this.LD_SYS_RCMD_AMT.setFormatOptions({ currencyCode: 'INR', languageCode: 'en-US', });
        // this.LD_SYS_RCMD_AMT.setReadOnly(true);
        // this.LD_USR_RCMD_AMT.setFormatOptions({ currencyCode: 'INR', languageCode: 'en-US', });
        // this.LD_USR_RCMD_AMT.setReadOnly(true);
        let inputMap = new Map();
        inputMap.clear();
        inputMap.set('PathParam.ApplicationId', this.services.dataStore.getRouteParam(this.services.routing.currModal, 'appId'));
        console.log('inputmaap', inputMap);
        this.services.http.fetchApi('/proposal/{ApplicationId}/header', 'GET', inputMap).subscribe(
            async (httpResponse: HttpResponse<any>) => {
                var res = httpResponse.body;
                this.HD_PROD_CAT.setValue(res['Header']['TypeOfLoan']);
                this.HD_APP_REF_NUM.setValue(inputMap.get('PathParam.ApplicationId'));
                this.HD_PROD.setValue(res['Header']['Product']);
                this.HD_SUB_PROD.setValue(res['Header']['SubProduct']);
                this.HD_SCHEME.setValue(res['Header']['Scheme']);
                this.HD_PROMOTION.setValue(res['Header']['Promotion']);
                this.LD_LOAN_AMT.setValue(res['Header']['LoanAmount']);
                this.LD_INTEREST_RATE.setValue(res['Header']['InterestRate']);
                this.LD_TENURE.setValue(res['Header']['Tenure']);
                this.LD_TENURE_PERIOD.setValue(res['Header']['TenurePeriod']);
                this.LD_APP_PRPSE.setValue(res['Header']['ApplicationPurpose']);
                this.LD_SYS_RCMD_AMT.setValue(res['Header']['SystemRecommendedAmount']);
                this.LD_USR_RCMD_AMT.setValue(res['Header']['UserRecommendedAmount']);
                // this.HD_APP_SUBMSN_DT.setValue(res['Header']['AppSubmissionDate']);
                // this.HD_CIF.setValue(res['Header']['CIF']);
                // this.HD_CUST_ID.setValue(res['Header']['CustomerId']);
                this.apiSuccessCallback();
            },
            async (httpError) => {
                var err = httpError['error']
                if (err != null && err['ErrorElementPath'] != undefined && err['ErrorDescription'] != undefined) {
                }
                this.services.alert.showAlert(2, 'rlo.error.load.header', -1);
            }
        );
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
        this.submitData['formName'] = 'Header Form';
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
        this.value = new HeaderModel();
        this.value.setValue(inputValue);
        this.setDependencies();
        this.passNewValue(this.value);
    }
    ngOnInit() {
        if (this.formCode == undefined) { this.formCode = 'Header'; }
        if (this.formOnLoadError) { return; }
        var styleElement = document.createElement('style');
        styleElement.type = 'text/css';
        styleElement.innerHTML = customCss;
        styleElement.id = 'Header_customCss';
        document.getElementsByTagName('head')[0].appendChild(styleElement);
    }
    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
        var styleElement = document.getElementById('Header_customCss');
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
        this.value = new HeaderModel();
        this.passNewValue(this.value);
        this.setReadOnly(false);
        this.onFormLoad();
    }
    fieldDependencies = {
    }

    @HostListener('window:scroll', ['$event'])
    handleScroll(){
        const windowScroll = window.pageYOffset;
        if(windowScroll >= 40){
          this.stickyy = true;
          this.disply1= false; 
        } 
     if(!windowScroll){
          this.stickyy = false;
          this.disply1 = true; 
        } 
        
      }
   
    apiSuccessCallback() {

        this.CURRENCY_IMG = '/assets/icons/rupee-yellow.svg';

        if (this.HD_PROD_CAT != undefined) {
            switch (this.HD_PROD_CAT.getFieldValue()) {

                case 'AL': this.PRODUCT_CATEGORY_IMG = '/assets/icons/autoloan-yellow.svg';
                    this.HD_PROD_CAT.setValue('Auto Loan'); break;

                case 'PL': this.PRODUCT_CATEGORY_IMG = '/assets/icons/personalloan-yellow.svg';
                    this.HD_PROD_CAT.setValue('Personal Loan'); break;

                case 'ML': this.PRODUCT_CATEGORY_IMG = '/assets/icons/mortgage-yellow.svg';
                    this.HD_PROD_CAT.setValue('Mortgage Loan'); break;

                case 'CC': this.PRODUCT_CATEGORY_IMG = '/assets/icons/creditcard-yellow.svg';
                    this.HD_PROD_CAT.setValue('Credit Card'); break;
            }

        }
    }
}
