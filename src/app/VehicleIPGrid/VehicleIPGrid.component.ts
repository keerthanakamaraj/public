import { Component, OnInit, Input, ViewChildren, Output, EventEmitter, QueryList, ChangeDetectorRef, ViewChild } from '@angular/core';
import { VehicleIPGridModel } from './VehicleIPGrid.model';
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
selector: 'app-VehicleIPGrid',
templateUrl: './VehicleIPGrid.component.html'
})
export class VehicleIPGridComponent extends GridComponent implements OnInit {
@ViewChildren('VehicleCostBreakup')VehicleCostBreakup : QueryList<TextBoxComponent>;
@ViewChildren('Vehicle_Currency')Vehicle_Currency : QueryList<ComboBoxComponent>;
@ViewChildren('Vehicle_Amount')Vehicle_Amount : QueryList<TextBoxComponent>;
@ViewChildren('LocalCurrencyEquivalent')LocalCurrencyEquivalent : QueryList<TextBoxComponent>;
constructor(services: ServiceStock, cdRef: ChangeDetectorRef) {
super(services, cdRef);
this.value = new VehicleIPGridModel();
this.componentCode = 'VehicleIPGrid';
this.initRowCount = 4;
this.uniqueColumns = [];
this.primaryColumns = [];
}
ngOnInit(){
if(this.gridType==1){this.initRows();}
var styleElement = document.createElement('style');
styleElement.type = 'text/css';
styleElement.innerHTML = customCss;
styleElement.id = 'VehicleIPGrid_customCss';
document.getElementsByTagName('head')[0].appendChild(styleElement);
}
ngOnDestroy(){
for(var i=0;i<this.unsubscribeRow$.length;i++){
this.unsubscribeRow$[i].next();
this.unsubscribeRow$[i].complete();
// this.unsubscribeHidField.next();
// this.unsubscribeHidField.complete();
}
var styleElement = document.getElementById('VehicleIPGrid_customCss');
styleElement.parentNode.removeChild(styleElement);
}
ngAfterViewInit(){
setTimeout(()=>{
// this.subsToHiddenFieldValues();
this.gridLoad();
});
}
async gridLoad(){
}
async onRowAdd(rowNo){
}
async onRowDelete(rowNo){
}
getFieldInfo(){
let addInfo = [];
for(var i = 0; i < this.getRowsCount(); i++){
let row = {};
row['Vehicle_Currency_desc'] = this.Vehicle_Currency.toArray()[i].getFieldInfo();
addInfo.push(row);
}
this.additionalInfo = addInfo;
return addInfo;
}
fieldDependencies = {}

}