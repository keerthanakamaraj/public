import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormCommonComponent } from './form-common.component';
import { IGCBDatepickerComponent } from '../igcb-datepicker/igcb-datepicker.component';



@NgModule({
  declarations: [
    FormCommonComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FormCommonComponent
  ]
})
export class FormCommonModule { }
