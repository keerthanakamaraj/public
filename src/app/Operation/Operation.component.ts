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
import { IModalData } from '../popup-alert/popup-interface';
import { string } from '@amcharts/amcharts4/core';
const customCss: string = '';

@Component({
  selector: 'app-Operation',
  templateUrl: './Operation.component.html'
})
export class OperationComponent extends FormComponent implements OnInit, AfterViewInit {
  @ViewChild('HEADER', { static: false }) HEADER: HeaderComponent;
  @ViewChild('CUST_GRID', { static: false }) CUST_GRID: CustGridComponent;
  @ViewChild('APPLICATION_DETAILS', { static: false }) APPLICATION_DETAILS: ApplicationDtlsComponent;
  @ViewChild('AD_CUST_STATUS', { static: false }) AD_CUST_STATUS: TextBoxComponent;
  
    @ViewChild('AD_CUST_REMARKS', { static: false }) AD_CUST_REMARKS: TextAreaComponent;

  @ViewChild('CreditCard', { static: false }) CreditCard: CreditCardDetailsComponent;
  @ViewChild('G_LETTER', { static: false }) G_LETTER: ButtonComponent;
  @ViewChild('OPERATION_APPROVE', { static: false }) OPERATION_APPROVE: ButtonComponent;
  @ViewChild('OPERATION_WITHDRAW', { static: false }) OPERATION_WITHDRAW: ButtonComponent;
  @ViewChild('OPERATION_SENDBACK', { static: false }) OPERATION_SENDBACK: ButtonComponent;  
  @ViewChild('DisbustAmt', { static: false }) DisbustAmt: TextBoxComponent;
  @ViewChild('LOAN_DBR', { static: false }) LOAN_DBR: TextBoxComponent;
  @ViewChild('EMI_Amt', { static: false }) EMI_Amt: TextBoxComponent;
  @ViewChild('Apved_Limit', { static: false }) Apved_Limit: TextBoxComponent;
  @ViewChild('Card_DBR', { static: false }) Card_DBR: TextBoxComponent;
  @ViewChild('HideProcessId', { static: false }) HideProcessId: HiddenComponent;
  @ViewChild('HideServiceCode', { static: false }) HideServiceCode: HiddenComponent;
  @ViewChild('HideServiceCodeComplete', { static: false }) HideServiceCodeComplete: HiddenComponent;
  @ViewChild('HideTaskId', { static: false }) HideTaskId: HiddenComponent;
  @ViewChild('HideTenantId', { static: false }) HideTenantId: HiddenComponent;
  @ViewChild('HideUserId', { static: false }) HideUserId: HiddenComponent;
  @ViewChild('HideCurrentStage', { static: false }) HideCurrentStage: HiddenComponent;
  @ViewChild('HideAppId', { static: false }) HideAppId: HiddenComponent;
  @ViewChild('hideDirection', { static: false }) hideDirection: HiddenComponent;

  @Input() isLoanCategory: any = undefined;
  @Input() ProductCode: any = undefined;

