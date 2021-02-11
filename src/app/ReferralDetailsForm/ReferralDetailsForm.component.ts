import { Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import { ReferralDetailsFormModel } from './ReferralDetailsForm.model';
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
import { ReferralDetailsGridComponent } from '../ReferralDetailsGrid/ReferralDetailsGrid.component';
import { ReferralDetailsFormHandlerComponent } from '../ReferralDetailsForm/referrer-handler.component';


const customCss: string = '';

@Component({
  selector: 'app-ReferralDetailsForm',
  templateUrl: './ReferralDetailsForm.component.html'
})
export class ReferralDetailsFormComponent extends FormComponent implements OnInit, AfterViewInit {
  @ViewChild('RD_REF_NAME', { static: false }) RD_REF_NAME: TextBoxComponent;
  @ViewChild('RD_REFERRER_RELATION', { static: false }) RD_REFERRER_RELATION: ComboBoxComponent;
  @ViewChild('RD_ISD_CODE', { static: false }) RD_ISD_CODE: ComboBoxComponent;
  @ViewChild('RD_REF_NO', { static: false }) RD_REF_NO: TextBoxComponent;
  @ViewChild('RD_REFRRER_EMAILID', { static: false }) RD_REFRRER_EMAILID: TextBoxComponent;
  @ViewChild('RD_ADDRESSLINE1', { static: false }) RD_ADDRESSLINE1: TextBoxComponent;
  @ViewChild('RD_ADDRESSLINE2', { static: false }) RD_ADDRESSLINE2: TextBoxComponent;
  @ViewChild('RD_ADDRESSLINE3', { static: false }) RD_ADDRESSLINE3: TextBoxComponent;
  @ViewChild('RD_ADDRESSLINE4', { static: false }) RD_ADDRESSLINE4: TextBoxComponent;
  @ViewChild('RD_PINCODE', { static: false }) RD_PINCODE: TextBoxComponent;
  @ViewChild('RD_REGION', { static: false }) RD_REGION: TextBoxComponent;
  @ViewChild('RD_CITY', { static: false }) RD_CITY: TextBoxComponent;
  @ViewChild('RD_STATE', { static: false }) RD_STATE: TextBoxComponent;
  @ViewChild('RD_LANDMARK', { static: false }) RD_LANDMARK: TextBoxComponent;
  @ViewChild('RD_COUNTRY_CODE1', { static: false }) RD_COUNTRY_CODE1: ComboBoxComponent;
  @ViewChild('RD_PHONE1', { static: false }) RD_PHONE1: TextBoxComponent;
  @ViewChild('RD_COUNTRY_CODE2', { static: false }) RD_COUNTRY_CODE2: ComboBoxComponent;
  @ViewChild('RD_PHONE2', { static: false }) RD_PHONE2: TextBoxComponent;
  @ViewChild('RD_SAVE', { static: false }) RD_SAVE: ButtonComponent;
  @ViewChild('RD_RESET', { static: false }) RD_RESET: ButtonComponent;
  @ViewChild('ReferralDetailsGrid', { static: false }) ReferralDetailsGrid: ReferralDetailsGridComponent;
  @ViewChild('Handler', { static: false }) Handler: ReferralDetailsFormHandlerComponent;
  @ViewChild('AddBorrowerSeq', { static: false }) AddBorrowerSeq: HiddenComponent;
  @ViewChild('ReferrerBorrowerSeq', { static: false }) ReferrerBorrowerSeq: HiddenComponent;
  @ViewChild('RefAddBorrowerSeq', { static: false }) RefAddBorrowerSeq: HiddenComponent;
  @ViewChild('hidAppId', { static: false }) hidAppId: HiddenComponent;
  @ViewChild('hideISDCode', { static: false }) hideISDCode: HiddenComponent;
  @ViewChild('hidRelation', { static: false }) hidRelation: HiddenComponent;
  @ViewChild('RD_CIF', { static: false }) RD_CIF: ButtonComponent;

  @Input() ApplicationId: string = undefined;
  @Input() activeBorrowerSeq: string = undefined;
  @Input('readOnly') readOnly: boolean = false;
  //@Input() CustomerDetailsArray: any = undefined;
  cust_name: string;
  cust_dob: string;
  async revalidate(): Promise<number> {
    var totalErrors = 0;
    super.beforeRevalidate();
    await Promise.all([
      this.revalidateBasicField('RD_REF_NAME'),
      // this.revalidateBasicField('RD_REFERRER_RELATION'),
      // this.revalidateBasicField('RD_ISD_CODE'),
      this.revalidateBasicField('RD_REF_NO'),
      // this.revalidateBasicField('RD_REFRRER_EMAILID'),
      // this.revalidateBasicField('RD_ADDRESSLINE1'),
      // this.revalidateBasicField('RD_ADDRESSLINE2'),
      // this.revalidateBasicField('RD_ADDRESSLINE3'),
      // this.revalidateBasicField('RD_ADDRESSLINE4'),
      // this.revalidateBasicField('RD_PINCODE'),
      // this.revalidateBasicField('RD_REGION'),
      // this.revalidateBasicField('RD_CITY'),
      // this.revalidateBasicField('RD_STATE'),
      // this.revalidateBasicField('RD_LANDMARK'),
      // this.revalidateBasicField('RD_COUNTRY_CODE1'),
      // this.revalidateBasicField('RD_PHONE1'),
      // this.revalidateBasicField('RD_COUNTRY_CODE2'),
      // this.revalidateBasicField('RD_PHONE2'),
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
    this.value = new ReferralDetailsFormModel();
    this.componentCode = 'ReferralDetailsForm';
  }
  setReadOnly(readOnly) {
    super.setBasicFieldsReadOnly(readOnly);
  }
  async onFormLoad() {
    // this.ApplicationId = '2221';
    this.setInputs(this.services.dataStore.getData(this.services.routing.currModal));
    this.RD_REGION.setReadOnly(true);
    this.RD_CITY.setReadOnly(true);
    this.RD_STATE.setReadOnly(true);
    let inputMap = new Map();
    this.hidAppId.setValue('RLO');
    this.hideISDCode.setValue('ISD_COUNTRY_CODE');
    this.hidRelation.setValue('REFERRER_RELATION');
    this.RD_REFERRER_RELATION.setHidden(true);
    this.RD_REFRRER_EMAILID.setHidden(true);
    this.RD_ADDRESSLINE1.setHidden(true);
    this.RD_ADDRESSLINE2.setHidden(true);
    this.RD_ADDRESSLINE3.setHidden(true);
    this.RD_ADDRESSLINE4.setHidden(true);
    this.RD_PINCODE.setHidden(true);
    this.RD_REGION.setHidden(true);
    this.RD_CITY.setHidden(true);
    this.RD_STATE.setHidden(true);
    // this.RD_LANDMARK.setHidden(true);
    // this.RD_PHONE1.setHidden(true);
    // this.RD_PHONE2.setHidden(true);
    if (this.ApplicationId) {
      await this.ReferralDetailsGrid.gridDataLoad({
        'ApplicationId': this.ApplicationId,
      });
    }
   
    await this.Handler.onFormLoad({});

    //UW
    console.log(this.ReferralDetailsGrid.columnDefs);
    if (this.readOnly) {
      this.ReferralDetailsGrid.columnDefs = this.ReferralDetailsGrid.columnDefs.slice(0, 4);
      this.ReferralDetailsGrid.columnDefs[3].width = 12;
      this.ReferralDetailsGrid.columnDefs[3].cellRendererParams.CustomClass = "btn-views";
      this.ReferralDetailsGrid.columnDefs[3].cellRendererParams.IconClass = 'fas fa-eye fa-lg';
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
    this.submitData['formName'] = 'ReferralDetails';
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
    this.value = new ReferralDetailsFormModel();
    this.value.setValue(inputValue);
    this.setDependencies();
    this.passNewValue(this.value);
  }
  ngOnInit() {
    if (this.formCode == undefined) { this.formCode = 'ReferralDetailsForm'; }
    if (this.formOnLoadError) { return; }
    var styleElement = document.createElement('style');
    styleElement.type = 'text/css';
    styleElement.innerHTML = customCss;
    styleElement.id = 'ReferralDetailsForm_customCss';
    document.getElementsByTagName('head')[0].appendChild(styleElement);
  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    var styleElement = document.getElementById('ReferralDetailsForm_customCss');
    styleElement.parentNode.removeChild(styleElement);
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.subsBFldsValueUpdates();
      this.onFormLoad();
      this.checkForHTabOverFlow();

      //UW
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
    this.value = new ReferralDetailsFormModel();
    this.passNewValue(this.value);
    this.setReadOnly(false);
    this.onFormLoad();
  }
  async RD_PINCODE_blur(event) {
    let inputMap = new Map();
    inputMap.set('PathParam.PinCd', event.value)
    this.services.http.fetchApi('/MasterPincodeDtls/{PinCd}', 'GET', inputMap, '/masters').subscribe(
      async (httpResponse: HttpResponse<any>) => {
        var res = httpResponse.body;
        console.log("res", res);
        this.RD_REGION.setValue(res['MasterPincodeDtls']['UDF1'])
        this.RD_STATE.setValue(res['MasterPincodeDtls']['StateCd']['StateName'])
        this.RD_CITY.setValue(res['MasterPincodeDtls']['CityCd']['CityName'])

      },
    );
  }
  async RD_REF_NAME_blur(event) {
    let fullName = "";
    if (this.RD_REF_NAME.getFieldValue()) {
      fullName = fullName + this.RD_REF_NAME.getFieldValue().trim() + " ";
    }
    fullName.trim();
    this.RD_REF_NAME.setValue(fullName);
  }
  async RD_SAVE_click(event) {
    let inputMap = new Map();
    let referrerGridData: any = this.ReferralDetailsGrid.getReferrerGrid();
    var noOfError: number = await this.revalidate();
    // if (this.CustomerDetailsArray.FullName == this.RD_REF_NAME.getFieldValue() || this.CustomerDetailsArray.Email == this.RD_REFRRER_EMAILID.getFieldValue() || this.CustomerDetailsArray.MobileNo == this.RD_REF_NO.getFieldValue()) {
    // 	this.services.alert.showAlert(2, 'rlo.error.exist.breferrer', -1);
    // 	return;
    // }
    if (noOfError == 0) {
      let CustomerDetailsArray = [];
      CustomerDetailsArray = this.services.rloCommonData.getCustomerList();
     
      for (let i = 0; i < CustomerDetailsArray.length; i++) {
        if (CustomerDetailsArray[i].FullName.replace(/\s/g, "").toUpperCase() == this.RD_REF_NAME.getFieldValue().replace(/\s/g, "").toUpperCase() && CustomerDetailsArray[i].MobileNo == this.RD_REF_NO.getFieldValue()) {
          this.services.alert.showAlert(2, 'rlo.error.exist.breferrer', -1);
          return;
        }
      }
      if (referrerGridData) {
        for (var i = 0; i < referrerGridData.length; i++) {
          if (referrerGridData[i].Referrer_ID != this.ReferrerBorrowerSeq.getFieldValue()) { // Check if Editing Existing referrer
            if (referrerGridData[i].RD_REFERRER_NAME == this.RD_REF_NAME.getFieldValue() && referrerGridData[i].RD_REFERRER_RELATION == this.RD_REFERRER_RELATION.getFieldValue()) {
              this.services.alert.showAlert(2, 'rlo.error.exist.referrer', -1);
              return;
            }
          }
        }
      }

      if (this.ReferrerBorrowerSeq.getFieldValue() != undefined) {
        inputMap.clear();
        inputMap.set('PathParam.BorrowerSeq', this.ReferrerBorrowerSeq.getFieldValue());
        // inputMap.set('Body.ReferrerDetails.AddressDetails.AddressDetailsSeq', this.RefAddBorrowerSeq.getFieldValue());
        inputMap.set('Body.ReferrerDetails.ReferrerName', this.RD_REF_NAME.getFieldValue());
        inputMap.set('Body.ReferrerDetails.CIFNo', this.RD_CIF.getFieldValue());
        inputMap.set('Body.ReferrerDetails.ReferrerRelation', this.RD_REFERRER_RELATION.getFieldValue());
        // inputMap.set('Body.ReferrerDetails.CountryCode', this.RD_ISD_CODE.getFieldValue());
        inputMap.set('Body.ReferrerDetails.ReferrerMobileNumber', this.RD_REF_NO.getFieldValue());
        inputMap.set('Body.ReferrerDetails.ReferrerEmailID', this.RD_REFRRER_EMAILID.getFieldValue());
        inputMap.set('Body.ReferrerDetails.AddressDetails.AddressLine1', this.RD_ADDRESSLINE1.getFieldValue());
        inputMap.set('Body.ReferrerDetails.AddressDetails.AddressLine2', this.RD_ADDRESSLINE2.getFieldValue());
        inputMap.set('Body.ReferrerDetails.AddressDetails.AddressLine3', this.RD_ADDRESSLINE3.getFieldValue());
        inputMap.set('Body.ReferrerDetails.AddressDetails.AddressLine4', this.RD_ADDRESSLINE4.getFieldValue());
        inputMap.set('Body.ReferrerDetails.AddressDetails.PinCode', this.RD_PINCODE.getFieldValue());
        inputMap.set('Body.ReferrerDetails.AddressDetails.Region', this.RD_REGION.getFieldValue());
        inputMap.set('Body.ReferrerDetails.AddressDetails.City', this.RD_CITY.getFieldValue());
        inputMap.set('Body.ReferrerDetails.AddressDetails.State', this.RD_STATE.getFieldValue());
        // inputMap.set('Body.ReferrerDetails.AddressDetails.Landmark', this.RD_LANDMARK.getFieldValue());
        // inputMap.set('Body.ReferrerDetails.AddressDetails.LandlineCountryCode', this.RD_COUNTRY_CODE1.getFieldValue());
        // inputMap.set('Body.ReferrerDetails.AddressDetails.LandlineNumber', this.RD_PHONE1.getFieldValue());
        // inputMap.set('Body.ReferrerDetails.AddressDetails.MobileCountryCode', this.RD_COUNTRY_CODE2.getFieldValue());
        // inputMap.set('Body.ReferrerDetails.AddressDetails.AltMobileNo', this.RD_PHONE2.getFieldValue());
        inputMap.set('Body.ReferrerDetails.ApplicationId', this.ApplicationId);
        // inputMap.set('Body.ReferrerDetails.BorrowerSeq', this.activeBorrowerSeq);
        if (this.RD_REF_NAME.getFieldValue() == undefined || this.RD_REF_NAME.getFieldValue() == null) {
          this.services.alert.showAlert(2, 'rlo.error.fillone.rdetailsform', -1);
          return;
        }
        this.services.http.fetchApi('/ReferrerDetails/{BorrowerSeq}', 'PUT', inputMap, '/rlo-de').subscribe(
          async (httpResponse: HttpResponse<any>) => {
            var res = httpResponse.body;
            this.services.alert.showAlert(1, 'rlo.success.update.referrer', 5000);
            this.onReset();
          },
          async (httpError) => {
            var err = httpError['error']
            if (err != null && err['ErrorElementPath'] != undefined && err['ErrorDescription'] != undefined) {
              // if (err['ErrorElementPath'] == 'ReferrerDetails.AddressDetails.AltMobileNo') {
              //   this.RD_PHONE2.setError(err['ErrorDescription']);
              // }
              // else if (err['ErrorElementPath'] == 'ReferrerDetails.AddressDetails.MobileCountryCode') {
              // 	this.RD_COUNTRY_CODE2.setError(err['ErrorDescription']);
              // }
              // else if (err['ErrorElementPath'] == 'ReferrerDetails.AddressDetails.LandlineNumber') {
              //   this.RD_PHONE1.setError(err['ErrorDescription']);
              // }
              // else if (err['ErrorElementPath'] == 'ReferrerDetails.AddressDetails.LandlineCountryCode') {
              // 	this.RD_COUNTRY_CODE1.setError(err['ErrorDescription']);
              // }
              // else if (err['ErrorElementPath'] == 'ReferrerDetails.AddressDetails.Landmark') {
              //   this.RD_LANDMARK.setError(err['ErrorDescription']);
              // }
               if (err['ErrorElementPath'] == 'ReferrerDetails.AddressDetails.State') {
                this.RD_STATE.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'ReferrerDetails.AddressDetails.City') {
                this.RD_CITY.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'ReferrerDetails.AddressDetails.Region') {
                this.RD_REGION.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'ReferrerDetails.AddressDetails.PinCode') {
                this.RD_PINCODE.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'ReferrerDetails.AddressDetails.AddressLine4') {
                this.RD_ADDRESSLINE4.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'ReferrerDetails.AddressDetails.AddressLine3') {
                this.RD_ADDRESSLINE3.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'ReferrerDetails.AddressDetails.AddressLine2') {
                this.RD_ADDRESSLINE2.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'ReferrerDetails.AddressDetails.AddressLine1') {
                this.RD_ADDRESSLINE1.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'ReferrerDetails.ReferrerEmailID') {
                this.RD_REFRRER_EMAILID.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'ReferrerDetails.ReferrerMobileNumber') {
                this.RD_REF_NO.setError(err['ErrorDescription']);
              }
              // else if (err['ErrorElementPath'] == 'ReferrerDetails.CountryCode') {
              // 	this.RD_ISD_CODE.setError(err['ErrorDescription']);
              // }
              else if (err['ErrorElementPath'] == 'ReferrerDetails.ReferrerRelation') {
                this.RD_REFERRER_RELATION.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'ReferrerDetails.ReferrerName') {
                this.RD_REF_NAME.setError(err['ErrorDescription']);
              }
              else if (err['ErrorElementPath'] == 'BorrowerSeq') {
                this.ReferrerBorrowerSeq.setError(err['ErrorDescription']);
              }
            }
            this.services.alert.showAlert(2, 'rlo.error.update.referrer', -1);
          }
        );
      }
      else {
        inputMap.clear();
        inputMap.set('Body.ReferrerDetails.ReferrerName', this.RD_REF_NAME.getFieldValue());
        inputMap.set('Body.ReferrerDetails.CIFNo', this.RD_CIF.getFieldValue());
        inputMap.set('Body.ReferrerDetails.ReferrerRelation', this.RD_REFERRER_RELATION.getFieldValue());
        // inputMap.set('Body.ReferrerDetails.CountryCode', this.RD_ISD_CODE.getFieldValue());
        inputMap.set('Body.ReferrerDetails.ReferrerMobileNumber', this.RD_REF_NO.getFieldValue());
        inputMap.set('Body.ReferrerDetails.ReferrerEmailID', this.RD_REFRRER_EMAILID.getFieldValue());
        inputMap.set('Body.ReferrerDetails.AddressDetails.AddressLine1', this.RD_ADDRESSLINE1.getFieldValue());
        inputMap.set('Body.ReferrerDetails.AddressDetails.AddressLine2', this.RD_ADDRESSLINE2.getFieldValue());
        inputMap.set('Body.ReferrerDetails.AddressDetails.AddressLine3', this.RD_ADDRESSLINE3.getFieldValue());
        inputMap.set('Body.ReferrerDetails.AddressDetails.AddressLine4', this.RD_ADDRESSLINE4.getFieldValue());
        inputMap.set('Body.ReferrerDetails.AddressDetails.PinCode', this.RD_PINCODE.getFieldValue());
        inputMap.set('Body.ReferrerDetails.AddressDetails.Region', this.RD_REGION.getFieldValue());
        inputMap.set('Body.ReferrerDetails.AddressDetails.City', this.RD_CITY.getFieldValue());
        inputMap.set('Body.ReferrerDetails.AddressDetails.State', this.RD_STATE.getFieldValue());
        // inputMap.set('Body.ReferrerDetails.AddressDetails.Landmark', this.RD_LANDMARK.getFieldValue());
        // inputMap.set('Body.ReferrerDetails.AddressDetails.LandlineCountryCode', this.RD_COUNTRY_CODE1.getFieldValue());
        // inputMap.set('Body.ReferrerDetails.AddressDetails.LandlineNumber', this.RD_PHONE1.getFieldValue());
        // inputMap.set('Body.ReferrerDetails.AddressDetails.MobileCountryCode', this.RD_COUNTRY_CODE2.getFieldValue());
        // inputMap.set('Body.ReferrerDetails.AddressDetails.AltMobileNo', this.RD_PHONE2.getFieldValue());
        inputMap.set('Body.ReferrerDetails.ApplicationId', this.ApplicationId);
        // inputMap.set('Body.ReferrerDetails.BorrowerSeq', this.activeBorrowerSeq);
        inputMap.set('Body.ReferrerDetails.CustomerType', 'R');
        if (this.RD_REF_NAME.getFieldValue() == undefined || this.RD_REF_NAME.getFieldValue() == null) {
          this.services.alert.showAlert(2, 'rlo.error.fillone.rdetailsform', -1);
          return;
        }
        else {
          this.services.http.fetchApi('/ReferrerDetails', 'POST', inputMap, '/rlo-de').subscribe(
            async (httpResponse: HttpResponse<any>) => {
              var res = httpResponse.body;
              this.services.alert.showAlert(1, 'rlo.success.save.referrer', 5000);
              this.onReset();
            },
            async (httpError) => {
              var err = httpError['error']
              if (err != null && err['ErrorElementPath'] != undefined && err['ErrorDescription'] != undefined) {
                // if (err['ErrorElementPath'] == 'ReferrerDetails.AddressDetails.AltMobileNo') {
                //   this.RD_PHONE2.setError(err['ErrorDescription']);
                // }
                // else if (err['ErrorElementPath'] == 'ReferrerDetails.AddressDetails.MobileCountryCode') {
                // 	this.RD_COUNTRY_CODE2.setError(err['ErrorDescription']);
                // }
                // else if (err['ErrorElementPath'] == 'ReferrerDetails.AddressDetails.LandlineNumber') {
                //   this.RD_PHONE1.setError(err['ErrorDescription']);
                // }
                // else if (err['ErrorElementPath'] == 'ReferrerDetails.AddressDetails.LandlineCountryCode') {
                // 	this.RD_COUNTRY_CODE1.setError(err['ErrorDescription']);
                // }
                // else if (err['ErrorElementPath'] == 'ReferrerDetails.AddressDetails.Landmark') {
                //   this.RD_LANDMARK.setError(err['ErrorDescription']);
                // }
                 if (err['ErrorElementPath'] == 'ReferrerDetails.AddressDetails.State') {
                  this.RD_STATE.setError(err['ErrorDescription']);
                }
                else if (err['ErrorElementPath'] == 'ReferrerDetails.AddressDetails.City') {
                  this.RD_CITY.setError(err['ErrorDescription']);
                }
                else if (err['ErrorElementPath'] == 'ReferrerDetails.AddressDetails.Region') {
                  this.RD_REGION.setError(err['ErrorDescription']);
                }
                else if (err['ErrorElementPath'] == 'ReferrerDetails.AddressDetails.PinCode') {
                  this.RD_PINCODE.setError(err['ErrorDescription']);
                }
                else if (err['ErrorElementPath'] == 'ReferrerDetails.AddressDetails.AddressLine4') {
                  this.RD_ADDRESSLINE4.setError(err['ErrorDescription']);
                }
                else if (err['ErrorElementPath'] == 'ReferrerDetails.AddressDetails.AddressLine3') {
                  this.RD_ADDRESSLINE3.setError(err['ErrorDescription']);
                }
                else if (err['ErrorElementPath'] == 'ReferrerDetails.AddressDetails.AddressLine2') {
                  this.RD_ADDRESSLINE2.setError(err['ErrorDescription']);
                }
                else if (err['ErrorElementPath'] == 'ReferrerDetails.AddressDetails.AddressLine1') {
                  this.RD_ADDRESSLINE1.setError(err['ErrorDescription']);
                }
                else if (err['ErrorElementPath'] == 'ReferrerDetails.ReferrerEmailID') {
                  this.RD_REFRRER_EMAILID.setError(err['ErrorDescription']);
                }
                else if (err['ErrorElementPath'] == 'ReferrerDetails.ReferrerMobileNumber') {
                  this.RD_REF_NO.setError(err['ErrorDescription']);
                }
                // else if (err['ErrorElementPath'] == 'ReferrerDetails.CountryCode') {
                // 	this.RD_ISD_CODE.setError(err['ErrorDescription']);
                // }
                else if (err['ErrorElementPath'] == 'ReferrerDetails.ReferrerRelation') {
                  this.RD_REFERRER_RELATION.setError(err['ErrorDescription']);
                }
                else if (err['ErrorElementPath'] == 'ReferrerDetails.ReferrerName') {
                  this.RD_REF_NAME.setError(err['ErrorDescription']);
                }
              }
              this.services.alert.showAlert(2, 'rlo.error.save.referrer', -1);
            }
          );
        }
      }
    }
    else {
      this.services.alert.showAlert(2, 'rlo.error.invalid.form', -1);
    }
  }
  RD_RESET_click(event) {
    this.onReset();
  }
  async FieldId_6_EditReferrerDetails(event) {
    let inputMap = new Map();
    this.showSpinner();
    inputMap.clear();
    inputMap.set('PathParam.BorrowerSeq', event.SeqKey);
    this.services.http.fetchApi('/ReferrerDetails/{BorrowerSeq}', 'GET', inputMap, '/rlo-de').subscribe(
      async (httpResponse: HttpResponse<any>) => {
        var res = httpResponse.body;


        // this.AddBorrowerSeq.setValue(res['ReferrerDetails']['BorrowerSeq']);
        this.RD_REF_NAME.setValue(res['ReferrerDetails']['ReferrerName']);
        this.RD_REFERRER_RELATION.setValue(res['ReferrerDetails']['ReferrerRelation']['id']);
        this.RD_CIF.setValue(res['ReferrerDetails']['CIFNo']);
        this.RD_REF_NO.setValue(res['ReferrerDetails']['ReferrerMobileNumber']);
        this.RD_REFRRER_EMAILID.setValue(res['ReferrerDetails']['ReferrerEmailID']);
        if (('AddressDetails' in res['ReferrerDetails'])) {
          this.RD_ADDRESSLINE1.setValue(res['ReferrerDetails']['AddressDetails']['AddressLine1']);
          this.RD_ADDRESSLINE2.setValue(res['ReferrerDetails']['AddressDetails']['AddressLine2']);
          this.RD_ADDRESSLINE3.setValue(res['ReferrerDetails']['AddressDetails']['AddressLine3']);
          this.RD_ADDRESSLINE4.setValue(res['ReferrerDetails']['AddressDetails']['AddressLine4']);
          this.RD_PINCODE.setValue(res['ReferrerDetails']['AddressDetails']['PinCode']);
          this.RD_REGION.setValue(res['ReferrerDetails']['AddressDetails']['Region']);
          this.RD_CITY.setValue(res['ReferrerDetails']['AddressDetails']['City']);
          this.RD_STATE.setValue(res['ReferrerDetails']['AddressDetails']['State']);
          // this.RD_LANDMARK.setValue(res['ReferrerDetails']['AddressDetails']['Landmark']);
          // this.RD_COUNTRY_CODE1.setValue(res['ReferrerDetails']['AddressDetails']['LandlineCountryCode']);
          // this.RD_PHONE1.setValue(res['ReferrerDetails']['AddressDetails']['LandlineNumber']);
          // this.RD_COUNTRY_CODE2.setValue(res['ReferrerDetails']['AddressDetails']['MobileCountryCode']);
          // this.RD_PHONE2.setValue(res['ReferrerDetails']['AddressDetails']['AltMobileNo']);
          this.RefAddBorrowerSeq.setValue(res['ReferrerDetails']['AddressDetails']['AddressDetailsSeq']);
        }
        this.ReferrerBorrowerSeq.setValue(res['ReferrerDetails']['BorrowerSeq']);

        this.hideSpinner();
      },
      async (httpError) => {
        var err = httpError['error']
        if (err != null && err['ErrorElementPath'] != undefined && err['ErrorDescription'] != undefined) {
        }
        this.services.alert.showAlert(2, 'rlo.error.wrong.form', -1);
        this.hideSpinner();
      }
    );
  }
  fieldDependencies = {
    RD_REFERRER_RELATION: {
      inDep: [
        { paramKey: "VALUE1", depFieldID: "RD_REFERRER_RELATION", paramType: "PathParam" },
        { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
        { paramKey: "KEY1", depFieldID: "hidRelation", paramType: "QueryParam" },
      ],
      outDep: [
      ]
    },
    RD_PINCODE: {
      inDep: [
        { paramKey: "PinCd", depFieldID: "RD_PINCODE", paramType: "PathParam" },
      ],
      outDep: [

        { paramKey: "MasterPincodeDtls.CityCd.CityName", depFieldID: "RD_CITY" },
        { paramKey: "MasterPincodeDtls.StateCd.StateName", depFieldID: "RD_STATE" },
        { paramKey: "MasterPincodeDtls.UDF1", depFieldID: "RD_REGION" },
      ]
    },
  }

}
