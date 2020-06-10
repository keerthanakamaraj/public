export class ReferralDetailsFormModel {
RD_REF_NAME: string;
RD_REFERRER_RELATION: string;
RD_ISD_CODE: string;
RD_REF_NO: string;
RD_REFRRER_EMAILID: string;
RD_ADDRESSLINE1: string;
RD_ADDRESSLINE2: string;
RD_ADDRESSLINE3: string;
RD_ADDRESSLINE4: string;
RD_PINCODE: string;
RD_REGION: string;
RD_CITY: string;
RD_STATE: string;
RD_LANDMARK: string;
RD_COUNTRY_CODE1: string;
RD_PHONE1: string;
RD_COUNTRY_CODE2: string;
RD_PHONE2: string;
setValue(res){
if(res){
if(res['RD_REF_NAME']){this.RD_REF_NAME = res['RD_REF_NAME'];}
if(res['RD_REFERRER_RELATION']){this.RD_REFERRER_RELATION = res['RD_REFERRER_RELATION'];}
if(res['RD_ISD_CODE']){this.RD_ISD_CODE = res['RD_ISD_CODE'];}
if(res['RD_REF_NO']){this.RD_REF_NO = res['RD_REF_NO'];}
if(res['RD_REFRRER_EMAILID']){this.RD_REFRRER_EMAILID = res['RD_REFRRER_EMAILID'];}
if(res['RD_ADDRESSLINE1']){this.RD_ADDRESSLINE1 = res['RD_ADDRESSLINE1'];}
if(res['RD_ADDRESSLINE2']){this.RD_ADDRESSLINE2 = res['RD_ADDRESSLINE2'];}
if(res['RD_ADDRESSLINE3']){this.RD_ADDRESSLINE3 = res['RD_ADDRESSLINE3'];}
if(res['RD_ADDRESSLINE4']){this.RD_ADDRESSLINE4 = res['RD_ADDRESSLINE4'];}
if(res['RD_PINCODE']){this.RD_PINCODE = res['RD_PINCODE'];}
if(res['RD_REGION']){this.RD_REGION = res['RD_REGION'];}
if(res['RD_CITY']){this.RD_CITY = res['RD_CITY'];}
if(res['RD_STATE']){this.RD_STATE = res['RD_STATE'];}
if(res['RD_LANDMARK']){this.RD_LANDMARK = res['RD_LANDMARK'];}
if(res['RD_COUNTRY_CODE1']){this.RD_COUNTRY_CODE1 = res['RD_COUNTRY_CODE1'];}
if(res['RD_PHONE1']){this.RD_PHONE1 = res['RD_PHONE1'];}
if(res['RD_COUNTRY_CODE2']){this.RD_COUNTRY_CODE2 = res['RD_COUNTRY_CODE2'];}
if(res['RD_PHONE2']){this.RD_PHONE2 = res['RD_PHONE2'];}
}
}
}