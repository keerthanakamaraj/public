import { Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter, Input, ComponentFactoryResolver, ViewContainerRef, HostListener, QueryList, ViewChildren } from '@angular/core';
import { DDEModel, AddSpecificComponent } from './DDE.model';
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
import { CustomerDtlsComponent } from '../CustomerDtls/CustomerDtls.component';
import { FamilyDetailsFormComponent } from '../FamilyDetailsForm/FamilyDetailsForm.component';
import { AssetDetailsFormComponent } from '../AssetDetailsForm/AssetDetailsForm.component';
import { LiabilityDtlsFormComponent } from '../LiabilityDtlsForm/LiabilityDtlsForm.component';
import { OtherDeductionFormComponent } from '../OtherDeductionForm/OtherDeductionForm.component';
import { IncomeSummaryFormComponent } from '../IncomeSummaryForm/IncomeSummaryForm.component';
import { VisitReportFormComponent } from '../VisitReportForm/VisitReportForm.component';
import { GoNoGoComponent } from '../go-no-go/go-no-go.component';
import { NotepadDetailsFormComponent } from '../NotepadDetailsForm/NotepadDetailsForm.component';
import { DDEHandlerComponent } from '../DDE/DDE-handler.component';
import { CustomerGridDTLSComponent } from '../CustomerGridDTLS/CustomerGridDTLS.component';
import { FamilyDetailsGridComponent } from '../FamilyDetailsGrid/FamilyDetailsGrid.component';
import { ReferralDetailsFormComponent } from '../ReferralDetailsForm/ReferralDetailsForm.component';
import { HeaderProgressComponent } from '../header-progress/header-progress.component';
//import { ReferralDetailsGridComponent } from '../ReferralDetailsGrid/ReferralDetailsGrid.component';
import { each } from '@amcharts/amcharts4/.internal/core/utils/Iterator';
import { ReferralDetailsGridComponent } from '../ReferralDetailsGrid/ReferralDetailsGrid.component';
import { CreditCardDetailsComponent } from '../CreditCardDetails/CreditCardDetails.component';
import { OccupationDtlsFormComponent } from '../OccupationDtlsForm/OccupationDtlsForm.component';
import { AddressDetailsComponent } from '../AddressDetails/AddressDetails.component';
import { PersonalInterviewComponent } from '../PersonalInterview/personal-interview.component'
import { LoanDetailsFormComponent } from '../LoanDetailsForm/LoanDetailsForm.component';
import { LoanDetailsGridComponent } from '../LoanDetailsGrid/LoanDetailsGrid.component';
import { Subscription, forkJoin } from 'rxjs';
import { IComponentLvlData, IComponentSectionValidationData, IFormValidationData, RloCommonData, IGlobalApllicationDtls } from '../rlo-services/rloCommonData.service';
import { ScoreCardComponent } from '../score-card/score-card.component';
import { ApplicationDtlsComponent } from '../ApplicationDtls/ApplicationDtls.component';
import { PolicyCheckResultComponent } from '../policy-check-result/policy-check-result.component';
import { ScoreCardResultComponent } from '../score-card-result/score-card-result.component';
import { PropertyDetailsComponent } from '../PropertyDetails/PropertyDetails.component';
import { IModalData } from '../popup-alert/popup-interface';
import { CollateralParentComponent } from '../collateral/collateral-parent/collateral-parent.component';
import { IheaderScoreCard } from '../Interface/masterInterface';
import { Location } from '@angular/common';
import { EducationLoanDetailsComponent } from '../EducationLoanDetails/EducationLoanDetails.component'
import { VehicleDetailsComponent } from '../VehicleDetails/VehicleDetails.component';
import { GoldDetailsComponent } from '../GoldDetails/GoldDetails.component';
import { InterfaceResultsComponent } from '../interface-results/interface-results.component';
import { BusinessDtlsFormComponent } from '../BusinessDtlsForm/BusinessDtlsForm.component';
import { FDDetailsComponent } from '../FDDetails/FDDetails.component';
import * as _ from 'lodash';
import { CreditCardInputGridComponent } from '../CreditCardInputGrid/CreditCardInputGrid.component';


const customCss: string = '';

@Component({
  selector: 'app-DDE',
  templateUrl: './DDE.component.html'
})
export class DDEComponent extends FormComponent implements OnInit, AfterViewInit {

  @HostListener('window:scroll', ['$event'])
  handleScroll() {
    let windowScroll = window.pageYOffset;
    if (windowScroll >= 280) {
      this.showExpandedHeader = false;
    }
  }

  @ViewChild('FieldId_1', { static: false }) FieldId_1: HeaderComponent;
  @ViewChild('CUST_DTLS', { static: false }) CUST_DTLS: CustomerDtlsComponent;
  @ViewChild('FAMILY_DTLS', { static: false }) FAMILY_DTLS: FamilyDetailsFormComponent;
  @ViewChild('FAMILY_GRID', { static: false }) FAMILY_GRID: FamilyDetailsGridComponent;
  @ViewChild('REFERRER_DTLS', { static: false }) REFERRER_DTLS: ReferralDetailsFormComponent;
  @ViewChild('ReferralDetailsGrid', { static: false }) ReferralDetailsGrid: ReferralDetailsGridComponent;
  @ViewChild('FieldId_14', { static: false }) FieldId_14: AssetDetailsFormComponent;
  @ViewChild('FieldId_15', { static: false }) FieldId_15: LiabilityDtlsFormComponent;
  @ViewChild('FieldId_6', { static: false }) FieldId_6: OtherDeductionFormComponent;
  @ViewChild('FieldId_9', { static: false }) FieldId_9: IncomeSummaryFormComponent;
  @ViewChild('FieldId_16', { static: false }) FieldId_16: VisitReportFormComponent;
  @ViewChild('GoNoGo_Dtls', { static: false }) GoNoGo_Dtls: GoNoGoComponent;
  @ViewChild('CreditCard', { static: false }) CreditCard: CreditCardDetailsComponent;
  @ViewChild('FieldId_13', { static: false }) FieldId_13: NotepadDetailsFormComponent;
  @ViewChild('Submit', { static: false }) Submit: ButtonComponent;
  @ViewChild('Cancel', { static: false }) Cancel: ButtonComponent;
  @ViewChild('Handler', { static: false }) Handler: DDEHandlerComponent;
  @ViewChild('HideProcessId', { static: false }) HideProcessId: HiddenComponent;
  @ViewChild('HideServiceCode', { static: false }) HideServiceCode: HiddenComponent;
  @ViewChild('HideTaskId', { static: false }) HideTaskId: HiddenComponent;
  @ViewChild('HideTenantId', { static: false }) HideTenantId: HiddenComponent;
  @ViewChild('HideUserId', { static: false }) HideUserId: HiddenComponent;
  @ViewChild('CUSTOMER_GRID', { static: false }) CUSTOMER_GRID: CustomerGridDTLSComponent;
  @ViewChild('appDDEFormDirective', { static: true, read: ViewContainerRef }) FormHost: ViewContainerRef;
  @ViewChild('headerProgressBar', { static: false }) headerProgressBar: HeaderProgressComponent;
  @ViewChild('LOAN_DTLS', { static: false }) LOAN_DTLS: LoanDetailsFormComponent;
  @ViewChild('FieldId_26', { static: false }) LOAN_GRID: LoanDetailsGridComponent;
  @ViewChild('scorecard', { static: false }) scoreCardComponent: ScoreCardComponent;
  @ViewChild('HideCurrentStage', { static: false }) HideCurrentStage: HiddenComponent;
  @ViewChild('Application_Dtls', { static: false }) Application_Dtls: ApplicationDtlsComponent;
  @ViewChild('CreditCardInputGrid', { static: false }) CreditCardInputGrid: CreditCardInputGridComponent;
  @Output() familyblur: EventEmitter<any> = new EventEmitter<any>();
  @Input() parentData: IGlobalApllicationDtls = {};
  ApplicationId: string = undefined;
  ActiveBorrowerSeq: number = undefined;
  ActiveCustomerDtls: {} = undefined;
  CustomerDetailsArray: any;
  // fullName: string = undefined;
  // Cust_DOB: string = undefined;
  // ActiveCustomerName: string = undefined;
  // ActiveCustomerDOB: string = undefined;
  // ActiveCustomerMobile: string = undefined;
  isCustomerTab: boolean = true;
  fullName: string = undefined;
  Cust_DOB: string = undefined;
  //ActiveCustomerDtls: {} = undefined;
  //ActiveBorrowerSeq: string = undefined;
  //ActiveCustomerName: string = undefined;
  //ActiveCustomerDOB: string = undefined;
  //ActiveCustomerMobile: string = undefined;
  //isCustomerTab: boolean = true;
  CustomerType: string = undefined;
  isLoanCategory: any = undefined;
  taskId: any;
  instanceId: any;
  userId: any;
  appId: any;
  initiallyCustomersAdded: boolean = false;
  mouseOvered: boolean = false;
  currentCompInstance;
  formMenuObject: {
    selectedMenuId: string,
    selectedMenuComponent: string,
    validBorrowerId: number,
    activeBorrowerSeq?: number,
    validCoBorrowerId?: number,//loanOwnership > 0
    isCustomerTabSelected: boolean,
    firstArr?: number,
    secondArr?: number,
    progressCalcDone: boolean
  } =
    {
      selectedMenuId: "",
      selectedMenuComponent: "",
      isCustomerTabSelected: true,
      firstArr: 0,
      secondArr: 0,
      validCoBorrowerId: 0,
      validBorrowerId: 0,
      progressCalcDone: false
    };

  /**
   * Tags
   */
  @Input() tags: { label: String, text: string }[];


  //list of selected customer and application sections
  completedMenuSectionList = {
    customerSection: new Map(),
    applicationSection: new Map()
  };


  async revalidate(): Promise<number> {
    var totalErrors = 0;
    super.beforeRevalidate();
    await Promise.all([
      this.FieldId_1.revalidate(),
      this.FieldId_10_revalidate(),
      // this.CUSTOMER_GRID.revalidate(),
    ]).then((errorCounts) => {
      errorCounts.forEach((errorCount) => {
        totalErrors += errorCount;
      });
    });
    this.errors = totalErrors;
    super.afterRevalidate();
    return totalErrors;
  }

