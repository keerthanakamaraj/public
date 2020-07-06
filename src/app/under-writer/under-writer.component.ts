import { Component, OnInit } from '@angular/core';
import{UWCustomerListComponent}from '../UWCustomerList/UWCustomerList.component';
@Component({
  selector: 'app-under-writer',
  templateUrl: './under-writer.component.html',
  styleUrls: ['./under-writer.component.css']
})
export class UnderWriterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  customizedJsonData = [
    {}
  ];

}
