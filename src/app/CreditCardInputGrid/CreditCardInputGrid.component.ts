import { Component, OnInit, Input, ViewChildren, Output, EventEmitter, QueryList, ChangeDetectorRef, ViewChild } from '@angular/core';
import { CreditCardInputGridModel } from './CreditCardInputGrid.model';
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
import { CustomerDtlsIntrface } from './CreditCardInputGridInterface';
import { RloUiCurrencyComponent } from '../rlo-ui-currency/rlo-ui-currency.component';

const customCss: string = '';
@Component({
  selector: 'app-CreditCardInputGrid',
  templateUrl: './CreditCardInputGrid.component.html'
})
export class CreditCardInputGridComponent extends GridComponent implements OnInit {
  @ViewChildren('SrNo') SrNo: QueryList<ReadOnlyComponent>;
  @ViewChildren('MemberName') MemberName: QueryList<ReadOnlyComponent>;
  @ViewChildren('CardNumber') CardNumber: QueryList<ReadOnlyComponent>;
  @ViewChildren('CardStatus') CardStatus: QueryList<ReadOnlyComponent>;
  @ViewChildren('LatestLimitDate') LatestLimitDate: QueryList<ReadOnlyComponent>;
  @ViewChildren('ExistingCardLimit') ExistingCardLimit: QueryList<RloUiCurrencyComponent>;
  @ViewChildren('ExistingCashLimit') ExistingCashLimit: QueryList<RloUiCurrencyComponent>;
  @ViewChildren('RequestedCardLimit') RequestedCardLimit: QueryList<RloUiCurrencyComponent>;
  @ViewChildren('ProposedCardLimit') ProposedCardLimit: QueryList<RloUiCurrencyComponent>;
  @ViewChildren('ProposedCashLimit') ProposedCashLimit: QueryList<RloUiCurrencyComponent>;
  @ViewChild('TotalExistingCardLimit', { static: false }) TotalExistingCardLimit: RloUiCurrencyComponent;
  @ViewChild('TotalExistingCashLimit', { static: false }) TotalExistingCashLimit: RloUiCurrencyComponent;
  @ViewChild('TotalRequestedCardLimit', { static: false }) TotalRequestedCardLimit: RloUiCurrencyComponent;
  @ViewChild('TotalProposedCardLimit', { static: false }) TotalProposedCardLimit: RloUiCurrencyComponent;
  @ViewChild('TotalProposedCashLimit', { static: false }) TotalProposedCashLimit: RloUiCurrencyComponent;
  showAdd: boolean = false;
  CustomerDtlsMap: Map<string, CustomerDtlsIntrface> = new Map();
  isExpanded: boolean = this.services.rloCommonData.globalApplicationDtls.isCamType;
  showGrid = false;

  constructor(services: ServiceStock, cdRef: ChangeDetectorRef) {
    super(services, cdRef);
    this.value = new CreditCardInputGridModel();
    this.componentCode = 'CreditCardInputGrid';
    this.initRowCount = 0;
    this.uniqueColumns = [];
    this.primaryColumns = [];
  }
  ngOnInit() {
    if (this.gridType == 1) { this.initRows(); }
    var styleElement = document.createElement('style');
    styleElement.type = 'text/css';
    styleElement.innerHTML = customCss;
    styleElement.id = 'CreditCardInputGrid_customCss';
    document.getElementsByTagName('head')[0].appendChild(styleElement);
  }
  ngOnDestroy() {
    for (var i = 0; i < this.unsubscribeRow$.length; i++) {
      this.unsubscribeRow$[i].next();
      this.unsubscribeRow$[i].complete();
      //this.unsubscribeHidField.next();
      //this.unsubscribeHidField.complete();
    }
    var styleElement = document.getElementById('CreditCardInputGrid_customCss');
    styleElement.parentNode.removeChild(styleElement);
  }
  ngAfterViewInit() {
    setTimeout(() => {
      //this.subsToHiddenFieldValues();
      this.gridLoad();
    });
  }

