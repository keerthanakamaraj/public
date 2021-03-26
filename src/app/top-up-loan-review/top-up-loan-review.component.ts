import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxMasonryComponent, NgxMasonryOptions } from 'ngx-masonry';
import { forkJoin, Subscription } from 'rxjs';
import { FormComponent } from '../form/form.component';
import { HeaderComponent } from '../Header/Header.component';
import { IAmortizationForm, IAmortizationGridData, IGeneralCardData, IUwCustomerTab } from '../Interface/masterInterface';
import { RloCommonData } from '../rlo-services/rloCommonData.service';
import { ServiceStock } from '../service-stock.service';
import { UWCustomerTabComponent } from '../uw-cust-tab/uw-cust-tab.component';
import { Master } from './top-up-loan-review.model';

@Component({
  selector: 'app-top-up-loan-review',
  templateUrl: './top-up-loan-review.component.html',
  styleUrls: ['./top-up-loan-review.component.css']
})
export class TopUpLoanReviewComponent extends FormComponent implements OnInit {

  @ViewChild('FieldId_1', { static: false }) FieldId_1: HeaderComponent;
  @ViewChild(NgxMasonryComponent, { static: false }) masonry: NgxMasonryComponent;
  @ViewChild('UWTabs', { static: false }) UWTabs: UWCustomerTabComponent;

  isLoanCategory: boolean = false;

  customerList: IUwCustomerTab[] = [];//used in uw-cust-tab

  customerCardDataWithFields: IGeneralCardData;//store customer related data
  existingLoanCardDataWithFields: IGeneralCardData;//store existing Loan related data
  topUpLoanCardDataWithFields: IGeneralCardData;//store TopUp Loan related data
  breOutputDataWithFields: IGeneralCardData;//store bre related data

  borrowersBorrowerSeq: number = 0;

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
  isDataAvaliableFlag: number = -1;
  borrowerSeq: number = 0;

  customerMasterJsonData: Master;
  customersList: any;//list of customers
  customerSectionLoaded: boolean = false;

  public myOptions: NgxMasonryOptions = {
    gutter: 10,
    originTop: true,
    originLeft: true,
    // itemSelector: '.w-25'
  };

