import { Component, OnInit, Input } from '@angular/core';
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
  
  primary_lable :string = "full name";
  secondary_lable : string ="Juhi Patil";
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

  constructor() {
    this.cardConfig.set("customer", this.customerConfig);
    this.cardConfig.set("interfaceResults", this.interface);
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    console.warn(this.cardMetaData);
    this.cardName = this.cardMetaData.name;
  }

  configureCard() {

  }
}
