import { Component, OnInit, ElementRef, Renderer2, ViewChildren, QueryList, AfterViewInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ServiceStock } from '../service-stock.service';
import { HttpResponse } from '@angular/common/http';
import { RLOUIRadioComponent } from '../rlo-ui-radio/rlo-ui-radio.component';
import { DropDown } from '../DropDownOptions';
import { IQuestion, IAnswerOption, IselectedAnswer, IFieldErrors } from './PersonalInterviewInterface';

@Component({
  selector: 'app-personal-Interview',
  templateUrl: './personal-interview.component.html',
  styleUrls: ['./personal-interview.component.css']
})

export class PersonalInterviewComponent implements OnInit {
  ErrorMsg: String = undefined;
  QuestionnairMap: Map<String, IQuestion> = new Map<String, IQuestion>();
  @ViewChildren('tbData') domRef: QueryList<ElementRef>;
  @ViewChildren(RLOUIRadioComponent) PI_PARAM_List: QueryList<ElementRef>;



  @Input() ApplicationId: string = undefined;
  @Input() activeBorrowerSeq: string = undefined;


  // @Output() updateOptions: EventEmitter<any> = new EventEmitter<any>();

  constructor(private services: ServiceStock, private renderer2: Renderer2) {
  }

  ngOnInit() {
    this.loadQuestionnaireDtls();
  }

  loadQuestionnaireDtls() {
    console.log("Shweta :: borrowerSeq is : ", this.activeBorrowerSeq);
    let inputMap = new Map();
    inputMap.clear();
    inputMap.set('QueryParam.QuestionnaireCategory', 'per_int');
    inputMap.set('QueryParam.Product', 'PROD1');
    inputMap.set('QueryParam.BorrowerSeq', this.activeBorrowerSeq);
    // inputMap.set('QueryParam.SubProduct', 'SUBPROD1');
    inputMap.set('QueryParam.ApplicationId', this.ApplicationId);

    this.services.http.fetchApi('/questionnaire', 'GET', inputMap, '/rlo-de').subscribe((httpResponse: HttpResponse<any>) => {
      let questionnairDtlsResp = httpResponse.body.QuestionnaireDtls;
      this.parseGetQuestionnairResp(questionnairDtlsResp);
      if (this.isDecisionsValid()) {
        let array = [];
        array.push({ isValid: true, sectionData: this.QuestionnairMap });
        let obj = {
          "name": "PersonalInterviewDetails",
          "data": array,
          "BorrowerSeq": this.activeBorrowerSeq
        }

      }
    },
      (httpError) => {
        console.error(httpError);
        this.services.alert.showAlert(2, 'rlo.error.fetch.form', -1);
      });
  }



  parseGetQuestionnairResp(questionnairDtlsResp) {
    //console.log("shweta:: new json", questionnairDtlsResp);
    this.QuestionnairMap.clear();

    for (let eachElement of questionnairDtlsResp) {
      let questionParam: IQuestion = {};
      if (this.QuestionnairMap.has(eachElement.QuestionSeq)) {
        questionParam = this.QuestionnairMap.get(eachElement.QuestionSeq)
      }

      questionParam.QuestionSeq = eachElement["QuestionSeq"];
      questionParam.QuestionText = eachElement["QuestionText"];
      questionParam.IsNegative = eachElement["IsNegative"];
      questionParam.QuestionnaireSeq = eachElement["TxnQuestionairSeq"];
      questionParam.QuestionnaireCategory = eachElement["QuestionnaireCategory"];

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

      questionParam.SelectedDecision = {};
      if (Object.keys(questionParam.SelectedDecision).length === 0) {
        questionParam.SelectedDecision.QuestionnaireSeq = eachElement["TxnQuestionairSeq"];
        questionParam.SelectedDecision.AnswerSeq = eachElement["TxnAnswerSeq"];
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

    questionairemap.set(key, quesParam);

    return questionairemap;
  }

  onDecisionChange(questionSeq, selectedAnswerSeq) {

    console.log("shweta :: onBlur id: ", questionSeq, " event ", selectedAnswerSeq);
    let questionParam = this.QuestionnairMap.get(questionSeq);
    if (questionParam.SelectedDecision == undefined) {
      questionParam.SelectedDecision = {};
    }
    questionParam.SelectedDecision.AnswerSeq = selectedAnswerSeq;
  }

  isDecisionsValid() {
    let isValid = true;
    // this.ErrorMsg.clear();
    this.QuestionnairMap.forEach(question => {
      if (question.SelectedDecision.AnswerSeq == undefined) {
        isValid = false;
      }
    });

    return isValid;
  }
  PI_SAVE_BTN_click(event) {
    console.log('Saving...');

    let decisionsParamArray = [];

    if (this.isDecisionsValid()) {
      this.QuestionnairMap.forEach(question => {
        let decision: object = {};
        if (question.QuestionnaireSeq != undefined) {
          decision['QuestionnaireSeq'] = question.QuestionnaireSeq
        }
        decision['QuestionSeq'] = question.QuestionSeq;
        decision['ApplicationId'] = this.ApplicationId;
        decision['BorrowerSeq'] = this.activeBorrowerSeq;
        decision['AnswerSeq'] = question.SelectedDecision.AnswerSeq;
        decision['DeviationLevel'] = question.DeviationLevel;
        decision['QuestionnaireCategory'] = question.QuestionnaireCategory;
        decision['CreatedBy'] = sessionStorage.getItem('userId');
        decision['UpdatedBy'] = sessionStorage.getItem('userId');
        decisionsParamArray.push(decision);
      });

      console.log('shweta:: req json decisionsParamArray : ', decisionsParamArray);

      let inputMap = new Map();
      inputMap.clear();
      inputMap.set('Body.QuestionnaireDetails', decisionsParamArray);

      console.log("shweta :: input map", inputMap);
      this.services.http.fetchApi('/saveQuestionnaireDetails', 'POST', inputMap, '/rlo-de').subscribe((httpResponse: HttpResponse<any>) => {
        this.services.alert.showAlert(1, 'rlo.success.save.personal-interview', 5000);

        let array = [];
        array.push({ isValid: true, sectionData: this.QuestionnairMap });
        let obj = {
          "name": "PersonalInterviewDetails",
          "data": array,
          "BorrowerSeq": this.activeBorrowerSeq
        }

        this.services.rloCommonData.globalComponentLvlDataHandler(obj);

        //  this.loadQuestionnaireDtls();
      },
        (httpError) => {
          console.error(httpError);
          this.services.alert.showAlert(2, 'rlo.error.save.personal-interview', -1);
        });

    } else {
      let errorText = undefined;
      this.services.alert.showAlert(2, 'rlo.error.questionnaire.decision-pending', -1);
    }
  }

  PI_CLEAR_BTN_click(event) {
    this.QuestionnairMap.forEach(question => {
      question.SelectedDecision.AnswerSeq = undefined;
    });

    this.domRef.forEach(element => {
      this.ClearFormFields(element);
    });

  }

  ClearFormFields(element) {
    if (element['value'] != undefined && element['componentName'] == 'RLOUIRadioComponent') {
      element.onReset();
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
