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
import {CostOrFundsInterface,MstDescriptionInterface} from '../EducationLoanDetails/Education-loan-interfaces';

const customCss: string = '';
@Component({
  selector: 'app-CostOfCourseGrid',
  templateUrl: './CostOfCourseGrid.component.html'
})
export class CostOfCourseGridComponent extends GridComponent implements OnInit {
  @ViewChildren('SrNo') SrNo: QueryList<ReadOnlyComponent>;
  @ViewChildren('CostOfTheCourse') CostOfTheCourse: QueryList<ReadOnlyComponent>;
 // @ViewChildren('TrnCode') TrnCode:QueryList<HiddenComponent>
  //@ViewChildren('CostOfTheCourse')CostOfTheCourse : QueryList<TextBoxComponent>;
  @ViewChildren('Amount') Amount: QueryList<AmountComponent>;
  @ViewChildren('LocalCurEq') LocalCurEq: QueryList<AmountComponent>;
  @ViewChild('TotalAmount', { static: false }) TotalAmount: AmountComponent;
  @ViewChild('TotalLocalCurEq', { static: false }) TotalLocalCurEq: AmountComponent;
  //@ViewChildren('deleteRow') DeleteRow: QueryList<AmountComponent>;
  //@ViewChildren('AddRow') AddRow: QueryList<AmountComponent>;
  showAdd: boolean = false;
  LocalCurrency: string = undefined;
  CostOfCourseList: CostOrFundsInterface[]=[];
  CostOfCourseMap: Map <string,CostOrFundsInterface>=new Map();
  //mstList:MstDescriptionInterface[]=[];
  // MstRecords = [
  //   {
  //     'SrNo': 1,
  //     'CostOfTheCourse': 'Tution Fees',
  //     // 'Amount':,
  //     //'LocalCurEq':0.00
  //   },
  //   {
  //     'SrNo': 2,
  //     'CostOfTheCourse': 'Living Expenses/ Hostel and Food',
  //     //'Amount':0.00,
  //     //'LocalCurEq':0.00
  //   },
  //   {
  //     'SrNo': 3,
  //     'CostOfTheCourse': 'Travelling Expenses',
  //     'Amount': 200
  //     //'LocalCurEq':0.00
  //   },
  //   {
  //     'SrNo': 4,
  //     'CostOfTheCourse': 'Others',
  //     'Amount': 200
  //     //'LocalCurEq':0.00
  //   }
  // ];
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
   // this.loadRecords();
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
//    let mstList=this.fetchMstCostList();
    this.CostOfCourseMap.forEach(element => {
      let rowData={};
       rowData['SrNo'] = element.SrNo;
       rowData['CostOfTheCourse'] = element.mstText;
       rowData['Amount'] = element.Amount==undefined?0.00:element.Amount;
       rowData['LocalCurEq'] = element.Amount==undefined?0.00:element.CurrencyEquivalentAmt;
      // rowData['TrnCode']=element.mstId;
      let rowCounter = this.addRow(rowData);
      console.log("shweta :: 1 row added", rowCounter, " :: ", rowData);
    });
    console.log("shweta :: complete record fetched", this.value.rowData);
    this.updateTotalCost();
  }
  fetchMstCostList(){
  let inputMap = new Map();
  this.CostOfCourseMap.clear();
 // const MstDescList :CostOrFundsInterface[]=[];
    inputMap.set('QueryParam.lookup', 1);
    inputMap.set('QueryParam.APPID', 'RLO');
    inputMap.set('QueryParam.KEY1', 'COST_OF_COURSE');
    this.services.http.fetchApi('/MSTGENERALPARAM', 'GET', inputMap, '/masters').subscribe(
      async (httpResponse: HttpResponse<any>) => {
        let res = httpResponse.body;
        let tempList=res['Data'];
        console.log("res", res);
        if(tempList)
        {
          let counter=1;
          tempList.forEach(element => {
            this.CostOfCourseMap.set(element.id,{SrNo:counter,mstId:element.id,mstText:element.text});
            counter++;
          });
        }
      }
    );
}
  Amount_blur(FieldId, $event, rowNo) {
    console.log(this.Amount.toArray()[FieldId.rowNo]);
    let newEquivalentAmt = Number(FieldId.value) + 100;
    this.LocalCurEq.toArray()[FieldId.rowNo].setValue(newEquivalentAmt);
  //  let currentCode:string=this.TrnCode.toArray()[FieldId.rowNo].getFieldValue();
   // console.log("shweta :: currentCode",currentCode);
   this.updateSelectedObj(FieldId,newEquivalentAmt);
   this.updateTotalCost();

  }

  updateTotalCost(){
    let totAmount:number=0;
    this.Amount.forEach((element: any) => {
      console.log("shweta :: inside for loop", element.getFieldValue());
      totAmount += parseFloat(element.getFieldValue());
      this.TotalAmount.setValue(totAmount.toFixed(2));
    });
    totAmount=0;
    this.LocalCurEq.forEach((element: any) => {
      console.log("shweta :: inside for loop", element.getFieldValue());
      totAmount += parseFloat(element.getFieldValue());
      this.TotalLocalCurEq.setValue(totAmount.toFixed(2));
    });
  }
  // updateSelectedObj(FieldId,newEquivalentAmt){
  //   let currentSrNo=this.SrNo.toArray()[FieldId.rowNo].getFieldValue();
    
  //   let selectedObj=this.CostOfCourseMap.get(currentSrNo);
  //   selectedObj.Amount=FieldId.value;
  //   selectedObj.CurrencyEquivalentAmt=newEquivalentAmt;
  //   this.CostOfCourseMap.set(currentSrNo,selectedObj);
  // }
  updateSelectedObj(FieldId,newEquivalentAmt){
    let selectedDesc=this.CostOfTheCourse.toArray()[FieldId.rowNo].getFieldValue();
    this.CostOfCourseMap.forEach(element => {
      if(element.mstText==selectedDesc){
        element.Amount=FieldId.value;
        element.CurrencyEquivalentAmt=newEquivalentAmt;
      }
    });
   
  }
  fieldDependencies = {}

}
