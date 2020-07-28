import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { RloUiCardFieldComponent } from '../rlo-ui-card-field/rlo-ui-card-field.component';
import { ICardMetaData, IGeneralCardData } from '../Interface/masterInterface';
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

  commonCardSectionData: Array<ICardConfig>;

  constructor(private changeDetector: ChangeDetectorRef, private services: ServiceStock) {
    this.cardConfig.set("customer", this.customerConfig);
    this.cardConfig.set("interfaceResults", this.interface);
  }

  ngOnInit() {
    console.log(this.cardMetaData);
  }

  ngAfterViewInit() {
    if (this.cardMetaData != undefined)
      this.cardName = this.cardMetaData.name;
  }

  ngAfterViewChecked() { this.changeDetector.detectChanges(); }

  openModal() {
    this.services.rloui.openComponentModal(this.cardMetaData);
  }
}
