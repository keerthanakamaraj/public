export class SaveLoanDetailsFormModel {
ARN: string;
IcifNumber: string;
Product: string;
setValue(res){
if(res){
if(res['ARN']){this.ARN = res['ARN'];}
if(res['IcifNumber']){this.IcifNumber = res['IcifNumber'];}
if(res['Product']){this.Product = res['Product'];}
}
}
}
