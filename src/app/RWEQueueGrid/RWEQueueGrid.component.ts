import { Component, ViewChild, ChangeDetectorRef, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { PopupModalComponent } from '../popup-modal/popup-modal.component';
import { LangChangeEvent } from '@ngx-translate/core';
import { ServiceStock } from '../service-stock.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ReadonlyGridComponent } from '../readonly-grid/readonly-grid.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Console } from 'console';
import { CustomerSearchGridBtnComponent } from '../customer-search-grid-btn/customer-search-grid-btn.component';
import { IUnderwriterActionObject } from '../Interface/masterInterface';
const customCss: string = '';
@Component({
    selector: 'app-RWEQueueGrid',
    templateUrl: './RWEQueueGrid.component.html',
    animations: [
        trigger('slideInOut', [
            state('false', style({ opacity: '0', overflow: 'hidden', height: '0px' })),
            state('true', style({ height: '*', 'padding-top': '1rem' })),
            transition('true => false', animate('300ms ease-out')),
            transition('false => true', animate('300ms ease-in'))
        ])
    ],
})
export class RWEQueueGridComponent implements AfterViewInit {
    constructor(private services: ServiceStock, private cdRef: ChangeDetectorRef) { }
    @ViewChild('readonlyGrid', { static: true }) readonlyGrid: ReadonlyGridComponent;

    @Input('formCode') formCode: string;
    @Input('displayTitle') displayTitle: boolean = true;
    @Input('displayToolbar') displayToolbar: boolean = true;
    @Input('fieldID') fieldID: string;

    applicationId: any;
    fetchData: any;
    NewCheckboxValue: boolean = false;
    componentCode: string = 'RWEQueueGrid';
    openedFilterForm: string = '';
    hidden: boolean = false;
    gridDataList: any;
    gridConsts: any = {
        paginationPageSize: 10,
        gridCode: "RWEQueueGrid",
        paginationReq: true
    };

