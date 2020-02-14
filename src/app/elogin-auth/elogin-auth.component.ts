import { Component, OnInit, Inject } from '@angular/core';
import { ProvidehttpService } from '../providehttp.service';
import { Router, ActivatedRoute } from "@angular/router";
import { UserDetails } from '../userDetails';
import { DomSanitizer } from '@angular/platform-browser';
import { Data } from '../DataService';
import * as shajs from 'sha.js';
import { RoutingService } from '../routing-service';
import { ServiceStock } from '../service-stock.service';

@Component({
  selector: 'app-elogin-auth',
  templateUrl: './elogin-auth.component.html',
  styleUrls: ['./elogin-auth.component.css']
})



export class EloginAuthComponent implements OnInit {


  username: string;
  password: string;
  languages: String[] = ["English"];
  selectedlang: String = "English";
  loginAuth: number;
  tfaEncodedValue: string;
  tfaValue: string;
  tfaReq: boolean = false;
  csrfValue: any;

  errorMsg: string;
  hasErrors: boolean = false;

  passwordInputType: string = 'password';

  togglePasswordDisplay(){
    this.passwordInputType = this.passwordInputType == 'password'? 'text': 'password';
  }


  constructor(private services: ServiceStock, private router: Router) {
    // let id;
    // this.route.params.subscribe(
    //   params => id = params['username']
    // );
    let id = sessionStorage.getItem('USER_ID');
    this.username = id;
    this.tfaValue = id;
    this.loginAuth = 1;
    this.services.http.tfaMessage = id;
    // this.loadScript('../eBanking/assets/js/2FAVerification.js');
    this.services.http.showSpinner();
    this.services.http.resetLoginForm('ELOGINAUTH').subscribe((res) => {
      if (res) {
        let status = res['Status'];
        if (status == 'S') {
          this.csrfValue = res['_CSRF'];
        } else {
          this.services.http.sessionValid = false;
          this.services.dataStore.formGenericData = res['error'];
          this.router.navigate(['/logout']);
        }
        this.services.http.hideSpinner();
      }
    });
  }

  ngOnInit() {

    //   this.loadScript('../eBanking/assets/js/2FAVerification.js');
    if (sessionStorage.getItem("TFA_REQ") == "1") {
      this.loginAuth = 1;
      this.tfaReq = true;
    } else {
      this.loginAuth = 2;
      this.tfaReq = false;
    }
  }

  onLoginSubmit() {
    if(this.password=="" || this.password==undefined || this.password==null){
      this.hasErrors = true;
      this.errorMsg = "ErrorCodes.MANDATORY";
      return;
    }
    this.services.http.showSpinner();
    //this.services.http.getEloginAuthData(this.username).subscribe(
    // <!-- Changes Start by Gogulanadhan M-->
    console.log(this.tfaReq);
    if (this.tfaReq) {
      //document.getElementById("2FA").style.display = "block";
      if (this.loginAuth == 1) {
        document.getElementById("2FA").style.display = "block";
		(window as any).loginToSmartCard((window as any).getApplet());
        this.loginAuth += 1;
      } else if (document.getElementById("tfaStatus").getAttribute('value') == "1" && document.getElementById("tfaEncodedValue").getAttribute('value') != undefined) {
        this.services.http.tfaapplet = (window as any).getApplet();
        let json = {};
        json['userID'] = this.username;
        json['password'] = this.password;
        json['tfaValue'] = this.tfaValue;

        let tfaEncodedValue = this.tfaEncodedValue == undefined ?
          document.getElementById("tfaEncodedValue").getAttribute("value") :
          this.tfaEncodedValue;
        json['tfaEncodedValue'] = tfaEncodedValue;
        this.login(json);
      }else{
        this.services.http.sessionValid = false;
        this.services.dataStore.formGenericData = "eToken Validation Failed";
        this.router.navigate(['/logout']);
      }
    } else {
      let json = {};
      json['userID'] = this.username;
      this.login(json);
    }
  }

  public loadScript(url: string) {
    const body = <HTMLDivElement>document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }

  public login(json) {
    //let value = JSON.stringify(json);
    // <!-- Changes Finished by Gogulanadhan M-->
    var hashedPassword = new shajs.sha256().update(this.password).digest('hex');//sha256_digest($$("password").value);
    var hashedUserID = new shajs.sha256().update(hashedPassword.toString() + this.username).digest('hex');
    var hashedSalt = new shajs.sha256().update(hashedUserID.toString() + sessionStorage.getItem('PASSWORD_SALT')).digest('hex');
    var hashedDetail = new shajs.sha256().update(hashedSalt.toString() + sessionStorage.getItem('RANDOM_SALT')).digest('hex');
    json['hashedPassword'] = hashedDetail;
    this.services.http.submitLoginForm('ELOGINAUTH', this.csrfValue, json).subscribe(
      (data) => {
        var respData = data as any;
        if (data['Status'] == 'S') {

          Object.keys(sessionStorage).forEach(key => {
            sessionStorage.removeItem(key);
          });

          let userDetails: UserDetails = {};

          for (var key in respData) {
            userDetails[key] = respData[key];
            sessionStorage.setItem(key, respData[key]);
            //console.log(key + ":" + respData[key]);
          }

          sessionStorage.setItem("UserDetails", JSON.stringify(userDetails));

		  this.services.http.loggedIn = true;
          if(sessionStorage.getItem('PASSWORD_RESET') == '1'){
            let map = new Map();
            map.set('SOURCE', 'FPWDCHANGE');
            this.services.dataStore.setData(this.services.routing.currModal, map);
            this.router.navigate(['EPWDCHGN']);
          }else{
            this.router.navigate(['/home', "alpha"]);
          }
          this.services.http.hideSpinner();
        } else {
          this.services.http.sessionValid = false;
          this.services.dataStore.formGenericData = data['error'];
          this.router.navigate(['/logout']);
        }
      }
    );
  }
  
  password_blur(){
  if(this.password=="" || this.password==undefined || this.password==null){
    this.hasErrors = true;
    this.errorMsg = "ErrorCodes.MANDATORY";
    return;
  }
}

}

