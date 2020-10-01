import { Component, OnInit, Input, ViewChildren, Output, EventEmitter, QueryList, ChangeDetectorRef, ViewChild } from '@angular/core';
import { PostCPVInputGridModel } from './PostCPVInputGrid.model';
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
import { ReadOnlyComponent } from '../rlo-ui-readonlyfield/rlo-ui-readonlyfield.component';
const customCss: string = '';
@Component({
selector: 'app-PostCPVInputGrid',
templateUrl: './PostCPVInputGrid.component.html'
})
export class PostCPVInputGridComponent extends GridComponent implements OnInit {
@ViewChildren('SrNo')SrNo : QueryList<ReadOnlyComponent>;
@ViewChildren('CustomerName')CustomerName : QueryList<ReadOnlyComponent>;
@ViewChildren('VerificationType')VerificationType : QueryList<ReadOnlyComponent>;
@ViewChildren('Details')Details : QueryList<ReadOnlyComponent>;
@ViewChildren('AgencyName')AgencyName : QueryList<ReadOnlyComponent>;
@ViewChildren('InitiatorRemarks')InitiatorRemarks : QueryList<ReadOnlyComponent>;
@ViewChildren('VerificationResult')VerificationResult : QueryList<ReadOnlyComponent>;
@ViewChildren('VerificationRemarks')VerificationRemarks : QueryList<ReadOnlyComponent>;
@ViewChildren('CompletionResult')CompletionResult : QueryList<ComboBoxComponent>;
@ViewChildren('CompletionRemarks')CompletionRemarks : QueryList<TextBoxComponent>;
@ViewChildren('Report')Report : QueryList<TextBoxComponent>;
constructor(services: ServiceStock, cdRef: ChangeDetectorRef) {
super(services, cdRef);
this.value = new PostCPVInputGridModel();
this.componentCode = 'PostCPVInputGrid';
this.initRowCount = 4;
this.uniqueColumns = [];
this.primaryColumns = [];
}
ngOnInit(){
if(this.gridType==1){this.initRows();}
var styleElement = document.createElement('style');
styleElement.type = 'text/css';
styleElement.innerHTML = customCss;
styleElement.id = 'PostCPVInputGrid_customCss';
document.getElementsByTagName('head')[0].appendChild(styleElement);
}
ngOnDestroy(){
for(var i=0;i<this.unsubscribeRow$.length;i++){
this.unsubscribeRow$[i].next();
this.unsubscribeRow$[i].complete();
// this.unsubscribeHidField.next();
// this.unsubscribeHidField.complete();
}
var styleElement = document.getElementById('PostCPVInputGrid_customCss');
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
this.SrNo.toArray()[rowNo].setReadOnly(true);
this.CustomerName.toArray()[rowNo].setReadOnly(true);
this.VerificationType.toArray()[rowNo].setReadOnly(true);
this.Details.toArray()[rowNo].setReadOnly(true);
this.AgencyName.toArray()[rowNo].setReadOnly(true);
this.InitiatorRemarks.toArray()[rowNo].setReadOnly(true);
this.VerificationResult.toArray()[rowNo].setReadOnly(true);
this.VerificationRemarks.toArray()[rowNo].setReadOnly(true);
}
async onRowDelete(rowNo){
}
getFieldInfo(){
let addInfo = [];
for(var i = 0; i < this.getRowsCount(); i++){
let row = {};
row['CompletionResult_desc'] = this.CompletionResult.toArray()[i].getFieldInfo();
addInfo.push(row);
}
this.additionalInfo = addInfo;
return addInfo;
}
fieldDependencies = {}

}