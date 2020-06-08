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
  selector: 'app-LiabilityDtlsGrid',
  templateUrl: './LiabilityDtlsGrid.component.html',
  animations: [
    trigger('slideInOut', [
      state('false', style({ opacity: '0', overflow: 'hidden', height: '0px' })),
      state('true', style({ height: '*', 'padding-top': '1rem' })),
      transition('true => false', animate('300ms ease-out')),
      transition('false => true', animate('300ms ease-in'))
    ])
  ],
})
export class LiabilityDtlsGridComponent implements AfterViewInit {
  loopDataVar4 = [];
  liabilityRecord : boolean = false;
  constructor(private services: ServiceStock, private cdRef: ChangeDetectorRef) { }
  @ViewChild('readonlyGrid', { static: true }) readonlyGrid: ReadonlyGridComponent;

  @Output() onModify: EventEmitter<any> = new EventEmitter<any>();
  @Input('formCode') formCode: string;
  @Input('displayTitle') displayTitle: boolean = true;
  @Input('displayToolbar') displayToolbar: boolean = true;
  @Input('fieldID') fieldID: string;

  componentCode: string = 'LiabilityDtlsGrid';
  openedFilterForm: string = '';
  hidden: boolean = false;
  gridConsts: any = {
    paginationPageSize: 5,
    gridCode: "LiabilityDtlsGrid",
    paginationReq: true
  };
  columnDefs: any[] = [{
    field: "LD_LIABILITY_TYPE",
    width: 35,
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
    field: "LD_AMOUNT",
    width: 35,
    sortable: true,
    resizable: true,
    cellStyle: { 'text-align': 'right' },
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
    width: 15,
    field: "",
    sortable: false,
    filter: false,
    resizable: true,
    cellRenderer: 'buttonRenderer',
    cellStyle: { 'text-align': 'left' },
    cellRendererParams: {
      gridCode: 'LiabilityDtlsGrid',
      columnId: 'LD_EDIT_BTN',
      Type: '2',
      CustomClass: 'btn-edit',
      IconClass: 'fas fa-edit fa-lg',
      onClick: this.LD_EDIT_BTN_click.bind(this),
    },
  },
  {
    width: 15,
    field: "",
    sortable: false,
    filter: false,
    resizable: true,
    cellRenderer: 'buttonRenderer',
    cellStyle: { 'text-align': 'left' },
    cellRendererParams: {
      gridCode: 'LiabilityDtlsGrid',
      columnId: 'LD_DELETE',
      Type: '2',
      CustomClass: 'btn-delete',
      IconClass: 'fa fa-trash fa-lg',
      onClick: this.LD_DELETE_click.bind(this),
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
    styleElement.id = 'LiabilityDtlsGrid_customCss';
    document.getElementsByTagName('head')[0].appendChild(styleElement);
  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    var styleElement = document.getElementById('LiabilityDtlsGrid_customCss');
    styleElement.parentNode.removeChild(styleElement);
  }
  gridDataLoad(formInputs) {
    this.readonlyGrid.setFormInputs(formInputs);
  }
  refreshGrid() {
    this.readonlyGrid.refreshGrid();
  }
  setHidden(value: boolean) {
    this.hidden = value;
  }
  isHidden() {
    return this.hidden;
  }
  async gridDataAPI(params, gridReqMap: Map<string, any>, event) {
    let inputMap = new Map();
    inputMap.clear();

    let LiabilityId:any = event.passBorrowerToLiability;
    let criteriaJson:any = {"Offset":1,"Count":10,FilterCriteria:[]};
    if(LiabilityId){
    criteriaJson.FilterCriteria.push({
        "columnName": "BorrowerSeq",
        "columnType": "String",
        "conditions": {
            "searchType": "equals",
            "searchText": LiabilityId
        }
    });
    inputMap.set('QueryParam.criteriaDetails.FilterCriteria', criteriaJson.FilterCriteria);
    
    }

    if (gridReqMap.get("FilterCriteria")) {
      var obj = gridReqMap.get("FilterCriteria");
      for (var i = 0; i < obj.length; i++) {
        switch (obj[i].columnName) {
          case "LIABILITY_ID": obj[i].columnName = "LiabilitySeq"; break;
          case "LD_LIABILITY_TYPE": obj[i].columnName = "LiabilityType"; break;
          case "LD_AMOUNT": obj[i].columnName = "Amount"; break;
          default: console.error("Column ID '" + obj[i].columnName + "' not mapped with any key");
        }
      }
    }
    if (gridReqMap.get("OrderCriteria")) {
      var obj = gridReqMap.get("OrderCriteria");
      for (var i = 0; i < obj.length; i++) {
        switch (obj[i].columnName) {
          case "LIABILITY_ID": obj[i].columnName = "LiabilitySeq"; break;
          case "LD_LIABILITY_TYPE": obj[i].columnName = "LiabilityType"; break;
          case "LD_AMOUNT": obj[i].columnName = "Amount"; break;
          default: console.error("Column ID '" + obj[i].columnName + "' not mapped with any key");
        }
      }
    }
    this.readonlyGrid.combineMaps(gridReqMap, inputMap);
    this.services.http.fetchApi('/LiabilityDetails', 'GET', inputMap).subscribe(
      async (httpResponse: HttpResponse<any>) => {
        var res = httpResponse.body;
        var loopDataVar4 = [];
        if(res !== null){
          this.liabilityRecord = true
          var loopVar4 = res['LiabilityDetails'];
      }
      else{
          this.liabilityRecord = false
      }
        // var loopVar4 = res['LiabilityDetails'];
        if (loopVar4) {
          for (var i = 0; i < loopVar4.length; i++) {
            var tempObj = {};
            tempObj['LIABILITY_ID'] = loopVar4[i].LiabilitySeq;
            tempObj['LD_LIABILITY_TYPE'] = loopVar4[i].LiabilityType;
            tempObj['LD_AMOUNT'] = loopVar4[i].Amount;
            this.loopDataVar4.push(tempObj);
          }
        }
        this.readonlyGrid.apiSuccessCallback(params, this.loopDataVar4);
      },
      async (httpError) => {
        var err = httpError['error']
        if (err != null && err['ErrorElementPath'] != undefined && err['ErrorDescription'] != undefined) {
        }
        this.services.alert.showAlert(2, 'rlo.error.wrong.form', -1);
      }
    );

  }
  async LD_EDIT_BTN_click(event) {
    let inputMap = new Map();
    const selectedData0 = this.readonlyGrid.getSelectedData();
    if (selectedData0) {
      this.onModify.emit({
        'SeqKey': selectedData0['LIABILITY_ID'],
      });
    }

  }

  async LD_DELETE_click(event) {
    let inputMap = new Map();
    inputMap.clear();
    inputMap.set('PathParam.LiabilitySeq', event.LIABILITY_ID);
    this.services.http.fetchApi('/LiabilityDetails/{LiabilitySeq}', 'DELETE', inputMap).subscribe(
      async (httpResponse: HttpResponse<any>) => {
        var res = httpResponse.body;
        this.services.alert.showAlert(1, 'rlo.success.delete.liability', 5000);
        this.readonlyGrid.refreshGrid();
      },
      async (httpError) => {
        var err = httpError['error']
        if (err != null && err['ErrorElementPath'] != undefined && err['ErrorDescription'] != undefined) {
        }
        this.services.alert.showAlert(2, 'rlo.error.wrong.form', -1);
      }
    );
  }

  getLiabilityDetails(){
    return this.loopDataVar4;
  }

}