import { Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import { AddOnModel } from './AddOn.model';
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
import { SearchCustomerGridComponent } from '../SearchCustomerGrid/SearchCustomerGrid.component';
import { RLOUIRadioComponent } from '../rlo-ui-radio/rlo-ui-radio.component';
import { CustomerSearchFieldsComponent } from '../customer-search-fields/customer-search-fields.component';
import { ICustomSearchObject } from '../Interface/masterInterface';
import { RloUiMobileComponent } from '../rlo-ui-mobile/rlo-ui-mobile.component';
// import { PasswordComponent } from '../password/password.component';
// import { RadioButtonComponent } from '../radio-button/radio-button.component';

const customCss: string = '';

@Component({
    selector: 'app-AddOn',
    templateUrl: './AddOn.component.html'
})
export class AddOnComponent extends FormComponent implements OnInit, AfterViewInit {
    @ViewChild('SearchFormGrid', { static: false }) SearchFormGrid: SearchCustomerGridComponent;
    @ViewChild('search_Type', { static: false }) search_Type: RLOUIRadioComponent;
    @ViewChild('custSearchFields', { static: false }) custSearchFields: CustomerSearchFieldsComponent;
    @ViewChild('ADD_CARD_CUST_TYPE', { static: false }) ADD_CARD_CUST_TYPE: RLOUIRadioComponent;
    @ViewChild('ADD_CUSTOMER_ID', { static: false }) ADD_CUSTOMER_ID: TextBoxComponent;
    @ViewChild('ADD_STAFF_ID', { static: false }) ADD_STAFF_ID: TextBoxComponent;
    @ViewChild('ADD_TITLE', { static: false }) ADD_TITLE: ComboBoxComponent;
    @ViewChild('ADD_FIRST_NAME', { static: false }) ADD_FIRST_NAME: TextBoxComponent;
    @ViewChild('ADD_MIDDLE_NAME', { static: false }) ADD_MIDDLE_NAME: TextBoxComponent;
    @ViewChild('ADD_THIRD_NAME', { static: false }) ADD_THIRD_NAME: TextBoxComponent;
    @ViewChild('ADD_LAST_NAME', { static: false }) ADD_LAST_NAME: TextBoxComponent;
    @ViewChild('ADD_FULL_NAME', { static: false }) ADD_FULL_NAME: TextBoxComponent;
    @ViewChild('ADD_GENDER', { static: false }) ADD_GENDER: ComboBoxComponent;
    @ViewChild('ADD_TAX_ID', { static: false }) ADD_TAX_ID: TextBoxComponent;
    @ViewChild('ADD_MOBILE', { static: false }) ADD_MOBILE: RloUiMobileComponent;
    @ViewChild('ADD_DOB', { static: false }) ADD_DOB: DateComponent;
    @ViewChild('ADD_CUST_SGMT', { static: false }) ADD_CUST_SGMT: ComboBoxComponent;
    @ViewChild('ADD_CUST_SUB_SGMT', { static: false }) ADD_CUST_SUB_SGMT: ComboBoxComponent;
    parentData: ICustomSearchObject = {
        'cifId': undefined,
        'mobileNumber': undefined,
        'searchType': 'External',
        'taxId': undefined
    };

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
        this.value = new AddOnModel();
        this.componentCode = 'AddOn';
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
        this.submitData['formName'] = 'AddOn';
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
        this.value = new AddOnModel();
        this.value.setValue(inputValue);
        this.setDependencies();
        this.passNewValue(this.value);
    }
    ngOnInit() {
        if (this.formCode == undefined) { this.formCode = 'AddOn'; }
        if (this.formOnLoadError) { return; }
        var styleElement = document.createElement('style');
        styleElement.type = 'text/css';
        styleElement.innerHTML = customCss;
        styleElement.id = 'AddOn_customCss';
        document.getElementsByTagName('head')[0].appendChild(styleElement);
    }
    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
        var styleElement = document.getElementById('AddOn_customCss');
        styleElement.parentNode.removeChild(styleElement);
    }
    ngAfterViewInit() {
        setTimeout(() => {
            this.subsBFldsValueUpdates();
            this.onFormLoad();
            this.checkForHTabOverFlow();
        });
        this.custSearchFields.parentData = this.parentData;
        console.log("kjgjh", this.parentData);
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
        this.value = new AddOnModel();
        this.passNewValue(this.value);
        this.setReadOnly(false);
        this.onFormLoad();
    }
    fieldDependencies = {
    }

    //event passed from searchCustomerGrid.ts -> customer-search-fields.ts -> AddOn.ts 
    selectedCustomer(data) {
        console.log(data);
    }
}