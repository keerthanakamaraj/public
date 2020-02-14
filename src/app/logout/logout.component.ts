import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { ServiceStock } from '../service-stock.service';


@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit, OnDestroy {

  status : boolean = true;
  errorMessage : string;
  successMessage: string = "ErrorCodes.LOGOUT_SUCCESS";

  constructor(private location: Location, private services: ServiceStock) {
    this.location = location;
  }

  ngOnInit() {
    /*if(this.userDetails!=undefined && this.userDetails!=null){
      sessionStorage.removeItem("UserDetails");
      this.userDetails = undefined;
    }*/

	if (this.services.http.tfaapplet != undefined && this.services.http.tfaapplet!=null) {
      (window as any).logoutFromSmartCard(this.services.http.tfaapplet);
    }
	
    if(this.services.modal.hasOpenModals()){
      this.services.modal.dismissAll();
    }
	this.services.http.loggedIn = false;
	
    if (this.services.http.sessionValid) {
      this.status = true;
      this.services.http.showSpinner();
	  this.services.http.sessionValid = false;
      this.services.http.getElogoutAuthData().subscribe(
        data => {
          /* DECIDE WHERE TO ROUTE */
          let jstring = JSON.stringify(data);
          if (jstring.includes("SUCCESS")) {
          }
          else {
          }
          this.services.http.hideSpinner();
        },
        error => {
          this.services.http.hideSpinner();
        }
      );
    }else{
      var isPwdChgn = this.services.dataStore.getData("EPWDCHGN")
      if(isPwdChgn){
        this.status = true;
        this.successMessage = "ErrorCodes.passwordchangesuccess";
      }else{
        this.status = false;
        this.errorMessage = 'ErrorCodes.' + this.services.dataStore.formGenericData;
      }
      this.services.http.hideSpinner();
    }
    Object.keys(sessionStorage).forEach(key => {
      sessionStorage.removeItem(key);
    });
	
	//this.services.dataStore.formGenericData = undefined;
    this.services.dataStore.draftNo = undefined;
    this.services.dataStore.draftRemarks = undefined;
  }

  ngOnDestroy(){
    this.services.dataStore.setData("EPWDCHGN", false);
  }

  gotoLogin(){
    this.location.go('/login');
    location.reload();
  }
}
