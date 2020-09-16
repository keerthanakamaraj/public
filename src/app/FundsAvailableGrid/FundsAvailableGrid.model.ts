export class FundsAvailableGridModel {
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
this.rowData[i].FundsAvailable = row['FundsAvailable'];
this.rowData[i].Amount = row['Amount'];
this.rowData[i].LocalCurEqui = row['LocalCurEqui'];
}
}
}
class row{
SrNo : string = undefined;
FundsAvailable : string = undefined;
Amount : string = undefined;
LocalCurEqui : string = undefined;
}
