export class DecisionAlertModel {
DecisionReason: string;
Remarks: string;
setValue(res){
if(res){
if(res['DecisionReason']){this.DecisionReason = res['DecisionReason'];}
if(res['Remarks']){this.Remarks = res['Remarks'];}
}
}
}