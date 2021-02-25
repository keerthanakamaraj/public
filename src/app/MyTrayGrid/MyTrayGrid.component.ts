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
  selector: 'app-MyTrayGrid',
  templateUrl: './MyTrayGrid.component.html',
  animations: [
    trigger('slideInOut', [
      state('false', style({ opacity: '0', overflow: 'hidden', height: '0px' })),
      state('true', style({ height: '*', 'padding-top': '1rem' })),
      transition('true => false', animate('300ms ease-out')),
      transition('false => true', animate('300ms ease-in'))
    ])
  ],
})
export class MyTrayGridComponent implements AfterViewInit {
  constructor(private services: ServiceStock, private cdRef: ChangeDetectorRef) { }
  @ViewChild('readonlyGrid', { static: true }) readonlyGrid: ReadonlyGridComponent;

  @Input('formCode') formCode: string;
  @Input('displayTitle') displayTitle: boolean = true;
  @Input('displayToolbar') displayToolbar: boolean = true;
  @Input('fieldID') fieldID: string;
  today = new Date();
  componentCode: string = 'MyTrayGrid';
  openedFilterForm: string = '';
  hidden: boolean = false;
  CamType : any;
  gridConsts: any = {
    paginationPageSize: 10,
    gridCode: "MyTrayGrid",
    paginationReq: true
  };
  columnDefs: any[] = [
    // {
    //   field: "MT_APPLICATION_TYPE",
    //   width: 10,
    //   sortable: true,
    //   resizable: true,
    //   cellStyle: { 'text-align': 'center' },
    //   filter: "agTextColumnFilter",
    //   filterParams: {
    //     // suppressAndOrCondition: true,
    //     columnId: 'MT_APPLICATION_TYPE',
    //     // Type: '1',
    //     CustomClass: 'btn-CamType',
    //     // IconClass: 'fa fa-eye fa-lg',
    //   }
    // },
    {
      field: "MT_APPLICATION_TYPE",
      width: 5,
      sortable: false,
      filter: false,
      resizable: true,
      cellRenderer: 'buttonRenderer',
      cellStyle: { 'text-align': 'center' },
      // valueFormatter: this.appType.bind(this),
      cellRendererParams: {
        // gridCode: 'AssetDetailsGrid',
        columnId: 'AT_VIEW',
        Type: '4',
        CustomClass: 'btn-CamType',
        // IconClass: 'fa fa-eye fa-lg',
        // onClick: this.showWorkflowStage.bind(this),
      }
    },
    {
      field: "MT_ARN",
      width: 12,
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
      field: "MT_PROPOSAL_ID",
      width: 12,
      sortable: true,
      resizable: true,
      hide: true,
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
      field: "MT_CUSTOMER",
      width: 12,
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
      field: "MT_PRODUCT",
      width: 12,
      hide: true,
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
      field: "MT_SUB_PRODUCT",
      width: 12,
      hide: true,
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
      field: "MT_SCHEME",
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
      field: "MT_LOAN_AMOUNT",
      width: 11,
      sortable: false,
      resizable: true,
      cellStyle: { 'text-align': 'right' },
      valueFormatter: this.formatAmount.bind(this),
      // filter: "agTextColumnFilter",
      // filterParams: {
      // suppressAndOrCondition: true,
      // applyButton: true,
      // clearButton: true,
      // filterOptions: ["contains"],
      // caseSensitive: true,
      // },
    },
    // {
    // field: "MT_CAM_TYPE",
    // width: 12,
    // sortable: true,
    // resizable: true,
    // cellStyle: { 'text-align': 'left' },
    // filter: "agTextColumnFilter",
    // filterParams: {
    // suppressAndOrCondition: true,
    // applyButton: true,
    // clearButton: true,
    // filterOptions: ["contains"],
    // caseSensitive: true,
    // },
    // },
    {
      field: "MT_STAGE",
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
      }
      // filter: "agTextColumnFilter",
      // filterParams: {
      // suppressAndOrCondition: true,
      // applyButton: true,
      // clearButton: true,
      // filterOptions: ["contains"],
      // caseSensitive: true,
      // },
    },
    {
      field: "MT_INITIATED_BY",
      width: 11,
      hide: true,
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
      field: "MT_INITIATED_ON",
      width: 11,
      sortable: true,
      resizable: true,
      cellStyle: { 'text-align': 'left' },
      // valueFormatter: this.formatDate.bind(this),
      filter: "agTextColumnFilter",
      filterParams: {
        suppressAndOrCondition: true,
        applyButton: true,
        clearButton: true,
        filterOptions: ["contains"],
        caseSensitive: true,
      }
      // filter: "agTextColumnFilter",
      // filterParams: {
      // suppressAndOrCondition: true,
      // applyButton: true,
      // clearButton: true,
      // filterOptions: ["contains"],
      // caseSensitive: true,
      // },
    },
    {
      field: "MT_CAD_LOCATION",
      width: 10,
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
      field: "MT_PENDING_WITH",
      width: 15,
      sortable: false,
      resizable: true,
      cellStyle: { 'text-align': 'left' },
      // filter: "agTextColumnFilter",
      // filterParams: {
      // suppressAndOrCondition: true,
      // applyButton: true,
      // clearButton: true,
      // filterOptions: ["contains"],
      // caseSensitive: true,
      // },
    },
    {
      width: 8,
      field: " ",
      sortable: false,
      filter: false,
      resizable: true,
      cellRenderer: 'buttonRenderer',
      cellStyle: { 'text-align': 'left' },
      cellRendererParams: {
        gridCode: 'AssetDetailsGrid',
        columnId: 'AT_VIEW',
        Type: '1',
        CustomClass: 'btn-views',
        IconClass: 'fa fa-eye fa-lg',
        onClick: this.showWorkflowStage.bind(this),
      },
    }

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


