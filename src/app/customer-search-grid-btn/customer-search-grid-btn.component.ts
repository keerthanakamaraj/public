import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-search-grid-btn',
  templateUrl: './customer-search-grid-btn.component.html',
  styleUrls: ['./customer-search-grid-btn.component.css']
})
export class CustomerSearchGridBtnComponent implements OnInit {

  params;
  showCardDetailsModal: boolean = false;
  Type;
  myVar2 = false;
  constructor() {
  }

  agInit(params): void {
    this.params = params;
    if (params.value === 'Y' && params.data.hasOwnProperty("showCardDetailsModal") && params.data.showCardDetailsModal) {
      this.showCardDetailsModal = true;
    }

    console.log(params);
    this.Type = this.params.Type != undefined ? this.params.Type : '1';
  }

  onClick(): void {
    this.params.colDef.cellRendererParams.onClick();
  }
  public onChange(event) {
    this.params.data[this.params.colDef.field] = event.currentTarget.checked;
    console.log("checkbox value", this.params.data[this.params.colDef.field]);
    this.params.colDef.cellRendererParams.onClick(this.params.data[this.params.colDef.field]);
  }
  ngOnInit() {
  }

}
