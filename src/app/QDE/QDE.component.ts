import { Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import { QDEModel } from './QDE.model';
import { ComboBoxComponent } from '../combo-box/combo-box.component';
import { TextBoxComponent } from '../text-box/text-box.component';
import { TextAreaComponent } from '../text-area/text-area.component';
import { CheckBoxComponent } from '../check-box/check-box.component';
import { HiddenComponent } from '../hidden/hidden.component';
import { FileuploadComponent } from '../fileupload/fileupload.component';
import { DateComponent } from '../date/date.component';
import { ButtonComponent } from '../button/button.component'
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
  @ViewChild('QDE_SUBMIT', { static: false }) QDE_SUBMIT: ButtonComponent;
  @ViewChild('QDE_CANCEL', { static: false }) QDE_CANCEL: ButtonComponent;
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

  stageValidationMap = new Map<string, any>();
  errorsList = [];


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
  constructor(services: ServiceStock) {
    super(services);
    this.value = new QDEModel();
    this.componentCode = 'QDE';
    this.displayBorder = false;
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
    this.FieldId_9.doAPIForCustomerList({});
    this.FieldId_10.fetchReferalDetails();
    this.APPLICATION_DETAILS.fetchApplicationDetails();
    await this.NOTEPAD_DETAILS.FieldId_7.gridDataLoad({
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

    if (this.userId == undefined || this.userId == '') {
      this.claimTask(this.taskId);
    }

    this.setDependencies();
  }

  async claimTask(taskId) {
    let inputMap = new Map();
    inputMap.clear();
    inputMap.set('Body.UserId', sessionStorage.getItem('userId'));
    inputMap.set('Body.TENANT_ID', this.HideTenantId.getFieldValue());
    inputMap.set('Body.TaskId', taskId);
    inputMap.set('HeaderParam.ProcessId', this.HideProcessId.getFieldValue());
    inputMap.set('HeaderParam.ServiceCode', this.HideServiceCode.getFieldValue());
    this.services.http.fetchApi('/ClaimTask', 'POST', inputMap, '/los-wf').subscribe(
      async (httpResponse: HttpResponse<any>) => {
        var res = httpResponse.body;

        if (res.Status == "S") {
          this.services.alert.showAlert(1, 'rlo.success.claim.qde', 5000);
        } else {
          this.services.alert.showAlert(2, 'rlo.error.claim.qde', -1);
        }
      },
      async (httpError) => {
        var err = httpError['error']
        if (err != null && err['ErrorElementPath'] != undefined && err['ErrorDescription'] != undefined) {
          if (err['ErrorElementPath'] == 'ServiceCode') {
            this.HideServiceCode.setError(err['ErrorDescription']);
          }
          else if (err['ErrorElementPath'] == 'ProcessId') {
            this.HideProcessId.setError(err['ErrorDescription']);
          }
          else if (err['ErrorElementPath'] == 'TaskId') {
            this.HideTaskId.setError(err['ErrorDescription']);
          }
          else if (err['ErrorElementPath'] == 'TENANT_ID') {
            this.HideTenantId.setError(err['ErrorDescription']);
          }
          else if (err['ErrorElementPath'] == 'UserId') {
            this.HideUserId.setError(err['ErrorDescription']);
          }
        }
        this.services.alert.showAlert(2, 'rlo.error.claim.qde', -1);
      }
    );
  }

  setInputs(param: any) {
    let params = this.services.http.mapToJson(param);
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
    if (this.formCode == undefined) { this.formCode = 'QDE'; }
    if (this.formOnLoadError) { return; }
    var styleElement = document.createElement('style');
    styleElement.type = 'text/css';
    styleElement.innerHTML = customCss;
    styleElement.id = 'QDE_customCss';
    document.getElementsByTagName('head')[0].appendChild(styleElement);
  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    var styleElement = document.getElementById('QDE_customCss');
    styleElement.parentNode.removeChild(styleElement);
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
    let inputMap = new Map();
    await this.FieldId_6.AddressGrid.gridDataLoad({
      'passBorrowerSeqToGrid': event.BorrowerSeq
      // 'addBorrowerSeq' : event.BorrowerSeq
    });
    this.FieldId_6.addBorrowerSeq = event.BorrowerSeq;
    await this.FieldId_5.OCC_DTLS_GRID.gridDataLoad({
      'refNumToGrid': event.BorrowerSeq,

    });
    this.FieldId_5.occBorrowerSeq = event.BorrowerSeq;

    // await this.FieldId_10.onFormLoad({})
    // await this.FieldId_10.onFormLoad({
    //     'passBorrowerSeqToRefGrid': event.BorrowerSeq
    // });

    // this.FieldId_10.loanA = event.BorrowerSeq
  }

  async CUSTOMER_DETAILS_updateCustGrid(event) {
    console.log("Calling update customer grid Emitter");

    this.FieldId_9.doAPIForCustomerList(event);
    // this.CUSTOMER_DETAILS.customerDetailMap = this.FieldId_9.doAPIForCustomerList(event)


  }
  async FieldId_9_selectCustId(event) {
    let inputMap = new Map();
    this.CUSTOMER_DETAILS.CUST_DTLS_GRID_custDtlsEdit(event);
  }

  async FieldId_9_resetCustForm(event) {
    this.CUSTOMER_DETAILS.setNewCustomerFrom(event);
  }

  async FieldId_6_addonblur(event) {
    console.log("Calling this Emitter");
    this.updateAddressTags();
  }
  async FieldId_5_occpOnBlur(event) {
    console.log("Calling this Emitter");
    this.addOccupationTags();
  }

  updateAddressTags() {
    let tags = [];
    this.FieldId_6.AddressGrid.addressDetails.forEach(Add => {
      if (Add.AD_Address_Type == 'OF') {
        tags.push({ text: 'Office' + ";" + " " + Add.AD_Address });
      }
      // else if (Add.AD_Address_Type == 'RS') {
      //     tags.push({ text: 'Residence' + ";" + " " + Add.AD_Address });
      // }
    })
    // let displayTag = [];
    // if (this.FieldId_6.AD_ADD_TYPE.getFieldValue() !== undefined && this.FieldId_6.AD_ADDRESS_LINE1.getFieldValue() !== undefined && this.FieldId_6.AD_PINCODE.getFieldValue() !== undefined && this.FieldId_6.AD_CITY.getFieldValue() !== undefined) {
    //     displayTag.push(this.FieldId_6.AD_ADD_TYPE.getFieldInfo() + "," + " " + this.FieldId_6.AD_ADDRESS_LINE1.getFieldValue() + "," + this.FieldId_6.AD_CITY.getFieldValue() + "," + this.FieldId_6.AD_PINCODE.getFieldValue())
    // }
    // let tags = [];
    // displayTag.forEach(tag => {
    //     tags.push({ text: tag });
    // })
    this.QDE_ACCORD1.setTags("ADD_DETAILS", tags);
  }

  addOccupationTags() {
    let tags = [];
    this.FieldId_5.OCC_DTLS_GRID.loopDataVar10.forEach(Occ => {
      if (Occ.OD_OCCUPATION == 'RT') {
        tags.push({ text: 'Retired' });
      }
      else if (Occ.OD_OCCUPATION == 'HW') {
        tags.push({ text: 'Housewife' });
      }
      else if (Occ.OD_OCCUPATION = 'ST') {
        tags.push({ text: 'Student' });
      }
      else if (Occ.OD_OCCUPATION = 'SL') {
        tags.push({ text: 'Salaried' });
      }
      else if (Occ.OD_OCCUPATION == 'SE') {
        tags.push({ text: 'Self Employed' });
      }
      else if (Occ.OD_OCCUPATION == 'OT') {
        tags.push({ text: 'Others' });
      }
    })
    // if (this.FieldId_5.OD_OCCUPATION.getFieldValue() !== undefined) {
    //     displayTag.push(this.FieldId_5.OD_OCCUPATION.getFieldInfo())
    // }
    // let tags = [];
    // displayTag.forEach(tag => {
    //     tags.push({ text: tag });
    // })

    this.QDE_ACCORD1.setTags("OCC_DETAILS", tags);
  }


  //  async displayCustomerTag(){
  //     let displayTag = [];
  //     if(this.CUSTOMER_DETAILS.CD_FIRST_NAME.getFieldValue() !== undefined){
  //      displayTag.push(this.FieldId_5.OD_OCCUPATION.getFieldInfo())
  //     }
  //     if(this.CUSTOMER_DETAILS.CD_LAST_NAME.getFieldValue() !== undefined){
  //         displayTag.push(this.FieldId_5.OD_OCCUPATION.getFieldInfo())
  //        }
  //     let tags = [];
  //     displayTag.forEach(c => {
  //       tags.push({ label: c.customerType.value, text: c.FullName });
  //     })

  //     this.CUSTOMER_DETAILS.setTags("CUST_DETAILS", tags);
  //    }



  // async FieldId_9_passApplicationId(event){
  //     this.CUSTOMER_DETAILS.onFormLoad(event);
  // }

  async FieldId_9_passArrayToCustomer(event) {
    //  setTimeout(() => {
    this.CUSTOMER_DETAILS.LoadCustomerDetailsonFormLoad(event);
    //  }, 20000);
  }
  async QDE_WITHDRAW_click(event) {
    let requestParams = new Map();
    requestParams.set('Body.ApplicationStatus', 'Withdraw');
    requestParams.set('Body.direction', 'W');

    this.submitQDE(requestParams);
  }

  async QDE_SUBMIT_click(event) {
    if (await this.isFormValid()) {
      let requestParams = new Map();
      requestParams.set('Body.ApplicationStatus', 'Approve');
      requestParams.set('Body.direction', 'AP');

      this.submitQDE(requestParams);
    } else {
      this.services.alert.showAlert(2, this.errorsList[0], -1);
    }
  }

  async submitQDE(requestParams) {
    let inputMap = new Map();

    inputMap.clear();
    inputMap.set('HeaderParam.ProcessId', this.HideProcessId.getFieldValue());
    inputMap.set('HeaderParam.ServiceCode', this.HideServiceCode.getFieldValue());
    inputMap.set('Body.TaskId', this.taskId);
    inputMap.set('Body.TENANT_ID', this.HideTenantId.getFieldValue());
    inputMap.set('Body.UserId', this.userId);
    inputMap.set('Body.CurrentStage', this.HideCurrentStage.getFieldValue());
    inputMap.set('Body.ApplicationId', this.ApplicationId);

    if(requestParams){
      requestParams.forEach( (val, key) => { 
        inputMap.set(key, val);
      });
      // for (let [key, value] of requestParams) {
      //   inputMap.set(key, value);
      // } 
    } else {
      console.log('input Map not found .. returing');
      return;
    }

    this.services.http.fetchApi('/acceptQDE', 'POST', inputMap, '/rlo-de').subscribe(
      async (httpResponse: HttpResponse<any>) => {
        var res = httpResponse.body;

        const action:string=(requestParams.get('Body.ApplicationStatus'));
        let alertMsg=("Withdraw"==action)?'Successfully Withrawed':'Successfully Submitted';
        
        this.services.alert.showAlert(1, alertMsg, 5000);
        // this.QDE_SUBMIT.setDisabled(false)
        this.services.router.navigate(['home', 'LANDING']);
      },
      async (httpError) => {
        var err = httpError['error']
        if (err != null && err['ErrorElementPath'] != undefined && err['ErrorDescription'] != undefined) {
          if (err['ErrorElementPath'] == 'ApplicationStatus') {
            this.hideDirection.setError(err['ErrorDescription']);
          }
          else if (err['ErrorElementPath'] == 'ApplicationId') {
            this.HideAppId.setError(err['ErrorDescription']);
          }
          else if (err['ErrorElementPath'] == 'CurrentStage') {
            this.HideCurrentStage.setError(err['ErrorDescription']);
          }
          else if (err['ErrorElementPath'] == 'UserId') {
            this.HideUserId.setError(err['ErrorDescription']);
          }
          else if (err['ErrorElementPath'] == 'TENANT_ID') {
            this.HideTenantId.setError(err['ErrorDescription']);
          }
          else if (err['ErrorElementPath'] == 'TaskId') {
            this.HideTaskId.setError(err['ErrorDescription']);
          }
          else if (err['ErrorElementPath'] == 'ServiceCode') {
            this.HideServiceCode.setError(err['ErrorDescription']);
          }
          else if (err['ErrorElementPath'] == 'ProcessId') {
            this.HideProcessId.setError(err['ErrorDescription']);
          }
          this.services.alert.showAlert(2, 'Fail to Submit', -1);
        }
      }
    );
  }

  async brodcastProdCategory(event) {
    //  this.ProductCategory = event.isLoanCategory;
    this.CUSTOMER_DETAILS.isLoanCategory = event.isLoanCategory;
    this.FieldId_9.isLoanCategory = event.isLoanCategory;
  }

  brodcastApplicationId() {
    console.log("shweta :: in qde ApplicationId is ", this.ApplicationId);
    //  this.ProductCategory = event.isLoanCategory;
    this.CUSTOMER_DETAILS.ApplicationId = this.ApplicationId;
    this.FieldId_9.ApplicationId = this.ApplicationId;
    this.APPLICATION_DETAILS.ApplicationId = this.ApplicationId;
    this.FieldId_10.ApplicationId = this.ApplicationId;
    this.NOTEPAD_DETAILS.ApplicationId = this.ApplicationId;
  }

  async CUSTOMER_DETAILS_onFullNameblur(event) {
    console.log("Calling this Emitter");
    this.updateCustomerTags();
  }

  updateCustomerTags() {
    let tags = [];
    if (this.CUSTOMER_DETAILS.CD_FULL_NAME.getFieldValue() !== undefined && this.CUSTOMER_DETAILS.CD_CUST_TYPE.getFieldValue() !== undefined) {
      tags.push({ label: this.CUSTOMER_DETAILS.CD_CUST_TYPE.getFieldValue(), text: this.CUSTOMER_DETAILS.CD_FULL_NAME.getFieldInfo() });
    }

    this.QDE_ACCORD1.setTags("CUST_DETAILS", tags);
  }

  fieldDependencies = {
  }

  /* Cancel / Back button */
  goBack() {
    if (confirm("Are you sure you want to cancel?")) {
      // history.back();
      this.services.router.navigate(['home', 'LANDING']);
    }
  }

  updateStageValidation(event) {

    this.categoriesCustomers(event);
    //   console.log("updateStageValidation ", event);
    //   if (event && event.name == "customerLoad") { // Customers loaded
    //     if(this.stageValidationMap){ // stageValidation Map Exists - update existing

    //         this.stageValidationMap["customers"]=event.data;     

    //      console.log("shweta after :: Validation Map",this.stageValidationMap);
    //      console.log("shweta :: event map : ",event);
    //     } else { // stageValidation Map Does not Exists - create new
    //       this.stageValidationMap = {};
    //       this.stageValidationMap["customers"] = [];

    //       // let customers = [];

    //       if(event.data && event.data.length > 0) {
    //         this.stageValidationMap["customers"] = event.data;

    //       //   event.data.forEach(customer => {
    //       //     // Validation applies to Borrower / Co Borrower
    //       //     if(customer["CustomerType"] == "B" || customer["CustomerType"] == "CB"){ 
    //       //       customers.push({
    //       //         BorrowerSeq: customer["BorrowerSeq"],
    //       //         CustomerType: customer["CustomerType"],
    //       //         DOB: customer["DOB"],
    //       //         Gender: customer["Gender"],
    //       //         LoanOwnership: customer["LoanOwnership"],
    //       //         isAddressAdded: false,
    //       //         isOccupationAdded: false
    //       //       });
    //       //     }
    //       //   });

    //       //   this.stageValidationMap["customers"] = customers;
    //       }
    //     }
    //   } else if(event && event.name == "addressLoad") { // Address loaded
    //     // delete if exists for customer and then add

    //     this.stageValidationMap=this.stageValidationMap.customers.map(
    //         mapCustomer => mapCustomer.BorrowerSeq===event.data[0].BorrowerSeq
    //        );

    //     this.stageValidationMap["address"] = event.data;

    //   } else if(event && event.name == "occupationLoad") { // Occupation loaded
    //     this.stageValidationMap["occupationLoad"] = event.data;
    //   }
  }

  categoriesCustomers(event) {
    let addressList = [];
    let occupationList = [];
    event.data.forEach(eventCustomer => {
      const borSeq: string = "CustID" + eventCustomer.BorrowerSeq.toString();
      let customerDetails = new Map();
      if (this.stageValidationMap) {
        // Array.from(this.stageValidationMap.keys()).forEach(key => console.log("sh key: ",key));
        console.log("shweta ::: map : ", this.stageValidationMap);
        if ((this.stageValidationMap).has(borSeq)) {
          customerDetails = this.stageValidationMap.get(borSeq);
        }
      }
      switch (event.name) {
        case "customerLoad": customerDetails.set('customer', eventCustomer); break;
        case "addressLoad":
          addressList.push(eventCustomer);
          customerDetails.set('address', addressList);
          break;
        case "occupationLoad":
          occupationList.push(eventCustomer);
          customerDetails.set('occupation', occupationList);
          break;
      }
      this.stageValidationMap.set(borSeq, customerDetails);
    });

  }

  async isFormValid() {
    let isAppValidFlag = true;
    this.errorsList = [];

    await this.asyncForEach(Array.from(this.stageValidationMap.entries()), async (entry) => {
      let isAddressValid: boolean = true;
      let isOccupationValid: boolean = true;
      let isCustomerValid: boolean = true;
      let errorMessage: string = '';
      let custFullName: string = '';
      console.log(' shweta :: Key: ', entry[0] + ' Value: ', entry[1]);
      // const bottowerSeq: string = entry[0];
      if (entry[1].has('customer')) {
        let customer = entry[1].get('customer');
        custFullName = customer.FullName;
        isCustomerValid = await this.validateCustomer(customer);

        console.log('isCustomerValid '+ isCustomerValid );
        

        if (!isCustomerValid) {
          errorMessage = errorMessage + ' Mandatory fields of customer'
        }
        const LoanOwnership = customer.LoanOwnership;
        const custType=customer.CustomerType;

        if (!entry[1].has('address')) {
          isAddressValid = false;
          errorMessage = errorMessage != '' ? errorMessage + ', ' : errorMessage;
          errorMessage = errorMessage + ' Add atleast one address';
        }else{          
          let addressList = entry[1].get('address');
          let addrValidationObj ={isMailing:false,isPermenet:false,isCurrent:false,isOffice:false};
          let isMailing=true;
          for(let eachAddress of addressList){
            if(eachAddress.MailingAddress.toString()=='Y'){
              addrValidationObj.isMailing=true;
            }
            if('CR'== (""+eachAddress.OccupancyType)){
              addrValidationObj.isCurrent=true;
            }
            if('PR'==(""+eachAddress.OccupancyType)){
              addrValidationObj.isPermenet=true;
            }
            if('OF'==(""+eachAddress.AddressType)){
              addrValidationObj.isOffice=true;
            }
        }

        if(LoanOwnership==undefined && custType!='B' && custType!='CB'){
          addrValidationObj.isOffice=true;
        }

        console.log("shweta :: address obj",addrValidationObj);
        for(let flag in addrValidationObj){
          console.log("shweta :: address flag ::",flag," : ",addrValidationObj[flag]);
          if(!addrValidationObj[flag]){
            isAddressValid=false;
          }
        }
        
        if(!isAddressValid){
          errorMessage = errorMessage != '' ? errorMessage + ', ' : errorMessage;
          errorMessage +=(addrValidationObj.isOffice)?
          "Customer must include permenent recidenctial address, current recidential address and any one of these must be correspondence address."
          :"Customer must include permenent recidenctial address, current recidential address, one office address and any one of these must be correspondence address.";
      
        }
      }

        if (LoanOwnership != undefined ) {
          isOccupationValid = false;
          if (entry[1].has('occupation')) {           
            const occupationList = entry[1].get('occupation');

            for(let eachOccupation of occupationList){
              if('PRI'==eachOccupation.IncomeType.toString()){
                isOccupationValid=true;
              }
            }
          }
          if(!isOccupationValid){
             errorMessage = errorMessage != '' ? errorMessage + ' and ' : errorMessage;
             errorMessage = errorMessage + ' Primary Occupation required.';
 
           }
        }
      }

      console.log("isCustomerValid " + isCustomerValid + " isAddressValid " + isAddressValid + " isOccupationValid " + isOccupationValid );
      

      if (!(isCustomerValid && isAddressValid && isOccupationValid)) {
        errorMessage = "formalities of customer " + custFullName + " are pending. Please fill : " + errorMessage;
        this.errorsList.push(errorMessage);
        isAppValidFlag = false;
      }
    });

    console.log("validation error mesage :: ", this.errorsList);
    return isAppValidFlag;
  }

  async asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }

  async validateCustomer(customer) {

    let noOfErrors: number = await this.CUSTOMER_DETAILS.revalidate();
    console.log('validateCustomer noOfErrors '+ noOfErrors);
    
    return (noOfErrors > 0) ? false : true;
  }

}
