import { Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import { LoanDetailsFormModel } from './LoanDetailsForm.model';
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
import { LoanHandlerComponent } from '../LoanDetailsForm/loan-handler.component';
import { ReadOnlyComponent } from '../rlo-ui-readonlyfield/rlo-ui-readonlyfield.component';
import { LoanDetailsGridComponent } from '../LoanDetailsGrid/LoanDetailsGrid.component';
import { IfStmt } from '@angular/compiler';
import { IModalData } from '../popup-alert/popup-interface';
import { IAmortizationForm} from '../amortization-schedule/amortization-interface';
import { ICardMetaData, IUwCustomerTab, IGeneralCardData } from '../Interface/masterInterface';

const customCss: string = '';

@Component({
  selector: 'app-LoanDetailsForm',
  templateUrl: './LoanDetailsForm.component.html'
})
export class LoanDetailsFormComponent extends FormComponent implements OnInit, AfterViewInit {
  @ViewChild('LoanAmount', { static: false }) LoanAmount: AmountComponent;
  @ViewChild('InterestRate', { static: false }) InterestRate: TextBoxComponent;
  @ViewChild('MarginRate', { static: false }) MarginRate: TextBoxComponent;
  @ViewChild('NetInterestRate', { static: false }) NetInterestRate: TextBoxComponent;
  @ViewChild('Tenure', { static: false }) Tenure: TextBoxComponent;
  @ViewChild('TenurePeriod', { static: false }) TenurePeriod: ComboBoxComponent;
  @ViewChild('InterestRateType', { static: false }) InterestRateType: ComboBoxComponent;
  @ViewChild('SystemRecommendedAmount', { static: false }) SystemRecommendedAmount: AmountComponent;
  @ViewChild('UserRecommendedAmount', { static: false }) UserRecommendedAmount: AmountComponent;
  @ViewChild('RepaymentFrequency', { static: false }) RepaymentFrequency: ComboBoxComponent;
  @ViewChild('RepaymentOption', { static: false }) RepaymentOption: ComboBoxComponent;
  @ViewChild('RepaymentAccNo', { static: false }) RepaymentAccNo: TextBoxComponent;
  @ViewChild('LD_FEES_CHARGE', { static: false }) LD_FEES_CHARGE: ButtonComponent;
  @ViewChild('LD_COLL_UPFRONT_CHARGES', { static: false }) LD_COLL_UPFRONT_CHARGES: ButtonComponent;
  @ViewChild('LD_DISBURMENT_MONEY', { static: false }) LD_DISBURMENT_MONEY: ButtonComponent;
  @ViewChild('LD_RECEIVE_MONEY', { static: false }) LD_RECEIVE_MONEY: ButtonComponent;
  @ViewChild('LD_GEN_AMOR_SCH', { static: false }) LD_GEN_AMOR_SCH: ButtonComponent;
  @ViewChild('MoneyInstallment', { static: false }) MoneyInstallment: ReadOnlyComponent;
  @ViewChild('TotalInterestAmount', { static: false }) TotalInterestAmount: ReadOnlyComponent;
  @ViewChild('TotalInstallmentAmt', { static: false }) TotalInstallmentAmt: ReadOnlyComponent;
  @ViewChild('MarginMoney', { static: false }) MarginMoney: ReadOnlyComponent;
  @ViewChild('Handler', { static: false }) Handler: LoanHandlerComponent;
  @ViewChild('hidAppId', { static: false }) hidAppId: HiddenComponent;
  @ViewChild('hidInterestRate', { static: false }) hidInterestRate: HiddenComponent;
  @ViewChild('hidPeriod', { static: false }) hidPeriod: HiddenComponent;
  @ViewChild('hidAppPurpose', { static: false }) hidAppPurpose: HiddenComponent;
  @ViewChild('hideInstRateType', { static: false }) hideInstRateType: HiddenComponent;
  @ViewChild('hideRepaymentOption', { static: false }) hideRepaymentOption: HiddenComponent;
  @ViewChild('hideRepaymentFreq', { static: false }) hideRepaymentFreq: HiddenComponent;
  @ViewChild('hideLoanSeq', { static: false }) hideLoanSeq: HiddenComponent;
  @ViewChild('FieldId_26', { static: false }) FieldId_26: LoanDetailsGridComponent;
  @ViewChild('LD_SAVE_BTN', { static: false }) CD_SAVE_BTN: ButtonComponent;
  @ViewChild('LD_CLEAR_BTN', { static: false }) CD_CLEAR_BTN: ButtonComponent;
  @Input() readOnly: boolean = false;

  ApplicationId: any
  LoanArray = [];

  async revalidate(showErrors: boolean = true): Promise<number> {
    var totalErrors = 0;
    super.beforeRevalidate();
    await Promise.all([

      this.revalidateBasicField('LoanAmount', false, showErrors),
      this.revalidateBasicField('InterestRate', false, showErrors),
      this.revalidateBasicField('MarginRate', false, showErrors),
      this.revalidateBasicField('NetInterestRate', false, showErrors),
      this.revalidateBasicField('Tenure', false, showErrors),
      this.revalidateBasicField('TenurePeriod', false, showErrors),
      this.revalidateBasicField('InterestRateType', false, showErrors),
      this.revalidateBasicField('SystemRecommendedAmount', false, showErrors),
      this.revalidateBasicField('UserRecommendedAmount', false, showErrors),
      this.revalidateBasicField('RepaymentFrequency', false, showErrors),
      this.revalidateBasicField('RepaymentOption', false, showErrors),
      this.revalidateBasicField('RepaymentAccNo', false, showErrors),
      this.revalidateBasicField('MoneyInstallment', false, showErrors),
      this.revalidateBasicField('TotalInterestAmount', false, showErrors),
      this.revalidateBasicField('TotalInstallmentAmt', false, showErrors),
      this.revalidateBasicField('MarginMoney', false, showErrors),
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
    this.value = new LoanDetailsFormModel();
    this.componentCode = 'LoanDetailsForm';
  }
  setReadOnly(readOnly) {
    super.setBasicFieldsReadOnly(readOnly);
  }
  async onFormLoad() {
    this.setInputs(this.services.dataStore.getData(this.services.routing.currModal));
    // this.LoanAmount.setFormatOptions({ currencyCode: 'INR', languageCode: 'en-US', });
    // this.SystemRecommendedAmount.setFormatOptions({ currencyCode: 'INR', languageCode: 'en-US', });
    // this.UserRecommendedAmount.setFormatOptions({ currencyCode: 'INR', languageCode: 'en-US', });
    this.hidAppId.setValue('RLO');
    this.hidInterestRate.setValue('INTEREST_RATE');
    this.hidPeriod.setValue('PERIOD');
    this.hidAppPurpose.setValue('APPLICATION_PURPOSE');
    this.hideInstRateType.setValue('INTEREST_RATE_TYPE');
    this.hideRepaymentOption.setValue('REPAYMENT_OPTION');
    this.hideRepaymentFreq.setValue('FREQUENCY');
    this.LD_COLL_UPFRONT_CHARGES.setDisabled(true);
    this.LD_DISBURMENT_MONEY.setDisabled(true);
    // this.LD_FEES_CHARGE.setDisabled(true);
    this.LD_RECEIVE_MONEY.setDisabled(true);
    let inputMap = new Map();
    await this.Handler.onFormLoad({
    });
    this.OnLoanFormLoad()

    this.setDependencies();
  }
  setInputs(param: any) {
    let params = this.services.http.mapToJson(param);
    if (params['mode']) {
      this.mode = params['mode'];
    }
  }
  async submitForm(path, apiCode, serviceCode) {
    this.submitData['formName'] = 'Loan Details Main Form';
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
    this.FieldId_26.setValue(inputValue['FieldId_26']);
    this.value = new LoanDetailsFormModel();
    this.value.setValue(inputValue);
    this.setDependencies();
    this.passNewValue(this.value);
  }
  ngOnInit() {
    if (this.formCode == undefined) { this.formCode = 'LoanDetailsForm'; }
    if (this.formOnLoadError) { return; }
    var styleElement = document.createElement('style');
    styleElement.type = 'text/css';
    styleElement.innerHTML = customCss;
    styleElement.id = 'LoanDetailsForm_customCss';
    document.getElementsByTagName('head')[0].appendChild(styleElement);
  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    var styleElement = document.getElementById('LoanDetailsForm_customCss');
    styleElement.parentNode.removeChild(styleElement);
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.subsBFldsValueUpdates();
      this.onFormLoad();
      this.checkForHTabOverFlow();

      if (this.readOnly)
        this.setReadOnly(this.readOnly);
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
    this.value = new LoanDetailsFormModel();
    this.passNewValue(this.value);
    this.setReadOnly(false);
    this.onFormLoad();
  }
  OnLoanFormLoad() {
    let inputMap = new Map();
    inputMap.clear();
    let applicationId: any = this.ApplicationId;
    // let applicationId = '2221';
    let criteriaJson: any = { "Offset": 1, "Count": 10, FilterCriteria: [] };
    if (applicationId) {
      criteriaJson.FilterCriteria.push({
        "columnName": "ApplicationId",
        "columnType": "String",
        "conditions": {
          "searchType": "equals",
          "searchText": applicationId
        }
      });

    }
    inputMap.set('QueryParam.criteriaDetails', criteriaJson)

    this.services.http.fetchApi('/LoanDetails', 'GET', inputMap, '/rlo-de').subscribe(
      async (httpResponse: HttpResponse<any>) => {
        var res = httpResponse.body;
        this.LoanArray = [];

        if (res !== null) {
          this.LoanArray = res['LoanDetails'];

          this.LoanArray.forEach(async LoanElement => {
            this.LoanAmount.setValue(LoanElement['LoanAmount']);
            this.InterestRate.setValue(LoanElement['InterestRate']);
            this.MarginRate.setValue(LoanElement['MarginRate']);
            this.NetInterestRate.setValue(LoanElement['NetInterestRate']);
            this.Tenure.setValue(LoanElement['Tenure']);
            this.TenurePeriod.setValue(LoanElement['TenurePeriod']);
            this.InterestRateType.setValue(LoanElement['InterestRateType']);
            this.SystemRecommendedAmount.setValue(LoanElement['SystemRecommendedAmount']);
            this.UserRecommendedAmount.setValue(LoanElement['UserRecommendedAmount']);
            this.RepaymentFrequency.setValue(LoanElement['RepaymentFrequency']);
            this.RepaymentOption.setValue(LoanElement['RepaymentOption']);
            this.RepaymentAccNo.setValue(LoanElement['RepaymentAccNo']);
            this.hideLoanSeq.setValue(LoanElement['LoanDetailSeq'])
            this.MarginMoney.setValue(LoanElement['MarginMoney']);
            this.MoneyInstallment.setValue(LoanElement['MoneyInstallment']);
            this.TotalInterestAmount.setValue(LoanElement['TotalInterestAmount']);
            this.TotalInstallmentAmt.setValue(LoanElement['TotalInstallmentAmt']);
            this.Handler.SetValue();

            this.LoanGridCalculation();
          });

          this.revalidate(false).then((errors) => {
            if (errors === 0) {
              let array = [];

              array.push({ isValid: true, sectionData: this.getFieldValue() });
              let obj = {
                "name": "LoanDetails",
                "data": array,
                "sectionName": "LoanDetails"
              };

              this.services.rloCommonData.globalComponentLvlDataHandler(obj);
            }
          });
        }
      },
      async (httpError) => {
        var err = httpError['error']
        if (err != null && err['ErrorElementPath'] != undefined && err['ErrorDescription'] != undefined) {
        }
      }
    );
  }
  async LoanGridCalculation() {
    let CustomerDetailsArray = [];
    CustomerDetailsArray = this.services.rloCommonData.getCustomerList();
    var array = [];
    CustomerDetailsArray.forEach(Customer => {

      if ((Customer.CustomerType == 'B' || Customer.CustomerType == 'CB') && Customer.LoanOwnership>0) {
        var CalCulatepPrincipal = 0
        CalCulatepPrincipal = Number(Customer.LoanOwnership) / 100 * Number(this.LoanAmount.getFieldValue());
        let Emi = this.Handler.CalculateEMI();
        let EMIShare = Number(Customer.LoanOwnership) / 100 * Number(Emi);
        ;
        var tempObj = {};
        tempObj['CustomerType'] = Customer.CustomerType;
        tempObj['CustomerName'] = Customer.FullName;
        tempObj['Principle'] = CalCulatepPrincipal;
        tempObj['LoanOwnership'] = Customer.LoanOwnership;
        tempObj['EMI'] = EMIShare;
        array.push(tempObj);
      }
    })
    await this.FieldId_26.gridDataLoad({
      'passLoanGrid': array,
    });
  }
  async LD_FEES_CHARGE_click(event) {
    // if (this.readOnly)
    //   return

    let inputMap = new Map();
    inputMap.clear();
    inputMap.set('component', 'FeesChargesDetails');
    const modalRef = this.services.modal.open(PopupModalComponent, { windowClass: 'modal-width-lg' });
    var onModalClose = async (reason) => {
      (reason == 0 || reason == 1) ? await this.services.routing.removeOutlet() : undefined;
    }
    modalRef.result.then(onModalClose, onModalClose);
    modalRef.componentInstance.rotueToComponent(inputMap);
    this.services.dataStore.setModalReference(this.services.routing.currModal, modalRef);
  }
  async LD_GEN_AMOR_SCH_click(event) {
    if (this.readOnly)
      return

    if (this.Tenure == undefined || this.TenurePeriod == undefined) {
      this.services.alert.showAlert(2, 'rlo.error.tenure or tenureperiod.not.exist', -1);
      return;
    }
    // let ToatalEMI = this.Handler.CalculateEMI();
    // this.MoneyInstallment.setValue(ToatalEMI);
    // this.Handler.SetValue();

    //amortization modal code starts
   
    let dataObj=this.generateAmortizationDataList();
    Promise.all([this.services.rloui.getAlertMessage('', 'Generate Amortization Schedule')]).then(values => {
      console.log(values);
      let modalObj: IModalData = {
        title: values[0],
        mainMessage: undefined,
        modalSize: "modal-width-lg",
        buttons: [],
        componentName: 'AmortizationScheduleComponent',
        data: dataObj
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
  async LD_CLEAR_BTN_click(event) {
    let Array = this.Handler.FieldsArray();
    Array.forEach(function (arrayfalse) {
      arrayfalse.onReset()
    });
  }
  async LD_SAVE_BTN_click(event) {
    let inputMap = new Map();
    inputMap.clear();
    var nooferror: number = await this.revalidate();
    if (nooferror == 0) {
      inputMap.set('PathParam.LoanDetailSeq', this.hideLoanSeq.getFieldValue());
      inputMap.set('Body.LoanDetails.LoanAmount', this.LoanAmount.getFieldValue());
      inputMap.set('Body.LoanDetails.InterestRate', this.InterestRate.getFieldValue());
      inputMap.set('Body.LoanDetails.MarginRate', this.MarginRate.getFieldValue());
      inputMap.set('Body.LoanDetails.NetInterestRate', this.NetInterestRate.getFieldValue());
      inputMap.set('Body.LoanDetails.Tenure', this.Tenure.getFieldValue());
      inputMap.set('Body.LoanDetails.TenurePeriod', this.TenurePeriod.getFieldValue());
      inputMap.set('Body.LoanDetails.InterestRateType', this.InterestRateType.getFieldValue());
      inputMap.set('Body.LoanDetails.SystemRecommendedAmount', this.SystemRecommendedAmount.getFieldValue());
      inputMap.set('Body.LoanDetails.UserRecommendedAmount', this.UserRecommendedAmount.getFieldValue());
      inputMap.set('Body.LoanDetails.RepaymentFrequency', this.RepaymentFrequency.getFieldValue());
      inputMap.set('Body.LoanDetails.RepaymentOption', this.RepaymentOption.getFieldValue());
      inputMap.set('Body.LoanDetails.RepaymentAccNo', this.RepaymentAccNo.getFieldValue());
      inputMap.set('Body.LoanDetails.MoneyInstallment', this.MoneyInstallment.getFieldValue());
      if (this.TotalInterestAmount.getFieldValue() == '-NA-') {
        inputMap.set('Body.LoanDetails.TotalInterestAmount', 0);
      }
      if (this.TotalInstallmentAmt.getFieldValue() == '-NA-') {
        inputMap.set('Body.LoanDetails.TotalInstallmentAmt', 0);
      }

      inputMap.set('Body.LoanDetails.MarginMoney', this.MarginMoney.getFieldValue());
      inputMap.set('Body.LoanDetails.ApplicationId', this.ApplicationId);
      this.services.http.fetchApi('/LoanDetails/{LoanDetailSeq}', 'PUT', inputMap, '/rlo-de').subscribe(
        async (httpResponse: HttpResponse<any>) => {
          var res = httpResponse.body;
          this.services.alert.showAlert(1, 'rlo.success.save.loan', 5000);
          this.LoanGridCalculation();
          var loanData = [""];

          // if (res !== null) {
          //   loanData = res['LoanDetails'];
          // }
          // else {
          //   loanData = [];
          // }

          let array = [];
          array.push({ isValid: true, sectionData: this.getFieldValue() });
          console.log("shweta inside loan array", array);
          let obj = {
            "name": "LoanDetails",
            "data": array,
            "sectionName": "LoanDetails"
          };

          this.services.rloCommonData.globalComponentLvlDataHandler(obj);

        },
        async (httpError) => {
          var err = httpError['error']
          if (err != null && err['ErrorElementPath'] != undefined && err['ErrorDescription'] != undefined) {
            if (err['ErrorElementPath'] == 'LoanDetails.MarginMoney') {
              this.MarginMoney.setError(err['ErrorDescription']);
            }
            else if (err['ErrorElementPath'] == 'LoanDetails.TotalInstallmentAmt') {
              this.TotalInstallmentAmt.setError(err['ErrorDescription']);
            }
            else if (err['ErrorElementPath'] == 'LoanDetails.TotalInterestAmount') {
              this.TotalInterestAmount.setError(err['ErrorDescription']);
            }
            else if (err['ErrorElementPath'] == 'LoanDetails.MoneyInstallment') {
              this.MoneyInstallment.setError(err['ErrorDescription']);
            }
            else if (err['ErrorElementPath'] == 'LoanDetails.RepaymentAccNo') {
              this.RepaymentAccNo.setError(err['ErrorDescription']);
            }
            else if (err['ErrorElementPath'] == 'LoanDetails.RepaymentOption') {
              this.RepaymentOption.setError(err['ErrorDescription']);
            }
            else if (err['ErrorElementPath'] == 'LoanDetails.RepaymentFrequency') {
              this.RepaymentFrequency.setError(err['ErrorDescription']);
            }
            else if (err['ErrorElementPath'] == 'LoanDetails.UserRecommendedAmount') {
              this.UserRecommendedAmount.setError(err['ErrorDescription']);
            }
            else if (err['ErrorElementPath'] == 'LoanDetails.SystemRecommendedAmount') {
              this.SystemRecommendedAmount.setError(err['ErrorDescription']);
            }
            else if (err['ErrorElementPath'] == 'LoanDetails.InterestRateType') {
              this.InterestRateType.setError(err['ErrorDescription']);
            }
            else if (err['ErrorElementPath'] == 'LoanDetails.TenurePeriod') {
              this.TenurePeriod.setError(err['ErrorDescription']);
            }
            else if (err['ErrorElementPath'] == 'LoanDetails.Tenure') {
              this.Tenure.setError(err['ErrorDescription']);
            }
            else if (err['ErrorElementPath'] == 'LoanDetails.NetInterestRate') {
              this.NetInterestRate.setError(err['ErrorDescription']);
            }
            else if (err['ErrorElementPath'] == 'LoanDetails.MarginRate') {
              this.MarginRate.setError(err['ErrorDescription']);
            }
            else if (err['ErrorElementPath'] == 'LoanDetails.InterestRate') {
              this.InterestRate.setError(err['ErrorDescription']);
            }
            else if (err['ErrorElementPath'] == 'LoanDetails.LoanAmount') {
              this.LoanAmount.setError(err['ErrorDescription']);
            }
          }
          this.services.alert.showAlert(2, 'rlo.error.save.loan', -1);
        }
      );
    } else {
      this.services.alert.showAlert(2, 'rlo.mandatory.loan.field', -1);
    }
  }

  generateAmortizationDataList() {
    //let CustomerDetailsArray = this.FieldId_26.LoanGridArray;
    let dataObj: IAmortizationForm = {};
    dataObj.LoanAmountRequested = this.LoanAmount.getFieldValue();
    dataObj.NetInterestRate = this.NetInterestRate.getFieldValue();
    dataObj.Tenure = this.Tenure.getFieldValue() + " " + (this.TenurePeriod.getFieldInfo() != undefined ? this.TenurePeriod.getFieldInfo() : this.TenurePeriod.getFieldValue());
    //dataObj.TenurePeriod=this.TenurePeriod.getFieldValue();
    this.FieldId_26.LoanGridArray.forEach(element => {
      if (element.CustomerType == 'B') {
        dataObj.BLoanOwnership = element.LoanOwnership;
        dataObj.BLoanAmtShare = element.Principle;
      } else if (element.CustomerType == 'CB' && element.LoanOwnership > 0) {
        dataObj.CBLoanOwnership = element.LoanOwnership;
        dataObj.CBLoanAmountShare = element.Principle;
      }
    });
    // dataObj.RequiredEMIAmt=this.Handler.CalculateEMI();

    return dataObj;
  }

  fieldDependencies = {
    TenurePeriod: {
      inDep: [

        { paramKey: "VALUE1", depFieldID: "LD_TENURE_PERIOD", paramType: "PathParam" },
        { paramKey: "KEY1", depFieldID: "hidPeriod", paramType: "QueryParam" },
        { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
      ],
      outDep: [
      ]
    },
    InterestRateType: {
      inDep: [

        { paramKey: "VALUE1", depFieldID: "InterestRateType", paramType: "PathParam" },
        { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
        { paramKey: "KEY1", depFieldID: "hideInstRateType", paramType: "QueryParam" },
      ],
      outDep: [
      ]
    },
    RepaymentFrequency: {
      inDep: [

        { paramKey: "VALUE1", depFieldID: "RepaymentFrequency", paramType: "PathParam" },
        { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
        { paramKey: "KEY1", depFieldID: "hideRepaymentFreq", paramType: "QueryParam" },
      ],
      outDep: [
      ]
    },
    RepaymentOption: {
      inDep: [

        { paramKey: "VALUE1", depFieldID: "RepaymentOption", paramType: "PathParam" },
        { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
        { paramKey: "KEY1", depFieldID: "hideRepaymentOption", paramType: "QueryParam" },
      ],
      outDep: [
      ]
    },
  }
}
