import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-status-indicator',
  templateUrl: './status-indicator.component.html',
  styleUrls: ['./status-indicator.component.css']
})
export class StatusIndicatorComponent implements OnInit {

  @Input() iconType: "basic" | "icon" | "iconStatus" | "statusCount";
  @Input() status: string;//deviation,completed,pending

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    console.log(this.iconType, this.status);
  }

}
