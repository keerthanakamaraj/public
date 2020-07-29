import { Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter, Input, HostListener } from '@angular/core';
import { OperationModel } from './Operation.model';
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
import { HeaderComponent } from '../Header/Header.component';
import { ApplicationDtlsComponent } from '../ApplicationDtls/ApplicationDtls.component';
import { CustGridComponent } from '../CustGrid/CustGrid.component';
import { from } from 'rxjs';
import { CreditCardDetailsComponent } from '../CreditCardDetails/CreditCardDetails.component';
const customCss: string = '';

@Component({
  selector: 'app-Operation',
  templateUrl: './Operation.component.html'
})
export class OperationComponent extends FormComponent implements OnInit, AfterViewInit {
  @ViewChild('HEADER', { static: false }) HEADER: HeaderComponent;
  @ViewChild('CUST_GRID', { static: false }) CUST_GRID: CustGridComponent;
  @ViewChild('APPLICATION_DETAILS', { static: false }) APPLICATION_DETAILS: ApplicationDtlsComponent;
  @ViewChild('CreditCard', { static: false }) CreditCard: CreditCardDetailsComponent;
  @ViewChild('G_LETTER', { static: false }) G_LETTER: ButtonComponent;
  @ViewChild('OPERATION_APPROVE', { static: false }) OPERATION_APPROVE: ButtonComponent;
  @ViewChild('OPERATION_WITHDRAW', { static: false }) OPERATION_WITHDRAW: ButtonComponent;
  @ViewChild('HideCurrentStage', { static: false }) HideCurrentStage: HiddenComponent;
  @ViewChild('DisbustAmt', { static: false }) DisbustAmt: TextBoxComponent;
  @ViewChild('LOAN_DBR', { static: false }) LOAN_DBR: TextBoxComponent;
  @ViewChild('EMI_Amt', { static: false }) EMI_Amt: TextBoxComponent;
  @ViewChild('Apved_Limit', { static: false }) Apved_Limit: TextBoxComponent;
  @ViewChild('Card_DBR', { static: false }) Card_DBR: TextBoxComponent;
  @Input() isLoanCategory: any = undefined;


