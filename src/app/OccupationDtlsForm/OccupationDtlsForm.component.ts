import { Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import { OccupationDtlsFormModel } from './OccupationDtlsForm.model';
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
import { OccuptionDtlsGridComponent } from '../OccuptionDtlsGrid/OccuptionDtlsGrid.component';
import { OccupationHandlerComponent } from '../OccupationDtlsForm/occupation-handler.component';
import { RloUiAccordionComponent } from 'src/app/rlo-ui-accordion/rlo-ui-accordion.component';

const customCss: string = '';

@Component({
  selector: 'app-OccupationDtlsForm',
  templateUrl: './OccupationDtlsForm.component.html'
})
export class OccupationDtlsFormComponent extends FormComponent implements OnInit, AfterViewInit {
  @ViewChild('OD_OCCUPATION', { static: false }) OD_OCCUPATION: ComboBoxComponent;
  @ViewChild('OD_EMPLT_TYPE', { static: false }) OD_EMPLT_TYPE: ComboBoxComponent;
  @ViewChild('OD_SELF_EMPLD_PROF', { static: false }) OD_SELF_EMPLD_PROF: TextBoxComponent;
  @ViewChild('OD_SELF_EMPLD_TYPE', { static: false }) OD_SELF_EMPLD_TYPE: ComboBoxComponent;
  @ViewChild('OD_EMPLOYEE_ID', { static: false }) OD_EMPLOYEE_ID: TextBoxComponent;
  @ViewChild('OD_DEPARTMENT', { static: false }) OD_DEPARTMENT: TextBoxComponent;
  @ViewChild('OD_DESIGNATION', { static: false }) OD_DESIGNATION: ComboBoxComponent;
  @ViewChild('OD_DATE_OF_JOINING', { static: false }) OD_DATE_OF_JOINING: DateComponent;
  @ViewChild('OD_DT_OF_INCPTN', { static: false }) OD_DT_OF_INCPTN: DateComponent;
  @ViewChild('OD_INDUSTRY', { static: false }) OD_INDUSTRY: ComboBoxComponent;
  @ViewChild('OD_NTR_OF_BUSS', { static: false }) OD_NTR_OF_BUSS: ComboBoxComponent;
  @ViewChild('OD_COMPANY_CODE', { static: false }) OD_COMPANY_CODE: ComboBoxComponent;
  @ViewChild('OD_COMP_CAT', { static: false }) OD_COMP_CAT: TextBoxComponent;
  @ViewChild('OD_COMP_NAME', { static: false }) OD_COMP_NAME: TextBoxComponent;
  @ViewChild('OD_LENGTH_OF_EXST', { static: false }) OD_LENGTH_OF_EXST: TextBoxComponent;
  @ViewChild('OD_INC_DOC_TYPE', { static: false }) OD_INC_DOC_TYPE: ComboBoxComponent;
  @ViewChild('OD_NET_INCOME', { static: false }) OD_NET_INCOME: TextBoxComponent;
  @ViewChild('OD_INCOME_FREQ', { static: false }) OD_INCOME_FREQ: ComboBoxComponent;
  @ViewChild('OD_EMP_STATUS', { static: false }) OD_EMP_STATUS: ComboBoxComponent;
  @ViewChild('OD_INCOME_TYPE', { static: false }) OD_INCOME_TYPE: ComboBoxComponent;
  @ViewChild('OD_WRK_PERMIT_NO', { static: false }) OD_WRK_PERMIT_NO: TextBoxComponent;
  @ViewChild('OD_RES_PRT_NO', { static: false }) OD_RES_PRT_NO: TextBoxComponent;
  @ViewChild('OD_CURRENCY', { static: false }) OD_CURRENCY: ComboBoxComponent;
  @ViewChild('OD_LOC_CURR_EQ', { static: false }) OD_LOC_CURR_EQ: TextBoxComponent;
  @ViewChild('OD_SAVE_BTN', { static: false }) OD_SAVE_BTN: ButtonComponent;
  @ViewChild('OD_CLEAR_BTN', { static: false }) OD_CLEAR_BTN: ButtonComponent;
  @ViewChild('OCC_DTLS_GRID', { static: false }) OCC_DTLS_GRID: OccuptionDtlsGridComponent;
  @ViewChild('Handler', { static: false }) Handler: OccupationHandlerComponent;
  @ViewChild('hidExchangeRate', { static: false }) hidExchangeRate: HiddenComponent;
  @ViewChild('hideCurrencyDesc', { static: false }) hideCurrencyDesc: HiddenComponent;
  @ViewChild('HidOccupation', { static: false }) HidOccupation: HiddenComponent;
  @ViewChild('HidAppId', { static: false }) HidAppId: HiddenComponent;
  @ViewChild('HidIncomeDocType', { static: false }) HidIncomeDocType: HiddenComponent;
  @ViewChild('HidDesignation', { static: false }) HidDesignation: HiddenComponent;
  @ViewChild('HidIndustry', { static: false }) HidIndustry: HiddenComponent;
  @ViewChild('hidBorrowerSeq', { static: false }) hidBorrowerSeq: HiddenComponent;
  @ViewChild('HidSelfEmpType', { static: false }) HidSelfEmpType: HiddenComponent;
  @ViewChild('HidNatureOfBusiness', { static: false }) HidNatureOfBusiness: HiddenComponent;
  @ViewChild('HidEmpStatus', { static: false }) HidEmpStatus: HiddenComponent;
  @ViewChild('HidEmpType', { static: false }) HidEmpType: HiddenComponent;
  @ViewChild('HidIncomeFrequency', { static: false }) HidIncomeFrequency: HiddenComponent;
  @ViewChild('HidIncomeType', { static: false }) HidIncomeType: HiddenComponent;
  @ViewChild('HidCurrency', { static: false }) HidCurrency: HiddenComponent;
  @ViewChild('HidOccupationSeq', { static: false }) HidOccupationSeq: HiddenComponent;
  @ViewChild('OCCP_ACCORD', { static: false }) OCCP_ACCORD: RloUiAccordionComponent;
  @Output() occpOnBlur: EventEmitter<any> = new EventEmitter<any>();
  @Output() updateStageValidation: EventEmitter<any> = new EventEmitter<any>();
  @Input() parentFormCode: string;
  @Input('readOnly') readOnly: boolean = false;
  fieldArray: any[];
  activeBorrowerSeq: any;

  async revalidate(): Promise<number> {
    var totalErrors = 0;
    super.beforeRevalidate();
    await Promise.all([
      this.revalidateBasicField('OD_OCCUPATION'),
      this.revalidateBasicField('OD_EMPLT_TYPE'),
      this.revalidateBasicField('OD_SELF_EMPLD_PROF'),
      this.revalidateBasicField('OD_SELF_EMPLD_TYPE'),
      this.revalidateBasicField('OD_EMPLOYEE_ID'),
      this.revalidateBasicField('OD_DEPARTMENT'),
      this.revalidateBasicField('OD_DESIGNATION'),
      this.revalidateBasicField('OD_DATE_OF_JOINING'),
      this.revalidateBasicField('OD_DT_OF_INCPTN'),
      this.revalidateBasicField('OD_INDUSTRY'),
      this.revalidateBasicField('OD_NTR_OF_BUSS'),
      this.revalidateBasicField('OD_COMPANY_CODE'),
      this.revalidateBasicField('OD_COMP_CAT'),
      this.revalidateBasicField('OD_COMP_NAME'),
      this.revalidateBasicField('OD_LENGTH_OF_EXST'),
      this.revalidateBasicField('OD_INC_DOC_TYPE'),
      this.revalidateBasicField('OD_NET_INCOME'),
      this.revalidateBasicField('OD_INCOME_FREQ'),
      this.revalidateBasicField('OD_EMP_STATUS'),
      this.revalidateBasicField('OD_INCOME_TYPE'),
      this.revalidateBasicField('OD_WRK_PERMIT_NO'),
      this.revalidateBasicField('OD_RES_PRT_NO'),
      this.revalidateBasicField('OD_CURRENCY'),
      //this.revalidateBasicField('OD_LOC_CURR_EQ'),
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
    this.value = new OccupationDtlsFormModel();
    this.componentCode = 'OccupationDtlsForm';
  }
  setReadOnly(readOnly) {
    super.setBasicFieldsReadOnly(readOnly);
  }
  async onFormLoad() {
    this.setInputs(this.services.dataStore.getData(this.services.routing.currModal));
    this.hideCurrencyDesc.setValue('INR');
    this.HidOccupation.setValue('OCCUPATION');
    this.HidAppId.setValue('RLO');
    this.HidIncomeDocType.setValue('INCOME_DOC_TYPE');
    this.HidDesignation.setValue('DESIGNATION');
    this.HidIndustry.setValue('INDUSTRY');
    this.HidSelfEmpType.setValue('SELF_EMPLOYED_TYPE');
    this.HidNatureOfBusiness.setValue('NATURE_OF_BUSINESS');
    this.HidEmpStatus.setValue('EMPLOYMENT_STATUS');
    this.HidEmpType.setValue('EMPLOYMENT_TYPE');
    this.HidIncomeFrequency.setValue('FREQUENCY');
    this.HidIncomeType.setValue('INCOME_TYPE');
    this.HidCurrency.setValue('CURRENCY');
    let inputMap = new Map();

    await this.Handler.onFormLoad({
    });

    if (this.activeBorrowerSeq !== undefined) {
      //this.occBorrowerSeq =  this.activeBorrowerSeq;
      await this.OCC_DTLS_GRID.gridDataLoad({
        'refNumToGrid': this.activeBorrowerSeq
      });
    }

    // if (this.occBorrowerSeq !== undefined) {
    //   await this.OCC_DTLS_GRID.gridDataLoad({
    //     'refNumToGrid': this.occBorrowerSeq
    //   });
    // }
    console.log(this.OCC_DTLS_GRID.columnDefs);
    if (this.readOnly) {
      this.OCC_DTLS_GRID.columnDefs = this.OCC_DTLS_GRID.columnDefs.slice(0, 5);
      this.OCC_DTLS_GRID.columnDefs[4].width = 12;
      this.OCC_DTLS_GRID.columnDefs[4].cellRendererParams.CustomClass = "btn-views";
      this.OCC_DTLS_GRID.columnDefs[4].cellRendererParams.IconClass = 'fas fa-eye fa-lg';
    }
    this.setDependencies();
  }
  setInputs(param: any) {
    let params = this.services.http.mapToJson(param);
    if (params['mode']) {
      this.mode = params['mode'];
    }
  }
  async submitForm(path, apiCode, serviceCode) {
    this.submitData['formName'] = 'Main form for occupation details';
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
    this.value = new OccupationDtlsFormModel();
    this.value.setValue(inputValue);
    this.setDependencies();
    this.passNewValue(this.value);
  }
  ngOnInit() {
    if (this.formCode == undefined) { this.formCode = 'OccupationDtlsForm'; }
    if (this.formOnLoadError) { return; }
    var styleElement = document.createElement('style');
    styleElement.type = 'text/css';
    styleElement.innerHTML = customCss;
    styleElement.id = 'OccupationDtlsForm_customCss';
    document.getElementsByTagName('head')[0].appendChild(styleElement);
  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    var styleElement = document.getElementById('OccupationDtlsForm_customCss');
    styleElement.parentNode.removeChild(styleElement);
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.subsBFldsValueUpdates();
      this.onFormLoad();
      this.checkForHTabOverFlow();
    });
    console.log(this.readOnly);

    if (this.readOnly) {
      this.setReadOnly(this.readOnly);
    }
  }
  joinDate(selectedDate) {
    const moment = require('moment');
    const currentDate = moment();
    currentDate.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });

    selectedDate = moment(selectedDate, 'DD-MM-YYYY');
    console.log("current date :: ", currentDate._d);
    console.log("selected date :: ", selectedDate._d);
    if (selectedDate >= currentDate) {
      return false;
    }
    return true;
  }

  dt_Incptn(selectedDate) {
    const moment = require('moment');
    const currentDate = moment();
    currentDate.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
    selectedDate = moment(selectedDate, 'DD-MM-YYYY');
    console.log("current date :: ", currentDate._d);
    console.log("selected date :: ", selectedDate._d);
    if (selectedDate > currentDate) {
      return false;
    }
    return true;
  }



  async OD_DATE_OF_JOINING_blur(event) {
    let inputMap = new Map();
    if (!this.joinDate(this.OD_DATE_OF_JOINING.getFieldValue())) {
      this.OD_DATE_OF_JOINING.setError('Please select correct date of joining');
      return 1;
      // this.services.alert.showAlert(2, 'rlo.error.joiningdate.occupation', -1);

    }
  }

  async OD_DT_OF_INCPTN_blur(event) {
    let inputMap = new Map();
    if (!this.dt_Incptn(this.OD_DT_OF_INCPTN.getFieldValue())) {
      this.OD_DT_OF_INCPTN.setError('Please select correct date of inception')
      return 1;
      // this.services.alert.showAlert(2, 'rlo.error.inceptiondate.occupation', -1);
      // this.OD_DT_OF_INCPTN.onReset();
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
    this.value = new OccupationDtlsFormModel();
    this.passNewValue(this.value);
    this.setReadOnly(false);
    this.onFormLoad();
  }
  async OD_OCCUPATION_change(fieldID, value) {
    let inputMap = new Map();
    this.Handler.occupationOnchange();
    // this.occpOnBlur.emit({});
  }
  async OD_CURRENCY_blur(event) {
    let inputMap = new Map();
    this.Handler.netIncomeOnblur()
  }
  async OD_NET_INCOME_blur(event) {
    let inputMap = new Map();
    this.Handler.netIncomeOnblur()
    // await this.Handler.onAddTypeChange();
  }

  async OD_COMPANY_CODE_change(fieldID, value) {
    let inputMap = new Map();
    this.Handler.companyCodeChange();
  }
  async OD_SAVE_BTN_click(event) {
    let inputMap = new Map();
    let occupationGridData: any = this.OCC_DTLS_GRID.getOccupationGridData();
    var nooferror: number = await this.revalidate();
    if (nooferror == 0) {
      //if(this.OD_COMP_NAME.getFieldValue() !== undefined){
      if (occupationGridData) {
        for (let i = 0; i < occupationGridData.length; i++) {
          if (occupationGridData[i].OCCUPATION_ID !== this.HidOccupationSeq.getFieldValue()) {
            if (this.OD_COMP_NAME.getFieldValue() !== undefined && occupationGridData[i].OD_COMPANY_NAME === this.OD_COMP_NAME.getFieldValue()) {

              this.services.alert.showAlert(2, 'rlo.error.occupation.company.exist', -1);
              return;
            } else if (this.OD_INCOME_TYPE.getFieldValue() === 'PRI' && occupationGridData[i].OD_INCOME_TYPE === 'PRI') {
              this.services.alert.showAlert(2, 'rlo.error.occupation.primaryIncome.exist', -1);
              return;
            }
          }
        }
      }

      //}

      // this.OD_SAVE_BTN.setDisabled(true);
      if (typeof (this.HidOccupationSeq.getFieldValue()) !== 'undefined') {
        inputMap.clear();
        inputMap.set('PathParam.OccupationSeq', this.HidOccupationSeq.getFieldValue());
        inputMap.set('Body.OccupationDetails.Occupation', this.OD_OCCUPATION.getFieldValue());
        inputMap.set('Body.OccupationDetails.Employment Type', this.OD_EMPLT_TYPE.getFieldValue());
        inputMap.set('Body.OccupationDetails.SelfEmploymentProfession', this.OD_SELF_EMPLD_PROF.getFieldValue());
        inputMap.set('Body.OccupationDetails.EmployeeID', this.OD_EMPLOYEE_ID.getFieldValue());
        inputMap.set('Body.OccupationDetails.Department', this.OD_DEPARTMENT.getFieldValue());
        inputMap.set('Body.OccupationDetails.Designation', this.OD_DESIGNATION.getFieldValue());
        inputMap.set('Body.OccupationDetails.DateofJoining', this.OD_DATE_OF_JOINING.getFieldValue());
        inputMap.set('Body.OccupationDetails.DateofInception', this.OD_DT_OF_INCPTN.getFieldValue());
        inputMap.set('Body.OccupationDetails.Industry', this.OD_INDUSTRY.getFieldValue());
        inputMap.set('Body.OccupationDetails.NatureofBusiness', this.OD_NTR_OF_BUSS.getFieldValue());
        inputMap.set('Body.OccupationDetails.CompanyLicenseNo', this.OD_COMPANY_CODE.getFieldValue());
        inputMap.set('Body.OccupationDetails.Grade', this.OD_COMP_CAT.getFieldValue());
        inputMap.set('Body.OccupationDetails.CompanyName', this.OD_COMP_NAME.getFieldValue());
        inputMap.set('Body.OccupationDetails.LengthOfExistance', this.OD_LENGTH_OF_EXST.getFieldValue());
        inputMap.set('Body.OccupationDetails.IncomeDocumentType', this.OD_INC_DOC_TYPE.getFieldValue());
        inputMap.set('Body.OccupationDetails.NetIncome', this.OD_NET_INCOME.getFieldValue());
        inputMap.set('Body.OccupationDetails.IncomeFrequecy', this.OD_INCOME_FREQ.getFieldValue());
        inputMap.set('Body.OccupationDetails.EmploymentStatus', this.OD_EMP_STATUS.getFieldValue());
        inputMap.set('Body.OccupationDetails.IncomeType', this.OD_INCOME_TYPE.getFieldValue());
        inputMap.set('Body.OccupationDetails.WorkPermitNumber', this.OD_WRK_PERMIT_NO.getFieldValue());
        inputMap.set('Body.OccupationDetails.ResidencePermitNumber', this.OD_RES_PRT_NO.getFieldValue());
        inputMap.set('Body.OccupationDetails.Currency', this.OD_CURRENCY.getFieldValue());
        inputMap.set('Body.OccupationDetails.BorrowerSeq', this.activeBorrowerSeq);
        inputMap.set('Body.OccupationDetails.LocalCurrencyEquivalent', this.OD_LOC_CURR_EQ.getFieldValue());
        this.services.http.fetchApi('/OccupationDetails/{OccupationSeq}', 'PUT', inputMap, '/rlo-de').subscribe(
          async (httpResponse: HttpResponse<any>) => {
            var res = httpResponse.body;
            this.services.alert.showAlert(1, 'rlo.success.update.occupation', 5000);

            // this.occpOnBlur.emit({}); -- Sprint 3 Present, Dev missing

            // this.OD_SAVE_BTN.setDisabled(false);

            // await this.OCC_DTLS_GRID.gridDataLoad({
            //   'refNumToGrid': this.occBorrowerSeq,
            // });
            this.onReset();

          },
          async (httpError) => {
            var err = httpError['error']
            if (err != null && err['ErrorElementPath'] != undefined && err['ErrorDescription'] != undefined) {
              if (err['ErrorElementPath'] == 'OccupationDetails.LocalCurrencyEquivalent') {
                this.OD_LOC_CURR_EQ.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'OccupationDetails.Currency') {
                this.OD_CURRENCY.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'OccupationDetails.ResidencePermitNumber') {
                this.OD_RES_PRT_NO.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'OccupationDetails.WorkPermitNumber') {
                this.OD_WRK_PERMIT_NO.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'OccupationDetails.IncomeType') {
                this.OD_INCOME_TYPE.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'OccupationDetails.EmploymentStatus') {
                this.OD_EMP_STATUS.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'OccupationDetails.IncomeFrequecy') {
                this.OD_INCOME_FREQ.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'OccupationDetails.NetIncome') {
                this.OD_NET_INCOME.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'OccupationDetails.IncomeDocumentType') {
                this.OD_INC_DOC_TYPE.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'OccupationDetails.LengthOfExistance') {
                this.OD_LENGTH_OF_EXST.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'OccupationDetails.CompanyName') {
                this.OD_COMP_NAME.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'OccupationDetails.Grade') {
                this.OD_COMP_CAT.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'OccupationDetails.CompanyLicenseNo') {
                this.OD_COMPANY_CODE.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'OccupationDetails.NatureofBusiness') {
                this.OD_NTR_OF_BUSS.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'OccupationDetails.Industry') {
                this.OD_INDUSTRY.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'OccupationDetails.DateofInception') {
                this.OD_DT_OF_INCPTN.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'OccupationDetails.DateofJoining') {
                this.OD_DATE_OF_JOINING.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'OccupationDetails.Designation') {
                this.OD_DESIGNATION.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'OccupationDetails.Department') {
                this.OD_DEPARTMENT.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'OccupationDetails.EmployeeID') {
                this.OD_EMPLOYEE_ID.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'OccupationDetails.SelfEmploymentProfession') {
                this.OD_SELF_EMPLD_PROF.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'OccupationDetails.Employment Type') {
                this.OD_EMPLT_TYPE.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'OccupationDetails.Occupation') {
                this.OD_OCCUPATION.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'OccupationSeq') {
                this.HidOccupationSeq.setError(err['ErrorDescription']);
              }
            }
            this.services.alert.showAlert(2, 'rlo.error.update.occupation', -1);
          }
        );
      }
      else {
        inputMap.clear();
        inputMap.set('Body.OccupationDetails.Occupation', this.OD_OCCUPATION.getFieldValue());
        inputMap.set('Body.OccupationDetails.Employment Type', this.OD_EMPLT_TYPE.getFieldValue());
        inputMap.set('Body.OccupationDetails.Self Employed Type', this.OD_SELF_EMPLD_TYPE.getFieldValue());
        inputMap.set('Body.OccupationDetails.SelfEmploymentProfession', this.OD_SELF_EMPLD_PROF.getFieldValue());
        inputMap.set('Body.OccupationDetails.EmployeeID', this.OD_EMPLOYEE_ID.getFieldValue());
        inputMap.set('Body.OccupationDetails.Department', this.OD_DEPARTMENT.getFieldValue());
        inputMap.set('Body.OccupationDetails.Designation', this.OD_DESIGNATION.getFieldValue());
        inputMap.set('Body.OccupationDetails.DateOfJoining', this.OD_DATE_OF_JOINING.getFieldValue());
        inputMap.set('Body.OccupationDetails.DateofInception', this.OD_DT_OF_INCPTN.getFieldValue());
        inputMap.set('Body.OccupationDetails.Industry', this.OD_INDUSTRY.getFieldValue());
        inputMap.set('Body.OccupationDetails.NatureofBusiness', this.OD_NTR_OF_BUSS.getFieldValue());
        inputMap.set('Body.OccupationDetails.CompanyLicenseNo', this.OD_COMPANY_CODE.getFieldValue());
        inputMap.set('Body.OccupationDetails.Grade', this.OD_COMP_CAT.getFieldValue());
        inputMap.set('Body.OccupationDetails.CompanyName', this.OD_COMP_NAME.getFieldValue());
        inputMap.set('Body.OccupationDetails.LengthOfExistance', this.OD_LENGTH_OF_EXST.getFieldValue());
        inputMap.set('Body.OccupationDetails.IncomeDocumentType', this.OD_INC_DOC_TYPE.getFieldValue());
        inputMap.set('Body.OccupationDetails.NetIncome', this.OD_NET_INCOME.getFieldValue());
        inputMap.set('Body.OccupationDetails.IncomeFrequecy', this.OD_INCOME_FREQ.getFieldValue());
        inputMap.set('Body.OccupationDetails.EmploymentStatus', this.OD_EMP_STATUS.getFieldValue());
        inputMap.set('Body.OccupationDetails.IncomeType', this.OD_INCOME_TYPE.getFieldValue());
        inputMap.set('Body.OccupationDetails.WorkPermitNumber', this.OD_WRK_PERMIT_NO.getFieldValue());
        inputMap.set('Body.OccupationDetails.ResidencePermitNumber', this.OD_RES_PRT_NO.getFieldValue());
        inputMap.set('Body.OccupationDetails.Currency', this.OD_CURRENCY.getFieldValue());
        inputMap.set('Body.OccupationDetails.BorrowerSeq', this.activeBorrowerSeq);
        inputMap.set('Body.OccupationDetails.LocalCurrencyEquivalent', this.OD_LOC_CURR_EQ.getFieldValue());
        this.services.http.fetchApi('/OccupationDetails', 'POST', inputMap, '/rlo-de').subscribe(
          async (httpResponse: HttpResponse<any>) => {
            var res = httpResponse.body;
            this.services.alert.showAlert(1, 'rlo.success.save.occupation', 5000);

            // this.OD_SAVE_BTN.setDisabled(false);
            this.OD_OCCUPATION_change('OD_OCCUPATION', event);
            // await this.OCC_DTLS_GRID.gridDataLoad({
            //   'refNumToGrid': this.occBorrowerSeq,
            // });
            this.onReset();

            this.occpOnBlur.emit({});
          },
          async (httpError) => {
            var err = httpError['error']
            if (err != null && err['ErrorElementPath'] != undefined && err['ErrorDescription'] != undefined) {
              if (err['ErrorElementPath'] == 'OccupationDetails.LocalCurrencyEquivalent') {
                this.OD_LOC_CURR_EQ.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'OccupationDetails.Currency') {
                this.OD_CURRENCY.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'OccupationDetails.ResidencePermitNumber') {
                this.OD_RES_PRT_NO.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'OccupationDetails.WorkPermitNumber') {
                this.OD_WRK_PERMIT_NO.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'OccupationDetails.IncomeType') {
                this.OD_INCOME_TYPE.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'OccupationDetails.EmploymentStatus') {
                this.OD_EMP_STATUS.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'OccupationDetails.IncomeFrequecy') {
                this.OD_INCOME_FREQ.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'OccupationDetails.NetIncome') {
                this.OD_NET_INCOME.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'OccupationDetails.IncomeDocumentType') {
                this.OD_INC_DOC_TYPE.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'OccupationDetails.LengthOfExistance') {
                this.OD_LENGTH_OF_EXST.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'OccupationDetails.CompanyName') {
                this.OD_COMP_NAME.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'OccupationDetails.Grade') {
                this.OD_COMP_CAT.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'OccupationDetails.CompanyLicenseNo') {
                this.OD_COMPANY_CODE.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'OccupationDetails.NatureofBusiness') {
                this.OD_NTR_OF_BUSS.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'OccupationDetails.Industry') {
                this.OD_INDUSTRY.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'OccupationDetails.DateofInception') {
                this.OD_DT_OF_INCPTN.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'OccupationDetails.DateOfJoining') {
                this.OD_DATE_OF_JOINING.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'OccupationDetails.Designation') {
                this.OD_DESIGNATION.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'OccupationDetails.Department') {
                this.OD_DEPARTMENT.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'OccupationDetails.EmployeeID') {
                this.OD_EMPLOYEE_ID.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'OccupationDetails.SelfEmploymentProfession') {
                this.OD_SELF_EMPLD_PROF.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'OccupationDetails.Self Employed Type') {
                this.OD_SELF_EMPLD_TYPE.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'OccupationDetails.Employment Type') {
                this.OD_EMPLT_TYPE.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'OccupationDetails.Occupation') {
                this.OD_OCCUPATION.setError(err['ErrorDescription']);
              }
            }
            this.services.alert.showAlert(2, 'rlo.error.save.occupation', -1);
          }
        );
      }
    }
    else {
      this.services.alert.showAlert(2, 'rlo.error.invalid.form', -1);
    }
  }
  async OD_CLEAR_BTN_click(event) {
    let inputMap = new Map();
    this.onReset();
  }
  async OCC_DTLS_GRID_occDtlsEdit(event) {
    let inputMap = new Map();
    inputMap.clear();
    inputMap.set('PathParam.OccupationSeq', event.OccupationSeq);
    this.services.http.fetchApi('/OccupationDetails/{OccupationSeq}', 'GET', inputMap, '/rlo-de').subscribe(
      async (httpResponse: HttpResponse<any>) => {
        var res = httpResponse.body;
        this.OD_OCCUPATION.setValue(res['OccupationDetails']['Occupation']);
        if (this.OD_OCCUPATION.getFieldValue() == 'SL') {
          this.OD_EMPLT_TYPE.mandatory = true;
          this.OD_EMPLT_TYPE.setReadOnly(false);
        } else if (this.OD_OCCUPATION.getFieldValue() == 'SE') {
          this.OD_SELF_EMPLD_TYPE.mandatory = true;
          this.OD_SELF_EMPLD_TYPE.setReadOnly(false);
          this.OD_SELF_EMPLD_PROF.setReadOnly(false);
        }
        this.OD_EMPLT_TYPE.setValue(res['OccupationDetails']['Employment Type']);
        this.OD_SELF_EMPLD_PROF.setValue(res['OccupationDetails']['SelfEmploymentProfession']);
        this.OD_SELF_EMPLD_TYPE.setValue(res['OccupationDetails']['Self Employed Type']);
        this.OD_EMPLOYEE_ID.setValue(res['OccupationDetails']['EmployeeID']);
        this.OD_DEPARTMENT.setValue(res['OccupationDetails']['Department']);
        this.OD_DESIGNATION.setValue(res['OccupationDetails']['Designation']);
        this.OD_DATE_OF_JOINING.setValue(res['OccupationDetails']['DateofJoining']);
        this.OD_DT_OF_INCPTN.setValue(res['OccupationDetails']['DateofInception']);
        this.OD_INDUSTRY.setValue(res['OccupationDetails']['Industry']);
        this.OD_NTR_OF_BUSS.setValue(res['OccupationDetails']['NatureofBusiness']);
        this.OD_COMPANY_CODE.setValue(res['OccupationDetails']['CompanyLicenseNo']);
        this.OD_COMP_CAT.setValue(res['OccupationDetails']['Grade']);
        this.OD_COMP_NAME.setValue(res['OccupationDetails']['CompanyName']);
        this.OD_LENGTH_OF_EXST.setValue(res['OccupationDetails']['LengthOfExistance']);
        this.OD_INC_DOC_TYPE.setValue(res['OccupationDetails']['IncomeDocumentType']);
        this.OD_NET_INCOME.setValue(res['OccupationDetails']['NetIncome']);
        this.OD_INCOME_FREQ.setValue(res['OccupationDetails']['IncomeFrequecy']);
        this.OD_EMP_STATUS.setValue(res['OccupationDetails']['EmploymentStatus']);
        this.OD_INCOME_TYPE.setValue(res['OccupationDetails']['IncomeType']);
        this.OD_WRK_PERMIT_NO.setValue(res['OccupationDetails']['WorkPermitNumber']);
        this.OD_RES_PRT_NO.setValue(res['OccupationDetails']['ResidencePermitNumber']);
        this.OD_CURRENCY.setValue(res['OccupationDetails']['Currency']);
        this.OD_LOC_CURR_EQ.setValue(res['OccupationDetails']['LocalCurrencyEquivalent']);

        this.HidOccupationSeq.setValue(res['OccupationDetails']['OccupationSeq']);
        this.Handler.occupationOnchange();
        this.Handler.companyCodeChange();
        this.OD_OCCUPATION_change('OD_OCCUPATION', event);
      },
      async (httpError) => {
        var err = httpError['error']
        if (err != null && err['ErrorElementPath'] != undefined && err['ErrorDescription'] != undefined) {
        }
        this.services.alert.showAlert(2, 'rlo.error.load.form', -1);
      }
    );
  }
  async loadOccDtlGrid(event) {
    let inputMap = new Map();
    await this.OCC_DTLS_GRID.gridDataLoad({
      'refNumToGrid': event.refNum,
    });
  }

  // async loadOccupationGrid(event) {
  //   this.updateStageValidation.emit(event);
  // }

  fieldDependencies = {
    OD_OCCUPATION: {
      inDep: [

        { paramKey: "VALUE1", depFieldID: "OD_OCCUPATION", paramType: "PathParam" },
        { paramKey: "KEY1", depFieldID: "HidOccupation", paramType: "QueryParam" },
        { paramKey: "APPID", depFieldID: "HidAppId", paramType: "QueryParam" },
      ],
      outDep: [
      ]
    },
    OD_EMPLT_TYPE: {
      inDep: [

        { paramKey: "VALUE1", depFieldID: "OD_EMPLT_TYPE", paramType: "PathParam" },
        { paramKey: "APPID", depFieldID: "HidAppId", paramType: "QueryParam" },
        { paramKey: "KEY1", depFieldID: "HidEmpType", paramType: "QueryParam" },
      ],
      outDep: [
      ]
    },
    OD_SELF_EMPLD_TYPE: {
      inDep: [

        { paramKey: "VALUE1", depFieldID: "OD_SELF_EMPLD_TYPE", paramType: "PathParam" },
        { paramKey: "APPID", depFieldID: "HidAppId", paramType: "QueryParam" },
        { paramKey: "KEY1", depFieldID: "HidSelfEmpType", paramType: "QueryParam" },
      ],
      outDep: [
      ]
    },
    // OD_DESIGNATION: {
    //   inDep: [

    //     { paramKey: "VALUE1", depFieldID: "OD_DESIGNATION", paramType: "PathParam" },
    //     { paramKey: "KEY1", depFieldID: "HidDesignation", paramType: "QueryParam" },
    //     { paramKey: "APPID", depFieldID: "HidAppId", paramType: "QueryParam" },
    //   ],
    //   outDep: [
    //   ]
    // },
    OD_INDUSTRY: {
      inDep: [

        { paramKey: "VALUE1", depFieldID: "OD_INDUSTRY", paramType: "PathParam" },
        { paramKey: "KEY1", depFieldID: "HidIndustry", paramType: "QueryParam" },
        { paramKey: "APPID", depFieldID: "HidAppId", paramType: "QueryParam" },
      ],
      outDep: [
      ]
    },
    OD_NTR_OF_BUSS: {
      inDep: [

        { paramKey: "VALUE1", depFieldID: "OD_NTR_OF_BUSS", paramType: "PathParam" },
        { paramKey: "APPID", depFieldID: "HidAppId", paramType: "QueryParam" },
        { paramKey: "KEY1", depFieldID: "HidNatureOfBusiness", paramType: "QueryParam" },
      ],
      outDep: [
      ]
    },
    OD_INC_DOC_TYPE: {
      inDep: [

        { paramKey: "VALUE1", depFieldID: "OD_INC_DOC_TYPE", paramType: "PathParam" },
        { paramKey: "APPID", depFieldID: "HidAppId", paramType: "QueryParam" },
        { paramKey: "KEY1", depFieldID: "HidIncomeDocType", paramType: "QueryParam" },
      ],
      outDep: [
      ]
    },
    OD_INCOME_FREQ: {
      inDep: [

        { paramKey: "VALUE1", depFieldID: "OD_INCOME_FREQ", paramType: "PathParam" },
        { paramKey: "APPID", depFieldID: "HidAppId", paramType: "QueryParam" },
        { paramKey: "KEY1", depFieldID: "HidIncomeFrequency", paramType: "QueryParam" },
      ],
      outDep: [
      ]
    },
    OD_EMP_STATUS: {
      inDep: [

        { paramKey: "VALUE1", depFieldID: "OD_EMP_STATUS", paramType: "PathParam" },
        { paramKey: "APPID", depFieldID: "HidAppId", paramType: "QueryParam" },
        { paramKey: "KEY1", depFieldID: "HidEmpStatus", paramType: "QueryParam" },
      ],
      outDep: [
      ]
    },
    OD_INCOME_TYPE: {
      inDep: [

        { paramKey: "VALUE1", depFieldID: "OD_INCOME_TYPE", paramType: "PathParam" },
        { paramKey: "APPID", depFieldID: "HidAppId", paramType: "QueryParam" },
        { paramKey: "KEY1", depFieldID: "HidIncomeType", paramType: "QueryParam" },
      ],
      outDep: [
      ]
    },
    OD_CURRENCY: {
      inDep: [

        { paramKey: "CurrencySrc", depFieldID: "OD_CURRENCY", paramType: "PathParam" },
        { paramKey: "CurrencyDest", depFieldID: "hideCurrencyDesc", paramType: "QueryParam" },
      ],
      outDep: [

        { paramKey: "MstCurrencyDetails.ExchangeRate", depFieldID: "hidExchangeRate" },
      ]
    },
    OD_COMPANY_CODE: {
      inDep: [

        { paramKey: "MstCompanyDetails.CompanyCd", depFieldID: "OD_COMPANY_CODE" },
      ],
      outDep: [

        { paramKey: "MstCompanyDetails.CompanyCategory", depFieldID: "OD_COMP_CAT" },
        { paramKey: "MstCompanyDetails.CompnayName", depFieldID: "OD_COMP_NAME" }

      ]
    },

  }
  /* Write Custom Scripts Here */


  //occBorrowerSeq;

}