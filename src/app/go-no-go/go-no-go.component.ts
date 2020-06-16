import { Component, OnInit, ElementRef, Renderer2, ViewChildren, QueryList, AfterViewInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ServiceStock } from '../service-stock.service';
import { HttpResponse } from '@angular/common/http';
import { RLOUIRadioComponent } from '../rlo-ui-radio/rlo-ui-radio.component';
import { DropDown } from '../DropDownOptions';
import { IQuestion, IAnswerOption, IGoNoGoQuestionnaire, IselectedAnswer, IFieldErrors } from './GoNoGoInterface';

@Component({
  selector: 'app-go-no-go',
  templateUrl: './go-no-go.component.html',
  styleUrls: ['./go-no-go.component.css']
})

export class GoNoGoComponent implements OnInit {
  //if (this.formCode == undefined) { this.formCode = 'GoNoGoDtls'; }
  ErrorMap = new Map();
  ApplicationDetails: IGoNoGoQuestionnaire = {};
  QuestionnairMap: Map<String, IQuestion> = new Map<String, IQuestion>();
  @ViewChildren('tbData') domRef: QueryList<ElementRef>;
  @ViewChildren(RLOUIRadioComponent) GNG_PARAM_List: QueryList<ElementRef>;

  @Input() ApplicationId: string = undefined;

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
    inputMap.set('QueryParam.ApplicationId', this.ApplicationId);

    this.services.http.fetchApi('/questionnaire', 'GET', inputMap, '/rlo-de').subscribe((httpResponse: HttpResponse<any>) => {
      let questionnairDtlsResp = httpResponse.body.QuestionnaireDtls;
      this.parseGetQuestionnairResp(questionnairDtlsResp);
    },
      (httpError) => {
        console.error(httpError);
        this.services.alert.showAlert(2, 'rlo.error.fetch.form', -1);
      });
  }



  parseGetQuestionnairResp(questionnairDtlsResp) {
    console.log("shweta:: new json", questionnairDtlsResp);
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
      questionParam.DeviationLevel = eachElement["DeviationLevel"];

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
        questionParam.SelectedDecision.Remark = (eachElement["TxnRemarks"] == '') ? undefined : eachElement["TxnRemarks"];
      }

      this.QuestionnairMap.set(eachElement.QuestionSeq, questionParam);
    }
    console.log("shweta :: gng Interface map", this.QuestionnairMap);
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

  onDecisionChange(questionSeq, selectedAnswerSeq) {

    console.log("shweta :: onBlur id: ", questionSeq, " event ", selectedAnswerSeq);
    let questionParam = this.QuestionnairMap.get(questionSeq);
    if (questionParam.SelectedDecision == undefined) {
      questionParam.SelectedDecision = {};
    }
    questionParam.SelectedDecision.AnswerSeq = selectedAnswerSeq;
  }

  onRemarkBlur(questionSeq, enteredRemark) {
    let questionParam = this.QuestionnairMap.get(questionSeq);
    if (questionParam.SelectedDecision == undefined) {
      questionParam.SelectedDecision = {};
    }
    questionParam.SelectedDecision.Remark = (enteredRemark == '') ? undefined : enteredRemark;
  }

  isDecisionsValid() {
    let isValid = true;
    this.ErrorMap.clear();
    this.QuestionnairMap.forEach(question => {
      if (question.SelectedDecision.AnswerSeq == undefined) {
        //   this.ErrorMap.push({ QuestionSeq: question.QuestionSeq, errorText: 'decision pending' });
        this.ErrorMap.set('DM', 'Decision for all questions');
        isValid = false;
      }
      else if (question.SelectedDecision.Remark == undefined) {
        let answerParams = question.AnswerOptionList.find(answer => answer.AnswerSeq == question.SelectedDecision.AnswerSeq)
        if (('N' == question.IsNegative && 'No' == answerParams.AnswerText) || ('Y' == question.IsNegative && 'Yes' == answerParams.AnswerText)) {
          question.IsDeviation = true;
          this.ErrorMap.set('RM', 'Remarks for Deviation questions');
          isValid = false;
        } else {
          question.IsDeviation = false;
        }
      }
    });

    return isValid;
  }

  GNG_SAVE_BTN_click(event) {
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
        decision['AnswerSeq'] = question.SelectedDecision.AnswerSeq;
        decision['DeviationLevel'] = question.DeviationLevel;
        decision['QuestionnaireCategory'] = question.QuestionnaireCategory;
        decision['Remarks'] = (question.SelectedDecision.Remark == undefined) ? '' : question.SelectedDecision.Remark;
        decision['CreatedBy'] = sessionStorage.getItem('userId');
        decision['UpdatedBy'] = sessionStorage.getItem('userId');
        decisionsParamArray.push(decision);
      });

      console.log('shweta:: req json decisionsParamArray : ', decisionsParamArray);

      let inputMap = new Map();
      inputMap.clear();
      inputMap.set('Body.QuestionnaireDetails', decisionsParamArray);

      console.log("shweta :: input map", inputMap);
      this.services.http.fetchApi('/saveQuestionnaireDetails', 'POST', inputMap).subscribe((httpResponse: HttpResponse<any>) => {
        this.services.alert.showAlert(1, 'rlo.success.save.go-no-go', 5000);
        this.loadQuestionnaireDtls();
      },
        (httpError) => {
          console.error(httpError);
          this.services.alert.showAlert(2, 'rlo.error.save.go-no-go', -1);
        });

    } else {
      let errorText = undefined;
      if (this.ErrorMap.has('DM')) {
        errorText = this.ErrorMap.get('DM');
      }
      if (this.ErrorMap.has('RM')) {
        errorText != undefined ? errorText = errorText + ' and ' : errorText;
        errorText = errorText = this.ErrorMap.get('RM')
      }

      this.services.alert.showAlert(2, '', -1, errorText + ' is mandatory.');
    }
  }

  GNG_CLEAR_BTN_click(event) {
    this.QuestionnairMap.forEach(question => {
      question.SelectedDecision.AnswerSeq = undefined;
      question.SelectedDecision.Remark = undefined
    });

    this.domRef.forEach(element => {
      this.ClearFormFields(element);
    });

  }

  ClearFormFields(element) {
    if (element['value'] != undefined && element['componentName'] == 'RLOUIRadioComponent') {
      element.onReset();
    }
    if (element.value != '' && element.inputType == 'text') {
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
