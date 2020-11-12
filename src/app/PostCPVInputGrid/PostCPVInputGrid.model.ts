export class PostCPVInputGridModel {
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
//this.rowData[i].SrNo = row['SrNo'];
this.rowData[i].CustomerName = row['CustomerName'];
this.rowData[i].VerificationType = row['VerificationType'];
this.rowData[i].Details = row['Details'];
this.rowData[i].Agency = row['Agency'];
this.rowData[i].InitiatorRemarks = row['InitiatorRemarks'];
this.rowData[i].VerificationResult = row['VerificationResult'];
this.rowData[i].VerificationRemarks = row['VerificationRemarks'];
this.rowData[i].CompletionResult = row['CompletionResult'];
this.rowData[i].CompletionRemarks = row['CompletionRemarks'];
this.rowData[i].SaveVrfn = row['SaveVrfn'];
}
}
}
class row{
//SrNo : string = undefined;
CustomerName : string = undefined;
VerificationType : string = undefined;
Details : string = undefined;
Agency : string = undefined;
InitiatorRemarks : string = undefined;
VerificationResult : string = undefined;
VerificationRemarks : string = undefined;
CompletionResult : string = undefined;
CompletionRemarks : string = undefined;
SaveVrfn : string = undefined;
}
