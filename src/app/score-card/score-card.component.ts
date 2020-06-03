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
    if (windowScroll >= 280) {
      this.showExpanded = true;
    } else if (windowScroll < 60) {
      this.showExpanded = false;
    }
  }

  showExpanded: boolean = false;

  constructor() { }

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

  ngOnInit() {
  }

}
