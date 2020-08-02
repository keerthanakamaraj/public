export class DisbursInputGridModel {
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
this.rowData[i].ProjectCompletion = row['ProjectCompletion'];
this.rowData[i].DisbursementAmount = row['DisbursementAmount'];
}
}
}
class row{
ProjectCompletion : string = undefined;
DisbursementAmount : string = undefined;
}
