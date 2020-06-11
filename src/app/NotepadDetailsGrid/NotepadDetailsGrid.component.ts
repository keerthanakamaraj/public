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
    selector: 'app-NotepadDetailsGrid',
    templateUrl: './NotepadDetailsGrid.component.html',
    animations: [
        trigger('slideInOut', [
            state('false', style({ opacity: '0', overflow: 'hidden', height: '0px' })),
            state('true', style({ height: '*', 'padding-top': '1rem' })),
            transition('true => false', animate('300ms ease-out')),
            transition('false => true', animate('300ms ease-in'))
        ])
    ],
})
export class NotepadDetailsGridComponent implements AfterViewInit {
    constructor(private services: ServiceStock, private cdRef: ChangeDetectorRef) { }
    @ViewChild('readonlyGrid', { static: true }) readonlyGrid: ReadonlyGridComponent;

    @Input('formCode') formCode: string;
    @Input('displayTitle') displayTitle: boolean = true;
    @Input('displayToolbar') displayToolbar: boolean = true;
    @Input('fieldID') fieldID: string;

    componentCode: string = 'NotepadDetailsGrid';
    openedFilterForm: string = '';
    hidden: boolean = false;
    gridConsts: any = {
        paginationPageSize: 10,
        gridCode: "NotepadDetailsGrid",
        paginationReq: true
    };
    columnDefs: any[] = [{
        field: "ND_SR_NO",
        width: 25,
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
        field: "Comment_Category",
        width: 25,
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
        field: "ND_COMMENTS",
        width: 50,
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
        styleElement.id = 'NotepadDetailsGrid_customCss';
        document.getElementsByTagName('head')[0].appendChild(styleElement);
    }
    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
        var styleElement = document.getElementById('NotepadDetailsGrid_customCss');
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
        let ApplicationId: any = event.ApplicationId;
        let criteriaJson: any = { "Offset": 1, "Count": 10, FilterCriteria: [] };
        if (ApplicationId) {
            criteriaJson.FilterCriteria.push({
                "columnName": "ApplicationId",
                "columnType": "String",
                "conditions": {
                    "searchType": "equals",
                    "searchText": ApplicationId
                }
            });
        }
        inputMap.set('QueryParam.criteriaDetails', criteriaJson);
        if (gridReqMap.get("FilterCriteria")) {
            var obj = gridReqMap.get("FilterCriteria");
            for (var i = 0; i < obj.length; i++) {
                switch (obj[i].columnName) {
                    case "Comment_Category": obj[i].columnName = "CommentCategory"; break;
                    case "ND_SR_NO": obj[i].columnName = "NotepadSeq"; break;
                    case "ND_COMMENTS": obj[i].columnName = "Comments"; break;
                    default: console.error("Column ID '" + obj[i].columnName + "' not mapped with any key");
                }
            }
        }
        if (gridReqMap.get("OrderCriteria")) {
            var obj = gridReqMap.get("OrderCriteria");
            for (var i = 0; i < obj.length; i++) {
                switch (obj[i].columnName) {
                    case "Comment_Category": obj[i].columnName = "CommentCategory"; break;
                    case "ND_SR_NO": obj[i].columnName = "NotepadSeq"; break;
                    case "ND_COMMENTS": obj[i].columnName = "Comments"; break;
                    default: console.error("Column ID '" + obj[i].columnName + "' not mapped with any key");
                }
            }
        }

        this.readonlyGrid.combineMaps(gridReqMap, inputMap);
        this.services.http.fetchApi('/NotepadDetails', 'GET', inputMap, '/rlo-de').subscribe(
            async (httpResponse: HttpResponse<any>) => {
                var res = httpResponse.body;
                if (res != null && res != undefined) {
                    var loopDataVar9 = [];
                    var loopVar9 = res['NotepadDetails'];
                    if (loopVar9) {
                        for (var i = 0; i < loopVar9.length; i++) {
                            var tempObj = {};
                            tempObj['Comment_Category'] = loopVar9[i].CommentCategory;
                            //tempObj['ND_SR_NO'] = loopVar9[i].NotepadSeq;
                            tempObj['ND_SR_NO'] = i + 1;
                            tempObj['ND_COMMENTS'] = loopVar9[i].Comments;
                            loopDataVar9.push(tempObj);
                        }
                    }
                    this.readonlyGrid.apiSuccessCallback(params, loopDataVar9);
                }
            },
            async (httpError) => {
                var err = httpError['error']
                if (err != null && err['ErrorElementPath'] != undefined && err['ErrorDescription'] != undefined) {
                }
                this.services.alert.showAlert(2, '', -1, 'Failed to load grid!');
            }
        );

    }
    loadSpinner = false;
    showSpinner() {
        this.loadSpinner = true;
    }
    hideSpinner() {
        this.loadSpinner = false;
    }

}
