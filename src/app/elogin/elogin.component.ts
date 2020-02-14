import { Component, OnInit } from '@angular/core';
import { Router} from "@angular/router";
import { ServiceStock } from '../service-stock.service';

@Component({
  selector: 'app-elogin',
  templateUrl: './elogin.component.html',
  styleUrls: ['./elogin.component.css']
})
export class EloginComponent implements OnInit {

  csrfValue: any;
  languages = [];
  selectedlang: string;

  constructor(private services: ServiceStock, private router: Router) {
  }

  username: String;
  password:String;
  Token:String;
  hasErrors_password: boolean = false;
  hasErrors_Token: boolean = false;
  unTooltipMsg: String;
  errorMsg: string;
  hasErrors: boolean = false;
  
  ngOnInit() {
  }

  username_onblur() {
	this.hasErrors = false;
    if (this.username == "" || this.username == undefined || this.username == null) {
      this.hasErrors = true;
      this.errorMsg = "ErrorCodes.MANDATORY";
      return;
    }else{
      return true;
    }
  }
  password_onblur() {
    this.hasErrors_password = false;
      if (this.password == "" || this.password == undefined || this.password == null) {
        this.hasErrors_password = true;
        this.errorMsg = "ErrorCodes.MANDATORY";
        return false;
      }else{
        return true;
      }
    }
    token_onblur(){
      this.hasErrors_Token = false;
      if (this.Token == "" || this.Token == undefined || this.Token == null) {
        this.hasErrors_Token = true;
        this.errorMsg = "ErrorCodes.MANDATORY";
        return false;
      }else{
        return true;
      }
    }
 

 async onLoginSubmit() {
    if(this.token_onblur() && this.password_onblur() && this.username_onblur()){
      this.username = this.username.toUpperCase();
      this.services.http.showSpinner();
      let inputMap = new Map();
      inputMap.set('Body.username' , this.username);
      inputMap.set('Body.password' , this.password);
      await this.services.http.UnAuthorizationfetchApi('/login', 'POST', inputMap).toPromise().then(
      async (res)=>{
          this.services.http.sessionValid = true;
          this.services.http.loggedIn = true;
          this.router.navigate(['/home' ,'LANDING']);
          sessionStorage.setItem('access_token', res['access_token'])
          this.services.http.hideSpinner();
        },
        error => {
          this.services.http.hideSpinner();
          this.services.alert.showAlert(2, "Invalid User Credentials");
        }
      );
    }
  }

 
  ShowPassword(ID){
    var x = <any>document.getElementById(ID);
    x.type = "text";
  }
  HidePassword(ID){
    var x = <any>document.getElementById(ID);
    x.type = "password";
  }
}
