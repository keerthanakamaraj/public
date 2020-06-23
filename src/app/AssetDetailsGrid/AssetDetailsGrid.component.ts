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
    selector: 'app-AssetDetailsGrid',
    templateUrl: './AssetDetailsGrid.component.html',
    animations: [
        trigger('slideInOut', [
            state('false', style({ opacity: '0', overflow: 'hidden', height: '0px' })),
            state('true', style({ height: '*', 'padding-top': '1rem' })),
            transition('true => false', animate('300ms ease-out')),
            transition('false => true', animate('300ms ease-in'))
        ])
    ],
})
export class AssetDetailsGridComponent implements AfterViewInit {
    loopDataVar4 = [];
    assetRecord: boolean = false;
    constructor(private services: ServiceStock, private cdRef: ChangeDetectorRef) { }
    @ViewChild('readonlyGrid', { static: true }) readonlyGrid: ReadonlyGridComponent;

    @Output() modifyAssetDetails: EventEmitter<any> = new EventEmitter<any>();
    @Input('formCode') formCode: string;
    @Input('displayTitle') displayTitle: boolean = true;
    @Input('displayToolbar') displayToolbar: boolean = true;
    @Input('fieldID') fieldID: string;

    componentCode: string = 'AssetDetailsGrid';
    openedFilterForm: string = '';
    hidden: boolean = false;
    gridConsts: any = {
        paginationPageSize: 5,
        gridCode: "AssetDetailsGrid",
        paginationReq: true
    };
    columnDefs: any[] = [{
        field: "AT_Asset_Type",
        width: 20,
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
        field: "AT_Asset_Status",
        width: 20,
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
        field: "AT_Asset_Value",
        width: 20,
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
        field: "AT_INCLUDE_IN_DBR",
        width: 20,
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
        width: 10,
        field: " ",
        sortable: false,
        filter: false,
        resizable: true,
        cellRenderer: 'buttonRenderer',
        cellStyle: { 'text-align': 'left' },
        cellRendererParams: {
            gridCode: 'AssetDetailsGrid',
            columnId: 'AT_EDIT',
            Type: '1',
            CustomClass: 'btn-edit',
            IconClass: 'fas fa-edit fa-lg',
            onClick: this.AT_EDIT_click.bind(this),
        },
    },
    {
        width: 10,
        field: " ",
        sortable: false,
        filter: false,
        resizable: true,
        cellRenderer: 'buttonRenderer',
        cellStyle: { 'text-align': 'left' },
        cellRendererParams: {
            gridCode: 'AssetDetailsGrid',
            columnId: 'AT_DELETE',
            Type: '1',
            CustomClass: 'btn-delete',
            IconClass: 'fa fa-trash fa-lg',
            onClick: this.AT_DELETE_click.bind(this),
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
        styleElement.id = 'AssetDetailsGrid_customCss';
        document.getElementsByTagName('head')[0].appendChild(styleElement);
    }
    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
        var styleElement = document.getElementById('AssetDetailsGrid_customCss');
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

        let AssetId:any = event.passBorrowerToAsset;
        let criteriaJson:any = {"Offset":1,"Count":10,FilterCriteria:[]};
        if(AssetId){
        criteriaJson.FilterCriteria.push({
            "columnName": "BorrowerSeq",
            "columnType": "String",
            "conditions": {
                "searchType": "equals",
                "searchText": AssetId
            }
        });
        inputMap.set('QueryParam.criteriaDetails.FilterCriteria', criteriaJson.FilterCriteria);
        
        }

        if (gridReqMap.get("FilterCriteria")) {
            var obj = gridReqMap.get("FilterCriteria");
            for (var i = 0; i < obj.length; i++) {
                switch (obj[i].columnName) {
                    // case "AT_Asset_Subtype": obj[i].columnName = "AssetSubtype"; break;
                    case "AT_Asset_Type": obj[i].columnName = "AssetType"; break;
                    case "AT_Asset_Status": obj[i].columnName = "AssetStatus"; break;
                    case "AT_Asset_Value": obj[i].columnName = "AssetValue"; break;
                    case "ASSET_ID": obj[i].columnName = "AssetSeq"; break;
                    // case "AT_Asset_Location": obj[i].columnName = "AssetLocation"; break;
                    case "AT_INCLUDE_IN_DBR": obj[i].columnName = "IncludeInDBR"; break;
                    default: console.error("Column ID '" + obj[i].columnName + "' not mapped with any key");
                }
            }
        }
        if (gridReqMap.get("OrderCriteria")) {
            var obj = gridReqMap.get("OrderCriteria");
            for (var i = 0; i < obj.length; i++) {
                switch (obj[i].columnName) {
                    // case "AT_Asset_Subtype": obj[i].columnName = "AssetSubtype"; break;
                    case "AT_Asset_Type": obj[i].columnName = "AssetType"; break;
                    case "AT_Asset_Status": obj[i].columnName = "AssetStatus"; break;
                    case "AT_Asset_Value": obj[i].columnName = "AssetValue"; break;
                    case "ASSET_ID": obj[i].columnName = "AssetSeq"; break;
                    // case "AT_Asset_Location": obj[i].columnName = "AssetLocation"; break;
                    case "AT_INCLUDE_IN_DBR": obj[i].columnName = "IncludeInDBR"; break;
                    default: console.error("Column ID '" + obj[i].columnName + "' not mapped with any key");
                }
            }
        }
        this.readonlyGrid.combineMaps(gridReqMap, inputMap);
        this.services.http.fetchApi('/AssetDetails', 'GET', inputMap, '/rlo-de').subscribe(
            async (httpResponse: HttpResponse<any>) => {
                var res = httpResponse.body;
                this.loopDataVar4 = [];
                if(res !== null){
                    this.assetRecord = true
                    var loopVar4 = res['AssetDetails'];
                }
                else{
                    this.assetRecord = false
                }
                // var loopVar4 = res['AssetDetails'];
                if (loopVar4) {
                    for (var i = 0; i < loopVar4.length; i++) {
                        var tempObj = {};
                        tempObj['AT_Asset_Subtype'] = loopVar4[i].AssetSubtype;
                        tempObj['AT_Asset_Type'] = loopVar4[i].AssetType;
                        tempObj['AT_Asset_Status'] = loopVar4[i].AssetStatus;
                        tempObj['AT_Asset_Value'] = loopVar4[i].AssetValue;
                        tempObj['ASSET_ID'] = loopVar4[i].AssetSeq;
                        // tempObj['AT_Asset_Location'] = loopVar4[i].AssetLocation;
                        tempObj['AT_INCLUDE_IN_DBR'] = loopVar4[i].IncludeInDBR;
                        this.loopDataVar4.push(tempObj);
                    }
                }
                this.readonlyGrid.apiSuccessCallback(params, this.loopDataVar4);
            },
            async (httpError) => {
                var err = httpError['error']
                if (err != null && err['ErrorElementPath'] != undefined && err['ErrorDescription'] != undefined) {
                }
                this.services.alert.showAlert(2, 'rlo.error.fetch.form', -1);
            }
        );

    }
    async AT_EDIT_click(event) {
        let inputMap = new Map();
        const selectedData0 = this.readonlyGrid.getSelectedData();
            this.modifyAssetDetails.emit({
                'AssetKey': event['ASSET_ID'],
            });
       
    }
    async AT_DELETE_click(event) {
        let inputMap = new Map();
        inputMap.clear();
        inputMap.set('PathParam.AssetSeq', event.ASSET_ID);
        if (confirm("Are you sure you want to delete?")) {            
        this.services.http.fetchApi('/AssetDetails/{AssetSeq}', 'DELETE', inputMap,'/rlo-de').subscribe(
            async (httpResponse: HttpResponse<any>) => {
                var res = httpResponse.body;
                this.services.alert.showAlert(1, 'rlo.success.delete.asset', 5000);
                this.readonlyGrid.refreshGrid();
            },
            async (httpError) => {
                var err = httpError['error']
                if (err != null && err['ErrorElementPath'] != undefined && err['ErrorDescription'] != undefined) {
                }
                this.services.alert.showAlert(2, 'rlo.error.delete.assets', -1);
            }
        );
    }
    }

    getAssetDetails(){
        return this.loopDataVar4;
    }

    formatAmount(number) {
        if (number.value) {
          // Dirty Fix
          return this.services.formatAmount(number.value, null, null).substr(1);
        } else {
          return '-';
        }
      }

}