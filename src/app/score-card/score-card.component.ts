import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-score-card',
  templateUrl: './score-card.component.html',
  styleUrls: ['./score-card.component.css']
})
export class ScoreCardComponent implements OnInit {

  @HostListener('window:scroll', ['$event'])
  handleScroll() {
    let windowScroll = window.pageYOffset;
    if (windowScroll >= 100) {
      this.showExpanded = false;
    } else if (windowScroll < 80) {
      this.showExpanded = true;
    }
  }

  showExpanded: boolean = false;

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
