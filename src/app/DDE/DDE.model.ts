import { Type } from "@angular/core";

export class DDEModel {
FieldId_1 : any;
CUST_DTLS : any;
FAMILY_DTLS : any;
FieldId_14 : any;
FieldId_15 : any;
FieldId_6 : any;
FieldId_9 : any;
FieldId_16 : any;
FieldId_13 : any;
//CUSTOMER_GRID: any;
setValue(res){
if(res){
if(res['FieldId_1']){this.FieldId_1 = res['FieldId_1'];}
if(res['CUST_DTLS']){this.CUST_DTLS = res['CUST_DTLS'];}
if(res['FAMILY_DTLS']){this.FAMILY_DTLS = res['FAMILY_DTLS'];}
if(res['FieldId_14']){this.FieldId_14 = res['FieldId_14'];}
if(res['FieldId_15']){this.FieldId_15 = res['FieldId_15'];}
if(res['FieldId_6']){this.FieldId_6 = res['FieldId_6'];}
if(res['FieldId_9']){this.FieldId_9 = res['FieldId_9'];}
if(res['FieldId_16']){this.FieldId_16 = res['FieldId_16'];}
if(res['FieldId_13']){this.FieldId_13 = res['FieldId_13'];}
//if(res['CUSTOMER_GRID']){this.CUSTOMER_GRID= res['CUSTOMER_GRID'];}
}
}
}


export class AddSpecificComponent {
    constructor(public component: Type<any>) { }
}