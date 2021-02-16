import { Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import { AddressDetailsModel } from './AddressDetails.model';
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
import { RLOUIRadioComponent } from '../rlo-ui-radio/rlo-ui-radio.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PopupModalComponent } from '../popup-modal/popup-modal.component';
import { ServiceStock } from '../service-stock.service';
import { LabelComponent } from '../label/label.component';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { AddressDetailsGridComponent } from '../AddressDetailsGrid/AddressDetailsGrid.component';
import { AddressHandlerComponent } from '../AddressDetails/address-handler.component';
import { RloUiAccordionComponent } from 'src/app/rlo-ui-accordion/rlo-ui-accordion.component';
import { RloUiMobileComponent } from '../rlo-ui-mobile/rlo-ui-mobile.component';

const customCss = '';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-AddressDetails',
  templateUrl: './AddressDetails.component.html'
})
export class AddressDetailsComponent extends FormComponent implements OnInit, AfterViewInit {

  activeBorrowerSeq: any;
  constructor(services: ServiceStock) {
    super(services);
    this.value = new AddressDetailsModel();
    this.componentCode = 'AddressDetails';
  }
  @ViewChild('AD_ADD_TYPE', { static: false }) AD_ADD_TYPE: ComboBoxComponent;
  @ViewChild('AD_OCCUPANCY_TYPE', { static: false }) AD_OCCUPANCY_TYPE: RLOUIRadioComponent;
  @ViewChild('AD_OCCUPANCY_STATUS', { static: false }) AD_OCCUPANCY_STATUS: RLOUIRadioComponent;
  @ViewChild('AD_CUST_TYPE', { static: false }) AD_CUST_TYPE: RLOUIRadioComponent;
  @ViewChild('AD_MAILING_ADDRESS', { static: false }) AD_MAILING_ADDRESS: RLOUIRadioComponent;
  @ViewChild('AD_ADDRESS_LINE1', { static: false }) AD_ADDRESS_LINE1: TextBoxComponent;
  @ViewChild('AD_ADDRESS_LINE2', { static: false }) AD_ADDRESS_LINE2: TextBoxComponent;
  @ViewChild('AD_ADDRESS_LINE3', { static: false }) AD_ADDRESS_LINE3: TextBoxComponent;
  @ViewChild('AD_ADDRESS_LINE4', { static: false }) AD_ADDRESS_LINE4: TextBoxComponent;
  @ViewChild('AD_PINCODE', { static: false }) AD_PINCODE: TextBoxComponent;
  @ViewChild('AD_REGION', { static: false }) AD_REGION: TextBoxComponent;
  @ViewChild('AD_CITY', { static: false }) AD_CITY: TextBoxComponent;
  @ViewChild('AD_STATE', { static: false }) AD_STATE: TextBoxComponent;
  @ViewChild('AD_COUNTRY', { static: false }) AD_COUNTRY: TextBoxComponent;
  @ViewChild('AD_LANDMARK', { static: false }) AD_LANDMARK: TextBoxComponent;
  @ViewChild('AD_RES_DUR', { static: false }) AD_RES_DUR: TextBoxComponent;
  @ViewChild('AD_RES_DUR_UNIT', { static: false }) AD_RES_DUR_UNIT: ComboBoxComponent;
  //@ViewChild('AD_LAND_COUNTRY_CODE', { static: false }) AD_LAND_COUNTRY_CODE: ComboBoxComponent;
  @ViewChild('AD_LANDLINE_NUMBER', { static: false }) AD_LANDLINE_NUMBER: RloUiMobileComponent;
  @ViewChild('AD_ALTERNATE_MOB_NO', { static: false }) AD_ALTERNATE_MOB_NO: RloUiMobileComponent;
  @ViewChild('AD_EMAIL_ID2', { static: false }) AD_EMAIL_ID2: TextBoxComponent;
  @ViewChild('AD_PREF_TIME', { static: false }) AD_PREF_TIME: ComboBoxComponent;
  @ViewChild('AD_CORR_EMAIL', { static: false }) AD_CORR_EMAIL: ComboBoxComponent;
  @ViewChild('AD_Email_ID', { static: false }) AD_Email_ID: CheckBoxComponent;
  @ViewChild('AD_Alternative_Email', { static: false }) AD_Alternative_Email: CheckBoxComponent;
  @ViewChild('AD_EMAIL1_CHECKBOX', { static: false }) AD_EMAIL1_CHECKBOX: CheckBoxComponent;
  @ViewChild('AD_EMAIL2_CHECKBOX', { static: false }) AD_EMAIL2_CHECKBOX: CheckBoxComponent;
  @ViewChild('SAME_ADDRESS', { static: false }) SAME_ADDRESS: CheckBoxComponent;
  @ViewChild('CORR_ADD_CHECKBOX', { static: false }) CORR_ADD_CHECKBOX: CheckBoxComponent;

