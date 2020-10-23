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
    selector: 'app-GoldDetailsGrid',
    templateUrl: './GoldDetailsGrid.component.html',
    animations: [
        trigger('slideInOut', [
            state('false', style({ opacity: '0', overflow: 'hidden', height: '0px' })),
            state('true', style({ height: '*', 'padding-top': '1rem' })),
            transition('true => false', animate('300ms ease-out')),
            transition('false => true', animate('300ms ease-in'))
        ])
    ],
})
export class GoldDetailsGridComponent implements AfterViewInit {
    constructor(private services: ServiceStock, private cdRef: ChangeDetectorRef) { }
    @ViewChild('readonlyGrid', { static: true }) readonlyGrid: ReadonlyGridComponent;
    @Output() ModifyGoldDeatils: EventEmitter<any> = new EventEmitter<any>();
    @Input('formCode') formCode: string;
    @Input('displayTitle') displayTitle: boolean = true;
    @Input('displayToolbar') displayToolbar: boolean = true;
    @Input('fieldID') fieldID: string;

    componentCode: string = 'GoldDetailsGrid';
    openedFilterForm: string = '';
    hidden: boolean = false;
    gridConsts: any = {
        paginationPageSize: 10,
        gridCode: "GoldDetailsGrid",
        paginationReq: false
    };
    columnDefs: any[] = [{
        field: "GoldOrnamentType",
        width: 15,
        cellStyle: { 'text-align': 'left' },
        filter: false,
    },
    {
        field: "Count",
        width: 15,
        cellStyle: { 'text-align': 'left' },
        filter: false,
    },
    {
        field: "Weight",
        width: 15,
        cellStyle: { 'text-align': 'left' },
        filter: false,
    },
    {
        field: "TotalWeight",
        width: 15,
        cellStyle: { 'text-align': 'left' },
        filter: false,
    },
    {
        field: "MarketRate",
        width: 14,
        cellStyle: { 'text-align': 'right' },
        filter: false,
        valueFormatter: this.formatAmount.bind(this),
    },
    {
        field: "Value",
        width: 14,
        cellStyle: { 'text-align': 'right' },
        filter: false,
        valueFormatter: this.formatAmount.bind(this),
    },
    {
        width: 6,
        field: " ",
        sortable: false,
        filter: false,
        resizable: true,
        cellRenderer: 'buttonRenderer',
        cellStyle: { 'text-align': 'left' },
        cellRendererParams: {
            gridCode: 'GoldDetailsGrid',
            columnId: 'GOLD_Modify',
            Type: '1',
            CustomClass: 'btn-edit',
            IconClass: 'fas fa-edit fa-lg',
            onClick: this.GD_MODIFY_click.bind(this),
        },
    },
    {
        width: 6,
        field: " ",
        sortable: false,
        filter: false,
        resizable: true,
        cellRenderer: 'buttonRenderer',
        cellStyle: { 'text-align': 'left' },
        cellRendererParams: {
            gridCode: 'GoldDetailsGrid',
            columnId: 'GOLD_Delete',
            Type: '1',
            CustomClass: 'btn-delete',
            IconClass: 'fa fa-trash fa-lg',
            onClick: this.GD_DELETE_click.bind(this),
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
        styleElement.id = 'GoldDetailsGrid_customCss';
        document.getElementsByTagName('head')[0].appendChild(styleElement);
    }
    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
        var styleElement = document.getElementById('GoldDetailsGrid_customCss');
        styleElement.parentNode.removeChild(styleElement);
    }
    setValue(rowData) {
        this.readonlyGrid.setRowData(rowData);
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
        let criteriaJson: any = { "Offset": 1, "Count": 10, FilterCriteria: [] };
        if (applicationId) {
            criteriaJson.FilterCriteria.push({
                "columnName": "ApplicationId",
                "columnType": "String",
                "conditions": {
                    "searchType": "equals",
                    "searchText": applicationId
                }
            }); inputMap.set('QueryParam.criteriaDetails.FilterCriteria', criteriaJson.FilterCriteria);
        }
        if (gridReqMap.get("FilterCriteria")) {
            var obj = gridReqMap.get("FilterCriteria");
            for (var i = 0; i < obj.length; i++) {
                switch (obj[i].columnName) {
                    case "GoldDetailSeq": obj[i].columnName = "GoldDetailSeq"; break;
                    case "Weight": obj[i].columnName = "Body.GoldDetails.Weight"; break;
                    case "Count": obj[i].columnName = "Body.GoldDetails.Count"; break;
                    case "TotalWeight": obj[i].columnName = "Body.GoldDetails.TotalWeight"; break;
                    case "Value": obj[i].columnName = "Body.GoldDetails.Value"; break;
                    case "MarketRate": obj[i].columnName = "Body.GoldDetails.MarketRate"; break;
                    case "GoldOrnamentType": obj[i].columnName = "Body.GoldDetails.GoldOrnamentType"; break;
                    default: console.error("Column ID '" + obj[i].columnName + "' not mapped with any key");
                }
            }
        }
        if (gridReqMap.get("OrderCriteria")) {
            var obj = gridReqMap.get("OrderCriteria");
            for (var i = 0; i < obj.length; i++) {
                switch (obj[i].columnName) {
                    case "GoldDetailSeq": obj[i].columnName = "GoldDetailSeq"; break;
                    case "Weight": obj[i].columnName = "Body.GoldDetails.Weight"; break;
                    case "Count": obj[i].columnName = "Body.GoldDetails.Count"; break;
                    case "TotalWeight": obj[i].columnName = "Body.GoldDetails.TotalWeight"; break;
                    case "Value": obj[i].columnName = "Body.GoldDetails.Value"; break;
                    case "MarketRate": obj[i].columnName = "Body.GoldDetails.MarketRate"; break;
                    case "GoldOrnamentType": obj[i].columnName = "Body.GoldDetails.GoldOrnamentType"; break;
                    default: console.error("Column ID '" + obj[i].columnName + "' not mapped with any key");
                }
            }
        }
        this.readonlyGrid.combineMaps(gridReqMap, inputMap);
        this.services.http.fetchApi('/GoldDetails', 'GET', inputMap,'/rlo-de').subscribe(
            async (httpResponse: HttpResponse<any>) => {
                var res = httpResponse.body;
                var loopDataVar10 = [];
                var loopVar10 = res['GoldDetails'];
                if (loopVar10) {
                    for (var i = 0; i < loopVar10.length; i++) {
                        var tempObj = {};
                        tempObj['GoldDetailSeq'] = loopVar10[i].GoldDetailSeq;
                        tempObj['Weight'] = loopVar10[i].Weight;
                        tempObj['Count'] = loopVar10[i].Count;
                        tempObj['TotalWeight'] = loopVar10[i].TotalWeight;
                        tempObj['Value'] = loopVar10[i].Value;
                        tempObj['MarketRate'] = loopVar10[i].MarketRate;
                        tempObj['GoldOrnamentType'] = loopVar10[i].GoldOrnamentType.text;
                        loopDataVar10.push(tempObj);
                    }
                }
                this.readonlyGrid.apiSuccessCallback(params, loopDataVar10);
            },
            async (httpError) => {
                var err = httpError['error']
                if (err != null && err['ErrorElementPath'] != undefined && err['ErrorDescription'] != undefined) {
                }
            }
        );

    }
    async GD_MODIFY_click(event) {
        let inputMap = new Map();
        const selectedData0 = this.readonlyGrid.getSelectedData();
        this.ModifyGoldDeatils.emit({
            'GoldKey': event['GoldDetailSeq'],
        });

    }
    async GD_DELETE_click(event) {
        let inputMap = new Map();
        inputMap.clear();
        inputMap.set('PathParam.ApplicationId', event.GoldDetailSeq);
        if (confirm("Are you sure you want to Delete?")) {
            this.services.http.fetchApi('/GoldDetails/{ApplicationId}', 'DELETE', inputMap, '/rlo-de').subscribe(
                async (httpResponse: HttpResponse<any>) => {
                    var res = httpResponse.body;
                    this.services.alert.showAlert(1, 'rlo.success.delete.gold', 5000);

                    // if (this.familyDetails.length == 1)
                    //     this.services.rloCommonData.updateValuesFundLineGraph("remove");

                    this.readonlyGrid.refreshGrid();
                },
                async (httpError) => {
                    var err = httpError['error']
                    if (err != null && err['ErrorElementPath'] != undefined && err['ErrorDescription'] != undefined) {
                    }
                    this.services.alert.showAlert(2, 'rlo.error.delete.gold', -1);
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

    formatAmount(number) {
        if (number.value) {
            return this.services.formatAmount(number.value, null, null,false);
        } else {
            return '-';
        }
    }
    

}