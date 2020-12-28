import { Component, OnInit, ViewChild } from '@angular/core';
import { UWCustomerTabComponent } from '../uw-cust-tab/uw-cust-tab.component';
//import { UWCustomerListComponent } from '../UWCustomerList/UWCustomerList.component';
import { ICardMetaData, IUwCustomerTab, IGeneralCardData, IheaderScoreCard, IAmortizationForm, IUnderwriterActionObject } from '../Interface/masterInterface';
import { RloCommonData } from '../rlo-services/rloCommonData.service';
import { Master } from './under-writer.model';
import { HeaderComponent } from '../Header/Header.component';
import { FormComponent } from '../form/form.component';
import { ServiceStock } from '../service-stock.service';
// import { NgxMasonryOptions } from 'ngx-masonry';
import { NgxMasonryOptions, NgxMasonryComponent } from 'ngx-masonry';
import { HttpResponse } from '@angular/common/http';
import { IModalData } from '../popup-alert/popup-interface';
import { Subscription } from 'rxjs';

class IbasicCardSectionData {
  cardType: string;
  sectionList: Array<any> = [];
}

@Component({
  selector: 'app-under-writer',
  templateUrl: './under-writer.component.html',
  styleUrls: ['./under-writer.component.css']
})
export class UnderWriterComponent extends FormComponent implements OnInit {

  @ViewChild('FieldId_1', { static: false }) FieldId_1: HeaderComponent;
  @ViewChild(NgxMasonryComponent, { static: false }) masonry: NgxMasonryComponent;

  @ViewChild('UWTabs', { static: false }) UWTabs: UWCustomerTabComponent;

  commonBlankCardSectionData: Array<any> = [];
  basicCardSectionData: IbasicCardSectionData = {
    cardType: '',
    sectionList: []
  };

  customerSectionsList = [
    { responseName: "UWIncomeSummary", name: "financialSummary", displayName: "Financial Summary" },
    { responseName: "UWFamily", name: "familyDetails", displayName: "Family Details" },
    { responseName: "UWAddress", name: "addressDetails", displayName: "Address Details" }
  ];

  customerMasterJsonData: Master;

  allSectionsCardData = [
    {
      type: "customer",
      cardList: [
        { className: "CustomerDetails" },
        { className: "FinancialSummary" },
        { className: "AddressDetails" },
        // { className: "FinancialDetails" },
        // { className: "CollateralDetails" },

        { className: "FamilyDetails" },
        { className: "PersonalInterview" },
        { className: "RmVisitDetails" }
      ]
    },
    {
      type: "application",
      cardList: [
        { className: "LoanDetails" },
        { className: "InterfaceResults" },
        // { className: "VehicalDetails" },
        { className: "CardDetails" },
        // { className: "GoldDetails" },
        // { className: "EducationDetails" },
        { className: "PropertyDetails" },
        { className: "GoNoGoDetails" },
        { className: "ApplicationDetails" },

        { className: "ReferalDetails" },
        // { className: "Notes" }, // changes for canara bank
      ]
    }
  ];

  headerStatusData = [
    { name: "Investigation Results", status: "deviation" },
    { name: "Dedupe Results", status: "complete" },
    { name: "Verification Results", status: "pending" }
  ];

  //used to iterate and pass data to ui-card-field
  cCardDataWithFields: IGeneralCardData[] = [];
  cBlankCardData = [];

  aCardDataWithFields = [];//used to iterate and pass data to ui-card-field
  aBlankCardData = [];

  customerList: IUwCustomerTab[] = [];//used in uw-cust-tab
  customerCardDataWithFields: IGeneralCardData;//store customer related data
  addressDetailsCardDetails: IGeneralCardData = null;
  loanDetailsCardData: IGeneralCardData = null//stores loan Details card data
  interfaceResultCardData: IGeneralCardData;

  selectedTab: string = "customer";
  updateMasonryLayout: boolean = false;

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

  public myOptions: NgxMasonryOptions = {
    gutter: 10,
    originTop: true,
    originLeft: true,
    percentPosition: true
    // itemSelector: '.w-25'
  };

  applicationSectionLoaded: boolean = false;
  customerSectionLoaded: boolean = false;