  workingJsonObj: any = {
    "UWApplication": {
      "UWCustomerDetails": [
        {
          "CIF": "",
          "BorrowerSeq": 4485,
          "CustomerId": 2735,
          "CustomerType": "B",
          "LoanOwnership": 100,
          "ExistingCustomer": "N",
          "UWIncomeSummary": {
            "NetIncomeMonthly": 90833,
            "DBR": 0.481,
            "IncomeSummarySeq": 585,
            "TotalIncome": 2100000,
            "TotalLiabiity": 1000000,
            "BorrowerSeq": 4485,
            "TotalObligation": 10000
          },
          "DOB": "18-10-1991",
          "FullName": "PREM DESAI",
          "UWFamily": [
            {
              "DOB": "1947-10-10 00:00:00.0",
              "FullName": "LOUIS  CONCESSO ",
              "Relationship": "FR",
              "BorrowerSeq": 4486,
              "CustomerRelated": 4485
            }
          ],
          "ApplicationId": 3548,
          "UWAddress": [
            {
              "State": "MAHARASHTRA",
              "Address2": "BRIGADE ROAD",
              "Address3": "",
              "AddressSeq": 2018,
              "Address1": "PALMS SQUARE",
              "BorrowerSeq": 4485,
              "City": "MUMBAI",
              "AddressType": "OF",
              "OccupationType": "",
              "Pincode": "400004"
            },
            {
              "State": "MAHARASHTRA",
              "Address2": "BRIGADE ROAD",
              "Address3": "",
              "AddressSeq": 2020,
              "Address1": "PALMS SQUARE",
              "BorrowerSeq": 4485,
              "City": "MUMBAI",
              "AddressType": "RS",
              "OccupationType": "OW",
              "Pincode": "400004"
            },
            {
              "State": "MAHARASHTRA",
              "Address2": "BRIGADE",
              "Address3": "",
              "AddressSeq": 2019,
              "Address1": "PALMS SQUARE",
              "BorrowerSeq": 4485,
              "City": "MUMBAI",
              "AddressType": "RS",
              "OccupationType": "OW",
              "Pincode": "400004"
            }
          ],
          "UWAsset": [
            {
              "AssetType": "VE",
              "AssetSeq": 628,
              "EquivalentAmt": 450000,
              "FairMarketValue": 450000,
              "AssetValue": 900000,
              "BorrowerSeq": 4485
            }
          ]
        }
      ],
      "UWApplicationInfo": {
        "PhysicalFormNo": "",
        "DateOfReceipt": "20-10-2020",
        "ApplicationInfoId": 3569,
        "ApplicationId": 3548
      },
      "Branch": "101",
      "UWLoan": {
        "TotalFeeAdjWithDisb": "",
        "TotalLoanAmount": "",
        "NetInterestRate": 9.5,
        "RepaymentStartDate": "",
        "MargineMoney": "",
        "DisbursalDate": "",
        "TotalInterestAmount": 9500,
        "RepaymentFrequency": "M",
        "AmortizationAmount": 8721.98,
        "Tenure": 12,
        "TenurePeriod": "MTHS",
        "TotalInstallmentAmount": 109500,
        "TotalFeeCollectedUpfront": "",
        "ProductCategory": "PL",
        "LoanDetailsSeq": 1216,
        "ApplicationId": 3548,
        "TotalDisbAmount": "",
        "LoanAccountNumber" : 12324332342,
        "LoanDisbursementDate" : '25-16-1995'
      },
      "DSAId": "USERS3",
      "LoanTopupDetails": {
        "MarginRate": "5",
        "ApplnPurpose": {
          "ApplnPurpose": "",
          "id": "",
          "text": ""
        },
        "TopupNetInstRate": "8",
        "NoOfInstallments": "5",
        "LD_TENURE": "yearly",
        "DisbursalDate": "29-10-2020",
        "RequiredEMIAmt": "40000",
        "TopupSeq": "123",
        "TenureBasis": {
          "TenureBasis": "",
          "id": "",
          "text": ""
        },
        "RepaymentDate": "29-10-2020",
        "ProposalId": "3548",
        "InterestRate": "5",
        "RepaymentFreq": {
          "id": "M",
          "text": "Monthly",
          "RepaymentFreq": "FREQUENCY"
        },
        "TopupAmount": "100000",
        "AppRefNum": "(null)",
        "RevisedAmount": "80000"
      },
      "SourcingChannel": "BRANCH",
      "UWQuestionnaire": [
        {
          "DeviationLevel": "",
          "QuestionnaireCategory": "per_int",
          "QuestionnaireSeq": 787,
          "BorrowerSeq": 4485,
          "ApplicationId": 3548
        },
        {
          "DeviationLevel": "",
          "QuestionnaireCategory": "per_int",
          "QuestionnaireSeq": 788,
          "BorrowerSeq": 4485,
          "ApplicationId": 3548
        },
        {
          "DeviationLevel": "",
          "QuestionnaireCategory": "go_no_go",
          "QuestionnaireSeq": 789,
          "BorrowerSeq": "",
          "ApplicationId": 3548
        },
        {
          "DeviationLevel": "",
          "QuestionnaireCategory": "go_no_go",
          "QuestionnaireSeq": 790,
          "BorrowerSeq": "",
          "ApplicationId": 3548
        },
        {
          "DeviationLevel": "",
          "QuestionnaireCategory": "go_no_go",
          "QuestionnaireSeq": 791,
          "BorrowerSeq": "",
          "ApplicationId": 3548
        },
        {
          "DeviationLevel": "",
          "QuestionnaireCategory": "go_no_go",
          "QuestionnaireSeq": 792,
          "BorrowerSeq": "",
          "ApplicationId": 3548
        }
      ],
      "ApplicationId": 3548,
      "UWNotepad": [
        {
          "NotepadSeq": ""
        },
        {
          "ApplicationId": ""
        },
        {
          "CommentCategory": ""
        },
        {
          "Comments": ""
        }
      ]
    }
  }

