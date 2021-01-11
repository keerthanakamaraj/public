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
import {CreditCardDetailsComponent} from '../CreditCardDetails/CreditCardDetails.component';

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
 
  @Input() MainComponent: CreditCardDetailsComponent;
  //@Input() MainComponent.AvailableLimit.getFieldValue() :any;
  showAdd: boolean = false;
  CustomerDtlsMap: Map<string, CustomerDtlsIntrface> = new Map();
  isExpanded: boolean = false;
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
  //  this.loadRecords();
  this.fetchAllApplicantsAPICall();
    this.showHideAddRowIcon(0);
  }

  async onRowAdd(rowNo) {
    this.showHideAddRowIcon(0);
  }

  showHideAddRowIcon(rowlimit) {
    console.log("shweta testing row deleted", this.value.rowData.length, " dsdf ", this.value.rowData, "this is ", this);
    // if (this.value.rowData.length <= rowlimit) {
    //   this.showAdd = true;
    // } else {
    //   this.showAdd = false;
    // }
  }

  async onRowDelete(rowNo) {
    this.showHideAddRowIcon(1);
  }

  getFieldInfo() {
    let addInfo = [];
    for (var i = 0; i < this.getRowsCount(); i++) {
      let row = {};
      row['ProposedCardLimit_desc'] = this.ProposedCardLimit.toArray()[i].getFieldInfo();
      row['RequestedCardLimit_desc'] = this.RequestedCardLimit.toArray()[i].getFieldInfo();
      addInfo.push(row);
    }
    this.additionalInfo = addInfo;
    return addInfo;
  }

  loadRecords(memberList) {
    
    console.log("Shweta:: for credit card cust dtls ", memberList);
    if (memberList.length > 0) {
      this.showGrid = true;
      this.CustomerDtlsMap.clear();
      memberList.forEach((element, index) => {
          let rowData = {};
          let customerObj: CustomerDtlsIntrface = {};
          if(element.CardNumber!=undefined && element.CardNumber!= ''){
            this.isExpanded=true;
          }
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
          rowData['CardNumber'] = element.CardNumber;
          rowData['CardStatus'] = element.CardStatus;
          rowData['LatestLimitDate'] = element.CardLimitDate;
          rowData['ExistingCardLimit'] = element.ExistingCardLimit;
          rowData['ExistingCashLimit'] = element.ExistingCashLimit;
          rowData['RequestedCardLimit'] = element.RequestedCreditLimit;
          rowData['ProposedCardLimit'] = element.RequestedCreditLimit;
          rowData['ProposedCashLimit'] = element.RequestedCashLimit;
          let rowCounter = this.addRow(rowData);
          //  console.log("shweta :: 1 row added", rowCounter, " :: ", rowData);
      });
      // console.log("shweta :: complete record fetched", this.value.rowData);
      let paramsList = this.isExpanded ? ['ExistingCardLimit', 'ExistingCashLimit', 'ProposedCardLimit',
        'ProposedCashLimit'] : ['RequestedCardLimit', 'ProposedCardLimit', 'ProposedCashLimit']
      this.updateTotal(paramsList);
    }
  }

  ProposedCardLimit_blur(element, $event, rowNo) {
    //console.log("Shweta :: on blur", this.MainComponent.AvailableLimit.getFieldValue());
    let tempExistingCashLimit:number = parseFloat(this.services.rloCommonData.globalApplicationDtls.MaxCashLimit);
    let tempMinCashLimit:number = parseFloat(this.services.rloCommonData.globalApplicationDtls.MinCashLimit);
    let tempExistingCardLimit: number = parseFloat(this.services.rloCommonData.globalApplicationDtls.MaxCreditLimit);
    let tempProposedCardLimit: number = parseFloat(this.ProposedCardLimit.toArray()[element.rowNo].getFieldValue());

    let tempProposedCashLimit: number = ((tempProposedCardLimit * tempExistingCashLimit) / tempExistingCardLimit);

    if (tempProposedCashLimit > tempMinCashLimit) {
      tempProposedCashLimit = tempMinCashLimit;
    }
    this.ProposedCashLimit.toArray()[element.rowNo].setComponentSpecificValue(tempProposedCashLimit.toFixed(2));
    this.updateSelectedObj(element, tempProposedCashLimit.toFixed(2));
    this.updateTotal(['ProposedCardLimit', 'ProposedCashLimit']);
    if((undefined==this.MainComponent.SubCamType || ''==this.MainComponent.SubCamType) && 'MEMC' == this.services.rloCommonData.globalApplicationDtls.CamType ){
      if ((parseFloat(this.MainComponent.AvailableLimit.getFieldValue()) < parseFloat(this.TotalProposedCardLimit.getFieldValue()))){
        this.doRealignmentOrLimitEnhancementHandling();
      }
    }
  }
  updateTotal(listOfColumns) {
    listOfColumns.forEach(columnId => {
      let totAmount: number = 0;
      this[columnId].forEach((element: any) => {
        if (undefined != element.getFieldValue() && ''!=element.getFieldValue()) {
          totAmount += parseFloat(element.getFieldValue());
        }
      });
      this['Total' + columnId].setComponentSpecificValue(totAmount.toFixed(2));
    });
  }

  doRealignmentOrLimitEnhancementHandling(){
    if (this.services.rloCommonData.globalApplicationDtls.CamType == 'MEMC') {
           // let customerList = this.services.rloCommonData.getCustomerList().filter(function (element) { return element.CustomerType !== 'B' && element.CardNumber!=undefined && element.CardNumber!='' });
            if(!this.isExpanded){
              this.services.rloui.addOnCardDetails().then((response: any) => {
                console.log(response);
                if (response == '0') {
                    console.log("realignment , show grid and call member serach api", response);
                      this.MemberCardCall();
                      this.MainComponent.SubCamType=='RE';
                }
                else if (response == '1') {
                    console.log(" Add member LE seclected", response);
                    this.MainComponent.ApprovedLimit.setReadOnly(false);
                    this.MainComponent.SubCamType=='LE';
                }
            });
            }             
  }
  }
   MemberCardCall() {
    let inputMap = new Map();
    inputMap.clear();
    let applicationId: any = this.MainComponent.ApplicationId;
this.CustomerDtlsMap.clear();
    inputMap.set('Body.interfaceId', "MEMBER_SEARCH");
    inputMap.set('Body.prposalid', applicationId);
    let BorrowerDtls:any=this.services.rloCommonData.getCustomerDetails(this.services.rloCommonData.globalApplicationDtls.PrimaryBorrowerSeq);
    inputMap.set('Body.inputdata.CifID', BorrowerDtls.CIF);

    // inputMap.set('QueryParam.criteriaDetails', criteriaJson)
    this.services.http.fetchApi('/memberSearchCall', 'POST', inputMap, '/rlo-de').subscribe(
        async (httpResponse: HttpResponse<any>) => {
            console.log("memmberCard", Response);
            this.services.alert.showAlert(1, 'rlo.success.memberSearchCall', 5000);
           this.fetchAllApplicantsAPICall();
           
        }, async (httpError) => {
          var err = httpError['error']
          if (err != null && err['ErrorElementPath'] != undefined && err['ErrorDescription'] != undefined) {
          }
          this.services.alert.showAlert(2, 'rlo.error.memberSearchCall', -1);
      });
}

fetchAllApplicantsAPICall(){
  this.CustomerDtlsMap.clear();
  let inputMap = new Map();
  if (this.MainComponent.ApplicationId != undefined) {
    inputMap.clear();
    let criteriaJson: any = { "Offset": 1, "Count": 10, FilterCriteria: [] };
    if (this.MainComponent.ApplicationId) {
      criteriaJson.FilterCriteria.push({
        "columnName": "ApplicationId",
        "columnType": "String",
        "conditions": {
          "searchType": "equals",
          "searchText": this.MainComponent.ApplicationId
        }
      });
    }
    inputMap.set('QueryParam.criteriaDetails', criteriaJson);
    this.services.http.fetchApi('/BorrowerDetails', 'GET', inputMap, "/initiation").subscribe(
      async (httpResponse: HttpResponse<any>) => {
        var res = httpResponse.body;
        let memberList = res['BorrowerDetails'].filter(function (element) { return element.CustomerType !== 'B' });
        this.loadRecords(memberList);
      },
      async (httpError) => {
        var err = httpError['error']
        if (err != null && err['ErrorElementPath'] != undefined && err['ErrorDescription'] != undefined) {
        }
        this.services.alert.showAlert(2, 'rlo.error.load.form', -1);
      }
    );
}
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
