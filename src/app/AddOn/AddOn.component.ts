import { Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import { AddOnModel } from './AddOn.model';
import { ComboBoxComponent } from '../combo-box/combo-box.component';
import { TextBoxComponent } from '../text-box/text-box.component';
import { TextAreaComponent } from '../text-area/text-area.component';
import { CheckBoxComponent } from '../check-box/check-box.component';
import { HiddenComponent } from '../hidden/hidden.component';
import { FileuploadComponent } from '../fileupload/fileupload.component';
import { DateComponent } from '../date/date.component';
import { ButtonComponent } from '../button/button.component';
import { AmountComponent } from '../amount/amount.component';
import { FormComponent } from '../form/form.component';
// import { ToggleSwitchComponent } from '../toggle-switch/toggle-switch.component';
// import { RangeBarComponent } from '../range-bar/range-bar.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PopupModalComponent } from '../popup-modal/popup-modal.component';
import { ServiceStock } from '../service-stock.service';
import { LabelComponent } from '../label/label.component';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { SearchCustomerGridComponent } from '../SearchCustomerGrid/SearchCustomerGrid.component';
import { RLOUIRadioComponent } from '../rlo-ui-radio/rlo-ui-radio.component';
import { CustomerSearchFieldsComponent } from '../customer-search-fields/customer-search-fields.component';
import { ICustomSearchObject } from '../Interface/masterInterface';
import { RloUiMobileComponent } from '../rlo-ui-mobile/rlo-ui-mobile.component';
import { Data } from '../DataService';
import { Subscription } from 'rxjs';
// import { PasswordComponent } from '../password/password.component';
// import { RadioButtonComponent } from '../radio-button/radio-button.component';

const customCss: string = '';

@Component({
  selector: 'app-AddOn',
  templateUrl: './AddOn.component.html'
})
export class AddOnComponent extends FormComponent implements OnInit, AfterViewInit {
  @ViewChild('SearchFormGrid', { static: false }) SearchFormGrid: SearchCustomerGridComponent;
  @ViewChild('search_Type', { static: false }) search_Type: RLOUIRadioComponent;
  @ViewChild('custSearchFields', { static: false }) custSearchFields: CustomerSearchFieldsComponent;
  @ViewChild('ADD_CARD_CUST_TYPE', { static: false }) ADD_CARD_CUST_TYPE: RLOUIRadioComponent;
  @ViewChild('ADD_CUSTOMER_ID', { static: false }) ADD_CUSTOMER_ID: TextBoxComponent;
  @ViewChild('ADD_STAFF_ID', { static: false }) ADD_STAFF_ID: TextBoxComponent;
  @ViewChild('ADD_TITLE', { static: false }) ADD_TITLE: TextBoxComponent;
  @ViewChild('ADD_FIRST_NAME', { static: false }) ADD_FIRST_NAME: TextBoxComponent;
  @ViewChild('ADD_MIDDLE_NAME', { static: false }) ADD_MIDDLE_NAME: TextBoxComponent;
  @ViewChild('ADD_THIRD_NAME', { static: false }) ADD_THIRD_NAME: TextBoxComponent;
  @ViewChild('ADD_LAST_NAME', { static: false }) ADD_LAST_NAME: TextBoxComponent;
  @ViewChild('ADD_FULL_NAME', { static: false }) ADD_FULL_NAME: TextBoxComponent;
  @ViewChild('ADD_GENDER', { static: false }) ADD_GENDER: TextBoxComponent;
  @ViewChild('ADD_TAX_ID', { static: false }) ADD_TAX_ID: TextBoxComponent;
  @ViewChild('ADD_MOBILE', { static: false }) ADD_MOBILE: RloUiMobileComponent;
  @ViewChild('ADD_DOB', { static: false }) ADD_DOB: DateComponent;
  @ViewChild('ADD_EMAIL_ID', { static: false }) ADD_EMAIL_ID: TextBoxComponent;
  @ViewChild('ADD_CIF', { static: false }) ADD_CIF: TextBoxComponent;
  @ViewChild('SUBMIT_MAIN_BTN', { static: false }) SUBMIT_MAIN_BTN: ButtonComponent;
  @ViewChild('CANCEL_MAIN_BTN', { static: false }) CANCEL_MAIN_BTN: ButtonComponent;
  @ViewChild('ADD_ApplicantType', { static: false }) ADD_ApplicantType: TextBoxComponent;
  @ViewChild('HidAppId', { static: false }) HidAppId: HiddenComponent;
  @ViewChild('HidAppType', { static: false }) HidAppType: HiddenComponent;
  @ViewChild('ADD_CurrentCardLimit', { static: false }) ADD_CurrentCardLimit: TextBoxComponent;
  @ViewChild('ADD_MaskedCardNumber', { static: false }) ADD_MaskedCardNumber: TextBoxComponent;
  @ViewChild('ADD_AvailableLimit', { static: false }) ADD_AvailableLimit: TextBoxComponent;
  @ViewChild('ADD_REGISTERED_NAME', { static: false }) ADD_REGISTERED_NAME: TextBoxComponent;
  @ViewChild('ADD_TYPE_OF_INCORPORATION', { static: false }) ADD_TYPE_OF_INCORPORATION: TextBoxComponent;
  @ViewChild('ADD_DATE_OF_INCORPORATION', { static: false }) ADD_DATE_OF_INCORPORATION: TextBoxComponent;
  borrower: any;
  borrowericif: any;
  icif: any;
  getRoute: any;
  tempVar: any;
  selectedCardDetailsModalSubscription: Subscription;
  parentData: ICustomSearchObject = {
    'cifId': undefined,
    'mobileNumber': undefined,
    'searchType': 'External',
    'taxId': undefined
  };
  gridData: any;
  hidForm: boolean = true;
  cardInfo: any;
  async revalidate(): Promise<number> {
    var totalErrors = 0;
    super.beforeRevalidate();
    await Promise.all([
    ]).then((errorCounts) => {
      errorCounts.forEach((errorCount) => {
        totalErrors += errorCount;
      });
    });
    this.errors = totalErrors;
    super.afterRevalidate();
    return totalErrors;
  }
  constructor(services: ServiceStock) {
    super(services);
    this.value = new AddOnModel();
    this.componentCode = 'AddOn';
    this.selectedCardDetailsModalSubscription = this.services.rloCommonData.selectedCardDetailsSubject.subscribe(data => {
      console.warn("DEEP | selectedCardDetailsModalSubscription", data);
      let obj = {
        'currentCardLimit': data.PrimaryCardLimit,
        'maskedCardNumber': data.PrimaryCardNumber,
        'availableLimit': data.AvailableLimit
      }
      this.setCardRelatedData(obj);
    });
  }

  setReadOnly(readOnly) {
    super.setBasicFieldsReadOnly(readOnly);
  }
  async onFormLoad() {
    this.setInputs(this.services.dataStore.getData(this.services.routing.currModal));
    this.HidAppId.setValue('RLO');
    this.HidAppType.setValue('L_Enhancement');

    this.setDependencies();

    // this.setDataFields();
  }
  setInputs(param: any) {
    let params = this.services.http.mapToJson(param);
    if (params['mode']) {
      this.mode = params['mode'];
    }
  }
  async submitForm(path, apiCode, serviceCode) {
    this.submitData['formName'] = 'AddOn';
    await super.submit(path, apiCode, serviceCode);
  }
  getFieldInfo() {
    this.amountComponent.forEach(field => { this.additionalInfo[field.fieldID + '_desc'] = field.getFieldInfo(); });
    this.comboFields.forEach(field => { this.additionalInfo[field.fieldID + '_desc'] = field.getFieldInfo(); });
    this.fileUploadFields.forEach(field => { this.additionalInfo[field.fieldID + '_desc'] = field.getFieldInfo(); });
    return this.additionalInfo;
  }
  getFieldValue() {
    return this.value;
  }
  setValue(inputValue, inputDesc = undefined) {
    this.setBasicFieldsValue(inputValue, inputDesc);
    this.value = new AddOnModel();
    this.value.setValue(inputValue);
    this.setDependencies();
    this.passNewValue(this.value);
  }
  ngOnInit() {
    if (this.formCode == undefined) { this.formCode = 'AddOn'; }
    if (this.formOnLoadError) { return; }
    var styleElement = document.createElement('style');
    styleElement.type = 'text/css';
    styleElement.innerHTML = customCss;
    styleElement.id = 'AddOn_customCss';
    document.getElementsByTagName('head')[0].appendChild(styleElement);
    this.services.rloCommonData.getCurrentRoute();
    console.log("route", this.services.rloCommonData.currentRoute);
  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    var styleElement = document.getElementById('AddOn_customCss');
    styleElement.parentNode.removeChild(styleElement);
    this.selectedCardDetailsModalSubscription.unsubscribe();
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.subsBFldsValueUpdates();
      this.onFormLoad();
      this.checkForHTabOverFlow();
    });
    this.custSearchFields.parentData = this.parentData;
    console.log("kjgjh", this.parentData);

    console.log(this.readOnly);

    if (this.readOnly) {
      this.setReadOnly(this.readOnly);
    }
  }
  clearError() {
    super.clearBasicFieldsError();
    super.clearHTabErrors();
    super.clearVTabErrors();
    this.errors = 0;
    this.errorMessage = [];
  }
  onReset() {
    super.resetBasicFields();
    this.clearHTabErrors();
    this.clearVTabErrors();
    this.errors = 0;
    this.errorMessage = [];
    this.additionalInfo = undefined;
    this.dependencyMap.clear();
    this.value = new AddOnModel();
    this.passNewValue(this.value);
    this.setReadOnly(false);
    this.onFormLoad();
  }
  fieldDependencies = {
    ADD_ApplicantType: {
      inDep: [

        { paramKey: "VALUE1", depFieldID: "ADD_ApplicantType", paramType: "PathParam" },
        { paramKey: "APPID", depFieldID: "HidAppId", paramType: "QueryParam" },
        { paramKey: "KEY1", depFieldID: "HidAppType", paramType: "QueryParam" },
      ],
      outDep: [
      ]
    },
  }

  //event passed from searchCustomerGrid.ts -> customer-search-fields.ts -> AddOn.ts 
  selectedCustomer(data) {
    console.log(data);
    console.log("DEEP | selectedCustomer() Event");
    console.log("hidForm", this.hidForm);

    // JUHI :: check this condition the form does not get visible
    // if (this.cardInfo != null) {
    //   this.hidForm = false;
    // }

    //JUHI :: clearing the card details section Bcoz not all section has card details.



    this.tempVar = data;
    if (this.services.rloCommonData.currentRoute == 'AddOn') {
      if (this.tempVar.CustomerType !== 'C') {
        this.services.alert.showAlert(2, 'rlo.error.Customertype.invalid', 4000);
        this.hidForm = true;
        return;
      }
    }
    this.hidForm = false;

    if (this.tempVar.CustomerType == 'C') {
      // this.services.alert.showAlert(2, 'rlo.error.Customertype.invalid', -1);
      setTimeout(() => {
        this.HideFieldBasedOnCorporate();
        this.clearCardDetails();
        this.setCoroporateFields(data)
        this.setCoropDisabled();
      }, 500);
    }
    else {
      setTimeout(() => {
        this.HideFieldBasedOnCorporate();
        this.clearCardDetails();
        this.setDataFields(data);
        this.setHTabDisabled();
      }, 500);
    }
  }
  setCoropDisabled() {
    this.ADD_CUSTOMER_ID.setReadOnly(true);
    this.ADD_TITLE.setReadOnly(true);
    this.ADD_TAX_ID.setReadOnly(true);
    this.ADD_MOBILE.setReadOnly(true);
    this.ADD_EMAIL_ID.setReadOnly(true);
    this.ADD_CIF.setReadOnly(true);
    this.ADD_ApplicantType.setReadOnly(true);
    this.ADD_MaskedCardNumber.setReadOnly(true);
    this.ADD_CurrentCardLimit.setReadOnly(true);
    this.ADD_AvailableLimit.setReadOnly(true);
    this.ADD_REGISTERED_NAME.setReadOnly(true);
    this.ADD_DATE_OF_INCORPORATION.setReadOnly(true);
    this.ADD_TYPE_OF_INCORPORATION.setReadOnly(true);
  }
  setHTabDisabled() {
    this.ADD_CUSTOMER_ID.setReadOnly(true);
    this.ADD_FIRST_NAME.setReadOnly(true);
    this.ADD_LAST_NAME.setReadOnly(true);
    this.ADD_MIDDLE_NAME.setReadOnly(true);
    this.ADD_FULL_NAME.setReadOnly(true);
    this.ADD_GENDER.setReadOnly(true);
    this.ADD_TITLE.setReadOnly(true);
    this.ADD_MOBILE.setReadOnly(true);
    this.ADD_DOB.setReadOnly(true);
    this.ADD_TAX_ID.setReadOnly(true);
    this.ADD_EMAIL_ID.setReadOnly(true);
    this.ADD_CIF.setReadOnly(true);
    this.ADD_ApplicantType.setReadOnly(true);
    this.ADD_MaskedCardNumber.setReadOnly(true);
    this.ADD_CurrentCardLimit.setReadOnly(true);
    this.ADD_AvailableLimit.setReadOnly(true);
  }
  setCoroporateFields(data) {
    this.tempVar = data;
    this.ADD_CIF.setValue(this.tempVar['cif']);
    this.ADD_TAX_ID.setValue(this.tempVar['taxId']);
    // if(tempVar.gender == 'F' ){
    // this.ADD_GENDER.setValue('Female');
    // }
    // else if(tempVar.gender == 'M'){
    //   this.ADD_GENDER.setValue('Male');
    // }
    // this.ADD_GENDER.setValue(this.tempVar['gender']);
    this.ADD_TITLE.setValue(this.tempVar['title']);
    this.ADD_MOBILE.setValue(this.tempVar['mobileNum']);
    this.ADD_CUSTOMER_ID.setValue(this.tempVar['icif']);
    this.ADD_EMAIL_ID.setValue(this.tempVar['emailid']);
    this.ADD_ApplicantType.setValue('Limit Enhancement');
    this.ADD_REGISTERED_NAME.setValue(this.tempVar.registeredName);
    this.ADD_DATE_OF_INCORPORATION.setValue(this.tempVar.dateOfIncorporation);
    this.ADD_TYPE_OF_INCORPORATION.setValue(this.tempVar.typeOfIncorporation);
  }
  setDataFields(data) {
    this.tempVar = data;

    this.ADD_DOB.setValue(this.tempVar['dob']);
    this.ADD_TAX_ID.setValue(this.tempVar['taxId']);
    this.ADD_FULL_NAME.setValue(this.tempVar['custName']);
    this.ADD_MOBILE.setValue(this.tempVar['mobileNum']);
    this.ADD_CIF.setValue(this.tempVar['cif']);
    this.ADD_FIRST_NAME.setValue(this.tempVar['firsName']);
    this.ADD_MIDDLE_NAME.setValue(this.tempVar['midName']);
    this.ADD_LAST_NAME.setValue(this.tempVar['lastName']);
    if (this.tempVar.gender == 'F') {
      this.ADD_GENDER.setValue('Female');
    }
    else if (this.tempVar.gender == 'M') {
      this.ADD_GENDER.setValue('Male');
    }
    // this.ADD_GENDER.setValue(this.tempVar['gender']);
    this.ADD_TITLE.setValue(this.tempVar['title']);
    this.ADD_CUSTOMER_ID.setValue(this.tempVar['icif']);
    this.ADD_EMAIL_ID.setValue(this.tempVar['emailid']);
    this.ADD_ApplicantType.setValue('Limit Enhancement');

  }

  //set values specifically for "Card Details" section
  setCardRelatedData(cardData) {
    this.ADD_MaskedCardNumber.setValue(cardData.maskedCardNumber);
    this.ADD_CurrentCardLimit.setValue(cardData.currentCardLimit);
    this.ADD_AvailableLimit.setValue(cardData.availableLimit);
  }

  async clear_click(event) {
    let inputMap = new Map();
    this.onReset();
    this.hidForm = true;
  }

  async CANCEL_MAIN_BTN_click(event) {
    // var title = this.services.rloui.getAlertMessage('rlo.error.invalid.regex');
    var mainMessage = this.services.rloui.getAlertMessage('rlo.cancel.comfirmation');
    var button1 = this.services.rloui.getAlertMessage('', 'OK');
    var button2 = this.services.rloui.getAlertMessage('', 'CANCEL');

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

      console.log("deep ===", modalObj);
      this.services.rloui.confirmationModal(modalObj).then((response) => {
        console.log(response);
        if (response != null) {
          if (response.id === 1) {
            this.services.router.navigate(['home', 'LANDING']);
          }
        }
      });
    });
  }

  async SUBMIT_MAIN_BTN_click(event) {
    if (this.services.rloCommonData.currentRoute == 'AddOn') {
      this.ADD_ON_click(event);
    }
    else if (this.services.rloCommonData.currentRoute == 'LimitEnhancement') {
      this.Limit_click(event);
    }
  }

  async Limit_click(event) {
    // this.SUBMIT_MAIN_BTN.setDisabled(true);
    let inputMap = new Map();

    // if (this.EligibilityDecision != 'Reject') {
    //   this.EligibilityDecision = 'Approve';
    // }
    var noofErrors: number = await this.revalidate();
    // var borrowercheck = this.Handler.getBorrowerPostData();
    // for (let i = 0; i < borrowercheck.length; i++) {
    //   if (borrowercheck[i]['CustomerType'] == 'B') {
    //     this.borrower = true
    //     break;
    //   }
    // }
    if (noofErrors == 0) {
      //   let countLoanOwnership = this.Handler.aggregateLoanOwnerShip();
      //   if (this.BAD_PROD_CAT.getFieldValue() !== 'CC' && countLoanOwnership < 100) {
      //     this.services.alert.showAlert(2, 'rlo.error.loanownership.invalid', -1);
      //     return;
      //   }
      inputMap.clear();


      inputMap.set('HeaderParam.tenant-id', 'SB1');
      inputMap.set('HeaderParam.user-id', 'Vishal');

      inputMap.set('Body.LoanDetails.Decision', 'Approve');

      inputMap.set('Body.BorrowerDetails.CIF', this.ADD_CIF.getFieldValue());
      inputMap.set('Body.BorrowerDetails.FirstName', this.ADD_FIRST_NAME.getFieldValue());
      inputMap.set('Body.BorrowerDetails.MiddleName', this.ADD_MIDDLE_NAME.getFieldValue());
      inputMap.set('Body.BorrowerDetails.LastName', this.ADD_LAST_NAME.getFieldValue());
      inputMap.set('Body.BorrowerDetails.FullName', this.ADD_FULL_NAME.getFieldValue());
      inputMap.set('Body.BorrowerDetails.Title', this.ADD_TITLE.getFieldValue());
      if (this.ADD_GENDER.getFieldValue() == 'Female') {
        inputMap.set('Body.BorrowerDetails.Gender', 'F');
      }
      else if (this.ADD_GENDER.getFieldValue() == 'Male') {
        inputMap.set('Body.BorrowerDetails.Gender', 'M');
      }

      inputMap.set('Body.BorrowerDetails.TaxID', this.ADD_TAX_ID.getFieldValue());
      // inputMap.set('Body.BorrowerDetails.LastName', this.ADD_CUSTOMER_ID.getFieldValue());
      inputMap.set('Body.BorrowerDetails.Email', this.ADD_EMAIL_ID.getFieldValue());
      inputMap.set('Body.BorrowerDetails.MobileNo', this.ADD_MOBILE.getFieldValue());
      inputMap.set('Body.BorrowerDetails.DOB', this.ADD_DOB.getFieldValue());
      inputMap.set('Body.BorrowerDetails.RegisteredName', this.ADD_REGISTERED_NAME.getFieldValue());
      inputMap.set('Body.BorrowerDetails.TypeOfIncorporation', this.ADD_TYPE_OF_INCORPORATION.getFieldValue());
      inputMap.set('Body.BorrowerDetails.DateOfIncorporation', this.ADD_DATE_OF_INCORPORATION.getFieldValue());
      inputMap.set('HeaderParam.user-id', sessionStorage.getItem('userId'));
      inputMap.set('Body.ApplicationDetails.SourcingChannel', 'BRANCH');
      inputMap.set('Body.ApplicationDetails.DSACode', 'JUHI');
      inputMap.set('Body.ApplicationDetails.ApplicationInfo.CreatedOn', '4-1-2021');
      inputMap.set('Body.LoanDetails.Product', 'VISA');
      inputMap.set('Body.LoanDetails.ProductCategory', 'CC');
      inputMap.set('Body.LoanDetails.SubProduct', 'CI');
      inputMap.set('Body.LoanDetails.Scheme', '25508');
      inputMap.set('Body.LoanDetails.TypeOfLoan', 'CC');
      inputMap.set('Body.LoanDetails.TypeOfLoanName', 'Credit Card');
      inputMap.set('Body.LoanDetails.ApplicationPurpose', 'TRAVEL');
      // inputMap.set('Body.ApplicationDetails.ApplicationInfo.PhysicalFormNo', this.BAD_PHYSICAL_FRM_NO.getFieldValue());
      inputMap.set('Body.ApplicationDetails.ApplicationBranch', '101');
      // inputMap.set('Body.ApplicationDetails.RequestedCardLimit', '20000');
      inputMap.set('Body.ApplicationDetails.CurrentCardLimit', this.ADD_AvailableLimit.getFieldValue());
      inputMap.set('Body.ApplicationDetails.MaskedCardNumber', '75674646');
      inputMap.set('Body.ApplicationDetails.AvailableLimit', this.ADD_AvailableLimit.getFieldValue());
      // inputMap.set('Body.ApplicationDetails.ExistingCardNumber', '5366575777777777');
      inputMap.set('Body.ApplicationDetails.ExistingCardType', 'ICNP');
      inputMap.set('Body.ApplicationDetails.CustomerType', this.tempVar.CustomerType);
      inputMap.set('Body.BorrowerDetails.CustomerType', 'B');
      inputMap.set('Body.ApplicationDetails.CAMType', 'LE');

      this.services.http.fetchApi('/v1/proposal/initiate/limit-Enhancement', 'POST', inputMap, '/initiation').subscribe(
        async (httpResponse: HttpResponse<any>) => {
          var res = httpResponse.body;
          for (let i = 0; i < res.Data.length; i++) {
            const CustData = res.Data[i];
            if (CustData.CustomerType == 'B') {
              this.borrowericif = CustData.ICIFNumber
            }
            this.icif = CustData.ICIFNumber;
          }
          var successmessage = "Proposal " + res.ApplicationReferenceNumber + " Submitted Successfully";
          //  var title = this.services.rloui.getAlertMessage('');
          var mainMessage = this.services.rloui.getAlertMessage('', successmessage);
          var button1 = this.services.rloui.getAlertMessage('', 'OK');
          Promise.all([mainMessage, button1]).then(values => {
            console.log(values);
            let modalObj = {
              title: "Alert",
              mainMessage: values[0],
              modalSize: "modal-width-sm",
              buttons: [
                { id: 1, text: values[1], type: "success", class: "btn-primary" },
              ]
            }

            this.services.rloui.confirmationModal(modalObj).then((response) => {
              console.log(response);
              if (response != null) {
                if (response.id === 1) {
                  this.services.router.navigate(['home', 'LANDING']);
                }
              }
            });
          });


          inputMap = new Map();
          this.onReset();
          // this.SUBMIT_MAIN_BTN.setDisabled(false);

        },
        async (httpError) => {
          var err = httpError['error']
          if (err != null && err['ErrorElementPath'] != undefined && err['ErrorDescription'] != undefined) {

          }
          Promise.all([this.services.rloui.getAlertMessage('', 'Unable to save form!'), this.services.rloui.getAlertMessage('', 'OK')]).then(values => {
            console.log(values);
            let modalObj = {
              title: "Alert",
              mainMessage: values[0],
              modalSize: "modal-width-sm",
              buttons: [
                { id: 1, text: values[1], type: "success", class: "btn-primary" },
              ]
            }
            this.services.rloui.confirmationModal(modalObj).then((response) => {
              console.log(response);
              if (response != null) {
                if (response.id === 1) {
                  this.services.rloui.closeAllConfirmationModal();
                }
              }
            });
          });
          // this.SUBMIT_MAIN_BTN.setDisabled(false);
        }
      );


    }
    else {
      this.services.alert.showAlert(2, 'rlo.error.invalid.form', -1);
      // this.SUBMIT_MAIN_BTN.setDisabled(false);

    }
  }
  async ADD_ON_click(event) {
    // this.SUBMIT_MAIN_BTN.setDisabled(true);
    let inputMap = new Map();

    // if (this.EligibilityDecision != 'Reject') {
    //   this.EligibilityDecision = 'Approve';
    // }
    var noofErrors: number = await this.revalidate();

    if (noofErrors == 0) {
      //   let countLoanOwnership = this.Handler.aggregateLoanOwnerShip();
      //   if (this.BAD_PROD_CAT.getFieldValue() !== 'CC' && countLoanOwnership < 100) {
      //     this.services.alert.showAlert(2, 'rlo.error.loanownership.invalid', -1);
      //     return;
      //   }
      inputMap.clear();


      inputMap.set('HeaderParam.tenant-id', 'SB1');
      inputMap.set('HeaderParam.user-id', 'Vishal');

      inputMap.set('Body.LoanDetails.Decision', 'Approve');
      inputMap.set('Body.BorrowerDetails.CIF', this.ADD_CIF.getFieldValue());
      inputMap.set('Body.BorrowerDetails.FirstName', this.ADD_FIRST_NAME.getFieldValue());
      inputMap.set('Body.BorrowerDetails.MiddleName', this.ADD_MIDDLE_NAME.getFieldValue());
      inputMap.set('Body.BorrowerDetails.LastName', this.ADD_LAST_NAME.getFieldValue());
      inputMap.set('Body.BorrowerDetails.FullName', this.ADD_FULL_NAME.getFieldValue());
      inputMap.set('Body.BorrowerDetails.Title', this.ADD_TITLE.getFieldValue());
      if (this.ADD_GENDER.getFieldValue() == 'Female') {
        inputMap.set('Body.BorrowerDetails.Gender', 'F');
      }
      else if (this.ADD_GENDER.getFieldValue() == 'Male') {
        inputMap.set('Body.BorrowerDetails.Gender', 'M');
      }
      inputMap.set('Body.BorrowerDetails.TaxID', this.ADD_TAX_ID.getFieldValue());
      // inputMap.set('Body.BorrowerDetails.LastName', this.ADD_CUSTOMER_ID.getFieldValue());
      inputMap.set('Body.BorrowerDetails.Email', this.ADD_EMAIL_ID.getFieldValue());
      inputMap.set('Body.BorrowerDetails.MobileNo', this.ADD_MOBILE.getFieldValue());
      inputMap.set('Body.BorrowerDetails.DOB', this.ADD_DOB.getFieldValue());
      inputMap.set('Body.BorrowerDetails.RegisteredName', this.ADD_REGISTERED_NAME.getFieldValue());
      inputMap.set('Body.BorrowerDetails.TypeOfIncorporation', this.ADD_TYPE_OF_INCORPORATION.getFieldValue());
      inputMap.set('Body.BorrowerDetails.DateOfIncorporation', this.ADD_DATE_OF_INCORPORATION.getFieldValue());
      inputMap.set('HeaderParam.user-id', sessionStorage.getItem('userId'));
      inputMap.set('Body.ApplicationDetails.SourcingChannel', 'BRANCH');
      inputMap.set('Body.ApplicationDetails.DSACode', 'JUHI');
      inputMap.set('Body.ApplicationDetails.ApplicationInfo.CreatedOn', '4-1-2021');
      inputMap.set('Body.LoanDetails.Product', 'VISA');
      inputMap.set('Body.LoanDetails.ProductCategory', 'CC');
      inputMap.set('Body.LoanDetails.SubProduct', 'CI');
      inputMap.set('Body.LoanDetails.Scheme', '25508');
      inputMap.set('Body.LoanDetails.TypeOfLoan', 'CC');
      inputMap.set('Body.LoanDetails.TypeOfLoanName', 'Credit Card');
      inputMap.set('Body.LoanDetails.ApplicationPurpose', 'TRAVEL');
      // inputMap.set('Body.ApplicationDetails.ApplicationInfo.PhysicalFormNo', this.BAD_PHYSICAL_FRM_NO.getFieldValue());
      inputMap.set('Body.ApplicationDetails.ApplicationBranch', '101');
      // inputMap.set('Body.ApplicationDetails.RequestedCardLimit', '20000');
      inputMap.set('Body.ApplicationDetails.CurrentCardLimit', this.ADD_AvailableLimit.getFieldValue());
      inputMap.set('Body.ApplicationDetails.MaskedCardNumber', '677567');
      inputMap.set('Body.ApplicationDetails.AvailableLimit', this.ADD_AvailableLimit.getFieldValue());
      // inputMap.set('Body.ApplicationDetails.ExistingCardNumber', '5366575777777777');
      inputMap.set('Body.ApplicationDetails.ExistingCardType', 'ICNP');
      inputMap.set('Body.ApplicationDetails.CustomerType', this.tempVar.CustomerType);
      inputMap.set('Body.BorrowerDetails.CustomerType', 'A');
      inputMap.set('Body.ApplicationDetails.CAMType', 'MEMC');

      this.services.http.fetchApi('/v1/proposal/initiate/member-card', 'POST', inputMap, '/initiation').subscribe(
        async (httpResponse: HttpResponse<any>) => {
          var res = httpResponse.body;
          for (let i = 0; i < res.Data.length; i++) {
            const CustData = res.Data[i];
            if (CustData.CustomerType == 'B') {
              this.borrowericif = CustData.ICIFNumber
            }
            this.icif = CustData.ICIFNumber;
          }
          var successmessage = "Proposal " + res.ApplicationReferenceNumber + " Submitted Successfully";
          //  var title = this.services.rloui.getAlertMessage('');
          var mainMessage = this.services.rloui.getAlertMessage('', successmessage);
          var button1 = this.services.rloui.getAlertMessage('', 'OK');
          Promise.all([mainMessage, button1]).then(values => {
            console.log(values);
            let modalObj = {
              title: "Alert",
              mainMessage: values[0],
              modalSize: "modal-width-sm",
              buttons: [
                { id: 1, text: values[1], type: "success", class: "btn-primary" },
              ]
            }

            this.services.rloui.confirmationModal(modalObj).then((response) => {
              console.log(response);
              if (response != null) {
                if (response.id === 1) {
                  this.services.router.navigate(['home', 'LANDING']);
                }
              }
            });
          });


          inputMap = new Map();
          this.onReset();
          // this.SUBMIT_MAIN_BTN.setDisabled(false);

        },
        async (httpError) => {
          var err = httpError['error']
          if (err != null && err['ErrorElementPath'] != undefined && err['ErrorDescription'] != undefined) {

          }
          Promise.all([this.services.rloui.getAlertMessage('', 'Unable to save form!'), this.services.rloui.getAlertMessage('', 'OK')]).then(values => {
            console.log(values);
            let modalObj = {
              title: "Alert",
              mainMessage: values[0],
              modalSize: "modal-width-sm",
              buttons: [
                { id: 1, text: values[1], type: "success", class: "btn-primary" },
              ]
            }
            this.services.rloui.confirmationModal(modalObj).then((response) => {
              console.log(response);
              if (response != null) {
                if (response.id === 1) {
                  this.services.rloui.closeAllConfirmationModal();
                }
              }
            });
          });
          // this.SUBMIT_MAIN_BTN.setDisabled(false);
        }
      );


    }
    else {
      this.services.alert.showAlert(2, 'rlo.error.invalid.form', -1);
      // this.SUBMIT_MAIN_BTN.setDisabled(false);

    }
  }

  //JUHI :: add code to clear only the three section of card details
  //clear card details section
  clearCardDetails() {
    console.warn("clearCardDetails()")
    this.ADD_CurrentCardLimit.onReset();
    this.ADD_AvailableLimit.onReset();
    this.ADD_MaskedCardNumber.onReset();
  }

  HideFieldBasedOnCorporate() {
    if (this.tempVar.CustomerType == 'C') {
      this.ADD_REGISTERED_NAME.setHidden(false);
      this.ADD_TYPE_OF_INCORPORATION.setHidden(false);
      this.ADD_DATE_OF_INCORPORATION.setHidden(false);
      this.ADD_FIRST_NAME.setHidden(true);
      this.ADD_MIDDLE_NAME.setHidden(true);
      this.ADD_LAST_NAME.setHidden(true);
      this.ADD_DOB.setHidden(true);
      this.ADD_FULL_NAME.setHidden(true);
      this.ADD_GENDER.setHidden(true);
      // this.ADD_FIRST_NAME.setValue(undefined);
      // this.ADD_MIDDLE_NAME.setValue(undefined);
      // this.ADD_LAST_NAME.setValue(undefined);
      // this.ADD_DOB.setValue(undefined);
      // this.ADD_FULL_NAME.setValue(undefined);
      // this.ADD_GENDER.setValue(undefined);
      // this.ADD_STAFF_ID.setHidden(true);
      this.ADD_CurrentCardLimit.setHidden(false);
      this.ADD_AvailableLimit.setHidden(false);
      this.ADD_MaskedCardNumber.setHidden(false);
    }
    else {
      this.ADD_REGISTERED_NAME.setHidden(true);
      this.ADD_TYPE_OF_INCORPORATION.setHidden(true);
      this.ADD_DATE_OF_INCORPORATION.setHidden(true);
      this.ADD_FIRST_NAME.setHidden(false);
      this.ADD_MIDDLE_NAME.setHidden(false);
      this.ADD_LAST_NAME.setHidden(false);
      this.ADD_DOB.setHidden(false);
      this.ADD_FULL_NAME.setHidden(false);
      this.ADD_GENDER.setHidden(false);
      // this.ADD_REGISTERED_NAME.setValue(undefined);
      // this.ADD_TYPE_OF_INCORPORATION.setValue(undefined);
      // this.ADD_DATE_OF_INCORPORATION.setValue(undefined);
      this.ADD_CurrentCardLimit.setHidden(false);
      this.ADD_AvailableLimit.setHidden(false);
      this.ADD_MaskedCardNumber.setHidden(false);
    }

  }

}