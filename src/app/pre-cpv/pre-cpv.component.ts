import { Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter, Input, HostListener } from '@angular/core';
import { PreCPVModel } from './pre-cpv.model';
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
import { ApplicationDtlsComponent } from '../ApplicationDtls/ApplicationDtls.component';
import { CustGridComponent } from '../CustGrid/CustGrid.component';
import { from } from 'rxjs';
import { CreditCardDetailsComponent } from '../CreditCardDetails/CreditCardDetails.component';
import { IModalData } from '../popup-alert/popup-interface';
import { string } from '@amcharts/amcharts4/core';
import { RLOUIRadioComponent } from '../rlo-ui-radio/rlo-ui-radio.component';
import { UtilityService } from '../services/utility.service';
import { threadId } from 'worker_threads';
import { PreCPVInputGridComponent } from '../PreCPVInputGrid/PreCPVInputGrid.component';


const customCss: string = '';

@Component({
  selector: 'app-Pre-cpv',
  templateUrl: './pre-cpv.component.html'
})
export class PreCPVComponent extends FormComponent implements OnInit, AfterViewInit {
  @ViewChild('HEADER', { static: false }) HEADER: HeaderComponent;

  @ViewChild('AD_CUST_REMARKS', { static: false }) AD_CUST_REMARKS: TextAreaComponent;


  @ViewChild('PreCPV_APPROVE', { static: false }) PreCPV_APPROVE: ButtonComponent;
  @ViewChild('PreCPV_WITHDRAW', { static: false }) PreCPV_WITHDRAW: ButtonComponent;
  @ViewChild('PreCPV_SENDBACK', { static: false }) PreCPV_SENDBACK: ButtonComponent;
  @ViewChild('HideProcessId', { static: false }) HideProcessId: HiddenComponent;
  @ViewChild('HideServiceCode', { static: false }) HideServiceCode: HiddenComponent;
  @ViewChild('HideServiceCodeComplete', { static: false }) HideServiceCodeComplete: HiddenComponent;
  // @ViewChild('HideTaskId', { static: false }) HideTaskId: HiddenComponent;
  @ViewChild('HideTenantId', { static: false }) HideTenantId: HiddenComponent;
  @ViewChild('HideUserId', { static: false }) HideUserId: HiddenComponent;
  @ViewChild('HideCurrentStage', { static: false }) HideCurrentStage: HiddenComponent;
  @ViewChild('HideAppId', { static: false }) HideAppId: HiddenComponent;
  @ViewChild('hideDirection', { static: false }) hideDirection: HiddenComponent;
  @ViewChild('PreCPV_CLOSE', { static: false }) PreCPV_CLOSE: ButtonComponent;
  @ViewChild('PreCPVGrid', { static: false }) PreCPVGrid: PreCPVInputGridComponent;

  showExpandedHeader: boolean = true;//state of header i.e expanded-1 or collapsed-0 
  ApplicationId: any;
  userId: any;
  taskId: any;
  instanceId: any;
  isLoanCategory: any = undefined;



  async revalidate(): Promise<number> {
    var totalErrors = 0;
    super.beforeRevalidate();
    await Promise.all([
      this.HEADER.revalidate()
    ]).then((errorCounts) => {
      errorCounts.forEach((errorCount) => {
        totalErrors += errorCount;
      });
    });
    this.errors = totalErrors;
    super.afterRevalidate();
    return totalErrors;
  }
  constructor(services: ServiceStock, public utility: UtilityService) {
    super(services);
    this.value = new PreCPVModel();
    this.componentCode = 'PreCPV';
  }
  setReadOnly(readOnly) {
    super.setBasicFieldsReadOnly(readOnly);
    this.HEADER.setReadOnly(readOnly);
  }
  async onFormLoad() {
    this.setInputs(this.services.dataStore.getData(this.services.routing.currModal));
    this.HideProcessId.setValue('RLO_Process');
    this.HideServiceCode.setValue('ClaimTask');
    this.HideServiceCodeComplete.setValue('CompleteTask');
    this.HideTenantId.setValue('SB1');
    this.HideAppId.setValue('RLO');
    this.HideCurrentStage.setValue('PreCPV');
    this.setDependencies();
    this.ApplicationId = this.services.dataStore.getRouteParam(this.services.routing.currModal, 'appId');
    this.taskId = this.services.dataStore.getRouteParam(this.services.routing.currModal, 'taskId');
    this.instanceId = this.services.dataStore.getRouteParam(this.services.routing.currModal, 'instanceId');
    this.userId = this.services.dataStore.getRouteParam(this.services.routing.currModal, 'userId');

    this.ApplicationId = '3322';
    this.PreCPVGrid.ApplicationId = this.ApplicationId;
    this.PreCPVGrid.fetchDefaultData();
    if (this.userId === undefined || this.userId === '') {
      this.claimTask(this.taskId);
    }


  }

