import { Injectable } from '@angular/core';
import { ProvidehttpService } from '../providehttp.service';
import { HttpResponse } from '@angular/common/http';
import { retry } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { map } from "rxjs/operators";
import { Http } from '@angular/http';
import { IModalData } from '../popup-alert/popup-interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PopupAlertComponent } from '../popup-alert/popup-alert.component';

export var errorMap;

@Injectable({
  providedIn: 'root'
})
export class RlouiService {

  private serviceContext: string = "/ui";

  private tenantConfigAPI: string = "/TenantConfig";
  tenantconfig: any = {};

  private fieldvalidationAPI: string = "/UiFieldValidation";
  private fieldValidations: any = {};

  private formFieldAPI: string = "/UiField";
  private formFields: any = {};

  modalObject: IModalData;//used when call a modal-> type=alert (initiation)

  constructor(public http: ProvidehttpService, public translate: TranslateService, public httpProvider: Http, public modal: NgbModal) {
    console.log("UI Service .. constructor --------------------------------");

    // this.getJSON().subscribe(data => {
    //   errorMap = data['ErrorCodes'];
    // }, error => { });

    // TODO: initialize on startup and call after login
    this.loadUiConfigs();
  }

  loadUiConfigs() {

    this.loadTenantConfig();

  }

  private loadTenantConfig() {
    this.http.fetchApi(this.tenantConfigAPI, 'GET', undefined, this.serviceContext).subscribe(
      async (httpResponse: HttpResponse<any>) => {
        var tconfig = httpResponse.body ? httpResponse.body.TenantConfig : [];

        tconfig.forEach(element => {
          this.tenantconfig[element["TCName"]] = element["TCValue"];
        });
        console.log("tenantconfig ", this.tenantconfig, this.tenantconfig["language.default"]);
        //this.tenantconfig["language.default"] = "bh-BH";
        this.translate.setDefaultLang('En');

        // switch (this.tenantconfig["language.default"]) {
        //   case "en-IN":
        //     this.translate.use('En');
        //     this.http.currentLanguage = 'En';
        //     break;

        //   case "bh-BH":
        //     this.translate.use('bh');
        //     this.http.currentLanguage = 'bh';
        //     break;

        //   default:
        //     break;
        // }

        this.loadValidations();
        this.loadFormFields();
        this.getJSON("En").subscribe(data => {
          errorMap = data['ErrorCodes'];
        }, error => { });

      },
      async (httpError) => {
        var err = httpError['error']
        if (err != null && err['ErrorElementPath'] != undefined && err['ErrorDescription'] != undefined) {
          // this.services.alert.showAlert(3, 'Unable to save form!', 5000);
        }
      }
    );
  }

  public getJSON(lan: string): Observable<any> {
    const url = window.location.origin + window.location.pathname + "assets/i18n/" + lan + ".json";
    return this.httpProvider.get(url).pipe(map((res: any) => res.json()));
  }

  private loadValidations() {
    if (this.tenantconfig["ui.validation.version"] == localStorage.getItem("ui.validation.version")) {
      try {
        this.fieldValidations = JSON.parse(localStorage.getItem("ui.validations"));
        console.log("Loading cached validations .. v", localStorage.getItem("ui.validation.version"));
        return;
      } catch (e) {
        console.log("Error Loading cached validations ", e);
      }
    }


    this.http.fetchApi(this.fieldvalidationAPI, 'GET', undefined, this.serviceContext).subscribe(
      async (httpResponse: HttpResponse<any>) => {
        var validations = httpResponse.body ? httpResponse.body.UiFieldValidation : [];
        // console.log("res ", validations);

        validations.forEach(element => {
          this.fieldValidations[element.V] = element;
        });
        //console.log("validations ", this.fieldValidations);
        localStorage.setItem("ui.validations", JSON.stringify(this.fieldValidations));
        localStorage.setItem("ui.validation.version", this.tenantconfig["ui.validation.version"]);
      },
      async (httpError) => {
        var err = httpError['error']
        if (err != null && err['ErrorElementPath'] != undefined && err['ErrorDescription'] != undefined) {
          // this.services.alert.showAlert(3, 'Unable to save form!', 5000);
        }
      }
    );
  }