  customerMenu = [
    [
      { id: "CustomerDetails", name: "Customer Details", completed: false, iconClass: "icon-Customer-Details", isActive: false, isOptional: false },
      { id: "AddressDetails", name: "Address Details", completed: false, iconClass: "icon-Address-Details", isActive: false, isOptional: false },
      { id: "OccupationDetails", name: "Occupation Details", completed: false, iconClass: "icon-Occupation-Details", isActive: false, isOptional: false },
      { id: "FamilyDetails", name: "Family Details", completed: false, iconClass: "icon-Family-Details", isActive: false, isOptional: true }
    ],
    [
      { id: "LiabilityDetails", name: "Liability Details", completed: false, iconClass: "icon-Liability-Details", isActive: false, isOptional: true },
      { id: "AssetDetails", name: "Asset Details", completed: false, iconClass: "icon-Asset-Details", isActive: false, isOptional: true },
      { id: "IncomeSummary", name: "Income Summary", completed: false, iconClass: "icon-Income-Summary", isActive: false, isOptional: true },
      // { id: "CollateralDetails", name: "Collateral Details", completed: false, iconClass: "icon-Collateral-Details", isActive: false, isOptional: true }
    ],
    [
      // { id: "PersonalInterviewDetails", name: "PI Details", completed: false, iconClass: "icon-Personal-Interview-Details", isActive: false, isOptional: true },
      { id: "RmVisitDetails", name: "RM Visit Details", completed: false, iconClass: "icon-RM-Visit-Details", isActive: false, isOptional: true },
    ]
  ];

  applicationMenu = [
    [
      { id: "ApplicationDetails", name: "Application Details", completed: false, iconClass: "icon-Application-Details", isActive: false, isOptional: false },
      // { id: "PropertyDetails", name: "Property Details", completed: false, iconClass: "icon-property", isActive: false, isOptional: true },
      // { id: "VehicalLoanDetails", name: "Vehical Loan Details", completed: false, iconClass: "icon-Vehicle-Loan-Details", isActive: false, isOptional: true },
      // { id: "GoldLoanDetails", name: "Gold Loan Details", completed: false, iconClass: "icon-Vehicle-Loan-Details", isActive: false, isOptional: true },
      // { id: "EducationLoanDetails", name: "Education Loan Details", completed: false, iconClass: "icon-Education-Loan-Details", isActive: false, isOptional: true },
      // { id: "LoanDetails", name: "Loan Details", completed: false, iconClass: "icon-Loan-Details", isActive: false, isOptional: true },
      { id: "FDDetails", name: "FD Details", completed: false, iconClass: "icon-Asset-Details", isActive: false, isOptional: false },
      { id: "CreditCardDetails", name: "Credit Card Details", completed: false, iconClass: "icon-Credit-Card-Details", isActive: false, isOptional: false },
      //{ id: "BusinessDetails", name: "Business Details", completed: false, iconClass: "icon-Credit-Card-Details", isActive: false, isOptional: true },
    ],
    [
      { id: "InterfaceResults", name: "Interface Results", completed: false, iconClass: "icon-Interface-Results", isActive: false, isOptional: true },
      // { id: "ScorecardResults", name: "Scorecard Results", completed: false, iconClass: "icon-Scorecard-Results", isActive: false, isOptional: false },
      // { id: "PolicyCheckResults", name: "Policy Check Results", completed: false, iconClass: "icon-Policy-Check-Results", isActive: false, isOptional: false },
      //{ id: "GoNoGoDetails", name: "Go/No-Go Details", completed: false, iconClass: "icon-No-Go-Details", isActive: false, isOptional: false },
    ],
    [
      { id: "ReferrerDetails", name: "Referral Details", completed: false, iconClass: "icon-Referrer-Details", isActive: false, isOptional: true },
      // { id: "Notes", name: "Notes", completed: false, iconClass: "icon-Notes", isActive: false, isOptional: true }
    ]
  ];

  formsMenuList: Array<any> = [];
  showExpandedHeader: boolean = true;//state of header i.e expanded-1 or collapsed-0 

  progressStatusObject: any = {
    manditorySection: 2,
    completedSection: 0,
    borrowerCompletedSection: 0,
    coBorrowerCompletedSection: 0
  };

  masterDataSubscription: Subscription;
  childToParentSubjectSubscription: Subscription;
  customersList = new Map();

  getDeletedCustomerSubscription: Subscription;

  headerScoreCard: IheaderScoreCard[] = [
    {
      id: "DBR",
      type: "Final DBR",
      score: 0,
    },
    {
      id: "Policy",
      type: "Policy Score",
      score: 0,
    },
    {
      id: "ScoreCard",
      type: "Application Score",
      score: 0,
    }
  ];

  addCustomersToMap(sectionData) {
    console.warn("addCustomersToMap", sectionData);
    if (sectionData.name == "CustomerDetails" && (sectionData.data[0].CustomerType == "B" || sectionData.data[0].CustomerType == "CB")) {
      this.customersList.set(sectionData.BorrowerSeq, sectionData.data[0]);
    }
  }


  //ON FIRST TIME LOAD get all customer details and set menu acc.
  // initGetAllCustomerDetails(customerData: any, customerType: string = '') {
  //     this.CustomerDetailsArray = customerData.data;
  //     if (!this.initiallyCustomersAdded) {
  //         console.log("initGetAllCustomerDetails");
  //         console.error("deep-", customerData);
  //         let list = customerData.data;
  //         list.forEach(customer => {
  //             if (customer.CustomerType == "CB" && customer.LoanOwnership > 0) {
  //                 this.progressStatus.manditorySection += 4;
  //                 this.formMenuObject.validCoBorrowerId = this.getCustomerId(customer.CustomerType, customer.BorrowerSeq)
  //             }
  //         });
  //         console.log("deep", this.progressStatus);
  //         this.formsMenuList = JSON.parse(JSON.stringify(this.customerMenu));;
  //         console.log("deep ===", this.formsMenuList);
  //         this.initiallyCustomersAdded = true;
  //     }
  // }

  // getAllCustomerDetails(customerData) {
  //     console.error("deep-", customerData);
  //     let list = customerData.data;
  //     list.forEach(customer => {
  //         if (customer.CustomerType == "B" || customer.CustomerType == "CB") {
  //             this.progressStatus.borrowers += 1;
  //         }
  //     });
  //     this.createMenuForCustomers().then(() => {
  //         this.formsMenuList = this.setMenuAccToCustomer('borrower');
  //         console.error("deep ====", this.formsMenuList);
  //         this.injectDynamicComponent('CustomDetails', 2, 0);
  //     });
  // }

  disableMenus: boolean = false;//when abt to add new user('+' btn clicked) 

  menuNavigationBtn = {
    enableLeftArrow: false,
    enableRightArrow: true
  }

  allCustomerTypeList: number[] = [];

  constructor(services: ServiceStock, private componentFactoryResolver: ComponentFactoryResolver, private locationRoute: Location) {
    super(services);
    this.services.rloCommonData.initialBorrowerDetailsCallDone = false;//flag set false to do address validation in CustomerGridDTLS > customerListForAddress
    this.value = new DDEModel();
    this.componentCode = 'DDE';
    this.initHTabGroup('FieldId_10', ['BORROWER_TAB', 'VISIT_REF', 'COLATTERAL', 'GO_NO_GO', 'COMMENTS_TAB',], 'GO_NO_GO', 1);
    let totalCustomerList = [];

    //only added for customerDTLS
    this.childToParentSubjectSubscription = this.services.rloCommonData.childToParentSubject.subscribe((event) => {
      switch (event.action) {
        case 'updateCustGrid':
          this.CUSTOMER_GRID.doAPIForCustomerList(event.data);
          event.action = undefined;
          break;
      }
    });

    //////////////////////////////
    this.masterDataSubscription = this.services.rloCommonData.getComponentLvlData().subscribe(data => {
      console.warn("deep === masterDataSubscription", data);
      if (data.name == "CustomerDetails") {
        if (!this.initiallyCustomersAdded)
          this.setInitialObjectData(data);
      }

      this.services.rloCommonData.updateMasterDataMap(data, this.formMenuObject.isCustomerTabSelected).then((sectionResponseObj) => {
        console.log("$$$$$$$$$$", sectionResponseObj);
        this.addRemoveCompletedSection(sectionResponseObj, data).then(response => {
          this.validateAddressForCustomers(data.BorrowerSeq);
        });
      });

      this.updateSectionWiseTags(data);
    });

    this.getDeletedCustomerSubscription = this.services.rloCommonData.getDeletedCustomer().subscribe(customerId => {
      console.error("$$$$$$$$$$$$$$CUSTOMER DELETED$$$$$$$$$$$$$$", customerId);
      let customersList = this.completedMenuSectionList['customerSection'].get(customerId);
      let removeCount = 0;

      if (this.services.rloCommonData.globalApplicationDtls.CustomerType == "C") {
        customersList.forEach(element => {
          if (element == "CustomerDetails" || element == "AddressDetails") {
            removeCount += 1;
          }
        });
        this.progressStatusObject.completedSection -= removeCount;
        this.progressStatusObject.manditorySection -= 2;
        this.updateProgressBar();
      } else if (this.services.rloCommonData.globalApplicationDtls.CustomerType == "I") {
        customersList.forEach(element => {
          if (element == "CustomerDetails" || element == "AddressDetails") {
            removeCount += 1;
          }
        });
        this.progressStatusObject.completedSection -= removeCount;
        this.progressStatusObject.manditorySection -= 2;
        this.updateProgressBar();
      }
    });
  }

  validationSection(dataObj: any) {
    let borrowerSeq = dataObj.BorrowerSeq;
    let sectionName = dataObj.name;
    let tabSection = this.formMenuObject.isCustomerTabSelected ? 'customerSection' : 'applicationSection';

    this.completedMenuSectionList[tabSection]
  }

