import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeductionHandlerComponent } from './deduction-handler.component';

@NgModule({
  declarations: [DeductionHandlerComponent],
  exports: [DeductionHandlerComponent],
  imports: [
    CommonModule
  ]
})
export class DeductionHandlerModule { }
