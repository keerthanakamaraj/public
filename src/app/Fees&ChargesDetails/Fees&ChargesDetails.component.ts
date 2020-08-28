import { Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import { FeesChargesDetailsModel } from './Fees&ChargesDetails.model';
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
import { FeesChargesGridComponent } from '../FeesChargesGrid/FeesChargesGrid.component';
import { FeesChargesDetailsHandlerComponent } from './FeesChargesDetails-handler.component';
import { RLOUIRadioComponent } from '../rlo-ui-radio/rlo-ui-radio.component';
import { IAmortizationForm } from '../Interface/masterInterface';

const customCss: string = '';

@Component({
  selector: 'app-FeesChargesDetails',
  templateUrl: './Fees&ChargesDetails.component.html'
})
export class FeesChargesDetailsComponent extends FormComponent implements OnInit, AfterViewInit {
  @ViewChild('ChargeDescription', { static: false }) ChargeDescription: ComboBoxComponent;
  @ViewChild('ChargeType', { static: false }) ChargeType: ComboBoxComponent;
  @ViewChild('PartyType', { static: false }) PartyType: ComboBoxComponent;
  @ViewChild('PartyName', { static: false }) PartyName: ComboBoxComponent;
  @ViewChild('ChargeBasis', { static: false }) ChargeBasis: RLOUIRadioComponent;
  @ViewChild('ChargeRate', { static: false }) ChargeRate: TextBoxComponent;
  @ViewChild('ChargeAmt', { static: false }) ChargeAmt: AmountComponent;
  @ViewChild('PeriodicCharge', { static: false }) PeriodicCharge: ComboBoxComponent;
  @ViewChild('PeriodicStDt', { static: false }) PeriodicStDt: DateComponent;
  @ViewChild('PeriodicEnDt', { static: false }) PeriodicEnDt: ComboBoxComponent;
  @ViewChild('Frequency', { static: false }) Frequency: DateComponent;
  @ViewChild('RateOnCharge', { static: false }) RateOnCharge: ComboBoxComponent;
  @ViewChild('ChargeCollection', { static: false }) ChargeCollection: ComboBoxComponent;
  @ViewChild('Currency', { static: false }) Currency: ComboBoxComponent;
  @ViewChild('EffectiveAmount', { static: false }) EffectiveAmount: AmountComponent;
  @ViewChild('LocalAmount', { static: false }) LocalAmount: AmountComponent;
  @ViewChild('FC_SAVE_BTN', { static: false }) FC_SAVE_BTN: ButtonComponent;
  @ViewChild('FC_RESET_BTN', { static: false }) FC_RESET_BTN: ButtonComponent;
  @ViewChild('FieldId_2', { static: false }) FieldId_2: FeesChargesGridComponent;
  @ViewChild('Handler', { static: false }) Handler: FeesChargesDetailsHandlerComponent
  @ViewChild('hideChargeBasis', { static: false }) hideChargeBasis: HiddenComponent;
  @ViewChild('hidAppId', { static: false }) hidAppId: HiddenComponent;
  @ViewChild('AD_HIDE_ID', { static: false }) AD_HIDE_ID: HiddenComponent;
  @ViewChild('hideCurrencyDesc', { static: false }) hideCurrencyDesc: HiddenComponent;
  @ViewChild('hidExchangeRate', { static: false }) hidExchangeRate: HiddenComponent;
  @ViewChild('hidePartyType', { static: false }) hidePartyType: HiddenComponent;
  @ViewChild('hidePeriodicCharge', { static: false }) hidePeriodicCharge: HiddenComponent;
  @ViewChild('hideChargeType', { static: false }) hideChargeType: HiddenComponent;
  @ViewChild('hideFrequency', { static: false }) hideFrequency: HiddenComponent;
  @ViewChild('hideRateChargeOn', { static: false }) hideRateChargeOn: HiddenComponent;
  @ViewChild('hideChargeCollection', { static: false }) hideChargeCollection: HiddenComponent;
  @ViewChild('hideChargeDescription', { static: false }) hideChargeDescription: HiddenComponent;
  //@ViewChild('hidePartyName', { static: false }) hidePartyName: HiddenComponent;



  @Input() parentData: IAmortizationForm = undefined;

  LoanAmount: any;
  NetInterestRate: any;
  ApplicationId: any;
  InterestRate: any;

  FilterOptions = [];


  async revalidate(): Promise<number> {
    var totalErrors = 0;
    super.beforeRevalidate();
    await Promise.all([
      this.revalidateBasicField('ChargeDescription'),
      this.revalidateBasicField('ChargeType'),
      this.revalidateBasicField('PartyType'),
      this.revalidateBasicField('ChargeBasis'),
      this.revalidateBasicField('ChargeRate'),
      this.revalidateBasicField('PartyName'),
      this.revalidateBasicField('ChargeAmt'),
      this.revalidateBasicField('PeriodicCharge'),
      this.revalidateBasicField('PeriodicStDt'),
      this.revalidateBasicField('PeriodicEnDt'),
      this.revalidateBasicField('Frequency'),
      this.revalidateBasicField('RateOnCharge'),
      this.revalidateBasicField('ChargeCollection'),
      this.revalidateBasicField('EffectiveAmount'),
      this.revalidateBasicField('Currency'),
      this.revalidateBasicField('LocalAmount')

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
    this.value = new FeesChargesDetailsModel();
    this.componentCode = 'FeesChargesDetails';
  }
  setReadOnly(readOnly) {
    super.setBasicFieldsReadOnly(readOnly);
  }
  async onFormLoad() {
    this.setInputs(this.services.dataStore.getData(this.services.routing.currModal));

    this.ChargeAmt.setFormatOptions({ languageCode: 'en-US', });
    this.LocalAmount.setFormatOptions({ languageCode: 'en-US', });
    this.EffectiveAmount.setFormatOptions({ languageCode: 'en-US', });
    this.setDependencies();
    this.hideCurrencyDesc.setValue('EUR');
    this.hidAppId.setValue('RLO');
    this.hideChargeBasis.setValue('CHARGE_BASIS');
    this.hideChargeType.setValue('CHARGE_TYPE');
    this.hidePartyType.setValue('PARTY_TYPE');
    this.hideFrequency.setValue('FREQUENCY');
    this.hideRateChargeOn.setValue('RATE_CHARGE_ON');
    this.hideChargeCollection.setValue('CHARGE_COLLECTION');
    this.hidePeriodicCharge.setValue('Y_N');
    //is.hidePartyName.setValue('PARTY_NAME')
    this.hideChargeDescription.setValue('CHARGE_DESC');
    this.ChargeBasis.setDefault('RATE');
    this.ChargeBasis.setValue('RATE');
    await this.Handler.onFormLoad({
    });

    this.Handler.hideShowFieldBasedOnChargeBasis();
    this.Handler.hideFieldBasedOnPeriodicCharge();

    this.getLoanFieldValue();

    if (this.ApplicationId) {
      await this.FieldId_2.gridDataLoad({
        'passFeeChargeGrid': this.ApplicationId,
      });
    }

    console.log(this.FieldId_2.columnDefs);
    if (this.readOnly) {
      this.FieldId_2.columnDefs = this.FieldId_2.columnDefs.slice(0, 10);
      this.FieldId_2.columnDefs[9].width = 12;
      this.FieldId_2.columnDefs[9].cellRendererParams.CustomClass = "btn-views";
      this.FieldId_2.columnDefs[9].cellRendererParams.IconClass = 'fas fa-eye fa-lg';

      this.Handler.MainComponent.Frequency.setReadOnly(true);
    }
  }
  setInputs(param: any) {
    let params = this.services.http.mapToJson(param);
    if (params['mode']) {
      this.mode = params['mode'];
    }
  }
  async submitForm(path, apiCode, serviceCode) {
    this.submitData['formName'] = 'Fees & Charges';
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
    this.FieldId_2.setValue(inputValue['FieldId_2']);
    this.value = new FeesChargesDetailsModel();
    this.value.setValue(inputValue);
    this.setDependencies();
    this.passNewValue(this.value);
  }
  ngOnInit() {
    if (this.formCode == undefined) { this.formCode = 'FeesChargesDetails'; }
    if (this.formOnLoadError) { return; }
    var styleElement = document.createElement('style');
    styleElement.type = 'text/css';
    styleElement.innerHTML = customCss;
    styleElement.id = 'FeesChargesDetails_customCss';
    document.getElementsByTagName('head')[0].appendChild(styleElement);
  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    var styleElement = document.getElementById('FeesChargesDetails_customCss');
    styleElement.parentNode.removeChild(styleElement);
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.subsBFldsValueUpdates();
      this.onFormLoad();
      this.checkForHTabOverFlow();

      if (this.readOnly) {
        this.setReadOnly(this.readOnly);
      }
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
    this.value = new FeesChargesDetailsModel();
    this.passNewValue(this.value);

    this.setReadOnly(false);

    this.onFormLoad();
  }
  async ChargeBasis_change(fieldID, value) {
    this.Handler.hideShowFieldBasedOnChargeBasis();
  }
  async PeriodicCharge_change(fieldID, value) {
    this.Handler.hideFieldBasedOnPeriodicCharge();
  }
  // async PartyType_change(fieldID, value){
  //   let id = this.PartyType.getFieldValue();
  //   this.array = this.setFilterbyOptions(id);
  //   this.FilterOptions = [];
  //   this.array.forEach(element => {
  //       this.FilterOptions.push({ id: 'C_' + element.BorrowerSeq, text: element.CustomerType + '-' + element.FullName });
  //   });
  //   this.PartyName.setStaticList(this.FilterOptions);
  // }
  async Currency_blur(event) {
    let inputMap = new Map();
    this.Handler.chargeAmountcharOnblur()
  }
  async ChargeAmt_blur(event) {
    let inputMap = new Map();
    this.Handler.chargeAmountcharOnblur()
    // await this.Handler.onAddTypeChange();
  }
  async ChargeRate_blur(event) {
    let inputMap = new Map();
    this.Handler.calculateEffectiveAmount()
    // await this.Handler.onAddTypeChange();
  }
  async RateOnCharge_change(event) {
    let inputMap = new Map();
    this.Handler.calculateEffectiveAmount()
    // await this.Handler.onAddTypeChange();
  }

  periodic_start_date(selectedDate) {
    const moment = require('moment');
    const currentDate = moment();
    currentDate.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
    selectedDate = moment(selectedDate, 'DD-MM-YYYY');
    console.log("current date :: ", currentDate._d);
    console.log("selected date :: ", selectedDate._d);
    if (selectedDate < currentDate) {
      return false;
    }
    return true;
  }
  periodic_end_date(selectedDate) {
    const moment = require('moment');
    const currentDate = moment();
    currentDate.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
    selectedDate = moment(selectedDate, 'DD-MM-YYYY');
    console.log("current date :: ", currentDate._d);
    console.log("selected date :: ", selectedDate._d);
    if (selectedDate <= currentDate) {
      return false;
    }
    return true;
  }
  async PeriodicStDt_blur(event) {
    let inputMap = new Map();
    if (!this.periodic_start_date(this.PeriodicStDt.getFieldValue())) {
      this.PeriodicStDt.setError('Please select correct periodic start date')
      return 1;
      // this.services.alert.showAlert(2, 'rlo.error.inceptiondate.occupation', -1);
      // this.OD_DT_OF_INCPTN.onReset();
    }
  }

  async PeriodicEnDt_blur(event) {
    let inputMap = new Map();
    if (!this.periodic_end_date(this.PeriodicEnDt.getFieldValue())) {
      this.PeriodicEnDt.setError('Please select correct periodic end date')
      return 1;
      // this.services.alert.showAlert(2, 'rlo.error.inceptiondate.occupation', -1);
      // this.OD_DT_OF_INCPTN.onReset();
    }
  }

  requestParameterForFeeChargesDetails() {
    const inputMap = new Map();
    inputMap.clear();
    inputMap.set('PathParam.ChargeDtlSeq', this.AD_HIDE_ID.getFieldValue());
    inputMap.set('Body.ChargeDetails.ApplicationId', this.ApplicationId);
    inputMap.set('Body.ChargeDetails.ChargeDescription', this.ChargeDescription.getFieldValue());
    inputMap.set('Body.ChargeDetails.ChargeType', this.ChargeType.getFieldValue());
    inputMap.set('Body.ChargeDetails.PartyType', this.PartyType.getFieldValue());
    inputMap.set('Body.ChargeDetails.PartyName', this.PartyName.getFieldValue());
    inputMap.set('Body.ChargeDetails.Currency', this.Currency.getFieldValue());
    inputMap.set('Body.ChargeDetails.ChargeBasis', this.ChargeBasis.getFieldValue());
    inputMap.set('Body.ChargeDetails.ChargeRate', this.ChargeRate.getFieldValue());
    inputMap.set('Body.ChargeDetails.ChargeAmt', this.ChargeAmt.getFieldValue());
    inputMap.set('Body.ChargeDetails.PeriodicCharge', this.PeriodicCharge.getFieldValue());
    inputMap.set('Body.ChargeDetails.PeriodicStDt', this.PeriodicStDt.getFieldValue());
    inputMap.set('Body.ChargeDetails.PeriodicEnDt', this.PeriodicEnDt.getFieldValue());
    inputMap.set('Body.ChargeDetails.Frequency', this.Frequency.getFieldValue());
    inputMap.set('Body.ChargeDetails.RateOnCharge', this.RateOnCharge.getFieldValue());
    inputMap.set('Body.ChargeDetails.ChargeCollection', this.ChargeCollection.getFieldValue());
    inputMap.set('Body.ChargeDetails.LocalAmount', this.LocalAmount.getFieldValue());
    inputMap.set('Body.ChargeDetails.EffectiveAmount', this.EffectiveAmount.getFieldValue());
    return inputMap;
  }
  FC_RESET_click($event) {
    this.onReset();
    this.ChargeBasis.setDefault("RATE");
  }
  async FC_SAVE_click(event) {
    let serviceName;
    let method
    const noOfError: number = await this.revalidate();
    if (noOfError === 0) {
      const requestdata = this.requestParameterForFeeChargesDetails();
      if (this.AD_HIDE_ID.getFieldValue() !== undefined) {
        serviceName = '/ChargeDetails/{ChargeDtlSeq}';
        method = 'PUT';
      } else {
        serviceName = '/ChargeDetails';
        method = 'POST';
      }
      this.services.http.fetchApi(serviceName, method, requestdata, '/rlo-de').subscribe(
        async (httpResponse: HttpResponse<any>) => {
          const res = httpResponse.body;
          if (this.AD_HIDE_ID.getFieldValue() == undefined) {
            this.services.alert.showAlert(1, 'rlo.success.save.feesCharges', 5000);
          } else {
            this.services.alert.showAlert(1, 'rlo.success.update.feesCharges', 5000);
          }
          // await this.AddressGrid.gridDataLoad({
          //   'passBorrowerSeqToGrid': this.addBorrowerSeq,
          // });
          this.onReset();
        },
        async (httpError) => {
          const err = httpError['error'];
          if (err != null && err['ErrorElementPath'] !== undefined && err['ErrorDescription'] !== undefined) {
            if (err['ErrorElementPath'] === 'AddressDetails.PreferredEmailForCommunication') {
              this.ChargeDescription.setError(err['ErrorDescription']);
            }
            // else if (err['ErrorElementPath'] === 'AddressDetails.LandlineCountryCode') {
            //   this.AD_LAND_COUNTRY_CODE.setError(err['ErrorDescription']);
            // } 
            else if (err['ErrorElementPath'] === 'AddressDetails.AltMobileNo') {
              this.ChargeType.setError(err['ErrorDescription']);
            } else if (err['ErrorElementPath'] === 'AddressDetails.EmailId2') {
              this.ChargeRate.setError(err['ErrorDescription']);
            } else if (err['ErrorElementPath'] === 'AddressDetails.EmailId1') {
              // this.AD_EMAIL_ID1.setError(err['ErrorDescription']);
            } else if (err['ErrorElementPath'] === 'AddressDetails.MailingAddress') {
              this.ChargeBasis.setError(err['ErrorDescription']);
            } else if (err['ErrorElementPath'] === 'AddressDetails.LandlineNumber') {
              this.PartyType.setError(err['ErrorDescription']);
            } else if (err['ErrorElementPath'] === 'AddressDetails.Landmark') {
              this.PartyName.setError(err['ErrorDescription']);
            } else if (err['ErrorElementPath'] === 'AddressDetails.State') {
              this.PeriodicCharge.setError(err['ErrorDescription']);
            } else if (err['ErrorElementPath'] === 'AddressDetails.City') {
              this.PeriodicEnDt.setError(err['ErrorDescription']);
            } else if (err['ErrorElementPath'] === 'AddressDetails.Region') {
              this.PeriodicStDt.setError(err['ErrorDescription']);
            } else if (err['ErrorElementPath'] === 'AddressDetails.PinCode') {
              this.Frequency.setError(err['ErrorDescription']);
            } else if (err['ErrorElementPath'] === 'AddressDetails.AddressLine4') {
              this.RateOnCharge.setError(err['ErrorDescription']);
            } else if (err['ErrorElementPath'] === 'AddressDetails.AddressLine3') {
              this.ChargeCollection.setError(err['ErrorDescription']);
            } else if (err['ErrorElementPath'] === 'AddressDetails.AddressLine2') {
              this.ChargeAmt.setError(err['ErrorDescription']);
            }
          }
          this.services.alert.showAlert(2, 'rlo.error.update.feesCharges', -1);
        }
      );

    } else {
      this.services.alert.showAlert(2, 'rlo.error.invalid.form', -1);
    }

  }


  async FC_Editdetails(event) {
    const inputMap = new Map();
    this.showSpinner();
    inputMap.clear();
    //this.onReset();
    inputMap.set('PathParam.ChargeDtlSeq', event.SeqKey);
    this.services.http.fetchApi('/ChargeDetails/{ChargeDtlSeq}', 'GET', inputMap, '/rlo-de').subscribe(
      async (httpResponse: HttpResponse<any>) => {
        const res = httpResponse.body;
        this.ChargeDescription.setValue(res['ChargeDetails']['ChargeDescription']);
        this.ChargeType.setValue(res['ChargeDetails']['ChargeType']);
        this.ChargeRate.setValue(res['ChargeDetails']['ChargeRate']);
        this.PartyType.setValue(res['ChargeDetails']['PartyType']);
        this.PartyName.setValue(res['ChargeDetails']['PartyName']);
        this.ChargeBasis.setValue(res['ChargeDetails']['ChargeBasis']);
        this.Currency.setValue(res['ChargeDetails']['Currency']);
        this.ChargeAmt.setValue(res['ChargeDetails']['ChargeAmt']);
        this.PeriodicCharge.setValue(res['ChargeDetails']['PeriodicCharge']);
        this.PeriodicStDt.setValue(res['ChargeDetails']['PeriodicStDt']);
        this.PeriodicEnDt.setValue(res['ChargeDetails']['PeriodicEnDt']);
        this.Frequency.setValue(res['ChargeDetails']['Frequency']);
        this.ChargeCollection.setValue(res['ChargeDetails']['ChargeCollection']);
        this.RateOnCharge.setValue(res['ChargeDetails']['RateOnCharge']);
        this.EffectiveAmount.setValue(res['ChargeDetails']['EffectiveAmount']);
        this.LocalAmount.setValue(res['ChargeDetails']['LocalAmount']);
        this.AD_HIDE_ID.setValue(res['ChargeDetails']['ChargeDtlSeq']);
        this.Handler.hideShowFieldBasedOnChargeBasis();
        this.Handler.hideFieldBasedOnPeriodicCharge();
        this.revalidateBasicField('Currency', true)

        if (this.readOnly) {
          this.setReadOnly(this.readOnly);
        }
      },
      async (httpError) => {
        const err = httpError['error'];
        if (err != null && err['ErrorElementPath'] !== undefined && err['ErrorDescription'] !== undefined) {
        }
        this.services.alert.showAlert(2, 'rlo.error.load.address', -1);
        this.hideSpinner();


      }
    );
  }
  getLoanFieldValue() {
    this.LoanAmount = this.parentData.LoanAmountRequested
    this.NetInterestRate = this.parentData.NetInterestRate
    this.ApplicationId = this.parentData.ApplicationId
    this.InterestRate = this.parentData.InterestRate
  }

  PartyType_change(fieldName, event) {

    let filterKey = this.PartyType.getFieldValue();
    //  console.log("shweta :: slected filterkey", filterKey);
    this.PartyName.onReset();
    this.setFilterbyOptions(filterKey);
  }

  setFilterbyOptions(filterKey) {
    let tempCustomerList = this.services.rloCommonData.getCustomerList();
    this.FilterOptions = [];
    // this.PartyName.onReset();
    this.FilterOptions.push({ id: undefined, text: "" });

    tempCustomerList.forEach(element => {
      if (element.CustomerType == filterKey) {
        this.FilterOptions.push({ id: element.BorrowerSeq, text: element.FullName });
      }
    });
    // console.log("shweta :: score options list", this.FilterOptions);
    this.PartyName.setStaticListOptions(this.FilterOptions);
  }

  fieldDependencies = {
    ChargeBasis: {
      inDep: [

        { paramKey: "VALUE1", depFieldID: "ChargeBasis", paramType: "PathParam" },
        { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
        { paramKey: "KEY1", depFieldID: "hideChargeBasis", paramType: "QueryParam" },
      ],
      outDep: [
      ]
    },
    Currency: {
      inDep: [

        { paramKey: "CurrencySrc", depFieldID: "Currency", paramType: "PathParam" },
        { paramKey: "CurrencyDest", depFieldID: "hideCurrencyDesc", paramType: "QueryParam" },
      ],
      outDep: [

        { paramKey: "MstCurrencyDetails.ExchangeRate", depFieldID: "hidExchangeRate" },
      ]
    },
    ChargeType: {
      inDep: [

        { paramKey: "VALUE1", depFieldID: "ChargeType", paramType: "PathParam" },
        { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
        { paramKey: "KEY1", depFieldID: "hideChargeType", paramType: "QueryParam" },
      ],
      outDep: [
      ]
    },
    PartyType: {
      inDep: [

        { paramKey: "VALUE1", depFieldID: "PartyType", paramType: "PathParam" },
        { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
        { paramKey: "KEY1", depFieldID: "hidePartyType", paramType: "QueryParam" },
      ],
      outDep: [
      ]
    },
    Frequency: {
      inDep: [

        { paramKey: "VALUE1", depFieldID: "Frequency", paramType: "PathParam" },
        { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
        { paramKey: "KEY1", depFieldID: "hideFrequency", paramType: "QueryParam" },
      ],
      outDep: [
      ]
    },
    RateOnCharge: {
      inDep: [

        { paramKey: "VALUE1", depFieldID: "RateOnCharge", paramType: "PathParam" },
        { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
        { paramKey: "KEY1", depFieldID: "hideRateChargeOn", paramType: "QueryParam" },
      ],
      outDep: [
      ]
    },
    ChargeCollection: {
      inDep: [

        { paramKey: "VALUE1", depFieldID: "ChargeCollection", paramType: "PathParam" },
        { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
        { paramKey: "KEY1", depFieldID: "hideChargeCollection", paramType: "QueryParam" },
      ],
      outDep: [
      ]
    },
    PeriodicCharge: {
      inDep: [

        { paramKey: "VALUE1", depFieldID: "PeriodicCharge", paramType: "PathParam" },
        { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
        { paramKey: "KEY1", depFieldID: "hidePeriodicCharge", paramType: "QueryParam" },
      ],
      outDep: [
      ]
    },

    ChargeDescription: {
      inDep: [

        { paramKey: "VALUE1", depFieldID: "ChargeDescription", paramType: "PathParam" },
        { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
        { paramKey: "KEY1", depFieldID: "hideChargeDescription", paramType: "QueryParam" },
      ],
      outDep: [
      ]
    },
    // PartyName: {
    //   inDep: [

    //     { paramKey: "VALUE1", depFieldID: "PartyName", paramType: "PathParam" },
    //     { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
    //     { paramKey: "KEY1", depFieldID: "hidePartyName", paramType: "QueryParam" },
    //   ],
    //   outDep: [
    //   ]
    // }

  }

}