  validCardList = [
    { className: "CustomerDetails" },
    { className: "ExistingLoanDetails" },
    { className: "TopUpLoanDetails" },
    { className: "BreDetails" }
  ];

  headerMasterObj: any;
  reloadUWSectionsSubscription: Subscription;
  amortizationGridData: IAmortizationGridData = {};

  constructor(public services: ServiceStock, public rloCommonDataService: RloCommonData) {
    super(services);

    //when approved limit is changed in CC modal
    this.reloadUWSectionsSubscription = this.services.rloCommonData.topUpLoanCardDetails.subscribe((data: any) => {
      console.log("Selected card section", data);
      if (data.data == "Existing Loan Details") {
        this.setAmortizationScheduleObj('existing');
      } else {
        this.setAmortizationScheduleObj('topup');
      }
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.reloadUWSectionsSubscription.unsubscribe();
  }

  //@Output
  broadcastProdCategory(event) {
    console.log("shweta :: application global params", this.services.rloCommonData.globalApplicationDtls);
    this.headerMasterObj = this.services.rloCommonData.globalApplicationDtls;
    this.isLoanCategory = event.isLoanCategory;
    this.services.rloCommonData.globalApplicationDtls.SchemeCode = "MUREUR";
    this.getUnderWriterData();
  }

  customerSelectionChanged(data) {
    console.log(data);
    this.borrowerSeq = data.selectedBorrowerSeq;
    // this.selectedTabCardData(this.selectedTab, data.selectedBorrowerSeq);
    // setTimeout(() => {
    //   this.reloadCardGrid();
    // }, 10);
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
          //this.services.alert.showAlert(2, 'rlo.error.claim.dde', -1);
        }
      },
      async (httpError) => {
        //this.services.alert.showAlert(2, 'rlo.error.claim.dde', -1);
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

    // this.applicationId = 3548;
    //this.applicationId = 3641;
    if (this.userId === undefined || this.userId == '') {
      this.claimTask(this.taskId);
    }

    console.error("*******", this.applicationId);
    let appId = this.applicationId;
    //appId = 1118;

    this.loadBREResult();

    forkJoin(
      this.loadBREResult(),
      this.getTopUpSections()
    ).subscribe((response) => {
      console.log(response);
      response[0];
      this.factorTopUpCardsData(response[1], response[0])
    });

    // this.services.http.fetchApi(`/UWApplication/${appId}`, 'GET', new Map(), '/rlo-de').subscribe(
    //   async (httpResponse: HttpResponse<any>) => {
    //     const res = httpResponse.body;
    //     //const res = this.workingJsonObj; //testing
    //     console.warn(res);

    //     if (res != null) {
    //       this.isDataAvaliableFlag = 1;
    //       this.applicationId = res.UWApplication.ApplicationId;
    //       this.generateModelJson(res.UWApplication);
    //     }
    //     else {
    //       this.isDataAvaliableFlag = 0;
    //     }
    //   },
    //   async (httpError) => {
    //     const err = httpError['error'];
    //   }
    // );
  }

  factorTopUpCardsData(cardsData, breData) {
    if (cardsData != null) {
      this.isDataAvaliableFlag = 1;
      this.applicationId = cardsData.UWApplication.ApplicationId;
      this.generateModelJson(cardsData.UWApplication, breData);
    }
    else {
      this.isDataAvaliableFlag = 0;
    }
  }


  generateModelJson(cardsData, breData) {
    let obj = cardsData;
    obj["PolicyCheck"] = breData == null ? [] : breData.PolicyResult;
    console.log("DEEP | generateModelJson()", obj);

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
    this.borrowerSeq = this.customerList[0].BorrowerSeq;

    this.generateCustomerListDropDowns(obj["UWCustomerDetails"]);

    this.UWTabs.setCustomerList(this.customerList);//pass customer list to component

    this.customerMasterJsonData = new Master().deserialize(obj);
    console.log(this.customerMasterJsonData);
    this.customersList = this.customerMasterJsonData.CustomerDetails;

    this.selectedTabCardData();
  }


  selectedTabCardData() {
    let singleCustomer = this.customerMasterJsonData.CustomerDetails[0];
    console.error(singleCustomer);

    this.validCardList.forEach(element => {
      switch (element.className) {
        case "CustomerDetails":
          this.customerCardDataWithFields = singleCustomer.getCardData();
          this.customerCardDataWithFields.applicationId = this.applicationId;
          this.customerCardDataWithFields.borrowerSeq = this.borrowerSeq;
          this.customerCardDataWithFields.componentCode = this.componentCode;
          console.error(this.customerCardDataWithFields);
          break;

        case "ExistingLoanDetails":
          this.existingLoanCardDataWithFields = this.customerMasterJsonData["ExistingLoanDetails"].getCardData();
          this.existingLoanCardDataWithFields.applicationId = this.applicationId;
          this.existingLoanCardDataWithFields.borrowerSeq = this.borrowerSeq;
          this.existingLoanCardDataWithFields.componentCode = this.componentCode;

          let uiFileds = this.existingLoanCardDataWithFields.data;
          uiFileds[0].subTitle = "Personal Loan";//this.headerMasterObj.ProductName;//product
          uiFileds[1].subTitle = "Personal Loan";//this.headerMasterObj.SubProductName;//sub product
          uiFileds[2].subTitle = this.headerMasterObj.SchemeName == undefined ? "NA" : this.headerMasterObj.SchemeName;//scheme
          if (this.headerMasterObj.PromotionName != undefined) {
            uiFileds[3].subTitle = this.headerMasterObj.PromotionName//promotion
          }
          console.log(this.existingLoanCardDataWithFields);
          break;

        case "TopUpLoanDetails":
          this.topUpLoanCardDataWithFields = this.customerMasterJsonData["TopUpLoanDetails"].getCardData();
          this.topUpLoanCardDataWithFields.applicationId = this.applicationId;
          this.topUpLoanCardDataWithFields.borrowerSeq = this.borrowerSeq;
          this.topUpLoanCardDataWithFields.componentCode = this.componentCode;
          let obj = {
            RevisedLoanAmount : this.topUpLoanCardDataWithFields.data[2].subTitle,
            EMIAmt : this.topUpLoanCardDataWithFields.data[8].subTitle

          }
          this.rloCommonDataService.TopUploanData = obj
          console.log("new top up data" ,this.rloCommonDataService.TopUploanData);
          console.log(this.topUpLoanCardDataWithFields);
          break;

        case "  ":
          this.breOutputDataWithFields = this.customerMasterJsonData["BreDetails"].getCardData();
          this.breOutputDataWithFields.applicationId = this.applicationId;
          this.breOutputDataWithFields.borrowerSeq = this.borrowerSeq;
          this.breOutputDataWithFields.componentCode = this.componentCode;
          console.log(this.breOutputDataWithFields);
          break;

        default:
          break;
      }
    });

    setTimeout(() => {
      this.customerSectionLoaded = true;
      console.warn("****");
      this.reloadCardGrid();
    }, 500);
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

  reloadCardGrid() {
    //this.updateMasonryLayout = true;
    //console.log(this.updateMasonryLayout);
    this.masonry.reloadItems();
    this.masonry.layout();
  }

  setAmortizationScheduleObj(loanType: string) {
    let loanDetails = loanType == 'existing' ? this.customerMasterJsonData['ExistingLoanDetails'] : this.customerMasterJsonData['TopUpLoanDetails'];
    const moment = require('moment');

    console.log(loanDetails);
    this.amortizationGridData.productCode = 'Installment Plan';
    this.amortizationGridData.subProductCode = 'Installment Plan';
    this.amortizationGridData.installmentFrequency = '1'

    if (loanType == "existing") {
      this.amortizationGridData.loanAmount = 1000000;
      this.amortizationGridData.interestRate = loanDetails['NetInterestRate'];
      this.amortizationGridData.disbursalDate = "30-Nov-2018";
      this.amortizationGridData.firstInstallmentDate = "30-DEC-2018";

      this.amortizationGridData.noOfInstallments = "66";
      this.amortizationGridData.installmentFreqIndicator = "M";
      this.amortizationGridData.FreqIndctrDesc = this.getFrequencyFullNames("M");
    } else {
      this.amortizationGridData.loanAmount = loanDetails['RevisedAmount'];
      this.amortizationGridData.interestRate = loanDetails['TopupNetInstRate'];
      this.amortizationGridData.disbursalDate = loanDetails['DisbursalDate'];
      this.amortizationGridData.firstInstallmentDate = loanDetails['RepaymentDate'];

      this.amortizationGridData.noOfInstallments = loanDetails['NoOfInstallments'];//missing
      this.amortizationGridData.installmentFreqIndicator = loanDetails['RepaymentFreq'].id;
      this.amortizationGridData.FreqIndctrDesc = this.getFrequencyFullNames(loanDetails['RepaymentFreq'].id);
    }

    console.log(this.amortizationGridData);
    this.services.rloCommonData.selectedTopUpPlanCard = this.amortizationGridData;
    return;
  }

  getFrequencyFullNames(keys) {
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
      case 'Y':
        return 'Yearly';
        break;
      default:
        return ''
        break;
    }
  }

  /* Cancel / Back button */
  goBack() {
    this.services.rloui.goBack();
  }

  fabopen() {
    document.getElementById("fab-show").style.display = "block";
    document.getElementById("fab-open").style.display = "none";
  }

  fabclose() {
    document.getElementById("fab-show").style.display = "none";
    document.getElementById("fab-open").style.display = "block";
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
            //this.submitDDE(requestParams);
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
            //this.submitDDE(requestParams);
          }
        }
      });
    });
  }

  approveForm() {
    const requestParams = new Map();

    requestParams.set('Body.ApplicationStatus', this.applicationStatus);
    requestParams.set('Body.direction', this.applicationStatus);
    this.submitDDE(requestParams);
  }

  async submitDDE(requestParams) {
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

  loadBREResult() {
    const promise = new Promise((resolve, reject) => {
      let inputMap = new Map();
      inputMap.clear();
      let criteriaJson: any = { "Offset": 1, "Count": 10, FilterCriteria: [] };
      if (this.applicationId) {
        criteriaJson.FilterCriteria.push({
          "columnName": "ApplicationId",
          "columnType": "String",
          "conditions": {
            "searchType": "equals",
            "searchText": this.applicationId
          }
        });
        // inputMap.set('QueryParam.ApplicationId', this.applicationId);
        inputMap.set('QueryParam.criteriaDetails', criteriaJson);
        this.services.http.fetchApi('/PolicyResult', 'GET', inputMap, '/rlo-de').subscribe(
          async (httpResponse: HttpResponse<any>) => {
            let res = httpResponse.body;
            resolve(res);
          },
          async (httpError) => {
            var err = httpError['error']

          }
        );
      }

    });
    return promise;
  }

  getTopUpSections() {
    const promise = new Promise((resolve, reject) => {

      this.services.http.fetchApi(`/UWApplication/${this.applicationId}`, 'GET', new Map(), '/rlo-de').subscribe(
        async (httpResponse: HttpResponse<any>) => {
          let res = httpResponse.body;
          res = this.workingJsonObj;
          resolve(res);
        },
        async (httpError) => {

        }
      );

    });
    return promise;
  }


}
