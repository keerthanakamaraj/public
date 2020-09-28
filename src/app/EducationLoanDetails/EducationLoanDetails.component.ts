import { Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import { EducationLoanDetailsModel } from './EducationLoanDetails.model';
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
import { PastEducationDtlsGridComponent } from '../PastEducationDtlsGrid/PastEducationDtlsGrid.component';
import { CostOfCourseGridComponent } from '../CostOfCourseGrid/CostOfCourseGrid.component';
import { FundsAvailableGridComponent } from '../FundsAvailableGrid/FundsAvailableGrid.component';
import { EducationLoanHandlerComponent } from '../EducationLoanDetails/education-loan-handler.component';

const customCss: string = '';

@Component({
  selector: 'app-EducationLoanDetails',
  templateUrl: './EducationLoanDetails.component.html'
})
export class EducationLoanDetailsComponent extends FormComponent implements OnInit, AfterViewInit {
  @ViewChild('PEExamPassed', { static: false }) PEExamPassed: ComboBoxComponent;
  @ViewChild('PEInstitution', { static: false }) PEInstitution: ComboBoxComponent;
  @ViewChild('PEYearOfPassing', { static: false }) PEYearOfPassing: ComboBoxComponent;
  @ViewChild('PEMarksPercent', { static: false }) PEMarksPercent: ComboBoxComponent;
  @ViewChild('PEClassObtained', { static: false }) PEClassObtained: ComboBoxComponent;
  @ViewChild('PEPrizes', { static: false }) PEPrizes: TextBoxComponent;
  @ViewChild('PastEducationGrid', { static: false }) PastEducationGrid: PastEducationDtlsGridComponent;
  @ViewChild('PCInstitutionName', { static: false }) PCInstitutionName: TextBoxComponent;
  @ViewChild('PCInstituteAddress', { static: false }) PCInstituteAddress: TextBoxComponent;
  @ViewChild('PCPinCode', { static: false }) PCPinCode: TextBoxComponent;
  @ViewChild('PCRegion', { static: false }) PCRegion: TextBoxComponent;
  @ViewChild('PCCity', { static: false }) PCCity: TextBoxComponent;
  @ViewChild('PCState', { static: false }) PCState: TextBoxComponent;
  @ViewChild('PCCountry', { static: false }) PCCountry: ComboBoxComponent;
  @ViewChild('PCAdmissionStatus', { static: false }) PCAdmissionStatus: ComboBoxComponent;
  @ViewChild('PCUnivercityName', { static: false }) PCUnivercityName: TextBoxComponent;
  @ViewChild('PCContactPerson', { static: false }) PCContactPerson: TextBoxComponent;
  @ViewChild('PCAppliedFor', { static: false }) PCAppliedFor: TextBoxComponent;
  @ViewChild('PCName', { static: false }) PCName: TextBoxComponent;
  @ViewChild('PCAdmitionThrough', { static: false }) PCAdmitionThrough: ComboBoxComponent;
  @ViewChild('PCCategory', { static: false }) PCCategory: ComboBoxComponent;
  @ViewChild('PCCourseType', { static: false }) PCCourseType: ComboBoxComponent;
  @ViewChild('PCStartDate', { static: false }) PCStartDate: DateComponent;
  @ViewChild('PCEndDate', { static: false }) PCEndDate: DateComponent;
  @ViewChild('PCRanking', { static: false }) PCRanking: TextBoxComponent;
  @ViewChild('PCIsAttending', { static: false }) PCIsAttending: CheckBoxComponent;
  @ViewChild('PCCollegeName', { static: false }) PCCollegeName: TextBoxComponent;
  @ViewChild('PCName2', { static: false }) PCName2: TextBoxComponent;
  @ViewChild('PCCompeteDate', { static: false }) PCCompeteDate: DateComponent;
  @ViewChild('LCurrency', { static: false }) LCurrency: ComboBoxComponent;
  @ViewChild('LoanRequied', { static: false }) LoanRequied: TextBoxComponent;
  @ViewChild('LMoratoriumDurCoursePeriod', { static: false }) LMoratoriumDurCoursePeriod: ComboBoxComponent;
  @ViewChild('LMoratoriumPostCoursePeriod', { static: false }) LMoratoriumPostCoursePeriod: ComboBoxComponent;
  @ViewChild('LTotMoratorium', { static: false }) LTotMoratorium: ComboBoxComponent;
  @ViewChild('LEMIPeriod', { static: false }) LEMIPeriod: ComboBoxComponent;
  @ViewChild('LTotLoanPeriod', { static: false }) LTotLoanPeriod: ComboBoxComponent;
  @ViewChild('LIsInterestCaptalized', { static: false }) LIsInterestCaptalized: ComboBoxComponent;
  @ViewChild('CostOfCourseGrid', { static: false }) CostOfCourseGrid: CostOfCourseGridComponent;
  @ViewChild('FundsAvailableGrid', { static: false }) FundsAvailableGrid: FundsAvailableGridComponent;
  @ViewChild('Handler', { static: false }) Handler: EducationLoanHandlerComponent;
  @ViewChild('hidExchangeRate', { static: false }) hidExchangeRate: HiddenComponent;

  async revalidate(): Promise<number> {
    var totalErrors = 0;
    super.beforeRevalidate();
    await Promise.all([
      this.revalidateBasicField('PEExamPassed'),
      this.revalidateBasicField('PEInstitution'),
      this.revalidateBasicField('PEYearOfPassing'),
      this.revalidateBasicField('PEMarksPercent'),
      this.revalidateBasicField('PEClassObtained'),
      this.revalidateBasicField('PEPrizes'),
      this.revalidateBasicField('PCInstitutionName'),
      this.revalidateBasicField('PCInstituteAddress'),
      this.revalidateBasicField('PCPinCode'),
      this.revalidateBasicField('PCRegion'),
      this.revalidateBasicField('PCCity'),
      this.revalidateBasicField('PCState'),
      this.revalidateBasicField('PCCountry'),
      this.revalidateBasicField('PCAdmissionStatus'),
      this.revalidateBasicField('PCUnivercityName'),
      this.revalidateBasicField('PCContactPerson'),
      this.revalidateBasicField('PCAppliedFor'),
      this.revalidateBasicField('PCName'),
      this.revalidateBasicField('PCAdmitionThrough'),
      this.revalidateBasicField('PCCategory'),
      this.revalidateBasicField('PCCourseType'),
      this.revalidateBasicField('PCStartDate'),
      this.revalidateBasicField('PCEndDate'),
      this.revalidateBasicField('PCRanking'),
      this.revalidateBasicField('PCIsAttending'),
      this.revalidateBasicField('PCCollegeName'),
      this.revalidateBasicField('PCName2'),
      this.revalidateBasicField('PCCompeteDate'),
      this.revalidateBasicField('LCurrency'),
      this.revalidateBasicField('LoanRequied'),
      this.revalidateBasicField('LMoratoriumDurCoursePeriod'),
      this.revalidateBasicField('LMoratoriumPostCoursePeriod'),
      this.revalidateBasicField('LTotMoratorium'),
      this.revalidateBasicField('LEMIPeriod'),
      this.revalidateBasicField('LTotLoanPeriod'),
      this.revalidateBasicField('LIsInterestCaptalized'),
      this.CostOfCourseGrid.revalidate(),
      this.FundsAvailableGrid.revalidate(),
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
    this.value = new EducationLoanDetailsModel();
    this.componentCode = 'EducationLoanDetails';
  }
  setReadOnly(readOnly) {
    super.setBasicFieldsReadOnly(readOnly);
    this.CostOfCourseGrid.setReadOnly(readOnly);
    this.FundsAvailableGrid.setReadOnly(readOnly);
  }
  async onFormLoad() {
    this.setInputs(this.services.dataStore.getData(this.services.routing.currModal));
    this.Handler.onFormLoad({
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
    this.submitData['formName'] = 'EducationLoanDetails';
    await super.submit(path, apiCode, serviceCode);
  }
  getFieldInfo() {
    this.amountComponent.forEach(field => { this.additionalInfo[field.fieldID + '_desc'] = field.getFieldInfo(); });
    this.comboFields.forEach(field => { this.additionalInfo[field.fieldID + '_desc'] = field.getFieldInfo(); });
    this.fileUploadFields.forEach(field => { this.additionalInfo[field.fieldID + '_desc'] = field.getFieldInfo(); });
    this.additionalInfo['CostOfCourseGrid_desc'] = this.CostOfCourseGrid.getFieldInfo();
    this.additionalInfo['FundsAvailableGrid_desc'] = this.FundsAvailableGrid.getFieldInfo();
    return this.additionalInfo;
  }
  getFieldValue() {
    this.value.CostOfCourseGrid = this.CostOfCourseGrid.getFieldValue();
    this.value.FundsAvailableGrid = this.FundsAvailableGrid.getFieldValue();
    return this.value;
  }
  setValue(inputValue, inputDesc = undefined) {
    this.setBasicFieldsValue(inputValue, inputDesc);
    this.PastEducationGrid.setValue(inputValue['PastEducationGrid']);
    this.CostOfCourseGrid.setValue(inputValue['CostOfCourseGrid'], inputDesc['CostOfCourseGrid_desc']);
    this.FundsAvailableGrid.setValue(inputValue['FundsAvailableGrid'], inputDesc['FundsAvailableGrid_desc']);
    this.value = new EducationLoanDetailsModel();
    this.value.setValue(inputValue);
    this.setDependencies();
    this.passNewValue(this.value);
  }
  ngOnInit() {
    if (this.formCode == undefined) { this.formCode = 'EducationLoanDetails'; }
    if (this.formOnLoadError) { return; }
    var styleElement = document.createElement('style');
    styleElement.type = 'text/css';
    styleElement.innerHTML = customCss;
    styleElement.id = 'EducationLoanDetails_customCss';
    document.getElementsByTagName('head')[0].appendChild(styleElement);
  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    var styleElement = document.getElementById('EducationLoanDetails_customCss');
    styleElement.parentNode.removeChild(styleElement);
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.subsBFldsValueUpdates();
      this.value.CostOfCourseGrid = this.CostOfCourseGrid.getFieldValue();
      this.CostOfCourseGrid.valueChangeUpdates().subscribe((value) => { this.value.CostOfCourseGrid = value; });
      this.value.FundsAvailableGrid = this.FundsAvailableGrid.getFieldValue();
      this.FundsAvailableGrid.valueChangeUpdates().subscribe((value) => { this.value.FundsAvailableGrid = value; });
      this.onFormLoad();
      this.checkForHTabOverFlow();
    });
  }
  clearError() {
    super.clearBasicFieldsError();
    super.clearHTabErrors();
    super.clearVTabErrors();
    this.CostOfCourseGrid.clearError();
    this.FundsAvailableGrid.clearError();
    this.errors = 0;
    this.errorMessage = [];
  }
  onReset() {
    super.resetBasicFields();
    this.CostOfCourseGrid.onReset();
    this.FundsAvailableGrid.onReset();
    this.clearHTabErrors();
    this.clearVTabErrors();
    this.errors = 0;
    this.errorMessage = [];
    this.additionalInfo = undefined;
    this.dependencyMap.clear();
    this.value = new EducationLoanDetailsModel();
    this.passNewValue(this.value);
    this.setReadOnly(false);
    this.onFormLoad();
  }
  fieldDependencies = {
    LCurrency: {
      inDep: [

        { paramKey: "CurrencySrc", depFieldID: "LCurrency", paramType: "PathParam" },
        // { paramKey: "CurrencyDest", depFieldID: "hideCurrencyDesc", paramType: "QueryParam" },
      ],
      outDep: [

        { paramKey: "MstCurrencyDetails.ExchangeRate", depFieldID: "hidExchangeRate" },
      ]
    },
  }

}
