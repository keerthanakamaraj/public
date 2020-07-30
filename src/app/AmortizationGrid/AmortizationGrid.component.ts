import { Component, ViewChild, ChangeDetectorRef, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { PopupModalComponent } from '../popup-modal/popup-modal.component';
import { LangChangeEvent } from '@ngx-translate/core';
import { ServiceStock } from '../service-stock.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ReadonlyGridComponent } from '../readonly-grid/readonly-grid.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { IRepaymentScheduleResp, IRepaymentSchedule } from '../amortization-schedule/amortization-interface'

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
  @Output() triggerRepaymentForm: EventEmitter<any> = new EventEmitter<any>();

  componentCode: string = 'AmortizationGrid';
  openedFilterForm: string = '';
  hidden: boolean = false;
  maturityDate: string = undefined;
  isRecord: boolean = false;
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
    field: "Others",
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
    field: "Prin_OS",
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
    this.readonlyGrid.setGridDataAPI(this.gridDataAPI.bind(this));
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
    let RepaymentList: IRepaymentScheduleResp[] = [];
    let LoanGridDetails = [];

    let inputMap = new Map();
    inputMap.clear();
    let requestParams: IRepaymentSchedule = event.requestParams;
    inputMap.set('QueryParam.loanAmount', requestParams.loanAmount);
    inputMap.set('QueryParam.noOfInstallments', requestParams.noOfInstallments);
    inputMap.set('QueryParam.installmentFrequency', requestParams.installmentFrequency);
    inputMap.set('QueryParam.interestRate', requestParams.interestRate);
    inputMap.set('QueryParam.disbursalDate', requestParams.disbursalDate);
    inputMap.set('QueryParam.firstInstallmentDate', requestParams.firstInstallmentDate);
    inputMap.set('QueryParam.interestNumerator', '');//optional
    inputMap.set('QueryParam.interestDenominator', '');//optional
    //  inputMap.set('QueryParam.productcode',requestParams.productCode);//optional
    //  inputMap.set('QueryParam.subproductcode', requestParams.subProductCode);//optional


    this.services.http.fetchApi('/repayment', 'GET', inputMap, '/rlo-de').subscribe((httpResponse: HttpResponse<any>) => {
      RepaymentList = httpResponse.body.Record;

    },
      (httpError) => {
        console.error(httpError);
        this.services.alert.showAlert(2, 'rlo.error.fetch.form', -1);
      });

    if (RepaymentList.length <= 0) {
      RepaymentList = event.hardCodedResp;
    }
    if (RepaymentList) {
      this.isRecord = true;
      let largeNo: number = 0;
      let maturityDate: string = undefined;
      let installmentAmt = undefined;
      for (let eachRecord of RepaymentList) {

        let tempObj = {};
        tempObj['No'] = eachRecord.installmentNo;
        tempObj['Date'] = eachRecord.installmentDate;
        tempObj['Principal'] = eachRecord.principalAmount;
        tempObj['Interest'] = eachRecord.interestAmount;
        tempObj['Installment'] = eachRecord.installmentAmount;
        tempObj['Others'] = eachRecord.others != undefined ? eachRecord.others : '0.00';
        tempObj['Total_Due'] = eachRecord.closingPrincipalBalance;
        tempObj['Prin_OS'] = eachRecord.openPrincipalBalance;
        LoanGridDetails.push(tempObj);

        if (1 == parseInt(eachRecord.installmentNo) && parseInt(requestParams.noOfInstallments) > 0) {
          installmentAmt = eachRecord.installmentAmount;
        }
        if (parseInt(eachRecord.installmentNo) > largeNo) {
          maturityDate = eachRecord.installmentDate;
          largeNo = parseInt(eachRecord.installmentNo);
        }
      }
      this.triggerRepaymentForm.emit({
        'maturityDate': maturityDate,
        'installmentAmt': installmentAmt
      });
    }
    this.readonlyGrid.apiSuccessCallback(params, LoanGridDetails);


    // this.services.alert.showAlert(2, 'Fail', -1);
  }
}
