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
  // @ViewChild('HideTaskId', { static: false }) HideTaskId: HiddenComponent;

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

    this.PreCPVGrid.ApplicationId = this.ApplicationId;
    //this.PreCPVGrid.fetchDefaultData();
    if (this.userId === undefined || this.userId === '') {
      this.claimTask(this.taskId);
    }


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
          this.services.alert.showAlert(1, 'rlo.success.claim.dde', 5000);
          this.userId = sessionStorage.getItem('userId')
        } else {
          this.services.alert.showAlert(2, 'rlo.error.claim.dde', -1);
        }
      },
      async (httpError) => {
        const err = httpError['error'];
        if (err != null && err['ErrorElementPath'] !== undefined && err['ErrorDescription'] !== undefined) {
          if (err['ErrorElementPath'] === 'ServiceCode') {
            this.HideServiceCode.setError(err['ErrorDescription']);
          } else if (err['ErrorElementPath'] === 'ProcessId') {
            this.HideProcessId.setError(err['ErrorDescription']);
          // } else if (err['ErrorElementPath'] === 'TaskId') {
          //   this.HideTaskId.setError(err['ErrorDescription']);
          // 
          } else if (err['ErrorElementPath'] === 'TENANT_ID') {
            this.HideTenantId.setError(err['ErrorDescription']);
          } else if (err['ErrorElementPath'] === 'UserId') {
            this.HideUserId.setError(err['ErrorDescription']);
          }
        }
        this.services.alert.showAlert(2, 'rlo.error.claim.dde', -1);
      }
    );
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
  isPreCpvStageValid(){
    return true;
  }

  submitPreCPV(requestParams){
    const inputMap = new Map();

    inputMap.clear();
    inputMap.set('HeaderParam.ProcessId', this.HideProcessId.getFieldValue());
    inputMap.set('HeaderParam.ServiceCode', this.HideServiceCode.getFieldValue());
    inputMap.set('Body.TaskId', this.taskId);
    inputMap.set('Body.TENANT_ID', this.HideTenantId.getFieldValue());
    inputMap.set('Body.UserId', this.userId);
    inputMap.set('Body.CurrentStage', this.HideCurrentStage.getFieldValue());
    inputMap.set('Body.ApplicationId', this.ApplicationId);
    inputMap.set('Body.CreatedBy', this.userId);
    inputMap.set('Body.ProductCategory', this.services.rloCommonData.globalApplicationDtls.TypeOfLoanCode);


    if (requestParams) {
      requestParams.forEach((val, key) => {
        inputMap.set(key, val);
      });
    } else {
      return;
    }

    this.services.http.fetchApi('/acceptPreCPV', 'POST', inputMap, '/rlo-de').subscribe(
      async (httpResponse: HttpResponse<any>) => {
        const res = httpResponse.body;

        const action: string = (requestParams.get('Body.ApplicationStatus')).toUpperCase();

        let alertMsg = 'rlo.success.submit';
        switch (action) {
          case 'WITHDRAW':
            alertMsg = 'rlo.success.withdraw';
            break;
          case 'REJECT':
            alertMsg = 'rlo.success.reject';
            break;
          default:
            alertMsg = 'rlo.success.submit';
            break;
        }

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
      },
      async (httpError) => {
        const err = httpError['error'];
        if (err != null && err['ErrorElementPath'] !== undefined && err['ErrorDescription'] !== undefined) {
          if (err['ErrorElementPath'] === 'CurrentStage') {
            this.HideCurrentStage.setError(err['ErrorDescription']);
          } else if (err['ErrorElementPath'] === 'UserId') {
            this.HideUserId.setError(err['ErrorDescription']);
          } else if (err['ErrorElementPath'] === 'TENANT_ID') {
            this.HideTenantId.setError(err['ErrorDescription']);
          }
          this.services.alert.showAlert(2, 'Fail to Submit', -1);
        }
      }
    );
  }
  // async PreCPV_SUBMIT_click(event) {
  //   const requestParams = new Map();

  //   if(this.isPreCpvStageValid()) {
  //       requestParams.set('Body.ApplicationStatus', 'AP');
  //       requestParams.set('Body.direction', 'AP');
  //       this.submitPreCPV(requestParams);
  //     }
  //   }

  
  broadcastProdCategory(event) {
    //console.log("shweta :: application global params", this.services.rloCommonData.globalApplicationDtls);
    // let globlaObj = this.services.rloCommonData.globalApplicationDtls;
    this.isLoanCategory = event.isLoanCategory;
  }


  fieldDependencies = {

  }
}
