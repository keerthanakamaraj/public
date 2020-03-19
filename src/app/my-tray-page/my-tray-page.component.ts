import { Component, OnInit, ViewChild } from '@angular/core';
import { MyTrayFormComponent } from '../MyTrayForm/MyTrayForm.component';

@Component({
  selector: 'app-my-tray-page',
  templateUrl: './my-tray-page.component.html',
  styleUrls: ['./my-tray-page.component.css']
})
export class MyTrayPageComponent implements OnInit {
  @ViewChild('MY_TRAY_FORM', {static: false}) MY_TRAY_FORM: MyTrayFormComponent;
  // formcode: string;

  constructor() { }

  ngOnInit() {
    // this.formcode = 'MyTrayPage'
  }

}
