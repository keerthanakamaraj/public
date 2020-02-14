import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as shajs from 'sha.js';
import { ServiceStock } from '../service-stock.service';

@Component({
  selector: 'app-pwd-change',
  templateUrl: './pwd-change.component.html',
  styleUrls: ['./pwd-change.component.css']
})
export class PwdChangeComponent implements OnInit {

  username: string;
  oldpwd: string;
  newpwd: string;
  cnfpwd: string;
  csrfValue: any;
  formCode: string;
  randomSalt: string;

  oldPwdInputType: string = "password";
  newPwdInputType: string = "password";
  cnfPwdInputType: string = "password";

  newPwdError: boolean = false;
  oldPwdError: boolean = false;
  cnfPwdError: boolean = false;
  oldPwdErrorMsg: string;
  newPwdErrorMsg: string;
  cnfPwdErrorMsg: string;
  newPwdErrorParam : string;

  minLength: number;
  minAlpha: number;
  minNumeric: number;
  minSpecial: number;
  readonly ALPHA_STRING: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  readonly NUMERIC_STRING: string = '0123456789';
  readonly SPECIAL_CHARACTERS_STRING: string = '<=:`[?;,\\^_}@>.)"(\'$#*%~-/&!]{|+';

  forcePwdChange = false;

  constructor(private services: ServiceStock,private router: Router) {
    if (this.services.dataStore.getData(this.services.routing.currModal)) {
      let map = this.services.dataStore.getData(this.services.routing.currModal);
      if (map.get('SOURCE') == 'FPWDCHANGE') {
        this.forcePwdChange = true;
        this.formCode = 'EFORCEPWDCHGN';
      }else{
        this.forcePwdChange = false;
        this.formCode = 'EPWDCHGN';
      }
    }else{
      this.formCode = 'EPWDCHGN';
    }
    

    this.services.http.showSpinner();
    // this.services.http.resetLoginForm(this.formCode).subscribe((res) => {
    //   if (res) {
    //     let status = res['Status'];
    //     if (status == 'S') {
    //       this.csrfValue = res['_CSRF'];
    //       this.randomSalt = res['RANDOM_SALT'];
    //     } else {
    //       this.services.http.sessionValid = false;
    //       this.services.dataStore.formGenericData = res['error'];
    //       this.router.navigate(['/logout']);
    //     }
    //     this.services.http.hideSpinner();
    //   }
    // });

    this.minLength = +sessionStorage.getItem("MIN_PWD_LEN");
    this.minAlpha = +sessionStorage.getItem("MIN_PWD_ALPHA");
    this.minNumeric = +sessionStorage.getItem("MIN_PWD_NUM");
    this.minSpecial = +sessionStorage.getItem("MIN_PWD_SPECIAL");
    this.username = sessionStorage.getItem("USER_ID");
  }

  ngOnInit() {

  }

  checkPasswordCriteria() {
    var alphaCount = 0;
    var numericCount = 0;
    var specialCount = 0;
    var w_char = null;
    this.oldPwdError = this.newPwdError = this.cnfPwdError = false;
    this.oldPwdErrorMsg = this.oldPwdErrorMsg = this.cnfPwdErrorMsg = "";
    var isValid = true;
    if (this.oldpwd == null || this.oldpwd == "") {
      this.oldPwdError = true;
      this.oldPwdErrorMsg = "ErrorCodes.MANDATORY";
      isValid = false;
    }

    if (this.newpwd != null && this.newpwd != undefined) {
      for (var i = 0; i < this.newpwd.length; ++i) {
        w_char = this.newpwd.charAt(i);
        if (this.ALPHA_STRING.indexOf(w_char) >= 0) {
          alphaCount++;
        } else if (this.NUMERIC_STRING.indexOf(w_char) >= 0) {
          numericCount++;
        } else if (this.SPECIAL_CHARACTERS_STRING.indexOf(w_char) >= 0) {
          specialCount++;
        }
      }
    }

    if (this.newpwd == null || this.newpwd == "") {
      this.newPwdError = true;
      this.newPwdErrorMsg = "ErrorCodes.MANDATORY";
      this.newPwdErrorParam = "{}";
      isValid = false;
    } else if (this.newpwd.length < this.minLength) {
      this.newPwdError = true;
      this.newPwdErrorMsg = "ErrorCodes.PWD_MIN_CHAR";
      this.newPwdErrorParam = "{minChar : '" + this.minLength + "'}";
      isValid = false;
    } else if (alphaCount < this.minAlpha) {
      this.newPwdError = true;
      this.newPwdErrorMsg = "ErrorCodes.PWD_MIN_ALPHA";
      this.newPwdErrorParam = "{minAlpha : '" + this.minAlpha + "'}";
      isValid = false;
    } else if (numericCount < this.minNumeric) {
      this.newPwdError = true;
      this.newPwdErrorMsg = "ErrorCodes.PWD_MIN_NUM";
      this.newPwdErrorParam = "{minNumeric : '" + this.minNumeric + "'}";
      isValid = false;
    } else if (specialCount < this.minSpecial) {
      this.newPwdError = true;
      this.newPwdErrorMsg = "ErrorCodes.PWD_MIN_SPECIAL";
      this.newPwdErrorParam = "{minSpecial : '" + this.minSpecial + "'}";
      isValid = false;
    } else if (this.newpwd == this.oldpwd) {
      this.newPwdError = true;
      this.newPwdErrorMsg = "ErrorCodes.OLD_PASSWORD";
      this.newPwdErrorParam = "{}";
      isValid = false;
    }

    if(this.cnfpwd == null || this.cnfpwd == ""){
      this.cnfPwdError = true;
      this.cnfPwdErrorMsg = "ErrorCodes.MANDATORY";
      isValid = false;
    }else if (this.newpwd != this.cnfpwd) {
      this.cnfPwdError = true;
      this.cnfPwdErrorMsg = "ErrorCodes.MATCH_PASSWORD";
      isValid = false;
    }

    return isValid;
  }

