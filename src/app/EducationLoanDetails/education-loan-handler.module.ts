import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EducationLoanHandlerComponent } from './education-loan-handler.component';

@NgModule({
  declarations: [EducationLoanHandlerComponent],
  exports: [EducationLoanHandlerComponent],
  imports: [
    CommonModule
  ]
})
export class EducationLoanHandlerModule { }
