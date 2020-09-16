import { Component, OnInit, Input, ViewChildren, Output, EventEmitter, QueryList, ChangeDetectorRef, ViewChild } from '@angular/core';
import { CostOfCourseGridModel } from './CostOfCourseGrid.model';
import { ComboBoxComponent } from '../combo-box/combo-box.component';
import { TextBoxComponent } from '../text-box/text-box.component';
import { TextAreaComponent } from '../text-area/text-area.component';
import { CheckBoxComponent } from '../check-box/check-box.component';
import { FileuploadComponent } from '../fileupload/fileupload.component';
import { DateComponent } from '../date/date.component';
import { AmountComponent } from '../amount/amount.component';
import { GridComponent } from '../grid/grid.component';
import { ServiceStock } from '../service-stock.service';
import { HiddenComponent } from '../hidden/hidden.component';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
const customCss: string = '';
@Component({
selector: 'app-CostOfCourseGrid',
templateUrl: './CostOfCourseGrid.component.html'
})
export class CostOfCourseGridComponent extends GridComponent implements OnInit {
@ViewChildren('SrNo')SrNo : QueryList<null>;
@ViewChildren('CostOfTheCourse')CostOfTheCourse : QueryList<TextBoxComponent>;
@ViewChildren('Amount')Amount : QueryList<AmountComponent>;
@ViewChildren('LocalCurEq')LocalCurEq : QueryList<AmountComponent>;
constructor(services: ServiceStock, cdRef: ChangeDetectorRef) {
super(services, cdRef);
this.value = new CostOfCourseGridModel();
this.componentCode = 'CostOfCourseGrid';
this.initRowCount = 4;
this.uniqueColumns = [];
this.primaryColumns = [];
}
ngOnInit(){
if(this.gridType==1){this.initRows();}
var styleElement = document.createElement('style');
styleElement.type = 'text/css';
styleElement.innerHTML = customCss;
styleElement.id = 'CostOfCourseGrid_customCss';
document.getElementsByTagName('head')[0].appendChild(styleElement);
}
ngOnDestroy(){
for(var i=0;i<this.unsubscribeRow$.length;i++){
this.unsubscribeRow$[i].next();
this.unsubscribeRow$[i].complete();
//this.unsubscribeHidField.next();
//this.unsubscribeHidField.complete();
}
var styleElement = document.getElementById('CostOfCourseGrid_customCss');
styleElement.parentNode.removeChild(styleElement);
}
ngAfterViewInit(){
setTimeout(()=>{
//this.subsToHiddenFieldValues();
this.gridLoad();
});
}
async gridLoad(){
}
async onRowAdd(rowNo){
//this.SrNo.toArray()[rowNo].setReadOnly(true);
}
async onRowDelete(rowNo){
}
getFieldInfo(){
let addInfo = [];
for(var i = 0; i < this.getRowsCount(); i++){
let row = {};
row['Amount_desc'] = this.Amount.toArray()[i].getFieldInfo();
row['LocalCurEq_desc'] = this.LocalCurEq.toArray()[i].getFieldInfo();
addInfo.push(row);
}
this.additionalInfo = addInfo;
return addInfo;
}
fieldDependencies = {}

}
