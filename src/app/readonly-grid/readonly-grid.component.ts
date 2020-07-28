import { Component, ViewChild, ChangeDetectorRef, Input, ElementRef, EventEmitter, Output, NgZone } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { GridPaginationComponent } from '../grid-pagination/grid-pagination.component';
import { ServiceStock } from '../service-stock.service';
import { GridButtonColComponent } from '../grid-button-col/grid-button-col.component';
import { Subject } from 'rxjs';
import { GridApi } from 'ag-grid-community';

@Component({
  selector: 'app-readonly-grid',
  templateUrl: './readonly-grid.component.html',
  styleUrls: ['./readonly-grid.component.css']
})
export class ReadonlyGridComponent {

  @ViewChild('agGrid', { static: false }) agGrid: AgGridAngular;
  @ViewChild('pagination', { static: false }) pagination: GridPaginationComponent;

  @ViewChild('gridContainer', { static: true }) gridContainer: ElementRef;

  @Output() gridSizeChanged: EventEmitter<any> = new EventEmitter<any>();
  @Input('gridConsts') gridConsts: {
    paginationPageSize: number,
    gridCode: string,
    paginationReq: boolean
  };

  @Input('formCode') formCode: string;

  rowModelType: string = "infinite";
  cacheOverflowSize: number = 2;
  maxConcurrentDatasourceRequests: number = 50; // If rowdata is blank then request is not cleared effecting next request call. Dirty Fix
  infiniteInitialRowCount: number = 1;
  maxBlocksInCache: number = 2;
  cacheBlockSize: number = 60;
  multiSortKey: string = "ctrl";

  gridDataPolicy: number = 2;

  public columnDefs;

  public gridApi: GridApi;;
  public gridColumnApi;
  public rowData: any[];
  public rowSelection;
  public components;
  public globleparames;
  public URL;
  public formInputs = {};
  public showModal;

  public getRowNodeId = function (item) {
    return item.id;
  };;


  overlayLoadingTemplate: any;
  overlayNoRowsTemplate: any;
  frameworkComponents: any;

  constructor(private services: ServiceStock, private cdRef: ChangeDetectorRef, private ngZone: NgZone) {
    this.frameworkComponents = {
      buttonRenderer: GridButtonColComponent,
    }
  }

  private gridDataAPI: (params, gridReqMap, formInputs) => void;
  private customRowClickHandler: (event) => void;
  private customRowDoubleClickHandler: (event) => void;

  setGridDataAPI(fn: (params, gridReqMap, formInputs) => void) {
    this.gridDataAPI = fn;
    this.gridDataPolicy = 1;
  }

  setRowClickHandler(fn: (event) => void) {
    this.customRowClickHandler = fn;
  }

  setRowDoubleClickHandler(fn: (event) => void) {
    this.customRowDoubleClickHandler = fn;
  }

  private gridWidth: number;
  private gridWidthInitialized: boolean = false;
  onGridSizeChanged(event) {
    if (this.gridWidthInitialized == false && event.clientWidth != 0) {
      this.gridWidth = event.clientWidth;
      this.gridWidthInitialized = true;
      this.gridSizeChanged.emit();
    }
  }

  columnsInitialized: Subject<any> = new Subject<any>();
  loadColums(colDefs) {
    this.services.translate.get('FluidForm').toPromise().then(translations => {
      console.log(translations);
      this.overlayLoadingTemplate =
        '<span class=\"ag-overlay-loading-center\">' + translations.ReadOnlyGrid.loading + '</span>';
      this.overlayNoRowsTemplate =
        '<span class=\"ag-overlay-loading-center\">' + translations.ReadOnlyGrid.NoData + '</span>';
    });
    this.services.translate.get([this.gridConsts.gridCode]).toPromise().then(translations => {
      this.columnDefs = [];
      for (var i = 0; i < colDefs.length; i++) {
        this.columnDefs[i] = colDefs[i];
        this.columnDefs[i].headerName = translations[this.gridConsts.gridCode][colDefs[i]["field"]];
        this.columnDefs[i].width = this.convertToPixels(colDefs[i].width);
      }
      this.cdRef.detectChanges();
    });
  }

