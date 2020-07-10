import { Component, OnInit, ElementRef, Renderer2, ViewChildren, QueryList, AfterViewInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ServiceStock } from '../service-stock.service';
import { HttpResponse } from '@angular/common/http';
import { RLOUIRadioComponent } from '../rlo-ui-radio/rlo-ui-radio.component';
import { DropDown } from '../DropDownOptions';
import { IPolicy } from './PolicyCheckInterface';

@Component({
  selector: 'app-policy-check-result',
  templateUrl: './policy-check-result.component.html',
  styleUrls: ['./policy-check-result.component.css']
})

export class PolicyCheckResultComponent implements OnInit {
  //if (this.formCode == undefined) { this.formCode = 'PolicyCheckResultDtls'; }
  ErrorSet = new Set([]);
  //QuestionnairMap: Map<String, IPolicy> = new Map<String, IPolicy>();
  @ViewChildren('tbData') domRef: QueryList<ElementRef>;
  // PolicyResultMap = new Map<string, IPolicy>();
  @Input() ApplicationId: string = undefined;
  parentFormCode: string = undefined;
  PolicyResultList: IPolicy[] = undefined;
  constructor(private services: ServiceStock, private renderer2: Renderer2) { }
  tempPolicyResult = [];
  ngOnInit() {
    // this.loadQuestionnaireDtls();
    // this.tempPolicyResult = [{
    //   "RuleDescription": "Borrower Credit score meets minimum Critera",
    //   "RuleDecision": "deviation",
    //   "PolicyResultSeq": 2,
    //   "RuleSeq": 2,
    //   "ActualValue": "60",
    //   "ExpectedValue": "80",
    //   "Stage": "DDE",
    //   "RuleResult": "Fail",
    //   "ApplicationId": 2061
    // },
    // {
    //   "RuleDescription": "Rule Critera 3",
    //   "RuleDecision": "approved",
    //   "PolicyResultSeq": 3,
    //   "RuleSeq": 38,
    //   "ActualValue": "50",
    //   "ExpectedValue": "50",
    //   "Stage": "DDE",
    //   "RuleResult": "Pass",
    //   "ApplicationId": 2061
    // },
    // {
    //   "RuleDescription": "DBR does not meet Policy Criteria",
    //   "RuleDecision": "deviation",
    //   "PolicyResultSeq": 1,
    //   "RuleSeq": 1,
    //   "ActualValue": "50",
    //   "ExpectedValue": "40",
    //   "Stage": "DDE",
    //   "RuleResult": "Pass",
    //   "ApplicationId": 2061
    // }
    // ];
    this.loadPolicyResult();
  }
  loadPolicyResult() {
    let inputMap = new Map();
    if (this.ApplicationId != undefined) {
      inputMap.clear();
      let criteriaJson: any = { "Offset": 1, "Count": 10, FilterCriteria: [] };
      if (this.ApplicationId) {
        criteriaJson.FilterCriteria.push({
          "columnName": "ApplicationId",
          "columnType": "String",
          "conditions": {
            "searchType": "equals",
            "searchText": this.ApplicationId
          }
        });

        inputMap.set('QueryParam.criteriaDetails', criteriaJson);
        this.services.http.fetchApi('/PolicyResult', 'GET', inputMap, "/rlo-de").subscribe(
          async (httpResponse: HttpResponse<any>) => {
            let res = httpResponse.body;
            let tempPolicyResultList = res['PolicyResult'];
            this.parsePolicyResultJson(tempPolicyResultList);
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
  }
  parsePolicyResultJson(tempPolicyResultList) {
    this.PolicyResultList = [];
    console.log("shweta :: policy Resp:", tempPolicyResultList);
    tempPolicyResultList.forEach(eachPolicy => {
      //let policy:IPolicy={};
      if (this.parentFormCode == eachPolicy.Stage) {
        let policy: IPolicy = eachPolicy;
        // policy.RuleDescription=eachPolicy.RuleDescription;
        // policy.RuleDecision=eachPolicy.RuleDecision;
        // policy.PolicyResultSeq=eachPolicy.PolicyResultSeq;
        // policy.RuleSeq=eachPolicy.RuleSeq;
        // policy.ActualValue=eachPolicy.ActualValue;
        // policy.ExpectedValue=eachPolicy.ExpectedValue;
        // policy.Stage=eachPolicy.Stage;
        // policy.RuleResult=eachPolicy.RuleResult;
        // policy.ApplicationId=eachPolicy.ApplicationId;
        this.PolicyResultList.push(policy);
      }
    });

    console.log("shweta :: mstPolicy list", this.PolicyResultList);
  }
}
