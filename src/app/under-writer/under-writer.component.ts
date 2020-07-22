import { Component, OnInit, ViewChild } from '@angular/core';
import { UWCustomerTabComponent } from '../uw-cust-tab/uw-cust-tab.component';
//import { UWCustomerListComponent } from '../UWCustomerList/UWCustomerList.component';
import { ICardMetaData, IUwCustomerTab } from '../Interface/masterInterface';
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

  customerCardSectionData: any;
  //interfaceCardSectionData: any;

  commonBlankCardSectionData: Array<any> = [];
  basicCardSectionData: IbasicCardSectionData = {
    cardType: '',
    sectionList: []
  };

  allSectionCard

  customerSectionData = {
    "UWApplication": {
      "UWCustomerDetails": [
        {
          "ExistingCustomer": "N",
          "UWIncomeSummary": {
            "NetIncomeMonthly": 0,
            "DBR": 0,
            "IncomeSummarySeq": 101,
            "TotalIncome": 0,
            "TotalLiabiity": 0,
            "BorrowerSeq": 2251,
            "TotalObligation": 0
          },
          "DOB": "04-05-1995",
          "FullName": "Juhi S Patil",
          "UWFamily": [
            {
              "DOB": "1995-07-01 00:00:00.0",
              "FullName": "YTRI YUTU UYTU ",
              "Relationship": "BR",
              "BorrowerSeq": 3291,
              "CustomerRelated": 2251
            }
          ],
          "BorrowerSeq": 2251,
          "ApplicationId": 2061,
          "CustomerType": "B",
          "UWAddress": [
            {
              "State": "Maharashtra",
              "AddressSeq": 829,
              "Address1": "virar",
              "BorrowerSeq": 2251,
              "City": "Mumbai",
              "AddressType": "OF",
              "Pincode": 400060
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
          ]
        },
        {
          "FullName": "JUHI ",
          "BorrowerSeq": 3272,
          "ApplicationId": 2061,
          "CustomerType": "R",
          "UWAddress": [
            {
              "State": "MAHARASHTRA",
              "AddressSeq": 1288,
              "Address1": "BHAYANDER",
              "BorrowerSeq": 3272,
              "City": "MUMBAI",
              "Pincode": 400001
            },
            {
              "State": "MAHARASHTRA",
              "AddressSeq": 1289,
              "Address1": "BHAYANDER",
              "BorrowerSeq": 3272,
              "City": "MUMBAI",
              "Pincode": 400001
            }
          ]
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
    }
  }

  singleCustomerData = {
    "ExistingCustomer": "N",
    "UWIncomeSummary": {
      "NetIncomeMonthly": 0,
      "DBR": 0,
      "IncomeSummarySeq": 101,
      "TotalIncome": 0,
      "TotalLiabiity": 0,
      "BorrowerSeq": 2251,
      "TotalObligation": 0
    },
    "DOB": "04-05-1995",
    "FullName": "Juhi S Patil",
    "UWFamily": [
      {
        "DOB": "1995-07-01 00:00:00.0",
        "FullName": "YTRI YUTU UYTU ",
        "Relationship": "BR",
        "BorrowerSeq": 3291,
        "CustomerRelated": 2251
      }
    ],
    "BorrowerSeq": 2251,
    "ApplicationId": 2061,
    "CustomerType": "B",
    "UWAddress": [
      {
        "State": "Maharashtra",
        "AddressSeq": 829,
        "Address1": "virar",
        "BorrowerSeq": 2251,
        "City": "Mumbai",
        "AddressType": "OF",
        "Pincode": 400060
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
    ]
  };

  // customizedJsonData = [
  //   {
  //     sectionName: "customer",
  //     data: {
  //       id: 1,
  //       fullName: "Sulaiman Neville",
  //       existingCustomer: true,
  //       dob: "23 Mar 1991"
  //     }
  //   },
  //   {
  //     sectionName: "interfaceResults",
  //     data: {
  //       customer: [
  //         {
  //           id: 1,
  //           name: "Vishal karan Kotwal",
  //           internalResults: [
  //             { watchOut: true }, { PAN: true }
  //           ],
  //           externalResults: [
  //             { watchOut: true }, { PAN: true }
  //           ],
  //         },
  //         {
  //           id: 2,
  //           name: "Darshan karan Kotwal",
  //           internalResults: [
  //             { watchOut: true }, { PAN: true }
  //           ],
  //           externalResults: [
  //             { watchOut: true }, { PAN: true }
  //           ],
  //         }
  //       ]
  //     }
  //   },
  //   {
  //     sectionName: "financialSummary",
  //     data: {
  //       id: 1,
  //       totalIncome: 10000,
  //       totalLiability: 10000,
  //       totalAsstValue: 20000
  //     }
  //   },
  //   {
  //     sectionName: "collateralDetails",
  //     data: {
  //       id: 1,
  //       type: "house",
  //       collateernalName: "",
  //       amount: 20000
  //     }
  //   },
  //   {
  //     sectionName: "familyDetails",
  //     data: null
  //   }
  // ];

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
        { className: "FinancialDetails" },
        { className: "CollateralDetails" },

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
        { className: "VehicalDetails" },
        { className: "CardDetails" },
        { className: "GoldDetails" },
        { className: "EducationDetails" },
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
  cCardDataWithFields = [
    {
      "isEnabled": true,
      "name": "Financial Summary",
      "modalSectionName": "",
      "data": []
    }
  ];
  cBlankCardData = [];

  aCardDataWithFields = [];//used to iterate and pass data to ui-card-field
  aBlankCardData = [];

  customerList: IUwCustomerTab[] = [];//used in uw-cust-tab
  customerCardDataWithFields: any;//store customer related data

  loanDetailsCardData: any//stores loan Details card data
  interfaceResultCardData: any;

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
    // originTop: true,
    // originLeft: true,
    // itemSelector: '.w-25'
  };

  public myOptions2: NgxMasonryOptions = {
    gutter: 10,
    // originTop: true,
    // originLeft: true,
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

  constructor(public services: ServiceStock, public rloCommonDataService: RloCommonData) {
    super(services);
    this.getUnderWriterData();
    //this.generateModelJson({});
  }

  getUnderWriterData() {
    this.services.http.fetchApi('/UWApplication/1497', 'GET', new Map(), '/rlo-de').subscribe(
      async (httpResponse: HttpResponse<any>) => {
        const res = httpResponse.body;
        console.warn(res);
        this.generateModelJson(res);
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

  ngAfterViewInit() {
    setTimeout(() => {
      this.reloadCardGrid();
    }, 10);
  }

  //@Output
  brodcastProdCategory() { }

  //@Output
  headerState() { }

  addCustomerData() {
    const object: ICardMetaData = {
      id: "customer",
      displayName: "Customer 360 degrees",
      data: this.singleCustomerData,
      type: "customerCard"
    };

    this.customerCardSectionData = object;
  }

  //under-writer.component.ts
  generateModelJson(jsonData) {
    //let obj = jsonData;
    let obj = this.workingJsonObj;

    //data for cust-tabs
    obj["UWCustomerDetails"].forEach(element => {
      const data: IUwCustomerTab = {
        "BorrowerSeq": element.BorrowerSeq,
        "CD_CUSTOMER_NAME": element.FullName,
        "CD_CUSTOMER_TYPE": element.CustomerType
      };
      this.customerList.push(data);
    });

    //manager data for cards
    this.customerMasterJsonData = new Master().deserialize(obj);
    console.log(this.customerMasterJsonData);

    let singleCustomer = this.customerMasterJsonData.CustomerDetails[0];
    console.log(singleCustomer, singleCustomer.FamilyDetails, singleCustomer.FinancialSummary.getBorrowerSeq(), singleCustomer.FinancialSummary, singleCustomer.FinancialSummary.test);

    this.selectedTabCardData(this.selectedTab);

    //this.getAllData();
  }

  isJsonEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

  selectedTabCardData(sectionType: string = "customer", menuIndex: number = 0) {
    let data;

    if (sectionType == "customer") {
      this.cCardDataWithFields = [];
      this.cBlankCardData = [];

      let singleCustomer = this.customerMasterJsonData.CustomerDetails[menuIndex];
      console.error(singleCustomer);

      this.allSectionsCardData[0].cardList.forEach(element => {
        switch (element.className) {
          case "CustomerDetails":
            this.customerCardDataWithFields = singleCustomer.getCardData();
            console.error(this.customerCardDataWithFields);
            break;

          case "FinancialSummary":
          case "AddressDetails":
          case "FinancialDetails":
          case "CollateralDetails":
            data = singleCustomer[element.className].getCardData();
            this.cCardDataWithFields.push(data);
            break;

          case "FamilyDetails":
          case "PersonalInterview":
          case "RmVisitDetails":
            data = singleCustomer[element.className].getCardData();
            this.cBlankCardData.push(data);
            break;

          default:
            break;
        }
      });

      console.warn(this.cCardDataWithFields, this.cBlankCardData);
      console.warn(JSON.stringify(this.cCardDataWithFields));
      console.warn(JSON.stringify(this.cBlankCardData));
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
            console.log(this.loanDetailsCardData);
            break;

          case "InterfaceResults":
            this.interfaceResultCardData = application.InterfaceResults.getCardData();
            console.log(this.interfaceResultCardData);
            break;

          case "ApplicationDetails":
            data = application.getCardData();
            this.aCardDataWithFields.push(data);
            break;


          case "VehicalDetails":
          case "CardDetails":
          case "GoldDetails":
          case "EducationDetails":
          case "GoNoGoDetails":
            data = application[element.className].getCardData();
            this.aCardDataWithFields.push(data);
            break;

          case "ReferalDetails":
          case "Notes":
            data = application[element.className].getCardData();
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
    this.selectedTabCardData(this.selectedTab, data.index);
    setTimeout(() => {
      this.reloadCardGrid();
    }, 10);
  }

  tabSwitched(tab: string) {
    console.log("tab switched", tab);
    this.selectedTab = tab;

    this.selectedTabCardData(this.selectedTab);

    tab == "customer" ? this.applicationSectionLoaded = false : this.customerSectionLoaded = false;

    // if (tab == "customer") {
    //   this.applicationSectionLoaded = false;
    // }
    // else {
    //   this.customerSectionLoaded = false;
    // }
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

}
