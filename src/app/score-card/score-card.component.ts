import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-score-card',
  templateUrl: './score-card.component.html',
  styleUrls: ['./score-card.component.css']
})
export class ScoreCardComponent implements OnInit {

  constructor() { }

  scoreCards = [
    {
      type: "Final DBR",
      score: 50,
    },
    {
      type: "Final DBR",
      score: 50,
    },
    {
      type: "Final DBR",
      score: 50,
    }
  ];

  ngOnInit() {
  }

}
