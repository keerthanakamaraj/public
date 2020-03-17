export class HeaderModel {
HD_PROD_CAT: string;
HD_PROD: string;
HD_SUB_PROD: string;
HD_SCHEME: string;
HD_PROMOTION: string;
LD_LOAN_AMT: string;
LD_INTEREST_RATE: string;
LD_TENURE: string;
LD_TENURE_PERIOD: string;
LD_APP_PRPSE: string;
LD_SYS_RCMD_AMT: string;
LD_USR_RCMD_AMT: string;
setValue(res){
if(res){
if(res['HD_PROD_CAT']){this.HD_PROD_CAT = res['HD_PROD_CAT'];}
if(res['HD_PROD']){this.HD_PROD = res['HD_PROD'];}
if(res['HD_SUB_PROD']){this.HD_SUB_PROD = res['HD_SUB_PROD'];}
if(res['HD_SCHEME']){this.HD_SCHEME = res['HD_SCHEME'];}
if(res['HD_PROMOTION']){this.HD_PROMOTION = res['HD_PROMOTION'];}
if(res['LD_LOAN_AMT']){this.LD_LOAN_AMT = res['LD_LOAN_AMT'];}
if(res['LD_INTEREST_RATE']){this.LD_INTEREST_RATE = res['LD_INTEREST_RATE'];}
if(res['LD_TENURE']){this.LD_TENURE = res['LD_TENURE'];}
if(res['LD_TENURE_PERIOD']){this.LD_TENURE_PERIOD = res['LD_TENURE_PERIOD'];}
if(res['LD_APP_PRPSE']){this.LD_APP_PRPSE = res['LD_APP_PRPSE'];}
if(res['LD_SYS_RCMD_AMT']){this.LD_SYS_RCMD_AMT = res['LD_SYS_RCMD_AMT'];}
if(res['LD_USR_RCMD_AMT']){this.LD_USR_RCMD_AMT = res['LD_USR_RCMD_AMT'];}
}
}
}
