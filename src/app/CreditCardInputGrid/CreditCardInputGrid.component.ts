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
import { number } from '@amcharts/amcharts4/core';
import { IGlobalApllicationDtls } from '../rlo-services/rloCommonData.service';

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
  @Input() CustomerType: string = this.services.rloCommonData.globalApplicationDtls.CustomerType;
  
  @Input() MainComponent: CreditCardDetailsComponent;
  //@Input() MainComponent.AvailableLimit.getFieldValue() :any;
  firstLoadFlag:boolean=false;
  showAdd: boolean = false;
  CustomerDtlsMap: Map<string, CustomerDtlsIntrface> = new Map();
  isExpanded: boolean = false;
  showGrid = false;
  popupFlag:boolean=false;
  AppCardLimit :number = 0
  
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
    if (memberList.length > 0) {
      this.firstLoadFlag=true;
      this.showGrid = true;
      this.CustomerDtlsMap.clear();
      this.onReset();
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
          // customerObj.ProposedCashLimit = element.ProposedCashLimit;
          customerObj.ProposedCardLimit = element.ApprovedCardLimit;
          customerObj.ProposedCashLimit = element.ApprovedCashLimit;
          this.CustomerDtlsMap.set(customerObj.BorrowerSeq, customerObj);

          rowData['SrNo'] = index + 1;
          rowData['MemberName'] = element.FullName;
          rowData['CardNumber'] = element.CardNumber;
          rowData['CardStatus'] = element.CardStatus;
          rowData['LatestLimitDate'] = element.CardLimitDate;
          rowData['ExistingCardLimit'] = element.ExistingCardLimit;
          rowData['ExistingCashLimit'] = element.ExistingCashLimit;
          rowData['RequestedCardLimit'] = element.RequestedCreditLimit;
          rowData['ProposedCardLimit'] = element.ApprovedCardLimit;
          rowData['ProposedCashLimit'] = element.ApprovedCashLimit;
          let rowCounter = this.addRow(rowData);
      });
      let paramsList = this.isExpanded ? ['ExistingCardLimit', 'ExistingCashLimit', 'ProposedCardLimit',
        'ProposedCashLimit'] : ['RequestedCardLimit', 'ProposedCardLimit', 'ProposedCashLimit']
      this.updateTotal(paramsList);
      this.firstLoadFlag=false;
    }
  }

  ProposedCardLimit_blur(element, $event, rowNo) {
    
    this.ProposedCardLimit.toArray()[element.rowNo].clearError();
     if(this.ProposedCardLimit.toArray()[element.rowNo].isAmountEmpty()){
      if(!this.firstLoadFlag){
      this.ProposedCardLimit.toArray()[element.rowNo].setError('MANDATORY');
      return 1;
    }
    // else{
    //     this.firstLoadFlag=false;
    // }
    }else if(this.services.rloCommonData.globalApplicationDtls.CustomerType=='I'){
      if(parseFloat(this.MainComponent.ApprovedLimit.getFieldValue())<parseFloat(element.value)){
        this.ProposedCardLimit.toArray()[element.rowNo].setError('rlo.error.credit-card-grid.greater-value');
        return 1;
      }   
    }
    // let tempExistingCashLimit:number = parseFloat(this.services.rloCommonData.globalApplicationDtls.MaxCashLimit);
    // let tempMinCashLimit:number = parseFloat(this.services.rloCommonData.globalApplicationDtls.MinCashLimit);
    // let tempExistingCardLimit: number = parseFloat(this.services.rloCommonData.globalApplicationDtls.MaxCreditLimit);
    
    //let tempProposedCardLimit: any = this.ProposedCardLimit.toArray()[element.rowNo].getFieldValue();

   
    // let tempProposedCashLimit: number = ((tempProposedCardLimit * tempExistingCashLimit) / tempExistingCardLimit);

    // if (tempProposedCashLimit > tempMinCashLimit) {
    //   tempProposedCashLimit = tempMinCashLimit;
    // }

    let tempProposedCardLimit: any = this.ProposedCardLimit.toArray()[element.rowNo].getFieldValue();
    let tempProposedCashLimit: number = parseFloat(this.MainComponent.setApproveCashLimit(tempProposedCardLimit));
    this.ProposedCashLimit.toArray()[element.rowNo].setComponentSpecificValue(tempProposedCashLimit.toFixed(2));
    this.updateSelectedObj(element,tempProposedCashLimit.toFixed(2), parseFloat(tempProposedCardLimit).toFixed(2));
    this.updateTotal(['ProposedCardLimit', 'ProposedCashLimit']);
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
    
    if((undefined==this.MainComponent.SubCamType || ''==this.MainComponent.SubCamType) && 'MEMC' == this.services.rloCommonData.globalApplicationDtls.CamType && !this.popupFlag ){
      if ((parseFloat(this.MainComponent.AvailableLimit.getFieldValue()) < parseFloat(this.TotalProposedCardLimit.getFieldValue()))){
        this.doRealignmentOrLimitEnhancementHandling();
      }
    }
  }

  doRealignmentOrLimitEnhancementHandling(){
    this.popupFlag=true;
              this.services.rloui.addOnCardDetails().then((response: any) => {
                console.log(response);
                if (response == '0') {
                    console.log("realignment , show grid and call member serach api", response);
                      this.MemberCardCall();
                      this.MainComponent.SubCamType='RE';
                      
                }
                else if (response == '1') {
                    console.log(" Add member LE seclected", response);
                   // this.MainComponent.ApprovedLimit.setReadOnly(false);
                   // this.MainComponent.RequestedCardLimit.setHidden(false);
                    this.MainComponent.SubCamType='LE';
                    this.MainComponent.doUpdateApplicationDtls();
                    this.MainComponent.adjustFieldsBasedOnCamType();
                }else{
                  console.log("response",response);
                  this.popupFlag=false;
                }
            });    
  }
   MemberCardCall() {
    let inputMap = new Map();
    inputMap.clear();
    let applicationId: any = this.MainComponent.ApplicationId;
//this.CustomerDtlsMap.clear();
    inputMap.set('Body.interfaceId', "MEMBER_SEARCH");
    inputMap.set('Body.prposalid', applicationId);
    let BorrowerDtls:any=this.services.rloCommonData.getCustomerList().filter(function (element) { return element.CustomerType == 'B' });
    inputMap.set('Body.inputdata.CifID', BorrowerDtls[0].CIF);
    var str = String(this.MainComponent.MaskedCardNumber.value);
    console.log("new mask", str);
    var newMaskedNumber = str.slice(12); 
    inputMap.set('Body.inputdata.MaskCardNumber', newMaskedNumber);
    
    // inputMap.set('QueryParam.criteriaDetails', criteriaJson)
    this.services.http.fetchApi('/memberSearchCall', 'POST', inputMap, '/rlo-de').subscribe(
        async (httpResponse: HttpResponse<any>) => {
            console.log("memmberCard", Response);
            this.services.alert.showAlert(1, 'rlo.success.memberSearchCall', 5000);
            if(this.services.rloCommonData.globalApplicationDtls.CamType=='MEMC'){
              this.MainComponent.doUpdateApplicationDtls();
            }
           this.fetchAllApplicantsAPICall();
           
        }, async (httpError) => {
          var err = httpError['error']
          if (err != null && err['ErrorElementPath'] != undefined && err['ErrorDescription'] != undefined) {
          }
          this.services.alert.showAlert(2, 'rlo.error.memberSearchCall', -1);
      });
}

