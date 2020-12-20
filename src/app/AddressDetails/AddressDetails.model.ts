export class AddressDetailsModel {
  AD_CUST_TYPE: string;
  AD_ADDRESS_TYPE: string;
  AD_RES_DUR: string;
  AD_RES_DUR_UNIT: string;
  AD_RESIDENCE_TYPE: string;
  AD_ADDRESS_LINE1: string;
  AD_ADDRESS_LINE2: string;
  AD_ADDRESS_LINE3: string;
  AD_ADDRESS_LINE4: string;
  AD_PINCODE: string;
  AD_REGION: string;
  AD_CITY: string;
  AD_STATE: string;
  AD_LANDMARK: string;
  AD_LANDLINE_NUMBER: string;
  AD_MAILING_ADDRESS: string;
  AD_EMAIL_ID1: string;
  AD_EMAIL1_CHECKBOX: string;
  AD_EMAIL_ID2: string;
  AD_EMAIL2_CHECKBOX: string;
  AD_ALTERNATE_MOB_NO: string;
  setValue(res) {
    if (res) {
      if (res['AD_CUST_TYPE']) { this.AD_CUST_TYPE = res['AD_CUST_TYPE']; }
      if (res['AD_ADDRESS_TYPE']) { this.AD_ADDRESS_TYPE = res['AD_ADDRESS_TYPE']; }
      if (res['AD_RES_DUR']) { this.AD_RES_DUR = res['AD_RES_DUR']; }
      if (res['AD_RES_DUR_UNIT']) { this.AD_RES_DUR_UNIT = res['AD_RES_DUR_UNIT']; }
      if (res['AD_RESIDENCE_TYPE']) { this.AD_RESIDENCE_TYPE = res['AD_RESIDENCE_TYPE']; }
      if (res['AD_ADDRESS_LINE1']) { this.AD_ADDRESS_LINE1 = res['AD_ADDRESS_LINE1']; }
      if (res['AD_ADDRESS_LINE2']) { this.AD_ADDRESS_LINE2 = res['AD_ADDRESS_LINE2']; }
      if (res['AD_ADDRESS_LINE3']) { this.AD_ADDRESS_LINE3 = res['AD_ADDRESS_LINE3']; }
      if (res['AD_ADDRESS_LINE4']) { this.AD_ADDRESS_LINE4 = res['AD_ADDRESS_LINE4']; }
      if (res['AD_PINCODE']) { this.AD_PINCODE = res['AD_PINCODE']; }
      if (res['AD_REGION']) { this.AD_REGION = res['AD_REGION']; }
      if (res['AD_CITY']) { this.AD_CITY = res['AD_CITY']; }
      if (res['AD_STATE']) { this.AD_STATE = res['AD_STATE']; }
      if (res['AD_LANDMARK']) { this.AD_LANDMARK = res['AD_LANDMARK']; }
      if (res['AD_LANDLINE_NUMBER']) { this.AD_LANDLINE_NUMBER = res['AD_LANDLINE_NUMBER']; }
      if (res['AD_MAILING_ADDRESS']) { this.AD_MAILING_ADDRESS = res['AD_MAILING_ADDRESS']; }
      if (res['AD_EMAIL_ID1']) { this.AD_EMAIL_ID1 = res['AD_EMAIL_ID1']; }
      if (res['AD_EMAIL1_CHECKBOX']) { this.AD_EMAIL1_CHECKBOX = res['AD_EMAIL1_CHECKBOX']; }
      if (res['AD_EMAIL_ID2']) { this.AD_EMAIL_ID2 = res['AD_EMAIL_ID2']; }
      if (res['AD_EMAIL2_CHECKBOX']) { this.AD_EMAIL2_CHECKBOX = res['AD_EMAIL2_CHECKBOX']; }
      if (res['AD_ALTERNATE_MOB_NO']) { this.AD_ALTERNATE_MOB_NO = res['AD_ALTERNATE_MOB_NO']; }
    }
  }
}
