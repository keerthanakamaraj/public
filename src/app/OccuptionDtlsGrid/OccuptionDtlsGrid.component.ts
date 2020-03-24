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
selector: 'app-OccuptionDtlsGrid',
templateUrl: './OccuptionDtlsGrid.component.html',
animations: [
trigger('slideInOut', [
state('false', style({ opacity: '0', overflow: 'hidden', height: '0px' })),
state('true', style({ height: '*', 'padding-top': '1rem' })),
transition('true => false', animate('300ms ease-out')),
transition('false => true', animate('300ms ease-in'))
])
],
})
export class OccuptionDtlsGridComponent implements AfterViewInit {
constructor(private services: ServiceStock, private cdRef: ChangeDetectorRef) {}
@ViewChild('readonlyGrid', {static: true}) readonlyGrid: ReadonlyGridComponent;

@Output() occDtlsEdit: EventEmitter<any> = new EventEmitter<any>();
@Input('formCode') formCode: string;
@Input('displayTitle') displayTitle: boolean = true;
@Input('displayToolbar') displayToolbar: boolean = true;
@Input('fieldID') fieldID: string;

componentCode: string = 'OccuptionDtlsGrid';
openedFilterForm:string = '';
hidden:boolean = false;
gridConsts: any = {
paginationPageSize: 10,
gridCode: "OccuptionDtlsGrid",
paginationReq:true
};
columnDefs:any[] = [{
field:"OD_OCCUPATION",
width:20,
sortable: true,
resizable: true,
cellStyle: {'text-align': 'left'},
filter: "agTextColumnFilter",
filterParams:{
suppressAndOrCondition : true,
applyButton: true,
clearButton: true,
filterOptions:["contains"] ,
caseSensitive:true,
},
},
{
field:"OD_INDUSTRY",
width:20,
sortable: true,
resizable: true,
cellStyle: {'text-align': 'left'},
filter: "agTextColumnFilter",
filterParams:{
suppressAndOrCondition : true,
applyButton: true,
clearButton: true,
filterOptions:["contains"] ,
caseSensitive:true,
},
},
{
field:"OD_COMPANY_NAME",
width:20,
sortable: true,
resizable: true,
cellStyle: {'text-align': 'left'},
filter: "agTextColumnFilter",
filterParams:{
suppressAndOrCondition : true,
applyButton: true,
clearButton: true,
filterOptions:["contains"] ,
caseSensitive:true,
},
},
{
width:20,
field:"OD_EDIT_BTN",
sortable: false,
filter: false,
resizable: true,
cellRenderer: 'buttonRenderer',
cellStyle: {'text-align': 'left'},
cellRendererParams: {
gridCode: 'OccuptionDtlsGrid',
columnId: 'OD_EDIT_BTN',
Type: '2',
CustomClass: 'btn-edit',
IconClass: 'fas fa-edit fa-lg',
onClick: this.OD_EDIT_BTN_click.bind(this)
},
},
{
width:20,
field:"OD_DELETE",
sortable: false,
filter: false,
resizable: true,
cellRenderer: 'buttonRenderer',
cellStyle: {'text-align': 'left'},
cellRendererParams: {
gridCode: 'OccuptionDtlsGrid',
columnId: 'OD_DELETE',
Type: '2',
CustomClass: 'btn-delete',
IconClass: 'fa fa-trash fa-lg',
onClick: this.OD_DELETE_click.bind(this)
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
this.readonlyGrid.setGridDataAPI(this.gridDataAPI.bind(this));
var styleElement = document.createElement('style');
styleElement.type = 'text/css';
styleElement.innerHTML = customCss;
styleElement.id = 'OccuptionDtlsGrid_customCss';
document.getElementsByTagName('head')[0].appendChild(styleElement);
}
ngOnDestroy(){
this.unsubscribe$.next();
this.unsubscribe$.complete();
var styleElement = document.getElementById('OccuptionDtlsGrid_customCss');
styleElement.parentNode.removeChild(styleElement);
}
gridDataLoad(formInputs) {
this.readonlyGrid.setFormInputs(formInputs);
}
refreshGrid(){
this.readonlyGrid.refreshGrid();
}
setHidden(value: boolean){
this.hidden = value;
}
isHidden(){
return this.hidden;
}
async gridDataAPI(params, gridReqMap: Map<string, any>, event){
let inputMap = new Map();
inputMap.clear();
let inputKey:any = event.refNumToGrid;
let criteriaJson:any = {"Offset":1,"Count":10,FilterCriteria:[]};
if(inputKey){
criteriaJson.FilterCriteria.push({
	"columnName": "BorrowerSeq",
	"columnType": "String",
	"conditions": {
		"searchType": "equals",
		"searchText": inputKey
	}
});}
inputMap.set('QueryParam.criteriaDetails', criteriaJson);
if(gridReqMap.get("FilterCriteria")){
var obj = gridReqMap.get("FilterCriteria");
for(var i=0;i<obj.length;i++){
switch (obj[i].columnName) {
case "OCCUPATION_ID":obj[i].columnName =  "OccupationSeq";break;
case "OD_OCCUPATION":obj[i].columnName =  "Occupation";break;
case "OD_INDUSTRY":obj[i].columnName =  "Industry";break;
case "OD_COMPANY_NAME":obj[i].columnName =  "CompanyName";break;
default:console.error("Column ID '"+obj[i].columnName+"' not mapped with any key");
}
}
}
if(gridReqMap.get("OrderCriteria")){
var obj = gridReqMap.get("OrderCriteria");
for(var i=0;i<obj.length;i++){
switch (obj[i].columnName) {
case "OCCUPATION_ID":obj[i].columnName =  "OccupationSeq";break;
case "OD_OCCUPATION":obj[i].columnName =  "Occupation";break;
case "OD_INDUSTRY":obj[i].columnName =  "Industry";break;
case "OD_COMPANY_NAME":obj[i].columnName =  "CompanyName";break;
default:console.error("Column ID '"+obj[i].columnName+"' not mapped with any key");
}
}
}
this.readonlyGrid.combineMaps(gridReqMap, inputMap);
this.services.http.fetchApi('/OccupationDetails', 'GET', inputMap).subscribe(
async (httpResponse: HttpResponse<any>) => {
var res = httpResponse.body;
var loopDataVar10 = [];
var loopVar10 = res['OccupationDetails'];
if (loopVar10) {
for (var i = 0; i < loopVar10.length; i++) {
var tempObj = {};
tempObj['OCCUPATION_ID'] = loopVar10[i].OccupationSeq;
tempObj['OD_OCCUPATION'] = loopVar10[i].Occupation;
tempObj['OD_INDUSTRY'] = loopVar10[i].Industry;
tempObj['OD_COMPANY_NAME'] = loopVar10[i].CompanyName;
loopDataVar10.push(tempObj);}
}
this.readonlyGrid.apiSuccessCallback(params, loopDataVar10);
},
async (httpError)=>{
var err = httpError['error']
if(err!=null && err['ErrorElementPath'] != undefined && err['ErrorDescription']!=undefined){
}
}
);

}
async OD_EDIT_BTN_click(event){
let inputMap = new Map();
const selectedData0 = this.readonlyGrid.getSelectedData();
if(selectedData0){
this.occDtlsEdit.emit({
'OccupationSeq': selectedData0['OCCUPATION_ID'],
});
}
}
async OD_DELETE_click(event){
let inputMap = new Map();
inputMap.clear();
inputMap.set('PathParam.OccupationSeq', event.OCCUPATION_ID);
this.services.http.fetchApi('/OccupationDetails/{OccupationSeq}', 'DELETE', inputMap).subscribe(
async (httpResponse: HttpResponse<any>) => {
var res = httpResponse.body;
this.services.alert.showAlert(1, 'Record Successfully Deleted', 5000);
this.readonlyGrid.refreshGrid();},
async (httpError)=>{
var err = httpError['error']
if(err!=null && err['ErrorElementPath'] != undefined && err['ErrorDescription']!=undefined){
}
this.services.alert.showAlert(2, 'Something went wrong', -1);
}
);
}

}