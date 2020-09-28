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
        width: 22,
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
        field: "Weight",
        width: 22,
        cellStyle: { 'text-align': 'left' },
        filter: false,
    },
    {
        field: "Value",
        width: 22,
        cellStyle: { 'text-align': 'left' },
        filter: false,
    },
    {
        field: "MarketRate",
        width: 22,
        cellStyle: { 'text-align': 'left' },
        filter: false,
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

}