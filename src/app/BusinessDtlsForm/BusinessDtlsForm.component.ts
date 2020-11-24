import { Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import { BusinessDtlsFormModel } from './BusinessDtlsForm.model';
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
import {BusinessHandlerComponent} from './business-handler.component';
import { RloUiCurrencyComponent } from '../rlo-ui-currency/rlo-ui-currency.component';
const customCss: string = '';

@Component({
  selector: 'app-BusinessDtlsForm',
  templateUrl: './BusinessDtlsForm.component.html'
})
export class BusinessDtlsFormComponent extends FormComponent implements OnInit, AfterViewInit {
  @ViewChild('GSTNumber', { static: false }) GSTNumber: TextBoxComponent;
  @ViewChild('UAadhaar', { static: false }) UAadhaar: TextBoxComponent;
  @ViewChild('PaidUpCapital', { static: false }) PaidUpCapital: TextBoxComponent;
  @ViewChild('FYTurnover', { static: false }) FYTurnover: RloUiCurrencyComponent;
  @ViewChild('FYNetProfit', { static: false }) FYNetProfit: RloUiCurrencyComponent;
  @ViewChild('OrgNature', { static: false }) OrgNature: ComboBoxComponent;
  @ViewChild('Constitution', { static: false }) Constitution: ComboBoxComponent;
  @ViewChild('Industry', { static: false }) Industry: ComboBoxComponent;
  @ViewChild('hidOrgNature', { static: false }) hidOrgNature: HiddenComponent;
  @ViewChild('hidConstitution', { static: false }) hidConstitution: HiddenComponent;
  @ViewChild('hidIndustry', { static: false }) hidIndustry: HiddenComponent;
  @ViewChild('hidAppId', { static: false }) hidAppId: HiddenComponent;
  @ViewChild('Handler', { static: false }) Handler: BusinessHandlerComponent;
  @ViewChild('BD_SAVE_BTN', { static: false }) BD_SAVE_BTN: ButtonComponent;
  @ViewChild('BD_CLEAR_BTN', { static: false }) BD_CLEAR_BTN: ButtonComponent;

  BusinessSeq:number=undefined;
  async revalidate(): Promise<number> {
    var totalErrors = 0;
    super.beforeRevalidate();
    await Promise.all([
      this.revalidateBasicField('GSTNumber'),
      this.revalidateBasicField('UAadhaar'),
      this.revalidateBasicField('PaidUpCapital'),
      this.revalidateBasicField('FYTurnover'),
      this.revalidateBasicField('FYNetProfit'),
      this.revalidateBasicField('OrgNature'),
      this.revalidateBasicField('Constitution'),
      this.revalidateBasicField('Industry'),
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
    this.value = new BusinessDtlsFormModel();
    this.componentCode = 'BusinessDtlsForm';
  }
  setReadOnly(readOnly) {
    super.setBasicFieldsReadOnly(readOnly);
  }
  async onFormLoad() {
    this.setInputs(this.services.dataStore.getData(this.services.routing.currModal));
    this.hidOrgNature.setValue('ORG_NATURE');
    this.hidConstitution.setValue('CONSTITUTION');
    this.hidIndustry.setValue('INDUSTRY');
    this.hidAppId.setValue('RLO');
    this.FetchBusinessDtls();

    await this.Handler.onFormLoad({
    });

    this.setDependencies();
  }
  setInputs(param: any) {
    let params = this.services.http.mapToJson(param);
    if (params['mode']) {
      this.mode = params['mode'];
    }
  }
  async submitForm(path, apiCode, serviceCode) {
    this.submitData['formName'] = 'BusinessDtlsForm';
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
    this.value = new BusinessDtlsFormModel();
    this.value.setValue(inputValue);
    this.setDependencies();
    this.passNewValue(this.value);
  }
  ngOnInit() {
    if (this.formCode == undefined) { this.formCode = 'BusinessDtlsForm'; }
    if (this.formOnLoadError) { return; }
    var styleElement = document.createElement('style');
    styleElement.type = 'text/css';
    styleElement.innerHTML = customCss;
    styleElement.id = 'BusinessDtlsForm_customCss';
    document.getElementsByTagName('head')[0].appendChild(styleElement);
  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    var styleElement = document.getElementById('BusinessDtlsForm_customCss');
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
    this.value = new BusinessDtlsFormModel();
    this.passNewValue(this.value);
    this.setReadOnly(false);
    this.FYTurnover.resetFieldAndDropDown();
    this.FYNetProfit.resetFieldAndDropDown();
    this.onFormLoad();
  }

  customGenericOnBlur(event: any) {
    this.genericOnBlur(event.field, event.textFieldValue);
  }

 async BD_SAVE_BTN_click(event){
    let inputMap = new Map();
    inputMap.clear();
    this.BD_SAVE_BTN.setDisabled(true);
    var noOfError: number = await this.revalidate();
    if (noOfError == 0) {
      if (this.BusinessSeq != undefined) {

        inputMap = this.generateBusinessSaveUpdateReq(inputMap);

        this.services.http.fetchApi('/BusinessDtls/{BusinessDtlsSeq}', 'PUT', inputMap, '/rlo-de').subscribe(
          async (httpResponse: HttpResponse<any>) => {
            var res = httpResponse.body;
            this.services.alert.showAlert(1, 'rlo.success.update.businessdtls', 5000);
            this.onReset();
            this.BD_SAVE_BTN.setDisabled(false);
          },
          async (httpError) => {
            this.parseResponseError(httpError['error']);
            this.services.alert.showAlert(2, 'rlo.error.update.businessdtls', -1);
            this.BD_SAVE_BTN.setDisabled(false);
          }
        );
      }
      else {
        inputMap = this.generateBusinessSaveUpdateReq(inputMap);
        this.services.http.fetchApi('/BusinessDtls', 'POST', inputMap, '/rlo-de').subscribe(
          async (httpResponse: HttpResponse<any>) => {
            var res = httpResponse.body;
            this.services.alert.showAlert(1, 'rlo.success.save.businessdtls', 5000);
            this.onReset();
            this.BD_SAVE_BTN.setDisabled(false);
          },
          async (httpError) => {
            this.parseResponseError(httpError['error']);
            this.services.alert.showAlert(2, 'rlo.error.save.businessdtls', -1);
            this.BD_SAVE_BTN.setDisabled(false);
          }
        );
      }
    }
    else {
      this.services.alert.showAlert(2, 'rlo.error.invalid.form', -1);
      this.BD_SAVE_BTN.setDisabled(false);
    }
    }

    generateBusinessSaveUpdateReq(inputMap) {
      inputMap.clear();
      if (this.BusinessSeq != undefined) {
        inputMap.set('PathParam.BusinessDtlsSeq', this.BusinessSeq);
      }
      inputMap.set('Body.BusinessDtls.ApplicationId', this.ApplicationId);
      inputMap.set('Body.BusinessDtls.GSTNumber', this.GSTNumber.getFieldValue());
      inputMap.set('Body.BusinessDtls.UAadhaar', this.UAadhaar.getFieldValue());
      inputMap.set('Body.BusinessDtls.PaidUpCapitals', this.PaidUpCapital.getFieldValue());
      inputMap.set('Body.BusinessDtls.FYTurnover', this.FYTurnover.getFieldValue());
      inputMap.set('Body.BusinessDtls.FYNetProfit', this.FYNetProfit.getFieldValue());
      inputMap.set('Body.BusinessDtls.OrganizationNature', this.OrgNature.getFieldValue());
      inputMap.set('Body.BusinessDtls.Constitution', this.Constitution.getFieldValue());
      inputMap.set('Body.BusinessDtls.Industry', this.Industry.getFieldValue());
      return inputMap;
    }
    parseResponseError(err) {

      if (err != null && err['ErrorElementPath'] != undefined && err['ErrorDescription'] != undefined) {
        if (err['ErrorElementPath'] == 'BusinessDtls.GSTNumber') {
          this.GSTNumber.setError(err['ErrorDescription']);
        }
        else if (err['ErrorElementPath'] == 'BusinessDtls.UAadhaar') {
          this.UAadhaar.setError(err['ErrorDescription']);
        }
        else if (err['ErrorElementPath'] == 'BusinessDtls.PaidUpCapitals') {
          this.PaidUpCapital.setError(err['ErrorDescription']);
        }
        else if (err['ErrorElementPath'] == 'BusinessDtls.FYTurnover') {
          this.FYTurnover.setError(err['ErrorDescription']);
        }
        else if (err['ErrorElementPath'] == 'BusinessDtls.FYNetProfit') {
          this.FYNetProfit.setError(err['ErrorDescription']);
        }
        else if (err['ErrorElementPath'] == 'BusinessDtls.OrganizationNature') {
          this.OrgNature.setError(err['ErrorDescription']);
        }
        else if (err['ErrorElementPath'] == 'BusinessDtls.Constitution') {
          this.Constitution.setError(err['ErrorDescription']);
        }
        else if (err['ErrorElementPath'] == 'BusinessDtls.Industry') {
          this.Industry.setError(err['ErrorDescription']);
        }
      }
    }

    async FetchBusinessDtls() {
      let inputMap = new Map();
      inputMap.clear();
      if (this.ApplicationId) {
        let criteriaJson: any = { "Offset": 1, "Count": 10, FilterCriteria: [] };
        criteriaJson.FilterCriteria.push({
          "columnName": "ApplicationId",
          "columnType": "String",
          "conditions": {
            "searchType": "equals",
            "searchText": this.ApplicationId
          }
        });
        inputMap.set('QueryParam.criteriaDetails', criteriaJson);
        this.services.http.fetchApi('/BusinessDtls', 'GET', inputMap, '/rlo-de').subscribe(
          async (httpResponse: HttpResponse<any>) => {
            let res = httpResponse.body;
            if (res) {
              let BusinessDtls = res['BusinessDtls'];
              if (BusinessDtls) {
                console.log("shweta :: Education loan fetched : ", BusinessDtls);
                this.parseGetBusinessResp(BusinessDtls[0]);
              }
            } 
          },
          async (httpError) => {
            var err = httpError['error']
            if (err != null && err['ErrorElementPath'] != undefined && err['ErrorDescription'] != undefined) {
            }
          }
        );
        this.setDependencies();
      }
    }

    parseGetBusinessResp(BusinessDtls) {
      this.BusinessSeq = BusinessDtls.BusinessDtlsSeq;
      this.GSTNumber.setValue(BusinessDtls.GSTNumber);
      this.UAadhaar.setValue(BusinessDtls.UAadhaar);
      this.PaidUpCapital.setValue(BusinessDtls.PaidUpCapitals);
      this.FYTurnover.setComponentSpecificValue(BusinessDtls.FYTurnover);
      this.FYNetProfit.setComponentSpecificValue(BusinessDtls.FYNetProfit);
      this.OrgNature.setValue(BusinessDtls.OrganizationNature);
      this.Constitution.setValue(BusinessDtls.Constitution);
      this.Industry.setValue(BusinessDtls.Industry);
    }
  fieldDependencies = {
    OrgNature: {
      inDep: [

        { paramKey: "VALUE1", depFieldID: "OrgNature", paramType: "PathParam" },
        { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
        { paramKey: "KEY1", depFieldID: "hidOrgNature", paramType: "QueryParam" },
      ],
      outDep: [
      ]
    },
    Constitution: {
      inDep: [

        { paramKey: "VALUE1", depFieldID: "Constitution", paramType: "PathParam" },
        { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
        { paramKey: "KEY1", depFieldID: "hidConstitution", paramType: "QueryParam" },
      ],
      outDep: [
      ]
    },
    Industry: {
      inDep: [

        { paramKey: "VALUE1", depFieldID: "Industry", paramType: "PathParam" },
        { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
        { paramKey: "KEY1", depFieldID: "hidIndustry", paramType: "QueryParam" },
      ],
      outDep: [
      ]
    }
  }

}