  showExpandedHeader: boolean = true;//state of header i.e expanded-1 or collapsed-0 
  ApplicationId: any;
  show: boolean = false;
  buttonName: any = 'Show';
  passApplicationId: any;
  LoanCat: any;
  // LETTERMGMTFORMAT = "Ref_no: 20200730093231022213</p>\r\n\r\n\r\n</p>\r\n\r\nDear Jonas Brandt ,</p>\r\n\r\n\r\n</p>\r\n\r\n\r\n</p>\r\n\r\nRe: Invoice no : 0111000154199 in respect of your purchase from OTTO.de</p>\r\n\r\n\r\n</p>\r\n\r\n\r\n</p>\r\n\r\nThis is to inform you that there will be a debit of 215.01 EUR on 17-JUL-2020 from your bank account with number DE000000111000154199</p>\r\n\r\nbasis mandate id : 20200624121109014765</p>\r\n\r\n\r\n</p>\r\n\r\n\r\n</p>\r\n\r\nThis payment will appear in your bank statement as Hanseatic Bank GmbH + Co.</p>\r\n\r\n\r\n</p>\r\n\r\n\r\n</p>\r\n\r\n\r\n</p>\r\n\r\nSincerely yours,</p>\r\n\r\n\r\n</p>\r\n\r\nOTTO Customer Service</p>\r\n\r\n\r\n</p>\r\n\r\n\r\n</p>\r\n\r\n\r\n</p>\r\n\r\nPlease do not reply to this email as this is an auto generated intimation.</p>";
  userId: any;
  taskId: any;
  instanceId: any;
  // tenantId: string = "SB1";
  // serviceCode: string = "ClaimTask";
  // serviceCodeN: string = "CompleteTask";
  // processId: string = "RLO_Process";
  applicationStatus: string = "AP";
  // isLoanCategory: any = undefined;
  LoanArray = [];
  CardArray = [];
  appArray = [];
  custArray = [];
  LetterArray;

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
    this.setInputs(this.services.dataStore.getData(this.services.routing.currModal));
    this.HideProcessId.setValue('RLO_Process');
    this.HideServiceCode.setValue('ClaimTask');
    this.HideServiceCodeComplete.setValue('CompleteTask');
    this.HideTenantId.setValue('SB1');
    this.HideAppId.setValue('RLO');
    this.HideCurrentStage.setValue('Operation');
    this.setDependencies();
    let appId = this.services.dataStore.getRouteParam(this.services.routing.currModal, 'appId');
    this.taskId = this.services.dataStore.getRouteParam(this.services.routing.currModal, 'taskId');
    this.instanceId = this.services.dataStore.getRouteParam(this.services.routing.currModal, 'instanceId');
    this.userId = this.services.dataStore.getRouteParam(this.services.routing.currModal, 'userId');
    this.ApplicationId = appId;
    this.AD_CUST_REMARKS.setReadOnly(true);
    this.AD_CUST_STATUS.setReadOnly(true);
    await this.brodcastApplicationId();
    this.APPLICATION_DETAILS.fetchApplicationDetails();
    this.fetchCustomerDecisionDetails();
    await this.CUST_GRID.gridDataLoad({
      'passCustGrid': this.ApplicationId,
    });
    if (this.userId === undefined || this.userId == '') {
      this.claimTask(this.taskId);
    }
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
  // viewDDE() {
  //   this.services.router.navigate(['home', 'DDE']);
  // }
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
    this.ProductCode = this.services.rloCommonData.globalApplicationDtls.ProductCode
    console.log("Loan type", this.isLoanCategory);
    console.log("Juhi", this.ProductCode);
    setTimeout(() => {
      this.isLoan();
    }, 2000);
  }

  fetchLetter() {
    let inputMap = new Map();
    inputMap.clear();
    let requestParams;
    inputMap.set('QueryParam.eventReferenceNo', "20200730093231022213-1");
    inputMap.set('QueryParam.sourceType', "Sanction Letter");
    inputMap.set('QueryParam.sourceCd', "APPROVAL");

    this.services.http.fetchApi('/fetchLetterManagementAudit', 'GET', inputMap, '/masters').subscribe(
      async (httpResponse: HttpResponse<any>) => {
        var res = httpResponse.body;
        this.LetterArray;
        if (res) {
          this.LetterArray = res.Letter["0"].LETTERMGMTFORMAT;
          let errorMsg = "";
          var mainMessage = this.LetterArray;
          var button1 = this.services.rloui.getAlertMessage('', 'OK');
          // var button2 = this.services.rloui.getAlertMessage('', 'CANCEL');

          Promise.all([mainMessage, button1]).then(values => {
            console.log(values);
            const modalObj: IModalData = {
              title: "Sanction Letter",
              // mainMessage: values[0],
              rawHtml: values[0],
              modalSize: "modal-width-lg",
              buttons: [
                // { id: 1, text: values[1], type: "success", class: "btn-primary" },
                //   { id: 2, text: values[2], type: "failure", class: "btn-warning-outline" }
              ]
            }
            this.services.rloui.confirmationModal(modalObj).then((response) => {
              console.log(response);
              if (response != null) {
                if (response.id === 1) {
                  this.services.rloui.closeAllConfirmationModal();
                }
              }
            });
          });

        }
      },
      (httpError) => {
        console.error(httpError);
        this.services.alert.showAlert(2, 'rlo.error.fetch.form', -1);
      });
  }
  isLoan() {
    if (!this.isLoanCategory) {//ie. loan type credit card
      this.Apved_Limit.setReadOnly(true);
      this.Card_DBR.setReadOnly(true);
      this.fetchCardDetails();
      console.log("Card is working");
    }
    else {//CC type loan
      this.DisbustAmt.setReadOnly(true);
      this.LOAN_DBR.setReadOnly(true);
      this.EMI_Amt.setReadOnly(true);
      this.fetchLoanDetails();

      console.log("loan is working");
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
          this.LOAN_DBR.setValue(res['DBR']);
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
          this.LOAN_DBR.setValue(res['DBR']);
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

  goBack() {
    this.services.rloui.goBack();
  }

  



  fetchCustomerDecisionDetails() {
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
    this.services.http.fetchApi('/ApplicationDetails', 'GET', inputMap, '/initiation').subscribe(
      async (httpResponse: HttpResponse<any>) => {
        var res = httpResponse.body;
        this.custArray = [];

        if (res !== null) {
          this.custArray = res['ApplicationDetails'];

          this.custArray.forEach(async custElement => {
            this.AD_CUST_REMARKS.setValue(custElement['CustomerConfirmationRemarks']);
            // this.LOAN_DBR.setValue(loanDtls['InterestRate']);
            this.AD_CUST_STATUS.setValue(custElement['CustomerConfirmationStatus']);
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
  async claimTask(taskId) {
    const inputMap = new Map();
    inputMap.clear();
    inputMap.set('Body.UserId', sessionStorage.getItem('userId'));
    inputMap.set('Body.TENANT_ID', this.HideTenantId.getFieldValue());
    inputMap.set('Body.TaskId', taskId);
    inputMap.set('HeaderParam.ProcessId', this.HideProcessId.getFieldValue());
    inputMap.set('HeaderParam.ServiceCode', this.HideServiceCode.getFieldValue());
    this.services.http.fetchApi('/ClaimTask', 'POST', inputMap, '/los-wf').subscribe(
      async (httpResponse: HttpResponse<any>) => {
        const res = httpResponse.body;
        if (res.Status == 'S') {
          this.services.alert.showAlert(1, 'rlo.success.claim.qde', 5000);
          this.userId = sessionStorage.getItem('userId');
        } else {
          this.services.alert.showAlert(2, 'rlo.error.claim.qde', -1);
        }
      },
      async (httpError) => {
        const err = httpError['error'];
        if (err != null && err['ErrorElementPath'] !== undefined && err['ErrorDescription'] !== undefined) {
          if (err['ErrorElementPath'] === 'ServiceCode') {
            this.HideServiceCode.setError(err['ErrorDescription']);
          } else if (err['ErrorElementPath'] === 'ProcessId') {
            this.HideProcessId.setError(err['ErrorDescription']);
          } else if (err['ErrorElementPath'] === 'TaskId') {
            this.HideTaskId.setError(err['ErrorDescription']);
          } else if (err['ErrorElementPath'] === 'TENANT_ID') {
            this.HideTenantId.setError(err['ErrorDescription']);
          } else if (err['ErrorElementPath'] === 'UserId') {
            this.HideUserId.setError(err['ErrorDescription']);
          }
        }
        this.services.alert.showAlert(2, 'rlo.error.claim.qde', -1);
      }
    );
  }

  async OPERATION_SUBMIT_click(event) {
    const inputMap = new Map();
    inputMap.clear();
    inputMap.set('Body.UserId', sessionStorage.getItem('userId'));
    inputMap.set('Body.TENANT_ID', this.HideTenantId.getFieldValue());
    inputMap.set('Body.TaskId', this.taskId);
    inputMap.set('HeaderParam.ProcessId', this.HideProcessId.getFieldValue());
    inputMap.set('Body.direction', 'AP');
    inputMap.set('Body.ApplicationStatus', 'Approve');
    inputMap.set('Body.CurrentStage', 'Operation');
    inputMap.set('Body.ApplicationId', this.ApplicationId);    
    inputMap.set('HeaderParam.ServiceCode', this.HideServiceCodeComplete.getFieldValue());
    this.services.http.fetchApi('/acceptOperation', 'POST', inputMap, '/rlo-de').subscribe(
      async (httpResponse: HttpResponse<any>) => {
        const res = httpResponse.body;

        if (res.Status == 'S') {
          // var title = this.services.rloui.getAlertMessage('rlo.error.invalid.regex');
          var mainMessage = this.services.rloui.getAlertMessage('rlo.success.submit');
          var button1 = this.services.rloui.getAlertMessage('', 'OK');
          // var button2 = this.services.rloui.getAlertMessage('', 'CANCEL');

          Promise.all([mainMessage, button1]).then(values => {
            console.log(values);
            let modalObj = {
              title: "Alert",
              mainMessage: values[0],
              modalSize: "modal-width-sm",
              buttons: [
                { id: 1, text: values[1], type: "success", class: "btn-primary" },
                //   { id: 2, text: values[2], type: "failure", class: "btn-warning-outline" }
              ]
            }

            console.log("deep ===", modalObj);
            this.services.rloui.confirmationModal(modalObj).then((response) => {
              console.log(response);
              if (response != null) {
                if (response.id === 1) {
                  this.services.router.navigate(['home', 'LANDING']);
                }
              }
            });
          });
        }
      },
      async (httpError) => {
        const err = httpError['error'];
        if (err != null && err['ErrorElementPath'] !== undefined && err['ErrorDescription'] !== undefined) {
          if (err['ErrorElementPath'] === 'ServiceCode') {
            this.HideServiceCodeComplete.setError(err['ErrorDescription']);
          } else if (err['ErrorElementPath'] === 'ProcessId') {
            this.HideProcessId.setError(err['ErrorDescription']);
          } else if (err['ErrorElementPath'] === 'TaskId') {
            this.HideTaskId.setError(err['ErrorDescription']);
          } else if (err['ErrorElementPath'] === 'TENANT_ID') {
            this.HideTenantId.setError(err['ErrorDescription']);
          } else if (err['ErrorElementPath'] === 'UserId') {
            this.HideUserId.setError(err['ErrorDescription']);
          }
        }
        this.services.alert.showAlert(2, 'rlo.error.claim.qde', -1);
      }
    );
  }
  async OPERATION_WITHDRAW_click(event) {
    const inputMap = new Map();
    inputMap.clear();
    inputMap.set('Body.UserId', sessionStorage.getItem('userId'));
    inputMap.set('Body.TENANT_ID', this.HideTenantId.getFieldValue());
    inputMap.set('Body.TaskId', this.taskId);
    inputMap.set('HeaderParam.ProcessId', this.HideProcessId.getFieldValue());
    inputMap.set('Body.direction', 'W');
    inputMap.set('Body.ApplicationId', this.ApplicationId);    
    inputMap.set('Body.ApplicationStatus', 'Withdraw');
    inputMap.set('Body.CurrentStage', 'Operation');    
    inputMap.set('HeaderParam.ServiceCode', this.HideServiceCodeComplete.getFieldValue());
    this.services.http.fetchApi('/acceptOperation', 'POST', inputMap, '/rlo-de').subscribe(

      async (httpResponse: HttpResponse<any>) => {
        const res = httpResponse.body;

        if (res.Status == 'S') {
          // var title = this.services.rloui.getAlertMessage('rlo.error.invalid.regex');
          var mainMessage = this.services.rloui.getAlertMessage('rlo.withdraw.comfirmation');
          var button1 = this.services.rloui.getAlertMessage('', 'OK');
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
                  this.services.router.navigate(['home', 'LANDING']);
                }
              }
            });
          });
        }
      },
      async (httpError) => {
        const err = httpError['error'];
        if (err != null && err['ErrorElementPath'] !== undefined && err['ErrorDescription'] !== undefined) {
          if (err['ErrorElementPath'] === 'ServiceCode') {
            this.HideServiceCodeComplete.setError(err['ErrorDescription']);
          } else if (err['ErrorElementPath'] === 'ProcessId') {
            this.HideProcessId.setError(err['ErrorDescription']);
          } else if (err['ErrorElementPath'] === 'TaskId') {
            this.HideTaskId.setError(err['ErrorDescription']);
          } else if (err['ErrorElementPath'] === 'TENANT_ID') {
            this.HideTenantId.setError(err['ErrorDescription']);
          } else if (err['ErrorElementPath'] === 'UserId') {
            this.HideUserId.setError(err['ErrorDescription']);
          }
        }
        this.services.alert.showAlert(2, 'rlo.error.claim.qde', -1);
      }
    );
  }


  async OPERATION_SENDBACK_click(event) {
    const inputMap = new Map();
    inputMap.clear();
    inputMap.set('Body.UserId', sessionStorage.getItem('userId'));
    inputMap.set('Body.TENANT_ID', this.HideTenantId.getFieldValue());
    inputMap.set('Body.TaskId', this.taskId);
    inputMap.set('HeaderParam.ProcessId', this.HideProcessId.getFieldValue());
    inputMap.set('Body.direction', 'SB');
    inputMap.set('Body.ApplicationId', this.ApplicationId);
    inputMap.set('Body.ApplicationStatus', 'Sendback'); 
    inputMap.set('Body.CurrentStage', 'Operation');    
    inputMap.set('HeaderParam.ServiceCode', this.HideServiceCodeComplete.getFieldValue());
    this.services.http.fetchApi('/acceptOperation', 'POST', inputMap, '/rlo-de').subscribe(
      async (httpResponse: HttpResponse<any>) => {
        const res = httpResponse.body;

        if (res.Status == 'S') {
          // var title = this.services.rloui.getAlertMessage('rlo.error.invalid.regex');
          var mainMessage = this.services.rloui.getAlertMessage('rlo.sentback.comfirmation');
          var button1 = this.services.rloui.getAlertMessage('', 'OK');
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
                  this.services.router.navigate(['home', 'LANDING']);
                }
              }
            });
          });
        }
      },
      async (httpError) => {
        const err = httpError['error'];
        if (err != null && err['ErrorElementPath'] !== undefined && err['ErrorDescription'] !== undefined) {
          if (err['ErrorElementPath'] === 'ServiceCode') {
            this.HideServiceCodeComplete.setError(err['ErrorDescription']);
          } else if (err['ErrorElementPath'] === 'ProcessId') {
            this.HideProcessId.setError(err['ErrorDescription']);
          } else if (err['ErrorElementPath'] === 'TaskId') {
            this.HideTaskId.setError(err['ErrorDescription']);
          } else if (err['ErrorElementPath'] === 'TENANT_ID') {
            this.HideTenantId.setError(err['ErrorDescription']);
          } else if (err['ErrorElementPath'] === 'UserId') {
            this.HideUserId.setError(err['ErrorDescription']);
          }
        }
        this.services.alert.showAlert(2, 'rlo.error.claim.qde', -1);
      }
    );
  }

}