  private loadFormFields() {
    if (this.tenantconfig["ui.fields.version"] == localStorage.getItem("ui.fields.version")) {
      try {
        this.formFields = JSON.parse(localStorage.getItem("ui.formfields"));
        console.log("Loading cached Form Fields .. v", localStorage.getItem("ui.fields.version"));
        return;
      } catch (e) {
        console.log("Error Loading cached validations ", e);
      }
    }

    this.http.fetchApi(this.formFieldAPI, 'GET', undefined, this.serviceContext).subscribe(
      async (httpResponse: HttpResponse<any>) => {
        var fields = httpResponse.body ? httpResponse.body.UiField : [];
        // console.log("fields ", fields);

        fields.forEach(element => {
          if (!this.formFields[element["F"]]) { // check for form already added
            this.formFields[element["F"]] = [];
          }
          this.formFields[element["F"]].push(element);
        });
        //console.log("form fields ", this.formFields);

        localStorage.setItem("ui.formfields", JSON.stringify(this.formFields));
        localStorage.setItem("ui.fields.version", this.tenantconfig["ui.fields.version"]);
      },
      async (httpError) => {
        var err = httpError['error']
        if (err != null && err['ErrorElementPath'] != undefined && err['ErrorDescription'] != undefined) {
          // this.services.alert.showAlert(3, 'Unable to save form!', 5000);
        }
      }
    );
  }

  getFormFields(formName: string): [] {
    return this.formFields[formName];
  }

  getValidation(validation: string) {
    return this.fieldValidations[validation];
  }

  getConfig(configName: string, defaultValue?: string) {
    return this.tenantconfig[configName] ? this.tenantconfig[configName] : defaultValue;
  }

  // TODO: Add optional parameter to format
  formatText(text: string) {
    const formatOption = this.getConfig('name.format.default', 'UPPER');

    switch (formatOption) {
      case 'UPPER': return text.toUpperCase();
      case 'CAMEL': return this.convertToCamelCase(text);
      default: return text;
    }
  }

  convertToCamelCase(text: string) {
    return text.toLowerCase().replace(/(?:^|\s)[a-z]/g, function (m) {
      return m.toUpperCase();
    });
  }

  formatAmount(amount, languageCode: string, minFraction, currency: string) {
    // console.log("Format Amount " , amount);
    let amt: number;
    if (typeof amount == "string") {
      try {
        amt = Number(amount);
      } catch (e) {
        return amount;
      }
    } else if (typeof amount == "number") {
      amt = amount
    } else {
      console.warn("Unexpected Amount Type");
      return amount;
    }

    if (!languageCode) { languageCode = this.getConfig("language.default", "en-IN"); }
    if (!currency) { currency = this.getConfig("currency.code.default", "INR"); }

    // return amt.toLocaleString(languageCode, { minimumFractionDigits: minFraction});
    return new Intl.NumberFormat(languageCode, { style: 'currency', currency: currency }).formatToParts(amt).map(val => val.value).join('');
  }

  // TODO: Check Type of date and format accordingly
  formatDateTime(date) {
    var languageCode = this.getConfig("language.default", "en-IN");
    var options = { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric" };
    try {
      var dt = new Date(date)
      return new Intl.DateTimeFormat(languageCode, options).format(dt);
    } catch (e) {
      console.log("error formatting date", date);
      return date;
    }
  }

  // TODO: Check Type of date and format accordingly
  formatDate(date) {
    var languageCode = this.getConfig("language.default", "INR");
    var options = { year: "numeric", month: "numeric", day: "numeric" };
    try {
      var dt = new Date(date);
      return new Intl.DateTimeFormat(languageCode, options).format(dt);
    } catch (e) {
      console.log("error formatting date", date);
      return date;
    }
  }

  async getAlertMessage(alertMsg: string, customErrorMsg: string = "") {
    var customeMsg = "";
    if (customErrorMsg.length) {
      return customErrorMsg;
    } else {
      getCode(alertMsg);
      return customeMsg;
    }
    function getCode(alertMsg) {
      if (errorMap[alertMsg]) {
        customeMsg = errorMap[alertMsg]
      }
      else {
        let keyArray = alertMsg.split(".");
        keyArray.pop();
        var newKey = "";
        keyArray.forEach(ele => {
          let node = ele + "."
          newKey += node;
        });
        getCode(newKey.slice(0, newKey.lastIndexOf(".")))
      }
    }
  }

  getCustomMsg(jsonMsg: string, customMsg: string = "") {
    let promise = new Promise<any>((resolve, reject) => {

    });
    return promise;
  }

  confirmationModal(modalObj: IModalData) {
    let promise = new Promise<any>((resolve, reject) => {
      console.log(event);
      var onSuccessOrFailure = async (response) => {
        console.log(response);
        if (response === 0) {
          resolve(null);
        } else {
          resolve(response);
        }
      }

      this.modalObject = modalObj;
      const modalRef = this.modal.open(PopupAlertComponent, { windowClass: modalObj.modalSize });
      modalRef.result.then(onSuccessOrFailure, onSuccessOrFailure)
    });
    return promise;
  }
}
