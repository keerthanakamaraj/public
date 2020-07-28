import { Component, OnInit, Input } from '@angular/core';
import { ServiceStock } from '../service-stock.service';

@Component({
  selector: 'app-score-card',
  templateUrl: './score-card.component.html',
  styleUrls: ['./score-card.component.css']
})
export class ScoreCardComponent implements OnInit {

  @Input("scoreData") scoreData: any;
  @Input("layoutType") layoutType?: string = "horizontal";

  showExpanded: boolean = false;
  scoreCards = [
    {
      type: "Final DBR",
      score: 54,
    },
    {
      type: "Fire Policy",
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
}
