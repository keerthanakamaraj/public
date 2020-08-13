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
import { RLOUIRadioComponent } from '../rlo-ui-radio/rlo-ui-radio.component';
const customCss: string = '';

@Component({
  selector: 'app-Operation',
  templateUrl: './Operation.component.html'
})
export class OperationComponent extends FormComponent implements OnInit, AfterViewInit {
  @ViewChild('HEADER', { static: false }) HEADER: HeaderComponent;
  @ViewChild('CUST_GRID', { static: false }) CUST_GRID: CustGridComponent;
  @ViewChild('APPLICATION_DETAILS', { static: false }) APPLICATION_DETAILS: ApplicationDtlsComponent;
  @ViewChild('AD_CUST_STATUS', { static: false }) AD_CUST_STATUS: RLOUIRadioComponent;
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
  @ViewChild('OPERATION_CLOSE', { static: false }) OPERATION_CLOSE: ButtonComponent;
  @ViewChild('HideDecision', { static: false }) HideDecision: HiddenComponent;

  @Input() isLoanCategory: any = undefined;
  @Input() ProductCode: any = undefined;

  showExpandedHeader: boolean = true;//state of header i.e expanded-1 or collapsed-0 
  ApplicationId: any;
  show: boolean = false;
  buttonName: any = 'Show';
  passApplicationId: any;
  LoanCat: any;
  clicked = false;
  userId: any;
  taskId: any;
  instanceId: any;
 // customerDecision:string=undefined;
  // custStatusOptionList=[
  //   { id: 'Approve', text: 'Approve'},
  //   { id: 'Amend', text: 'Amend'}
  // ];
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
    this.HideDecision.setValue('CustDecision');
    this.setDependencies();
    let appId = this.services.dataStore.getRouteParam(this.services.routing.currModal, 'appId');
    this.taskId = this.services.dataStore.getRouteParam(this.services.routing.currModal, 'taskId');
    this.instanceId = this.services.dataStore.getRouteParam(this.services.routing.currModal, 'instanceId');
    this.userId = this.services.dataStore.getRouteParam(this.services.routing.currModal, 'userId');
    this.ApplicationId = appId;
   // this.AD_CUST_REMARKS.setReadOnly(true);
   // this.AD_CUST_STATUS.setReadOnly(true);
    await this.brodcastApplicationId();
    this.APPLICATION_DETAILS.fetchApplicationDetails();
   // this.mapCustomerDecision();
   // this.fetchCustomerDecisionDetails();
    this.fetchApplicationDetails();
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
    // console.log("juhi::", this.passApplicationId);
  }
  brodcastProdCategory(event) {
    //  event.isLoanCategory false when type is 'CC'
    this.isLoanCategory = event.isLoanCategory;
    this.ProductCode = this.services.rloCommonData.globalApplicationDtls.ProductCode
    // console.log("Loan type", this.isLoanCategory);
    // console.log("Juhi", this.services.rloCommonData.globalApplicationDtls.TypeOfLoanName);
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
        //  let  loanType = this.services.rloCommonData.globalApplicationDtls.ProductName;
        //  let  loanAmt = this.services.rloCommonData.globalApplicationDtls.LoanAmount;
        // let arnNo = this.services.rloCommonData.globalApplicationDtls.ARN;
        //  let  schemeName = this.services.rloCommonData.globalApplicationDtls.SchemeName;
        //    let msg = res.Letter[0].LETTERMGMTFORMAT;
        //      msg = msg.replace(/@@ARN@@/gi, arnNo);
        //       msg = msg.replace(/Personal/gi,loanType);
        //       msg = msg.replace(/7500/gi, loanAmt);
        //       msg = msg.replace(/Scheme/gi, schemeName);
        //   console.log("repalce", msg)
          Promise.all([mainMessage, button1]).then(values => {
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
  salaryLetter() {
    let inputMap = new Map();
    inputMap.clear();
    let requestParams;
    inputMap.set('QueryParam.eventReferenceNo', "20200730093231022213-2");
    inputMap.set('QueryParam.sourceType', "Salary Certificate");
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
        //  let  loanType = this.services.rloCommonData.globalApplicationDtls.ProductName;
        //  let  loanAmt = this.services.rloCommonData.globalApplicationDtls.LoanAmount;
        // let arnNo = this.services.rloCommonData.globalApplicationDtls.ARN;
        //  let  schemeName = this.services.rloCommonData.globalApplicationDtls.SchemeName;
        //    let msg = res.Letter[0].LETTERMGMTFORMAT;
        //      msg = msg.replace(/@@ARN@@/gi, arnNo);
        //       msg = msg.replace(/Personal/gi,loanType);
        //       msg = msg.replace(/7500/gi, loanAmt);
        //       msg = msg.replace(/Scheme/gi, schemeName);
        //   console.log("repalce", msg)
          Promise.all([mainMessage, button1]).then(values => {
            const modalObj: IModalData = {
              title: "Salary Certificate",
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
      this.Card_DBR.setHidden(true);
      this.fetchCardDetails();
      // console.log("Card is working");
    }
    else {//CC type loan
      this.DisbustAmt.setReadOnly(true);
      this.LOAN_DBR.setReadOnly(true);
      this.EMI_Amt.setReadOnly(true);
      this.LOAN_DBR.setHidden(true);
      this.fetchLoanDetails();
      // console.log("loan is working");
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
      // var mainMessage = this.services.rloui.getAlertMessage('', 'Sanction Letter sent to Customer!');
      // var button1 = this.services.rloui.getAlertMessage('', 'OK');
      // // var button2 = this.services.rloui.getAlertMessage('', 'CANCEL');
      // Promise.all([mainMessage, button1]).then(values => {
      //   console.log(values);
      //   let modalObj = {
      //     title: "Success",
      //     rawHtml: values[0],
      //     modalSize: "modal-width-sm",
      //     buttons: [
      //       { id: 1, text: values[1], type: "success", class: "btn-primary" },
      //       //   { id: 2, text: values[2], type: "failure", class: "btn-warning-outline" }
      //     ]
      //   }
      //   this.services.rloui.confirmationModal(modalObj).then((response) => {
      //     console.log(response);
      //     if (response != null) {
      //       if (response.id === 1) {
      //         this.services.rloui.closeAllConfirmationModal();
      //       }
      //     }
      //   });
      // });
      this.services.alert.showAlert(1, 'rlo.success.letter', 5000);
      this.show = !this.show;
    if (this.show){
      this.buttonName = "show";
    }
  }
  fieldDependencies = {
    AD_CUST_STATUS: {
      inDep: [

        { paramKey: "VALUE1", depFieldID: "AD_CUST_STATUS", paramType: "PathParam" },
        { paramKey: "KEY1", depFieldID: "HideDecision", paramType: "QueryParam" },
        { paramKey: "APPID", depFieldID: "HideAppId", paramType: "QueryParam" },
      ],
      outDep: [
      ]
    }
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
    if (this.ApplicationId) {
      inputMap.set('QueryParam.ApplicationId', this.ApplicationId);
      // inputMap.set('QueryParam.criteriaDetails', criteriaJson);
      this.services.http.fetchApi('/ScoreCardDtls', 'GET', inputMap, '/rlo-de').subscribe(
        async (httpResponse: HttpResponse<any>) => {
          let res = httpResponse.body;
          console.log("new res",res);
          // let tempScoreCardResultList = res['ScoreCardDetails'];
          // this.parseScoreCardResultJson(tempScoreCardResultList);
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

        if (httpResponse.status == 200){
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

        if (httpResponse.status == 200){
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

        if (httpResponse.status == 200){
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
  mapCustomerDecision() {
    this.AD_CUST_STATUS.setValue(this.APPLICATION_DETAILS.CustomerConfirmationStatus);
    this.AD_CUST_REMARKS.setValue(this.APPLICATION_DETAILS.CustomerConfirmationRemarks);
  }

  openFileUpload() {
    this.services.rloui.openFileUpload(this.ApplicationId);
  }

  async OPERATION_CLOSE_click(event) {
    // var title = this.services.rloui.getAlertMessage('rlo.error.invalid.regex');
    var mainMessage = this.services.rloui.getAlertMessage('rlo.close.comfirmation');
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

      // console.log("deep ===", modalObj);
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
  fetchApplicationDetails() {
    let inputMap = new Map();
    inputMap.clear();
    if (this.ApplicationId) {

      inputMap.set('PathParam.ApplicationId', this.ApplicationId);
      this.services.http.fetchApi('/ApplicationDetails/{ApplicationId}', 'GET', inputMap, '/rlo-de').subscribe(
        async (httpResponse: HttpResponse<any>) => {
          var res = httpResponse.body;

          var applDtls = res['ApplicationDetails'];
          if (applDtls) {
           // this.CustomerConfirmationStatus=applDtls.CustomerConfirmationStatus;
           // this.CustomerConfirmationRemarks=applDtls.CustomerConfirmationRemarks;
            this.AD_CUST_STATUS.setValue(applDtls.CustomerConfirmationStatus);
            this.AD_CUST_REMARKS.setValue(applDtls.CustomerConfirmationRemarks);
          }
        },
        async (httpError) => {
          var err = httpError['error']
          if (err != null && err['ErrorElementPath'] != undefined && err['ErrorDescription'] != undefined) {
          }
        }
      );
    }
  }
}