  async onSubmit() {
    if (!this.checkPasswordCriteria()) {
      return;
    }

    this.services.http.showSpinner();
    let value = {};

    var newPwdHashed = new shajs.sha256().update(this.newpwd).digest('hex');//sha256_digest($$("password").value);
    var newPwdHashedUserID = new shajs.sha256().update(newPwdHashed.toString() + this.username).digest('hex');

    var oldPwdHashed = new shajs.sha256().update(this.oldpwd).digest('hex');//sha256_digest($$("password").value);
    var oldPwdHashedUserID = new shajs.sha256().update(oldPwdHashed.toString() + this.username).digest('hex');
    var oldPwdHashedSalt = new shajs.sha256().update(oldPwdHashedUserID.toString() + sessionStorage.getItem('PASSWORD_SALT')).digest('hex');
    var oldPwdHashedDetail = new shajs.sha256().update(oldPwdHashedSalt.toString() + this.randomSalt).digest('hex');

    value['newPassword'] = this.newpwd;
    value['oldPasswordHashed'] = oldPwdHashedDetail;
    value['newPasswordHashed'] = newPwdHashedUserID;

    // this.services.http.submitLoginForm(this.formCode, this.csrfValue, value).subscribe(
    //   data => {
    //     if (data['Status'] == 'S') {
    //       this.services.http.sessionValid = false;
    //       this.services.dataStore.setData("EPWDCHGN", true);
    //       this.router.navigate(['/logout']);
    //     } else {
    //       var errmsg = data['ERR_MSG'];
    //       var error = data['error'];
    //       if (errmsg.indexOf("Old") >= 0) {
    //         this.oldPwdError = true;
    //         this.oldPwdErrorMsg = 'ErrorCodes.' + error;
    //       } else {
    //         this.newPwdError = true;
    //         this.newPwdErrorMsg = 'ErrorCodes.' + error;
    //         this.newPwdErrorParam = "{}";
    //       }
    //     }
    //     this.services.http.hideSpinner();
    //   },
    //   error => {
    //     console.log(error);
    //     this.services.http.hideSpinner();
    //   }
    // );
  }

  oldpwd_blur(){
    this.oldPwdError = false;
    if (this.oldpwd == null || this.oldpwd == "") {
      this.oldPwdError = true;
      this.oldPwdErrorMsg = "ErrorCode.MANDATORY";
    }
  }

  newpwd_blur(){
    this.newPwdError = false;
    if (this.newpwd == null || this.newpwd == "") {
      this.newPwdError = true;
      this.newPwdErrorMsg = "ErrorCode.MANDATORY";
    }
  }

  cnfpwd_blur(){
    this.cnfPwdError = false;
    if (this.cnfpwd == null || this.cnfpwd == "") {
      this.cnfPwdError = true;
      this.cnfPwdErrorMsg = "ErrorCode.MANDATORY";
    }
  }
}
