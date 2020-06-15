import { Component, OnInit, ElementRef, Renderer2, ViewChildren, QueryList, AfterViewInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ServiceStock } from '../service-stock.service';
import { HttpResponse } from '@angular/common/http';
import { RLOUIRadioComponent } from '../rlo-ui-radio/rlo-ui-radio.component';
import { DropDown } from '../DropDownOptions';
import { IQuestion, IAnswerOption, IselectedAnswer,IFieldErrors } from './PersonalInterviewInterface';

@Component({
  selector: 'app-personal-Interview',
  templateUrl: './personal-Interview.component.html',
  styleUrls: ['./personal-Interview.component.css']
})

export class PersonalInterviewComponent implements OnInit {
  //if (this.formCode == undefined) { this.formCode = 'PersonalInterviewDtls'; }
  //apiResponse: HttpResponse<any>;
  fieldErrorList:IFieldErrors[]=[];
  //ApplicationDetails: IPersonalInterviewQuestionnaire = {};
  //mstParamList: any[] = [];
  QuestionnairMap: Map<String, IQuestion> = new Map<String, IQuestion>();
  // questionnaireCat: Map<Number, String> = new Map();
  //answerCollection: Array<String> = new Array();
  //prevDecisionsMap: Map<String, any> = new Map<String, any>();
  @ViewChildren('tbData') domRef: QueryList<ElementRef>;
  //@ViewChild('PI_PARAM_ANS', { static: false }) PI_PARAM_ANS: RLOUIRadioComponent;
  @ViewChildren(RLOUIRadioComponent) PI_PARAM_List: QueryList<ElementRef>;



  @Input() ApplicationId: string = undefined;

  @Output() updateOptions: EventEmitter<any> = new EventEmitter<any>();

  constructor(private services: ServiceStock, private renderer2: Renderer2) { }

  ngOnInit() {
    this.loadQuestionnaireDtls();
  }

  loadQuestionnaireDtls() {
    let inputMap = new Map();
    inputMap.clear();
    inputMap.set('QueryParam.QuestionnaireCategory', 'go_no_go');
    inputMap.set('QueryParam.Product', 'PROD1');
    // inputMap.set('QueryParam.SubProduct', 'SUBPROD1');
    //inputMap.set('QueryParam.ApplicationId', '666');
    inputMap.set('QueryParam.ApplicationId', this.ApplicationId);

    this.services.http.fetchApi('/questionnaire', 'GET', inputMap, '/rlo-de').subscribe((httpResponse: HttpResponse<any>) => {
     // this.mstParamList = httpResponse.body;
      let questionnairDtlsResp = httpResponse.body.QuestionnaireDtls;
      this.parseGetQuestionnairResp(questionnairDtlsResp);
     // this.afterLoadQuestionnaireDtls();
    },
      (httpError) => {
        console.error(httpError);
        this.services.alert.showAlert(2, 'rlo.error.fetch.form', -1);
      });
  }



