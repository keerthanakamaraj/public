import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisitReportHandlerComponent } from './visitreport-handler.component';

@NgModule({
  declarations: [VisitReportHandlerComponent],
  exports: [VisitReportHandlerComponent],
  imports: [
    CommonModule
  ]
})
export class VisitReportHandlerModule { }
