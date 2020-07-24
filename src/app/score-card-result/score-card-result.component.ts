import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ServiceStock } from '../service-stock.service';
import { ComboBoxComponent } from '../combo-box/combo-box.component';
import { HttpResponse } from '@angular/common/http';
import { IScoreCard, IScoreColor } from './ScoreCardInterface';
@Component({
  selector: 'app-score-card-result',
  templateUrl: './score-card-result.component.html',
  // styleUrls: ['./score-card-result.component.css']
})

export class ScoreCardResultComponent implements OnInit {

  @ViewChild('SCR_Filter', { static: false }) SCR_Filter: ComboBoxComponent;
  @Input() ApplicationId: string = undefined;

  MstScoreResultMap: Map<string, IScoreCard[]> = new Map();
  FilterOptions = [];
  showExpanded: boolean = false;
  parentFormCode: string = undefined;
  activeScoreCardResultList: IScoreCard[] = undefined;
  mainBorrower: string = undefined;
  mstBarColorIndex: IScoreColor[] = [
    {
      colorId: 'FA',
      colorCode: '#00B500',
      description: 'Favourable'
    },
    {
      colorId: 'NU',
      colorCode: '#F5A623',
      description: 'Neutral'
    },
    {
      colorId: 'NF',
      colorCode: '#D0021B',
      description: 'Non Favourable'
    }
  ];

  constructor(public services: ServiceStock) { }

  ngOnInit() {
    this.setFilterbyOptions();
    //this.loadScoreResult();
    this.retriggerScoreResult();

  }

  setFilterbyOptions() {
    let tempCustomerList = this.services.rloCommonData.getCustomerList();

    console.log("shweta :: in score section", tempCustomerList);
    this.FilterOptions = [];
    //this.FilterOptions.push({ id: 'A_' + this.ApplicationId, text: 'Application' });
    tempCustomerList.forEach(element => {
      if (element.CustomerType == 'B') {
        this.FilterOptions.push({ id: 'A_' + element.BorrowerSeq, text: 'Application' });
        this.mainBorrower = element.BorrowerSeq;
      }
      this.FilterOptions.push({ id: 'C_' + element.BorrowerSeq, text: element.CustomerType + '-' + element.FullName });
    });

    console.log("shweta :: score options list", this.FilterOptions);
  }

  SCR_Filter_Blur() {
    console.log("shweta :: selected option", this.SCR_Filter.getFieldValue());
    this.activeScoreCardResultList = this.MstScoreResultMap.get(this.SCR_Filter.getFieldValue());
  }

  headerChanges(data) {
    console.log(data);
    if (data.scrollExceded) {
      this.showExpanded = data.scrollExceded;
    }
    else {
      this.showExpanded = false;
    }
  }

  loadScoreResult() {
    let inputMap = new Map();
    if (this.ApplicationId != undefined) {
      inputMap.clear();
      if (this.ApplicationId) {
        inputMap.set('QueryParam.ApplicationId', this.ApplicationId);
        //inputMap.set('QueryParam.criteriaDetails', criteriaJson);
        this.services.http.fetchApi('/ScoreCardDtls', 'GET', inputMap, "/rlo-de").subscribe(
          async (httpResponse: HttpResponse<any>) => {
            let res = httpResponse.body;
            let tempScoreCardResultList = res['ScoreCardDetails'];
            this.parseScoreCardResultJson(tempScoreCardResultList);
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

  parseScoreCardResultJson(tempScoreCardResultList) {
    let newScoreCardResultList = [];
    console.log("shweta :: policy Resp:", tempScoreCardResultList);
    tempScoreCardResultList.forEach(eachScore => {
      let newMapKey = undefined;
      if (eachScore.BorrowerSeq) {
        newMapKey = 'C_' + eachScore.BorrowerSeq;
      }
      // else{
      //   newMapKey='A_' + eachScore.ApplicationId;
      // }
      if (this.MstScoreResultMap.has(newMapKey)) {
        newScoreCardResultList = this.MstScoreResultMap.get(newMapKey);
      } else {
        newScoreCardResultList = [];
      }
      let scoreCard: IScoreCard = eachScore;
      // scoreCard.MaxSectionScore = 200;
      scoreCard.MinGreenScore = scoreCard.MaxSectionScore / 2;
      scoreCard.MinOrangeScore = scoreCard.MaxSectionScore / 4;
      scoreCard.MinRedScore = scoreCard.MaxSectionScore / 6;
      let colorObj: IScoreColor = {};

      if (scoreCard.Score >= scoreCard.MinGreenScore) {
        colorObj = this.mstBarColorIndex.find(obj => 'FA' == obj.colorId);

      } else if (scoreCard.Score >= scoreCard.MinOrangeScore) {
        colorObj = this.mstBarColorIndex.find(obj => 'NU' == obj.colorId);

      }
      else {
        colorObj = this.mstBarColorIndex.find(obj => 'NF' == obj.colorId);

      }
      scoreCard.colorCode = colorObj.colorCode;
      newScoreCardResultList.push(scoreCard);
      this.MstScoreResultMap.set(newMapKey, newScoreCardResultList);
      if (this.mainBorrower == eachScore.BorrowerSeq) {
        newMapKey = 'A_' + eachScore.BorrowerSeq;
        this.MstScoreResultMap.set(newMapKey, newScoreCardResultList);
      }
    });
    this.activeScoreCardResultList = this.MstScoreResultMap.get(this.SCR_Filter.getFieldValue());
    console.log("shweta :: score result master map", this.MstScoreResultMap);
  }
  retriggerScoreResult() {
    this.MstScoreResultMap.clear();
    let inputMap = this.generateRetriggerRequestJson();

    this.services.http.fetchApi('/ScoreCard', 'POST', inputMap).subscribe(
      async (httpResponse: HttpResponse<any>) => {
        let res = httpResponse.body;
        this.loadScoreResult();
      },
      async (httpError) => {
        var err = httpError['error']
        if (err != null && err['ErrorElementPath'] != undefined && err['ErrorDescription'] != undefined) {
        }
        this.services.alert.showAlert(2, 'rlo.error.load.form', -1);
      }
    );
  }
  generateRetriggerRequestJson() {
    let inputMap = new Map();
    inputMap.set('Body.interfaceId', 'INT008');
    inputMap.set('Body.prposalid', this.ApplicationId);
    inputMap.set('Body.inputdata.SCHEME_CD', '104');
    return inputMap;
  }

}
