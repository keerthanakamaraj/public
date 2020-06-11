import { Component, OnInit, ElementRef, Renderer2, ViewChildren, QueryList, AfterViewInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ServiceStock } from '../service-stock.service';
import { HttpResponse } from '@angular/common/http';
import { RLOUIRadioComponent } from '../rlo-ui-radio/rlo-ui-radio.component';
import { DropDown } from '../DropDownOptions';

@Component({
  selector: 'app-go-no-go',
  templateUrl: './go-no-go.component.html',
  styleUrls: ['./go-no-go.component.css']
})


export class GoNoGoComponent implements OnInit {
  //if (this.formCode == undefined) { this.formCode = 'GoNoGoDtls'; }
  //apiResponse: HttpResponse<any>;
  mstParamList:any[]=[]; 
 // questionnaireCat: Map<Number, String> = new Map();
  answerCollection: Array<String> = new Array();
  prevDecisionsMap: Map<String,any>=new Map<String,any>();
  @ViewChildren('tbData') domRef: QueryList<ElementRef>;
  //@ViewChild('GNG_PARAM_ANS', { static: false }) GNG_PARAM_ANS: RLOUIRadioComponent;
  @ViewChildren(RLOUIRadioComponent) GNG_PARAM_List: QueryList<ElementRef>;



  @Input() ApplicationId: string = undefined;

  @Output() updateOptions: EventEmitter<any> = new EventEmitter<any>();

  constructor(private services: ServiceStock, private renderer2: Renderer2) { }

  ngOnInit() {
    this.loadQuestionnaireDtls();
  }

  //   afterLoadQuestionnaireDtls() {
  //     this.answerCollection = [];
  //     if (this.apiResponse) {
  //      if(this.apiResponse['GoNoGoDetails'] !=undefined){
  //       this.apiResponse['GoNoGoDetails'].forEach((element) => {
  //         if (element.AnswerSeq)
  //           this.answerCollection.push(`${element.AnswerSeq}-${element.Remarks}`);
  //       });
  //     }
  //       console.log('AnswerCollection: ', this.answerCollection);

  //       this.apiResponse['MstQuestionnaireDtls'].map((element) => {
  //         let tempAnsSeq: String = null;
  // shweta :: create dropdown objects array and bind to html
  //         element['MstQuestionnaireAns'].some(answer => {
  //           tempAnsSeq = this.answerCollection.find(answers => answers.split('-')[0] === answer.AnswerSeq);
  //           if(tempAnsSeq != undefined)
  //             return answer.AnswerSeq == tempAnsSeq.split('-')[0];
  //         });

  //         if (tempAnsSeq != null && tempAnsSeq != undefined) {
  //           element.AnswerSeq = tempAnsSeq.split('-')[0];
  //           element.Remarks = tempAnsSeq.split('-')[1];
  //         }

  //         return element;
  //       });
  //     }
  //     console.log(this.apiResponse['MstQuestionnaireDtls']);
  //   }
  afterLoadQuestionnaireDtls() {
    if (this.mstParamList) {
      this.prevDecisionsMap.clear();
      let QuestionsMap: any[] = [];
      if(this.mstParamList['GoNoGoDetails'] !=undefined){
        this.mstParamList['GoNoGoDetails'].forEach((element) => {
                   if (element.AnswerSeq)
                    this.prevDecisionsMap.set(element.QustionSeq,element)
                    console.log("shweta :: setting prevmap",this.prevDecisionsMap)
                  //  this.answerCollection.push(`${element.AnswerSeq}-${element.Remarks}`);
                 });
      }
      if (this.mstParamList['MstQuestionnaireDtls']) {
        this.mstParamList['MstQuestionnaireDtls'].map((question) => {
          // let tempAnsSeq: String = null;
          //shweta :: create dropdown objects array and bind to html
          let dropDownOptions: any[] = [];
          question['MstQuestionnaireAns'].some(answer => {
            dropDownOptions.push({ id: answer.AnswerSeq, text: answer.AnswerText });
          });
          question['dropdownOptions'] = dropDownOptions;
           if(this.prevDecisionsMap.has(question.QuestionSeq)){
             question['oldDecision']=this.prevDecisionsMap.get(question.QuestionSeq).AnswerSeq;
             question['oldRemark']=this.prevDecisionsMap.get(question.QuestionSeq).Remarks;
             //console.log("shweta :: old decision set",question['oldDecision']);
           }
          return question;
        });
      }
      console.log("shweta :: ", this.mstParamList['MstQuestionnaireDtls']);
    }
  }

  loadQuestionnaireDtls() {
    let inputMap = new Map();
    inputMap.clear();
    inputMap.set('QueryParam.QuestionnaireCategory', 'go_no_go');
    inputMap.set('QueryParam.Product', 'PROD1');
    inputMap.set('QueryParam.SubProduct', 'SUBPROD1');
    //inputMap.set('QueryParam.ApplicationId', '666');
    inputMap.set('QueryParam.ApplicationId', this.ApplicationId);

    this.services.http.fetchApi('/questionnaire', 'GET', inputMap, '/rlo-de').subscribe((httpResponse: HttpResponse<any>) => {
      this.mstParamList = httpResponse.body;
      this.afterLoadQuestionnaireDtls();
    },
      (httpError) => {
        console.error(httpError);
        this.services.alert.showAlert(2, 'rlo.error.fetch.form', -1);
      });
  }