  setReadOnly(readOnly) {
    super.setBasicFieldsReadOnly(readOnly);
    this.FieldId_1.setReadOnly(readOnly);
    this.CUST_DTLS.setReadOnly(readOnly);
    this.FAMILY_DTLS.setReadOnly(readOnly);
    this.FieldId_14.setReadOnly(readOnly);
    this.FieldId_15.setReadOnly(readOnly);
    this.FieldId_6.setReadOnly(readOnly);
    this.FieldId_9.setReadOnly(readOnly);
    this.FieldId_16.setReadOnly(readOnly);
    this.FieldId_13.setReadOnly(readOnly);
    this.CUSTOMER_GRID.setReadOnly(readOnly);
  }
  async onFormLoad() {
    this.setInputs(this.services.dataStore.getData(this.services.routing.currModal));
    this.HideProcessId.setValue('RLO_Process');
    this.HideServiceCode.setValue('ClaimTask');
    this.HideTenantId.setValue('SB1');
    this.HideCurrentStage.setValue('DDE');
    this.taskId = this.services.dataStore.getRouteParam(this.services.routing.currModal, 'taskId');
    this.instanceId = this.services.dataStore.getRouteParam(this.services.routing.currModal, 'instanceId');
    this.userId = this.services.dataStore.getRouteParam(this.services.routing.currModal, 'userId');
    this.ApplicationId = this.services.dataStore.getRouteParam(this.services.routing.currModal, 'appId');



    this.CUSTOMER_GRID.ApplicationId = this.ApplicationId;
    this.CUSTOMER_GRID.parentFormCode = this.componentCode;
    this.CUSTOMER_GRID.doAPIForCustomerList({});
    if (!this.services.rloCommonData.makeDdeDisabled.ddeDisabled) {
      //claim task code here  
      if (this.userId === undefined || this.userId == '') {
        this.claimTask(this.taskId);
      }
    }
    this.setDependencies();
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
          this.services.alert.showAlert(1, 'rlo.success.claim.dde', 5000);
          this.userId = sessionStorage.getItem('userId')
        } else {
          this.services.alert.showAlert(2, 'rlo.error.claim.dde', -1);
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
        this.services.alert.showAlert(2, 'rlo.error.claim.dde', -1);
      }
    );
  }

  setInputs(param: any) {
    let params = this.services.http.mapToJson(param);
    if (params['mode']) {
      this.mode = params['mode'];
    }
  }

  async submitForm(path, apiCode, serviceCode) {
    this.submitData['formName'] = 'Details Data Entry';
    await super.submit(path, apiCode, serviceCode);
  }
  getFieldInfo() {
    this.amountComponent.forEach(field => { this.additionalInfo[field.fieldID + '_desc'] = field.getFieldInfo(); });
    this.comboFields.forEach(field => { this.additionalInfo[field.fieldID + '_desc'] = field.getFieldInfo(); });
    this.fileUploadFields.forEach(field => { this.additionalInfo[field.fieldID + '_desc'] = field.getFieldInfo(); });
    this.additionalInfo['FieldId_1_desc'] = this.FieldId_1.getFieldInfo();
    this.additionalInfo['CUST_DTLS_desc'] = this.CUST_DTLS.getFieldInfo();
    this.additionalInfo['FAMILY_DTLS_desc'] = this.FAMILY_DTLS.getFieldInfo();
    this.additionalInfo['FieldId_14_desc'] = this.FieldId_14.getFieldInfo();
    this.additionalInfo['FieldId_15_desc'] = this.FieldId_15.getFieldInfo();
    this.additionalInfo['FieldId_6_desc'] = this.FieldId_6.getFieldInfo();
    this.additionalInfo['FieldId_9_desc'] = this.FieldId_9.getFieldInfo();
    this.additionalInfo['FieldId_16_desc'] = this.FieldId_16.getFieldInfo();
    this.additionalInfo['FieldId_13_desc'] = this.FieldId_13.getFieldInfo();
    this.additionalInfo['CUSTOMER_GRID_desc'] = this.CUSTOMER_GRID.getFieldInfo();
    return this.additionalInfo;
  }

  getFieldValue() {
    this.value.FieldId_1 = this.FieldId_1.getFieldValue();
    this.value.CUST_DTLS = this.CUST_DTLS.getFieldValue();
    this.value.FAMILY_DTLS = this.FAMILY_DTLS.getFieldValue();
    this.value.FieldId_14 = this.FieldId_14.getFieldValue();
    this.value.FieldId_15 = this.FieldId_15.getFieldValue();
    this.value.FieldId_6 = this.FieldId_6.getFieldValue();
    this.value.FieldId_9 = this.FieldId_9.getFieldValue();
    this.value.FieldId_16 = this.FieldId_16.getFieldValue();
    this.value.FieldId_13 = this.FieldId_13.getFieldValue();
    this.value.CUSTOMER_GRID = this.CUSTOMER_GRID.getFieldValue();
    return this.value;
  }

  setValue(inputValue, inputDesc = undefined) {
    this.setBasicFieldsValue(inputValue, inputDesc);
    this.FieldId_1.setValue(inputValue['FieldId_1'], inputDesc['FieldId_1_desc']);
    this.CUST_DTLS.setValue(inputValue['CUST_DTLS'], inputDesc['CUST_DTLS_desc']);
    this.FAMILY_DTLS.setValue(inputValue['FAMILY_DTLS'], inputDesc['FAMILY_DTLS_desc']);
    this.FieldId_14.setValue(inputValue['FieldId_14'], inputDesc['FieldId_14_desc']);
    this.FieldId_15.setValue(inputValue['FieldId_15'], inputDesc['FieldId_15_desc']);
    this.FieldId_6.setValue(inputValue['FieldId_6'], inputDesc['FieldId_6_desc']);
    this.FieldId_9.setValue(inputValue['FieldId_9'], inputDesc['FieldId_9_desc']);
    this.FieldId_16.setValue(inputValue['FieldId_16'], inputDesc['FieldId_16_desc']);
    this.FieldId_13.setValue(inputValue['FieldId_13'], inputDesc['FieldId_13_desc']);
    this.CUSTOMER_GRID.setValue(inputValue['CUSTOMER_GRID'], inputDesc['CUSTOMER_GRID_desc']);
    this.value = new DDEModel();
    this.value.setValue(inputValue);
    this.setDependencies();
    this.passNewValue(this.value);
  }

  ngOnInit() {
    if (this.formCode == undefined) { this.formCode = 'DDE'; }
    if (this.formOnLoadError) { return; }
    var styleElement = document.createElement('style');
    styleElement.type = 'text/css';
    styleElement.innerHTML = customCss;
    styleElement.id = 'DDE_customCss';
    document.getElementsByTagName('head')[0].appendChild(styleElement);
    //this.onFormLoad();
    this.ApplicationId = this.services.dataStore.getRouteParam(this.services.routing.currModal, 'appId');
    this.formsMenuList = JSON.parse(JSON.stringify(this.customerMenu));
    this.injectDynamicComponent('CustomerDetails', false, 0, 0);
    this.services.rloCommonData.getCurrentRoute();

    //only when navigating to DDE from Operations
    if (this.services.rloCommonData.makeDdeDisabled.ddeDisabled) {
      this.readOnly = true;
      this.setReadOnly(this.readOnly);
    }

    //Changes for canara
    //this.getScores();//get scores on page load
  }

  ngOnDestroy() {
    this.services.rloCommonData.initialBorrowerDetailsCallDone = false;
    this.services.rloCommonData.customerListForAddress.clear();
    this.services.rloCommonData.LienAmt = 0; // resetting lien amt captured at Fd details
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    var styleElement = document.getElementById('DDE_customCss');
    styleElement.parentNode.removeChild(styleElement);
    this.services.rloCommonData.resetMapData();
    this.masterDataSubscription.unsubscribe();
    this.getDeletedCustomerSubscription.unsubscribe();
    this.childToParentSubjectSubscription.unsubscribe();
    this.services.rloui.closeAllConfirmationModal();

    //is disabled when navigating to DDE from operations
    if (this.services.rloCommonData.makeDdeDisabled.ddeDisabled) {
      this.services.rloCommonData.makeDdeDisabled.ddeDisabled = false;
      this.services.rloCommonData.makeDdeDisabled.previousPageOperation = true;
    }

  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.subsBFldsValueUpdates();
      this.value.FieldId_1 = this.FieldId_1.getFieldValue();
      this.FieldId_1.valueChangeUpdates().subscribe((value) => { this.value.FieldId_1 = value; });
      //  this.value.CUST_DTLS = this.CUST_DTLS.getFieldValue();
      //  this.CUST_DTLS.valueChangeUpdates().subscribe((value) => { this.value.CUST_DTLS = value; });
      // this.value.FAMILY_DTLS = this.FAMILY_DTLS.getFieldValue();
      // this.FAMILY_DTLS.valueChangeUpdates().subscribe((value) => { this.value.FAMILY_DTLS = value; });
      // this.value.FieldId_14 = this.FieldId_14.getFieldValue();
      // this.FieldId_14.valueChangeUpdates().subscribe((value) => { this.value.FieldId_14 = value; });
      // this.value.FieldId_15 = this.FieldId_15.getFieldValue();
      // this.FieldId_15.valueChangeUpdates().subscribe((value) => { this.value.FieldId_15 = value; });
      // this.value.FieldId_6 = this.FieldId_6.getFieldValue();
      // this.FieldId_6.valueChangeUpdates().subscribe((value) => { this.value.FieldId_6 = value; });
      // this.value.FieldId_9 = this.FieldId_9.getFieldValue();
      // this.FieldId_9.valueChangeUpdates().subscribe((value) => { this.value.FieldId_9 = value; });
      // this.value.FieldId_16 = this.FieldId_16.getFieldValue();
      // this.FieldId_16.valueChangeUpdates().subscribe((value) => { this.value.FieldId_16 = value; });
      // this.value.FieldId_13 = this.FieldId_13.getFieldValue();
      // this.FieldId_13.valueChangeUpdates().subscribe((value) => { this.value.FieldId_13 = value; });
      this.value.CUSTOMER_GRID = this.CUSTOMER_GRID.getFieldValue();
      this.CUSTOMER_GRID.valueChangeUpdates().subscribe((value) => { this.value.CUSTOMER_GRID = value; });
      // this.onFormLoad();
      // this.checkForHTabOverFlow();
    });

    // setTimeout(() => {
    //   window.scrollTo(0, 0);
    // }, 3000);

    this.onFormLoad();
  }
  clearError() {
    super.clearBasicFieldsError();
    super.clearHTabErrors();
    super.clearVTabErrors();
    this.FieldId_1.clearError();
    this.CUST_DTLS.clearError();
    this.FAMILY_DTLS.clearError();
    this.FieldId_14.clearError();
    this.FieldId_15.clearError();
    this.FieldId_6.clearError();
    this.FieldId_9.clearError();
    this.CUSTOMER_GRID.clearError();
    this.FieldId_16.clearError();
    this.FieldId_13.clearError();
    this.errors = 0;
    this.errorMessage = [];
  }
  onReset() {
    super.resetBasicFields();
    this.FieldId_1.onReset();
    this.CUST_DTLS.onReset();
    this.FAMILY_DTLS.onReset();
    this.FieldId_14.onReset();
    this.FieldId_15.onReset();
    this.FieldId_6.onReset();
    this.FieldId_9.onReset();
    this.FieldId_16.onReset();
    this.FieldId_13.onReset();
    // this.CUSTOMER_GRID.onReset();
    this.clearHTabErrors();
    this.clearVTabErrors();
    this.errors = 0;
    this.errorMessage = [];
    this.additionalInfo = undefined;
    this.dependencyMap.clear();
    this.value = new DDEModel();
    this.passNewValue(this.value);
    this.setReadOnly(false);
    this.onFormLoad();
  }
  async BORROWER_TAB_revalidate(): Promise<number> {
    var totalErrors = 0;
    await Promise.all([
      this.CUST_DTLS.revalidate(),
      this.FAMILY_DTLS.revalidate(),
      this.FieldId_14.revalidate(),
      this.FieldId_15.revalidate(),
      this.FieldId_6.revalidate(),
      this.FieldId_9.revalidate(),
    ]).then((errorCounts) => {
      errorCounts.forEach((errorCount) => {
        totalErrors += errorCount;
      });
    });
    this.hTabGroups['FieldId_10'].tabs['BORROWER_TAB'].errorCount = totalErrors;
    return totalErrors;
  }
  async VISIT_REF_revalidate(): Promise<number> {
    var totalErrors = 0;
    await Promise.all([
      this.FieldId_16.revalidate(),
    ]).then((errorCounts) => {
      errorCounts.forEach((errorCount) => {
        totalErrors += errorCount;
      });
    });
    this.hTabGroups['FieldId_10'].tabs['VISIT_REF'].errorCount = totalErrors;
    return totalErrors;
  }
  async COLATTERAL_revalidate(): Promise<number> {
    var totalErrors = 0;
    await Promise.all([
    ]).then((errorCounts) => {
      errorCounts.forEach((errorCount) => {
        totalErrors += errorCount;
      });
    });
    this.hTabGroups['FieldId_10'].tabs['COLATTERAL'].errorCount = totalErrors;
    return totalErrors;
  }
  async GO_NO_GO_revalidate(): Promise<number> {
    var totalErrors = 0;
    await Promise.all([
    ]).then((errorCounts) => {
      errorCounts.forEach((errorCount) => {
        totalErrors += errorCount;
      });
    });
    this.hTabGroups['FieldId_10'].tabs['GO_NO_GO'].errorCount = totalErrors;
    return totalErrors;
  }
  async COMMENTS_TAB_revalidate(): Promise<number> {
    var totalErrors = 0;
    await Promise.all([
      this.FieldId_13.revalidate(),
    ]).then((errorCounts) => {
      errorCounts.forEach((errorCount) => {
        totalErrors += errorCount;
      });
    });
    this.hTabGroups['FieldId_10'].tabs['COMMENTS_TAB'].errorCount = totalErrors;
    return totalErrors;
  }
  async FieldId_10_revalidate(): Promise<number> {
    var totalErrors = 0;
    await Promise.all([
      this.BORROWER_TAB_revalidate(),
      this.VISIT_REF_revalidate(),
      this.COLATTERAL_revalidate(),
      this.GO_NO_GO_revalidate(),
      this.COMMENTS_TAB_revalidate(),
    ]).then((errorCounts) => {
      errorCounts.forEach((errorCount) => {
        totalErrors += errorCount;
      });
    });
    return totalErrors;
  }
  // async CUSTOMER_DETAILS_passBorrowerSeq(event) {
  //     let inputMap = new Map();
  //     await this.FAMILY_DTLS.FAMILY_GRID.gridDataLoad({
  //         'passFamilyGrid': event.BorrowerSeq,

  //     });
  //     // this.FAMILY_DTLS.Cust_FullName = event.CustomerArray.FullName;
  //     // this.FAMILY_DTLS.familyBorrowerSeq = event.BorrowerSeq;
  //     // await this.REFERRER_DTLS.ReferralDetailsGrid.gridDataLoad({
  //     //     'ReferrerSeqToGrid': event.BorrowerSeq,

  //     // });
  //     // this.REFERRER_DTLS.familyBorrowerSeq = event.BorrowerSeq;
  // }

  async CUST_DTLS_updateCustGrid(event) {
    console.log("Calling update customer grid Emitter");
    this.CUSTOMER_GRID.doAPIForCustomerList(event);
    // this.CUSTOMER_DETAILS.customerDetailMap = this.FieldId_9.doAPIForCustomerList(event)
  }
  async CUSTOMER_GRID_selectCustId(event) {
    let inputMap = new Map();
    this.CUST_DTLS.CUST_DTLS_GRID_custDtlsEdit(event);
  }

  //when click on "+" to add new user
  async CUSTOMER_GRID_resetCustForm(event) {
    this.ActiveCustomerDtls = undefined;
    this.ActiveBorrowerSeq = undefined;
    this.CustomerType = event.customerType;
    //this.doCardTypeBasedChanges();
    this.validateSectionForCustomer();

    this.setTags([]);

    this.reCalculateMenuSections(this.ActiveBorrowerSeq, true);

    this.injectDynamicComponent('CustomerDetails', false, 0, 0);
    this.disableMenus = true;
    //this.CUST_DTLS.setNewCustomerFrom(event);
  }



  //triggered when clicked - edit btn(b,cb,etc) and when first time loaded and on form save success(customerDTLS) and del.
  async CUSTOMER_GRID_passArrayToCustomer(event) {
    console.log("CUSTOMER_GRID_passArrayToCustomer");
    console.log(event);
    let singleCustomer = [];
    this.ActiveCustomerDtls = event.CustomerArray;
    this.ActiveBorrowerSeq = event.CustomerArray.BorrowerSeq;
    this.CustomerType = event.CustomerArray.CustomerType;
    await this.validateSectionForCustomer();
    //this.doCardTypeBasedChanges();
    // this.ActiveCustomerName = event.CustomerArray.FullName;
    // this.ActiveCustomerDOB = event.CustomerArray.DOB;
    // this.ActiveCustomerMobile = event.CustomerArray.MobileNo;

    console.log(this.formMenuObject);
    if (this.formMenuObject.activeBorrowerSeq == this.ActiveBorrowerSeq) {
      if (this.disableMenus) {
        this.reCalculateMenuSections(this.ActiveBorrowerSeq);
      }
    } else {
      this.formMenuObject.activeBorrowerSeq = this.ActiveBorrowerSeq;
      // if (this.completedMenuSectionList.customerSection.size || this.completedMenuSectionList.applicationSection.size)
      this.reCalculateMenuSections(this.ActiveBorrowerSeq, false);
    }

    //passes customer data
    singleCustomer.push(event.CustomerArray);

    let obj = {
      "name": "CustomerDetails",
      "data": singleCustomer,
      "BorrowerSeq": event.CustomerArray.BorrowerSeq,
    }
    this.services.rloCommonData.globalComponentLvlDataHandler(obj);

    this.disableMenus = false;
    this.injectDynamicComponent('CustomerDetails', false, 0, 0);
  }

  getCustomerId(customerType, borrowerSeq): string {
    return customerType + "_" + borrowerSeq;
  }

  reCalculateMenuSections(activeBorrowerSeq, addingNewUser: boolean = false) {
    console.warn("deep", activeBorrowerSeq, this.formMenuObject.isCustomerTabSelected);
    let alreadyCompletedSectionList;

    if (!addingNewUser) {
      if (this.formMenuObject.isCustomerTabSelected) {
        alreadyCompletedSectionList = this.completedMenuSectionList.customerSection.get(activeBorrowerSeq);
        let formsMenuList = this.customerMenu;
        if (this.services.rloCommonData.globalApplicationDtls.CustomerType == "C") {
          formsMenuList.forEach(element => {
            for (let i = 0; i < element.length; i++) {
              const section = element[i];
              section.isActive = false;

              if (section.id == 'FamilyDetails' || section.id == 'LiabilityDetails' || section.id == 'AssetDetails' || section.id == 'IncomeSummary' || section.id == 'RmVisitDetails') {
                element.splice(i, 1);
                i--;
              }
            }
          });
        } else if (this.services.rloCommonData.globalApplicationDtls.CustomerType == "I") {
          formsMenuList.forEach(element => {
            for (let i = 0; i < element.length; i++) {
              const section = element[i];
              section.isActive = false;

              if (this.services.rloCommonData.globalApplicationDtls.isChannelApplication && section.id == 'RmVisitDetails') {
                section.isOptional = false;
              }
            }
          });
        }
        this.updateRoleBasedMenuData(alreadyCompletedSectionList);
      }
    }
    else {
      console.warn(this.CustomerType);
      //Corporate Member
      if (this.CustomerType == "A" && this.services.rloCommonData.globalApplicationDtls.CustomerType == "C") {
        let formsMenuList = this.customerMenu;
        formsMenuList.forEach(element => {
          for (let i = 0; i < element.length; i++) {
            const section = element[i];
            section.isActive = false;

            if (section.id == 'FamilyDetails' || section.id == 'LiabilityDetails' || section.id == 'AssetDetails' || section.id == 'IncomeSummary' || section.id == 'RmVisitDetails') {
              // section.isOptional = true;
              element.splice(i, 1);
              i--;
            }
          }
        });
      }
      // this.updateRoleBasedMenuData(undefined);
    }
  }

  updateRoleBasedMenuData(alreadyCompletedSections: any) {
    let formsMenuList = JSON.parse(JSON.stringify(this.customerMenu));//refresh data
    for (let i = 0; i < formsMenuList.length; i++) {
      let subEle = formsMenuList[i];
      for (let j = 0; j < subEle.length; j++) {
        let element = subEle[j];
        if (this.CustomerType == 'G') {
          if (element.id != "AddressDetails" && element.id != "CustomerDetails")
            element.isOptional = true;
        } else if (this.CustomerType == 'OP') {
          if (element.id != "CustomerDetails")
            element.isOptional = true;
        }

        if (alreadyCompletedSections != undefined) {
          console.log(alreadyCompletedSections.includes(element.id))
          if (alreadyCompletedSections.includes(element.id)) {
            element.completed = true;
          }
        }
      }
    }
    this.formsMenuList = JSON.parse(JSON.stringify(formsMenuList));
    console.log(this.formsMenuList);
  }


  // async FAMILY_DTLS_familyBlur(event) {
  //     console.log("Calling this Emitter", this.Cust_FullName);
  //     this.Cust_FullName;
  //     this.Cust_DOB;
  // }

  async Submit_click(event) {
    let inputMap = new Map();
    inputMap.clear();
  }

  // brodcastApplicationId() {
  //     this.CUSTOMER_GRID.ApplicationId = this.ApplicationId;
  // }

  injectDynamicComponent(componentId: string, isMenuDisabled: boolean, ele1?: number, ele2?: number) {

    if (isMenuDisabled)
      return;

    this.formsMenuList.forEach(element => { element.forEach(ele => { ele.isActive = false; }); });
    this.formsMenuList[ele1][ele2].isActive = true;

    this.formMenuObject.firstArr = ele1;
    this.formMenuObject.secondArr = ele2;
    this.formMenuObject.selectedMenuComponent = this.formsMenuList[ele1][ele2].name;
    this.formMenuObject.selectedMenuId = this.formsMenuList[ele1][ele2].id;

    const componentRef = this.getComponentClassRef(componentId);
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentRef.component);

    const viewContainerRef = this.FormHost;
    viewContainerRef.clear();

    const dynamicComponent = viewContainerRef.createComponent(componentFactory);
    var componentInstance = dynamicComponent.instance;
    this.currentCompInstance = componentInstance;
    componentInstance.ApplicationId = this.ApplicationId;
    componentInstance.isLoanCategory = this.isLoanCategory;
    componentInstance.parentFormCode = this.componentCode;
    componentInstance.borrowerSeq = this.formMenuObject.activeBorrowerSeq;

    //applied only when user comes to DDE from operations page
    if (this.readOnly)
      componentInstance.readOnly = this.readOnly;

    // reset the tags
    this.setTags([]);

    // on tab switched or section switched or passArray Emitter called
    if (componentId == 'CustomerDetails') {
      if (this.ActiveCustomerDtls != undefined) {
        setTimeout(() => {
          componentInstance.LoadCustomerDetailsonFormLoad(this.ActiveCustomerDtls);
        }, 500);
      } else if (this.CustomerType !== 'B' && this.ActiveCustomerDtls == undefined) {
        // method will be called for new customer form after section switch
        let data = { 'customerType': this.CustomerType };
        setTimeout(() => {
          componentInstance.setNewCustomerFrom(data);
        }, 500);
      }
      this.setCustomerTags();
    }

    if (this.isCustomerTab && this.ActiveBorrowerSeq != undefined) {
      componentInstance.activeBorrowerSeq = this.ActiveBorrowerSeq;
      componentInstance.activeApplicantType = this.CustomerType;
    }
    // if (componentId == 'FamilyDetails') {
    //     componentInstance.ActiveCustomerDtls = this.ActiveCustomerDtls;
    // }
    // if (componentInstance.componentCode == "LoanDetailsForm" || componentId == 'ReferrerDetails') {
    //     componentInstance.CustomerDetailsArray = this.CustomerDetailsArray;
    // }

    if (componentId == 'CollateralDetails') {
      componentInstance.trnProposalId = this.ApplicationId;
    }

    this.services.rloCommonData.dynamicComponentInstance = componentInstance;

    this.validateMenuNavigation(ele1, ele2, this.formMenuObject.selectedMenuId);

    // const activePanel = document.getElementsByClassName("injected-component");
    // const firstInput = activePanel[0].getElementsByTagName('input')[0];
    // if (firstInput != undefined)
    //   firstInput.focus();

    if (this.formMenuObject.isCustomerTabSelected) {
      setTimeout(() => {
        const element = document.getElementById('SelectedComponentName');
        if (!this.showExpandedHeader)
          window.scroll({ top: 260, left: 0, behavior: 'smooth' });
      }, 100);
    }
    else {
      setTimeout(() => {
        if (!this.showExpandedHeader)
          window.scroll({ top: 150, left: 0, behavior: 'smooth' });
      }, 100);
    }
  }

  updateRoleBasedScore(action: string, firstArrayIndex: number, SecondArrayIndex: number) {
    console.error("DEEP | updateRoleBasedScore", action, this.CustomerType);
    if (this.formMenuObject.isCustomerTabSelected) {
      if (this.CustomerType == "B") {
        this.calculateScore(action, firstArrayIndex, SecondArrayIndex);
      }
      else if (this.CustomerType == "CB" && this.formMenuObject.validCoBorrowerId == this.formMenuObject.activeBorrowerSeq) {
        console.error("@@@@@@@@@@@@@@@@ CB with LO");
        this.calculateScore(action, firstArrayIndex, SecondArrayIndex);
      } else if (this.CustomerType == "A") {
        console.error("@@@@@@@@@@@@@@@@ Addon");
        this.calculateScore(action, firstArrayIndex, SecondArrayIndex);
      }
    }
    else {
      this.calculateScore(action, firstArrayIndex, SecondArrayIndex);
    }
  }

  getComponentClassRef(componentId: string): AddSpecificComponent {
    switch (componentId) {
      case 'CustomerDetails':
        return new AddSpecificComponent(CustomerDtlsComponent);
        break;

      case 'FamilyDetails':
        return new AddSpecificComponent(FamilyDetailsFormComponent);
        break;

      case 'LiabilityDetails':
        return new AddSpecificComponent(LiabilityDtlsFormComponent);
        break;

      case 'AssetDetails':
        return new AddSpecificComponent(AssetDetailsFormComponent);
        break;

      case 'IncomeSummary':
        return new AddSpecificComponent(IncomeSummaryFormComponent);
        break;
      case 'CollateralDetails':
        return new AddSpecificComponent(CollateralParentComponent);
        break;
      case 'GoNoGoDetails':
        return new AddSpecificComponent(GoNoGoComponent);
        break;
      case 'ReferrerDetails':
        return new AddSpecificComponent(ReferralDetailsFormComponent);
        break;
      case 'CreditCardDetails':
        return new AddSpecificComponent(CreditCardDetailsComponent);
        break;
      case 'AddressDetails':
        return new AddSpecificComponent(AddressDetailsComponent);
        break;
      case 'OccupationDetails':
        return new AddSpecificComponent(OccupationDtlsFormComponent);
        break;
      case 'LoanDetails':
        return new AddSpecificComponent(LoanDetailsFormComponent);
        break;
      case 'PersonalInterviewDetails':
        return new AddSpecificComponent(PersonalInterviewComponent);
        break;
      case 'RmVisitDetails':
        return new AddSpecificComponent(VisitReportFormComponent);
        break;
      case 'Notes':
        return new AddSpecificComponent(NotepadDetailsFormComponent);
        break;
      case 'ApplicationDetails':
        return new AddSpecificComponent(ApplicationDtlsComponent);
        break;
      case 'ScorecardResults':
        return new AddSpecificComponent(ScoreCardResultComponent);
        break;
      case 'PolicyCheckResults':
        return new AddSpecificComponent(PolicyCheckResultComponent);
        break;
      case 'PropertyDetails':
        return new AddSpecificComponent(PropertyDetailsComponent);
        break;
      case 'EducationLoanDetails':
        return new AddSpecificComponent(EducationLoanDetailsComponent);
        break;
      case 'VehicalLoanDetails':
        return new AddSpecificComponent(VehicleDetailsComponent);
        break;
      case 'GoldLoanDetails':
        return new AddSpecificComponent(GoldDetailsComponent);
        break;
      case 'InterfaceResults':
        return new AddSpecificComponent(InterfaceResultsComponent);
        break;
      case 'BusinessDetails':
        return new AddSpecificComponent(BusinessDtlsFormComponent);
        break;
      case 'FDDetails':
        return new AddSpecificComponent(FDDetailsComponent);
        break;
      default:
        return new AddSpecificComponent(CustomerDtlsComponent);
        break;
    }
  }

  tabSwitched(tabName: string) {
    let defaultSection: string;
    this.updateSelectedTabIndex(0, 0);

    if (tabName == "customer") {
      console.warn(this.completedMenuSectionList, this.ActiveBorrowerSeq);
      this.formMenuObject.isCustomerTabSelected = true;
      let updatedCustomerFormMenu = _.cloneDeep(this.formsMenuList);
      this.formsMenuList = this.customerMenu;
      this.reCalculateMenuSections(this.ActiveBorrowerSeq, false);
      defaultSection = 'CustomerDetails';
      // let data = { 'borrowerSeq': this.ActiveBorrowerSeq }
      this.CUSTOMER_GRID.isFirstAPICall = true;
      this.CUSTOMER_GRID.doAPIForCustomerList({});
      //this.injectDynamicComponent(defaultSection, false, 0, 0);
    }
    else {
      this.formMenuObject.isCustomerTabSelected = false;
      this.formsMenuList = this.applicationMenu;
      this.injectDynamicComponent('ApplicationDetails', false, 0, 0);
    }
  }

  updateSelectedTabIndex(firstArrayIndex: number, secondArrayIndex: number): void {
    this.formMenuObject.firstArr = firstArrayIndex;
    this.formMenuObject.secondArr = secondArrayIndex;
  }


  //going back and forth via btns
  async loadForm(loadDirection: string, firstArrayIndex: number = -1, secondArrayIndex: number = -1) {
    console.log(this.formMenuObject, loadDirection, this.formsMenuList);

    let firstArray = firstArrayIndex == -1 ? this.formMenuObject.firstArr : firstArrayIndex;
    let secondArray = secondArrayIndex == -1 ? this.formMenuObject.secondArr : secondArrayIndex;
    let selectedIndex = -1;

    if (this.disableMenus)
      return;

    if (loadDirection == 'nxt') {
      if (this.menuNavigationBtn.enableRightArrow) {
        for (let j = 0; j < this.formsMenuList[firstArray].length; j++) {
          const arrEle = this.formsMenuList[firstArray][j];
          if (j >= secondArray && !arrEle.isActive && !arrEle.completed && selectedIndex == -1) {
            this.injectDynamicComponent(arrEle.id, false, firstArray, j);
            selectedIndex = j;
          }
        }
        if (selectedIndex == -1) {
          let sIndex;
          if (this.formsMenuList.length - 1 == firstArray) {
            sIndex = 0;
            let modalObj = {
              title: "Alert",
              mainMessage: "No more section avaliable",
              modalSize: "modal-width-sm",
              buttons: [
                { id: 1, text: "Okay", type: "success", class: "btn-primary" },
              ]
            }
            this.services.rloui.confirmationModal(modalObj).then((response) => {
              if (response != null) {
                this.services.rloui.closeAllConfirmationModal();
              }
            });
          } else {
            sIndex = firstArray + 1;
            this.loadForm('nxt', sIndex, 0);
          }
        }
      }
    }
    else {
      if (this.menuNavigationBtn.enableLeftArrow) {
        for (let j = this.formsMenuList[firstArray].length - 1; j >= 0; j--) {
          const arrEle = this.formsMenuList[firstArray][j];
          if (j <= secondArray && !arrEle.isActive && !arrEle.completed && selectedIndex == -1) {
            this.injectDynamicComponent(arrEle.id, false, firstArray, j);
            selectedIndex = j;
          }
        }
        if (selectedIndex == -1) {
          let sIndex;
          if (firstArray == 0) {
            sIndex = this.formsMenuList.length - 1;
            let modalObj = {
              title: "Alert",
              mainMessage: "No more section avaliable",
              modalSize: "modal-width-sm",
              buttons: [
                { id: 1, text: "Okay", type: "success", class: "btn-primary" },
              ]
            }
            this.services.rloui.confirmationModal(modalObj).then((response) => {
              if (response != null) {
                this.services.rloui.closeAllConfirmationModal();
              }
            });
          } else {
            sIndex = firstArray - 1;
            this.loadForm('prev', sIndex, this.formsMenuList[sIndex].length - 1);
          }
        }
      }
    }
  }

  goBack() {
    if (this.services.rloCommonData.makeDdeDisabled.ddeDisabled) {
      this.services.rloCommonData.makeDdeDisabled.ddeDisabled = false;
      this.services.rloCommonData.makeDdeDisabled.previousPageOperation = true;
      this.locationRoute.back();
    } else {
      this.services.rloui.goBack();
    }
  }

  async brodcastProdCategory(event) {
    this.isLoanCategory = event.isLoanCategory;
    this.services.rloCommonData.globalApplicationDtls.ActiveStage = this.componentCode;
    this.CUSTOMER_GRID.setApplicantLabelsAndTags();
    if (this.formMenuObject.selectedMenuId == 'CustomerDetails') {
      this.currentCompInstance.loanCategoryChanged(event.isLoanCategory);
    }
    this.validateSectionForApplication();
    this.validateSectionForCustomer();
  }

  doCardTypeBasedChanges() {
    if (this.services.rloCommonData.globalApplicationDtls.CustomerType == 'C') {

      let sectionindex: number = this.customerMenu[0].indexOf(this.customerMenu[0].find(eachSection => (eachSection.id == 'OccupationDetails')));
      if ((undefined == this.CustomerType || this.CustomerType == 'B') && sectionindex >= 0) {
        this.customerMenu[0].splice(sectionindex, 1, { id: "BusinessDetails", name: "Business Details", completed: false, iconClass: "icon-Occupation-Details", isActive: false, isOptional: false });
      }
      else if (this.CustomerType != 'B' && sectionindex < 0) {
        sectionindex = this.customerMenu[0].indexOf(this.customerMenu[0].find(eachSection => (eachSection.id == 'BusinessDetails')));
        this.customerMenu[0].splice(sectionindex, 1, { id: "OccupationDetails", name: "Occupation Details", completed: false, iconClass: "icon-Occupation-Details", isActive: false, isOptional: true });
      }
    }
    else if (this.services.rloCommonData.globalApplicationDtls.CustomerType == 'I') {
      if (this.CustomerType == 'A') {
        this.customerMenu[0][2].isOptional = true;
      }
      else {
        this.customerMenu[0][2].isOptional = false;
      }
    }
  }

  async validateSectionForCustomer() {
    console.error("validateSectionForCustomer()", this.initiallyCustomersAdded)
    let formsMenuList = this.formsMenuList;
    formsMenuList.forEach(element => {
      for (let i = 0; i < element.length; i++) {
        const section = element[i];
        section.isActive = false;
        // if (section.id == "CollateralDetails" && section.isOptional) {
        //   //Hide Collateral details for Personal loan
        //   if (this.services.rloCommonData.globalApplicationDtls.TypeOfLoanCode == "CC") {
        //     element.splice(i, 1);
        //     i--;
        //   }
        // }
        if (this.services.rloCommonData.globalApplicationDtls.CustomerType == 'C') {
          if (section.id == 'FamilyDetails' || section.id == 'LiabilityDetails' || section.id == 'AssetDetails' || section.id == 'IncomeSummary' || section.id == 'PersonalInterviewDetails' || section.id == 'RmVisitDetails') {
            section.isOptional = true;
            element.splice(i, 1);
            i--;
          }
        }

        if (this.services.rloCommonData.globalApplicationDtls.CustomerType == 'I') {
          if (this.services.rloCommonData.globalApplicationDtls.isChannelApplication && section.id == 'RmVisitDetails') {
            section.isOptional = false;
            //  this.progressStatusObject.manditorySection += 1;
          }
        }


        // condition added for Canara IB/MB
        // if(section.id=='RmVisitDetails'){
        //   if(this.services.rloCommonData.globalApplicationDtls.CamType=='CHNL'){
        //     section.isOptional = false;
        //   }else if(this.services.rloCommonData.globalApplicationDtls.CustomerType == 'C'){
        //     section.isOptional = true;
        //     element.splice(i, 1);
        //     i--;
        //   }
        // }
      }
    });
    this.doCardTypeBasedChanges();
    // this.formsMenuList = JSON.parse(JSON.stringify(this.customerMenu));
  }


  validateSectionForApplication() {
    let formsMenuList = this.applicationMenu;
    formsMenuList.forEach(element => {
      for (let i = 0; i < element.length; i++) {
        const section = element[i];
        section.isActive = false;
        // if (!this.isLoanCategory) {//ie. loan type credit card
        // if (section.id == "CreditCardDetails" && section.isOptional) {
        //   if (this.isLoanCategory) {
        //     element.splice(i, 1);
        //     i--;
        //   }
        //   else {
        //     section.isOptional = false;
        //     this.progressStatusObject.manditorySection += 1;
        //   }
        // }
        if (section.id == "LoanDetails" && section.isOptional) {
          if (this.isLoanCategory) {
            section.isOptional = false;
            this.progressStatusObject.manditorySection += 1;
          } else {
            element.splice(i, 1);
            i--;
          }
        }
        // if (section.id == "PropertyDetails" && section.isOptional) {
        //   // Hide Propert Details for Loans Other than Propery ( Mortage) Loan
        //   if (this.services.rloCommonData.globalApplicationDtls.TypeOfLoanCode == "ML") {
        //     section.isOptional = false;
        //     this.progressStatusObject.manditorySection += 1;
        //   } else {
        //     element.splice(i, 1);
        //     i--;
        //   }
        // }
        if (this.services.rloCommonData.globalApplicationDtls.CustomerType == 'C') {
          if (section.id == 'ReferrerDetails') {
            section.isOptional = true;
            element.splice(i, 1);
            i--;
          }
        }
        if (section.id == "FDDetails") {
          // Hide FD Details for Loans Other than Secured Card
          if (this.services.rloCommonData.globalApplicationDtls.CardType == "SC") {
            section.isOptional = false;
            this.progressStatusObject.manditorySection += 1;
          } else {
            element.splice(i, 1);
            i--;
          }
        }
        // if ((section.id == "VehicalLoanDetails" || section.id == "GoldLoanDetails" || section.id == "EducationLoanDetails") && section.isOptional) {
        //   if (!this.isLoanCategory) {
        //     element.splice(i, 1);
        //     i--;
        //   }
        // }
      }
    });

  }


  async headerState(event) {
    console.warn("DEEP | Header state", event);
    this.showExpandedHeader = event.headerState;
    //this.scoreCardComponent.headerChanges(event);

    //TO IMPLEMENT
    // this.scoreCardComponent.forEach(element => {
    //   element.headerChanges(event);
    // });
    this.headerProgressBar.headerChanges(event);
  }

  updateProgressBar() {
    if (this.initiallyCustomersAdded) {
      let individualSectionScore = (1 / this.progressStatusObject.manditorySection) * 100;
      let score = Math.round(individualSectionScore * this.progressStatusObject.completedSection);
      this.headerProgressBar.update(score);
    }
  }

  calculateScore(action: string, firstArrayIndex: number, SecondArrayIndex: number, isSectionOptional?: boolean) {
    if (isSectionOptional == undefined) {
      isSectionOptional = this.formsMenuList[firstArrayIndex][SecondArrayIndex].isOptional;
    }
    console.log(this.progressStatusObject);
    if (!isSectionOptional) {
      if (action == "add") {
        this.progressStatusObject.completedSection += 1;
      } else {
        this.progressStatusObject.completedSection -= 1;
      }
    }
    this.updateProgressBar();
  }


  //after adding and removing section from map
  updateMenu(action: string, menuList: any, selectedSection: string, mapKey: string, addedOrRemovedComponent: any) {
    console.error("DEEP | updateMenu", action, menuList, selectedSection, mapKey, addedOrRemovedComponent);
    let state = action == "add" ? true : false;
    this.completedMenuSectionList[selectedSection].set(mapKey, menuList);

    let isSectionOptional = false;
    let firstArrayIndex = 0;
    let SecondArrayIndex = 0;
    if (addedOrRemovedComponent.tabName != undefined) {
      if (addedOrRemovedComponent.tabName == 'A') {
        for (let j = 0; j < this.applicationMenu.length; j++) {
          const menuSectionList = this.applicationMenu[j];
          let firstArrayIndex = j;
          for (let i = 0; i < menuSectionList.length; i++) {
            const element = menuSectionList[i];
            if (element.id == addedOrRemovedComponent.name) {
              let SecondArrayIndex = i;
              element.completed = state;
              isSectionOptional = element.isOptional;
            }
          }
        }
        if (!isSectionOptional) {
          this.calculateScore(action, firstArrayIndex, SecondArrayIndex, isSectionOptional);
        }
        // this.progressStatusObject.completedSection -= 1; 
        console.log("debug :: ", this.completedMenuSectionList);
        //this.handleSectionValidation(action)
      }
    } else {
      for (let j = 0; j < this.formsMenuList.length; j++) {
        const menuSectionList = this.formsMenuList[j];
        let firstArrayIndex = j;
        for (let i = 0; i < menuSectionList.length; i++) {
          const element = menuSectionList[i];
          if (element.id == addedOrRemovedComponent.name) {
            let SecondArrayIndex = i;
            element.completed = state;
            isSectionOptional = element.isOptional;
          }
        }
      }

      // this.formsMenuList[this.formMenuObject.firstArr][this.formMenuObject.secondArr].completed = state;//change status
      console.log("deep ===", this.formMenuObject);

      if (!isSectionOptional) {
        this.updateRoleBasedScore(action, firstArrayIndex, SecondArrayIndex);
      }
    }
  }
  handleSectionValidation(action) {

  }
  setInitialObjectData(data) {
    console.log("setInitialObjectData", data.data[0]);
    let customerData = data.data[0];

    //Product specific code
    // if (customerData.hasOwnProperty('isValid')) {
    //   //this.CustomerType = customerData.CustomerType;
    //   this.initiallyCustomersAdded = true;
    //   this.CustomerType = "B";
    //   return;
    // }

    // this.CustomerType = customerData.CustomerType;

    // if (customerData.CustomerType == "B") {
    //   this.formMenuObject.validBorrowerId = customerData.BorrowerSeq;
    //   if (customerData.LoanOwnership == 100)
    //     this.initiallyCustomersAdded = true;
    // }
    // else if (customerData.CustomerType == "CB") {
    //   if (customerData.LoanOwnership > 0 && this.formMenuObject.validCoBorrowerId == 0) {
    //     this.progressStatusObject.manditorySection += 4;
    //     this.formMenuObject.validCoBorrowerId = customerData.BorrowerSeq;
    //     //this.initiallyCustomersAdded = true;
    //   }
    // }
    // console.log("deep", this.progressStatusObject);
    //Product specific code

    //Canara specific
    console.log("Header Data", this.services.rloCommonData.globalApplicationDtls);

    let initialAllCustomerList = this.services.rloCommonData.customerListForAddress;

    let headerData = this.services.rloCommonData.globalApplicationDtls;
    switch (headerData.CustomerType) {
      case "C":
        if (customerData.CustomerType == "B") {//Corporate
          if (customerData.hasOwnProperty('isValid')) {
            this.initiallyCustomersAdded = true;
            this.CustomerType = "B";
            return;
          }

          this.formMenuObject.validBorrowerId = customerData.BorrowerSeq;
          this.initiallyCustomersAdded = true;

          this.progressStatusObject.manditorySection += 1;
          this.progressStatusObject.manditorySection += initialAllCustomerList.size * 2;

        }
        break;

      case "I":
        if (customerData.CustomerType == "B") {//Corporate
          if (customerData.hasOwnProperty('isValid')) {
            this.initiallyCustomersAdded = true;
            this.CustomerType = "B";
            return;
          }

          this.formMenuObject.validBorrowerId = customerData.BorrowerSeq;
          this.initiallyCustomersAdded = true;

          this.progressStatusObject.manditorySection += 1;

          this.progressStatusObject.manditorySection += 
          this.services.rloCommonData.globalApplicationDtls.isChannelApplication ? 
          initialAllCustomerList.size * 3 : initialAllCustomerList.size * 2;
        }
        break;

      default:
        break;
    }

    // initialAllCustomerList.forEach(element => {
    //   console.log(element);
    //   this.progressStatusObject.manditorySection += 2;
    // });
    // this.completedMenuSectionList['customerSection'].set(mapKey, ['CustomerDetails']);


    // if (customerData.hasOwnProperty('isValid')) {
    //   //this.CustomerType = customerData.CustomerType;
    //   this.initiallyCustomersAdded = true;
    //   this.CustomerType = "B";
    //   return;
    // }


    this.CustomerType = customerData.CustomerType;

    // if (customerData.CustomerType == "B") {
    //   this.formMenuObject.validBorrowerId = customerData.BorrowerSeq;
    //   if (customerData.LoanOwnership == 100)
    //     this.initiallyCustomersAdded = true;
    // }
    // else if (customerData.CustomerType == "CB") {
    //   if (customerData.LoanOwnership > 0 && this.formMenuObject.validCoBorrowerId == 0) {
    //     this.progressStatusObject.manditorySection += 4;
    //     this.formMenuObject.validCoBorrowerId = customerData.BorrowerSeq;
    //     //this.initiallyCustomersAdded = true;
    //   }
    // }

    //canaraSpecific
  }

  // setInitialObjectData(data) {
  //   console.log("setInitialObjectData", data.data[0]);
  //   let customerData = data.data[0];

  //   if (customerData.hasOwnProperty('isValid')) {
  //     //this.CustomerType = customerData.CustomerType;
  //     this.initiallyCustomersAdded = true;
  //     this.CustomerType = "B";
  //     return;
  //   }

  //   this.CustomerType = customerData.CustomerType;

  //   if (customerData.CustomerType == "B") {
  //     this.formMenuObject.validBorrowerId = customerData.BorrowerSeq;
  //     if (customerData.LoanOwnership == 100)
  //       this.initiallyCustomersAdded = true;
  //   }
  //   else if (customerData.CustomerType == "CB") {
  //     this.initiallyCustomersAdded = true;
  //     if (customerData.LoanOwnership > 0 && this.formMenuObject.validCoBorrowerId == undefined) {
  //       this.progressStatusObject.manditorySection += 4;
  //       this.formMenuObject.validCoBorrowerId = customerData.BorrowerSeq;
  //       //this.initiallyCustomersAdded = true;
  //     }
  //   }

  //   // this.CustomerType = customerData.CustomerType;

  //   // if (customerData.CustomerType == "B") {
  //   //   if (customerData.LoanOwnership == 100)
  //   //     this.initiallyCustomersAdded = true;
  //   // }
  //   // else if (customerData.CustomerType == "CB") {
  //   //   if (customerData.LoanOwnership > 0 && this.formMenuObject.validCoBorrowerId == undefined) {
  //   //     this.progressStatusObject.manditorySection += 4;
  //   //     this.formMenuObject.validCoBorrowerId = customerData.BorrowerSeq;
  //   //     //this.initiallyCustomersAdded = true;
  //   //   }
  //   // }
  //   console.log("deep", this.progressStatusObject);
  // }

  async DDE_CANCEL_click(event) {
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

  DDE_SUBMIT_click(event) {
    const requestParams = new Map();
    // this.CreditCard.checkAvailableLimit();

    // if(this.services.rloCommonData.globalApplicationDtls.isAddedNewMember == false){
    //   this.services.alert.showAlert(2, 'rlo.error.approve.amount.empty', -1);
    //   return;
    // }

    this.services.rloCommonData.isDdeFormValid(this.isLoanCategory).then((data: IFormValidationData) => {
      if (data.isAppValid) {
        requestParams.set('Body.ApplicationStatus', 'AP');
        requestParams.set('Body.direction', 'AP');
        // this.submitDDE(requestParams);
        var mainMessage = this.services.rloui.getAlertMessage('rlo.submit.comfirmation');
        var button1 = this.services.rloui.getAlertMessage('', 'OK');
        var button2 = this.services.rloui.getAlertMessage('', 'CANCEL');
        Promise.all([mainMessage, button1, button2]).then(values => {
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
            if (response != null) {
              if (response.id === 1) {
                this.services.rloui.closeAllConfirmationModal()
                this.submitDDE(requestParams);
              }
            }
          });
        });
      }
      else {
        let errorMsg = "";
        data.errorsList.forEach(element => {
          errorMsg += element;
        });

        Promise.all([this.services.rloui.getAlertMessage('', errorMsg), this.services.rloui.getAlertMessage('', 'OK')]).then(values => {
          let modalObj = {
            title: "Alert",
            rawHtml: values[0],
            modalSize: "modal-width-sm",
            buttons: [
              { id: 1, text: values[1], type: "success", class: "btn-primary" },
            ]
          }
          this.services.rloui.confirmationModal(modalObj).then((response) => {
            if (response != null) {
              if (response.id === 1) {
                this.services.rloui.closeAllConfirmationModal();
              }
            }
          });
        });
      }
    })
  }

  async DDE_WITHDRAW_click(event) {
    // var title = this.services.rloui.getAlertMessage('rlo.error.invalid.regex');
    const requestParams = new Map();
    requestParams.set('Body.ApplicationStatus', 'Withdraw');
    // requestParams.set('Body.direction', 'PRE-CPV');
    requestParams.set('Body.direction', 'W');
    var mainMessage = this.services.rloui.getAlertMessage('rlo.withdraw.comfirmation');
    var button1 = this.services.rloui.getAlertMessage('', 'OK');
    var button2 = this.services.rloui.getAlertMessage('', 'CANCEL');

    Promise.all([mainMessage, button1, button2]).then(values => {
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
        if (response != null) {
          if (response.id === 1) {
            this.services.rloui.closeAllConfirmationModal()
            this.submitDDE(requestParams);
          }
        }
      });
    });
  }

  async DDE_REJECT_click(event) {
    const requestParams = new Map();
    requestParams.set('Body.ApplicationStatus', 'Reject');
    requestParams.set('Body.direction', 'RJ');
    var mainMessage = this.services.rloui.getAlertMessage('rlo.reject.comfirmation');
    var button1 = this.services.rloui.getAlertMessage('', 'OK');
    var button2 = this.services.rloui.getAlertMessage('', 'CANCEL');

    Promise.all([mainMessage, button1, button2]).then(values => {
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
        if (response != null) {
          if (response.id === 1) {
            this.services.rloui.closeAllConfirmationModal()
            this.submitDDE(requestParams);
          }
        }
      });
    });
  }

  async DDE_REFER_click(event) {
    const requestParams = new Map();
    requestParams.set('Body.ApplicationStatus', 'Refer');
    requestParams.set('Body.direction', 'RE');
    this.submitDDE(requestParams);
  }

  async submitDDE(requestParams) {
    const inputMap = new Map();

    inputMap.clear();
    inputMap.set('HeaderParam.ProcessId', this.HideProcessId.getFieldValue());
    inputMap.set('HeaderParam.ServiceCode', this.HideServiceCode.getFieldValue());
    inputMap.set('Body.TaskId', this.taskId);
    inputMap.set('Body.TENANT_ID', this.HideTenantId.getFieldValue());
    inputMap.set('Body.UserId', this.userId);
    inputMap.set('Body.CurrentStage', this.HideCurrentStage.getFieldValue());
    inputMap.set('Body.ApplicationId', this.ApplicationId);
    inputMap.set('Body.CreatedBy', this.userId);
    inputMap.set('Body.ProductCategory', this.services.rloCommonData.globalApplicationDtls.TypeOfLoanCode);

    if (requestParams) {
      requestParams.forEach((val, key) => {
        inputMap.set(key, val);
      });
    } else {
      return;
    }

    this.services.http.fetchApi('/acceptDDE', 'POST', inputMap, '/rlo-de').subscribe(
      async (httpResponse: HttpResponse<any>) => {
        const res = httpResponse.body;

        const action: string = (requestParams.get('Body.ApplicationStatus')).toUpperCase();

        let alertMsg = 'rlo.success.submit';
        switch (action) {
          case 'WITHDRAW':
            alertMsg = 'rlo.success.withdraw';
            break;
          case 'REJECT':
            alertMsg = 'rlo.success.reject';
            break;
          case 'REFER':
            alertMsg = 'rlo.success.refer';
            break;
          default:
            alertMsg = 'rlo.success.submit';
            break;
        }

        // var title = this.services.rloui.getAlertMessage('rlo.error.invalid.regex');
        var mainMessage = this.services.rloui.getAlertMessage(alertMsg);
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
            ]
          }

          this.services.rloui.confirmationModal(modalObj).then((response) => {
            this.services.router.navigate(['home', 'LANDING']);
          });
        });
      },
      async (httpError) => {
        const err = httpError['error'];
        if (err != null && err['ErrorElementPath'] !== undefined && err['ErrorDescription'] !== undefined) {
          if (err['ErrorElementPath'] === 'CurrentStage') {
            this.HideCurrentStage.setError(err['ErrorDescription']);
          } else if (err['ErrorElementPath'] === 'UserId') {
            this.HideUserId.setError(err['ErrorDescription']);
          } else if (err['ErrorElementPath'] === 'TENANT_ID') {
            this.HideTenantId.setError(err['ErrorDescription']);
          } else if (err['ErrorElementPath'] === 'TaskId') {
            this.HideTaskId.setError(err['ErrorDescription']);
          } else if (err['ErrorElementPath'] === 'ServiceCode') {
            this.HideServiceCode.setError(err['ErrorDescription']);
          } else if (err['ErrorElementPath'] === 'ProcessId') {
            this.HideProcessId.setError(err['ErrorDescription']);
          }
          this.services.alert.showAlert(2, 'Fail to Submit', -1);
        }
      }
    );
  }

  /**
   *   Tag Related functions
   */

  setTags(tags: Array<any>) {
    this.tags = tags;
  }

  updateSectionWiseTags(event: any) {
    console.log('updateSectionWiseTags --- ', event);

    if (event.name === 'CustomerDetails') { // Ignore for Customer Details Section
      return;
    }

    if (this[event.name + '_SetTag']) {
      this[event.name + '_SetTag'](event);
    } else {
      console.log('No Implementation Found for section ' + event.name + ' Resetting the tags');
      // this.setTags([]);
    }
  }

  // Seperate way for setting tags for customer
  setCustomerTags() {
    const tags = [];
    if (this.ActiveCustomerDtls) {
      if (this.ActiveCustomerDtls['CustomerType'] == 'B' && !this.services.rloCommonData.globalApplicationDtls.isLoanCategory) {
        if (this.services.rloCommonData.globalApplicationDtls.CustomerType == 'C') {
          tags.push({ label: 'P', text: this.ActiveCustomerDtls['RegisteredName'] });
        } else {
          tags.push({ label: 'P', text: this.ActiveCustomerDtls['FullName'] });
        }
      } else {
        tags.push({ label: this.ActiveCustomerDtls['CustomerType'], text: this.ActiveCustomerDtls['FullName'] });
      }
      //   this.setTags(customerTags);
    }
    this.setTags(tags);
  }

  AddressDetails_SetTag(event) {
    // console.log('update address Tags --- ', event);
    this.services.rloCommonData.updateAddressTags(event).then(data => {
      // console.log(data);
      this.setTags(data);
    });
  }

  OccupationDetails_SetTag(event) {
    // console.log('update Occupation Tags --- ', event);
    this.services.rloCommonData.UpdateOccupationTags(event).then(data => {
      // console.log(data);
      this.setTags(data);
    });
  }

  LiabilityDetails_SetTag(event) {
    // console.log('update Liability Tags --- ', event);
    this.services.rloCommonData.getLiabilityTags(event).then(data => {
      // console.log(data);
      this.setTags(data);
    });
  }

  AssetDetails_SetTag(event) {
    console.log('update Asset Tags --- ', event);
    this.services.rloCommonData.getAssetTags(event).then(data => {
      if (data.length) {
        for (let index = 0; index < data.length; index++) {
          const element = data[index];
          if (data[index] != data.length) {
            if (element.label != undefined) {
              this.setTags(data);
            }
          }
        }
      }
      else {
        this.setTags([]);
      }
    });
  }

  FDDetails_SetTag(event) {
    console.log('update FD Tags --- ', event);
    this.services.rloCommonData.getFdDetailsTags(event).then(data => {
      if (data.length) {
        for (let index = 0; index < data.length; index++) {
          const element = data[index];
          if (data[index] != data.length) {
            this.setTags(data);
          }
        }
      } else {
        this.setTags([]);
      }
    });
  }

  async addRemoveCompletedSection(sectionResponseObj: IComponentSectionValidationData, componentLvlData) {
    console.log(this.formMenuObject.isCustomerTabSelected, this.formMenuObject, componentLvlData);
    let data = [];
    let selectedSection, mapKey;
    if (componentLvlData.tabName != undefined) {
      if (componentLvlData.tabName == 'C') {
        selectedSection = "customerSection";
        mapKey = componentLvlData.BorrowerSeq;
      } else {
        selectedSection = "applicationSection";
        mapKey = componentLvlData.sectionName;
      }
    } else {
      if (this.formMenuObject.isCustomerTabSelected) {
        selectedSection = "customerSection";
        mapKey = componentLvlData.BorrowerSeq;
      } else {
        selectedSection = "applicationSection";
        mapKey = componentLvlData.sectionName;
      }
    }
    if (sectionResponseObj.isSectionValid) {
      //first time loading data; customer not present
      if (this.completedMenuSectionList[selectedSection].get(mapKey) === undefined) {
        console.error("SECTION COMPLETED & NEW CUSTOMER ADDED | CALCULATE SCORE");

        let initialAllCustomerList = this.services.rloCommonData.customerListForAddress;
        if (!initialAllCustomerList.has(mapKey)) {

          if (selectedSection == "customerSection") {
            if (this.services.rloCommonData.globalApplicationDtls.CustomerType == "C") {
              this.progressStatusObject.manditorySection += 2;
            } else if (this.services.rloCommonData.globalApplicationDtls.CustomerType == "I") {
              this.progressStatusObject.manditorySection += 2;
              if(this.services.rloCommonData.globalApplicationDtls.isChannelApplication){
                this.progressStatusObject.manditorySection += 1;
              }
            }
          }
        }

        data.push(componentLvlData.name);
        this.updateMenu('add', data, selectedSection, mapKey, componentLvlData);
        return true;
      }
      else {
        let dataList = this.completedMenuSectionList[selectedSection].get(mapKey);
        if (!dataList.includes(componentLvlData.name)) {
          console.error("SECTION COMPLETED | CALCULATE SCORE");
          dataList.push(componentLvlData.name);
          this.updateMenu('add', dataList, selectedSection, mapKey, componentLvlData);
        }
        return true;
      }
    } else {
      let dataList = this.completedMenuSectionList[selectedSection].get(mapKey);
      if (dataList == undefined) {
        return true;
      }
      let sectionAlreadyCompleted = dataList.includes(componentLvlData.name);
      if (sectionAlreadyCompleted) {
        console.error("SECTION REMOVED | CALCULATE SCORE");
        dataList.splice(dataList.indexOf(mapKey), 1);
        this.updateMenu('remove', dataList, selectedSection, mapKey, componentLvlData);
        return true;
      }
      else {
        console.error("SECTION NOT FOUND");
      }
    }
    console.warn("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    console.warn(this.completedMenuSectionList);
    console.warn(this.progressStatusObject);
    console.warn(this.formMenuObject);
    console.warn(this.allCustomerTypeList);
    console.warn(this.formsMenuList);
    return true;
  }

  updateMenuSection(menuId: any, firstArrayEle: number, secondArrayEle: number) {
    console.log(this.formMenuObject);
    if (this.formMenuObject.isCustomerTabSelected) {
      this.injectDynamicComponent(menuId, this.disableMenus, firstArrayEle, secondArrayEle);
    }
    else {
      this.injectDynamicComponent(menuId, false, firstArrayEle, secondArrayEle);
    }
  }

  validateMenuNavigation(firstArrIndex: number, secondArrIndex: number, sectionId: string) {
    let thrushold = 0;
    let notFilledSection = { nextAvailFirstIndex: 0, nextAvailSecondIndex: 0 };
    let canGoToPreviousMenu = false;
    this.menuNavigationBtn.enableLeftArrow = false;

    for (let j = 0; j < this.formsMenuList.length; j++) {
      const menuSectionList = this.formsMenuList[j];
      for (let i = 0; i < menuSectionList.length; i++) {
        const element = menuSectionList[i];
        if (!element.completed && !element.isActive) {
          notFilledSection.nextAvailFirstIndex = j;
          notFilledSection.nextAvailSecondIndex = i;
        }
        if (j <= firstArrIndex) {
          if (this.formsMenuList[firstArrIndex][secondArrIndex].id == element.id) {
            thrushold = 1
          }
          if (!element.completed && !element.isActive && !thrushold) {
            canGoToPreviousMenu = true;
            this.menuNavigationBtn.enableLeftArrow = true;
          }
        }
      }
    }
    if (notFilledSection.nextAvailFirstIndex == firstArrIndex) {
      if (notFilledSection.nextAvailSecondIndex > secondArrIndex) {
        this.menuNavigationBtn.enableRightArrow = true;
      }
      else {
        this.menuNavigationBtn.enableRightArrow = false;
      }
    } else if (notFilledSection.nextAvailFirstIndex > firstArrIndex) {
      this.menuNavigationBtn.enableRightArrow = true;
    } else {
      this.menuNavigationBtn.enableRightArrow = false;
    }
  }

  openFileUpload() {
    this.services.rloui.openFileUpload(this.ApplicationId);
  }

  redoProgressBarCalulation() {
    console.log(this.progressStatusObject);
  }

  refreshScoreData() {
    forkJoin(
      this.services.rloCommonData.invokeInterface(this.ApplicationId, "policyScore"),
      this.services.rloCommonData.invokeInterface(this.ApplicationId, "applicationScore")
    ).subscribe((response) => {
      console.log(response);
      this.setPolicyScore(response[0]);
      this.setApplicationScore(response[1]);
    });
  }

  setPolicyScore(response: any) {
    if (response != undefined && response.OVERALLSCORE != undefined) {
      this.headerScoreCard[1].score = Math.round(response.OVERALLSCORE);
    }
  }

  setApplicationScore(response: any) {
    if (response != undefined && response.OVERALLSCORE != undefined) {
      this.headerScoreCard[2].score = Math.round(response.OVERALLSCORE);
    }
  }

  setDbrScore(response: any) {
    if (response.ouputdata != undefined && response.ouputdata.OVERALLSCORE != undefined) {
      this.headerScoreCard[0].score = response.ouputdata.OVERALLSCORE;
    }
  }

  getScores() {
    this.services.rloCommonData.getInitialScores(this.ApplicationId).then((response: any) => {
      console.warn(response);
      if (response != null) {
        response.ApplicationScoreDetails.forEach(element => {
          let selectedObj = this.headerScoreCard.find(x => x.id == element.ScoreId);
          if (element.Score != undefined)
            selectedObj.score = Math.round(element.Score);
        });
      }
      else {
        this.headerScoreCard.forEach(element => {
          element.score = 0;
        });
      }
    });
  }

  newCalculateScore(borrowerSections) {
    this.progressStatusObject.completedSection = 0;
    borrowerSections.forEach(element => {
      this.progressStatusObject.completedSection += 1;
    });
    this.updateProgressBar();
  }

  validateAddressForCustomers(BorrowerSeq: number) {
    console.log("validateAddressForCustomers");
    if (BorrowerSeq != undefined)
      if (!this.services.rloCommonData.customerListForAddress.has(BorrowerSeq)) {
        this.services.rloCommonData.customerListForAddress.set(BorrowerSeq, BorrowerSeq);
        console.log("customerListForAddress", this.services.rloCommonData.customerListForAddress);
        this.additionAddressDetailsApiCall(BorrowerSeq);
      }
  }

  additionAddressDetailsApiCall(BorrowerSeq: number) {
    let inputMap = new Map();
    inputMap.clear();
    inputMap.set('Body.interfaceId', "Customer360View");
    inputMap.set('Body.proposalid', this.ApplicationId);
    inputMap.set('Body.BorrowerSeq', BorrowerSeq.toString());
    inputMap.set('Body.inputdata.CifID', this.services.rloCommonData.globalApplicationDtls.CIF);

    this.services.http.fetchApi('/cbsCustomer360View/member', 'POST', inputMap, '/rlo-de').subscribe(
      async (httpResponse: HttpResponse<any>) => {
      }
    );
  }

}


