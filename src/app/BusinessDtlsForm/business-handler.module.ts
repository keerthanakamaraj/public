import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessHandlerComponent } from '../BusinessDtlsForm/business-handler.component';

@NgModule({
  declarations: [BusinessHandlerComponent],
  exports: [BusinessHandlerComponent],
  imports: [
    CommonModule
  ]
})
export class BusinessHandlerModule { }
