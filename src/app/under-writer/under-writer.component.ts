import { Component, OnInit } from '@angular/core';
import{UWCustomerTabComponent}from '../uw-cust-tab/uw-cust-tab.component';
@Component({
  selector: 'app-under-writer',
  templateUrl: './under-writer.component.html',
  styleUrls: ['./under-writer.component.css']
})
export class UnderWriterComponent implements OnInit {

  customizedJsonData = [
    {
      sectionName: "customer",
      fullName: "Sulaiman Neville",
      existingCustomer: true,
      dob: "23 Mar 1991"
    },
    {
      sectionName: "interfaceResults",
      customer: [
        {
          name: "Vishal karan Kotwal",
          internalResults: [
            { watchOut: true }, { PAN: true }
          ],
          externalResults: [
            { watchOut: true }, { PAN: true }
          ],
        },
        {
          name: "Darshan karan Kotwal",
          internalResults: [
            { watchOut: true }, { PAN: true }
          ],
          externalResults: [
            { watchOut: true }, { PAN: true }
          ],
        }
      ]
    },
    {
      sectionName: "financialSummary",
      totalIncome: 10000,
      totalLiability: 10000,
      totalAsstValue: 20000,
    },
    {
      sectionName: "collateralDetails",
      type: "house",
      collateernalName: "",
      amount: 20000,
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
