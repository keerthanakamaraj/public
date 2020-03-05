export class HeaderModel {
HD_PROD_CAT: string;
HD_PROD: string;
HD_SUB_PROD: string;
HD_SCHEME: string;
HD_PROMOTION: string;
HD_PRIME_USAGE: string;
setValue(res){
if(res){
if(res['HD_PROD_CAT']){this.HD_PROD_CAT = res['HD_PROD_CAT'];}
if(res['HD_PROD']){this.HD_PROD = res['HD_PROD'];}
if(res['HD_SUB_PROD']){this.HD_SUB_PROD = res['HD_SUB_PROD'];}
if(res['HD_SCHEME']){this.HD_SCHEME = res['HD_SCHEME'];}
if(res['HD_PROMOTION']){this.HD_PROMOTION = res['HD_PROMOTION'];}
if(res['HD_PRIME_USAGE']){this.HD_PRIME_USAGE = res['HD_PRIME_USAGE'];}
}
}
}
