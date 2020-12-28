export class CreditCardInputGridModel {
rowData = new Array<row>();
addRecord(rowNo?: number): number {
let addedRowNo: number;
if(rowNo!=undefined){
this.rowData.splice(rowNo+1, 0, new row());
addedRowNo = rowNo + 1;
}else{
this.rowData.push(new row());
addedRowNo = this.rowData.length - 1;
}
return addedRowNo;
}
deleteRecord(rowNo){
this.rowData.splice(rowNo, 1);
}
clearAll(){
this.rowData = new Array<row>();
}
clearRowData(){
this.rowData = new Array<row>();
}
setValue(input){
for(var i = 0; i < input.length; i++){
let row = input[i];
this.addRecord();
this.rowData[i].SrNo = row['SrNo'];
this.rowData[i].MemberName = row['MemberName'];
this.rowData[i].CardNumber = row['CardNumber'];
this.rowData[i].CardStatus = row['CardStatus'];
this.rowData[i].LatestLimitDate = row['LatestLimitDate'];
this.rowData[i].ExistingCardLimit = row['ExistingCardLimit'];
this.rowData[i].ExistingCashLimit = row['ExistingCashLimit'];
this.rowData[i].RequestedCardLimit = row['RequestedCardLimit'];
this.rowData[i].ProposedCardLimit = row['ProposedCardLimit'];
this.rowData[i].ProposedCashLimit = row['ProposedCashLimit'];

}
}
}
class row{
SrNo : string = undefined;
MemberName : string = undefined;
CardNumber : string = undefined;
CardStatus: string = undefined;
LatestLimitDate : string = undefined;
ExistingCardLimit : string = undefined;
ExistingCashLimit : string = undefined;
RequestedCardLimit: string = undefined;
ProposedCardLimit : string = undefined;
ProposedCashLimit : string = undefined;
}
