import { Component, OnInit, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { CustomerDtlsComponent } from './CustomerDtls.component';
import { FieldComponent } from '../field/field.component';
import { RLOUIHandlerComponent } from 'src/app/rlouihandler/rlouihandler.component';
import { ServiceStock } from '../service-stock.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ReadOnlyComponent } from '../rlo-ui-readonlyfield/rlo-ui-readonlyfield.component';
@Component({
  selector: 'app-customer-handler',
  templateUrl: './customer-handler.component.html'
})
export class CustomerHandlerComponent extends RLOUIHandlerComponent implements OnInit {
  @Output() custDtlsEdit: EventEmitter<any> = new EventEmitter<any>();
  @Input() MainComponent: CustomerDtlsComponent;
  formName: string = "CustomerDetails";

  customerDetailsMap = new Map();
  @ViewChild('"CD_CUSTOMER_TYPE"', { static: false }) CD_CUSTOMER_TYPE: ReadOnlyComponent;
  @ViewChild('"CD_CUSTOMER_NAME"', { static: false }) CD_CUSTOMER_NAME: ReadOnlyComponent;
  ngOnInit() {
    // ngOnInit
  }

  // OnFormLoad
  onFormLoad(arg0: {}) {
    console.log("customer .. On form load");
    super.onFormLoad({});

    // this.APIForCustomerData();
    this.MainComponent.CD_THIRD_NAME.setHidden(true);
    // this.MainComponent.CD_THIRD_NAME.setHidden(true);
  }

  updateFullName(arg0: {}) {
    let fullName = "";
    if (this.MainComponent.CD_FIRST_NAME.getFieldValue()) {
      fullName = fullName + this.MainComponent.CD_FIRST_NAME.getFieldValue() + " ";
    }
    if (this.MainComponent.CD_MIDDLE_NAME.getFieldValue()) {
      fullName = fullName + this.MainComponent.CD_MIDDLE_NAME.getFieldValue() + " ";
    }
    if (this.MainComponent.CD_THIRD_NAME.getFieldValue()) {
      fullName = fullName + " " + this.MainComponent.CD_THIRD_NAME.getFieldValue() + " ";
    }
    if (this.MainComponent.CD_LAST_NAME.getFieldValue()) {
      fullName = fullName + " " + this.MainComponent.CD_LAST_NAME.getFieldValue() + " ";
    }
    fullName.trim();
    this.MainComponent.CD_FULL_NAME.setValue(fullName);
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
      this.MainComponent.services.http.fetchApi('/BorrowerDetails', 'GET', inputMap).subscribe(
        async (httpResponse: HttpResponse<any>) => {
          var res = httpResponse.body;
          var customerDataArr = [];
          var BorrowerDetails = res['BorrowerDetails'];
          if (BorrowerDetails) {
            BorrowerDetails.forEach(eachBorrower => {
              let customer = {};
              customer['CustomerId'] = eachBorrower.BorrowerSeq;
              customer['CD_CUSTOMER_TYPE'] = eachBorrower.CustomerType;
              customer['CD_CUSTOMER_NAME'] = eachBorrower.FullName;
              customerDataArr.push(customer);
            });
          }
          this.apiSuccessCallback(customerDataArr);
        },
        async (httpError) => {
          var err = httpError['error']
          if (err != null && err['ErrorElementPath'] != undefined && err['ErrorDescription'] != undefined) {
          }
          this.MainComponent.services.alert.showAlert(2, 'Failed to load customer Borrower details!', -1);
        }
      );
    }
  }

  apiSuccessCallback(customerDataArr: any[]) {
    this.customerDetailsMap.clear();
    customerDataArr.forEach(customer => {
      if (customer != null && customer.CD_CUSTOMER_TYPE != undefined && customer != '') {
        this.categoriseCustomers(customer.CD_CUSTOMER_TYPE, customer);
      }
    });
  }
  categoriseCustomers(customerType: String, customer: {}) {
    let customerTypeArr = [];
    if (customer !== null) {
      if (this.customerDetailsMap.has(customerType)) {
        customerTypeArr = this.customerDetailsMap.get(customerType);

      }
      else {
        customerTypeArr = [];
      }
      customerTypeArr.push(customer);
      this.customerDetailsMap.set(customerType, customerTypeArr);
    }
  }

  public editCustomer(event, selectedCustomer) {
    if (selectedCustomer) {
      this.MainComponent.CUST_DTLS_GRID_custDtlsEdit(event, selectedCustomer.CustomerId);
    }
  }
  doReset() {
    this.MainComponent.onReset();
  }
}

