

import { Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import { QDEModel } from './QDE.model';
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
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PopupModalComponent } from '../popup-modal/popup-modal.component';
import { ServiceStock } from '../service-stock.service';
import { LabelComponent } from '../label/label.component';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { HeaderComponent } from '../Header/Header.component';
import { CustomerGridDTLSComponent } from '../CustomerGridDTLS/CustomerGridDTLS.component';
import { CustomerDtlsComponent } from '../CustomerDtls/CustomerDtls.component';
import { QDEHandlerComponent } from '../QDE/QDE-handler.component';
import { RloUiAccordionComponent } from '../rlo-ui-accordion/rlo-ui-accordion.component';
import { AddressDetailsComponent } from '../AddressDetails/AddressDetails.component';
import { OccupationDtlsFormComponent } from '../OccupationDtlsForm/OccupationDtlsForm.component';
import { ReferralDetailsFormComponent } from '../ReferralDetailsForm/ReferralDetailsForm.component';
import { ApplicationDtlsComponent } from '../ApplicationDtls/ApplicationDtls.component';
import { NotepadDetailsFormComponent } from '../NotepadDetailsForm/NotepadDetailsForm.component';
import { Subscription } from 'rxjs';
import { array } from '@amcharts/amcharts4/core';
// import {CUSTOMERHANDLERComponent} from '../customer-handler/customer-handler.component';


const customCss: string = '';

@Component({
  selector: 'app-QDE',
  templateUrl: './QDE.component.html'
})
export class QDEComponent extends FormComponent implements OnInit, AfterViewInit {
  @ViewChild('HEADER', { static: false }) HEADER: HeaderComponent;
  @ViewChild('FieldId_9', { static: false }) FieldId_9: CustomerGridDTLSComponent;
  @ViewChild('CUSTOMER_DETAILS', { static: false }) CUSTOMER_DETAILS: CustomerDtlsComponent;
  @ViewChild('FieldId_6', { static: false }) FieldId_6: AddressDetailsComponent;
  @ViewChild('FieldId_5', { static: false }) FieldId_5: OccupationDtlsFormComponent;
  @ViewChild('FieldId_10', { static: false }) FieldId_10: ReferralDetailsFormComponent;
  // @ViewChild('Referrer_Grid', { static: false }) Referrer_Grid:ReferralDetailsGridComponent ;
  @ViewChild('QDE_SUBMIT', { static: false }) QDE_SUBMIT: ButtonComponent;
  @ViewChild('QDE_CANCEL', { static: false }) QDE_CANCEL: ButtonComponent;
  @ViewChild('QDE_WITHDRAW', { static: false }) QDE_WITHDRAW: ButtonComponent;

  @ViewChild('Handler', { static: false }) Handler: QDEHandlerComponent;
  @ViewChild('HideProcessId', { static: false }) HideProcessId: HiddenComponent;
  @ViewChild('HideServiceCode', { static: false }) HideServiceCode: HiddenComponent;
  @ViewChild('HideTaskId', { static: false }) HideTaskId: HiddenComponent;
  @ViewChild('HideTenantId', { static: false }) HideTenantId: HiddenComponent;
  @ViewChild('HideUserId', { static: false }) HideUserId: HiddenComponent;
  @ViewChild('QDE_ACCORD1', { static: false }) QDE_ACCORD1: RloUiAccordionComponent;
  @ViewChild('QDE_ACCORD2', { static: false }) QDE_ACCORD2: RloUiAccordionComponent;
  @ViewChild('APPLICATION_DETAILS', { static: false }) APPLICATION_DETAILS: ApplicationDtlsComponent;
  @ViewChild('NOTEPAD_DETAILS', { static: false }) NOTEPAD_DETAILS: NotepadDetailsFormComponent;
  // @ViewChild('FieldId_29', { static: false }) FieldId_29: AddressDetailsComponent;
  @ViewChild('HideCurrentStage', { static: false }) HideCurrentStage: HiddenComponent;
  @ViewChild('HideAppId', { static: false }) HideAppId: HiddenComponent;
  @ViewChild('hideDirection', { static: false }) hideDirection: HiddenComponent;

