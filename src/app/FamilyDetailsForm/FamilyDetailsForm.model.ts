export class FamilyDetailsFormModel {
FD_TITLE: string;
FD_FIRST_NAME: string;
FD_MIDDLE_NAME: string;
FD_LAST_NAME: string;
FD_FULL_NAME: string;
FD_GENDER: string;
FD_DOB: string;
FD_MOBILE: string;
FD_RELATIONSHIP: string;
FD_NATIONAL_ID: string;
FD_TAX_ID: string;
setValue(res){
if(res){
if(res['FD_TITLE']){this.FD_TITLE = res['FD_TITLE'];}
if(res['FD_FIRST_NAME']){this.FD_FIRST_NAME = res['FD_FIRST_NAME'];}
if(res['FD_MIDDLE_NAME']){this.FD_MIDDLE_NAME = res['FD_MIDDLE_NAME'];}
if(res['FD_LAST_NAME']){this.FD_LAST_NAME = res['FD_LAST_NAME'];}
if(res['FD_FULL_NAME']){this.FD_FULL_NAME = res['FD_FULL_NAME'];}
if(res['FD_GENDER']){this.FD_GENDER = res['FD_GENDER'];}
if(res['FD_DOB']){this.FD_DOB = res['FD_DOB'];}
if(res['FD_MOBILE']){this.FD_MOBILE = res['FD_MOBILE'];}
if(res['FD_RELATIONSHIP']){this.FD_RELATIONSHIP = res['FD_RELATIONSHIP'];}
if(res['FD_NATIONAL_ID']){this.FD_NATIONAL_ID = res['FD_NATIONAL_ID'];}
if(res['FD_TAX_ID']){this.FD_TAX_ID = res['FD_TAX_ID'];}
}
}
}