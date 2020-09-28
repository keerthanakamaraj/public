export class GoldDetailsModel {
GoldOrnamentType: string;
Karat: string;
Weight: string;
Currency: string;
Value: string;
Count: string;
LocalCurrencyEquivalent: string;
MarketRate_: string;
DateofMarketRateCapture: string;
AdditionalRemarks: string;
setValue(res){
if(res){
if(res['GoldOrnamentType']){this.GoldOrnamentType = res['GoldOrnamentType'];}
if(res['Karat']){this.Karat = res['Karat'];}
if(res['Weight']){this.Weight = res['Weight'];}
if(res['Currency']){this.Currency = res['Currency'];}
if(res['Value']){this.Value = res['Value'];}
if(res['Count']){this.Count = res['Count'];}
if(res['LocalCurrencyEquivalent']){this.LocalCurrencyEquivalent = res['LocalCurrencyEquivalent'];}
if(res['MarketRate_']){this.MarketRate_ = res['MarketRate_'];}
if(res['DateofMarketRateCapture']){this.DateofMarketRateCapture = res['DateofMarketRateCapture'];}
if(res['AdditionalRemarks']){this.AdditionalRemarks = res['AdditionalRemarks'];}
}
}
}