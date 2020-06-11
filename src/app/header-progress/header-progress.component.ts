import { Component, OnInit, HostListener, Input } from '@angular/core';
import { ServiceStock } from '../service-stock.service';

@Component({
  selector: 'app-header-progress',
  templateUrl: './header-progress.component.html',
  styleUrls: ['./header-progress.component.css']
})
export class HeaderProgressComponent implements OnInit {

  @HostListener('window:scroll', ['$event'])
  handleScroll() {
    let windowScroll = window.pageYOffset;
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

  @Input() progressPercentage: number = 0;

  showExpandedHeader: boolean = true; //expanded-1,collapsed-0
  showExpanded: boolean = false;

  constructor(public services: ServiceStock) { }

  ngOnInit() {
    this.services.rloCommonData.headerState.subscribe((data) => {
      this.showExpandedHeader = data;
      this.showExpanded = data;
    })
  }

  public update(count: number) {
    this.progressPercentage = count;
  }

  ngOnDestroy() {
    this.services.rloCommonData.headerState.unsubscribe();
  }

}
