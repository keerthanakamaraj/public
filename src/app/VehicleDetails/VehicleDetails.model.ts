export class VehicleDetailsModel {
VehicleCategory: string;
Manufacturer: string;
Make: string;
Variant: string;
Model: string;
AssetType_: string;
AssetLife_: string;
NameoftheDealer: string;
DealerCode: string;
FieldId_13 : any;
Currency: string;
FundsbyCustomer: string;
LocalCurrencyEquivalent: string;
LoanRequired: string;
setValue(res){
if(res){
if(res['VehicleCategory']){this.VehicleCategory = res['VehicleCategory'];}
if(res['Manufacturer']){this.Manufacturer = res['Manufacturer'];}
if(res['Make']){this.Make = res['Make'];}
if(res['Variant']){this.Variant = res['Variant'];}
if(res['Model']){this.Model = res['Model'];}
if(res['AssetType_']){this.AssetType_ = res['AssetType_'];}
if(res['AssetLife_']){this.AssetLife_ = res['AssetLife_'];}
if(res['NameoftheDealer']){this.NameoftheDealer = res['NameoftheDealer'];}
if(res['DealerCode']){this.DealerCode = res['DealerCode'];}
if(res['FieldId_13']){this.FieldId_13 = res['FieldId_13'];}
if(res['Currency']){this.Currency = res['Currency'];}
if(res['FundsbyCustomer']){this.FundsbyCustomer = res['FundsbyCustomer'];}
if(res['LocalCurrencyEquivalent']){this.LocalCurrencyEquivalent = res['LocalCurrencyEquivalent'];}
if(res['LoanRequired']){this.LoanRequired = res['LoanRequired'];}
}
}
}