fetchAllApplicantsAPICall(){
//  this.CustomerDtlsMap.clear();
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
        let memberList = res['BorrowerDetails'].filter(function (element) { return element.CustomerType !== 'B' && element.CustomerType !== 'R'});
        this.loadRecords(memberList);
      },
      async (httpError) => {
        var err = httpError['error']
        if (err != null && err['ErrorElementPath'] != undefined && err['ErrorDescription'] != undefined) {
        }
        this.services.alert.showAlert(2, 'rlo.error.load.form', -1);
        this.popupFlag=false;
      }
    );
}
}
  updateSelectedObj( EditedElement,affectedElementValue, affetctedCardValue) {
    let tempSrNo = this.SrNo.toArray()[EditedElement.rowNo].getFieldValue();
    this.CustomerDtlsMap.forEach(element => {
      if (element.SrNo == tempSrNo) {
        // element.RequestedCreditLimit = EditedElement.value;
        element.ProposedCashLimit = affectedElementValue;
        element.ProposedCardLimit = affetctedCardValue;
        
      }
    });
  }

  validateAmountColumn(){
    let isValid=true;
    
    this.ProposedCardLimit.forEach(element => {
      element.clearError();
      if(element.isAmountEmpty()){
        element.setError('MANDATORY');
        isValid=false;
      }else if(this.services.rloCommonData.globalApplicationDtls.CustomerType=='I'){
        if(parseFloat(this.MainComponent.ApprovedLimit.getFieldValue())<parseFloat(element.getFieldValue())){
          element.setError('rlo.error.credit-card-grid.greater-value');
          isValid=false;
        }   
      }
    });
    return isValid;
  }
  fieldDependencies = {}

}