  // public ProductCategory: String;
  ApplicationId: string = undefined;
  taskId: any;
  instanceId: any;
  userId: any;
  appId: any;
  router: any;
  CustomerDetailsArray: any;
  stageValidationMap = new Map<string, any>();
  errorsList = [];
  customerGridArray: any;
  ActiveCustomerDtls: {} = undefined;
  disableEnableAccordian: any;
  disableAccordian: boolean = false;


  async revalidate(): Promise<number> {
    var totalErrors = 0;
    super.beforeRevalidate();
    await Promise.all([
      this.HEADER.revalidate(),
      this.CUSTOMER_DETAILS.revalidate(),
      this.FieldId_9.revalidate(),
      this.FieldId_6.revalidate(),
      this.FieldId_5.revalidate(),
      this.FieldId_10.revalidate(),
      this.APPLICATION_DETAILS.revalidate(),
      this.NOTEPAD_DETAILS.revalidate(),
    ]).then((errorCounts) => {
      errorCounts.forEach((errorCount) => {
        totalErrors += errorCount;
      });
    });
    this.errors = totalErrors;
    super.afterRevalidate();
    return totalErrors;
  }

  showExpandedHeader: boolean = true;//state of header i.e expanded-1 or collapsed-0 
  masterDataSubscription: Subscription;

  isCustomerTabSelected: boolean = true;
  childToParentSubjectSubscription: Subscription;

  constructor(services: ServiceStock) {
    super(services);
    this.value = new QDEModel();
    this.componentCode = 'QDE';
    this.displayBorder = false;

    //////////////////////////////
    this.masterDataSubscription = this.services.rloCommonData.getComponentLvlData().subscribe(event => {
      console.warn("deep === masterDataSubscription", event);

      if (event.name != "Notes" && event.name != "ReferrerDetails" && event.name != "ApplicationDetails") {
        this.services.rloCommonData.updateMasterDataMap(event, this.isCustomerTabSelected);
      }

      console.log(this.services.rloCommonData.masterDataMap);
      this.updateTags(event);
      // if (event.name == 'CustomerDetails') {
      //   console.log("shweta :: cust array in QDE ",event.data);
      //   this.CUSTOMER_DETAILS.CustomerDetailsArray = event.data;
      // }
    });

    this.childToParentSubjectSubscription = this.services.rloCommonData.childToParentSubject.subscribe((event) => {
      this.disableAccordian = false;
      this.UpdateAccordian();
      switch (event.action) {
        case 'updateCustGrid': // on customer update/save success
          this.FieldId_9.doAPIForCustomerList(event.data);
          event.action = undefined;
          break;
      }
    });
  }

  updateTags(subjectData: any) {
    switch (subjectData.name) {
      case 'AddressDetails':
        this.services.rloCommonData.updateAddressTags(subjectData).then(data => {
          console.log(data);
          this.QDE_ACCORD1.setTags('ADD_DETAILS', data);
        });
        break;

      case 'OccupationDetails':
        this.services.rloCommonData.UpdateOccupationTags(subjectData).then(data => {
          console.log(data);
          this.QDE_ACCORD1.setTags('OCC_DETAILS', data);
        });
        break;

      default:
        break;
    }
  }

  tabSwitched(type: string) {
    type == "customer" ? this.isCustomerTabSelected = true : this.isCustomerTabSelected = false;
  }

  setReadOnly(readOnly) {
    super.setBasicFieldsReadOnly(readOnly);
    this.HEADER.setReadOnly(readOnly);

    this.CUSTOMER_DETAILS.setReadOnly(readOnly);
    this.FieldId_9.setReadOnly(readOnly);
    this.FieldId_6.setReadOnly(readOnly);
    this.FieldId_5.setReadOnly(readOnly);
    this.FieldId_10.setReadOnly(readOnly);
    this.APPLICATION_DETAILS.setReadOnly(readOnly);
    this.NOTEPAD_DETAILS.setReadOnly(readOnly);
  }

