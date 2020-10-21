import { Component, ViewChild, ChangeDetectorRef, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { PopupModalComponent } from '../popup-modal/popup-modal.component';
import { LangChangeEvent } from '@ngx-translate/core';
import { ServiceStock } from '../service-stock.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ReadonlyGridComponent } from '../readonly-grid/readonly-grid.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { PastEducationInterface } from '../EducationLoanDetails/Education-loan-interfaces';

const customCss: string = '';
@Component({
  selector: 'app-PastEducationDtlsGrid',
  templateUrl: './PastEducationDtlsGrid.component.html',
  animations: [
    trigger('slideInOut', [
      state('false', style({ opacity: '0', overflow: 'hidden', height: '0px' })),
      state('true', style({ height: '*', 'padding-top': '1rem' })),
      transition('true => false', animate('300ms ease-out')),
      transition('false => true', animate('300ms ease-in'))
    ])
  ],
})
export class PastEducationDtlsGridComponent implements AfterViewInit {
  constructor(private services: ServiceStock, private cdRef: ChangeDetectorRef) { }
  @ViewChild('readonlyGrid', { static: true }) readonlyGrid: ReadonlyGridComponent;

  @Input('formCode') formCode: string;
  @Input('displayTitle') displayTitle: boolean = true;
  @Input('displayToolbar') displayToolbar: boolean = true;
  @Input('fieldID') fieldID: string;

  @Output() modifyPastEducation: EventEmitter<any> = new EventEmitter<any>();

  PastEducationList: PastEducationInterface[] = [];
  pastRecord: boolean = false;
  componentCode: string = 'PastEducationDtlsGrid';
  openedFilterForm: string = '';
  hidden: boolean = false;
  gridConsts: any = {
    paginationPageSize: 10,
    gridCode: "PastEducationDtlsGrid",
    paginationReq: true
  };
  columnDefs: any[] = [{
    field: "ExamPassed",
    width: 18,
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
    field: "InstitutionOrUniversity",
    width: 18,
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
    field: "PassingYear",
    width: 18,
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
    field: "ClassObtained",
    width: 18,
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
    field: "ScholarshipsOrPrizes_",
    width: 18,
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
    width: 5,
    field: "PE_Edit",
    sortable: false,
    filter: false,
    resizable: true,
    cellRenderer: 'buttonRenderer',
    cellStyle: { 'text-align': 'left' },
    cellRendererParams: {
      gridCode: 'PastEducationDtlsGrid',
      columnId: 'PE_Edit',
      Type: '1',
      CustomClass: 'btn-edit',
     // IconClass: 'fas fa-edit fa-lg',
      onClick: this.PE_Modify_click.bind(this)
    },
  },
  {
    width: 5,
    field: "PE_Delete",
    sortable: false,
    filter: false,
    resizable: true,
    cellRenderer: 'buttonRenderer',
    cellStyle: { 'text-align': 'left' },
    cellRendererParams: {
      gridCode: 'PastEducationDtlsGrid',
      columnId: 'PE_Delete',
      Type: '1',
      CustomClass: 'btn-delete',
  //    IconClass: 'fa fa-trash fa-lg',
      onClick: this.PE_Delete_click.bind(this)
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
    styleElement.id = 'PastEducationDtlsGrid_customCss';
    document.getElementsByTagName('head')[0].appendChild(styleElement);
  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    var styleElement = document.getElementById('PastEducationDtlsGrid_customCss');
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
    let applicationId: any = event.ApplicationId;

    let criteriaJson: any = { "Offset": 1, "Count": 10, FilterCriteria: [] };
    if (applicationId) {
      criteriaJson.FilterCriteria.push({
        "columnName": "ApplicationId",
        "columnType": "String",
        "conditions": {
          "searchType": "equals",
          "searchText": applicationId
        }
      });

      inputMap.set('QueryParam.criteriaDetails', criteriaJson);
      this.PastEducationList = [];
      this.services.http.fetchApi('/PastEducation', 'GET', inputMap, '/rlo-de').subscribe(
        async (httpResponse: HttpResponse<any>) => {
          let res = httpResponse.body;
          let loopVar10 = res['PastEducation'];
          let tempPastEducationList = [];

          if (loopVar10) {
            this.PastEducationList = loopVar10;
            this.pastRecord = true;
            for (var i = 0; i < loopVar10.length; i++) {
              var tempObj = {};
              tempObj['PastEdSeq'] = loopVar10[i].PastEdSeq;
              tempObj['ExamPassed'] = loopVar10[i].ExamPassed;
              tempObj['InstitutionOrUniversity'] = loopVar10[i].Institution;
              tempObj['PassingYear'] = loopVar10[i].PassingYear;
              tempObj['ClassObtained'] = loopVar10[i].ClassObtained;
              tempObj['ScholarshipsOrPrizes_'] = loopVar10[i].Scholarships;
              tempPastEducationList.push(tempObj);
            }
            this.readonlyGrid.apiSuccessCallback(params, tempPastEducationList);
          }
          else {
            this.pastRecord = false;
          }

          this.hideSpinner();
        },
        async (httpError) => {
          var err = httpError['error']
          if (err != null && err['ErrorElementPath'] != undefined && err['ErrorDescription'] != undefined) {
            this.hideSpinner();
          }
          // this.services.alert.showAlert(2, 'Fail', -1);
        }
      );
    }
  }

  async PE_Modify_click(event) {
    let inputMap = new Map();
    if (event['PastEdSeq']) {
      let selectedSeq = event['PastEdSeq'];
      let selectedRecord = this.PastEducationList.find(obj => {
        return obj.PastEdSeq == event['PastEdSeq']
      })
      console.log("shweta :: passig to modify", selectedRecord);
      this.modifyPastEducation.emit({
        'PastEducation': selectedRecord
      });
    }
  }
  async PE_Delete_click(event) {
    if (confirm("Are you sure you want to delete this record")) {
      let inputMap = new Map();
      inputMap.clear();
      inputMap.set('PathParam.PastEdSeq', event.PastEdSeq);
      this.services.http.fetchApi('/PastEducation/{PastEdSeq}', 'DELETE', inputMap, '/rlo-de').subscribe(
        async (httpResponse: HttpResponse<any>) => {
          var res = httpResponse.body;
          this.services.alert.showAlert(1, 'rlo.success.delete.visitreport', 5000);
          this.readonlyGrid.refreshGrid();
        },
        async (httpError) => {
          var err = httpError['error']
          if (err != null && err['ErrorElementPath'] != undefined && err['ErrorDescription'] != undefined) {
          }
          this.services.alert.showAlert(2, 'rlo.error.delete.visitreport', -1);
        }
      );
    }
  }
  gridDataLoad(formInputs) {
    this.readonlyGrid.setFormInputs(formInputs);
  }
}