  createSaveApiRequestBody(element, questionairemap, key) {
    let quesParam={}={};
    if(questionairemap.has(key))
    {
     quesParam = questionairemap.get(key);
    }

    if (element.value != undefined && element.componentName == 'RLOUIRadioComponent') {
      quesParam['AnswerSeq'] = element.value;
      quesParam['Result'] = element.additionalInfo
    }

    if (element.value != '' && element.inputType == 'text') {
      quesParam['Remarks'] = element.value;
       }
  
       questionairemap.set(key,quesParam);
    // if (temp['Remarks'] != undefined)
    //   temp = {};

    // if(element.value != 'Select' && element.nodeName == 'SELECT') {
    //   temp['AnswerSeq'] = element.value;
    //   if(element.selectedOptions)
    //     temp['Result'] = element.selectedOptions[0].text;
    // }
    // if (element.value != undefined && element.componentName == 'RLOUIRadioComponent') {
    //   temp['AnswerSeq'] = element.value;
    //   temp['Result'] = element.additionalInfo
    //   //console.log("gng Radio id",element.fieldID);
    // }


    // if (element.value != '' && element.inputType == 'text') {
    //   temp['Remarks'] = element.value;
    //   //console.log("gng Remarks id",element.fieldID);
    // }

    return questionairemap;
  }

  // persistData() {
  //   console.log('Saving...');

  //   let temp = {};
  //   const questionnaireArray = new Array();

  //   this.domRef.forEach(element => {
  //     temp = this.createSaveApiRequestBody(element.nativeElement, temp);
  //      if(!this.isEmpty(temp) && 'AnswerSeq' in temp && 'Remarks' in temp) {
  //         questionnaireArray.push(temp);
  //     }
  //      
  //   });

  //   this.apiResponse['MstQuestionnaireDtls'].forEach(question => {
  //     questionnaireArray.map(element => {
  //       const answer = question['MstQuestionnaireAns'].find(answer => answer.AnswerSeq === element.AnswerSeq);

  //       if(answer != undefined) {
  //         element['QuestionSeq'] =  question.QuestionSeq;
  //         element['ApplicationId'] =  this.ApplicationId;
  //         element['QuestionnaireCategory'] =  question.QuestionnaireCategory;
  //         element['CreatedBy'] =  sessionStorage.getItem('userId');
  //         element['UpdatedBy'] =  sessionStorage.getItem('userId');
  //       }
  //       return element;
  //     });

  //   });

  //   console.log('Questionnaire Array: ', questionnaireArray);

  //   let inputMap = new Map();
  //   inputMap.clear();
  //   inputMap.set('PathParam.ApplicationId', this.ApplicationId);
  //   inputMap.set('Body.QuestionnaireDetails', questionnaireArray);

  //   this.services.http.fetchApi('/saveQuestionnaireDetails/{ApplicationId}', 'POST', inputMap).subscribe((httpResponse: HttpResponse<any>) => {
  //     this.services.alert.showAlert(1, 'rlo.success.save.go-no-go', 5000);
  //     this.loadQuestionnaireDtls();
  //   },
  //     (httpError) => {
  //       console.error(httpError);
  //       this.services.alert.showAlert(2, 'rlo.error.save.go-no-go', -1);
  //     });

  // }
  persistData() {
    console.log('Saving...');

    let temp = {};
    const questionnaireArray = new Array();
    let questionniareSaveReqMap=new Map<string,any>();
    this.domRef.forEach(element => {
      console.log("elemem id ",element['fieldID']);
      let fieldId:string=""+element['fieldID'];
      let fieldSplitArr = fieldId.split("_");
      let key=fieldSplitArr[0]+"_"+fieldSplitArr[fieldSplitArr.length-1];
      questionniareSaveReqMap = this.createSaveApiRequestBody(element, questionniareSaveReqMap,key);
      // if (!this.isEmpty(temp) && 'AnswerSeq' in temp && 'Remarks' in temp) {
      //  // questionnaireArray.push(temp);
      // }
    });

    this.mstParamList['MstQuestionnaireDtls'].forEach(question => {
        Array.from(questionniareSaveReqMap.values()).forEach(value => {
          const answer = question['MstQuestionnaireAns'].find(answer => answer.AnswerSeq === value.AnswerSeq);
        console.log(value);
        if (answer != undefined) {
          value['QuestionSeq'] = question.QuestionSeq;
          value['ApplicationId'] = this.ApplicationId;
          value['QuestionnaireCategory'] = question.QuestionnaireCategory;
          value['CreatedBy'] = sessionStorage.getItem('userId');
          value['UpdatedBy'] = sessionStorage.getItem('userId');
          questionnaireArray.push(value);
        }
        else{
          //here write code for manadatory field error
        }
    
      // questionniareSaveReqMap.forEach(element => {
      //   const answer = question['MstQuestionnaireAns'].find(answer => answer.AnswerSeq === element.AnswerSeq);

        // if (answer != undefined) {
        //   element['QuestionSeq'] = question.QuestionSeq;
        //   element['ApplicationId'] = this.ApplicationId;
        //   element['QuestionnaireCategory'] = question.QuestionnaireCategory;
        //   element['CreatedBy'] = sessionStorage.getItem('userId');
        //   element['UpdatedBy'] = sessionStorage.getItem('userId');
        // }
      //  return element;
     // questionnaireArray.push(value);
      });

    });

    console.log('shweta:: req json Questionnaire Array : ', questionnaireArray);

    let inputMap = new Map();
    inputMap.clear();
    inputMap.set('PathParam.ApplicationId', this.ApplicationId);
    inputMap.set('Body.QuestionnaireDetails', questionnaireArray);

    this.services.http.fetchApi('/saveQuestionnaireDetails/{ApplicationId}', 'POST', inputMap).subscribe((httpResponse: HttpResponse<any>) => {
      this.services.alert.showAlert(1, 'rlo.success.save.go-no-go', 5000);
      this.loadQuestionnaireDtls();
    },
      (httpError) => {
        console.error(httpError);
        this.services.alert.showAlert(2, 'rlo.error.save.go-no-go', -1);
      });

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
