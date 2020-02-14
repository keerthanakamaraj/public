export class IncomeSummaryFormModel {
IS_TOTAL_INCOME: string;
IS_NET_INCOME: string;
IS_TOTAL_OBLIGATION: string;
IS_DBR: string;
IS_TOTAL_LIABILITY: string;
setValue(res){
if(res){
if(res['IS_TOTAL_INCOME']){this.IS_TOTAL_INCOME = res['IS_TOTAL_INCOME'];}
if(res['IS_NET_INCOME']){this.IS_NET_INCOME = res['IS_NET_INCOME'];}
if(res['IS_TOTAL_OBLIGATION']){this.IS_TOTAL_OBLIGATION = res['IS_TOTAL_OBLIGATION'];}
if(res['IS_DBR']){this.IS_DBR = res['IS_DBR'];}
if(res['IS_TOTAL_LIABILITY']){this.IS_TOTAL_LIABILITY = res['IS_TOTAL_LIABILITY'];}
}
}
}