  @ViewChild('AD_SAVE_ADDRESS', { static: false }) AD_SAVE_ADDRESS: ButtonComponent;
  @ViewChild('AD_CLEAR_BTN', { static: false }) AD_CLEAR_BTN: ButtonComponent;
  @ViewChild('AddressGrid', { static: false }) AddressGrid: AddressDetailsGridComponent;
  @ViewChild('Handler', { static: false }) Handler: AddressHandlerComponent;
  @ViewChild('AD_HIDE_ID', { static: false }) AD_HIDE_ID: HiddenComponent;
  @ViewChild('hidAddType', { static: false }) hidAddType: HiddenComponent;
  @ViewChild('hidAppId', { static: false }) hidAppId: HiddenComponent;
  @ViewChild('hidMailingAddress', { static: false }) hidMailingAddress: HiddenComponent;
  @ViewChild('hidResDurType', { static: false }) hidResDurType: HiddenComponent;
  @ViewChild('hidLandISDCode', { static: false }) hidLandISDCode: HiddenComponent;
  @ViewChild('hidOccStatus', { static: false }) hidOccStatus: HiddenComponent;
  @ViewChild('hideOccType', { static: false }) hideOccType: HiddenComponent;
  @ViewChild('hideCorrEmail', { static: false }) hideCorrEmail: HiddenComponent;
  @ViewChild('hideOccp_type', { static: false }) hideOccp_type: HiddenComponent;
  @ViewChild('hideCorrsAddress', { static: false }) hideCorrsAddress: HiddenComponent;
  // @ViewChild('AD_COUNTRY_CODE', { static: false }) AD_COUNTRY_CODE: ComboBoxComponent;
  @ViewChild('ADD_ACCORD', { static: false }) ADD_ACCORD: RloUiAccordionComponent;
  @ViewChild('hidPrefferTime', { static: false }) hidPrefferTime: HiddenComponent;
  @ViewChild('hidCountryCode', { static: false }) hidCountryCode: HiddenComponent;
  @Output() addonblur: EventEmitter<any> = new EventEmitter<any>();
  @Output() updateStageValidation: EventEmitter<any> = new EventEmitter<any>();
  @Input() readOnly: boolean = false;
  @Input() activeApplicantType = undefined; // canara changes
  isCorporate: boolean = undefined;
  AD_Address_Type = [];
  AD_OCCUP_TYPE = [];
  EmailCheck: string;
  IsCorporateApplicant: boolean = undefined;

  // tslint:disable-next-line:member-ordering
  fieldDependencies = {
    AD_ADD_TYPE: {
      inDep: [
        { paramKey: 'VALUE1', depFieldID: 'AD_ADD_TYPE', paramType: 'PathParam' },
        { paramKey: 'KEY1', depFieldID: 'hidAddType', paramType: 'QueryParam' },
        { paramKey: 'APPID', depFieldID: 'hidAppId', paramType: 'QueryParam' },
      ],
      outDep: [
      ]
    },
    AD_OCCUPANCY_TYPE: {
      inDep: [

        { paramKey: 'VALUE1', depFieldID: 'AD_OCCUPANCY_TYPE', paramType: 'PathParam' },
        { paramKey: 'KEY1', depFieldID: 'hideOccType', paramType: 'QueryParam' },
        { paramKey: 'APPID', depFieldID: 'hidAppId', paramType: 'QueryParam' },
      ],
      outDep: [
      ]
    },
    AD_OCCUPANCY_STATUS: {
      inDep: [

        { paramKey: 'VALUE1', depFieldID: 'AD_OCCUPANCY_STATUS', paramType: 'PathParam' },
        { paramKey: 'KEY1', depFieldID: 'hidOccStatus', paramType: 'QueryParam' },
        { paramKey: 'APPID', depFieldID: 'hidAppId', paramType: 'QueryParam' },
      ],
      outDep: [
      ]
    },
    // AD_MAILING_ADDRESS: {
    //   inDep: [

    //     { paramKey: 'VALUE1', depFieldID: 'AD_MAILING_ADDRESS', paramType: 'PathParam' },
    //     { paramKey: 'APPID', depFieldID: 'hidAppId', paramType: 'QueryParam' },
    //     { paramKey: 'KEY1', depFieldID: 'hidMailingAddress', paramType: 'QueryParam' },
    //   ],
    //   outDep: [
    //   ]
    // },
    AD_PINCODE: {
      inDep: [

        { paramKey: 'PinCd', depFieldID: 'AD_PINCODE', paramType: 'PathParam' },
      ],
      outDep: [

        { paramKey: 'MasterPincodeDtls.CityCd.CityName', depFieldID: 'AD_CITY' },
        { paramKey: 'MasterPincodeDtls.StateCd.StateName', depFieldID: 'AD_STATE' },
        { paramKey: 'MasterPincodeDtls.UDF1', depFieldID: 'AD_REGION' },
        { paramKey: 'MasterPincodeDtls.CountryCd.CountryName', depFieldID: 'AD_COUNTRY' },
      ]
    },

    AD_RES_DUR_UNIT: {
      inDep: [

        { paramKey: 'VALUE1', depFieldID: 'AD_RES_DUR_UNIT', paramType: 'PathParam' },
        { paramKey: 'APPID', depFieldID: 'hidAppId', paramType: 'QueryParam' },
        { paramKey: 'KEY1', depFieldID: 'hidResDurType', paramType: 'QueryParam' },
      ],
      outDep: [
      ]
    },

    AD_PREF_TIME: {
      inDep: [
        { paramKey: 'VALUE1', depFieldID: 'AD_PREF_TIME', paramType: 'PathParam' },
        { paramKey: 'APPID', depFieldID: 'hidAppId', paramType: 'QueryParam' },
        { paramKey: 'KEY1', depFieldID: 'hidPrefferTime', paramType: 'QueryParam' },
      ],
      outDep: [
      ]
    },
    // AD_LAND_COUNTRY_CODE: {
    //   inDep: [

    //     { paramKey: 'VALUE1', depFieldID: 'AD_LAND_COUNTRY_CODE', paramType: 'PathParam' },
    //     { paramKey: 'APPID', depFieldID: 'hidAppId', paramType: 'QueryParam' },
    //     { paramKey: 'KEY1', depFieldID: 'hidLandISDCode', paramType: 'QueryParam' },
    //   ],
    //   outDep: [
    //   ]
    // },
    // AD_COUNTRY_CODE: {
    //   inDep: [
    //     { paramKey: 'VALUE1', depFieldID: 'AD_COUNTRY_CODE', paramType: 'PathParam' },
    //     { paramKey: 'APPID', depFieldID: 'hidAppId', paramType: 'QueryParam' },
    //     { paramKey: 'KEY1', depFieldID: 'hidCountryCode', paramType: 'QueryParam' },
    //   ],
    //   outDep: [
    //   ]
    // },
  };
  /* Write Custom Scripts Here */

