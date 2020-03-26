import { Component, OnInit } from '@angular/core';
import { ServiceStock } from '../service-stock.service';
import { HttpResponse } from '@angular/common/http';
import { response } from 'src/go-no-go.response';

@Component({
  selector: 'app-go-no-go',
  templateUrl: './go-no-go.component.html',
  styleUrls: ['./go-no-go.component.css']
})
export class GoNoGoComponent implements OnInit {
  //apiResponse:any = response;
  apiResponse:HttpResponse<any>;
  questionnaireCat: Map<Number, String> = new Map();
  answerCollection: Array<String> = new Array();

  constructor(private services: ServiceStock) { }

  ngOnInit() {
    this.loadQuestionnaireDtls();  
    //this.afterLoadQuestionnaireDtls();
  }

  afterLoadQuestionnaireDtls() {
    if(this.apiResponse) {
      
      this.apiResponse['GoNoGoDetails'].forEach((element) => {
        if(element.AnswerSeq)
          this.answerCollection.push(`${element.AnswerSeq}-${element.Remarks}`);
      });

      console.log('AnswerCollection: ',this.answerCollection);

      this.apiResponse['MstQuestionnaireDtls'].map((element) => {
        let tempAnsSeq: String = null;
        
        element['MstQuestionnaireAns'].every(answer => {
          tempAnsSeq = this.answerCollection.find(answers => answers.split('-')[0] === answer.AnswerSeq);
          return false;
        });

        if(tempAnsSeq != null &&  tempAnsSeq != undefined) {
          element.AnswerSeq = tempAnsSeq.split('-')[0];
          element.Remarks = tempAnsSeq.split('-')[1];
        }
        return element;
      });
    }
    console.log(this.apiResponse);
  }

  loadQuestionnaireDtls() {
    let inputMap = new Map();
    inputMap.clear();
    inputMap.set('QueryParam.QuestionnaireCategory', 'go_no_go');
    inputMap.set('QueryParam.Product', 'PROD1');
    inputMap.set('QueryParam.SubProduct', 'SUBPROD1');
    inputMap.set('QueryParam.ApplicationId', '222');
     
   this.services.http.fetchApi('/questionnaire', 'GET', inputMap).subscribe((httpResponse: HttpResponse<any>) => {
      this.apiResponse = httpResponse.body;
      this.afterLoadQuestionnaireDtls();
    },
      (httpError) => {
        console.error(httpError);
        this.services.alert.showAlert(2, 'Something went wrong while fetching data!', -1);
      });
    }

    persistData(e) {
      console.log('Need to implement save functionality');
    }
}
