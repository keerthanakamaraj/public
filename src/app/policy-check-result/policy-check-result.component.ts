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
  PolicyResultMap = new Map<string, IPolicy>();
  @Input() ApplicationId: string = undefined;

  constructor(private services: ServiceStock, private renderer2: Renderer2) { }
  tempPolicyResult = [];
  ngOnInit() {
    // this.loadQuestionnaireDtls();
    this.tempPolicyResult = [{
      "RuleDescription": "Borrower Credit score meets minimum Critera",
      "RuleDecision": "deviation",
      "PolicyResultSeq": 2,
      "RuleSeq": 2,
      "ActualValue": "60",
      "ExpectedValue": "80",
      "Stage": "DDE",
      "RuleResult": "Fail",
      "ApplicationId": 2061
    },
    {
      "RuleDescription": "Rule Critera 3",
      "RuleDecision": "approved",
      "PolicyResultSeq": 3,
      "RuleSeq": 38,
      "ActualValue": "50",
      "ExpectedValue": "50",
      "Stage": "DDE",
      "RuleResult": "Pass",
      "ApplicationId": 2061
    },
    {
      "RuleDescription": "DBR does not meet Policy Criteria",
      "RuleDecision": "deviation",
      "PolicyResultSeq": 1,
      "RuleSeq": 1,
      "ActualValue": "50",
      "ExpectedValue": "40",
      "Stage": "DDE",
      "RuleResult": "Pass",
      "ApplicationId": 2061
    }
    ];
    // this.loadPolicyResult();
  }
  loadPolicyResult() {
    // let inputMap = new Map();
    // inputMap.clear();
    // inputMap.set('QueryParam.Product', 'PROD1');
    // // inputMap.set('QueryParam.SubProduct', 'SUBPROD1');
    // inputMap.set('QueryParam.ApplicationId', this.ApplicationId);

    // this.services.http.fetchApi('/questionnaire', 'GET', inputMap, '/rlo-de').subscribe((httpResponse: HttpResponse<any>) => {
    //   let questionnairDtlsResp = httpResponse.body.QuestionnaireDtls;
    //   this.parseGetQuestionnairResp(questionnairDtlsResp);
    //   //call validation method and render
    //   if (this.isDecisionsValid()) {
    //     let array = [];
    //     array.push({ isValid: true, sectionData: this.QuestionnairMap });
    //     let obj = {
    //       "name": "GoNoGoDetails",
    //       "data": array,
    //       "sectionName": "GoNoGoDetails",
    //     }
    //     this.services.rloCommonData.globalComponentLvlDataHandler(obj);
    //   }
    // },
    //   (httpError) => {
    //     console.error(httpError);
    //     this.services.alert.showAlert(2, 'rlo.error.fetch.form', -1);
    //   });
  }
}