  async gridLoad() {
    this.loadRecords();
    this.showHideAddRowIcon(0);
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

  getFieldInfo() {
    let addInfo = [];
    for (var i = 0; i < this.getRowsCount(); i++) {
      let row = {};
      row['ProposedCardLimit_desc'] = this.ProposedCardLimit.toArray()[i].getFieldInfo();
      addInfo.push(row);
    }
    this.additionalInfo = addInfo;
    return addInfo;
  }

  loadRecords() {
    let CustomerDtlsList = this.services.rloCommonData.getCustomerList().filter(function (element) { return element.CustomerType !== 'B' });
    console.log("Shweta:: for credit card cust dtls ", CustomerDtlsList);
    if (CustomerDtlsList.length > 0) {
      this.showGrid = true;
      this.CustomerDtlsMap.clear();
      CustomerDtlsList.forEach((element, index) => {
        if (element.CustomerType != 'B') {
          let rowData = {};
          let customerObj: CustomerDtlsIntrface = {};
          customerObj.SrNo = index + 1;
          customerObj.FullName = element.FullName;
          customerObj.CardNumber = element.CardNumber;
          customerObj.BorrowerSeq = element.BorrowerSeq;
          customerObj.RequestedCreditLimit = element.RequestedCreditLimit;
          customerObj.RequestedCardLimit = element.RequestedCreditLimit;
          customerObj.ProposedCashLimit = element.ProposedCashLimit;
          this.CustomerDtlsMap.set(customerObj.BorrowerSeq, customerObj);

          rowData['SrNo'] = index + 1;
          rowData['MemberName'] = element.FullName;
          rowData['CardNumber'] = 123654;
          rowData['CardStatus'] = 'Pending';
          rowData['LatestLimitDate'] = '21/12/2020';
          rowData['ExistingCardLimit'] = 20000;
          rowData['ExistingCashLimit'] = 10000;
          rowData['RequestedCardLimit'] = element.RequestedCreditLimit;
          rowData['ProposedCardLimit'] = element.RequestedCreditLimit;
          rowData['ProposedCashLimit'] = element.RequestedCashLimit;
          let rowCounter = this.addRow(rowData);
          //  console.log("shweta :: 1 row added", rowCounter, " :: ", rowData);
        }
      });
      // console.log("shweta :: complete record fetched", this.value.rowData);
      let paramsList = this.isExpanded ? ['ExistingCardLimit', 'ExistingCashLimit', 'ProposedCardLimit',
        'ProposedCashLimit'] : ['RequestedCardLimit', 'ProposedCardLimit', 'ProposedCashLimit']
      this.updateTotal(paramsList);
    }
  }

  ProposedCardLimit_blur(element, $event, rowNo) {
    console.log("Shweta :: on blur", element);
    //let tempExistingCashLimit:number = parseFloat(this.services.rloCommonData.globalApplicationDtls.MaxCashLimit);
    //let tempMinCashLimit:number = parseFloat(this.services.rloCommonData.globalApplicationDtls.MinCashLimit);
    let tempExistingCashLimit = parseFloat(this.services.rloCommonData.globalApplicationDtls.LoanAmount);
    let tempMinCashLimit: number = parseFloat('5000');
    let tempExistingCardLimit: number = parseFloat(this.services.rloCommonData.globalApplicationDtls.MaxCreditLimit);
    let tempProposedCardLimit: number = parseFloat(this.ProposedCardLimit.toArray()[element.rowNo].getFieldValue());

    let tempProposedCashLimit: number = ((tempProposedCardLimit * tempExistingCashLimit) / tempExistingCardLimit);

    if (tempProposedCashLimit > tempMinCashLimit) {
      tempProposedCashLimit = tempMinCashLimit;
    }
    this.ProposedCashLimit.toArray()[element.rowNo].setComponentSpecificValue(tempProposedCashLimit.toFixed(2));
    this.updateSelectedObj(element, tempProposedCashLimit.toFixed(2));
    this.updateTotal(['ProposedCardLimit', 'ProposedCashLimit']);
  }
  updateTotal(listOfColumns) {
    listOfColumns.forEach(columnId => {
      let totAmount: number = 0;
      this[columnId].forEach((element: any) => {
        if (element.getFieldValue() != undefined) {
          totAmount += parseFloat(element.getFieldValue());
        }
      });
      this['Total' + columnId].setComponentSpecificValue(totAmount.toFixed(2));
    });
  }

  updateSelectedObj(EditedElement, affectedElementValue) {
    let tempSrNo = this.SrNo.toArray()[EditedElement.rowNo].getFieldValue();
    this.CustomerDtlsMap.forEach(element => {
      if (element.SrNo == tempSrNo) {
        element.RequestedCreditLimit = EditedElement.value;
        element.ProposedCashLimit = affectedElementValue;
      }
    });
  }

  fieldDependencies = {}

}