  workingJsonObj = {
    "UWApplication": {
      "UWDisbursal": {
        "DisbursalSeq": ""
      },
      "UWCreditCard": {
        "CreditCardSeq": ""
      },
      "UWCustomerDetails": [
        {
          "ExistingCustomer": "N",
          "UWIncomeSummary": {
            "NetIncomeMonthly": 32958,
            "DBR": 0,
            "IncomeSummarySeq": 261,
            "TotalIncome": 395500,
            "TotalLiabiity": 0,
            "BorrowerSeq": 3573,
            "TotalObligation": 0
          },
          "DOB": "02-07-1997",
          "FullName": "TEJ PATIL",
          "BorrowerSeq": 3573,
          "ApplicationId": 2822,
          "CustomerType": "B",
          "UWAddress": [
            {
              "State": "Maharashtra",
              "AddressSeq": 1466,
              "Address1": "BHAYANDER",
              "BorrowerSeq": 3573,
              "City": "Mumbai",
              "AddressType": "OF",
              "Pincode": 400060
            },
            {
              "State": "Maharashtra",
              "AddressSeq": 1467,
              "Address1": "GOREGOAN",
              "BorrowerSeq": 3573,
              "City": "Mumbai",
              "AddressType": "RS",
              "OccupationType": "OW",
              "Pincode": 400001
            },
            {
              "State": "MAHARASHTRA",
              "AddressSeq": 1468,
              "Address1": "VIRAR",
              "BorrowerSeq": 3573,
              "City": "MUMBAI",
              "AddressType": "RS",
              "OccupationType": "RN",
              "Pincode": 400002
            }
          ]
        }
      ],
      "UWApplicationInfo": {
        "DateOfReceipt": "03-07-1996 00:00:00",
        "ApplicationInfoId": 2843,
        "ApplicationId": 2822
      },
      "Branch": "103",
      "UWLoan": {
        "RepaymentFrequency": "A",
        "AmortizationAmount": 33806.67,
        "ProductCategory": "ML",
        "LoanDetailsSeq": 862,
        "ApplicationId": 2822,
        "MargineMoney": 0
      },
      "DSAId": "USERS1",
      "SourcingChannel": "DSA",
      "UWQuestionnaire": {
        "DeviationLevel": "L1",
        "QuestionnaireCategory": "go_no_go",
        "QuestionnaireSeq": 369,
        "ApplicationId": 2822
      },
      "ApplicationId": 2822,
      "UWFeeCharges": {
        "ChargeSeq": ""
      },
      "UWRMVisit": {
        "VisitSeq": ""
      }
    }
  }

  borrowerSeq: number = 0;
  isDataAvaliableFlag: number = -1;

  componentCode = 'UnderWriter';

  //getting data from route(mytray -> UW)
  applicationId: number = 0;
  taskId: any;
  instanceId: any;
  userId: any;
  tenantId: string = "SB1";
  serviceCode: string = "ClaimTask";
  processId: string = "RLO_Process";
  applicationStatus: string = "AP";
  ///

  isLoanCategory: boolean = false;
  showExpandedHeader: boolean = true;//state of header i.e expanded-1 or collapsed-0 
  maxCardLimit: any = "NA";

  customersList: any;//list of customers
  borrowersBorrowerSeq: number = 0;//required in DBR expand section
  reloadUWSectionsSubscription: Subscription;

  constructor(public services: ServiceStock, public rloCommonDataService: RloCommonData) {
    super(services);
    this.services.rloui.customerListDropDownArray = [];
    // this.getUnderWriterData();

    //when approved limit is changed in CC modal
    this.reloadUWSectionsSubscription = this.services.rloCommonData.reloadUWSections.subscribe((data: any) => {
      console.log(data);
      var oldApprovedLimit = this.customerMasterJsonData.ApplicationDetails.CardDetails.ApprovedLimit;

      this.customerMasterJsonData.ApplicationDetails.CardDetails.ApprovedLimit = data.data.approvedLimit;
      console.log(this.customerMasterJsonData.ApplicationDetails.CardDetails)
      this.selectedTabCardData('application');

    });
  }

  ngOnInit() { }

  ngOnDestroy() {
    this.services.rloui.closeAllConfirmationModal();
    this.reloadUWSectionsSubscription.unsubscribe();
  }

