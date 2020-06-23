export class CreditCardDetailsModel {
Branch: string;
FrontPageCategory: string;
MaximumCardLimit: string;
ApprovedLimit: string;
SettlementAccountType: string;
SettlementAccountNo: string;
PaymentOption: string;
StmtDispatchMode: string;
ExistingCreditCard: string;
CardDispatchMode: string;
setValue(res){
if(res){
if(res['Branch']){this.Branch = res['Branch'];}
if(res['FrontPageCategory']){this.FrontPageCategory = res['FrontPageCategory'];}
if(res['MaximumCardLimit']){this.MaximumCardLimit = res['MaximumCardLimit'];}
if(res['ApprovedLimit']){this.ApprovedLimit = res['ApprovedLimit'];}
if(res['SettlementAccountType']){this.SettlementAccountType = res['SettlementAccountType'];}
if(res['SettlementAccountNo']){this.SettlementAccountNo = res['SettlementAccountNo'];}
if(res['PaymentOption']){this.PaymentOption = res['PaymentOption'];}
if(res['StmtDispatchMode']){this.StmtDispatchMode = res['StmtDispatchMode'];}
if(res['ExistingCreditCard']){this.ExistingCreditCard = res['ExistingCreditCard'];}
if(res['CardDispatchMode']){this.CardDispatchMode = res['CardDispatchMode'];}
}
}
}