export class OtherDeductionFormModel {
OD_OBILGATION_HEAD: string;
OD_OBLIGATION_FREQUENCY: string;
OD_Amount: string;
OD_CURRENCY: string;
OD_Equivalent_Amt: string;
setValue(res){
if(res){
if(res['OD_OBILGATION_HEAD']){this.OD_OBILGATION_HEAD = res['OD_OBILGATION_HEAD'];}
if(res['OD_OBLIGATION_FREQUENCY']){this.OD_OBLIGATION_FREQUENCY = res['OD_OBLIGATION_FREQUENCY'];}
if(res['OD_Amount']){this.OD_Amount = res['OD_Amount'];}
if(res['OD_CURRENCY']){this.OD_CURRENCY = res['OD_CURRENCY'];}
if(res['OD_Equivalent_Amt']){this.OD_Equivalent_Amt = res['OD_Equivalent_Amt'];}
}
}
}