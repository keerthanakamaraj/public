export class ReferralDetailsFormModel {
RD_REF_NAME: string;
RD_REF_NO: string;
setValue(res){
if(res){
if(res['RD_REF_NAME']){this.RD_REF_NAME = res['RD_REF_NAME'];}
if(res['RD_REF_NO']){this.RD_REF_NO = res['RD_REF_NO'];}
}
}
}