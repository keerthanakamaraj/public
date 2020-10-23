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
  selector: 'app-DisbursementGrid',
  templateUrl: './DisbursementGrid.component.html',
  animations: [
    trigger('slideInOut', [
      state('false', style({ opacity: '0', overflow: 'hidden', height: '0px' })),
      state('true', style({ height: '*', 'padding-top': '1rem' })),
      transition('true => false', animate('300ms ease-out')),
      transition('false => true', animate('300ms ease-in'))
    ])
  ],
})
export class DisbursementGridComponent implements AfterViewInit {
  loopDataVar10 = [];
  disbursementRecord: boolean = false;
  constructor(private services: ServiceStock, private cdRef: ChangeDetectorRef) { }
  @ViewChild('readonlyGrid', { static: true }) readonlyGrid: ReadonlyGridComponent;
  @Output() modifyDisbursal: EventEmitter<any> = new EventEmitter<any>();

  @Input('formCode') formCode: string;
  @Input('displayTitle') displayTitle: boolean = true;
  @Input('displayToolbar') displayToolbar: boolean = true;
  @Input('fieldID') fieldID: string;

  componentCode: string = 'DisbursementGrid';
  openedFilterForm: string = '';
  disbursalList = [];
  hidden: boolean = false;
  gridConsts: any = {
    paginationPageSize: 10,
    gridCode: "DisbursementGrid",
    paginationReq: false
  };
  columnDefs: any[] = [{
    field: "DisbursalNo",
    width: 17,
    sortable: false,
    resizable: true,
    cellStyle: { 'text-align': 'left' },
    // filter: "agTextColumnFilter",
    // filterParams: {
    //     suppressAndOrCondition: true,
    //     applyButton: true,
    //     clearButton: true,
    //     filterOptions: ["contains"],
    //     caseSensitive: true,
    // },
  },
  {
    field: "DisbursalTo",
    width: 17,
    sortable: true,
    resizable: true,
    cellStyle: { 'text-align': 'left' },
    // filter: "agTextColumnFilter",
    // filterParams: {
    //     suppressAndOrCondition: true,
    //     applyButton: true,
    //     clearButton: true,
    //     filterOptions: ["contains"],
    //     caseSensitive: true,
    // },
  },
  {
    field: "Amount",
    width: 18,
    sortable: true,
    resizable: true,
    cellStyle: { 'text-align': 'right' },
    valueFormatter: this.formatAmount.bind(this),
    // filter: "agTextColumnFilter",
    // filterParams: {
    //     suppressAndOrCondition: true,
    //     applyButton: true,
    //     clearButton: true,
    //     filterOptions: ["contains"],
    //     caseSensitive: true,
    // },
  },
  {
    field: "DisbursalDate",
    width: 18,
    sortable: true,
    resizable: true,
    cellStyle: { 'text-align': 'left' },
    // filter: "agDateColumnFilter",
    // filterParams: {
    //     suppressAndOrCondition: true,
    //     applyButton: true,
    //     clearButton: true,
    //     caseSensitive: true,
    //     filterOptions: ["inRange"],
    // },
  },
  {
    field: "PaymentMode",
    width: 18,
    sortable: true,
    resizable: true,
    cellStyle: { 'text-align': 'left' },
    // filter: "agTextColumnFilter",
    // filterParams: {
    //     suppressAndOrCondition: true,
    //     applyButton: true,
    //     clearButton: true,
    //     filterOptions: ["contains"],
    //     caseSensitive: true,
    // },
  },
  {
    width: 6,
    field: "",
    sortable: false,
    filter: false,
    resizable: true,
    cellRenderer: 'buttonRenderer',
    cellStyle: { 'text-align': 'left' },
    cellRendererParams: {
      gridCode: 'DisbursementGrid',
      columnId: 'Edit',
      Type: '1',
      CustomClass: 'btn-edit',
      IconClass: 'fas fa-edit fa-lg',
      onClick: this.Edit_click.bind(this),
    },
  },
  {
    width: 6,
    field: "",
    sortable: false,
    filter: false,
    resizable: true,
    cellRenderer: 'buttonRenderer',
    cellStyle: { 'text-align': 'left' },
    cellRendererParams: {
      gridCode: 'DisbursementGrid',
      columnId: 'Delete',
      Type: '1',
      CustomClass: 'btn-delete',
      IconClass: 'fa fa-trash fa-lg',
      onClick: this.Delete_click.bind(this),
    },
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
    styleElement.id = 'DisbursementGrid_customCss';
    document.getElementsByTagName('head')[0].appendChild(styleElement);
  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    var styleElement = document.getElementById('DisbursementGrid_customCss');
    styleElement.parentNode.removeChild(styleElement);
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
  gridDataLoad(formInputs) {
    this.readonlyGrid.setFormInputs(formInputs);
  }

  async gridDataAPI(params, gridReqMap: Map<string, any>, event) {
    let inputMap = new Map();
    inputMap.clear();
    let DisbursalId: any = event.DisbursalSeqToGrid;
    // let DisbursalId:any = 22;
    let customerList = event.CustomerList;
    let criteriaJson: any = { "Offset": 1, "Count": 10, FilterCriteria: [] };
    if (DisbursalId) {
      criteriaJson.FilterCriteria.push({
        "columnName": "ApplicationId",
        "columnType": "String",
        "conditions": {
          "searchType": "equals",
          "searchText": DisbursalId
        }
      });
      inputMap.set('QueryParam.criteriaDetails.FilterCriteria', criteriaJson.FilterCriteria);
    }
    if (gridReqMap.get("FilterCriteria")) {
      var obj = gridReqMap.get("FilterCriteria");
      for (var i = 0; i < obj.length; i++) {
        switch (obj[i].columnName) {
          case "DisbursalNo": obj[i].columnName = "DisbursalSeq"; break;
          case "HideDisbursald": obj[i].columnName = "DisbursalSeq"; break;
          case "DisbursalTo": obj[i].columnName = "DisbursalTo"; break;
          case "Amount": obj[i].columnName = "DisbursalAmtLocalCurrency"; break;
          case "DisbursalDate": obj[i].columnName = "DisbursalDate"; break;
          case "PaymentMode": obj[i].columnName = "PaymentMode"; break;
          default: console.error("Column ID '" + obj[i].columnName + "' not mapped with any key");
        }
      }
    }
    if (gridReqMap.get("OrderCriteria")) {
      var obj = gridReqMap.get("OrderCriteria");
      for (var i = 0; i < obj.length; i++) {
        switch (obj[i].columnName) {
          case "DisbursalNo": obj[i].columnName = "DisbursalSeq"; break;
          case "HideDisbursald": obj[i].columnName = "DisbursalSeq"; break;
          case "DisbursalTo": obj[i].columnName = "DisbursalTo"; break;
          case "Amount": obj[i].columnName = "DisbursalAmtLocalCurrency"; break;
          case "DisbursalDate": obj[i].columnName = "DisbursalDate"; break;
          case "PaymentMode": obj[i].columnName = "PaymentMode"; break;
          default: console.error("Column ID '" + obj[i].columnName + "' not mapped with any key");
        }
      }
    }
    this.readonlyGrid.combineMaps(gridReqMap, inputMap);
    this.services.http.fetchApi('/DisbursalDetails', 'GET', inputMap, '/rlo-de').subscribe(
      async (httpResponse: HttpResponse<any>) => {
        var res = httpResponse.body;
        this.loopDataVar10 = [];
        this.disbursalList = [];
        if (res !== null) {
          this.disbursementRecord = true
          this.disbursalList = res['DisbursalDetails'];
        }
        else {
          this.disbursementRecord = false
        }

        // var this.disbursalList = res['DisbursalDetails'];
        if (this.disbursalList) {
          for (var i = 0; i < this.disbursalList.length; i++) {
            var tempObj = {};
            tempObj['DisbursalNo'] = i + 1;
            tempObj['HideDisbursald'] = this.disbursalList[i].DisbursalSeq;
            let customer = customerList.filter(item => item.id == this.disbursalList[i].DisbursalTo);
            tempObj['DisbursalTo'] = customer != undefined ? customer[0].text : this.disbursalList[i].DisbursalTo;
            tempObj['Amount'] = this.disbursalList[i].DisbursalAmtLocalCurrency;
            tempObj['DisbursalDate'] = this.disbursalList[i].DisbursalDate;
            tempObj['PaymentMode'] = this.disbursalList[i].PaymentMode.text;
            this.loopDataVar10.push(tempObj);
          }
        }
        this.readonlyGrid.apiSuccessCallback(params, this.loopDataVar10);
      },
      async (httpError) => {
        var err = httpError['error']
        if (err != null && err['ErrorElementPath'] != undefined && err['ErrorDescription'] != undefined) {
        }
        this.services.alert.showAlert(2, 'rlo.error.fetch.form', -1);
      }
    );

  }

  getDisburseDetails() {
    return this.loopDataVar10;
  }
  async Edit_click(event) {
    let inputMap = new Map();
    const selectedData0 = this.readonlyGrid.getSelectedData();
    this.modifyDisbursal.emit({
      'DisbursalKey': event['HideDisbursald'],
    });

  }
  async Delete_click(event) {
    let inputMap = new Map();
    inputMap.clear();
    inputMap.set('PathParam.DisbursalSeq', event.HideDisbursald);
    this.services.http.fetchApi('/DisbursalDetails/{DisbursalSeq}', 'DELETE', inputMap, '/rlo-de').subscribe(
      async (httpResponse: HttpResponse<any>) => {
        var res = httpResponse.body;
        this.services.alert.showAlert(1, 'rlo.success.delete.disbursal', 5000);
        this.readonlyGrid.refreshGrid();
      },
      async (httpError) => {
        var err = httpError['error']
        if (err != null && err['ErrorElementPath'] != undefined && err['ErrorDescription'] != undefined) {
        }
        this.services.alert.showAlert(2, 'rlo.error.delete.disbursal', -1);
      }
    );
  }

  // loadSpinner=false;
  // showSpinner(){
  // this.loadSpinner=true;
  // }
  // hideSpinner(){
  // this.loadSpinner=false;
  // }
  formatAmount(number) {
    if (number.value) {
      return this.services.formatAmount(number.value, null, null,false);
    } else {
      return '-';
    }
  }
}
