import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header-status-card',
  templateUrl: './header-status-card.component.html',
  styleUrls: ['./header-status-card.component.css']
})
export class HeaderStatusCardComponent implements OnInit {

  @Input("statusData") statusData: any;
  
  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(){
    console.log(this.statusData);
  }

}
