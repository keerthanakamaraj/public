import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoanTopupHandlerComponent } from './LoanTopup-handler.component';

@NgModule({
  declarations: [LoanTopupHandlerComponent],
  exports: [LoanTopupHandlerComponent],
  imports: [
    CommonModule
  ]
})
export class LoanTopupHandlerModule { }
