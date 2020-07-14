import { Component, OnInit } from '@angular/core';
import { ServiceStock } from '../service-stock.service';

@Component({
  selector: 'app-score-card-result',
  templateUrl: './score-card-result.component.html',
 // styleUrls: ['./score-card-result.component.css']
})
export class ScoreCardResultComponent implements OnInit {

  showExpanded: boolean = false;
  scoreCards = [
    {
      type: "Final DBR",
      score: 90,
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
