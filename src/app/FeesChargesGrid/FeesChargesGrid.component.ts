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
selector: 'app-FeesChargesGrid',
templateUrl: './FeesChargesGrid.component.html',
animations: [
trigger('slideInOut', [
state('false', style({ opacity: '0', overflow: 'hidden', height: '0px' })),
state('true', style({ height: '*', 'padding-top': '1rem' })),
transition('true => false', animate('300ms ease-out')),
transition('false => true', animate('300ms ease-in'))
])
],
})
export class FeesChargesGridComponent implements AfterViewInit {
constructor(private services: ServiceStock, private cdRef: ChangeDetectorRef) {}
@ViewChild('readonlyGrid', {static: true}) readonlyGrid: ReadonlyGridComponent;

@Input('formCode') formCode: string;
@Input('displayTitle') displayTitle: boolean = true;
@Input('displayToolbar') displayToolbar: boolean = true;
@Input('fieldID') fieldID: string;

componentCode: string = 'FeesChargesGrid';
openedFilterForm:string = '';
hidden:boolean = false;
gridConsts: any = {
paginationPageSize: 10,
gridCode: "FeesChargesGrid",
paginationReq:false
};
columnDefs:any[] = [{
field:"FC_Charge_Desc",
width:10,
resizable: true,
cellStyle: {'text-align': 'left'},
filter: false,
},
{
field:"FC_Party_Name",
width:10,
resizable: true,
cellStyle: {'text-align': 'left'},
filter: false,
},
{
field:"FC_Charge_Type",
width:7,
resizable: true,
cellStyle: {'text-align': 'left'},
filter: false,
},
{
field:"FC_Rate",
width:7,
resizable: true,
cellStyle: {'text-align': 'left'},
filter: false,
},
{
field:"FC_Amount",
width:10,
resizable: true,
cellStyle: {'text-align': 'left'},
filter: false,
},
{
field:"FC_Effective_Amt",
width:12,
resizable: true,
cellStyle: {'text-align': 'left'},
filter: false,
},
{
field:"FC_Frequency",
width:7,
resizable: true,
cellStyle: {'text-align': 'left'},
filter: false,
},
{
field:"FC_Rate_Charge_On",
width:13,
resizable: true,
cellStyle: {'text-align': 'left'},
filter: false,
},
{
field:"FC_Charge_Collection",
width:13,
resizable: true,
cellStyle: {'text-align': 'left'},
filter: false,
},
{
width:5,
field:"FC_Edit",
sortable: false,
filter: false,
resizable: true,
cellRenderer: 'buttonRenderer',
cellStyle: {'text-align': 'center'},
cellRendererParams: {
gridCode: 'FeesChargesGrid',
columnId: 'FC_Edit',
Type: '1',
CustomClass: 'btn-edit'
},
},
{
width:5,
field:"FC_Delete",
sortable: false,
filter: false,
cellRenderer: 'buttonRenderer',
cellStyle: {'text-align': 'center'},
cellRendererParams: {
gridCode: 'FeesChargesGrid',
columnId: 'FC_Delete',
Type: '1',
CustomClass: 'btn-delete'
},
},
];
private unsubscribe$: Subject<any> = new Subject<any>();
ngAfterViewInit() {
this.services.translate.onLangChange
.pipe(takeUntil(this.unsubscribe$))
.subscribe((event: LangChangeEvent) => {
var colDefClone = [];
for(var i=0;i<this.columnDefs.length;i++){
colDefClone[i] = Object.assign({}, this.columnDefs[i]);
}
this.readonlyGrid.loadColums(colDefClone);
});
}
onGridSizeChanged(){
var colDefClone = [];
for(var i=0;i<this.columnDefs.length;i++){
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
styleElement.id = 'FeesChargesGrid_customCss';
document.getElementsByTagName('head')[0].appendChild(styleElement);
}
ngOnDestroy(){
this.unsubscribe$.next();
this.unsubscribe$.complete();
var styleElement = document.getElementById('FeesChargesGrid_customCss');
styleElement.parentNode.removeChild(styleElement);
}
setValue(rowData) {
this.readonlyGrid.setRowData(rowData);
}
setHidden(value: boolean){
this.hidden = value;
}
isHidden(){
return this.hidden;
}
loadSpinner=false;
showSpinner(){
this.loadSpinner=true;
}
hideSpinner(){
this.loadSpinner=false;
}

}