import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-search-grid-btn',
  templateUrl: './customer-search-grid-btn.component.html',
  styleUrls: ['./customer-search-grid-btn.component.css']
})
export class CustomerSearchGridBtnComponent implements OnInit {

  params;
  showCardDetailsModal: boolean = false;

  constructor() {
  }

  agInit(params): void {
    this.params = params;
    if (params.value === 'Y' && params.data.hasOwnProperty("showCardDetailsModal") && params.data.showCardDetailsModal) {
      this.showCardDetailsModal = true;
    }

    console.log(params);
  }

  onClick(): void {
    this.params.colDef.cellRendererParams.onClick();
  }

  ngOnInit() {
  }

}
