export class ApplicationDtlsModel {
AD_PHYSICAL_FORM_NO: string;
AD_DATE_OF_RECIEPT: string;
AD_EXISTING_CUSTOMER: string;
AD_SOURCING_CHANNEL: string;
AD_DSA_ID: string;
AD_BRANCH: string;
setValue(res){
if(res){
if(res['AD_PHYSICAL_FORM_NO']){this.AD_PHYSICAL_FORM_NO = res['AD_PHYSICAL_FORM_NO'];}
if(res['AD_DATE_OF_RECIEPT']){this.AD_DATE_OF_RECIEPT = res['AD_DATE_OF_RECIEPT'];}
if(res['AD_EXISTING_CUSTOMER']){this.AD_EXISTING_CUSTOMER = res['AD_EXISTING_CUSTOMER'];}
if(res['AD_SOURCING_CHANNEL']){this.AD_SOURCING_CHANNEL = res['AD_SOURCING_CHANNEL'];}
if(res['AD_DSA_ID']){this.AD_DSA_ID = res['AD_DSA_ID'];}
if(res['AD_BRANCH']){this.AD_BRANCH = res['AD_BRANCH'];}
}
}
}
