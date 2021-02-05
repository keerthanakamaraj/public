import { Component, OnInit, Input } from '@angular/core';
import { OccupationDtlsFormComponent } from './OccupationDtlsForm.component';
import { FieldComponent } from '../field/field.component';
import { RLOUIHandlerComponent } from 'src/app/rlouihandler/rlouihandler.component';

@Component({
  selector: 'app-occupation-handler',
  template: `<div style="display:none;"></div>`,
  styles: []
})
export class OccupationHandlerComponent extends RLOUIHandlerComponent implements OnInit {
  @Input() MainComponent: OccupationDtlsFormComponent;
  formName: string = "OccupationDetails";
  occupations = [];
  fieldArray: any[];
  ngOnInit() {
    // ngOnInit
  }

  // OnFormLoad
  onFormLoad(arg0: {}) {
    console.log("Occupation .. On form load");
    super.onFormLoad({});
    //this.MainComponent.CD_THIRD_NAME.setHidden(true);
  }


  // occupationOnchange(DefaultFlag) {
  //   let array
  //   array = this.fieldArrayFunction();
  //   if (DefaultFlag || this.MainComponent.OD_OCCUPATION.getFieldValue() == 'SL') {
  //     this.MainComponent.OD_EMPLT_TYPE.mandatory = true;
  //     this.MainComponent.OD_EMPLT_TYPE.setReadOnly(false);
  //   }
  //   else {
  //     this.MainComponent.OD_EMPLT_TYPE.mandatory = false;
  //     this.MainComponent.OD_EMPLT_TYPE.setReadOnly(true);
  //     this.MainComponent.OD_EMPLT_TYPE.setValue(undefined);

  //   }

  //   if (this.MainComponent.OD_OCCUPATION.getFieldValue() == 'SE') {
  //     this.MainComponent.OD_SELF_EMPLD_TYPE.mandatory = true;
  //     this.MainComponent.OD_SELF_EMPLD_TYPE.setReadOnly(false);
  //     this.MainComponent.OD_SELF_EMPLD_PROF.setReadOnly(false);
  //   }
  //   else {
  //     this.MainComponent.OD_SELF_EMPLD_TYPE.mandatory = false;
  //     this.MainComponent.OD_SELF_EMPLD_TYPE.setReadOnly(true);
  //     this.MainComponent.OD_SELF_EMPLD_PROF.setReadOnly(true);
  //     this.MainComponent.OD_SELF_EMPLD_PROF.setValue(undefined);
  //     this.MainComponent.OD_SELF_EMPLD_TYPE.setValue(undefined);
  //   }
  //   if (this.MainComponent.OD_OCCUPATION.getFieldValue() == 'HW' ||
  //     this.MainComponent.OD_OCCUPATION.getFieldValue() == 'RT' ||
  //     this.MainComponent.OD_OCCUPATION.getFieldValue() == 'OT' ||
  //     this.MainComponent.OD_OCCUPATION.getFieldValue() == 'ST') {

  //     array.forEach(function (arrayfalse) { arrayfalse.mandatory = false });
  //   }
  //   else {
  //     array.forEach(function (arrayTrue) {
  //       arrayTrue.mandatory = true;
  //     });
  //   }
  // }

  occupationOnchange() {
    let newOccupation=this.MainComponent.OD_OCCUPATION.getFieldValue();
    this.MainComponent.isRetired = newOccupation == 'RT'?true:false;
  
    switch (newOccupation) {
      case 'SL':
        this.doBasicFieldSetting(false);
        this.MainComponent.OD_OCCUPATION_OTHERS.setHidden(true);
        this.MainComponent.OD_SELF_EMPLD_PROF.setHidden(true);
        this.MainComponent.OD_SELF_EMPLD_TYPE.setHidden(true);
        break;
      case 'SE':
      this.doBasicFieldSetting(false);
        this.MainComponent.OD_OCCUPATION_OTHERS.setHidden(true);
        this.MainComponent.OD_EMPLT_TYPE.setHidden(true);
        break;
      case 'RT':
      this.doBasicFieldSetting(true);
        this.MainComponent.OD_EMPLT_TYPE.setHidden(false);
        this.MainComponent.OD_INDUSTRY.setHidden(false);
        this.MainComponent.OD_NTR_OF_BUSS.setHidden(false);
        this.MainComponent.OD_COMPANY_CODE.setHidden(false);
        this.MainComponent.OD_COMP_CAT.setHidden(false);
        this.MainComponent.OD_COMP_NAME.setHidden(false);
        break;
      case 'OT':
      this.doBasicFieldSetting(true);
        this.MainComponent.OD_OCCUPATION_OTHERS.setHidden(false);
        break;
      case 'HW': case 'ST': 
      this.doBasicFieldSetting(true);
        break;
        default:
        this.doBasicFieldSetting(false);
        this.MainComponent.OD_OCCUPATION_OTHERS.setHidden(true);
        this.MainComponent.OD_SELF_EMPLD_PROF.setHidden(true);
        this.MainComponent.OD_SELF_EMPLD_TYPE.setHidden(true);
    }

    this.adjustMandatoryFields();
  }

