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
  @ViewChild('PostCPV_Withdraw', { static: false }) PostCPV_Withdraw: ButtonComponent;
  @ViewChild('PostCPV_Reject', { static: false }) PostCPV_Reject: ButtonComponent;
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
  preCPVTaskId:any=undefined;
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
    //this.userId = sessionStorage.getItem('userId');
    this.ApplicationId = this.services.dataStore.getRouteParam(this.services.routing.currModal, 'appId');

   // this.ApplicationId = 3743;
    //tempARN='1030MOR08840990', '1010VEH00001651','1010VEH00001672';
   // this.services.rloCommonData.globalApplicationDtls.ARN='1010VEH00001672';

    this.PostCPVInputGrid.ApplicationId = this.ApplicationId;
    // if (this.userId === undefined || this.userId == '') {
    //   this.claimTask(this.taskId);
    // }
    // this.PostCPVInputGrid.fetchDefaultData();
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
          } else if (err['ErrorElementPath'] === 'TaskId') {
           // this.HideTaskId.setError(err['ErrorDescription']);
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
    //  console.log("shweta :: application global params", this.services.rloCommonData.globalApplicationDtls);
    // let globlaObj = this.services.rloCommonData.globalApplicationDtls;
    this.isLoanCategory = event.isLoanCategory;
  }
  fieldDependencies = {
  }

  isPostCpvStageValid(){
    let noOfErrors: number=0;
this.PostCPVInputGrid.MstDataMap.forEach(eachCustomer=>{
  if (eachCustomer.verificationList.length > 0){
    eachCustomer.verificationList.forEach(eachVrfn => {
      if (this.PostCPVInputGrid.isEmptyString(eachVrfn.ProposalVerificationID) || this.PostCPVInputGrid.isEmptyString(eachVrfn.RLODecision) || this.PostCPVInputGrid.isEmptyString(eachVrfn.DecisionRemarks)) {
        noOfErrors++;
      }
    });
  }
});
    return noOfErrors;
  }
 async PostCPV_Submit_click(){
  const requestParams = new Map();
  await this.getPreCPVTaskId(requestParams);
//console.log("Pre CPV Id ",this.preCPVTaskId);
//return;
    
  }

  async getPreCPVTaskId(requestParams){
    let inputMap = new Map();
    let preCPVTaskId=undefined;
    inputMap.set('PathParam.userid', this.userId);
    let criteriaJson: any = { "Offset": 1, "Count": 10, FilterCriteria: [] };
    if (this.ApplicationId) {
      criteriaJson.FilterCriteria.push({
        "columnName": "ARN",
        "columnType": "String",
        "conditions": {
          "searchType": "equals",
          "searchText": this.services.rloCommonData.globalApplicationDtls.ARN
        }
      });
      // criteriaJson.FilterCriteria.push({
      //   "columnName": "STAGE_ID",
      //   "columnType": "String",
      //   "conditions": {
      //     "searchType": "equals",
      //     "searchText": "PostCPV"
      //   }
      // });
      inputMap.set('QueryParam.criteriaDetails', criteriaJson);
    this.services.http.fetchApi('/tasks/user/{userid}', 'GET', inputMap, '/los-wf').subscribe(
      async (httpResponse: HttpResponse<any>) => {
        var res = httpResponse.body;
        var loopDataVar7 = [];
        var loopVar7 = res['Tasks'];
        if (loopVar7) {
            var tempObj = {};
            let preCPVTaskObj=loopVar7.find(eachTask=> eachTask.STAGE_ID=='PRE-CPV');
            this.preCPVTaskId=preCPVTaskObj.TASK_ID;
            if(this.isPostCpvStageValid()==0 && this.preCPVTaskId!=undefined) {
              requestParams.set('Body.ApplicationStatus', 'AP');
              requestParams.set('Body.direction', 'AP');
              this.submitPostCPV(requestParams);
            }
        }
          }, async (httpError) => {
            var err = httpError['error']
            if (err != null && err['ErrorElementPath'] != undefined && err['ErrorDescription'] != undefined) {
            }
            this.services.alert.showAlert(2, 'rlo.error.load.form', -1);
          });
        }
  }

  submitPostCPV(requestParams){
    const inputMap = new Map();

    inputMap.clear();
    inputMap.set('HeaderParam.ProcessId', this.HideProcessId.getFieldValue());
    inputMap.set('HeaderParam.ServiceCode', this.HideServiceCode.getFieldValue());
    inputMap.set('Body.TaskId', this.preCPVTaskId);
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
   // console.log("submit body",inputMap);
   // return;
    this.services.http.fetchApi('/acceptPostCPV', 'POST', inputMap, '/rlo-de').subscribe(
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

async PostCPV_Withdraw_click(event) {
  // var title = this.services.rloui.getAlertMessage('rlo.error.invalid.regex');
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
          this.submitPostCPV(requestParams);
        }
      }
    });
  });
}

async PostCPV_REJECT_click(event) {
  const requestParams = new Map();
  requestParams.set('Body.ApplicationStatus', 'Reject');
  requestParams.set('Body.direction', 'RJ');
  var mainMessage = this.services.rloui.getAlertMessage('rlo.reject.comfirmation');
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
          this.submitPostCPV(requestParams);
        }
      }
    });
  });
}

}
