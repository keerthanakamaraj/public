import { Component, OnInit, Input, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ReadonlyGridComponent } from '../readonly-grid/readonly-grid.component';
import { ServiceStock } from '../service-stock.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { LangChangeEvent } from '@ngx-translate/core/public_api';
import { Subject } from 'rxjs';
const customCss: string = '';

@Component({
  selector: 'app-customer-avaliable-cards',
  templateUrl: './customer-avaliable-cards.component.html',
  styleUrls: ['./customer-avaliable-cards.component.css']
})
export class CustomerAvaliableCardsComponent implements OnInit {

  @ViewChild('readonlyGrid', { static: true }) readonlyGrid: ReadonlyGridComponent;

  @Input('formCode') formCode: string;
  @Input() parentData;

  gridConsts: any = {
    paginationPageSize: 10,
    gridCode: "SearchCustomerGrid",
    paginationReq: true
  };

  private unsubscribe$: Subject<any> = new Subject<any>();

  columnDefs: any[] = [
    {
      field: "CardSubProduct",
      width: 11,
      sortable: true,
      resizable: true,
      cellStyle: { 'text-align': 'left' },
      filter: "agTextColumnFilter",
      filterParams: {
        suppressAndOrCondition: true,
        applyButton: true,
        clearButton: true,
        filterOptions: ["contains"],
        caseSensitive: true,
      },
    },
    {
      field: "PrimaryCardLimit",
      width: 11,
      sortable: true,
      resizable: true,
      cellStyle: { 'text-align': 'left' },
      filter: "agTextColumnFilter",
      filterParams: {
        suppressAndOrCondition: true,
        applyButton: true,
        clearButton: true,
        filterOptions: ["contains"],
        caseSensitive: true,
      },
    },
    {
      field: "PrimaryCardStatus",
      width: 11,
      sortable: true,
      resizable: true,
      cellStyle: { 'text-align': 'left' },
      filter: "agTextColumnFilter",
      filterParams: {
        suppressAndOrCondition: true,
        applyButton: true,
        clearButton: true,
        filterOptions: ["contains"],
        caseSensitive: true,
      },
    },
    {
      field: "PrimaryCardNumber",
      width: 14,
      sortable: true,
      resizable: true,
      cellStyle: { 'text-align': 'left' },
      filter: "agTextColumnFilter",
      filterParams: {
        suppressAndOrCondition: true,
        applyButton: true,
        clearButton: true,
        filterOptions: ["contains"],
        caseSensitive: true,
      },
    }
  ];

  constructor(private services: ServiceStock, private cdRef: ChangeDetectorRef, public activeModal: NgbActiveModal) {

  }

  ngOnInit() {
    this.readonlyGrid.setGridDataAPI(this.gridDataAPI.bind(this));
    this.readonlyGrid.setRowClickHandler(this.rowClicked.bind(this));
    var styleElement = document.createElement('style');
    styleElement.type = 'text/css';
    styleElement.innerHTML = customCss;
    styleElement.id = 'SearchCustomerGrid_customCss';
    document.getElementsByTagName('head')[0].appendChild(styleElement);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    var styleElement = document.getElementById('SearchCustomerGrid_customCss');
    styleElement.parentNode.removeChild(styleElement);
  }

  ngAfterViewInit() {
    console.log("Parent data ---", this.parentData);
    this.services.translate.onLangChange
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((event: LangChangeEvent) => {
        var colDefClone = [];
        for (var i = 0; i < this.columnDefs.length; i++) {
          colDefClone[i] = Object.assign({}, this.columnDefs[i]);
        }
        this.readonlyGrid.loadColums(colDefClone);
      });
  }

  gridDataLoad(formInputs) {
    this.readonlyGrid.setFormInputs(formInputs);
  }

  refreshGrid() {
    this.readonlyGrid.refreshGrid();
  }

  onGridSizeChanged() {
    var colDefClone = [];
    for (var i = 0; i < this.columnDefs.length; i++) {
      colDefClone[i] = Object.assign({}, this.columnDefs[i]);
    }
    this.readonlyGrid.loadColums(colDefClone);
    this.readonlyGrid.columnsInitialized.next();
    this.readonlyGrid.columnsInitialized.complete();
  }

  async gridDataAPI(params, gridReqMap: Map<string, any>, event) {
    let inputMap = new Map();
    inputMap.clear();
    this.readonlyGrid.combineMaps(gridReqMap, inputMap);

    console.log(event);

    var loopVar7 = this.parentData;
    var loopDataVar7 = [];
    if (loopVar7) {
      for (var i = 0; i < loopVar7.length; i++) {
        var tempObj = {};
        tempObj['CardSubProduct'] = loopVar7[i].ProductType;
        tempObj['PrimaryCardLimit'] = loopVar7[i].CreditLimit;
        tempObj['PrimaryCardStatus'] = loopVar7[i].CardStatus;
        tempObj['PrimaryCardNumber'] = loopVar7[i].MaskedCardNo == undefined ? '-' : loopVar7[i].MaskedCardNo;
        tempObj['CardEmbossingDate'] = loopVar7[i].CardEmbossingDate;
        tempObj['AvailableLimit'] = loopVar7[i].AvailableLimit;
        tempObj['CashLimit'] = loopVar7[i].CashLimit;

        loopDataVar7.push(tempObj);
      }
    }
    console.log(loopVar7);
    this.readonlyGrid.apiSuccessCallback(params, loopDataVar7);
  }

  async rowClicked(event) {
    let inputMap = new Map();
    const selectedData = this.readonlyGrid.getSelectedData();

    this.activeModal.close();
    this.services.rloCommonData.selectedCardDetailsSubject.next(selectedData);//subscribed in addon card details page
  }
}
