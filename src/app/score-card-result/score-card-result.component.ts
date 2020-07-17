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

  MstScoreResultMap:Map<string,IScoreCard[]>=new Map();
  FilterOptions = [];
  showExpanded: boolean = false;
  parentFormCode: string = undefined;
  scoreCardResultList: IScoreCard[] = undefined;
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
  // scoreCards = [
  //   {
  //     type: "Final DBR",
  //     score: 90,
  //   },
  //   {
  //     type: "Fire Policy",
  //     score: 36,
  //   },
  //   {
  //     type: "Application Score",
  //     score: 75,
  //   }
  // ];

  constructor(public services: ServiceStock) { }

  ngOnInit() {
    this.setFilterbyOptions();
    this.loadScoreResult();
    // questionParam.radioOptionFormatList.push({ id: eachElement["AnswerSeq"], text: eachElement["AnswerText"] });
  }

  setFilterbyOptions() {
    let tempCustomerList = this.services.rloCommonData.getCustomerList();
    console.log("shweta :: in score section", tempCustomerList);
    this.FilterOptions = [];
    this.FilterOptions.push({ id: 'A_' + this.ApplicationId, text: 'Application' });
    tempCustomerList.forEach(element => {
      this.FilterOptions.push({ id: 'C_' + element.BorrowerSeq, text: element.CustomerType + '-' + element.FullName });
    });

    console.log("shweta :: score options list", this.FilterOptions);
  }

  SCR_Filter_Blur() {
    console.log("shweta :: selected option", this.SCR_Filter.getFieldValue());
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
        this.services.http.fetchApi('/ScoreCardDetails', 'GET', inputMap, "/rlo-de").subscribe(
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
  // parseScoreCardResultJson(tempScoreCardResultList) {
  //   let newScoreCardResultList = [];
  //   console.log("shweta :: policy Resp:", tempScoreCardResultList);
  //   tempScoreCardResultList.forEach(eachScore => {
  //     if(eachScore.BorrowerSeq){
  //       let newMapKey='C_' + eachScore.BorrowerSeq;
  //       if(this.MstScoreResultMap.has(newMapKey)){
  //         newScoreCardResultList=this.MstScoreResultMap.get(newMapKey);
  //       }
  //     }else{

  //     }
  //     let scoreCard: IScoreCard = eachScore;
  //     scoreCard.MaxScore = 100;
  //     scoreCard.MinGreenScore = 80;
  //     scoreCard.MinOrangeScore = 60;
  //     scoreCard.MinRedScore = 30;
  //     let colorObj: IScoreColor = {};

  //     if (scoreCard.Score >= scoreCard.MinGreenScore) {
  //       colorObj = this.mstBarColorIndex.find(obj => 'FA' == obj.colorId);

  //     } else if (scoreCard.Score >= scoreCard.MinOrangeScore) {
  //       colorObj = this.mstBarColorIndex.find(obj => 'NU' == obj.colorId);

  //     }
  //     else {
  //       colorObj = this.mstBarColorIndex.find(obj => 'NF' == obj.colorId);

  //     }
  //     scoreCard.colorCode = colorObj.colorCode;
  //     newScoreCardResultList.push(scoreCard);

  //   });
  // }
  parseScoreCardResultJson(tempScoreCardResultList) {
    this.scoreCardResultList = [];
    console.log("shweta :: policy Resp:", tempScoreCardResultList);
    tempScoreCardResultList.forEach(eachScore => {

      let scoreCard: IScoreCard = eachScore;
      scoreCard.MaxScore = 100;
      scoreCard.MinGreenScore = 80;
      scoreCard.MinOrangeScore = 60;
      scoreCard.MinRedScore = 30;
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
      this.scoreCardResultList.push(scoreCard);

    });
  }
}
