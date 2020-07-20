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
  selector: 'app-AmortizationGrid',
  templateUrl: './AmortizationGrid.component.html',
  animations: [
    trigger('slideInOut', [
      state('false', style({ opacity: '0', overflow: 'hidden', height: '0px' })),
      state('true', style({ height: '*', 'padding-top': '1rem' })),
      transition('true => false', animate('300ms ease-out')),
      transition('false => true', animate('300ms ease-in'))
    ])
  ],
})
export class AmortizationGridComponent implements AfterViewInit {
  constructor(private services: ServiceStock, private cdRef: ChangeDetectorRef) { }
  @ViewChild('readonlyGrid', { static: true }) readonlyGrid: ReadonlyGridComponent;

  @Input('formCode') formCode: string;
  @Input('displayTitle') displayTitle: boolean = true;
  @Input('displayToolbar') displayToolbar: boolean = true;
  @Input('fieldID') fieldID: string;

  componentCode: string = 'AmortizationGrid';
  openedFilterForm: string = '';
  hidden: boolean = false;
  gridConsts: any = {
    paginationPageSize: 10,
    gridCode: "AmortizationGrid",
    paginationReq: true
  };
  columnDefs: any[] = [{
    field: "No",
    width: 10,
    sortable: true,
    resizable: true,
    cellStyle: { 'text-align': 'left' },
    // filter: "agTextColumnFilter",
    // filterParams: {
    //   suppressAndOrCondition: true,
    //   applyButton: true,
    //   clearButton: true,
    //   filterOptions: ["contains"],
    //   caseSensitive: true,
    // },
  },
  {
    field: "Date",
    width: 10,
    sortable: true,
    resizable: true,
    cellStyle: { 'text-align': 'left' },
    // filter: "agTextColumnFilter",
    // filterParams: {
    //   suppressAndOrCondition: true,
    //   applyButton: true,
    //   clearButton: true,
    //   filterOptions: ["contains"],
    //   caseSensitive: true,
    // },
  },
  {
    field: "Principal",
    width: 10,
    sortable: true,
    resizable: true,
    cellStyle: { 'text-align': 'left' },
    // filter: "agTextColumnFilter",
    // filterParams: {
    //   suppressAndOrCondition: true,
    //   applyButton: true,
    //   clearButton: true,
    //   filterOptions: ["contains"],
    //   caseSensitive: true,
    // },
  },
  {
    field: "Interest",
    width: 10,
    sortable: true,
    resizable: true,
    cellStyle: { 'text-align': 'left' },
    // filter: "agTextColumnFilter",
    // filterParams: {
    //   suppressAndOrCondition: true,
    //   applyButton: true,
    //   clearButton: true,
    //   filterOptions: ["contains"],
    //   caseSensitive: true,
    // },
  },
  {
    field: "Installment",
    width: 10,
    sortable: true,
    resizable: true,
    cellStyle: { 'text-align': 'left' },
    // filter: "agTextColumnFilter",
    // filterParams: {
    //   suppressAndOrCondition: true,
    //   applyButton: true,
    //   clearButton: true,
    //   filterOptions: ["contains"],
    //   caseSensitive: true,
    // },
  },
  {
    field: "Installment",
    width: 10,
    sortable: true,
    resizable: true,
    cellStyle: { 'text-align': 'left' },
  //   filter: "agTextColumnFilter",
  //   filterParams: {
  //     suppressAndOrCondition: true,
  //     applyButton: true,
  //     clearButton: true,
  //     filterOptions: ["contains"],
  //     caseSensitive: true,
  //   },
   },
  {
    field: "Total_Due",
    width: 10,
    sortable: true,
    resizable: true,
    cellStyle: { 'text-align': 'left' },
    // filter: "agTextColumnFilter",
    // filterParams: {
    //   suppressAndOrCondition: true,
    //   applyButton: true,
    //   clearButton: true,
    //   filterOptions: ["contains"],
    //   caseSensitive: true,
    // },
  },
  {
    field: "Prin_O/S",
    width: 10,
    sortable: true,
    resizable: true,
    cellStyle: { 'text-align': 'left' },
    // filter: "agTextColumnFilter",
    // filterParams: {
    //   suppressAndOrCondition: true,
    //   applyButton: true,
    //   clearButton: true,
    //   filterOptions: ["contains"],
    //   caseSensitive: true,
    // },
  },
  {
    field: "vvc",
    width: 10,
    resizable: true,
    cellStyle: { 'text-align': 'left' },
    filter: false,
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
    //this.readonlyGrid.setGridDataAPI(this.gridDataAPI.bind(this));
    var styleElement = document.createElement('style');
    styleElement.type = 'text/css';
    styleElement.innerHTML = customCss;
    styleElement.id = 'AmortizationGrid_customCss';
    document.getElementsByTagName('head')[0].appendChild(styleElement);
  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    var styleElement = document.getElementById('AmortizationGrid_customCss');
    styleElement.parentNode.removeChild(styleElement);
  }
  gridDataLoad(formInputs) {
		this.readonlyGrid.setFormInputs(formInputs);
  }
  refreshGrid() {
		this.readonlyGrid.refreshGrid();
	}
  // setValue(rowData) {
  //   this.readonlyGrid.setRowData(rowData);
  // }
  setHidden(value: boolean) {
    this.hidden = value;
  }
  isHidden() {
    return this.hidden;
  }
  // loadSpinner = false;
  // showSpinner() {
  //   this.loadSpinner = true;
  // }
  // hideSpinner() {
  //   this.loadSpinner = false;
  // }
  async gridDataAPI(params, gridReqMap: Map<string, any>, event) {

  }
  recordDisplay = false;
	recordShow() {
		this.recordDisplay = true;
	}
	recordHide() {
		this.recordDisplay = false;
	}
}
