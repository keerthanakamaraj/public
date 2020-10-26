import { Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import { VehicleDetailsModel } from './VehicleDetails.model';
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
import { VehicleIPGridComponent } from '../VehicleIPGrid/VehicleIPGrid.component';
import { VehicleDetailsHandlerComponent } from './vehicle-handler.component';
import { VehicleIPInterface } from './VehicleDetails-interfaces';
import { Subscription, forkJoin } from 'rxjs';

const customCss: string = '';

@Component({
  selector: 'app-VehicleDetails',
  templateUrl: './VehicleDetails.component.html'
})
export class VehicleDetailsComponent extends FormComponent implements OnInit, AfterViewInit {
  @ViewChild('VehicleCategory', { static: false }) VehicleCategory: ComboBoxComponent;
  @ViewChild('Manufacturer', { static: false }) Manufacturer: ComboBoxComponent;
  @ViewChild('Make', { static: false }) Make: ComboBoxComponent;
  @ViewChild('Variant', { static: false }) Variant: ComboBoxComponent;
  @ViewChild('Model', { static: false }) Model: ComboBoxComponent;
  @ViewChild('AssetType', { static: false }) AssetType: ComboBoxComponent;
  @ViewChild('AssetLife', { static: false }) AssetLife: TextBoxComponent;
  @ViewChild('NameoftheDealer', { static: false }) NameoftheDealer: ComboBoxComponent;
  @ViewChild('DealerCode', { static: false }) DealerCode: TextBoxComponent;
  @ViewChild('VehicaleCostDetails', { static: false }) VehicaleCostDetails: VehicleIPGridComponent;
  @ViewChild('Currency', { static: false }) Currency: ComboBoxComponent;
  @ViewChild('FundsbyCustomer', { static: false }) FundsbyCustomer: TextBoxComponent;
  @ViewChild('LocalCurrencyEquivalent', { static: false }) LocalCurrencyEquivalent: TextBoxComponent;
  @ViewChild('LoanRequired', { static: false }) LoanRequired: TextBoxComponent;
  @ViewChild('Vehicle_Save', { static: false }) Vehicle_Save: ButtonComponent;
  @ViewChild('Vehicle_clear', { static: false }) Vehicle_clear: ButtonComponent;
  @ViewChild('Handler', { static: false }) Handler: VehicleDetailsHandlerComponent;
  @ViewChild('HidAppId', { static: false }) HidAppId: HiddenComponent;
  @ViewChild('HidVehicleCategory', { static: false }) HidVehicleCategory: HiddenComponent;
  @ViewChild('VehicleDtlsSeq', { static: false }) VehicleDtlsSeq: HiddenComponent;
  @ViewChild('HidVariant', { static: false }) HidVariant: HiddenComponent;
  @ViewChild('HidModel', { static: false }) HidModel: HiddenComponent;
  @ViewChild('HidVAssetType', { static: false }) HidVAssetType: HiddenComponent;
  @ViewChild('City', { static: false }) City: ComboBoxComponent;
  @ViewChild('Address', { static: false }) Address: TextBoxComponent;
  @ViewChild('hidExchangeRate', { static: false }) hidExchangeRate: HiddenComponent;


  childToEduSubscription: Subscription;
  VehicelSummSeq: number = undefined;
  clearFieldsFlag: boolean = false;
  tempCostFundsList = [];
  @Input() ApplicationId: string = undefined;
  async revalidate(): Promise<number> {
    var totalErrors = 0;
    super.beforeRevalidate();
    await Promise.all([
      this.revalidateBasicField('VehicleCategory'),
      this.revalidateBasicField('Manufacturer'),
      this.revalidateBasicField('Make'),
      this.revalidateBasicField('Variant'),
      this.revalidateBasicField('Model'),
      this.revalidateBasicField('AssetType'),
      this.revalidateBasicField('AssetLife'),
      this.revalidateBasicField('NameoftheDealer'),
      this.revalidateBasicField('DealerCode'),
      this.VehicaleCostDetails.revalidate(),
      this.revalidateBasicField('Currency'),
      this.revalidateBasicField('FundsbyCustomer'),
      this.revalidateBasicField('LocalCurrencyEquivalent'),
      this.revalidateBasicField('LoanRequired'),
      this.revalidateBasicField('City'),
      this.revalidateBasicField('Address'),
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
    this.value = new VehicleDetailsModel();
    this.componentCode = 'VehicleDetails';
    this.childToEduSubscription = this.services.rloCommonData.modalDataSubject.subscribe((event) => {
      switch (event.action) {
        case 'parseInputGridRecords':
          this.generateCostAndFundsList(this.tempCostFundsList);
          event.action = undefined;
          break;
      }
    });
  }
  setReadOnly(readOnly) {
    super.setBasicFieldsReadOnly(readOnly);
    this.VehicaleCostDetails.setReadOnly(readOnly);
  }
  async onFormLoad() {
    this.setInputs(this.services.dataStore.getData(this.services.routing.currModal));
    this.DealerCode.setReadOnly(true);
    this.LocalCurrencyEquivalent.setReadOnly(true);
    this.LoanRequired.setReadOnly(true);
    this.HidAppId.setValue('RLO');
    this.HidVehicleCategory.setValue('Vehicle_Category');
    // this.HidMake.setValue('Make');
    // this.HidVariant.setValue('Variant');
    // this.HidModel.setValue('Model');
    this.HidVAssetType.setValue('V_AssetType');
    this.setDependencies();
    await this.Handler.onFormLoad({
    });
    await this.FetcVehicelLoanDtls();
    if (!this.clearFieldsFlag) { await this.FetcVehicelLoanDtls(); }
  }
  setInputs(param: any) {
    let params = this.services.http.mapToJson(param);
    if (params['mode']) {
      this.mode = params['mode'];
    }
  }
  async submitForm(path, apiCode, serviceCode) {
    this.submitData['formName'] = 'VehicleDetails';
    await super.submit(path, apiCode, serviceCode);
  }
  getFieldInfo() {
    this.amountComponent.forEach(field => { this.additionalInfo[field.fieldID + '_desc'] = field.getFieldInfo(); });
    this.comboFields.forEach(field => { this.additionalInfo[field.fieldID + '_desc'] = field.getFieldInfo(); });
    this.fileUploadFields.forEach(field => { this.additionalInfo[field.fieldID + '_desc'] = field.getFieldInfo(); });
    this.additionalInfo['VehicaleCostDetails_desc'] = this.VehicaleCostDetails.getFieldInfo();
    return this.additionalInfo;
  }
  getFieldValue() {
    this.value.VehicaleCostDetails = this.VehicaleCostDetails.getFieldValue();
    return this.value;
  }
  setValue(inputValue, inputDesc = undefined) {
    this.setBasicFieldsValue(inputValue, inputDesc);
    this.VehicaleCostDetails.setValue(inputValue['VehicaleCostDetails'], inputDesc['VehicaleCostDetails_desc']);
    this.value = new VehicleDetailsModel();
    this.value.setValue(inputValue);
    this.setDependencies();
    this.passNewValue(this.value);
  }
  ngOnInit() {
    if (this.formCode == undefined) { this.formCode = 'VehicleDetails'; }
    if (this.formOnLoadError) { return; }
    var styleElement = document.createElement('style');
    styleElement.type = 'text/css';
    styleElement.innerHTML = customCss;
    styleElement.id = 'VehicleDetails_customCss';
    document.getElementsByTagName('head')[0].appendChild(styleElement);
  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    var styleElement = document.getElementById('VehicleDetails_customCss');
    styleElement.parentNode.removeChild(styleElement);
    this.childToEduSubscription.unsubscribe();
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.subsBFldsValueUpdates();
      this.value.VehicaleCostDetails = this.VehicaleCostDetails.getFieldValue();
      this.VehicaleCostDetails.valueChangeUpdates().subscribe((value) => { this.value.VehicaleCostDetails = value; });
      this.onFormLoad();
      this.checkForHTabOverFlow();
    });
  }
  clearError() {
    super.clearBasicFieldsError();
    super.clearHTabErrors();
    super.clearVTabErrors();
    this.VehicaleCostDetails.clearError();
    this.errors = 0;
    this.errorMessage = [];
  }
  onReset() {
    super.resetBasicFields();
    this.VehicaleCostDetails.onReset();
    this.clearHTabErrors();
    this.clearVTabErrors();
    this.errors = 0;
    this.errorMessage = [];
    this.additionalInfo = undefined;
    this.dependencyMap.clear();
    this.value = new VehicleDetailsModel();
    this.passNewValue(this.value);
    this.setReadOnly(false);
    this.onFormLoad();
  }
  async FundsbyCustomer_blur(event) {
    let inputMap = new Map();
    this.Handler.FundsbyCustomerOnblur()
    // await this.Handler.onAddTypeChange();
  }

  async FetcVehicelLoanDtls() {
    let inputMap = new Map();
    inputMap.clear();
    // this.ApplicationId = '2341';
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
      this.services.http.fetchApi('/VehicleDetails', 'GET', inputMap, '/rlo-de').subscribe(
        async (httpResponse: HttpResponse<any>) => {
          let res = httpResponse.body;
          if (res != null) {
            let VehicleDtls = res['VehicleDetails'];
            if (VehicleDtls) {
              console.log("shweta :: Education loan fetched : ", VehicleDtls);
              this.parseFetchVehicleResp(VehicleDtls);
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
          }
          else {
            this.VehicaleCostDetails.loadRecords();
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
  parseFetchVehicleResp(VehicleDtls) {
    console.log("abc :: edu resp", VehicleDtls, " : ", VehicleDtls[0]['VehicaleCostDetails']);
    this.ParseVehicleSummDtls(VehicleDtls[0]);
    this.tempCostFundsList = VehicleDtls[0]['VehicaleCostDetails'];
    if (this.VehicaleCostDetails.VehicleDetailsMap.size > 0) {
      this.generateCostAndFundsList(this.tempCostFundsList);
    } else {
      this.VehicaleCostDetails.doSubscribeFlag = this.VehicaleCostDetails.VehicleDetailsMap.size > 0 ? false : true;
    }
  }
  ParseVehicleSummDtls(VehicleDtlsSumm) {
    this.VehicleDtlsSeq = VehicleDtlsSumm.VehicleDtlsSeq;
    this.Manufacturer.setValue(VehicleDtlsSumm.Manufacturer.id);
    this.VehicleCategory.setValue(VehicleDtlsSumm.VehicleCategory.id);
    this.Make.setValue(VehicleDtlsSumm.VehicleMake.id);
    this.VehicaleCostDetails.TotalAmount.setValue(VehicleDtlsSumm.TotalCost);
    this.VehicaleCostDetails.TotalLocalCurEq.setValue(VehicleDtlsSumm.LocalCurrenyAmount);
    this.Variant.setValue(VehicleDtlsSumm.Variant.id);
    this.Model.setValue(VehicleDtlsSumm.Model.id);
    this.AssetType.setValue(VehicleDtlsSumm.VehicleAssetType.id);
    this.DealerCode.setValue(VehicleDtlsSumm.DealerCode);
    this.City.setValue(VehicleDtlsSumm.DealerCity.id);
    this.AssetLife = VehicleDtlsSumm.AssetLife;
    this.VehicelSummSeq = VehicleDtlsSumm.VehicleInputSeq;
    this.NameoftheDealer.setValue(VehicleDtlsSumm.DealerName.id);
    this.Currency.setValue(VehicleDtlsSumm.Currency);
    this.Address = VehicleDtlsSumm.DealerAddress;
    this.LoanRequired.setValue(VehicleDtlsSumm.TotalCost);
    this.LocalCurrencyEquivalent.setValue(VehicleDtlsSumm.LocalCurrenyAmount);
    this.FundsbyCustomer.setValue(VehicleDtlsSumm.CustomerFunds);

  }
  generateCostAndFundsList(VehicleList) {
    console.log("abc :: cost and funds list", VehicleList);
    // let costSrNo=0;
    // let fundSrNo=0;
    if (VehicleList != undefined) {
      VehicleList.forEach(element => {
        let tempObj: VehicleIPInterface = {}
        if (this.VehicaleCostDetails.VehicleDetailsMap.has(element.TransactionDescription)) {
          tempObj = this.VehicaleCostDetails.VehicleDetailsMap.get(element.TransactionDescription);
          //  tempObj.SrNo=costSrNo+1;
        }
        if (Object.keys(tempObj).length != 0) {
          tempObj.VehicleDtlsSeq = element.EdTransactionSeq;
          tempObj.ApplicationId = element.ApplicationId;
          tempObj.TransactionType = element.TransactionType;
          tempObj.TransactionDescription = element.TransactionDescription;
          tempObj.VehicleInputSeq = this.VehicelSummSeq;
          tempObj.Amount = element.Amount;
          tempObj.Version = element.Version;
          tempObj.Currency = element.Currency;
          tempObj.CreatedBy = element.CreatedBy;
          tempObj.CreatedOn = element.CreatedOn;
          tempObj.UpdatedBy = element.UpdatedBy;
          tempObj.UpdatedOn = element.UpdatedOn;
          tempObj.LocalCurrencyEquivalent = element.CurrencyEquivalentAmt;
        }
      });
    }
    this.VehicaleCostDetails.loadRecords();
    // this.FundsAvailableGrid.loadRecords();
  }
  async Currency_blur(event) {
    console.log("shweta : hidden exchange rate : ", this.hidExchangeRate.getFieldValue());
    this.VehicaleCostDetails.hidExchangeRate = this.hidExchangeRate.getFieldValue();
    this.VehicaleCostDetails.Amount.toArray().forEach((element, index) => {
      let tempObj = { "columnId": "Amount", "rowNo": index, "value": element.value };
      this.VehicaleCostDetails.Amount_blur(tempObj, undefined, undefined);
    });
    //this.CostOfCourseGrid.updateTotal();
  }
  generateCostAndFundsReq() {
    let VehicleDtlsList = [];
    VehicleDtlsList = this.mapCostandFundsRecords(VehicleDtlsList, this.VehicaleCostDetails.VehicleDetailsMap, 'C');
    return VehicleDtlsList;
  }
  mapCostandFundsRecords(VehicleDtlsList, TransactionList, TransactionType) {
    TransactionList.forEach(element => {
      let inputObj: VehicleIPInterface = {};
      inputObj.ApplicationId = this.ApplicationId;
      inputObj.VehicleInputSeq = element.VehicleInputSeq;
      inputObj.VehicleDtlsSeq = element.VehicleDtlsSeq;
      inputObj.TransactionDescription = element.mstId;
      inputObj.TransactionType = element.TransactionType == undefined ? TransactionType : element.TransactionType;
      inputObj.Amount = element.Amount;
      inputObj.Currency = this.Currency.getFieldValue();
      inputObj.LocalCurrencyEquivalent = element.LocalCurrencyEquivalent;
      VehicleDtlsList.push(inputObj);
      // inputMap.set('CreatedBy',element.);
      //  inputMap.set('UpdatedBy',element.);
      //  inputMap.set('Version',element.);
      //  inputMap.set('UpdatedOn',element.);
      //  inputMap.set('CreatedOn',element.);
    });
    return VehicleDtlsList;
  }
  generateVehicleSaveUpdateReq(inputMap) {
    inputMap.clear();
    if (this.VehicleDtlsSeq != undefined) {
      inputMap.set('PathParam.VehicleDtlsSeq', this.VehicleDtlsSeq);
    }
    inputMap.set('Body.VehicleDetails.ApplicationId', this.ApplicationId);
    // inputMap.set('Body.VehicleDetails.VehicleDtlsSeq', this.VehicleDtlsSeq.getFieldValue());
    inputMap.set('Body.VehicleDetails.VehicleCategory', this.VehicleCategory.getFieldValue());
    inputMap.set('Body.VehicleDetails.Manufacturer', this.Manufacturer.getFieldValue());
    inputMap.set('Body.VehicleDetails.VehicleMake', this.Make.getFieldValue());
    inputMap.set('Body.VehicleDetails.Variant', this.Variant.getFieldValue());
    // inputMap.set('Body.VehicleDetails.Currency', this.Currency.getFieldValue());
    inputMap.set('Body.VehicleDetails.Model', this.Model.getFieldValue());
    inputMap.set('Body.VehicleDetails.VehicleAssetType', this.AssetType.getFieldValue());
    inputMap.set('Body.VehicleDetails.DealerCode', this.DealerCode.getFieldValue());
    inputMap.set('Body.VehicleDetails.DealerCity', this.City.getFieldValue());
    inputMap.set('Body.VehicleDetails.AssetLife', this.AssetLife.getFieldValue());
    inputMap.set('Body.VehicleDetails.DealerName', this.NameoftheDealer.getFieldValue());
    inputMap.set('Body.VehicleDetails.Currency', this.Currency.getFieldValue());
    // inputMap.set('Body.VehicleDetails.AssetLife', this.NameoftheDealer.getFieldValue());
    inputMap.set('Body.VehicleDetails.DealerAddress', this.Address.getFieldValue());
    inputMap.set('Body.VehicleDetails.CustomerFunds', this.FundsbyCustomer.getFieldValue());
    inputMap.set('Body.VehicleDetails.TotalCost', this.LoanRequired.getFieldValue());
    inputMap.set('Body.VehicleDetails.LocalCurrenyAmount', this.LocalCurrencyEquivalent.getFieldValue());
    inputMap.set('Body.VehicleDetails.costAndFundsGridDtls', this.generateCostAndFundsReq());
    return inputMap;
  }
  parseResponseError(err) {
    if (err != null && err['ErrorElementPath'] != undefined && err['ErrorDescription'] != undefined) {
      if (err['ErrorElementPath'] == 'VehicleDetails.NameoftheDealer') {
        this.NameoftheDealer.setError(err['ErrorDescription']);
      }
      else if (err['ErrorElementPath'] == 'VehicleDetails.AssetLife') {
        this.AssetLife.setError(err['ErrorDescription']);
      }
      // else if (err['ErrorElementPath'] == 'VehicleDetails.LocalCurrencyEquivalent') {
      //     this.LocalCurrencyEquivalent.setError(err['ErrorDescription']);
      // }
      else if (err['ErrorElementPath'] == 'VehicleDetails.VehicleAssetType') {
        this.AssetType.setError(err['ErrorDescription']);
      }
      else if (err['ErrorElementPath'] == 'VehicleDetails.Model') {
        this.Model.setError(err['ErrorDescription']);
      }
      // else if (err['ErrorElementPath'] == 'VehicleDetails.Currency') {
      //     this.Currency.setError(err['ErrorDescription']);
      // }
      else if (err['ErrorElementPath'] == 'VehicleDetails.Variant') {
        this.Variant.setError(err['ErrorDescription']);
      }
      else if (err['ErrorElementPath'] == 'VehicleDetails.DealerCode') {
        this.DealerCode.setError(err['ErrorDescription']);
      }
      else if (err['ErrorElementPath'] == 'VehicleDetails.Make') {
        this.Make.setError(err['ErrorDescription']);
      }
      else if (err['ErrorElementPath'] == 'VehicleDetails.Manufacturer') {
        this.Manufacturer.setError(err['ErrorDescription']);
      }
      else if (err['ErrorElementPath'] == 'VehicleDetails.VehicleCategory') {
        this.VehicleCategory.setError(err['ErrorDescription']);
      }
      else if (err['ErrorElementPath'] == 'VehicleDetails.Currency') {
        this.Currency.setError(err['ErrorDescription']);
      }
      else if (err['ErrorElementPath'] == 'VehicleDtlsSeq') {
        this.VehicleDtlsSeq.setError(err['ErrorDescription']);
      }
      else if (err['ErrorElementPath'] == 'VehicleDetails.DealerCode') {
        this.DealerCode.setError(err['ErrorDescription']);
      }
      else if (err['ErrorElementPath'] == 'VehicleDetails.DealerCity') {
        this.City.setError(err['ErrorDescription']);
      }
      else if (err['ErrorElementPath'] == 'VehicleDetails.DealerName') {
        this.NameoftheDealer.setError(err['ErrorDescription']);
      }
      else if (err['ErrorElementPath'] == 'VehicleDetails.DealerAddress') {
        this.Address.setError(err['ErrorDescription']);
      }
      else if (err['ErrorElementPath'] == 'VehicleDetails.CustomerFunds') {
        this.FundsbyCustomer.setError(err['ErrorDescription']);
      }
      else if (err['ErrorElementPath'] == 'VehicleDetails.TotalCost') {
        this.LoanRequired.setError(err['ErrorDescription']);
      }
      else if (err['ErrorElementPath'] == 'VehicleDetails.LocalCurrenyAmount') {
        this.LocalCurrencyEquivalent.setError(err['ErrorDescription']);
      }
    }
  }
  Vehicle_Clear_click(event) {
    this.onReset();
  }
  Vehicle_Save_click(event) {
    let inputMap = new Map();
    this.Vehicle_Save.setDisabled(true);
    let numberOfErrors: number = 0;
    if (numberOfErrors == 0) {
      if (this.VehicleDtlsSeq != undefined) {

        inputMap = this.generateVehicleSaveUpdateReq(inputMap);

        this.services.http.fetchApi('/VehicleDetails/{VehicleDtlsSeq}', 'PUT', inputMap, '/rlo-de').subscribe(
          async (httpResponse: HttpResponse<any>) => {
            var res = httpResponse.body;
            this.services.alert.showAlert(1, 'rlo.success.update.visitreport', 5000);
            this.Vehicle_Clear_click({});
            this.Vehicle_Save.setDisabled(false);
          },
          async (httpError) => {
            this.parseResponseError(httpError['error']);
            this.services.alert.showAlert(2, 'rlo.error.update.visitreport', -1);
            this.Vehicle_Save.setDisabled(false);
          }
        );
      }
      else {
        inputMap = this.generateVehicleSaveUpdateReq(inputMap);
        this.services.http.fetchApi('/VehicleDetails', 'POST', inputMap, '/rlo-de').subscribe(
          async (httpResponse: HttpResponse<any>) => {
            var res = httpResponse.body;
            this.services.alert.showAlert(1, 'rlo.success.save.visitreport', 5000);
            // this.PastEducationGrid.gridDataLoad({
            //     'ApplicationId': this.ApplicationId
            // });
            this.Vehicle_Clear_click({});
            this.Vehicle_Save.setDisabled(false);
          },
          async (httpError) => {
            this.parseResponseError(httpError['error']);
            this.services.alert.showAlert(2, 'rlo.error.save.visitreport', -1);
            this.Vehicle_Save.setDisabled(false);
          }
        );
      }
    }
    else {
      this.services.alert.showAlert(2, 'rlo.error.invalid.form', -1);
      this.Vehicle_Save.setDisabled(false);
    }
  }
  fieldDependencies = {
    VehicleCategory: {
      inDep: [

        { paramKey: "VALUE1", depFieldID: "VehicleCategory", paramType: "PathParam" },
        { paramKey: "APPID", depFieldID: "HidAppId", paramType: "QueryParam" },
        { paramKey: "KEY1", depFieldID: "HidVehicleCategory", paramType: "QueryParam" },
      ],
      outDep: [
      ]
    },
    Manufacturer: {
      inDep: [

        { paramKey: "ManufacturerCode", depFieldID: "Manufacturer", paramType: "PathParam" },
      ],
      outDep: [
      ]
    },
    Make: {
      inDep: [

        { paramKey: "VehicleMakeCode", depFieldID: "Make", paramType: "PathParam" },
        { paramKey: "Manufacturer", depFieldID: "Manufacturer", paramType: "QueryParam" }
      ],
      outDep: [
      ]
    },
    Model: {
      inDep: [

        { paramKey: "VehicleModelCode", depFieldID: "Model", paramType: "PathParam" },
        { paramKey: "Make", depFieldID: "Make", paramType: "QueryParam" }
      ],
      outDep: [
      ]
    },
    Variant: {
      inDep: [

        { paramKey: "VehicleVariantCode", depFieldID: "Variant", paramType: "PathParam" },
        { paramKey: "Model", depFieldID: "Model", paramType: "QueryParam" }
      ],
      outDep: [
      ]
    },
    NameoftheDealer: {
      inDep: [

        { paramKey: "DEALER_CODE", depFieldID: "NameoftheDealer", paramType: "PathParam" },
      ],
      outDep: [
      ]
    },
    AssetType: {
      inDep: [

        { paramKey: "VALUE1", depFieldID: "AssetType", paramType: "PathParam" },
        { paramKey: "APPID", depFieldID: "HidAppId", paramType: "QueryParam" },
        { paramKey: "KEY1", depFieldID: "HidVAssetType", paramType: "QueryParam" },
      ],
      outDep: [
      ]
    },

    Currency: {
      inDep: [

        { paramKey: "CurrencySrc", depFieldID: "Currency", paramType: "PathParam" },
        // { paramKey: "CurrencyDest", depFieldID: "hideCurrencyDesc", paramType: "QueryParam" },
      ],
      outDep: [
        { paramKey: "MstCurrencyDetails.ExchangeRate", depFieldID: "hidExchangeRate" },
      ]
    },
    City: {
      inDep: [

        { paramKey: "CityCd", depFieldID: "City", paramType: "PathParam" },
      ],
      outDep: [
      ]
    }
  }

}
