import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-search-grid-btn',
  templateUrl: './customer-search-grid-btn.component.html',
  styleUrls: ['./customer-search-grid-btn.component.css']
})
export class CustomerSearchGridBtnComponent implements OnInit {

  params;

  constructor() {
  }

  agInit(params): void {
    this.params = params;
    console.log("Param", this.params);
  }

  onClick(): void {
    this.params.colDef.cellRendererParams.onClick();
  }

  ngOnInit() {
  }

}
