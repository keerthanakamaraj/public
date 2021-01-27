import { Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import { CustomerGridDTLSModel } from './CustomerGridDTLS.model';
import { FormComponent } from '../form/form.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PopupModalComponent } from '../popup-modal/popup-modal.component';
import { ServiceStock } from '../service-stock.service';
import { LabelComponent } from '../label/label.component';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ReadOnlyComponent } from '../rlo-ui-readonlyfield/rlo-ui-readonlyfield.component';
import { each } from '@amcharts/amcharts4/.internal/core/utils/Iterator';
import { IGlobalApllicationDtls } from '../rlo-services/rloCommonData.service';

const customCss: string = '';

@Component({
  selector: 'app-CustomerGridDTLS',
  templateUrl: './CustomerGridDTLS.component.html'
})
export class CustomerGridDTLSComponent extends FormComponent implements OnInit, AfterViewInit {
  customerTypeMap = new Map();
  // @ViewChild('"CD_CUSTOMER_TYPE"', { static: false }) CD_CUSTOMER_TYPE: ReadOnlyComponent;
  // @ViewChild('"CD_CUSTOMER_NAME"', { static: false }) CD_CUSTOMER_NAME: ReadOnlyComponent;
  //@Output() selectCustId: EventEmitter<any> = new EventEmitter<any>();
  @Output() resetCustForm: EventEmitter<any> = new EventEmitter<any>();
  //@Output() passApplicationId: EventEmitter<any> = new EventEmitter<any>();
  @Output() passArrayToCustomer: EventEmitter<any> = new EventEmitter<any>();
  @Output() updateStageValidation: EventEmitter<any> = new EventEmitter<any>();

  @Input() ApplicationId: string = undefined;
  @Input() isLoanCategory: boolean = undefined;
  @Input() parentFormCode: string;
  @Input() readOnly: boolean = false;//used only when user comes to DDE from operations page

