import { Component, OnInit, Input, ViewChildren, Output, EventEmitter, QueryList, ChangeDetectorRef, ViewChild } from '@angular/core';
import { DisbursInputGridModel } from './DisbursInputGrid.model';
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
import { string } from '@amcharts/amcharts4/core';
import { any } from '@amcharts/amcharts4/.internal/core/utils/Array';
const customCss: string = '';
@Component({
  selector: 'app-DisbursInputGrid',
  templateUrl: './DisbursInputGrid.component.html'
})
export class DisbursInputGridComponent extends GridComponent implements OnInit {
  @ViewChildren('ProjectCompletion') ProjectCompletion: QueryList<TextBoxComponent>;
  @ViewChildren('DisbursementAmount') DisbursementAmount: QueryList<AmountComponent>;
  @ViewChildren('deleteRow') DeleteRow: QueryList<AmountComponent>;
  @ViewChildren('AddRow') AddRow: QueryList<AmountComponent>;
  s: string = undefined;
  showAdd: boolean = false;
  constructor(services: ServiceStock, cdRef: ChangeDetectorRef) {
    super(services, cdRef);
    this.value = new DisbursInputGridModel();
    this.componentCode = 'DisbursInputGrid';
    this.initRowCount = 1;
    this.uniqueColumns = [];
    this.primaryColumns = [];

  }
  ngOnInit() {
    if (this.gridType == 1) { this.initRows(); }
    var styleElement = document.createElement('style');
    styleElement.type = 'text/css';
    styleElement.innerHTML = customCss;
    styleElement.id = 'DisbursInputGrid_customCss';
    document.getElementsByTagName('head')[0].appendChild(styleElement);

  }
  ngOnDestroy() {
    for (var i = 0; i < this.unsubscribeRow$.length; i++) {
      this.unsubscribeRow$[i].next();
      this.unsubscribeRow$[i].complete();
    }
    var styleElement = document.getElementById('DisbursInputGrid_customCss');
    styleElement.parentNode.removeChild(styleElement);
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.gridLoad();
    });
  }
  async gridLoad() {
    //this.showHideAddRowIcon(0);
  }
  async onRowAdd(rowNo) {
    this.showHideAddRowIcon(0);
  }


  showHideAddRowIcon(rowlimit) {
    console.log("shweta testing row deleted", this.value.rowData.length, " dsdf ", this.value.rowData, "this is ", this);
    if (this.value.rowData.length <= rowlimit) {
      this.showAdd = true;
    } else {
      this.showAdd = false;
    }
  }
  async onRowDelete(rowNo) {
    this.showHideAddRowIcon(1);
  }

  getTotProjCompletionPercent() {
    console.log("shweta :: ProjectCompletion % ", this.ProjectCompletion);
    let totPercent: number = 0;
    this.ProjectCompletion.forEach((element: any) => {
      console.log("shweta :: inside for loop", element.getFieldValue());
      totPercent += parseFloat(element.getFieldValue());
    });
    return totPercent;
  }

  getTotAmtToBeDisbursed() {
    console.log("shweta :: DisbursementAmount", this.DisbursementAmount);
    let totAmount: number = 0;
    this.DisbursementAmount.forEach((element: any) => {
      console.log("shweta :: inside amt for loop", element.getFieldValue());
      totAmount += parseFloat(element.getFieldValue());
    });
    return totAmount;
  }
  getFieldInfo() {
    let addInfo = [];
    for (var i = 0; i < this.getRowsCount(); i++) {
      let row = {};
      row['DisbursementAmount_desc'] = this.DisbursementAmount.toArray()[i].getFieldInfo();
      addInfo.push(row);
    }
    this.additionalInfo = addInfo;
    return addInfo;
  }
  fieldDependencies = {}

}
