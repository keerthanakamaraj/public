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
this.rowData[i].POSTCPV_SrNo = row['POSTCPV_SrNo'];
this.rowData[i].POSTCPV_CustomerName = row['POSTCPV_CustomerName'];
this.rowData[i].POSTCPV_VerificationType = row['POSTCPV_VerificationType'];
this.rowData[i].POSTCPV_Details = row['POSTCPV_Details'];
this.rowData[i].POSTCPV_AgencyName = row['POSTCPV_AgencyName'];
this.rowData[i].POSTCPV_InitiatorRemarks = row['POSTCPV_InitiatorRemarks'];
this.rowData[i].POSTCPV_VerificationResult_ = row['POSTCPV_VerificationResult_'];
this.rowData[i].POSTCPV_VerificationRemarks = row['POSTCPV_VerificationRemarks'];
this.rowData[i].POSTCPV_CompletionResult = row['POSTCPV_CompletionResult'];
this.rowData[i].POSTCPV_CompletionRemarks = row['POSTCPV_CompletionRemarks'];
this.rowData[i].POSTCPV_Report = row['POSTCPV_Report'];
}
}
}
class row{
POSTCPV_SrNo : string = undefined;
POSTCPV_CustomerName : string = undefined;
POSTCPV_VerificationType : string = undefined;
POSTCPV_Details : string = undefined;
POSTCPV_AgencyName : string = undefined;
POSTCPV_InitiatorRemarks : string = undefined;
POSTCPV_VerificationResult_ : string = undefined;
POSTCPV_VerificationRemarks : string = undefined;
POSTCPV_CompletionResult : string = undefined;
POSTCPV_CompletionRemarks : string = undefined;
POSTCPV_Report : string = undefined;
}
