import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-status-indicator',
  templateUrl: './status-indicator.component.html',
  styleUrls: ['./status-indicator.component.css']
})
export class StatusIndicatorComponent implements OnInit {

  @Input() iconType: "basic" | "icon" | "iconStatus" | "statusCount";
  //icon -> used in header-status(UW),address card (UW)
  //statusCount => used in go/no go card(UW)
  //basic -> used in interface result card(UW), DDE interface result
  @Input() status: string;//deviation,completed,pending

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    console.log(this.iconType, this.status);
  }

}
