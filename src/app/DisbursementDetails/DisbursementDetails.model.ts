export class DisbursementDetailsModel {
DisbursalTo: string;
DisbursalDate: string;
Currency: string;
Amount: string;
LocalCurrencyEquivalent: string;
PaymentMode: string;
InFavorOf: string;
FundTransferMode: string;
IFSCCode: string;
FDAmount: string;
Remarks: string;
setValue(res){
if(res){
if(res['DisbursalTo']){this.DisbursalTo = res['DisbursalTo'];}
if(res['DisbursalDate']){this.DisbursalDate = res['DisbursalDate'];}
if(res['Currency']){this.Currency = res['Currency'];}
if(res['Amount']){this.Amount = res['Amount'];}
if(res['LocalCurrencyEquivalent']){this.LocalCurrencyEquivalent = res['LocalCurrencyEquivalent'];}
if(res['PaymentMode']){this.PaymentMode = res['PaymentMode'];}
if(res['InFavorOf']){this.InFavorOf = res['InFavorOf'];}
if(res['FundTransferMode']){this.FundTransferMode = res['FundTransferMode'];}
if(res['IFSCCode']){this.IFSCCode = res['IFSCCode'];}
if(res['Account']){this.FDAmount = res['Account'];}
if(res['Remarks']){this.Remarks = res['Remarks'];}
}
}
}