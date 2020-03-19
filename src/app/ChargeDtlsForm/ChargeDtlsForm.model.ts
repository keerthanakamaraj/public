export class ChargeDtlsFormModel {
CH_CHARGE_DESC: string;
CH_CHARGE_TYPE: string;
CH_PARTY_TYPE: string;
CH_PARTY_NAME: string;
CH_CURRENCY: string;
CH_CHARGE_BASIS: string;
CH_CHARGE_RATE: string;
CH_CHARGE_AMT: string;
CH_PERIODIC_CHARGE: string;
CH_PRD_ST_DT: string;
CH_PRD_END_DT: string;
CH_FREQ: string;
CH_RT_CH_ON: string;
CH_COLL: string;
setValue(res){
if(res){
if(res['CH_CHARGE_DESC']){this.CH_CHARGE_DESC = res['CH_CHARGE_DESC'];}
if(res['CH_CHARGE_TYPE']){this.CH_CHARGE_TYPE = res['CH_CHARGE_TYPE'];}
if(res['CH_PARTY_TYPE']){this.CH_PARTY_TYPE = res['CH_PARTY_TYPE'];}
if(res['CH_PARTY_NAME']){this.CH_PARTY_NAME = res['CH_PARTY_NAME'];}
if(res['CH_CURRENCY']){this.CH_CURRENCY = res['CH_CURRENCY'];}
if(res['CH_CHARGE_BASIS']){this.CH_CHARGE_BASIS = res['CH_CHARGE_BASIS'];}
if(res['CH_CHARGE_RATE']){this.CH_CHARGE_RATE = res['CH_CHARGE_RATE'];}
if(res['CH_CHARGE_AMT']){this.CH_CHARGE_AMT = res['CH_CHARGE_AMT'];}
if(res['CH_PERIODIC_CHARGE']){this.CH_PERIODIC_CHARGE = res['CH_PERIODIC_CHARGE'];}
if(res['CH_PRD_ST_DT']){this.CH_PRD_ST_DT = res['CH_PRD_ST_DT'];}
if(res['CH_PRD_END_DT']){this.CH_PRD_END_DT = res['CH_PRD_END_DT'];}
if(res['CH_FREQ']){this.CH_FREQ = res['CH_FREQ'];}
if(res['CH_RT_CH_ON']){this.CH_RT_CH_ON = res['CH_RT_CH_ON'];}
if(res['CH_COLL']){this.CH_COLL = res['CH_COLL'];}
}
}
}
