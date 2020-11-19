import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { IScoreColor } from '../score-card-result/ScoreCardInterface';
import { ServiceStock } from '../service-stock.service';
import { HttpResponse } from '@angular/common/http';
import { IInterfaceResultCustomer, IInterfaceResultData } from './InterfaceResultInterface';

@Component({
  selector: 'app-interface-results',
  templateUrl: './interface-results.component.html',
  styleUrls: ['./interface-results.component.css']
})
export class InterfaceResultsComponent implements OnInit {

  @Input() ApplicationId: string = undefined;
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
      if (this.MstInterfaceResultMap.has(eachResult.BorrowerSeq)) {
        CustomerDtls = this.MstInterfaceResultMap.get(eachResult.BorrowerSeq);
      }
      else {
        let staticCustData = CustomerList.find(eachRecord => eachRecord.BorrowerSeq == eachResult.BorrowerSeq);
        if (staticCustData != undefined) {
          CustomerDtls.CustomerId = eachResult.BorrowerSeq;
          CustomerDtls.CustomerType = staticCustData.CustomerType;
          CustomerDtls.FullName = staticCustData.FullName;
        }
      }
      let interfaceRsltData: IInterfaceResultData = {}
      interfaceRsltData.InterfaceId = eachResult.InterfaceId;
      interfaceRsltData.ResponseStatus = eachResult.ResponseStatus;
      interfaceRsltData.InterfaceResultId = eachResult.InterfaceResultId;
      interfaceRsltData.ResponseDate = eachResult.ResponseDate;
      interfaceRsltData.TriggerDate = eachResult.TriggerDate;
      interfaceRsltData.TriggerStage = eachResult.TriggerStage;
      if (CustomerDtls.InterfaceResultDataMap == undefined) {
        CustomerDtls.InterfaceResultDataMap = new Map<string, IInterfaceResultData>();
      }
      CustomerDtls.InterfaceResultDataMap.set(interfaceRsltData.InterfaceId, interfaceRsltData);

      this.MstInterfaceResultMap.set(eachResult.BorrowerSeq, CustomerDtls);
    });

    console.log("shweta :: Interface result", this.MstInterfaceResultMap);
  }

}
