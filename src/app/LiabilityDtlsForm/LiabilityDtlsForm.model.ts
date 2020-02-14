export class LiabilityDtlsFormModel {
LD_FINANCIER_NAME: string;
LD_LOAN_STATUS: string;
LD_TYPE_OF_LOAN: string;
LD_LOAN_AMOUNT: string;
LD_LOAN_CLOSURE_DATE: string;
LD_LOAN_EMI: string;
LD_INCLUDE_IN_DBR: string;
LD_OS_AMOUNT: string;
LD_CURRENCY: string;
LD_EQUIVALENT_AMOUNT: string;
LD_LOAN_EMI_FREQUENCY: string;
setValue(res){
if(res){
if(res['LD_FINANCIER_NAME']){this.LD_FINANCIER_NAME = res['LD_FINANCIER_NAME'];}
if(res['LD_LOAN_STATUS']){this.LD_LOAN_STATUS = res['LD_LOAN_STATUS'];}
if(res['LD_TYPE_OF_LOAN']){this.LD_TYPE_OF_LOAN = res['LD_TYPE_OF_LOAN'];}
if(res['LD_LOAN_AMOUNT']){this.LD_LOAN_AMOUNT = res['LD_LOAN_AMOUNT'];}
if(res['LD_LOAN_CLOSURE_DATE']){this.LD_LOAN_CLOSURE_DATE = res['LD_LOAN_CLOSURE_DATE'];}
if(res['LD_LOAN_EMI']){this.LD_LOAN_EMI = res['LD_LOAN_EMI'];}
if(res['LD_INCLUDE_IN_DBR']){this.LD_INCLUDE_IN_DBR = res['LD_INCLUDE_IN_DBR'];}
if(res['LD_OS_AMOUNT']){this.LD_OS_AMOUNT = res['LD_OS_AMOUNT'];}
if(res['LD_CURRENCY']){this.LD_CURRENCY = res['LD_CURRENCY'];}
if(res['LD_EQUIVALENT_AMOUNT']){this.LD_EQUIVALENT_AMOUNT = res['LD_EQUIVALENT_AMOUNT'];}
if(res['LD_LOAN_EMI_FREQUENCY']){this.LD_LOAN_EMI_FREQUENCY = res['LD_LOAN_EMI_FREQUENCY'];}
}
}
}