  doBasicFieldSetting(hiddenFlag){
    let fieldList = this.fieldArrayFunction();
    fieldList.forEach(eachField=> {
      if(!this.MainComponent.populatingDataFlag){
        eachField.onReset();
      }   
      eachField.setHidden(hiddenFlag);
    });
      this.MainComponent.populatingDataFlag=false;
  }
  adjustMandatoryFields(){
  this.MainComponent.OD_EMPLT_TYPE.mandatory=!this.MainComponent.OD_EMPLT_TYPE.isHidden();
  this.MainComponent.OD_SELF_EMPLD_TYPE.mandatory=!this.MainComponent.OD_SELF_EMPLD_TYPE.isHidden();
  this.MainComponent.OD_OCCUPATION_OTHERS.mandatory=!this.MainComponent.OD_OCCUPATION_OTHERS.isHidden();
  this.MainComponent.OD_COMPANY_CODE.mandatory=!this.MainComponent.OD_COMPANY_CODE.isHidden();
  this.MainComponent.OD_INC_DOC_TYPE.mandatory=!this.MainComponent.OD_INC_DOC_TYPE.isHidden();
  this.MainComponent.OD_INCOME_TYPE.mandatory=!this.MainComponent.OD_INCOME_TYPE.isHidden();
  this.MainComponent.OD_INDUSTRY.mandatory=!this.MainComponent.OD_INDUSTRY.isHidden();
  }
  companyCodeChange() {
    if (this.MainComponent.OD_COMPANY_CODE.getFieldValue() == 'OTHERS') {
      this.MainComponent.OD_COMP_CAT.setReadOnly(false);
      this.MainComponent.OD_COMP_NAME.setReadOnly(false);
      this.MainComponent.OD_COMP_CAT.mandatory=true;
      this.MainComponent.OD_COMP_NAME.mandatory=true;
    }
    else {
      this.MainComponent.OD_COMP_CAT.setReadOnly(true);
      this.MainComponent.OD_COMP_NAME.setReadOnly(true);
      this.MainComponent.OD_COMP_CAT.mandatory=false;
      this.MainComponent.OD_COMP_NAME.mandatory=false;
    }
  }



  // fieldArrayFunction() {
  //   this.fieldArray = [];
  //   this.fieldArray.push(this.MainComponent.OD_INDUSTRY, this.MainComponent.OD_COMPANY_CODE, this.MainComponent.OD_COMP_CAT,
  //     this.MainComponent.OD_COMP_NAME, this.MainComponent.OD_INC_DOC_TYPE, this.MainComponent.OD_NET_INCOME,
  //     this.MainComponent.OD_INCOME_FREQ, this.MainComponent.OD_INCOME_TYPE, this.MainComponent.OD_NET_INCOME, this.MainComponent.OD_LOC_CURR_EQ)
  //   return this.fieldArray;
  // }

  fieldArrayFunction() {
    this.fieldArray = [];
    this.fieldArray.push(
      this.MainComponent.OD_EMPLT_TYPE,
      this.MainComponent.OD_SELF_EMPLD_PROF,
      this.MainComponent.OD_SELF_EMPLD_TYPE,
      this.MainComponent.OD_OCCUPATION_OTHERS,
      this.MainComponent.OD_EMPLOYEE_ID,
      this.MainComponent.OD_DEPARTMENT,
      this.MainComponent.OD_DESIGNATION,
      this.MainComponent.OD_DATE_OF_JOINING,
      this.MainComponent.OD_DT_OF_INCPTN,
      this.MainComponent.OD_INDUSTRY,
      this.MainComponent.OD_NTR_OF_BUSS,
      this.MainComponent.OD_COMPANY_CODE,
      this.MainComponent.OD_COMP_CAT,
      this.MainComponent.OD_COMP_NAME,
      this.MainComponent.OD_LENGTH_OF_EXST,
      this.MainComponent.OD_INC_DOC_TYPE,
      this.MainComponent.OD_EMP_STATUS,
      this.MainComponent.OD_INCOME_TYPE,
      this.MainComponent.OD_WRK_PERMIT_NO
    );
    return this.fieldArray;
  }

  netIncomeOnblur() {
    if (this.MainComponent.hidExchangeRate.getFieldValue() !== undefined && this.MainComponent.OD_NET_INCOME.getFieldValue() !== undefined) {
      let CurrenyExchangeValue = this.MainComponent.hidExchangeRate.getFieldValue() * this.MainComponent.OD_NET_INCOME.getFieldValue();
      this.MainComponent.OD_LOC_CURR_EQ.setComponentSpecificValue(CurrenyExchangeValue);
      this.setAnnualNetIncome();
    }
  }

  setAnnualNetIncome(){
let NetIncome:number = this.MainComponent.OD_LOC_CURR_EQ.getFieldValue();
let IncomeFreq:string =this.MainComponent.OD_INCOME_FREQ.getFieldValue();
let AnnualIncome:number;
if(NetIncome!=undefined && NetIncome>0 && IncomeFreq != undefined){
  switch(IncomeFreq){
    case 'D': AnnualIncome= NetIncome*7*4*12;break;
    case 'W': AnnualIncome= NetIncome*4*12;break;
    case 'M': AnnualIncome= NetIncome*12;break;
    case 'Y': AnnualIncome= NetIncome;break;
    }
    this.MainComponent.OD_ANNUAL_NET_INCOME.setComponentSpecificValue(AnnualIncome.toFixed(2));
}

  }
}
