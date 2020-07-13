import { Component, OnInit } from '@angular/core';
import { UWCustomerTabComponent } from '../uw-cust-tab/uw-cust-tab.component';
//import { UWCustomerListComponent } from '../UWCustomerList/UWCustomerList.component';
import { ICardMetaData } from '../Interface/masterInterface';
import { RloCommonData } from '../rlo-services/rloCommonData.service';
import { Master } from './under-writer.model';

class IbasicCardSectionData {
  cardType: string;
  sectionList: Array<any> = [];
}

@Component({
  selector: 'app-under-writer',
  templateUrl: './under-writer.component.html',
  styleUrls: ['./under-writer.component.css']
})
export class UnderWriterComponent implements OnInit {

  customerCardSectionData: any;
  interfaceCardSectionData: any;

  commonBlankCardSectionData: Array<any> = [];
  basicCardSectionData: IbasicCardSectionData = {
    cardType: '',
    sectionList: []
  };

  allSectionCard

  customerSectionData = [
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
  ];

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
        { className: "Customer" },
        { className: "FinancialSummary" },
        // { className: "FamilyDetails", displayName: "Family Details" },
        { className: "AddressDetails" },
        { className: "FinancialDetails" },
        { className: "CollateralDetails" }
      ]
    },
    {
      type: "application"
    }
  ];

  cardDataWithFields = [];

  constructor(public rloCommonDataService: RloCommonData) {

    // this.customizedJsonData.forEach(element => {
    //   if (element.data != null) {
    //     switch (element.sectionName) {
    //       case "customer":
    //         this.customerCardSectionData = element;
    //         this.customerCardSectionData["cardType"] = "customer";
    //         break;

    //       case "interfaceResults":
    //         this.interfaceCardSectionData = element;
    //         this.interfaceCardSectionData["cardType"] = "interfaceResult";
    //         break;

    //       default:
    //         this.basicCardSectionData["sectionList"].push(element);
    //         this.basicCardSectionData["cardType"] = "commonCard";
    //         break;
    //     }
    //   }
    //   else {
    //     this.commonBlankCardSectionData.push(element);
    //   }
    // });

    this.refactorData();
    this.test();
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  //@Output
  brodcastProdCategory() {

  }

  //@Output
  headerState() {

  }

  refactorData() {
    let obj;
    this.customerSectionsList.forEach(section => {
      if (this.singleCustomerData.hasOwnProperty(section.responseName)) {
        switch (section.responseName) {
          case "UWIncomeSummary":
          case "UWFamily":
          case "UWAddress":
            const obj: ICardMetaData = {
              id: section.name,
              displayName: section.displayName,
              data: this.singleCustomerData[section.responseName],
              type: "basicCard"
            }
            this.basicCardSectionData["cardType"] = "basicCard";
            this.basicCardSectionData["sectionList"].push(obj);
            delete this.singleCustomerData[section.responseName];
            break;

          default:
            break;
        }
      }
    });

    this.addCustomerData();

    console.log(this.customerCardSectionData);
    console.log(this.basicCardSectionData);
  }

  addCustomerData() {
    const object: ICardMetaData = {
      id: "customer",
      displayName: "Customer 360 degrees",
      data: this.singleCustomerData,
      type: "customerCard"
    };

    this.customerCardSectionData = object;
  }

  tabSwitched() {

  }

  //under-writer.component.ts
  test() {
    let obj = [{
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
        "TotalIncome": 0,
        "TotalLiabiity": 0,
        "BorrowerSeq": 2251,
        "TotalObligation": 0
      },
      "DOB": "04-05-1995",
      "FullName": "Juhi S Patil"
    }];

    this.customerMasterJsonData = new Master().deserialize(obj);
    console.log(this.customerMasterJsonData);

    let singleCustomer = this.customerMasterJsonData.CustomerDetails[0];
    console.log(singleCustomer, singleCustomer.FamilyDetails, singleCustomer.FinancialSummary.getBorrowerSeq(), singleCustomer.FinancialSummary, singleCustomer.FinancialSummary.test);

    this.selectedCustomerCardData()
  }

  isJsonEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

  selectedCustomerCardData(menuIndex: number = 0, sectionType: string = "customer") {
    let data;
    if (sectionType == "customer") {
      let singleCustomer = this.customerMasterJsonData.CustomerDetails[menuIndex];
      this.allSectionsCardData[0].cardList.forEach(element => {
        switch (element.className) {
          case "FinancialSummary":
            data = singleCustomer.FinancialSummary.getCardData();
            this.cardDataWithFields.push(data);
            break;

          case "AddressDetails":
            data = singleCustomer.AddressDetails.getCardData();
            this.cardDataWithFields.push(data);
            break;

          case "FinancialDetails":
            data = singleCustomer.FinancialDetails.getCardData();
            this.cardDataWithFields.push(data);
            break;

          case "CollateralDetails":
            data = singleCustomer.CollateralDetails.getCardData();
            this.cardDataWithFields.push(data);
            break;

          default:
            break;
        }
      });
    }
    console.error(this.cardDataWithFields);
  }
}
