import { Component, OnInit, HostListener } from '@angular/core';
import { ServiceStock } from '../service-stock.service';

@Component({
  selector: 'app-score-card',
  templateUrl: './score-card.component.html',
  styleUrls: ['./score-card.component.css']
})
export class ScoreCardComponent implements OnInit {

  @HostListener('window:scroll', ['$event'])
  handleScroll() {
    let windowScroll = window.pageYOffset;
    this.scrollPosition = windowScroll;
    if (windowScroll >= 280) {
      this.showExpanded = true;
    } else if (windowScroll < 60) {
      if (!this.showExpandedHeader) {
        this.showExpanded = true;
      } else {
        this.showExpanded = false;
      }
    }
  }

  showExpandedHeader: boolean = true; //expanded-1,collapsed-0
  showExpanded: boolean = false;
  scrollPosition: number = 0;

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

  ngOnInit() {
    this.services.rloCommonData.headerState.subscribe((data) => {
      if (!data) {
        window.scrollBy(0, 5);
        window.scrollTo(0, 2);
      }
      else {
        let pos = Number(this.scrollPosition);
        console.log(typeof (pos), typeof (this.scrollPosition))
        window.scrollBy(0, 5);
        window.scrollTo(0, pos);
      }
      this.showExpandedHeader = data;
      this.showExpanded = data;
    })
  }

  ngOnDestroy() {
    this.services.rloCommonData.headerState.unsubscribe();
  }

}
