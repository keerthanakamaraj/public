import { Component, ViewChild, ChangeDetectorRef, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { PopupModalComponent } from '../popup-modal/popup-modal.component';
import { LangChangeEvent } from '@ngx-translate/core';
import { ServiceStock } from '../service-stock.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ReadonlyGridComponent } from '../readonly-grid/readonly-grid.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
const customCss: string = '';
@Component({
  selector: 'app-LoanDetailsGrid',
  templateUrl: './LoanDetailsGrid.component.html',
  animations: [
    trigger('slideInOut', [
      state('false', style({ opacity: '0', overflow: 'hidden', height: '0px' })),
      state('true', style({ height: '*', 'padding-top': '1rem' })),
      transition('true => false', animate('300ms ease-out')),
      transition('false => true', animate('300ms ease-in'))
    ])
  ],
})
export class LoanDetailsGridComponent implements AfterViewInit {
  LoanGridArray: any;
  referredetails: any;
  LoanGridDetails: any[];
  LoanRecord: boolean = false;
  constructor(private services: ServiceStock, private cdRef: ChangeDetectorRef) { }
  @ViewChild('readonlyGrid', { static: true }) readonlyGrid: ReadonlyGridComponent;

  @Input('formCode') formCode: string;
  @Input('displayTitle') displayTitle: boolean = true;
  @Input('displayToolbar') displayToolbar: boolean = true;
  @Input('fieldID') fieldID: string;

  componentCode: string = 'LoanDetailsGrid';
  openedFilterForm: string = '';
  hidden: boolean = false;
  gridConsts: any = {
    paginationPageSize: 10,
    gridCode: "LoanDetailsGrid",
    paginationReq: false
  };
  columnDefs: any[] = [{
    field: "LD_CUST_TYPE",
    width: 20,
    sortable: false,
    resizable: true,
    cellStyle: { 'text-align': 'left' },
    // filter: "agTextColumnFilter",
    // filterParams:{
    // suppressAndOrCondition : true,
    // applyButton: true,
    // clearButton: true,
    // filterOptions:["contains"] ,
    // caseSensitive:true,
    // },
  },
  {
    field: "LD_CUST_NAME",
    width: 20,
    sortable: false,
    resizable: true,
    cellStyle: { 'text-align': 'left' },
    // filter: "agTextColumnFilter",
    // filterParams:{
    // suppressAndOrCondition : true,
    // applyButton: true,
    // clearButton: true,
    // filterOptions:["contains"] ,
    // caseSensitive:true,
    // },
  },
  {
    field: "LD_LOAN_OWNERSHIP",
    width: 20,
    sortable: false,
    resizable: true,
    cellStyle: { 'text-align': 'left' },
    // filter: "agTextColumnFilter",
    // filterParams:{
    // suppressAndOrCondition : true,
    // applyButton: true,
    // clearButton: true,
    // filterOptions:["contains"] ,
    // caseSensitive:true,
    // },
  },
  {
    field: "LD_PRINCIPAL",
    width: 20,
    sortable: false,
    resizable: true,
    cellStyle: { 'text-align': 'right' },
    valueFormatter: this.formatAmount.bind(this),
    headerComponentParams: {
      template:
        '<div class="ag-cell-label-container" role="presentation">' +
        '<span ref="eText" class="ag-header-cell-text" role="columnheader"></span>' +
        '</div>'
    }
    // filter: "agTextColumnFilter",
    // filterParams:{
    // suppressAndOrCondition : true,
    // applyButton: true,
    // clearButton: true,
    // filterOptions:["contains"] ,
    // caseSensitive:true,

    // },
  },
  {
    field: "LD_EMI",
    width: 20,
    sortable: false,
    resizable: true,
    cellStyle: { 'text-align': 'right' },
    valueFormatter: this.formatAmount.bind(this),
    headerComponentParams: {
      template:
        '<div class="ag-cell-label-container" role="presentation">' +
        '<span ref="eText" class="ag-header-cell-text" role="columnheader"></span>' +
        '</div>'
    }
    // filter: "agTextColumnFilter",
    // filterParams:{
    // suppressAndOrCondition : true,
    // applyButton: true,
    // clearButton: true,
    // filterOptions:["contains"] ,
    // caseSensitive:true,
    // },
  },
  ];
  private unsubscribe$: Subject<any> = new Subject<any>();
  ngAfterViewInit() {
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
  onGridSizeChanged() {
    var colDefClone = [];
    for (var i = 0; i < this.columnDefs.length; i++) {
      colDefClone[i] = Object.assign({}, this.columnDefs[i]);
    }
    this.readonlyGrid.loadColums(colDefClone);
    this.readonlyGrid.columnsInitialized.next();
    this.readonlyGrid.columnsInitialized.complete();
  }
  setColumnHidden(columnId: string, hidden: boolean) {
    Promise.all([this.readonlyGrid.gridLoadComplete.toPromise(), this.readonlyGrid.columnsInitialized.toPromise()])
      .then(() => { this.readonlyGrid.gridColumnApi.setColumnVisible(columnId, !hidden); });
  }
  isColumnHidden(columnId) {
    return !this.readonlyGrid.gridColumnApi.getColumn(columnId).isVisible();
  }
  ngOnInit(): void {
    this.readonlyGrid.setGridDataAPI(this.gridDataAPI.bind(this));
    var styleElement = document.createElement('style');
    styleElement.type = 'text/css';
    styleElement.innerHTML = customCss;
    styleElement.id = 'LoanDetailsGrid_customCss';
    document.getElementsByTagName('head')[0].appendChild(styleElement);
  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    var styleElement = document.getElementById('LoanDetailsGrid_customCss');
    styleElement.parentNode.removeChild(styleElement);
  }
  gridDataLoad(formInputs) {
    this.readonlyGrid.setFormInputs(formInputs);
  }
  refreshGrid() {
    this.readonlyGrid.refreshGrid();
  }
  setValue(rowData) {
    this.readonlyGrid.setRowData(rowData);
  }
  setHidden(value: boolean) {
    this.hidden = value;
  }
  isHidden() {
    return this.hidden;
  }
  loadSpinner = false;
  showSpinner() {
    this.loadSpinner = true;
  }
  hideSpinner() {
    this.loadSpinner = false;
  }
  async gridDataAPI(params, gridReqMap: Map<string, any>, event) {
    let inputMap = new Map();
    inputMap.clear();
    this.LoanGridDetails = [];
    this.LoanGridArray = event.passLoanGrid

    if (this.LoanGridArray) {
      for (var i = 0; i < this.LoanGridArray.length; i++) {
        if (this.LoanGridArray[i].CustomerType == 'CB' && this.LoanGridArray[i].LoanOwnership > 0) {
          this.LoanRecord = true;
        }
        var tempObj = {};
        tempObj['LD_CUST_TYPE'] = this.LoanGridArray[i].CustomerType;
        tempObj['LD_CUST_NAME'] = this.LoanGridArray[i].CustomerName;
        tempObj['LD_LOAN_OWNERSHIP'] = this.LoanGridArray[i].LoanOwnership;
        tempObj['LD_PRINCIPAL'] = this.LoanGridArray[i].Principle;
        tempObj['LD_EMI'] = this.LoanGridArray[i].EMI;
        this.LoanGridDetails.push(tempObj);
      }
    }
    this.readonlyGrid.apiSuccessCallback(params, this.LoanGridDetails);


    // this.services.alert.showAlert(2, 'Fail', -1);
  }
  formatAmount(number) {
    if (number.value) {
      return this.services.formatAmount(number.value, null, null,false);
    } else {
      return '-';
    }
  }




}
