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
import { UtilityService } from '../services/utility.service';
import { threadId } from 'worker_threads';
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
  // @Input() activeBorrowerSeq: string = undefined;
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
  documentTypeGrid = [];
  count: any;
  customerDetils: any;
  addressDetails: any;
  finalOutput: any;
  fieldLst = [];
  documentShow: boolean = false;
  usertask: any;
  isLetterGenrated: boolean = false;
  viewtask: boolean = true;
  letterArray = [];
  generateLetterFlag: boolean = false;
  // letterArray: any = {
  //   "TemplateData": [
  //     {
  //       "SOURCECD": "SANCTION_LETTER",
  //       "EVENT_REFERENCE_NO": "AECB0E139B027AC4E0530100007F3CF5-1",
  //       "TEMPLATECD": "AGREEMENT_LETTER",
  //       "AUDIT_FLAG": "Y",
  //       "TEMPLATE": "<p style=\"text-align: right;\"><span style=\"font-weight: 400;\">Smart Bank</span></p><p style=\"text-align: right;\"><span style=\"font-weight: 400;\">Plot No. 3/G3, Siruseri,</span></p><p style=\"text-align: right;\"><span style=\"font-weight: 400;\">SIPCOT IT Park,</span></p><p style=\"text-align: right;\"><span style=\"font-weight: 400;\">Chennai,&nbsp;</span></p><p style=\"text-align: right;\"><span style=\"font-weight: 400;\">Tamil Nadu 600130</span></p><p style=\"text-align: left;\"><strong>&nbsp;</strong></p><p style=\"text-align: left;\">&nbsp;</p><p style=\"text-align: center;\"><strong>LOAN AGREEMENT</strong></p><p style=\"text-align: center;\">&nbsp;</p><p><span style=\"font-weight: 400;\">This Loan Agreement</span> <span style=\"font-weight: 400;\">(the &ldquo;Agreement&rdquo;) is made and effective as of </span><span style=\"font-weight: 400;\">2020-07-23 00:00:00.0</span><span style=\"font-weight: 400;\">,</span></p><p>&nbsp;</p><p><strong>BETWEEN: </strong> <span style=\"font-weight: 400;\">PARKER PARKER</span><span style=\"font-weight: 400;\"> (the &ldquo;Borrower&rdquo;), aged </span><span style=\"font-weight: 400;\">@AGE</span><span style=\"font-weight: 400;\"> years residing at:</span></p><p>&nbsp;</p><p><span style=\"font-weight: 400;\">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</span><span style=\"font-weight: 400;\">GRTGTRGT 400006</span></p><p>&nbsp;</p><p><strong>AND:&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</strong><span style=\"font-weight: 400;\">Smart Bank (the &ldquo;Lender&rdquo;), a company registered under the Companies Act 1913</span></p><p><span style=\"font-weight: 400;\">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;having its registered office at:</span></p><p>&nbsp;</p><p><span style=\"font-weight: 400;\">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Plot No. 3/G3, Siruseri,&nbsp;</span></p><p><span style=\"font-weight: 400;\">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;SIPCOT IT Park,&nbsp;</span></p><p><span style=\"font-weight: 400;\">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Chennai,&nbsp;</span></p><p><span style=\"font-weight: 400;\">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Tamil Nadu 600130</span></p><p>&nbsp;</p><p><strong>RECITALS</strong></p><p>&nbsp;</p><p><span style=\"font-weight: 400;\">The Borrower, being in need of funds has applied to the Lender for the grant of loan/ credit facilities to the extent of </span><span style=\"font-weight: 400;\">en-US  856469696</span><span style=\"font-weight: 400;\"> for the purpose of </span><span style=\"font-weight: 400;\">COM</span><span style=\"font-weight: 400;\">.&nbsp;</span></p><p>&nbsp;</p><p><span style=\"font-weight: 400;\">AND WHEREAS the Lender has given/ agreed to give Loan/ Credit facilities up to </span><span style=\"font-weight: 400;\"> </span><span style=\"font-weight: 400;\">with Interest</span><span style=\"font-weight: 400;\">8.65</span><span style=\"font-weight: 400;\">for a period of</span><span style=\"font-weight: 400;\">855 MTHS</span><span style=\"font-weight: 400;\">&nbsp;to the Borrower.</span></p>",
  //       "TEMPLATENAME": "CUSTOMERSANTION LETTER",
  //       "SOURCETYPE": "LETTER_GENERATION"
  //     },
  //     {
  //       "SOURCECD": "SANCTION_LETTER",
  //       "EVENT_REFERENCE_NO": "AECB0E139B027AC4E0530100007F3CF5-2",
  //       "TEMPLATECD": "MORTGAGE_LETTER",
  //       "AUDIT_FLAG": "Y",
  //       "TEMPLATE": "<p style=\"text-align: right;\"><span style=\"font-weight: 400;\">Smart Bank</span></p><p style=\"text-align: right;\"><span style=\"font-weight: 400;\">Plot No. 3/G3, Siruseri,</span></p><p style=\"text-align: right;\"><span style=\"font-weight: 400;\">SIPCOT IT Park,</span></p><p style=\"text-align: right;\"><span style=\"font-weight: 400;\">Chennai,&nbsp;</span></p><p style=\"text-align: right;\"><span style=\"font-weight: 400;\">Tamil Nadu 600130</span></p><p style=\"text-align: right;\">&nbsp;</p><p style=\"text-align: center;\"><strong>DEED OF MORTGAGE</strong></p><p><span style=\"font-weight: 400;\">&nbsp;</span></p><p><span style=\"font-weight: 400;\">This Mortgage Deed</span> <span style=\"font-weight: 400;\">(the &ldquo;Agreement&rdquo;) is made and effective as of </span><span style=\"font-weight: 400;\">2020-07-23 00:00:00.0</span><span style=\"font-weight: 400;\">,</span></p><p><span style=\"font-weight: 400;\">&nbsp;</span></p><p><strong>BETWEEN: </strong> <span style=\"font-weight: 400;\">PARKER PARKER</span><span style=\"font-weight: 400;\"> (the &ldquo;Borrower&rdquo;), aged </span><span style=\"font-weight: 400;\">@AGE</span><span style=\"font-weight: 400;\"> years residing at:</span></p><p><span style=\"font-weight: 400;\">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span> <span style=\"font-weight: 400;\">GRTGTRGT 400006</span></p><p><span style=\"font-weight: 400;\">&nbsp;</span></p><p><strong>AND:&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</strong><span style=\"font-weight: 400;\">Smart Bank (the &ldquo;Lender&rdquo;), a company registered under the Companies Act 1913</span></p><p><span style=\"font-weight: 400;\">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; having its registered office at:</span></p><p><span style=\"font-weight: 400;\">&nbsp;</span></p><p><span style=\"font-weight: 400;\">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Plot No. 3/G3, Siruseri,&nbsp;</span></p><p><span style=\"font-weight: 400;\">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; SIPCOT IT Park,&nbsp;</span></p><p><span style=\"font-weight: 400;\">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Chennai,&nbsp;</span></p><p><span style=\"font-weight: 400;\">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Tamil Nadu 600130</span></p><p><span style=\"font-weight: 400;\">&nbsp;</span></p><p><strong>RECITALS</strong></p><p><span style=\"font-weight: 400;\">&nbsp;</span></p><p><span style=\"font-weight: 400;\">The Borrower, being in need of funds has applied to the Lender for the grant of loan/ credit facilities to the extent of </span><span style=\"font-weight: 400;\">[LOAN CURRENCY + LOAN AMOUNT REQUESTED in words and number format] 856469696</span><span style=\"font-weight: 400;\"> for the purpose of </span><span style=\"font-weight: 400;\">COM</span><span style=\"font-weight: 400;\">.&nbsp;</span></p><p><span style=\"font-weight: 400;\">AND WHEREAS the Lender has given/ agreed to give Loan/ Credit facilities up to </span><span style=\"font-weight: 400;\">en-US 856469696 </span><span style=\"font-weight: 400;\">with Interest</span><span style=\"font-weight: 400;\">8.65</span><span style=\"font-weight: 400;\">for a period of</span><span style=\"font-weight: 400;\">855  MTHS</span><span style=\"font-weight: 400;\">&nbsp;to the Borrower by executing a Mortgage for the property situated at:</span></p><p><span style=\"font-weight: 400;\">&nbsp;</span></p><p><span style=\"font-weight: 400;\">@PR_ADDLINE_1@PR_ADDLINE_2@PR_PINCODE</span></p>",
  //       "TEMPLATENAME": "CUSTOMERSANTION LETTER",
  //       "SOURCETYPE": "LETTER_GENERATION"
  //     },
  //     {
  //       "SOURCECD": "SANCTION_LETTER",
  //       "EVENT_REFERENCE_NO": "AECB0E139B027AC4E0530100007F3CF5-3",
  //       "TEMPLATECD": "SANCTION_LETTER",
  //       "AUDIT_FLAG": "Y",
  //       "TEMPLATE": "<p style=\"text-align:right !important\"><B>Hoist Finance</B></p><p style=\"text-align:right !important\"><span >123 Bank Street, 7th Business District</span></p><p style=\"text-align:right !important\"><span >Sweden</span></p><p><br></p><p><span >Ms Lilly Abebe</span></p><p><span >123 Blue, Norrmalm</span></p><p><span >SWEDEN</span></p><p><span >11123.</span></p><p><br></p><p><strong >Subject: Sanction of loan against your application</strong></p><p><br></p><p><span >Dear Ms Lilly,</span></p><p><br></p><p><span >We are glad to inform you that in response to your request for a bank loan in order to meet financial requirements, we have approved your loan.</span></p><p><br></p><p><span >The bank has decided to approve your application of loan for EUR 3,000.00</span></p><p><br></p><p><span >Please see the Loan Details as below:</span></p><p><br></p><p><span style='display: inline-block; width: 180px;'>Loan Product</span><span style='margin: 0 10px;'>:</span><span>Personal Loan - Express Credit Scheme </span></p><p><span style='display: inline-block; width: 180px;'>Loan Amount</span><span style='margin: 0 10px;'>:</span><span>EUR 3,000.00 </span></p><p><span style='display: inline-block; width: 180px;'>Interest Rate</span><span style='margin: 0 10px;'>:</span><span></span>3.20%</span></p><p><span style='display: inline-block; width: 180px;'>Loan Tenor</span><span style='margin: 0 10px;'>:</span><span>24 months</span></p><p><span style='display: inline-block; width: 180px;'>Upfront Fee</span><span style='margin: 0 10px;'>:</span><span>EUR 50</span></p><p><span style='display: inline-block; width: 180px;'>Payment every month</span><span style='margin: 0 10px;'>:</span><span>EUR 129.21</span></p><p><span style='display: inline-block; width: 180px;'>Total Interest</span><span style='margin: 0 10px;'>:</span><span>EUR 101.02</span></p><p><span style='display: inline-block; width: 180px;'>All payments &amp; fee</span><span style='margin: 0 10px;'>:</span><span>EUR 3,151.02</span></p><p><span style='display: inline-block; width: 180px;'>APR for the Loan</span><span style='margin: 0 10px;'>:</span><span>4.843%</span></p><p><br></p><p><span >The terms have been completely outlined in the promissory note. You are requested to visit the Branch and sign it. </span></p><p><span ></span></p><p><span >Sincerely,</span></p><p><span ></span></p><p><span >Branch Manager</span></p>",
  //       "TEMPLATENAME": "CUSTOMERSANTION LETTER",
  //       "SOURCETYPE": "LETTER_GENERATION"
  //     }
  //   ]
  // }
  // configMap = {
  //   "CREATED_BY": "System",
  //   "EVENT_CODE": "SANCTION_LETTER",
  //   "EVENT_TYPE": "LETTER_GENERATION",
  //   "SOURCE_SYSTEM": "RLO"
  // };
  //   letter: any = {
  //     "fieldLst": [
  //         {
  //             "fieldName": "TITLE",
  //             "fieldValue": "MS"
  //         },
  //         {
  //             "fieldName": "FULL_NAME",
  //             "fieldValue": "Lilly Abebe"
  //         },
  //         {
  //             "fieldName": "ADDR1",
  //             "fieldValue": "123, Simpleton village"
  //         },
  //         {
  //             "fieldName": "COUNTRY",
  //             "fieldValue": "Sweden"
  //         },
  //         {
  //             "fieldName": "PINCODE",
  //             "fieldValue": "12345"
  //         },
  //         {
  //             "fieldName": "ARN",
  //             "fieldValue": "ARN00001"
  //         },
  //         {
  //             "fieldName": "LOAN_AMT",
  //             "fieldValue": "75000"
  //         },
  //         {
  //             "fieldName": "PRODUCT_CODE",
  //             "fieldValue": "Personal Loan"
  //         }
  //     ],
  //     "gridLst": null,
  //     "configMap": {
  //         "CREATED_BY": "System",
  //         "EVENT_CODE": "SANCTION_LETTER",
  //         "EVENT_TYPE": "LETTER_GENERATION",
  //         "SOURCE_SYSTEM": "RLO"
  //     },
  //     "dataMap": null
  // }; 

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
  constructor(services: ServiceStock, public utility: UtilityService) {
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

    if (!this.services.rloCommonData.makeDdeDisabled.previousPageOperation) {
      if (this.userId === undefined || this.userId === '') {
        this.claimTask(this.taskId);
      }
    }
    this.services.rloCommonData.makeDdeDisabled.previousPageOperation = false;

    this.fetchStoreLetter();

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

    // console.log("letter data", this.fieldLst);
    // this.fieldLst.push({
    //   "fieldName": "TITLE",
    //   "fieldValue": "new"});
    //   this.fieldLst[0].fieldValue = "mrs"
  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    var styleElement = document.getElementById('Operation_customCss');
    styleElement.parentNode.removeChild(styleElement);
    this.services.rloui.closeAllConfirmationModal();
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.subsBFldsValueUpdates();
      this.onFormLoad();
      this.checkForHTabOverFlow();
      this.getDocumentGridData();
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

  viewDDE() {
    this.services.rloCommonData.makeDdePageDisabled();
    this.services.router.navigate(['home', 'DDE']);
  }

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



  isLoan() {
    if (!this.isLoanCategory) {//ie. loan type credit card
      this.Apved_Limit.setReadOnly(true);
      this.Card_DBR.setReadOnly(true);
      // this.Card_DBR.setHidden(true);
      this.fetchCardDetails();
      // console.log("Card is working");
    }
    else {//CC type loan
      this.DisbustAmt.setReadOnly(true);
      this.LOAN_DBR.setReadOnly(true);
      this.EMI_Amt.setReadOnly(true);
      // this.LOAN_DBR.setHidden(true);
      this.fetchLoanDetails();
      // console.log("loan is working");
    }
  }

  fetchLoanDetails() {
    let inputMap = new Map();
    inputMap.clear();
    let applicationId: any = this.passApplicationId;
    // let applicationId = '2829';
    // let applicationId = '3025';
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
        var resArray
        console.log("DBR", res)
        if (res !== null) {
          for (let i = 0; i <= res.ApplicationScoreDetails.length; i++) {
            resArray = res.ApplicationScoreDetails[i];
            console.log("loop", resArray)
            if (resArray.ScoreId == 'DBR') {
              this.LOAN_DBR.setValue(resArray.Score);
            }
          }
        }
        else {
          this.LOAN_DBR.setValue('0');
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
        var resArray
        // console.log("DBR", res)
        if (res !== null) {
          for (let i = 0; i <= res.ApplicationScoreDetails.length; i++) {
            resArray = res.ApplicationScoreDetails[i];
            console.log("loop", resArray)
            if (resArray.ScoreId == 'DBR') {
              this.Card_DBR.setValue(resArray.Score);
            }
          }
        }
        else {
          this.Card_DBR.setValue('0');
        }
      },
      async (httpError) => {
        var err = httpError['error']
        if (err != null && err['ErrorElementPath'] != undefined && err['ErrorDescription'] != undefined) {
        }
      }
    );
  }
  gerateLetter() {
    if (this.letterArray.length) {
      return;
    }


    let inputMap = new Map();
    inputMap.clear();
    // inputMap.set('Body.interfaceId',"INT010");
    // inputMap.set('Body.INT010', "2688");
    if (this.services.rloCommonData.globalApplicationDtls.TypeOfLoanCode == "ML") {
      inputMap.set('Body.interfaceId', "INT010");
      inputMap.set('Body.prposalid', this.ApplicationId);
    }
    else {
      inputMap.set('Body.interfaceId', "INT011");
      inputMap.set('Body.prposalid', this.ApplicationId);
    }
    this.services.http.fetchApi('/invokeLetterGeneration', 'POST', inputMap, '/rlo-de').subscribe(
      async (httpResponse: HttpResponse<any>) => {
        if (httpResponse.body != null) {
          var res = httpResponse.body;
          console.log("interface res newwwww", res);
          this.fetchStoreLetter();
          this.generateLetterFlag = true;

          // this.finalOutput = res.TemplateData[0];
          // this.services.rloCommonData.isLetterGenrated = true;
          // console.log("final output from lettergenrator", res);
        }
      },
      async (httpError) => {
        var err = httpError['error']
        if (err != null && err['ErrorElementPath'] != undefined && err['ErrorDescription'] != undefined) {
        }
        // this.services.alert.showAlert(2, 'rlo.error.wrong.form', -1);
      }
    );
  }

  fetchStoreLetter() {
    let inputMap = new Map();
    inputMap.clear();
    let applicationId: any = this.passApplicationId;
    // let applicationId = '2958';
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
    this.services.http.fetchApi('/ApplicationLetterDetails', 'GET', inputMap, '/rlo-de').subscribe(
      async (httpResponse: HttpResponse<any>) => {
        var res = httpResponse.body;
        console.log("ressssssssssss", res);
        if (res != null) {
          let letterArray = res.ApplicationLetterDetails;
          for (let index = 0; index < letterArray.length; index++) {
            const element = letterArray[index];
            console.log("new resss", element);
            if (element.LetterMode == "INPRINCIPLE_LETTER") {
              element.TempCode = element.TempCode.replace('_', ' ');
              this.letterArray.push(element);
            }
            if (this.services.rloCommonData.globalApplicationDtls.TypeOfLoanCode == "ML" && element.LetterMode == "SANCTION_LETTER") {
              element.TempCode = element.TempCode.replace('_', ' ');
              this.letterArray.push(element);
            }
            else if (element.LetterMode == "SANCTION_LETTER_CARD") {
              element.TempCode = element.TempCode.replace('_', ' ');
              this.letterArray.push(element)
            }
          }


          // this.letterArray.forEach(element => {
          //   element.TEMPLATECD = element.TEMPLATECD.replace('_', ' ');
          // });
          // this.isLetterGenrated = true;
        }

      },
      async (httpError) => {
        var err = httpError['error']
        if (err != null && err['ErrorElementPath'] != undefined && err['ErrorDescription'] != undefined) {
        }
      }
    );
  }

  fetchLetter(letter) {
    let inputMap = new Map();
    inputMap.clear();
    let requestParams;
    console.log(letter);
    inputMap.set('QueryParam.eventReferenceNo', letter.RefernceNumber);
    inputMap.set('QueryParam.sourceType', letter.LetterType);
    inputMap.set('QueryParam.sourceCd', letter.LetterMode);

    // inputMap.set('QueryParam.eventReferenceNo', "20200730093231022213-4");
    // inputMap.set('QueryParam.sourceType', "AGREEMENT LETTER");
    // inputMap.set('QueryParam.sourceCd', "APPROVAL");
    this.services.http.fetchApi('/fetchLetterManagementAudit', 'GET', inputMap, '/masters').subscribe(
      async (httpResponse: HttpResponse<any>) => {
        var res = httpResponse.body;
        this.LetterArray;
        if (res) {
          this.LetterArray = res.Letter["0"].LETTERMGMTFORMAT;
          let errorMsg = "";
          var mainMessage = this.LetterArray;
          // var button1 = this.services.rloui.getAlertMessage('OK', 'OK');
          var PrintBtn = this.services.rloui.getAlertMessage('PRINT', 'PRINT');
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
          Promise.all([mainMessage, PrintBtn]).then(values => {
            const modalObj: IModalData = {
              title: "Letter",
              // mainMessage: values[0],
              rawHtml: values[0],
              modalSize: "modal-width-lg",
              buttons: [
                { id: 1, text: values[1], type: "success", class: "btn-primary" }
              ]
            }
            this.services.rloui.confirmationModal(modalObj).then((response) => {
              console.log(response);
              if (response != null) {
                if (response.id === 1) {
                  this.services.rloui.closeAllConfirmationModal();
                  // this.services.rloui.printRecords(event);
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
          console.log("new res", res);
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
        this.usertask = res;
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
    if (!this.isLoanCategory || this.letterArray.length) {
      this.generateLetterFlag = true;
    }
    else {
      this.services.alert.showAlert(2, 'rlo.error.generate.letter', -1);
      return;
    }

    inputMap.set('Body.interfaceId', 'INT009');
    inputMap.set('Body.UserId', sessionStorage.getItem('userId'));
    inputMap.set('Body.TENANT_ID', this.HideTenantId.getFieldValue());
    inputMap.set('Body.TaskId', this.taskId);
    inputMap.set('HeaderParam.ProcessId', this.HideProcessId.getFieldValue());
    inputMap.set('Body.direction', 'AP');
    inputMap.set('Body.ApplicationStatus', 'Approve');
    inputMap.set('Body.CurrentStage', 'Operation');
    inputMap.set('Body.ApplicationId', this.ApplicationId);
    inputMap.set('Body.prposalid', this.ApplicationId);
    if(this.services.rloCommonData.globalApplicationDtls.CamType == 'MEMC'){
    if('C'==this.services.rloCommonData.globalApplicationDtls.CustomerType){
    inputMap.set('Body.interfaceId','CORP_CARD_BOOKING');}
    else if('I'==this.services.rloCommonData.globalApplicationDtls.CustomerType){
      inputMap.set('Body.interfaceId','CARD_BOOKING');
    }
  }
    if(this.services.rloCommonData.globalApplicationDtls.CamType == 'LE'){
      inputMap.set('Body.interfaceId','LIMIT_ENHANCEMENT');
    }
    else if (this.services.rloCommonData.globalApplicationDtls.CamType == 'MEMC'){
      inputMap.set('Body.interfaceId','CORP_ADDON');
    }
    inputMap.set('Body.inputdata.downPayment.paymentToBank', '0');
    inputMap.set('Body.inputdata.downPayment.paymentToOthers', '0');
    inputMap.set('Body.inputdata.interestRateDetails.baseRate', '10');
    inputMap.set('Body.inputdata.interestRateDetails.customerSpread', '0');
    inputMap.set('Body.inputdata.interestRateDetails.productSpread', '0');
    inputMap.set('Body.inputdata.interestRateDetails.loanSpread', '0');
    inputMap.set('Body.inputdata.bookingDate', '03-APR-2020');
    inputMap.set('Body.inputdata.noOfInstallments', '60');
    inputMap.set('Body.inputdata.scheduleType', 'S');
    inputMap.set('Body.inputdata.firstRepaymentDate', '06-DEC-2020');
    inputMap.set('HeaderParam.ServiceCode', this.HideServiceCodeComplete.getFieldValue());

    this.services.http.fetchApi('/acceptOperation', 'POST', inputMap, '/rlo-de').subscribe(
      async (httpResponse: HttpResponse<any>) => {
        const res = httpResponse.body;

        if (httpResponse.status == 200) {
          // var title = this.services.rloui.getAlertMessage('rlo.error.invalid.regex');
          var mainMessage = this.services.rloui.getAlertMessage('rlo.success.submit');
          var button1 = this.services.rloui.getAlertMessage('', 'OK');
          // var button2 = this.services.rloui.getAlertMessage('', 'CANCEL');

          Promise.all([mainMessage, button1]).then(values => {
            // console.log(values);
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

        if (httpResponse.status == 200) {
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
                  this.services.rloui.closeAllConfirmationModal()
                  var mainMessage = this.services.rloui.getAlertMessage('rlo.success.withdraw');
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

        if (httpResponse.status == 200) {
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
                  this.services.rloui.closeAllConfirmationModal()
                  var mainMessage = this.services.rloui.getAlertMessage('rlo.success.sentBack');
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
                // if (response.id === 1) {
                //   this.services.router.navigate(['home', 'LANDING']);
                // }
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
    //called whenever the modal is close - need to change it later.
    this.services.rloui.openFileUpload(this.ApplicationId).then((response) => {
      console.log("Modal closed", response);
      if (response) {
        this.getDocumentGridData();
      }
    });
  }

  async OPERATION_CLOSE_click(event) {
    // var title = this.services.rloui.getAlertMessage('rlo.error.invalid.regex');
    var mainMessage = this.services.rloui.getAlertMessage('rlo.cancel.comfirmation');
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

  //get document grid
  getDocumentGridData() {
    let appId = this.ApplicationId;
    //appId = 2483;
    this.utility.getCommonService().getDocumentUploadDtls(appId).subscribe(
      data => {
        if (data['status'] === 'F' || data['Status_Cd'] === 'F') {
          this.services.alert.showAlert(2, '', 3000, 'Unable to get records.');
        } else {
          if (data['DocList']) {
            this.documentTypeGrid = data['DocList'];
            this.count = this.documentTypeGrid.length;
          } else {
            this.documentTypeGrid = [];
            this.count = 0;
          }
        }
      });
  }

  // This method is to download file
  downloadFile(inventoryNumber) {
    this.utility.getCommonService().download(inventoryNumber);
  }
}
