import { Component, OnInit, QueryList, ViewChildren, Input, ChangeDetectorRef, EventEmitter, Output } from '@angular/core';
import { ComboBoxComponent } from '../combo-box/combo-box.component';
import { TextBoxComponent } from '../text-box/text-box.component';
import { TextAreaComponent } from '../text-area/text-area.component';
import { DateComponent } from '../date/date.component';
import { FileuploadComponent } from '../fileupload/fileupload.component';
import { ProvidehttpService } from '../providehttp.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AmountComponent } from '../amount/amount.component';
import { ServiceStock } from '../service-stock.service';
import { CheckBoxComponent } from '../check-box/check-box.component';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { HiddenComponent } from '../hidden/hidden.component';
import { ButtonComponent } from '../button/button.component';
import { ReadOnlyComponent } from '../rlo-ui-readonlyfield/rlo-ui-readonlyfield.component';
import { RloUiCurrencyComponent } from '../rlo-ui-currency/rlo-ui-currency.component';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  @ViewChildren(ComboBoxComponent) comboFields: QueryList<ComboBoxComponent>;
  @ViewChildren(TextBoxComponent) textboxFields: QueryList<TextBoxComponent>;
  @ViewChildren(TextAreaComponent) textareaFields: QueryList<TextAreaComponent>;
  @ViewChildren(DateComponent) dateFields: QueryList<DateComponent>;
  @ViewChildren(FileuploadComponent) fileUploadFields: QueryList<FileuploadComponent>;
  @ViewChildren(AmountComponent) amountComponent: QueryList<AmountComponent>;
  @ViewChildren(CheckBoxComponent) checkboxComponent: QueryList<CheckBoxComponent>;
  @ViewChildren(HiddenComponent) hiddenComponent: QueryList<HiddenComponent>;
  @ViewChildren(ButtonComponent) buttonComponent: ButtonComponent;
  @ViewChildren(ReadOnlyComponent) readOnlyComponent: ReadOnlyComponent;
  @ViewChildren(ReadOnlyComponent) rloUiCurrencyComponent:RloUiCurrencyComponent;
  @Input('formCode') formCode: string;
  @Input('displayTitle') displayTitle: boolean = true;
  readOnly: boolean = false;

  componentCode: string;
  errors = 0;
  addingRow = false;
  settingValue = false;
  error = false;
  errorCode: string;
  value: any = undefined;
  fieldDependencies = {};
  showDelete:boolean=false;

  isCellReadOnly: {
    [key: string]: boolean
  }[] = [];

  @Input('type') gridType: number = 1;
  @Input('mandatory') mandatory: boolean = false;

  @Output() onEdit = new EventEmitter<number>();
  @Output() onDelete = new EventEmitter<number>();

  additionalInfo: any;
  initRowCount: number = 0;
  uniqueColumns: string[] = [];
  primaryColumns: string[] = [];

  dependencyMap: Map<string, string> = new Map();
  rowError: {
    hasError: boolean,
    errorCode: string
  }[] = [];

  private hidden: boolean = false;

  private colHidden : {
    [key: string]: boolean
  } = {};

  setColumnHidden(columnId: string, isHidden: boolean){
    this.colHidden[columnId] = isHidden;
  }

  isColumnHidden(columnId){
    return this.colHidden[columnId];
  }

  private changeValue = new Subject<any>();
  public valueChangeUpdates(): Observable<any>{
    return this.changeValue.asObservable();
  }

  protected passNewValue(value: any){
    this.changeValue.next(value);
  }

  constructor(public services: ServiceStock, public cdRef: ChangeDetectorRef) {
    //this.formCode = "EACNOPENREQ";
  }

  editRow(rowNo) {
    this.onEdit.emit(rowNo);
  }

  setHidden(value: boolean) {
    this.hidden = value;
  }

  isHidden() {
    return this.hidden;
  }

  ngOnInit() {
  }

  async genericOnBlur(columnId, value, rowNo): Promise<number> {

    var totalErrors = 0;

    var thisField = this[columnId].toArray()[rowNo];
    if(thisField.componentName='RloUiCurrencyComponent'){
      value=value.textFieldValue;
    }
    thisField.clearError();

    var gridModelObject = this.value.rowData[rowNo]; //add gridCode in generated file
    gridModelObject[columnId] = value;
    this.setDependency(columnId, value, rowNo);

  
    if (value != undefined && value.toString() != "") {
      await thisField.validateValue(value).then((errors) => { totalErrors += errors });
      if (totalErrors > 0) { return totalErrors }
    }

    if(thisField.componentName='RloUiCurrencyComponent' && thisField.isMandatory() && thisField.isAmountEmpty()){
      thisField.setError('MANDATORY');
      return ++totalErrors;
    }
    if (thisField.isMandatory() && (value == undefined || value.toString() == '')) {
      thisField.setError('MANDATORY');
      return ++totalErrors;
    }

    if (value && thisField.domainObjectCode) {
      await (await thisField.domainObjectValidation()).toPromise().then(
        (res) => {
          if (this.fieldDependencies[columnId]) {
            for (let dep of this.fieldDependencies[columnId].outDep) {

              var depValue = this.services.http.getContextPathValue(dep.paramKey, res);

              gridModelObject[dep.depFieldID] = depValue;
              this[dep.depFieldID].toArray()[rowNo].setValue(depValue);
              this.setDependency(dep.depFieldID, depValue, rowNo);
            }
          }
        },
        (httpError) => {
          var err = httpError['error'];
          if(err!=null){
            thisField.setError(err['ErrorDescription']);
          }else{
            thisField.setError("Error while field validation");
          }          
          return ++totalErrors;
        }
      );
    }

    if (this[columnId + "_blur"]) {
      this[columnId + "_blur"]({rowNo: rowNo, columnId: columnId, value: value}, rowNo);
    }

    return totalErrors;
  }


  initRows() {
    for (var i = 0; i < this.initRowCount; i++) {
      this.addEmptyRow();
    }
  }

  onReset() {
    this.value.clearAll();
    this.passNewValue(this.value.rowData);
    this.initRows();
    this.dependencyMap.clear();
    this.error = false;
    this.readOnly = false;
    this.errorCode = '';
  }

  getRowsCount(): number {
    return this.value.rowData.length;
  }

  // getRowData(rowNo) {
  //   this["getFieldInfo"]();
  //   return { value: this.value.rowData[rowNo], additionalInfo: this.additionalInfo[rowNo] }
  // }

  getRowData(rowNo) {
    return this.value.rowData[rowNo];
  }

  setError(errorCode) {
    this.errorCode = 'ErrorCodes.' + errorCode;
    this.error = true;
  }

  setRowError(rowNo, errorCode) {
    this.rowError[rowNo].hasError = true;
    this.rowError[rowNo].errorCode = 'ErrorCodes.' + errorCode;
  }

  clearRowError(rowNo) {
    this.rowError[rowNo].hasError = false;
    this.rowError[rowNo].errorCode = "";
  }

  clearGridError() {
    this.error = false;
    this.errorCode = "";
  }

  clearError() {
    this.clearGridError();
    for (var i = 0; i < this.getRowsCount(); i++) {
      this.clearRowError(i);
    }
    this.basicFieldsOperation(field => {
      field.clearError();
    });
  }

  initDependency(key, paramType){}

  getDependency(key) {
    return this.dependencyMap.get(key);
  }


  setDependency(depFldId: string, value, rowNo?: number) {  //key will always be depFieldId 
    // we can not take paramKey and update the dependency because 
    // more than one domain object can have same param key and every place
    // it can mean different


    // let keyToMatch = 'paramKey';
    // if(key.startsWith('@') && key.endsWith('@')){
    //   keyToMatch = 'depFieldID';
    // }

    this.dependencyMap.set(depFldId, value);
    for (let columnId in this.fieldDependencies) {
      for (let dep of this.fieldDependencies[columnId].inDep) {
        if (dep.depFieldID == depFldId && this[columnId]) {
          if (rowNo == undefined) {
            this[columnId].forEach((field) => {
              field.setDependency(dep.paramKey, value);
            });
          } else {
            this[columnId].toArray()[rowNo].setDependency(dep.paramKey, value);
          }
        }
      }
    }
  }

  setDependencies(index) { //changed
    for (let columnId in this.fieldDependencies) {
      for (let dep of this.fieldDependencies[columnId].inDep) {
        this[columnId].toArray()[index].initDependency(dep.paramKey, dep.paramType);
        if (dep.depFieldID.startsWith('@') && dep.depFieldID.endsWith('@')) {
          this[columnId].toArray()[index].setDependency(dep.paramKey, this.getDependency(dep.depFieldID));
        } else {
          this[columnId].toArray()[index].setDependency(dep.paramKey, this.value.rowData[index][dep.depFieldID]);
        }
      }
    }
  }

  protected unsubscribeRow$ = new Array<Subject<void>>();
  subsToFieldValuesRowWise(rowNo){
    for (let colId in this.value.rowData[rowNo]) {
      this[colId].toArray()[rowNo].valueChangeUpdates()
      .pipe(takeUntil(this.unsubscribeRow$[rowNo]))
      .subscribe(
        (value) => {
          this.value.rowData[rowNo][colId] = value;
          this.setDependency(colId, value, rowNo);
        }
      );
    }
  }

  basicFieldsOperation(fn) {
    this.comboFields.forEach(fn);
    this.textboxFields.forEach(fn);
    this.textareaFields.forEach(fn);
    this.dateFields.forEach(fn);
    this.fileUploadFields.forEach(fn);
    this.amountComponent.forEach(fn);
    this.checkboxComponent.forEach(fn);
    this.hiddenComponent.forEach(fn);
  }

  setReadOnly(readOnly) {
    this.readOnly = readOnly;
    this.basicFieldsOperation((field) => {
      field.setReadOnly(readOnly);
    });

    for (let row of this.isCellReadOnly) {
      for (let colId in row) {
        row[colId] = (this.gridType == 2) && readOnly;
      }
    }
  }

  setCellReadOnly(rowNo: number, columnId: string, readOnly: boolean) {
    this[columnId].toArray()[rowNo].setReadOnly(readOnly);
    this.isCellReadOnly[rowNo][columnId] = (this.gridType == 2) && readOnly;
  }

  setColumnReadOnly(columnId: string, readOnly: boolean) {
    this[columnId].forEach((field, index) => {
      field.setReadOnly(readOnly);
      this.isCellReadOnly[index][columnId] = (this.gridType == 2) && readOnly;
    });
  }

  setRowReadOnly(rowNo: number, readOnly: boolean) {
    for (let colId in this.value.rowData[rowNo]) {
      this.isCellReadOnly[rowNo][colId] = (this.gridType == 2) && readOnly;
      this[colId].toArray()[rowNo].setReadOnly(readOnly);
    }
  }

  onRowDelete(rowNo){}
  deleteRow(rowNo) {
    this.onRowDelete(rowNo);
    this.value.deleteRecord(rowNo);
    this.rowError.splice(rowNo, 1);
    this.isCellReadOnly.splice(rowNo, 1);
    this.unsubscribeRow$[rowNo].next();
    this.unsubscribeRow$[rowNo].complete();
    this.unsubscribeRow$.splice(rowNo, 1);
    this.onDelete.emit(rowNo);
  }

  setCellValue(rowNo, columnID, value) {
    let row = this.value.rowData[rowNo];
    this[columnID].toArray()[rowNo].setValue(value);
    row[columnID] = value;
  }

  getCellValue(rowNo, columnID) {
    let row = this.value.rowData[rowNo];
    return row[columnID];
  }

  getFieldValue() {//changed -- added
    return this.value.rowData;
  }

  serialize() {
    this["getFieldInfo"]();
    return { value: this.value.rowData, additionalInfo: this.additionalInfo };
  }

  getDuplicateFields(newRow: any, excludeRowNo: number = undefined): string[] {
    var duplicateFields: string[] = [];

    for (var i = 0; i < this.uniqueColumns.length; i++) {

      if (newRow[this.uniqueColumns[i]] != undefined) {
        for (var j = this.getRowsCount() - 1; j >= 0; j--) {
          let jRowVal = this.value.rowData[j][this.uniqueColumns[i]];
          if (j != excludeRowNo && ((newRow[this.uniqueColumns[i]] == jRowVal))) {
            duplicateFields.push(this.uniqueColumns[i]);
            break;
          }
        }
      }
    }

    return duplicateFields;
  }

  isRowUnique(newRow: any, excludeRowNo: number = undefined): boolean {
    var isDuplicateRow: boolean = false;

    let iRow = newRow;
    for (var j = this.getRowsCount() - 1; j >= 0; j--) {
      let jRow = this.value.rowData[j];

      if (excludeRowNo != j) {
        for (var k = 0; k < this.primaryColumns.length; k++) {
          // isDuplicateRow = (iRow[this.primaryColumns[k]] != undefined && (iRow[this.primaryColumns[k]] == jRow[this.primaryColumns[k]]));
          isDuplicateRow = (iRow[this.primaryColumns[k]] == jRow[this.primaryColumns[k]]);
          if (!isDuplicateRow) {
            break;
          }
        }
      }

      if (isDuplicateRow) { break; }
    }

    return !isDuplicateRow;
  }

  async columnDuplicationiCheck(): Promise<number> {
    if (this.uniqueColumns.length == 0) {
      return 0;
    }
    var totalErrors = 0;
    for (var i = this.getRowsCount() - 1; i >= 0; i--) {
      let iRow = this.value.rowData[i];
      var foundDuplicate: boolean[] = new Array(this.uniqueColumns.length).fill(false);
      for (var j = i - 1; j >= 0; j--) {
        let jRow = this.value.rowData[j];

        for (var k = 0; k < this.uniqueColumns.length; k++) {
          if (!foundDuplicate[k] && (iRow[this.uniqueColumns[k]] != undefined && (iRow[this.uniqueColumns[k]] == jRow[this.uniqueColumns[k]]))) {
            this[this.uniqueColumns[k]].toArray()[i].setError('DUPLICATE');
            totalErrors++;
            foundDuplicate[k] = true;
          }
        }

        var p = 0;
        for (p = 0; p < foundDuplicate.length; p++) {
          if (!foundDuplicate[p]) {
            break;
          }
        }
        if (p == foundDuplicate.length) {
          break;
        }

      }
    }
    return totalErrors;
  }

  async rowDuplicationiCheck(): Promise<number> {
    if (this.primaryColumns.length == 0) {
      return 0;
    }
    var totalErrors = 0;
    for (var i = this.getRowsCount() - 1; i >= 0; i--) {
      let iRow = this.value.rowData[i];
      for (var j = i - 1; j >= 0; j--) {
        let jRow = this.value.rowData[j];

        var isDuplicateRow: boolean = false;
        for (var k = 0; k < this.primaryColumns.length; k++) {
          // isDuplicateRow = (iRow[this.primaryColumns[k]] != undefined && (iRow[this.primaryColumns[k]] == jRow[this.primaryColumns[k]]));
          isDuplicateRow = (iRow[this.primaryColumns[k]] == jRow[this.primaryColumns[k]]);
          if (!isDuplicateRow) {
            break;
          }
        }

        if (isDuplicateRow) {
          this.setRowError(i, 'DUPLICATE');
          totalErrors++;
          break;
        }
      }
    }
    return totalErrors;
  }

  onRowAdd(rowNo: number){}
  addEmptyRow(rowNo?: number) {
    let newRowNo = this.value.addRecord(rowNo);
    this.rowError.splice(newRowNo, 0, { hasError: false, errorCode: "" });
    this.isCellReadOnly.splice(newRowNo, 0, {});
    this.cdRef.detectChanges(); //changed --added
    this.setDependencies(newRowNo);
    this.unsubscribeRow$.splice(newRowNo, 0, new Subject<void>());
    this.subsToFieldValuesRowWise(newRowNo);
    this.error = false;
    this.onRowAdd(newRowNo);
    return newRowNo;
  }

  addRow(rowData, rowDesc = undefined): number{ //changed --added new
    this.addEmptyRow();
    var i: number = this.getRowsCount() - 1;
    this.setRowData(rowData, rowDesc, i);
    return i;
  }

  setValue(inputValue: {}[], inputDesc = undefined) {//changed-- will expect to get rowData only
    this.value.clearRowData();
    this.passNewValue(this.value.rowData);
    // if (inputValue.footerData) {
    //   this["setFooterData"](inputValue.footerData);
    // }
    if (inputValue && inputValue.length>0) {
      inputDesc = (inputDesc || new Array(inputValue.length).fill(undefined));
      for (var i = 0; i < inputValue.length; i++) {
        this.addRow(inputValue[i], inputDesc[i]);
      }
    }
  }

  isMandatory(): boolean {
    return this.mandatory;
  }

  async revalidate(): Promise<number> {
    this.error = false;
    var totalErrors = 0;

    if(this.isMandatory() && this.getRowsCount() == 0){
      this.setError('GRID_MANDATORY');
      return ++totalErrors;      
    }

    for (var i = 0; i < this.getRowsCount(); i++) {
      for (let colId in this.value.rowData[i]) {
        await this.genericOnBlur(colId, this.value.rowData[i][colId], i).then((errors) => { totalErrors += errors });//chagned -- added genericOnBlur methods
      }
    }
    await this.columnDuplicationiCheck().then((errors) => { totalErrors += errors });
    await this.rowDuplicationiCheck().then((errors) => { totalErrors += errors });
    this.errors = totalErrors;
    return totalErrors;
  }

  setRowData(rowData, rowDesc = undefined, rowNo?: number) {//chagned --added 
    if (rowNo == undefined) {
      this.addEmptyRow();
      rowNo = this.getRowsCount() - 1;
    }
    rowDesc = (rowDesc || {}); //chagned --added 
    for (let colId in this.value.rowData[rowNo]) {
      this.value.rowData[rowNo][colId] = rowData[colId];
      //if currency component then use currency method
     
     if('RloUiCurrencyComponent'==this[colId].toArray()[rowNo].componentName){
      this[colId].toArray()[rowNo].setComponentSpecificValue(rowData[colId], rowDesc[colId + '_desc'])
     }
      this[colId].toArray()[rowNo].setValue(rowData[colId], undefined, rowDesc[colId + '_desc']);
    }
    if (this.gridType == 2) { this.setRowReadOnly(rowNo, true); }
  }
  showHideDeleteIcon(rowlimit) {
    
    if (this.value.rowData.length <= rowlimit) {
      this.showDelete = false;
    } else {
      this.showDelete = true;
    }
  }
}
