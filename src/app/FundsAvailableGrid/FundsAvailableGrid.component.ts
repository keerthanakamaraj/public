import { Component, OnInit, Input, ViewChildren, Output, EventEmitter, QueryList, ChangeDetectorRef, ViewChild } from '@angular/core';
import { FundsAvailableGridModel } from './FundsAvailableGrid.model';
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
import { CostOrFundsInterface } from '../EducationLoanDetails/Education-loan-interfaces';
const customCss: string = '';
@Component({
  selector: 'app-FundsAvailableGrid',
  templateUrl: './FundsAvailableGrid.component.html'
})
export class FundsAvailableGridComponent extends GridComponent implements OnInit {
  @ViewChildren('SrNo') SrNo: QueryList<ReadOnlyComponent>;
  @ViewChildren('FundsAvailable') FundsAvailable: QueryList<ReadOnlyComponent>;
  @ViewChildren('Amount') Amount: QueryList<AmountComponent>;
  @ViewChildren('LocalCurEq') LocalCurEq: QueryList<AmountComponent>;

  //FundsAvailableList: CostOrFundsInterface[]=[];
  FundsAvailableMap: Map<string, CostOrFundsInterface> = new Map();
  showAdd: boolean = false;
  // MstRecords= [
  //   {
  //   'SrNo': 1,
  //     'FundsAvailable': 'Own Source',
  //    // 'Amount':,
  // //'LocalCurEq':0.00
  //   },
  //   {
  //     'SrNo': 2,
  //     'FundsAvailable': 'Scholarship',
  //     //'Amount':0.00,
  // //'LocalCurEq':0.00
  //   },
  //   {
  //     'SrNo': 3,
  //     'FundsAvailable': 'Others',
  //     'Amount':200,
  // 'LocalCurEq':300
  //   },
  // ];

  constructor(services: ServiceStock, cdRef: ChangeDetectorRef) {
    super(services, cdRef);
    this.value = new FundsAvailableGridModel();
    this.componentCode = 'FundsAvailableGrid';
    this.initRowCount = 0;
    this.uniqueColumns = [];
    this.primaryColumns = [];
  }
  ngOnInit() {
    if (this.gridType == 1) { this.initRows(); }
    var styleElement = document.createElement('style');
    styleElement.type = 'text/css';
    styleElement.innerHTML = customCss;
    styleElement.id = 'FundsAvailableGrid_customCss';
    document.getElementsByTagName('head')[0].appendChild(styleElement);
  }
  ngOnDestroy() {
    for (var i = 0; i < this.unsubscribeRow$.length; i++) {
      this.unsubscribeRow$[i].next();
      this.unsubscribeRow$[i].complete();
      //this.unsubscribeHidField.next();
      //this.unsubscribeHidField.complete();
    }
    var styleElement = document.getElementById('FundsAvailableGrid_customCss');
    styleElement.parentNode.removeChild(styleElement);
  }
  ngAfterViewInit() {
    setTimeout(() => {
      //this.subsToHiddenFieldValues();
      this.gridLoad();
    });
  }
  async gridLoad() {
    this.fetchMstFundList();
    // this.loadRecords();
    this.showHideAddRowIcon(0);
  }

  async onRowAdd(rowNo) {
    this.LocalCurEq.toArray()[rowNo].setReadOnly(true);
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
  getFieldInfo() {
    let addInfo = [];
    for (var i = 0; i < this.getRowsCount(); i++) {
      let row = {};
      row['Amount_desc'] = this.Amount.toArray()[i].getFieldInfo();
      row['LocalCurEq_desc'] = this.LocalCurEq.toArray()[i].getFieldInfo();
      addInfo.push(row);
    }
    this.additionalInfo = addInfo;
    return addInfo;
  }

  loadRecords() {
    this.FundsAvailableMap.forEach(element => {
      let rowData = {};
      rowData['SrNo'] = element.SrNo;
      rowData['FundsAvailable'] = element.mstText;
      rowData['Amount'] = element.Amount;
      rowData['LocalCurEq'] = element.CurrencyEquivalentAmt;
      let rowCounter = this.addRow(rowData);
      console.log("shweta :: 1 row added", rowCounter, " :: ", rowData);
    });
    console.log("shweta :: complete record fetched", this.value.rowData);
  }
  fetchMstFundList() {
    let inputMap = new Map();
    this.FundsAvailableMap.clear();
    // const MstDescList :CostOrFundsInterface[]=[];
    inputMap.set('QueryParam.lookup', 1);
    inputMap.set('QueryParam.APPID', 'RLO');
    inputMap.set('QueryParam.KEY1', 'FUNDS_AVAILABLE');
    this.services.http.fetchApi('/MSTGENERALPARAM', 'GET', inputMap, '/masters').subscribe(
      async (httpResponse: HttpResponse<any>) => {
        let res = httpResponse.body;
        let tempList = res['Data'];
        console.log("res", res);
        if (tempList) {
          let counter = 1;
          tempList.forEach(element => {
            this.FundsAvailableMap.set(element.id, { SrNo: counter++, mstId: element.id, mstText: element.text });
          });
        }
      }
    );
  }

  Amount_blur(FieldId, $event, rowNo) {
    console.log(this.Amount.toArray()[FieldId.rowNo]);
    let tempCurrency = Number(FieldId.value) + 100;
    this.LocalCurEq.toArray()[FieldId.rowNo].setValue(tempCurrency);
  }

  fieldDependencies = {}

}