  convertToPixels(percentageWidth) {
    return (percentageWidth / 100) * (this.gridWidth - 5);
  }

  private _rowClickHandler = {
    timer: undefined,
    delay: 250,
    preventSingleClick: false
  }

  defaultRowClickHandler(event) {
    if (event.node.isSelected()) {
      event.node.setSelected(false, false);
    } else {
      event.node.setSelected(true);
    }

    if (this.customRowClickHandler) {
      this._rowClickHandler.timer = setTimeout(() => {
        if (!this._rowClickHandler.preventSingleClick) {
          this.ngZone.run(() => { this.customRowClickHandler(event.data); });
        }
        this._rowClickHandler.preventSingleClick = false;
      }, this._rowClickHandler.delay);
    }
  }

  defaultRowDoubleClickHandler(event) {
    if (this.customRowDoubleClickHandler) {
      clearTimeout(this._rowClickHandler.timer);
      this._rowClickHandler.preventSingleClick = true;
      this.ngZone.run(() => { this.customRowDoubleClickHandler(event.data); });
    }
  };

  onPaginationChanged() {
    if (this.pagination && this.gridApi && this.gridApi.paginationGetCurrentPage() == 0) {
      this.pagination.pagnationGenerater(this.gridApi.paginationGetTotalPages());
    }
    if (this.pagination && this.gridApi && this.pagination.maxSize != this.gridApi.paginationGetTotalPages()) {
      this.pagination.maxSize = this.gridApi.paginationGetTotalPages();
    }
  }
  showNoRowOverlay() {
    this.gridApi.showNoRowsOverlay();
  }
  hideGridLoading() {
    this.gridApi.hideOverlay();
  }
  showGridLoading() {
    this.gridApi.showLoadingOverlay();
  }

  setFormInputs(formInputJson) {
    for (let key in formInputJson) {
      this.formInputs[key] = formInputJson[key];
    }
    this.refreshGrid();
  }


  gridLoadComplete: Subject<any> = new Subject<any>();
  onGridLoad(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.globleparames = params;

    if (!this.rowData || this.rowData.length <= 0) {
      this.rowData = [];
      this.showNoRowOverlay();
    }

    if (this.gridConsts.paginationReq) {
      this.pagination.setGrideApi(this.gridApi);
      this.pagination.pagnationGenerater(0);
    }

    this.gridLoadComplete.next();
    this.gridLoadComplete.complete();
  }

  setRowData(rowData) {
    this.rowData = rowData;
  }

