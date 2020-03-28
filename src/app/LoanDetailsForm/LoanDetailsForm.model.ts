export class LoanDetailsFormModel {
LD_LOAN_AMT: string;
LD_INTEREST_RATE: string;
LD_TENURE: string;
LD_TENURE_PERIOD: string;
LD_APP_PRPSE: string;
LD_SYS_RCMD_AMT: string;
LD_USR_RCMD_AMT: string;
setValue(res){
if(res){
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