  async onFormLoad() {
    this.setInputs(this.services.dataStore.getData(this.services.routing.currModal));
    this.HideProcessId.setValue('RLO_Process');
    this.HideServiceCode.setValue('ClaimTask');
    this.HideTenantId.setValue('SB1');
    this.HideAppId.setValue('RLO');
    this.HideCurrentStage.setValue('QDE');


    let appId = this.services.dataStore.getRouteParam(this.services.routing.currModal, 'appId');
    this.ApplicationId = appId;
    this.taskId = this.services.dataStore.getRouteParam(this.services.routing.currModal, 'taskId');
    this.instanceId = this.services.dataStore.getRouteParam(this.services.routing.currModal, 'instanceId');
    this.userId = this.services.dataStore.getRouteParam(this.services.routing.currModal, 'userId');


    await this.brodcastApplicationId();

    // await this.CUSTOMER_DETAILS.onFormLoad(event);
    this.FieldId_9.parentFormCode = this.componentCode;
    this.CUSTOMER_DETAILS.parentFormCode = this.componentCode;
    this.FieldId_9.doAPIForCustomerList({});
    //this.FieldId_10.fetchReferalDetails();
    this.APPLICATION_DETAILS.fetchApplicationDetails();
    await this.NOTEPAD_DETAILS.FieldId_7.gridDataLoad({
      'ApplicationId': this.ApplicationId
    });
    await this.FieldId_10.ReferralDetailsGrid.gridDataLoad({
      'ApplicationId': this.ApplicationId
    });
    //   this.NOTEPAD_GRID.gridDataAPI()


    //   await this.FieldId_10.onFormLoad({
    //     'custSeq': appId
    //   });


    //   await this.CUSTOMER_DETAILS.onFormLoad({
    //     'custSeq': appId
    //   });

    //   await this.APPLICATION_DETAILS.onFormLoad({
    //     'custSeq': appId
    //   });
    //   await this.NOTEPAD_DETAILS.onFormLoad({
    //       'custSeq': this.services.dataStore.getRouteParam(this.services.routing.currModal, 'appId'),
    //   })
    await this.Handler.onFormLoad({
    });

    if (this.userId === undefined || this.userId == '') {
      this.claimTask(this.taskId);
    }

    this.setDependencies();

  }

  async claimTask(taskId) {
    const inputMap = new Map();
    inputMap.clear();
    inputMap.set('Body.UserId', sessionStorage.getItem('userId'));
    inputMap.set('Body.TENANT_ID', this.HideTenantId.getFieldValue());
    inputMap.set('Body.TaskId', taskId);
    inputMap.set('HeaderParam.ProcessId', this.HideProcessId.getFieldValue());
    inputMap.set('HeaderParam.ServiceCode', this.HideServiceCode.getFieldValue());
    this.services.http.fetchApi('/ClaimTask', 'POST', inputMap, '/los-wf').subscribe(
      async (httpResponse: HttpResponse<any>) => {
        const res = httpResponse.body;

        if (res.Status == 'S') {
          this.services.alert.showAlert(1, 'rlo.success.claim.qde', 5000);
          this.userId = sessionStorage.getItem('userId');
        } else {
          this.services.alert.showAlert(2, 'rlo.error.claim.qde', -1);
        }
      },
      async (httpError) => {
        const err = httpError['error'];
        if (err != null && err['ErrorElementPath'] !== undefined && err['ErrorDescription'] !== undefined) {
          if (err['ErrorElementPath'] === 'ServiceCode') {
            this.HideServiceCode.setError(err['ErrorDescription']);
          } else if (err['ErrorElementPath'] === 'ProcessId') {
            this.HideProcessId.setError(err['ErrorDescription']);
          } else if (err['ErrorElementPath'] === 'TaskId') {
            this.HideTaskId.setError(err['ErrorDescription']);
          } else if (err['ErrorElementPath'] === 'TENANT_ID') {
            this.HideTenantId.setError(err['ErrorDescription']);
          } else if (err['ErrorElementPath'] === 'UserId') {
            this.HideUserId.setError(err['ErrorDescription']);
          }
        }
        this.services.alert.showAlert(2, 'rlo.error.claim.qde', -1);
      }
    );
  }

