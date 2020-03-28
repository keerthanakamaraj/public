import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChargeHandlerComponent } from './charge-handler.component';

@NgModule({
  declarations: [ChargeHandlerComponent],
  exports: [ChargeHandlerComponent],
  imports: [
    CommonModule
  ]
})
export class ChargeHandlerModule { }
