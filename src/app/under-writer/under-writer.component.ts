import { Component, OnInit } from '@angular/core';
import { UWCustomerTabComponent } from '../uw-cust-tab/uw-cust-tab.component';
//import { UWCustomerListComponent } from '../UWCustomerList/UWCustomerList.component';
import { ICardMetaData } from '../Interface/masterInterface';

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

  customizedJsonData = [
    {
      sectionName: "customer",
      data: {
        id: 1,
        fullName: "Sulaiman Neville",
        existingCustomer: true,
        dob: "23 Mar 1991"
      }
    },
    {
      sectionName: "interfaceResults",
      data: {
        customer: [
          {
            id: 1,
            name: "Vishal karan Kotwal",
            internalResults: [
              { watchOut: true }, { PAN: true }
            ],
            externalResults: [
              { watchOut: true }, { PAN: true }
            ],
          },
          {
            id: 2,
            name: "Darshan karan Kotwal",
            internalResults: [
              { watchOut: true }, { PAN: true }
            ],
            externalResults: [
              { watchOut: true }, { PAN: true }
            ],
          }
        ]
      }
    },
    {
      sectionName: "financialSummary",
      data: {
        id: 1,
        totalIncome: 10000,
        totalLiability: 10000,
        totalAsstValue: 20000
      }
    },
    {
      sectionName: "collateralDetails",
      data: {
        id: 1,
        type: "house",
        collateernalName: "",
        amount: 20000
      }
    },
    {
      sectionName: "familyDetails",
      data: null
    }
  ];

  customerSectionsList = [
    { responseName: "UWIncomeSummary", name: "financialSummary", displayName: "Financial Summary" },
    { responseName: "UWFamily", name: "familyDetails", displayName: "Family Details" },
    { responseName: "UWAddress", name: "addressDetails", displayName: "Address Details" }
  ];

  constructor() {
    console.log(this.customizedJsonData, this.customizedJsonData[0]);

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
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
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

}