  showExpandedHeader: boolean = true;//state of header i.e expanded-1 or collapsed-0 
  ApplicationId: any;
  show: boolean = false;
  buttonName: any = 'Show';
  passApplicationId: any;
  LoanCat: any;
  // isLoanCategory: any = undefined;
  LoanArray = [];
  CardArray = [];
  appArray = [];
  async revalidate(): Promise<number> {
    var totalErrors = 0;
    super.beforeRevalidate();
    await Promise.all([
      this.HEADER.revalidate()
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
    this.value = new OperationModel();
    this.componentCode = 'Operation';
  }
  setReadOnly(readOnly) {
    super.setBasicFieldsReadOnly(readOnly);
    this.HEADER.setReadOnly(readOnly);
  }
  async onFormLoad() {
    this.isLoan();
    this.setInputs(this.services.dataStore.getData(this.services.routing.currModal));
    this.setDependencies();
    let appId = this.services.dataStore.getRouteParam(this.services.routing.currModal, 'appId');
    this.ApplicationId = appId;
    await this.brodcastApplicationId();
    this.HideCurrentStage.setValue('Operation');
    this.APPLICATION_DETAILS.fetchApplicationDetails();
    await this.CUST_GRID.gridDataLoad({
      'passCustGrid': this.ApplicationId,
    });
  }
  setInputs(param: any) {
    let params = this.services.http.mapToJson(param);
    if (params['mode']) {
      this.mode = params['mode'];
    }
  }
  async submitForm(path, apiCode, serviceCode) {
    this.submitData['formName'] = 'Operation';
    await super.submit(path, apiCode, serviceCode);
  }
  getFieldInfo() {
    this.amountComponent.forEach(field => { this.additionalInfo[field.fieldID + '_desc'] = field.getFieldInfo(); });
    this.comboFields.forEach(field => { this.additionalInfo[field.fieldID + '_desc'] = field.getFieldInfo(); });
    this.fileUploadFields.forEach(field => { this.additionalInfo[field.fieldID + '_desc'] = field.getFieldInfo(); });
    this.additionalInfo['HEADER_desc'] = this.HEADER.getFieldInfo();
    return this.additionalInfo;
  }
  getFieldValue() {
    this.value.HEADER = this.HEADER.getFieldValue();
    return this.value;
  }
  setValue(inputValue, inputDesc = undefined) {
    this.HEADER.setValue(inputValue['HEADER'], inputDesc['HEADER_desc']);
    this.setBasicFieldsValue(inputValue, inputDesc);
    this.value = new OperationModel();
    this.value.setValue(inputValue);
    this.setDependencies();
    this.passNewValue(this.value);
  }
  ngOnInit() {
    if (this.formCode == undefined) { this.formCode = 'Operation'; }
    if (this.formOnLoadError) { return; }
    var styleElement = document.createElement('style');
    styleElement.type = 'text/css';
    styleElement.innerHTML = customCss;
    styleElement.id = 'Operation_customCss';
    document.getElementsByTagName('head')[0].appendChild(styleElement);
  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    var styleElement = document.getElementById('Operation_customCss');
    styleElement.parentNode.removeChild(styleElement);
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.subsBFldsValueUpdates();
      this.onFormLoad();
      this.checkForHTabOverFlow();
    });
    this.isLoan();
  }
  clearError() {
    this.HEADER.clearError();
    super.clearBasicFieldsError();
    super.clearHTabErrors();
    super.clearVTabErrors();
    this.errors = 0;
    this.errorMessage = [];
  }
  onReset() {
    this.HEADER.onReset();
    super.resetBasicFields();
    this.clearHTabErrors();
    this.clearVTabErrors();
    this.errors = 0;
    this.errorMessage = [];
    this.additionalInfo = undefined;
    this.dependencyMap.clear();
    this.value = new OperationModel();
    this.passNewValue(this.value);
    this.setReadOnly(false);
    this.onFormLoad();
  }
  goBack() {
    if (confirm("Are you sure you want to cancel?")) {
      // history.back();
      this.services.router.navigate(['home', 'LANDING']);
    }
  }
  viewDDE(){
    this.services.router.navigate(['home', 'DDE']);
  }
  async headerState(event) {
    this.showExpandedHeader = event.headerState;
  }
  brodcastApplicationId() {
    this.APPLICATION_DETAILS.ApplicationId = this.ApplicationId;
    this.CUST_GRID.ApplicationId = this.ApplicationId;
    this.passApplicationId = this.ApplicationId;
    console.log("juhi::", this.passApplicationId);
  }
  brodcastProdCategory(event) {
    //  event.isLoanCategory false when type is 'CC'
    this.isLoanCategory = event.isLoanCategory;
    console.log("Loan type", this.isLoanCategory);
  }
  isLoan() {
    if (!this.isLoanCategory) {//ie. loan type credit card
      this.Apved_Limit.setReadOnly(true);
      this.Card_DBR.setReadOnly(true);
      this.fetchCardDetails();
    }
    else {//CC type loan
      this.DisbustAmt.setReadOnly(true);
      this.LOAN_DBR.setReadOnly(true);
      this.EMI_Amt.setReadOnly(true);
      this.fetchLoanDetails();
    }
  }
  fetchLoanDetails() {
    let inputMap = new Map();
    inputMap.clear();
    let applicationId: any = this.passApplicationId;
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
    this.services.http.fetchApi('/LoanDetails', 'GET', inputMap, '/rlo-de').subscribe(
      async (httpResponse: HttpResponse<any>) => {
        var res = httpResponse.body;
        this.LoanArray = [];

        if (res !== null) {
          this.LoanArray = res['LoanDetails'];

          this.LoanArray.forEach(async LoanElement => {
            this.DisbustAmt.setValue(LoanElement['SystemRecommendedAmount']);
            // this.LOAN_DBR.setValue(loanDtls['InterestRate']);
            this.EMI_Amt.setValue(LoanElement['EMIAmount']);
          });
        }
      },
      async (httpError) => {
        var err = httpError['error']
        if (err != null && err['ErrorElementPath'] != undefined && err['ErrorDescription'] != undefined) {
        }
      }
    );
    this.services.http.fetchApi('/ApplicationScoreDetails', 'GET', inputMap, '/rlo-de').subscribe(
      async (httpResponse: HttpResponse<any>) => {
        var res = httpResponse.body;
        this.appArray = [];

        if (res !== null) {
          this.appArray = res['ApplicationScoreDetails'];
          this.appArray.forEach(async AppElement => {
            if(AppElement.Score = 'DBR'){
            this.LOAN_DBR.setValue(AppElement['Score']);
            }
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

  fetchCardDetails() {
    let inputMap = new Map();
    inputMap.clear();
    let applicationId: any = this.passApplicationId;
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
        this.CardArray = [];

        if (res !== null) {
          this.CardArray = res['CreditCardDetails'];

          this.CardArray.forEach(async CardElement => {
            this.Apved_Limit.setValue(CardElement['ApprovedLimit']);
          });
        }
      },
      async (httpError) => {
        var err = httpError['error']
        if (err != null && err['ErrorElementPath'] != undefined && err['ErrorDescription'] != undefined) {
        }
      }
    );
    this.services.http.fetchApi('/ApplicationScoreDetails', 'GET', inputMap, '/rlo-de').subscribe(
      async (httpResponse: HttpResponse<any>) => {
        var res = httpResponse.body;
        this.appArray = [];

        if (res !== null) {
          this.appArray = res['ApplicationScoreDetails'];
          this.appArray.forEach(async AppElement => {
            if(AppElement.Score = 'DBR'){
              this.LOAN_DBR.setValue(AppElement['Score']);
              }
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
  onLetterClick() {
    this.show = !this.show;
    if (this.show)
      this.buttonName = "show";
  }
  fieldDependencies = {
  }

}