export class PreCPVInputGridModel {
  rowData = new Array<row>();
  addRecord(rowNo?: number): number {
    let addedRowNo: number;
    if (rowNo != undefined) {
      this.rowData.splice(rowNo + 1, 0, new row());
      addedRowNo = rowNo + 1;
    } else {
      this.rowData.push(new row());
      addedRowNo = this.rowData.length - 1;
    }
    return addedRowNo;
  }
  deleteRecord(rowNo) {
    this.rowData.splice(rowNo, 1);
  }
  clearAll() {
    this.rowData = new Array<row>();
  }
  clearRowData() {
    this.rowData = new Array<row>();
  }
  setValue(input) {
    for (var i = 0; i < input.length; i++) {
      let row = input[i];
      this.addRecord();
      this.rowData[i].CustomerName = row['CustomerName'];
      this.rowData[i].VerificationType = row['VerificationType'];
      this.rowData[i].Details = row['Details'];
      this.rowData[i].City = row['City'];
      this.rowData[i].Agency = row['Agency'];
      this.rowData[i].RemarksForAgency = row['RemarksForAgency'];
      this.rowData[i].WaiveOff = row['WaiveOff'];
      this.rowData[i].RetriggerStatus = row['RetriggerStatus'];
    }
  }
}
class row {
  CustomerName: string = undefined;
  VerificationType: string = undefined;
  Details: string = undefined;
  City: string = undefined;
  Agency: string = undefined;
  RemarksForAgency: string = undefined;
  WaiveOff: string = undefined;
  RetriggerStatus: string = undefined;
}
