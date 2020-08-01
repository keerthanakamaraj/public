import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisbursementsHandlerComponent } from '../DisbursementDetails/disbursement-handler.component';

@NgModule({
  declarations: [DisbursementsHandlerComponent],
  exports: [DisbursementsHandlerComponent],
  imports: [
    CommonModule
  ]
})
export class DisbursementHandlerModule { }