  setInputs(param: any) {
    const params = this.services.http.mapToJson(param);
    if (params['mode']) {
      this.mode = params['mode'];
    }
  }
  async submitForm(path, apiCode, serviceCode) {
    this.submitData['formName'] = 'Quick Data Entry';
    await super.submit(path, apiCode, serviceCode);
  }
  getFieldInfo() {
    this.amountComponent.forEach(field => { this.additionalInfo[field.fieldID + '_desc'] = field.getFieldInfo(); });
    this.comboFields.forEach(field => { this.additionalInfo[field.fieldID + '_desc'] = field.getFieldInfo(); });
    this.fileUploadFields.forEach(field => { this.additionalInfo[field.fieldID + '_desc'] = field.getFieldInfo(); });
    this.additionalInfo['HEADER_desc'] = this.HEADER.getFieldInfo();
    this.additionalInfo['CUSTOMER_DETAILS_desc'] = this.CUSTOMER_DETAILS.getFieldInfo();
    this.additionalInfo['FieldId_9_desc'] = this.FieldId_9.getFieldInfo();
    this.additionalInfo['FieldId_6_desc'] = this.FieldId_6.getFieldInfo();
    this.additionalInfo['FieldId_5_desc'] = this.FieldId_5.getFieldInfo();
    this.additionalInfo['FieldId_10_desc'] = this.FieldId_10.getFieldInfo();
    this.additionalInfo['APPLICATION_DETAILS_desc'] = this.APPLICATION_DETAILS.getFieldInfo();
    this.additionalInfo['NOTEPAD_DETAILS_desc'] = this.NOTEPAD_DETAILS.getFieldInfo();
    return this.additionalInfo;
  }
  getFieldValue() {
    this.value.HEADER = this.HEADER.getFieldValue();
    this.value.CUSTOMER_DETAILS = this.CUSTOMER_DETAILS.getFieldValue();
    this.value.FieldId_9 = this.FieldId_9.getFieldValue();
    this.value.FieldId_6 = this.FieldId_6.getFieldValue();
    this.value.FieldId_5 = this.FieldId_5.getFieldValue();
    this.value.FieldId_10 = this.FieldId_10.getFieldValue();
    this.value.APPLICATION_DETAILS = this.APPLICATION_DETAILS.getFieldValue();
    this.value.NOTEPAD_DETAILS = this.NOTEPAD_DETAILS.getFieldValue();
    return this.value;
  }
  // tslint:disable-next-line:no-unnecessary-initializer
  setValue(inputValue, inputDesc = undefined) {
    this.setBasicFieldsValue(inputValue, inputDesc);
    this.HEADER.setValue(inputValue['HEADER'], inputDesc['HEADER_desc']);
    this.CUSTOMER_DETAILS.setValue(inputValue['CUSTOMER_DETAILS'], inputDesc['CUSTOMER_DETAILS_desc']);
    this.FieldId_9.setValue(inputValue['FieldId_9'], inputDesc['FieldId_9_desc']);
    this.FieldId_6.setValue(inputValue['FieldId_6'], inputDesc['FieldId_6_desc']);
    this.FieldId_5.setValue(inputValue['FieldId_5'], inputDesc['FieldId_5_desc']);
    this.FieldId_10.setValue(inputValue['FieldId_10'], inputDesc['FieldId_10_desc']);
    this.APPLICATION_DETAILS.setValue(inputValue['APPLICATION_DETAILS'], inputDesc['APPLICATION_DETAILS_desc']);
    this.NOTEPAD_DETAILS.setValue(inputValue['NOTEPAD_DETAILS'], inputDesc['NOTEPAD_DETAILS_desc']);
    this.value = new QDEModel();
    this.value.setValue(inputValue);
    this.setDependencies();
    this.passNewValue(this.value);
  }
  ngOnInit() {
    if (this.formCode === undefined) { this.formCode = 'QDE'; }
    if (this.formOnLoadError) { return; }
    const styleElement = document.createElement('style');
    styleElement.type = 'text/css';
    styleElement.innerHTML = customCss;
    styleElement.id = 'QDE_customCss';
    document.getElementsByTagName('head')[0].appendChild(styleElement);
    this.services.rloCommonData.getCurrentRoute();
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    const styleElement = document.getElementById('QDE_customCss');
    styleElement.parentNode.removeChild(styleElement);
    this.services.rloCommonData.resetMapData();
    this.masterDataSubscription.unsubscribe();
    this.childToParentSubjectSubscription.unsubscribe();
    this.services.rloui.closeAllConfirmationModal();
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.subsBFldsValueUpdates();
      // this.value.HEADER = this.HEADER.getFieldValue();
      // this.HEADER.valueChangeUpdates().subscribe((value) => {this.value.HEADER = value;});
      this.value.CUSTOMER_DETAILS = this.CUSTOMER_DETAILS.getFieldValue();
      this.CUSTOMER_DETAILS.valueChangeUpdates().subscribe((value) => { this.value.CUSTOMER_DETAILS = value; });
      this.value.FieldId_9 = this.FieldId_9.getFieldValue();
      this.FieldId_9.valueChangeUpdates().subscribe((value) => { this.value.FieldId_9 = value; });
      this.value.FieldId_6 = this.FieldId_6.getFieldValue();
      this.FieldId_6.valueChangeUpdates().subscribe((value) => { this.value.FieldId_6 = value; });
      this.value.FieldId_5 = this.FieldId_5.getFieldValue();
      this.FieldId_5.valueChangeUpdates().subscribe((value) => { this.value.FieldId_5 = value; });
      this.value.FieldId_10 = this.FieldId_10.getFieldValue();
      this.FieldId_10.valueChangeUpdates().subscribe((value) => { this.value.FieldId_10 = value; });
      this.value.APPLICATION_DETAILS = this.APPLICATION_DETAILS.getFieldValue();
      this.APPLICATION_DETAILS.valueChangeUpdates().subscribe((value) => { this.value.APPLICATION_DETAILS = value; });
      this.value.NOTEPAD_DETAILS = this.NOTEPAD_DETAILS.getFieldValue();
      this.NOTEPAD_DETAILS.valueChangeUpdates().subscribe((value) => { this.value.NOTEPAD_DETAILS = value; });
      this.onFormLoad();
      this.checkForHTabOverFlow();
    });
  }
  clearError() {
    super.clearBasicFieldsError();
    super.clearHTabErrors();
    super.clearVTabErrors();
    this.HEADER.clearError();
    this.CUSTOMER_DETAILS.clearError();
    this.FieldId_9.clearError();
    this.FieldId_6.clearError();
    this.FieldId_5.clearError();
    this.FieldId_10.clearError();
    this.APPLICATION_DETAILS.clearError();
    this.NOTEPAD_DETAILS.clearError();
    this.errors = 0;
    this.errorMessage = [];
  }
  onReset() {
    super.resetBasicFields();
    this.HEADER.onReset();
    this.FieldId_9.onReset();
    this.CUSTOMER_DETAILS.onReset();
    // this.FieldId_8.onReset();
    this.FieldId_6.onReset();
    this.FieldId_5.onReset();
    this.FieldId_10.onReset();
    this.APPLICATION_DETAILS.onReset();
    this.NOTEPAD_DETAILS.onReset();
    this.clearHTabErrors();
    this.clearVTabErrors();
    this.errors = 0;
    this.errorMessage = [];
    this.additionalInfo = undefined;
    this.dependencyMap.clear();
    this.value = new QDEModel();
    this.passNewValue(this.value);
    this.setReadOnly(false);
    this.onFormLoad();
  }
  async CUSTOMER_DETAILS_passBorrowerSeq(event) {
    console.log("deep === load address n occupation grid", event);
    const inputMap = new Map();

    await this.FieldId_6.AddressGrid.gridDataLoad({
      'passBorrowerSeqToGrid': event.BorrowerSeq
    });
    this.FieldId_6.activeBorrowerSeq = event.BorrowerSeq;

    await this.FieldId_5.OCC_DTLS_GRID.gridDataLoad({
      'refNumToGrid': event.BorrowerSeq,
    });
    this.FieldId_5.activeBorrowerSeq = event.BorrowerSeq;
  }
  // async CUSTOMER_DETAILS_passNewCustomer(){
  //   this.FieldId_6.AddressGrid.addressDetails = [];

  //    this.FieldId_6.AddressGrid.readonlyGrid.apiSuccessCallback(params, this.addressDetails);
  // }

  async CUSTOMER_DETAILS_updateCustGrid(event) {

    this.FieldId_9.doAPIForCustomerList(event);
    // this.CUSTOMER_DETAILS.customerDetailMap = this.FieldId_9.doAPIForCustomerList(event)

  }
  async FieldId_9_selectCustId(event) {
    const inputMap = new Map();
    this.CUSTOMER_DETAILS.CUST_DTLS_GRID_custDtlsEdit(event);
  }

  async FieldId_9_resetCustForm(event) {
    this.CUSTOMER_DETAILS.setNewCustomerFrom(event);
    this.disableAccordian = true;
    this.UpdateAccordian();
    // this.FieldId_6.AddressGrid.addressDetails = [];
    // this.FieldId_6.onFormLoad();
    // this.FieldId_6.AddressGrid.setValue(Object.assign([], this.customers));
  }



  //when clicked on edit
  async FieldId_9_passArrayToCustomer(event) {
    //  setTimeout(() => {
    this.CUSTOMER_DETAILS.LoadCustomerDetailsonFormLoad(event.CustomerArray);
    this.disableAccordian = false
    this.UpdateAccordian();
    this.CustomerDetailsArray = event.CustomerArray;
    console.log("juhi pass", event.CustomerArray);
    //  }, 20000);
  }
  async QDE_WITHDRAW_click(event) {
    const requestParams = new Map();
    requestParams.set('Body.ApplicationStatus', 'Withdraw');
    requestParams.set('Body.direction', 'W');
    var mainMessage = this.services.rloui.getAlertMessage('rlo.withdraw.comfirmation');
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

      this.services.rloui.confirmationModal(modalObj).then((response) => {
        console.log(response);
        if (response != null) {
          if (response.id === 1) {
            this.services.rloui.closeAllConfirmationModal()
            this.submitQDE(requestParams);
          }
        }
      });
    });

  }

  async QDE_SUBMIT_click(event) {
    this.services.rloCommonData.isFormValid().then((dataObj) => {
      console.warn(dataObj);
      if (dataObj.isAppValid) {
        const requestParams = new Map();
        requestParams.set('Body.ApplicationStatus', 'Approve');
        requestParams.set('Body.direction', 'AP');

        this.submitQDE(requestParams);
      } else {
        let errorMsg = "";
        dataObj.errorsList.forEach(element => {
          errorMsg += element;
        });
        // this.services.alert.showAlert(2, '', -1, errorMsg);
        // var title = this.services.rloui.getAlertMessage('rlo.error.invalid.regex');
        var mainMessage = this.services.rloui.getAlertMessage('', errorMsg);
        var button1 = this.services.rloui.getAlertMessage('', 'OK');
        // var button2 = this.services.rloui.getAlertMessage('', 'CANCEL');

        Promise.all([mainMessage, button1]).then(values => {
          console.log(values);
          let modalObj = {
            title: "Alert",
            mainMessage: values[0],
            modalSize: "modal-width-sm",
            buttons: [
              { id: 1, text: values[1], type: "success", class: "btn-primary" },
              //   { id: 2, text: values[2], type: "failure", class: "btn-warning-outline" }
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
      }
    });
  }

  async submitQDE(requestParams) {
    const inputMap = new Map();

    inputMap.clear();
    inputMap.set('HeaderParam.ProcessId', this.HideProcessId.getFieldValue());
    inputMap.set('HeaderParam.ServiceCode', this.HideServiceCode.getFieldValue());
    inputMap.set('Body.TaskId', this.taskId);
    inputMap.set('Body.TENANT_ID', this.HideTenantId.getFieldValue());
    inputMap.set('Body.UserId', this.userId);
    inputMap.set('Body.CurrentStage', this.HideCurrentStage.getFieldValue());
    inputMap.set('Body.ApplicationId', this.ApplicationId);

    if (requestParams) {
      requestParams.forEach((val, key) => {
        inputMap.set(key, val);
      });
      // for (let [key, value] of requestParams) {
      //   inputMap.set(key, value);
      // }
    } else {
      // console.log('input Map not found .. returing');
      return;
    }

    this.services.http.fetchApi('/acceptQDE', 'POST', inputMap, '/rlo-de').subscribe(
      async (httpResponse: HttpResponse<any>) => {
        const res = httpResponse.body;

        const action: string = (requestParams.get('Body.ApplicationStatus')).toUpperCase();
        const alertMsg = ('WITHDRAW' === action) ? 'rlo.success.withdraw' : 'rlo.success.submit';
        // var title = this.services.rloui.getAlertMessage('rlo.error.invalid.regex');
        var mainMessage = this.services.rloui.getAlertMessage(alertMsg);
        var button1 = this.services.rloui.getAlertMessage('', 'OK');
        // var button2 = this.services.rloui.getAlertMessage('', 'CANCEL');

        Promise.all([mainMessage, button1]).then(values => {
          console.log(values);
          let modalObj = {
            title: "Alert",
            mainMessage: values[0],
            modalSize: "modal-width-sm",
            buttons: [
              { id: 1, text: values[1], type: "success", class: "btn-primary" },
              //   { id: 2, text: values[2], type: "failure", class: "btn-warning-outline" }
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
        // this.QDE_SUBMIT.setDisabled(true);
        // this.QDE_WITHDRAW.setDisabled(true);
        // this.services.alert.showAlert(1, alertMsg, 5000);
        // // this.QDE_SUBMIT.setDisabled(false)
        // this.services.router.navigate(['home', 'LANDING']);
      },
      async (httpError) => {
        const err = httpError['error'];
        if (err != null && err['ErrorElementPath'] !== undefined && err['ErrorDescription'] !== undefined) {
          if (err['ErrorElementPath'] === 'ApplicationStatus') {
            this.hideDirection.setError(err['ErrorDescription']);
          } else if (err['ErrorElementPath'] === 'ApplicationId') {
            this.HideAppId.setError(err['ErrorDescription']);
          } else if (err['ErrorElementPath'] === 'CurrentStage') {
            this.HideCurrentStage.setError(err['ErrorDescription']);
          } else if (err['ErrorElementPath'] === 'UserId') {
            this.HideUserId.setError(err['ErrorDescription']);
          } else if (err['ErrorElementPath'] === 'TENANT_ID') {
            this.HideTenantId.setError(err['ErrorDescription']);
          } else if (err['ErrorElementPath'] === 'TaskId') {
            this.HideTaskId.setError(err['ErrorDescription']);
          } else if (err['ErrorElementPath'] === 'ServiceCode') {
            this.HideServiceCode.setError(err['ErrorDescription']);
          } else if (err['ErrorElementPath'] === 'ProcessId') {
            this.HideProcessId.setError(err['ErrorDescription']);
          }
          this.services.alert.showAlert(2, 'Fail to Submit', -1);
        }
      }
    );
  }

  async brodcastProdCategory(event) {
    //  this.ProductCategory = event.isLoanCategory;
    // this.CUSTOMER_DETAILS.isLoanCategory = event.isLoanCategory;
    this.CUSTOMER_DETAILS.loanCategoryChanged(event.isLoanCategory);
    this.FieldId_9.isLoanCategory = event.isLoanCategory;
  }

  async headerState(event) {
    this.showExpandedHeader = event.headerState;
  }

  brodcastApplicationId() {
    //  this.ProductCategory = event.isLoanCategory;
    this.CUSTOMER_DETAILS.ApplicationId = this.ApplicationId;
    this.FieldId_9.ApplicationId = this.ApplicationId;
    this.APPLICATION_DETAILS.ApplicationId = this.ApplicationId;
    this.FieldId_10.ApplicationId = this.ApplicationId;
    this.NOTEPAD_DETAILS.ApplicationId = this.ApplicationId;
  }

  async CUSTOMER_DETAILS_onFullNameblur(event) {
    this.updateCustomerTags(event);
  }

  updateCustomerTags(event) {
    const tags = [];
    if (event.fullName !== undefined && event.customerType !== undefined) {
      tags.push({ label: event.customerType, text: event.fullName });
    }
    // if (this.CUSTOMER_DETAILS.CD_FULL_NAME.getFieldValue() !== undefined && this.CUSTOMER_DETAILS.CD_CUST_TYPE.getFieldValue() !== undefined) {
    //   tags.push({ label: this.CUSTOMER_DETAILS.CD_CUST_TYPE.getFieldValue(), text: this.CUSTOMER_DETAILS.CD_FULL_NAME.getFieldInfo() });
    // }
    this.QDE_ACCORD1.setTags('CUST_DETAILS', tags);
  }

  fieldDependencies = {
  };

  /* Cancel / Back button */
  goBack() {
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

  UpdateAccordian() {
    this.QDE_ACCORD1.disableAccordian('ADD_DETAILS', this.disableAccordian);
    this.QDE_ACCORD1.disableAccordian('OCC_DETAILS', this.disableAccordian);
  }

}
