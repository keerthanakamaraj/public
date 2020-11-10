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
  selector: 'app-ReferralDetailsGrid',
  templateUrl: './ReferralDetailsGrid.component.html',
  animations: [
    trigger('slideInOut', [
      state('false', style({ opacity: '0', overflow: 'hidden', height: '0px' })),
      state('true', style({ height: '*', 'padding-top': '1rem' })),
      transition('true => false', animate('300ms ease-out')),
      transition('false => true', animate('300ms ease-in'))
    ])
  ],
})
export class ReferralDetailsGridComponent implements AfterViewInit {
  constructor(private services: ServiceStock, private cdRef: ChangeDetectorRef) { }
  @ViewChild('readonlyGrid', { static: true }) readonlyGrid: ReadonlyGridComponent;
  @Output() EditReferrerDetails: EventEmitter<any> = new EventEmitter<any>();
  @Input('formCode') formCode: string;
  @Input('displayTitle') displayTitle: boolean = true;
  @Input('displayToolbar') displayToolbar: boolean = true;
  @Input('fieldID') fieldID: string;
  @Input() activeBorrowerSeq: string = undefined;
  @Output() referrerLoaded: EventEmitter<any> = new EventEmitter<any>();
  componentCode: string = 'ReferralDetailsGrid';
  openedFilterForm: string = '';
  hidden: boolean = false;
  referrerRecord: boolean = false;
  referredetails = [];
  gridConsts: any = {
    paginationPageSize: 10,
    gridCode: "ReferralDetailsGrid",
    paginationReq: false
  };
  columnDefs: any[] = [{
    field: "RD_REFERRER_NAME",
    width: 30,
    sortable: false,
    resizable: true,
    cellStyle: { 'text-align': 'left' },
    // filter: "agTextColumnFilter",
    // filterParams: {
    // 	suppressAndOrCondition: true,
    // 	applyButton: true,
    // 	clearButton: true,
    // 	filterOptions: ["contains"],
    // 	caseSensitive: true,
    // },
  },
  {
    field: "RD_CIF",
    width: 30,
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
    field: "RD_REFERRER_MOBILE_NO",
    width: 28,
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
    width: 6,
    field: "",
    sortable: false,
    filter: false,
    resizable: true,
    cellRenderer: 'buttonRenderer',
    cellStyle: { 'text-align': 'left' },
    cellRendererParams: {
      gridCode: 'ReferralDetailsGrid',
      columnId: 'RD_EDIT',
      Type: '1',
      CustomClass: 'btn-edit',
      IconClass: 'fas fa-edit fa-lg',
      onClick: this.RD_EDIT_click.bind(this),
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
      gridCode: 'ReferralDetailsGrid',
      columnId: 'RD_DELETE',
      Type: '1',
      CustomClass: 'btn-delete',
      IconClass: 'fa fa-trash fa-lg',
      onClick: this.RD_DELETE_click.bind(this),
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
    styleElement.id = 'ReferralDetailsGrid_customCss';
    document.getElementsByTagName('head')[0].appendChild(styleElement);
  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    var styleElement = document.getElementById('ReferralDetailsGrid_customCss');
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
    let applicationId: any = event.ApplicationId;
    // let borrowerSeq :any = event.activeBorrowerSeq;
    // let applicationId = '2221';
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
      criteriaJson.FilterCriteria.push({
        "columnName": "CustomerType",
        "columnType": "String",
        "conditions": {
          "searchType": "equals",
          "searchText": "R"
        }
      });
    }
    inputMap.set('QueryParam.criteriaDetails', criteriaJson);
    this.services.http.fetchApi('/ReferrerDetails', 'GET', inputMap, '/rlo-de').subscribe(
      async (httpResponse: HttpResponse<any>) => {
        var res = httpResponse.body;
        this.referredetails = [];

        let obj = {
          "name": "ReferrerDetails",
          "data": null,
          "sectionName": "ReferrerDetails",
        }

        if (res !== null) {
          this.referrerRecord = true;
          var loopVar10 = res['ReferrerDetails'];
          obj.data = loopVar10;
        }
        else {
          this.referrerRecord = false;
          obj.data = [];
        }

        if (loopVar10) {
          this.referrerLoaded.emit({
            "name": "referrerLoad",
            "data": loopVar10,
            // "BorrowerSeq": borrowerSeq
          });
          for (var i = 0; i < loopVar10.length; i++) {
            var tempObj = {};
            tempObj['Referrer_ID'] = loopVar10[i].BorrowerSeq;
            tempObj['RD_REFERRER_NAME'] = loopVar10[i].ReferrerName;
            tempObj['RD_CIF'] = loopVar10[i].CIFNo;
            tempObj['RD_REFERRER_MOBILE_NO'] = loopVar10[i].ReferrerMobileNumber;
            this.referredetails.push(tempObj);
          }
        }
        else {
          loopVar10 = [];
          this.referrerLoaded.emit({
            "name": "referrerLoad",
            "data": loopVar10,
            // "BorrowerSeq": borrowerSeq
          });
        }

        this.services.rloCommonData.globalComponentLvlDataHandler(obj);

        this.readonlyGrid.apiSuccessCallback(params, this.referredetails);
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
  async RD_EDIT_click(event) {
    let inputMap = new Map();
    const selectedData0 = this.readonlyGrid.getSelectedData();
    this.EditReferrerDetails.emit({
      'SeqKey': event['Referrer_ID'],
    });

  }
  async RD_DELETE_click(event) {
    let inputMap = new Map();
    inputMap.clear();
    inputMap.set('PathParam.BorrowerSeq', event.Referrer_ID);
    if (confirm("Are you sure you want to Delete?")) {
      this.services.http.fetchApi('/BorrowerDetails/{BorrowerSeq}', 'DELETE', inputMap, '/rlo-de').subscribe(
        async (httpResponse: HttpResponse<any>) => {
          var res = httpResponse.body;
          this.services.alert.showAlert(1, 'rlo.success.delete.referrer', 5000);
          this.readonlyGrid.refreshGrid();
        },
        async (httpError) => {
          var err = httpError['error']
          if (err != null && err['ErrorElementPath'] != undefined && err['ErrorDescription'] != undefined) {
          }
          this.services.alert.showAlert(2, 'rlo.error.delete.referrer', -1);
        }
      );
    }
  }
  loadSpinner = false;
  showSpinner() {
    this.loadSpinner = true;
  }
  hideSpinner() {
    this.loadSpinner = false;
  }
  getReferrerGrid() {
    //  this.addressDetails.push();
    return this.referredetails;
  }

}
