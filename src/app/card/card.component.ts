import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { RloUiCardFieldComponent } from '../rlo-ui-card-field/rlo-ui-card-field.component';
import { IAccountDetails, ICardMetaData, IGeneralCardData, IInterfaceDataIndicator, IInterfaceListData } from '../Interface/masterInterface';
import { CardModule } from './card.module';
import { IModalData } from '../popup-alert/popup-interface';
import { ServiceStock } from '../service-stock.service';

class ICardConfig {
  class: string;
  headerName: string;
  isExpandable: boolean;
  data?: any;
}

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input('cardMetaData') cardMetaData: IGeneralCardData;

  cardConfig = new Map();
  cardName: string;

  customerConfig = {
    headerName: 'Customer 360 degrees',
    isExpandable: true
  };

  interface = {
    headerName: 'Interface Results',
    isExpandable: true
  };

  testData = {
    modalSectionName: "",
    subTitle: "completed",
    title: "Verification",
    type: "icon"
  }

  customerList = [];

  testJson = [
    {
      CustomerType: "B",
      FullName: "Tim cook",
      data: [
        {
          type: "External Interface Results",
          class: "external",
          data: [
            { type: "icon", title: "watchout", subTitle: 'completed', modalSectionName: "" },
            { type: "icon", title: "Google", subTitle: 'completed', modalSectionName: "" },
          ]
        },
        {
          type: "Internal Interface Results",
          class: "internal",
          data: [
            { type: "icon", title: "PAN", subTitle: 'pending', modalSectionName: "" },
            { type: "icon", title: "CIBIL", subTitle: 'completed', modalSectionName: "" },
            { type: "icon", title: "AMLOCK", subTitle: 'completed', modalSectionName: "" }
          ]
        }
      ]
    },
    {
      CustomerType: "CB",
      FullName: "Ron cook",
      data: [
        {
          type: "External Interface Results",
          class: "external",
          data: [
            { type: "icon", title: "watchout", subTitle: 'completed', modalSectionName: "" },
            { type: "icon", title: "Google2", subTitle: 'completed', modalSectionName: "" },
          ]
        },
        {
          type: "Internal Interface Results",
          class: "internal",
          data: [
            { type: "icon", title: "PAN", subTitle: 'completed', modalSectionName: "" },
            { type: "icon", title: "CIBIL", subTitle: 'pending', modalSectionName: "" },
            { type: "icon", title: "AMLOCK", subTitle: 'disabled', modalSectionName: "" }
          ]
        }
      ]
    }
  ];

  interfaceResultsData = [];//interface results predefined json

  selectedCustomerData: { name: string, index: number } = { name: "", index: 0 };
  commonCardSectionData: Array<ICardConfig>;

  accountDetailsList: IAccountDetails[] = [];
  interfaceCount: number = 0;

  constructor(private changeDetector: ChangeDetectorRef, private services: ServiceStock) {
    this.cardConfig.set("customer", this.customerConfig);
    this.cardConfig.set("interfaceResults", this.interface);

    //get interface data;
    //this.getInterfaceData(this.testJson);
  }

  ngOnInit() {
    console.log(this.cardMetaData);
  }

  ngAfterViewInit() {
    if (this.cardMetaData != undefined)
      this.cardName = this.cardMetaData.name;

    if (this.cardMetaData.modalSectionName == "CustomerDetails") {
      this.accountDetailsList = this.cardMetaData.accountDetails;
      console.log("DEEP | accountDetailsList", this.accountDetailsList);
      this.accountDetailsList.forEach(element => {
        element.AvailableBalance = this.services.formatAmount(element.AvailableBalance, null, null, false)
      });
    } else if (this.cardMetaData.name == "Interface Results") {
      this.generateInterfaceJson(this.cardMetaData.customerList, this.cardMetaData.interfaceDataList);
      //this.getInterfaceData(this.testJson);
    }
  }

  ngAfterViewChecked() { this.changeDetector.detectChanges(); }

  openModal() {
    this.services.rloui.openComponentModal(this.cardMetaData);
  }

  showNxt() {
    if (this.selectedCustomerData.index < (this.customerList.length - 1) && this.interfaceCount != 0) {
      this.selectedCustomerData.index += 1;
      this.selectedCustomerData.name = this.customerList[this.selectedCustomerData.index];
      this.interfaceCount = this.interfaceCount - 1;
    }
    console.warn("DEEP | Count", this.interfaceCount)
  }

  showPrev() {
    if (this.selectedCustomerData.index != 0 && this.interfaceCount < this.customerList.length - 1) {
      this.selectedCustomerData.index -= 1;
      this.selectedCustomerData.name = this.customerList[this.selectedCustomerData.index];
      this.interfaceCount = this.interfaceCount + 1;
    }

    console.warn("DEEP | Count", this.interfaceCount)
  }

  getInterfaceData(predefinedJson: any) {
    predefinedJson.map((data) => {
      this.customerList.push(data.FullName);
    });
    this.selectedCustomerData.index = 0;
    this.selectedCustomerData.name = this.customerList[0];

    this.interfaceCount = this.customerList.length - 1;

    console.log("selectedCustomerData", this.selectedCustomerData)
    console.warn("DEEP | Count", this.interfaceCount)
  }

  generateInterfaceJson(customerList: any, interfaceDataList: any) {
    customerList.forEach(customer => {
      let interfaceInnerSections = [];
      let interfaceTypeObject: IInterfaceListData = {
        type: "External Interface Results",
        class: "internal",
        data: []
      };

      let customerObj = {
        CustomerType: customer.CustomerType,
        FullName: customer.FullName,
        data: []
      }

      if (interfaceDataList.length) {
        let customerInterfaceData = interfaceDataList.filter(interfaceData => interfaceData.BorrowerSeq == customer.BorrowerSeq);

        customerInterfaceData.forEach(element => {
          let obj: IInterfaceDataIndicator = { type: "icon", title: "", subTitle: '', modalSectionName: "" };
          if (!element.InterfaceId.toLowerCase().includes("customer")) {
            if (element.InterfaceId == 'CIBIL001') {
              element.InterfaceId = "CIBIL";
            }
            obj.title = element.InterfaceId;
            if (element.Status == "S" || element.Status == "Success") {
              obj.subTitle = 'completed';
            }

            interfaceInnerSections.push(obj);
          }
        });
      }

      interfaceTypeObject.data = interfaceInnerSections;
      customerObj.data.push(interfaceTypeObject);
      this.interfaceResultsData.push(customerObj);
    });
    console.log("DEEP | mainJson", this.interfaceResultsData);
    this.getInterfaceData(this.interfaceResultsData);
  }
}
