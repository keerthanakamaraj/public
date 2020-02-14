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
selector: 'app-TEST_LOAN_GRID',
templateUrl: './TEST_LOAN_GRID.component.html',
animations: [
trigger('slideInOut', [
state('false', style({ opacity: '0', overflow: 'hidden', height: '0px' })),
state('true', style({ height: '*', 'padding-top': '1rem' })),
transition('true => false', animate('300ms ease-out')),
transition('false => true', animate('300ms ease-in'))
])
],
})
export class TEST_LOAN_GRIDComponent implements AfterViewInit {
constructor(private services: ServiceStock, private cdRef: ChangeDetectorRef) {}
@ViewChild('readonlyGrid', {static: true}) readonlyGrid: ReadonlyGridComponent;
@Input('formCode') formCode: string;
@Input('displayTitle') displayTitle: boolean = true;
@Input('displayToolbar') displayToolbar: boolean = true;
componentCode: string = 'TEST_LOAN_GRID';
openedFilterForm:string = '';
hidden:boolean = false;
gridConsts: any = {
paginationPageSize: 10,
gridCode: "TEST_LOAN_GRID",
paginationReq:true
};
columnDefs:any[] = [{
field:"LoanDetailSeq",
width:25,
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
field:"ApplicationRefernceNo",
width:25,
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
field:"ICIFNumber",
width:25,
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
field:"LoanNo",
width:25,
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
styleElement.id = 'TEST_LOAN_GRID_customCss';
document.getElementsByTagName('head')[0].appendChild(styleElement);
}
ngOnDestroy(){
this.unsubscribe$.next();
this.unsubscribe$.complete();
var styleElement = document.getElementById('TEST_LOAN_GRID_customCss');
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
if(gridReqMap.get("FilterCriteria")){
var obj = gridReqMap.get("FilterCriteria");
for(var i=0;i<obj.length;i++){
switch (obj[i].columnName) {
case "LoanDetailSeq":obj[i].columnName =  "LoanDetailSeq";break;
case "ApplicationRefernceNo":obj[i].columnName =  "ApplicationRefernceNo";break;
case "ICIFNumber":obj[i].columnName =  "ICIFNumber";break;
case "LoanNo":obj[i].columnName =  "LoanNo";break;
default:console.error("Column ID '"+obj[i].columnName+"' not mapped with any key");
}
}
}
if(gridReqMap.get("OrderCriteria")){
var obj = gridReqMap.get("OrderCriteria");
for(var i=0;i<obj.length;i++){
switch (obj[i].columnName) {
case "LoanDetailSeq":obj[i].columnName =  "LoanDetailSeq";break;
case "ApplicationRefernceNo":obj[i].columnName =  "ApplicationRefernceNo";break;
case "ICIFNumber":obj[i].columnName =  "ICIFNumber";break;
case "LoanNo":obj[i].columnName =  "LoanNo";break;
default:console.error("Column ID '"+obj[i].columnName+"' not mapped with any key");
}
}
}
gridReqMap.forEach((value, key)=>{
inputMap.set("QueryParam.criteriaDetails."+key, value);
});
await this.services.http.fetchApi('/LoanDetails', 'GET', inputMap).toPromise()
.then(
async (httpResponse: HttpResponse<any>) => {
var res = httpResponse.body;
var loopDataVar4 = [];
var loopVar4 = res['LoanDetails'];
if (loopVar4) {
for (var i = 0; i < loopVar4.length; i++) {
var tempObj = {};
tempObj['LoanDetailSeq'] = loopVar4[i].LoanDetailSeq;
tempObj['ApplicationRefernceNo'] = loopVar4[i].ApplicationRefernceNo;
tempObj['ICIFNumber'] = loopVar4[i].ICIFNumber;
tempObj['LoanNo'] = loopVar4[i].LoanNo;
loopDataVar4.push(tempObj);}
}
this.readonlyGrid.apiSuccessCallback(params, loopDataVar4);
},
async (httpError)=>{
var err = httpError['error']
if(err!=null && err['ErrorElementPath'] != undefined && err['ErrorDescription']!=undefined){
}
}
);

}

}
