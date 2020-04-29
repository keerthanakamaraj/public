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
    selector: 'app-SearchCustomerGrid',
    templateUrl: './SearchCustomerGrid.component.html',
    animations: [
        trigger('slideInOut', [
            state('false', style({ opacity: '0', overflow: 'hidden', height: '0px' })),
            state('true', style({ height: '*', 'padding-top': '1rem' })),
            transition('true => false', animate('300ms ease-out')),
            transition('false => true', animate('300ms ease-in'))
        ])
    ],
})
export class SearchCustomerGridComponent implements AfterViewInit {
    dedupecount: boolean = true;
    constructor(private services: ServiceStock, private cdRef: ChangeDetectorRef) { }
    @ViewChild('readonlyGrid', { static: true }) readonlyGrid: ReadonlyGridComponent;

    @Input('formCode') formCode: string;
    @Input('displayTitle') displayTitle: boolean = true;
    @Input('displayToolbar') displayToolbar: boolean = true;
    @Input('fieldID') fieldID: string;

    componentCode: string = 'SearchCustomerGrid';
    openedFilterForm: string = '';
    hidden: boolean = false;
    gridConsts: any = {
        paginationPageSize: 10,
        gridCode: "SearchCustomerGrid",
        paginationReq: true
    };
    columnDefs: any[] = [{
        field: "TaxID",
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
        field: "CustName",
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
        field: "AccNo",
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
        field: "AccVintage",
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
        field: "AccType",
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
        field: "Status",
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
        field: "Mobile",
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
        field: "Cif",
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
        field: "Dob",
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
        this.readonlyGrid.setRowClickHandler(this.rowClicked.bind(this));
        var styleElement = document.createElement('style');
        styleElement.type = 'text/css';
        styleElement.innerHTML = customCss;
        styleElement.id = 'SearchCustomerGrid_customCss';
        document.getElementsByTagName('head')[0].appendChild(styleElement);
    }
    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
        var styleElement = document.getElementById('SearchCustomerGrid_customCss');
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
        inputMap.set('QueryParam.TaxId', this.services.dataStore.getRouteParam(this.services.routing.currModal, 'TaxId'));
        inputMap.set('QueryParam.MobileNumber', this.services.dataStore.getRouteParam(this.services.routing.currModal, 'MobileNo'));
        inputMap.set('QueryParam.ExistingCIF', this.services.dataStore.getRouteParam(this.services.routing.currModal, 'CifNo'));
        if (gridReqMap.get("FilterCriteria")) {
            var obj = gridReqMap.get("FilterCriteria");
            for (var i = 0; i < obj.length; i++) {
                switch (obj[i].columnName) {
                    case "TaxID": obj[i].columnName = "TaxId"; break;
                    case "CustName": obj[i].columnName = "FullName"; break;
                    case "AccNo": obj[i].columnName = "AccountNumber"; break;
                    case "AccVintage": obj[i].columnName = "AccountVintage"; break;
                    case "AccType": obj[i].columnName = "AccountType"; break;
                    case "Status": obj[i].columnName = "ApplicationStatus"; break;
                    case "Mobile": obj[i].columnName = "MobileNumber"; break;
                    case "Cif": obj[i].columnName = "ExistingCIF"; break;
                    case "Dob": obj[i].columnName = "DateOfBirth"; break;
                    default: console.error("Column ID '" + obj[i].columnName + "' not mapped with any key");
                }
            }
        }
        if (gridReqMap.get("OrderCriteria")) {
            var obj = gridReqMap.get("OrderCriteria");
            for (var i = 0; i < obj.length; i++) {
                switch (obj[i].columnName) {
                    case "TaxID": obj[i].columnName = "TaxId"; break;
                    case "CustName": obj[i].columnName = "FullName"; break;
                    case "AccNo": obj[i].columnName = "AccountNumber"; break;
                    case "AccVintage": obj[i].columnName = "AccountVintage"; break;
                    case "AccType": obj[i].columnName = "AccountType"; break;
                    case "Status": obj[i].columnName = "ApplicationStatus"; break;
                    case "Mobile": obj[i].columnName = "MobileNumber"; break;
                    case "Cif": obj[i].columnName = "ExistingCIF"; break;
                    case "Dob": obj[i].columnName = "DateOfBirth"; break;
                    default: console.error("Column ID '" + obj[i].columnName + "' not mapped with any key");
                }
            }
        }
        this.readonlyGrid.combineMaps(gridReqMap, inputMap);
        this.services.http.fetchApi('/dedupe', 'GET', inputMap, "/initiation").subscribe(
            async (httpResponse: HttpResponse<any>) => {
                var res = httpResponse.body;
                console.log("res", res)
                if (res == null) {
                    this.dedupecount = false;

                    //  this.readonlyGrid.setHidden(true);
                } else {
                    var loopVar7 = res['Dedupe'];
                }
                var loopDataVar7 = [];

                console.log("loopVar7", loopVar7);

                if (loopVar7) {
                    for (var i = 0; i < loopVar7.length; i++) {
                        var tempObj = {};
                        tempObj['TaxID'] = loopVar7[i].TaxId;
                        tempObj['CustName'] = loopVar7[i].FullName;
                        tempObj['AccNo'] = loopVar7[i].AccountNumber;
                        tempObj['AccVintage'] = loopVar7[i].AccountVintage;
                        tempObj['AccType'] = loopVar7[i].AccountType;
                        tempObj['Status'] = loopVar7[i].ApplicationStatus;
                        tempObj['Mobile'] = loopVar7[i].MobileNumber;
                        tempObj['Cif'] = loopVar7[i].ExistingCIF;
                        tempObj['Dob'] = loopVar7[i].DateOfBirth;
                        tempObj['FirstName'] = loopVar7[i].FirstName;
                        tempObj['MiddleName'] = loopVar7[i].MiddleName;
                        tempObj['LastName'] = loopVar7[i].LastName;
                        tempObj['Title'] = loopVar7[i].Title;
                        tempObj['Gender'] = loopVar7[i].Gender;
                        loopDataVar7.push(tempObj);
                    }
                }
                this.readonlyGrid.apiSuccessCallback(params, loopDataVar7);
            },
            async (httpError) => {
                var err = httpError['error']
                if (err != null && err['ErrorElementPath'] != undefined && err['ErrorDescription'] != undefined) {
                }
            }
        );

    }
    async rowClicked(event) {
        let inputMap = new Map();
        const selectedData0 = this.readonlyGrid.getSelectedData();
        if (selectedData0) {
            let tempVar: any = {};
            tempVar['firsName'] = selectedData0['FirstName'];
            tempVar['midName'] = selectedData0['MiddleName'];
            tempVar['lastName'] = selectedData0['LastName'];
            tempVar['title'] = selectedData0['Title'];
            tempVar['gender'] = selectedData0['Gender'];
            tempVar['mobileNum'] = selectedData0['Mobile'];
            tempVar['taxId'] = selectedData0['TaxID'];
            tempVar['custName'] = selectedData0['CustName'];
            tempVar['accNo'] = selectedData0['AccNo'];
            tempVar['accVintage'] = selectedData0['AccVintage'];
            tempVar['accType'] = selectedData0['AccType'];
            tempVar['status'] = selectedData0['Status'];
            tempVar['dob'] = selectedData0['Dob'];
            tempVar['cif'] = selectedData0['Cif'];
            this.services.dataStore.setData('selectedData', tempVar);
            for (var i = this.services.routing.currModal; i > 0; i--) {
                await this.services.dataStore.getModalReference(i).componentInstance.closeModal();
            }
        }

    }

}
