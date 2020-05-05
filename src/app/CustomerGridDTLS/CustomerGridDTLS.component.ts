import { Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import { CustomerGridDTLSModel } from './CustomerGridDTLS.model';
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
import { ReadOnlyComponent } from '../rlo-ui-readonlyfield/rlo-ui-readonlyfield.component';

const customCss: string = '';

@Component({
  selector: 'app-CustomerGridDTLS',
  templateUrl: './CustomerGridDTLS.component.html'
})
export class CustomerGridDTLSComponent extends FormComponent implements OnInit, AfterViewInit {
  customerDetailsMap = new Map();
  @ViewChild('"CD_CUSTOMER_TYPE"', { static: false }) CD_CUSTOMER_TYPE: ReadOnlyComponent;
  @ViewChild('"CD_CUSTOMER_NAME"', { static: false }) CD_CUSTOMER_NAME: ReadOnlyComponent;
  @Output() selectCustId: EventEmitter<any> = new EventEmitter<any>();
  @Output() resetCustForm: EventEmitter<any> = new EventEmitter<any>();
  @Output() passApplicationId: EventEmitter<any> = new EventEmitter<any>();
  @Output() passArrayToCustomer: EventEmitter<any> = new EventEmitter<any>();
  customerDataArr: any[];
  // passArrayToCustomer: any;
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
    this.value = new CustomerGridDTLSModel();
    this.componentCode = 'CustomerGridDTLS';
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
    this.submitData['formName'] = 'CustomerGridDTLS';
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
    this.value = new CustomerGridDTLSModel();
    this.value.setValue(inputValue);
    this.setDependencies();
    this.passNewValue(this.value);
  }
  ngOnInit() {
    if (this.formCode == undefined) { this.formCode = 'CustomerGridDTLS'; }
    if (this.formOnLoadError) { return; }
    var styleElement = document.createElement('style');
    styleElement.type = 'text/css';
    styleElement.innerHTML = customCss;
    styleElement.id = 'CustomerGridDTLS_customCss';
    document.getElementsByTagName('head')[0].appendChild(styleElement);
  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    var styleElement = document.getElementById('CustomerGridDTLS_customCss');
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
    this.value = new CustomerGridDTLSModel();
    this.passNewValue(this.value);
    this.setReadOnly(false);
    this.onFormLoad();
  }
  fieldDependencies = {
  }
  async APIForCustomerData(event) {
    let inputMap = new Map();
    let custId: any = event.custSeq;
    if (custId) {
      inputMap.clear();
      let criteriaJson: any = { "Offset": 1, "Count": 10, FilterCriteria: [] };
      if (custId) {
        criteriaJson.FilterCriteria.push({
          "columnName": "ApplicationId",
          "columnType": "String",
          "conditions": {
            "searchType": "equals",
            "searchText": custId
          }
        });
      }
      inputMap.set('QueryParam.criteriaDetails', criteriaJson);
      this.services.http.fetchApi('/BorrowerDetails', 'GET', inputMap).subscribe(
        async (httpResponse: HttpResponse<any>) => {
          var res = httpResponse.body;
          var customerDataArr = [];
          var BorrowerDetails = res['BorrowerDetails'];
          this.passArrayToCustomer.emit({
            'CustomerArray' : BorrowerDetails
          })
          if (BorrowerDetails) {
            BorrowerDetails.forEach(eachBorrower => {
              let customer = {};

              customer['CustomerId'] = eachBorrower.BorrowerSeq;
              customer['CD_CUSTOMER_NAME'] = eachBorrower.FullName;

              customer['CD_CUSTOMER_TYPE'] = eachBorrower.CustomerType != null
                && eachBorrower.CustomerType != undefined && eachBorrower.CustomerType != ''
                ? eachBorrower.CustomerType : 'OP';

              customerDataArr.push(customer);
            });
          }

          this.apiSuccessCallback(customerDataArr);
          // return customerDataArr;

          // this.displayCustomerTag(customerDataArr);
        },
        async (httpError) => {
          var err = httpError['error']
          if (err != null && err['ErrorElementPath'] != undefined && err['ErrorDescription'] != undefined) {
          }
          this.services.alert.showAlert(2, 'rlo.error.load.form', -1);
        }
      );

      return this.customerDetailsMap
    }
    // this.passApplicationId.emit({
    //   'applicationId' : event.custSeq
    // })

  }

  apiSuccessCallback(customerDataArr: any[]) {
    this.customerDetailsMap.clear();
  //  let borrowerSeq = undefined;
    customerDataArr.forEach(customer => {
      if (customer != null && customer != undefined && customer != '') {
        this.categoriseCustomers(customer.CD_CUSTOMER_TYPE, customer);
        // if (customer.CD_CUSTOMER_TYPE == 'B') {
        //   borrowerSeq = customer.CustomerId;
        // }
      }
    });
    // if (borrowerSeq != undefined) {
    //   this.selectCustId.emit({ 'selectedCustId': borrowerSeq });
    // }
  }

  categoriseCustomers(customerType: String, customer: {}) {
    let customerTypeArr = [];
    if (this.customerDetailsMap.has(customerType)) {
      customerTypeArr = this.customerDetailsMap.get(customerType);

    }
    else {
      customerTypeArr = [];
    }
    customerTypeArr.push(customer);
    this.customerDetailsMap.set(customerType, customerTypeArr);
  }

  public editCustomer(event, selectedCustomer) {
    if (selectedCustomer) {
      this.deactivateClasses();
      event.target.classList.remove("fas");
      event.target.classList.remove("fa-edit");
      event.target.classList.add("customer-edit-active");
      event.target.textContent = "Editing";
      event.target.parentElement.classList.remove("customer-names");
      event.target.parentElement.classList.add("customer-names-active");
      this.selectCustId.emit({
        'selectedCustId': selectedCustomer.CustomerId
      });
      //this.MainComponent.CUST_D TLS_GRID_custDtlsEdit(event, selectedCustomer.CustomerId);
      //  this.displayCustomerTag();
    }
  }
  doReset() {
    this.deactivateClasses();
    this.resetCustForm.emit();

    // this.MainComponent.onReset();
  }
  deactivateClasses() {
    let elementList = Array.from(document.getElementsByClassName("customer-names-active"));
    elementList.forEach(element => {
      element.classList.add("customer-names");
      element.classList.remove("customer-names-active");
    });

    elementList = Array.from(document.getElementsByClassName("customer-edit-active"));
    elementList.forEach(element => {
      element.classList.add("fas");
      element.classList.add("fa-edit");
      element.textContent = "";
      element.classList.remove("customer-edit-active");
    });
  }

  async loadCustDtlsGrid(event) {
    this.APIForCustomerData(event);
  }

}