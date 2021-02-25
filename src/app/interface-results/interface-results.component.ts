import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { IScoreColor } from '../score-card-result/ScoreCardInterface';
import { ServiceStock } from '../service-stock.service';
import { HttpResponse } from '@angular/common/http';
import { IInterfaceResultCustomer, IInterfaceResultData } from './InterfaceResultInterface';
import { IModalData } from '../popup-alert/popup-interface';

@Component({
  selector: 'app-interface-results',
  templateUrl: './interface-results.component.html',
  styleUrls: ['./interface-results.component.css']
})
export class InterfaceResultsComponent implements OnInit {

  @Input() ApplicationId: string = undefined;
  @Input() isLoanCategory: boolean = this.services.rloCommonData.globalApplicationDtls.isLoanCategory;
  @Input() readOnly: boolean = false;//used in UW modal section

  MstInterfaceResultMap: Map<string, IInterfaceResultCustomer> = new Map();

  uwCustomerList: any = [];

  constructor(public services: ServiceStock) { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    this.loadInterfaceResult();
    console.log("DEEP | uwCustomerList", this.uwCustomerList);
  }

  loadInterfaceResult() {
    let inputMap = new Map();
    if (this.ApplicationId != undefined) {
      this.MstInterfaceResultMap.clear();
      inputMap.clear();
      let criteriaJson: any = { "Offset": 1, "Count": 10, FilterCriteria: [] };

      criteriaJson.FilterCriteria.push({
        "columnName": "ProposalId",
        "columnType": "String",
        "conditions": {
          "searchType": "equals",
          "searchText": this.ApplicationId
        }
      });
      inputMap.set('QueryParam.criteriaDetails', criteriaJson);

      this.services.http.fetchApi('/InterfaceResult', 'GET', inputMap, '/rlo-de').subscribe(
        async (httpResponse: HttpResponse<any>) => {
          this.MstInterfaceResultMap.clear();
          let res = httpResponse.body;
          let tempInterfaceResultList = res['InterfaceResult'];
          this.parseInterfaceResultJson(tempInterfaceResultList);

          if (res != null) {
            if (res['InterfaceResult'].length) {
              let array = [];
              array.push({ isValid: true, sectionData: res['InterfaceResult'] });
              let obj = {
                "name": "InterfaceResults",
                "data": array,
                "sectionName": "InterfaceResults"
              }
              this.services.rloCommonData.globalComponentLvlDataHandler(obj);
            }
          }

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
  parseInterfaceResultJson(tempInterfaceResultList) {
    let CustomerList = this.uwCustomerList.length ? this.uwCustomerList : this.services.rloCommonData.getCustomerList();

    console.log("DEEP | CustomerList", CustomerList);
    tempInterfaceResultList.forEach(eachResult => {
      let CustomerDtls: IInterfaceResultCustomer = {};
      let isActiveApplicant = true;
      if (this.MstInterfaceResultMap.has(eachResult.BorrowerSeq)) {
        CustomerDtls = this.MstInterfaceResultMap.get(eachResult.BorrowerSeq);
      }
      else {
        let staticCustData = CustomerList.find(eachRecord => eachRecord.BorrowerSeq == eachResult.BorrowerSeq);
        if (staticCustData != undefined) {
          CustomerDtls.CustomerId = eachResult.BorrowerSeq;
          if (!this.isLoanCategory && this.services.rloCommonData.globalApplicationDtls.CustomerType == 'C') {
            CustomerDtls.CustomerType = ('B' == staticCustData.CustomerType) ? 'C' : 'M';
            //CustomerDtls.FullName = ('B'==staticCustData.CustomerType)?staticCustData.RegisteredName:staticCustData.FullName;
            if ('B' == staticCustData.CustomerType) {
              CustomerDtls.FullName = staticCustData.RegisteredName;
              if (staticCustData.FullName.length) {
                CustomerDtls.FullName = staticCustData.FullName;
              }
            } else {
              CustomerDtls.FullName = staticCustData.FullName;
            }
          } else if (!this.isLoanCategory && this.services.rloCommonData.globalApplicationDtls.CustomerType == 'I') {
            CustomerDtls.CustomerType = ('B' == staticCustData.CustomerType) ? 'P' : 'A';
            CustomerDtls.FullName = staticCustData.FullName;
          } else {
            CustomerDtls.CustomerType = staticCustData.CustomerType;
            CustomerDtls.FullName = staticCustData.FullName;
          }
        } else {
          isActiveApplicant = false;
        }
      }
      if (isActiveApplicant) {
        let interfaceRsltData: IInterfaceResultData = {};
        //for customer type 'I' InterfaceId='EXPERIAN_CONSUMER' and for 'C' InterfaceId 'Experian';
        //making changes in main json to avoid HTML changes
        if (this.services.rloCommonData.globalApplicationDtls.CustomerType == "C") {
          eachResult.InterfaceId = 'EXPERIAN_CONSUMER';
        }

        interfaceRsltData.InterfaceId = eachResult.InterfaceId;
        interfaceRsltData.ResponseStatus = eachResult.ResponseStatus == '' ? "disabled" : eachResult.ResponseStatus;
        interfaceRsltData.InterfaceResultId = eachResult.InterfaceResultId;
        interfaceRsltData.ResponseDate = eachResult.ResponseDate;
        interfaceRsltData.TriggerDate = eachResult.TriggerDate;
        interfaceRsltData.TriggerStage = eachResult.TriggerStage;
        interfaceRsltData.isTriggered = false;
        if (CustomerDtls.InterfaceResultDataMap == undefined) {
          CustomerDtls.InterfaceResultDataMap = new Map<string, IInterfaceResultData>();
        }
        CustomerDtls.InterfaceResultDataMap.set(interfaceRsltData.InterfaceId, interfaceRsltData);

        this.MstInterfaceResultMap.set(eachResult.BorrowerSeq, CustomerDtls);
      }
    });


  }

  getInterfaceData(interfaceType: "CIBIL" | "Experian") {
    if (!this.readOnly) {
      let appId = this.services.dataStore.getRouteParam(this.services.routing.currModal, 'appId');
      this.services.rloCommonData.getInterfaceModalData(appId, interfaceType);
    }
  }


  triggerInterface(interfaceSection, interfaceType: 'cibil' | 'experian') {
    console.log(interfaceSection);
    if (!interfaceSection.isTriggered) {
      interfaceSection.isTriggered = true;
      const inputMap = new Map();
      inputMap.set('Body.PrposalId', this.ApplicationId);
      inputMap.set('Body.InterfaceId', interfaceSection.InterfaceId);

      let url = '';
      if (interfaceType == 'cibil') {
        url = '/CibilApi';
      } else {
        url = '/experianConsumer';
      }

      this.services.http.fetchApi(url, 'POST', inputMap, '/rlo-de').subscribe(
        async (httpResponse: HttpResponse<any>) => {
          this.services.alert.showAlert(1, 'rlo.success.trigger.interface', 3000);
        },
        async (httpError) => {
          this.services.alert.showAlert(2, 'rlo.error.trigger.interface', 3000);
        }
      );
    }
  }
}
