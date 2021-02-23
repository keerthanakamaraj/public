import { Component, OnInit, Input } from '@angular/core';
import { AddressDetailsComponent } from './AddressDetails.component';
import { FieldComponent } from '../field/field.component';
import { RLOUIHandlerComponent } from '../rlouihandler/rlouihandler.component';

@Component({
  selector: 'app-address-handler',
  template: `<div style="display:none;"></div>`,
  styles: []
})
export class AddressHandlerComponent extends RLOUIHandlerComponent implements OnInit {
  @Input() MainComponent: AddressDetailsComponent;
  formName: string = "AddressDetails";

  ngOnInit() {
    // ngOnInit
  }

  // OnFormLoad
  onFormLoad(arg0: {}) {
    super.onFormLoad({});
    console.log("address is onload");

  }




  onAddTypeChange() {

    if (this.MainComponent.AD_ADD_TYPE.getFieldValue() == 'RS') {
      this.MainComponent.AD_OCCUPANCY_TYPE.setReadOnly(false);
      this.MainComponent.AD_OCCUPANCY_STATUS.setReadOnly(false);
      this.MainComponent.AD_OCCUPANCY_TYPE.mandatory = true;
      this.MainComponent.AD_OCCUPANCY_STATUS.mandatory = true;
      this.MainComponent.AD_RES_DUR_UNIT.mandatory = true;
      this.MainComponent.AD_RES_DUR.mandatory = true;
      this.MainComponent.CORR_ADD_CHECKBOX.setHidden(false);

    }
    else {
      this.MainComponent.AD_RES_DUR_UNIT.mandatory = false;
      this.MainComponent.AD_RES_DUR.mandatory = false;
      this.MainComponent.AD_OCCUPANCY_TYPE.onReset();
      this.MainComponent.AD_OCCUPANCY_STATUS.onReset();
      this.MainComponent.AD_OCCUPANCY_TYPE.setReadOnly(true);
      this.MainComponent.AD_OCCUPANCY_STATUS.setReadOnly(true);
      this.MainComponent.AD_OCCUPANCY_TYPE.mandatory = false;
      this.MainComponent.AD_OCCUPANCY_STATUS.mandatory = false;
      this.MainComponent.CORR_ADD_CHECKBOX.setHidden(true);

    }
  }


  getFullAddress() {
    let fullAddressArr = [];

    fullAddressArr.push(this.MainComponent.AD_ADDRESS_LINE1.getFieldValue());
    fullAddressArr.push(this.MainComponent.AD_ADDRESS_LINE2.getFieldValue());
    fullAddressArr.push(this.MainComponent.AD_ADDRESS_LINE3.getFieldValue());
    fullAddressArr.push(this.MainComponent.AD_ADDRESS_LINE4.getFieldValue());
    fullAddressArr.push(this.MainComponent.AD_REGION.getFieldValue().toUpperCase());
    fullAddressArr.push(this.MainComponent.AD_CITY.getFieldValue().toUpperCase());
    fullAddressArr.push(this.MainComponent.AD_STATE.getFieldValue().toUpperCase());
    fullAddressArr.push(this.MainComponent.AD_PINCODE.getFieldValue());
    fullAddressArr.push(this.MainComponent.AD_COUNTRY.getFieldValue());

    return this.MainComponent.services.rloutil.concatenate(fullAddressArr, ", ");
  }


