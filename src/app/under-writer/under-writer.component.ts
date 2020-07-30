import { Component, OnInit, ViewChild } from '@angular/core';
import { UWCustomerTabComponent } from '../uw-cust-tab/uw-cust-tab.component';
//import { UWCustomerListComponent } from '../UWCustomerList/UWCustomerList.component';
import { ICardMetaData, IUwCustomerTab, IGeneralCardData } from '../Interface/masterInterface';
import { RloCommonData } from '../rlo-services/rloCommonData.service';
import { Master } from './under-writer.model';
import { HeaderComponent } from '../Header/Header.component';
import { FormComponent } from '../form/form.component';
import { ServiceStock } from '../service-stock.service';
// import { NgxMasonryOptions } from 'ngx-masonry';
import { NgxMasonryOptions, NgxMasonryComponent } from 'ngx-masonry';
import { HttpResponse } from '@angular/common/http';

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
        // { className: "InterfaceResults" },
        // { className: "VehicalDetails" },
        { className: "CardDetails" },
        { className: "GoldDetails" },
        // { className: "EducationDetails" },
        { className: "GoNoGoDetails" },
        { className: "ApplicationDetails" },

        { className: "ReferalDetails" },
        { className: "Notes" },
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

  loanDetailsCardData: IGeneralCardData//stores loan Details card data
  interfaceResultCardData: IGeneralCardData;

  selectedTab: string = "customer";
  updateMasonryLayout: boolean = false;

  headerScoreCard = [
    {
      type: "Final DBR",
      score: 54,
    },
    {
      type: "Fire Policy",
      score: 36,
    },
    {
      type: "Application Score",
      score: 75,
    }
  ];

  public myOptions: NgxMasonryOptions = {
    gutter: 10,
    originTop: true,
    originLeft: true,
    // itemSelector: '.w-25'
  };

  masonryItems = [
    { title: 'item 1', width: '50%', height: '50em', height2: 'auto', class: "col-sm-6 col-md-6 col-lg-6", color: "red", class2: "w-25" },
    { title: 'item 2', width: '25%', height: '50em', height2: 'auto', class: "col-sm-3 col-md-3 col-lg-3", color: "red", class2: "w-25" },
    { title: 'item 3', width: '25%', height: '50em', height2: 'auto', class: "col-sm-3 col-md-3 col-lg-3", color: "red", class2: "w-25" },
    { title: 'item 4', width: '50%', height: '50em', height2: 'auto', class: "col-sm-3 col-md-3 col-lg-3", color: "red", class2: "w-25" },
    { title: 'item 5', width: '25%', height: '50em', height2: 'auto', class: "col-sm-3 col-md-3 col-lg-3", color: "red", class2: "w-25" },
    { title: 'item 6', width: '25%', height: '50.3em', height2: 'auto', class: "col-sm-3 col-md-3 col-lg-3", color: "red", class2: "w-25" },
    { title: 'item 7', width: '50%', height: '50.2em', height2: 'auto', class: "col-sm-3 col-md-3 col-lg-3", color: "red", class2: "w-25" },
    { title: 'item 8', width: '25%', height: '50em', height2: 'auto', class: "col-sm-3 col-md-3 col-lg-3", color: "red", class2: "w-25" },
  ];

  applicationSectionLoaded: boolean = false;
  customerSectionLoaded: boolean = false;

  workingJsonObj = {
    "UWCustomerDetails": [
      {
        "ExistingCustomer": "N",
        "UWIncomeSummary": {
          "NetIncomeMonthly": 120,
          "DBR": 65,
          "IncomeSummarySeq": 101,
          "TotalIncome": 1500000,
          "TotalLiabiity": 0,
          "BorrowerSeq": 2251,
          "TotalObligation": 100
        },
        "DOB": "04-05-1995",
        "FullName": "Deepesh jain",
        "BorrowerSeq": 1496,
        "ApplicationId": 1486,
        "CustomerType": "B",
        "UWAddress": [
          {
            "State": "Maharashtra",
            "AddressSeq": 829,
            "Address1": "virar",
            "BorrowerSeq": 2251,
            "City": "Mumbai",
            "AddressType": "OF",
            "Pincode": 400060,
            "test": "aaaaaa"
          },
          {
            "State": "Maharashtra",
            "AddressSeq": 728,
            "Address1": "bncbv",
            "BorrowerSeq": 2251,
            "City": "Mumbai",
            "AddressType": "RS",
            "OccupationType": "OW",
            "Pincode": 400060
          },
          {
            "State": "Maharashtra",
            "AddressSeq": 727,
            "Address1": "virar",
            "BorrowerSeq": 2251,
            "City": "Mumbai",
            "AddressType": "RS",
            "OccupationType": "OW",
            "Pincode": 400060
          }
        ],
        "UWFamily": [
          {
            "DOB": "1995-07-01 00:00:00.0",
            "FullName": "YTRI YUTU UYTU ",
            "Relationship": "BR",
            "BorrowerSeq": 3291,
            "CustomerRelated": 2251
          },
          {
            "DOB": "0",
            "FullName": "0",
            "Relationship": "0",
            "BorrowerSeq": 0,
            "CustomerRelated": 0
          }
        ],
        "UWIncomeDetails": {
          "GrossIncome": "pending",
          "ExistingLiabilities": "completed",
          "IncomeVerification": "completed",
          "PANVerification": "deviation",
        }
      },
      {
        "ExistingCustomer": "N",
        "UWIncomeSummary": {
          "NetIncomeMonthly": 0,
          "DBR": 0,
          "IncomeSummarySeq": 101,
          "BorrowerSeq": 2251,
          "TotalObligation": 0
        },
        "DOB": "04-05-1995",
        "FullName": "Juhi S Patil",
        "BorrowerSeq": 1495,
        "ApplicationId": 1486,
        "CustomerType": "CB"
      }
    ],
    "UWApplicationInfo": {
      "DateOfReceipt": "13-05-2020 00:00:00",
      "ApplicationInfoId": 2082,
      "ApplicationId": 2061
    },
    "Branch": "101",
    "UWLoan": {
      "LoanDetailsSeq": 702,
      "ApplicationId": 2061
    },
    "DSAId": "USERS2",
    "SourcingChannel": "MUM",
    "ApplicationId": 2061
  };

  applicationId: number = 0;
  borrowerSeq: number = 0;
  isDataAvaliableFlag: number = -1;

  componentCode = 'UnderWriter';

  constructor(public services: ServiceStock, public rloCommonDataService: RloCommonData) {
    super(services);
    this.getUnderWriterData();
    //this.generateModelJson({});
  }

  getUnderWriterData() {
    //valid application id - 1675 1937 1678 1673(RM visit)
    let appId = "1678";

    this.services.http.fetchApi(`/UWApplication/${appId}`, 'GET', new Map(), '/rlo-de').subscribe(
      async (httpResponse: HttpResponse<any>) => {
        const res = httpResponse.body;
        console.warn(res);

        if (res != null) {
          this.isDataAvaliableFlag = 1;
          this.applicationId = res.UWApplication.ApplicationId;
          this.generateModelJson(res.UWApplication);
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

  ngOnInit() { }

  ngOnDestroy() {
    this.services.rloui.closeAllConfirmationModal();
  }

  ngAfterViewInit() {
    // setTimeout(() => {
    //   this.reloadCardGrid();
    // }, 10);
    //withdraw  reject  pre-cpv
  }

  //@Output
  brodcastProdCategory() { }

  //@Output
  headerState() { }

  //under-writer.component.ts
  generateModelJson(jsonData) {
    let obj = jsonData;
    //let obj = this.workingJsonObj;

    //data for cust-tabs
    obj["UWCustomerDetails"].forEach(element => {
      const data: IUwCustomerTab = {
        "BorrowerSeq": element.BorrowerSeq,
        "CD_CUSTOMER_NAME": element.FullName,
        "CD_CUSTOMER_TYPE": element.CustomerType
      };

      if (element.CustomerType != "R")
        this.customerList.push(data);
    });

    this.UWTabs.setCustomerList(this.customerList);//pass customer list to component
    this.borrowerSeq = this.customerList[0].BorrowerSeq;

    //manager data for cards
    this.customerMasterJsonData = new Master().deserialize(obj);
    console.log(this.customerMasterJsonData);

    let productCategory = this.customerMasterJsonData.productCategory;
    let validSectionList = [];

    for (let i = 0; i < this.allSectionsCardData[1].cardList.length; i++) {
      const element = this.allSectionsCardData[1].cardList[i];
      if (productCategory == "CC") {
        if (element.className != "VehicalDetails" && element.className != "GoldDetails") {
          validSectionList.push(element);
        }
      } else if (productCategory == "AL") {
        if (element.className != "CardDetails" && element.className != "GoldDetails") {
          validSectionList.push(element);
        }
      }
    }
    this.allSectionsCardData[1].cardList = validSectionList;
    console.log(this.allSectionsCardData[1].cardList);

    this.selectedTabCardData(this.selectedTab);
  }

  isJsonEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

  selectedTabCardData(sectionType: string = "customer", menuIndex: number = 0) {
    let data: IGeneralCardData;

    if (sectionType == "customer") {
      this.cCardDataWithFields = [];
      this.cBlankCardData = [];

      let singleCustomer = this.customerMasterJsonData.CustomerDetails[menuIndex];
      console.error(singleCustomer);

      this.allSectionsCardData[0].cardList.forEach(element => {
        switch (element.className) {
          case "CustomerDetails":
            this.customerCardDataWithFields = singleCustomer.getCardData();
            this.customerCardDataWithFields.applicationId = this.applicationId;
            this.customerCardDataWithFields.borrowerSeq = this.borrowerSeq;
            this.customerCardDataWithFields.componentCode = this.componentCode;
            console.error(this.customerCardDataWithFields);
            break;

          case "FinancialSummary":
          case "AddressDetails":
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
      }, 500);
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
            this.interfaceResultCardData = application.InterfaceResults.getCardData();
            this.interfaceResultCardData.applicationId = this.applicationId;
            this.interfaceResultCardData.borrowerSeq = this.borrowerSeq;
            this.interfaceResultCardData.componentCode = this.componentCode;
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
          case "CardDetails":
          case "GoldDetails":
          case "EducationDetails":
          case "GoNoGoDetails":
            data = application[element.className].getCardData();
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
    this.selectedTabCardData(this.selectedTab, data.index);
    setTimeout(() => {
      this.reloadCardGrid();
    }, 10);
  }

  tabSwitched(tab: string) {
    console.log("tab switched", tab);
    if (this.selectedTab == tab)
      return;

    this.selectedTab = tab;
    this.selectedTabCardData(this.selectedTab);

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

}