    columnDefs: any[] = [
        // {
        //     field: "RWE_APPLICATION_TYPE",
        //     width: 5,
        //     sortable: false,
        //     filter: false,
        //     resizable: true,
        //     cellRenderer: 'buttonRenderer',
        //     cellStyle: { 'text-align': 'center' },
        //     // valueFormatter: this.appType.bind(this),
        //     cellRendererParams: {
        //       // gridCode: 'AssetDetailsGrid',
        //       columnId: 'AT_VIEW',
        //       Type: '5',
        //     //   CustomClass: 'btn-CamType',
        //       // IconClass: 'fa fa-eye fa-lg',
        //       // onClick: this.showWorkflowStage.bind(this),
        //     }
        //   },
        {
            field: "RWE_APPLICATION_TYPE",
            width: 5,
            sortable: false,
            resizable: true,
            cellStyle: { 'text-align': 'left' },
            cellRendererFramework: CustomerSearchGridBtnComponent,
            cellRendererParams: {
                gridCode: 'OccuptionDtlsGrid',
                columnId: 'RWE_APPLICATION_TYPE',
                Type: '2',
                // CustomClass: 'btn-edit',
                onClick: this.CheckboxDetails_click.bind(this),
            }
        },
        {
            field: "RWE_ARN",
            width: 14,
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
            field: "RWE_PROPOSAL_ID",
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
            field: "RWE_CUSTOMER",
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
            field: "RWE_PRODUCT",
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
            field: "RWE_SUB_PRODUCT",
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
            field: "RWE_SCHEME",
            width: 11,
            sortable: true,
            hide: false,
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
            field: "RWE_LOAN_AMOUNT",
            width: 13,
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
        // field: "RWE_CAM_TYPE",
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
            field: "RWE_STAGE",
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
            field: "RWE_INITIATED_BY",
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
            field: "RWE_INITIATED_ON",
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
            field: "RWE_CAD_LOCATION",
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
            field: "RWE_SCHME_EXPIRED",
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
                Type: '5',
                CustomClass: 'rwq-btn-grid',
                onClick: this.resonAlert.bind(this),
            }
        },
    ];
    private unsubscribe$: Subject<any> = new Subject<any>();
    selectedApplicationList = [];//store the list of selected application from grid
    gridParams: any;//testing

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
        this.gridParams = params;

        let criteriaJson: any = { "Offset": 1, "Count": 10, FilterCriteria: [] };
        if (sessionStorage.getItem('branch')) {
            criteriaJson.FilterCriteria.push({
                "columnName": "CTP.BRANCH_ID",
                "columnType": "String",
                "conditions": {
                    "searchType": "equals",
                    "searchText": sessionStorage.getItem('branch')
                }
            });

        }

        let sliderVal: any = event.sliderVal;

        if (sliderVal) {
            inputMap.clear();
            inputMap.set('PathParam.userid', sessionStorage.getItem('userId'));
            inputMap.set('QueryParam.criteriaDetails', criteriaJson);
            if (gridReqMap.get("FilterCriteria")) {
                var obj = gridReqMap.get("FilterCriteria");
                for (var i = 0; i < obj.length; i++) {
                    switch (obj[i].columnName) {
                        case "RWE_ARN": obj[i].columnName = "CTP.APP_REF_NUMBER"; break;
                        case "RWE_PROPOSAL_ID": obj[i].columnName = "PROPOSAL_ID"; break;
                        case "RWE_CUSTOMER": obj[i].columnName = "IND.FULL_NAME"; break;
                        case "RWE_PRODUCT": obj[i].columnName = "PRODUCT"; break;
                        case "RWE_SUB_PRODUCT": obj[i].columnName = "S.SUBPRODUCT_NAME"; break;
                        case "RWE_SCHEME": obj[i].columnName = "SCHEME"; break;
                        case "RWE_LOAN_AMOUNT": obj[i].columnName = "L.LOAN_AMT"; break;

                        case "RWE_CAM_TYPE": obj[i].columnName = "EXISTING_CUST"; break;
                        case "RWE_STAGE": obj[i].columnName = "T.NAME"; break;
                        case "RWE_INITIATED_BY": obj[i].columnName = "CREATED_BY"; break;
                        case "RWE_INITIATED_ON": obj[i].columnName = "T.CREATEDON"; break;
                        case "RWE_CAD_LOCATION": obj[i].columnName = "B.BRANCH_NAME"; break;
                        case "RWE_PENDING_WITH": obj[i].columnName = "T.ACTUALOWNER_ID"; break;
                        case "hiddenTaskId": obj[i].columnName = "TASK_ID"; break;
                        case "hiddenInstanceId": obj[i].columnName = "INSTANCE_ID"; break;
                        case "hiddenStageId": obj[i].columnName = "STAGE_ID"; break;
                        case "RWE_APPLICATION_TYPE": obj[i].columnName = "CTP.CAM_TYPE_ID"; break;

                        default: console.error("Column ID '" + obj[i].columnName + "' not mapped with any key");
                    }
                }
            }
            if (gridReqMap.get("OrderCriteria")) {
                var obj = gridReqMap.get("OrderCriteria");
                for (var i = 0; i < obj.length; i++) {
                    switch (obj[i].columnName) {
                        case "RWE_ARN": obj[i].columnName = "CTP.APP_REF_NUMBER"; break;
                        case "RWE_PROPOSAL_ID": obj[i].columnName = "PROPOSAL_ID"; break;
                        case "RWE_CUSTOMER": obj[i].columnName = "IND.FULL_NAME"; break;
                        case "RWE_PRODUCT": obj[i].columnName = "PRODUCT"; break;
                        case "RWE_SUB_PRODUCT": obj[i].columnName = "S.SUBPRODUCT_NAME"; break;
                        case "RWE_SCHEME": obj[i].columnName = "SCHEME"; break;
                        case "RWE_LOAN_AMOUNT": obj[i].columnName = "L.LOAN_AMT"; break;
                        case "RWE_CAM_TYPE": obj[i].columnName = "EXISTING_CUST"; break;
                        case "RWE_STAGE": obj[i].columnName = "T.NAME"; break;
                        case "RWE_INITIATED_BY": obj[i].columnName = "CREATED_BY"; break;
                        case "RWE_INITIATED_ON": obj[i].columnName = "T.CREATEDON"; break;
                        case "RWE_CAD_LOCATION": obj[i].columnName = "B.BRANCH_NAME"; break;
                        case "RWE_PENDING_WITH": obj[i].columnName = "T.ACTUALOWNER_ID"; break;
                        case "hiddenTaskId": obj[i].columnName = "TASK_ID"; break;
                        case "hiddenInstanceId": obj[i].columnName = "INSTANCE_ID"; break;
                        case "hiddenStageId": obj[i].columnName = "STAGE_ID"; break;
                        case "RWE_APPLICATION_TYPE": obj[i].columnName = "CTP.CAM_TYPE_ID"; break;

                        default: console.error("Column ID '" + obj[i].columnName + "' not mapped with any key");
                    }
                }
            }
            this.readonlyGrid.combineMaps(gridReqMap, inputMap);
            this.services.http.fetchApi('/grid/user/{userid}', 'GET', inputMap, '/los-wf').subscribe(
                async (httpResponse: HttpResponse<any>) => {
                    var res = httpResponse.body;
                    var loopDataVar7 = [];
                    var loopVar7 = res['Tasks'];
                    // this.CamType = loopVar7
                    // console.log("header res", this.CamType);
                    if (loopVar7) {
                        for (var i = 0; i < loopVar7.length; i++) {
                            var tempObj = {};
                            tempObj['RWE_ARN'] = loopVar7[i].ARN;
                            tempObj['RWE_PROPOSAL_ID'] = loopVar7[i].PROPOSAL_ID;
                            tempObj['RWE_CUSTOMER'] = loopVar7[i].CUSTOMER_NAME;

                            tempObj['RWE_PRODUCT'] = loopVar7[i].PRODUCT;
                            tempObj['RWE_SUB_PRODUCT'] = loopVar7[i].SUB_PRODUCT;
                            tempObj['RWE_SCHEME'] = loopVar7[i].SCHEME;
                            if (loopVar7[i].LOAN_AMOUNT == undefined || loopVar7[i].LOAN_AMOUNT == '') {
                                tempObj['RWE_LOAN_AMOUNT'] = loopVar7[i].REQUESTED_CARDLIMIT;
                            }
                            else {
                                tempObj['RWE_LOAN_AMOUNT'] = loopVar7[i].LOAN_AMOUNT;
                            }

                            tempObj['RWE_CAM_TYPE'] = loopVar7[i].EXISTING_CUST;
                            tempObj['RWE_STAGE'] = loopVar7[i].STAGE_NAME;
                            tempObj['RWE_INITIATED_BY'] = loopVar7[i].CREATED_BY;
                            tempObj['RWE_INITIATED_ON'] = loopVar7[i].CREATED_TIME;
                            tempObj['RWE_CAD_LOCATION'] = loopVar7[i].BRANCH;
                            tempObj['RWE_SCHME_EXPIRED'] = loopVar7[i].EXPIRY_STATUS;
                            tempObj['hiddenTaskId'] = loopVar7[i].TASK_ID;
                            tempObj['hiddenInstanceId'] = loopVar7[i].INSTANCE_ID;
                            tempObj['hiddenStageId'] = loopVar7[i].STAGE_ID;
                            tempObj['RWE_APPLICATION_TYPE'] = loopVar7[i].CAM_TYPE;
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
            inputMap.set('QueryParam.criteriaDetails', criteriaJson);
            inputMap.set('PathParam.userid', sessionStorage.getItem('userId'));
            if (gridReqMap.get("FilterCriteria")) {
                var obj = gridReqMap.get("FilterCriteria");
                for (var i = 0; i < obj.length; i++) {
                    switch (obj[i].columnName) {
                        case "RWE_ARN": obj[i].columnName = "ARN"; break;
                        case "RWE_PROPOSAL_ID": obj[i].columnName = "PROPOSAL_ID"; break;
                        case "RWE_CUSTOMER": obj[i].columnName = "CUSTOMER_NAME"; break;
                        case "RWE_PRODUCT": obj[i].columnName = "PRODUCT"; break;
                        case "RWE_SUB_PRODUCT": obj[i].columnName = "SBNAME"; break;
                        case "RWE_SCHEME": obj[i].columnName = "SCHEME"; break;
                        case "RWE_LOAN_AMOUNT": obj[i].columnName = "L.LOAN_AMT"; break;
                        case "RWE_CAM_TYPE": obj[i].columnName = "EXISTING_CUST"; break;
                        case "RWE_STAGE": obj[i].columnName = "STAGE_NAME"; break;
                        case "RWE_INITIATED_BY": obj[i].columnName = "CREATED_BY"; break;
                        case "RWE_INITIATED_ON": obj[i].columnName = "CREATED_ON"; break;
                        case "RWE_CAD_LOCATION": obj[i].columnName = "B.BRANCH_NAME"; break;
                        case "RWE_PENDING_WITH": obj[i].columnName = "ASSIGNED_TO"; break;
                        case "hiddenTaskId": obj[i].columnName = "TASK_ID"; break;
                        case "hiddenInstanceId": obj[i].columnName = "INSTANCE_ID"; break;
                        case "hiddenStageId": obj[i].columnName = "STAGE_ID"; break;
                        case "RWE_APPLICATION_TYPE": obj[i].columnName = "CTP.CAM_TYPE_ID"; break;
                        case "RWE_SCHME_EXPIRED": obj[i].columnName = "EXPIRY_STATUS"; break;
                        default: console.error("Column ID '" + obj[i].columnName + "' not mapped with any key");
                    }
                }
            }
            if (gridReqMap.get("OrderCriteria")) {
                var obj = gridReqMap.get("OrderCriteria");
                for (var i = 0; i < obj.length; i++) {
                    switch (obj[i].columnName) {
                        case "RWE_ARN": obj[i].columnName = "ARN"; break;
                        case "RWE_PROPOSAL_ID": obj[i].columnName = "PROPOSAL_ID"; break;
                        case "RWE_CUSTOMER": obj[i].columnName = "CUSTOMER_NAME"; break;

                        case "RWE_PRODUCT": obj[i].columnName = "PRODUCT"; break;
                        case "RWE_SUB_PRODUCT": obj[i].columnName = "SBNAME"; break;
                        case "RWE_SCHEME": obj[i].columnName = "SCHEME"; break;
                        case "RWE_LOAN_AMOUNT": obj[i].columnName = "LOANAMT"; break;

                        case "RWE_CAM_TYPE": obj[i].columnName = "EXISTING_CUST"; break;
                        case "RWE_STAGE": obj[i].columnName = "STAGE_NAME"; break;
                        case "RWE_INITIATED_BY": obj[i].columnName = "CREATED_BY"; break;
                        case "RWE_INITIATED_ON": obj[i].columnName = "CREATED_ON"; break;
                        case "RWE_CAD_LOCATION": obj[i].columnName = "B.BRANCH_NAME"; break;
                        case "RWE_PENDING_WITH": obj[i].columnName = "ASSIGNED_TO"; break;
                        case "hiddenTaskId": obj[i].columnName = "TASK_ID"; break;
                        case "hiddenInstanceId": obj[i].columnName = "INSTANCE_ID"; break;
                        case "hiddenStageId": obj[i].columnName = "STAGE_ID"; break;
                        case "RWE_APPLICATION_TYPE": obj[i].columnName = "CTP.CAM_TYPE_ID"; break;
                        case "RWE_SCHME_EXPIRED": obj[i].columnName = "EXPIRY_STATUS"; break;
                        default: console.error("Column ID '" + obj[i].columnName + "' not mapped with any key");
                    }
                }
            }
            this.readonlyGrid.combineMaps(gridReqMap, inputMap);
            this.services.http.fetchApi('/grid/all/{userid}', 'GET', inputMap, '/los-wf').subscribe(
                async (httpResponse: HttpResponse<any>) => {
                    var res = httpResponse.body;
                    var loopDataVar32 = [];
                    var loopVar32 = res['Tasks'];
                    this.fetchData = loopVar32;
                    console.log("my tray respose", loopVar32);
                    this.doAPIForSchemeDtls();
                    if (loopVar32) {
                        for (var i = 0; i < loopVar32.length; i++) {
                            var tempObj = {};
                            tempObj['RWE_ARN'] = loopVar32[i].ARN;
                            tempObj['RWE_PROPOSAL_ID'] = loopVar32[i].PROPOSAL_ID;
                            tempObj['RWE_CUSTOMER'] = loopVar32[i].CUSTOMER_NAME;

                            tempObj['RWE_PRODUCT'] = loopVar32[i].PRODUCT;
                            tempObj['RWE_SUB_PRODUCT'] = loopVar32[i].SUB_PRODUCT;
                            tempObj['RWE_SCHEME'] = loopVar32[i].SCHEME;
                            if (loopVar32[i].LOAN_AMOUNT == undefined || loopVar32[i].LOAN_AMOUNT == '') {
                                tempObj['RWE_LOAN_AMOUNT'] = loopVar32[i].REQUESTED_CARDLIMIT;
                            }
                            else {
                                tempObj['RWE_LOAN_AMOUNT'] = loopVar32[i].LOAN_AMOUNT;
                            }
                            // tempObj['RWE_LOAN_AMOUNT'] = loopVar32[i].LOAN_AMOUNT;
                            tempObj['RWE_CAM_TYPE'] = loopVar32[i].EXISTING_CUST;
                            tempObj['RWE_STAGE'] = loopVar32[i].STAGE_NAME;
                            tempObj['RWE_INITIATED_BY'] = loopVar32[i].CREATED_BY;
                            tempObj['RWE_INITIATED_ON'] = loopVar32[i].CREATED_ON;
                            tempObj['RWE_CAD_LOCATION'] = loopVar32[i].BRANCH;
                            tempObj['RWE_SCHME_EXPIRED'] = loopVar32[i].EXPIRY_STATUS;
                            tempObj['hiddenTaskId'] = loopVar32[i].TASK_ID;
                            tempObj['hiddenInstanceId'] = loopVar32[i].INSTANCE_ID;
                            tempObj['hiddenStageId'] = loopVar32[i].STAGE_ID;
                            tempObj['RWE_APPLICATION_TYPE'] = this.NewCheckboxValue;
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
        console.log("on row clicked", event);
        if (event.RWE_APPLICATION_TYPE != undefined) {
            if (this.selectedApplicationList.length) {
                let indexVal = -1;
                this.selectedApplicationList.map((data, index) => {
                    if (data.RWE_PROPOSAL_ID == event.RWE_PROPOSAL_ID) {
                        indexVal = index;
                    }
                });
                if (indexVal == -1) {
                    this.selectedApplicationList.push(event);
                }
                else {
                    this.selectedApplicationList.splice(indexVal, 1);
                }
            } else {
                this.selectedApplicationList.push(event);
            }
        }
        console.log(this.selectedApplicationList);
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
        inputMap.set('appId', rowdata['RWE_PROPOSAL_ID']);
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
    doAPIForSchemeDtls() {
        // http://10.11.10.42:20052/olive/publisher/rlo-masters/NewSchemeDetails
        let inputMap = new Map();
        // for (let index = 0; index < this.fetchData.length; index++) {
        //     const element = this.fetchData[index];

        // if (element.SCHEME !=undefined) {
        inputMap.set('QueryParam.BAD_SUB_PROD', "GIFT");
        this.services.http.fetchApi('/NewSchemeDetails', 'GET', inputMap, "/masters").subscribe(
            async (httpResponse: HttpResponse<any>) => {
                var res = httpResponse.body;
                console.log("New Data scheme", res);
                if (res) {
                    let schemeArray = res['MstSchemeDetails'];

                }


            });
        // }
        //   }
    }
    CheckboxDetails_click(event) {
        console.log("jfhjfhf", event);
        this.NewCheckboxValue = event;
    }
    resonAlert(event) {
        let inputMap = new Map();
        let lastStage;
        let Reason;
        inputMap.set('PathParam.ApplicationId', event.RWE_PROPOSAL_ID);
        this.services.http.fetchApi('/proposal/{ApplicationId}/getAppStage', 'GET', inputMap, '/rlo-de').subscribe(
            async (httpResponse: HttpResponse<any>) => {
                var res = httpResponse.body;
                var appStageData = res[res.length - 1];
                
                console.log("bkb", res);
                if (appStageData.CURRENT_STAGE != undefined && appStageData.REMARK != undefined) {
                    lastStage = appStageData.CURRENT_STAGE;
                    Reason = appStageData.REMARK;
                }
                else if (appStageData.CURRENT_STAGE != undefined && appStageData.REMARK == undefined) {
                    lastStage = appStageData.CURRENT_STAGE;
                    Reason = "NA";
                }
                else if (appStageData.CURRENT_STAGE == undefined && appStageData.REMARK != undefined) {
                    lastStage = "NA";
                    Reason = appStageData.REMARK;
                }
                else if (appStageData == null) {
                    lastStage = "NA";
                    Reason = "NA";
                }
            });
        setTimeout(() => {
            let testResponse = {
                "lastStage": lastStage,
                "reason": Reason,
            }
            this.services.rloui.rejetwithdrawqueue(testResponse).then((response: any) => {
            });
        }, 5000);

    }


    customRefreshGrid(gridData) {
        this.readonlyGrid.apiSuccessCallback(this.gridParams, gridData);
    }
}