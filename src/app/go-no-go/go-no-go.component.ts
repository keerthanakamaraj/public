import { Component, OnInit, ElementRef, Renderer2, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { ServiceStock } from '../service-stock.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-go-no-go',
  templateUrl: './go-no-go.component.html',
  styleUrls: ['./go-no-go.component.css']
})
export class GoNoGoComponent implements OnInit {
  
  apiResponse: HttpResponse<any>;
  questionnaireCat: Map<Number, String> = new Map();
  answerCollection: Array<String> = new Array();
  @ViewChildren('tbData') domRef: QueryList<ElementRef>;

  constructor(private services: ServiceStock, private renderer2: Renderer2) { }

  ngOnInit() {
    this.loadQuestionnaireDtls();
  }

  afterLoadQuestionnaireDtls() {
    this.answerCollection = [];
    if (this.apiResponse) {
      this.apiResponse['GoNoGoDetails'].forEach((element) => {
        if (element.AnswerSeq)
          this.answerCollection.push(`${element.AnswerSeq}-${element.Remarks}`);
      });

      console.log('AnswerCollection: ', this.answerCollection);

      this.apiResponse['MstQuestionnaireDtls'].map((element) => {
        let tempAnsSeq: String = null;

        element['MstQuestionnaireAns'].some(answer => {
          tempAnsSeq = this.answerCollection.find(answers => answers.split('-')[0] === answer.AnswerSeq);
          if(tempAnsSeq != undefined)
            return answer.AnswerSeq == tempAnsSeq.split('-')[0];
        });

        if (tempAnsSeq != null && tempAnsSeq != undefined) {
          element.AnswerSeq = tempAnsSeq.split('-')[0];
          element.Remarks = tempAnsSeq.split('-')[1];
        }

        return element;
      });
    }
    console.log(this.apiResponse['MstQuestionnaireDtls']);
  }

  loadQuestionnaireDtls() {
    let inputMap = new Map();
    inputMap.clear();
    inputMap.set('QueryParam.QuestionnaireCategory', 'go_no_go');
    inputMap.set('QueryParam.Product', 'PROD1');
    inputMap.set('QueryParam.SubProduct', 'SUBPROD1');
    inputMap.set('QueryParam.ApplicationId', '666');

    this.services.http.fetchApi('/questionnaire', 'GET', inputMap).subscribe((httpResponse: HttpResponse<any>) => {
      this.apiResponse = httpResponse.body;
      this.afterLoadQuestionnaireDtls();
    },
      (httpError) => {
        console.error(httpError);
        this.services.alert.showAlert(2, 'Something went wrong while fetching data!', -1);
      });
  }

  createSaveApiRequestBody(element, temp) {
    if(temp['Remarks'] != undefined)
      temp = {};

    if(element.value != 'Select' && element.nodeName == 'SELECT') {
      temp['AnswerSeq'] = element.value;
      if(element.selectedOptions)
        temp['Result'] = element.selectedOptions[0].text;
    }

    if(element.value != '' && element.nodeName == 'TEXTAREA') {
      temp['Remarks'] = element.value;
    }

    return temp;
  }

  persistData() {
    console.log('Saving...');
    
    let temp = {};
    const questionnaireArray = new Array();

    this.domRef.forEach(element => {
      temp = this.createSaveApiRequestBody(element.nativeElement, temp);
      if(!this.isEmpty(temp) && 'AnswerSeq' in temp && 'Remarks' in temp) {
          questionnaireArray.push(temp);
      }
    });

    this.apiResponse['MstQuestionnaireDtls'].forEach(question => {
      questionnaireArray.map(element => {
        const answer = question['MstQuestionnaireAns'].find(answer => answer.AnswerSeq === element.AnswerSeq);

        if(answer != undefined) {
          element['QuestionSeq'] =  question.QuestionSeq;
          element['ApplicationId'] =  '666';
          element['QuestionnaireCategory'] =  question.QuestionnaireCategory;
          element['CreatedBy'] =  sessionStorage.getItem('userId');
          element['UpdatedBy'] =  sessionStorage.getItem('userId');
        }
        return element;
      });

    });

    console.log('Questionnaire Array: ', questionnaireArray);
    
    let inputMap = new Map();
    inputMap.clear();
    inputMap.set('PathParam.ApplicationId', '666');
    inputMap.set('Body.QuestionnaireDetails', questionnaireArray);
    
    this.services.http.fetchApi('/saveQuestionnaireDetails/{ApplicationId}', 'POST', inputMap).subscribe((httpResponse: HttpResponse<any>) => {
      this.services.alert.showAlert(1, 'Record Saved Successfully!', 5000);
      this.loadQuestionnaireDtls();
    },
      (httpError) => {
        console.error(httpError);
        this.services.alert.showAlert(2, 'Something went wrong while saving data!', -1);
      });
      
  }

  isEmpty(obj) {
    for(var prop in obj) {
      if(obj.hasOwnProperty(prop)) {
        return false;
      }
    }
  
    return JSON.stringify(obj) === JSON.stringify({});
  }
}
