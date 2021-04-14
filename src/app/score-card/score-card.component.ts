import { Component, OnInit, Input } from '@angular/core';
import { ServiceStock } from '../service-stock.service';
import { HttpResponse } from '@angular/common/http';
import { IheaderScoreCard, IGeneralCardData } from '../Interface/masterInterface';

@Component({
  selector: 'app-score-card',
  templateUrl: './score-card.component.html',
  styleUrls: ['./score-card.component.css']
})
export class ScoreCardComponent implements OnInit {

  @Input("scoreData") scoreData: IheaderScoreCard;
  @Input("layoutType") layoutType?: string = "horizontal";
  @Input("applicationId") applicationId?: any;
  @Input("borrowersBorrowerSeq") borrowersBorrowerSeq?: number = 0;
  //containes only "borrower's" borrowerseq. Used in final DBR to show borrowers income summary->UW

  showExpanded: boolean = false;

  constructor(public services: ServiceStock) { }

  ngOnInit() { }

  ngAfterViewInit() {
    console.log("DEEP | Scorecard component", this.scoreData);
    //this.getScores();
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

  // getScores() {
  //   console.log(this.applicationId);
  //   let userId = sessionStorage.getItem('userId');
  //   //let url = "/DashboardChart?fromDate=" + startDate + "&toDate=" + endDate + "&userId=" + userId + "&processId=RLO_Process";
  //   let url = "/ApplicationScoreDetails/768";
  //   this.services.http.fetchApi(url, 'GET', null, '/rlo-de').subscribe(
  //     async (httpResponse: HttpResponse<any>) => {
  //       const res = httpResponse.body;
  //       console.warn("Application details api")
  //       console.log(res);
  //     },
  //     async (httpError) => {

  //     });
  // }

  refreshData() {
    switch (this.scoreData.type) {
      case "Final DBR":
        console.log(this.borrowersBorrowerSeq);
        this.services.rloCommonData.fetchIncomeSummaryData(this.borrowersBorrowerSeq).then((response: any) => {
          console.log(response)
          if (response != undefined) {
            this.scoreData.score = Math.round(response);
          }
        });
        break;

      case "Policy Score":
        this.services.rloCommonData.invokeInterface(this.applicationId, "policyScore").then((response: any) => {
          console.log(response)
          if (response != undefined && response.OVERALLSCORE != undefined) {
            this.scoreData.score = Math.round(response.OVERALLSCORE);
          }
        });

        break;

      case "Application Score":
        this.services.rloCommonData.invokeInterface(this.applicationId, "applicationScore").then((response: any) => {
          console.log(response);
          if (response != undefined && response.OVERALLSCORE != undefined) {
            this.scoreData.score = Math.round(response.OVERALLSCORE);
          }
        });
        break;

      default:
        break;
    }
  }

  openModal(data: IheaderScoreCard) {
    console.log(data);

    if (!this.borrowersBorrowerSeq)
      return;

    let modalSectionName, name;
    if (data.id == "DBR") {
      modalSectionName = "IncomeSummary";
      name = "Final DBR";
    }
    else if (data.id == "Policy") {
      modalSectionName = "PolicyCheckResults";
      name = "Policy Score";
    } else {
      modalSectionName = "ScorecardResults";
      name = "Application Score";
    }

    if (modalSectionName.length) {
      const obj: IGeneralCardData = {
        name: name,
        modalSectionName: modalSectionName,
        borrowerSeq: this.borrowersBorrowerSeq,
        applicationId: this.applicationId,
        componentCode: ""
      }

      this.services.rloui.openComponentModal(obj);
    }
  }
}
