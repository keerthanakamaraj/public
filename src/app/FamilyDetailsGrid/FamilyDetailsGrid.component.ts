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
    selector: 'app-FamilyDetailsGrid',
    templateUrl: './FamilyDetailsGrid.component.html',
    animations: [
        trigger('slideInOut', [
            state('false', style({ opacity: '0', overflow: 'hidden', height: '0px' })),
            state('true', style({ height: '*', 'padding-top': '1rem' })),
            transition('true => false', animate('300ms ease-out')),
            transition('false => true', animate('300ms ease-in'))
        ])
    ],
})
export class FamilyDetailsGridComponent implements AfterViewInit {
    constructor(private services: ServiceStock, private cdRef: ChangeDetectorRef) { }
    @ViewChild('readonlyGrid', { static: true }) readonlyGrid: ReadonlyGridComponent;

    @Output() onFamilyModify: EventEmitter<any> = new EventEmitter<any>();
    @Input('formCode') formCode: string;
    @Input('displayTitle') displayTitle: boolean = true;
    @Input('displayToolbar') displayToolbar: boolean = true;
    @Input('fieldID') fieldID: string;
    @Output() Cust_FullName: EventEmitter<any> = new EventEmitter<any>();
    @Input() ActiveBorrowerSeq: any;
    familyDetails = [];
    familyRecord: boolean = false;
    componentCode: string = 'FamilyDetailsGrid';
    openedFilterForm: string = '';
    hidden: boolean = false;
    gridConsts: any = {
        paginationPageSize: 10,
        gridCode: "FamilyDetailsGrid",
        paginationReq: false
    };
    columnDefs: any[] = [{
        field: "FD_RELATIONSHIP",
        width: 44,
        sortable: false,
        resizable: true,
        cellStyle: { 'text-align': 'left' },
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
        field: "FD_NAME",
        width: 44,
        sortable: false,
        resizable: true,
        cellStyle: { 'text-align': 'left' },
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
        width: 6,
        field: " ",
        sortable: false,
        filter: false,
        resizable: true,
        cellRenderer: 'buttonRenderer',
        cellStyle: { 'text-align': 'left' },
        cellRendererParams: {
            gridCode: 'FamilyDetailsGrid',
            columnId: 'FD_MODIFY',
            Type: '1',
            CustomClass: 'btn-edit',
            IconClass: 'fas fa-edit fa-lg',
            onClick: this.FD_MODIFY_click.bind(this),
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
            gridCode: 'FamilyDetailsGrid',
            columnId: 'FD_DELETE',
            Type: '1',
            CustomClass: 'btn-delete',
            IconClass: 'fa fa-trash fa-lg',
            onClick: this.FD_DELETE_click.bind(this),
        },
    },
    ];
    private unsubscribe$: Subject<any> = new Subject<any>();
    updateDdeMenu: Subject<string> = new Subject<string>();

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
        console.log("deep ===","onInit");
        this.readonlyGrid.setGridDataAPI(this.gridDataAPI.bind(this));
        var styleElement = document.createElement('style');
        styleElement.type = 'text/css';
        styleElement.innerHTML = customCss;
        styleElement.id = 'FamilyDetailsGrid_customCss';
        document.getElementsByTagName('head')[0].appendChild(styleElement);
    }
    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
        var styleElement = document.getElementById('FamilyDetailsGrid_customCss');
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
        console.log("deep ===", params);
        let inputMap = new Map();
        inputMap.clear();
        let borrowerSeq: any = event.passFamilyGrid;
        let criteriaJson: any = { "Offset": 1, "Count": 10, FilterCriteria: [] };
        if (borrowerSeq) {
            criteriaJson.FilterCriteria.push({
                "columnName": "CustomerRelated",
                "columnType": "String",
                "conditions": {
                    "searchType": "equals",
                    "searchText": borrowerSeq
                }
            });
        }
        inputMap.set('QueryParam.criteriaDetails', criteriaJson);
        if (gridReqMap.get("FilterCriteria")) {
            var obj = gridReqMap.get("FilterCriteria");
            for (var i = 0; i < obj.length; i++) {
                switch (obj[i].columnName) {
                    case "Family_ID": obj[i].columnName = "BorrowerSeq"; break;
                    case "FD_RELATIONSHIP": obj[i].columnName = "Relationship"; break;
                    case "FD_NAME": obj[i].columnName = "FullName"; break;
                    case "FD_DOB": obj[i].columnName = "DOB"; break;
                    case "Full_NAME": obj[i].columnName = "CustFullName"; break;
                    default: console.error("Column ID '" + obj[i].columnName + "' not mapped with any key");
                }
            }
        }
        if (gridReqMap.get("OrderCriteria")) {
            var obj = gridReqMap.get("OrderCriteria");
            for (var i = 0; i < obj.length; i++) {
                switch (obj[i].columnName) {
                    case "Family_ID": obj[i].columnName = "BorrowerSeq"; break;
                    case "FD_RELATIONSHIP": obj[i].columnName = "Relationship"; break;
                    case "FD_NAME": obj[i].columnName = "FullName"; break;
                    case "FD_DOB": obj[i].columnName = "DOB"; break;
                    case "Full_NAME": obj[i].columnName = "CustFullName"; break;
                    default: console.error("Column ID '" + obj[i].columnName + "' not mapped with any key");
                }
            }
        }
        this.readonlyGrid.combineMaps(gridReqMap, inputMap);
        this.services.http.fetchApi('/BorrowerDetails', 'GET', inputMap, '/rlo-de').subscribe(
            async (httpResponse: HttpResponse<any>) => {
                var res = httpResponse.body;
                this.familyDetails = [];

                if(res != null){
                    var loopVar4 = res['BorrowerDetails'];              

                    if (loopVar4) {
                        for (var i = 0; i < loopVar4.length; i++) {
                            var tempObj = {};
                            tempObj['Family_ID'] = loopVar4[i].BorrowerSeq;
                            tempObj['FD_RELATIONSHIP'] = loopVar4[i].Relationship;
                            tempObj['FD_NAME'] = loopVar4[i].FullName;
                            tempObj['FD_DOB'] = loopVar4[i].DOB;
                            tempObj['Full_NAME'] = loopVar4[i].CustFullName;
                            this.familyDetails.push(tempObj);
                        }

                    }
                }
              
                let obj = {
                    "name": "FamilyDetails",
                    "data": this.familyDetails,
                    "BorrowerSeq": borrowerSeq
                }
                this.services.rloCommonData.globalComponentLvlDataHandler(obj);
                
                this.readonlyGrid.apiSuccessCallback(params, this.familyDetails);
            },
            async (httpError) => {
                var err = httpError['error']
                if (err != null && err['ErrorElementPath'] != undefined && err['ErrorDescription'] != undefined) {
                }
                this.services.alert.showAlert(2, 'rlo.error.load.form', -1);
            }
        );

    }
    async FD_MODIFY_click(event) {
        let inputMap = new Map();
        const selectedData0 = this.readonlyGrid.getSelectedData();
            this.onFamilyModify.emit({
                'SeqKey': event['Family_ID'],
            });
        
    }
    async FD_DELETE_click(event) {
        let inputMap = new Map();
        inputMap.clear();
        inputMap.set('PathParam.BorrowerSeq', event.Family_ID);
        if (confirm("Are you sure you want to Delete?")) {
            this.services.http.fetchApi('/BorrowerDetails/{BorrowerSeq}', 'DELETE', inputMap, '/rlo-de').subscribe(
                async (httpResponse: HttpResponse<any>) => {
                    var res = httpResponse.body;
                    console.error("deep ===", this.familyDetails);
                    this.services.alert.showAlert(1, 'rlo.success.delete.family', 5000);

                    // if (this.familyDetails.length == 1)
                    //     this.services.rloCommonData.updateValuesFundLineGraph("remove");

                    this.readonlyGrid.refreshGrid();
                },
                async (httpError) => {
                    var err = httpError['error']
                    if (err != null && err['ErrorElementPath'] != undefined && err['ErrorDescription'] != undefined) {
                    }
                    this.services.alert.showAlert(2, 'rlo.error.delete.family', -1);
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
    getFamilyDetails() {
        return this.familyDetails;
    }

}