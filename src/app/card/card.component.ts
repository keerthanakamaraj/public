import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { RloUiCardFieldComponent } from '../rlo-ui-card-field/rlo-ui-card-field.component';
import { IAccountDetails, ICardMetaData, IGeneralCardData } from '../Interface/masterInterface';
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
        // {
        //   type: "External Interface Results",
        //   class: "external",
        //   data: [
        //     { type: "icon", title: "watchout", subTitle: 'completed', modalSectionName: "" },
        //     { type: "icon", title: "Google", subTitle: 'completed', modalSectionName: "" },
        //   ]
        // }
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
        // {
        //   type: "External Interface Results",
        //   class: "external",
        //   data: [
        //     { type: "icon", title: "watchout", subTitle: 'completed', modalSectionName: "" },
        //     { type: "icon", title: "Google2", subTitle: 'completed', modalSectionName: "" },
        //   ]
        // }
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
    },
  ];

  selectedCustomerData: { name: string, index: number } = { name: "", index: 0 };
  commonCardSectionData: Array<ICardConfig>;

  accountDetailsList: IAccountDetails[] = [];

  constructor(private changeDetector: ChangeDetectorRef, private services: ServiceStock) {
    this.cardConfig.set("customer", this.customerConfig);
    this.cardConfig.set("interfaceResults", this.interface);

    //get interface data;
    this.getInterfaceData();
  }

  ngOnInit() {
    console.log(this.cardMetaData);
  }

  ngAfterViewInit() {
    if (this.cardMetaData != undefined)
      this.cardName = this.cardMetaData.name;

    if (this.cardMetaData.modalSectionName == "CustomerDetails") {
      this.accountDetailsList = this.cardMetaData.accountDetails;
    }
  }

  ngAfterViewChecked() { this.changeDetector.detectChanges(); }

  openModal() {
    this.services.rloui.openComponentModal(this.cardMetaData);
  }

  showNxt() {
    if (this.selectedCustomerData.index < (this.customerList.length - 1)) {
      this.selectedCustomerData.index += 1;
      this.selectedCustomerData.name = this.customerList[this.selectedCustomerData.index]
    }
  }

  showPrev() {
    if (this.selectedCustomerData.index != 0) {
      this.selectedCustomerData.index -= 1;
      this.selectedCustomerData.name = this.customerList[this.selectedCustomerData.index]
    }
  }

  getInterfaceData() {
    this.testJson.map((data) => {
      this.customerList.push(data.FullName);
    });
    this.selectedCustomerData.index = 0;
    this.selectedCustomerData.name = this.customerList[0];
    console.log(this.testJson[this.selectedCustomerData.index]);
  }
}