  parseGetQuestionnairResp(questionnairDtlsResp) {
    console.log("shweta:: new json", questionnairDtlsResp);
    this.QuestionnairMap.clear();

      // this.ApplicationDetails.ProductCode =questionnairDtlsResp[0].ProductCode;
      // this.ApplicationDetails.QuestionnaireCategory =questionnairDtlsResp[0].QuestionnaireCategory;
      // this.ApplicationDetails.CustTypeCode =questionnairDtlsResp[0].CustTypeCode;

    for (let eachElement of questionnairDtlsResp) {
      let questionParam: IQuestion = {};
      if (this.QuestionnairMap.has(eachElement.QuestionSeq)) {
        questionParam = this.QuestionnairMap.get(eachElement.QuestionSeq)
      }

      questionParam.QuestionSeq = eachElement["QuestionSeq"];
      questionParam.QuestionText = eachElement["QuestionText"];
      questionParam.IsNegative = eachElement["IsNegative"];
      questionParam.QuestionnaireSeq = eachElement["TxnQuestionairSeq"];
      questionParam.QuestionnaireCategory =eachElement["QuestionnaireCategory"];

      let AnswerOption: IAnswerOption = {};
      if (questionParam.AnswerOptionList == undefined) {
        questionParam.AnswerOptionList = [];
        questionParam.radioOptionFormatList = [];
      } else {
        AnswerOption = questionParam.AnswerOptionList.find(answer => answer.AnswerSeq == eachElement["AnswerSeq"]);
        if (AnswerOption == undefined) { AnswerOption = {} }
      }
      if (Object.keys(AnswerOption).length === 0) {
        AnswerOption.AnswerSeq = eachElement["AnswerSeq"];
        AnswerOption.AnswerValue = eachElement["AnswerValue"];
        AnswerOption.AnswerScoreWeight = eachElement["AnswerScoreWeight"];
        AnswerOption.AnswerText = eachElement["AnswerText"];
        questionParam.AnswerOptionList.push(AnswerOption);
        questionParam.radioOptionFormatList.push({ id: eachElement["AnswerSeq"], text: eachElement["AnswerText"] });
      }

      let prevDecision: IselectedAnswer = {}
      if (questionParam.selectedDecisionList == undefined) {
        questionParam.selectedDecisionList = [];
      } else {
        prevDecision = questionParam.selectedDecisionList.find(decision => decision.AnswerSeq == eachElement["TxnAnswerSeq"]);
        if (prevDecision == undefined) { prevDecision = {} }
      }
      if (Object.keys(prevDecision).length === 0) {
        prevDecision.QuestionnaireSeq = eachElement["TxnQuestionairSeq"];
        prevDecision.AnswerSeq = eachElement["TxnAnswerSeq"];
        prevDecision.Remark = eachElement["TxnRemarks"];
        questionParam.selectedDecisionList.push(prevDecision);
      }
      this.QuestionnairMap.set(eachElement.QuestionSeq, questionParam);
    }
    console.log("shweta :: PI Interface map", this.QuestionnairMap);
  }

  createSaveApiRequestBody(element, questionairemap, key) {
    let quesParam = {} = {};
    if (questionairemap.has(key)) {
      quesParam = questionairemap.get(key);
    }

    if (element.value != undefined && element.componentName == 'RLOUIRadioComponent') {
      quesParam['AnswerSeq'] = element.value;
      quesParam['Result'] = element.additionalInfo
    }

    if (element.value != '' && element.inputType == 'text') {
      quesParam['Remarks'] = element.value;
    }

    questionairemap.set(key, quesParam);

    return questionairemap;
  }

  onDecisionChange(questionSeq,selectedAnswerSeq){

    console.log("shweta :: onBlur id: ",questionSeq," event ",selectedAnswerSeq);
   let questionParam=this.QuestionnairMap.get(questionSeq);
  // let AnswerOption=questionParam.AnswerOptionList.find(answer => answer.AnswerSeq == selectedAnswerSeq);
   if(questionParam.selectedDecisionList==undefined){
    questionParam.selectedDecisionList=[];
   }
     questionParam.selectedDecisionList[0].AnswerSeq=selectedAnswerSeq;  
  }

