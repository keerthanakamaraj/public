import { Component, OnInit, ElementRef, Renderer2, ViewChildren, QueryList, AfterViewInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ServiceStock } from '../service-stock.service';
import { HttpResponse } from '@angular/common/http';
import { RLOUIRadioComponent } from '../rlo-ui-radio/rlo-ui-radio.component';
import { DropDown } from '../DropDownOptions';
import { IQuestion, IAnswerOption, IGoNoGoQuestionnaire, IselectedAnswer, IFieldErrors } from './GoNoGoInterface';

@Component({
  selector: 'app-go-no-go',
  templateUrl: './go-no-go.component.html'
})

export class GoNoGoComponent implements OnInit {
  //if (this.formCode == undefined) { this.formCode = 'GoNoGoDtls'; }
  ErrorSet = new Set([]);
  ApplicationDetails: IGoNoGoQuestionnaire = {};
  QuestionnairMap: Map<String, IQuestion> = new Map<String, IQuestion>();
  @ViewChildren('tbData') domRef: QueryList<ElementRef>;
 // @ViewChildren(RLOUIRadioComponent) GNG_PARAM_List: QueryList<ElementRef>;

  @Input() ApplicationId: string = undefined;
  @Input() readOnly: boolean = false;

  constructor(private services: ServiceStock, private renderer2: Renderer2) { }

  ngOnInit() {
    this.loadQuestionnaireDtls();
  }

  loadQuestionnaireDtls() {
    let inputMap = new Map();
    inputMap.clear();
    inputMap.set('QueryParam.QuestionnaireCategory', 'go_no_go');
   // inputMap.set('QueryParam.Product', 'PROD1');
    inputMap.set('QueryParam.Product', this.services.rloCommonData.globalApplicationDtls.ProductCode);
    // inputMap.set('QueryParam.SubProduct', 'SUBPROD1');
    inputMap.set('QueryParam.ApplicationId', this.ApplicationId);

    this.services.http.fetchApi('/questionnaire', 'GET', inputMap, '/rlo-de').subscribe((httpResponse: HttpResponse<any>) => {
      console.log(httpResponse);
      let questionnairDtlsResp = httpResponse.body.QuestionnaireDtls;
      this.parseGetQuestionnairResp(questionnairDtlsResp);
      //call validation method and render
      if (this.isDecisionsValid()) {
        let array = [];
        array.push({ isValid: true, sectionData: this.QuestionnairMap });
        let obj = {
          "name": "GoNoGoDetails",
          "data": array,
          "sectionName": "GoNoGoDetails",
        }
        this.services.rloCommonData.globalComponentLvlDataHandler(obj);
      }

      if (this.readOnly) {
        setTimeout(() => {
          this.domRef.forEach((element: any) => {
            element.setReadOnly(true);
          });
        }, 500);
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
    //console.log("shweta :: gng Interface map", this.QuestionnairMap);
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
    this.ErrorSet.clear();
    this.QuestionnairMap.forEach(question => {
      question.IsDeviation = false;
      let answerParams = question.AnswerOptionList.find(answer => answer.AnswerSeq == question.SelectedDecision.AnswerSeq)
      if (question.SelectedDecision.AnswerSeq == undefined) {
        //   this.ErrorSet.push({ QuestionSeq: question.QuestionSeq, errorText: 'decision pending' });
        this.ErrorSet.add('rlo.error.questionnaire.decision-pending');
        isValid = false;
      } else if (('N' == question.IsNegative && 'N' == answerParams.AnswerValue) || ('Y' == question.IsNegative && 'Y' == answerParams.AnswerValue)) {
        if (question.SelectedDecision.Remark == undefined) {
          this.ErrorSet.add('rlo.error.questionnaire.Remark-pending');
          isValid = false;
        }
        question.IsDeviation = true;
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
        decision['DeviationLevel'] = question.IsDeviation ? question.DeviationLevel : '';
        decision['QuestionnaireCategory'] = question.QuestionnaireCategory;
        decision['Remarks'] = (question.SelectedDecision.Remark == undefined) ? '' : question.SelectedDecision.Remark;
        decision['CreatedBy'] = sessionStorage.getItem('userId');
        decision['UpdatedBy'] = sessionStorage.getItem('userId');
        decisionsParamArray.push(decision);
      });


      let inputMap = new Map();
      inputMap.clear();
      inputMap.set('Body.QuestionnaireDetails', decisionsParamArray);
      inputMap.set('QueryParam.ApplicationId', this.ApplicationId);
      inputMap.set('QueryParam.QuestionnaireCategory', 'go_no_go');

      this.services.http.fetchApi('/saveQuestionnaireDetails', 'POST', inputMap, '/rlo-de').subscribe((httpResponse: HttpResponse<any>) => {
        this.services.alert.showAlert(1, 'rlo.success.save.go-no-go', 5000);
        this.loadQuestionnaireDtls();
        // let array = [];
        // array.push({ isValid: true, sectionData: this.QuestionnairMap });
        // let obj = {
        //   "name": "GoNoGoDetails",
        //   "data": array,
        //   "sectionName": "GoNoGoDetails",
        // }
        // this.services.rloCommonData.globalComponentLvlDataHandler(obj);
      },
        (httpError) => {
          console.error(httpError);
          this.services.alert.showAlert(2, 'rlo.error.save.go-no-go', -1);
        });

    } else {
      let errorText = 'rlo.error.questionnaire.decision-Remark-pending'; // Default Both Errors
      if (this.ErrorSet.size === 1) { // If only Single Error
        errorText = Array.from(this.ErrorSet)[0] + '';
      }
      this.services.alert.showAlert(2, errorText, -1);
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
