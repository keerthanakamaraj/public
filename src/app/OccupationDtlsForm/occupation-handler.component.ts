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


  occupationOnchange() {
    let array
    array = this.fieldArrayFunction();
    if (this.MainComponent.OD_OCCUPATION.getFieldValue() == 'SL') {
      this.MainComponent.OD_EMPLT_TYPE.mandatory = true;
      this.MainComponent.OD_EMPLT_TYPE.setReadOnly(false);
    }
    else {
      this.MainComponent.OD_EMPLT_TYPE.mandatory = false;
      this.MainComponent.OD_EMPLT_TYPE.setReadOnly(true);
      this.MainComponent.OD_EMPLT_TYPE.setValue(undefined);

    }

    if (this.MainComponent.OD_OCCUPATION.getFieldValue() == 'SE') {
      this.MainComponent.OD_SELF_EMPLD_TYPE.mandatory = true;
      this.MainComponent.OD_SELF_EMPLD_TYPE.setReadOnly(false);
      this.MainComponent.OD_SELF_EMPLD_PROF.setReadOnly(false);
    }
    else {
      this.MainComponent.OD_SELF_EMPLD_TYPE.mandatory = false;
      this.MainComponent.OD_SELF_EMPLD_TYPE.setReadOnly(true);
      this.MainComponent.OD_SELF_EMPLD_PROF.setReadOnly(true);
      this.MainComponent.OD_SELF_EMPLD_PROF.setValue(undefined);
      this.MainComponent.OD_SELF_EMPLD_TYPE.setValue(undefined);
    }
    if (this.MainComponent.OD_OCCUPATION.getFieldValue() == 'HW' ||
      this.MainComponent.OD_OCCUPATION.getFieldValue() == 'RT' ||
      this.MainComponent.OD_OCCUPATION.getFieldValue() == 'OT' ||
      this.MainComponent.OD_OCCUPATION.getFieldValue() == 'ST') {

      array.forEach(function (arrayfalse) { arrayfalse.mandatory = false });
    }
    else {
      array.forEach(function (arrayTrue) {
        arrayTrue.mandatory = true;
      });
    }
  }

  companyCodeChange() {
    if (this.MainComponent.OD_COMPANY_CODE.getFieldValue() == 'OTH') {
      this.MainComponent.OD_COMP_CAT.setReadOnly(false);
      this.MainComponent.OD_COMP_NAME.setReadOnly(false);
    }
    else {
      this.MainComponent.OD_COMP_CAT.setReadOnly(true);
      this.MainComponent.OD_COMP_NAME.setReadOnly(true);
    }
  }



  fieldArrayFunction() {
    this.fieldArray = [];
    this.fieldArray.push(this.MainComponent.OD_INDUSTRY, this.MainComponent.OD_COMPANY_CODE, this.MainComponent.OD_COMP_CAT,
      this.MainComponent.OD_COMP_NAME, this.MainComponent.OD_INC_DOC_TYPE, this.MainComponent.OD_NET_INCOME,
      this.MainComponent.OD_INCOME_FREQ, this.MainComponent.OD_INCOME_TYPE, this.MainComponent.OD_CURRENCY, this.MainComponent.OD_LOC_CURR_EQ)
    return this.fieldArray;
  }

  netIncomeOnblur(){
    if(this.MainComponent.hidExchangeRate.getFieldValue() !== undefined && this.MainComponent.OD_NET_INCOME.getFieldValue() !== undefined){
      let CurrenyExchangeValue = this.MainComponent.hidExchangeRate.getFieldValue() * this.MainComponent.OD_NET_INCOME.getFieldValue();
      this.MainComponent.OD_LOC_CURR_EQ.setValue(CurrenyExchangeValue);
    }
  }
}

