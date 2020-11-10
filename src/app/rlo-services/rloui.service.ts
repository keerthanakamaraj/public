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
import { ICustomSearchObject, IGeneralCardData } from '../Interface/masterInterface';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { RloCommonData } from './rloCommonData.service';
import { splitClasses } from '@angular/compiler';

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

  modalIconList = [
    { componentName: "CustomerDetails", iconClass: "icon-Customer-Details" },
    { componentName: "FamilyDetails", iconClass: "icon-Family-Details" },
    { componentName: "GoNoGoDetails", iconClass: "icon-No-Go-Details" },
    { componentName: "ReferrerDetails", iconClass: "icon-Referrer-Details" },
    { componentName: "CreditCardDetails", iconClass: "icon-Credit-Card-Details" },
    { componentName: "AddressDetails", iconClass: "icon-Address-Details" },
    { componentName: "LoanDetails", iconClass: "icon-Loan-Details" },
    { componentName: "PersonalInterviewDetails", iconClass: "icon-Personal-Interview-Details" },
    { componentName: "RmVisitDetails", iconClass: "icon-RM-Visit-Details" },
    { componentName: "Notes", iconClass: "icon-Notes" },
    { componentName: "ApplicationDetails", iconClass: "icon-Application-Details" },
    { componentName: "AmortizationScheduleComponent", iconClass: "icon-generate-amortization" },
    { componentName: "FeesChargesDetailsComponent", iconClass: "icon-fees-charges" },
    { componentName: "DisbursementDetailsComponent", iconClass: "icon-disbursement-details" },
    { componentName: "OccupationDetails", iconClass: "icon-Occupation-Details" },
    { componentName: "IncomeSummary", iconClass: "icon-Income-Summary" },
    { componentName: "LiabilityDetails", iconClass: "icon-Liability-Details" },
    { componentName: "AssetDetails", iconClass: "icon-Asset-Details" },
    { componentName: "FileUpload", iconClass: "icon-Asset-Details" },
    { componentName: "Amortization", iconClass: "icon-generate-amortization" },//called from UW->card-tile
    { componentName: "FeesAndChargesDetails", iconClass: "icon-fees-charges" },//called from UW->card-tile
    { componentName: "DisbursementDetails", iconClass: "icon-disbursement-details" },//called from UW->card-tile

    { componentName: "PropertyDetails", iconClass: "icon-property" },
    { componentName: "ObligationDetails", iconClass: "icon-Liability-Details" },
    { componentName: "PolicyCheckResults", iconClass: "icon-Policy-Check-Results" },
    { componentName: "ScorecardResults", iconClass: "icon-Scorecard-Results" },
    { componentName: "CustomerSearch", iconClass: "icon-Scorecard-Results" },
    { componentName: "DecisionAlert", iconClass: "icon-Scorecard-Results" }
  ];

  customerListDropDownArray: any = [];//used to show data of customerin dropdown.Used from UW to disbursment details modal
  //{id: "2952", text: "SHITAL JAIN"}

  customerDataDropDown: { id: string, text: string }[] = [];//used for score card and policy check in UW
  //{id: "A_2946", text: "Application"}{id: "C_3418", text: "B-SONU SOOD"}

  constructor(public http: ProvidehttpService, public translate: TranslateService, public httpProvider: Http, public modal: NgbModal, public router: Router, private locationRoute: Location) {
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
    this.http.fetchApi(this.tenantConfigAPI + '?t=' + new Date().getTime(), 'GET', undefined, this.serviceContext).subscribe(
      async (httpResponse: HttpResponse<any>) => {
        var tconfig = httpResponse.body ? httpResponse.body.TenantConfig : [];

        tconfig.forEach(element => {
          this.tenantconfig[element["TCName"]] = element["TCValue"];
        });
        console.log("tenantconfig ", this.tenantconfig, this.tenantconfig["language.default"]);

        // this.tenantconfig["language.default"] = "en-US";
        // this.tenantconfig["locale.default"] = "en-US";
        // this.tenantconfig["currency.code.default"] = "USD";

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
        localStorage.setItem("currency.code.default", this.tenantconfig["currency.code.default"]);
        localStorage.setItem("mob.default.country.code", this.tenantconfig["mob.default.country.code"]);
        localStorage.setItem("language.default", this.tenantconfig["language.default"]);




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

  getCurrencyChar(languageCode?: string, minFraction?, currency?: string) {
    if (!languageCode) { languageCode = this.getConfig("language.default", "en-IN"); }
    if (!currency) { currency = this.getConfig("currency.code.default", "INR"); }

    // default currency symbol at first element of array
    // return new Intl.NumberFormat(languageCode, { style: 'currency', currency: currency }).formatToParts(0)[0]['value'];
    return new Intl.NumberFormat(languageCode, { style: 'currency', currency: currency })
      .formatToParts(0)
      .filter(part => part.type == 'currency')
      .map(val => val.value)[0];
  }

  formatAmount(amount, languageCode?: string, minFraction?, currency?: string, hideSymbol?: boolean) {
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

    //OG
    // if (!languageCode) { languageCode = this.getConfig("language.default", "en-MU"); }
    // if (!currency) { currency = this.getConfig("currency.code.default", "MUR"); }

    // // return amt.toLocaleString(languageCode, { minimumFractionDigits: minFraction});
    // return new Intl.NumberFormat(languageCode, { style: 'currency', currency: currency }).formatToParts(amt).map(val => val.value).join('');

    if (!languageCode) { languageCode = this.getConfig("language.default", "en-US"); }
    if (!currency) { currency = this.getConfig("currency.code.default", "EUR"); }

    let val = new Intl.NumberFormat(languageCode, { style: 'currency', currency: currency }).formatToParts(amt);
    
    if (hideSymbol) {
      //val.splice(0,1);
      val = val.filter(part => part.type != 'currency');
    }
    let mapValue = val.map(val => val.value).join('')
    return mapValue;

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
      // console.log(modalObj);
      var onSuccessOrFailure = async (response) => {
        console.log(response);
        if (response === 0) {
          resolve(null);
        } else {
          resolve(response);
        }
      }

      this.modalObject = modalObj;//obj consumed in PopupAlertComponent

      //FOR TESTING
      //this.modalObject.iconClass = "icon-Family-Details";

      if (modalObj.hasOwnProperty('componentName')) {
        this.modalObject.iconClass = this.modalIconList.find(el => el.componentName == modalObj.componentName).iconClass + " header-icon";
      }
      const modalRef = this.modal.open(PopupAlertComponent, { windowClass: modalObj.modalSize });
      modalRef.result.then(onSuccessOrFailure, onSuccessOrFailure)
    });
    return promise;
  }

  closeAllConfirmationModal() {
    this.modal.dismissAll();
  }


  //used to open a modal containing component(underwriter -> card)
  openComponentModal(cardMetaData: IGeneralCardData) {
    // if (!cardMetaData.modalSectionName.length)
    //   return

    Promise.all([this.getAlertMessage('', cardMetaData.name)]).then(values => {
      console.log(values);
      let modalObj: IModalData = {
        title: values[0].includes("(") ? values[0].slice(0, values[0].lastIndexOf("(")) : values[0],
        mainMessage: undefined,
        modalSize: "modal-width-lg",
        buttons: [],
        componentName: cardMetaData.modalSectionName,
        data: "",
        applicationId: cardMetaData.applicationId,
        borrowerSeq: cardMetaData.borrowerSeq,
        componentCode: cardMetaData.componentCode
      }
      this.confirmationModal(modalObj).then((response) => {
        console.log(response);
        if (response != null) {
          if (response.id === 1) {
            this.closeAllConfirmationModal();
          }
        }
      });
    });
  }


  //called when user click on " < back " above header component
  goBack() {
    var mainMessage = this.getAlertMessage('rlo.cancel.comfirmation');
    var button1 = this.getAlertMessage('', 'OK');
    var button2 = this.getAlertMessage('', 'CANCEL');

    Promise.all([mainMessage, button1, button2]).then(values => {
      console.log(values);
      let modalObj = {
        title: "Alert",
        mainMessage: values[0],
        modalSize: "modal-width-sm",
        buttons: [
          { id: 1, text: values[1], type: "success", class: "btn-primary" },
          { id: 2, text: values[2], type: "failure", class: "btn-warning-outline" }
        ]
      }
      this.confirmationModal(modalObj).then((response) => {
        console.log(response);
        if (response != null) {
          if (response.id === 1) {
            this.locationRoute.back();
            //this.router.navigate(['home', 'LANDING']);
          }
        }
      });
    });
  }

  //opening file upload modal
  openFileUpload(ApplicationId) {
    let promise = new Promise<boolean>((resolve, reject) => {
      let modalObj: IModalData = {
        title: '',
        mainMessage: undefined,
        modalSize: 'modal-doc-upload-width',
        buttons: [],
        componentName: 'FileUpload',
        data: '',
        applicationId: Number(ApplicationId)
      };
      this.confirmationModal(modalObj).then((response) => {
        console.log(response);
        if (response != null) {
          if (response.id === 1) {
            this.closeAllConfirmationModal();
          }
        }
        resolve(true);
      });
    });
    return promise;
  }

  //customerSearch
  openCustomerSearch(customerSearchObject: ICustomSearchObject) {
    console.log(customerSearchObject);
    let obj: ICustomSearchObject = customerSearchObject;

    let promise = new Promise<boolean>((resolve, reject) => {
      let modalObj: IModalData = {
        title: '',
        mainMessage: undefined,
        modalSize: 'modal-customer-search-width',
        buttons: [],
        componentName: 'CustomerSearch',
        data: obj
      };
      this.confirmationModal(modalObj).then((response) => {
        console.log(response);
        if (response != null) {
          if (response.id === 1) {
            this.closeAllConfirmationModal();
          }
          resolve(response)
        }
        resolve(true);
      });
    });
    return promise;
  }
  openDecisionAlert(componentCode?) {
    let promise = new Promise<boolean>((resolve, reject) => {
      let modalObj: IModalData = {
        title: "Alert",
        mainMessage: undefined,
        modalSize: "modal-width-sm",
        buttons: [
          { id: 1, text: 'DONE', type: "success", class: "btn-primary" },
          { id: 2, text: 'CLOSE', type: "failure", class: "btn-warning-outline" }
        ],
        componentName: 'DecisionAlert',
        componentCode : componentCode
        // data: obj
      };
      this.confirmationModal(modalObj).then((response) => {
        console.log(response);
        if (response != null) {
          if (response.id === 1) {
            this.closeAllConfirmationModal();
          }
          resolve(response)
        }
        resolve(true);
      });
    });
    return promise;
  }
}
