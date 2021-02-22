import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { RloUiCardFieldComponent } from '../rlo-ui-card-field/rlo-ui-card-field.component';
import { IAccountDetails, ICardMetaData, IGeneralCardData, IInterfaceDataIndicator, IInterfaceListData, ICardListData } from '../Interface/masterInterface';
import { CardModule } from './card.module';
import { IModalData } from '../popup-alert/popup-interface';
import { ServiceStock } from '../service-stock.service';
import { HttpResponse } from '@angular/common/http';

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
  cardName: string = '';

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

  addressCount: number = 0;
  addressList = [];
  formattedAddressList = [];
  selectedAddress: Array<ICardListData> = [];
  addressTypeOfSelectedAddrress: string;
  addressMap = new Map();//store address in list
  currentAddressIndex: number = 0;
  interfaceDataAvaliable = true;//enable or disable interface card expand icon
  applicationId: any;

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
    console.warn("Deep | ngAfterViewInit()", this.cardMetaData, this.cardName);

    if (this.cardMetaData != undefined || this.cardMetaData != null) {
      this.cardName = this.cardMetaData.name;

      if (this.cardMetaData.modalSectionName == "CustomerDetails") {
        this.accountDetailsList = this.cardMetaData.accountDetails;
        console.log("DEEP | accountDetailsList", this.accountDetailsList);
        this.accountDetailsList.forEach(element => {
          element.AvailableBalance = this.services.formatAmount(element.AvailableBalance, null, null, false)
        });
      } else if (this.cardMetaData.name == "Interface Results") {
        this.applicationId = this.cardMetaData.applicationId;
        this.generateInterfaceJson(this.cardMetaData.customerList, this.cardMetaData.interfaceDataList);
        //this.getInterfaceData(this.testJson);
      } else if (this.cardMetaData.name == "Address Details") {
        console.warn("DEEP | this.cardMetaData", this.cardMetaData);
        this.generateAddressJson(this.cardMetaData);
      }
    }
    console.warn("this.cardName", this.cardName);
  }

  ngAfterViewChecked() { this.changeDetector.detectChanges(); }

  openModal(type: string) {
    if (type == 'interfaceResults') {
      console.log(this.interfaceResultsData);
      let interfaceFound = 0;

      this.interfaceResultsData.forEach(customer => {
        let interfaceType = customer.data;
        interfaceType.forEach(element => {
          let data = element.data;
          if (data.length) {
            interfaceFound += 1;
          }
        });
      });

      if (interfaceFound > 0)
        this.services.rloui.openComponentModal(this.cardMetaData);
    }
    else {
      this.services.rloui.openComponentModal(this.cardMetaData);
    }
  }

  showNxt() {
    console.log(this.selectedCustomerData);
    if (this.selectedCustomerData.index < (this.customerList.length - 1) && this.interfaceCount != 0) {
      this.selectedCustomerData.index += 1;
      this.selectedCustomerData.name = this.customerList[this.selectedCustomerData.index];
      this.interfaceCount = this.interfaceCount - 1;
    }
    console.warn("DEEP | Count", this.interfaceCount)
  }

  showPrev() {
    console.log(this.selectedCustomerData);
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
    let dataLength = [];
    let count = 0;
    console.log(customerList, interfaceDataList)

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
            obj.interfaceId = element.InterfaceResltId;
            obj.isTriggered = false;
            interfaceInnerSections.push(obj);
          }
        });
      }

      count += interfaceInnerSections.length;
      interfaceTypeObject.data = interfaceInnerSections;
      customerObj.data.push(interfaceTypeObject);
      this.interfaceResultsData.push(customerObj);
    });
    console.log("DEEP | mainJson", this.interfaceResultsData);
    this.getInterfaceData(this.interfaceResultsData);

    count == 0 ? this.interfaceDataAvaliable = false : this.interfaceDataAvaliable = true;
    console.log(count);
  }

  generateAddressJson(addressData: any) {
    var allAddressList = [];
    this.addressList = [];
    this.formattedAddressList = [];

    if (addressData.data.length) {
      this.addressCount = addressData.data.length - 1;
      allAddressList = addressData.data;

      this.addressMap = new Map()
      for (let i = 0; i < allAddressList.length; i++) {
        const element = allAddressList[i];
        let arr = [];
        Object.keys(element).map((key) => {
          let obj = {};
          obj['type'] = "basic";
          obj['formatToCurrency'] = false;
          obj['modalSectionName'] = "";
          obj['subTitle'] = element[key];
          obj['title'] = key.charAt(0).toUpperCase() + key.slice(1);

          arr.push(obj);
        });
        this.addressMap.set(i, arr);
      }
      console.log(this.addressMap);
      console.log(this.formattedAddressList);

      this.fetchCurrentAddressDetails(0);
    }
    else {

    }
  }

  showAddress(action) {
    console.log(action);
    if (action == 'nxt') {
      if (this.addressCount > 0) {
        this.addressCount -= 1;
        this.currentAddressIndex += 1;

        this.fetchCurrentAddressDetails(this.currentAddressIndex);
      }
    } else {
      if (this.addressCount < this.cardMetaData.data.length - 1) {
        this.addressCount += 1;
        this.currentAddressIndex -= 1;

        this.fetchCurrentAddressDetails(this.currentAddressIndex);
      }
    }
  }

  fetchCurrentAddressDetails(addressIndex) {
    let address = this.addressMap.get(addressIndex);
    let addressFieldList = [];
    addressFieldList.push(address[0]);
    this.selectedAddress = addressFieldList;
    this.addressTypeOfSelectedAddrress = address[1].subTitle == "NA" ? "" : address[1].subTitle;
    console.log(this.selectedAddress);
  }

  onInterfaceRefresh(obj) {
    console.error(this.interfaceResultsData[this.selectedCustomerData.index].data);
    console.log(this.interfaceResultsData, this.selectedCustomerData.index);
    this.interfaceResultsData[this.selectedCustomerData.index].data[0].data.map((data) => {
      if (data.interfaceId == obj.interfaceId && !data.isTriggered) {
        data.isTriggered = true;

        const inputMap = new Map();
        inputMap.set('Body.PrposalId', this.applicationId);
        inputMap.set('Body.InterfaceId', obj.interfaceId);

        let url = '';
        if (obj.type == 'cibil') {
          url = '/CibilApi';
        } else {
          url = '/experianConsumer';
        }

        this.services.http.fetchApi(url, 'POST', inputMap, '/rlo-de').subscribe(
          async (httpResponse: HttpResponse<any>) => {
            this.services.alert.showAlert(1, 'rlo.success.trigger.interface', 3000);
          },
          async (httpError) => {
            this.services.alert.showAlert(2, 'rlo.error.trigger.interface', 3000);
          }
        );
      }
    });
  }
}
