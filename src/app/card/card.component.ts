import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input('cardMetaData') cardMetaData: string;

  cardConfig: any = {
    customer: {
      class: 'col-6',
      header: 'Customer 360 degrees',
      isExpandable: true
    },
    interface: {
      class: 'col-6',
      header: 'Interface Results',
      isExpandable: true
    }

  }

  constructor() { }

  ngOnInit() {
  }

  configureCard() {

  }
}
