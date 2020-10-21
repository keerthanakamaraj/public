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
import { EducationLoanSummary, CostOrFundsInterface, PastEducationInterface, PursuingCourseInterface } from '../EducationLoanDetails/Education-loan-interfaces';
import { RefreshSidebarService } from '../refreshSidebar.service';
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
  @ViewChild('RecognizedAuthority', { static: false }) RecognizedAuthority: TextBoxComponent;
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
  @ViewChild('hidExamPassed', { static: false }) hidExamPassed: HiddenComponent;
  @ViewChild('hidInstitute', { static: false }) hidInstitute: HiddenComponent;
  @ViewChild('hidPassingYear', { static: false }) hidPassingYear: HiddenComponent;
  @ViewChild('hidClassObtained', { static: false }) hidClassObtained: HiddenComponent;
  @ViewChild('hidCountry', { static: false }) hidCountry: HiddenComponent;
  @ViewChild('hidAdmissionStatus', { static: false }) hidAdmissionStatus: HiddenComponent;
  @ViewChild('hidCourseField', { static: false }) hidCourseField: HiddenComponent;
  @ViewChild('hidAdmissionThrough', { static: false }) hidAdmissionThrough: HiddenComponent;
  @ViewChild('hidCourseCategory', { static: false }) hidCourseCategory: HiddenComponent;
  @ViewChild('hidCourseType', { static: false }) hidCourseType: HiddenComponent;
  @ViewChild('hidAppId', { static: false }) hidAppId: HiddenComponent;
  @ViewChild('PCCollegeAddress', { static: false }) PCCollegeAddress: TextBoxComponent;
  @ViewChild('PE_SAVE_BTN', { static: false }) PE_SAVE_BTN: ButtonComponent;
  @ViewChild('PE_CLEAR_BTN', { static: false }) PE_CLEAR_BTN: ButtonComponent;

  @Input() ApplicationId: string = undefined;

  EdLoanSummSeq: number = undefined;
  LoanSeq: number = undefined;
  PursuingCourseSeq: number = undefined;
  PastEdSeq: number = undefined;


  TotalCost: number = undefined;
  TotalCostEq: number = undefined;
  TotalFund: number = undefined;
  TotalFundEq: number = undefined;
  TenurePeriod: string = undefined;

  async revalidate(): Promise<number> {
    var totalErrors = 0;
    super.beforeRevalidate();
    await Promise.all([
      // this.revalidateBasicField('PEExamPassed'),
      // this.revalidateBasicField('PEInstitution'),
      // this.revalidateBasicField('PEYearOfPassing'),
      // this.revalidateBasicField('PEMarksPercent'),
      // this.revalidateBasicField('PEClassObtained'),
      // this.revalidateBasicField('PEPrizes'),
      this.revalidateBasicField('PCInstitutionName'),
      this.revalidateBasicField('PCInstituteAddress'),
      this.revalidateBasicField('PCPinCode'),
      this.revalidateBasicField('PCRegion'),
      this.revalidateBasicField('PCCity'),
      this.revalidateBasicField('PCState'),
      this.revalidateBasicField('PCCountry'),
      this.revalidateBasicField('PCAdmissionStatus'),
      this.revalidateBasicField('RecognizedAuthority'),
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
    this.hidExamPassed.setValue('EXAMINATIONS');
    //this.hidInstitute.setValue('');
    //this.hidPassingYear.setValue('');
    this.hidClassObtained.setValue('ED_CLASS');
    //this.hidCountry.setValue('');
    this.hidAdmissionStatus.setValue('ADMISSION_STATUS');
    this.hidAdmissionThrough.setValue('ADMSN_PROCESS');
    this.hidCourseCategory.setValue('COURSE_CATEGORY');
    this.hidCourseType.setValue('COURSE_TYPE');
    this.hidCourseField.setValue('ED_FIELD');
    this.hidAppId.setValue('RLO');
    await this.Handler.onFormLoad({
    });
    await this.PastEducationGrid.gridDataLoad({
      'ApplicationId': this.ApplicationId
    });
    await this.FetchEducationLoanDtls();

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

  async FetchEducationLoanDtls() {
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
      this.services.http.fetchApi('/EducationLoan', 'GET', inputMap, '/rlo-de').subscribe(
        async (httpResponse: HttpResponse<any>) => {
          let res = httpResponse.body;
          let EducationDtls = res['EducationLoan'];
          if (EducationDtls) {
            console.log("shweta :: Education loan fetched : ", EducationDtls);
            this.parseFetchEducationResp(EducationDtls);
            // let array = [];
            // array.push({ isValid: true, sectionData: this.getFieldValue() });
            // let obj = {
            //   "name": "EducationDetails",
            //   "data": array,
            //   "sectionName": "EducationDetails"
            // }
            // console.log("shweta ::: in application section", array);
            // this.services.rloCommonData.globalComponentLvlDataHandler(obj);
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
  parseFetchEducationResp(EducationDtls) {
    console.log("shweta :: edu resp", EducationDtls, " : ", EducationDtls[0]['costAndFundsGridDtls']);
    this.ParseEducationSummDtls(EducationDtls[0]);
    this.generateCostAndFundsList(EducationDtls[0]['costAndFundsGridDtls']);
    this.parsePersuingCourseDtls(EducationDtls[0]['pursuingCourseDtls']);
  }
  ParseEducationSummDtls(EducationDtlsSumm) {
    this.EdLoanSummSeq = EducationDtlsSumm.EducationLoanSummSeq;
    this.LCurrency.setValue(EducationDtlsSumm.Currency);
    this.LoanRequied.setValue(EducationDtlsSumm.loanDtls.LoanRequiredAmt);
    this.LMoratoriumDurCoursePeriod.setValue(EducationDtlsSumm.MoratoriumDuringCourse);
    this.LMoratoriumPostCoursePeriod.setValue(EducationDtlsSumm.MoratoriumAfterCourse);
    this.TotalCost = EducationDtlsSumm.TotalCost;
    this.TotalCostEq = EducationDtlsSumm.TotalCostEq;
    this.TotalFund = EducationDtlsSumm.TotalFund;
    this.TotalFundEq = EducationDtlsSumm.TotalCostEq;
    this.TenurePeriod = EducationDtlsSumm.loanDtls.TenurePeriod;
    this.LoanSeq = EducationDtlsSumm.loanDtls.LoanSeq;
    this.LTotMoratorium.setValue(EducationDtlsSumm.loanDtls.TotalMoratoriumPeriod);
    this.LEMIPeriod.setValue(EducationDtlsSumm.EMIPeriod);
    this.LTotLoanPeriod.setValue(EducationDtlsSumm.loanDtls.TotalLoanPeriod);
    this.LIsInterestCaptalized.setValue(EducationDtlsSumm.InterestCapitalizedFlag);
  }
  parsePersuingCourseDtls(PursuingCourse) {
    this.PursuingCourseSeq = PursuingCourse.PursuingCourseSeq;
    this.PCInstitutionName.setValue(PursuingCourse.PrInstituteName);
    this.PCInstituteAddress.setValue(PursuingCourse.PrAddress);
    this.PCPinCode.setValue(PursuingCourse.PrPincode);
    this.PCRegion.setValue(PursuingCourse.PrRegion);
    this.PCCity.setValue(PursuingCourse.PrCity);
    this.PCState.setValue(PursuingCourse.PrState);
    this.PCCountry.setValue(PursuingCourse.PrCountry);
    this.PCAdmissionStatus.setValue(PursuingCourse.PrAdmissionStatus);
    this.RecognizedAuthority.setValue(PursuingCourse.PrRecognizedAuthority);
    this.PCContactPerson.setValue(PursuingCourse.PrContactPerson);
    this.PCAppliedFor.setValue(PursuingCourse.PrCourseFor);
    this.PCName.setValue(PursuingCourse.PrCourseName);
    this.PCAdmitionThrough.setValue(PursuingCourse.PrAdmissionThrough);
    this.PCCategory.setValue(PursuingCourse.PrCourseCategory);
    this.PCCourseType.setValue(PursuingCourse.PrCourseType);
    this.PCStartDate.setValue(PursuingCourse.PrCourseStartDt);
    this.PCEndDate.setValue(PursuingCourse.PrCourseEndDt);
    this.PCRanking.setValue(PursuingCourse.PrCourseRank);
    this.PCIsAttending.setValue(PursuingCourse.SecCourseFlag);
    this.PCCollegeName.setValue(PursuingCourse.SecInstituteName);
    this.PCCollegeAddress.setValue(PursuingCourse.SecAddress);
    this.PCName2.setValue(PursuingCourse.SecCourseName);
    this.PCCompeteDate.setValue(PursuingCourse.SecCourseEndDate);
  }
  loadPastEducation(event) {
    let PastEducation = event.PastEducation;
    //console.log("shweta :: in ed past record",event.PastEducation);
    this.PastEdSeq = PastEducation['PastEdSeq'];
    this.PEExamPassed.setValue(PastEducation['ExamPassed']);
    this.PEInstitution.setValue(PastEducation['Institution']);
    this.PEYearOfPassing.setValue(PastEducation['PassingYear']);
    this.PEMarksPercent.setValue(PastEducation['MarksPercent']);
    this.PEClassObtained.setValue(PastEducation['ClassObtained']);
    this.PEPrizes.setValue(PastEducation['Scholarships']);
  }
  generateCostAndFundsList(tempCostAndFundsList) {
    console.log("shweta :: cost and funds list", tempCostAndFundsList);
    // let costSrNo=0;
    // let fundSrNo=0;
    if (tempCostAndFundsList != undefined) {
      tempCostAndFundsList.forEach(element => {
        let tempObj: CostOrFundsInterface = {}
        if (this.CostOfCourseGrid.CostOfCourseMap.has(element.TransactionDescription)) {
          tempObj = this.CostOfCourseGrid.CostOfCourseMap.get(element.TransactionDescription);
          //  tempObj.SrNo=costSrNo+1;
        }
        else if (this.FundsAvailableGrid.FundsAvailableMap.has(element.TransactionDescription)) {
          tempObj = this.FundsAvailableGrid.FundsAvailableMap.get(element.TransactionDescription);
          //  tempObj.SrNo=fundSrNo+1;
        }
        if (Object.keys(tempObj).length != 0) {
          tempObj.EdTransactionSeq = element.EdTransactionSeq;
          tempObj.ApplicationId = element.ApplicationId;
          tempObj.TransactionType = element.TransactionType;
          tempObj.TransactionDescription = element.TransactionDescription;
          tempObj.LoanSummSeq = element.LoanSummSeq;
          tempObj.Amount = element.Amount;
          tempObj.Version = element.Version;
          tempObj.Currency = element.Currency;
          tempObj.CreatedBy = element.CreatedBy;
          tempObj.CreatedOn = element.CreatedOn;
          tempObj.UpdatedBy = element.UpdatedBy;
          tempObj.UpdatedOn = element.UpdatedOn;
          tempObj.CurrencyEquivalentAmt = element.CurrencyEquivalentAmt;
        }
      });
    }
    this.CostOfCourseGrid.loadRecords();
    this.FundsAvailableGrid.loadRecords();
  }

  PE_CLEAR_BTN_click(event) {
    this.PastEdSeq = undefined;
    this.PEExamPassed.onReset();
    this.PEInstitution.onReset();
    this.PEYearOfPassing.onReset();
    this.PEMarksPercent.onReset();
    this.PEClassObtained.onReset();
    this.PEPrizes.onReset();
  }

  async validatePastEducationFields(): Promise<number> {
    var totalErrors = 0;
    super.beforeRevalidate();
    await Promise.all([
      this.revalidateBasicField('PEExamPassed'),
      this.revalidateBasicField('PEInstitution'),
      this.revalidateBasicField('PEYearOfPassing'),
      this.revalidateBasicField('PEMarksPercent'),
      this.revalidateBasicField('PEClassObtained'),
      this.revalidateBasicField('PEPrizes')
    ]).then((errorCounts) => {
      errorCounts.forEach((errorCount) => {
        totalErrors += errorCount;
      });
    });
    this.errors = totalErrors;
    super.afterRevalidate();
    return totalErrors;
  }
  async PE_SAVE_BTN_click(event) {
    let inputMap = new Map();
    this.PE_SAVE_BTN.setDisabled(true);
    let numberOfErrors: number = await this.validatePastEducationFields();
    if (numberOfErrors == 0) {
      if (!this.isDuplicateEntry()) {
        if (this.PastEdSeq != undefined) {

          inputMap = this.generatePastEduSaveUpdateReq(inputMap);

          this.services.http.fetchApi('/PastEducation/{PastEdSeq}', 'PUT', inputMap, '/rlo-de').subscribe(
            async (httpResponse: HttpResponse<any>) => {
              var res = httpResponse.body;
              this.services.alert.showAlert(1, 'rlo.success.update.visitreport', 5000);
              this.PastEducationGrid.gridDataLoad({
                'ApplicationId': this.ApplicationId
              });
              this.PE_CLEAR_BTN_click({});
              this.PE_SAVE_BTN.setDisabled(false);
            },
            async (httpError) => {
              this.parseResponseError(httpError['error']);
              this.services.alert.showAlert(2, 'rlo.error.update.visitreport', -1);
              this.PE_SAVE_BTN.setDisabled(false);
            }
          );
        }
        else {
          inputMap = this.generatePastEduSaveUpdateReq(inputMap);
          this.services.http.fetchApi('/PastEducation', 'POST', inputMap, '/rlo-de').subscribe(
            async (httpResponse: HttpResponse<any>) => {
              var res = httpResponse.body;
              this.services.alert.showAlert(1, 'rlo.success.save.visitreport', 5000);
              this.PastEducationGrid.gridDataLoad({
                'ApplicationId': this.ApplicationId
              });
              this.PE_CLEAR_BTN_click({});
              this.PE_SAVE_BTN.setDisabled(false);
            },
            async (httpError) => {
              this.parseResponseError(httpError['error']);
              this.services.alert.showAlert(2, 'rlo.error.save.visitreport', -1);
              this.PE_SAVE_BTN.setDisabled(false);
            }
          );
        }
      } else {
        this.services.alert.showAlert(2, 'rlo.error.duplicate-Record', -1);
        this.PE_SAVE_BTN.setDisabled(false);
      }
    }
    else {
      this.services.alert.showAlert(2, 'rlo.error.invalid.form', -1);
      this.PE_SAVE_BTN.setDisabled(false);
    }
  }
  isDuplicateEntry() {
    let duplicateFound = false;
    let OldRecords = [];
    OldRecords = this.PastEducationGrid.PastEducationList;
    if (OldRecords != undefined) {
      for (let eachRecord of OldRecords) {
        if (eachRecord.PastEdSeq != this.PastEdSeq && eachRecord.ExamPassed == this.PEExamPassed.getFieldValue() && eachRecord.PassingYear == this.PEYearOfPassing.getFieldValue()) {
          duplicateFound = true;
          break;
        }
      }
    }
    return duplicateFound;
  }
  generatePastEduSaveUpdateReq(inputMap) {
    inputMap.clear();
    if (this.PastEdSeq != undefined) {
      inputMap.set('PathParam.PastEdSeq', this.PastEdSeq);
    }
    inputMap.set('Body.PastEducation.ApplicationId', this.ApplicationId);
    inputMap.set('Body.PastEducation.Scholarships', this.PEPrizes.getFieldValue());
    inputMap.set('Body.PastEducation.ClassObtained', this.PEClassObtained.getFieldValue());
    inputMap.set('Body.PastEducation.LoanSummSeq', this.EdLoanSummSeq);
    inputMap.set('Body.PastEducation.ExamPassed', this.PEExamPassed.getFieldValue());
    inputMap.set('Body.PastEducation.PassingYear', this.PEYearOfPassing.getFieldValue());
    inputMap.set('Body.PastEducation.Institution', this.PEInstitution.getFieldValue());
    inputMap.set('Body.PastEducation.MarksPercent', this.PEMarksPercent.getFieldValue());
    return inputMap;
  }

  parseResponseError(err) {

    if (err != null && err['ErrorElementPath'] != undefined && err['ErrorDescription'] != undefined) {
      if (err['ErrorElementPath'] == 'PastEducation.Scholarships') {
        this.PEPrizes.setError(err['ErrorDescription']);
      }
      else if (err['ErrorElementPath'] == 'PastEducation.ClassObtained') {
        this.PEClassObtained.setError(err['ErrorDescription']);
      }
      else if (err['ErrorElementPath'] == 'PastEducation.ExamPassed') {
        this.PEExamPassed.setError(err['ErrorDescription']);
      }

      else if (err['ErrorElementPath'] == 'PastEducation.PassingYear') {
        this.PEYearOfPassing.setError(err['ErrorDescription']);
      }
      else if (err['ErrorElementPath'] == 'PastEducation.Institution') {
        this.PEInstitution.setError(err['ErrorDescription']);
      }
      else if (err['ErrorElementPath'] == 'PastEducation.MarksPercent') {
        this.PEMarksPercent.setError(err['ErrorDescription']);
      }
    }
  }

  async PCPinCode_blur(event) {
    const inputMap = new Map();
    inputMap.set('PathParam.PinCd', event.value);
    inputMap.set('QueryParam.CountryCode', this.PCCountry.getFieldValue());
    this.services.http.fetchApi('/MasterPincodeDtls/{PinCd}', 'GET', inputMap, '/masters').subscribe(
      async (httpResponse: HttpResponse<any>) => {
        const res = httpResponse.body;
        // console.log("res", res);
        if (res == null) {
          this.PCPinCode.setError('rlo.error.pincode.invalid');
          this.PCRegion.onReset();
          this.PCCity.onReset();
          this.PCState.onReset();

          return 1;

        } else {
          this.PCRegion.setValue(res['MasterPincodeDtls']['UDF1']);
          this.PCState.setValue(res['MasterPincodeDtls']['StateCd']['StateName']);
          this.PCCity.setValue(res['MasterPincodeDtls']['CityCd']['CityName']);
          // if(this.PCCountry.getFieldValue()!=res['MasterPincodeDtls']['StateCd']['CountryCd']){
          //   {
          //     this.PCPinCode.setError('rlo.error.pincode.invalid');
          // this.PCRegion.onReset();
          // this.PCCity.onReset();
          // this.PCState.onReset();
          //   }
        }

      },

    );
  }

  generateEduSaveUpdateReq(inputMap) {
    inputMap.clear();
    if (this.PastEdSeq != undefined) {
      inputMap.set('PathParam.PastEdSeq', this.PastEdSeq);
    }
    inputMap.set('Body.EducationLoan.ApplicationId', this.ApplicationId);
    inputMap.set('Body.EducationLoan.EducationLoanSummSeq', this.PEPrizes.getFieldValue());
    inputMap.set('Body.EducationLoan.TotalCost', this.PEClassObtained.getFieldValue());
    inputMap.set('Body.EducationLoan.TotalCostEq', this.EdLoanSummSeq);
    inputMap.set('Body.EducationLoan.TotalFund', this.PEExamPassed.getFieldValue());
    inputMap.set('Body.EducationLoan.TotalFundEq', this.PEYearOfPassing.getFieldValue());
    inputMap.set('Body.EducationLoan.InterestCapitalizedFlag', this.PEInstitution.getFieldValue());
    inputMap.set('Body.EducationLoan.pursuingCourseDtls', this.generatePersuingCourseSaveReq());
    inputMap.set('Body.EducationLoan.costAndFundsGridDtls', this.generateCostAndFundsReq());
    return inputMap;
  }
  generateCostAndFundsReq() {
    let CostAndFundsList = [];
    CostAndFundsList = this.mapCostandFundsRecords(CostAndFundsList, this.CostOfCourseGrid.CostOfCourseMap, 'C');
    CostAndFundsList = this.mapCostandFundsRecords(CostAndFundsList, this.FundsAvailableGrid.FundsAvailableMap, 'F');
    return CostAndFundsList;

  }
  mapCostandFundsRecords(CostAndFundsList, TransactionList, TransactionType) {
    TransactionList.forEach(element => {
      let inputObj = new Map();
      inputObj.set('ApplicationId', this.ApplicationId);
      inputObj.set('TransactionType', element.TransactionType == undefined ? TransactionType : element.TransactionType);
      inputObj.set('TransactionDescription', element.TransactionDescription);
      inputObj.set('LoanSummSeq', element.LoanSummSeq);
      inputObj.set('Amount', element.Amount);
      inputObj.set('EdTransactionSeq', element.EdTransactionSeq);
      inputObj.set('Currency', element.Currency);
      inputObj.set('CurrencyEquivalentAmt', element.CurrencyEquivalentAmt);
      CostAndFundsList.push(inputObj);
      // inputMap.set('CreatedBy',element.);
      //  inputMap.set('UpdatedBy',element.);
      //  inputMap.set('Version',element.);
      //  inputMap.set('UpdatedOn',element.);
      //  inputMap.set('CreatedOn',element.);
    });
    return CostAndFundsList;
  }
  // generatePersuingCourseSaveReq() {
  //   let inputObj = {};
  //   if (this.PastEdSeq != undefined) {
  //     inputMap.set('PursuingCourseSeq', this.PastEdSeq);
  //   }
  //   if (this.EdLoanSummSeq != undefined) {
  //     inputMap.set('LoanSummSeq', this.EdLoanSummSeq);
  //   }
  //   inputMap.set('PrContactPerson', this.PCContactPerson.getFieldValue());
  //   inputMap.set('PrPincode', this.PCPinCode.getFieldValue());
  //   inputMap.set('PrAdmissionThrough', this.PCAdmitionThrough.getFieldValue());
  //   inputMap.set('PrCity', this.PCCity.getFieldValue());
  //   inputMap.set('PrAddress', this.PCInstituteAddress.getFieldValue());
  //   inputMap.set('PrCourseRank', this.PCRanking.getFieldValue());
  //   inputMap.set('PrState', this.PCState.getFieldValue());
  //   inputMap.set('PrAdmissionStatus', this.PCAdmissionStatus.getFieldValue());
  //   inputMap.set('PrCourseFor', this.PCAppliedFor.getFieldValue());
  //   inputMap.set('PrCourseType', this.PCCourseType.getFieldValue());
  //   inputMap.set('SecInstituteName', this.PCCollegeName.getFieldValue());
  //   inputMap.set('SecCourseName', this.PCName2.getFieldValue());
  //   inputMap.set('PrRegion', this.PCRegion.getFieldValue());
  //   inputMap.set('PrCourseName', this.PCName.getFieldValue());
  //   inputMap.set('PrCountry', this.PCCountry.getFieldValue());
  //   inputMap.set('PrCourseStartDt', this.PCStartDate.getFieldValue());
  //   inputMap.set('PrRecognizedAuthority', this.RecognizedAuthority.getFieldValue());
  //   inputMap.set('PrCourseCategory', this.PCCategory.getFieldValue());
  //   inputMap.set('SecAddress', this.PCCollegeAddress.getFieldValue());
  //   inputMap.set('SecCourseEndDate', this.PCEndDate.getFieldValue());
  //   inputMap.set('ApplicationId', this.ApplicationId);
  //   inputMap.set('PrInstituteName', this.PCInstitutionName.getFieldValue());
  //   inputMap.set('PrCourseEndDt', this.PCCompeteDate.getFieldValue());
  //   inputMap.set('SecCourseFlag', this.PCIsAttending.getFieldValue());
  //   //inputMap.set('UpdatedBy',this..getFieldValue());
  //   //inputMap.set('Version',this..getFieldValue());
  //   //inputMap.set('UpdatedOn',this.a.getFieldValue());
  //   //inputMap.set('CreatedOn',this.a.getFieldValue());
  //   //inputMap.set('CreatedBy',this..getFieldValue());

  //   return inputMap;

  // }

  generatePersuingCourseSaveReq() {
    let inputObj = {};
    if (this.PastEdSeq != undefined) {
      inputObj['PursuingCourseSeq'] = this.PastEdSeq;
    }
    if (this.EdLoanSummSeq != undefined) {
      inputObj['LoanSummSeq'] = this.EdLoanSummSeq;
    }
    inputObj['PrContactPerson'] = this.PCContactPerson.getFieldValue();
    inputObj['PrPincode'] = this.PCPinCode.getFieldValue();
    inputObj['PrAdmissionThrough'] = this.PCAdmitionThrough.getFieldValue();
    inputObj['PrCity'] = this.PCCity.getFieldValue();
    inputObj['PrAddress'] = this.PCInstituteAddress.getFieldValue();
    inputObj['PrCourseRank'] = this.PCRanking.getFieldValue();
    inputObj['PrState'] = this.PCState.getFieldValue();
    inputObj['PrAdmissionStatus'] = this.PCAdmissionStatus.getFieldValue();
    inputObj['PrCourseFor'] = this.PCAppliedFor.getFieldValue();
    inputObj['PrCourseType'] = this.PCCourseType.getFieldValue();
    inputObj['SecInstituteName'] = this.PCCollegeName.getFieldValue();
    inputObj['SecCourseName'] = this.PCName2.getFieldValue();
    inputObj['PrRegion'] = this.PCRegion.getFieldValue();
    inputObj['PrCourseName'] = this.PCName.getFieldValue();
    inputObj['PrCountry'] = this.PCCountry.getFieldValue();
    inputObj['PrCourseStartDt'] = this.PCStartDate.getFieldValue();
    inputObj['PrRecognizedAuthority'] = this.RecognizedAuthority.getFieldValue();
    inputObj['PrCourseCategory'] = this.PCCategory.getFieldValue();
    inputObj['SecAddress'] = this.PCCollegeAddress.getFieldValue();
    inputObj['SecCourseEndDate'] = this.PCEndDate.getFieldValue();
    inputObj['ApplicationId'] = this.ApplicationId;
    inputObj['PrInstituteName'] = this.PCInstitutionName.getFieldValue();
    inputObj['PrCourseEndDt'] = this.PCCompeteDate.getFieldValue();
    inputObj['SecCourseFlag'] = this.PCIsAttending.getFieldValue();
    //inputMap.set('UpdatedBy',this..getFieldValue());
    //inputMap.set('Version',this..getFieldValue());
    //inputMap.set('UpdatedOn',this.a.getFieldValue());
    //inputMap.set('CreatedOn',this.a.getFieldValue());
    //inputMap.set('CreatedBy',this..getFieldValue());

    return inputObj;

  }
  ED_SAVE_BTN_click(event) {
    let inputMap = new Map();
    this.PE_SAVE_BTN.setDisabled(true);
    let numberOfErrors: number = 0;
    if (numberOfErrors == 0) {
      if (this.PastEdSeq != undefined) {

        inputMap = this.generateEduSaveUpdateReq(inputMap);

        this.services.http.fetchApi('/EducationLoan/{PastEdSeq}', 'PUT', inputMap, '/rlo-de').subscribe(
          async (httpResponse: HttpResponse<any>) => {
            var res = httpResponse.body;
            this.services.alert.showAlert(1, 'rlo.success.update.visitreport', 5000);
            this.PastEducationGrid.gridDataLoad({
              'ApplicationId': this.ApplicationId
            });
            this.PE_CLEAR_BTN_click({});
            this.PE_SAVE_BTN.setDisabled(false);
          },
          async (httpError) => {
            this.parseResponseError(httpError['error']);
            this.services.alert.showAlert(2, 'rlo.error.update.visitreport', -1);
            this.PE_SAVE_BTN.setDisabled(false);
          }
        );
      }
      else {
        inputMap = this.generateEduSaveUpdateReq(inputMap);
        this.services.http.fetchApi('/PastEducation', 'POST', inputMap, '/rlo-de').subscribe(
          async (httpResponse: HttpResponse<any>) => {
            var res = httpResponse.body;
            this.services.alert.showAlert(1, 'rlo.success.save.visitreport', 5000);
            this.PastEducationGrid.gridDataLoad({
              'ApplicationId': this.ApplicationId
            });
            this.PE_CLEAR_BTN_click({});
            this.PE_SAVE_BTN.setDisabled(false);
          },
          async (httpError) => {
            this.parseResponseError(httpError['error']);
            this.services.alert.showAlert(2, 'rlo.error.save.visitreport', -1);
            this.PE_SAVE_BTN.setDisabled(false);
          }
        );
      }
    }
    else {
      this.services.alert.showAlert(2, 'rlo.error.invalid.form', -1);
      this.PE_SAVE_BTN.setDisabled(false);
    }
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
    PEExamPassed: {
      inDep: [

        { paramKey: "VALUE1", depFieldID: "PEExamPassed", paramType: "PathParam" },
        { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
        { paramKey: "KEY1", depFieldID: "hidExamPassed", paramType: "QueryParam" },
      ],
      outDep: [
      ]
    },
    PEClassObtained: {
      inDep: [

        { paramKey: "VALUE1", depFieldID: "PEClassObtained", paramType: "PathParam" },
        { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
        { paramKey: "KEY1", depFieldID: "hidClassObtained", paramType: "QueryParam" },
      ],
      outDep: [
      ]
    },
    PCAdmissionStatus: {
      inDep: [

        { paramKey: "VALUE1", depFieldID: "PCAdmissionStatus", paramType: "PathParam" },
        { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
        { paramKey: "KEY1", depFieldID: "hidAdmissionStatus", paramType: "QueryParam" },
      ],
      outDep: [
      ]
    },
    PCAdmitionThrough: {
      inDep: [

        { paramKey: "VALUE1", depFieldID: "PCAdmitionThrough", paramType: "PathParam" },
        { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
        { paramKey: "KEY1", depFieldID: "hidAdmissionThrough", paramType: "QueryParam" },
      ],
      outDep: [
      ]
    },
    PCCategory: {
      inDep: [

        { paramKey: "VALUE1", depFieldID: "PCCategory", paramType: "PathParam" },
        { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
        { paramKey: "KEY1", depFieldID: "hidCourseCategory", paramType: "QueryParam" },
      ],
      outDep: [
      ]
    },
    PCCourseType: {
      inDep: [

        { paramKey: "VALUE1", depFieldID: "PCCourseType", paramType: "PathParam" },
        { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
        { paramKey: "KEY1", depFieldID: "hidCourseType", paramType: "QueryParam" },
      ],
      outDep: [
      ]
    },
    PCAppliedFor: {
      inDep: [

        { paramKey: "VALUE1", depFieldID: "PCAppliedFor", paramType: "PathParam" },
        { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
        { paramKey: "KEY1", depFieldID: "hidCourseField", paramType: "QueryParam" },
      ],
      outDep: [
      ]
    },
    PEInstitution: {
      inDep: [

        { paramKey: "InstituteCode", depFieldID: "PEInstitution", paramType: "PathParam" },
      ],
      outDep: [
      ]
    },
    PCInstitutionName: {
      inDep: [

        { paramKey: "InstituteCode", depFieldID: "PCInstitutionName", paramType: "PathParam" },
      ],
      outDep: [
        { paramKey: "MstInstitution.InstituteAddress", depFieldID: "PCInstituteAddress" },
      ]
    },
    PCCountry: {
      inDep: [

        { paramKey: "CountryCd", depFieldID: "PCCountry", paramType: "PathParam" },
      ],
      outDep: [
      ]
    }
  }
}
