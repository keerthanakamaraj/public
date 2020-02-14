export class FreshCurrencyModel {
rowData = new Array<row>();
footerData = new footer();
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
this.footerData = new footer();
}
clearRowData(){
this.rowData = new Array<row>();
}
clearFooterData(){
this.footerData = new footer();
}
setValue(input){
for(var i = 0; i < input.length; i++){
let row = input[i];
this.addRecord();
this.rowData[i].FieldId_5 = row['FieldId_5'];
this.rowData[i].FieldId_4 = row['FieldId_4'];
this.rowData[i].FieldId_3 = row['FieldId_3'];
this.rowData[i].FieldId_6 = row['FieldId_6'];
this.rowData[i].FieldId_7 = row['FieldId_7'];
this.rowData[i].FieldId_8 = row['FieldId_8'];
}
}
}
class row{
FieldId_5 : string = undefined;
FieldId_4 : string = undefined;
FieldId_3 : string = undefined;
FieldId_6 : string = undefined;
FieldId_7 : string = undefined;
FieldId_8 : string = undefined;
}
class footer{
FieldId_5 : string='';
FieldId_4 : string='';
FieldId_3 : string='';
FieldId_6 : string='';
FieldId_7 : string='Total';
FieldId_8 : string='';
}
