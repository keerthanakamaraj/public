import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  constructor() { }

  custCode: string = sessionStorage.getItem("CUSTOMER_CODE");
  custName: string = sessionStorage.getItem("CUSTOMER_NAME");
  userId: string = sessionStorage.getItem("USER_ID");
  userName: string = sessionStorage.getItem("USER_NAME");
  branch: string = sessionStorage.getItem("CC_BRANCH");
  branchDesc: string = sessionStorage.getItem("CC_BRANCH_DEC");
  serviceBouquet: string = sessionStorage.getItem("USER_SERVICE_BOUQUET");
  serviceModel: string = sessionStorage.getItem("USER_SERVICE_MODEL");
  ngOnInit() {
  }

}