  async claimTask(taskId) {
    console.log("claim task called");
  }
  setInputs(param: any) {
    let params = this.services.http.mapToJson(param);
    if (params['mode']) {
      this.mode = params['mode'];
    }
  }

  async headerState(event) {
    this.showExpandedHeader = event.headerState;
  }
  
  async submitForm(path, apiCode, serviceCode) {
    this.submitData['formName'] = 'PreCPV';
    await super.submit(path, apiCode, serviceCode);
  }
  getFieldInfo() {
    this.amountComponent.forEach(field => { this.additionalInfo[field.fieldID + '_desc'] = field.getFieldInfo(); });
    this.comboFields.forEach(field => { this.additionalInfo[field.fieldID + '_desc'] = field.getFieldInfo(); });
    this.fileUploadFields.forEach(field => { this.additionalInfo[field.fieldID + '_desc'] = field.getFieldInfo(); });
    this.additionalInfo['HEADER_desc'] = this.HEADER.getFieldInfo();
    return this.additionalInfo;
  }
  getFieldValue() {
    this.value.HEADER = this.HEADER.getFieldValue();
    return this.value;
  }
  setValue(inputValue, inputDesc = undefined) {
    this.HEADER.setValue(inputValue['HEADER'], inputDesc['HEADER_desc']);
    this.setBasicFieldsValue(inputValue, inputDesc);
    this.value = new PreCPVModel();
    this.value.setValue(inputValue);
    this.setDependencies();
    this.passNewValue(this.value);
  }
  ngOnInit() {
    if (this.formCode == undefined) { this.formCode = 'PreCPV'; }
    if (this.formOnLoadError) { return; }
    var styleElement = document.createElement('style');
    styleElement.type = 'text/css';
    styleElement.innerHTML = customCss;
    styleElement.id = 'PreCPV_customCss';
    document.getElementsByTagName('head')[0].appendChild(styleElement);

  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    var styleElement = document.getElementById('PreCPV_customCss');
    styleElement.parentNode.removeChild(styleElement);
    this.services.rloui.closeAllConfirmationModal();
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.subsBFldsValueUpdates();
      this.onFormLoad();
      this.checkForHTabOverFlow();
    });
  }
  clearError() {
    this.HEADER.clearError();
    super.clearBasicFieldsError();
    super.clearHTabErrors();
    super.clearVTabErrors();
    this.errors = 0;
    this.errorMessage = [];
  }
  onReset() {
    this.HEADER.onReset();
    super.resetBasicFields();
    this.clearHTabErrors();
    this.clearVTabErrors();
    this.errors = 0;
    this.errorMessage = [];
    this.additionalInfo = undefined;
    this.dependencyMap.clear();
    this.value = new PreCPVModel();
    this.passNewValue(this.value);
    this.setReadOnly(false);
    this.onFormLoad();
  }

  goBack() {
    this.services.rloui.goBack();
  }

  async PreCPV_SUBMIT_click(event) {
    console.log("submit clicked");
  }
  async PreCPV_WITHDRAW_click(event) {
    console.log("withdraw clicked");
  }


  async PreCPV_SENDBACK_click(event) {
    console.log("sendback clicked")
  }

  async PreCPV_CLOSE_click(event) {
    console.log("close clicked");
  }

  broadcastProdCategory(event) {
    console.log("shweta :: application global params", this.services.rloCommonData.globalApplicationDtls);
    // let globlaObj = this.services.rloCommonData.globalApplicationDtls;
    this.isLoanCategory = event.isLoanCategory;
  }


  fieldDependencies = {

  }
}
