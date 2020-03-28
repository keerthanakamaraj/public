import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoanHandlerComponent } from './loan-handler.component';

@NgModule({
  declarations: [LoanHandlerComponent],
  exports: [LoanHandlerComponent],
  imports: [
    CommonModule
  ]
})
export class LoanHandlerModule { }