  ngAfterViewInit() {
    // setTimeout(() => {
    //   this.reloadCardGrid();
    // }, 10);
    //withdraw  reject  pre-cpv
  }

  //@Output
  broadcastProdCategory(event) {
    console.log("shweta :: application global params", this.services.rloCommonData.globalApplicationDtls);
    let globlaObj = this.services.rloCommonData.globalApplicationDtls;

    this.isLoanCategory = event.isLoanCategory;
    //changes for canara
    // if (globlaObj.TypeOfLoanCode == "CC") {
    //   if (globlaObj.LoanAmount != undefined) {
    //     this.maxCardLimit = globlaObj.LoanAmount;
    //   }
    // }
    //changes for canara
    this.getUnderWriterData();
  }

  //@Output
  async headerState(event) {
    this.showExpandedHeader = event.headerState;
    console.log("header ---", this.showExpandedHeader);
    // if (!this.showExpandedHeader) {
    //   setTimeout(() => {
    //     window.scroll(0, 0);
    //   }, 100);
    // }
  }

  async claimTask(taskId) {
    const inputMap = new Map();
    inputMap.clear();
    inputMap.set('Body.UserId', sessionStorage.getItem('userId'));
    inputMap.set('Body.TENANT_ID', this.tenantId);
    inputMap.set('Body.TaskId', taskId);
    inputMap.set('HeaderParam.ProcessId', this.processId);
    inputMap.set('HeaderParam.ServiceCode', this.serviceCode);
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
        this.services.alert.showAlert(2, 'rlo.error.claim.dde', -1);
      }
    );
  }

  getUnderWriterData() {
    //valid application id -  2141(Loan details), 2460(has property) 2483(dont edit), 2691(al data),2148(liability),2523(disburse),2797
    //amort 2983,2962

    this.applicationId = this.services.dataStore.getRouteParam(this.services.routing.currModal, 'appId');
    this.taskId = this.services.dataStore.getRouteParam(this.services.routing.currModal, 'taskId');
    this.instanceId = this.services.dataStore.getRouteParam(this.services.routing.currModal, 'instanceId');
    this.userId = this.services.dataStore.getRouteParam(this.services.routing.currModal, 'userId');

    // this.applicationId = 2484; //4424

    if (this.userId === undefined || this.userId == '') {
      this.claimTask(this.taskId);
    }

    console.error("*******", this.applicationId);
    let appId = this.applicationId;
    //appId = 1118;

    this.services.http.fetchApi(`/UWApplication/${appId}`, 'GET', new Map(), '/rlo-de').subscribe(
      async (httpResponse: HttpResponse<any>) => {
        const res = httpResponse.body;
        //const res = this.workingJsonObj //testing
        console.warn(res);

        if (res != null) {
          this.isDataAvaliableFlag = 1;
          this.applicationId = res.UWApplication.ApplicationId;
          this.generateModelJson(res.UWApplication);
          this.getScores();//DBR,policy,application scores
        }
        else {
          this.isDataAvaliableFlag = 0;
        }
      },
      async (httpError) => {
        const err = httpError['error'];
      }
    );
  }

  reloadCardGrid() {
    //this.updateMasonryLayout = true;
    console.log(this.updateMasonryLayout);
    this.masonry.reloadItems();
    this.masonry.layout();
  }

  //under-writer.component.ts
  generateModelJson(jsonData) {
    let obj = jsonData;

    //data for cust-tabs
    obj["UWCustomerDetails"].forEach(element => {
      const data: IUwCustomerTab = {
        "BorrowerSeq": element.BorrowerSeq,
        "CD_CUSTOMER_NAME": element.FullName,
        "CD_CUSTOMER_TYPE": element.CustomerType
      };

      if (element.CustomerType != "R") {
        this.customerList.push(data);
        this.services.rloui.customerListDropDownArray.push({ id: element.BorrowerSeq, text: element.FullName });

        if (element.CustomerType == "B") {
          this.borrowersBorrowerSeq = element.BorrowerSeq;
        }
      }
    });

    this.generateCustomerListDropDowns(obj["UWCustomerDetails"]);

    // let serviceObj = {
    //   "name": "CustomerDetails",
    //   "data": array,
    //   "BorrowerSeq": this.HidCustomerId.getFieldValue()
    // };
    // this.services.rloCommonData.updateMasterDataMap(serviceObj, true)

    // this.services.rloCommonData.globalComponentLvlDataHandler(obj);

    this.UWTabs.setCustomerList(this.customerList);//pass customer list to component
    this.borrowerSeq = this.customerList[0].BorrowerSeq;

    //manager data for cards
    this.customerMasterJsonData = new Master().deserialize(obj);
    console.log(this.customerMasterJsonData);

    let productCategory = this.customerMasterJsonData.productCategory;
    this.customersList = this.customerMasterJsonData.CustomerDetails;

    this.setAmortizationScheduleObj();

    let validSectionList = [];

    for (let i = 0; i < this.allSectionsCardData[1].cardList.length; i++) {
      const element = this.allSectionsCardData[1].cardList[i];
      if (this.isLoanCategory && element.className == "LoanDetails") {
        validSectionList.push(element);
      }

      switch (productCategory) {
        case "CC":
          if (element.className != "VehicalDetails" && element.className != "PropertyDetails" && element.className != "LoanDetails") {
            validSectionList.push(element);
          }
          break;

        case "AL":
          if (element.className != "CardDetails" && element.className != "PropertyDetails" && element.className != "LoanDetails") {
            validSectionList.push(element);
          }
          break;

        case "ML":
          if (element.className != "CardDetails" && element.className != "LoanDetails") {
            validSectionList.push(element);
          }
          break;

        case "PL":
          if (element.className != "CardDetails" && element.className != "PropertyDetails" && element.className != "LoanDetails") {
            validSectionList.push(element);
          }
          break;

        default:
          // validSectionList.push(element);
          break;
      }

    }
    this.allSectionsCardData[1].cardList = validSectionList;
    console.log(this.allSectionsCardData[1].cardList);

    this.selectedTabCardData(this.selectedTab, this.customersList[0].BorrowerSeq);
  }

  isJsonEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

  selectedTabCardData(sectionType: string = "customer", borrowerSeq: number = 0) {
    let data: IGeneralCardData;

    if (sectionType == "customer") {
      this.cCardDataWithFields = [];
      this.cBlankCardData = [];
      let customerIndex = -1;

      for (let i = 0; i < this.customersList.length; i++) {
        const element = this.customersList[i];
        if (borrowerSeq == element.BorrowerSeq)
          customerIndex = i
      }

      let singleCustomer = this.customerMasterJsonData.CustomerDetails[customerIndex];
      console.error(singleCustomer);

      this.allSectionsCardData[0].cardList.forEach(element => {
        switch (element.className) {
          case "CustomerDetails":
            this.customerCardDataWithFields = singleCustomer.getCardData();
            this.customerCardDataWithFields.applicationId = this.applicationId;
            this.customerCardDataWithFields.borrowerSeq = this.borrowerSeq;
            this.customerCardDataWithFields.componentCode = this.componentCode;

            this.customerCardDataWithFields.accountDetails = singleCustomer['AccountDetails'].getTableData();
            console.error(this.customerCardDataWithFields);
            break;

          case "AddressDetails":
            this.addressDetailsCardDetails = singleCustomer[element.className].getCardData();
            this.addressDetailsCardDetails.applicationId = this.applicationId;
            this.addressDetailsCardDetails.borrowerSeq = this.borrowerSeq;
            this.addressDetailsCardDetails.componentCode = this.componentCode;
            console.error(this.addressDetailsCardDetails);
            break;

          case "FinancialSummary":
          case "FinancialDetails":
          case "CollateralDetails":
            data = singleCustomer[element.className].getCardData();
            data.applicationId = this.applicationId;
            data.borrowerSeq = this.borrowerSeq;
            data.componentCode = this.componentCode;
            this.cCardDataWithFields.push(data);
            break;

          case "FamilyDetails":
          case "PersonalInterview":
          case "RmVisitDetails":
            data = singleCustomer[element.className].getCardData();
            data.applicationId = this.applicationId;
            data.borrowerSeq = this.borrowerSeq;
            data.componentCode = this.componentCode;
            this.cBlankCardData.push(data);
            break;

          default:
            break;
        }
      });

      setTimeout(() => {
        this.customerSectionLoaded = true;
        console.warn("****");
        this.reloadCardGrid();
      }, 1000);
    }
    else {
      this.aCardDataWithFields = [];
      this.aBlankCardData = [];

      let application = this.customerMasterJsonData.ApplicationDetails;

      this.allSectionsCardData[1].cardList.forEach(element => {
        switch (element.className) {
          case "LoanDetails":
            this.loanDetailsCardData = application.LoanDetails.getCardData();
            this.loanDetailsCardData.applicationId = this.applicationId;
            this.loanDetailsCardData.borrowerSeq = this.borrowerSeq;
            this.loanDetailsCardData.componentCode = this.componentCode;
            console.log(this.loanDetailsCardData);
            break;

          case "InterfaceResults":
            let customCustomerList = [];
            this.interfaceResultCardData = application.InterfaceResults.getCardData();
            this.interfaceResultCardData.applicationId = this.applicationId;
            this.interfaceResultCardData.borrowerSeq = this.borrowerSeq;
            this.interfaceResultCardData.componentCode = this.componentCode;

            if (this.customerList.length) {
              this.customerList.forEach(element => {
                let obj = {};
                obj["BorrowerSeq"] = element.BorrowerSeq;
                obj["CustomerType"] = element.CD_CUSTOMER_TYPE;
                obj["FullName"] = element.CD_CUSTOMER_NAME;

                customCustomerList.push(obj);
              })
            }
            this.interfaceResultCardData.customerList = customCustomerList;
            console.log(this.interfaceResultCardData);
            break;

          case "ApplicationDetails":
            data = application.getCardData();
            data.applicationId = this.applicationId;
            data.borrowerSeq = this.borrowerSeq;
            data.componentCode = this.componentCode;
            this.aCardDataWithFields.push(data);
            break;

          case "VehicalDetails":
          case "GoldDetails":
          case "EducationDetails":
          case "GoNoGoDetails":
          case "PropertyDetails":
            data = application[element.className].getCardData();
            data.applicationId = this.applicationId;
            data.borrowerSeq = this.borrowerSeq;
            data.componentCode = this.componentCode;
            this.aCardDataWithFields.push(data);
            break;

          case "CardDetails":
            let maxCardLimit = this.services.rloCommonData.globalApplicationDtls.MaxCreditLimit;
            data = application[element.className].getCardData();
            let obj = data.data.find(a => a.title == "Maximum Card Limit");
            obj.subTitle = maxCardLimit == "" || maxCardLimit == undefined ? "NA" : maxCardLimit;
            console.warn("DEEP | card details", obj);
            data.applicationId = this.applicationId;
            data.borrowerSeq = this.borrowerSeq;
            data.componentCode = this.componentCode;
            this.aCardDataWithFields.push(data);
            break;

          case "ReferalDetails":
          case "Notes":
            data = application[element.className].getCardData();
            data.applicationId = this.applicationId;
            data.borrowerSeq = this.borrowerSeq;
            data.componentCode = this.componentCode;
            this.aBlankCardData.push(data);
            break;

          default:
            break;
        }
      });

      console.warn(this.aCardDataWithFields, this.aBlankCardData);
      console.warn(JSON.stringify(this.aCardDataWithFields));
      console.warn(JSON.stringify(this.aBlankCardData));
      console.log("loanDetailsCardData", this.loanDetailsCardData);
      setTimeout(() => {
        this.applicationSectionLoaded = true;
        console.warn("****");
        this.reloadCardGrid();
      }, 500);

    }
  }

  customerSelectionChanged(data) {
    console.log(data);
    this.borrowerSeq = data.selectedBorrowerSeq;
    this.selectedTabCardData(this.selectedTab, data.selectedBorrowerSeq);
    setTimeout(() => {
      this.reloadCardGrid();
    }, 10);
  }

  tabSwitched(tab: string) {
    console.log("tab switched", tab);
    if (this.selectedTab == tab) {
      return;
    }
    else {
      this.selectedTab = tab;
      if (tab != "application")
        this.UWTabs.resetToFirst();
      this.selectedTabCardData(this.selectedTab, this.customersList[0].BorrowerSeq);
    }

    tab == "customer" ? this.applicationSectionLoaded = false : this.customerSectionLoaded = false;
  }

  async revalidate(): Promise<number> {
    var totalErrors = 0;
    super.beforeRevalidate();
    await Promise.all([
      this.FieldId_1.revalidate(),
    ]).then((errorCounts) => {
      errorCounts.forEach((errorCount) => {
        totalErrors += errorCount;
      });
    });
    this.errors = totalErrors;
    super.afterRevalidate();
    return totalErrors;
  }


  click() {
    this.updateMasonryLayout = true;
  }


  fabopen() {
    document.getElementById("fab-show").style.display = "block";
    document.getElementById("fab-open").style.display = "none";
  }

  fabclose() {
    document.getElementById("fab-show").style.display = "none";
    document.getElementById("fab-open").style.display = "block";
  }

  goBack() {
    this.services.rloui.goBack();
  }

  cancelForm() {
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

  withdrawForm() {
    const requestParams = new Map();
    requestParams.set('Body.ApplicationStatus', 'Withdraw');
    requestParams.set('Body.direction', 'W');
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
            this.submitUwSection(requestParams, null);
          }
        }
      });
    });
  }

  reviewForm() {

  }

  rejectForm() {
    const requestParams = new Map();
    requestParams.set('Body.ApplicationStatus', 'Reject');
    requestParams.set('Body.direction', 'RJ');
    var mainMessage = this.services.rloui.getAlertMessage('rlo.reject.comfirmation');
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
            this.submitUwSection(requestParams, null);
          }
        }
      });
    });
  }

  approveForm() {
    const requestParams = new Map();
    requestParams.set('Body.ApplicationStatus', this.applicationStatus);
    requestParams.set('Body.direction', this.applicationStatus);

    console.log(this.customerMasterJsonData.ApplicationDetails.CardDetails);
    let ApprovedLimit = this.customerMasterJsonData.ApplicationDetails.CardDetails.ApprovedLimit;

    if (this.services.rloCommonData.globalApplicationDtls.TypeOfLoanCode == "CC") {
      if (ApprovedLimit == "NA") {
        var mainMessage = this.services.rloui.getAlertMessage('', "Please enter an approve limit for credit card");
        var button1 = this.services.rloui.getAlertMessage('', 'OK');

        Promise.all([mainMessage, button1]).then(values => {
          console.log(values);
          let modalObj: IModalData = {
            title: "Alert",
            mainMessage: values[0],
            modalSize: "modal-width-sm",
            buttons: [
              { id: 1, text: values[1], type: "success", class: "btn-primary" },
            ],
            applicationId: Number(this.applicationId)
          }

          this.services.rloui.confirmationModal(modalObj).then((response) => {
            console.log(response);
            if (response != null) {
              if (response.id === 1) {
              }
            }
          });
        });
      }
      else {
        // this.doSubmitConfirmation();
        var componentCode = this.componentCode
        let actionObject: IUnderwriterActionObject = { componentCode: componentCode, action: 'approve' };
        this.services.rloui.openDecisionAlert(actionObject, Number(this.applicationId)).then((response: any) => {
          console.log(response);
          if (typeof response == 'object') {
            let modalResponse = response.response;
            if (modalResponse.ApprovalReq != undefined || modalResponse.ApprovalReq != null || response.action != "btn-close") {
              this.submitUwSection(requestParams, Response);
            }
          }
        });
      }
    }
    else {
      // this.doSubmitConfirmation();
      var componentCode = this.componentCode
      let actionObject: IUnderwriterActionObject = { componentCode: componentCode, action: 'approve' };
      this.services.rloui.openDecisionAlert(actionObject, Number(this.applicationId)).then((response: any) => {
        console.log(response);
        if (typeof response == 'object') {
          let modalResponse = response.response;
          if (modalResponse.ApprovalReq != undefined || modalResponse.ApprovalReq != null || response.action != "btn-close") {
            this.submitUwSection(requestParams, Response);
          }
        }
      });
    }
  }

  async doSubmitConfirmation() {
    const requestParams = new Map();
    requestParams.set('Body.ApplicationStatus', 'Approve');
    requestParams.set('Body.direction', 'AP');
    var mainMessage = this.services.rloui.getAlertMessage('rlo.submit.comfirmation');
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
            this.submitUwSection(requestParams, null);
          }
        }
      });
    });
  }
  async submitUwSection(requestParams, DecisionResponse) {
    const inputMap = new Map();

    inputMap.clear();
    inputMap.set('HeaderParam.ProcessId', this.processId);
    inputMap.set('HeaderParam.ServiceCode', this.serviceCode);
    inputMap.set('Body.TaskId', this.taskId);
    inputMap.set('Body.TENANT_ID', this.tenantId);
    inputMap.set('Body.UserId', this.userId);
    inputMap.set('Body.CurrentStage', "UW");
    inputMap.set('Body.ApplicationId', this.applicationId);
    inputMap.set('Body.ApplicationStatus', this.applicationStatus);
    inputMap.set('Body.CreatedBy', this.userId);
    if (DecisionResponse != null) {
      inputMap.set('Body.ApprovalReq', DecisionResponse.ApprovalReq);
      inputMap.set('Body.AuthorityDesignation', DecisionResponse.DesignationAuthority);
      inputMap.set('Body.ApproverName', DecisionResponse.ApproverName);
    }
    if (requestParams) {
      requestParams.forEach((val, key) => {
        inputMap.set(key, val);
      });
    } else {
      return;
    }

    this.services.http.fetchApi('/acceptUW', 'POST', inputMap, '/rlo-de').subscribe(
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

        var mainMessage = this.services.rloui.getAlertMessage(alertMsg);
        var button1 = this.services.rloui.getAlertMessage('', 'OK');

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
        // this.QDE_SUBMIT.setDisabled(true);
        // this.QDE_WITHDRAW.setDisabled(true);
        // this.services.alert.showAlert(1, alertMsg, 5000);
        // // this.QDE_SUBMIT.setDisabled(false)
        // this.services.router.navigate(['home', 'LANDING']);
      },
      async (httpError) => {
        const err = httpError['error'];
      }
    );
  }

  openFileUpload() {
    this.services.rloui.openFileUpload(this.applicationId);
  }

  getScores() {
    this.services.rloCommonData.getInitialScores(this.applicationId).then((response: any) => {
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

  setAmortizationScheduleObj() {
    let globlaObj = this.services.rloCommonData.globalApplicationDtls;
    let dataObj: IAmortizationForm = {};

    dataObj.LoanAmountRequested = globlaObj.LoanAmount;
    dataObj.NetInterestRate = this.customerMasterJsonData.ApplicationDetails.LoanDetails.NetInterestRate;
    dataObj.InterestRate = globlaObj.InterestRate;
    dataObj.ApplicationId = this.applicationId;

    dataObj.Tenure = globlaObj.Tenure;
    dataObj.TenurePeriod = globlaObj.TenurePeriodName;
    dataObj.TenurePeriodCd = globlaObj.TenurePeriodCd;

    let RepaymentFrequency = this.customerMasterJsonData.ApplicationDetails.LoanDetails.RepaymentFrequency
    if (RepaymentFrequency != undefined || RepaymentFrequency != "NA") {
      dataObj.InstallmentFreqIndicator = this.getFrequencyNames(RepaymentFrequency);
      dataObj.InstallmentFreqIndicatorCd = RepaymentFrequency;
    }

    this.customersList.forEach(element => {
      if (element.CustomerType == 'B') {
        dataObj.BLoanOwnership = element.LoanOwnership;
        dataObj.BLoanAmtShare = this.getPercentage(element.LoanOwnership, globlaObj.LoanAmount);
      } else if (element.CustomerType == 'CB' && element.LoanOwnership > 0) {
        dataObj.CBLoanOwnership = element.LoanOwnership;
        dataObj.CBLoanAmountShare = this.getPercentage(element.LoanOwnership, globlaObj.LoanAmount);
      }
    });
    this.services.rloCommonData.amortizationModalDataUW = dataObj;
  }

  getPercentage(LoanOwnership, LoanAmount) {
    return Number(LoanOwnership) / 100 * Number(LoanAmount);
  }

  generateCustomerListDropDowns(tempCustomerList) {
    let filterOptions = [];
    filterOptions.push({ id: 'A_' + this.applicationId, text: 'Application' });
    tempCustomerList.forEach(element => {
      if (element.CustomerType != 'R')
        filterOptions.push({ id: 'C_' + element.BorrowerSeq, text: element.CustomerType + '-' + element.FullName });
    });
    console.warn("DEEP | filterOptions", filterOptions);
    this.services.rloui.customerDataDropDown = filterOptions;
  }

  getFrequencyNames(keys) {
    switch (keys) {
      case 'D':
        return 'Daily';
        break;
      case 'W':
        return 'Weekly';
        break;
      case 'BW':
        return 'Bi-Weekly';
        break;
      case 'M':
        return 'Monthly';
        break;
      case 'Q':
        return 'Quaterly';
        break;
      case 'A':
        return 'Annually';
        break;
      default:
        return 'NA'
        break;
    }
  }
  async sentBackForm() {
    // this.services.rloui.openDecisionAlert(actionObject).then((Response: any) => {
    //   console.log(Response);
    //   const inputMap = new Map();
    //   inputMap.clear();
    //   inputMap.set('HeaderParam.Decision', Response.DecisionReason);
    //   inputMap.set('HeaderParam.Remark', Response.Remarks);

    //   this.services.http.fetchApi('/acceptQDE', 'POST', inputMap, '/rlo-de').subscribe(
    //     async (httpResponse: HttpResponse<any>) => {
    //       const res = httpResponse.body;
    //       if (res != null) {
    //         // this.submitQDE(requestParams);
    //       }
    //     },
    //   );
    // });
    var componentCode = this.componentCode
    let actionObject: IUnderwriterActionObject = { componentCode: componentCode, action: 'sentBack' };
    const inputMap = new Map();
    this.services.rloui.openDecisionAlert(actionObject, this.applicationId).then((Response: any) => {
      console.log(Response);
      if (typeof Response == 'object') {
        let modalResponse = Response.response;
        if (modalResponse.DecisionReason != undefined || Response.action != "btn-close") {
          const inputMap = new Map();
          inputMap.clear();
          inputMap.clear();
          inputMap.set('Body.UserId', this.userId);
          inputMap.set('Body.TENANT_ID', this.tenantId);
          inputMap.set('Body.TaskId', this.taskId);
          inputMap.set('HeaderParam.ProcessId', this.processId);
          inputMap.set('Body.direction', 'SB');
          inputMap.set('Body.ApplicationId', this.ApplicationId);
          inputMap.set('Body.ApplicationStatus', 'Sendback');
          inputMap.set('Body.CurrentStage', 'UW');
          inputMap.set('HeaderParam.ServiceCode', this.serviceCode);
          inputMap.set('HeaderParam.Decision', Response.DecisionReason);
          inputMap.set('HeaderParam.Remark', Response.Remarks);

          this.services.http.fetchApi('/acceptUW', 'POST', inputMap, '/rlo-de').subscribe(
            async (httpResponse: HttpResponse<any>) => {
              const res = httpResponse.body;
              if (res != null) {
                this.services.router.navigate(['home', 'LANDING']);
                // this.submitQDE(requestParams);
              }
            },
          );
        }
      }
    });

    // this.services.http.fetchApi('/acceptUW', 'POST', inputMap, '/rlo-de').subscribe(
    //   async (httpResponse: HttpResponse<any>) => {
    //     const res = httpResponse.body;

    //     if (httpResponse.status == 200) {
    //       // var title = this.services.rloui.getAlertMessage('rlo.error.invalid.regex');
    //       var mainMessage = this.services.rloui.getAlertMessage('rlo.sentback.comfirmation');
    //       var button1 = this.services.rloui.getAlertMessage('', 'OK');
    //       var button2 = this.services.rloui.getAlertMessage('', 'CANCEL');

    //       Promise.all([mainMessage, button1, button2]).then(values => {
    //         console.log(values);
    //         let modalObj = {
    //           title: "Alert",
    //           mainMessage: values[0],
    //           modalSize: "modal-width-sm",
    //           buttons: [
    //             { id: 1, text: values[1], type: "success", class: "btn-primary" },
    //             { id: 2, text: values[2], type: "failure", class: "btn-warning-outline" }
    //           ]
    //         }

    //         this.services.rloui.confirmationModal(modalObj).then((response) => {
    //           console.log(response);
    //           if (response != null) {
    //             if (response.id === 1) {
    //               this.services.router.navigate(['home', 'LANDING']);
    //             }
    //           }
    //         });
    //       });
    //     }
    //   }
    // );
  }

}
