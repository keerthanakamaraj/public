export class TestAddLoanFormModel {
ARN: string;
LoanNo: string;
ICIF: string;
LoanAmt: string;
setValue(res){
if(res){
if(res['ARN']){this.ARN = res['ARN'];}
if(res['LoanNo']){this.LoanNo = res['LoanNo'];}
if(res['ICIF']){this.ICIF = res['ICIF'];}
if(res['LoanAmt']){this.LoanAmt = res['LoanAmt'];}
}
}
}
