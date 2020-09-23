import { Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import { PropertyDetailsModel } from './PropertyDetails.model';
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
import { PropertyHandlerComponent } from './property-handler.component';
import { RloUiCurrencyComponent } from '../rlo-ui-currency/rlo-ui-currency.component';

const customCss: string = '';

@Component({
  selector: 'app-PropertyDetails',
  templateUrl: './PropertyDetails.component.html'
})
export class PropertyDetailsComponent extends FormComponent implements OnInit, AfterViewInit {
  @Input() ApplicationId: string = undefined;


  @ViewChild('PurchaseType', { static: false }) PurchaseType: ComboBoxComponent;
  @ViewChild('PropertyType', { static: false }) PropertyType: ComboBoxComponent;
  @ViewChild('BuilderName', { static: false }) BuilderName: ComboBoxComponent;
  @ViewChild('ProjectName', { static: false }) ProjectName: TextBoxComponent;
  @ViewChild('BuildingName', { static: false }) BuildingName: TextBoxComponent;
  @ViewChild('WingName', { static: false }) WingName: TextBoxComponent;
  @ViewChild('BuiltUpAreaSqFt', { static: false }) BuiltUpAreaSqFt: TextBoxComponent;
  @ViewChild('PlotAreaSqFt', { static: false }) PlotAreaSqFt: TextBoxComponent;
  @ViewChild('PlinthAreaSqFt', { static: false }) PlinthAreaSqFt: TextBoxComponent;
  @ViewChild('PlotFlatNo', { static: false }) PlotFlatNo: TextBoxComponent;
  @ViewChild('BlockNo', { static: false }) BlockNo: TextBoxComponent;
  @ViewChild('Architect', { static: false }) Architect: TextBoxComponent;
  @ViewChild('Contractor', { static: false }) Contractor: TextBoxComponent;
  @ViewChild('PerOfProjectCompletion', { static: false }) PerOfProjectCompletion: TextBoxComponent;
  @ViewChild('ExpDateOfCompletion', { static: false }) ExpDateOfCompletion: DateComponent;
  @ViewChild('PropoertyPurchaseNameOf', { static: false }) PropoertyPurchaseNameOf: TextBoxComponent;
  //@ViewChild('CostOfProperty', { static: false }) CostOfProperty: AmountComponent;
  //@ViewChild('PropertyInsuranceCost', { static: false }) PropertyInsuranceCost: AmountComponent;
  @ViewChild('SelectToCapitalizeProperty', { static: false }) SelectToCapitalizeProperty: CheckBoxComponent;
  //@ViewChild('PersonalInsuranceCost', { static: false }) PersonalInsuranceCost: AmountComponent;
  @ViewChild('SelectToCapitalizePersonal', { static: false }) SelectToCapitalizePersonal: CheckBoxComponent;
  @ViewChild('Address1', { static: false }) Address1: TextBoxComponent;
  @ViewChild('Address2', { static: false }) Address2: TextBoxComponent;
  @ViewChild('Address3', { static: false }) Address3: TextBoxComponent;
  @ViewChild('Pincode', { static: false }) Pincode: TextBoxComponent;
  @ViewChild('Region', { static: false }) Region: TextBoxComponent;
  @ViewChild('City', { static: false }) City: TextBoxComponent;
  @ViewChild('State', { static: false }) State: TextBoxComponent;
  // @ViewChild('Country', { static: false }) Country: ComboBoxComponent;
  @ViewChild('Landmark', { static: false }) Landmark: TextBoxComponent;
  @ViewChild('SellerType', { static: false }) SellerType: ComboBoxComponent;
  @ViewChild('NameOfSeller', { static: false }) NameOfSeller: TextBoxComponent;
  @ViewChild('NameOfRegisteredOwner', { static: false }) NameOfRegisteredOwner: TextBoxComponent;
  @ViewChild('SellerAddress1', { static: false }) SellerAddress1: TextBoxComponent;
  @ViewChild('SellerAddress2', { static: false }) SellerAddress2: TextBoxComponent;
  @ViewChild('SellerAddress3', { static: false }) SellerAddress3: TextBoxComponent;
  @ViewChild('SellerPincode', { static: false }) SellerPincode: TextBoxComponent;
  @ViewChild('SellerRegion', { static: false }) SellerRegion: TextBoxComponent;
  @ViewChild('SellerCity', { static: false }) SellerCity: TextBoxComponent;
  @ViewChild('SellerState', { static: false }) SellerState: TextBoxComponent;
  @ViewChild('SellerMobileNo', { static: false }) SellerMobileNo: TextBoxComponent;
  //@ViewChild('DownPaymentAmount', { static: false }) DownPaymentAmount: AmountComponent;
  @ViewChild('DownPayment', { static: false }) DownPayment: TextBoxComponent;
  //@ViewChild('AmountToBeFinanced', { static: false }) AmountToBeFinanced: AmountComponent;
  @ViewChild('MoratoriumPeriod', { static: false }) MoratoriumPeriod: ComboBoxComponent;
  @ViewChild('MoratoriamPeriodCheck', { static: false }) MoratoriamPeriodCheck: CheckBoxComponent;
  @ViewChild('PD_Save', { static: false }) PD_Save: ButtonComponent;
  @ViewChild('PD_Clear', { static: false }) PD_Clear: ButtonComponent;
  @ViewChild('hidePropertyType', { static: false }) hidePropertyType: HiddenComponent;
  @ViewChild('hidAppId', { static: false }) hidAppId: HiddenComponent;
  @ViewChild('hidePurchaseType', { static: false }) hidePurchaseType: HiddenComponent;
  @ViewChild('hideSellerType', { static: false }) hideSellerType: HiddenComponent;
  @ViewChild('hideMoratoriumPeriod', { static: false }) hideMoratoriumPeriod: HiddenComponent;
  @ViewChild('HidePropertySeq', { static: false }) HidePropertySeq: HiddenComponent;
  @ViewChild('hideBuilderName', { static: false }) hideBuilderName: HiddenComponent;
  // @ViewChild('hidCountryCode', { static: false }) hidCountryCode: HiddenComponent;
  @ViewChild('Handler', { static: false }) Handler: PropertyHandlerComponent;

  //custom
  @ViewChild('CostOfProperty', { static: false }) CostOfProperty: RloUiCurrencyComponent;
  @ViewChild('PropertyInsuranceCost', { static: false }) PropertyInsuranceCost: RloUiCurrencyComponent;
  @ViewChild('PersonalInsuranceCost', { static: false }) PersonalInsuranceCost: RloUiCurrencyComponent;
  @ViewChild('AmountToBeFinanced', { static: false }) AmountToBeFinanced: RloUiCurrencyComponent;
  @ViewChild('DownPaymentAmount', { static: false }) DownPaymentAmount: RloUiCurrencyComponent;

  clearFieldsFlag = false;
  
  async revalidate(): Promise<number> {
    var totalErrors = 0;
    super.beforeRevalidate();
    await Promise.all([
      this.revalidateBasicField('PurchaseType'),
      this.revalidateBasicField('PropertyType'),
      this.revalidateBasicField('BuilderName'),
      this.revalidateBasicField('ProjectName'),
      this.revalidateBasicField('BuildingName'),
      this.revalidateBasicField('WingName'),
      this.revalidateBasicField('BuiltUpAreaSqFt'),
      this.revalidateBasicField('PlotAreaSqFt'),
      this.revalidateBasicField('PlinthAreaSqFt'),
      this.revalidateBasicField('PlotFlatNo'),
      this.revalidateBasicField('BlockNo'),
      this.revalidateBasicField('Architect'),
      this.revalidateBasicField('Contractor'),
      this.revalidateBasicField('PerOfProjectCompletion'),
      this.revalidateBasicField('ExpDateOfCompletion'),
      this.revalidateBasicField('PropoertyPurchaseNameOf'),
      this.revalidateBasicField('CostOfProperty'),
      this.revalidateBasicField('PropertyInsuranceCost'),
      this.revalidateBasicField('SelectToCapitalizeProperty'),
      this.revalidateBasicField('PersonalInsuranceCost'),
      this.revalidateBasicField('SelectToCapitalizePersonal'),
      this.revalidateBasicField('Address1'),
      this.revalidateBasicField('Address2'),
      this.revalidateBasicField('Address3'),
      this.revalidateBasicField('Pincode'),
      this.revalidateBasicField('Region'),
      this.revalidateBasicField('City'),
      this.revalidateBasicField('State'),
      // this.revalidateBasicField('Country'),
      this.revalidateBasicField('Landmark'),
      this.revalidateBasicField('SellerType'),
      this.revalidateBasicField('NameOfSeller'),
      this.revalidateBasicField('NameOfRegisteredOwner'),
      this.revalidateBasicField('SellerAddress1'),
      this.revalidateBasicField('SellerAddress2'),
      this.revalidateBasicField('SellerAddress3'),
      this.revalidateBasicField('SellerPincode'),
      this.revalidateBasicField('SellerRegion'),
      this.revalidateBasicField('SellerCity'),
      this.revalidateBasicField('SellerState'),
      this.revalidateBasicField('SellerMobileNo'),
      this.revalidateBasicField('DownPaymentAmount'),
      this.revalidateBasicField('DownPayment'),
      this.revalidateBasicField('AmountToBeFinanced'),
      this.revalidateBasicField('MoratoriumPeriod'),
      this.revalidateBasicField('MoratoriamPeriodCheck'),
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
    this.value = new PropertyDetailsModel();
    this.componentCode = 'PropertyDetails';
  }
  setReadOnly(readOnly) {
    super.setBasicFieldsReadOnly(readOnly);

  }
  async onFormLoad() {

    let ApplicationId: any = this.services.dataStore.getRouteParam(this.services.routing.currModal, 'ApplicationId');
    this.setInputs(this.services.dataStore.getData(this.services.routing.currModal));
    //this.CostOfProperty.setFormatOptions({ currencyCode: 'INR', languageCode: 'en-US', });
    //this.PropertyInsuranceCost.setFormatOptions({ currencyCode: 'INR', languageCode: 'en-US', });
    //this.PersonalInsuranceCost.setFormatOptions({ currencyCode: 'INR', languageCode: 'en-US', });
    //this.DownPaymentAmount.setFormatOptions({ currencyCode: 'INR', languageCode: 'en-US', });
    //this.AmountToBeFinanced.setFormatOptions({ currencyCode: 'INR', languageCode: 'en-US', });
    this.hidAppId.setValue('RLO');
    this.hidePropertyType.setValue('PROPERTY_TYPE');
    this.hidePurchaseType.setValue('PURCHASE_TYPE');
    this.hideSellerType.setValue('SELLER_TYPE');
    this.hideMoratoriumPeriod.setValue('MORATORIUM_PERIOD');
    this.hideBuilderName.setValue('BUIDER_NAME');
    // this.hidCountryCode.setValue('ISD_COUNTRY_CODE');
    if (!this.clearFieldsFlag) { this.OnLoanFormLoad(); }
    this.setDependencies();
    await this.Handler.onFormLoad({});
    this.AmountToBeFinanced.setReadOnly(true);
  }

  isPastDate(selectedDate) {
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

  isTodaysDate(selectedDate) {
    const moment = require('moment');
    const currentDate = moment();
    currentDate.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
    selectedDate = moment(selectedDate, 'DD-MM-YYYY');
    if (moment(currentDate).isSame(selectedDate)) {
      return true;
    }
    return false;
  }





  async Pincode_blur(event) {
    let inputMap = new Map();
    inputMap.set('PathParam.PinCd', event.value)
    this.services.http.fetchApi('/MasterPincodeDtls/{PinCd}', 'GET', inputMap, '/masters').subscribe(
      async (httpResponse: HttpResponse<any>) => {
        var res = httpResponse.body;
        console.log("res", res);
        this.Region.setValue(res['MasterPincodeDtls']['UDF1'])
        this.State.setValue(res['MasterPincodeDtls']['StateCd']['StateName'])
        this.City.setValue(res['MasterPincodeDtls']['CityCd']['CityName'])

      },
    );
  }

  async SellerPincode_blur(event) {
    let inputMap = new Map();
    inputMap.set('PathParam.PinCd', event.value)
    this.services.http.fetchApi('/MasterPincodeDtls/{PinCd}', 'GET', inputMap, '/masters').subscribe(
      async (httpResponse: HttpResponse<any>) => {
        var res = httpResponse.body;
        console.log("res", res);
        this.SellerRegion.setValue(res['MasterPincodeDtls']['UDF1'])
        this.SellerState.setValue(res['MasterPincodeDtls']['StateCd']['StateName'])
        this.SellerCity.setValue(res['MasterPincodeDtls']['CityCd']['CityName'])

      },
    );
  }

  setInputs(param: any) {
    let params = this.services.http.mapToJson(param);
    if (params['mode']) {
      this.mode = params['mode'];
    }
  }
  async submitForm(path, apiCode, serviceCode) {
    this.submitData['formName'] = 'Property Details';
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
    this.value = new PropertyDetailsModel();
    this.value.setValue(inputValue);
    this.setDependencies();
    this.passNewValue(this.value);
  }
  ngOnInit() {
    if (this.formCode == undefined) { this.formCode = 'PropertyDetails'; }
    if (this.formOnLoadError) { return; }
    var styleElement = document.createElement('style');
    styleElement.type = 'text/css';
    styleElement.innerHTML = customCss;
    styleElement.id = 'PropertyDetails_customCss';
    document.getElementsByTagName('head')[0].appendChild(styleElement);
  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    var styleElement = document.getElementById('PropertyDetails_customCss');
    styleElement.parentNode.removeChild(styleElement);
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.subsBFldsValueUpdates();
      this.onFormLoad();
      this.checkForHTabOverFlow();
    });

    //UW
    if (this.readOnly) {
      this.setReadOnly(this.readOnly);
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
    this.value = new PropertyDetailsModel();
    this.passNewValue(this.value);
    this.setReadOnly(false);
    this.onFormLoad();

    //custom
    this.CostOfProperty.resetFieldAndDropDown();
    this.PropertyInsuranceCost.resetFieldAndDropDown();
    this.PersonalInsuranceCost.resetFieldAndDropDown();
    this.DownPaymentAmount.resetFieldAndDropDown();
    this.AmountToBeFinanced.resetFieldAndDropDown();
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

    this.services.http.fetchApi('/PropertyDetails', 'GET', inputMap, '/rlo-de').subscribe(
      async (httpResponse: HttpResponse<any>) => {
        var res = httpResponse.body;
        if (res != null && res != undefined && res['PropertyDetails'] != undefined) {
          var PropertyArray = res['PropertyDetails'];
          PropertyArray.forEach(async PropertyElement => {
            this.PropertyType.setValue(PropertyElement['PropertyType']);
            this.PurchaseType.setValue(PropertyElement['PurchaseType']);
            this.BuilderName.setValue(PropertyElement['BuilderId']);
            this.ProjectName.setValue(PropertyElement['ProjectName']);
            this.BuildingName.setValue(PropertyElement['BuildingName']);
            this.WingName.setValue(PropertyElement['WingName']);
            this.BuiltUpAreaSqFt.setValue(PropertyElement['BuiltUpArea']);
            this.PlotAreaSqFt.setValue(PropertyElement['PlotArea']);
            this.PlinthAreaSqFt.setValue(PropertyElement['PlinthArea']);
            this.PlotFlatNo.setValue(PropertyElement['FlatNo']);
            this.BlockNo.setValue(PropertyElement['BlockNo']);
            this.Architect.setValue(PropertyElement['ArchitectName']);
            this.Contractor.setValue(PropertyElement['ContractorName']);
            this.PerOfProjectCompletion.setValue(PropertyElement['CompletionPercent']);
            this.ExpDateOfCompletion.setValue(PropertyElement['CompletionDate']);
            this.PropoertyPurchaseNameOf.setValue(PropertyElement['NewLegalOwner']);
            //this.CostOfProperty.setValue(PropertyElement['PropertyCost']);
            //this.PropertyInsuranceCost.setValue(PropertyElement['PropertyInsuranceCost']);
            this.SelectToCapitalizeProperty.setValue(PropertyElement['PropertyInsuranceAdjFlag']);
            //this.PersonalInsuranceCost.setValue(PropertyElement['PersonInsuranceCost']);
            this.SelectToCapitalizePersonal.setValue(PropertyElement['PersonInsuranceAdjFlag']);
            this.SellerType.setValue(PropertyElement['SellerType']);
            this.NameOfSeller.setValue(PropertyElement['SellerName']);
            this.NameOfRegisteredOwner.setValue(PropertyElement['CurrentOwnerName']);
            //this.DownPaymentAmount.setValue(PropertyElement['DownPayAmount']);
            this.DownPayment.setValue(PropertyElement['DownPayPercent']);
            this.AmountToBeFinanced.setValue(PropertyElement['TotalFinanceAmount']);
            this.MoratoriumPeriod.setValue(PropertyElement['MoratoriumPeriod']);
            this.Address1.setValue(PropertyElement['PRAddressLine1']);
            this.Address2.setValue(PropertyElement['PRAddressLine2']);
            this.Address3.setValue(PropertyElement['PRAddressLine3']);
            this.SellerAddress1.setValue(PropertyElement['SLAddressLine1']);
            this.SellerAddress2.setValue(PropertyElement['SLAddressLine2']);
            this.SellerAddress3.setValue(PropertyElement['SLAddressLine3']);
            this.City.setValue(PropertyElement['PRCity']);
            this.Pincode.setValue(PropertyElement['PRPincode']);
            this.Region.setValue(PropertyElement['PRRegion']);
            this.State.setValue(PropertyElement['PRState']);
            this.Landmark.setValue(PropertyElement['PRLandmark']);
            // this.Country.setValue(PropertyElement['PRCountry']);
            this.SellerPincode.setValue(PropertyElement['SLPincode']);
            this.SellerCity.setValue(PropertyElement['SLCity']);
            this.SellerRegion.setValue(PropertyElement['SLRegion']);
            this.SellerState.setValue(PropertyElement['SLState']);
            this.SellerMobileNo.setValue(PropertyElement['SLMobileNo']);
            this.HidePropertySeq.setValue(PropertyElement['PropertySeq']);
            // let disburalRecords=PropertyElement['DisbursalRecords'];
            // if(disburalRecords){
            // }

            //custom
            this.CostOfProperty.setComponentSpecificValue(PropertyElement['PropertyCost'], null);
            this.PropertyInsuranceCost.setComponentSpecificValue(PropertyElement['PropertyInsuranceCost'], null);
            this.PersonalInsuranceCost.setComponentSpecificValue(PropertyElement['PersonInsuranceCost'], null);
            this.AmountToBeFinanced.setComponentSpecificValue(PropertyElement['TotalFinanceAmount'], null);
            this.DownPaymentAmount.setComponentSpecificValue(PropertyElement['DownPayAmount'], null);
          });

          this.revalidate().then((errors) => {
            if (!errors) {
              let array = [];
              array.push({ isValid: true, sectionData: this.getFieldValue() });
              let obj = {
                "name": "PropertyDetails",
                "data": array,
                "sectionName": "PropertyDetails"
              }
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

  async PD_Save_click(event) {
    let inputMap = new Map();
    //note: add field value validation incase calculation going to be checked before olive revalidate call

    var noOfError: number = await this.revalidate();
    if (noOfError == 0) {
      const expectedTotAmtToBeDisbursed: number = parseFloat(this.CostOfProperty.getFieldValue()) - parseFloat(this.DownPaymentAmount.getFieldValue());

      if (this.HidePropertySeq.getFieldValue() != undefined) {
        inputMap.clear();
        inputMap.set('PathParam.PropertySeq', this.HidePropertySeq.getFieldValue());
        inputMap.set('Body.PropertyDetails.PurchaseType', this.PurchaseType.getFieldValue());
        inputMap.set('Body.PropertyDetails.PropertyType', this.PropertyType.getFieldValue());
        inputMap.set('Body.PropertyDetails.BuilderId', this.BuilderName.getFieldValue());
        inputMap.set('Body.PropertyDetails.ProjectName', this.ProjectName.getFieldValue());
        inputMap.set('Body.PropertyDetails.BuildingName', this.BuildingName.getFieldValue());
        inputMap.set('Body.PropertyDetails.WingName', this.WingName.getFieldValue());
        inputMap.set('Body.PropertyDetails.BuiltUpArea', this.BuiltUpAreaSqFt.getFieldValue());
        inputMap.set('Body.PropertyDetails.PlotArea', this.PlotAreaSqFt.getFieldValue());
        inputMap.set('Body.PropertyDetails.PlinthArea', this.PlinthAreaSqFt.getFieldValue());
        inputMap.set('Body.PropertyDetails.FlatNo', this.PlotFlatNo.getFieldValue());
        inputMap.set('Body.PropertyDetails.BlockNo', this.BlockNo.getFieldValue());
        inputMap.set('Body.PropertyDetails.ArchitectName', this.Architect.getFieldValue());
        inputMap.set('Body.PropertyDetails.ContractorName', this.Contractor.getFieldValue());
        inputMap.set('Body.PropertyDetails.CompletionPercent', this.PerOfProjectCompletion.getFieldValue());
        inputMap.set('Body.PropertyDetails.CompletionDate', this.ExpDateOfCompletion.getFieldValue());
        inputMap.set('Body.PropertyDetails.NewLegalOwner', this.PropoertyPurchaseNameOf.getFieldValue());
        inputMap.set('Body.PropertyDetails.PropertyCost', this.CostOfProperty.getFieldValue());
        inputMap.set('Body.PropertyDetails.PropertyInsuranceCost', this.PropertyInsuranceCost.getFieldValue());
        inputMap.set('Body.PropertyDetails.PropertyInsuranceAdjFlag', this.SelectToCapitalizeProperty.getFieldValue());
        inputMap.set('Body.PropertyDetails.PersonInsuranceCost', this.PersonalInsuranceCost.getFieldValue());
        inputMap.set('Body.PropertyDetails.PersonInsuranceAdjFlag', this.SelectToCapitalizePersonal.getFieldValue());
        inputMap.set('Body.PropertyDetails.PRAddressLine1', this.Address1.getFieldValue());
        inputMap.set('Body.PropertyDetails.PRAddressLine2', this.Address2.getFieldValue());
        inputMap.set('Body.PropertyDetails.PRAddressLine3', this.Address3.getFieldValue());
        inputMap.set('Body.PropertyDetails.PRPincode', this.Pincode.getFieldValue());
        inputMap.set('Body.PropertyDetails.PRRegion', this.Region.getFieldValue());
        inputMap.set('Body.PropertyDetails.PRCity', this.City.getFieldValue());
        inputMap.set('Body.PropertyDetails.PRState', this.State.getFieldValue());
        inputMap.set('Body.PropertyDetails.PRLandmark', this.Landmark.getFieldValue());
        // inputMap.set('Body.PropertyDetails.PRCountry', this.Country.getFieldValue());
        inputMap.set('Body.PropertyDetails.SellerType', this.SellerType.getFieldValue());
        inputMap.set('Body.PropertyDetails.SellerName', this.NameOfSeller.getFieldValue());
        inputMap.set('Body.PropertyDetails.CurrentOwnerName', this.NameOfRegisteredOwner.getFieldValue());
        inputMap.set('Body.PropertyDetails.SLAddressLine1', this.SellerAddress1.getFieldValue());
        inputMap.set('Body.PropertyDetails.SLAddressLine2', this.SellerAddress2.getFieldValue());
        inputMap.set('Body.PropertyDetails.SLAddressLine3', this.SellerAddress3.getFieldValue());
        inputMap.set('Body.PropertyDetails.SLPincode', this.SellerPincode.getFieldValue());
        inputMap.set('Body.PropertyDetails.SLRegion', this.SellerRegion.getFieldValue());
        inputMap.set('Body.PropertyDetails.SLCity', this.SellerCity.getFieldValue());
        inputMap.set('Body.PropertyDetails.SLState', this.SellerState.getFieldValue());
        inputMap.set('Body.PropertyDetails.SLMobileNo', this.SellerMobileNo.getFieldValue());
        inputMap.set('Body.PropertyDetails.DownPayAmount', this.DownPaymentAmount.getFieldValue());
        inputMap.set('Body.PropertyDetails.DownPayPercent', this.DownPayment.getFieldValue());
        inputMap.set('Body.PropertyDetails.TotalFinanceAmount', this.AmountToBeFinanced.getFieldValue());
        inputMap.set('Body.PropertyDetails.MoratoriumPeriod', this.MoratoriumPeriod.getFieldValue());
        inputMap.set('Body.PropertyDetails.ApplicationId', this.ApplicationId);

        this.services.http.fetchApi('/PropertyDetails/{PropertySeq}', 'PUT', inputMap, '/rlo-de').subscribe(
          async (httpResponse: HttpResponse<any>) => {
            var res = httpResponse.body;
            this.services.alert.showAlert(1, 'rlo.success.update.property', 5000);
          },
          async (httpError) => {
            var err = httpError['error']
            if (err != null && err['ErrorElementPath'] != undefined && err['ErrorDescription'] != undefined) {
              if (err['ErrorElementPath'] == 'PropertyDetails.MoratoriumPeriod') {
                this.MoratoriumPeriod.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'PropertyDetails.TotalFinanceAmount') {
                this.AmountToBeFinanced.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'PropertyDetails.DownPayPercent') {
                this.DownPayment.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'PropertyDetails.DownPayAmount') {
                this.DownPaymentAmount.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'PropertyDetails.CurrentOwnerName') {
                this.NameOfRegisteredOwner.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'PropertyDetails.SellerName') {
                this.NameOfSeller.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'PropertyDetails.SellerType') {
                this.SellerType.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'PropertyDetails.PRLandmark') {
                this.Landmark.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'PropertyDetails.PRState') {
                this.State.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'PropertyDetails.PRCity') {
                this.City.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'PropertyDetails.PRRegion') {
                this.Region.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'PropertyDetails.PRPinCode') {
                this.Pincode.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'PropertyDetails.PRAddressLine3') {
                this.Address3.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'PropertyDetails.PRAddressLine2') {
                this.Address2.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'PropertyDetails.PRAddressLine1') {
                this.Address1.setError(err['ErrorDescription']);
              }
              // else if (err['ErrorElementPath'] == 'PropertyDetails.PRCountry') {
              //   this.Country.setError(err['ErrorDescription']);
              // }
              else if (err['ErrorElementPath'] == 'PropertyDetails.SLMobileNo') {
                this.SellerMobileNo.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'PropertyDetails.SLState') {
                this.SellerState.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'PropertyDetails.SLCity') {
                this.SellerCity.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'PropertyDetails.SLRegion') {
                this.SellerRegion.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'PropertyDetails.SLPinCode') {
                this.SellerPincode.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'PropertyDetails.SLAddressLine3') {
                this.SellerAddress3.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'PropertyDetails.SLAddressLine2') {
                this.SellerAddress2.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'PropertyDetails.SLAddressLine1') {
                this.SellerAddress1.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'PropertyDetails.PersonInsuranceAdjFlag') {
                this.SelectToCapitalizePersonal.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'PropertyDetails.PersonInsuranceCost') {
                this.PersonalInsuranceCost.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'PropertyDetails.PropertyInsuranceAdjFlag') {
                this.SelectToCapitalizeProperty.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'PropertyDetails.PropertyInsuranceCost') {
                this.PropertyInsuranceCost.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'PropertyDetails.PropertyCost') {
                this.CostOfProperty.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'PropertyDetails.NewLegalOwner') {
                this.PropoertyPurchaseNameOf.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'PropertyDetails.CompletionDate') {
                this.ExpDateOfCompletion.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'PropertyDetails.CompletionPercent') {
                this.PerOfProjectCompletion.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'PropertyDetails.ContractorName') {
                this.Contractor.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'PropertyDetails.ArchitectName') {
                this.Architect.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'PropertyDetails.BlockNo') {
                this.BlockNo.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'PropertyDetails.FlatNo') {
                this.PlotFlatNo.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'PropertyDetails.PlinthArea') {
                this.PlinthAreaSqFt.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'PropertyDetails.PlotArea') {
                this.PlotAreaSqFt.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'PropertyDetails.BuiltUpArea') {
                this.BuiltUpAreaSqFt.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'PropertyDetails.WingName') {
                this.WingName.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'PropertyDetails.BuildingName') {
                this.BuildingName.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'PropertyDetails.ProjectName') {
                this.ProjectName.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'PropertyDetails.BuilderId') {
                this.BuilderName.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'PropertyDetails.PropertyType') {
                this.PropertyType.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'PropertyDetails.PurchaseType') {
                this.PurchaseType.setError(err['ErrorDescription']);
              }
            }
            this.services.alert.showAlert(2, 'rlo.fail.update.property', -1);
          }
        );
      } else {
        inputMap.clear();
        //   inputMap.set('PathParam.PropertySeq', this.HidePropertySeq.getFieldValue());
        inputMap.set('Body.PropertyDetails.PurchaseType', this.PurchaseType.getFieldValue());
        inputMap.set('Body.PropertyDetails.PropertyType', this.PropertyType.getFieldValue());
        inputMap.set('Body.PropertyDetails.BuilderId', this.BuilderName.getFieldValue());
        inputMap.set('Body.PropertyDetails.ProjectName', this.ProjectName.getFieldValue());
        inputMap.set('Body.PropertyDetails.BuildingName', this.BuildingName.getFieldValue());
        inputMap.set('Body.PropertyDetails.WingName', this.WingName.getFieldValue());
        inputMap.set('Body.PropertyDetails.BuiltUpArea', this.BuiltUpAreaSqFt.getFieldValue());
        inputMap.set('Body.PropertyDetails.PlotArea', this.PlotAreaSqFt.getFieldValue());
        inputMap.set('Body.PropertyDetails.PlinthArea', this.PlinthAreaSqFt.getFieldValue());
        inputMap.set('Body.PropertyDetails.FlatNo', this.PlotFlatNo.getFieldValue());
        inputMap.set('Body.PropertyDetails.BlockNo', this.BlockNo.getFieldValue());
        inputMap.set('Body.PropertyDetails.ArchitectName', this.Architect.getFieldValue());
        inputMap.set('Body.PropertyDetails.ContractorName', this.Contractor.getFieldValue());
        inputMap.set('Body.PropertyDetails.CompletionDate', this.PerOfProjectCompletion.getFieldValue());
        inputMap.set('Body.PropertyDetails.CompletionDate', this.ExpDateOfCompletion.getFieldValue());
        inputMap.set('Body.PropertyDetails.NewLegalOwner', this.PropoertyPurchaseNameOf.getFieldValue());
        inputMap.set('Body.PropertyDetails.PropertyCost', this.CostOfProperty.getFieldValue());
        inputMap.set('Body.PropertyDetails.PropertyInsuranceCost', this.PropertyInsuranceCost.getFieldValue());
        inputMap.set('Body.PropertyDetails.PropertyInsuranceAdjFlag', this.SelectToCapitalizeProperty.getFieldValue());
        inputMap.set('Body.PropertyDetails.PersonInsuranceCost', this.PersonalInsuranceCost.getFieldValue());
        inputMap.set('Body.PropertyDetails.PersonInsuranceAdjFlag', this.SelectToCapitalizePersonal.getFieldValue());
        inputMap.set('Body.PropertyDetails.PRAddressLine1', this.Address1.getFieldValue());
        inputMap.set('Body.PropertyDetails.PRAddressLine2', this.Address2.getFieldValue());
        inputMap.set('Body.PropertyDetails.PRAddressLine3', this.Address3.getFieldValue());
        inputMap.set('Body.PropertyDetails.PRPincode', this.Pincode.getFieldValue());
        inputMap.set('Body.PropertyDetails.PRRegion', this.Region.getFieldValue());
        inputMap.set('Body.PropertyDetails.PRCity', this.City.getFieldValue());
        inputMap.set('Body.PropertyDetails.PRState', this.State.getFieldValue());
        inputMap.set('Body.PropertyDetails.PRLandmark', this.Landmark.getFieldValue());
        // inputMap.set('Body.PropertyDetails.PRCountry', this.Country.getFieldValue());
        inputMap.set('Body.PropertyDetails.SellerType', this.SellerType.getFieldValue());
        inputMap.set('Body.PropertyDetails.SellerName', this.NameOfSeller.getFieldValue());
        inputMap.set('Body.PropertyDetails.CurrentOwnerName', this.NameOfRegisteredOwner.getFieldValue());
        inputMap.set('Body.PropertyDetails.SLAddressLine1', this.SellerAddress1.getFieldValue());
        inputMap.set('Body.PropertyDetails.SLAddressLine2', this.SellerAddress2.getFieldValue());
        inputMap.set('Body.PropertyDetails.SLAddressLine3', this.SellerAddress3.getFieldValue());
        inputMap.set('Body.PropertyDetails.SLPincode', this.SellerPincode.getFieldValue());
        inputMap.set('Body.PropertyDetails.SLRegion', this.SellerRegion.getFieldValue());
        inputMap.set('Body.PropertyDetails.SLCity', this.SellerCity.getFieldValue());
        inputMap.set('Body.PropertyDetails.SLState', this.SellerState.getFieldValue());
        inputMap.set('Body.PropertyDetails.SLMobileNo', this.SellerMobileNo.getFieldValue());
        inputMap.set('Body.PropertyDetails.DownPayAmount', this.DownPaymentAmount.getFieldValue());
        inputMap.set('Body.PropertyDetails.DownPayPercent', this.DownPayment.getFieldValue());
        inputMap.set('Body.PropertyDetails.TotalFinanceAmount', this.AmountToBeFinanced.getFieldValue());
        inputMap.set('Body.PropertyDetails.ApplicationId', this.ApplicationId);
        this.services.http.fetchApi('/PropertyDetails', 'POST', inputMap, '/rlo-de').subscribe(
          async (httpResponse: HttpResponse<any>) => {
            var res = httpResponse.body;
            this.services.alert.showAlert(1, 'rlo.success.save.property', 5000);
          },
          async (httpError) => {
            var err = httpError['error']
            if (err != null && err['ErrorElementPath'] != undefined && err['ErrorDescription'] != undefined) {
              if (err['ErrorElementPath'] == 'PropertyDetails.TotalFinanceAmount') {
                this.AmountToBeFinanced.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'PropertyDetails.DownPayPercent') {
                this.DownPayment.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'PropertyDetails.DownPayAmount') {
                this.DownPaymentAmount.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'PropertyDetails.CurrentOwnerName') {
                this.NameOfRegisteredOwner.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'PropertyDetails.SellerName') {
                this.NameOfSeller.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'PropertyDetails.SellerType') {
                this.SellerType.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'PropertyDetails.PRLandmark') {
                this.Landmark.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'PropertyDetails.PRState') {
                this.State.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'PropertyDetails.PRCity') {
                this.City.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'PropertyDetails.PRRegion') {
                this.Region.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'PropertyDetails.PRPinCode') {
                this.Pincode.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'PropertyDetails.PRAddressLine3') {
                this.Address3.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'PropertyDetails.PRAddressLine2') {
                this.Address2.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'PropertyDetails.PRAddressLine1') {
                this.Address1.setError(err['ErrorDescription']);
              }
              // else if (err['ErrorElementPath'] == 'PropertyDetails.PRCountry') {
              //   this.Country.setError(err['ErrorDescription']);
              // }
              else if (err['ErrorElementPath'] == 'PropertyDetails.SLMobileNo') {
                this.SellerMobileNo.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'PropertyDetails.SLState') {
                this.SellerState.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'PropertyDetails.SLCity') {
                this.SellerCity.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'PropertyDetails.SLRegion') {
                this.SellerRegion.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'PropertyDetails.SLPinCode') {
                this.SellerPincode.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'PropertyDetails.SLAddressLine3') {
                this.SellerAddress3.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'PropertyDetails.SLAddressLine2') {
                this.SellerAddress2.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'PropertyDetails.SLAddressLine1') {
                this.SellerAddress1.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'PropertyDetails.PersonInsuranceAdjFlag') {
                this.SelectToCapitalizePersonal.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'PropertyDetails.PersonInsuranceCost') {
                this.PersonalInsuranceCost.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'PropertyDetails.PropertyInsuranceAdjFlag') {
                this.SelectToCapitalizeProperty.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'PropertyDetails.PropertyInsuranceCost') {
                this.PropertyInsuranceCost.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'PropertyDetails.PropertyCost') {
                this.CostOfProperty.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'PropertyDetails.NewLegalOwner') {
                this.PropoertyPurchaseNameOf.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'PropertyDetails.CompletionDate') {
                this.ExpDateOfCompletion.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'PropertyDetails.CompletionDate') {
                this.PerOfProjectCompletion.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'PropertyDetails.ContractorName') {
                this.Contractor.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'PropertyDetails.ArchitectName') {
                this.Architect.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'PropertyDetails.BlockNo') {
                this.BlockNo.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'PropertyDetails.FlatNo') {
                this.PlotFlatNo.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'PropertyDetails.PlinthArea') {
                this.PlinthAreaSqFt.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'PropertyDetails.PlotArea') {
                this.PlotAreaSqFt.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'PropertyDetails.BuiltUpArea') {
                this.BuiltUpAreaSqFt.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'PropertyDetails.WingName') {
                this.WingName.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'PropertyDetails.BuildingName') {
                this.BuildingName.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'PropertyDetails.ProjectName') {
                this.ProjectName.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'PropertyDetails.BuilderId') {
                this.BuilderName.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'PropertyDetails.PropertyType') {
                this.PropertyType.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'PropertyDetails.PurchaseType') {
                this.PurchaseType.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'PropertySeq') {
                this.HidePropertySeq.setError(err['ErrorDescription']);
              }
            }
            this.services.alert.showAlert(2, 'rlo.failed.save.property', -1);

            this.revalidate().then((errors) => {
              if (!errors) {
                let array = [];
                array.push({ isValid: true, sectionData: this.getFieldValue() });
                let obj = {
                  "name": "PropertyDetails",
                  "data": array,
                  "sectionName": "PropertyDetails"
                }
                this.services.rloCommonData.globalComponentLvlDataHandler(obj);
              }
            });

          }
        );
      }

    }
    else {
      this.services.alert.showAlert(2, 'rlo.error.invalid.form', -1);
    }
  }
  Clear_click(event) {
    this.clearFieldsFlag = true;
    this.onReset();
  }

  async SelectToCapitalizeProperty_change(event) {
    this.PropertyInsuranceCost.mandatory = this.SelectToCapitalizeProperty.getFieldValue();
  }

  async SelectToCapitalizePersonal_change(event) {
    this.PersonalInsuranceCost.mandatory = this.SelectToCapitalizePersonal.getFieldValue();
  }



  async ExpDateOfCompletion_blur(event) {
    let inputMap = new Map();
    console.log("shweta :: ", this.ExpDateOfCompletion.getFieldValue());
    if (this.ExpDateOfCompletion.getFieldValue()) {
      if (this.isPastDate(this.ExpDateOfCompletion.getFieldValue())) {
        this.ExpDateOfCompletion.setError('rlo.error.ExpDateOfCompletion.invalid');
        return 1;
      }
    }
  }
  async DownPaymentAmount_blur() {
    let AmtFinanced;
    let PerDownPayment;
    let TotalAmtFinced;

    console.warn("DEEP | DownPaymentAmount_blur");
    console.log("DownPaymentAmount", this.DownPaymentAmount.getFieldValue());
    console.log("CostOfProperty", this.CostOfProperty.getFieldValue());
    console.log("PropertyInsuranceCost", this.PropertyInsuranceCost.getFieldValue());
    console.log("PersonalInsuranceCost", this.PersonalInsuranceCost.getFieldValue());

    if (this.DownPaymentAmount.getFieldValue() != undefined && this.CostOfProperty.getFieldValue() != undefined) {
      PerDownPayment = (Math.round(this.DownPaymentAmount.getFieldValue() / this.CostOfProperty.getFieldValue() * 100))
      this.DownPayment.setValue(PerDownPayment.toFixed(2));
      console.log("new amt", PerDownPayment);
    }
    // console.log("log", this.SelectToCapitalizePersonal.getFieldValue(), this.SelectToCapitalizeProperty.getFieldValue())
    if (this.SelectToCapitalizePersonal.getFieldValue() != false && this.SelectToCapitalizeProperty.getFieldValue() != false) {
      if (this.CostOfProperty.getFieldValue() != undefined && this.DownPaymentAmount.getFieldValue() != undefined && this.PropertyInsuranceCost.getFieldValue() != undefined && this.PersonalInsuranceCost.getFieldValue() != undefined) {
        AmtFinanced = Number(this.CostOfProperty.getFieldValue()) - Number(this.DownPaymentAmount.getFieldValue())
        TotalAmtFinced = AmtFinanced + Number(this.PropertyInsuranceCost.getFieldValue()) + Number(this.PersonalInsuranceCost.getFieldValue());
        console.log("total mt", TotalAmtFinced);
        //this.AmountToBeFinanced.setValue(TotalAmtFinced.toFixed(2));
        this.AmountToBeFinanced.setComponentSpecificValue(TotalAmtFinced.toFixed(2), null);
      }
    }
    else if (this.SelectToCapitalizePersonal.getFieldValue() != false) {
      if (this.CostOfProperty.getFieldValue() != undefined && this.DownPaymentAmount.getFieldValue() != undefined && this.PersonalInsuranceCost.getFieldValue() != undefined) {
        AmtFinanced = Number(this.CostOfProperty.getFieldValue()) - Number(this.DownPaymentAmount.getFieldValue())
        TotalAmtFinced = AmtFinanced + Number(this.PersonalInsuranceCost.getFieldValue());
        console.log("total mt", TotalAmtFinced);
        //this.AmountToBeFinanced.setValue(TotalAmtFinced.toFixed(2));
        this.AmountToBeFinanced.setComponentSpecificValue(TotalAmtFinced.toFixed(2), null);
      }
    }
    else if (this.SelectToCapitalizeProperty.getFieldValue() != false) {
      if (this.CostOfProperty.getFieldValue() != undefined && this.DownPaymentAmount.getFieldValue() != undefined && this.PropertyInsuranceCost.getFieldValue() !== undefined) {
        AmtFinanced = Number(this.CostOfProperty.getFieldValue()) - Number(this.DownPaymentAmount.getFieldValue())
        TotalAmtFinced = AmtFinanced + Number(this.PropertyInsuranceCost.getFieldValue());
        console.log("total mt", TotalAmtFinced);
        //this.AmountToBeFinanced.setValue(TotalAmtFinced.toFixed(2));
        this.AmountToBeFinanced.setComponentSpecificValue(TotalAmtFinced.toFixed(2), null);
      }
    }
    else if (this.SelectToCapitalizePersonal.getFieldValue() == false && this.SelectToCapitalizeProperty.getFieldValue() == false) {
      if (this.CostOfProperty.getFieldValue() != undefined && this.DownPaymentAmount.getFieldValue() != undefined) {
        AmtFinanced = Number(this.CostOfProperty.getFieldValue()) - Number(this.DownPaymentAmount.getFieldValue())
        console.log("total mt", AmtFinanced);
        //this.AmountToBeFinanced.setValue(AmtFinanced.toFixed(2));
        this.AmountToBeFinanced.setComponentSpecificValue(AmtFinanced.toFixed(2), null);
      }
    }
  }

  async DownPayment_blur(event) {
    let DownPaymentCal;
    let AmtFinanced;
    let TotalAmtFinced;

    console.warn("DEEP | DownPayment_blur");
    console.log("DownPaymentAmount", this.DownPaymentAmount.getFieldValue());
    console.log("CostOfProperty", this.CostOfProperty.getFieldValue());
    console.log("PropertyInsuranceCost", this.PropertyInsuranceCost.getFieldValue());
    console.log("PersonalInsuranceCost", this.PersonalInsuranceCost.getFieldValue());

    if (this.CostOfProperty.getFieldValue() != undefined && this.DownPayment.getFieldValue() != undefined) {
      DownPaymentCal = (Math.round(this.DownPayment.getFieldValue() * this.CostOfProperty.getFieldValue() / 100))
      this.DownPaymentAmount.setValue(DownPaymentCal.toFixed(2));
    }
    if (this.SelectToCapitalizePersonal.getFieldValue() != false && this.SelectToCapitalizeProperty.getFieldValue() != false) {
      if (this.CostOfProperty.getFieldValue() != undefined && this.DownPaymentAmount.getFieldValue() != undefined && this.PropertyInsuranceCost.getFieldValue() != undefined && this.PersonalInsuranceCost.getFieldValue() != undefined) {
        AmtFinanced = Number(this.CostOfProperty.getFieldValue()) - Number(this.DownPaymentAmount.getFieldValue())
        TotalAmtFinced = AmtFinanced + Number(this.PropertyInsuranceCost.getFieldValue()) + Number(this.PersonalInsuranceCost.getFieldValue());
        console.log("total mt", TotalAmtFinced);
        //this.AmountToBeFinanced.setValue(TotalAmtFinced.toFixed(2));
        this.AmountToBeFinanced.setComponentSpecificValue(TotalAmtFinced.toFixed(2), null);
      }
    }
    else if (this.SelectToCapitalizePersonal.getFieldValue() != false) {
      if (this.CostOfProperty.getFieldValue() != undefined && this.DownPaymentAmount.getFieldValue() != undefined && this.PersonalInsuranceCost.getFieldValue() != undefined) {
        AmtFinanced = Number(this.CostOfProperty.getFieldValue()) - Number(this.DownPaymentAmount.getFieldValue())
        TotalAmtFinced = AmtFinanced + Number(this.PersonalInsuranceCost.getFieldValue());
        console.log("total mt", TotalAmtFinced);
        //this.AmountToBeFinanced.setValue(TotalAmtFinced.toFixed(2));
        this.AmountToBeFinanced.setComponentSpecificValue(TotalAmtFinced.toFixed(2), null);
      }
    }
    else if (this.SelectToCapitalizeProperty.getFieldValue() != false) {
      if (this.CostOfProperty.getFieldValue() != undefined && this.DownPaymentAmount.getFieldValue() != undefined && this.PropertyInsuranceCost.getFieldValue() !== undefined) {
        AmtFinanced = Number(this.CostOfProperty.getFieldValue()) - Number(this.DownPaymentAmount.getFieldValue())
        TotalAmtFinced = AmtFinanced + Number(this.PropertyInsuranceCost.getFieldValue());
        console.log("total mt", TotalAmtFinced);
        //this.AmountToBeFinanced.setValue(TotalAmtFinced.toFixed(2));
        this.AmountToBeFinanced.setComponentSpecificValue(TotalAmtFinced.toFixed(2), null);
      }
    }
    else if (this.SelectToCapitalizePersonal.getFieldValue() == false && this.SelectToCapitalizeProperty.getFieldValue() == false) {
      if (this.CostOfProperty.getFieldValue() != undefined && this.DownPaymentAmount.getFieldValue() != undefined) {
        AmtFinanced = Number(this.CostOfProperty.getFieldValue()) - Number(this.DownPaymentAmount.getFieldValue())
        console.log("total mt", AmtFinanced);
        //this.AmountToBeFinanced.setValue(AmtFinanced.toFixed(2));
        this.AmountToBeFinanced.setComponentSpecificValue(AmtFinanced.toFixed(2), null);
      }
    }
  }


  async PerOfProjectCompletion_blur(event) {
    // console.log("shweta :: property :: project completion %",this.PerOfProjectCompletion.getFieldValue());
    this.ExpDateOfCompletion.mandatory = (
      this.PerOfProjectCompletion.getFieldValue() == undefined
      || this.PerOfProjectCompletion.getFieldValue() == ''
      || this.PerOfProjectCompletion.getFieldValue() == 0) ? false : true;
  }

  fieldDependencies = {
    PropertyType: {
      inDep: [

        { paramKey: "VALUE1", depFieldID: "PropertyType", paramType: "PathParam" },
        { paramKey: "KEY1", depFieldID: "hidePropertyType", paramType: "QueryParam" },
        { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
      ],
      outDep: [
      ]
    },
    PurchaseType: {
      inDep: [

        { paramKey: "VALUE1", depFieldID: "PurchaseType", paramType: "PathParam" },
        { paramKey: "KEY1", depFieldID: "hidePurchaseType", paramType: "QueryParam" },
        { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
      ],
      outDep: [
      ]
    },
    SellerType: {
      inDep: [

        { paramKey: "VALUE1", depFieldID: "SellerType", paramType: "PathParam" },
        { paramKey: "KEY1", depFieldID: "hideSellerType", paramType: "QueryParam" },
        { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
      ],
      outDep: [
      ]
    },
    MoratoriumPeriod: {
      inDep: [

        { paramKey: "VALUE1", depFieldID: "MoratoriumPeriod", paramType: "PathParam" },
        { paramKey: "KEY1", depFieldID: "hideMoratoriumPeriod", paramType: "QueryParam" },
        { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
      ],
      outDep: [
      ]
    },
    BuilderName: {
      inDep: [

        { paramKey: "VALUE1", depFieldID: "BuilderName", paramType: "PathParam" },
        { paramKey: "KEY1", depFieldID: "hideBuilderName", paramType: "QueryParam" },
        { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
      ],
      outDep: [
      ]
    },

    Pincode: {
      inDep: [
        { paramKey: "PinCd", depFieldID: "Pincode", paramType: "PathParam" },
      ],
      outDep: [

        { paramKey: "MasterPincodeDtls.CityCd.CityName", depFieldID: "City" },
        { paramKey: "MasterPincodeDtls.StateCd.StateName", depFieldID: "State" },
        { paramKey: "MasterPincodeDtls.UDF1", depFieldID: "Region" },
      ]
    },

    SellerPincode: {
      inDep: [
        { paramKey: "PinCd", depFieldID: "SellerPincode", paramType: "PathParam" },
      ],
      outDep: [

        { paramKey: "MasterPincodeDtls.CityCd.CityName", depFieldID: "SellerCity" },
        { paramKey: "MasterPincodeDtls.StateCd.StateName", depFieldID: "SellerState" },
        { paramKey: "MasterPincodeDtls.UDF1", depFieldID: "Region" },
      ]
    },

    // Country: {
    //   inDep: [
    //     { paramKey: 'VALUE1', depFieldID: 'Country', paramType: 'PathParam' },
    //     { paramKey: 'APPID', depFieldID: 'hidAppId', paramType: 'QueryParam' },
    //     { paramKey: 'KEY1', depFieldID: 'hidCountryCode', paramType: 'QueryParam' },
    //   ],
    //   outDep: [
    //   ]
    // },

  }

  //custom 
  customGenericOnBlur(event: any) {
    console.log("Deep | customGenericOnBlur", event);
    if (event.field == "LD_LOAN_AMOUNT") {
    } else if (event.field == "DownPaymentAmount") {
      this.DownPaymentAmount_blur();
    } else if (event.field == "DownPaymentAmount") {

    }

    this.genericOnBlur(event.field, event.textFieldValue);
  }

}
