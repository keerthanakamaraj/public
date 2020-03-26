export class CustomerDtlsModel {
CD_CUST_TYPE: string;
CD_CIF: string;
CD_CUST_ID: string;
CD_TITLE: string;
CD_FIRST_NAME: string;
CD_MIDDLE_NAME: string;
CD_LAST_NAME: string;
CD_FULL_NAME: string;
CD_GENDER: string;
CD_DOB: string;
CD_TAX_ID: string;
CD_MOBILE_NO: string;
CD_DEBIT_SCORE: string;
CD_CUST_SEGMENT: string;
CD_STAFF: string;
CD_STAFF_ID: string;
CD_LOAN_OWN: string;
CD_PRIME_USAGE: string;
CD_PMRY_EMBSR_NAME: string;
CD_NATIONALITY: string;
CD_CITIZENSHIP: string;
CD_VISA_VALID: string;
CD_MARITAL_STATUS: string;
CD_NATIONAL_ID: string;
CD_PASSPORT_NO: string;
CD_PASSPORT_EXPIRY: string;
CD_DRIVING_LICENSE: string;
CD_DRVNG_LCNSE_EXP_DT: string;
CD_PREF_COM_CH: string;
CD_PREF_LANG: string;
FieldId_29 : any;
FieldId_30 : any;
setValue(res){
if(res){
if(res['CD_CUST_TYPE']){this.CD_CUST_TYPE = res['CD_CUST_TYPE'];}
if(res['CD_CIF']){this.CD_CIF = res['CD_CIF'];}
if(res['CD_CUST_ID']){this.CD_CUST_ID = res['CD_CUST_ID'];}
if(res['CD_TITLE']){this.CD_TITLE = res['CD_TITLE'];}
if(res['CD_FIRST_NAME']){this.CD_FIRST_NAME = res['CD_FIRST_NAME'];}
if(res['CD_MIDDLE_NAME']){this.CD_MIDDLE_NAME = res['CD_MIDDLE_NAME'];}
if(res['CD_LAST_NAME']){this.CD_LAST_NAME = res['CD_LAST_NAME'];}
if(res['CD_FULL_NAME']){this.CD_FULL_NAME = res['CD_FULL_NAME'];}
if(res['CD_GENDER']){this.CD_GENDER = res['CD_GENDER'];}
if(res['CD_DOB']){this.CD_DOB = res['CD_DOB'];}
if(res['CD_TAX_ID']){this.CD_TAX_ID = res['CD_TAX_ID'];}
if(res['CD_MOBILE_NO']){this.CD_MOBILE_NO = res['CD_MOBILE_NO'];}
if(res['CD_DEBIT_SCORE']){this.CD_DEBIT_SCORE = res['CD_DEBIT_SCORE'];}
if(res['CD_CUST_SEGMENT']){this.CD_CUST_SEGMENT = res['CD_CUST_SEGMENT'];}
if(res['CD_STAFF']){this.CD_STAFF = res['CD_STAFF'];}
if(res['CD_STAFF_ID']){this.CD_STAFF_ID = res['CD_STAFF_ID'];}
if(res['CD_LOAN_OWN']){this.CD_LOAN_OWN = res['CD_LOAN_OWN'];}
if(res['CD_PRIME_USAGE']){this.CD_PRIME_USAGE = res['CD_PRIME_USAGE'];}
if(res['CD_PMRY_EMBSR_NAME']){this.CD_PMRY_EMBSR_NAME = res['CD_PMRY_EMBSR_NAME'];}
if(res['CD_NATIONALITY']){this.CD_NATIONALITY = res['CD_NATIONALITY'];}
if(res['CD_CITIZENSHIP']){this.CD_CITIZENSHIP = res['CD_CITIZENSHIP'];}
if(res['CD_VISA_VALID']){this.CD_VISA_VALID = res['CD_VISA_VALID'];}
if(res['CD_MARITAL_STATUS']){this.CD_MARITAL_STATUS = res['CD_MARITAL_STATUS'];}
if(res['CD_NATIONAL_ID']){this.CD_NATIONAL_ID = res['CD_NATIONAL_ID'];}
if(res['CD_PASSPORT_NO']){this.CD_PASSPORT_NO = res['CD_PASSPORT_NO'];}
if(res['CD_PASSPORT_EXPIRY']){this.CD_PASSPORT_EXPIRY = res['CD_PASSPORT_EXPIRY'];}
if(res['CD_DRIVING_LICENSE']){this.CD_DRIVING_LICENSE = res['CD_DRIVING_LICENSE'];}
if(res['CD_DRVNG_LCNSE_EXP_DT']){this.CD_DRVNG_LCNSE_EXP_DT = res['CD_DRVNG_LCNSE_EXP_DT'];}
if(res['CD_PREF_COM_CH']){this.CD_PREF_COM_CH = res['CD_PREF_COM_CH'];}
if(res['CD_PREF_LANG']){this.CD_PREF_LANG = res['CD_PREF_LANG'];}
if(res['FieldId_29']){this.FieldId_29 = res['FieldId_29'];}
if(res['FieldId_30']){this.FieldId_30 = res['FieldId_30'];}
}
}
}
