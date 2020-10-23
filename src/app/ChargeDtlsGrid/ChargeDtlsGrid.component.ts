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
selector: 'app-ChargeDtlsGrid',
templateUrl: './ChargeDtlsGrid.component.html',
animations: [
trigger('slideInOut', [
state('false', style({ opacity: '0', overflow: 'hidden', height: '0px' })),
state('true', style({ height: '*', 'padding-top': '1rem' })),
transition('true => false', animate('300ms ease-out')),
transition('false => true', animate('300ms ease-in'))
])
],
})
export class ChargeDtlsGridComponent implements AfterViewInit {
constructor(private services: ServiceStock, private cdRef: ChangeDetectorRef) {}
@ViewChild('readonlyGrid', {static: true}) readonlyGrid: ReadonlyGridComponent;

@Output() chargeDtlsEdit: EventEmitter<any> = new EventEmitter<any>();
@Input('formCode') formCode: string;
@Input('displayTitle') displayTitle: boolean = true;
@Input('displayToolbar') displayToolbar: boolean = true;
@Input('fieldID') fieldID: string;

componentCode: string = 'ChargeDtlsGrid';
openedFilterForm:string = '';
hidden:boolean = false;
gridConsts: any = {
paginationPageSize: 10,
gridCode: "ChargeDtlsGrid",
paginationReq:true
};
columnDefs:any[] = [{
field:"CH_DESC",
width:10,
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
field:"CH_PARTY_NAME",
width:10,
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
field:"CH_TYPE",
width:10,
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
field:"CH_RATE",
width:10,
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
field:"CH_AMT",
width:10,
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
field:"CH_EFF_AMT",
width:10,
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
field:"CH_FREQ",
width:10,
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
field:"CH_RATE_CH_ON",
width:10,
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
field:"CH_COLL",
width:10,
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
width:5,
field:"CH_EDIT",
sortable: false,
filter: false,
resizable: true,
cellRenderer: 'buttonRenderer',
cellStyle: {'text-align': 'left'},
cellRendererParams: {
gridCode: 'ChargeDtlsGrid',
columnId: 'CH_EDIT',
Type: '2',
CustomClass: 'btn-edit',
IconClass: 'fas fa-edit fa-lg',
onClick: this.CH_EDIT_click.bind(this)
},
},
{
width:5,
field:"CH_DEL",
sortable: false,
filter: false,
resizable: true,
cellRenderer: 'buttonRenderer',
cellStyle: {'text-align': 'left'},
cellRendererParams: {
gridCode: 'ChargeDtlsGrid',
columnId: 'CH_DEL',
Type: '2',
CustomClass: 'btn-delete',
IconClass: 'fa fa-trash fa-lg',
onClick: this.CH_DEL_click.bind(this)
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
styleElement.id = 'ChargeDtlsGrid_customCss';
document.getElementsByTagName('head')[0].appendChild(styleElement);
}
ngOnDestroy(){
this.unsubscribe$.next();
this.unsubscribe$.complete();
var styleElement = document.getElementById('ChargeDtlsGrid_customCss');
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
case "hidChargeSeq":obj[i].columnName =  "ChargeDtlSeq";break;
case "CH_DESC":obj[i].columnName =  "ChargeDescription";break;
case "CH_PARTY_NAME":obj[i].columnName =  "PartyName";break;
case "CH_TYPE":obj[i].columnName =  "ChargeType";break;
case "CH_RATE":obj[i].columnName =  "ChargeRate";break;
case "CH_AMT":obj[i].columnName =  "ChargeAmt";break;
case "CH_FREQ":obj[i].columnName =  "Frequency";break;
case "CH_RATE_CH_ON":obj[i].columnName =  "RateOnCharge";break;
case "CH_COLL":obj[i].columnName =  "ChargeCollection";break;
default:console.error("Column ID '"+obj[i].columnName+"' not mapped with any key");
}
}
}
if(gridReqMap.get("OrderCriteria")){
var obj = gridReqMap.get("OrderCriteria");
for(var i=0;i<obj.length;i++){
switch (obj[i].columnName) {
case "hidChargeSeq":obj[i].columnName =  "ChargeDtlSeq";break;
case "CH_DESC":obj[i].columnName =  "ChargeDescription";break;
case "CH_PARTY_NAME":obj[i].columnName =  "PartyName";break;
case "CH_TYPE":obj[i].columnName =  "ChargeType";break;
case "CH_RATE":obj[i].columnName =  "ChargeRate";break;
case "CH_AMT":obj[i].columnName =  "ChargeAmt";break;
case "CH_FREQ":obj[i].columnName =  "Frequency";break;
case "CH_RATE_CH_ON":obj[i].columnName =  "RateOnCharge";break;
case "CH_COLL":obj[i].columnName =  "ChargeCollection";break;
default:console.error("Column ID '"+obj[i].columnName+"' not mapped with any key");
}
}
}
this.readonlyGrid.combineMaps(gridReqMap, inputMap);
this.services.http.fetchApi('/ChargeDetails', 'GET', inputMap).subscribe(
async (httpResponse: HttpResponse<any>) => {
var res = httpResponse.body;
var loopDataVar4 = [];
var loopVar4 = res['ChargeDetails'];
if (loopVar4) {
for (var i = 0; i < loopVar4.length; i++) {
var tempObj = {};
tempObj['hidChargeSeq'] = loopVar4[i].ChargeDtlSeq;
tempObj['CH_DESC'] = loopVar4[i].ChargeDescription.text;
tempObj['CH_PARTY_NAME'] = loopVar4[i].PartyName;
tempObj['CH_TYPE'] = loopVar4[i].ChargeType.text;
tempObj['CH_RATE'] = loopVar4[i].ChargeRate;
tempObj['CH_AMT'] = loopVar4[i].ChargeAmt;
tempObj['CH_FREQ'] = loopVar4[i].Frequency.text;
tempObj['CH_RATE_CH_ON'] = loopVar4[i].RateOnCharge.text;
tempObj['CH_COLL'] = loopVar4[i].ChargeCollection.text;
loopDataVar4.push(tempObj);}
}
this.readonlyGrid.apiSuccessCallback(params, loopDataVar4);
},
async (httpError)=>{
var err = httpError['error']
if(err!=null && err['ErrorElementPath'] != undefined && err['ErrorDescription']!=undefined){
}
this.services.alert.showAlert(2, 'rlo.error.load.form', -1);
}
);

}
async CH_EDIT_click(event){
let inputMap = new Map();
const selectedData0 = this.readonlyGrid.getSelectedData();
if(selectedData0){
this.chargeDtlsEdit.emit({
'ChargeSeq': selectedData0['hidChargeSeq'],
});
}
}
async CH_DEL_click(event){
let inputMap = new Map();
inputMap.clear();
inputMap.set('PathParam.ChargeDtlSeq', event.hidChargeSeq);
this.services.http.fetchApi('/ChargeDetails/{ChargeDtlSeq}', 'DELETE', inputMap).subscribe(
async (httpResponse: HttpResponse<any>) => {
var res = httpResponse.body;
this.services.alert.showAlert(1, 'rlo.success.delete.charge', 5000);
this.readonlyGrid.refreshGrid();},
async (httpError)=>{
var err = httpError['error']
if(err!=null && err['ErrorElementPath'] != undefined && err['ErrorDescription']!=undefined){
}
this.services.alert.showAlert(2, 'rlo.error.wrong.form', -1);
}
);
}

}
