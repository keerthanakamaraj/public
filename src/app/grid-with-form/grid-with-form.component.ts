import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grid-with-form',
  templateUrl: './grid-with-form.component.html',
  styleUrls: ['./grid-with-form.component.css']
})
export class GridWithFormComponent{
  @Input('fieldID') fieldID: string;
  @Input('formCode') formCode: string;
  @Input('mandatory') mandatory: boolean = false;
  @Input('readOnly') readOnly: boolean = false;

  fieldsMapping: {
    formToGrid: { [key: string]: string },
    gridToForm: { [key: string]: string }
  };

  hideUpdate: boolean = true;
  hideAdd: boolean = false;
  hideReset: boolean = false;

  selectedRow: number = undefined;
  dependencyMap = new Map<string, string>();
  private hidden: boolean = false;


  constructor() { }

  isMandatory(): boolean {
    return this.mandatory;
  }

  getFormFieldId(gridColId: string): string {
    return this.fieldsMapping.gridToForm[gridColId];
  }

  getGridColId(formFieldId: string): string {
    return this.fieldsMapping.formToGrid[formFieldId];
  }

  setDependency(key, value) {
    this.dependencyMap.set(key, value);
    this["form"].setDependency(key, value);
    this["grid"].setDependency(key, value);
  }

  setFormDependencies(){
    this.dependencyMap.forEach((value, key)=>{
      this["form"].setDependency(key, value);
    });
  }

  setGridDependencies(){
    this.dependencyMap.forEach((value, key)=>{
      this["grid"].setDependency(key, value);
    });
  }

  onRowDelete(rowNo){
    if(this.selectedRow==rowNo){
      this.selectedRow = undefined;
      this.hideAdd = false;
      this.hideUpdate = true;
    }else if(this.selectedRow>rowNo){
      this.selectedRow--;
    }
  }

  resetForm(){
    this["form"].onReset();
    this.setFormDependencies();
    this.selectedRow = undefined;
    this.hideAdd = false;
    this.hideUpdate = true;
  }

  setValue(inputValue, inputDesc=undefined){
    this["grid"].setValue(inputValue, inputDesc);
  }

  getFieldValue() {//changed -- added
    return this["grid"].getFieldValue();
  }

  getFieldInfo(){
    return this["grid"].getFieldInfo();
  }

  serialize() {
    return this["grid"].serialize();
  }

  setReadOnly(readOnly: boolean){
    this["form"].setReadOnly(readOnly);
    this["grid"].setReadOnly(readOnly);
    if(readOnly){
      this.hideAdd = true;
      this.hideUpdate = true;
      this.hideReset = true;
    }
  }

  clearError(){
    this["form"].clearError();
    this["grid"].clearError();
  }

  setError(errorCode) {
    this["grid"].setError(errorCode);
  }

  async revalidate(): Promise<number> {
    var totalErrors = 0;
    await this["grid"].revalidate().then((errors)=>{totalErrors+=errors});
    return totalErrors;
  }

  getRowsCount(): number{
    return this["grid"].getRowsCount();
  }

  getRowData(rowNo) {
    return this["grid"].getRowData(rowNo);
  }

  onReset(){
    this.selectedRow = undefined;
    this.hideAdd = false;
    this.hideUpdate = true;
    this.hideReset = false;
    this.dependencyMap.clear();
    this["form"].onReset();
    this["grid"].onReset();
    this.setReadOnly(false);
  }

  setHidden(value: boolean) {
    this.hidden = value;
  }

  isHidden(): boolean {
    return this.hidden;
  }

}
