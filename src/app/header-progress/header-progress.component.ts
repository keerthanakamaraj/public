import { Component, OnInit, Input } from '@angular/core';
import { ServiceStock } from '../service-stock.service';

@Component({
  selector: 'app-header-progress',
  templateUrl: './header-progress.component.html',
  styleUrls: ['./header-progress.component.css']
})
export class HeaderProgressComponent implements OnInit {

  @Input() progressPercentage: number = 0;

  showExpandedHeader: boolean = true; //expanded-1,collapsed-0
  showExpanded: boolean = false;

  constructor(public services: ServiceStock) { }

  ngOnInit() {}

  headerChanges(data) {
    console.log(data);
    if (data.scrollExceded) {
      this.showExpanded = data.scrollExceded;
    }
    else {
      this.showExpanded = false;
    }
  }

  public update(count: number) {
    this.progressPercentage = count;
  }

}
