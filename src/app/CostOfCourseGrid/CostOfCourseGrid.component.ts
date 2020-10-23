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
import { ReadOnlyComponent } from '../rlo-ui-readonlyfield/rlo-ui-readonlyfield.component';
import { CostOrFundsInterface } from '../EducationLoanDetails/Education-loan-interfaces';

const customCss: string = '';
@Component({
  selector: 'app-CostOfCourseGrid',
  templateUrl: './CostOfCourseGrid.component.html'
})
export class CostOfCourseGridComponent extends GridComponent implements OnInit {
  @ViewChildren('SrNo') SrNo: QueryList<ReadOnlyComponent>;
  @ViewChildren('CostOfTheCourse') CostOfTheCourse: QueryList<ReadOnlyComponent>;
  @ViewChildren('Amount') Amount: QueryList<AmountComponent>;
  @ViewChildren('LocalCurEq') LocalCurEq: QueryList<AmountComponent>;
  @ViewChild('TotalAmount', { static: false }) TotalAmount: AmountComponent;
  @ViewChild('TotalLocalCurEq', { static: false }) TotalLocalCurEq: AmountComponent;

  showAdd: boolean = false;
  CostOfCourseMap: Map<string, CostOrFundsInterface> = new Map();
  hidExchangeRate: number = undefined;
  doSubscribeFlag: boolean = false;

  constructor(services: ServiceStock, cdRef: ChangeDetectorRef) {
    super(services, cdRef);
    this.value = new CostOfCourseGridModel();
    this.componentCode = 'CostOfCourseGrid';
    this.initRowCount = 0;
    this.uniqueColumns = [];
    this.primaryColumns = [];
  }
  ngOnInit() {
    if (this.gridType == 1) { this.initRows(); }
    var styleElement = document.createElement('style');
    styleElement.type = 'text/css';
    styleElement.innerHTML = customCss;
    styleElement.id = 'CostOfCourseGrid_customCss';
    document.getElementsByTagName('head')[0].appendChild(styleElement);
  }
  ngOnDestroy() {
    for (var i = 0; i < this.unsubscribeRow$.length; i++) {
      this.unsubscribeRow$[i].next();
      this.unsubscribeRow$[i].complete();
      //this.unsubscribeHidField.next();
      //this.unsubscribeHidField.complete();
    }
    var styleElement = document.getElementById('CostOfCourseGrid_customCss');
    styleElement.parentNode.removeChild(styleElement);
  }
  ngAfterViewInit() {
    setTimeout(() => {
      //this.subsToHiddenFieldValues();
      this.gridLoad();
    });
  }

  async gridLoad() {
    this.fetchMstCostList();
    this.showHideAddRowIcon(0);
  }

  async onRowAdd(rowNo) {
    this.LocalCurEq.toArray()[rowNo].setReadOnly(true);
    this.TotalAmount.setReadOnly(true);
    this.TotalLocalCurEq.setReadOnly(true);
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
    this.CostOfCourseMap.forEach(element => {
      let rowData = {};
      rowData['SrNo'] = element.SrNo;
      rowData['CostOfTheCourse'] = element.mstText;
      rowData['Amount'] = element.Amount;
      rowData['LocalCurEq'] = element.CurrencyEquivalentAmt;
      let rowCounter = this.addRow(rowData);
      //  console.log("shweta :: 1 row added", rowCounter, " :: ", rowData);
    });
    // console.log("shweta :: complete record fetched", this.value.rowData);
   // this.updateTotal();
  }

  async fetchMstCostList() {
    let inputMap = new Map();
    this.CostOfCourseMap.clear();
    // const MstDescList :CostOrFundsInterface[]=[];
    inputMap.set('QueryParam.lookup', 1);
    inputMap.set('QueryParam.APPID', 'RLO');
    inputMap.set('QueryParam.KEY1', 'COST_OF_COURSE');
    this.services.http.fetchApi('/MSTGENERALPARAM', 'GET', inputMap, '/masters').subscribe(
      async (httpResponse: HttpResponse<any>) => {
        let res = httpResponse.body;
        let tempList = res['Data'];
        if (tempList) {
          let counter = 1;
          tempList.forEach(element => {
            this.CostOfCourseMap.set(element.id, { SrNo: counter++, mstId: element.id, mstText: element.text });
          });
          if (this.doSubscribeFlag) {
            this.doSubscribeFlag = false;
            this.services.rloCommonData.modalDataSubject.next({
              action: 'parseInputGridRecords'
            });
          }
        }
      }
    );
  }

  Amount_blur(element, $event, rowNo) {
    console.log(this.Amount.toArray()[element.rowNo]);
    let newEquivalentAmt = this.ConvertInLocalCurrency(element.value);
    this.LocalCurEq.toArray()[element.rowNo].setValue(newEquivalentAmt);
    this.updateSelectedObj(element, newEquivalentAmt);
    this.updateTotal();
  }

  ConvertInLocalCurrency(newAmount) {
    if (this.hidExchangeRate != undefined && newAmount != undefined) {
      return this.hidExchangeRate * newAmount;
    }
    return 0;
  }
  updateTotal() {
    let totAmount: number = 0;
    this.Amount.forEach((element: any) => {
      if(element.getFieldValue()!=undefined){
      totAmount += parseFloat(element.getFieldValue());
      this.TotalAmount.setValue(totAmount.toFixed(2));
      }
    });
    totAmount = 0;
    this.LocalCurEq.forEach((element: any) => {
      if(element.getFieldValue()!=undefined){
      totAmount += parseFloat(element.getFieldValue());
      this.TotalLocalCurEq.setValue(totAmount.toFixed(2));
      }
    });
  }

  updateSelectedObj(FieldId, newEquivalentAmt) {
    let selectedDesc = this.CostOfTheCourse.toArray()[FieldId.rowNo].getFieldValue();
    this.CostOfCourseMap.forEach(element => {
      if (element.mstText == selectedDesc) {
        element.Amount = FieldId.value;
        element.CurrencyEquivalentAmt = newEquivalentAmt;
      }
    });
  }

  fieldDependencies = {}

}
