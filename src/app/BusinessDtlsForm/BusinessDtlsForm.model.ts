export class BusinessDtlsFormModel {
GSTNumber: string;
UAadhaar: string;
PaidUpCapital: string;
FYTurnover: string;
FYNetProfit: string;
OrgNature: string;
Constitution: string;
Industry: string;
setValue(res){
if(res){
if(res['GSTNumber']){this.GSTNumber = res['GSTNumber'];}
if(res['UAadhaar']){this.UAadhaar = res['UAadhaar'];}
if(res['PaidUpCapital']){this.PaidUpCapital = res['PaidUpCapital'];}
if(res['FYTurnover']){this.FYTurnover = res['FYTurnover'];}
if(res['FYNetProfit']){this.FYNetProfit = res['FYNetProfit'];}
if(res['OrgNature']){this.OrgNature = res['OrgNature'];}
if(res['Constitution']){this.Constitution = res['Constitution'];}
if(res['Industry']){this.Industry = res['Industry'];}
}
}
}