  public getAddressPostData() {
    const GridAddress = this.MainComponent.AddressGrid.getAddressGridData();
    var AddressData = [];
    var AddType: string;
    var GridAddSeq: string;


    var tempObj = {};

    tempObj['AddressDetailsSeq'] = this.MainComponent.AD_HIDE_ID.getFieldValue();
    tempObj['AddressType'] = this.MainComponent.AD_ADD_TYPE.getFieldValue();
    tempObj['ResidenceType'] = this.MainComponent.AD_OCCUPANCY_STATUS.getFieldValue();
    tempObj['OccupancyType'] = this.MainComponent.AD_OCCUPANCY_TYPE.getFieldValue();
    tempObj['PreferredTime'] = this.MainComponent.AD_PREF_TIME.getFieldValue();
    tempObj['ResidenceDuration'] = this.MainComponent.AD_RES_DUR.getFieldValue();
    tempObj['Period'] = this.MainComponent.AD_RES_DUR_UNIT.getFieldValue();
    tempObj['AddressLine1'] = this.MainComponent.AD_ADDRESS_LINE1.getFieldValue();
    tempObj['AddressLine2'] = this.MainComponent.AD_ADDRESS_LINE2.getFieldValue();
    tempObj['AddressLine3'] = this.MainComponent.AD_ADDRESS_LINE3.getFieldValue();
    tempObj['AddressLine4'] = this.MainComponent.AD_ADDRESS_LINE4.getFieldValue();
    tempObj['PinCode'] = this.MainComponent.AD_PINCODE.getFieldValue();
    tempObj['Region'] = this.MainComponent.AD_REGION.getFieldValue();
    tempObj['City'] = this.MainComponent.AD_CITY.getFieldValue();
    tempObj['Country'] = this.MainComponent.AD_COUNTRY.getFieldValue();
    tempObj['State'] = this.MainComponent.AD_STATE.getFieldValue();
    tempObj['Landmark'] = this.MainComponent.AD_LANDMARK.getFieldValue();
    tempObj['LandlineNumber'] = this.MainComponent.AD_LANDLINE_NUMBER.getFieldValue();
    tempObj['LandlineCountryCode']=this.MainComponent.AD_LANDLINE_NUMBER.countryCode;
    tempObj['UDF3'] = this.MainComponent.CORR_ADD_CHECKBOX.getFieldValue();
    // tempObj['LoanOwnership'] = this.customers[i].loanOwnership;
    tempObj['EmailId2'] = this.MainComponent.AD_EMAIL_ID2.getFieldValue();
    tempObj['AltMobileNo'] = this.MainComponent.AD_ALTERNATE_MOB_NO.getFieldValue();
    tempObj['MobileCountryCode']=this.MainComponent.AD_ALTERNATE_MOB_NO.countryCode;
    tempObj['BorrowerSeq'] = this.MainComponent.activeBorrowerSeq;
    tempObj['CorrespondenceEmailAddress'] = this.MainComponent.EmailCheck;
  //  tempObj['IsSameAddress'] = this.MainComponent.SAME_ADDRESS.getFieldValue(); // for Canara Is same address flag would not be saved in DB



    AddressData.push(tempObj);




    if (this.MainComponent.SAME_ADDRESS.getFieldValue() == true) {
      if (this.MainComponent.AD_OCCUPANCY_TYPE.getFieldValue() == 'PR') {
        AddType = 'CR'
      } else if (this.MainComponent.AD_OCCUPANCY_TYPE.getFieldValue() == 'CR') {
        AddType = 'PR'
      } else if (this.MainComponent.AD_ADD_TYPE.getFieldValue() == 'PR') {
        AddType = 'ML'
      } else if (this.MainComponent.AD_ADD_TYPE.getFieldValue() == 'ML') {
        AddType = 'PR'
      }
      if (GridAddress.length > 0) {
        GridAddress.forEach(GridData => {
          if (this.MainComponent.AD_OCCUPANCY_TYPE.getFieldValue() == 'PR') {
            if (GridData.AD_OCCUP_TYPE == 'CR'){
              AddType = GridData.AD_OCCUP_TYPE
            GridAddSeq = GridData.AD_ADD_ID;
            }
          }
          else if (this.MainComponent.AD_OCCUPANCY_TYPE.getFieldValue() == 'CR') {
            if (GridData.AD_OCCUP_TYPE == 'PR'){
              AddType = GridData.AD_OCCUP_TYPE
            GridAddSeq = GridData.AD_ADD_ID;
            }
          }
          else if (this.MainComponent.AD_ADD_TYPE.getFieldValue() == 'PR') {
            if (GridData.AddressTypeId == 'ML'){
              AddType = GridData.AddressTypeId
            GridAddSeq = GridData.AD_ADD_ID;
            }
          }
          else if (this.MainComponent.AD_ADD_TYPE.getFieldValue() == 'ML') {
            if (GridData.AddressTypeId == 'PR'){
              AddType = GridData.AddressTypeId
            GridAddSeq = GridData.AD_ADD_ID;
            }
          }
        });
      }

      AddressData.push(
        {
          AddressDetailsSeq: GridAddSeq,
          // AddressType: this.MainComponent.AD_ADD_TYPE.getFieldValue(),  //removed for canara
          AddressType: AddType, //added for canara
          ResidenceType: this.MainComponent.AD_OCCUPANCY_STATUS.getFieldValue(),
          //  OccupancyType: AddType, //removed for canara
          PreferredTime: this.MainComponent.AD_PREF_TIME.getFieldValue(),
          ResidenceDuration: this.MainComponent.AD_RES_DUR.getFieldValue(),
          Period: this.MainComponent.AD_RES_DUR_UNIT.getFieldValue(),
          AddressLine1: this.MainComponent.AD_ADDRESS_LINE1.getFieldValue(),
          AddressLine2: this.MainComponent.AD_ADDRESS_LINE2.getFieldValue(),
          AddressLine3: this.MainComponent.AD_ADDRESS_LINE3.getFieldValue(),
          AddressLine4: this.MainComponent.AD_ADDRESS_LINE4.getFieldValue(),
          PinCode: this.MainComponent.AD_PINCODE.getFieldValue(),
          Region: this.MainComponent.AD_REGION.getFieldValue(),
          City: this.MainComponent.AD_CITY.getFieldValue(),
          Country: this.MainComponent.AD_COUNTRY.getFieldValue(),
          State: this.MainComponent.AD_STATE.getFieldValue(),
          Landmark: this.MainComponent.AD_LANDMARK.getFieldValue(),
          LandlineNumber: this.MainComponent.AD_LANDLINE_NUMBER.getFieldValue(),
          UDF3: this.MainComponent.CORR_ADD_CHECKBOX.getFieldValue(),
          // LoanOwnership: this.customers[i].loanOwnership,
          EmailId2: this.MainComponent.AD_EMAIL_ID2.getFieldValue(),
          AltMobileNo: this.MainComponent.AD_ALTERNATE_MOB_NO.getFieldValue(),
          BorrowerSeq: this.MainComponent.activeBorrowerSeq,
          CorrespondenceEmailAddress: this.MainComponent.EmailCheck,
     //     IsSameAddress: this.MainComponent.SAME_ADDRESS.getFieldValue() //for Canara Is same address flag would not be saved in DB

        });
    }


    return AddressData;
  }

}

