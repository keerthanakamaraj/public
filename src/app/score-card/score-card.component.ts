import { Component, OnInit, Input } from '@angular/core';
import { ServiceStock } from '../service-stock.service';
import { HttpResponse } from '@angular/common/http';
import { IheaderScoreCard } from '../Interface/masterInterface';

@Component({
  selector: 'app-score-card',
  templateUrl: './score-card.component.html',
  styleUrls: ['./score-card.component.css']
})
export class ScoreCardComponent implements OnInit {

  @Input("scoreData") scoreData: IheaderScoreCard;
  @Input("layoutType") layoutType?: string = "horizontal";
  @Input("applicationId") applicationId?: any;

  showExpanded: boolean = false;
  scoreCards = [
    {
      type: "Final DBR",
      score: 54,
    },
    {
      type: "Policy Score",
      score: 36,
    },
    {
      type: "Application Score",
      score: 75,
    }
  ];

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
        //this.scoreData.score = 60;
        break;

      case "Policy Score":
        this.services.rloCommonData.invokeInterface(this.applicationId, "policyScore").then((response: any) => {
          console.log(response)
          if (response.ouputdata != undefined && response.ouputdata.OVERALLSCORE != undefined) {
            this.scoreData.score = response.ouputdata.OVERALLSCORE;
          }
        });

        break;

      case "Application Score":
        this.services.rloCommonData.invokeInterface(this.applicationId, "applicationScore").then((response: any) => {
          console.log(response);
          if (response.ouputdata != undefined && response.ouputdata.OVERALLSCORE != undefined) {
            this.scoreData.score = response.ouputdata.OVERALLSCORE;
          }
        });
        break;

      default:
        break;
    }
  }
}