  customerDataArr: any[];
  isFirstAPICall: boolean = true;
  CustomerDetailsMap = new Map<string, any>();
  PlusFlag: boolean = false;
  AddOnSectionFlag: boolean = true;
  MstDynamicData: any = {};
  //activeCustomer:{}={};
  //activeBorrowerSeq:string=undefined;

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
    // this.stageValidate();
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
  async doAPIForCustomerList(event, deletedCustomerId: number = 0) {
    let inputMap = new Map();
    this.services.rloCommonData.globalApplicationDtls.isAddedNewMember = true;
    //create promise

    let borrowerSeq = undefined;
    if (event != undefined) {
      borrowerSeq = event.borrowerSeq;
    }
    if (this.ApplicationId != undefined) {
      inputMap.clear();
      let criteriaJson: any = { "Offset": 1, "Count": 10, FilterCriteria: [] };
      if (this.ApplicationId) {
        criteriaJson.FilterCriteria.push({
          "columnName": "ApplicationId",
          "columnType": "String",
          "conditions": {
            "searchType": "equals",
            "searchText": this.ApplicationId
          }
        });
        // criteriaJson.FilterCriteria.push({
        //   "columnName": "CustomerType",
        //   "columnType": "String",
        //   "conditions": {
        //     "searchType": "equals",
        //     "searchText": "R,F"
        //   }
        // });

      }
      inputMap.set('QueryParam.criteriaDetails', criteriaJson);
      this.services.http.fetchApi('/BorrowerDetails', 'GET', inputMap, "/initiation").subscribe(
        async (httpResponse: HttpResponse<any>) => {
          var res = httpResponse.body;
          this.CustomerDetailsMap.clear();
          var customerDataArr = [];
          let BorrowerDetail = res['BorrowerDetails'];
          var BorrowerDetails = BorrowerDetail.filter(function (BorrowerDetail) {
            return BorrowerDetail.CustomerType !== 'R' && BorrowerDetail.CustomerType !== 'F';
          });
          console.log("BorrowerDetails", BorrowerDetails);
          console.log("BorrowerDetails", BorrowerDetails);
          if (BorrowerDetails) {

            BorrowerDetails.forEach(eachBorrower => {
              let isValid = false;
             
              if (eachBorrower.BorrowerSeq == borrowerSeq) {
                eachBorrower.isValid = true;
              }
              let array = [];
              array.push(eachBorrower);
              let obj = {
                "name": "CustomerDetails",
                "data": array,
                "BorrowerSeq": eachBorrower.BorrowerSeq
              }

              this.services.rloCommonData.globalComponentLvlDataHandler(obj);

              let customer = {};
              this.CustomerDetailsMap.set(eachBorrower.BorrowerSeq, eachBorrower);
              customer['CustomerId'] = eachBorrower.BorrowerSeq;
              customer['CD_CUSTOMER_NAME'] = eachBorrower.RegisteredName ? eachBorrower.RegisteredName : eachBorrower.FullName;
              customer['editing'] = false;
              customer['loanOwnerFlag'] = false;
              if (eachBorrower.LoanOwnership != undefined && eachBorrower.LoanOwnership != 0) {
                customer['loanOwnerFlag'] = true;
              }

              customer['CD_CUSTOMER_TYPE'] = eachBorrower.CustomerType != null
                && eachBorrower.CustomerType != undefined && eachBorrower.CustomerType != '' && eachBorrower.Relationship == undefined || eachBorrower.ReferrerRelation == undefined
                ? eachBorrower.CustomerType : 'OP';

              if (customer['CD_CUSTOMER_TYPE'] == 'B') {
                this.services.rloCommonData.globalApplicationDtls.PrimaryBorrowerSeq = eachBorrower.BorrowerSeq;

              }
              if (customer['CD_CUSTOMER_TYPE'] == 'B' && this.isFirstAPICall) { // First Borrower
                this.passArrayToCustomer.emit({
                  'actionName': 'gridUpdated',
                  'CustomerArray': eachBorrower
                });

                this.isFirstAPICall = false;
                customer["editing"] = true;
              } else if (borrowerSeq != undefined && borrowerSeq == customer['CustomerId']) {
                let object = {};
                let actionName = deletedCustomerId == 0 ? "gridUpdated" : "customerDeleted";
                if (deletedCustomerId == 0) {
                  object["actionName"] = actionName;
                  object["CustomerArray"] = eachBorrower;
                }
                else {
                  object["actionName"] = actionName;
                  object["CustomerArray"] = eachBorrower;
                  object["customerId"] = deletedCustomerId;
                }
                this.passArrayToCustomer.emit(object);
                customer["editing"] = true;
              }

              customerDataArr.push(customer);
              
             

            });
            this.CustomerDetailsMap.forEach(element => {
              if(element.CustomerType !== 'B'){
                if(element.ApprovedCardLimit = undefined || element.ApprovedCardLimit == "" ){
                  this.services.rloCommonData.globalApplicationDtls.isAddedNewMember = false
                 return;
                // console.log("AddedMember" , parentData.isAddedNewMember);
                }
              
              }
              
            });
          }

          //customer deleted
          if (deletedCustomerId)
            this.services.rloCommonData.deleteStoredCustomerInDDE(deletedCustomerId);//deletedCustomerId

          this.apiSuccessCallback(customerDataArr);
          this.EnabledPlusIcon();
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
    }

  }

  apiSuccessCallback(customerDataArr: any[]) {
    this.customerTypeMap.clear();
    //  let borrowerSeq = undefined;
    customerDataArr.forEach(customer => {
      if (customer != null && customer != undefined && customer != '') {
        this.categoriseCustomers(customer.CD_CUSTOMER_TYPE, customer);
        // if (customer.CD_CUSTOMER_TYPE == 'B') {
        //   borrowerSeq = customer.CustomerId;
        // }
      }
    });
    if (!this.customerTypeMap.has('A') && this.parentFormCode == 'QDE') {
      this.AddOnSectionFlag = false;
    }
  }

  categoriseCustomers(customerType: String, customer: {}) {
    let customerTypeArr = [];
    if (this.customerTypeMap.has(customerType)) {
      customerTypeArr = this.customerTypeMap.get(customerType);
    }
    else {
      customerTypeArr = [];
    }
    // if(customerType == 'B' && customerTypeArr.length == 0 && this.isFirstAPICall) { // First Borrower
    //   customer["editing"] = true;
    // }
    customerTypeArr.push(customer);
    this.customerTypeMap.set(customerType, customerTypeArr);
  }

  public editCustomer(event, selectedCustomer) {
    if (selectedCustomer) {
      this.resetEditingFlag();
      selectedCustomer["editing"] = true;
      let activeCustomer = this.CustomerDetailsMap.get(selectedCustomer.CustomerId);
      this.passArrayToCustomer.emit({
        'actionName': 'toEditCustForm',
        'CustomerArray': activeCustomer
      });

      //  this.selectCustId.emit({
      //    'selectedCustId': selectedCustomer.CustomerId
      //  });
      //this.MainComponent.CUST_D TLS_GRID_custDtlsEdit(event, selectedCustomer.CustomerId);
      //  this.displayCustomerTag();
    }
  }
  doReset(customerType?: string) {
    this.resetEditingFlag();
    this.resetCustForm.emit({
      'customerType': customerType
    });

    // this.MainComponent.onReset();
  }

  resetEditingFlag() {
    this.customerTypeMap.forEach(group => {
      console.log("group ", group);
      group.forEach(cust => {
        cust["editing"] = false;
      });
    });
  }

  EnabledPlusIcon() {
    if (this.parentFormCode == 'DDE' && this.services.rloCommonData.globalApplicationDtls.CamType != 'LE') {
      this.PlusFlag = true;
    }
  }

  deleteCustomer(event, selectedCustomer) {
    var mainMessage = this.services.rloui.getAlertMessage('rlo.delete-customer.comfirmation');
    var button1 = this.services.rloui.getAlertMessage('', 'DELETE');
    var button2 = this.services.rloui.getAlertMessage('', 'CANCEL');

    Promise.all([mainMessage, button1, button2]).then(values => {
      console.log(values);
      let modalObj = {
        title: "Alert",
        mainMessage: values[0],
        modalSize: "modal-width-sm",
        buttons: [
          { id: 1, text: values[1], type: "success", class: "btn-primary" },
          { id: 2, text: values[2], type: "failure", class: "btn-warning-outline" }
        ]
      }
      this.services.rloui.confirmationModal(modalObj).then((response) => {
        console.log(response);
        if (response != null) {
          if (response.id === 1) {
            this.doDeleteCustomerAPICall(selectedCustomer);
          }
        }
      });
    });
  }

  setApplicantLabelsAndTags() {
    this.MstDynamicData = {};
    if (this.services.rloCommonData.globalApplicationDtls.CustomerType == 'C' && !this.isLoanCategory) {
      this.MstDynamicData['PrimaryLabel'] = 'Corporate';
      this.MstDynamicData['SecondaryLabel'] = 'Member';
      this.MstDynamicData['PrimaryTag'] = 'C';
      this.MstDynamicData['SecondaryTag'] = 'M';
    } else if (this.services.rloCommonData.globalApplicationDtls.CustomerType == 'I' && !this.isLoanCategory) {
      this.MstDynamicData['PrimaryLabel'] = 'Primary';
      this.MstDynamicData['SecondaryLabel'] = 'Add On';
      this.MstDynamicData['PrimaryTag'] = 'P';
      this.MstDynamicData['SecondaryTag'] = 'A';
    }
    this.EnabledPlusIcon();
  }

  doDeleteCustomerAPICall(selectedCustomer) {
    let inputMap = new Map();
    inputMap.clear();
    inputMap.set('PathParam.BorrowerSeq', selectedCustomer.CustomerId);
    this.services.http.fetchApi('/BorrowerDetails/{BorrowerSeq}', 'DELETE', inputMap, '/rlo-de').subscribe(
      async (httpResponse: HttpResponse<any>) => {
        var res = httpResponse.body;
        this.services.alert.showAlert(1, 'rlo.success.delete.customer', 5000);
        this.isFirstAPICall = true;
        this.services.rloCommonData.removeCustomerFromMap(selectedCustomer.CustomerId);

        this.doAPIForCustomerList({}, selectedCustomer.CustomerId);
      },
      async (httpError) => {
        var err = httpError['error']
        if (err != null && err['ErrorElementPath'] != undefined && err['ErrorDescription'] != undefined) {
        }
        this.services.alert.showAlert(2, 'rlo.error.wrong.form', -1);
      }
    );
  }
}
