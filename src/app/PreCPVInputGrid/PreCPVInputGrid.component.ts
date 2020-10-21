import { Component, OnInit, Input, ViewChildren, Output, EventEmitter, QueryList, ChangeDetectorRef, ViewChild } from '@angular/core';
import { PreCPVInputGridModel } from './PreCPVInputGrid.model';
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
import { ButtonComponent } from '../button/button.component';
const customCss: string = '';
@Component({
  selector: 'app-PreCPVInputGrid',
  templateUrl: './PreCPVInputGrid.component.html'
})
export class PreCPVInputGridComponent extends GridComponent implements OnInit {
  @ViewChildren('CustomerName') CustomerName: QueryList<ComboBoxComponent>;
  @ViewChildren('VerificationType') VerificationType: QueryList<ComboBoxComponent>;
  @ViewChildren('Details') Details: QueryList<ComboBoxComponent>;
  @ViewChildren('SelectCity') SelectCity: QueryList<ComboBoxComponent>;
  @ViewChildren('SelectAgency') SelectAgency: QueryList<ComboBoxComponent>;
  @ViewChildren('RemarksForAgency') RemarksForAgency: QueryList<TextBoxComponent>;
  @ViewChildren('WaiveOff') WaiveOff: QueryList<CheckBoxComponent>;
  @ViewChildren('RetriggerStatus') RetriggerStatus: QueryList<TextBoxComponent>;
  @ViewChildren('AddVerificationType') AddVerificationType: QueryList<ButtonComponent>;
  @ViewChildren('Initiate') Initiate: QueryList<ButtonComponent>;

  constructor(services: ServiceStock, cdRef: ChangeDetectorRef) {
    super(services, cdRef);
    this.value = new PreCPVInputGridModel();
    this.componentCode = 'PreCPVInputGrid';
    this.initRowCount = 1;
    this.uniqueColumns = [];
    this.primaryColumns = [];
  }
  ngOnInit() {
    if (this.gridType == 1) { this.initRows(); }
    var styleElement = document.createElement('style');
    styleElement.type = 'text/css';
    styleElement.innerHTML = customCss;
    styleElement.id = 'PreCPVInputGrid_customCss';
    document.getElementsByTagName('head')[0].appendChild(styleElement);
  }
  ngOnDestroy() {
    for (var i = 0; i < this.unsubscribeRow$.length; i++) {
      this.unsubscribeRow$[i].next();
      this.unsubscribeRow$[i].complete();
      // this.unsubscribeHidField.next();
      // this.unsubscribeHidField.complete();
    }
    var styleElement = document.getElementById('PreCPVInputGrid_customCss');
    styleElement.parentNode.removeChild(styleElement);
  }
  ngAfterViewInit() {
    setTimeout(() => {
      //  this.subsToHiddenFieldValues();
      this.gridLoad();
    });
  }
  async gridLoad() {
  }
  async onRowAdd(rowNo) {
  }
  async onRowDelete(rowNo) {
  }
  getFieldInfo() {
    let addInfo = [];
    for (var i = 0; i < this.getRowsCount(); i++) {
      let row = {};
      row['CustomerName_desc'] = this.CustomerName.toArray()[i].getFieldInfo();
      row['VerificationType_desc'] = this.VerificationType.toArray()[i].getFieldInfo();
      row['Details_desc'] = this.Details.toArray()[i].getFieldInfo();
      row['SelectCity_desc'] = this.SelectCity.toArray()[i].getFieldInfo();
      row['SelectAgency_desc'] = this.SelectAgency.toArray()[i].getFieldInfo();
      addInfo.push(row);
    }
    this.additionalInfo = addInfo;
    return addInfo;
  }
  fieldDependencies = {

  }

  AddVerificationType_click(fieldID,$event){
    console.log("row clicked",fieldID,' : ',event);
  }

}