  getSelectedData() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    return selectedData ? selectedData[0] : undefined;
  }

  refreshGrid() {
    this.gridApi.deselectAll();
    if (this.isServerInitialized) {
      this.gridApi.purgeInfiniteCache();
    } else {
      this.initServerDataSource();
    }
  }
  defaultApiInputs = ['Offset', 'Count', 'FilterCriteria', 'OrderCriteria'];

  private isServerInitialized: boolean = false;
  async initServerDataSource() {
    await this.gridLoadComplete.toPromise();
    let dataSource = {
      rowCount: null,
      getRows: (params) => {
        var gridReqMap = new Map();
        if (this.gridConsts.paginationReq) {
          gridReqMap.set("Offset", params.startRow + 1);
          gridReqMap.set("Count", this.cacheBlockSize);
        }
        var FilterCriteria = [];
        var OrderCriteria = [];
        for (var colId in params.filterModel) {
          var filterCriteria;
          if (params.filterModel[colId].filterType == "date") {
            filterCriteria = {
              columnName: colId,
              columnType: "Date",
              conditions: {
                searchType: "inRange",
                dateFrom: (new Date(params.filterModel[colId].dateFrom).getDate()) + "-" + (new Date(params.filterModel[colId].dateFrom).getMonth() + 1) + "-" + (new Date(params.filterModel[colId].dateFrom).getFullYear()),
                dateTo: (new Date(params.filterModel[colId].dateTo).getDate()) + "-" + (new Date(params.filterModel[colId].dateTo).getMonth() + 1) + "-" + (new Date(params.filterModel[colId].dateTo).getFullYear()),
              }
            }
          } else {
            filterCriteria = {
              columnName: colId,
              columnType: "String",
              conditions: {
                searchType: "Contains",
                searchText: params.filterModel[colId].filter
              }
            }
          }
          FilterCriteria.push(filterCriteria);
        }
        if (FilterCriteria.length >= 1) {
          gridReqMap.set("FilterCriteria", FilterCriteria);
        }
        for (var colId in params.sortModel) {
          var sortModel;
          sortModel = {
            columnName: params.sortModel[colId].colId,
            orderType: params.sortModel[colId].sort
          }
          OrderCriteria.push(sortModel);
        }
        if (OrderCriteria.length >= 1) {
          gridReqMap.set("OrderCriteria", OrderCriteria);
        }
        this.showGridLoading();
        this.ngZone.run(() => { this.gridDataAPI(params, gridReqMap, this.formInputs); });
      }
    }
    this.globleparames.api.setDatasource(dataSource);
    this.isServerInitialized = true;
  }

  apiSuccessCallback(params, gridData) {
    this.hideGridLoading();
    if (gridData && gridData.length && gridData.length > 0) {
      gridData.forEach((data, index) => {
        data.id = "R" + (params.startRow + index + 1);
      });
      var lastRow = -1;
      if (gridData.length < this.cacheBlockSize) {
        lastRow = params.startRow + gridData.length;
      }
      params.successCallback(gridData, lastRow);
    }else if(params.startRow == 0){
      this.showNoRowOverlay();
    }
  }

  combineMaps(gridReqMap, inputMap) {
    let FilterCriteria = [];
    let OrderCriteria = [];
    if (inputMap.get("QueryParam.criteriaDetails")) {
      FilterCriteria = inputMap.get("QueryParam.criteriaDetails").FilterCriteria || [];
      OrderCriteria = inputMap.get("QueryParam.criteriaDetails").OrderCriteria || [];
      inputMap.delete("QueryParam.criteriaDetails");
    } else {
      FilterCriteria = inputMap.get("QueryParam.criteriaDetails.FilterCriteria") || [];
      OrderCriteria = inputMap.get("QueryParam.criteriaDetails.OrderCriteria") || [];
    }
    inputMap.set("QueryParam.criteriaDetails.FilterCriteria", FilterCriteria);
    inputMap.set("QueryParam.criteriaDetails.OrderCriteria", OrderCriteria);
    gridReqMap.forEach((value, key) => {
      if (key == 'FilterCriteria') {
        FilterCriteria = [...value, ...FilterCriteria];
        let temp = {};
        FilterCriteria = FilterCriteria.filter((e) => { if (temp[e.columnName]) { return false; } else { temp[e.columnName] = {}; return true; } });
        inputMap.set("QueryParam.criteriaDetails." + key, FilterCriteria);
      } else if (key == 'OrderCriteria') {
        OrderCriteria = [...value, ...OrderCriteria];
        let temp = {};
        OrderCriteria = OrderCriteria.filter((e) => { if (temp[e.columnName]) { return false; } else { temp[e.columnName] = {}; return true; } });
        inputMap.set("QueryParam.criteriaDetails." + key, OrderCriteria);
      } else {
        inputMap.set("QueryParam.criteriaDetails." + key, value);
      }
    });
    if (inputMap.get("QueryParam.criteriaDetails.FilterCriteria").length == 0) {
      inputMap.delete("QueryParam.criteriaDetails.FilterCriteria");
    }
    if (inputMap.get("QueryParam.criteriaDetails.OrderCriteria").length == 0) {
      inputMap.delete("QueryParam.criteriaDetails.OrderCriteria");
    }
  }

}
