import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { RloUiCardFieldComponent } from '../rlo-ui-card-field/rlo-ui-card-field.component';
import { ICardMetaData, IGeneralCardData } from '../Interface/masterInterface';
import { CardModule } from './card.module';

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

  commonCardSectionData: Array<ICardConfig>;

  constructor(private changeDetector: ChangeDetectorRef) {
    this.cardConfig.set("customer", this.customerConfig);
    this.cardConfig.set("interfaceResults", this.interface);
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    console.warn(this.cardMetaData);
    console.log(this.cardMetaData.modalSectionName, this.cardMetaData.name);
    this.cardName = this.cardMetaData.name;
  }

  ngAfterViewChecked() { this.changeDetector.detectChanges(); }

  getClassByCardName() {
    return {
      'col-sm-6 col-md-6 col-lg-6': this.cardName == "Customer 360 degrees",
      'col-sm-6 col-md-6 col-lg-6 t': this.cardName == "Loan Details",
      'col-sm-6 col-md-6 col-lg-6 tt': this.cardName == "Interface Results",
    };

    console.log("&&&");
    switch (this.cardName) {
      case "Customer 360 degrees":
      case "Loan Details":
      case "Interface Results":
        return 'col-sm-6 col-md-6 col-lg-6'

      default:
        return 'col-sm-3 col-md-3 col-lg-3'
        break;
    }
  }
}
