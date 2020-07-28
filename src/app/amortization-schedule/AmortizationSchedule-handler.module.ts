import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmortizationScheduleHandlerComponent } from './AmortizationSchedule-handler.component';

@NgModule({
  declarations: [AmortizationScheduleHandlerComponent],
  exports: [AmortizationScheduleHandlerComponent],
  imports: [
    CommonModule
  ]
})
export class AmortizationScheduleHandlerModule { }