  async revalidate(): Promise<number> {
    let totalErrors = 0;
    super.beforeRevalidate();
    await Promise.all([
      this.revalidateBasicField('AD_ADD_TYPE'),
      this.revalidateBasicField('AD_OCCUPANCY_TYPE'),
      this.revalidateBasicField('AD_OCCUPANCY_STATUS'),
      // this.revalidateBasicField('AD_MAILING_ADDRESS'),
      // this.revalidateBasicField('AD_RESIDENCE_TYPE'),
      this.revalidateBasicField('AD_ADDRESS_LINE1'),
      this.revalidateBasicField('AD_ADDRESS_LINE2'),
      this.revalidateBasicField('AD_ADDRESS_LINE3'),
      this.revalidateBasicField('AD_ADDRESS_LINE4'),
      this.revalidateBasicField('AD_PINCODE'),
      this.revalidateBasicField('AD_REGION'),
      this.revalidateBasicField('AD_CITY'),
      this.revalidateBasicField('AD_COUNTRY'),
      this.revalidateBasicField('AD_STATE'),
      this.revalidateBasicField('AD_LANDMARK'),
      // this.revalidateBasicField('AD_MAILING_ADDRESS'),
      this.revalidateBasicField('AD_RES_DUR'),
      this.revalidateBasicField('AD_RES_DUR_UNIT'),
      // this.revalidateBasicField('AD_LAND_COUNTRY_CODE'),
      this.revalidateBasicField('AD_LANDLINE_NUMBER'),
      // this.revalidateBasicField('AD_COUNTRY_CODE'),
      // this.revalidateBasicField('AD_ALTERNATE_MOB_NO'),
      this.revalidateBasicField('AD_EMAIL_ID2'),
      this.revalidateBasicField('AD_PREF_TIME'),
      this.revalidateBasicField('AD_EMAIL1_CHECKBOX'),
      this.revalidateBasicField('AD_EMAIL2_CHECKBOX'),
    ]).then((errorCounts) => {
      errorCounts.forEach((errorCount) => {
        totalErrors += errorCount;
      });
    });
    this.errors = totalErrors;
    super.afterRevalidate();
    return totalErrors;
  }
  setReadOnly(readOnly) {
    super.setBasicFieldsReadOnly(readOnly);
  }
  async onFormLoad() {
    this.setInputs(this.services.dataStore.getData(this.services.routing.currModal));

    this.hidAppId.setValue('RLO');
    this.hidMailingAddress.setValue('Y_N');
    this.hidResDurType.setValue('PERIOD');
    this.hidOccStatus.setValue('OCCUPANCY_STATUS');
    this.hideOccType.setValue('OCCUPANCY_TYPE');
    this.hideCorrEmail.setValue('CORR_EMAIL');
    this.hidPrefferTime.setValue('PREF_TIME_CONTACT');
    this.AddressGrid.activeApplicantType = this.activeApplicantType;
    if (this.services.rloCommonData.globalApplicationDtls.CustomerType == 'C' && this.activeApplicantType == 'B') {
      this.hidAddType.setValue('CORP_PRIM_ADDRESS_TYPE');  //changed for canara
      this.IsCorporateApplicant = true;
    } else {
      this.hidAddType.setValue('ADDRESS_TYPE');  //changed for canara
      this.IsCorporateApplicant = false;
    }

    // this.hidCountryCode.setValue('ISD_COUNTRY_CODE');
    // this.hidLandISDCode.setValue('ISD_COUNTRY_CODE');
    this.isCorporate = this.services.rloCommonData.globalApplicationDtls.CustomerType == 'C' ? true : false;
    this.AD_EMAIL1_CHECKBOX.setValue(true);
    this.CORR_ADD_CHECKBOX.setHidden(true);
    // this.AD_MAILING_ADDRESS.setValue('N',undefined,true);
    //  this.AD_STATE.setHidden(true);
    const inputMap = new Map();

    await this.Handler.onFormLoad({
    });

    // this.doCanaraBasedChanges(); //called for canara

    if (this.activeBorrowerSeq !== undefined) {
      await this.AddressGrid.gridDataLoad({
        'passBorrowerSeqToGrid': this.activeBorrowerSeq
      });
    }

    this.setDependencies();
    this.AddressGrid.toggleColumn();
    //UW
    console.log(this.AddressGrid.columnDefs);
    if (this.readOnly) {
      setTimeout(() => {
        this.setReadOnly(this.readOnly);
      }, 1000);
      let totalGridColumns = this.AddressGrid.columnDefs.length;
      if (totalGridColumns == 6)
        return;

      this.AddressGrid.columnDefs = this.AddressGrid.columnDefs.slice(0, totalGridColumns - 1);
      this.AddressGrid.columnDefs[totalGridColumns - 2].width = 12;
      this.AddressGrid.columnDefs[totalGridColumns - 2].cellRendererParams.CustomClass = "btn-views";
      this.AddressGrid.columnDefs[totalGridColumns - 2].cellRendererParams.IconClass = 'fas fa-eye fa-lg';
    }
  }

