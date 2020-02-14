export class TestLoanModalModel {
ARN: string;
setValue(res){
if(res){
if(res['ARN']){this.ARN = res['ARN'];}
}
}
}
