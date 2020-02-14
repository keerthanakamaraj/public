import { Component, ViewChild, ChangeDetectorRef, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { PopupModalComponent } from '../popup-modal/popup-modal.component';
import { LangChangeEvent } from '@ngx-translate/core';
import { ServiceStock } from '../service-stock.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ReadonlyGridComponent } from '../readonly-grid/readonly-grid.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
selector: 'app-loanGrid',
templateUrl: './loanGrid.component.html',
animations: [
trigger('slideInOut', [
state('false', style({ opacity: '0', overflow: 'hidden', height: '0px' })),
state('true', style({ height: '*', 'padding-top': '1rem' })),
transition('true => false', animate('300ms ease-out')),
transition('false => true', animate('300ms ease-in'))
])
],
})
export class loanGridComponent implements AfterViewInit {
constructor(private services: ServiceStock, private cdRef: ChangeDetectorRef) {}
@ViewChild('readonlyGrid', {static: true}) readonlyGrid: ReadonlyGridComponent;
@Input('formCode') formCode: string;
@Input('displayTitle') displayTitle: boolean = true;
@Input('displayToolbar') displayToolbar: boolean = true;
componentCode: string = 'loanGrid';
openedFilterForm:string = '';
hidden:boolean = false;
gridConsts: any = {
paginationPageSize: 5,
gridCode: "loanGrid",
paginationReq:true
};
columnDefs:any[] = [{
field:"DueDate",
width:13,
sortable: true,
resizable: true,
cellStyle: {'text-align': 'center'},
filter:"agDateColumnFilter",
filterParams:{
suppressAndOrCondition : true,
applyButton: true,
clearButton: true,
caseSensitive:true,
filterOptions:["inRange"],
},
},
{
field:"PrincipalAmount",
width:16,
sortable: true,
resizable: true,
cellStyle: {'text-align': 'right'},
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
field:"InterestAmount",
width:17,
sortable: true,
resizable: true,
cellStyle: {'text-align': 'right'},
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
field:"FieldId_1",
width:18,
sortable: true,
resizable: true,
cellStyle: {'text-align': 'right'},
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
field:"TotalAmount",
width:16,
sortable: true,
resizable: true,
cellStyle: {'text-align': 'right'},
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
field:"PaidAmount",
width:20,
sortable: true,
resizable: true,
cellStyle: {'text-align': 'right'},
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
this.readonlyGrid.loadColums(JSON.parse(JSON.stringify(this.columnDefs)));
});
}
onGridSizeChanged(){
this.readonlyGrid.loadColums(JSON.parse(JSON.stringify(this.columnDefs)));
}
ngOnDestroy(){
this.unsubscribe$.next();
this.unsubscribe$.complete();
}
ngOnInit(): void {
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
/*Custom Script for Component*/
}