    console.log("AGGrid ngAfterViewInit ", this.readonlyGrid.agGrid);
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
    this.readonlyGrid.setRowClickHandler(this.rowClicked.bind(this));
    var styleElement = document.createElement('style');
    styleElement.type = 'text/css';
    styleElement.innerHTML = customCss;
    styleElement.id = 'MyTrayGrid_customCss';
    document.getElementsByTagName('head')[0].appendChild(styleElement);
  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    var styleElement = document.getElementById('MyTrayGrid_customCss');
    styleElement.parentNode.removeChild(styleElement);
  }
  gridDataLoad(formInputs) {
    this.readonlyGrid.setFormInputs(formInputs);

    console.log("AGGrid gridDataLoad", this.readonlyGrid.agGrid.gridOptions);
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
    let sliderVal: any = event.sliderVal;
    if (sliderVal) {
      inputMap.clear();
      inputMap.set('PathParam.userid', sessionStorage.getItem('userId'));
      if (gridReqMap.get("FilterCriteria")) {
        var obj = gridReqMap.get("FilterCriteria");
        for (var i = 0; i < obj.length; i++) {
          switch (obj[i].columnName) {
            case "MT_ARN": obj[i].columnName = "CTP.APP_REF_NUMBER"; break;
            case "MT_PROPOSAL_ID": obj[i].columnName = "PROPOSAL_ID"; break;
            case "MT_CUSTOMER": obj[i].columnName = "IND.FULL_NAME"; break;
            case "MT_PRODUCT": obj[i].columnName = "PRODUCT"; break;
            case "MT_SUB_PRODUCT": obj[i].columnName = "S.SUBPRODUCT_NAME"; break;
            case "MT_SCHEME": obj[i].columnName = "SMD.SCHEME_NAME"; break;
            case "MT_LOAN_AMOUNT": obj[i].columnName = "L.LOAN_AMT"; break;

            case "MT_CAM_TYPE": obj[i].columnName = "EXISTING_CUST"; break;
            case "MT_STAGE": obj[i].columnName = "T.NAME"; break;
            case "MT_INITIATED_BY": obj[i].columnName = "CREATED_BY"; break;
            case "MT_INITIATED_ON": obj[i].columnName = "T.CREATEDON"; break;
            case "MT_CAD_LOCATION": obj[i].columnName = "B.BRANCH_NAME"; break;
            case "MT_PENDING_WITH": obj[i].columnName = "T.ACTUALOWNER_ID"; break;
            case "hiddenTaskId": obj[i].columnName = "TASK_ID"; break;
            case "hiddenInstanceId": obj[i].columnName = "INSTANCE_ID"; break;
            case "hiddenStageId": obj[i].columnName = "STAGE_ID"; break;
            case "MT_APPLICATION_TYPE": obj[i].columnName = "CTP.CAM_TYPE_ID"; break;
            
            default: console.error("Column ID '" + obj[i].columnName + "' not mapped with any key");
          }
        }
      }
      if (gridReqMap.get("OrderCriteria")) {
        var obj = gridReqMap.get("OrderCriteria");
        for (var i = 0; i < obj.length; i++) {
          switch (obj[i].columnName) {
            case "MT_ARN": obj[i].columnName = "CTP.APP_REF_NUMBER"; break;
            case "MT_PROPOSAL_ID": obj[i].columnName = "PROPOSAL_ID"; break;
            case "MT_CUSTOMER": obj[i].columnName = "IND.FULL_NAME"; break;
            case "MT_PRODUCT": obj[i].columnName = "PRODUCT"; break;
            case "MT_SUB_PRODUCT": obj[i].columnName = "S.SUBPRODUCT_NAME"; break;
            case "MT_SCHEME": obj[i].columnName = "SMD.SCHEME_NAME"; break;
            case "MT_LOAN_AMOUNT": obj[i].columnName = "L.LOAN_AMT"; break;
            case "MT_CAM_TYPE": obj[i].columnName = "EXISTING_CUST"; break;
            case "MT_STAGE": obj[i].columnName = "T.NAME"; break;
            case "MT_INITIATED_BY": obj[i].columnName = "CREATED_BY"; break;
            case "MT_INITIATED_ON": obj[i].columnName = "T.CREATEDON"; break;
            case "MT_CAD_LOCATION": obj[i].columnName = "B.BRANCH_NAME"; break;
            case "MT_PENDING_WITH": obj[i].columnName = "T.ACTUALOWNER_ID"; break;
            case "hiddenTaskId": obj[i].columnName = "TASK_ID"; break;
            case "hiddenInstanceId": obj[i].columnName = "INSTANCE_ID"; break;
            case "hiddenStageId": obj[i].columnName = "STAGE_ID"; break;
            case "MT_APPLICATION_TYPE": obj[i].columnName = "CTP.CAM_TYPE_ID"; break;

            default: console.error("Column ID '" + obj[i].columnName + "' not mapped with any key");
          }
        }
      }
      this.readonlyGrid.combineMaps(gridReqMap, inputMap);
      this.services.http.fetchApi('/tasks/user/{userid}', 'GET', inputMap, '/los-wf').subscribe(
        async (httpResponse: HttpResponse<any>) => {
          var res = httpResponse.body;
          var loopDataVar7 = [];
          var loopVar7 = res['Tasks'];
          this.CamType = loopVar7
          console.log("header res", this.CamType);
          if (loopVar7) {
            for (var i = 0; i < loopVar7.length; i++) {
              var tempObj = {};
              tempObj['MT_ARN'] = loopVar7[i].ARN;
              tempObj['MT_PROPOSAL_ID'] = loopVar7[i].PROPOSAL_ID;
              tempObj['MT_CUSTOMER'] = loopVar7[i].CUSTOMER_NAME;

              tempObj['MT_PRODUCT'] = loopVar7[i].PRODUCT;
              tempObj['MT_SUB_PRODUCT'] = loopVar7[i].SUB_PRODUCT;
              tempObj['MT_SCHEME'] = loopVar7[i].SCHEME;
              if (loopVar7[i].LOAN_AMOUNT == undefined || loopVar7[i].LOAN_AMOUNT == '') {
                tempObj['MT_LOAN_AMOUNT'] = loopVar7[i].REQUESTED_CARDLIMIT;
              }
              else {
                tempObj['MT_LOAN_AMOUNT'] = loopVar7[i].LOAN_AMOUNT;
              }

              tempObj['MT_CAM_TYPE'] = loopVar7[i].EXISTING_CUST;
              tempObj['MT_STAGE'] = loopVar7[i].STAGE_NAME;
              tempObj['MT_INITIATED_BY'] = loopVar7[i].CREATED_BY;
              tempObj['MT_INITIATED_ON'] = loopVar7[i].CREATED_TIME;
              tempObj['MT_CAD_LOCATION'] = loopVar7[i].BRANCH;
              tempObj['MT_PENDING_WITH'] = loopVar7[i].ASSIGNED_TO;
              tempObj['hiddenTaskId'] = loopVar7[i].TASK_ID;
              tempObj['hiddenInstanceId'] = loopVar7[i].INSTANCE_ID;
              tempObj['hiddenStageId'] = loopVar7[i].STAGE_ID;
              // tempObj['MT_APPLICATION_TYPE'] = loopVar7[i].CAM_TYPE;
              if(loopVar7[i].CAM_TYPE == "LE"){
              tempObj['MT_APPLICATION_TYPE'] = 'LE';
              }
              else if(loopVar7[i].CAM_TYPE == "NAPP"){
                tempObj['MT_APPLICATION_TYPE'] = 'NEW';
              }
              else if(loopVar7[i].CAM_TYPE == "MEMC"){
                tempObj['MT_APPLICATION_TYPE'] = 'M';
              }
              else if(loopVar7[i].CAM_TYPE == "CHNL"){
                tempObj['MT_APPLICATION_TYPE'] = 'CH';
              }
              loopDataVar7.push(tempObj);
            }
          }
          this.readonlyGrid.apiSuccessCallback(params, loopDataVar7);
        },
        async (httpError) => {
          var err = httpError['error']
          if (err != null && err['ErrorElementPath'] != undefined && err['ErrorDescription'] != undefined) {
          }
          this.services.alert.showAlert(2, 'rlo.error.load.form', -1);
        }
      );
    }
    else {
      inputMap.clear();
      inputMap.set('PathParam.userid', sessionStorage.getItem('userId'));
      if (gridReqMap.get("FilterCriteria")) {
        var obj = gridReqMap.get("FilterCriteria");
        for (var i = 0; i < obj.length; i++) {
          switch (obj[i].columnName) {
            case "MT_ARN": obj[i].columnName = "CTP.APP_REF_NUMBER"; break;
            case "MT_PROPOSAL_ID": obj[i].columnName = "PROPOSAL_ID"; break;
            case "MT_CUSTOMER": obj[i].columnName = "IND.FULL_NAME"; break;
            case "MT_PRODUCT": obj[i].columnName = "PRODUCT"; break;
            case "MT_SUB_PRODUCT": obj[i].columnName = "S.SUBPRODUCT_NAME"; break;
            case "MT_SCHEME": obj[i].columnName = "SMD.SCHEME_NAME"; break;
            case "MT_LOAN_AMOUNT": obj[i].columnName = "L.LOAN_AMT"; break;
            case "MT_CAM_TYPE": obj[i].columnName = "EXISTING_CUST"; break;
            case "MT_STAGE": obj[i].columnName = "T.NAME"; break;
            case "MT_INITIATED_BY": obj[i].columnName = "CREATED_BY"; break;
            case "MT_INITIATED_ON": obj[i].columnName = "T.CREATEDON"; break;
            case "MT_CAD_LOCATION": obj[i].columnName = "B.BRANCH_NAME"; break;
            case "MT_PENDING_WITH": obj[i].columnName = "T.ACTUALOWNER_ID"; break;
            case "hiddenTaskId": obj[i].columnName = "TASK_ID"; break;
            case "hiddenInstanceId": obj[i].columnName = "INSTANCE_ID"; break;
            case "hiddenStageId": obj[i].columnName = "STAGE_ID"; break;
            case "MT_APPLICATION_TYPE": obj[i].columnName = "CTP.CAM_TYPE_ID"; break;
            default: console.error("Column ID '" + obj[i].columnName + "' not mapped with any key");
          }
        }
      }
      if (gridReqMap.get("OrderCriteria")) {
        var obj = gridReqMap.get("OrderCriteria");
        for (var i = 0; i < obj.length; i++) {
          switch (obj[i].columnName) {
            case "MT_ARN": obj[i].columnName = "CTP.APP_REF_NUMBER"; break;
            case "MT_PROPOSAL_ID": obj[i].columnName = "PROPOSAL_ID"; break;
            case "MT_CUSTOMER": obj[i].columnName = "IND.FULL_NAME"; break;

            case "MT_PRODUCT": obj[i].columnName = "PRODUCT"; break;
            case "MT_SUB_PRODUCT": obj[i].columnName = "S.SUBPRODUCT_NAME"; break;
            case "MT_SCHEME": obj[i].columnName = "SMD.SCHEME_NAME"; break;
            case "MT_LOAN_AMOUNT": obj[i].columnName = "L.LOAN_AMT"; break;

            case "MT_CAM_TYPE": obj[i].columnName = "EXISTING_CUST"; break;
            case "MT_STAGE": obj[i].columnName = "T.NAME"; break;
            case "MT_INITIATED_BY": obj[i].columnName = "CREATED_BY"; break;
            case "MT_INITIATED_ON": obj[i].columnName = "T.CREATEDON"; break;
            case "MT_CAD_LOCATION": obj[i].columnName = "B.BRANCH_NAME"; break;
            case "MT_PENDING_WITH": obj[i].columnName = "T.ACTUALOWNER_ID"; break;
            case "hiddenTaskId": obj[i].columnName = "TASK_ID"; break;
            case "hiddenInstanceId": obj[i].columnName = "INSTANCE_ID"; break;
            case "hiddenStageId": obj[i].columnName = "STAGE_ID"; break;
            case "MT_APPLICATION_TYPE": obj[i].columnName = "CTP.CAM_TYPE_ID"; break;
            default: console.error("Column ID '" + obj[i].columnName + "' not mapped with any key");
          }
        }
      }
      this.readonlyGrid.combineMaps(gridReqMap, inputMap);
      this.services.http.fetchApi('/tasks/all/{userid}', 'GET', inputMap, '/los-wf').subscribe(
        async (httpResponse: HttpResponse<any>) => {
          var res = httpResponse.body;
          var loopDataVar32 = [];
          var loopVar32 = res['Tasks'];
          console.log("my tray respose", loopVar32);
          if (loopVar32) {
            for (var i = 0; i < loopVar32.length; i++) {
              var tempObj = {};
              tempObj['MT_ARN'] = loopVar32[i].ARN;
              tempObj['MT_PROPOSAL_ID'] = loopVar32[i].PROPOSAL_ID;
              tempObj['MT_CUSTOMER'] = loopVar32[i].CUSTOMER_NAME;

              tempObj['MT_PRODUCT'] = loopVar32[i].PRODUCT;
              tempObj['MT_SUB_PRODUCT'] = loopVar32[i].SUB_PRODUCT;
              tempObj['MT_SCHEME'] = loopVar32[i].SCHEME;
              if (loopVar32[i].LOAN_AMOUNT == undefined || loopVar32[i].LOAN_AMOUNT == '') {
                tempObj['MT_LOAN_AMOUNT'] = loopVar32[i].REQUESTED_CARDLIMIT;
              }
              else {
                tempObj['MT_LOAN_AMOUNT'] = loopVar32[i].LOAN_AMOUNT;
              }
              // tempObj['MT_LOAN_AMOUNT'] = loopVar32[i].LOAN_AMOUNT;
              tempObj['MT_CAM_TYPE'] = loopVar32[i].EXISTING_CUST;
              tempObj['MT_STAGE'] = loopVar32[i].STAGE_NAME;
              tempObj['MT_INITIATED_BY'] = loopVar32[i].CREATED_BY;
              tempObj['MT_INITIATED_ON'] = loopVar32[i].CREATED_ON;
              tempObj['MT_CAD_LOCATION'] = loopVar32[i].BRANCH;
              tempObj['MT_PENDING_WITH'] = loopVar32[i].ASSIGNED_TO;
              tempObj['hiddenTaskId'] = loopVar32[i].TASK_ID;
              tempObj['hiddenInstanceId'] = loopVar32[i].INSTANCE_ID;
              tempObj['hiddenStageId'] = loopVar32[i].STAGE_ID;
              tempObj['MT_APPLICATION_TYPE'] = loopVar32[i].CAM_TYPE;
              loopDataVar32.push(tempObj);
            }
          }
          this.readonlyGrid.apiSuccessCallback(params, loopDataVar32);
        },
        async (httpError) => {
          var err = httpError['error']
          if (err != null && err['ErrorElementPath'] != undefined && err['ErrorDescription'] != undefined) {
          }
          this.services.alert.showAlert(2, 'rlo.error.load.form', -1);
        }
      );
    }

  }
  async rowClicked(event) {
    let inputMap = new Map();
    var navPath = ('/home').split('/');
    navPath = navPath.slice(1);
    inputMap.clear();
    const selectedData2 = this.readonlyGrid.getSelectedData();
    if (selectedData2) {
      let stageId = selectedData2['hiddenStageId'];

      // if(stageId !== "QDE" && stageId !== "DDE"){ // Restrict navigation other than QDE - Sprint -2
      //   this.services.alert.showAlert(4, 'rlo.error.feature.unavailable', 5000);
      //   return;
      // }

      //UW
      // if(stageId== "PRE-CPV"){
      //   stageId = "Underwriter";
      // }

      if (stageId == "Underwriter") {
        stageId = "Underwriter";
      }

      //testing
      //stageId = "Underwriter";

      navPath.push(stageId);
      inputMap.set('appId', selectedData2['MT_PROPOSAL_ID']);
      inputMap.set('taskId', selectedData2['hiddenTaskId']);
      inputMap.set('instanceId', selectedData2['hiddenInstanceId']);
      inputMap.set('userId', selectedData2['MT_PENDING_WITH']);
    } else {
      // console.warn("Selected data not found");
      // this.services.alert.showAlert(4, 'rlo.error.feature.unavailable', 5000);
      // return;
    }
    this.services.dataStore.setRouteParams(this.services.routing.currModal, inputMap);
    if (this.services.routing.currModal > 0) {
      var routerOutlets = {};
      routerOutlets[this.services.routing.currOutlet] = [navPath[navPath.length - 1], 'popup'];
      this.services.router.navigate([{ outlets: routerOutlets }], { skipLocationChange: true });
    } else {
      this.services.router.navigate(navPath);
    }

  }
  loadSpinner = false;
  showSpinner() {
    this.loadSpinner = true;
  }
  hideSpinner() {
    this.loadSpinner = false;
  }

  showWorkflowStage(rowdata) {
    let inputMap = new Map();
    console.log('rowdata ', rowdata);

    var navPath = ('/home').split('/');
    navPath = navPath.slice(1);

    // let stageId = rowdata['hiddenStageId'];
    // navPath.push('view-wf?stage=' + stageId);
    navPath.push('view-wf');

    this.services.dataStore.setRouteParams(this.services.routing.currModal, inputMap);

    inputMap.set('stage', rowdata['hiddenStageId']);
    inputMap.set('appId', rowdata['MT_PROPOSAL_ID']);
    inputMap.set('taskId', rowdata['hiddenTaskId']);
    inputMap.set('instanceId', rowdata['hiddenInstanceId']);

    if (this.services.routing.currModal > 0) {
      var routerOutlets = {};
      routerOutlets[this.services.routing.currOutlet] = [navPath[navPath.length - 1], 'popup'];
      this.services.router.navigate([{ outlets: routerOutlets }], { skipLocationChange: true });
    } else {
      this.services.router.navigate(navPath);
    }
  }

  formatAmount(number) {
    if (number.value) {
      return this.services.formatAmount(number.value, null, null, false);
    } else {
      return '-';
    }
  }

  formatDate(date) {
    if (date.value) {
      return this.services.formatDateTime(date.value);
    }
    else {
      return '-';
    }
  }
  appType(type : string) {
      switch (this.CamType) {
          case "NAPP":
              return "New"
              break;

          case "LE":
              return "LE"
              break;

          case "MEMC":
              return "Member"
              break;

          default:
              break;
  }
  }

}
