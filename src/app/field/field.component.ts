import { Component, OnInit, Input, Output, EventEmitter, SimpleChange, KeyValueDiffers } from '@angular/core';
import { errorMap } from '../rlo-services/rloui.service';
import { ServiceStock } from '../service-stock.service';
import { Subject, Observable } from 'rxjs';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css']
})
export class FieldComponent{
  @Input('fieldID') fieldID: string;
  @Input('formCode') formCode: string;
  @Input('mandatory') mandatory: boolean = false;
  @Input('placeholder') placeholder: string = '';
  @Input('valueAlign') valueAlign: string = 'left';
  @Input('domainObjectCode') domainObjectCode: string;
  @Input('domainObjectUrl') domainObjectUrl: string;
  @Input('doServerUrl') doServerUrl: string;
  @Input('customClass') customClass: string = "";
  @Input('doValidate') doValidate: boolean = true;
  @Input('defaultValue') defaultValue:string=undefined

  // @Input('readOnly') readOnly: boolean = false;
  //Cannot take readonly as input because on reset it has to be reinitialized to the original value

  @Output('blur') blur = new EventEmitter<string>();
  @Output('change') change = new EventEmitter<string>();

  constructor(public services: ServiceStock) {}

  value: any;
  error: any=false;
  errorCode: string;
  additionalInfo: any;
  private hidden: boolean = false;
  readOnly: boolean = false;
  isOnFocus:boolean = false;
  dependencyMap = new Map<string, any>();
  oldValue:any=undefined;

  private changeValue = new Subject<any>();
  public valueChangeUpdates(): Observable<any>{
    return this.changeValue.asObservable();
  }

  protected passNewValue(value: any){
    this.changeValue.next(value);
  }

  isMandatory(): boolean {
    return this.mandatory;
  }

  ngAfterViewInit() {
    if(this.defaultValue!=undefined){
      this.setValue(this.defaultValue);
     }
  }

  setDependency(key, value) {
    this.dependencyMap.get(key).value = value;
  }

  getDependency(key) {
    return this.dependencyMap.get(key)?this.dependencyMap.get(key).value:undefined;
  }

  initDependency(key, paramType){
    this.dependencyMap.set(key, {
      paramType: paramType, 
      value: undefined
    });
  }

  setHidden(value: boolean) {
    this.hidden = value;
  }

  getFieldInfo() {
    return (this.additionalInfo==undefined)?"":this.additionalInfo;
  }

  getFieldValue() {
    return this.value;
  }

  serialize() {
    return {value: this.value, additionalInfo: this.additionalInfo};
  }

  isHidden() {
    return this.hidden;
  }

  onFocus(){
    this.clearError();
  }

  setFocus(value: boolean){
    value?document.getElementById(this.fieldID).focus():document.getElementById(this.fieldID).blur();
  }

  onReset() {
    this.value = undefined;
    this.additionalInfo = undefined;
    this.error = false;
    this.errorCode = undefined;
    this.passNewValue(this.value);
   // this.readOnly = false;
    this.dependencyMap.clear();
    this.fieldReset();
  }

  onBlur() {
    this.isOnFocus=false;
    this.blur.emit(this.value);
  }

  onChange(event){
    this.change.emit();
  }

  setValue(value, additionalInfo = undefined) {
    this.value = value;
    this.additionalInfo = additionalInfo;
    this.passNewValue(value);
  }

  setError(error) {
    this.error = true;
    if (this.domainObjectCode) {
      let errorCode = errorMap[this.domainObjectCode];
      if (errorCode) {
        if (errorCode[error]) {
          this.errorCode = 'ErrorCodes.' + this.domainObjectCode + '.' + error;
        } else {
          this.errorCode = error;
        }
      } else if (errorMap[error]) {
        this.errorCode = 'ErrorCodes.' + error;
      } else {
        this.errorCode = error;
      }
    } else {
      this.errorCode = error;
      if (errorMap[error]) {
        this.errorCode = 'ErrorCodes.' + error;
      } else {
        this.errorCode = error;
      }
    }
    // this.translate.get(['Error_codes']).subscribe(translations => {
    //   this.error = translations.Error_codes[this.errorCode];
    // });
  }

  clearError() {
  //  this.error = undefined;
    this.error=false;
    this.errorCode=undefined;
  }

  setReadOnly(readOnly:boolean) {
    this.readOnly = readOnly;
  }

  isReadOnly(): boolean{
    return this.readOnly;
  }
  fieldReset() { }

  // async validateField() {
  //   let depJson = {};
  //   this.dependencyMap.forEach(
  //     (value, key) => {
  //       depJson[key] = value;
  //     }
  //   );
  //   return this.services.http.validateField(this.formCode, this.domainObjectCode, this.value, depJson);
  // }

  async validateValue(value): Promise<number> {
    return 0;
  }

  async domainObjectValidation() {
    if(this.doCustomScript!=undefined){
      await this.doCustomScript();
    }
    return this.services.http.domainObjectValidation(this.domainObjectUrl, this.getFieldValue(), this.dependencyMap, this.doServerUrl);
  }

  setDOCustomScript(fn: ()=>void){
    this.doCustomScript = fn;
  }
  doCustomScript: () => void = undefined;

  updateOldValue(){
    this.oldValue=this.value;
  }
  getOldValue(){
    return this.oldValue;
  }
}