  onRemarkBlur(questionSeq,enteredRemark){
    let questionParam=this.QuestionnairMap.get(questionSeq);
    if(questionParam.selectedDecisionList==undefined){
     questionParam.selectedDecisionList=[];
    }
      questionParam.selectedDecisionList[0].Remark=enteredRemark;  
  }
   persistData() {
    this.saveDecisions()
  //   console.log('Saving...');

  //   let temp = {};
  //   const questionnaireArray = new Array();
  //   let questionniareSaveReqMap = new Map<string, any>();
  //   this.domRef.forEach(element => {
  //     console.log("elemem id ", element['fieldID']);
  //     let fieldId: string = "" + element['fieldID'];
  //     let fieldSplitArr = fieldId.split("_");
  //     let key = fieldSplitArr[0] + "_" + fieldSplitArr[fieldSplitArr.length - 1];
  //     questionniareSaveReqMap = this.createSaveApiRequestBody(element, questionniareSaveReqMap, key);
  //     // if (!this.isEmpty(temp) && 'AnswerSeq' in temp && 'Remarks' in temp) {
  //     //  // questionnaireArray.push(temp);
  //     // }
  //   });

  //   this.mstParamList['MstQuestionnaireDtls'].forEach(question => {
  //     Array.from(questionniareSaveReqMap.values()).forEach(value => {
  //       const answer = question['MstQuestionnaireAns'].find(answer => answer.AnswerSeq === value.AnswerSeq);
  //       console.log(value);
  //       if (answer != undefined) {
  //         value['QuestionSeq'] = question.QuestionSeq;
  //         value['ApplicationId'] = this.ApplicationId;
  //         value['QuestionnaireCategory'] = question.QuestionnaireCategory;
  //         value['CreatedBy'] = sessionStorage.getItem('userId');
  //         value['UpdatedBy'] = sessionStorage.getItem('userId');
  //         questionnaireArray.push(value);
  //       }
  //       else {
  //         //here write code for manadatory field error
  //       }
  //     });

  //   });

  //   console.log('shweta:: req json Questionnaire Array : ', questionnaireArray);

  //   let inputMap = new Map();
  //   inputMap.clear();
  //   inputMap.set('PathParam.ApplicationId', this.ApplicationId);
  //   inputMap.set('Body.QuestionnaireDetails', questionnaireArray);

  //   this.services.http.fetchApi('/saveQuestionnaireDetails/{ApplicationId}', 'POST', inputMap).subscribe((httpResponse: HttpResponse<any>) => {
  //     this.services.alert.showAlert(1, 'rlo.success.save.personal-Interview', 5000);
  //     this.loadQuestionnaireDtls();
  //   },
  //     (httpError) => {
  //       console.error(httpError);
  //       this.services.alert.showAlert(2, 'rlo.error.save.personal-Interview', -1);
  //     });

  }

  isDecisionsValid(){
let isValid=true;
this.QuestionnairMap.forEach(question => {
  let Decision:object={};
  if(question.selectedDecisionList[0].AnswerSeq==undefined){
    this.fieldErrorList.push({QuestionSeq:question.QuestionSeq, errorText:'decision pending'});
    isValid=false;
  }});

  return isValid;
  }
  saveDecisions() {
    console.log('Saving...');

   let decisionsParamArray=[];

   if(this.isDecisionsValid()){
   this.QuestionnairMap.forEach(question => {
      let decision:object={};
      if(question.QuestionnaireSeq!=undefined){
      decision['QuestionnaireSeq']=question.QuestionnaireSeq
    }
      decision['QuestionSeq']=question.QuestionSeq;
      decision['ApplicationId']=this.ApplicationId;
      decision['AnswerSeq']=question.selectedDecisionList[0].AnswerSeq;
      decision['DeviationLevel']=question.DeviationLevel;
      decision['QuestionnaireCategory']=question.QuestionnaireCategory;
      decision['Remarks']=question.selectedDecisionList[0].Remark;
      decision['CreatedBy']=sessionStorage.getItem('userId');
      decision['UpdatedBy']=sessionStorage.getItem('userId');
      decisionsParamArray.push(decision);
   });

   console.log('shweta:: req json decisionsParamArray : ', decisionsParamArray);

    let inputMap = new Map();
    inputMap.clear();
    //inputMap.set('PathParam.ApplicationId', this.ApplicationId);
    inputMap.set('Body.QuestionnaireDetails', decisionsParamArray);

    console.log("shweta :: input map",inputMap);
     this.services.http.fetchApi('/saveQuestionnaireDetails', 'POST', inputMap).subscribe((httpResponse: HttpResponse<any>) => {
       this.services.alert.showAlert(1, 'rlo.success.save.personal-Interview', 5000);
       this.loadQuestionnaireDtls();
     },
       (httpError) => {
         console.error(httpError);
         this.services.alert.showAlert(2, 'rlo.error.save.personal-Interview', -1);
       });

  }
}

  isEmpty(obj) {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        return false;
      }
    }

    return JSON.stringify(obj) === JSON.stringify({});
  }
}
