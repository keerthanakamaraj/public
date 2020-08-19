import { Component, OnInit, Input } from '@angular/core';
import { ServiceStock } from '../service-stock.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-score-card',
  templateUrl: './score-card.component.html',
  styleUrls: ['./score-card.component.css']
})
export class ScoreCardComponent implements OnInit {

  @Input("scoreData") scoreData: any;
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
    console.log(this.scoreData);

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
}
