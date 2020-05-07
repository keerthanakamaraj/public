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
  selector: 'app-CustDtlsGrid',
  templateUrl: './CustDtlsGrid.component.html',
  animations: [
    trigger('slideInOut', [
      state('false', style({ opacity: '0', overflow: 'hidden', height: '0px' })),
      state('true', style({ height: '*', 'padding-top': '1rem' })),
      transition('true => false', animate('300ms ease-out')),
      transition('false => true', animate('300ms ease-in'))
    ])
  ],
})
export class CustDtlsGridComponent implements AfterViewInit {
  constructor(private services: ServiceStock, private cdRef: ChangeDetectorRef) { }
  @ViewChild('readonlyGrid', { static: true }) readonlyGrid: ReadonlyGridComponent;

  @Output() ModifyCustDetails: EventEmitter<any> = new EventEmitter<any>();
  @Output() DeleteCustDetails: EventEmitter<any> = new EventEmitter<any>();
  @Input('formCode') formCode: string;
  @Input('displayTitle') displayTitle: boolean = true;
  @Input('displayToolbar') displayToolbar: boolean = true;
  @Input('fieldID') fieldID: string;

  componentCode: string = 'CustDtlsGrid';
  openedFilterForm: string = '';
  hidden: boolean = false;
  gridConsts: any = {
    paginationPageSize: 5,
    gridCode: "CustDtlsGrid",
    paginationReq: true
  };
  columnDefs: any[] = [{
    field: "CUST_TYPE_LBL",
    width: 22,
    resizable: true,
    cellStyle: { 'text-align': 'left' },
    filter: false,
  },
  {
    field: "FULL_NAME",
    width: 22,
    resizable: true,
    cellStyle: { 'text-align': 'left' },
    filter: false,
  },
  {
    field: "CIF",
    width: 22,
    resizable: true,
    cellStyle: { 'text-align': 'left' },
    filter: false,
  },
  {
    field: "DOB",
    width: 22,
    resizable: true,
    cellStyle: { 'text-align': 'left' },
    filter: false,
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
      gridCode: 'CustDtlsGrid',
      columnId: 'CD_Modify',
      //   Type: '1',
      CustomClass: 'btn-edit',
      onClick: this.CD_Modify_click.bind(this),
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
      gridCode: 'CustDtlsGrid',
      columnId: 'CD_Delete',
      //   Type: '1',
      CustomClass: 'btn-delete',
      onClick: this.CD_Delete_click.bind(this),
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
    var styleElement = document.createElement('style');
    styleElement.type = 'text/css';
    styleElement.innerHTML = customCss;
    styleElement.id = 'CustDtlsGrid_customCss';
    document.getElementsByTagName('head')[0].appendChild(styleElement);
  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    var styleElement = document.getElementById('CustDtlsGrid_customCss');
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
  async CD_Modify_click(event) {
    let inputMap = new Map();
    this.ModifyCustDetails.emit({
      'clickId': event.tempId,
    });
  }
  async CD_Delete_click(event) {
    let inputMap = new Map();
    this.DeleteCustDetails.emit({
      'clickId': event.tempId,
    });
  }
  loadSpinner = false;
  showSpinner() {
    this.loadSpinner = true;
  }
  hideSpinner() {
    this.loadSpinner = false;
  }

}