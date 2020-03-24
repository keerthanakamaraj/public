export class QDEModel {
HEADER : any;
CUSTOMER_DETAILS : any;
setValue(res){
if(res){
if(res['HEADER']){this.HEADER = res['HEADER'];}
if(res['CUSTOMER_DETAILS']){this.CUSTOMER_DETAILS = res['CUSTOMER_DETAILS'];}
}
}
}