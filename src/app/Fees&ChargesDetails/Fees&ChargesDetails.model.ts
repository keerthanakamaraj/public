export class FeesChargesDetailsModel {
ChargeDescription: string;
ChargeType: string;
PartyType: string;
PartyName: string;
ChargeBasis: string;
ChargeRate: string;
ChargeAmount: string;
PeriodicCharge: string;
PeriodicStartDate: string;
PeriodicEndDate: string;
Frequency: string;
RateChargeOn: string;
ChargeCollection: string;
setValue(res){
if(res){
if(res['ChargeDescription']){this.ChargeDescription = res['ChargeDescription'];}
if(res['ChargeType']){this.ChargeType = res['ChargeType'];}
if(res['PartyType']){this.PartyType = res['PartyType'];}
if(res['PartyName']){this.PartyName = res['PartyName'];}
if(res['ChargeBasis']){this.ChargeBasis = res['ChargeBasis'];}
if(res['ChargeRate']){this.ChargeRate = res['ChargeRate'];}
if(res['ChargeAmount']){this.ChargeAmount = res['ChargeAmount'];}
if(res['PeriodicCharge']){this.PeriodicCharge = res['PeriodicCharge'];}
if(res['PeriodicStartDate']){this.PeriodicStartDate = res['PeriodicStartDate'];}
if(res['PeriodicEndDate']){this.PeriodicEndDate = res['PeriodicEndDate'];}
if(res['Frequency']){this.Frequency = res['Frequency'];}
if(res['RateChargeOn']){this.RateChargeOn = res['RateChargeOn'];}
if(res['ChargeCollection']){this.ChargeCollection = res['ChargeCollection'];}
}
}
}