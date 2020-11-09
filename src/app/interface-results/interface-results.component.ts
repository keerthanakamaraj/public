import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-interface-results',
  templateUrl: './interface-results.component.html',
  styleUrls: ['./interface-results.component.css']
})
export class InterfaceResultsComponent implements OnInit {

  testJson = [
    {
    CustomerType: "B",
    FullName: "Tim cook",
    data: [
      { type: "internal interface", name: "PAN", status: 'favourable' },
      { type: "external interface", name: "watchout", status: 'favourable' },
      { type: "internal interface", name: "CIBIL", status: 'nonfavourable' },
      { type: "external interface", name: "Google", status: 'favourable' },
      { type: "internal interface", name: "AMLOCK", status: 'favourable' }
    ]
  },
  {
    CustomerType: "CB",
    FullName: "Ron cook",
    data: [
      { type: "internal interface", name: "PAN", status: 'favourable' },
      { type: "external interface", name: "watchout", status: 'favourable' },
      { type: "internal interface", name: "CIBIL", status: 'nonfavourable' },
      { type: "external interface", name: "Google", status: 'favourable' },
      { type: "internal interface", name: "AMLOCK", status: 'favourable' }
    ]
  }
]

  constructor() { }

  ngOnInit() {
  }

}
