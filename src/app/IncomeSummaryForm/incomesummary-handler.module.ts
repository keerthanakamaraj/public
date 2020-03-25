import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncomeSummaryHandlerComponent } from './incomesummary-handler.component';

@NgModule({
  declarations: [IncomeSummaryHandlerComponent],
  exports: [IncomeSummaryHandlerComponent],
  imports: [
    CommonModule
  ]
})
export class IncomeSummaryHandlerModule { }