  setInputs(param: any) {
    const params = this.services.http.mapToJson(param);
    if (params['mode']) {
      this.mode = params['mode'];
    }
  }
  async submitForm(path, apiCode, serviceCode) {
    this.submitData['formName'] = 'AddressDetails';
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
  // tslint:disable-next-line:no-unnecessary-initializer
  setValue(inputValue, inputDesc = undefined) {
    this.setBasicFieldsValue(inputValue, inputDesc);
    this.value = new AddressDetailsModel();
    this.value.setValue(inputValue);
    this.setDependencies();
    this.passNewValue(this.value);
  }
  ngOnInit() {
    if (this.formCode === undefined) { this.formCode = 'AddressDetails'; }
    if (this.formOnLoadError) { return; }
    const styleElement = document.createElement('style');
    styleElement.type = 'text/css';
    styleElement.innerHTML = customCss;
    styleElement.id = 'AddressDetails_customCss';
    document.getElementsByTagName('head')[0].appendChild(styleElement);
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    const styleElement = document.getElementById('AddressDetails_customCss');
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
    this.value = new AddressDetailsModel();
    this.passNewValue(this.value);
    this.setReadOnly(this.readOnly);
    this.onFormLoad();
    // this.AD_MAILING_ADDRESS.isOptionsLoaded = false;

  }

  async AD_ADD_TYPE_change(fieldID, value) {
    const inputMap = new Map();
    // this.addonblur.emit({});
    //  await this.Handler.onAddTypeChange(); // removed for canara 

    this.onCanaraAddressTypeChange(); // called for the canara 

  }

  onCanaraAddressTypeChange() {

    let readOnlyFlag = this.AD_ADD_TYPE.getFieldValue() == 'ML' ? true : false;
    // if(this.AD_ADD_TYPE.getFieldValue() != this.AD_ADD_TYPE.getOldValue()){
    //   this.AD_ADD_TYPE.updateOldValue();
    //   this.AD_HIDE_ID.onReset();
    // }
    this.AD_ADDRESS_LINE1.setReadOnly(readOnlyFlag);
    this.AD_ADDRESS_LINE1.mandatory = !readOnlyFlag;
    this.AD_ADDRESS_LINE2.setReadOnly(readOnlyFlag);
    this.AD_ADDRESS_LINE3.setReadOnly(readOnlyFlag);
    this.AD_ADDRESS_LINE4.setReadOnly(readOnlyFlag);
    this.AD_PINCODE.setReadOnly(readOnlyFlag);
    this.AD_PINCODE.mandatory = !readOnlyFlag;
    this.SAME_ADDRESS.setHidden(!readOnlyFlag);
  }
  // async AD_ADDRESS_LINE1_blur(event) {
  //   let inputMap = new Map();
  // //  this.addonblur.emit({});
  //   // await this.Handler.onAddTypeChange();
  // }


  // async AD_CITY_blur(event) {
  //   let inputMap = new Map();
  //   // this.Handler.updateAddressTags();
  // }
  async AD_PINCODE_blur(event) {
    const inputMap = new Map();
    inputMap.set('PathParam.PinCd', event.value);
    // inputMap.set('QueryParam.CountryCode',this.services.rloui.getConfig('country.code.default'));
    //  console.log('shweta :: def country',this.services.rloui.getConfig('country.code.default'));
    inputMap.set('QueryParam.CountryCode', this.services.rloui.getConfig('country.code.default'));
    this.services.http.fetchApi('/MasterPincodeDtls/{PinCd}', 'GET', inputMap, '/masters').subscribe(
      async (httpResponse: HttpResponse<any>) => {
        const res = httpResponse.body;
        // console.log("res", res);
        if (res == null) {
          this.AD_PINCODE.setError('rlo.error.pincode.invalid');
          this.AD_REGION.onReset();
          this.AD_CITY.onReset();
          this.AD_STATE.onReset();
          this.AD_COUNTRY.onReset();
          setTimeout(() => {
            this.AD_PINCODE.onReset();
          }, 5000);

          return 1;

        } else {
          this.AD_REGION.setValue(res['MasterPincodeDtls']['UDF1']);
          this.AD_STATE.setValue(res['MasterPincodeDtls']['StateCd']['StateName']);
          this.AD_CITY.setValue(res['MasterPincodeDtls']['CityCd']['CityName']);
          this.AD_COUNTRY.setValue(res['MasterPincodeDtls']['CountryDetails']['CountryName']);
        }

      },

    );
  }

  // onAlterEmailClick() {
  //   if (this.AD_EMAIL_ID2.getFieldValue() == undefined && this.AD_EMAIL2_CHECKBOX.getFieldValue() == true) {
  //     this.services.alert.showAlert(2, 'rlo.error.email.address', -1);
  //     return;
  //   }
  // }

  async AD_SAVE_ADDRESS_click(event) {
    let serviceName;
    let method;
    const inputMap = new Map();
    const addGridData: any = this.AddressGrid.getAddressGridData();
    const noOfError: number = await this.revalidate();
    if (this.AD_EMAIL1_CHECKBOX.getFieldValue() == false && this.AD_EMAIL2_CHECKBOX.getFieldValue() == false) {
      this.AD_EMAIL1_CHECKBOX.setValue(true);
      this.EmailCheck = this.AD_EMAIL1_CHECKBOX.getFieldValue() + ',' + this.AD_EMAIL2_CHECKBOX.getFieldValue();
    }
    else {
      this.EmailCheck = this.AD_EMAIL1_CHECKBOX.getFieldValue() + ',' + this.AD_EMAIL2_CHECKBOX.getFieldValue();
    }

    if (noOfError === 0) {

      if (addGridData) {

        for (let i = 0; i < addGridData.length; i++) {
          if (addGridData[i].AD_ADD_ID !== this.AD_HIDE_ID.getFieldValue()) { // Check if Editing Existing Address
            if ((this.CORR_ADD_CHECKBOX.getFieldValue() === true && addGridData[i].AD_MAILING_ADDRESS === 'true')) {
              this.services.alert.showAlert(2, 'rlo.error.mailing.address', -1);
              return;
            } else if (this.AD_OCCUPANCY_TYPE.getFieldValue() === 'CR' && addGridData[i].AD_OCCUP_TYPE === 'CR') {
              this.services.alert.showAlert(2, 'rlo.error.current.address', -1);
              return;
            } else if (this.AD_OCCUPANCY_TYPE.getFieldValue() === 'PR' && addGridData[i].AD_OCCUP_TYPE === 'PR') {
              this.services.alert.showAlert(2, 'rlo.error.permanent.address', -1);
              return;
            } else if (this.AD_ADD_TYPE.getFieldValue() == 'ML' && addGridData[i].AddressTypeId === 'ML') {
              if (this.services.rloCommonData.globalApplicationDtls.CustomerType == 'C' && this.activeApplicantType == 'B') {
                this.services.alert.showAlert(2, 'rlo.error.canara-registered-address.exist', -1);
              } else {
                this.services.alert.showAlert(2, 'rlo.error.canara-mailing-address.exist', -1);
              }

              return;
            } else if (this.AD_ADD_TYPE.getFieldValue() == 'PR' && addGridData[i].AddressTypeId === 'PR') {
              this.services.alert.showAlert(2, 'rlo.error.permanent.address', -1);
              return;
            }
            if (this.AD_ADD_TYPE.getFieldValue() === 'OF' && addGridData[i].AD_Address_Type.id === 'OF') {
              if (addGridData[i].AD_Address === this.Handler.getFullAddress()) {
                this.services.alert.showAlert(2, 'rlo.error.address.exist', -1);
                return;
              }
            }
          }
        }
      }
      if (this.AD_ADD_TYPE.getFieldValue() === 'OF') {
        // tslint:disable-next-line:max-line-length
        if (this.AD_RES_DUR.getFieldValue() !== undefined && this.AD_RES_DUR.getFieldValue() !== '' && this.AD_RES_DUR_UNIT.getFieldValue() === undefined) {
          this.services.alert.showAlert(2, 'rlo.error.duration.not.exist', -1);
          return;
          // tslint:disable-next-line:max-line-length
        } else if ((this.AD_RES_DUR.getFieldValue() === undefined || this.AD_RES_DUR.getFieldValue() === '') && this.AD_RES_DUR_UNIT.getFieldValue() !== undefined) {
          this.services.alert.showAlert(2, 'rlo.error.period.not.exist', -1);
          return;
        }
      }
      // tslint:disable-next-line:max-line-length
      // if ((this.AD_LANDLINE_NUMBER.getFieldValue() !== undefined && this.AD_LANDLINE_NUMBER.getFieldValue() !== '' && this.AD_LAND_COUNTRY_CODE.getFieldValue() === undefined) || (this.AD_ALTERNATE_MOB_NO.getFieldValue() !== undefined && this.AD_ALTERNATE_MOB_NO.getFieldValue() !== '' && this.AD_COUNTRY_CODE.getFieldValue() === undefined)) {
      //   this.services.alert.showAlert(2, 'rlo.error.code.address', -1);
      //   return;
      //   // tslint:disable-next-line:max-line-length
      // } else if ((this.AD_LANDLINE_NUMBER.getFieldValue() === undefined || this.AD_LANDLINE_NUMBER.getFieldValue() === '') && this.AD_LAND_COUNTRY_CODE.getFieldValue() !== undefined) {
      //   this.services.alert.showAlert(2, 'rlo.error.landline.address', -1);
      //   return;
      //   // tslint:disable-next-line:max-line-length
      // } else if ((this.AD_ALTERNATE_MOB_NO.getFieldValue() === undefined || this.AD_ALTERNATE_MOB_NO.getFieldValue() === '') && this.AD_COUNTRY_CODE.getFieldValue() !== undefined) {
      //   this.services.alert.showAlert(2, 'rlo.error.mobile.address', -1);
      //   return;
      // if (this.AD_EMAIL1_CHECKBOX.getFieldValue() === false && this.AD_EMAIL2_CHECKBOX.getFieldValue() === false) {
      //   this.services.alert.showAlert(2, 'rlo.error.emailcheckbox.address', -1);
      //   return;
      // } else if (this.AD_EMAIL_ID2.getFieldValue() === undefined && this.AD_EMAIL2_CHECKBOX.getFieldValue() === true) {
      //   this.services.alert.showAlert(2, 'rlo.error.email.address', -1);
      //   return;
      // }
      inputMap.set('Body.AddressDetails', this.Handler.getAddressPostData());
      // const requestdata = this.requestParameterForAddressDetails();
      this.AD_SAVE_ADDRESS.setDisabled(true);
      // if (this.AD_HIDE_ID.getFieldValue() !== undefined) {
      //   serviceName = '/AddressDetails/{AddressDetailsSeq}';
      //   method = 'PUT';
      // } else {
      //   serviceName = '/AddressDetails';
      //   method = 'POST';
      // }
      this.services.http.fetchApi('/SaveAddressDetails', 'POST', inputMap, '/rlo-de').subscribe(
        async (httpResponse: HttpResponse<any>) => {
          const res = httpResponse.body;
          if (this.AD_HIDE_ID.getFieldValue() == undefined) {
            this.services.alert.showAlert(1, 'rlo.success.save.address', 5000);
          } else {
            this.services.alert.showAlert(1, 'rlo.success.update.address', 5000);
          }
          // await this.AddressGrid.gridDataLoad({
          //   'passBorrowerSeqToGrid': this.addBorrowerSeq,
          // });
          this.onReset();
          this.AD_SAVE_ADDRESS.setDisabled(false);
        },
        async (httpError) => {
          const err = httpError['error'];
          if (err != null && err['ErrorElementPath'] !== undefined && err['ErrorDescription'] !== undefined) {
            if (err['ErrorElementPath'] === 'AddressDetails.PreferredEmailForCommunication') {
              this.AD_CORR_EMAIL.setError(err['ErrorDescription']);
            }
            // else if (err['ErrorElementPath'] === 'AddressDetails.LandlineCountryCode') {
            //   this.AD_LAND_COUNTRY_CODE.setError(err['ErrorDescription']);
            // } 
            else if (err['ErrorElementPath'] === 'AddressDetails.AltMobileNo') {
              this.AD_ALTERNATE_MOB_NO.setError(err['ErrorDescription']);
            } else if (err['ErrorElementPath'] === 'AddressDetails.EmailId2') {
              this.AD_EMAIL_ID2.setError(err['ErrorDescription']);
            } else if (err['ErrorElementPath'] === 'AddressDetails.EmailId1') {
              // this.AD_EMAIL_ID1.setError(err['ErrorDescription']);
            } else if (err['ErrorElementPath'] === 'AddressDetails.MailingAddress') {
              this.CORR_ADD_CHECKBOX.setError(err['ErrorDescription']);
            } else if (err['ErrorElementPath'] === 'AddressDetails.LandlineNumber') {
              this.AD_LANDLINE_NUMBER.setError(err['ErrorDescription']);
            } else if (err['ErrorElementPath'] === 'AddressDetails.Landmark') {
              this.AD_LANDMARK.setError(err['ErrorDescription']);
            } else if (err['ErrorElementPath'] === 'AddressDetails.State') {
              this.AD_STATE.setError(err['ErrorDescription']);
            } else if (err['ErrorElementPath'] === 'AddressDetails.City') {
              this.AD_CITY.setError(err['ErrorDescription']);
            } else if (err['ErrorElementPath'] === 'AddressDetails.Region') {
              this.AD_REGION.setError(err['ErrorDescription']);
            } else if (err['ErrorElementPath'] === 'AddressDetails.PinCode') {
              this.AD_PINCODE.setError(err['ErrorDescription']);
            } else if (err['ErrorElementPath'] === 'AddressDetails.AddressLine4') {
              this.AD_ADDRESS_LINE4.setError(err['ErrorDescription']);
            } else if (err['ErrorElementPath'] === 'AddressDetails.AddressLine3') {
              this.AD_ADDRESS_LINE3.setError(err['ErrorDescription']);
            } else if (err['ErrorElementPath'] === 'AddressDetails.AddressLine2') {
              this.AD_ADDRESS_LINE2.setError(err['ErrorDescription']);
            } else if (err['ErrorElementPath'] === 'AddressDetails.AddressLine1') {
              this.AD_ADDRESS_LINE1.setError(err['ErrorDescription']);
            } else if (err['ErrorElementPath'] === 'AddressDetails.ResidenceType') {
              this.AD_OCCUPANCY_STATUS.setError(err['ErrorDescription']);
            } else if (err['ErrorElementPath'] === 'AddressDetails.Period') {
              this.AD_RES_DUR_UNIT.setError(err['ErrorDescription']);
            } else if (err['ErrorElementPath'] === 'AddressDetails.ResidenceDuration') {
              this.AD_RES_DUR.setError(err['ErrorDescription']);
            } else if (err['ErrorElementPath'] === 'AddressDetails.AddressType') {
              this.AD_ADD_TYPE.setError(err['ErrorDescription']);
            } else if (err['ErrorElementPath'] === 'AddressDetailsSeq') {
              this.AD_HIDE_ID.setError(err['ErrorDescription']);
            } else if (err['ErrorElementPath'] === 'AddressDetails.ResidenceType') {
              this.AD_OCCUPANCY_TYPE.setError(err['ErrorDescription']);
            } else if (err['ErrorElementPath'] === 'AddressDetails.PreferredTime') {
              this.AD_PREF_TIME.setError(err['ErrorDescription']);
            }
            // else if (err['ErrorElementPath'] === 'AddressDetails.MobileCountryCode') {
            //   this.AD_COUNTRY_CODE.setError(err['ErrorDescription']);
            // }
          }
          this.services.alert.showAlert(2, 'rlo.error.update.address', -1);
        }
      );
      this.AD_SAVE_ADDRESS.setDisabled(false);
    } else {
      this.services.alert.showAlert(2, 'rlo.error.invalid.form', -1);
    }

  }

  async AD_CLEAR_BTN_click(event) {
    const inputMap = new Map();
    const durationType: any = this.AD_RES_DUR_UNIT.getFieldValue();
    this.onReset();
    // console.log('durationType', durationType);
  }
  async AddressGrid_emitAddressDetails(event) {
    const inputMap = new Map();
    this.showSpinner();
    inputMap.clear();
    this.onReset();
    inputMap.set('PathParam.AddressDetailsSeq', event.addSeq);
    this.services.http.fetchApi('/AddressDetails/{AddressDetailsSeq}', 'GET', inputMap, '/rlo-de').subscribe(
      async (httpResponse: HttpResponse<any>) => {
        const res = httpResponse.body;
        this.AD_ADD_TYPE.setValue(res['AddressDetails']['AddressType']);
        this.AD_RES_DUR.setValue(res['AddressDetails']['ResidenceDuration']);
        this.AD_RES_DUR_UNIT.setValue(res['AddressDetails']['Period']['id']);
        this.AD_OCCUPANCY_STATUS.setValue(res['AddressDetails']['ResidenceType']['id']);
        this.AD_OCCUPANCY_TYPE.setValue(res['AddressDetails']['OccupancyType']['id']);
        this.AD_PREF_TIME.setValue(res['AddressDetails']['PreferredTime']['id']);
        this.AD_ADDRESS_LINE1.setValue(res['AddressDetails']['AddressLine1']);
        this.AD_ADDRESS_LINE2.setValue(res['AddressDetails']['AddressLine2']);
        this.AD_ADDRESS_LINE3.setValue(res['AddressDetails']['AddressLine3']);
        this.AD_ADDRESS_LINE4.setValue(res['AddressDetails']['AddressLine4']);
        this.AD_PINCODE.setValue(res['AddressDetails']['PinCode']);
        this.AD_REGION.setValue(res['AddressDetails']['Region']);
        this.AD_CITY.setValue(res['AddressDetails']['City']);
        this.AD_COUNTRY.setValue(res['AddressDetails']['Country']);
        this.AD_STATE.setValue(res['AddressDetails']['State']);
        this.AD_LANDMARK.setValue(res['AddressDetails']['Landmark']);
        // this.AD_EMAIL_ID1.setValue(res['AddressDetails']['EmailId1']);
        this.AD_EMAIL_ID2.setValue(res['AddressDetails']['EmailId2']);
        // this.AD_ALTERNATE_MOB_NO.setValue(res['AddressDetails']['AltMobileNo']);
        if (res['AddressDetails']['MobileCountryCode'] != undefined && res['AddressDetails']['MobileCountryCode'] != '') {
          this.AD_ALTERNATE_MOB_NO.setComponentSpecificValue(res['AddressDetails']['AltMobileNo'], res['AddressDetails']['MobileCountryCode']);
        } else {
          this.AD_ALTERNATE_MOB_NO.setComponentSpecificValue(res['AddressDetails']['AltMobileNo'], this.services.rloui.getConfig('mob.default.country.code'));
        }
        this.AD_HIDE_ID.setValue(res['AddressDetails']['AddressDetailsSeq']);
        if (res['AddressDetails']['LandlineCountryCode'] != undefined && res['AddressDetails']['LandlineCountryCode'] != '') {
          this.AD_LANDLINE_NUMBER.setComponentSpecificValue(res['AddressDetails']['LandlineNumber'], res['AddressDetails']['LandlineCountryCode']);
        } else {
          this.AD_LANDLINE_NUMBER.setComponentSpecificValue(res['AddressDetails']['LandlineNumber'], this.services.rloui.getConfig('mob.default.country.code'));
        }
        //  this.AD_LANDLINE_NUMBER.setValue(res['AddressDetails']['LandlineNumber']);
        const CorrsAdd = res['AddressDetails']['UDF3'];
        const IsSameAdd = res['AddressDetails']['IsSameAddress']
        if (CorrsAdd == 'true') {
          this.CORR_ADD_CHECKBOX.setValue(true);
        } else {
          this.CORR_ADD_CHECKBOX.setValue(false);
        }
        if (IsSameAdd == 'true') {
          this.SAME_ADDRESS.setValue(true);
        } else {
          this.SAME_ADDRESS.setValue(false);
        }
        const array = res['AddressDetails']['CorrespondenceEmailAddress'].split(',');
        if (array[0] === 'true') {
          this.AD_EMAIL1_CHECKBOX.setValue(true);
        }
        if (array[0] === 'false') {
          this.AD_EMAIL1_CHECKBOX.setValue(false);
        }
        if (array[1] === 'true') {
          this.AD_EMAIL2_CHECKBOX.setValue(true);
        }
        if (array[1] === 'false') {
          this.AD_EMAIL2_CHECKBOX.setValue(false);
        }
        this.hideSpinner();
        // await this.Handler.onAddTypeChange(); // removed for canara 
        this.AD_ADD_TYPE.setReadOnly(true); // changes to adjust canara requirements loop hole
        this.onCanaraAddressTypeChange(); // called for canara

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
  onCountrycodeChanged() {
    //console.log('country code changed ', this.CD_COUNTRY_CODE);
  }
  // AddressGrid_addressGridLoaded(event) {
  //   // console.log("Address grid Loaded");
  //   this.updateStageValidation.emit(event);
  // }
}
