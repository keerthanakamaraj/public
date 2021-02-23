import { Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import { PostCPVModel } from './PostCPV.model';
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
import { PostCPVInputGridComponent } from '../PostCPVInputGrid/PostCPVInputGrid.component';
import { HeaderComponent } from '../Header/Header.component';

const customCss: string = '';

@Component({
  selector: 'app-PostCPV',
  templateUrl: './PostCPV.component.html'
})
export class PostCPVComponent extends FormComponent implements OnInit, AfterViewInit {
  @ViewChild('PostCPVInputGrid', { static: false }) PostCPVInputGrid: PostCPVInputGridComponent;
  @ViewChild('HEADER', { static: false }) HEADER: HeaderComponent;
  @ViewChild('PostCPV_Submit', { static: false }) PostCPV_Submit: ButtonComponent;
  @ViewChild('PostCPV_Reset', { static: false }) PostCPV_Reset: ButtonComponent;
  @ViewChild('PostCPV_Cancel', { static: false }) PostCPV_Cancel: ButtonComponent;
  @ViewChild('HideProcessId', { static: false }) HideProcessId: HiddenComponent;
  @ViewChild('HideServiceCode', { static: false }) HideServiceCode: HiddenComponent;
  @ViewChild('HideServiceCodeComplete', { static: false }) HideServiceCodeComplete: HiddenComponent;
  // @ViewChild('HideTaskId', { static: false }) HideTaskId: HiddenComponent;
  @ViewChild('HideTenantId', { static: false }) HideTenantId: HiddenComponent;
  @ViewChild('HideUserId', { static: false }) HideUserId: HiddenComponent;
  @ViewChild('HideCurrentStage', { static: false }) HideCurrentStage: HiddenComponent;
  @ViewChild('HideAppId', { static: false }) HideAppId: HiddenComponent;
  @ViewChild('hideDirection', { static: false }) hideDirection: HiddenComponent;

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
    this.value = new PostCPVModel();
    this.componentCode = 'PostCPV';
  }
  setReadOnly(readOnly) {
    super.setBasicFieldsReadOnly(readOnly);
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
    this.taskId = this.services.dataStore.getRouteParam(this.services.routing.currModal, 'taskId');
    this.instanceId = this.services.dataStore.getRouteParam(this.services.routing.currModal, 'instanceId');
    this.userId = this.services.dataStore.getRouteParam(this.services.routing.currModal, 'userId');
    this.ApplicationId = this.services.dataStore.getRouteParam(this.services.routing.currModal, 'appId');

    this.ApplicationId = 3322;
    //tempARN='1030MOR08840990';
    // this.services.rloCommonData.globalApplicationDtls.ARN='1030MOR08840990';

    this.PostCPVInputGrid.ApplicationId = this.ApplicationId;
    // this.PostCPVInputGrid.fetchDefaultData();
  }
  setInputs(param: any) {
    let params = this.services.http.mapToJson(param);
    if (params['mode']) {
      this.mode = params['mode'];
    }
  }
  async submitForm(path, apiCode, serviceCode) {
    this.submitData['formName'] = 'PostCPV';
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
    this.value = new PostCPVModel();
    this.value.setValue(inputValue);
    this.setDependencies();
    this.passNewValue(this.value);
  }
  ngOnInit() {
    if (this.formCode == undefined) { this.formCode = 'PostCPV'; }
    if (this.formOnLoadError) { return; }
    var styleElement = document.createElement('style');
    styleElement.type = 'text/css';
    styleElement.innerHTML = customCss;
    styleElement.id = 'PostCPV_customCss';
    document.getElementsByTagName('head')[0].appendChild(styleElement);
  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    var styleElement = document.getElementById('PostCPV_customCss');
    styleElement.parentNode.removeChild(styleElement);
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.subsBFldsValueUpdates();
      this.onFormLoad();
      this.checkForHTabOverFlow();
    });
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
    this.value = new PostCPVModel();
    this.passNewValue(this.value);
    this.setReadOnly(false);
    this.onFormLoad();
  }
  goBack() {
    this.services.rloui.goBack();
  }
  broadcastProdCategory(event) {
    
    // let globlaObj = this.services.rloCommonData.globalApplicationDtls;
    this.isLoanCategory = event.isLoanCategory;
  }
  fieldDependencies = {
  }

}
