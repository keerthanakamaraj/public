export class QDEModel {
HEADER : any;
CUSTOMER_DETAILS : any;
   FieldId_6 : any;
FieldId_5 : any;
   FieldId_9 : any;
setValue(res){
if(res){
if(res['HEADER']){this.HEADER = res['HEADER'];}
if(res['CUSTOMER_DETAILS']){this.CUSTOMER_DETAILS = res['CUSTOMER_DETAILS'];}
if(res['FieldId_9']){this.FieldId_9 = res['FieldId_9'];}

if(res['FieldId_6']){this.FieldId_6 = res['FieldId_6'];}
if(res['FieldId_5']){this.FieldId_5 = res['FieldId_5'];}
}
}
}