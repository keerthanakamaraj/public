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
    selector: 'app-FDDetailsGrid',
    templateUrl: './FDDetailsGrid.component.html',
    animations: [
        trigger('slideInOut', [
            state('false', style({ opacity: '0', overflow: 'hidden', height: '0px' })),
            state('true', style({ height: '*', 'padding-top': '1rem' })),
            transition('true => false', animate('300ms ease-out')),
            transition('false => true', animate('300ms ease-in'))
        ])
    ],
})
export class FDDetailsGridComponent implements AfterViewInit {
    constructor(private services: ServiceStock, private cdRef: ChangeDetectorRef) { }
    @ViewChild('readonlyGrid', { static: true }) readonlyGrid: ReadonlyGridComponent;
    @Output() modifyFDDetails: EventEmitter<any> = new EventEmitter<any>();
    @Input('formCode') formCode: string;
    @Input('displayTitle') displayTitle: boolean = true;
    @Input('displayToolbar') displayToolbar: boolean = true;
    @Input('fieldID') fieldID: string;

    componentCode: string = 'FDDetailsGrid';
    openedFilterForm: string = '';
    hidden: boolean = false;
    loopDataVar4 = [];
    fdRecord: boolean = false;

    gridConsts: any = {
        paginationPageSize: 10,
        gridCode: "FDDetailsGrid",
        paginationReq: false
    };
    columnDefs: any[] = [{
        field: "FDNumber",
        width: 20,
        cellStyle: { 'text-align': 'left' },
        filter: false,
    },
    {
        field: "FDAmount",
        width: 20,
        cellStyle: { 'text-align': 'right' },
        valueFormatter: this.formatAmount.bind(this),
        filter: false,
    },
    {
        field: "LienAmount",
        width: 20,
        cellStyle: { 'text-align': 'right' },
        valueFormatter: this.formatAmount.bind(this),
        filter: false,
    },
    {
        field: "DateofMaturity",
        width: 20,
        cellStyle: { 'text-align': 'left' },
        filter: false,
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
            gridCode: 'FDDetailsGrid',
            columnId: 'EDIT',
            Type: '1',
            CustomClass: 'btn-edit',
            IconClass: 'fas fa-edit fa-lg',
            onClick: this.FD_EDIT_click.bind(this),
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
            gridCode: 'FDDetailsGrid',
            columnId: 'DELETE',
            Type: '1',
            CustomClass: 'btn-delete',
            IconClass: 'fa fa-trash fa-lg',
            onClick: this.FD_DELETE_click.bind(this),
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
        styleElement.id = 'FDDetailsGrid_customCss';
        document.getElementsByTagName('head')[0].appendChild(styleElement);
    }
    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
        var styleElement = document.getElementById('FDDetailsGrid_customCss');
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

        let FDId: any = event.passBorrowerToFD;
        let criteriaJson: any = { "Offset": 1, "Count": 10, FilterCriteria: [] };
        if (FDId) {
            criteriaJson.FilterCriteria.push({
                "columnName": "BorrowerSeq",
                "columnType": "String",
                "conditions": {
                    "searchType": "equals",
                    "searchText": FDId
                }
            });
            inputMap.set('QueryParam.criteriaDetails.FilterCriteria', criteriaJson.FilterCriteria);

        }

        if (gridReqMap.get("FilterCriteria")) {
            var obj = gridReqMap.get("FilterCriteria");
            for (var i = 0; i < obj.length; i++) {
                switch (obj[i].columnName) {
                    case "FDNumber": obj[i].columnName = "FDNumber"; break;
                    case "FDAmount": obj[i].columnName = "AssetValue"; break;
                    case "FD_ID": obj[i].columnName = "AssetSeq"; break;
                    case "LienAmount": obj[i].columnName = "LienAmount"; break;
                    case "DateofMaturity": obj[i].columnName = "DateofMaturity"; break;
                    default: console.error("Column ID '" + obj[i].columnName + "' not mapped with any key");
                }
            }
        }
        if (gridReqMap.get("OrderCriteria")) {
            var obj = gridReqMap.get("OrderCriteria");
            for (var i = 0; i < obj.length; i++) {
                switch (obj[i].columnName) {
                    case "FDNumber": obj[i].columnName = "FDNumber"; break;
                    case "FDAmount": obj[i].columnName = "AssetValue"; break;
                    case "FD_ID": obj[i].columnName = "AssetSeq"; break;
                    case "LienAmount": obj[i].columnName = "LienAmount"; break;
                    case "DateofMaturity": obj[i].columnName = "DateofMaturity"; break;
                    default: console.error("Column ID '" + obj[i].columnName + "' not mapped with any key");
                }
            }
        }
        this.readonlyGrid.combineMaps(gridReqMap, inputMap);
        this.services.http.fetchApi('/AssetDetails', 'GET', inputMap, '/rlo-de').subscribe(
            async (httpResponse: HttpResponse<any>) => {
                var res = httpResponse.body;
                this.loopDataVar4 = [];
                var loopVar4 = [];
                if (res !== null) {
                    this.fdRecord = true
                    loopVar4 = res['AssetDetails'];
                }
                else {
                    this.fdRecord = false
                }
                // var loopVar4 = res['AssetDetails'];
                if (loopVar4) {
                    var totalValue = { 'FDNumber': 'Total Lien Amount', 'LienAmount': Number('0') };
                    for (var i = 0; i < loopVar4.length; i++) {
                        var tempObj = {};
                        if (loopVar4[i].FDNumber != undefined) {
                            tempObj['FDNumber'] = loopVar4[i].FDNumber;
                            tempObj['LienAmount'] = loopVar4[i].LienAmt;
                            tempObj['DateofMaturity'] = loopVar4[i].DateOfMaturity;
                            tempObj['FDAmount'] = loopVar4[i].AssetValue;
                            tempObj['FD_ID'] = loopVar4[i].AssetSeq;
                            this.loopDataVar4.push(tempObj);

                            totalValue['FDNumber'] = 'Total';
                            totalValue['FD_ID'] = totalValue['FD_ID'] + loopVar4[i].AssetSeq;
                            totalValue['LienAmount'] += Number(loopVar4[i].LienAmt);

                        }
                    }
                    this.loopDataVar4.push(totalValue);
                    console.log("new object", totalValue);
                }

                let obj = {
                    "name": "AssetDetails",
                    "data": loopVar4,
                    "BorrowerSeq": event.passBorrowerToAsset
                }
                this.services.rloCommonData.globalComponentLvlDataHandler(obj);

                this.readonlyGrid.apiSuccessCallback(params, this.loopDataVar4);
                setTimeout(() => {
                    this.hideLastColCells();
                }, 500);
            },
            async (httpError) => {
                var err = httpError['error']
                if (err != null && err['ErrorElementPath'] != undefined && err['ErrorDescription'] != undefined) {
                }
                this.services.alert.showAlert(2, 'rlo.error.fetch.form', -1);
            }
        );

    }
    async FD_EDIT_click(event) {
        let inputMap = new Map();
        const selectedData0 = this.readonlyGrid.getSelectedData();
        this.modifyFDDetails.emit({
            'AssetKey': event['FD_ID'],
        });

    }
    async FD_DELETE_click(event) {
        let inputMap = new Map();
        inputMap.clear();
        inputMap.set('PathParam.AssetSeq', event.FD_ID);
        if (confirm("Are you sure you want to delete?")) {
            this.services.http.fetchApi('/AssetDetails/{AssetSeq}', 'DELETE', inputMap, '/rlo-de').subscribe(
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

    getAssetDetails() {
        return this.loopDataVar4;
    }

    formatAmount(number) {
        if (number.value) {
            return this.services.formatAmount(number.value, null, null, false);
        } else {
            return '-';
        }
    }
    //make edit and del icons hidden
    hideLastColCells() {
        let tableRow = document.getElementsByClassName('ag-center-cols-container')[0].children;
        let lastRow = tableRow[tableRow.length - 1].children

        console.error(tableRow);
        console.error("last", lastRow);
        lastRow[lastRow.length - 1].classList.add("d-none");
        lastRow[lastRow.length - 2].classList.add("d-none");
    }
}