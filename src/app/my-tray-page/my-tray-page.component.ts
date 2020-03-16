import { Component, OnInit, ViewChild } from '@angular/core';
import { MyTrayGridComponent } from '../MyTrayGrid/MyTrayGrid.component';

@Component({
  selector: 'app-my-tray-page',
  templateUrl: './my-tray-page.component.html',
  styleUrls: ['./my-tray-page.component.css']
})
export class MyTrayPageComponent implements OnInit {
  @ViewChild('MY_TRAY_GRID', {static: false}) MY_TRAY_GRID: MyTrayGridComponent;
  // formcode: string;

  constructor() { }

  ngOnInit() {
    // this.formcode = 'MyTrayPage'
  }

}
