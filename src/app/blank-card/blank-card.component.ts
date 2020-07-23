import { Component, OnInit, Input } from '@angular/core';
import { IGeneralCardData } from '../Interface/masterInterface';
import { ServiceStock } from '../service-stock.service';

@Component({
  selector: 'app-blank-card',
  templateUrl: './blank-card.component.html',
  styleUrls: ['./blank-card.component.css']
})
export class BlankCardComponent implements OnInit {
  @Input('cardMetaData') cardMetaData: IGeneralCardData;

  constructor(private services: ServiceStock) { }

  ngOnInit() {
    console.warn(this.cardMetaData);
  }

  ngAfterViewInit(){}

  openModal() {
    this.services.rloui.openComponentModal(this.cardMetaData);
  }

}
